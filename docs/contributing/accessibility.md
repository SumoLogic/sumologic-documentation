---
id: accessibility
title: Writing Accessible Documentation
sidebar_label: Accessibility
description: Guidelines for writing accessible Sumo Logic documentation. Covers WCAG 2.1 AA, alt text, link text, headings, color contrast, ableist language, and tables.
keywords:
  - accessibility
  - WCAG
  - alt text
  - screen reader
  - inclusive writing
---

Sumo Logic documentation follows [WCAG 2.1 AA](https://www.w3.org/TR/WCAG21/) as its accessibility baseline. Accessible documentation improves the experience for all readers — including those using screen readers, keyboard navigation, high-contrast displays, or assistive technology of any kind.

## Alt text

Every image needs descriptive alt text. Write alt text that conveys the meaning or purpose of the image, not just its appearance.

**Do:**
```md
<img src={useBaseUrl('img/alerts/monitor-list.png')} alt="Monitors list page showing three active monitors with their status, type, and last modified date" />
```

**Don't:** Leave alt text empty, or use non-descriptive text like "image," "screenshot," or the filename.

Use `alt=""` only for purely decorative images that add no informational value.

For more guidance, see [Images](/docs/contributing/style-guide/#images) in the style guide.

## Link text

Link text should describe the destination — not the action. Avoid generic phrases like "click here," "learn more," or "this link." Screen readers often navigate by listing all links on a page; link text needs to make sense out of context.

| Avoid | Use instead |
|:------|:------------|
| Click [here](/docs/alerts) for information on alerts. | See [Alerts](/docs/alerts). |
| For more information, see [this page](/docs/send-data). | For more information, see [Send Data](/docs/send-data). |
| Learn more [here](/docs/search/get-started-with-search). | [Get started with search](/docs/search/get-started-with-search). |

## Heading hierarchy

Don't skip heading levels. Headings give screen readers and keyboard users the structure they need to navigate a page efficiently.

**Do:** Move through levels in order — h2 → h3 → h4.

**Don't:** Jump from h2 to h4, or use a heading level solely for visual styling when a lower-level heading would be structurally correct.

## Color and contrast

Don't rely on color alone to convey meaning. Users with color blindness or who use high-contrast display modes may not perceive color differences.

- If a screenshot or diagram uses color to highlight something important, add a label, callout, or annotation so the meaning is clear without color.
- For diagrams or custom graphics, use a text contrast ratio of at least 4.5:1 (WCAG AA). You can check with the [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) or [TPGi's Colour Contrast Analyser](https://www.tpgi.com/color-contrast-checker/).

## Ableist language

Avoid language that uses disability as a metaphor or frames disability negatively.

| Avoid | Use instead |
|:------|:------------|
| dummy value | placeholder value, sample value |
| sanity check | validation, verification, check |
| blind to | unaware of, not aware of |
| crippled by | limited by, slowed by |
| stands alone | self-contained |

For broader guidance on inclusive language, see [Inclusive language](/docs/contributing/style-guide/#inclusive-language) in the style guide.

## Tables

Every data table needs a header row. Screen readers use header cells to give context to each data cell — without them, table data is ambiguous.

**Do:**
```md
| Column header | Column header |
|:--------------|:--------------|
| Data          | Data          |
```

Don't use tables purely for layout — use them only for genuinely tabular data.

## Animated content

Don't use animated GIFs in documentation. Readers can't pause or stop them, they can be disorienting for users with vestibular disorders, and screen readers can't convey their content. Use a static screenshot instead, or link to a video.

## Screen reader testing

Before submitting a PR for a new page, consider a quick screen reader check to catch heading, link, and table issues:

- **macOS**: VoiceOver is built in — press **Command+F5** to toggle it.
- **Windows**: [NVDA](https://www.nvaccess.org/) (free) or Narrator (built in — press **Windows+Ctrl+Enter**).
- **Chrome**: [ChromeVox](https://chrome.google.com/webstore/detail/screen-reader/kgejglhpjiefppelpmljglcjbhoiplfn) extension.

Listen for: heading structure, link text, alt text descriptions, and table navigation.
