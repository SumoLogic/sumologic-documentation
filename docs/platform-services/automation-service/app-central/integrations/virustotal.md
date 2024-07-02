---
title: VirusTotal
description: ''
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/virustotal.png')} alt="virustotal" width="100"/>

***Version: 1.13  
Updated: July 03, 2024***

Perform threat intelligence evidence gathering with VirusTotal.

## Actions

* **Add Comment** (*Notification*) - Add a new comment.
* **Check Scanned Status** (*Scheduled*) - Check the status of a file scan or URL scan.
* **Domain Reputation** (*Enrichment*) - Gather domain reputation information on a specific domain v2.
* **Download Report** (*Enrichment*) - Download a file of scan report.
* **File Reputation** (*Enrichment*) - Gather reputation information on a specific file.
* **Get Comment** (*Enrichment*) - Gather all comments.
* **Get Report** (*Enrichment*) - Gather a report on a specific file or URL
* **IP Reputation** (*Enrichment*) - Gather IP reputation information for a specific IP address.
* **Scan File** (*Enrichment*) - Gather information on a specific file.
* **Scan URL** (*Enrichment*) - Gather information on a specific URL.
* **URL Reputation** (*Enrichment*) - Gather reputation information for multiple URLs.

## Category

Threat Intelligence-Reputation

## Change Log

* July 17, 2019 - First upload
* April 10, 2020 - Actions updated:
    + IP and Domain Reputation: WHOIS information has been added to action's output
* December 21, 2020 - Updated descriptions
* June 3, 2021 - Action Updated:
    + IP Reputation: Detected URLs information has been added as output
* July 1, 2021 - New action added:
    + IP Reputation V3 - API v3
* June 14, 2022 - Updated action
    + File Reputation: now it's possible to select a FileHash artifact as an input for this action
* November 22, 2022
    + solved issue for which the integration test will throw an error if no value for timeout is provided
    + set the timeout field as not required
* March 20, 2023 (V1.6) - Updated Actions:
    + Merge IP Reputation V2 into IP Reputation V3 Action (IP Reputation V3 use API V3)
    + Merge URL Reputation V2 into URL Reputation Action
* June 27, 2023 (v1.7)
    + The name of **VirusTotal OIF** modified to **VirusTotal**
    + The visibility of the resource field changed
    + Two new actions added (**URL Scan V2** and **File Scan V2**)
    + Removed leading/trailing spaces
* July 25, 2023 (v1.8) - Updated Integration Resource Fields
* March 4, 2024 (v1.10) - Updated code for compatibility with Python 3.12
* April 4, 2024 (v1.11) New action added:
    + Search VirusTotal
* June 20, 2024 (v1.12)
    + Updated action Scan File V2: added checkbox field for handling files passed through `output.raw`
* July 03, 2024 (v1.13)
    + Added new action: 
        - **Check Scanned Status**
        - **Get Report**
