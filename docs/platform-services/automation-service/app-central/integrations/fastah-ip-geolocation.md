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

Sign in to [Fastah API Developer Console](https://docs.getfastah.com/docs/using-the-developer-portal) with your email and password. Then go to Dashboard and under Subscriptions copy your primary key.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/fastah-ip-geolocation/fastah-ip-geolocation-1.png')} style={{border:'1px solid gray'}} alt="fastah-ip-geolocation" width="800"/>

## Configure Fastah IP Geolocation in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

   * **Label**. The name of the resource.
   * **Host**. `https://ep.api.getfastah.com/whereis/v1/json`.
   * **Token**. The primary key you have copied from Fastah API Developers Console. 

For information about Fastah IP Geolocation, see [Fastah IP Geolocation documentation](https://docs.getfastah.com/docs/quick-start).

## Change Log

* February 23, 2022 - First upload
* July 6, 2023 (v1.1) - Updated the integration with Environmental Variables
