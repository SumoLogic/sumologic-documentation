---
title: Phantombuster
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/phantombuster.png')} alt="phantombuster" width="100"/>

***Version: 1.5  
Updated: Jul 18, 2023***

Phantombuster is a platform that enables businesses to automate their web tasks without the need for extensive coding. It provides a range of pre-built automation workflows and customizable APIs, allowing users to scrape data, automate social media tasks, and send personalized emails to prospects. Phantombuster helps businesses save time and improve their productivity by streamlining their workflows.

## Actions

* **Get Agent** *(Enrichment)* - Gets an agent by ID.
* **List Agents** *(Enrichment)* - Gets all agents of the current user's organization.
* **Get Agent Output** *(Enrichment)* - Gets the output of the most recent container of an agent. This API endpoint is specifically designed so that it’s easy to get incremental data from an agent.
* **Launch Agent** *(Containment)* - Adds an agent to the launch queue.
* **Stop Agent** *(Containment)* - Stops an agent.
* **Delete Agent** *(Containment)* - Deletes an agent by ID.

## Phantombuster configuration

Follow the steps from the Phantombuster [guide](https://hub.phantombuster.com/docs/api#authentication-and-request-format) to create your authentication credentials.

## Configure Phantombuster in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

   * **Label**. The name for the resource.
   * **URL**. Phantombuster host URL.
   * **API Key**. Your Phantombuster api key. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/phantom-buster-configuration.png')} style={{border:'1px solid gray'}} alt="Phantombuster configuration" width="400"/>

For information about Phantombuster, see [Phantombuster documentation](https://hub.phantombuster.com/docs/developer-quick-start).

## Change Log

* April 3, 2023 - First upload
* July 18, 2023 (v1.5) - Removed leading/trailing spaces
