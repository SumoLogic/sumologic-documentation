---
title: ZeroFox
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/zerofox.png')} alt="axonius" width="100"/>

***Version: 1.1  
Updated: Jul 11, 2023***

Query data and utilize action in ZeroFox Platform.

## Actions

* **List Alerts** *(Enrichment)* - Returns alerts matching given/default filters and parameters.
* **Alerts ZeroFOX Daemon** *(Daemon)* - Daemon to fetch alerts.
* **Get Alert** *(Enrichment)* - Reads a specific alert.
* **Alert Review** *(Containment)* - Creates an alert review.
* **List Alert Reviews** *(Enrichment)* - Lists all of the alerts current reviews.
* **Get Alert Review** *(Enrichment)* - Reads a given review.
* **List Users** *(Enrichment)* - Lists current users assigned to the caller's enterprise.
* **Update ZeroFOX Alert** *(Containment)* - Takes an action on an alert.
* **Assign Alert To User** *(Enrichment)* - Assign alert to user.
* **Alert Tag Changeset** *(Containment)* - List of Alert Tags to add or remove to/from the Alert.

## Notes

* For action *List Alerts, * by default no filters are applied and results are sorted by timestamp, and *Alert Tag Changeset*.

## Configure ZeroFox in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **Host**. Enter your ZeroFox host address.

* **Token**. Enter your ZeroFox token.
* <IntegrationCertificate/>
* <IntegrationTimeout/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/zerofox-configuration.png')} style={{border:'1px solid gray'}} alt="ZeroFox configuration" width="400"/>

For information about ZeroFox, see [ZeroFox documentation](https://www.zerofox.com/resources/#).

## Change Log

* July 5, 2021 - First upload
* July 11, 2023 (v1.1) - Updated the integration with Environmental Variables
