---
title: Sumo Logic Notifications
description: ''
tags: []
---

![](/img/platform-services/automation-service/app-central/logos/sumo-logic-notifications.png)

Version: 1.1  
Updated: Oct 18, 2023

Integration with Sumo Logic platform for monitors and Slack Notification

## Actions

* **Assess Alert Status** (*Scheduled*) - Periodically monitor status of a Sumo Logic alert and notify a Slack user about unresolved alert

## Sumo Logic Notifications Configuration

1. To configure the Sumo Logic, log into the application, expand the user info from the bottom left menu and click Preferences. <br/>![](/img/platform-services/automation-service/app-central/integrations/sumo-logic-notifications/sumo-logic-notifications-1.png)

1. From the preferences screen, in the section My Access Keys, click on Add Access Key. <br/>![](/img/platform-services/automation-service/app-central/integrations/sumo-logic-notifications/sumo-logic-notifications-2.png)

1. Populate the name and click Create Key. <br/>![](/img/platform-services/automation-service/app-central/integrations/sumo-logic-notifications/sumo-logic-notifications-3.png)

1. Copy the Access ID and Access Key and store them (temporally) into a text editor.
   :::note
   They won't be available again once you close this screen.
   :::

1. Click Done after you copied the Access ID and Access Key. <br/>![](/img/platform-services/automation-service/app-central/integrations/sumo-logic-notifications/sumo-logic-notifications-4.png)

## Sumo Logic Notifications in Automation Service and Cloud SOAR

1. To configure the integration, log into the application, expand the configuration menu in the top right corner by hovering over the gear icon and click Automation. <br/>![](/img/platform-services/automation-service/app-central/integrations/sumo-logic-notifications/sumo-logic-notifications-5.png)

1. In the Automation section, on the left menu, click Integrations. <br/>![](/img/platform-services/automation-service/app-central/integrations/sumo-logic-notifications/sumo-logic-notifications-6.png)

1. After the list of the integrations appears, search/look for the integration and click on the row.

1. The integration details will appear. Click on the "+" button to add new Resource. <br/>![](/img/platform-services/automation-service/app-central/integrations/sumo-logic-notifications/sumo-logic-notifications-7.png)

1. Populate all the required fields (\*) and then click Save.
   * Label: The name of the resource.
   * Sumo Logic API URL: URL to the API of the instance (more info on the URL here: [https://help.sumologic.com/APIs](https://help.sumologic.com/APIs)).
   * Access ID: The access ID that you copied earlier.
   * Access Key: The access key that you copied earlier.
   * Slack Bot/User OAuth Token: To set up the Slack App, please refer to the documentation on configuring Slack integration within App Central. You'll require a Slack Bot/User OAuth Token. <br/>![](/img/platform-services/automation-service/app-central/integrations/sumo-logic-notifications/sumo-logic-notifications-8.png)

## Change Log

* September 22, 2023 - First upload
* October 18, 2023 (v1.1) - Updated **Assess Alert Status** Action (Updated the Scheduled input to be dynamically set)
