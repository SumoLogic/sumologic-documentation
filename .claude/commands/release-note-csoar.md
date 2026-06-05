# Create New Cloud SOAR Release Note

Creates a Cloud SOAR (Automation Service) release note — either a content release (new integrations and playbooks) or an application update (platform features, enhancements, bug fixes).

## Workflow

### Step 1: Determine release type

Ask the user: **Content release** (new/updated integrations and playbooks) or **Application update** (platform features, enhancements, bug fixes — published early the following month)?

### Step 2: Gather information

**For content releases:**
- Publication date (YYYY-MM-DD)
- New/updated integrations (names and doc links)
- New playbooks (ID numbers and titles)
- Keywords (confirm with user; default: automation service, cloud soar, soar)

**For application updates:**
- Publication date (YYYY-MM-DD) — typically early the month following the release month
- Release month (e.g. "February" if published in March)
- Integration changes with descriptions
- Platform changes
- Bug fixes
- Keywords (confirm with user; default: automation service, cloud soar)

### Step 3: Create the file

**File**:
- Content release: `blog-csoar/YYYY-MM-DD-content-release.md`
- Application update: `blog-csoar/YYYY-MM-DD-application-update.md`

Always include `import useBaseUrl from '@docusaurus/useBaseUrl';` after frontmatter.

**Date format in title**: "Month DD, YYYY" — full month name, zero-padded day, no ordinal.
- ✅ "March 06, 2026" | ❌ "March 6, 2026" | ❌ "March 6th, 2026"

**Integration doc path**: `/docs/platform-services/automation-service/app-central/integrations/{slug}/`

If a file already exists, ask the user to use a different date or append.

---

#### Content release

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

---

#### Application update

Application Updates cover the previous month's changes. Filename and title use the publication date; the H2 header and intro use the release month.

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

Integration changes use `[Added]` for new integrations, `[Updated]` for existing — always include descriptions (unlike content releases).

### Step 4: Validate

- [ ] Filename uses full suffix (`-content-release.md` or `-application-update.md`)
- [ ] Title: "Month DD, YYYY" format (zero-padded, no ordinal)
- [ ] `import useBaseUrl` included
- [ ] `hide_table_of_contents: true`
- [ ] Keywords confirmed with user
- [ ] Application update: H2 header uses release month, not publication month
- [ ] No trailing whitespace
