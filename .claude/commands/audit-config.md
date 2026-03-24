# Audit Config — Docusaurus Configuration Validation

Audits `docusaurus.config.js` for misconfigurations, deprecated settings, and best practices.

## What this command does

When you invoke `/audit-config`, Claude will:

1. **Read configuration** — Analyze `docusaurus.config.js`
2. **Validate structure** — Check required fields and proper format
3. **Check for deprecated settings** — Identify Docusaurus 2 → 3 migration issues
4. **Validate plugins and themes** — Ensure proper configuration
5. **Check file references** — Verify paths exist
6. **Generate report** — List issues by severity
7. **Offer fixes** — Apply corrections with user approval

## When to use this command

* Build errors or failures
* After Docusaurus version upgrade
* Adding new plugins or themes
* Troubleshooting deployment issues
* Before major configuration changes
* Onboarding new contributors
* Regular maintenance checks

## Workflow

### Step 1: Read Config File

Read: `docusaurus.config.js` in repo root

If TypeScript config exists, check `docusaurus.config.ts` instead.

### Step 2: Validate Core Settings

Check these required fields:

```javascript
module.exports = {
  title: 'string',              // Required
  tagline: 'string',            // Optional but recommended
  url: 'https://...',           // Required, must be full HTTPS URL
  baseUrl: '/',                 // Required, must start and end with /
  onBrokenLinks: 'throw',       // 'throw' or 'warn' (not 'ignore')
  onBrokenMarkdownLinks: 'warn', // 'throw' or 'warn'
  favicon: 'img/favicon.ico',   // Required
  organizationName: 'string',   // Required for GitHub Pages
  projectName: 'string',        // Required for GitHub Pages

  // Optional but important
  trailingSlash: false,         // or true, depending on host
  i18n: { ... },                // For internationalization
}
```

#### Issues to Flag

**Missing required fields:**
```
❌ Missing `organizationName` — required for GitHub Pages deployment
❌ Missing `url` — required for sitemap and SEO
```

**Invalid values:**
```
❌ url: 'sumologic.com' — must include protocol (https://)
❌ baseUrl: '/docs' — must end with slash (/docs/)
❌ onBrokenLinks: 'ignore' — should be 'throw' or 'warn'
```

**Incorrect types:**
```
❌ title: 123 — must be string
❌ baseUrl: '/docs' (no trailing slash)
```

### Step 3: Check Preset Configuration

#### Classic Preset Structure

```javascript
presets: [
  [
    '@docusaurus/preset-classic',
    {
      docs: {
        sidebarPath: './sidebars.js',      // Check file exists
        editUrl: 'https://github.com/...',  // Check valid URL
        showLastUpdateTime: true,
        showLastUpdateAuthor: true,
      },
      blog: {
        showReadingTime: true,
        editUrl: 'https://github.com/...',
      },
      theme: {
        customCss: './src/css/custom.css',  // Check file exists
      },
    },
  ],
]
```

#### Issues to Flag

**Broken file paths:**
```
❌ Line 23: sidebarPath: './sidebars.js' — file does not exist
   → Fix: Use './sidebars.ts' (actual file in repo)

❌ Line 45: customCss: './src/css/custom.css' — file does not exist
   → Fix: Use './src/css/sumo.scss' (actual file)
```

**Malformed URLs:**
```
❌ editUrl: 'github.com/SumoLogic/...' — missing protocol
   → Fix: 'https://github.com/SumoLogic/...'

❌ editUrl pointing to wrong repo
   → Fix: Update to correct repository
```

**Deprecated options (Docusaurus 2 → 3):**
```
❌ docs: { routeBasePath: '/' } — moved to different location in v3
❌ blog: { feedOptions: { ... } } — renamed in v3
```

### Step 4: Check Plugin Configuration

#### Plugin Structure

```javascript
plugins: [
  'plugin-name',                    // String format
  ['plugin-name', { options }],     // Array format with options
]
```

#### Issues to Flag

**Plugins not installed:**
```
❌ Plugin '@docusaurus/plugin-client-redirects' listed but not in package.json
   → Fix: Run `npm install @docusaurus/plugin-client-redirects`
```

**Duplicate plugins:**
```
❌ Plugin '@docusaurus/plugin-content-docs' appears twice
   → Fix: Merge configurations or remove duplicate
```

**Conflicting configurations:**
```
❌ Multiple plugins trying to handle /docs route
   → Fix: Configure distinct routes
```

**Deprecated plugin syntax:**
```
❌ Using old plugin name from Docusaurus 2
   → Fix: Update to Docusaurus 3 plugin name
```

### Step 5: Validate Theme Config

#### Navbar Configuration

