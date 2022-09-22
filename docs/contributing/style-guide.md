---
id: style-guide
title: Sumo Logic Style Guide
sidebar_label: Style Guide
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::caution

Under construction &#128679;
:::

The Sumo Logic Style Guide is a guide to language at Sumo Logic, so that we can speak as one company with a unified voice, and know what we mean when we talk about our product. The Style Guide began as a document used by the Documentation team to make decisions about tone, voice, and word usage. We thought it would be useful to share with everyone in our community.

The Sumo Logic Style Guide is a living document. If you have wondered about the usage of the name of a component or feature in the UI, or any other word usage, and you don't find that term here, please let us know. The Documentation team will look it up and add usage guidance. Likewise, if you disagree with any usage defined here, please let us know and we'll update as necessary.


## Grammar and Style

If you need help with a convention, word to use, or format to follow, we will keep a cheatsheet of styles here. We also follow [Microsoft Manual of Style](https://docs.microsoft.com/en-us/style-guide/welcome/).

For terminology usage guidance, see [Word List](docs/contributing/word-list.md).


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


### Structuring Content

* Tell the user in the doc introduction (first paragraph) what the page teaches, why they should read it, and who should read it.
* Let the user know what step/place they are in for a tutorial in the introduction/at top. The layout automatically provides a previous/next at the bottom of the page.
* Link out to important concepts and overviews for additional reading. This is helpful for instruction pages or tutorials.
* Keep instructions concise, easy to follow, not too many screenshots.
* Include any notes, warnings, etc.


### Active Voice

When writing instructions, it helps to always use active voice. This gives a call to action for the reader or user to effectively get something done. It also reduces word count and keeps instructions clear.

| Good Active | Not Active | Why? |
| -- | -- | -- |
| Add a resource... | You can add a resource... | They know they can do a thing. Clearly state to do the thing. |
| Build the query using the following... | Please build the query using the following... | We need them to complete a task. No need for please. |
| To add a new collector:<br/>1. Access Sumo Logic and find the... | 1. When you need to add a new collector, access Sumo Logic and find the... | Introduce your instructions with the goal, then dive into the instructions. This is called a stem, and it helps focus the task and keeps you active. |


### Acronyms

An acronym uses the first initials of a word or phrase, for brevity. Our industry is full of them, and they can get confusing if their usage isn't clear. Acronyms should be capitalized, if not used directly in a query, etc. Unless the usage is clear from the context, for the first usage, spell out the phrase, then present the acronym in parenthesis. For example: Secure Shell (SSH).

All companies have numerous acronyms for product, features, solutions, and more. Our documentation includes acronyms for Sumo Logic and third party software. Always fully spell out the first instance of the acronym on the page, then you can use it throughout. Do not spell out in a heading, but in paragraphs or bullets.

For example, the first time you use AWS Application Load Balancer (ALB), you introduce or use it like that the first time on the page. Through the rest of the page, you can use ALB.

### Contractions

For writing in English, contractions feel like normal, everyday speech. But they can cause issues with translation, especially if someone uses Google Chrome translation or other tools and when we hire companies to translate content. We recommend not using contractions. Spell out all words. This includes don't, it's, haven't, and so on.

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


### Patents and trademarks

Protecting our patents and trademarks is important to do correctly. We don't want to expose the company to a loss of trademark or patent just because we didn't list it correctly.

This is a partial list of trademarked terms, which should be capitalized exactly as shown below.

* Sumo Logic
* Big Data for Real Time IT
* Log Reduce
* Elastic Log Processing
* Push Analytics

Never use Sumo Logic in the plural or possessive form.

## Writing for SEO

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

## File Naming Convention

A Markdown file has a filename and extension of .md. We recommend keeping the filename short. It does not affect the canonical link.

## Beta Releases

For Beta docs, we want to publish them, but exclude them from the nav and search engine results so that you need the physical link to access them. [Learn how to write it in markdown](/docs/contributing/markdown-cheat-sheet#beta-releases).


## Metadata

We refer to our doc site metadata (i.e., title, description, and search keywords), located in the header, as _frontmatter_. [Learn more](/docs/contributing/markdown-cheat-sheet#frontmatter).

## Formatting Text

Here's a guide to text formatting. See the Microsoft Style Guide for [User Input | Formatting Text in Instructions](https://docs.microsoft.com/en-us/style-guide/procedures-instructions/formatting-text-in-instructions) for more info.

### Headings

Use headings to group content. These mark the sections, from H2 (##) to H5 (#####).

* We mark a heading using a number of # for the level. This section is using an H3 heading, which is `### Headings`.
*  Never use H1 (`#`) in your document. Page titles, which are displayed as H1, live in the metadata section (i.e., front matter) for SEO.
* Headings should always be clean, plain text. Do not use **bold**, _italics_, or code ticks.
* Be careful of using special characters. We recommend not using most punctuation. Dashes are ok for headings.

### Italics

Use _italics_ for:
* Defining a term the first time. For example, when defining a collector the first time, you would italicize once with the definition.
* Providing content to enter into a field.

### Bold

* Use **bold** for UI elements you interact with, such as a button or tab.

### Code (Inline)

* Use \` \` single backticks to format inline code, such as commands, API method names, and code. For information on code blocks (scripts), see [Code Blocks](#code-blocks).

Here's an example that encompasses all the above styles: If you are not parsing all sources in the hosted collector with the same parser, click the **+Add Field** link, and add a field whose name is `_parser` with value _/Parsers/System/Auth0/Auth0_.

### Code Blocks

Use code blocks to format scripts, such as the JSON example below. This is important for scripts and CLI. [Here's how to write it in markdown](/docs/contributing/markdown-cheat-sheet#code-blocks).

```json
{  
    "employee": {  
        "name": "Jane Smith",   
        "team": "Operations",   
        "manager": true  
    }  
}  
```

### Numbered lists

Use numbered lists when providing a set of instructions or steps. [Here's how to write it in markdown](/docs/contributing/markdown-cheat-sheet#Numbered-Lists).

### Bulleted lists

Use bulleted lists when the items don't need to be presented in sequential order. Ensure parallel grammatical structure - that is, start each bullet with the same part of speech. [Here's how to write it in markdown](/docs/contributing/markdown-cheat-sheet#bulleted-Lists).

### Tables
Simple tables can help format content. For example, lists of attributes with descriptions. Adding the style below the table helps with formatting. [Here's how to write it in markdown](/docs/contributing/markdown-cheat-sheet#tables).

### Notes and Callouts

We refer to callout elements like Tip, Note, Warning, and Caution as admonitions. [Here's how to write them in markdown](/docs/contributing/markdown-cheat-sheet#admonitions).


## Images

* Images should be in PNG or GIF format
* Always include image alt text
* Width parameters should be used for oversized images

[Here's how to write it in markdown](/docs/contributing/markdown-cheat-sheet#images).

#### Screenshots

Capture screenshots using SnagIt in .png format. Use SnagIt's border effect to apply a gray (RGB 212, 212, 212) 4-point border.

By default, images that you insert into a page will be set to be "Responsive", as shown below on the **Options** tab for an image in MindTouch.

"Responsive" images are automatically resized for the type of device the reader is using. Generally, you should not change the size of an image in MindTouch.

There's an exception to this rule: you may need to manually change the size of a wide image that is near the top of the page. That's because MindTouch's responsive resizing doesn't take into account the page TOC that appears in the upper right of topic pages. So, if you include an image in the vicinity of the page TOC, the image will be pushed down to below the end of the TOC. This is almost always an issue on release notes pages, as we generally include a screenshot in each release note. If the image is too big, the page will look like this:

The solution is to resize the image to be 750 px wide. To do so in the visual editor, grab the upper right corner and size the image manually until it is 750 px wide. The height will adjust proportionately.  

#### Masking sensitive information

We mask sensitive information, like user names, email addresses, IP addresses, and so on. In [Snagit](https://www.techsmith.com/screen-capture.html) or a similar program, use the shape tool to mask the text using solid gray, (RGB 212, 212, 212).

#### Callouts

Create callouts using the shape tool in SnagIt. Callouts should be red, 100% opacity, no drop shadow effect, 2 pts wide.



### Additional Resources

If you are new to writing content or would like to learn more, see these resources. The Sumo Logic Docs team will review submissions, provide suggested edits, add new content into the navigation, and answer any questions you have.

* [Write the Docs](https://www.writethedocs.org/guide/writing/beginners-guide-to-docs/) - Association of tech writers, developers, trainers, and more that have collected ideas, created training and guidelines, and actively discuss documentation.
* [Google Technical Writing Courses](https://developers.google.com/tech-writing) - Excellent and easy self-paced courses to refine your writing. Be advised, the courses may use a different style, but still excellent to get started.
* [Every Page is Page One](https://everypageispageone.com/examples-of-eppo-topics/) - A helpful method for considering what goes into a page is to think of every page as page one. With the extreme use of search engines or sharing a link to find content, users may land in the middle of a section or tutorial. These ideas help hone your content and focus on user needs.

Helpful blogs on tech writing:

* [Usability and Tech Writing](https://www.nngroup.com/topic/writing-web/) - Jakob Neilson defined usability, including insights on technical writing and learning, helpful for writing docs
* [FFeathers tech writing](https://ffeathers.wordpress.com/) - Pioneered API and technical tech writing, insights and instructions
* [I'd rather be writing](https://idratherbewriting.com/) - Guides and thoughts on tech writing process and content

### Doc Templates

To quickly create a page, use a template. You can copy and paste the file, add your content, and submit a PR. If you need formats for specific code, see the formats template.

(coming soon)
* Doc topic - Use for any documentation page
* APIs - Use for API and code
* Format template
