---
title: Qualys
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/qualys.png')} alt="qualys" width="100"/>

***Version: 1.4  
Updated: Sep 19, 2023***

Launch and manage scans and utilize Qualys scan data to enrich incident artifacts.

## Actions

* **List Scan** (*Enrichment*) - Generates a list of previously executed scans.
* **Launch VM Scan** (*Enrichment*) - Launch a new VM scan.
* **Get Scan Result** (*Enrichment*) - Gather results of an executed scan.
* **Add Asset** (*Enrichment*) - Add an asset.
* **List Asset Group** (*Enrichment*) - Generates a list of all asset groups.
* **List Asset** (*Enrichment*) - Generates a list of all available assets.
* **Get Scanner Details** (*Enrichment*) - Gather details of a specific scanner.
* **List Option Profiles** (*Enrichment*) - Generates a list of all available option profiles.
* **Add Asset Group** (*Enrichment*) - Add an asset group.
* **Launch VM Scan By Tag** (*Enrichment*) - Launch a VM scan.
* **Get Tags** (*Enrichment*) - Get all tags.
* **List Scanner Appliance** (*Enrichment*) - List information on a scanning appliance.
* **List Host Detection** (*Enrichment*) - Gathers QIDs for a host (used with *List Vulnerabilities, see note)*.
* **Assets View Search** (*Enrichment*) - Gathers QIDs for a particular asset (used with *List Vulnerabilities, see note)*.
* **List Vulnerabilities** (*Enrichment*) - Used with *List Host Detection* & *Assets View Search* to gather vulnerabilities of a particular asset (*see notes*).
* **Get Report Templates** (*Enrichment*) - Gathers all report template information.
* **Launch Scan Report** (*Enrichment*) - Launch a new scan report.
* **List Reports** (*Enrichment*) - List all reports.
* **Download Saved Report** (*Enrichment*) - Download a saved report.
* **List Scanned Hosts** (*Enrichment*) - List all scanned hosts.
* **Manage VM Scans** (*Containment*) - Manage existing VM scans.
* **Cancel Report** (*Containment*) - Cancel a report.
* **Delete Report** (*Containment*) - Delete a report.
* **Report Status Polling** (*Containment*) - Gather details about a report's progress.
* **Scan Status Polling** (*Containment*) - Gather details about a scan's status.
* **Tag Existence Polling** (*Containment*) - Tag an existing poll.

## External Libraries

* [xmltodict](https://github.com/martinblech/xmltodict/blob/master/LICENSE)

## Change Log

* February 21, 2020 - First upload
* September 2, 2020 - New actions added
* July 21, 2023 (v1.2) - Updated the integration with Environmental Variables
* September 4, 2023 (v1.3) - Fixed a bug where if the timeout was not specified, an error would occur
* September 19, 2023 (v1.4) - Versioning
