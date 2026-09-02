---
id: style-guide
title: Documentation Style Guide
sidebar_label: Style Guide
description: The editorial style guide for Sumo Logic docs. Covers voice and tone, formatting, UI terminology, and Markdown and Docusaurus conventions for contributors.
keywords:
  - style guide
  - documentation style guide
  - voice and tone
  - technical writing
  - editorial conventions
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This is the editorial style guide for Sumo Logic documentation. Use it to keep docs consistent in voice, tone, terminology, and formatting, whether you're on the Docs Team or contributing from outside.

Our docs are built with [Docusaurus](https://docusaurus.io/), a static site generator, and written in GitHub-flavored Markdown. This is a living document: if a rule or UI term you need isn't here, let us know and we'll add it.

:::tip
To create a new doc quickly, use a [template](/docs/contributing/templates). Copy the file, add your content, and submit a PR. The Docs Team reviews submissions, suggests edits, adds new content to the navigation, and answers your questions.

If you have Claude Code installed, this repo's `sumo-style` skill applies these conventions automatically when you draft or edit docs, so you don't need to invoke it manually. See AGENTS.md for details.
:::

## Style references

This guide comes first. When it doesn't cover something, defer to these, in order of precedence:

1. _Sumo Logic Brand Guidelines_. Brand Voice and Writing Style Guide. Voice, tone, and brand terms.
1. [_Microsoft Manual of Style_](https://docs.microsoft.com/en-us/style-guide/welcome/). UI, procedures, and technical formatting. See also [User Input | Formatting Text in Instructions](https://docs.microsoft.com/en-us/style-guide/procedures-instructions/formatting-text-in-instructions).
1. [_AP Stylebook_](https://www.apstylebook.com/). General usage.
1. [_The Chicago Manual of Style_](https://www.chicagomanualofstyle.org/home.html). Anything the above don't settle.
1. [_Merriam-Webster Dictionary_](https://www.merriam-webster.com/). Spelling and hyphenation.

For terminology usage guidance, see our [Word List](/docs/contributing/word-list).

## Learning resources

If you're new to writing tech content or would like to learn more, check out these resources:
* [Write the Docs](https://www.writethedocs.org/guide/writing/beginners-guide-to-docs/). Association of tech writers, developers, trainers, and more that have collected ideas, created training and guidelines, and actively discuss documentation.
* [Google Technical Writing Courses](https://developers.google.com/tech-writing). Self-paced courses to refine your writing. The courses may use a style different from ours, but still an excellent way to get started.
* [Every Page is Page One](https://everypageispageone.com/examples-of-eppo-topics/). A helpful method for considering what goes into a page is to think of every page as page one. With the extreme use of search engines or sharing a link to find content, users may land in the middle of a section or tutorial. These ideas help hone your content and focus on user needs.

Helpful blogs on tech writing:
* [Writing for the Web](https://www.nngroup.com/topic/writing-web/). Guidance on writing for the web, including insights on technical writing and learning.
* [Feathers](https://ffeathers.wordpress.com/). Blog for technical and fiction writing.
* [I'd rather be writing](https://idratherbewriting.com/). Guides and thoughts on tech writing process and content.

## Voice and tone

* **Clarity and professionalism**. We are clear, genuine, and trustworthy. We understand that our customers entrust us with their vital data and never make light about our commitment to data access and security.
* **Engagement and assistance**. The reader should feel confident and informed. We should strive to engage our customers and show them where to get additional assistance when needed.
* **Professional description**. Describe Sumo Logic in a professional and truthful manner. Avoid generic, unsubstantial adjectives like "very" or phrases like "we're the best". Instead, illustrate these points by letting our product speak for itself.
* **Conversational tone**. Avoid using a stiff, institutional voice. Instead, write with an instructive and conversational tone, using the sort of words that you would use in a face-to-face conversation. For example, when linking to the support site, use terms like "Need help? Let us know" instead of "Please email our support personnel" to give our company a friendly face.
* **Reader address**. Address the reader as "you", as you would in conversation. For example, instead of saying, "The user must provide his or her API key" or "One must provide their API key", say, "You'll need to provide your API key".
* **Readability and SEO**. Instructional content and blog posts should be written at approximately the 8th-grade reading level, particularly in introductory sections, for readability and SEO. You can test your content [here](http://www.writingtester.com).
* **First paragraph**. Open every page by telling the reader what it covers, why it matters, and who it's for. In a tutorial, also say which step or stage the page is. See [AEO](#aeo-answer-engine-optimization) for how this helps search and AI answers.
* **Brand guidelines**. Our brand guideline is to always refer to “Sumo Logic”, rather than Sumo. To be more conversational, it is also fine to say “we”.
* **Gentle Language**. Use “need to” instead of “have to” or “must”. “Have to” and “must” can sound harsh and unfriendly.
* **Judicious use of absolutes**. Be judicious in use of “always” and “never”. Sometimes it’s appropriate to say “always” or “never”. Keep in mind though that “always” can imply a result that is not guaranteed, and “never” may very well not be the case — the exception makes the rule.
* **Error messaging**. When explaining a process or procedure, clarity is critical. Edit words that distract or confuse. Put yourself into the reader's shoes and think about what actions you recommend to them when an error message is displayed, rather than merely stating what went wrong. Example: "Could not create the user." vs "This email is already registered in the system. Use a different email, or contact Sumo Logic for assistance."
* **Humor**. We have a sense of humor! Conveying that we do serious work, but we do not take ourselves too seriously, makes Sumo Logic feel likable.

### Active voice

When writing instructions, use the active voice whenever possible. This example below gives a call to action for the reader or user to effectively get something done. It also reduces word count and keeps instructions clear.

#### General statements

| &#9989; **Do** | &#10060; **Don't** |
|:---------------|:-------------------|
| Sumo Logic ingests multiple streams of data. | Multiple streams of data are ingested by Sumo Logic. |

#### Task directives

We need them to complete a task. No need for please.

| &#9989; **Do** | &#10060; **Don't** |
|:---------------|:-------------------|
| Build the query using the following... | Please build the query using the following... |

#### Instruction introduction (stem)

Introduce your instructions with the goal, then dive into the instructions. This is called a stem, and it helps focus the task and keeps you active:

| &#9989; **Do** | &#10060; **Don't** |
|:---------------|:-------------------|
| To add a new collector:<br/>1. Access Sumo Logic and find the... | When you need to add a new collector, access Sumo Logic and find the... |

### Inclusive language

By writing inclusively and using culturally neutral language, our words resonate with global audiences and make everyone feel welcome, no matter their race, gender, socioeconomic status, and ability.

#### Avoid Regional Language

* Do not use idioms, slang, expressions, or terminology only understood by a specific region or group.

#### Simplify Language

* Avoid overly technical jargon.
* Don’t use words just because they sound better. Choose short, simple words over long and complicated ones.

#### Gender Neutrality

* Unless you're referring to a specific person, do not use gender pronouns (he/she).

#### Cultural Neutrality

* Use culturally neutral terms to replace terms with negative connotations. For example:

| &#9989; **Do** | &#10060; **Don't** |
|:---------------|:-------------------|
| "allowlist"<br/>"denylist"<br/>"placeholder data"<br/>"primary" or "main"<br/>"press" or "click" | "whitelist"<br/>"blacklist"<br/>"dummy data"<br/>"master"<br/>"hit" |

## Abbreviations

Avoid the use of abbreviations like “e.g.”, “i.e.”, and “etc.”. Although they may be well understood, such abbreviations don’t support our goal of a conversational tone. In other words, don’t use language you wouldn’t use verbally.

| &#9989; **Do** | &#10060; **Don't** |
|:---------------|:-------------------|
| for example | e.g. |

| &#9989; **Do** | &#10060; **Don't** |
|:---------------|:-------------------|
| that is | i.e. |

## Acronyms

An acronym uses the first initials of a word or phrase, for brevity. Our industry is full of them, and they can get confusing if their usage isn't clear. Acronyms should be capitalized, if not used directly in a query. Unless the usage is clear from the context, for the first usage, spell out the phrase, then present the acronym in parenthesis. 

For example, if you're writing a doc about AWS Application Load Balancer, say `AWS Application Load Balancer (ALB)` on first reference, and for the rest of the doc, use `ALB`.

All companies have numerous acronyms for products, features, solutions, and more. Our documentation includes acronyms for Sumo Logic and third-party software. Always fully spell out the first instance of the acronym on the page, then you can use it throughout. Do not spell out in a heading, but in paragraphs or bullets.

## Admonitions

We call Docusaurus's callout blocks *admonitions*. The standard types (`:::note`, `:::tip`, `:::info`, `:::important`, `:::warning`, `:::danger`) work as [documented by Docusaurus](https://docusaurus.io/docs/markdown-features/admonitions) and accept full Markdown, including code blocks, links, lists, images, and videos.

Two admonition types are Sumo Logic-specific:

* `:::sumo`. Subject matter expert guidance, best practices, and Sumo Logic-specific notes. Defaults to the title "Best Practice"; retitle as needed (for example, `:::sumo Good to know`).
* `:::training`. Links to training courses, certifications, and micro lessons.

Pick a type by intent:

| Type | Use for |
|:--|:--|
| `:::note` | A neutral aside. |
| `:::tip` | An optional shortcut or a better way to do something. |
| `:::info` / `:::important` | Something the reader must not miss. |
| `:::warning` | Risk of a confusing or incorrect result. |
| `:::danger` | Risk of data loss or an unrecoverable action. |

Rendered, each type looks like this:

:::note
A neutral aside.
:::

:::tip
An optional shortcut or a better way to do something.
:::

:::info
Something the reader must not miss.
:::

:::warning
Risk of a confusing or incorrect result.
:::

:::danger
Risk of data loss or an unrecoverable action.
:::

:::sumo Best Practice
Subject matter expert guidance, best practices, and Sumo Logic-specific notes. Retitle as needed.
:::

:::training
Links to training courses, certifications, and micro lessons.
:::

## Capitalization

* Title case all doc titles. Example: `Cloud SOAR Incident Management and Triage`.
* Sentence case all other headers (H2, H3, H4). The only exception is proper nouns, which are always title case. Example: `Throughput signals and contributing factors`.
* In body text, don't capitalize a term unless it's a proper noun or a literal UI label. Generic product terms are lowercase: collector, source, dashboard, panel, index, partition, role, scheduled view, alert, search.
* **UI label vs. concept.** When you name a UI element or page as it appears on screen, match its on-screen capitalization and bold the label: the **Search** page, the **Scheduled Views** page, the **Aggregates** tab. When you mean the same thing as a general feature or concept, use lowercase and no bold: "scheduled views let you pre-aggregate data", "run a search". The generic word (`page`, `tab`, `button`) is always lowercase. See [Bold](#bold).
* Always capitalized: proper nouns and product names (Sumo Logic, Cloud SIEM, Cloud SOAR, Kubernetes, Markdown, RBAC), and named UI areas when used as labels (the **Library**, the **Search** page, **Admin mode**).
* **Feature names vs. use cases.** Coined or proper feature names stay capitalized (LogReduce, LogCompare, Cloud SIEM, Cloud SOAR, Automation Service). Generic capabilities and use cases are lowercase: security data lake, threat detection and investigation, audit and compliance, application security, observability, continuous intelligence. Marketing keeps a [product and feature name matrix](https://docs.google.com/spreadsheets/d/1U2yPSasgHHzQYXvCzfvEXfIM2t6ofBfW8DYEZLrtj2s/) for edge cases.
* **Does it need a name at all?** Before you capitalize a new feature name, ask whether it needs a branded name (see [Fighting Feature Names](https://kubie.co/blog/fighting-feature-names/)). Default to plain descriptive language; reserve a proper name for features that are genuinely distinct and that users will refer to by name.


## Code (inline)

Use single backticks (\` \`) to format inline code as monospace font. Example use cases include commands, operators, API method names, and error messages. For information on code blocks (scripts), see [Code Blocks](#code-blocks).

<Tabs
  defaultValue="Markdown"
  values={[
    {label: 'Markdown', value: 'Markdown'},
    {label: 'Result', value: 'Result'},
  ]}>

<TabItem value="Markdown">

```sumo
`_view = sumologic_slo_output`
```
</TabItem>
<TabItem value="Result">

`_view = sumologic_slo_output`

</TabItem>
</Tabs>

## Code (blocks)

Use fenced code blocks (triple backticks) for scripts and multi-line commands a reader copies and runs. Add a language on the opening fence for syntax highlighting; see [Docusaurus code blocks](https://docusaurus.io/docs/markdown-features/code-blocks) for titles, line highlighting, and line numbers.

* Use `sql` for Sumo Logic queries and `json` for Sumo Logic logs. For the full language list, see [Prism's supported languages](https://prismjs.com/#supported-languages).
* Code blocks are for things a reader runs. Format error messages and single identifiers as [inline code](#code-inline), not blocks.

### Embed a file from a GitHub repo

Add `reference` after the language on the opening fence, then put the file's GitHub URL on the next line. Docusaurus fetches the file at build time and renders it as a highlighted code block with a link back to the source:

```json reference
https://github.com/SumoLogic/sumologic-documentation/blob/main/static/files/c2c/1password/example.json
```

Append `#L4-L5` to the URL to embed only those lines, and add a title with `json reference title="example.json"`. We use this heavily in the [C2C source docs](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework).

## Collapsible text blocks

Use a [Docusaurus `<details>` block](https://docusaurus.io/docs/markdown-features#details) to fold away long optional content: verbose examples, long code samples, or big reference lists. Put the title between the `<summary>` tags and the content after them. Collapsed content is still indexed for search.

Never put required steps or instructions in a collapsible block.

<Tabs
  defaultValue="Markdown"
  values={[
    {label: 'Markdown', value: 'Markdown'},
    {label: 'Result', value: 'Result'},
  ]}>

<TabItem value="Markdown">

```
<details>
<summary>Toggle me</summary>

This is the detailed content.

</details>
```

</TabItem>
<TabItem value="Result">

<details>
<summary>Toggle me</summary>

This is the detailed content.

</details>

</TabItem>
</Tabs>

## Contractions

Using contractions contributes to our goals of striking a conversational, friendly tone.

It's okay to use common contractions like “I'm”, “they're”, and “you’ll”. Spell out all negative contractions (for example: use "cannot", not "can't"), as they can be easily mistaken for the opposite meaning.

Avoid less common contractions, like “should’ve”, or “it’ll”.

## Dates

* Use the month’s full name (September). If space is a concern, use 3-letter abbreviations (Sep).
* Avoid writing dates numerically (7-25-17) and ordinal indicators (1st, 2nd, 3rd, 4th). Use the 12-hour clock unless the user has specified otherwise, followed by am or pm in lowercase letters without a space.
* When including a time zone, append the time zone’s abbreviation after the “am” or “pm”, separated by a space.
* To show a time range, use an en dash and include the “am” or “pm” after both times.

:::note
The notation used in the UI time range editor is an exception to some of these rules.
:::

## Downloadable files

Put the asset in `static/files/`, then link it like this:

```md
<a href={useBaseUrl('files/domainCollector.ps1')} target="_blank">domainCollector.ps1</a>
```

Nearly all formats are supported (see [Docusaurus static assets](https://docusaurus.io/docs/static-assets)). If the file already lives in another public Sumo Logic repo, link its URL directly instead of copying it in.

## Emphasis

### Bold

Use **bold** for the name of a UI element the reader interacts with or navigates to: a button, tab, menu item, field label, checkbox, or page name. Examples: Select **Save**. Go to the **Scheduled Views** page. On the **Aggregates** tab, select **Add to Dashboard**.

Bold only the label itself. The generic word that follows it (`button`, `tab`, `menu`, `dialog`, `field`, `page`, `pane`) stays outside the bold and lowercase: the **Search** page, not **Search page** or the **Search Page**.

**UI label vs. concept.** Bold and match the on-screen capitalization only when you're pointing to the UI control. When you're describing the feature or concept, don't bold it, and lowercase it. Write "A scheduled view is a pre-aggregated index of your data" (concept), but "Open the **Scheduled Views** page" (UI label). Capitalization follows the same split (see [Capitalization](#capitalization)).

Don't use bold to emphasize ordinary words.

### Italics

Use _italics_ for:
* Defining a term the first time. For example, when defining a collector the first time, you would italicize once with the definition.
* Providing content to enter into a field.

### Underlines

Never underline text.

<Tabs
  defaultValue="Markdown"
  values={[
    {label: 'Markdown', value: 'Markdown'},
    {label: 'Result', value: 'Result'},
  ]}>

<TabItem value="Markdown">

```markdown
Emphasis, aka italics, with *asterisks* or _underscores_.

Strong emphasis, aka bold, with two **asterisks** or __underscores__.

Combined emphasis with **asterisks and _underscores_**.

Strikethrough uses two tildes. ~~Scratch this.~~
```

</TabItem>
<TabItem value="Result">

Emphasis, aka italics, with *asterisks* or _underscores_.

Strong emphasis, aka bold, with two **asterisks** or __underscores__.

Combined emphasis with **asterisks and _underscores_**.

Strikethrough uses two tildes. ~~Scratch this.~~

</TabItem>
</Tabs>


## Font

We use Lab Grotesque in our docs site and across all Sumo Logic media.


## Headings

Use hashtags `#` to indicate the heading level and group content. Always start with H2 headers (`##`) in your doc body. Link anchors also generate automatically.

* We mark a heading using a number of # for the level. This section is using an H3 heading, which is `### Headings`.
*  Never use H1 (`#`) in your document. This is generated automatically by the page title (`title:` in frontmatter).
* Headings should always be clean, plain text. Do not use **bold**, _italics_, or code ticks.
* Be careful of using special characters. Dashes are ok, but try to avoid other punctuation.

<Tabs
  defaultValue="Markdown"
  values={[
    {label: 'Markdown', value: 'Markdown'},
    {label: 'Result', value: 'Result'},
  ]}>

<TabItem value="Markdown">

```
## I'm an H2

### I'm an H3

#### I'm an H4

##### I'm an H5

###### I'm an H6
```

</TabItem>
<TabItem value="Result">

<img src={useBaseUrl('img/contributing/headersizes.png')} alt="header sizes" width="300"/>

</TabItem>
</Tabs>

Headings must be used in correct order. The subsection of an H2 header would be H3 - you wouldn't jump to an H4 or H5. Skipping over a header level affects search and SEO structures to search crawlers like Google. Docusaurus carefully formats generated pages to ensure strong search and SEO, and malformed structures can reduce that strength.

### Step headings

When a topic documents a long, multi-step process, break it into sections whose headings signpost each stage, and start each heading with "Step" so it's clear the section is one part of a larger configuration. For example:

<img src={useBaseUrl('img/contributing/style-steps-headings.png')} alt="headers with steps" width="300"/>


## Hub pages

A hub page is a section's `index.md`. It opens with a short intro, then lists the section's child docs as a grid of cards. Build the grid by hand so you control the order, titles, icons, and descriptions:

```
In this section, we'll introduce the following concepts:

<div className="box-wrapper">
<div className="box smallbox card">
  <div className="container">
  <a href={useBaseUrl('docs/<section>/<child-doc>')}><img src={useBaseUrl('img/icons/<icon>.png')} alt="<icon> icon" width="40"/><h4>Card title</h4></a>
  <p>One sentence on what the child doc covers.</p>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href={useBaseUrl('docs/<section>/<child-doc-2>')}><img src={useBaseUrl('img/icons/<icon>.png')} alt="<icon> icon" width="40"/><h4>Card title</h4></a>
  <p>One sentence on what the child doc covers.</p>
  </div>
</div>
</div>
```

* Wrap every card in one `<div className="box-wrapper">`. Each card is `<div className="box smallbox card">` containing a `<div className="container">`.
* An invisible overlay makes the whole card clickable, so keep the icon and the `<h4>` title inside the `<a>`.
* Keep each description to one sentence. Pull icons from `static/img/icons/`.
* Order cards to match the section's order in `sidebars.ts`, unless the section deliberately leads with its most important docs.
* The page needs a `slug:` in its frontmatter (see [Navigation menus](#navigation-menus)).

## Images

### Add an image

Save images to `/static/img/`, which mirrors the doc folder structure. Import `useBaseUrl` once near the top of the doc (`import useBaseUrl from '@docusaurus/useBaseUrl';`), then reference the image with a path that starts with `img`, not `/static`:

```md
<img src={useBaseUrl('img/<path>.png')} alt="<description>" style={{border: '1px solid gray'}} width="<pixels>" />
```

* **Format.** Use PNG. Don't use animated GIFs — readers can't pause the motion (an accessibility barrier), and screen readers can't convey them.
* **Size.** Keep files under 2MB. Use `width` to scale down oversized or pixelated images.
* **Replace, don't version.** When a UI change dates an image, overwrite the existing file rather than adding a second copy. Image files are large and slow the build.
* **Web-hosted images.** Pass the full URL and drop `useBaseUrl`:
   * &#9989; `<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Jira-OpenTelemetry/Jira-Catalina.png' alt="Jira Catalina" />`
   * &#10060; `<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Jira-OpenTelemetry/Jira-Catalina.png')} alt="Jira Catalina" />`
* **Alt text.** Every image needs it (screen readers, slow connections, US Government GSA Section 508). Describe the image's purpose, not its pixels (`alt="Screenshot of the image properties dialog"`, `alt="Sumo Logic logo"`). Use `alt=""` only for purely decorative images, and add alt text to any image you find without it.


### Images in lists

When adding an image to a bulleted or sequential list, include the image snippet in-line with the list item, with a `<br/>` element in between, like this:

<Tabs
  defaultValue="Markdown"
  values={[
    {label: 'Markdown', value: 'Markdown'},
    {label: 'Result', value: 'Result'},
  ]}>

<TabItem value="Markdown">

```md
1. Here is a dinosaur.<br/><img src={useBaseUrl('img/reuse/docusaurus.png')} alt="Alt text" width="100"/>
```

</TabItem>
<TabItem value="Result">

1. Here is a dinosaur. <br/><img src={useBaseUrl('img/reuse/docusaurus.png')} alt="Alt text" width="100"/>

</TabItem>
</Tabs>


### Logos

When sizing images, use your discretion. For square logos, set the width to about 45-55px.

| &#9989; **Do** | &#10060; **Don't** |
|:---------------|:-------------------|
| <img src={useBaseUrl('img/contributing/logo-yes.png')} alt="Screenshot showing correctly sized logo" width="400"/> | <img src={useBaseUrl('img/contributing/logo-no.png')} alt="Screenshot showing oversized logo" width="440"/> |

For wide logos (like [in this doc](/docs/integrations/microsoft-azure/iis-7/)), set the width to about 90-120px.

### Screenshots

Use screenshots only when they clarify complex instructions. Our UI changes often, so minimizing screenshots reduces maintenance overhead.

* Prefer clear, concise text instructions over images when possible.
* Only include screenshots if they significantly aid user understanding.
* Avoid screenshots for simple UI interactions.
* When updating docs, evaluate whether screenshots are outdated or redundant.
* If you come across unnecessary screenshots, use your judgment to delete or replace them.

Make sure screenshots are large enough to be legible, but never wider than 800px. Avoid oversized images.

By default, images that you insert into a page are set to be responsive-resized for the type of device the reader is using.

Use the following syntax to add screenshots:

```md
<img src={useBaseUrl('img/<your-image-file>.png')} alt="Descriptive alt text" style={{border: '1px solid gray'}} width="500" />
```

Add appropriate `alt` text for accessibility. See [Add an image](#add-an-image) for more.

| &#9989; **Do** | &#10060; **Don't** |
|:---------------|:-------------------|
| <img src={useBaseUrl('img/contributing/screenshot-yes.png')} alt="Alt text" width="400"/> | <img src={useBaseUrl('img/contributing/screenshot-no.png')} alt="Alt text" width="400"/> |

### Masking sensitive information

We mask sensitive information like usernames, email addresses, and IP addresses. In Snagit or a similar program, use the shape tool to mask the text using solid gray, (RGB 212, 212, 212).

### Callouts

Create callouts using the shape tool in SnagIt. Callouts should be red, 100% opacity, no drop shadow effect, 2 pts wide.


## Lists

You can mix ordered (or numbered) and unordered (or bulleted) lists together. Use extra lines and tabs (or 2 spaces) to move content under these bullets, including other bullets, paragraphs, images, and more. Be careful of indenting too much; three tab indents will automatically render as code.

In a list item made up of an introductory word or phrase and an explanatory sentence or paragraph, separate the introductory text and the explanation with a period (`.`) rather than a dash (`-`). For example:

<Tabs
  defaultValue="Markdown"
  values={[
    {label: 'Markdown', value: 'Markdown'},
    {label: 'Result', value: 'Result'},
  ]}>

<TabItem value="Markdown">

```md
1. **Entity**. Select the Entity field in the Record that the resulting Signal should be associated with.
1. **Description (Optional)**. Define the description for the Signal.
```

</TabItem>
<TabItem value="Result">

1. **Entity**. Select the Entity field in the Record that the resulting Signal should be associated with.
1. **Description (Optional)**. Define the description for the Signal.

</TabItem>
</Tabs>


### Numbered lists

Use numbered lists when providing a set of instructions or steps.

Always start with `1.`. Markdown automatically numbers sequentially when building the site. This can be helpful when you need to add or change the order of instructions (no need to edit every number).

<Tabs
  defaultValue="Markdown"
  values={[
    {label: 'Markdown', value: 'Markdown'},
    {label: 'Result', value: 'Result'},
  ]}>

<TabItem value="Markdown">

```markdown title="Markdown Ordered List"
1. First ordered list item.
1. Another item.
   - Unordered sub-list.
1. Actual numbers do not matter, just that it is a number.
   1. Ordered sub-list.
1. And another item.

  More content for this entry. And a screenshot:<br/><img src={useBaseUrl('img/apm/span-hover-view.png')} alt="Span hover" style={{border: '1px solid gray'}} width="400" />

```
</TabItem>
<TabItem value="Result">

1. First ordered list item.
1. Another item.
   * Unordered sub-list.
1. Actual numbers do not matter, just that it is a number.
   1. Ordered sub-list.
1. And another item.
   * More content for this entry. And a screenshot:<br/><img src={useBaseUrl('img/apm/span-hover-view.png')} alt="Span hover" style={{border: '1px solid gray'}} width="400" />

</TabItem>
</Tabs>

### Bulleted lists

Use bulleted lists when the items do not need to be presented in sequential order. End each bullet in a terminal period. Use asterisks `*` for unordered, bulleted lists.

<Tabs
  defaultValue="Markdown"
  values={[
    {label: 'Markdown', value: 'Markdown'},
    {label: 'Result', value: 'Result'},
  ]}>

<TabItem value="Markdown">

```markdown title="Markdown Unordered List"
* Unordered list line 1.
* Line 2.
   <br/>Content to show under 2.
* Another set of bullets.
* Here we go, another!
```

</TabItem>
<TabItem value="Result">

* Unordered list line 1.
* Line 2.
   <br/>Content to show under 2.
* Another set of bullets.
* Here we go, another!

</TabItem>
</Tabs>

You can configure your editor to always use this format for lists. For Visual Studio Code, configure the following settings:

* **Ordered List: Marker** set to *one*.
* **Unordered List: Marker** set to *.

Ensure parallel grammatical structure - that is, start each bullet with the same part of speech.


## Links

When linking to Sumo Logic docs, use relative file paths. For external links, use absolute URL paths.

Whenever possible, use link text that’s relevant - such as the page title - rather than just "click here". If the link title is too long, you can either edit the title or summarize the content in a few words.

When linking to other Sumo Logic documentation, use the phrase "Learn more" on its own or after the end of a sentence.

| &#9989; **Do** | &#10060; **Don't** |
|:---------------|:-------------------|
| Add a processing rule to filter messages. [Learn more](/docs/send-data/collection/processing-rules/create-processing-rule).| [Find out how](/docs/send-data/collection/processing-rules/create-processing-rule) to add a processing rule to filter messages. |

#### Linking to other headers in the same file

```md
Here's how to make a [table](#tables).
```

#### Linking to files in the same folder

```md
* Check out our [glossary](glossary.md); or
* Check out our [glossary](./glossary.md); or
* Check out our [glossary](/docs/contributing/glossary).
```

#### Linking to files in other parent folders

```md
* Learn how to [sign up with Sumo](../get-started/sign-up.md); or
* Learn how to [sign up with Sumo](/docs/get-started/sign-up).
```

#### Linking to external URLs

```md
For more information, see [Export Logs to Sumo Logic](https://auth0.com/docs/extensions/sumologic).
```


## Markdown

Markdown is a simple, text-based format you can write using text editors, IDEs, or the GitHub website to write content. We use Docusaurus to manage, style, and build our site. We use GitHub-flavored Markdown, with some additional options. You can find more info at:
* [Docusaurus | Markdown Features](https://docusaurus.io/docs/markdown-features)
* [Markdown Guide](https://www.markdownguide.org/)
* [GitHub | Basic writing and formatting syntax](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax)

### File naming convention

A Markdown file has a filename and extension of .md. We recommend keeping the filename short. It does not affect the canonical link.

## MDX

[MDX](https://mdxjs.com/) can make your documentation more **interactive** and allows using any **React components inside Markdown**:

```jsx
export const Highlight = ({children, color}) => (
  <span
    style={{
      backgroundColor: color,
      borderRadius: '20px',
      color: '#fff',
      padding: '10px',
      cursor: 'pointer',
    }}
    onClick={() => {
      alert(`You clicked the color ${color} with label ${children}`)
    }}>
    {children}
  </span>
);

This is <Highlight color="#25c2a0">Docusaurus green</Highlight> !

This is <Highlight color="#1877F2">Facebook blue</Highlight> !
```

export const Highlight = ({children, color}) => (
  <span
    style={{
      backgroundColor: color,
      borderRadius: '20px',
      color: '#fff',
      padding: '10px',
      cursor: 'pointer',
    }}
    onClick={() => {
      alert(`You clicked the color ${color} with label ${children}`);
    }}>
    {children}
  </span>
);

This is <Highlight color="#25c2a0">Docusaurus green</Highlight> !

This is <Highlight color="#1877F2">Facebook blue</Highlight> !

## Measurements

For storage and memory sizes (MB, GB), the unit of measurement should be uppercase. For dimensions and weights, the unit of measurement should be lowercase (cm, lb). Do not separate the number and the unit with a space.

## Metadata (frontmatter)

Markdown documents contain a YAML block of metadata at the top called [frontmatter](https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-content-docs#markdown-front-matter). This block includes elements such as the title, description, and search keywords. Every page should have an `id` for sidebar navigation.

Here is an example of a frontmatter block with sample text:

```
---
id: page
title: Page title
sidebar_label: Sidebar navigation title
description: Description about this feature.
keywords:
    - metrics
    - traces
tags: [metrics, traces]  
---
```

| Parameter | Description |
| :-- | :-- |
| `id:` | **(Required)** Unique identifier for the page, used in the sidebar and as the canonical link. Keep it short and only use dashes. |
| `slug:` | (Optional) Overrides the `id:` for the canonical link. Best used for index pages for sections. |
| `title:` | **(Required)** For SEO purposes, include main keywords in your title and keep it under 60 characters. This title is used in navigation if a `sidebar_label` is not included. |
| `sidebar_label:` | (Optional) Label for the sidebar navigation. Keep it title short. It does not affect the canonical link or page title. |
| `description:` | (Optional) 1-2 sentences describing the content in the doc. It appears in search engine results. Keep it 140–160 characters. Use plain text only — no Markdown or backtick formatting. If omitted, search engines will pull the first couple of sentences from the page. See [Metadata descriptions](#metadata-descriptions). |
| `keywords:` | (Optional) List of keywords to enhance SEO. |
| `tags:` | (Optional) A string or list of tags that adds labels and permalinks to help with sorting. |

For a full list of options, see [Docusaurus Markdown front matter](https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-content-docs#markdown-front-matter).

### Branding and naming in app/source docs

To ensure consistency between our UI and our documentation, every App and Source doc must begin by clearly identifying it as a Sumo Logic integration. The UI often shows only the vendor name (for example, "Slack", "Amazon S3"), so the documentation must reinforce that Sumo Logic is delivering the integration.

* **App docs**. The `description:` frontmatter and intro paragraph must start with: "The Sumo Logic app for [vendor]..." (see [template](/docs/contributing/templates/app-template-v2)).
* **Source docs**. The `description:` frontmatter and intro paragraph must start with: "The Sumo Logic source for [vendor]..." (see [template](/docs/contributing/templates/c2c-source)).

This rule helps:
* Align docs with UI naming ("[vendor] by Sumo Logic”).
* Reinforce Sumo Logic as the provider of the integration.
* Prevent ambiguity that suggests the vendor is the owner of the app/source.

## Navigation menus

The top navigation bar is configured in [`docusaurus.config.js`](https://docusaurus.io/docs/api/docusaurus-config). The left sidebar for the whole site is configured in [`sidebars.ts`](https://github.com/SumoLogic/sumologic-documentation/blob/main/sidebars.ts), which holds one sidebar per Guide. Read the comments at the top of that file for how our sections map to the top nav and where new content belongs.

* **Add a page.** Reference it by folder path and frontmatter `id`, for example `contributing/style-guide`. Add that `id` to the `items` array of the right category.
* **Add a section.** Nest a `type: 'category'` object inside a category's `items`. See [Docusaurus sidebar syntax](https://docusaurus.io/docs/sidebar) for the category, `link`, and dedicated-sidebar options.
* **Add a section index page.** Create an `index.md` in the folder with `slug: <name>`, then point the category at it with `link: {type: 'doc', id: '<folder>/index'}`.

## Numbers

* Spell out zero through nine in ordinary prose; use numerals for 10 and greater. This matches AP, Microsoft, and Google.
* Always use numerals for measurements and units, version numbers, percentages, code, dates, times, UI text that shows a numeral, and any range where either value is 10 or greater.
* Use commas for numbers that are 4 or 5 digits in length, for example, 1,000 or 99,999.
* For numbers 100,000 and higher, use “K”, “M”, and “B” to indicate thousands, millions, or billions.
* Use an en-dash without a space on either side for number ranges.

## Patents and trademarks

Protecting our patents and trademarks is important to do correctly. We do not want to expose the company to a loss of trademark or patent just because we didn't list it correctly.

This is a partial list of trademarked terms, which should be capitalized exactly as shown below.

* Sumo Logic
* Big Data for Real Time IT
* Log Reduce
* Elastic Log Processing
* Push Analytics

Never use Sumo Logic in the plural or possessive form.

## Preview releases

Following are the instructions for formatting docs at each release stage. For release type definitions, see [Preview Releases](/docs/preview).

Private Preview and Extended Preview release features are invite-only, while Public Preview features are by request only to participating customers. Preview docs are published, but excluded from the nav and must not be referenced or appear anywhere in the docs. Sumo Logic representatives provide the documentation links only to the involved customers.

For Preview docs, under the frontmatter, add the `robots` meta tag, then the corresponding badge and preview notice. The Preview badges contain a link to the [Preview](/docs/preview) landing page, and the `robots` meta tag prevents search crawlers from picking it up.

### Private Preview

<Tabs
  defaultValue="Markdown"
  values={[
    {label: 'Markdown', value: 'Markdown'},
    {label: 'Result', value: 'Result'},
  ]}>

<TabItem value="Markdown">

```md
---
<frontmatter>
---

<head>
<meta name="robots" content="noindex" />
</head>

<p><a href={useBaseUrl('docs/preview')}><span className="preview-private">Private Preview</span></a></p>

:::info
This feature is in Private Preview. For more information, contact your Sumo Logic account representative.
:::

<first paragraph>
```

</TabItem>
<TabItem value="Result">

<p><a href={useBaseUrl('docs/preview')}><span className="preview-private">Private Preview</span></a></p>

:::info
This feature is in Private Preview. For more information, contact your Sumo Logic account representative.
:::

</TabItem>
</Tabs>


### Extended Preview

<Tabs
  defaultValue="Markdown"
  values={[
    {label: 'Markdown', value: 'Markdown'},
    {label: 'Result', value: 'Result'},
  ]}>

<TabItem value="Markdown">

```md
---
<frontmatter>
---

<head>
<meta name="robots" content="noindex" />
</head>

<p><a href={useBaseUrl('docs/preview')}><span className="preview-extended">Extended Preview</span></a></p>

:::info
This feature is in Extended Preview. For more information, contact your Sumo Logic account representative.
:::

<first paragraph>
```


</TabItem>
<TabItem value="Result">

<p><a href={useBaseUrl('docs/preview')}><span className="preview-extended">Extended Preview</span></a></p>

:::info
This feature is in Extended Preview. For more information, contact your Sumo Logic account representative.
:::

</TabItem>
</Tabs>

### Public Preview


<Tabs
  defaultValue="Markdown"
  values={[
    {label: 'Markdown', value: 'Markdown'},
    {label: 'Result', value: 'Result'},
  ]}>

<TabItem value="Markdown">

```md
---
<frontmatter>
---

<head>
<meta name="robots" content="noindex" />
</head>

<p><a href={useBaseUrl('docs/preview')}><span className="preview-public">Public Preview</span></a></p>

:::info
This feature is in Public Preview. To participate, contact your Sumo Logic account representative.
:::

<first paragraph>
```

</TabItem>
<TabItem value="Result">

<p><a href={useBaseUrl('docs/preview')}><span className="preview-public">Public Preview</span></a></p>

:::info
This feature is in Public Preview. To participate, contact your Sumo Logic account representative.
:::


</TabItem>
</Tabs>


### Generally Available (GA)

When a feature becomes Generally Available (GA), remove all Preview-related labels, badges, notes, and the `robots` meta tag. Then follow the standard [Create a Doc](/docs/contributing/create-edit-doc) instructions.

## Punctuation

Punctuation is placed outside of quotation marks, British English style. For everything else (dates, times, spelling), we use American English style.

### Colons
Colons are used to introduce lists or to separate titles from subtitles. Only include the colon if the introduction isn’t a complete sentence.

### Commas

We use the Oxford (serial) comma. For example, use "I had eggs, toast, and orange juice", not "[I had eggs, toast and orange juice](https://www.verbicidemagazine.com/wp-content/uploads/2012/01/why-i-still-use-the-oxford-comma.jpg)".

### Exclamation points

Use exclamation points to express excitement or encourage the user. Don't use them for errors, warnings, or confirmation of basic actions as they are usually unnecessary and can distract from important details.

### Ellipses and truncation

Use ellipses for truncation. Don’t use ellipses for placeholders or trailing off a sentence unless it is getting cut off. When truncating, think about which part of the string is most essential for the user. This may require truncating in the beginning, middle, or end of a string.

### Periods

In the UI, avoid periods for single sentences on their own. Whenever there are two or more sentences, use periods at the end of each sentence. Separate sentences by one space, not two.


## Release notes

Release notes (our changelog) publish to both the [docs site](/docs/release-notes) and an RSS feed. Keep them concise and link to the relevant documentation.

1. In the matching blog folder ([blog-collector](https://github.com/SumoLogic/sumologic-documentation/tree/main/blog-collector), [blog-cse](https://github.com/SumoLogic/sumologic-documentation/tree/main/blog-cse), [blog-csoar](https://github.com/SumoLogic/sumologic-documentation/tree/main/blog-csoar), [blog-developer](https://github.com/SumoLogic/sumologic-documentation/tree/main/blog-developer), [blog-service](https://github.com/SumoLogic/sumologic-documentation/tree/main/blog-service)), add a file named like the other posts in that folder. For blog-service it's `YYYY-MM-DD-<product-or-feature>`; for Cloud SIEM and SOAR it's `YYYY-MM-DD-application-update` or `YYYY-MM-DD-content-update`.
1. Copy the frontmatter from a recent post in the same folder and update the values. Two fields are specific to release notes:
    * `hide_table_of_contents: true`. Hides the TOC so the notes render clean and full-width.
    * `image`. Used by the RSS feed and social card. If the note has no screenshot to feature, point it at the Sumo Logic logo: `https://assets-www.sumologic.com/company-logos/_800x418_crop_center-center_82_none/SumoLogic_Preview_600x600.jpg`.

   For service release notes, append the category in parentheses to the `title` (for example, `Automatic Log Level Detection (Search)`). Check recent service notes for category names.
1. Write the note. Add links, bullets, and images as needed.

For lengthy release notes, write a 1-2 paragraph introduction, then add a truncate line (`<!--truncate-->`), followed by the full set of release notes.

**Release note language**

Open with a direct statement of what changed. Do not use excitement or announcement phrases.

| &#9989; **Do** | &#10060; **Don't** |
|:---------------|:-------------------|
| "Multi-child-org search results now include an `_orgName` field alongside `_orgId`, so MSSP users can identify which child org a result came from." | "We're excited to announce that multi-child-org search results now include an `_orgName` field..." |
| "A native Sumo Logic HTTP Source webhook integration for LiteLLM is now available, enabling you to collect LiteLLM usage and proxy log data." | "We are excited to announce the addition of a native Sumo Logic HTTP Source webhook integration for LiteLLM." |
| "This release includes security and stability fixes." | "We've enhanced the security and stability of the Collector." |

## Reusing content

When the same passage appears in more than one doc, put it once in the [`/docs/reuse`](https://github.com/SumoLogic/sumologic-documentation/tree/main/docs/reuse) folder and import it where you need it. Add the import at the top of the file, then place the component where the content should appear:

```md
import ApiRoles from '../reuse/api-roles.md';

<ApiRoles/>
```

For example, `reuse/api-roles.md` is one sentence about required role capabilities. Around 50 API reference docs import it under their own `## Required role capabilities` heading, then follow it with the capabilities specific to that API.

Headings inside a reuse file don't show up in the right-side nav of the docs that import it. So keep any H2 or H3 heading in the importing doc, and put only the body (and any H4 or lower headings) in the reuse file.

## Tables

Use standard Markdown tables. Columns left-align by default; put `:--:` in a column's divider cell to center it, `--:` to right-align. Cells take inline Markdown, links, images, and `<br/>` for line breaks. The site theme adds zebra striping automatically. Fall back to a raw HTML table only for layouts Markdown can't express, such as row or column spans.


## Tabs

Use [Docusaurus tabs](https://docusaurus.io/docs/markdown-features/tabs) for mutually exclusive paths: environment (Kubernetes vs. non-Kubernetes), operating system, or collection method. Add the imports once near the top of the file:

```md
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

Sumo conventions:

* **Use `groupId`** when the same choice appears more than once on a page, or across pages, so the reader's selection syncs and sticks (for example, `groupId="k8s-nonk8s"`).
* **Make each tab self-contained.** A reader who picks one tab and ignores the rest should still get every step for that path. Don't split a procedure so that step 3 is under one tab and step 4 under another.
* `className="unique-tabs"` appears in many existing docs but has no effect, since no stylesheet targets it. Leave it off new tab sets.


## SEO

For clarity and search engine discoverability:

* Doc titles are very important for SEO. Use primary target keywords, try to mention "Sumo Logic", and keep length under 60 characters.
   * Example: ~~_Monitoring with the Observability Solution_~~ &rarr; _Monitoring with Sumo Logic Observability_
* Use H2 sections to break up content and try to use primary keywords here as well.
   * Example: _AWS Observability Solution_.
* H3 and H4 headers do not impact SEO as much. Use short, meaningful titles for readability and search.
   * Example: _System architecture and monitoring_.

:::sumo For internal contributors
* If you change a URL, set up a [redirect](/docs/contributing/remove-doc#step-2-create-a-301-redirect) so that users don’t get a 404 page.
* Use Google Analytics to make data-driven decisions.
:::

### Metadata descriptions

The `description` frontmatter field controls the snippet shown in search engine results. Follow these rules:

* **Length: 140–160 characters.** Google truncates descriptions at approximately 160 characters. Descriptions under 100 characters are too short to be useful — search engines may generate their own snippet instead.
* **Plain text only.** Do not use Markdown syntax in the `description` field. Backticks, bold (`**`), and other Markdown formatting render as literal characters in HTML `<meta>` tags and appear as symbols in search results.
* **Lead with an action verb or the product/feature name.** Do not start with "This page", "This doc", or "This article."
* **Write for humans.** Describe what the reader will learn or accomplish, not just what the page contains.

Example:

| | Description |
|--|--|
| Too long | `Use the accum operator to calculate the cumulative sum of a numeric field in your search results. Track running totals by time interval or across all data points, ideal for monitoring incremental growth in request counts, error rates, or resource consumption.` (366 chars) |
| Too short | `Learn about the accum operator.` (32 chars) |
| Correct | `Use the accum operator to calculate the cumulative sum of a numeric field. Track running totals by time interval or across all data points.` (140 chars) |

### AEO (Answer Engine Optimization)

Answer Engine Optimization improves the chances of your content appearing as a direct answer in search results, including Google featured snippets and "People also ask" boxes.

* **Answer the question in the first 1–2 sentences.** The opening paragraph should directly state what the subject is or what the reader will accomplish. Do not bury the answer after several sentences of context.
* **Use question-format H2 headings where natural.** Headings like "What is X?" or "How do I configure Y?" help search engines match content to user queries.
   * Example: ~~_Overview_~~ &rarr; _What is the Outlier operator?_
* **Use structured lists and tables.** Search engines extract lists and tables preferentially for featured snippets. Use them wherever content is enumerable or comparative.
* **Define key terms explicitly.** Write "X is..." or "X means..." on first use so search engines can extract accurate definitions.

### GEO (Generative Engine Optimization)

Generative Engine Optimization improves the likelihood that AI-powered search tools (such as ChatGPT, Perplexity, and Google AI Overviews) cite your content accurately in generated responses.

* **Make the opening paragraph self-contained.** LLMs pull from the first few sentences to decide whether to cite a page. The opening should be understandable without reading anything else on the page.
* **State facts as explicit standalone sentences.** Avoid burying key information in subordinate clauses. A fact stated in its own sentence is more likely to be cited verbatim.
   * Example: ~~_The operator, which supports up to 10,000 events per second depending on instance size, works with both collector types._~~ &rarr; _The operator supports up to 10,000 events per second on large instances. It works with both Hosted and Installed Collectors._
* **Use specific version numbers and dates.** Avoid "latest", "current", or "recent" without a specific value. AI tools reproduce whatever is on the page — vague references become stale citations.
* **Add an "At a glance" section for long pages.** For pages over 800 words, add a brief summary section near the top with key facts as short bullet points. This is the most citation-friendly portion of a page for generative AI tools.



## UI elements

For how to format and capitalize a UI element's name (bold the label, match on-screen capitalization, and lowercase it when you mean the concept rather than the control), see [Bold](#bold) and [Capitalization](#capitalization).

Not all UI elements have an intuitive name. It's the very nature of working with a constantly evolving product. Here are some examples:

import UiElements from '../reuse/ui-elements.md';

<UiElements/>

### Cascading instructions

When providing instructions that involve multiple UI elements, list them sequentially and in cascading order. For example: Click **More Actions** > **Delete**.

### Referring to locations in the UI

Avoid "below", "above", "next to", and so on, when referring to UI elements on a page, as locations may change or appear differently for different users.

### Mouse actions

Try to avoid these if possible. Instead, use "Select".

If you need to use mouse actions to be specific, use:
* "Click" (not "Click on" or "Left-click")
* "Right-click"
* "Hover" (not "Mouse over")
* "Drag"


### When to use “select”, “choose”, and “enter”

* **Select**. Use to tell users to pick something from a limited number of options, such as from a list or a dropdown menu, or when you are referring to checking or toggling a UI element.
* **Choose**. Use to encourage the user to make a decision that is more subjective or open-ended.
* **Enter**. Use enter when the user is explicitly inputting something from scratch, rather than from a pre-built set of options.


## Videos

Throughout the docs, we embed tutorial videos on pages where they're relevant to the topic. The Training Team produces these videos. When you embed one they've provided — usually inside a `:::training` admonition — add the import once near the top of the file:

```md
import Iframe from 'react-iframe';
```

Most Sumo Logic videos are hosted on Wistia. Don't make watching a video required to complete a task; the written steps must stand on their own.

Paste the matching snippet into the body:

<Tabs
  defaultValue="wistia"
  values={[
    {label: 'Wistia', value: 'wistia'},
    {label: 'YouTube', value: 'youtube'},
  ]}>

<TabItem value="wistia">

Use the `fast.wistia.net/embed/iframe/` URL with `?web_component=true&seo=true&videoFoam=false`.

```html
<Iframe url="https://fast.wistia.net/embed/iframe/VIDEO_ID?web_component=true&seo=true&videoFoam=false"
  width="854px"
  height="480px"
  className="video-container"
  display="initial"
  position="relative"
  allow="autoplay; fullscreen"
  allowfullscreen
/>
```

</TabItem>
<TabItem value="youtube">

Append `?rel=0` to the embed URL so only same-channel videos are suggested after the video finishes.

```html
<Iframe url="https://www.youtube.com/embed/VIDEO_ID?rel=0"
  width="854px"
  height="480px"
  className="video-container"
  display="initial"
  position="relative"
  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen
/>
```

</TabItem>
</Tabs>
