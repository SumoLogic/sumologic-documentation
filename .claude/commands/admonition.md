# New Admonition — Custom Admonition Scaffolding

Scaffolds a new custom admonition type for Docusaurus with icon, styling, and configuration.

## What this command does

When you invoke `admonition`, Claude will:

1. **Gather specifications**. Name, icon, colors, purpose
2. **Create icon component**. Add to Admonition index file
3. **Register configuration**. Add to AdmonitionConfigs
4. **Add theme styles**. Configure light and dark modes
5. **Generate documentation**. Usage examples and preview
6. **Test the admonition**. Optionally create test page

## When to use this command

* Creating a new admonition type beyond standard ones
* Adding branded callout boxes
* Building specialized documentation components
* Marking content types (beta, deprecated, premium)
* Creating visual distinction for specific content

## Existing Admonitions

Before creating a new one, check if existing types work:

### Standard Docusaurus

- **`note`** (gray) — Supplementary information
- **`tip`** (green) — Helpful tips and tricks
- **`info`** (blue) — Important information
- **`warning`** (yellow) — Important warnings
- **`danger`** (red) — Dangerous actions, data loss risk

### Custom Sumo Logic

- **`sumo`** (blue) — Sumo Logic best practices, expert guidance
- **`training`** (purple) — Training courses, certifications, lessons

## Workflow

### Step 1: Gather Requirements

Ask user for these specifications:

#### 1. Admonition Name
- **Format**: Lowercase, single word, no spaces
- **Examples**: `beta`, `deprecated`, `premium`, `experimental`, `preview`

**Good names:**
- Short and descriptive
- Matches content purpose
- Easy to remember and type

**Avoid:**
- Multi-word names
- Generic terms (info, alert)
- Names that conflict with existing types

#### 2. Purpose
What is this admonition for?

Examples:
- "Mark beta features that may change"
- "Warn about deprecated APIs"
- "Highlight premium/enterprise-only features"
- "Flag experimental functionality"
- "Show compliance requirements"

#### 3. Icon Type

**Option A: SVG Icon** (recommended)
- Scalable and crisp
- Matches other admonition icons
- Easy to color with CSS

**Option B: Image File**
- PNG or SVG file
- Already have branded icon
- Example: Sumo Logic uses PNG for `sumo` admonition

**Option C: Emoji** (simple fallback)
- Quick and easy
- Less professional
- Limited customization

Common icon sources:
- Material Design Icons: https://materialdesignicons.com/
- Feather Icons: https://feathericons.com/
- Heroicons: https://heroicons.com/

#### 4. Color Scheme

**Primary color** (hex):
- Border and icon color
- Should have good contrast with background
- Test in both light and dark modes

**Background color** (optional):
- Usually primary color with low opacity (0.05-0.1)
- Provides subtle distinction
- Must be readable in both themes

**Common color themes:**

| Purpose | Primary Color | Use Case |
|---------|--------------|----------|
| Beta/Preview | `#9333ea` (purple) | New features |
| Deprecated | `#dc2626` (red) | Old features |
| Premium | `#eab308` (gold) | Enterprise only |
| Experimental | `#f97316` (orange) | Unstable |
| Compliance | `#0ea5e9` (blue) | Legal/regulatory |
| Success | `#16a34a` (green) | Completed actions |

#### 5. Default Label (optional)

What text appears in the admonition heading by default?

- Defaults to admonition name if not specified
- Can be customized per usage
- Should be short (1-2 words)

Examples:
- `beta` → "Beta"
- `deprecated` → "Deprecated"
- `premium` → "Premium Feature"

### Step 2: Create Icon Component

Add icon component to `src/theme/Admonition/index.js` before the `AdmonitionConfigs` object.

#### For SVG Icon

```javascript
function BetaIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path
        fillRule="evenodd"
        d="M12 2L2 7l10 5 9-4.91V17h2V7L12 2z"
      />
    </svg>
  );
}
```

**Tips:**
- Use 24x24 viewBox for consistency
- Keep path data simple (avoid complex shapes)
- Use `fillRule="evenodd"` for complex paths
- Test that icon scales well at different sizes

#### For Image Icon

```javascript
function BetaIcon() {
  return (
    <img
      src={useBaseUrl('img/icons/beta.png')}
      width="25"
      alt=""
    />
  );
}
```

