# Create New Doc

Automates the creation of general Sumo Logic documentation for features, how-tos, concepts, reference pages, and troubleshooting guides.

## What this command does

When you invoke `doc`, Claude will guide you through:

1. **Determine doc type**. Feature, how-to, concept, reference, or troubleshooting.
2. **Gather information**. Title, description, file path, and keywords.
3. **Create markdown file**. Generate file with proper frontmatter and basic structure.
4. **Add to navigation**. Guide on adding to sidebars.ts.
5. **Add to hub page**. Suggest adding card to parent index page.
6. **Create CID mapping**. Add permanent URL if needed for UI links.
7. **Validate and preview**. Check structure and provide next steps.

## When to use this command

* Creating feature documentation.
* Writing how-to guides and tutorials.
* Documenting concepts and reference material.
* Creating troubleshooting guides.
* Adding general content that does not fit specialized templates (apps, sources, release notes).

## When NOT to use this command

* **App integrations**. Use `app-doc` instead.
* **Cloud-to-Cloud sources**. Use `c2c-source-doc` instead.
* **Release notes**. Use `release-note-cse` or `release-note-collector` instead.

## Doc types

### Feature Documentation
* Announces and explains product capabilities.
* Covers what it does, why it matters, how to use it.
* Includes configuration steps and examples.

### How-to Guide
* Step-by-step instructions for specific tasks.
* Focuses on practical outcomes.
* Includes prerequisites and validation steps.

### Concept
* Explains ideas, architecture, or background information.
* Provides context for using features.
* Educational and explanatory.

### Reference
* Detailed technical specifications.
* API endpoints, configuration parameters, field lists.
* Structured data meant for lookup.

### Troubleshooting
* Diagnoses and resolves common issues.
* Problem-symptom-solution format.
* Includes error messages and fixes.

## Workflow

### Step 1: Gather information

Ask the user for:

**Required:**
* **Doc type**: Feature, how-to, concept, reference, or troubleshooting.
* **Title**: Page title in Title Case (60 characters max for SEO).
* **File path**: Where to save the file (e.g., `docs/manage/security/access-keys.md`).
* **Description**: One or two sentences for search engines and metadata.

**Optional:**
* **Keywords**: Terms for SEO and search (3-5 recommended).
* **Sidebar label**: Alternative text for sidebar navigation (if different from title).
* **CID needed**: Whether this doc needs a permanent URL for UI links.
* **Hub page**: Whether to add a card to a parent index page.

**Validate:**
* Title is under 60 characters.
* File path follows repo conventions (`docs/{category}/{filename}.md`).
* File does not already exist.
* Keywords are relevant and not duplicated.

### Step 2: Create the markdown file

**File naming convention:**
* Use kebab-case: `feature-name.md`, `how-to-do-task.md`.
* Avoid abbreviations in filenames.
* Keep names descriptive but concise.

**File location patterns:**
* Features: `docs/{product-area}/{feature-name}.md`
* How-tos: `docs/{category}/guides/{task-name}.md` or with related content
* Concepts: `docs/{category}/concepts/{concept-name}.md` or with related content
* Reference: `docs/{category}/reference/{topic-name}.md` or with related content
* Troubleshooting: `docs/{category}/troubleshooting.md` or in section with related content

### Step 3: Generate frontmatter

**Standard frontmatter:**
```yaml
---
id: page-slug
title: Page Title in Title Case
sidebar_label: Short Label
description: One or two sentences describing what this page covers.
keywords:
  - keyword1
  - keyword2
  - keyword3
---
```

**Field guidelines:**
* **id**: Required. Use kebab-case, matches filename without `.md`.
* **title**: Required. Title Case, under 60 characters, includes main keywords.
* **sidebar_label**: Optional. Use if title is too long for sidebar.
* **description**: Required for SEO. One or two sentences, under 160 characters.
* **keywords**: Optional but recommended. 3-5 relevant terms for search.

**Special frontmatter cases:**

For docs not ready to publish:
```yaml
---
id: page-slug
title: Page Title
description: Description text.
robots: noindex, nofollow
---
```

For hub/index pages:
```yaml
---
slug: /category-name
title: Category Name
description: Description text.
---
```

### Step 4: Add required import

If the doc will use images or links with `useBaseUrl`:
```javascript
import useBaseUrl from '@docusaurus/useBaseUrl';
```

### Step 5: Write content structure

#### Feature Documentation Structure

```markdown
Brief introduction explaining what the feature is and why it matters (1-2 paragraphs).

## About [Feature Name]

Detailed explanation of the feature, its benefits, and use cases.

## Prerequisites

* Requirement 1.
* Requirement 2.

## Configure [Feature Name]

Step-by-step instructions:

1. First step.
1. Second step.
1. Third step.

## Example

Concrete example showing the feature in use.

## Limitations

* Limitation 1.
* Limitation 2.

## Additional information

* [Related Doc 1](/docs/path/to/doc).
* [Related Doc 2](/docs/path/to/doc).
```

#### How-to Guide Structure