```javascript
themeConfig: {
  navbar: {
    title: 'Sumo Logic Docs',
    logo: {
      alt: 'Sumo Logic Documentation',  // Required
      src: 'img/logo.svg',              // Check file exists
      srcDark: 'img/logo-dark.svg',     // Optional
    },
    items: [
      {
        type: 'doc',
        docId: 'intro',
        position: 'left',
        label: 'Docs',
      },
      {
        href: 'https://www.sumologic.com',
        label: 'Website',
        position: 'right',
      },
    ],
  },
}
```

#### Issues to Flag

**Missing required fields:**
```
❌ Line 56: logo missing 'alt' text
   → Fix: Add alt: 'Sumo Logic Documentation'
```

**Broken file paths:**
```
❌ Line 57: logo src 'img/logo.svg' not found in /static
   → Fix: Verify file exists or use correct path
```

**Wrong link types:**
```
❌ Line 65: External link using 'to' instead of 'href'
   → Fix: Change to: { href: 'https://...', label: '...' }

❌ Line 70: Internal link using 'href' instead of 'to'
   → Fix: Change to: { to: '/docs/intro', label: '...' }
```

#### Footer Configuration

```javascript
footer: {
  style: 'dark',  // 'dark' or 'light'
  links: [
    {
      title: 'Docs',
      items: [
        { label: 'Getting Started', to: '/docs/intro' },
      ],
    },
  ],
  copyright: 'Copyright © 2026 Sumo Logic',
}
```

#### Issues to Flag

```
❌ style: 'blue' — invalid value (must be 'dark' or 'light')
❌ Broken internal links in footer
❌ Missing copyright notice
```

#### Search Configuration (Algolia)

```javascript
algolia: {
  appId: 'YOUR_APP_ID',
  apiKey: 'YOUR_SEARCH_API_KEY',    // Public search key only!
  indexName: 'sumologic-docs',
  contextualSearch: true,           // Enable for multi-version
  searchParameters: {},
}
```

#### Issues to Flag

```
❌ Missing required field: appId, apiKey, or indexName
⚠️  apiKey looks like admin key (should be search-only key)
⚠️  contextualSearch: false — should be true for versioned docs
```

### Step 6: Check for Deprecated Settings

Common Docusaurus 2 → 3 deprecations:

#### Imports and Components

```javascript
❌ import useBaseUrl from '@docusaurus/useBaseUrl';
✅ Asset paths are now automatic in Docusaurus 3

❌ import Original from '@theme-original/Component';
✅ import Original from '@theme/Component';
```

#### Configuration Options

```javascript
❌ docs: { editCurrentVersion: true }
✅ Removed in v3, no longer needed

❌ blog: { feedOptions: { type: 'all' } }
✅ Renamed to: blog: { feed: { type: 'all' } }
```

#### Plugin Names

```javascript
❌ @docusaurus/plugin-content-docs-legacy
✅ Use @docusaurus/plugin-content-docs with v3

❌ @docusaurus/plugin-sitemap with old options
✅ Updated configuration in v3
```

### Step 7: Validate URL and Routing

#### Check URL Configuration

```javascript
url: 'https://sumologic.com',
baseUrl: '/help/',
trailingSlash: false,
```

**Issues to flag:**
```
❌ url: 'http://...' — should use HTTPS
❌ url doesn't match production domain
❌ baseUrl: '/help' — missing trailing slash
⚠️  trailingSlash not set — may cause issues on some hosts
```

#### Check for Route Conflicts

```
❌ Plugin serving /docs conflicts with preset docs route
❌ Multiple plugins trying to handle same path
```

### Step 8: Cross-Reference with package.json

Read `package.json` to verify:

1. **Docusaurus version**
   ```json
   "@docusaurus/core": "3.x.x"
   ```
   Ensure config syntax matches version.

2. **Plugins are installed**
   ```
   ❌ Plugin listed in config but not in package.json
   ✅ All plugins have matching dependencies
   ```

3. **Version compatibility**
   ```
   ⚠️  Docusaurus 3.0.0 with plugin from 2.x
   ```

### Step 9: Validate File References

Check that referenced files exist:

1. **Sidebar file**: `sidebarPath: './sidebars.js'`
2. **Custom CSS**: `customCss: './src/css/custom.css'`
3. **Logo images**: `src: 'img/logo.svg'`
4. **Favicon**: `favicon: 'img/favicon.ico'`

For each missing file:
```
❌ File not found: ./sidebars.js
   Expected location: /Users/kpohas/sumologic-documentation/sidebars.js
   → Check if file exists with different extension (.ts, .tsx)
```

### Step 10: Generate Comprehensive Report

