---
title: Intsights TIP
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/intsights-tip.png')} alt="intsights-tip" width="100"/>

***Version: 1.1  
Updated: Jul 11, 2023***

Intsight Threat Intelligence Platform.

## Actions

* **Add IOC** (*Containment*) - Add iocs to existing file type source.
* **Alert Add Note** (*Containment*) - Add a note to the alert.
* **Close Alert** (*Containment*) - Close alert.
* **Get IOC** (*Enrichment*) - Get Ioc details by value.
* **Remove Source** (*Containment*) - Delete Iocs source (only documents are allowed).
* **Add Source** (*Containment*) - Add Iocs document source.
* **Alert Blocklist Status** (*Enrichment*) - Get alert's blocklist status.
* **Get Alert List Daemon** (*Daemon*) - Get list of alerts ids by query.
* **List Sources** (*Enrichment*) - Get ID, name and confidence level of each Ioc source, grouped by source type.

## Configure Intsights TIP in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

For information about Rapid7 Threat Command ([formerly Intsights TIP](https://www.msspalert.com/news/rapid7-acquires-intsights-cyber)), see [Rapid7 Threat Command documentation](https://docs.rapid7.com/).

## Change Log

* January 15, 2020 - First upload
* July 11, 2023 (v1.1) - Updated the integration with Environmental Variables
