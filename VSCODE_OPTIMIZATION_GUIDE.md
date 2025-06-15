# VS Code Optimization Guide

## Optimizations for VS Code and GitHub Copilot Performance

### Overview

This guide provides recommendations to optimize Visual Studio Code and GitHub Copilot performance specifically for the Axon.App project without modifying source code or project assets.

### VS Code Settings Optimizations

#### Performance Settings

Add these settings to your VS Code User Settings (not workspace settings):

```json
{
  "files.watcherExclude": {
    "**/node_modules/**": true,
    "**/.git/objects/**": true,
    "**/.git/subtree-cache/**": true,
    "**/dist/**": true,
    "**/build/**": true,
    "**/*.log": true
  },
  "search.exclude": {
    "**/node_modules": true,
    "**/dist": true,
    "**/build": true,
    "**/.git": true
  },
  "files.exclude": {
    "**/node_modules": true,
    "**/.git": true
  }
}
```

#### Memory Management

```json
{
  "typescript.preferences.includePackageJsonAutoImports": "off",
  "typescript.suggest.autoImports": false,
  "javascript.suggest.autoImports": false,
  "editor.quickSuggestionsDelay": 100
}
```

### GitHub Copilot Optimizations

#### Copilot Settings

```json
{
  "github.copilot.enable": {
    "*": true,
    "yaml": false,
    "plaintext": false,
    "markdown": false
  },
  "github.copilot.advanced": {
    "length": 500,
    "temperature": 0.1
  }
}
```

### Extension Management

#### Recommended Extensions to Keep

- GitHub Copilot
- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- Auto Rename Tag
- Bracket Pair Colorizer 2
- GitLens

#### Extensions to Disable/Uninstall (if not needed)

- Language extensions for unused languages
- Heavy theme extensions
- Unused debugging extensions
- Duplicate functionality extensions

### Workspace Optimizations

#### .vscode/settings.json (Project Level)

```json
{
  "emmet.includeLanguages": {
    "javascript": "javascriptreact"
  },
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

### System-Level Optimizations

#### Windows Specific

1. **Exclude VS Code from Windows Defender**:

   - Add VS Code installation folder to exclusions
   - Add workspace folder to exclusions

2. **Power Settings**:
   - Set power plan to "High Performance"
   - Disable USB selective suspend

#### General System Tips

1. **RAM**: Ensure at least 8GB available
2. **SSD**: Use SSD for better I/O performance
3. **Close unused applications** while coding
4. **Update VS Code** to latest version regularly

### File System Optimizations

#### .gitignore Additions

```
# VS Code
.vscode/
!.vscode/settings.json
!.vscode/tasks.json
!.vscode/launch.json
!.vscode/extensions.json

# Logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Build outputs
dist/
build/
.temp/
```

### Copilot Performance Tips

#### Best Practices

1. **Clear Context**: Provide clear comments before asking Copilot
2. **Specific Requests**: Be specific about what you want
3. **File Organization**: Keep files well-organized for better context
4. **Regular Restarts**: Restart VS Code if Copilot becomes slow

#### Copilot Commands

- `Ctrl+Shift+P` → "GitHub Copilot: Restart Language Server"
- `Ctrl+Shift+P` → "GitHub Copilot: Sign Out and Sign In"

### Monitoring Performance

#### VS Code Performance Monitor

1. Open Command Palette (`Ctrl+Shift+P`)
2. Run "Developer: Show Running Extensions"
3. Monitor extension performance

#### Task Manager Monitoring

- Monitor VS Code memory usage
- Check for high CPU usage extensions
- Ensure system resources are available

### Troubleshooting Common Issues

#### Slow IntelliSense

1. Restart TypeScript language server
2. Clear VS Code cache
3. Reduce workspace size

#### Copilot Not Responding

1. Check internet connection
2. Sign out and sign in to Copilot
3. Restart VS Code
4. Check Copilot status

#### High Memory Usage

1. Close unused tabs
2. Disable resource-heavy extensions
3. Increase system virtual memory

### Maintenance Schedule

#### Weekly

- Restart VS Code
- Clear temporary files
- Update extensions

#### Monthly

- Update VS Code
- Review and clean extensions
- Check system performance

---

## Summary

These optimizations focus solely on improving VS Code and Copilot performance without touching your project code or assets. Apply these settings gradually and monitor performance improvements.

**Note**: All changes are reversible and won't affect your project functionality.
