---
id: release-notes
---

# Release Notes

We keep release notes concise with links to documentation and images for features and updates affecting the user interface.

## Release Notes plain text

To add release notes without images:

1. In the Blog folder, create a new markdown file with the following name format: `YYYY-MM-DD-product.md`.
1. Add the following frontmatter:

    ```markdown
    ---
    title: Product or Feature Name
    tags: [apps, tracing]
    hide_table_of_contents: true
    ---
    ```

    * `title`: Name of the release notes including Product or Feature
    * `tags`: Add a comma-separated list of existing tags, including:
    * `hide-table-of-contents`: Hide the TOC on the page, keeping the notes clean and wide on the page.

1. Document the release notes. Add links, bullets, and images as needed.

## Release Notes with images

To add release notes with images:

1. In the Blog folder, create a new folder with the following name format: `YYYY-MM-DD-product`.
1. In the new folder, create a markdown file named `index.md`. Add your release notes with frontmatter:

    ```markdown
    ---
    title: Product or Feature Name
    tags: [apps, tracing]
    hide_table_of_contents: true
    ---
    ```

    * `title`: Name of the release notes including Product or Feature
    * `tags`: Add a comma-separated list of existing tags, including:
    * `hide-table-of-contents`: Hide the TOC on the page, keeping the notes clean and wide on the page.

1. Save images to this folder and add them to the markdown file: `![alt text](image-name.png)`.

## Long Release Notes

If you have a long set of release notes, we recommend introducing the notes and adding a truncate line, followed by the full set of release notes.

The line of code is: `<!--truncate-->`
