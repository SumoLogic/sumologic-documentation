---
title: Joe Sandbox
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/joe-sandbox.png')} alt="joe-sandbox" width="100"/>

***Version: 1.5  
Updated: Mar 6, 2024***

Execute suspicious files and URLs for analysis during incident investigation using Joe Security Sandbox.

## Actions

* **Download Analysis Report** *(Enrichment)* - Download an analysis report.
* **Info Analysis** *(Enrichment)* - View analysis gathered for a specific piece of evidence.
* **List Analysis** *(Enrichment)* - List all available analysis documents.
* **List Systems** *(Enrichment)* - List all available systems.
* **Get Report** *(Enrichment)* - Get an analysis report.
* **Search Analysis** *(Enrichment)* - Search for a specific analysis document.
* **Submit URL** *(Enrichment)* - Submit a URL for analysis.
* **Submit File** *(Enrichment)* - Submit a file for analysis.
* **Check Submission Status** *(Scheduled)* - Check the status of URL/File Submission.

## External Libraries

* [Joe Sandbox](https://github.com/joesecurity/jbxapi/blob/master/LICENSE)

## Change Log
 
* September 25, 2019 - First upload
* January 25, 2023 - Added Connection Timeout field
* July 18, 2023 (v1.4) - Updated the integration with Environmental Variables
* March 6, 2024 (v1.5)
    * Added new action: Check Submission Status
    * Action renamed from Download Resource Analysis to Download Analysis Report
    * Action renamed from Print Report to Get Report
    * Updated with new Cloud SOAR API
