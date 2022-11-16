---
id: style-guide
title: Sumo Logic Style Guide
sidebar_label: Style Guide
description: A guide to styling and formatting Sumo Logic Docs.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This page details how to author Sumo Docs, which are written in GitHub-flavored markdown.

The Sumo Logic Style Guide is a guide to language at Sumo Logic, so that we can speak as one company with a unified voice, and know what we mean when we talk about our product. The Style Guide began as a document used by the Documentation team to make decisions about tone, voice, and word usage. We thought it would be useful to share with everyone in our community.

This is a living document. If you've wondered about the usage of the name of a component, a feature in the UI, or any other word usage, and you don't find that term here, please let us know. The Documentation team will look it up and add usage guidance. Likewise, if you disagree with any usage defined here, please let us know and we'll update as necessary.


## Grammar and Style

If you need help with a convention, word to use, or format to follow, we will keep a cheatsheet of styles here. We also follow:

* [Merriam-Webster Dictionary](https://www.merriam-webster.com/)
* *[The Chicago Manual of Style](https://www.chicagomanualofstyle.org/home.html)*
* [Microsoft Manual of Style](https://docs.microsoft.com/en-us/style-guide/welcome/)
  * [User Input | Formatting Text in Instructions](https://docs.microsoft.com/en-us/style-guide/procedures-instructions/formatting-text-in-instructions)

For terminology usage guidance, see our [Word List](docs/contributing/word-list.md).

## Writing Resources

If you're new to writing content or would like to learn more, check out these resources:
* [Write the Docs](https://www.writethedocs.org/guide/writing/beginners-guide-to-docs/) - Association of tech writers, developers, trainers, and more that have collected ideas, created training and guidelines, and actively discuss documentation.
* [Google Technical Writing Courses](https://developers.google.com/tech-writing) - Excellent and easy self-paced courses to refine your writing. Be advised, the courses may use a different style, but still excellent to get started.
* [Every Page is Page One](https://everypageispageone.com/examples-of-eppo-topics/) - A helpful method for considering what goes into a page is to think of every page as page one. With the extreme use of search engines or sharing a link to find content, users may land in the middle of a section or tutorial. These ideas help hone your content and focus on user needs.

Helpful blogs on tech writing:
* [Usability and Tech Writing](https://www.nngroup.com/topic/writing-web/) - Jakob Neilson defined usability, including insights on technical writing and learning, helpful for writing docs
* [Feathers tech writing](https://ffeathers.wordpress.com/) - Pioneered API and technical tech writing, insights and instructions
* [I'd rather be writing](https://idratherbewriting.com/) - Guides and thoughts on tech writing process and content

The Sumo Logic Docs team will review submissions, provide suggested edits, add new content into the navigation, and answer any questions you have.

<!--
### Templates

To quickly create a new doc, use a template. You can copy and paste the file, add your content, and submit a PR. If you need formats for specific code, see the formats template.

(coming soon)
* Doc topic - Use for any documentation page
* APIs - Use for API and code
* Format template
-->

## Voice and Tone

* We are clear, genuine, and trustworthy. We understand that our customers entrust us with their vital data and never make light about our commitment to data access and security.
* The reader should feel confident and informed. We should strive to engage our customers, and show them where to get additional assistance when needed.
* Describe Sumo Logic in a professional and truthful manner. Avoid generic, unsubstantial adjectives like "very" or phrases like "we're the best". Instead, illustrate these points by letting our product speak for itself.
* Avoid using a stiff, institutional voice. Instead, write with an instructive and conversational tone. For example, when linking to the support site, use terms like "Need help? Let us know" instead of "Please email our support personnel" to give our company a friendly face.
* Use the [active voice](#active-voice) whenever possible. For example, use "Brutus stabbed Caesar," not "Caesar was stabbed by Brutus."
* Instructional content and blog posts should be written at approximately the 8th-grade reading level, particularly in introductory sections, for readability and SEO. You can test your content [here](http://www.writingtester.com/tester/grade_level.php).
* When explaining a process or procedure, clarity is critical. Edit words that distract or confuse. Put yourself into the reader's shoes and think about what actions you are recommended to them when an error message is displayed, rather than merely stating what went wrong. Example: "Could not create the user." vs "This email is already registered in the system. Please use a different email or contact Sumo Logic for assistance."
* We use the Oxford (serial) comma. For example, use "I had eggs, toast, and orange juice", not "I had [eggs, toast and orange juice](https://www.verbicidemagazine.com/wp-content/uploads/2012/01/why-i-still-use-the-oxford-comma.jpg)".
* We have a sense of humor! Conveying that we do serious work, but we don't take ourselves too seriously, makes Sumo Logic feel likable.

## Structuring Content

* Tell the user in the doc introduction (first paragraph) what the page teaches, why they should read it, and who should read it.
* Let the user know what step/place they are in for a tutorial in the introduction/at top. The layout automatically provides a previous/next at the bottom of the page.
* Link out to important concepts and overviews for additional reading. This is helpful for instruction pages or tutorials.
* Keep instructions concise, easy to follow, not too many screenshots.
* Include any notes, warnings, tips, or other admonitions.

## Active Voice

When writing instructions, it helps to always use active voice. This gives a call to action for the reader or user to effectively get something done. It also reduces word count and keeps instructions clear.

| Active &#9989; | Not Active &#10060; | Why? |
| :-- | :-- | :-- |
| Add a resource... | You can add a resource... | They know they can do a thing. Clearly state to do the thing. |
| Build the query using the following... | Please build the query using the following... | We need them to complete a task. No need for please. |
| To add a new collector:<br/>1. Access Sumo Logic and find the... | 1. When you need to add a new collector, access Sumo Logic and find the... | Introduce your instructions with the goal, then dive into the instructions. This is called a stem, and it helps focus the task and keeps you active. |

## Acronyms

An acronym uses the first initials of a word or phrase, for brevity. Our industry is full of them, and they can get confusing if their usage isn't clear. Acronyms should be capitalized, if not used directly in a query, etc. Unless the usage is clear from the context, for the first usage, spell out the phrase, then present the acronym in parenthesis. For example: Secure Shell (SSH).

All companies have numerous acronyms for product, features, solutions, and more. Our documentation includes acronyms for Sumo Logic and third party software. Always fully spell out the first instance of the acronym on the page, then you can use it throughout. Do not spell out in a heading, but in paragraphs or bullets.

For example, the first time you use AWS Application Load Balancer (ALB), you introduce or use it like that the first time on the page. Through the rest of the page, you can use ALB.

## Contractions

Positive contractions are okay (e.g., we're). Do not use negative contractions (e.g., don't, can't, shouldn't), as they can be mistaken for the opposite meaning, especially if someone is reading quickly. Spell out those words.

<!--
### UI Element Names

Not everything has an intuitive name. It's the very nature of working with a constantly evolving product. Here are some examples:

| What does it look like? | What does Sumo call it? |
|:------------------------|:--------------------|
| x | Three-dot icon      |
| x | Navigation Menu     |
| x | Favorites           |
| x | Personal Folder     |
| x | Recents             |
| x | Library             |
-->

## Patents and trademarks

Protecting our patents and trademarks is important to do correctly. We don't want to expose the company to a loss of trademark or patent just because we didn't list it correctly.

This is a partial list of trademarked terms, which should be capitalized exactly as shown below.

* Sumo Logic
* Big Data for Real Time IT
* Log Reduce
* Elastic Log Processing
* Push Analytics

Never use Sumo Logic in the plural or possessive form.

## SEO

For clarity and search engine discoverability:

* Doc titles are very important for SEO. Use primary target keywords, try to mention "Sumo Logic, and keep length under 60 characters.
   * Example: ~~_Monitoring with the Observability Solution_~~ &rarr; _Monitoring with Sumo Logic Observability_
* Use H2 sections to break up content and try to use primary keywords here as well.
   * Example: _AWS Observability Solution_.
* H3 and H4 headers don't impact SEO as much. Use short, meaningful titles for readability and search.
   * Example: _System architecture and monitoring_.

:::sumo For internal contributors
* If you change a URL, set up a redirect so that users don’t get a 404 page.
* Use Google Analytics to make data-driven decisions.
:::


## Markdown

Markdown is a simple, text-based format you can write using text editors, IDEs, or the GitHub website to write content. We use Docusaurus to manage, style, and build our site. We use GitHub-flavored Markdown, with some additional options. You can find more info at:
* [Docusaurus | Markdown Cheat Sheet](https://docusaurus.io/docs/markdown-features)
* [Markdown Guide](https://www.markdownguide.org/)
* [Markdown Cheatsheet](https://guides.github.com/pdfs/markdown-cheatsheet-online.pdf)

## File Naming Convention

A Markdown file has a filename and extension of .md. We recommend keeping the filename short. It does not affect the canonical link.

## Metadata (Frontmatter)

Markdown documents have metadata (e.g., title, description, and search keywords) at the top called [frontmatter](https://jekyllrb.com/docs/front-matter/). Every page should have an `id` used for sidebar navigation.

```markdown
---
id: page-id
title: Page title
sidebar_label: Navigation title
description: Learn more about...
keywords:
    - metrics
    - traces
tags: [apm, metrics]  
---
```

| Parameter | Description |
| :-- | :-- |
| `id:` | **(Required)** Id for the page used in the sidebar and as the canonical link. Keep it short and only use dashes. |
| `slug:` | (Optional) Overrides the `id:` for the canonical link. Best used for index pages for sections. |
| `title:` | **(Required)** For SEO, be sure to sure main keywords in your title and keep it under 60 characters. This title is used in navigation if a `sidebar_label` is not included. |
| `sidebar_label:` | (Optional) Use a different title for the side navigation. Keep this title short. It does not affect the canonical link or page title. |
| `description:` | (Optional) 1-2 sentences describing what the user will find in the doc. It appears in search engine results. If omitted, search engines will pull first couple sentences instead. |
| `keywords:` | (Optional) List of page keywords, which boosts SEO. |
| `tags:` | (Optional) A string or list of tags that adds a label and permalink to tag to help with sorting. |

For a full list of options, see [Docusaurus Markdown front matter](https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-content-docs#markdown-front-matter).


## Headings

Use hashtags `#` to indicate the heading level and group content. Always start with H2 headers (`##`) in your doc body. Link anchors also generate automatically.

* We mark a heading using a number of # for the level. This section is using an H3 heading, which is `### Headings`.
*  Never use H1 (`#`) in your document. This is generated automatically by the page title (`title:` in frontmatter).
* Headings should always be clean, plain text. Do not use **bold**, _italics_, or code ticks.
* Be careful of using special characters. Dashes are ok, but try to avoid other punctuation.

<Tabs
  className="unique-tabs"
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

:::caution
Headings must be used in correct order. The subsection of an H2 header would be H3 - you wouldn't jump to an H4 or H5. Skipping over a header level affects search and SEO structures to search crawlers like Google. Malformed structures can reduce search and SEO for the page. Docusaurus carefully formats generated pages to ensure strong SEO.
:::


## Punctuation

Punctuation is placed outside of quotation marks, British English style. For everything else (dates, times, spelling), we use American English style.

## Bold, Italics, Underlines

* Use _italics_ for:
  * Defining a term the first time. For example, when defining a collector the first time, you would italicize once with the definition.
  * Providing content to enter into a field.

* Use **bold** for UI elements you interact with, such as a button or tab.

* Never underline text

<Tabs
  className="unique-tabs"
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


## Lists

You can mix ordered (or numbered) and unordered (or bulleted) lists together. Use extra lines and tabs (or 2 spaces) to move content under these bullets, including other bullets, paragraphs, images, and more. Be careful of tabbing over too far. A third tab will automatically render as code.

### Numbered Lists

Use numbered lists when providing a set of instructions or steps.

Always start with `1.`. Markdown automatically numbers sequentially when building the site. This can be helpful when you need to add or change the order of instructions (no need to edit every number).

```markdown title="Markdown Ordered List"
1. First ordered list item.
1. Another item.
   - Unordered sub-list.
1. Actual numbers don't matter, just that it is a number.
   1. Ordered sub-list.
1. And another item.

  More content for this entry. And a screenshot:<br/> ![span hover](/img/apm/traces/span-hover-view.png)

```

1. First ordered list item.
1. Another item.
   - Unordered sub-list.
1. Actual numbers don't matter, just that it is a number.
   1. Ordered sub-list.
1. And another item.

  More content for this entry. And a screenshot:<br/> ![span hover](/img/apm/traces/span-hover-view.png)


### Bulleted Lists

Use bulleted lists when the items don't need to be presented in sequential order. Ensure parallel grammatical structure - that is, start each bullet with the same part of speech - and end each bullet in a period. Use asterisks `*` for unordered, bulleted lists.

<Tabs
  className="unique-tabs"
  defaultValue="Markdown"
  values={[
    {label: 'Markdown', value: 'Markdown'},
    {label: 'Result', value: 'Result'},
  ]}>

<TabItem value="Markdown">

```markdown title="Markdown Unordered List"
* Unordered list line 1.
* Line 2.

  Content to show under 2.

  * Another set of bullets.
  * Here we go, another!
```

</TabItem>
<TabItem value="Result">

* Unordered list line 1.
* Line 2.

  Content to show under 2.

  * Another set of bullets.
  * Here we go, another!

</TabItem>
</Tabs>

You can configure your editor to always use this format for lists. For Visual Studio Code, configure the following settings:

* **Ordered List: Marker** set to *one*.
* **Unordered List: Marker** set to *.


## Links

Regular Markdown links are supported, using url paths or relative file paths.

<Tabs
  className="unique-tabs"
  defaultValue="Markdown"
  values={[
    {label: 'Markdown', value: 'Markdown'},
    {label: 'Result', value: 'Result'},
  ]}>

<TabItem value="Markdown">

**Linking to other headers in the same file:**

```md
Here's how to make a [table](#tables).
```

**Linking to files in the same folder:**

```md
Check out our [style guide](style-guide.md).

How about [translations](./translations.md)?
```

**Linking to files in other parent folders:**

```md
Learn how to [sign up with Sumo](../get-started/sign-up.md).
```

</TabItem>
<TabItem value="Result">

**Linking to other headers in the same file:**

Here's how to make a [table](#tables).

**Linking to files in the same folder:**

Check out our [style guide](style-guide.md).

How about [translations](./translations.md)?

**Linking to files in other parent folders:**

Learn how to [sign up with Sumo](../get-started/sign-up.md).

</TabItem>
</Tabs>

## Code (Inline)

* Use \` \` single backticks to format inline code, such as commands, API method names, and code. For information on code blocks (scripts), see [Code Blocks](#code-blocks).

Here's an example that encompasses all the above styles: If you are not parsing all sources in the hosted collector with the same parser, click the **+Add Field** link, and add a field whose name is `_parser` with value _/Parsers/System/Auth0/Auth0_.

## Code Blocks

Use code blocks to format scripts, such as the JSON example below. This is important for scripts and CLI. Always use these to format programming language scripts (i.e., SQL for Sumo queries, JSON for logs). Format blocks of code by placing triple backticks before and after the code.

```json
{  
  "employee": {
    "name": "Jane Smith",   
    "team": "Operations",   
    "manager": true  
  }  
}  
```

Markdown code blocks support Syntax highlighting. If you know the code language, include that in the first set of ticks. This applies code highlighting for the language. See [this list](https://prismjs.com/#supported-languages) of available languages.

To highlight lines in the code, use `{#}` in the title line with lines numbers. This example highlights lines 2 through 6.

```sql {2-6}
_sourceCategory=reinvent/travel/checkout
[subquery:_sourceCategory=reinvent/travel/nginx
     | count by src_ip
     | topk(1,_count)
     | compose src_ip keywords
]
| json field=_raw "funcName"
| where funcname in ("process_cart","charge")
| if (funcname = "process_cart" , "Checkout", "Purchased") as funcname
| count by funcname
```

<Tabs
  className="unique-tabs"
  defaultValue="Markdown"
  values={[
    {label: 'Markdown', value: 'Markdown'},
    {label: 'Result', value: 'Result'},
  ]}>

<TabItem value="Markdown">

    ```jsx title="src/components/HelloDocusaurus.js"
    function HelloDocusaurus() {
        return (
            <h1>Hello, Docusaurus!</h1>
        )
    }
    ```

</TabItem>
<TabItem value="Result">

```jsx title="src/components/HelloDocusaurus.js"
function HelloDocusaurus() {
  return <h1>Hello, Docusaurus!</h1>;
}
```

</TabItem>
</Tabs>

For a full list of options, see [Docusaurus Code Blocks](https://docusaurus.io/docs/markdown-cheat-sheet/code-blocks).



## Notes (Admonitions)

We refer to callout elements like Tip, Note, Warning, and Caution as admonitions.

Docusaurus has a special syntax to create admonitions and callouts, including note, tip, important, caution, warning, and sumo. You can use markdown content in the admonitions, code blocks, links, bullets, images, videos, and much more.

<Tabs
  className="unique-tabs"
  defaultValue="Markdown"
  values={[
    {label: 'Markdown', value: 'Markdown'},
    {label: 'Result', value: 'Result'},
  ]}>

<TabItem value="Markdown">

```md

:::note
This is a note.
:::

:::tip
This is a tip about a cool feature option.
:::

:::important
This is some vital information.
:::

:::danger
This action is dangerous and could result in data loss.
:::

:::caution
This could note important and problematic information.
:::

:::sumo Best Practice
Highlight specific info, best practices, links, [training links](https://www.sumologic.com/learn/training/), and other information from Sumo specialists. You can change the title based on the content.
:::

```

</TabItem>
<TabItem value="Result">

:::note
This is a note.
:::

:::tip
This is a tip about a cool feature option.
:::

:::important
This is some vital information.
:::

:::danger
This action is dangerous and could result in data loss.
:::

:::caution
This could note important and problematic information.
:::

:::sumo Best Practice
Highlight specific info, best practices, links, [training links](https://www.sumologic.com/learn/training/), and other information from Sumo specialists. You can change the title based on the content.
:::

</TabItem>
</Tabs>

You can use [code blocks](#code-blocks) in admonitions. Here's an example:

:::tip
Here's a cool tip.

```json title="You can highlight lines in code blocks" {11-16}
"overrides": [
    {
    "series": [],
    "queries": [
        "A"
        ],
    "userProvidedChartType": false,
    "properties": {
        "type": "column"
        },
    "unsafeCanvasJSProperties": {
        "bevelEnabled": true,
        "indexLabelPlacement": "inside",
        "indexLabel": "{y}",
        "indexLabelOrientation": "vertical"
        }
    }
]
```

:::


## Media Assets

In Docusaurus, you can add images, custom files, and embed videos.

### Images

Images must be added to the `static/img` folders. The `img` folder structure currently mirrors the doc sections. To stay organized, always replace existing images, rather than adding new images appended with dates or version numbers.

* Images should be in PNG or GIF format
* Always include image alt text
* Width parameters should be used to resize oversized and/or pixelated images

1. Save your image(s) in the `/static/img` folder.
2. Add the import line to the top of your doc, underneath the [front matter header](#front-matter).
  ```
  import useBaseUrl from '@docusaurus/useBaseUrl';
  ```
3. Paste the below code snippet where you want your image to appear.
   * Replace with file path with your own and ensure it includes the correct subfolder name. The file path must start with `img` (do not preface it with `/static`) because Docusaurus builds and saves these static assets and serves from the `baseUrl` (or domain).
   * Add alt text and optionally, you can add width parameter to resize your image, if needed.
   ```
   <img src={useBaseUrl('img/<your-image-file-path>.png')} alt="<your image description>" width="<insert-pixel-number>"/>
   ```

<details><summary>What is alt text?</summary>

When you insert an image, describe the image in the Alt text, which explains what the image is meant to show. It is used by readers who can't see images well, or who have software that reads the text aloud, and even by readers with slow Internet connections who don't want to wait for images to download.

Alt text is not a caption and it doesn't need to describe the details of an image. It's just a label: "Image properties dialog" or "Sumo Logic logo."

Alt text of some kind is required under [US Government GSA Section 508](https://www.section508.gov/section508_faqs) regulations. Non-compliance with Section 508 can cost a company federal sales. Many companies start out ignoring this future possibility and, like everything, it is more expensive to fix later.

If you are editing and you come across an image without Alt text, add it.

</details>

<Tabs
  className="unique-tabs"
  defaultValue="Markdown"
  values={[
    {label: 'Markdown', value: 'Markdown'},
    {label: 'Result', value: 'Result'},
  ]}>

<TabItem value="Markdown">

```md
<img src={useBaseUrl('img/sumo-square.png')} alt="Sumo Logic thumbnail logo" width="150"/>
```

</TabItem>
<TabItem value="Result">

<img src={useBaseUrl('img/sumo-square.png')} alt="Sumo Logic thumbnail logo" width="150"/>

</TabItem>
</Tabs>



#### Screenshots

Capture screenshots using SnagIt in .png format. Use SnagIt's border effect to apply a gray (RGB 212, 212, 212) four-point border.

By default, images that you insert into a page are set to be responsive - resized for the type of device the reader is using.


#### Masking sensitive information

We mask sensitive information, like user names, email addresses, IP addresses, and so on. In [Snagit](https://www.techsmith.com/screen-capture.html) or a similar program, use the shape tool to mask the text using solid gray, (RGB 212, 212, 212).

#### Callouts

Create callouts using the shape tool in SnagIt. Callouts should be red, 100% opacity, no drop shadow effect, 2 pts wide.


### Videos

You can embed YouTube videos to any page with the following code. Just copy and paste the following code into your page. Replace the URL ID with the video id. You only need the `import Iframe` line once on the page.

```html
<Iframe url="https://www.youtube.com/embed/ZcbHoC1jZz4?rel=0"
        width="854px"
        height="480px"
        id="myId"
        className="video-container"
        display="initial"
        position="relative"
        allow="accelerometer; autoplay=1; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        />

import Iframe from 'react-iframe';
```

For example:

<Iframe url="https://www.youtube.com/embed/ZcbHoC1jZz4?rel=0"
        width="854px"
        height="480px"
        id="myId"
        className="video-container"
        display="initial"
        position="relative"
        allow="accelerometer; autoplay=1; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        />

import Iframe from 'react-iframe';

You need to explicitly add `?rel=0` to the end of the URL. This ensures that only videos from the current YouTube channel will be suggested to the viewer after they've finished viewing the embedded video.

### Downloadable Files

You can also add files such as custom code, json, yaml, and xml in the `static/files` folder. Supported file formats include .json, .js, .doc, and more. You link to the file using the file path of `/files` and file name:

```md
![Download this Terraform](/files/terraform/script.tf)
```

If your file is available from another public Sumo Logic repo, please link to that file instead as a URL link. See [Docusaurus Static Assets](https://docusaurus.io/docs/static-assets) for more information.



## Tables
Simple tables can help format content. For example, lists of attributes with descriptions. Adding the style below the table helps with formatting.

Tables use plain markdown with one header, default left aligned columns, and multi-colored rows. You can use Markdown for links and images. To break up content, you can use `<br/>` for line breaks.

<Tabs
  className="unique-tabs"
  defaultValue="Markdown"
  values={[
    {label: 'Markdown', value: 'Markdown'},
    {label: 'Result', value: 'Result'},
  ]}>

<TabItem value="Markdown">

```
| Column Name | Example Value | Description |
| :-- | :-- | :-- |
| Trace ID | ffaf2f69ee8ad0c1 | The unique identifier of the trace. |
| Root Service | api | The service that started the trace. |
| Started At | 07/27/2020 09:01:04.533 | When the trace started. |
| Duration | 12.582 ms | The amount of time the trace spans.  |
| Number of spans | 35 | A trace consists of spans. This number tells you how many spans are in the trace. |
| Duration Breakdown | ![breakdown](/img/apm/traces/breakdown.png) | Each color indicates a service. The colors assigned to services are always the same on your account. You can change the color in the span summary tab after clicking on the individual span in trace view.<br/>Hover over to view a percentage breakdown of how long each span covers in the trace.<br/>![span hover](/img/apm/traces/span-hover-view.png) |
| Number of errors | 0 | The number of errors in the trace. |
| Status | 200 | The HTTP status code of the trace. |
```


```
Colons can be used to align columns.

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

There must be at least 3 dashes separating each header cell.
The outer pipes (|) are optional, and you don't need to make the
raw Markdown line up prettily. You can also use inline Markdown.

Markdown | Less | Pretty
--- | --- | ---
*Still* | `renders` | **nicely**
1 | 2 | 3
```

</TabItem>
<TabItem value="Result">

| Column Name | Example Value | Description |
| :-- | :-- | :-- |
| Trace ID | ffaf2f69ee8ad0c1 | The unique identifier of the trace. |
| Root Service | api | The service that started the trace. |
| Started At | 07/27/2020 09:01:04.533 | When the trace started. |
| Duration | 12.582 ms | The amount of time the trace spans.  |
| Number of spans | 35 | A trace consists of spans. This number tells you how many spans are in the trace. |
| Duration Breakdown | ![breakdown](/img/apm/traces/breakdown.png) | Each color indicates a service. The colors assigned to services are always the same on your account. You can change the color in the span summary tab after clicking on the individual span in trace view.<br/>Hover over to view a percentage breakdown of how long each span covers in the trace.<br/>![span hover](/img/apm/traces/span-hover-view.png) |
| Number of errors | 0 | The number of errors in the trace. |
| Status | 200 | The HTTP status code of the trace. |

Colons can be used to align columns.

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

There must be at least 3 dashes separating each header cell.
The outer pipes (|) are optional, and you don't need to make the
raw Markdown line up prettily. You can also use inline Markdown.

Markdown | Less | Pretty
--- | --- | ---
*Still* | `renders` | **nicely**
1 | 2 | 3

</TabItem>
</Tabs>

Docusaurus also supports HTML tables.


## Tabs

Use the following code to create tabbed content. You can use Markdown in these tabs, including text, code content, images, and more.

At the bottom of the Markdown file, add the following code:

```md title="Copy and paste once into markdown file"
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

For each set of tabs, use the following code:

```md title="Copy and paste into markdown for each tab set"
<Tabs
  className="unique-tabs"
  defaultValue="tab1"
  values={[
    {label: 'Tab 1', value: 'tab1'},
    {label: 'Tab 2', value: 'tab2'},
  ]}>

<TabItem value="tab1">

Add content here for first tab.

</TabItem>
<TabItem value="tab2">

Add content here for second tab.

</TabItem>
</Tabs>
```

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

See the following tabbed code examples:

<Tabs
  className="unique-tabs"
  defaultValue="kinesis"
  values={[
    {label: 'Kinsesis Firehose', value: 'kinesis'},
    {label: 'Lambda', value: 'lambda'},
  ]}>

<TabItem value="kinesis">

Setup a Source in Sumo Logic:

Navigate to Collection management (Manage Data > Collection)
Use an existing Hosted Collector, or create a new one.
Next to the collector, select “Add Source”.
Select “AWS Kinesis Firehose for Logs”
Enter a Name to identify the source.
Enter a Source Category following the best practices found in “Good Source Category, Bad Source Category”

Deploy the Cloudformation Template to Create a Kinesis Firehose Delivery Stream:

1. Download the Cloudformation template.
1. Open CloudFormation in AWS.
1. Create a new stack using the CloudFormation template you downloaded.
1. Provide the URL you created from your Sumo source.
1. Select an S3 bucket to deliver failed logs, or create a new one.
1. Click next.

Accept the IAM permissions, and create the stack.

  </TabItem>
  <TabItem value="lambda">

Info for the second tab would go here! Content can include markdown, code blocks, notes, and more.

  </TabItem>
</Tabs>



## Sidebar Navigation Menu

The [`sidebars.ts` file](https://github.com/SumoLogic/sumologic-documentation/blob/main/sidebars.ts) controls the sidebar navigation for the entire site. It consists of multiple sidebars and sections based on the Guides top navigation, drilling down per guide. A list of sections and advice on content is at the top of the sidebars file, with comments throughout. This is different from the [`docusaurus.config.js` file](https://docusaurus.io/docs/api/docusaurus-config), which controls top-level navigation content.

* To add a specific page, you include the directory path and topic id from the frontmatter. For example, this page is `contributing/create-document`.
* To add a section within a section, use a category section with page links in it (see below example).
* To add an index for a section, create an index.md page in the folder. Give it a `slug: name` where the name is the folder for the entire section like contribution-guide. In the category, use a link line with the folder name and index for example: `link: {type: 'doc', id: 'contributing/index'},`.
* To add a new page, make note of the file path and id. For example, this document is located in the folder `contributing` with an id of `create-document`. When adding this file to the sidebar, it would be added to the `contributing/create-document`.

<details><summary>Example: add <code>contribution/create-document</code> to sidebars.ts</summary>

```js title="sidebars.ts"
//Contribution guide for documentation
  contributing: [
    {
      type: 'category',
      label: 'Contribution Guide',
      collapsible: true,
      collapsed: false,
      link: {type: 'doc', id: 'contributing/index'},
      items: [
        'contributing/create-document',
        'contributing/build-deploy',
        'contributing/translations',
        {
          type: 'category',
          label: 'Templates',
          collapsible: true,
          collapsed: false,
          items: [
            'contributing/templates/partner-app'
          ]
        }
      ],
    },
  ],
```

</details>

* To add a category, or drop-down list of documentation, use the following format:

<details><summary>Example: add sidebar category example with additional section</summary>

```js title="sidebars.ts"
    {
      type: 'category',
      label: 'Name of Guide',
      collapsible: true,
      collapsed: false,
      link: {type: 'doc', id: 'foldername/id-first-page'},
      items: [
        'foldername/doc-id1',
        'foldername/doc-id2',
        {
          type: 'category',
          label: 'Section in Guide',
          collapsible: true,
          collapsed: false,
          link: {type: 'doc', id: 'foldername/id-section'},
          items: [
            'foldername/doc-id3',
            'foldername/doc-id4',
          ]
        }
      ],
    },
```

</details>

* To add a dedicated sidebar, use the following format:

<details><summary>Example: adding a dedicated sidebar for a guide</summary>

```js title="sidebars.ts"
module.exports = {
  sectionName: [
    {
      type: 'category',
      label: 'Name of Guide',
      collapsible: true,
      collapsed: false,
      link: {type: 'doc', id: 'foldername/id-first-page'},
      items: [
        'foldername/doc-id1',
        'foldername/doc-id2',
        {
          type: 'category',
          label: 'Section in Guide',
          collapsible: true,
          collapsed: false,
          link: {type: 'doc', id: 'foldername/id-section'},
          items: [
            'foldername/doc-id3',
            'foldername/doc-id4',
          ]
        }
      ],
    },
    {
      type: 'category',
      label: 'Name of Another Guide',
      collapsible: true,
      collapsed: false,
      link: {type: 'doc', id: 'otherfoldername/id-first-page'},
      items: [
        'otherfoldername/doc-id1',
        'otherfoldername/doc-id2',
        {
          type: 'category',
          label: 'Section in Another Guide',
          collapsible: true,
          collapsed: false,
          link: {type: 'doc', id: 'otherfoldername/id-section'},
          items: [
            'otherfoldername/doc-id3',
            'otherfoldername/doc-id4',
          ]
        }
      ],
    },
  ]
```
</details>



## Expand/Collapse Content

Use an expander to collapse long content that can be searched but not displayed when loading a page. We recommend only using expanders for additional content and long code samples. Content required for instructions and steps should not be placed in an expander.

You can include markdown content in expanders including code samples, embedded videos, bulleted lists, and more.

```html title="Copy and fill out for expanders"
<details><summary>Title for the expander</summary>

Place long lists or lots of content in this section. The reader can expand/collapse as needed.

Add all content after Summary and before the closing details tags.

</details>
```


<details>

<summary>Example expander</summary>

Place long lists or lots of content in this section. The reader can expand/collapse as needed.

```json title="Code in a tip with line highlight" {11-16}
"overrides": [
    {
    "series": [],
    "queries": [
        "A"
        ],
    "userProvidedChartType": false,
    "properties": {
        "type": "column"
        },
    "unsafeCanvasJSProperties": {
        "bevelEnabled": true,
        "indexLabelPlacement": "inside",
        "indexLabel": "{y}",
        "indexLabelOrientation": "vertical"
        }
    }
]
```

</details>


## Reusing Content

You can create a section of content for reuse by creating a markdown file and saving it in `/docs/reuse`. If the file includes headings, they do not add to the right side page nav. You may want reuse to be just a section of content without headings.

To add the file to another document, use this code with the reuse file name:
```bash
{@import ../../reuse/filename.md}
```


## Hub Page Contents

To generated a full list of docs within a folder, add this code to the file:

```
import DocCardList from '@theme/DocCardList';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

## Guide contents

In this section, we'll introduce the following concepts:

<DocCardList items={useCurrentSidebarCategory().items}/>
```

This is best used in an index file, including a list of all files and folders in that folder to the file. See any category file for a section in the site for how this looks.


<!--
## Import GitHub Repo Files

To embed a code sample from a file in a GitHub repository, use `reference` in the code block with a link to the file. The code sample is embedded using the language with a link to the original file.

This code references a script file: ` ```bash reference`, for example:

```bash reference
https://github.com/ccaum/sumologic-solution-templates/blob/github_getting_started_guide/software-development-optimization-terraform/scripts/getting-started
```

You can use a link to a file embedding the entire file, or embed a range of code lines using `#L` and a line range at the end of the link, such as `#L105-108`.
-->

## Release Notes

We keep our release notes (aka changelog) concise with links to documentation and images for updated UI elements. You can find the full list of supported frontmatter fields [here](https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-content-blog).

### Text only

To add release notes without images:

1. In the Blog folder, create a new markdown file with the following name format: `YYYY-MM-DD-product.md`.
1. Add the following frontmatter:

    ```markdown
    ---
    title: Product or Feature Name
    tags: [apps, tracing]
    hide_table_of_contents: true
    image: https://help.sumologic.com/img/sumo-square.png
    keywords:
      - sumo logic
      - service release notes
      - open source
    authors:
      - url: https://help.sumologic.com/release-notes-service/rss.xml
        image_url: /img/release-notes/rss-orange.png
    ---
    ```

    * `title`: Name of the release notes including Product or Feature
    * `tags`: Add a comma-separated list of existing tags, including:
    * `hide-table-of-contents`: Hide the TOC on the page, keeping the notes clean and wide on the page.
1. Document the release notes. Add links, bullets, and images as needed.

#### Long Release Notes

For lengthy release notes, we recommend introducing the notes and adding a truncate line (`<!--truncate-->`), followed by the full set of release notes.

### Text and Images

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


## Beta Releases

For Beta docs, we want to publish them, but exclude them from the nav and search engine results so that you need the physical link to access them.

1. Underneath the frontmatter, add the [Robots meta tag](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag) (to prevent search crawlers from picking it up) and the Sumo Beta badge.
  ```
  ---
  id: xyz-source
  title: XYZ Source (Beta)
  description: The XYZ Source provides a secure endpoint to receive event data.
  ---

  <head>
    <meta name="robots" content="noindex" />
  </head>

  <p><a href="/docs/beta"><span className="beta">Beta</span></a></p>

  First paragraph goes here...
  ```
1. Do _not_ add the doc to sidebars.ts.

When the feature is moved from Beta to GA:
1. Remove the Robots meta tag and Beta label.
1. Add the doc to sidebars.ts.


## MDX and React Components

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

## Mermaid Charts

Mermaid provides sequence diagrams, charts, and more. Use these charts to detail processes, workflows, inheritance, and more. See the [Mermaid guide](https://mermaid-js.github.io/mermaid/#/) for specifics and examples, and use the [live editor](https://mermaid-js.github.io/mermaid-live-editor/) to generate code.

See the following example code for adding Mermaid charts. You need to include the import line once per page.

```markdown title="Mermaid Example Code"
<Mermaid chart={`
	graph LR;
		A-->B;
		B-->C;
		B-->D[Example Label];
`}/>
import Mermaid from '@theme/Mermaid';
```

<Mermaid chart={`
	graph LR;
		A-->B;
		B-->C;
		B-->D[Example Label];
`}/>

import Mermaid from '@theme/Mermaid';
