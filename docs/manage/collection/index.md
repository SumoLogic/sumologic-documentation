---
slug: /collection
---

# Collection

:::sumo Required Capabilities
You need the Manage or View Collectors [role capability](Users-and-Roles/Manage-Roles/05-Role-Capabilities.md "Role Capabilities") to manage or view Collection.
:::

Use the **Collection** page to manage all of your Collectors and Sources. To access the Collection page, go to **Manage Data \> Collection \> Collection**.

![Collection page June 2021.png](./static/img/./Collection%20page%20June%202021.png)

## Page Capabilities

* [Search for a Collector or Source](./01Search-for-a-Collector-or-Source.md "https://help.sumologic.com/Manage/Collectors_and_Sources/Manage_Collectors/Search_for_a_Collector_or_Source")
* View the [health of Collectors and Sources](Health_Events.md "Health Events").
* Open the [Setup Wizard](../03Send-Data/Setup-Wizard.md "https://help.sumologic.com/Send_Data/Setup_Wizard") to configure Collectors and Sources automatically
* [Upgrade Sources](../03Send-Data/Sources/02Sources-for-Hosted-Collectors/Cloud-to-Cloud_Integration_Framework/Cloud-to-Cloud_Source_Versions.md "Cloud-to-Cloud Source Versions") from the [Cloud-to-Cloud Integration Framework](../03Send-Data/Sources/02Sources-for-Hosted-Collectors/Cloud-to-Cloud_Integration_Framework.md "Cloud-to-Cloud Integration Framework")
* [Upgrade Collectors](./07Upgrade-Collectors-using-the-Web-Application.md "https://help.sumologic.com/Manage/Collectors_and_Sources/Manage_Collectors/Upgrade_Collectors_using_the_Web_Application")
* Add an [Installed Collector](../03Send-Data/Installed-Collectors.md "Installed Collectors") or a [Hosted Collector](../03Send-Data/Hosted-Collectors/Configure-a-Hosted-Collector.md "https://help.sumologic.com/Send_Data/Hosted_Collectors/Configure_a_Hosted_Collector")
* Use the **Show** options to filter the list
* Use the **Expand** options to show or hide information about the Sources
* Use the paging controls to navigate the list of Collectors

## Available Information about Collectors and Sources

* **Name**. Displays the name of the Collector, and any Sources that are configured under it. It also displays the type of Source (HTTP, Local File, Local Windows Event Log, etc.) 
  * **Open in Search**. Hover over the Name of the Collector or Source and click the Open in Search icon to start a search in the Search page.
  * **Tooltip**. Hover over a Collector or Source name to display an informational tool tip.
    
    The Collector's version is provided in the tooltip.        

    ![Collector version in tooltip.png](./static/img/./Collector%20version%20in%20tooltip.png)

* **Health**. Shows color-coded healthy, error, and warning states for Collectors and Sources so you can quickly determine the [health of your Collectors and Sources](Health_Events.md "Health Events").

  If an Installed Collector appears offline try [restarting the service](./02Start-or-Stop-a-Collector-using-Scripts.md "Start or Stop a Collector using Scripts") and [testing connectivity](../03Send-Data/Installed-Collectors/05Reference-Information-for-Collector-Installation/01Test-Connectivity-for-Sumo-Logic-Collectors.md "Test Connectivity for Sumo Logic Collectors").
* **Type**. Displays whether the Collector is an Installed or Hosted Collector.
* **Status**. Shows the status of Sources manually paused by users.
* **Source Category**. Displays the name of the configured Source Category for this Collector or Source.
* **Sources**. Displays the number of Sources configured under a Collector.
* **Last Hour**. Displays a graph of the total number of log messages ingested per minute over the past hour.
* **Messages**. Displays the total number of log messages ingested over the past hour.

## Collector Actions

* [Add a Source](../03Send-Data/Sources.md "https://help.sumologic.com/Send_Data/Sources")
* [Edit a Collector](./03Edit-a-Collector.md "https://help.sumologic.com/Manage/Collectors_and_Sources/Manage_Collectors/Edit_a_Collector")
* [Delete a Collector](./05Delete-a-Collector-from-the-Web-Application.md "https://help.sumologic.com/Manage/Collectors_and_Sources/02Delete_a_Collector_from_the_Web_Application")
* [Download a JSON configuration file](../03Send-Data/Sources/03Use-JSON-to-Configure-Sources/Local-Configuration-File-Management/View-or-Download-Source-JSON-Configuration.md "https://help.sumologic.com/Send_Data/Sources/03Use_JSON_to_Configure_Sources/Local_Configuration_File_Management/View_or_Download_Source_JSON_Configuration") for scripting or backup

## Source Actions

* [Edit the Source](./04Edit-a-Source.md "https://help.sumologic.com/Manage/Collectors_and_Sources/Manage_Sources/Edit_a_Source")
* [Delete a Source](./05Delete-a-Collector-from-the-Web-Application.md "https://help.sumologic.com/Manage/Collectors_and_Sources/02Delete_a_Collector_from_the_Web_Application")
* [Download a JSON configuration file](../03Send-Data/Sources/03Use-JSON-to-Configure-Sources/Local-Configuration-File-Management/View-or-Download-Source-JSON-Configuration.md "https://help.sumologic.com/Send_Data/Sources/03Use_JSON_to_Configure_Sources/Local_Configuration_File_Management/View_or_Download_Source_JSON_Configuration") for scripting or backup
* [Pause or resume a Source](./Pause-and-Resume-a-Source.md "Pause and Resume a Cloud Polling Source") (cloud polling Sources only)
* [Show or regenerate a Source URL](../03Send-Data/Sources/02Sources-for-Hosted-Collectors/HTTP-Source/zGenerate-a-new-URL-for-an-HTTP-Source.md "https://help.sumologic.com/Send_Data/Sources/02Sources_for_Hosted_Collectors/HTTP_Source/zGenerate_a_new_URL_for_an_HTTP_Source") (HTTP Sources only)
* [Show or regenerate a Source token](../03Send-Data/Sources/02Sources-for-Hosted-Collectors/Cloud-Syslog-Source.md "https://help.sumologic.com/Beta/Beta_-_Sources/Beta_-_Cloud_Syslog_Source#Configure_a_Cloud_Syslog_Source") (cloud syslog Source only)
