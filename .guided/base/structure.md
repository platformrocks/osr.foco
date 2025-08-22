# Guided Engineering Structure

## Overview

This document describes the canonical `.guided/` folder structure and file organization for the OSR.Foco project. The `.guided/` directory contains all project documentation, assessments, and engineering artifacts following Guided Engineering standards.

## Folder Structure

| Folder                  | Purpose                | Contents                                                       |
| ----------------------- | ---------------------- | -------------------------------------------------------------- |
| `.guided/base/`         | Project fundamentals   | Project structure, setup instructions, reference documentation |
| `.guided/architecture/` | Technical architecture | Stack documentation, rules, context, entities, guardrails      |
| `.guided/assessment/`   | Project assessment     | Technical assessments, analysis, and evaluations               |
| `.guided/testing/`      | Testing documentation  | Strategy, playbooks, test plans, and procedures                |
| `.guided/context/`      | Environment context    | Local development context, environment configuration           |
| `.guided/operation/`    | Operational docs       | Troubleshooting, worklog, operational procedures               |
| `.guided/tmp/`          | Temporary files        | System context, temporary analysis files                       |

## File Organization

### Base Documentation (`/base/`)

| File                    | Purpose                                    | Status       |
| ----------------------- | ------------------------------------------ | ------------ |
| `project.structure.md`  | Overall project structure and organization | ✅ Completed |
| `setup.instructions.md` | Development environment setup guide        | 📝 Template  |
| `structure.md`          | This file - canonical structure reference  | ✅ Completed |

### Architecture Documentation (`/architecture/`)

| File            | Purpose                                  | Status       |
| --------------- | ---------------------------------------- | ------------ |
| `stack.md`      | Technology stack and dependencies        | ✅ Completed |
| `rules.md`      | Architectural rules and conventions      | 📝 Template  |
| `context.md`    | System boundaries and integration points | ✅ Completed |
| `entities.md`   | Core domain entities and relationships   | ✅ Completed |
| `guardrails.md` | Technical standards and quality gates    | ✅ Completed |
| `plugins.md`    | Plugin architecture and extensibility    | ✅ Completed |

### Assessment Documentation (`/assessment/`)

| File           | Purpose                                       | Status       |
| -------------- | --------------------------------------------- | ------------ |
| `summary.md`   | Global assessment summary and recommendations | ✅ Completed |
| `structure.md` | Structural analysis and evaluation            | 📝 Template  |
| `stack.md`     | Technology stack assessment                   | 📝 Template  |

### Testing Documentation (`/testing/`)

| File          | Purpose                           | Status       |
| ------------- | --------------------------------- | ------------ |
| `strategy.md` | Testing approach and methodology  | ✅ Completed |
| `playbook.md` | Testing procedures and guidelines | 📝 Template  |

### Context Documentation (`/context/`)

| File       | Purpose                                 | Status      |
| ---------- | --------------------------------------- | ----------- |
| `local.md` | Local development environment notes     | 📝 Template |
| `env.md`   | Environment configuration and variables | 📝 Template |

### Operational Documentation (`/operation/`)

| File                 | Purpose                              | Status       |
| -------------------- | ------------------------------------ | ------------ |
| `troubleshooting.md` | Common issues and solutions          | ✅ Completed |
| `worklog.md`         | Project worklog and activity history | 📝 Pending   |

### Temporary Files (`/tmp/`)

| File                | Purpose                                | Status       |
| ------------------- | -------------------------------------- | ------------ |
| `system.context.md` | Current system and environment context | ✅ Completed |

## Naming Rules

### File Naming Convention

- **Format**: `{category}.{subcategory}.md`
- **Case**: lowercase with dots as separators
- **Extensions**: `.md` for documentation, `.json` for structured data

### Document Structure

- **Headers**: Use H1 for main title, H2 for major sections
- **TODOs**: Mark incomplete sections with "TODO:" prefix
- **Status**: Use status indicators (✅ ❌ ⚠️ 📝) for tracking

### Content Guidelines

- **Completeness**: All files should have at least basic structure
- **Traceability**: Reference related files and external dependencies
- **Maintenance**: Include last updated dates for critical files
- **Consistency**: Follow same format and style across all documents

## Maintenance

### Update Frequency

- **Architecture**: Update when significant changes occur
- **Assessment**: Quarterly reviews and updates
- **Testing**: Update with each new testing strategy
- **Operation**: Update when issues are resolved or new ones discovered

### Review Process

- **Weekly**: Review worklog and temporary files
- **Monthly**: Review assessment summaries
- **Quarterly**: Full documentation review and update
- **Major Changes**: Update relevant documentation immediately

### Quality Assurance

- **Completeness**: All sections should be filled out
- **Accuracy**: Information should be current and correct
- **Consistency**: Follow established patterns and conventions
- **Traceability**: Maintain links between related documents
