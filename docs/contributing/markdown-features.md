---
id: markdown-features
title: Markdown Cheat Sheet
sidebar_label: Markdown Cheat Sheet
description: Learn about markdown features Docusaurus supports.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This is a guide to writing docs in GitHub-flavored markdown, the language in which our docs are written.

## Front Matter

Markdown documents have metadata at the top called [front matter](https://jekyllrb.com/docs/front-matter/). Every page should have an `id` used for sidebar navigation.

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

Use hashtags `#` to indicate the heading level. Always start with H2 headers (`##`) in your doc body. Never use an H1; this is generated automatically by the page `title:` when building the site. Link anchors also generate automatically.

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
Headings must be used in correct order. To start an H2 (`##`) subsection, for example, you need to use an H3 (`###`), not jump to H4 or H5. This affects search and SEO structures to search crawlers like Google. Malformed structures can reduce search and SEO for the page. Docusaurus carefully formats generated pages to ensure strong SEO.
:::

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

**Linking to files in the same folder:**

```md
Learn about [release notes](release-notes.md).

How about [translations](./translations.md)?
```

**Linking to files in other parent folders (you'll need to use a relative path):**

```md
Learn how to [sign up with Sumo](../get-started/sign-up.md).
```

</TabItem>
<TabItem value="Result">

**Linking to files in the same folder:**

Learn about [release notes](release-notes.md).

How about [translations](./translations.md)?

**Linking to files in other parent folders (you'll need to use a relative path):**

Learn how to [sign up with Sumo](../get-started/sign-up.md).

</TabItem>
</Tabs>


## Assets

In Docusaurus, you can add images, custom files, and embed videos.

### Images

We recommend using .png format for all images.

1. Save your image(s) in the `/static/img` folder.
2. Add the import line to the top of your doc, under the [front matter header](#front-matter).
  ```
  import useBaseUrl from '@docusaurus/useBaseUrl';
  ```
3. Paste this image code snippet where you want your images to appear. Replace with file path with your own and ensure it includes the correct subfolder name. In your snippet, the file path starts with `img` (do not preface it with `/static`) because Docusaurus builds and saves these static assets and serves from the `baseUrl` (or domain).
  ```
  <img src={useBaseUrl('img/sumo-square.png')} />
  ```
4. Add alt text.
  ```
  <img src={useBaseUrl('img/sumo-square.png')} alt="Sumo Logic thumbnail logo" />
  ```
5. (Optional) Add width to resize your image, if needed.
  ```
  <img src={useBaseUrl('img/sumo-square.png')} alt="Sumo Logic thumbnail logo" width="150"/>
  ```

The above snippet produces:

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


### Downloadable Files

If you have static files for users to download, save them to the `/static/files` folder. Supported file formats include .json, .js, .doc, and more. You link to the file using the file path of `/files` and file name:

```md
![Download this Terraform](/files/terraform/script.tf)
```

If a file is available from another public Sumo Logic repo, please link to that file instead as a URL link.


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


## Tables

Tables use plain markdown with one header, default left aligned columns, and multi-colored rows. You can use Markdown for links and images. To break up content, you can use `<br/>` for line breaks.

<Tabs
  className="unique-tabs"
  defaultValue="Markdown"
  values={[
    {label: 'Markdown', value: 'Markdown'},
    {label: 'Result', value: 'Result'},
  ]}>

<TabItem value="Markdown">

```markdown
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

</TabItem>
</Tabs>

Docusaurus also supports HTML tables.

## Emphasis

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

Strong emphasis, aka bold, with 2 **asterisks** or __underscores__.

Combined emphasis with **asterisks and _underscores_**.

Strikethrough uses 2 tildes. ~~Scratch this.~~
```

</TabItem>
<TabItem value="Result">

Emphasis, aka italics, with *asterisks* or _underscores_.

Strong emphasis, aka bold, with 2 **asterisks** or __underscores__.

Combined emphasis with **asterisks and _underscores_**.

Strikethrough uses 2 tildes. ~~Scratch this.~~

</TabItem>
</Tabs>

## Admonitions

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



## Lists

You can mix ordered (or numbered) and unordered (or bulleted) lists together.  Use extra lines and tabs (or 2 spaces) to move content under these bullets, including other bullets, paragraphs, images, and more. Be careful of tabbing over too far. A third tab will automatically render as code.

### Numbered Lists

Always start with `1.` for numbered, ordered lists. The generator will automatically number the list correctly when building the site:

```markdown title="Markdown Ordered List"
1. First ordered list item.
1. Another item.
   - Unordered sub-list.
1. Actual numbers don't matter, just that it is a number.
   1. Ordered sub-list.
1. And another item.

  More content for this entry. And a screenshot:

  ![span hover](/img/apm/traces/span-hover-view.png)

```

1. First ordered list item.
1. Another item.
   - Unordered sub-list.
1. Actual numbers don't matter, just that it is a number.
   1. Ordered sub-list.
1. And another item.

  More content for this entry. And a screenshot:

  ![span hover](/img/apm/traces/span-hover-view.png)

### Bulleted Lists

Use asterisks `*` for unordered, bulleted lists.

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

## Code Blocks

Markdown code blocks are supported with Syntax highlighting. Always use [code block](#code-blocks) to format programming language (i.e., SQL for Sumo queries, JSON for logs).

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

For a full list of options, see [Docusaurus Code Blocks](https://docusaurus.io/docs/markdown-features/code-blocks).

### Import GitHub Repo File

To embed a code sample from a file in a GitHub repository, use `reference` in the code block with a link to the file. The code sample is embedded using the language with a link to the original file.

This code references a script file: ` ```bash reference`, for example:

```bash reference
https://github.com/ccaum/sumologic-solution-templates/blob/github_getting_started_guide/software-development-optimization-terraform/scripts/getting-started
```

You can use a link to a file embedding the entire file, or embed a range of code lines using `#L` and a line range at the end of the link, such as `#L105-108`.

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

## Expander

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


## Generated Section Contents

To add a generated list of contents in a section, add this code to the file:

```markdown

import DocCardList from '@theme/DocCardList';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

## Guide contents

In this section, we will introduce the following concepts:

<DocCardList items={useCurrentSidebarCategory().items}/>

```

This is best used in an index file, including a list of all files and folders in that folder to the file. See any category file for a section in the site for how this looks.

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
