---
title: Fastah IP Geolocation
description: ''
tags: []
---

![](/img/platform-services/automation-service/app-central/logos/fastah-ip-geolocation.png)

Version: 1.1  
Updated: Jul 06, 2023

Fastah's IP Geolocation provides information in geo-targeting, displaying country, spam avoidance, analytics, time-zone related scheduling, and visualization.

**Actions:**

* IP Geolocation - Finds approximate location by IP

## Fastah IP Geolocation configuration

Sign in to Fastah API Developers Console with your email and password. Then go to Dashboard and under Subscriptions copy your primary key.

![](/img/platform-services/automation-service/app-central/integrations/fastah-ip-geolocation/fastah-ip-geolocation-1.png)

## Configure Fastah IP Geolocation in Automation Service and Cloud SOAR

To configure the integration, log into the application, expand the configuration menu in the top right corner by hovering over the gear icon and click Automation.

![](/img/platform-services/automation-service/app-central/integrations/fastah-ip-geolocation/fastah-ip-geolocation-2.png)

In the Automation section, on the left menu, click Integrations.

![](/img/platform-services/automation-service/app-central/integrations/fastah-ip-geolocation/fastah-ip-geolocation-3.png)

After the list of the integrations appears, search/look for the integration and click on the row.

The integration details will appear. Click on the "+" button to add new Resource.

![](/img/platform-services/automation-service/app-central/integrations/fastah-ip-geolocation/fastah-ip-geolocation-5.png)

Populate all the required fields (\*) and then click Save:

• Label: The name of the resource

• Host: https://ep.api.getfastah.com/whereis/v1/json

• Token: the primary key you have copied from Fastah API Developers Console.

![](/img/platform-services/automation-service/app-central/integrations/fastah-ip-geolocation/fastah-ip-geolocation-6.png)

To make sure the resource is working, hover over the resource and then click the pencil icon that appears on the right.

![](/img/platform-services/automation-service/app-central/integrations/fastah-ip-geolocation/fastah-ip-geolocation-7.png)

Click Test Saved Settings.

![](/img/platform-services/automation-service/app-central/integrations/fastah-ip-geolocation/fastah-ip-geolocation-8.png)

You should receive a successful notification in the bottom right corner.

![](/img/platform-services/automation-service/app-central/integrations/fastah-ip-geolocation/fastah-ip-geolocation-9.png)

## Change Log

* February 23, 2022 - First upload
* July 6, 2023 (v1.1) - Updated the integration with Environmental Variables
