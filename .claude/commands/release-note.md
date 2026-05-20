# Release Note

Creates release notes for Sumo Logic products. Ask the user which type before proceeding.

## Types

| Type | Blog dir | File pattern |
|---|---|---|
| **Service** | `blog-service/` | `YYYY-MM-DD-{category}.md` |
| **Collector** | `blog-collector/` | `YYYY-MM-DD-{type}.md` |
| **Cloud SIEM** | `blog-cse/` | `YYYY-MM-DD-{type}.md` |
| **Cloud SOAR** | `blog-csoar/` | `YYYY-MM-DD-{subtype}.md` |
| **Developer** | `blog-developer/` | `YYYY-MM-DD-{slug}.md` |

Ask the user which type, then follow the appropriate section below.

**Shared frontmatter values (all types):**
- `hide_table_of_contents: true`
- `image: https://assets-www.sumologic.com/company-logos/_800x418_crop_center-center_82_none/SumoLogic_Preview_600x600.jpg?mtime=1617040082`

If a file already exists for the same date and type, ask the user to use a different date, append to the existing file, or add a more specific suffix.

---

## Service (`blog-service/`)

**Subtypes**: apps, collection, manage, search, ui

**Gather**: category, feature name, release date, description (2–3 sentences), doc link (optional), "What's new" bullets (optional), keywords (confirm with user before creating file).

**File**: `blog-service/YYYY-MM-DD-{category}.md`

**Frontmatter**:
```yaml
---
title: {Feature Description} ({Category Label})
image: https://assets-www.sumologic.com/company-logos/_800x418_crop_center-center_82_none/SumoLogic_Preview_600x600.jpg?mtime=1617040082
keywords:
  - {keyword1}
hide_table_of_contents: true
---
```

**Title**: Feature description in Title Case + category label in parentheses. No date in title.
- apps → (Apps) | collection → (Collection) | manage → (Manage) | search → (Search) | ui → (New UI)

**Content**:
```markdown
{Description — what the feature is and why it matters}

**What's new:**
* {Specific capability}

[Learn more](/docs/path/to/doc).
```

"What's new:" is optional — use for multiple specific changes, omit for single-point announcements. Only add `import useBaseUrl` if the content uses it.

**Validation**:
- [ ] `blog-service/YYYY-MM-DD-{category}.md`
- [ ] Title: feature description + category label in parens, no date
- [ ] `hide_table_of_contents: true`
- [ ] Keywords confirmed with user
- [ ] Doc link uses `/docs/...` relative path

---

## Collector (`blog-collector/`)

**File**: `blog-collector/YYYY-MM-DD-{type}.md` (`-installed` or `-otel`)

### Installed Collector

**Gather**: version number (X.Y.Z-N), release date, list of security fixes / bug fixes / features.

**Frontmatter**:
```yaml
---
title: Installed Collector Version {X.Y.Z-N}
image: https://assets-www.sumologic.com/company-logos/_800x418_crop_center-center_82_none/SumoLogic_Preview_600x600.jpg?mtime=1617040082
hide_table_of_contents: true
keywords:
  - installed-collector
---
```

**Content**:
```markdown
In this release, we've enhanced the security and stability of the Collector with added support for {security patches/bug fixes/features}.

#### Security fix

* Upgraded `{package}` to version **{version}** to address known security vulnerability ({CVE-YYYY-NNNNN}).

#### Bug fix

* {Bug fix description}.
```

- Sections use H4 (`####`). Order: Security fix → Bug fix → Feature.
- Package names in backticks, version numbers in **bold**.
- Include CVE/GHSA references (CVE-YYYY-NNNNN or GHSA-XXXX-XXXX-XXXX).
- Keywords are always `installed-collector` — no user confirmation needed.

**Validation**:
- [ ] Title: "Installed Collector Version X.Y.Z-N"
- [ ] H4 sections in correct order (Security → Bug → Feature)
- [ ] Versions in **bold**, packages in backticks
- [ ] CVE/GHSA references where applicable

### OpenTelemetry Collector

**Gather**: feature name, release date, description (focus on user benefit), doc link.

