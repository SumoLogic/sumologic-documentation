---
id: word-list
title: Word List
description: Preferred spelling, capitalization, and punctuation for Sumo Logic product names, UI terms, and common words.
---

This word list gives the preferred spelling, capitalization, and punctuation for commonly used Sumo Logic terms, including product components and features, along with usage conventions. It's a usage reference, not a glossary. For definitions of Sumo Logic terms, see the [Glossary](/docs/contributing/glossary).


## A

**Acronyms**. An acronym uses the first initials of a word or phrase, for brevity. Our industry is full of them, and they can get confusing if their usage isn't clear. Acronyms should be capitalized, if not used directly in a query, etc. Unless the usage is clear from the context, for the first usage, spell out the phrase, then present the acronym in parenthesis. For example: Secure Shell (SSH).

**Aggregates tab**. When referring to the Aggregates tab (where aggregate search results are displayed) the term Aggregates is capitalized.

**Ampersand (&)**. Don't use for "and". Spell out.

**Anomaly Detection**. Always capitalize.

**Apps**. When referring to a Sumo Logic app, do not capitalize. No need to spell out application.

**Autocomplete**. One word, not two. The Sumo Logic feature is called Search autocomplete.



## C

**Check box**. Check box is two words. Don't use checkbox.

**Classic UI**. Use this term to clarify that you're talking about the legacy UI.

**Click**. You click a UI element. Do not use "click on".

**Collector**. Lowercase. `collector`, `hosted collector`, and `installed collector` are descriptive terms, not product names, so they follow the same rule as "collecting events" or "data collection". Capitalize only in a literal UI label, such as the **Add Collector** button.

