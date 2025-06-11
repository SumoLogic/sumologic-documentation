---
title: VirusTotal V3
description: ''
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/virustotal.png')} alt="virustotal"
width="100"/>

***Version: 1.0
Updated: July 03, 2024***

Perform threat intelligence evidence gathering with [VirusTotal V3 API](https://docs.virustotal.com/reference/overview).

## Actions

* **Add Comment** (*Notification*) - Add a new comment.
* **Add Vote to Comment** (*Notification*) - Add a vote to a comment.
* **Check Scanned Status** (*Scheduled*) - Check the status of a Scan File and Scan URL.
* **Domain Reputation** (*Enrichment*) - Gather domain reputation information on a specific domain.
* **Download Report** (*Enrichment*) - Download a file of scanned report.
* **File Reputation** (*Enrichment*) - Gather reputation information on a specific file.
* **Get Comment** (*Enrichment*) - Gather all comments.
* **Get Report** (*Enrichment*) - Gather a report on a specific File or URL.
* **IP Reputation** (*Enrichment*) - Gather IP reputation information for multiple IP addresses.
* **Scan File** (*Enrichment*) - Scan the specific file.
* **Scan URL** (*Enrichment*) - Scan on a specific URL.
* **Search VirusTotal** (*Enrichment*) - Search for File Hash, URL, Domain, IP address and comments by tags.
* **URL Reputation** (*Enrichment*) - Gather reputation information for multiple URLs.

## Category

Threat Intelligence-Reputation

## Configure VirusTotal v3 in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';
import SumoLogicAPIURL from '../../../../reuse/automation-service/sumo-logic-api-url.md';
import CloudSOARAPIURL from '../../../../reuse/automation-service/cloud-soar-api-url.md';
import AccessID from '../../../../reuse/automation-service/access-id.md';
import AccessKey from '../../../../reuse/automation-service/access-key.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **API URL**. Enter your VirusTotal API URL, for example, `https://www.virustotal.com/`.

* **API Key**. Enter your [VirusTotal API key](https://docs.virustotal.com/docs/please-give-me-an-api-key).
* <CloudSOARAPIURL/>
* <AccessID/>
* <AccessKey/>
* <IntegrationTimeout/>
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/virustotal-v3-configuration.png')} style={{border:'1px solid gray'}} alt="VirusTotal v3 configuration" width="400"/>

For information about VirusTotal v3, see [VirusTotal v3 documentation](https://docs.virustotal.com/reference/overview).

## Change Log

* July 03, 2024
    + First upload
    + It is an updated version of VirusTotal which works with V3 API.
