---
title: CrowdStrike Falcon Sandbox
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/crowdstrike-falcon-sandbox.png')} alt="crowdstrike-falcon-sandbox" width="100"/>

***Version: 1.3  
Updated: Jul 14, 2023***

Malware Analysis Tool providing threat intelligence.

## Actions

* **Submit File** (*Enrichment*) - Submit a file for analysis.
* **Submit URL** (*Enrichment*) - Submit a website's URL or URL with a file for analysis.
* **Submission Status Polling** (*Enrichment*) - Return the state of submission, this action will polling until the File/URL analyzation are finished, Once this action completed, we will be able to Download Report or Get Summary of Submission.
* **Download Report** (*Enrichment*) - Download a report (Full CSOAR only).
* **Search Into Database** (*Enrichment*) - Search the database using the search terms like tag, host, domain, URL, filename; this similar to Advanced Search.
* **Get Submission Summary** (*Enrichment*) - Return summary of a submission.
* **Get Hash Summary** (*Enrichment*) - Summary for given hash.
* **Download Sample** (*Enrichment*) - Download sample file (Full CSOAR only).
* **List Feed** (*Enrichment*) - Access a JSON feed (summary information) of last 250 reports from 24h.
* **Get Hash Analysis Overview** (*Enrichment*) - Return overview for the hash  related information [report, parent, children, scanners].
* **List Environments** (*Enrichment*) - List system environments.

## Configure CrowdStrike Falcon Sandbox in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/crowdstrike/crowdstrike-falcon-sandbox-configuration.png')} style={{border:'1px solid gray'}} alt="CrowdStrike Falcon Sandbox configuration" width="400"/>

For information about CrowdStrike Falcon Sandbox, see [CrowdStrike documentation](https://www.crowdstrike.com/en-us/resources/guides/?lang=1).

## Change Log

* October 26, 2020 - First upload
* March 21, 2023 (v1.1) - Logo updated
* June 27, 2023 (v1.2) - Updated the integration with Environmental Variables
* July 14, 2023 (v1.3) - Changed fields visibility
