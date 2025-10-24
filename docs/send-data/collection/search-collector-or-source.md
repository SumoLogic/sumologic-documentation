---
id: search-for-a-collector-or-source
title: Search for a Collector or Source
description: Search for a Collector or Source on the Manage Collection page.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Many Sumo Logic customers have hundreds of collectors and sources installed and configured. But even with only 10 Collectors, sometimes it can be hard to find the one you need in the list.

On the **Collection** page, a search field allows you to search for collectors and sources by name or `_sourceCategory` using complete keywords.

To match partial keywords use a wildcard. For example, use "**apache\***" to match "apacheprod".

Wildcards are supported only at the end of the keyword and keywords are case insensitive.

In addition to the search field, you have a couple of dropdown selections to further filter your results.<br/><img src={useBaseUrl('img/collector/search-collectors-page.png')} alt="Search collectors page" style={{border: '1px solid gray'}} width="500" />

* The **Show** dropdown provides the options for All, Installed, Hosted, Running, and Stopped Collectors.
* The **Show up to** dropdown allows you to filter the number of results displayed.
* **Expand** to expand or collapse the Collector's displayed Sources.

To search for a collector or source:
1. [**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic main menu select **Data Management**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**. <br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. 
1. Enter a complete keyword (or keyword and wildcard) in the search field, and click **Search** or press Enter.

Search results are displayed.
