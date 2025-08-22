/**
 * Singleton store wrapper with debounced persistence and fallback to localStorage
 */

import { Store } from '@tauri-apps/plugin-store';
import type { StoreKey } from './schema';

// Tauri window interface
interface TauriWindow extends Window {
  __TAURI__?: unknown;
  __TAURI_INTERNALS__?: unknown;
}

// Check if we're running in Tauri context
const isTauri = (): boolean => {
  const win = window as TauriWindow;
  return (
    typeof window !== 'undefined' &&
    win.__TAURI__ !== undefined &&
    win.__TAURI_INTERNALS__ !== undefined
  );
};

class LocalStorageFallback {
  private readonly prefix = 'foco-store-';

  async get<T>(key: string, fallback: T): Promise<T> {
    try {
      const stored = localStorage.getItem(this.prefix + key);
      if (stored === null) return fallback;
      return JSON.parse(stored) as T;
    } catch {
      return fallback;
    }
  }

  async set<T>(key: string, value: T): Promise<void> {
    try {
      localStorage.setItem(this.prefix + key, JSON.stringify(value));
    } catch (error) {
      console.warn('Failed to set localStorage:', error);
    }
  }

  async delete(key: string): Promise<void> {
    localStorage.removeItem(this.prefix + key);
  }

  async save(): Promise<void> {
    // localStorage saves immediately, no action needed
  }
}

class StoreManager {
  private store: Store | null = null;
  private fallback: LocalStorageFallback | null = null;
  private cache = new Map<string, unknown>();
  private pendingWrites = new Set<string>();
  private saveTimeout: number | null = null;
  private readonly SAVE_DEBOUNCE_MS = 300;
  private initialized = false;
  private useTauri = false;

  async init(filename = 'foco.store.json'): Promise<void> {
    if (this.initialized) return;

    try {
      if (isTauri()) {
        this.store = await Store.load(filename);
        this.useTauri = true;
        console.info('Store initialized with Tauri plugin-store');
      } else {
        this.fallback = new LocalStorageFallback();
        this.useTauri = false;
        console.info('Store initialized with localStorage fallback');
      }

      this.initialized = true;

      // Setup flush listeners
      this.setupFlushListeners();
    } catch (error) {
      console.error('Failed to initialize store:', error);

      // Fallback to localStorage if Tauri fails
      if (this.useTauri) {
        console.warn('Falling back to localStorage');
        this.fallback = new LocalStorageFallback();
        this.useTauri = false;
        this.initialized = true;
      } else {
        throw error;
      }
    }
  }

  private setupFlushListeners(): void {
    // Flush on page visibility change (hidden)
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        this.persistNow();
      }
    });

    // Flush before unload
    window.addEventListener('beforeunload', () => {
      this.persistNow();
    });

    // Flush on window blur
    window.addEventListener('blur', () => {
      this.persistNow();
    });
  }

  async get<T>(key: StoreKey, fallback: T): Promise<T> {
    this.ensureInitialized();

    // Return cached value if available
    if (this.cache.has(key)) {
      return this.cache.get(key) as T;
    }

    try {
      let value: T | null | undefined;

      if (this.useTauri && this.store) {
        value = await this.store.get<T>(key);
      } else if (this.fallback) {
        value = await this.fallback.get<T>(key, fallback);
      } else {
        value = fallback;
      }

      const result = value !== null && value !== undefined ? value : fallback;
      this.cache.set(key, result);
      return result;
    } catch (error) {
      console.warn(`Failed to get ${key} from store:`, error);
      this.cache.set(key, fallback);
      return fallback;
    }
  }

  async set<T>(key: StoreKey, value: T): Promise<void> {
    this.ensureInitialized();

    // Skip if value hasn't changed
    const cached = this.cache.get(key);
    if (cached !== undefined && this.deepEqual(cached, value)) {
      return;
    }

    // Update cache immediately
    this.cache.set(key, value);
    this.pendingWrites.add(key);

    // Schedule debounced save
    this.scheduleSave();
  }

  async remove(key: StoreKey): Promise<void> {
    this.ensureInitialized();

    this.cache.delete(key);
    this.pendingWrites.add(key);

    try {
      if (this.useTauri && this.store) {
        await this.store.delete(key);
      } else if (this.fallback) {
        await this.fallback.delete(key);
      }
      this.pendingWrites.delete(key);
    } catch (error) {
      console.warn(`Failed to remove ${key} from store:`, error);
    }
  }

  async persistNow(): Promise<void> {
    if (!this.initialized || this.pendingWrites.size === 0) return;

    // Clear any pending timeout
    if (this.saveTimeout !== null) {
      clearTimeout(this.saveTimeout);
      this.saveTimeout = null;
    }

    const keysToSave = Array.from(this.pendingWrites);
    this.pendingWrites.clear();

    try {
      // Save all pending changes
      for (const key of keysToSave) {
        const value = this.cache.get(key);
        if (value !== undefined) {
          if (this.useTauri && this.store) {
            await this.store.set(key, value);
          } else if (this.fallback) {
            await this.fallback.set(key, value);
          }
        }
      }

      // Persist to disk
      if (this.useTauri && this.store) {
        await this.store.save();
      } else if (this.fallback) {
        await this.fallback.save();
      }

      console.debug(`Persisted ${keysToSave.length} keys to store`);
    } catch (error) {
      console.error('Failed to persist store:', error);
      // Re-add failed keys to pending writes
      keysToSave.forEach((key) => this.pendingWrites.add(key));
    }
  }

  private scheduleSave(): void {
    if (this.saveTimeout !== null) {
      clearTimeout(this.saveTimeout);
    }

    this.saveTimeout = window.setTimeout(() => {
      this.persistNow();
    }, this.SAVE_DEBOUNCE_MS);
  }

  private ensureInitialized(): void {
    if (!this.initialized) {
      throw new Error('Store not initialized. Call init() first.');
    }
  }

  private deepEqual(a: unknown, b: unknown): boolean {
    if (a === b) return true;
    if (a === null || b === null) return false;
    if (typeof a !== typeof b) return false;

    if (typeof a === 'object') {
      const objA = a as Record<string, unknown>;
      const objB = b as Record<string, unknown>;
      const keysA = Object.keys(objA);
      const keysB = Object.keys(objB);

      if (keysA.length !== keysB.length) return false;

      for (const key of keysA) {
        if (!this.deepEqual(objA[key], objB[key])) {
          return false;
        }
      }
      return true;
    }

    return false;
  }
}

// Export singleton instance
export const store = new StoreManager();
