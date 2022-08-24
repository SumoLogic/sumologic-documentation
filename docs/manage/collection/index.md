---
slug: /manage/collection
title: Sumo Logic Collection Page
description: Learn how to manage Collectors, Sources, and processing rules.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/icons/operations/collect.png')} alt="icon" width="75"/>

Use the **Collection** page to manage all of your Collectors and Sources. To access the Collection page, go to **Manage Data \> Collection \> Collection**.

![Collection page June 2021.png](/img/collector/collection-page.png)

## Before You Begin

:::sumo Required Capabilities
You'll need the Manage or View Collectors [role capability](../users-and-roles/roles/role-capabilities.md) to manage or view Collection.
:::


## Collection Page Features

* [Search for a Collector or Source](search-collector-or-source.md)
* View the [health of Collectors and Sources](../health-events.md)
* [Upgrade Sources](../../send-data/sources/hosted-collectors/cloud-to-cloud-integration-framework/cloud-to-cloud-source-versions.md) from the [Cloud-to-Cloud Integration Framework](/docs/send-data/sources/hosted-collectors/cloud-to-cloud-integration-framework))
* [Upgrade Collectors](upgrade-collectors.md)
* Add an [Installed Collector](/docs/send-data/sources/installed-collectors) or a [Hosted Collector](../../send-data/hosted-collectors.md)
* Use the **Show** options to filter the list
* Use the **Expand** options to show or hide information about the Sources
* Use the paging controls to navigate the list of Collectors

## Collector Actions

* [Add a Source](/docs/send-data/sources)
* [Edit a Collector](edit-collector.md)
* [Delete a Collector](delete-collector-source.md)
* [Download a JSON configuration file](../../send-data/sources/use-json-configure-sources/local-configuration-file-management/view-download-source-json-configuration.md) for scripting or backup
* [Restart a Collector](restart-collectors.md)

## Source Actions

* [Edit the Source](edit-source.md)
* [Delete a Source](delete-collector-source.md)
* [Download a JSON configuration file](../../send-data/sources/use-json-configure-sources/local-configuration-file-management/view-download-source-json-configuration.md) for scripting or backup
* [Pause or resume a Source](pause-resume-source.md) (cloud polling Sources only)
* [Show or regenerate a Source URL](../../send-data/sources/hosted-collectors/http-logs-metrics-source/generate-new-url-http-source.md) (HTTP Sources only)
* [Show or regenerate a Source token](/docs/send-data/sources/hosted-collectors/cloud-syslog-source) (cloud syslog Source only)

## Available Information about Collectors and Sources

* **Name**. Displays the name of the Collector, and any Sources that are configured under it. It also displays the type of Source (HTTP, Local File, Local Windows Event Log, etc.)
  * **Open in Search**. Hover over the Name of the Collector or Source and click the Open in Search icon to start a search in the Search page.
  * **Tooltip**. Hover over a Collector or Source name to display an informational tool tip.

    The Collector's version is provided in the tooltip.        

    ![Collector version in tooltip.png](/img/collector/collector-version-in-tooltip.png)

* **Health**. Shows color-coded healthy, error, and warning states for Collectors and Sources so you can quickly determine the [health of your Collectors and Sources](../health-events.md).

  If an Installed Collector appears offline try [restarting the service](pause-resume-source.md) and [testing connectivity](../../send-data/installed-collectors/collector-installation-reference/test-connectivity-sumo-collectors.md).
* **Type**. Displays whether the Collector is an Installed or Hosted Collector.
* **Status**. Shows the status of Sources manually paused by users.
* **Source Category**. Displays the name of the configured Source Category for this Collector or Source.
* **Sources**. Displays the number of Sources configured under a Collector.
* **Last Hour**. Displays a graph of the total number of log messages ingested per minute over the past hour.
* **Messages**. Displays the total number of log messages ingested over the past hour.

import DocCardList from '@theme/DocCardList';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

## Guide contents

In this section, we will introduce the following concepts:

<DocCardList items={useCurrentSidebarCategory().items}/>