**Frontmatter**:
```yaml
---
title: {Feature Name}
image: https://assets-www.sumologic.com/company-logos/_800x418_crop_center-center_82_none/SumoLogic_Preview_600x600.jpg?mtime=1617040082
hide_table_of_contents: true
keywords:
  - opentelemetry-collector
---
```

**Content**:
```markdown
import useBaseUrl from '@docusaurus/useBaseUrl';

We're excited to announce {feature description}. {Benefits}. [Learn more](/docs/path/to/doc).
```

Start with "We're excited to announce..." or "We're excited to introduce...". Keywords are always `opentelemetry-collector` — no user confirmation needed. Use admonitions for important notes or breaking changes.

**Validation**:
- [ ] Starts with "We're excited to..."
- [ ] "Learn more" link with relative path
- [ ] Keywords: `opentelemetry-collector`

---

## Cloud SIEM (`blog-cse/`)

**File**: `blog-cse/YYYY-MM-DD-{type}.md` (`-content` or `-application`)

Always include `import useBaseUrl from '@docusaurus/useBaseUrl';` after frontmatter.

### Content release

**Gather**: release date, new/updated rules (IDs and names), log mappers, parsers, 3–5 high-level summary points, keywords (confirm with user; default: rules, log mappers, parsers).

**Frontmatter**:
```yaml
---
title: {Month} {Day ordinal}, {Year} - Content Release
hide_table_of_contents: true
keywords:
  - rules
  - log mappers
  - parsers
image: https://assets-www.sumologic.com/company-logos/_800x418_crop_center-center_82_none/SumoLogic_Preview_600x600.jpg?mtime=1617040082
---
```

Title uses ordinal suffix (12th, 3rd, 21st). Full month name, not abbreviated. Examples: "March 19th, 2026 - Content Release", "February 3rd, 2026 - Content Release".

**Content**:
```markdown
This content release includes:
    - {Summary point 1}
    - {Summary point 2}

Additional changes are enumerated below.

### Rules
* [New] MATCH-SXXXX Rule Name.
* [Updated] FIRST-SXXXX Rule Name. Brief description of what changed.

### Log Mappers
* [New] Vendor - Event Type.

### Parsers
* [Updated] /Parsers/System/Vendor/Parser Name.
```

- Summary bullets use 4-space indentation.
- `[New]` or `[Updated]` tag on every item.
- Rule ID formats: `MATCH-SXXXX`, `FIRST-SXXXX`, `THRESHOLD-SXXXX`, `AGGREGATION-SXXXX`, `CHAIN-SXXXX`, `OUTLIER-SXXXX`
- Parser paths use full hierarchy: `/Parsers/System/Vendor/Name`
- Log mapper format: `Vendor - Event Type`
- Sort alphabetically within each section.
- Do not invent rule IDs — ask the user if not provided.

### Application release

**Gather**: release date, features with descriptions and doc links, screenshots (if applicable), keywords (confirm with user).

**Frontmatter**:
```yaml
---
title: {Month} {Day}, {Year} - Application Update
image: https://assets-www.sumologic.com/company-logos/_800x418_crop_center-center_82_none/SumoLogic_Preview_600x600.jpg?mtime=1617040082
keywords:
  - {keyword}
hide_table_of_contents: true
---
```

**Content**:
```markdown
### {Feature Name}

{Description and business value}. [Learn more](/docs/path/to/docs).
```

H3 for each feature. Add screenshots with `<img src={useBaseUrl('img/path')} alt="description" />` for UI changes.

**Validation (both CSE types)**:
- [ ] `blog-cse/YYYY-MM-DD-{type}.md`
- [ ] Title uses ordinal suffix for content releases
- [ ] `import useBaseUrl` included
- [ ] `hide_table_of_contents: true`
- [ ] Content: `[New]`/`[Updated]` tags on all items; parser paths complete
- [ ] Keywords confirmed with user

---

## Cloud SOAR (`blog-csoar/`)

**File**: `blog-csoar/YYYY-MM-DD-{subtype}.md`
- Content release: `YYYY-MM-DD-content-release.md`
- Application update: `YYYY-MM-DD-application-update.md`

Always include `import useBaseUrl from '@docusaurus/useBaseUrl';` after frontmatter.

