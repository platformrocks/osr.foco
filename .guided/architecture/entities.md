# Entity Documentation

This document describes the core entities for the osr.foco application. These are the minimal mandatory fields required for v0 implementation.

## Task

The Task entity represents a task in the focus/productivity system.

### Fields

| Field       | Type               | Description                                            |
| ----------- | ------------------ | ------------------------------------------------------ |
| `id`        | `string`           | Unique identifier for the task                         |
| `title`     | `string`           | The title or description of the task                   |
| `status`    | `'todo' \| 'done'` | Current status of the task                             |
| `date`      | `string`           | The date the task is scheduled for (YYYY-MM-DD format) |
| `createdAt` | `Date`             | Timestamp when the task was created                    |

### JSON Example

```json
{
  "id": "task-001",
  "title": "Complete project documentation",
  "status": "todo",
  "date": "2025-08-22",
  "createdAt": "2025-08-22T10:30:00.000Z"
}
```

## BlockList

The BlockList entity represents a blocked website or application in the distraction blocking system.

### Fields

| Field       | Type     | Description                                           |
| ----------- | -------- | ----------------------------------------------------- |
| `id`        | `string` | Unique identifier for the block list entry            |
| `site`      | `string` | The website URL or application name to block          |
| `updatedAt` | `Date`   | Timestamp when this block list entry was last updated |

### JSON Example

```json
{
  "id": "block-001",
  "site": "youtube.com",
  "updatedAt": "2025-08-22T10:30:00.000Z"
}
```

## Configuration

The Configuration entity represents the application configuration settings.

### Fields

| Field          | Type                            | Description                                                |
| -------------- | ------------------------------- | ---------------------------------------------------------- |
| `theme`        | `'light' \| 'dark' \| 'system'` | Theme preference for the application UI                    |
| `brainrot`     | `'blocked' \| 'enabled'`        | Whether brainrot/distraction content is blocked or enabled |
| `notification` | `boolean`                       | Enable notification song                                   |
| `updatedAt`    | `Date`                          | Timestamp when the configuration was last updated          |

### JSON Example

```json
{
  "theme": "dark",
  "brainrot": "blocked",
  "notification": false,
  "updatedAt": "2025-08-22T10:30:00.000Z"
}
```

## Session

The Session entity represents a focus/pomodoro session.

### Fields

| Field       | Type                          | Description                                                |
| ----------- | ----------------------------- | ---------------------------------------------------------- |
| `id`        | `string`                      | Unique identifier for the session                          |
| `taskId`    | `string?`                     | Optional reference to the task this session is focused on  |
| `type`      | `'work' \| 'short' \| 'long'` | Type of session (work session, short break, or long break) |
| `startedAt` | `Date`                        | Timestamp when the session was started                     |
| `endedAt`   | `Date`                        | Timestamp when the session ended                           |

### JSON Example

```json
{
  "id": "session-001",
  "taskId": "task-001",
  "type": "work",
  "startedAt": "2025-08-22T10:30:00.000Z",
  "endedAt": "2025-08-22T11:00:00.000Z"
}
```

## Notes

- These are the minimal required fields for v0 implementation
- All Date fields are represented as JavaScript Date objects in TypeScript, but serialized as ISO 8601 strings in JSON
- The `taskId` field in Session is optional, allowing for sessions that aren't tied to a specific task
- String literal unions are used for enum-like values to ensure type safety
