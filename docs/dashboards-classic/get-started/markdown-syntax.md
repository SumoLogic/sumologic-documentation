---
id: markdown-syntax
---

# Markdown Syntax

The following Markdown Syntax options are supported in Dashboards. When your syntax is supported, you'll see "Markdown Supported" near the bottom left corner of the text box. Unsupported syntax prevents you from clicking the **Submit** button.

:::important
Images in Text Panels are not supported.
:::

## Basic text

You don't need to apply any syntax to display basic text. Just type the phrase in the Text box.

## Bold/italic text

To make text italic, surround the phrase in `* *`. For example, `*This text will be italic*`

To make text bold, surround the phrase in `** **`. For example, `**This text will be bold**`

You can combine bold and italic syntax if you'd like.

## Code formatting/block

To make a snippet of text display as code, surround the phrase with: `‘ ‘ `

To make a block of code, surround the content with: `‘‘‘ ‘‘‘`

## Headings

Text can be set to one of six levels, by preceding the text with #:

```sql
# head one

## head two

### head three

#### head four

##### head five

###### head six
```

## Lists

### Ordered Lists

To create a numbered list, precede each list item with a number and a
period. Indent by adding a space. 

```sql
1. Item One

2. Item Two

 1. Indented Item One

 2. Indented Item Two
```

This will be displayed in the Text Panel as:

![Ordered list](/img/dashboards/markdown_ordered_list.png)

### Unordered Lists

To create an unordered bullet list, add `*` or `-` to each item. Both
will produce a bullet. Indent by adding a space.

```markdown
* Bullet One

* Bullet Two

 * Bullet Indent One

 * Bullet Indent Two
```

 This will be displayed in the Text Panel as:

![Markdown unordered list](/img/dashboards/markdown_unordered_list.png)

#### Combined Lists

To created a combined, nested list of numbered and bulleted items, just
precede each line with either a number and a period or an asterisk `*`.

```markdown
1. Item One

 * Bullet Indent One

2. Item Two

 * Bullet Indent Two
```

This will be displayed in the Text Panel as:

![Combined list](/img/dashboards/markdown_combined_list.png)