```markdown
# Docusaurus Config Audit Report

**File**: docusaurus.config.js
**Docusaurus Version**: 3.5.2
**Date**: March 23, 2026
**Status**: ⚠️ 8 issues found

---

## Critical Issues (Must Fix)

### Missing Required Fields (1)

**organizationName is missing**
- Required for GitHub Pages deployment
- Add to config:
  ```javascript
  organizationName: 'SumoLogic',
  ```

---

### Broken File Paths (2)

**Line 23:** `sidebarPath: './sidebars.js'`
- File does not exist
- Fix: Use `'./sidebars.ts'` (actual file in repo)

**Line 45:** Logo path `'img/logo.svg'` not found in `/static`
- File missing or wrong path
- Fix: Verify file exists at `/static/img/logo.svg`

---

## Warnings (Should Fix)

### Configuration Issues (3)

**Line 34:** `onBrokenLinks: 'ignore'`
- Broken links won't be caught in build
- Risk: Broken links in production
- Fix: Change to `'throw'` or `'warn'`

**Line 56:** Logo missing `alt` attribute
- Important for accessibility
- Fix: Add `alt: 'Sumo Logic Documentation'`

**Line 78:** External link using `to` instead of `href`
- May not work correctly
- Fix: Change to `href: 'https://www.sumologic.com'`

---

### Deprecated Settings (2)

**Line 67:** `useBaseUrl` import found in custom component
- No longer needed in Docusaurus 3
- Fix: Remove import, asset paths are automatic

**Line 89:** `@theme-original` import syntax
- Deprecated in v3
- Fix: Use `@theme` instead

---

## Suggestions (Best Practices)

### Search Configuration
- Consider enabling `contextualSearch: true` for Algolia
- Improves search in versioned docs

### Performance
- Add `webpack` configuration for bundle optimization
- Enable compression for better load times

### SEO
- Add `metadata` field for better social media previews
- Set `trailingSlash` explicitly (currently undefined)

---

## Summary

| Severity | Count |
|----------|-------|
| Critical | 3 |
| Warning  | 5 |
| Suggestion | 2 |
| **Total** | **10** |

---

## Next Steps

Would you like me to:
1. **Auto-fix all issues** — Apply all corrections
2. **Fix critical issues only** — Just the must-fix items
3. **Show fixes line-by-line** — Walk through each change
4. **Test build** — Run `npm run build` to check for errors
5. **Save report** — Export this report to a file
```

### Step 11: Offer Fixes

After presenting the report:

**Option 1: Auto-fix**
- Apply all corrections using Edit tool
- Show summary of changes
- Suggest running build to verify

**Option 2: Selective fix**
- Fix only critical issues
- Fix only specific issues
- Let user choose which to fix

**Option 3: Manual mode**
- Save report as file
- User fixes manually
- Available for guidance

## Safety Guidelines

- **NEVER modify automatically** — config changes can break the build
- **Show exact diffs** — user must see specific changes before applying
- **Validate after changes** — offer to run `npm run build` to test
- **Backup recommendation** — suggest committing current config first
- **Explain impact** — tell user what each fix does and why it matters

## Edge Cases

### No Issues Found

```markdown
# Docusaurus Config Audit Report

**Status**: ✅ All checks passed

Your Docusaurus configuration looks good:
- All required fields present and valid
- File paths verified
- No deprecated settings found
- Plugins properly configured
- URLs and routing correct

Configuration follows current best practices for Docusaurus 3.
```

### Build Errors Present

If user mentions build errors:
```
Focus audit on issues that could cause build failures:
- Missing required fields
- Broken file paths
- Invalid plugin configurations
- Syntax errors
```

### Multiple Config Files

Check for:
- `docusaurus.config.js` (JavaScript)
- `docusaurus.config.ts` (TypeScript)
- `docusaurus.config.local.js` (local overrides)

Priority: TypeScript > JavaScript > local overrides

### Monorepo Setup

If in monorepo:
- Check workspace configuration
- Validate relative paths work from repo root
- Check for shared configs

## Common Issues by Category

### URL/Routing Issues
- Missing protocol in URL
- baseUrl without trailing slash
- trailingSlash inconsistency
- Route conflicts between plugins

### File Path Issues
- Wrong file extensions (.js vs .ts)
- Paths relative to wrong directory
- Files in wrong location (src vs static)
- Case sensitivity (logo.svg vs Logo.svg)

### Plugin Issues
- Plugin not installed
- Wrong plugin version
- Duplicate plugin entries
- Conflicting plugin routes

### Theme Issues
- Missing alt text on images
- Broken logo paths
- Wrong link types (to vs href)
- Invalid theme configuration

### Deprecated Issues
- Old import paths
- Removed configuration options
- Legacy plugin names
- Docusaurus 2 syntax

## After the Audit

Suggest:
1. **Test the build**: `npm run build`
2. **Test locally**: `npm start`
3. **Check for warnings**: Review build output
4. **Commit changes**: If fixes applied
5. **Document**: Update any docs about configuration

## Tips

1. **Run after upgrades** — Always audit after Docusaurus version updates
2. **Check before deploy** — Catch issues before production
3. **Regular maintenance** — Run quarterly or when adding features
4. **Compare with official** — Check Docusaurus docs for latest best practices
5. **Test thoroughly** — Build and serve locally after changes
