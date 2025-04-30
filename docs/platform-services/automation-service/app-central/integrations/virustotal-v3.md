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

## Configure VirusTotal V3 in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

## Change Log

* July 03, 2024
    + First upload
    + It is an updated version of VirusTotal which works with V3 API.
