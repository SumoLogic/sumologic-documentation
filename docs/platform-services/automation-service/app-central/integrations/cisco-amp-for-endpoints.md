---
title: Cisco AMP for Endpoints
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/cisco-amp-for-endpoints.png')} alt="cisco-amp-for-endpoints" width="70"/>

***Version: 1.2  
Updated: Jun 21, 2023***

Perform a wide variety of Enrichment and Containment actions for endpoint investigation and response with Cisco AMP for Endpoints.

## Actions

* **Get Computer** (*Enrichment*) - Get information about a specific endpoint.
* **Get Computers** (*Enrichment*) - Get a list of computers matching a query.
* **Get Computer Activity** (*Enrichment*) - Get the activity from a computer.
* **Get Computer Trajectory** (*Enrichment*) - Get the trajectory from a computer with an optional query.
* **Get Computer User Activity** (*Enrichment*) - Get the user activity from a computer.
* **Get Computer User Trajectory** (*Enrichment*) - Get the user trajectory from a computer with an optional query.
* **Get File List** (*Enrichment*) - Get the results of a file list.
* **Get File List Files** (*Enrichment*) - Get a list of files from the file list.
* **Get SHA256 From File List** (*Enrichment*) - Get a list of SHA256 values from the file list.
* **Get Group Info** (*Enrichment*) - Get group information.
* **Get Groups** (*Enrichment*) - Get a list of groups.
* **Get Policy** (*Enrichment*) - Get policy information.
* **Get Simple Custom Detection File Lists** (*Enrichment*) -
* **List Computers** (*Enrichment*) - List all computers.
* **List Event Types** (*Enrichment*) - Get a list of event types.
* **List Events** (*Enrichment*) -Get a list of events matching a query.
* **List Vulnerabilities** (*Enrichment*) - Get a list of all vulnerabilities.
* **List Application Blocking Lists** (*Enrichment*) - Get the application blocking file lists.
* **List Simple Custom Detections Lists** (*Enrichment*) - Get a file list from simple custom detection rules.
* **List Indicators** (*Enrichment*) - Get a list of all indicators.
* **List Policies** (*Enrichment*) - Get a list of policies.
* **Add SHA256 To File List** (*Containment*) - Add a SHA256 value to a file list.
* **Delete SHA256 From File List** (*Containment*) - Delete a SHA256 value from a file list.
* **Delete Computer** (*Containment*) - Delete a specific computer.
* **Isolate Computer** (*Containment*) - Isolate a specific computer.
* **Remove Isolation** (*Containment*) - Remove a specific computer from isolation.

## Configure Cisco AMP for Endpoints in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **URL**. Select your Cisco AMP API URL, for example, `https://api.amp.cisco.com`.

* **Client ID**. Enter your Cisco AMP [client ID](https://developer.cisco.com/docs/secure-endpoint/overview/).

* **API Key**. Enter the API key associated with the client ID.
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/cisco/cisco-amp-for-endpoints-configuration.png')} style={{border:'1px solid gray'}} alt="Cisco AMP for Endpoints configuration" width="400"/>

For information about Cisco Secure Endpoint (formerly AMP for Endpoints), see [Secure Endpoint documentation](https://console.amp.cisco.com/docs).

## Change Log

* January 29, 2019 - First upload
* May 22, 2020 - Added additional actions
* June 21, 2023 (v1.2) - Updated the integration with Environmental Variables
