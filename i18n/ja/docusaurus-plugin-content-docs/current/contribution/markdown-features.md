---
id: markdown-features
---

# Markdown Features

Docusaurus supports **[Markdown](https://daringfireball.net/projects/markdown/syntax)** and a few **additional features**.

## Front Matter

Markdown documents have metadata at the top called [Front Matter](https://jekyllrb.com/docs/front-matter/). Every page should have an `id` used for sidebar navigation. The title of the page is the only H1 on the page. 

```markdown
---
id: page-id
sidebar_label: Navigation title
description: Learn more about... 
---

# Title of the Page
```

| Parameter | Description |
| -- | -- |
| `id:` | **Required.** Id for the page used in the sidebar and as the canonical link. Keep it short and only use dashes. |
| `sidebar_label:` | Optional, use a different title for the side navigation. Keep this title short. It does not affect the canonical link or page title. |
| `description:` | Optional, one sentence describing what the user will find in the page for searches. Otherwise the first couple sentences are used for searches. |
| `# Title of the Page` | **Required.** Only use an H1 once for the title of the page. This title is used in navigation is a `sidebar_label` is not included.|

For full options, see [Docusaurus Markdown front matter](https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-content-docs#markdown-front-matter).


## Links

Regular Markdown links are supported, using url paths or relative file paths.

```md
Let's see how to [Create a document](/create-a-document).
```

```md
Let's see how to [Create a document](./create-a-document.md).
```

**Result:** Let's see how to [Create a document](./create-a-document.md).

## Images

We recommend using .png for all images. Save these images in `/static/img`.

Add an image at `static/img/` and display it in Markdown with alt text, file path of `/img`, and image name:

```md
![Sumo Logic logo](/img/sumo-square.png)
```

![Sumo Logic logo](/img/sumo-square.png)

## Headers

Use hashtags `#` to indicate the heading level. You should not use H1, this is automatically used for the page title when building the site. Link anchors automatically also generate.

## H2 - Create the best documentation

### H3 - Create the best documentation

#### H4 - Create the best documentation

##### H5 - Create the best documentation

###### H6 - Create the best documentation

## Emphasis

Emphasis, aka italics, with *asterisks* or _underscores_.

Strong emphasis, aka bold, with **asterisks** or __underscores__.

Combined emphasis with **asterisks and _underscores_**.

Strikethrough uses two tildes. ~~Scratch this.~~

## Lists

For numbered lists, always start with `1.`. The generator will automatically number the list correctly when building the site:

```markdown title="Markdown Ordered List"
1. First ordered list item
1. Another item
   - Unordered sub-list.
1. Actual numbers don't matter, just that it is a number
   1. Ordered sub-list
1. And another item.
```

1. First ordered list item
1. Another item
   - Unordered sub-list.
1. Actual numbers don't matter, just that it is a number
   1. Ordered sub-list
1. And another item.

* Use asterisks `*` for unordered lists.

You can configure your editor to always use this format for lists. For Visual Studio Code, configure the following settings:

* **Ordered List: Marker** set to *one*.
* **Unordered List: Marker** set to *.

## Code Blocks

Markdown code blocks are supported with Syntax highlighting.

    ```jsx title="src/components/HelloDocusaurus.js"
    function HelloDocusaurus() {
        return (
            <h1>Hello, Docusaurus!</h1>
        )
    }
    ```

```jsx title="src/components/HelloDocusaurus.js"
function HelloDocusaurus() {
  return <h1>Hello, Docusaurus!</h1>;
}
```

To highlight lines in the code, use `{#}` in the title line with lines numbers.

For a full list of options, see [Docusaurus Code Blocks](https://docusaurus.io/docs/markdown-features/code-blocks).

### Import GitHub Repo File

To embed a code sample from a file in a GitHub repositiory, use `reference` in the code block with a link to the file. The code sample is embedded using the language with a link to the original file. 

This code references a script file: ` ```bash reference`, for example:

```bash reference
https://github.com/ccaum/sumologic-solution-templates/blob/github_getting_started_guide/software-development-optimization-terraform/scripts/getting-started
```

You can use a link to a file embedding the entire file, or embed a range of code lines using `#L` and a line range at the end of the link, such as `#L105-108`.

## Tabs

Use the following code to create tabbed content. You can use Markdown in these tabs, including text, code content, images, and more.

At the bottom of the Markdown file, add the following code:

```markdown
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

For each set of tabs, use the following code:

```markdown
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

## Admonitions

Docusaurus has a special syntax to create admonitions and callouts, including note, tip, important, caution, warning, and sumo.

    :::sumo Custom Title

    content

    :::

    :::tip My tip

    Use this awesome feature option

    :::

    :::danger Take care

    This action is dangerous

    :::

:::sumo Sumo Best Pratice

Highlight specific info, best practices, links, and other information from Sumo specialists! You can change the title based on the content.

:::

:::tip My tip

Use this awesome feature option

:::

:::danger Take care

This action is dangerous

:::

## Embed Videos

You can add YouTube videos to any page with the following code. Just copy and paste the following code into your page. Replace the URL ID with the video id. You only need the `import Iframe` line once on the page.

```html
<Iframe url="https://www.youtube.com/embed/ZcbHoC1jZz4"
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

<Iframe url="https://www.youtube.com/embed/ZcbHoC1jZz4"
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