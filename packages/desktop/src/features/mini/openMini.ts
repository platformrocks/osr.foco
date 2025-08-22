import { WebviewWindow } from '@tauri-apps/api/webviewWindow';
import { getCurrentWindow, primaryMonitor } from '@tauri-apps/api/window';
import { MiniWindowPositionManager } from './windowPositionManager';

export const openMini = async (): Promise<void> => {
  try {
    // Check if mini window already exists
    const existing = await WebviewWindow.getByLabel('mini');
    if (existing) {
      // If mini window exists, close it and restore main window
      await existing.close();
      const mainWindow = getCurrentWindow();
      await mainWindow.show();
      await mainWindow.setFocus();
      return;
    }

    // Minimize the main window instead of hiding it
    const mainWindow = getCurrentWindow();
    await mainWindow.minimize();

    // Window dimensions and positioning
    const width = 320;
    const height = 180;
    const margin = 20;

    // Try to get saved position first
    const positionManager = MiniWindowPositionManager.getInstance();
    const savedPosition = positionManager.getSavedPosition();

    let x: number;
    let y: number;

    if (savedPosition) {
      // Use saved position
      x = savedPosition.x;
      y = savedPosition.y;
    } else {
      // Calculate default bottom-left position
      const monitor = await primaryMonitor();
      const monitorHeight = monitor?.size?.height ?? 1080;
      const monitorX = monitor?.position?.x ?? 0;
      const monitorY = monitor?.position?.y ?? 0;

      x = monitorX + margin;
      y = monitorY + monitorHeight - height - margin;
    }

    // Create new mini window
    const mini = new WebviewWindow('mini', {
      url: '#/mini',
      width,
      height,
      x,
      y,
      decorations: false,
      resizable: false,
      alwaysOnTop: true,
      skipTaskbar: true,
      focus: true,
      title: 'Foco Mini',
    });

    // Show and focus the mini window
    await mini.show();
    await mini.setFocus();
  } catch (error) {
    console.error('Failed to open mini window:', error);
    // Re-show main window if mini creation fails
    try {
      const mainWindow = getCurrentWindow();
      await mainWindow.show();
      await mainWindow.setFocus();
    } catch (restoreError) {
      console.error('Failed to restore main window:', restoreError);
    }
  }
};
