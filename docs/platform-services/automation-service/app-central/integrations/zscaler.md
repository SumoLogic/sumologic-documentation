---
title: Zscaler
description: ''
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/zscaler.png')} alt="axonius" width="80"/>

**Version: 1.6  
Updated: Mar 20, 2024**

Zscaler Internet Access is a cloud native [security service edge (SSE)](https://www.zscaler.com/solutions/zscaler-security-service-edge) solution that builds on a [decade of secure web gateway leadership](https://www.zscaler.com/gartner-magic-quadrant-secure-web-gateways-2020). Offered as a scalable SaaS platform from the world’s largest security cloud, it replaces legacy network security solutions to stop advanced attacks and prevent data loss with a comprehensive zero trust approach.

## Actions

* **Add Url To Blacklist** (*Containment*) - Blocklist a URL.
* **Add Url To Category** (*Containment*) - Add a URL to category.
* **Add Url To Whitelist** (*Containment*) - Add a URL to whitelist.
* **Get Blacklist** (*Enrichment*) - Retrieve addresses blacklist.
* **Get Categories** (*Enrichment*) - Retrieve categories.
* **Get Sandbox Report** (*Enrichment*) - Obtain a sandbox report.
* **Get Whitelist** (*Enrichment*) - Retrieve addresses whitelist.
* **Remove Url From Blacklist** (*Containment*) - Remove a URL from blacklist.
* **Remove Url From Category** (*Containment*) - Remove a URL from category.
* **Remove Url From Whitelist** (*Containment*) - Remove a URL from whitelist.
* **Url Lookup** (*Enrichment*) - Lookup of a URL.

**Zscaler Sumo Logic Integration**

[Modern Security Ops with Zscaler and Sumo Logic](https://www.youtube.com/watch?v=ZAReRGjdUns).

## Category

Security gateway

## Configure Zscaler in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

For information about Zscaler, see [Zscaler documentation](https://help.zscaler.com/zia).

## Change Log

* October 16, 2019 - First upload
* July 18, 2022
    + Base URL in the connector is now visible as plain text
    + New logo
    + Added missing incident Artifacts
* June 15, 2023 (v1.2) - Updated the integration with Environmental Variables
* February 20, 2024 (v1.3) - Fixed an issue that prevented some actions from being executed
* March 20, 2024 (v1.6) - Added new field in "Add URL To Category" and "Remove URL From Category" actions to use with custom URL categories
