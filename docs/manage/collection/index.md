---
slug: /collection
---

# Collection

:::sumo Required Capabilities
You need the Manage or View Collectors [role capability](Users-and-Roles/Manage-Roles/05-Role-Capabilities.md "Role Capabilities") to manage or view Collection.
:::

Use the **Collection** page to manage all of your Collectors and Sources. To access the Collection page, go to **Manage Data \> Collection \> Collection**.

![Collection page June 2021.png](./static/img/./Collection-page-June-2021.png)

## Page Capabilities

* [Search for a Collector or Source](search-collector-or-source.md)
* View the [health of Collectors and Sources] (Health_Events.md)
* [Upgrade Sources] (../03Send-Data/Sources/02Sources-for-Hosted-Collectors/Cloud-to-Cloud_Integration_Framework/Cloud-to-Cloud_Source_Versions.md) from the [Cloud-to-Cloud Integration Framework] (../03Send-Data/Sources/02Sources-for-Hosted-Collectors/Cloud-to-Cloud_Integration_Framework.md "Cloud-to-Cloud Integration Framework")
* [Upgrade Collectors](upgrade-collectors.md)
* Add an [Installed Collector] (../03Send-Data/Installed-Collectors.md) or a [Hosted Collector] (../03Send-Data/Hosted-Collectors/Configure-a-Hosted-Collector.md)
* Use the **Show** options to filter the list
* Use the **Expand** options to show or hide information about the Sources
* Use the paging controls to navigate the list of Collectors

## Available Information about Collectors and Sources

* **Name**. Displays the name of the Collector, and any Sources that are configured under it. It also displays the type of Source (HTTP, Local File, Local Windows Event Log, etc.) 
  * **Open in Search**. Hover over the Name of the Collector or Source and click the Open in Search icon to start a search in the Search page.
  * **Tooltip**. Hover over a Collector or Source name to display an informational tool tip.
    
    The Collector's version is provided in the tooltip.        

    ![Collector version in tooltip.png](/img/collector/collector-version-in-tooltip.png)

* **Health**. Shows color-coded healthy, error, and warning states for Collectors and Sources so you can quickly determine the [health of your Collectors and Sources] (Health_Events.md).

  If an Installed Collector appears offline try [restarting the service](pause-resume-source.md) and [testing connectivity] (../03Send-Data/Installed-Collectors/05Reference-Information-for-Collector-Installation/01Test-Connectivity-for-Sumo-Logic-Collectors.md).
* **Type**. Displays whether the Collector is an Installed or Hosted Collector.
* **Status**. Shows the status of Sources manually paused by users.
* **Source Category**. Displays the name of the configured Source Category for this Collector or Source.
* **Sources**. Displays the number of Sources configured under a Collector.
* **Last Hour**. Displays a graph of the total number of log messages ingested per minute over the past hour.
* **Messages**. Displays the total number of log messages ingested over the past hour.

## Collector Actions

* [Add a Source] (../03Send-Data/Sources.md "https://help.sumologic.com/Send_Data/Sources")
* [Edit a Collector](edit-collector.md)
* [Delete a Collector](delete-collector-source.md)
* [Download a JSON configuration file] (../03Send-Data/Sources/03Use-JSON-to-Configure-Sources/Local-Configuration-File-Management/View-or-Download-Source-JSON-Configuration.md) for scripting or backup

## Source Actions

* [Edit the Source](edit-source.md)
* [Delete a Source](delete-collector-source.md)
* [Download a JSON configuration file] (../03Send-Data/Sources/03Use-JSON-to-Configure-Sources/Local-Configuration-File-Management/View-or-Download-Source-JSON-Configuration.md) for scripting or backup
* [Pause or resume a Source](pause-resume-source.md) (cloud polling Sources only)
* [Show or regenerate a Source URL] (../03Send-Data/Sources/02Sources-for-Hosted-Collectors/HTTP-Source/zGenerate-a-new-URL-for-an-HTTP-Source.md) (HTTP Sources only)
* [Show or regenerate a Source token] (../03Send-Data/Sources/02Sources-for-Hosted-Collectors/Cloud-Syslog-Source.md ) (cloud syslog Source only)
