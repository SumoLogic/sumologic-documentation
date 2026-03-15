---
name: sumo-style
description: Apply Sumo Logic documentation style guide. Use when writing, editing, or reviewing any documentation content for sumologic-documentation.
---

# Sumo Logic Docs Style Guide

The full style guide is at: https://www.sumologic.com/help/docs/contributing/style-guide

Before writing or editing any doc, fetch and read this page, then apply its conventions to your output.

## Key rules to always apply (no fetch needed)

### Voice and tone
- Address the reader as "you", never "the user" or "one"
- Active voice. Example: "Sumo Logic ingests data" not "Data is ingested by Sumo Logic"
- Conversational but professional — avoid stiff, institutional language
- Use "need to" instead of "must" or "have to"
- Avoid abbreviations like "e.g.", "i.e.", "etc." — write them out
- Spell out negative contractions in full (use "cannot", not "can't")
- Always refer to the product as "Sumo Logic", never just "Sumo"
- Reading level: aim for 8th grade in introductory sections

### Headings
- Title case for doc titles only
- Sentence case for all H2, H3, H4 headers (except proper nouns)
- Never use H1 — it is auto-generated from frontmatter title
- Start body content at H2 (##)
- No bold, italics, or backticks inside headings

### Frontmatter (required on every doc)
- id: short, dashes only
- title: include primary keywords, under 60 characters
- sidebar_label: short label for nav
- description: 1-2 sentences for SEO
- keywords and tags are optional but encouraged

### Emphasis
- Bold for UI elements the user interacts with (buttons, tabs)
- Italics for defining a term for the first time, or content to enter into a field
- Never underline text

### Links
- Use relative paths for internal Sumo docs links
- Use absolute URLs for external links
- Use descriptive link text (page title or summary), not "click here"
- Use "Learn more" when linking to supplementary Sumo docs

### Lists
- Numbered lists for sequential steps
- Bulleted lists (using *) for non-sequential items
- End each bullet with a terminal period
- Separate intro phrase from explanation with a period, not a dash

### Inclusive language
- No gender pronouns unless referring to a specific person
- Use: allowlist, denylist, placeholder data, primary/main
- Avoid: whitelist, blacklist, dummy data, master
- No idioms or region-specific expressions

### Capitalization
- Acronyms: spell out in full on first use, then abbreviate. Example: Secure Shell (SSH)
- Do not spell out acronyms in headings, only in body text

### Code
- Inline code: single backticks for commands, operators, API methods, error messages
- Code blocks: triple backticks, always specify language for syntax highlighting
- Use sql for Sumo queries, json for Sumo logs
- Code blocks are for runnable snippets only — not error messages

### App and source doc branding
- App docs must start: "The Sumo Logic app for [vendor]..."
- Source docs must start: "The Sumo Logic source for [vendor]..."
