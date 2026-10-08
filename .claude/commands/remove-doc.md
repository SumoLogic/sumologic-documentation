# Remove or Move Doc — Safe Deprecation Workflow

Automates the complete workflow for removing or moving a Sumo Logic doc while preventing broken links and maintaining SEO health.

## What this command does

When you invoke `/remove-doc`, Claude will guide you through:

1. **Create 301 redirect**. Add redirect mapping to `cid-redirects.json`.
2. **Update internal links**. Find and replace all references to the old URL.
3. **Remove from hub pages**. Delete card from parent `index.md` and Product List.
4. **Delete the doc file**. Remove the actual markdown file.
5. **Remove from navigation**. Delete entry from `sidebars.ts`.
6. **Optional steps**. Add deprecation notes, hide from search engines.

## When to use this command

* Deprecating legacy docs in favor of new versions.
* Consolidating duplicate content.
* Removing outdated documentation.
* Moving docs to new locations.

## Workflow

### Step 1: Gather information

Ask the user for:
* **Old doc path**: The file path being removed (e.g., `docs/integrations/web-servers/nginx-legacy.md`).
* **New doc path**: The replacement doc path (e.g., `docs/integrations/web-servers/nginx.md`).
* **Reason**: Why the doc is being removed (for context).

### Step 2: Create 301 redirect

1. Read `cid-redirects.json`.
2. Convert the old file path to a URL path (remove `docs/` prefix, remove `.md` extension).
3. Convert the new file path to a URL path.
4. Add the redirect mapping:
   ```json
   "/docs/old-path": "/docs/new-path",
   ```
5. Validate JSON syntax after adding.

**Safety check**: Ensure the new doc path actually exists before creating the redirect.

### Step 3: Update internal links

1. Use Grep to search for references to the old URL across all docs:
   - Search for the old file path (without `docs/` and `.md`).
   - Search for relative path variations.
   - Search for `useBaseUrl` references.
2. Show the user all files that reference the old URL.
3. For each file, replace old URL with new URL (one by one, not Find All > Replace All).
4. Check for references in:
   - Other markdown docs.
   - Parent hub/index pages.
   - Product List (`docs/integrations/product-list/`).

**Warning**: Never do a Find All > Replace All blindly, as this can break image paths or other unrelated URLs.

### Step 4: Delete the doc file

1. Confirm with the user that all links have been updated.
2. Delete the markdown file at the old path.
3. Verify deletion was successful.

### Step 5: Remove from navigation

1. Read `sidebars.ts`.
2. Search for the old doc ID or path.
3. Remove the entry from the sidebar configuration.
4. Validate the sidebar structure after removal.

### Step 6: Optional enhancements

Ask the user if they want to:

**Add deprecation note**:
* Add an admonition to the new doc stating the legacy doc has been deprecated:
  ```markdown
  :::note
  The legacy [Old Doc Name] has been deprecated. This doc replaces it.
  :::
  ```

**Hide from search engines** (if urgent):
* Inform the user that Google can take months to drop old URLs.
* Suggest opening a GitHub Issue for immediate removal if needed.
* Reference: https://support.google.com/webmasters/answer/9689846.

**Exclude from build** (nuclear option):
* If the doc should never be published, add its path to `docs.exclude` in `docusaurus.config.js`.
* Only use this if the redirect is not sufficient.

### Step 7: Verification checklist

Before finishing, verify:
* [ ] 301 redirect added to `cid-redirects.json`.
* [ ] All internal links updated.
* [ ] Doc removed from hub pages.
* [ ] Doc file deleted.
* [ ] Entry removed from `sidebars.ts`.
* [ ] JSON files valid (no syntax errors).
* [ ] Build test passes (optional: `yarn build`).

## Example usage

```
User: "Remove the nginx-legacy.md doc and redirect to nginx.md"

Claude:
1. Confirms old path: docs/integrations/web-servers/nginx-legacy.md
2. Confirms new path: docs/integrations/web-servers/nginx.md
3. Adds redirect: "/docs/integrations/web-servers/nginx-legacy": "/docs/integrations/web-servers/nginx"
4. Searches for all references to nginx-legacy
5. Updates links in 3 files
6. Removes from web-servers index.md hub page
7. Deletes nginx-legacy.md
8. Removes from sidebars.ts
9. Asks about deprecation note
10. Provides verification checklist
```

## Safety principles

* **Always create the redirect first** before deleting anything.
* **Verify the new doc exists** before redirecting to it.
* **Update links one by one** to avoid accidental breakage.
* **Validate JSON** after every edit to cid-redirects.json.
* **Confirm with user** before deleting files.
* **Provide rollback instructions** if something goes wrong.

## Common patterns

**Deprecating a legacy app doc**:
```
Old: docs/integrations/vendor/product-legacy.md
New: docs/integrations/vendor/product.md
Also check: docs/integrations/product-list/ (remove old entry)
```

**Moving to a new category**:
```
Old: docs/send-data/sources/old-location.md
New: docs/send-data/hosted-collectors/sources/new-location.md
Update: Both sidebars and any tutorial references
```

**Consolidating multiple docs into one**:
```
Old: [doc1.md, doc2.md, doc3.md]
New: unified-doc.md
Create: Multiple redirects, all pointing to unified-doc.md
```

## Error handling

**If a redirect already exists**:
* Check if it's correct.
* Update if needed.
* Warn the user about potential conflicts.

**If internal links cannot be found**:
* The doc might be orphaned (not linked anywhere).
* Still remove from sidebar and delete the file.
* Log that no internal links were found.

**If JSON becomes invalid**:
* Show the syntax error.
* Revert the change.
* Fix and retry.

## Post-completion message

After successfully removing a doc, tell the user:

```
✅ Doc removal complete!

Summary:
* Added 301 redirect: /old-path → /new-path
* Updated X internal links across Y files
* Removed from hub page and sidebar
* Deleted old doc file

Next steps:
1. Test locally: yarn start
2. Verify redirect works
3. Submit PR with description: "DOCS-XXX - Remove deprecated [doc name]"
4. Note: Google may take weeks to update search results

Would you like me to run a build test or create a commit?
```

## References

* [Contributing guide: Move or Remove a Doc](/docs/contributing/remove-doc).
* [CID redirects documentation](/docs/contributing/create-edit-doc#step-6-create-cid-url).
* [Sidebar configuration patterns](.claude/skills/docusaurus/).