**Color palette**. Use the [official Sumo Logic color palette](https://sites.google.com/sumologic.com/sumo-logic-brand/color) when creating diagrams.

**Column**. When referring to a column in a dashboard, the term is not capitalized unless it's the only word in a line of UI (for example, in the Add to Dashboard dialog box "Column" is capitalized). The word "column" doesn't appear in the main dashboard UI.



## D

**Dashboard**. Lowercase when you mean a dashboard as a concept or a user-created dashboard. Bold and match the on-screen capitalization only when you name an on-screen label, such as the **Dashboards** page. See **UI labels**, below.

**Dashboard Theme**. Choose between light or dark themes for dashboards. Only capitalize Theme when you're referring to the UI element in the Dashboard Properties menu.

**Data**. Data is plural. Use "data are", not "data is".

**Dimension**. Used interchangeably with tags.

**Drill down**. Drill down, as in a menu, or other filtering feature is two words, not one.

**Dropdown**.
   * Use drop-down (Adjective). Example: Choose your favorite model from a *drop-down* menu.
   * Use dropdown (Noun). Example: Select a source category from the *dropdown*. Do not use drop down (two words).

:::info
If we are not clear on its usage, the term shouldn’t be used at all: Don't use 'drop-down'; use menu or list. We should keep our target audience in mind, that is, developers or engineers. For example, "Select a source from the list". Developers or Engineers already know they have to select the source from the dropdown only.
:::

## E

**E.g., i.e., and etc.,** These abbreviations are parenthetical, which means they take a comma after. [Avoid using these abbreviations](/docs/contributing/style-guide/#abbreviations).

**Email**. Email is one word, lowercase. Do not use a hyphen, such as "e-mail". Do not capitalize if it is not at the beginning of a sentence.  

**Em dash**. We do not use this often, but if you need to use it, insert the em dash symbol (—), do not use a double hyphen (–).

**Exclamation points !**. Use exclamation points only in warnings and greetings. Let your text convey the enthusiasm or importance of the statement. Don't make the reader wait until the exclamation point to find out the text is significant.


## G

**GB and Gbit**. GB is the acronym for gigabytes. Gbit or Gb is the acronym for gigabits. Make sure to capitalize correctly. Don't use a space between the acronym and the number. (Example: 10GB or 15Gbit.)

**Geolocation**. Geolocation is one word. It is not capitalized unless used at the beginning of a sentence.

**Geo lookup operator**. Geo lookup is two words.


## H

**Hash rules**. Hash rules replace a message with a unique, randomly-generated code to protect sensitive or proprietary information. You may want to hash unique identifiers, such as credit card numbers or user names. By hashing this type of data, you can still track it, even though it's fully hidden.

**Hibachi**. Project for content sharing and collaboration. Includes a new app catalog and app installation flow and a new library design.

**Home Page**. Persistent tab, which services the Jiro and Hibachi projects by helping users get started and discover content more easily.

**Hosted collectors**. Hosted collectors do not require installation or registration, nor do hosted collectors have physical requirements, since they're hosted by Sumo Logic in AWS.


## I

**`if` operator**. A ternary operator used to evaluate a condition as either true or false, with values assigned for each outcome. It is a shorthand way to express an if-else condition.

**Include rule**. Include rules are a type of processing rule used to send only the data you'd like in your Sumo Logic account (an "allowlist" filter). This type of filter can be very useful when the list of log data you want to send to Sumo Logic is easier to filter than setting up exclude filters for all of the types of messages you'd like to exclude.

**Installed collector**. Installed collectors are deployed in your environment, either on a local machine, a machine in your organization, or even an Amazon Machine Image (AMI). Installed collectors require a software download and installation. Upgrades to collector software are released regularly by Sumo Logic.

## J

**JavaScript**. Always use camelCase.

## L

**Library**. The Sumo Logic Library (formerly the Content Library) is now just the Library. Capitalize.

**Login vs Log In**. Login as one word is a _noun_ or an _adjective_. Log in as two words is a _verb_. For example, "You can log in on the login page."


## M

**Markdown**. Used in dashboard text panels. Capitalize Markdown.

**MB and Mbit.** MB is the acronym for megabytes. Mbit or Mb is the acronym for megabits. Make sure to capitalize correctly. Don't use a space between the acronym and the number. (Example: 10MB or 15Mbit.)

**Menu**. When referring to a menu in the UI, use the word menu alone. Don't use dropdown menu, list, or selector.

**Messages tab**. When referring to the Messages tab (where non-aggregate search results are displayed) the term Messages is capitalized.

**Multiline**. Should be one word, not two, or hyphenated.


## N

**Numbers**. Use numerals, not spelled-out words ("2", not "two"). See the style guide's [Numbers](/docs/contributing/style-guide/#numbers) section for commas, "K"/"M"/"B", and ranges.


## O

**Operators**. When referring to a search operator in prose, capitalize the operator's name only if it begins a sentence. When the operator name is the subject of a heading or an entry (such as in the Glossary), write it lowercase in backticks: `` `where` operator ``, `` `parse` operator ``.

**Org** / **Organization**. Use “org” instead of “organization”, as it sounds more conversational and is the term more commonly used by our customers.

## P

**Page**. When you name a page in the UI, bold the page name, match its on-screen capitalization, and keep the word "page" lowercase and outside the bold: the **Search** page. Don't use "pane" or "tab" for a page. A tab appears inside a page. (Example: The **Messages** tab appears on the **Search** page.) See **UI labels**, below.

**Panel**. When referring to a [dashboard panel](/docs/dashboards/panels) category (for example, text panel, area chart panel, pie chart panel), prefix `panel` with `dashboard` (for example, `area chart dashboard panel`). See also Markdown.

**Please**. Avoid using please. You're making recommendations on how to use software and services; it's not an inconvenience to the user.

**Plugin**. Plugin is one word, not two, and no hyphen.


## Q

**Quotation marks (" " or ' ')**. Do not use in error or warning messages, or in UI text unless necessary to avoid confusion with situations where " " or ' ' are required.


## R

**Repo**. Short for repository. No need to spell out repository as our audience is technical enough for this to be clear.


## S

**Saved search**. Saved search is not capitalized.

**Scheduled search.** Scheduled search is not capitalized.

**Search**. Search is not capitalized, unless you are referring to the Search page.

**Search autocomplete**. One word, not two. The Sumo Logic feature is called Search autocomplete.

**Setup vs Set up**. Setup as one word is a _noun_ or an _adjective_. Set up as two words is a _verb_. For example, "You can set up your collector using the setup procedure."

**Source** / **Sources**. Lowercase `source` — it's the generic word for the category, not part of a source's name. Capitalize the service or type name in front of it, matching the **Add Source** list, and leave `source` lowercase:

* Local File source
* Remote File source
* Syslog source
* Local Windows Event Log source
* Remote Windows Event Log source
* Script source
* Amazon S3 source
* Amazon S3 Audit source
* HTTP source

Capitalize "Source" only where it's the literal UI text, such as the **Add Source** button or the **Source Templates** tab. See **UI labels**, below.

**Space bar**. Two words, not one.

**Sumo Logic**. For all references, always use "Sumo Logic," never "Sumo" alone, including in the possessive. This helps our SEO, which is essential for a SaaS offering. To be more conversational, "we" is also fine.


## T

**Tabs**. When you name a tab in Sumo Logic, bold the tab's name, match its on-screen capitalization, and keep the word "tab" lowercase and outside the bold. (Examples: **Welcome** tab, **Search** tab, **Status** tab.) See **UI labels**, below.

**Text box**. Use text box, not field. A field is a special part of a query.

**Third party**. Hyphenate as an adjective, not as a noun. For example, "We use third-party scripts" is hyphenated. But "Scripts are written by a third party" is not hyphenated.

**Timeline**. Timeline is one word, not two.

**Time range**. Time range is two words, not one.

**Time series.** Time series is two words, not one.

**Time slice**. Time slice is two words, not one.

**Timestamp**. Timestamp is one word.

**Time zone**. Time zone is two words, not one.


## U

**UI labels**. When you name a UI element or page as it appears on screen, bold the label and match its on-screen capitalization: the **Search** page, the **Scheduled Views** page, on the **Aggregates** tab, select **Add to Dashboard**. Bold only the label; the generic word after it ("page", "tab", "button", "menu", "dialog", "field") stays lowercase and outside the bold. When you mean the underlying feature or concept rather than the on-screen control, use lowercase and no bold: "a scheduled view is a pre-aggregated index of your data", "run a search". See the style guide's [Bold](/docs/contributing/style-guide/#bold) and [Capitalization](/docs/contributing/style-guide/#capitalization) sections.


## W

**Web Application**. Avoid using where possible. "Sumo Logic" or "our product" should be sufficient. If you need to refer to our web application to distinguish from API, do so. Don't capitalize.

**Website**. Website or websites is one word.

**`where` operator**. A conditional operator that can precede or follow another operator. Example combinations include `where x matches y`, `where x in (a, b, c)`, `where x not in (a, b, c)` and `where a > 1 and b / 4 < sqrt(x)`.

**Wildcard**. Wildcard is one word.
