# Create New Collector Release Note

Automates the creation of Collector release notes for Installed Collector versions and OpenTelemetry features.

## What this command does

When you invoke `release-note-collector`, Claude will guide you through:

1. **Determine release type**. Installed Collector version or OpenTelemetry feature
2. **Gather release details**. Version number, changes, features, or fixes
3. **Create markdown file**. Generate file with proper frontmatter and structure
4. **Format content**. Apply correct formatting for version releases or features
5. **Validate and preview**. Check structure and provide next steps

## When to use this command

* Publishing new Installed Collector versions with bug or security fixes.
* Announcing OpenTelemetry collector features and improvements.
* Documenting collector version updates.
* Releasing new OpenTelemetry integrations or capabilities.

## Release types

### Installed Collector Release (`-installed.md`)

For Installed Collector version releases:
* **Version numbers**: Format X.Y.Z-N (e.g., 19.535-6).
* **Security fixes**: CVE patches, dependency upgrades.
* **Bug fixes**: Issue resolutions and stability improvements.
* **Minor features**: Small enhancements in collector behavior.

**Typical cadence**: As needed when versions ship

### OpenTelemetry Release (`-otel.md`)

For OpenTelemetry collector features:
* **New features**: Installation methods, integrations, capabilities.
* **Improvements**: Performance enhancements, reliability updates.
* **Announcements**: CDN changes, configuration updates.

**Typical cadence**: As features are released

## Workflow

### Step 1: Gather information

Ask the user for:

**For Installed Collector releases:**
* **Version number**: Full version (e.g., 19.535-6).
* **Release date**: Date in YYYY-MM-DD format.
* **Changes**: List of security fixes, bug fixes, or features.

**For OpenTelemetry releases:**
* **Feature name**: Name of the feature or update.
* **Release date**: Date in YYYY-MM-DD format.
* **Description**: What it does and why it matters (2-3 sentences).
* **Documentation link**: Relative path to the doc.

**Validate:**
* Check that date is not in the future.
* For installed releases, validate version number format.
* For OTel releases, ensure documentation link exists.

### Step 2: Create the markdown file

**File naming convention:**
```
blog-collector/YYYY-MM-DD-{type}.md
```

Examples:
* `blog-collector/2026-03-19-installed.md`.
* `blog-collector/2026-03-19-otel.md`.

**Important**: Files are created in `/blog-collector/` directory

### Step 3: Generate frontmatter

**For Installed Collector releases:**
```yaml
---
title: Installed Collector Version {X.Y.Z-N}
image: https://assets-www.sumologic.com/company-logos/_800x418_crop_center-center_82_none/SumoLogic_Preview_600x600.jpg?mtime=1617040082
hide_table_of_contents: true
keywords:
  - installed-collector
---
```

**For OpenTelemetry releases:**
```yaml
---
title: {Feature Name}
image: https://assets-www.sumologic.com/company-logos/_800x418_crop_center-center_82_none/SumoLogic_Preview_600x600.jpg?mtime=1617040082
hide_table_of_contents: true
keywords:
  - opentelemetry-collector
---
```

**Title formatting:**
* Installed: "Installed Collector Version X.Y.Z-N"
* OTel: Feature name in Title Case (no category suffix)

**Keywords:**
* Installed Collector: Always use `installed-collector`
* OpenTelemetry: Always use `opentelemetry-collector`
* These keywords are standard and do not need user confirmation

### Step 4: Add required import

For OpenTelemetry releases that use links or useBaseUrl:
```javascript
import useBaseUrl from '@docusaurus/useBaseUrl';
```

**Note**: Only add if content uses it. For simple version releases, omit.

### Step 5: Write content

#### Installed Collector Release Structure

```markdown
In this release, we've enhanced the security and stability of the Collector with added support for security patches.

#### Security fix

* {Security fix description with version numbers and CVE references}.
* {Additional security fixes}.

#### Bug fix

* {Bug fix description}.
* {Additional bug fixes}.
```

**Installed Collector Guidelines:**
* Start with standard intro: "In this release, we've enhanced the security and stability of the Collector with added support for {security patches/bug fixes/features}."
* Use H4 (`####`) for section headings: Security fix, Bug fix, Feature
* List items use bullet points with dashes.
* Include specific version numbers for dependencies.
* Reference CVE numbers when applicable (format: CVE-YYYY-NNNNN or GHSA-XXXX-XXXX-XXXX)
* Keep descriptions concise (one sentence per item).
* Order: Security fixes first, then bug fixes, then features

