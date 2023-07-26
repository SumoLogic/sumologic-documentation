---
id: search-for-a-collector-or-source
title: Search for a Collector or Source
description: Search for a Collector or Source on the Manage Collection page.
---

Many Sumo Logic customers have hundreds of collectors and sources installed and configured. But even with only 10 Collectors, sometimes it can be hard to find the one you need in the list.

On the **Manage Data** > **Collection** > **Collection** page, a search field allows you to search for collectors and sources by name or sourceCategory using complete keywords.

To match partial keywords use a wildcard. For example, use "**apache\***" to match "apacheprod".

Wildcards are supported only at the end of the keyword and keywords are case insensitive.

In addition to the search field, you have a couple of dropdown selections to further filter your results.<br/>  ![search collectors page](/img/collector/search-collectors-page.png)

* The **Show** dropdown provides the options for All, Installed, Hosted, Running, and Stopped Collectors.
* The **Show up to** dropdown allows you to filter the number of results displayed.
* **Expand** to expand or collapse the Collector's displayed Sources.

To search for a collector or source:
1. Go to **Manage Data** > **Collection** > **Collection**.
1. Enter a complete keyword (or keyword and wildcard) in the search field, and click **Search** or press Enter.

Search results are displayed.
