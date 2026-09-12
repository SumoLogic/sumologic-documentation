---
title: Sumo Logic Log Analytics
description: ''
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/sumo-logic.png')} alt="Sumo Logic icon" width="100"/>

***Version: 1.25  
Updated: April 30, 2026***

Integration with Sumo Logic platform for logs, metrics, and monitors.

## Actions

* **Search Sumo Logic** (*Enrichment*) - Query data from Sumo Logic Log Analytics.
* **Search Sumo Logic Daemon** *(Daemon)* - Automatically search the Sumo Logic Log Analytics with given query.
* **Aggregates Sumo Logic Daemon** *(Daemon)* - Automatically pull Aggregates of Sumo Logic Log Analytics with given query.
* **Search Metrics** *(Enrichment)* - Query Metrics from Sumo Logic Log Analytics.
* **Search Output Mapping** *(Enrichment)* - Parsing the output of a **Search Sumo Logic** action.
* **Resolve Alert** *(Notification)* - Resolve Alert.

## Sumo Logic Log Analytics configuration

[Create an access key](/docs/manage/security/access-keys/#create-an-access-key) and copy the resulting **Access ID** and **Access Key**. Store the ID and access key (temporally) into a text editor.

:::note
The ID and key won't be available again once you close the confirmation screen.
:::

## Configure Sumo Logic Log Analytics in Automation Service and Cloud SOAR

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
* <SumoLogicAPIURL/>
* <AccessID/>
* <AccessKey/>
* **Timezone**. Select your timezone.

* **Daemon Query**. Enter the query to be executed in daemons.
* <IntegrationTimeout/>
* <IntegrationCertificate/>
* **API Rate Limit Sleep (s)**. Enter the API rate limit in seconds. If the API rate limit exceeded, wait for 1 second and then attempt a retry, with a maximum wait time of 10. More info at [Rate limiting](/docs/api/metrics/#rate-limiting).
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/sumo-logic-analytics-configuration.png')} style={{border:'1px solid gray'}} alt="Sailpoint configuration" width="400"/>

## Change Log

| Version | Date | Description |
|:--|:--|:--|
| v1.25 | April 30, 2026 | Upgraded the `python3_generic` Docker image (Python 3.8) to `python3_12_generic` (Python 3.12) to address Python 3.8 end-of-life and improve security and performance. |
| v1.24 | December 12, 2024 | Fixed an authentication issue in the **Search Sumo Logic**, **Search Sumo Logic Daemon**, and **Aggregates Sumo Logic Daemon** actions. |
| v1.23 | April 5, 2024 | <ul><li>Renamed the integration from "Sumo Logic" to "Sumo Logic Log Analytics."</li><li>Added a new field, API Rate Limit Sleep, to the Integration resource (if the API rate limit is exceeded, the integration waits for 1 second and then retries, with a maximum wait time of 10).</li><li>Updated the **Search Sumo Logic** action: if the Aggregates field is selected, the action fetches only aggregates; if not selected, it fetches only messages. Added a new field, Escape Backslashes, which when selected escapes all backslashes in the query.</li></ul> |
| v1.22 | March 4, 2024 | Updated code for compatibility with Python 3.12. |
| v1.20 | November 28, 2023 | Updated the **Search Sumo Logic** action, adding Table View as an output for use in notes and tasks. |
| v1.19 | October 31, 2023 | <ul><li>Renamed the **Records Sumo Logic Daemon** action to **Aggregates Sumo Logic Daemon**, added support for managing subqueries, and updated the Last Result DateTime field to accept values as DateTime or Timestamp.</li><li>Added a new field, **Quantization**, to the **Search Metrics** action.</li><li>Updated the **Search Sumo Logic Daemon** action to support managing subqueries, and updated the Last Result Timestamp field to accept values as DateTime or Timestamp.</li></ul> |
| v1.18 | October 19, 2023 | Updated the **Search Sumo Logic** action so subqueries can now be executed. |
| v1.17 | October 3, 2023 | Updated the **Search Sumo Logic** action. |
| v1.16 | September 28, 2023 | Updated the **Search Sumo Logic** action, updating the default value for the Limit field. |
| v1.15 | September 27, 2023 | Updated the **Search Sumo Logic** action, adding a Limit field. |
| v1.14 | September 22, 2023 | Updated the **Search Metrics** action. |
| v1.13 | September 21, 2023 | <ul><li>Renamed the integration from "Sumo Logic CIP" to "Sumo Logic."</li><li>Added a Dynamic Table View for the **Search Sumo Logic** action.</li><li>Added new actions: **Search Metrics**, **Search Output Mapping**, and **Resolve Alert**.</li></ul> |
| v1.9-v1.12 | September 19, 2023 | Updated versioning. |
| v1.8 | September 4, 2023 | Fixed a bug where an error would occur if the timeout was not specified. |
| v1.7 | August 17, 2023 | Updated the **Search Sumo Logic** action, updating the timestamp. |
| v1.6 | June 28, 2023 | <ul><li>Changed the visibility of the resource fields.</li><li>Updated the **Records Sumo Logic Daemon** and **Search Sumo Logic Daemon**.</li></ul> |
| v1.5 | March 22, 2023 | Updated the integration fields with environmental variables. |
| v1.4 | November 10, 2022 | <ul><li>Updated the **Search Sumo Logic** action, fixing a timezone issue and adding one more endpoint to get Aggregate/Records.</li><li>Added a new action: **Records Sumo Logic Daemon**.</li></ul> |
| | July 13, 2022 | Updated the **Search Sumo Logic** action, updating the output and Field Last Period values. |
| | June 07, 2022 | Updated the **Search Sumo Logic** action. |
| | May 3, 2022 | Updated the integration and added a new daemon. |
| | April 6, 2021 | Initial release of the Sumo Logic Log Analytics integration. |
