---
title: Sumo Logic CSE
description: ''
tags: [ ]
---

![](/img/platform-services/automation-service/app-central/logos/sumo-logic-cse.png)

Version: 1.10  
Updated: Feb 7, 2024

Utilize CSE entities to correlate Signals and Insights through Sumo Logic CSE integration.

## Actions

* **Add Comment To Insight** *(Notification)* - Add a comment to an existing Insight
* **Add Enrichment Entity** *(Notification)* - Add enrichments to Entity
* **Add Enrichment Insight** *(Notification)* - Add enrichments to Insights
* **Add Enrichment Signal** *(Notification)* - Add enrichments to Signal
* **Add Network Block** *(Containment)* - Add an address into the Network Blocks
* **Add Tag To Insight** *(Notification)* - Add tags to the Insight
* **Assign User To Insight** *(Notification)* - Add specific user to an Insight
* **Check Insight Status Schedule** *(Scheduled)* - Schedule action that periodically checks if the Insight is closed
* **Close Insight Trigger** *(Trigger)* - Trigger action that is executed whenever an Incident is closed
* **Create Insight From Signals** *(Notification)* - Create Insight From Signal IDs
* **Get Entity** *(Enrichment)* - Get Entity details
* **Get Insight** *(Enrichment)* - Get Insight details
* **Get Insight Comments** *(Enrichment)* - Get comments for an Insight
* **Get Insight V2** *(Enrichment)* - Get Insight details v2
* **Get Signal** *(Enrichment)* - Get Signal details
* **List Entities** *(Enrichment)* - List Entities
* **List Indicators** *(Enrichment)* - List all Indicators
* **List Insights** *(Enrichment)* - List all Insights
* **List Network Block** *(Enrichment)* - List all Blocked Networks
* **List Signals** *(Enrichment)* - List all Signals
* **List Users** *(Enrichment)* - Get a list of users
* **Sumo Logic Insights Daemon** *(Daemon)* - Daemon to retrieve the latest Insights
* **Sumo Logic Insights Daemon Extended** *(Daemon)* - Daemon to retrieve the latest Insights, extended version
* **Sumo Logic Signals Daemon** *(Daemon)* - Daemon to retrieve the latest Signals
* **Update Insight** *(Notification)* - Update the insight Assignee, Status, Severity, and Tags
* **Update Insight Status** *(Enrichment)* - Update the insight status
* **Update Insight Tag Trigger** *(Trigger)* - Trigger action that is executed whenever an Incident is edited

## Sumo Logic CSE Configuration

1. To configure the Sumo Logic CSE, log into the application, expand the user info from the bottom left menu and click Preferences. <br/>![](/img/platform-services/automation-service/app-central/integrations/sumo-logic-cse/sumo-logic-cse-1.png)

1. From the preferences screen, in the section My Access Keys, click on Add Access Key. <br/>![](/img/platform-services/automation-service/app-central/integrations/sumo-logic-cse/sumo-logic-cse-2.png)

1. Populate the name and click Create Key. <br/>![](/img/platform-services/automation-service/app-central/integrations/sumo-logic-cse/sumo-logic-cse-3.png)

1. Copy the Access ID and Access Key and store them (temporally) into a text editor.

1. Click Done after you copied the Access ID and Access Key. <br/>![](/img/platform-services/automation-service/app-central/integrations/sumo-logic-cse/sumo-logic-cse-4.png)

## Sumo Logic CSE in Automation Service and Cloud SOAR

1. To configure the integration, log into the application, expand the configuration menu in the top right corner by hovering over the gear icon and click Automation. <br/>![](/img/platform-services/automation-service/app-central/integrations/sumo-logic-cse/sumo-logic-cse-5.png)

1. In the Automation section, on the left menu, click Integrations. <br/>![](/img/platform-services/automation-service/app-central/integrations/sumo-logic-cse/sumo-logic-cse-6.png)

1. After the list of the integrations appears, search/look for the integration and click on the row.

1. The integration details will appear. Click on the "+" button to add new Resource. <br/>![](/img/platform-services/automation-service/app-central/integrations/sumo-logic-cse/sumo-logic-cse-7.png)

1. Populate the resource fields as indicated.
    * Label: The name of the resource
    * Sumo Logic API URL: URL to the API of the CSE instance `https://api.sumologic.com`
    * Sumo Logic CSE URL: URL to the CSE instance `https://service.sumologic.com/sec`
    * Access ID: The access ID that you copied earlier
    * Access Key: The access key that you copied earlier

1. To make sure the resource is working, hover over the resource and then click the pencil icon that appears on the right. <br/>![](/img/platform-services/automation-service/app-central/integrations/sumo-logic-cse/sumo-logic-cse-8.png)

1. Click Test Saved Settings. <br/>![](/img/platform-services/automation-service/app-central/integrations/sumo-logic-cse/sumo-logic-cse-9.png)

1. You should receive a successful notification in the bottom right corner. <br/>![](/img/platform-services/automation-service/app-central/integrations/sumo-logic-cse/sumo-logic-cse-10.png)

For detailed API documentation visit [https://help.sumologic.com/APIs](https://help.sumologic.com/APIs)

## Category

SIEM

## Change Log

* March 26, 2021 - First Upload
* April 6, 2021 - New actions uploaded
* October 1, 2021 - New actions uploaded
* October 18, 2021 - New actions uploaded
* October 27, 2021 - New actions uploaded
* March 17, 2022 - New action: Update Insight
* February 17, 2023 (v1.3)
    * Updated Daemon: Sumo Logic Insights Daemon Extended
* September 19, 2023 (v1.4) - Updated the integration with Environmental Variables
* September 26, 2023 (v1.5) - Updated Daemon: **Sumo Logic Signals Daemon**
* October 3, 2023 (v1.6) - Updated Daemon: **Sumo Logic Insights Daemon Extended**
* October 4, 2023 (v1.7) - Updated Daemon: **Sumo Logic Insights Daemon**
* November 24, 2023 (v1.8)
    * Updated Sumo Logic Insights Daemon Extended and Sumo Logic Insights Daemon (Updated the query, now it only retrieves data from the past 1 hour instead of 24 hours)
    * Expanded output mappings for the following Actions/Daemons
        - Get Signal
        - Get Insight V2
        - Sumo Logic Signals Daemon
        - Sumo Logic Insights Daemon
        - Sumo Logic Insights Daemon Extended
* December 12, 2023 (v1.9)
    * Added new Action - *Create Insight From Signals*
    * Updated *Add Enrichment Insight*, *Add Enrichment Entity*, and *Add Enrichment Signal* actions based on the following points:
        - Now text information can be included as enrichment
        - Updated the enrichment field to accept either the output.raw or any other JSON format
        - Added additional fields: reputation, expiresAt and externalUrl
        - Updated the field *Fields Name/Path To Extract* to enable the extraction of field values from the JSON by using either the Path or Field Name
* February 7, 2024 (v.10)
    * Fixed issue in the "Add Comment To Insight" action where line breaks in the "Insight Comment" field were removed upon submission
