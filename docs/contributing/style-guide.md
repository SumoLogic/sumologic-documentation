---
id: style-guide
title: Sumo Docs Style Guide
sidebar_label: Style Guide
description: A guide to styling and formatting Sumo Logic Docs.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This page describes how to author Sumo Docs, which are written in GitHub-flavored markdown.

The Sumo Logic Style Guide is a guide to language at Sumo Logic, so that we can speak as one company with a unified voice, and know what we mean when we talk about our product. The Style Guide began as a document used by the Documentation team to make decisions about tone, voice, and word usage. We thought it would be useful to share with everyone in our community.

This is a living document. If you're looking for a style rule or UI component usage that's not defined here, let us know. The Documentation team will look it up and add usage guidance.

## Writing Resources

If you need help with a convention, word to use, or format to follow, we will keep a cheatsheet of styles here. We also follow:

* [Merriam-Webster Dictionary](https://www.merriam-webster.com/)
* *[The Chicago Manual of Style](https://www.chicagomanualofstyle.org/home.html)*
* [Microsoft Manual of Style](https://docs.microsoft.com/en-us/style-guide/welcome/)
  * [User Input | Formatting Text in Instructions](https://docs.microsoft.com/en-us/style-guide/procedures-instructions/formatting-text-in-instructions)

For terminology usage guidance, see our [Word List](/docs/contributing/word-list.md).

If you're new to writing tech content or would like to learn more, check out these resources:
* [Write the Docs](https://www.writethedocs.org/guide/writing/beginners-guide-to-docs/). Association of tech writers, developers, trainers, and more that have collected ideas, created training and guidelines, and actively discuss documentation.
* [Google Technical Writing Courses](https://developers.google.com/tech-writing). Self-paced courses to refine your writing. The courses may use a style different from ours, but still an excellent to get started.
* [Every Page is Page One](https://everypageispageone.com/examples-of-eppo-topics/). A helpful method for considering what goes into a page is to think of every page as page one. With the extreme use of search engines or sharing a link to find content, users may land in the middle of a section or tutorial. These ideas help hone your content and focus on user needs.

Helpful blogs on tech writing:
* [Usability and Tech Writing](https://www.nngroup.com/topic/writing-web/). Jakob Neilson defined usability, including insights on technical writing and learning, helpful for writing docs
* [Feathers tech writing](https://ffeathers.wordpress.com/). Pioneered API and technical tech writing, insights and instructions
* [I'd rather be writing](https://idratherbewriting.com/). Guides and thoughts on tech writing process and content

The Sumo Logic Docs team will review submissions, provide suggested edits, add new content into the navigation, and answer any questions you have.

:::tip
To create a new doc quickly, use a template. You can copy and paste the file, add your content, and submit a PR.
* [Doc topic (generic) template](/docs/contributing/templates/generic-doc)
* [Partner app template](/docs/contributing/templates/partner-app-doc)
:::

## Voice and Tone

* We are clear, genuine, and trustworthy. We understand that our customers entrust us with their vital data and never make light about our commitment to data access and security.
* The reader should feel confident and informed. We should strive to engage our customers, and show them where to get additional assistance when needed.
* Describe Sumo Logic in a professional and truthful manner. Avoid generic, unsubstantial adjectives like "very" or phrases like "we're the best". Instead, illustrate these points by letting our product speak for itself.
* Avoid using a stiff, institutional voice. Instead, write with an instructive and conversational tone. For example, when linking to the support site, use terms like "Need help? Let us know" instead of "Please email our support personnel" to give our company a friendly face.
* Instructional content and blog posts should be written at approximately the 8th-grade reading level, particularly in introductory sections, for readability and SEO. You can test your content [here](http://www.writingtester.com/tester/grade_level.php).
* When explaining a process or procedure, clarity is critical. Edit words that distract or confuse. Put yourself into the reader's shoes and think about what actions you are recommended to them when an error message is displayed, rather than merely stating what went wrong. Example: "Could not create the user." vs "This email is already registered in the system. Please use a different email or contact Sumo Logic for assistance."
* We have a sense of humor! Conveying that we do serious work, but we don't take ourselves too seriously, makes Sumo Logic feel likable.

### Active Voice

When writing instructions, use the active voice whenever possible. For example, "Sumo Logic ingests multiple streams of data", not "Multiple streams of data are ingested by Sumo Logic".

This gives a call to action for the reader or user to effectively get something done. It also reduces word count and keeps instructions clear.

| Active &#9989; | Not Active &#10060; | Why? |
| :-- | :-- | :-- |
| Add a resource... | You can add a resource... | They know they can do a thing. Clearly state to do the thing. |
| Build the query using the following... | Please build the query using the following... | We need them to complete a task. No need for please. |
| To add a new collector:<br/>1. Access Sumo Logic and find the... | 1. When you need to add a new collector, access Sumo Logic and find the... | Introduce your instructions with the goal, then dive into the instructions. This is called a stem, and it helps focus the task and keeps you active. |

<!--
<div class="no-box">
&#10060; You can add a resource...
</div>
(They know they can do a thing. Clearly state to do the thing.)
<div class="yes-box">
&#9989; Add a resource...
</div>
-->

### Inclusive language

By writing inclusively and using culturally neutral language, our words resonate with global audiences and make everyone feel welcome, no matter their race, gender, socioeconomic status, and ability.

* Do not use idioms, slang, expressions, or terminology only understood by a specific region or group.
* Avoid overly technical jargon.
* Address the reader as "you", as you would in conversation. For example, instead of saying, "The user must provide his or her API key" or "One must provide their API key", say, "You'll need to provide your API key".
* Unless you're referring to a specific person, do not use gender pronouns (he/she).

<div class="container-boxes">
<div class="dos-box">
  &#9989; "allowlist"<br/>
  &#9989; "denylist"<br/>
  &#9989; "placeholder data"<br/>
  &#9989; "primary" or "main"<br/>
  &#9989; "press" or "click"
</div>
<div class="donts-box">  
  &#10060; "whitelist"<br/>
  &#10060; "blacklist"<br/>
  &#10060; "dummy data"<br/>
  &#10060; "master"<br/>
  &#10060; "hit"
</div>
</div>

## Doc structure summary

* [Frontmatter (metadata)](#metadata-frontmatter) goes at the top
* Tell the user in the doc introduction (first paragraph) what the page teaches, why they should read it, and who should read it.
* Let the user know what step/place they are in for a tutorial in the introduction/at top. The layout automatically provides a previous/next at the bottom of the page.
* Link out to important concepts and overviews for additional reading. This is helpful for instruction pages or tutorials.
* Keep instructions concise, easy to follow, not too many screenshots.
* Include any notes, warnings, tips, or other admonitions.


## Abbreviations

Avoid the use of abbreviations like “e.g.”, “i.e.”, and “etc.”. Although they may be well understood, such abbreviations don’t support our goal of a conversational tone. In other words, don’t use language you wouldn’t use verbally.

* Instead of "e.g.", use “for example”
* Instead of "i.e.", use “that is”


## Acronyms

An acronym uses the first initials of a word or phrase, for brevity. Our industry is full of them, and they can get confusing if their usage isn't clear. Acronyms should be capitalized, if not used directly in a query, etc. Unless the usage is clear from the context, for the first usage, spell out the phrase, then present the acronym in parenthesis. For example: Secure Shell (SSH).

All companies have numerous acronyms for product, features, solutions, and more. Our documentation includes acronyms for Sumo Logic and third party software. Always fully spell out the first instance of the acronym on the page, then you can use it throughout. Do not spell out in a heading, but in paragraphs or bullets.

For example, the first time you use AWS Application Load Balancer (ALB), you introduce or use it like that the first time on the page. Through the rest of the page, you can use ALB.

## Admonitions

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


## Beta Releases

### Closed Beta

For a Closed Beta release:
1. Underneath the frontmatter, add the [Robots meta tag](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag) (to prevent search crawlers from picking it up) and the **Beta** badge.
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
1. Do _not_ add the doc to `sidebars.ts`.
1. Publish the doc.

When the feature moves from Beta to GA, remove the Robots meta tag, remove the Beta label, and add the doc to sidebars.ts.

### Open Beta

For an Open Beta release:
1. Underneath the frontmatter, add the **Beta** label.
  ```
  ---
  id: xyz-source
  title: XYZ Source (Beta)
  description: The XYZ Source provides a secure endpoint to receive event data.
  ---

  <p><a href="/docs/beta"><span className="beta">Beta</span></a></p>

  First paragraph goes here...
  ```
1. Add the doc in `sidebars.ts`.
1. Publish the doc.

When the feature moves from Beta to GA, remove the Beta label.

## Capitalization

* Title case (initial cap) all doc titles. Example: `Global Intelligence for Apache Tomcat App`
* Sentence case all other headers (H2, H3, H4). The only exception is proper nouns, which are always title case. Example: `Throughput signals and contributing factors`


## Code (Inline)

* Use single backticks (\` \`) to format inline code, such as commands, API method names, and code. For information on code blocks (scripts), see [Code Blocks](#code-blocks).

<Tabs
  className="unique-tabs"
  defaultValue="Markdown"
  values={[
    {label: 'Markdown', value: 'Markdown'},
    {label: 'Result', value: 'Result'},
  ]}>

<TabItem value="Markdown">

    Example: `_view = sumologic_slo_output`

</TabItem>
<TabItem value="Result">

Example: `_view = sumologic_slo_output`

</TabItem>
</Tabs>



## Code Blocks

Use code blocks to format scripts, such as the JSON example below. This is important for scripts and CLI. Format blocks of code by placing triple backticks before and after the code.

If you know the code language, include that in the first set of backticks to activate syntax highlighting. See [this list](https://prismjs.com/#supported-languages) of supported languages. Use `sql` to format Sumo queries and `json` for Sumo logs.

<Tabs
  className="unique-tabs"
  defaultValue="Markdown"
  values={[
    {label: 'Markdown', value: 'Markdown'},
    {label: 'Result', value: 'Result'},
  ]}>

<TabItem value="Markdown">

    ```json
    {  
      "employee": {
      "name": "Jane Smith",   
      "team": "Operations",   
      "manager": true  
      }  
    }  
    ```

</TabItem>
<TabItem value="Result">

```json
{  
  "employee": {
    "name": "Jane Smith",   
    "team": "Operations",   
    "manager": true  
  }  
}  
```

</TabItem>
</Tabs>

Here's how to add a title to your code block.

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

To highlight lines in the code, use `{#}` in the title line with lines numbers. This example highlights lines 2 through 6.

<Tabs
  className="unique-tabs"
  defaultValue="Markdown"
  values={[
    {label: 'Markdown', value: 'Markdown'},
    {label: 'Result', value: 'Result'},
  ]}>

<TabItem value="Markdown">

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

</TabItem>
<TabItem value="Result">

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

</TabItem>
</Tabs>

For a full list of options, see [Docusaurus Code Blocks](https://docusaurus.io/docs/markdown-cheat-sheet/code-blocks).


## Collapsible text blocks

You can use an [expander](https://docusaurus.io/docs/next/markdown-features#details) to collapse long content that can be searched, but not displayed, when loading a page. We recommend using expanders only for additional content and long code samples. Content required for instructions and steps should not be placed in an expander.

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

## Contractions

Using contractions contributes to our goals of striking a conversational, friendly tone. Use common contractions, like “don’t”, “won’t”, and “you’ll”. Avoid less common contractions, like “should’ve”, or “it’ll”. Do not use negative contractions (don't, can't, shouldn't), as they can be easily mistaken for the opposite meaning. Spell out those words.

<!--
### UI Element Names

Not everything has an intuitive name. It's the very nature of working with a constantly evolving product. Here are some examples:

| What does it look like? | What does Sumo call it? |
|:------------------------|:--------------------|
| x                       | Three-dot icon     |
| x                       | Navigation Menu     |
| x                       | Favorites           |
| x                       | Personal Folder     |
| x                       | Recents             |
| x                       | Library             |
-->

## Downloadable files

To link to a downloadable asset file, such as a `.yaml`, `.json`, or `.xml`:

1. Drag and drop your file to the `static/files` folder. In this example, we'll drop in a file called `domainCollector.ps1`.<br/><img src={useBaseUrl('img/contributing/static-file.png')} alt="header sizes" width="250"/>
1. Go to your doc in progress and use the following syntax to link the file:
  <Tabs
    className="unique-tabs"
    defaultValue="Markdown"
    values={[
      {label: 'Markdown', value: 'Markdown'},
      {label: 'Result', value: 'Result'},
    ]}>

  <TabItem value="Markdown">

  ```md
  <a href="https://help.sumologic.com/files/domainCollector.ps1" target="_blank">domainCollector.ps1</a>
  ```

  </TabItem>
  <TabItem value="Result">

  <a href="https://help.sumologic.com/files/domainCollector.ps1" target="_blank">domainCollector.ps1</a>

  </TabItem>
  </Tabs>

Nearly all file formats are supported. For more information, see [Docusaurus Static Assets](https://docusaurus.io/docs/static-assets).

If your file is available in another public Sumo Logic repo, provide the standard URL link. [Here's an example](https://github.com/SumoLogic/sumologic-kubernetes-collection/blob/main/examples/fargate/install-metrics.sh).

## Emphasis

### Bold

Use **bold** for UI elements you interact with, such as a button or tab.

### Italics

Use _italics_ for:
* Defining a term the first time. For example, when defining a collector the first time, you would italicize once with the definition.
* Providing content to enter into a field.

### Underlines

Never underline text.

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


## Font

We use Lab Grotesque in our docs site and across all Sumo Logic media.


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

Headings must be used in correct order. The subsection of an H2 header would be H3 - you wouldn't jump to an H4 or H5. Skipping over a header level affects search and SEO structures to search crawlers like Google. Malformed structures can reduce search and SEO for the page. Docusaurus carefully formats generated pages to ensure strong SEO.

### Documenting procedures

When a topic provides instructions for a significant multi-step process, organize the content in sections with headings that signpost the nature of the information. Include "Step" in the heading to make it clear that the section is part of a larger configuration process. For example:

<img src={useBaseUrl('img/contributing/style-steps-headings.png')} alt="headers with steps" width="300"/>


## Hub pages

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


## Images

### Add an image

1. Save your image to the `/static/img` folder. This folder structure mirrors the doc section folders.
   * When updating an existing images (like if there's a Sumo UI change), do not add a new version; always replace existing images. Image files take up a lot of room and can slow build times.
   * File format be .png or .gif.
2. Add the import line to the top of your doc, underneath the [front matter header](#front-matter), if it's not already there.
  ```
  import useBaseUrl from '@docusaurus/useBaseUrl';
  ```
3. Copy the below code snippet and paste it where you want your image to appear.
   ```
   <img src={useBaseUrl('img/<your-image-file-path>.png')} alt="<your image description>" width="<insert-pixel-number>"/>
   ```
4. Replace with file path above with your own image file path. The file path must start with `img` (do not preface it with `/static`) because Docusaurus builds and saves these static assets and serves from the `baseUrl` (or domain).
   :::info
   For web-hosted images, do not use the `useBaseUrl` syntax.
   * &#9989; Do: `<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Jira-OpenTelemetry/Jira-Catalina.png' alt="Catalina" />`
   * &#10060; Don't: `<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Jira-OpenTelemetry/Jira-Catalina.png')} alt="Catalina" />`   
   :::
5. Add alt text for your image (for example, `"Image properties dialog"` or `"Sumo Logic logo"`). This is a brief description what the image is meant to show. Alt text is a label, not a caption, doesn't need to describe all details of an image. If you are editing and you come across an image without `alt text`, add it!

  <details><summary>More about <code>alt text</code></summary>

  Alt text is used by readers who can't see images well, or who have software that reads the text aloud, and even by readers with slow Internet connections who don't want to wait for images to download. Alt text is required under [US Government GSA Section 508](https://www.section508.gov/section508_faqs) regulations. Non-compliance with Section 508 can cost a company federal sales. Many companies start out ignoring this future possibility and, like everything, it is more expensive to fix later.

  </details>

6. Use the `width` to resize oversized and/or pixelated images, if needed.

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

### Image sizes

When sizing images, use your discretion.

#### Logos

For square logos, set the width to about 45-55px.

|  Yes &#9989;  |  No &#10060; |
|---|---|
|  <img src={useBaseUrl('img/contributing/logo-yes.png')} alt="alt-text" width="400"/> |  <img src={useBaseUrl('img/contributing/logo-no.png')} alt="alt-text" width="400"/> |

For wide logos (like [in this doc](/docs/integrations/microsoft-azure/iis-7/)), set the width to about 90-120px.

#### Screenshots

Ensure that screenshots are large enough so that the content is legible, but not comically oversized. Use your discretion.

|  Yes &#9989;  |  No &#10060; |
|---|---|
|  <img src={useBaseUrl('img/contributing/screenshot-yes.png')} alt="alt-text" width="400"/> |  <img src={useBaseUrl('img/contributing/screenshot-no.png')} alt="alt-text" width="400"/> |

Screenshots should never be wider than 600px.

### Images in lists

When adding an image to a bulleted or sequential list, include the image snippet in-line with the list item, with a `<br/>` element in between, like this:

<Tabs
  className="unique-tabs"
  defaultValue="Markdown"
  values={[
    {label: 'Markdown', value: 'Markdown'},
    {label: 'Result', value: 'Result'},
  ]}>

<TabItem value="Markdown">

```md
1. Here is a dinosaur.<br/><img src={useBaseUrl('img/docusaurus.png')} alt="alt-text" width="100"/>
```

</TabItem>
<TabItem value="Result">

1. Here is a dinosaur. <br/><img src={useBaseUrl('img/docusaurus.png')} alt="alt-text" width="100"/>

</TabItem>
</Tabs>

### Screenshots

Capture screenshots using SnagIt in .png format. Use SnagIt's border effect to apply a gray (RGB 212, 212, 212) four-point border.

By default, images that you insert into a page are set to be responsive - resized for the type of device the reader is using.


### Masking sensitive information

We mask sensitive information like usernames, email addresses, and IP addresses. In Snagit or a similar program, use the shape tool to mask the text using solid gray, (RGB 212, 212, 212).

### Callouts

Create callouts using the shape tool in SnagIt. Callouts should be red, 100% opacity, no drop shadow effect, 2 pts wide.


## Lists

You can mix ordered (or numbered) and unordered (or bulleted) lists together. Use extra lines and tabs (or 2 spaces) to move content under these bullets, including other bullets, paragraphs, images, and more. Be careful of indenting too much; three tab indents will automatically render as code.

In a list item made up of an introductory word or phrase and an explanatory sentence or paragraph, separate the introductory text and the explanation with a period (`.`) rather than a dash (`-`). For example:

<Tabs
  className="unique-tabs"
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


### Numbered Lists

Use numbered lists when providing a set of instructions or steps.

Always start with `1.`. Markdown automatically numbers sequentially when building the site. This can be helpful when you need to add or change the order of instructions (no need to edit every number).

<Tabs
  className="unique-tabs"
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
1. Actual numbers don't matter, just that it is a number.
   1. Ordered sub-list.
1. And another item.

  More content for this entry. And a screenshot:<br/> ![span hover](/img/apm/traces/span-hover-view.png)

```
</TabItem>
<TabItem value="Result">

1. First ordered list item.
1. Another item.
   * Unordered sub-list.
1. Actual numbers don't matter, just that it is a number.
   1. Ordered sub-list.
1. And another item.
   * More content for this entry. And a screenshot:<br/> ![span hover](/img/apm/traces/span-hover-view.png)

</TabItem>
</Tabs>

### Bulleted Lists

Use bulleted lists when the items don't need to be presented in sequential order. End each bullet in a terminal period. Use asterisks `*` for unordered, bulleted lists.

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

For docs links, use relative file paths. For everything else (external links), use absolute URL paths.

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
* Check out our [glossary](glossary.md).
   <br/>or
* Check out our [glossary](./glossary.md).
   <br/>or
* Check out our [glossary](/docs/contributing/glossary).
```

**Linking to files in other parent folders:**

```md
* Learn how to [sign up with Sumo](../get-started/sign-up.md).
   <br/>or
* Learn how to [sign up with Sumo](/docs/get-started/sign-up).
```

**Linking to external URLs:**

```md
For more information, see [Export Logs to Sumo Logic](https://auth0.com/docs/extensions/sumologic).
```

</TabItem>
<TabItem value="Result">

**Linking to other headers in the same file:**

Here's how to make a [table](#tables).

**Linking to files in the same folder:**

* Check out our [glossary](glossary.md).
   <br/>or
* Check out our [glossary](./glossary.md).
   <br/>or
* Check out our [glossary](/docs/contributing/glossary).

**Linking to files in other parent folders:**

* Learn how to [sign up with Sumo](../get-started/sign-up.md).
   <br/>or
* Learn how to [sign up with Sumo](/docs/get-started/sign-up).

**Linking to external URLs:**

For more information, see [Export Logs to Sumo Logic](https://auth0.com/docs/extensions/sumologic).

</TabItem>
</Tabs>


## Markdown

Markdown is a simple, text-based format you can write using text editors, IDEs, or the GitHub website to write content. We use Docusaurus to manage, style, and build our site. We use GitHub-flavored Markdown, with some additional options. You can find more info at:
* [Docusaurus | Markdown Cheat Sheet](https://docusaurus.io/docs/markdown-features)
* [Markdown Guide](https://www.markdownguide.org/)
* [Markdown Cheatsheet](https://guides.github.com/pdfs/markdown-cheatsheet-online.pdf)

### File naming convention

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



## Navigation menus

Top-level navigation content is controlled in our [`docusaurus.config.js`](https://docusaurus.io/docs/api/docusaurus-config) file.

Our [`sidebars.ts`](https://github.com/SumoLogic/sumologic-documentation/blob/main/sidebars.ts) file controls the sidebar navigation for the entire site. It consists of multiple sidebars and sections based on the Guides top navigation, drilling down per guide. A list of sections and advice on content is at the top of the sidebars file, with comments throughout.

* To add a specific page, you include the directory path and topic id from the frontmatter. For example, this page is `contributing/style-guide`.
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
            'contributing/templates/partner-app-doc'
          ]
        }
      ],
    },
  ],
```

</details>

* To add a category, or dropdown list of documentation, use the following format:

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

## Patents and trademarks

Protecting our patents and trademarks is important to do correctly. We don't want to expose the company to a loss of trademark or patent just because we didn't list it correctly.

This is a partial list of trademarked terms, which should be capitalized exactly as shown below.

* Sumo Logic
* Big Data for Real Time IT
* Log Reduce
* Elastic Log Processing
* Push Analytics

Never use Sumo Logic in the plural or possessive form.


## Punctuation

Punctuation is placed outside of quotation marks, British English style. For everything else (dates, times, spelling), we use American English style.

### Commas

We use the Oxford (serial) comma. For example, use "I had eggs, toast, and orange juice", not "I had [eggs, toast and orange juice](https://www.verbicidemagazine.com/wp-content/uploads/2012/01/why-i-still-use-the-oxford-comma.jpg)".


## Release Notes

Keep release notes concise with links to documentation and images for updated UI elements. You're welcome to add [frontmatter](https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-content-blog) such as tags and keywords.


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


## Reusing Content

For repeatable content (like an identical section that appears in several docs), you can save a lot of time by creating one instance of that content in the `/docs/reuse` folder and then import that snippet to other docs.

1. Create a new markdown file and save it to the [`/docs/reuse`](https://github.com/SumoLogic/sumologic-documentation/tree/main/docs/reuse) folder.
1. Import that content to another doc by adding this snippet (substitute the file path with your own).
   ```bash
   {@import ../../reuse/filename.md}
   ```

Headings in the reuse folder will not appear in the right-side nav in docs where they're imported. For this reason, unless the headers are H4 or below, reuse the content only but retain headings in the other docs.

Example: the content under the Cloud-to-Cloud source docs > Restarting Your Source section ([example](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/1password-source/#restarting-your-source)) lives in the `reuse` folder. The H3 headers live in the actual docs, and H4 headers live in [the `reuse` file](/docs/reuse/restart-c2c-source):

<Tabs
  className="unique-tabs"
  defaultValue="Markdown"
  values={[
    {label: 'Markdown', value: 'Markdown'},
    {label: 'Result', value: 'Result'},
  ]}>

<TabItem value="Markdown">

```md
### Restarting your source

{@import ../reuse/restart-c2c-source.md}
```
</TabItem>
<TabItem value="Result">

### Restarting your source

{@import ../reuse/restart-c2c-source.md}

</TabItem>
</Tabs>

## Tables
Simple tables can help format content. For example, lists of attributes with descriptions. Adding the style below the table helps with formatting.

Tables use plain markdown with one header, default left-aligned columns, and multi-colored rows. You can use Markdown for links and images. To break up content, you can use `<br/>` for line breaks.

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
| :------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

There must be at least 3 dashes separating each header cell.
The outer pipes (|) are optional, and you don't need to make the
raw Markdown line up prettily. You can also use inline Markdown.

Markdown | Less | Pretty
--- | :--- | :---
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
| :------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

There must be at least 3 dashes separating each header cell.
The outer pipes (|) are optional, and you don't need to make the
raw Markdown line up prettily. You can also use inline Markdown.

Markdown | Less | Pretty
--- | :--- | :---
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

## Videos

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


## React components

### MDX

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

### Mermaid Charts

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