**Example:**
```markdown
In this release, we've enhanced the security and stability of the Collector with added support for security patches.

#### Security fix

* Upgraded `io.netty:netty-codec-http` to version **4.1.129.Final** to address known security vulnerability (CVE-2025-67735).
* Upgraded `com.fasterxml.jackson.core` packages to use patched version **2.18.6** to address known security vulnerability (GHSA-72hv-8253-57qq).

#### Bug fix

* Fixed an issue with forwarded Windows event collection that occurred on systems running with latest Windows version.
```

#### OpenTelemetry Release Structure

```markdown
We're excited to {announce/introduce} {feature description}. {What it does and benefits}. [Learn more](/docs/path/to/doc).

{Optional: Additional paragraphs with more details}

{Optional: Related documentation list}

{Optional: Important notes in admonition}
```

**OpenTelemetry Guidelines:**
* Start with "We're excited to announce..." or "We're excited to introduce...".
* Write 2-3 sentences in first paragraph.
* Focus on user benefits and business value.
* End first paragraph with "Learn more" link.
* Can include additional paragraphs for context.
* Use relative paths for documentation links (start with `/docs/`).
* Add admonitions for important notes or breaking changes.

**Example (Feature announcement):**
```markdown
import useBaseUrl from '@docusaurus/useBaseUrl';

We're excited to announce that you can now convert Installed Collector (IC) local file sources to OpenTelemetry (OTel) source templates for a more modern, scalable, and consistent data collection experience. This conversion helps future-proof your setup, making it easier to manage collectors at scale while benefiting from ongoing OTel improvements and support. [Learn more](/docs/send-data/installed-collectors/sources/convert-ic-local-file-source-to-otel-st/).
```

**Example (Infrastructure change):**
```markdown
import useBaseUrl from '@docusaurus/useBaseUrl';

We're excited to announce that the OpenTelemetry collector installation files can now be downloaded from a CDN for Chef, Puppet, and Ansible. This change improves download reliability, performance, and availability while maintaining the same installation experience.

Refer to the following documentation to view the updated URLs in the UI.
* [Ansible](/docs/send-data/opentelemetry-collector/install-collector/ansible/).
* [Chef](/docs/send-data/opentelemetry-collector/install-collector/chef/).
* [Puppet](/docs/send-data/opentelemetry-collector/install-collector/puppet/).

:::note
* Existing OpenTelemetry binaries and other packages remain in their current locations.
* This change does not affect the UI itself. The download process looks the same, but the underlying URL now uses a CDN to improve reliability and speed.
:::
```

### Step 6: Validation checklist

Before finishing, verify:
* [ ] File created in `/blog-collector/` directory.
* [ ] Filename follows pattern: `YYYY-MM-DD-{type}.md`
* [ ] Frontmatter complete with all required fields.
* [ ] Title format correct (version number or feature name).
* [ ] `hide_table_of_contents: true` present
* [ ] Keywords correct for type (installed-collector or opentelemetry).
* [ ] For installed: Sections use H4 (`####`), proper order (Security → Bug → Feature)
* [ ] For installed: Version numbers in **bold** format
* [ ] For installed: CVE/GHSA references included where applicable
* [ ] For OTel: Starts with "We're excited to..."
* [ ] For OTel: "Learn more" link included with relative path
* [ ] No trailing whitespace.

## Example usage

### Installed Collector Example

```
User: "Create a Collector release note for version 19.535-8 with a security fix for Netty and a bug fix for Windows events"

Claude:
1. Confirms type: Installed Collector
2. Confirms date: 2026-03-19
3. Creates: blog-collector/2026-03-19-installed.md
4. Generates frontmatter: "Installed Collector Version 19.535-8"
5. Adds standard intro paragraph
6. Creates Security fix section with Netty upgrade
7. Creates Bug fix section with Windows events fix
8. Provides checklist
```

### OpenTelemetry Example

```
User: "Create an OTel Collector release note about new Kubernetes monitoring support"

Claude:
1. Confirms type: OpenTelemetry
2. Confirms date: 2026-03-19
3. Asks for description and doc link
4. Creates: blog-collector/2026-03-19-otel.md
5. Generates frontmatter: "Kubernetes Monitoring Support"
6. Writes announcement with feature benefits
7. Adds "Learn more" link
8. Provides checklist
```

