/**
 * Core entities for the osr.foco application
 * These are the minimal required fields for v0 implementation
 */

/**
 * Represents a task in the focus/productivity system
 */
export interface Task {
  /** Unique identifier for the task */
  id: string;

  /** The title or description of the task */
  title: string;

  /** Current status of the task */
  status: 'todo' | 'done';

  /** The date the task is scheduled for (YYYY-MM-DD format) */
  date: string;

  /** Timestamp when the task was created */
  createdAt: Date;
}

/**
 * Represents a blocked website or application in the distraction blocking system
 */
export interface BlockList {
  /** Unique identifier for the block list entry */
  id: string;

  /** The website URL or application name to block */
  site: string;

  /** Timestamp when this block list entry was last updated */
  updatedAt: Date;
}

/**
 * Represents the application configuration settings
 */
export interface Configuration {
  /** Theme preference for the application UI */
  theme: 'light' | 'dark' | 'system';

  /** Whether brainrot/distraction content is blocked or enabled */
  brainrot: 'blocked' | 'enabled';

  /** Whether notifications are enabled */
  notifications: boolean;

  /** Timestamp when the configuration was last updated */
  updatedAt: Date;
}

/**
 * Represents a focus/pomodoro session
 */
export interface Session {
  /** Unique identifier for the session */
  id: string;

  /** Optional reference to the task this session is focused on */
  taskId?: string;

  /** Type of session (work session, short break, or long break) */
  type: 'work' | 'short' | 'long';

  /** Timestamp when the session was started */
  startedAt: Date;

  /** Timestamp when the session ended */
  endedAt: Date;
}
