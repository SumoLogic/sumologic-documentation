# Create New Collector Release Note

Creates a Collector release note — either an Installed Collector version release or an OpenTelemetry Collector feature announcement.

## Workflow

### Step 1: Determine release type

Ask the user: **Installed Collector** (version release with security/bug fixes) or **OpenTelemetry Collector** (feature announcement)?

### Step 2: Gather information

**For Installed Collector:**
- Version number (X.Y.Z-N format, e.g. 19.535-6)
- Release date (YYYY-MM-DD)
- List of security fixes, bug fixes, and/or features

**For OpenTelemetry Collector:**
- Feature name
- Release date (YYYY-MM-DD)
- Description (focus on user benefit, 2–3 sentences)
- Doc link (relative path)

### Step 3: Create the file

**File**: `blog-collector/YYYY-MM-DD-{type}.md` — type is `-installed` or `-otel`

If a file already exists for the same date and type, ask the user to use a different date or append.

---

#### Installed Collector

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
- Include CVE/GHSA references where applicable (CVE-YYYY-NNNNN or GHSA-XXXX-XXXX-XXXX).
- Keywords are always `installed-collector` — no confirmation needed.

---

#### OpenTelemetry Collector

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

- Start with "We're excited to announce..." or "We're excited to introduce..."
- Keywords are always `opentelemetry-collector` — no confirmation needed.
- Use admonitions for important notes or breaking changes.

### Step 4: Validate

**Installed Collector:**
- [ ] `blog-collector/YYYY-MM-DD-installed.md`
- [ ] Title: "Installed Collector Version X.Y.Z-N"
- [ ] H4 sections in correct order (Security → Bug → Feature)
- [ ] Versions in **bold**, packages in backticks
- [ ] CVE/GHSA references where applicable

**OpenTelemetry Collector:**
- [ ] `blog-collector/YYYY-MM-DD-otel.md`
- [ ] Starts with "We're excited to..."
- [ ] "Learn more" link with relative path
- [ ] Keywords: `opentelemetry-collector`