**Date format in title**: "Month DD, YYYY" — full month name, zero-padded day, no ordinal. Examples: "March 06, 2026" ✅, "March 6, 2026" ❌, "March 6th, 2026" ❌.

Application Updates are published early the following month for the previous month's changes. Filename and title use the publication date; the H2 header and intro use the release month.

**Keywords** (confirm with user):
- Content release: `automation service`, `cloud soar`, `soar`
- Application update: `automation service`, `cloud soar`

**Integration doc path**: `/docs/platform-services/automation-service/app-central/integrations/{slug}/`

### Content release

**Frontmatter**:
```yaml
---
title: {Month DD, YYYY} - Content Release
hide_table_of_contents: true
image: https://assets-www.sumologic.com/company-logos/_800x418_crop_center-center_82_none/SumoLogic_Preview_600x600.jpg?mtime=1617040082
keywords:
  - automation service
  - cloud soar
  - soar
---
```

**Content**:
```markdown
This release introduces {what's new}.

### Integrations

* [New] [Integration Name](/docs/platform-services/automation-service/app-central/integrations/{slug}/)
* [Updated] [Integration Name](/docs/platform-services/automation-service/app-central/integrations/{slug}/)

### Playbooks

* [New] {ID} - {Playbook Title}
```

Integration entries are link-only — no descriptions. Playbooks section is optional.

### Application update

**Frontmatter**:
```yaml
---
title: {Month DD, YYYY} - Application Update
hide_table_of_contents: true
image: https://assets-www.sumologic.com/company-logos/_800x418_crop_center-center_82_none/SumoLogic_Preview_600x600.jpg?mtime=1617040082
keywords:
  - automation service
  - cloud soar
---
```

**Content**:
```markdown
## {Release month} release

Following are the updates made in {Month} {YYYY}.

### Changes and enhancements

#### Integrations

* [Added] [Integration Name](/docs/path/) - Description of what was added.
* [Updated] [Integration Name](/docs/path/) - Description of what was updated.

#### Platform

* Platform enhancement description.

### Bug Fixes

#### Integrations

* In the [Integration Name](/docs/path/) integration, description of fix.

#### Platform

Fixed an issue where {description}.
```

Integration changes use `[Added]` for new integrations, `[Updated]` for existing. Always include descriptions (unlike content releases).

**Validation (both SOAR types)**:
- [ ] `blog-csoar/`; filename uses full suffix (`-content-release.md` or `-application-update.md`)
- [ ] Title: "Month DD, YYYY" format (zero-padded, no ordinal)
- [ ] `import useBaseUrl` included
- [ ] `hide_table_of_contents: true`
- [ ] Keywords confirmed with user
- [ ] Application update: H2 header uses release month, not publication month

---

## Developer (`blog-developer/`)

**Gather**: title/topic, release date, content (what changed, why it matters, impact), doc links, keywords (optional; ask user).

**File**: `blog-developer/YYYY-MM-DD-{slug}.md`

Slug: lowercase, hyphens, 3–5 words. Examples: `api-endpoints`, `india-datacenter-deprecation`, `python-sdk-v2`.

**Frontmatter**:
```yaml
---
title: {Month Day, YYYY} - {Topic}
image: https://assets-www.sumologic.com/company-logos/_800x418_crop_center-center_82_none/SumoLogic_Preview_600x600.jpg?mtime=1617040082
hide_table_of_contents: true
---
```

**Title format**: "Month Day, YYYY - Topic" — full month, no ordinal. Examples: "April 9, 2025" ✅, "April 9th, 2025" ❌, "Apr 9, 2025" ❌.

**Content**:
```markdown
{Main paragraph — what changed, why it matters}

#### {Subsection if needed}

* {Item}
```

- H4 (`####`) for subsections.
- `:::warning` admonitions for breaking changes.
- Doc links always use relative paths (`/docs/...`).
- Only add `import useBaseUrl` if content uses images.

**Validation**:
- [ ] `blog-developer/YYYY-MM-DD-{slug}.md`
- [ ] Title: "Month Day, YYYY - Topic" (no ordinal)
- [ ] `hide_table_of_contents: true`
- [ ] Breaking changes clearly marked
- [ ] Doc links use relative paths
