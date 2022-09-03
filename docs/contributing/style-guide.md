---
id: style-guide
title: Sumo Logic Style Guide
sidebar_label: Style Guide
---

The Sumo Logic Style Guide is a guide to language at Sumo Logic, so that we can speak as one company with a unified voice, and know what we mean when we talk about our product. The Style Guide began as a document used by the Documentation team to make decisions about tone, voice, and word usage. We thought it would be useful to share with everyone at the company.

The Sumo Logic Style Guide is a living document. If you have wondered about the usage of the name of a component or feature in the UI, or any other word usage, and you don't find that term here, please add it. If you're not sure about the usage, just add a question mark. The Documentation team will look it up and add usage guidance. Likewise, if you disagree with any usage defined here, please let us know and we'll update as necessary.


## Tone and Voice

* We are clear, genuine, and trustworthy. We understand that our customers entrust us with their vital data and never make light about our commitment to data access and security.
* The reader should feel confident and informed. We should strive to engage our customers, and show them where to get additional assistance when needed.
* Describe Sumo Logic in a **professional** and **truthful** manner. Avoid generic, unsubstantial adjectives like "very" or phrases like "we're the best". Instead, illustrate these points by letting our product speak for itself.
* Avoid using a stiff, institutional voice. Instead, write with an instructive and conversational tone. For example, when linking to the support site, use terms like "Need help? Let us know" instead of "Please email our support personnel" to give our company a friendly face.
* Use the **active voice** whenever possible. For example, use "Brutus stabbed Caesar," not "Caesar was stabbed by Brutus."
* Instructional content and blog posts should be written at approximately the 8th-grade reading level, particularly in introductory sections, for readability and SEO. You can test your content here: [http://www.writingtester.com/tester/grade_level.php](http://www.writingtester.com/tester/grade_level.php).
* When explaining a process or procedure, clarity is critical. Edit words that distract or confuse. Put yourself into the reader's shoes and think about what actions you are recommended to them when an error message is displayed, rather than merely stating what went wrong. Example: "Could not create the user." vs "This email is already registered in the system. Please use a different email or contact Sumo Logic for assistance."
* We have a sense of humor! Conveying that we do serious work, but we don't take ourselves too seriously, makes Sumo Logic feel likable.
* We use the Oxford, or serial, comma. For example: "I had [eggs, toast, and orange juice](https://www.verbicidemagazine.com/wp-content/uploads/2012/01/why-i-still-use-the-oxford-comma.jpg)."

For a general overview of how to improve your writing, see [Tips for Better Writing at Sumo Logic](https://wiki.kumoroku.com/confluence/display/MAIN/Tips+for+Better+Writing+at+Sumo+Logic).


## Writing for SEO

For clarity and search engine discoverability:

* Doc titles (which are the H1 header) are extremely important for SEO. Use primary target keywords and keep them under 60 characters. Example: _Sumo Logic Observability Solution_.
* Use H2 sections to break up content and try to use primary keywords here as well. Example: _AWS Observability Solution_.
* H3 and H4 headers don't impact SEO as much. Use short, meaningful titles for readability and search. Example: _System architecture and monitoring_.

:::sumo For internal contributors
* If you change a URL, set up a 301 redirect so that users don’t get a 404 page.
* When in doubt, your content strategy decisions (e.g., taxonomy and metadata) should be driven by data, such as Google Analytics and user acceptance testing.
:::


## Writing Style Guide

If you need help with a convention, word to use, format to follow, we will keep a cheatsheet of styles here! We also follow [Microsoft Manual of Style](https://docs.microsoft.com/en-us/style-guide/welcome/).

### Formatting Text

Cheatsheet when to use different formats. Here's the Microsoft Style Guide for [User Input](https://docs.microsoft.com/en-us/style-guide/procedures-instructions/formatting-text-in-instructions) for more info.

* Use _italics_ when defining a term the first time. For example, when defining a collector the first time, you would italicize once with the definition.
* Use **bold** for UI elements you interact with, such as a button or tab.
* Use _italics_ for content to enter into a field.
* Use \code ticks for inline code and triple ticks for blocks of code. This is important for scripts and CLI.

This is a great example for these styles: If you are not parsing all sources in the hosted collector with the same parser, click the **+Add Field** link, and add a field whose name is `_parser` with value _/Parsers/System/Auth0/Auth0_.

### Headings

A heading is a great way to group content. When you use Google Docs or Microsoft Word, you select a drop-down menu to assign a heading format. We use # to create them. Use headings for concepts, steps in complicated procedures, and so on.

Here is a cheatsheet for those:

* We mark a heading using a number of # for the level. This section is using a heading 3 which is `### Headings`.
* The title of the page is heading 1. Never use heading 1 (#) in your document. This affects Google and search engine results for the page.
* Headings should always be clean, plain text. Do not use **bold**, _italics_, or code ticks!

* Be careful of using special characters. We recommend not using most punctuation. Dashes are ok for headings.

### Acronyms

All companies have numerous acronyms for product, features, solutions, and more. Our documentation includes acronyms for Sumo Logic and third party software. Always fully spell out the first instance of the acronym on the page, then you can use it throughout. Do not spell out in a heading, but in paragraphs or bullets.

For example, the first time you use AWS Application Load Balancer (ALB), you introduce or use it like that the first time on the page. Through the rest of the page, you can use ALB.

### Contractions

For writing in English, contractions feel like normal, everyday speech. But they can cause issues with translation, especially if someone uses Google Chrome translation or other tools and when we hire companies to translate content. We recommend not using contractions. Spell out all words. This includes don't, it's, haven't, and so on.

### Active Voice

When writing instructions, it helps to always use active voice. This gives a call to action for the reader or user to effectively get something done. It also reduces word count and keeps instructions clear.

Here is a cheatsheet:

| Good Active | Not Active | Why? |
| -- | -- | -- |
| Add a resource... | You can add a resource... | They know they can do a thing. Clearly state to do the thing. |
| Build the query using the following... | Please build the query using the following... | We need them to complete a task. No need for please. |
| To add a new collector:<br/>1. Access Sumo Logic and find the... | 1. When you need to add a new collector, access Sumo Logic and find the... | Introduce your instructions with the goal, then dive into the instructions. This is called a stem, and it helps focus the task and keeps you active. |

## Writing Resources

If you are new to writing content or would like to learn more, see these resources. The Sumo Logic Docs team will review submissions, provide suggested edits, add new content into the navigation, and answer any questions you have.

* [Write the Docs](https://www.writethedocs.org/guide/writing/beginners-guide-to-docs/) - Association of tech writers, developers, trainers, and more that have collected ideas, created training and guidelines, and actively discuss documentation.
* [Google Technical Writing Courses](https://developers.google.com/tech-writing) - Excellent and easy self-paced courses to refine your writing. Be advised, the courses may use a different style, but still excellent to get started.
* [Every Page is Page One](https://everypageispageone.com/examples-of-eppo-topics/) - A helpful method for considering what goes into a page is to think of every page as page one. With the extreme use of search engines or sharing a link to find content, users may land in the middle of a section or tutorial. These ideas help hone your content and focus on user needs.

Helpful blogs on tech writing:

* [Usability and Tech Writing](https://www.nngroup.com/topic/writing-web/) - Jakob Neilson defined usability, including insights on technical writing and learning, helpful for writing docs
* [FFeathers tech writing](https://ffeathers.wordpress.com/) - Pioneered API and technical tech writing, insights and instructions
* [I'd rather be writing](https://idratherbewriting.com/) - Guides and thoughts on tech writing process and content

This list of resources will grow!

### Focused Content

These guidelines help you focus content and decide what to write per page:

* The introduction is the first paragraph someone reads. It should tell them what this page teaches, why they should read it, and who should read it.
* Let the user know what step/place they are in for a tutorial in the introduction/at top. The layout automatically provides a previous/next at the bottom of the page.
* Link out to important concepts and overviews for additional reading. This is helpful for instruction pages or tutorials.
* Keep instructions concise, easy to follow, not too many screenshots.
* Include any notes, warnings, etc.

## Markdown Style Guide

See [Markdown Formats and Templates](#Markdown-Formats-and-Templates) for examples, usage, and templates for Markdown. It is a simple, text-based format using text editors, IDEs, or the GitHub website to write content. We use Gatsby to manage, style, and build our site.

Learn more about Markdown with this guide! We use GitHub flavored Markdown with some additional options. Here are more guides and options:

* [Markdown Guide](https://www.markdownguide.org/)
* [Markdown Cheatsheet](https://guides.github.com/pdfs/markdown-cheatsheet-online.pdf)

## Filename

A Markdown file has a filename and extension of .md. We recommend keeping the filename short. It does not affect the canonical link.

## Elements of a Page

We provide templates (coming soon) to help create a new page. Every page includes the following:

* Frontmatter - This is the metadata for a webpage, including the title, description, and search keywords.
* Headings - These mark the sections, from H2 (##) to H5 (#####). Use H1 only once at the top for the title.
* Content - All of the content, including paragraphs, lists, instructions, images, graphs, and more.

## Frontmatter

Every file begins with front matter or metadata for your content. This information includes:

```
---
id: page-id
sidebar_title: Navigation title
description: Learn more about...
---

# Title of the Page
```

| Parameter | Description |
| -- | -- |
| `id:` | Id for the page used in the sidebar and as the canonical link. |
| `sidebar_title:` | Optional, use a different title for the side navigation. It does not affect the canonical link or page title. |
| `description:` | 1 sentence describing what the user will find in the page for searches. Otherwise the first couple sentences are used for searches. |

## Paragraphs
As you start writing content, it automatically generates along the left side (or margin). To create a paragraph, leave an empty line between sentences.

If you need to indent content, use the tab key or enter 2 spaces. Each tab moves content to the right, indenting the page content.

## Text effects
To format for bolding and italics, see the following:

| Example | Output |
| -- | -- |
| `*emphasis*` | *emphasis* |
| `**bold**` | **bold** |

## Bulleted lists

We recommend using a dash (-) for each line in a bulleted list. Lists also support *.

```
* List Item 1
* List Item 2

  * Indented List Item
  * Another one
```

* List Item 1
* List Item 2

  * Indented List Item
  * Another one

## Numbered steps
Numbered lists add numbers to a set of instructions or steps. Start every line with 1. When building the documentation, the instructions automatically number for you. This is helpful when you need to add or change the order of instructions. You do not need to edit every number.

```
1. Access Sumo Logic and select your account then **Preferences**.
1. Under Access Keys, click **Create**.
1. Enter...
```

1. Access Sumo Logic and select your account then **Preferences**.
1. Under Access Keys, click **Create**.
1. Enter...

## Tables
Simple tables can help format content. For example, lists of attributes with descriptions. Adding the style below the table helps with formatting.

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

## Links
Adding links to content outside of documentation: `[GitHub](http://github.com)`

Adding links between pages are relative links with the path and name of the file without the .md or .mdx extension:

`[Topic Name](/path/filename.md)`

## Images
We recommend saving all images in PNG format. Images are typically saved in the */static/images* folder location. Always include alt text for images.

Use the following format for placing images inline (paragraphs, tables, bullets, etc) and in its own line:

```
![Alt Text](/images/filename.png)
```

## Notes and Callouts

Notes and callouts are annotations. Use annotations to highlight information, including tips, notes, warnings, etc.

```markdown
:::note Title for the Note
Add markdown here. This supports note, tip, info, warning, important, and some custom looks like contribution and training!

Make sure to have a blank line above and below the whole section. You can also use code, code blocks, tables, and much more in these callouts.
:::
```

A visual example will be provided in a template.

## Code

Use the following formats for commands, API method names, and code.

Inline code examples use single ticks around \`text` for code formatting.

Here is an example of `code` inline.

For blocks of code, use triple ticks (\```) before and after the code. If you know the code language, include that in the first set of ticks, for example ```json. This applies code highlighting for the language. See [this list](https://prismjs.com/#supported-languages) of available languages.

The following is an example of JSON:

```json
{  
    "employee": {  
        "name": "Jane Smith",   
        "team": "Operations",   
        "manager": true  
    }  
}  
```

## Templates

To quickly create a page, use a template. You can copy and paste the file, add your content, and submit a PR. If you need formats for specific code, see the formats template.

(coming soon)
* Doc topic - Use for any documentation page
* APIs - Use for API and code
* Format template


## Names for cool stuff in the UI

Not everything has an intuitive name, it's the very nature of working with a constantly evolving product. Here are the best names we have so far from the design team.

| What does it look like? | What do we call it? |
|:------------------------|:--------------------|
| x | Three-dot icon      |
| x | Navigation Menu     |
| x | Favorites           |
| x | Personal Folder     |
| x | Recents             |
| x | Library             |



## Patents and trademarks

Protecting our patents and trademarks is important to do correctly. We don't want to expose the company to a loss of trademark or patent just because we didn't list it correctly.

This is a partial list of trademarked terms, which should be capitalized exactly as shown below.

* Sumo Logic
* Big Data for Real Time IT
* Log Reduce
* Elastic Log Processing
* Push Analytics

Never use in the plural or possessive form.



## Screenshots

Capture screenshots using SnagIt in .png format. Use SnagIt's border effect to apply a gray (RGB 212, 212, 212) 4-point border.

By default, images that you insert into a page will be set to be "Responsive", as shown below on the **Options** tab for an image in MindTouch.

"Responsive" images are automatically resized for the type of device the reader is using. Generally, you should not change the size of an image in MindTouch.

There's an exception to this rule: you may need to manually change the size of a wide image that is near the top of the page. That's because MindTouch's responsive resizing doesn't take into account the page TOC that appears in the upper right of topic pages. So, if you include an image in the vicinity of the page TOC, the image will be pushed down to below the end of the TOC. This is almost always an issue on release notes pages, as we generally include a screenshot in each release note. If the image is too big, the page will look like this:

The solution is to resize the image to be 750 px wide. To do so in the visual editor, grab the upper right corner and size the image manually until it is 750 px wide. The height will adjust proportionately.  

## Masking sensitive information

We mask sensitive information, like user names, email addresses, IP addresses, and so on. In [Snagit](https://www.techsmith.com/screen-capture.html) or a similar program, use the shape tool to mask the text using solid gray, (RGB 212, 212, 212).

## Callouts

Create callouts using the shape tool in SnagIt. Callouts should be red, 100% opacity, no drop shadow effect, 2 pts wide.