```markdown
Brief introduction explaining what you will accomplish (1 paragraph).

## Prerequisites

* Requirement 1.
* Requirement 2.

## Step 1: [Action]

Detailed instructions for first major step.

## Step 2: [Action]

Detailed instructions for second major step.

## Step 3: [Action]

Detailed instructions for third major step.

## Verify

How to confirm the task was completed successfully.

## Next steps

* [What to do next](/docs/path/to/doc).
* [Related tasks](/docs/path/to/doc).
```

#### Concept Structure

```markdown
Brief introduction explaining the concept (1-2 paragraphs).

## Key concepts

* **Term 1**: Definition and explanation.
* **Term 2**: Definition and explanation.

## How it works

Detailed explanation of the concept, architecture, or workflow.

## Use cases

When and why you would use this.

## Best practices

* Best practice 1.
* Best practice 2.

## Additional information

* [Related concept](/docs/path/to/doc).
* [How-to guide](/docs/path/to/doc).
```

#### Reference Structure

```markdown
Brief introduction explaining what this reference covers (1 paragraph).

## [Category 1]

| Parameter | Type | Description | Required |
|-----------|------|-------------|----------|
| param1 | string | Description | Yes |
| param2 | number | Description | No |

## [Category 2]

Detailed specifications, lists, or technical details.

## Examples

```language
code example
```

## Additional information

* [API overview](/docs/path/to/doc).
* [Getting started](/docs/path/to/doc).
```

#### Troubleshooting Structure

```markdown
Brief introduction to common issues covered (1 paragraph).

## Issue 1: [Problem description]

**Symptom**: What the user experiences.

**Cause**: Why this happens.

**Solution**:
1. Step to resolve.
1. Step to verify.

## Issue 2: [Problem description]

**Symptom**: What the user experiences.

**Cause**: Why this happens.

**Solution**:
1. Step to resolve.
1. Step to verify.

## Get help

If you continue to experience issues:
* [Contact Support](https://support.sumologic.com/support/s).
* [Visit Community](https://sumologic.my.site.com/support/s/).
```

### Step 6: Add to sidebars.ts

Guide the user on adding the doc to navigation:

1. Open `sidebars.ts`.
1. Find the appropriate category object.
1. Add the doc ID (without path or extension) to the items array.
1. Maintain alphabetical order within the category (unless ordered by importance).

**Example:**
```typescript
{
  type: 'category',
  label: 'Search',
  items: [
    'search/get-started-with-search',
    'search/mobot',  // new doc added here
    'search/search-cheat-sheets',
    'search/search-query-language',
  ],
},
```

**Note:** The Docs Team can help with sidebar placement. Include suggestions in your PR description.

### Step 7: Add to hub page (if applicable)

If the category has an `index.md` hub page with cards:

1. Open the parent `index.md` file.
1. Find the appropriate section or card grid.
1. Add a new card using the existing card HTML pattern.
1. Maintain alphabetical order or follow the section's organization pattern.

**Card template:**
```html
<div className="box smallbox card">
  <div className="container">
    <a href="/docs/path/to/doc">
      <img src={useBaseUrl('img/icons/icon.png')} alt="icon" width="40"/>
      <h4>Doc Title</h4>
    </a>
    <p>Brief description of what this doc covers.</p>
  </div>
</div>
```

### Step 8: Create CID mapping (if needed)

If this doc needs a permanent URL for UI links:

1. Open `cid-redirects.json`.
1. Scroll to the CID section (lines starting with `"/cid/"`).
1. Find an unused CID number.
1. Add mapping from CID to your doc path (without `docs/` prefix).

**Example:**
```json
"/cid/5122": "/manage/security/access-keys",
```

**Note:** Only create CID if this doc will be linked from the product UI.

### Step 9: Validation checklist

Before finishing, verify:
* [ ] Frontmatter complete with all required fields.
* [ ] Title is Title Case and under 60 characters.
* [ ] Description is under 160 characters.
* [ ] File created in correct `/docs/` subdirectory.
* [ ] Filename uses kebab-case.
* [ ] `import useBaseUrl` included if using images or baseUrl.
* [ ] Content follows appropriate structure for doc type.
* [ ] All list items end with periods.
* [ ] Links use relative paths or `useBaseUrl`.
* [ ] Code blocks specify language.
* [ ] Added to `sidebars.ts` (or noted in PR).
* [ ] Added to hub page card grid (if applicable).
* [ ] CID mapping created (if needed).
* [ ] No negative contractions (use "cannot", "will not", "do not").
* [ ] No trailing whitespace.

## Example usage

### Feature Doc Example

```
User: "Create a doc for the new access keys feature"

Claude:
1. Confirms type: Feature Documentation
2. Gathers info: title, path, description, keywords
3. Creates: docs/manage/security/access-keys.md
4. Generates frontmatter with proper fields
5. Scaffolds feature doc structure
6. Guides on adding to sidebars.ts under Manage category
7. Suggests adding card to docs/manage/security/index.md
8. Asks if CID mapping needed
9. Provides validation checklist
```

### How-to Guide Example

