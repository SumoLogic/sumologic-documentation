---
slug: /send-data/collection
title: Using the Sumo Logic Collection UI
description: Learn how to manage collectors, sources, and processing rules.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/icons/operations/collect.png')} alt="Collect icon" width="50"/>

This page provides an overview of the Sumo Logic **Collection** page UI, where you can manage all of your collectors and sources. 

[**New UI**](/docs/get-started/sumo-logic-ui/). To access the Collection page, In the Sumo Logic main menu select **Data Management**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**. 

[**Classic UI**](/docs/get-started/sumo-logic-ui-classic). To access the Collection page, in the main Sumo Logic menu select **Manage Data > Collection > Collection**. 

<img src={useBaseUrl('img/collector/collection-page.png')} alt="Collection page" style={{border: '1px solid gray'}} width="800" />

## Prerequisites

You'll need the Manage or View Collectors [role capability](/docs/manage/users-roles/roles/role-capabilities.md) to manage or view Collection.

## Collection Page Features

* [Search for a Collector or Source](search-collector-or-source.md)
* View the [health of collectors and sources](/docs/manage/health-events.md)
* [Upgrade sources](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/cloud-to-cloud-source-versions.md) from the [Cloud-to-Cloud Integration Framework](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework)
* [Upgrade collectors](upgrade-collectors.md)
* Add an [installed collector](/docs/send-data/installed-collectors/sources) or a [hosted collector](/docs/send-data/hosted-collectors)
* Use the **Show** options to filter the list
* Use the **Expand** options to show or hide information about the sources
* Use the paging controls to navigate the list of collectors

## Collector Actions

* [Add a source](/docs/send-data/choose-collector-source)
* [Edit a Collector](edit-collector.md)
* [Delete a collector](delete-collector-source.md)
* [Download a JSON configuration file](/docs/send-data/use-json-configure-sources/local-configuration-file-management/view-download-source-json-configuration.md) for scripting or backup
* [Restart a Collector](restart-collectors.md)

## Source Actions

* [Edit a Source](edit-source.md)
* [Delete a source](delete-collector-source.md)
* [Download a JSON configuration file](/docs/send-data/use-json-configure-sources/local-configuration-file-management/view-download-source-json-configuration.md) for scripting or backup
* [Pause or resume a source](pause-resume-source.md) (cloud polling sources only)
* [Show or regenerate a source URL](/docs/send-data/hosted-collectors/http-source/generate-new-url.md) (HTTP sources only)
* [Show or regenerate a source token](/docs/send-data/hosted-collectors/cloud-syslog-source) (cloud syslog source only)

## View Information about Collectors and Sources

* **Name**. Displays the name of the collector, and any sources that are configured under it. It also displays the type of source (HTTP, Local File, Local Windows Event Log, and so on).
  * **Open in Search**. Hover over the Name of the collector or source and click the Open in Search icon to start a search in the Search page.
  * **Tooltip**. Hover over a collector or source name to display an informational tool tip. The collector's version is provided in the tooltip.      <br/><img src={useBaseUrl('img/collector/collector-version-in-tooltip.png')} alt="Collector version in tooltip" style={{border: '1px solid gray'}} width="300" />
* **Health**. Shows color-coded healthy, error, and warning states for collectors and sources so you can quickly determine the [health of your collectors and sources](/docs/manage/health-events.md).
  If an installed collector appears offline try [restarting the service](pause-resume-source.md) and [testing connectivity](/docs/send-data/installed-collectors/collector-installation-reference/test-connectivity-sumo-collectors).
* **Type**. Displays whether the collector is an Installed or Hosted collector.
* **Status**. Shows the status of sources manually paused by users.
* **Source Category**. Displays the name of the configured Source Category for this collector or source.
* **Sources**. Displays the number of sources configured under a collector.
* **Last Hour**. Displays a graph of the total number of log messages ingested per minute over the past hour.
* **Messages**. Displays the total number of log messages ingested over the past hour.


## Guide contents

In this section, we'll introduce the following concepts:

<div className="box-wrapper">
<div className="box smallbox card">
  <div className="container">
  <a href={useBaseUrl('docs/send-data/collection/search-for-a-collector-or-source')}><img src={useBaseUrl('img/icons/operations/collect.png')} alt="Collect icon" width="40"/><h4>Search for a Collector or Source</h4></a>
  <p>Search for a collector or source on the manage collection page.</p>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href={useBaseUrl('docs/send-data/collection/start-stop-collector-using-scripts')}><img src={useBaseUrl('img/icons/operations/collect.png')} alt="Collect icon" width="40"/><h4>Start or Stop a Collector using Scripts</h4></a>
  <p>Start/stop a collector and check collector status.</p>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href={useBaseUrl('docs/send-data/collection/edit-collector')}><img src={useBaseUrl('img/icons/operations/collect.png')} alt="Collect icon" width="40"/><h4>Edit a Collector</h4></a>
  <p>Edit collector characteristics.</p>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href={useBaseUrl('docs/send-data/collection/edit-source')}><img src={useBaseUrl('img/icons/operations/collect.png')} alt="Collect icon" width="40"/><h4>Edit a Source</h4></a>
  <p>Edit source characteristics.</p>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href={useBaseUrl('docs/send-data/collection/pause-resume-source')}><img src={useBaseUrl('img/icons/operations/collect.png')} alt="Collect icon" width="40"/><h4>Pause and Resume a Source</h4></a>
  <p>Pause sources from sending data to Sumo Logic.</p>
  </div>
</div>
    <div className="box smallbox card">
      <div className="container">
      <a href={useBaseUrl('docs/send-data/collection/delete-collector-or-source')}><img src={useBaseUrl('img/icons/operations/collect.png')} alt="Collect icon" width="40"/><h4>Delete a Collector or Source</h4></a>
      <p>Delete a collector or source.</p>
      </div>
    </div>
    <div className="box smallbox card">
      <div className="container">
      <a href={useBaseUrl('docs/send-data/collection/set-collector-cpu-usage-target')}><img src={useBaseUrl('img/icons/operations/collect.png')} alt="Collect icon" width="40"/><h4>Set a Collector CPU Usage Target</h4></a>
      <p>Limit the amount of CPU processing a collector uses.</p>
      </div>
    </div>
    <div className="box smallbox card">
      <div className="container">
      <a href={useBaseUrl('docs/send-data/collection/upgrade-collectors')}><img src={useBaseUrl('img/icons/operations/collect.png')} alt="Collect icon" width="40"/><h4>Upgrade a Collector</h4></a>
      <p>Deploy an upgrade to one or more collectors.</p>
      </div>
    </div>
    <div className="box smallbox card">
      <div className="container">
      <a href={useBaseUrl('docs/send-data/collection/collector-logs')}><img src={useBaseUrl('img/icons/operations/collect.png')} alt="Collect icon" width="40"/><h4>Collector Logs</h4></a>
      <p>Use log events to troubleshoot collection issues.</p>
      </div>
    </div>
    <div className="box smallbox card">
      <div className="container">
      <a href={useBaseUrl('docs/send-data/collection/processing-rules')}><img src={useBaseUrl('img/icons/operations/collect.png')} alt="Collect icon" width="40"/><h4>Processing Rules</h4></a>
      <p>Processing rules can help filter and forward data.</p>
      </div>
    </div>
</div>
