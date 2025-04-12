---
title: ThreatQ
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/threatq.png')} alt="threatq" width="70"/>

***Version: 1.1  
Updated: Jul 07, 2023***

The ThreatQ threat intelligence platform, automates the aggregation, operationalisation and use of threat intelligence across the entire security infrastructure, supporting multiple use cases, increasing security effectiveness, and accelerating security operations. Threat detection and response.

## Actions

* Threat Library Saved Search List (*Enrichment*) - Get a list of saved searches.
* Get ThreatQ Object (*Enrichment*) - Get ThreatQ single object (adversaries, events, indicators).
* Get Indicator Details (*Enrichment*) - Get an Indicator’s Details.
* Create Indicator (*Containment*) - Create a new Indicator.
* Create Event (*Containment*) - Create a new Event.
* Create Adversary (*Containment*) - Create a new Adversary.
* Get All Indicators (*Enrichment*) - Get a list of Indicators.
* Get All Events (*Enrichment*) - Get a list of Events.
* Get All Adversaries (*Enrichment*) - Get a list of Adversaries.
* Get Related ThreatQ Objects (*Enrichment*) - Get related objects of adversary, event or indicator.
* Search ThreatQ Object (*Enrichment*) - Search the Threat Library for objects (adversaries, events, indicators) using criteria and filters.
* Set Indicator Status (*Containment*) - Update the status of an indicator.
* List Of Indicator Statuses (*Enrichment*) - Get a list of Indicator Statuses.
* Add Attribute (*Containment*) - Add an attribute to an object (adversaries, events, indicators).

## ThreatQ configuration

1. Log in to the ThreatQ.
1. In the main page, click on the up-right corner in My Account. It opens a page where you can find your **API Credentials - Client ID**.

## Configure ThreatQ in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

1. Access integrations in the [Automation Service](/docs/platform-services/automation-service/automation-service-integrations/#view-integrations) or [Cloud SOAR](/docs/cloud-soar/automation).
1. After the list of the integrations appears search/look for the ThreatQ integration and click on the row. The integration details will appear. Click on the **"+"** button to add new Resource.
1. Populate all the required fields: <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/threatq/threatq-3.png')} style={{border:'1px solid gray'}} alt="threatq" width="400"/>
1. To make sure the resource is working, hover over the resource and then click edit (pencil icon) on the right of the row. Then click test saved settings. You should receive a successful notification in the bottom right corner.

## Change Log

* March 4, 2022 - First upload
* July 7, 2023 (v1.1) - Updated the integration with Environmental Variables