```
User: "Create a how-to guide for installing the OpenTelemetry Collector on Windows"

Claude:
1. Confirms type: How-to Guide
2. Gathers info: title, path, description
3. Creates: docs/send-data/opentelemetry-collector/install-collector/windows.md
4. Generates frontmatter
5. Scaffolds how-to structure with prerequisites and steps
6. Guides on sidebar placement
7. Provides checklist
```

## Common patterns

### File path conventions

* `/docs/alerts/` — Alerting and monitoring features.
* `/docs/api/` — API reference documentation.
* `/docs/apm/` — Application Performance Monitoring and tracing.
* `/docs/cloud-soar/` — Cloud SOAR documentation.
* `/docs/cse/` — Cloud SIEM documentation.
* `/docs/dashboards/` — Dashboard and visualization docs.
* `/docs/get-started/` — Getting started guides and onboarding.
* `/docs/integrations/` — Third-party integrations (use specialized commands).
* `/docs/manage/` — Account and organization management.
* `/docs/metrics/` — Metrics-related features.
* `/docs/observability/` — Observability solutions for AWS and Kubernetes.
* `/docs/platform-services/` — Automation Service and platform features.
* `/docs/search/` — Search and query documentation.
* `/docs/security/` — Security and threat intelligence features.
* `/docs/send-data/` — Data collection and ingestion.

### Sidebar organization

* Most categories are alphabetical.
* Some categories (like Getting Started) are ordered by importance.
* Use existing patterns in the category.
* When in doubt, ask the Docs Team.

### Keywords best practices

* Include the main product or feature name.
* Add relevant use cases or actions.
* Use terms customers search for.
* Avoid overly generic terms.
* Typically 3-5 keywords per doc.

**Examples:**
```yaml
# Good keywords for a chart panel feature doc
keywords:
  - metrics
  - visualization
  - chart panel
  - time series

# Good keywords for a how-to guide
keywords:
  - export data
  - dashboard
  - csv
  - reports
```

## Safety principles

* **Check existing files** before creating to avoid duplicates.
* **Follow existing path conventions** in the category.
* **Use descriptive filenames** that indicate content.
* **Keep titles concise** but clear.
* **Validate frontmatter** has all required fields.
* **Use appropriate structure** for the doc type.

## Post-completion message

After successfully creating the doc, tell the user:

```
✅ Documentation file created successfully!

File created:
* 📄 {file-path}

Summary:
* Type: {doc-type}
* Title: {title}
* Category: {category}

Next steps:
1. Add content to the doc sections
2. Add doc to sidebars.ts:
   * Open sidebars.ts
   * Find the {category} category
   * Add '{doc-id}' to the items array
3. Optional: Add card to hub page at {parent-index-path}
4. Optional: Create CID mapping in cid-redirects.json
5. Preview locally: yarn start
6. Check preview at: http://localhost:3000/docs/{doc-path}
7. Submit PR: "DOCS-XXX - Add {doc-title}"

Checklist:
* [ ] Content complete and follows structure.
* [ ] Added to sidebars.ts.
* [ ] Added to hub page (if applicable).
* [ ] CID mapping created (if needed).
* [ ] All links work.
* [ ] Style guide compliant.

The doc will appear in the navigation menu after you add it to sidebars.ts.

Would you like me to help add content to any specific section?
```

## Error handling

**If file already exists:**
* Show existing file path and title.
* Ask if user wants to:
  * Edit existing file instead.
  * Use different filename.
  * Overwrite (requires confirmation).

**If title is too long:**
* Show character count.
* Suggest shorter alternative.
* Recommend using `sidebar_label` for long titles.

**If path does not follow conventions:**
* Suggest correct path based on category.
* Explain repo conventions.

**If no description provided:**
* Explain importance for SEO.
* Suggest generating description from title.

## Tips and best practices

**General:**
* Start with a clear introduction that sets expectations.
* Use second person ("you") to address readers.
* Keep paragraphs short (2-4 sentences).
* Use active voice.
* Include concrete examples.

**Structure:**
* Use headings to organize content logically.
* Put most important information first.
* Group related information together.
* End with related topics or next steps.

**Links:**
* Link to related docs for additional context.
* Use descriptive link text.
* Prefer relative paths for internal links.
* Test all links work.

**Images:**
* Use images to illustrate UI steps or concepts.
* Always include descriptive alt text.
* Store images in `/static/img/` directory.
* Optimize image file sizes.

**Code:**
* Specify language for syntax highlighting.
* Keep code examples concise and relevant.
* Include comments for complex code.
* Show realistic examples, not placeholders.

## References

* [Style Guide](/docs/contributing/style-guide).
* [Create or Edit a Doc](/docs/contributing/create-edit-doc).
* [Sumo Logic Word List](/docs/contributing/word-list).

---

**Note:** This command is for general documentation. For specialized content types, use the appropriate command:

* **App integrations**. Use `/app-doc` for creating app documentation with standardized templates and structure.
* **Cloud-to-Cloud sources**. Use `/c2c-source-doc` for Cloud-to-Cloud source integration documentation.
* **Release notes**. Use `/release-note-cse`, `/release-note-collector`, `/release-note-csoar`, `/release-note-developer`, or `/release-note-service` for product release notes.