**Requirements:**
- Image must exist in `/static/img/icons/`
- PNG or SVG format
- Recommended size: 50x50px (displays at 25x25)
- Transparent background

#### For Emoji Icon

```javascript
function BetaIcon() {
  return <span style={{ fontSize: '1.5em' }}>🧪</span>;
}
```

**Quick but limited:**
- Works across all platforms
- Less professional appearance
- Limited customization

### Step 3: Register Admonition Config

Add configuration to the `AdmonitionConfigs` object in `src/theme/Admonition/index.js`:

```javascript
const AdmonitionConfigs = {
  beta: {
    infimaClassName: 'beta',
    iconComponent: BetaIcon,
    label: (
      <Translate
        id="theme.admonition.beta"
        description="The default label used for the Beta admonition (:::beta)">
        beta
      </Translate>
    ),
  },
  // ... existing configs (sumo, training, note, etc.)
};
```

**Important:**
- Add BEFORE existing configs to maintain alphabetical order
- `infimaClassName` should match admonition name
- `iconComponent` references the function created in Step 2
- `id` in Translate should be `theme.admonition.[name]`

### Step 4: Add Theme Styles

Add CSS to `src/css/sumo.scss` after existing admonition styles.

#### Template for New Admonition

```scss
// BETA (or your admonition name in caps)
html[data-theme='dark'] .theme-admonition-beta {
  background-color: rgba(147, 51, 234, 0.1);
  --ifm-alert-border-color: #9333ea;
  border-left: 6px solid #9333ea;
  padding: var(--ifm-alert-padding-vertical) var(--ifm-alert-padding-horizontal);
  --ifm-alert-color: #ffffff;
  --ifm-alert-foreground-color: #9333ea;
  .admonition-icon {
    --ifm-alert-foreground-color: #9333ea !important;
  }
  a {
    color: #a855f7;
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }
}

html[data-theme='light'] .theme-admonition-beta {
  background-color: rgba(147, 51, 234, 0.05);
  --ifm-alert-border-color: #9333ea;
  border-left: 6px solid #9333ea;
  padding: var(--ifm-alert-padding-vertical) var(--ifm-alert-padding-horizontal);
  --ifm-alert-color: var(--ifm-font-color-base);
  --ifm-alert-foreground-color: #9333ea;
  .admonition-icon {
    --ifm-alert-foreground-color: #9333ea !important;
  }
  a {
    color: #7c3aed;
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }
}
```

#### Customization Points

**Background opacity:**
- Dark mode: `rgba(R, G, B, 0.1)` — 10% opacity
- Light mode: `rgba(R, G, B, 0.05)` — 5% opacity
- Adjust for visibility and contrast

**Border color:**
- Should match primary color
- 6px solid left border is standard

**Text color:**
- Dark mode: `#ffffff` (white)
- Light mode: `var(--ifm-font-color-base)` (inherits theme)

**Link colors:**
- Should be visible against background
- Slightly different shade than primary
- Test hover states

**Converting hex to rgba:**
```
#9333ea → rgb(147, 51, 234)
rgba(147, 51, 234, 0.1)
```

### Step 5: Present Changes Summary

Show the user what was created:

```markdown
## New Admonition Created: beta

### Files Modified

#### 1. src/theme/Admonition/index.js

**Added BetaIcon component** (lines 72-80):
\`\`\`javascript
function BetaIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path fillRule="evenodd" d="M12 2L2 7l10 5..." />
    </svg>
  );
}
\`\`\`

**Registered in AdmonitionConfigs** (lines 85-95):
\`\`\`javascript
beta: {
  infimaClassName: 'beta',
  iconComponent: BetaIcon,
  label: <Translate id="theme.admonition.beta">beta</Translate>,
},
\`\`\`

#### 2. src/css/sumo.scss

**Added dark mode styles** (lines 850-867):
- Purple border and icon (#9333ea)
- Subtle background (10% opacity)
- White text

**Added light mode styles** (lines 869-886):
- Same purple border and icon
- Lighter background (5% opacity)
- Default text color

---

### Usage

Use in markdown files:

\`\`\`markdown
:::beta
This feature is currently in beta and may change.
:::

:::beta Custom Title
Content with a custom heading.
:::
\`\`\`

---

### Color Preview

**Dark mode:**
- Background: rgba(147, 51, 234, 0.1)
- Border: #9333ea (purple)
- Text: white

**Light mode:**
- Background: rgba(147, 51, 234, 0.05)
- Border: #9333ea (purple)
- Text: default (dark gray)

---

### Next Steps

1. **Test locally**: Run `npm start` to preview
2. **Create test page**: Add example to a doc
3. **Update docs**: Add to style guide if needed
4. **Commit changes**: When satisfied with appearance
```

