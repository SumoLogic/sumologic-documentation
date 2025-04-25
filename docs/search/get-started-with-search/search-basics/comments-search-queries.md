---
id: comments-search-queries
title: Comments in Search Queries
description: You can add comments to a search query, or even comment out lines of your search query using comment formatting.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

On the **Search** page, you can add comments and comment out lines of
your query using comment formatting, as follows:

* `//` - Comments out a single line of the query, or a part of a
    single line. 
* `/*  */` - Creates a multiple line comment.

Use the keyboard shortcut **command + /** on macOS or **control + /** on Windows to generate comment formatting on the selected line(s) in your query.

Comments can be useful for the following use cases:

* Add comments to your search query in order to add context for users who may want to use or edit your queries at a later date.
* Comment out single lines or multiple lines to troubleshoot your query while you are writing it.

When you comment out a line of your search query, the user interface displays the commented text as grey and italic. See the following
example of commenting out a single line in a query:

![one line comment.png](/img/search/get-started-search/search-basics/comments-search-queries/one-line-comment.png)

If the query is valid without the line that is commented out, it will still run when you click **Start**.

The `where` statement is commented out in the above statement.

The following is a multi-line comment.

![multi line comment.png](/img/search/get-started-search/search-basics/comments-search-queries/multi-line-comment.png)

## Pro Tip: Leverage pre-built Sumo Logic app queries

Sumo Logic apps are a great resource for example search queries. You can preview and even [run a Log Search a from Sumo Logic app](/docs/get-started/apps-integrations/#run-searches-from-sumo-logic-apps) without installing it.

To find installed Sumo Logic apps, open the [**Library**](/docs/get-started/library/) and go to the **Installed Apps** folder. You can also [copy content from the Library](/docs/get-started/library), and use it as a starting point to create your own queries. When you do that, you can comment out the aggregation lines of the query and replace them with your own. You can also delete them of course, but commenting them out instead would make them available for reference later.