## Version number format

Installed Collector versions follow this pattern:
```
Major.Minor.Patch-Build
```

Examples:
* `19.535-6` — Version 19.535, build 6.
* `19.535-4` — Version 19.535, build 4.
* `20.0-1` — Version 20.0, build 1.

**Formatting in title:**
* Always include full version with build number.
* No spaces around hyphen.
* Example: "Installed Collector Version 19.535-6"

## Dependency upgrade format

When listing upgraded dependencies:
* Use backticks for package names.
* Use **bold** for version numbers.
* Include full CVE or GHSA reference if applicable.

**Examples:**
* ✅ `io.netty:netty-codec-http` to version **4.1.129.Final** to address known security vulnerability (CVE-2025-67735)
* ✅ `com.fasterxml.jackson.core` packages to use patched version **2.18.6** (GHSA-72hv-8253-57qq).
* ✅ Collector JRE to **Amazon Corretto Version 17.0.18.8.1**.
* ❌ Upgraded netty-codec-http to 4.1.129.Final (missing backticks and bold).

## Safety principles

* **Check existing files** before creating to avoid duplicates.
* **Validate version numbers** follow the correct format.
* **Verify CVE/GHSA references** are accurate.
* **Use consistent formatting** for dependencies and versions.
* **Keep installed releases brief**. Just the facts.
* **Focus OTel releases on benefits** not technical details.

## Post-completion message

After successfully creating the release note, tell the user:

**For Installed Collector:**
```
✅ Installed Collector release note created successfully!

File created:
* 📄 blog-collector/{date}-installed.md.

Summary:
* Version: {version}
* Security fixes: {count}
* Bug fixes: {count}

Next steps:
1. Review CVE/GHSA references for accuracy
2. Verify version numbers are correct
3. Ensure all fixes are documented
4. Test locally: yarn start
5. Check preview at: http://localhost:3000/release-notes-collector
6. Submit PR: "DOCS-XXX - Installed Collector {version} release notes"

Checklist:
* [ ] Version number is correct.
* [ ] All security vulnerabilities referenced.
* [ ] Dependencies use backticks and bold versions.
* [ ] Bug fixes are complete.

The release note will appear on the Collector release notes page in reverse chronological order (newest first).
```

**For OpenTelemetry:**
```
✅ OpenTelemetry Collector release note created successfully!

File created:
* 📄 blog-collector/{date}-otel.md.

Summary:
* Feature: {Feature Name}
* Keywords: opentelemetry

Next steps:
1. Review content for accuracy and clarity
2. Verify documentation link is correct
3. Ensure feature name and description are clear
4. Test locally: yarn start
5. Check preview at: http://localhost:3000/release-notes-collector
6. Submit PR: "DOCS-XXX - OTel Collector: {Feature Name}"

Checklist:
* [ ] Feature name is clear and concise.
* [ ] Description focuses on user benefits.
* [ ] Documentation link is correct.
* [ ] No placeholder text remaining.

The release note will appear on the Collector release notes page in reverse chronological order (newest first).

Would you like me to help refine the description or add additional details?
```

## Error handling

**If file already exists:**
* Show existing file content.
* Ask if user wants to:
  * Use different type (installed vs otel).
  * Use different date.
  * Overwrite (requires confirmation).

**If version number format is invalid:**
* Show expected format: X.Y.Z-N
* Ask for correction.

**If CVE/GHSA reference looks incomplete:**
* Warn about format.
* Ask for confirmation.

**If documentation link looks wrong (OTel):**
* Warn if does not start with `/docs/`.
* Suggest correction.

## Tips and best practices

**Installed Collector releases:**
* Be specific about what was fixed or upgraded.
* Include exact version numbers.
* Reference CVEs and GHSAs when applicable.
* Keep descriptions factual and brief.
* Order matters: Security → Bugs → Features

**OpenTelemetry releases:**
* Lead with user benefit.
* Explain why the change matters.
* Link to comprehensive documentation.
* Use admonitions for breaking changes or important notes.

**Both types:**
* Use consistent formatting throughout.
* Keep language simple and direct.
* Avoid unnecessary technical jargon.
* Focus on what changed, not how it was implemented.

## References

* [Collector Release Notes](https://sumologic.com/help/release-notes-collector)
* [Release Notes Index](/docs/release-notes).
* [Style Guide](/docs/contributing/style-guide).