### Step 6: Create Test Example (Optional)

Offer to create a test file:

```markdown
## Test File Created

**Location**: `docs/_test-admonitions.md`

\`\`\`markdown
---
id: test-admonitions
title: Admonition Tests
---

# Testing New Admonitions

## Beta Admonition

:::beta
This is a beta feature that may change in future releases.
:::

:::beta Custom Title Here
Beta content with a custom heading.
:::

## All Admonitions

Compare with existing types:

:::note
Standard note admonition.
:::

:::tip
Standard tip admonition.
:::

:::beta
New beta admonition.
:::
\`\`\`

**To preview:**
1. Run: `npm start`
2. Navigate to: http://localhost:3000/docs/_test-admonitions
3. Check both light and dark themes
4. Delete test file when done
```

### Step 7: Update Documentation (Optional)

Offer to update:

**`.claude/skills/sumo-style/SKILL.md`**
Add the new admonition type to the admonitions list:
```markdown
:::beta
Mark features currently in beta that may change.
:::
```

**`CLAUDE.md`** (if project instructions reference admonitions)
Document when to use the new type.

**Contributing guide** (if it exists)
Add usage guidelines for contributors.

## Safety Guidelines

- **NEVER modify files automatically**. show all changes for review
- **Test thoroughly**. ensure it works in both light and dark themes
- **Maintain consistency**. follow existing admonition patterns
- **Validate colors**. check WCAG contrast ratios for accessibility
- **Build test**. offer to run `npm run build` after changes

## Common Icon Examples

### Beta/Experimental
```javascript
// Flask icon
<path d="M9 3v1H4v2h1v13a2 2 0 002 2h10a2 2 0 002-2V6h1V4h-5V3M12 8l-4 8h8m-4-6l-2.5 5h5" />
```

### Deprecated
```javascript
// Warning triangle
<path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
```

### Premium/Enterprise
```javascript
// Crown icon
<path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5m14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z" />
```

### Preview
```javascript
// Eye icon
<path d="M12 9a3 3 0 00-3 3 3 3 0 003 3 3 3 0 003-3 3 3 0 00-3-3m0 8a5 5 0 01-5-5 5 5 0 015-5 5 5 0 015 5 5 5 0 01-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5z" />
```

## Edge Cases

### Name Conflicts

If admonition name already exists:
```
❌ Error: Admonition 'beta' already exists in AdmonitionConfigs
→ Choose a different name or modify existing configuration
```

### Icon File Missing

If using image icon and file doesn't exist:
```
❌ Error: Image file not found: /static/img/icons/beta.png
→ Create the file first or use SVG icon instead
```

### Color Contrast Issues

Test colors meet WCAG AA standards:
- Text contrast ratio: at least 4.5:1
- Use tools like WebAIM Contrast Checker

### Build Errors

After adding admonition:
```bash
npm run build
```

Common errors:
- Syntax error in index.js
- Missing closing brace
- Invalid CSS in sumo.scss
- Missing comma in AdmonitionConfigs

## Tips for Good Admonitions

1. **Choose meaningful names**. Clear purpose from the name
2. **Keep icons simple**. Complex icons don't scale well
3. **Test both themes**. Check light and dark mode appearance
4. **Use consistently**. Document when to use this type
5. **Don't overdo it**. Too many types confuse users
6. **Match existing style**. Follow patterns from sumo/training
7. **Consider accessibility**. Ensure sufficient color contrast
8. **Document usage**. Update style guide with examples

## After Creation

Suggest:
1. **Test locally**: `npm start` and check both themes
2. **Try variations**: Default heading, custom heading, with links
3. **Update style guide**: Add to documentation standards
4. **Share with team**: Get feedback on appearance
5. **Create examples**: Show where to use it in real docs
