---
title: Fastah IP Geolocation
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/fastah-ip-geolocation.png')} alt="fastah-ip-geolocation" width="100"/>

***Version: 1.1  
Updated: Jul 06, 2023***

Fastah's IP Geolocation provides information in geo-targeting, displaying country, spam avoidance, analytics, time-zone related scheduling, and visualization.

**Actions:**

* IP Geolocation - Finds approximate location by IP.

## Fastah IP Geolocation configuration

Sign in to Fastah API Developers Console with your email and password. Then go to Dashboard and under Subscriptions copy your primary key.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/fastah-ip-geolocation/fastah-ip-geolocation-1.png')} style={{border:'1px solid gray'}} alt="fastah-ip-geolocation" width="800"/>

## Configure Fastah IP Geolocation in Automation Service and Cloud SOAR

1. Access integrations in the [Automation Service](/docs/platform-services/automation-service/automation-service-integrations/#view-integrations) or [Cloud SOAR](/docs/cloud-soar/automation).
1. After the list of the integrations appears, search/look for the integration and click on the row.
1. The integration details will appear. Click on the **"+"** button to add new Resource. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/fastah-ip-geolocation/fastah-ip-geolocation-5.png')} style={{border:'1px solid gray'}} alt="fastah-ip-geolocation" width="400"/>
1. Populate all the required fields (\*) and then click **Save**:
   * **Label**. The name of the resource.
   * **Host**. `https://ep.api.getfastah.com/whereis/v1/json`.
   * **Token**. The primary key you have copied from Fastah API Developers Console. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/fastah-ip-geolocation/fastah-ip-geolocation-6.png')} style={{border:'1px solid gray'}} alt="fastah-ip-geolocation" width="400"/>
1. To make sure the resource is working, hover over the resource and then click the pencil icon that appears on the right.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/fastah-ip-geolocation/fastah-ip-geolocation-7.png')} style={{border:'1px solid gray'}} alt="fastah-ip-geolocation" width="400"/>
1. Click **TEST SAVED SETTINGS**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/fastah-ip-geolocation/fastah-ip-geolocation-8.png')} style={{border:'1px solid gray'}} alt="fastah-ip-geolocation" width="400"/>
1. You should receive a successful notification in the bottom right corner.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/fastah-ip-geolocation/fastah-ip-geolocation-9.png')} style={{border:'1px solid gray'}} alt="fastah-ip-geolocation" width="400"/>

## Change Log

* February 23, 2022 - First upload
* July 6, 2023 (v1.1) - Updated the integration with Environmental Variables
