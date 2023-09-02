---
slug: /send-data/collection
title: Using the Sumo Logic Collection UI
description: Learn how to manage Collectors, Sources, and processing rules.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/icons/operations/collect.png')} alt="icon" width="50"/>

This page provides an overview of the Sumo Logic **Collection** page UI, where you can manage all of your Collectors and Sources. To access the Collection page, go to **Manage Data** > **Collection** > **Collection**. <br/>![Collection page June 2021.png](/img/collector/collection-page.png)

## Prerequisites

You'll need the Manage or View Collectors [role capability](/docs/manage/users-roles/roles/role-capabilities.md) to manage or view Collection.

## Collection Page Features

* [Search for a Collector or Source](search-collector-or-source.md)
* View the [health of Collectors and Sources](/docs/manage/health-events.md)
* [Upgrade Sources](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/cloud-to-cloud-source-versions.md) from the [Cloud-to-Cloud Integration Framework](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework)
* [Upgrade Collectors](upgrade-collectors.md)
* Add an [Installed Collector](/docs/send-data/installed-collectors/sources) or a [Hosted Collector](/docs/send-data/hosted-collectors)
* Use the **Show** options to filter the list
* Use the **Expand** options to show or hide information about the Sources
* Use the paging controls to navigate the list of Collectors

## Collector Actions

* [Add a Source](/docs/send-data/choose-collector-source)
* [Edit a Collector](edit-collector.md)
* [Delete a Collector](delete-collector-source.md)
* [Download a JSON configuration file](/docs/send-data/use-json-configure-sources/local-configuration-file-management/view-download-source-json-configuration.md) for scripting or backup
* [Restart a Collector](restart-collectors.md)

## Source Actions

* [Edit a Source](edit-source.md)
* [Delete a Source](delete-collector-source.md)
* [Download a JSON configuration file](/docs/send-data/use-json-configure-sources/local-configuration-file-management/view-download-source-json-configuration.md) for scripting or backup
* [Pause or resume a Source](pause-resume-source.md) (cloud polling Sources only)
* [Show or regenerate a Source URL](/docs/send-data/hosted-collectors/http-source/generate-new-url.md) (HTTP Sources only)
* [Show or regenerate a Source token](/docs/send-data/hosted-collectors/cloud-syslog-source) (cloud syslog Source only)

## View Information about Collectors and Sources

* **Name**. Displays the name of the Collector, and any Sources that are configured under it. It also displays the type of Source (HTTP, Local File, Local Windows Event Log, etc.)
  * **Open in Search**. Hover over the Name of the Collector or Source and click the Open in Search icon to start a search in the Search page.
  * **Tooltip**. Hover over a Collector or Source name to display an informational tool tip. The Collector's version is provided in the tooltip.      <br/>![Collector version in tooltip.png](/img/collector/collector-version-in-tooltip.png)
* **Health**. Shows color-coded healthy, error, and warning states for Collectors and Sources so you can quickly determine the [health of your Collectors and Sources](/docs/manage/health-events.md).
  If an Installed Collector appears offline try [restarting the service](pause-resume-source.md) and [testing connectivity](/docs/send-data/installed-collectors/collector-installation-reference/test-connectivity-sumo-collectors).
* **Type**. Displays whether the Collector is an Installed or Hosted Collector.
* **Status**. Shows the status of Sources manually paused by users.
* **Source Category**. Displays the name of the configured Source Category for this Collector or Source.
* **Sources**. Displays the number of Sources configured under a Collector.
* **Last Hour**. Displays a graph of the total number of log messages ingested per minute over the past hour.
* **Messages**. Displays the total number of log messages ingested over the past hour.


## Guide contents

In this section, we'll introduce the following concepts:

<div className="box-wrapper" markdown="1">
<div className="box smallbox1 card">
  <div className="container">
  <a href="/docs/send-data/collection/search-for-a-collector-or-source"><img src={useBaseUrl('img/icons/operations/collect.png')} alt="icon" width="40"/><h4>Search for a Collector or Source</h4></a>
  <p>Search for a collector or source on the manage collection page.</p>
  </div>
</div>
<div className="box smallbox2 card">
  <div className="container">
  <a href="/docs/send-data/collection/start-stop-collector-using-scripts"><img src={useBaseUrl('img/icons/operations/collect.png')} alt="icon" width="40"/><h4>Start or Stop a Collector using Scripts
</h4></a>
  <p>Start/stop a collector and check collector status.</p>
  </div>
</div>
<div className="box smallbox3 card">
  <div className="container">
  <a href="/docs/send-data/collection/restart-collectors"><img src={useBaseUrl('img/icons/operations/collect.png')} alt="icon" width="40"/><h4>Restart a Collector</h4></a>
  <p>Restart a collector from the collection page.</p>
  </div>
</div>
<div className="box smallbox4 card">
  <div className="container">
  <a href="/docs/send-data/collection/edit-collector"><img src={useBaseUrl('img/icons/operations/collect.png')} alt="icon" width="40"/><h4>Edit a Collector</h4></a>
  <p>Edit collector characteristics.</p>
  </div>
</div>
<div className="box smallbox5 card">
  <div className="container">
  <a href="/docs/send-data/collection/edit-source"><img src={useBaseUrl('img/icons/operations/collect.png')} alt="icon" width="40"/><h4>Edit a Source</h4></a>
  <p>Edit source characteristics.</p>
  </div>
</div>
<div className="box smallbox6 card">
  <div className="container">
  <a href="/docs/send-data/collection/pause-resume-source"><img src={useBaseUrl('img/icons/operations/collect.png')} alt="icon" width="40"/><h4>Pause and Resume a Source</h4></a>
  <p>Pause sources from sending data to Sumo Logic.</p>
  </div>
</div>
    <div className="box smallbox7 card">
      <div className="container">
      <a href="/docs/send-data/collection/delete-collector-or-source"><img src={useBaseUrl('img/icons/operations/collect.png')} alt="icon" width="40"/><h4>Delete a Collector or Source</h4></a>
      <p>Delete a collector or source.</p>
      </div>
    </div>
    <div className="box smallbox8 card">
      <div className="container">
      <a href="/docs/send-data/collection/set-collector-cpu-usage-target"><img src={useBaseUrl('img/icons/operations/collect.png')} alt="icon" width="40"/><h4>Set a Collector CPU Usage Target</h4></a>
      <p>Limit the amount of CPU processing a collector uses.</p>
      </div>
    </div>
    <div className="box smallbox9 card">
      <div className="container">
      <a href="/docs/send-data/collection/upgrade-collectors"><img src={useBaseUrl('img/icons/operations/collect.png')} alt="icon" width="40"/><h4>Upgrade a Collector</h4></a>
      <p>Deploy an upgrade to one or more collectors.</p>
      </div>
    </div>
    <div className="box smallbox10 card">
      <div className="container">
      <a href="/docs/send-data/collection/collector-logs"><img src={useBaseUrl('img/icons/operations/collect.png')} alt="icon" width="40"/><h4>Collector Logs</h4></a>
      <p>Use log events to troubleshoot collection issues.</p>
      </div>
    </div>
    <div className="box smallbox11 card">
      <div className="container">
      <a href="/docs/send-data/collection/processing-rules"><img src={useBaseUrl('img/icons/operations/collect.png')} alt="icon" width="40"/><h4>Processing Rules</h4></a>
      <p>Processing rules can help filter and forward data.</p>
      </div>
    </div>
</div>
