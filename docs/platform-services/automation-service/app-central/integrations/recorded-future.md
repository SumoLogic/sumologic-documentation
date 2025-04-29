---
title: Recorded Future
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/recorded-future.png')} alt="recorded-future" width="100"/>

Version: 1.11  
Updated: March 4, 2024

Utilize Recorded Future threat intelligence feeds during incident investigation.

## Actions

* **IP Reputation** (*Enrichment*) - Get the reputation for the specified IP address.
* **URL Reputation** (*Enrichment*) - Get the reputation for the specified URL.
* **Domain Reputation** (*Enrichment*) - Get the reputation for the specified domain.
* **File Reputation** (*Enrichment*) - Get the reputation for the specified file hash.
* **Vulnerability Search** (*Enrichment*) - Search threat intelligence for the specified search query.
* **Malware Search** (*Enrichment*) - Search threat intelligence for the specified search query.
* **Get Alert Details** *(Enrichment)* - Get the details for the specified alert.
* **Recorded Future Alerts Daemon** *(Daemon)* - Gather RF alerts.
* **Vulnerability Search Daemon** *(Daemon)* - Daemon to fetch vulnerabilities.
* **File Reputation V2** (*Enrichment)* - Get the reputation for the specified file hash v2.
* **Search Domain** (*Enrichment*) - Search Domains.
* **Search URL** *(Enrichment)* - Search URLs.
* **Search IP** (*Enrichment)* - Search IP Addresses.
* **Search Hash** (*Enrichment)* - Search Hashes.
* **Create List** (*Containment*) - Create List.
* **Search List** (*Enrichment*) - Find lists based on a query.
* **Add Entity** (*Containment*) - Add an entity to the list.
* **Remove Entity** (*Containment*) - Remove an entity from the list.
* **List Entities** (*Enrichment*) - Get entities on the list.
* **Credentials Search** (*Enrichment*) - Search Credential data.
* **Credentials Lookup By Email** (*Enrichment*) - Lookup Credential data by Email.
* **Credentials Lookup By Login** (*Enrichment*) - Lookup Credential data by Login.

## Configure Recorded Future in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

## Change Log

* September 16, 2019 - First upload
* February 19, 2021 - Updated actions:   
Get Alerts Details, Alerts Daemon, Vulnerability Search Daemon
* October 27, 2021 - New action added:   
File Reputation V2
* March 23, 2022 - New action added:   
Search Domain, Search URL, Search IP, Search Hash
* January 10, 2023 - Refactoring
* February 8, 2023 (v1.5) - Updated Actions (Changed the 'Fields' field as required field and improved error handling):
	+ File Reputation
	+ Domain Reputation
	+ URL Reputation
	+ IP Reputation
* June 22, 2023 (v1.6) - Removed unnecessary empty lines
* June 22, 2023 (v1.7) - Renamed integration from Recorded Future OIF to Recorded Future
* February 16, 2024 (v1.8)
    + Refactored Recorded Future Alerts Daemon
* February 23, 2024 (v1.9)
    + Refactored Vulnerability Search Daemon
* February 26, 2024 (v1.10)
    + Enabled Incident Artifacts feature flag for Get Alert Details action
* March 4, 2024 (v1.11) - Updated code for compatibility with Python 3.12
