# GEMINI CLI REFERENCE

This document provides a reference for the GEMINI CLI commands and their usage.

## Core Concepts

### Understanding Context

The GEMINI CLI uses a hierarchical context system to provide relevant information for your conversations.

- **Global Context**: A global context file can be placed at `~/.gemini/GEMINI.md` to provide default instructions for all your projects.
- **Project Context**: A project-specific context file at `~/<project_root>/GEMINI.md` provides instructions for a specific project.
- **Sub-directory Context**: You can have context files within sub-directories, like `<project_root>/<sub-directory>/GEMINI.md`, for more granular instructions.

## Getting Started

### Interactive Mode

To start a conversation with GEMINI in interactive mode, which is used for human interaction and user input:

```bash
gemini -i
# or
gemini
```

### Non-Interactive (Headless) Mode

To use GEMINI in a non-interactive mode, which is useful for CI/CD pipelines or scripts:

```bash
gemini -p "your prompt"
```

## CLI Commands

### General Commands

- `/help`: Get a list of all available commands.
- `/auth`: Change or configure the authentication method.
- `/quit`: Quit the GEMINI CLI.
- `/stats`: See usage statistics for the GEMINI CLI.
- `/version`: See the version of the GEMINI CLI.
- `/clear`: Clear the screen and the current chat conversation context.
- `/generate <prompt>`: Generate a response (e.g., images or code) based on the prompt.
- `/theme`: Change the theme of the GEMINI CLI.
- `/settings`: Change the settings of the GEMINI CLI.
- `/compress`: Replace the current context with a concise summary to free up tokens.
- `/restore`: Undo changes and rollback the workspace to a different version.
- `/chat`: Save, resume, or manage chat conversations.
- `ctrl + o`: To see the Debug console.

### Context and File Management

- `@ <file_name> or <directory>`: Add a file or directory to the conversation context.

### Memory Management

- `/memory show`: Show all the merged context from `GEMINI.md` files.
- `/memory list`: List all `GEMINI.md` files currently in use.
- `/memory refresh`: Refresh the memory to load the latest version of `GEMINI.md` files.
- `/memory add <shorter-rules>`: Add incremental rules to the `GEMINI.md` file.
  - _Example_: `/memory add Prefer naming React server application with a 'do*' prefix.`

### Directory Management

- `/directory show`: List all directories added to the conversation context.
- `/directory add <directory_path>`: Add a directory to the conversation context.
- `/directory remove <directory_path>`: Remove a directory from the conversation context.
- `/directory clear`: Clear all directories from the conversation context.

### Shell Integration

- `! <shell_command>`: Execute a shell command and use its output in the conversation.

### Tool and Extension Management

- `/tools`: Manage the tools for the GEMINI CLI.
- `/extensions`: Manage extensions for the GEMINI CLI.
  - _Example_: `gemini extensions install https://github.com/username/extension-name`

## CLI Flags and Options

### Starting the CLI

- `gemini -i`: Start in interactive mode.
- `gemini -p "<prompt>"`: Start in non-interactive/headless mode.

### Model and Output

- `-m <model>`: Set the model to use (e.g., `gpt-3.5-turbo`).
- `--output-format json "<prompt>"`: Set the output format to JSON, useful in headless mode.

### Context and Directories

- `--include-directories <directory_path>`: Include a directory in the conversation context from the start.

### Tool Approval

- `--yolo` or `--approval-mode yolo`: Enable YOLO mode, which auto-approves all tool calls without confirmation.
- `--approval-mode auto-edit`: Auto-approve tool calls but still ask for permission before running shell commands.
- `--allowed-tools <tool_name>`: Specify allowed tools.
  - _Example_: `gemini --allowed-tools "ShellTool"`
  - _Example_: `gemini --allowed-tools "google-web-search", "ShellTool"`

### State Management

- `--checkpointing`: Enable checkpointing to save the conversation state.
- `--no-checkpointing`: Disable checkpointing.

### Other Flags

- `--telemetry`: Enable telemetry for debugging and reporting issues.

## Configuration

### `settings.json`

You can configure persistent settings for the GEMINI CLI in `settings.json` files located at:

- **System-wide**: `/etc/gemini-cli/system-defaults.json`
- **User-specific**: `~/.gemini/settings.json`
- **Project-specific**: `~/<project_root>/settings.json`

An example `settings.json` file:

```json
{
  "security": {
    // "auth": "google"
    // "auth": "google-api-key"
  },
  "model": "gpt-3.5-turbo",
  "general": {
    "checkpointing": {
      "enabled": true
    }
  },
  "tools": {
    "allowed": ["google-web-search", "ShellTool"]
  },
  "ui": {
    "theme": "dark",
    "showLineNumbers": true
  }
}
```
