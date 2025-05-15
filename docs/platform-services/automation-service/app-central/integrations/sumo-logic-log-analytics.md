---
title: Sumo Logic Log Analytics
description: ''
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/sumo-logic.png')} alt="sumo-logic-log-analytics" width="100"/>

***Version: 1.24  
Updated: Dec 12, 2024***

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

<IntegrationsAuth/>

    * **Label**. The name of the resource.
    * **Sumo Logic API URL**. URL to the API of the instance (for example, `https://api.sumologic.com`). Enter the [API endpoint URL](/docs/api/getting-started/#sumo-logic-endpoints-by-deployment-and-firewall-security) for your region.
    * **Access ID**. The access ID that you copied earlier.
    * **Access Key**. The access key that you copied earlier.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/sumo-logic-analytics-configuration.png')} style={{border:'1px solid gray'}} alt="Sailpoint configuration" width="400"/>

## Change Log

* April 6, 2021 - First upload
* May 3, 2022 - Update integration and add new daemon
* June 07, 2022 - Updated action:
    + Search Sumo Logic
* July 13, 2022 - Updated action:
    + Search Sumo Logic (updated output and Field Last Period values)
* November 10, 2022 (v1.4)
    + Updated action: Search Sumo Logic (Timezone issue fixed and added one more endpoint to get Aggregate/Records)
    + New Daemon: Records Sumo Logic Daemon
* March 22, 2023 (v1.5)
    + Updated integration: (Updated the integration Fields with Environmental Variables)
* June 28, 2023 (v1.6)
    + Visibility of the Resource fields changed
    + Updated Daemons:
        - Records Sumo Logic Daemon
        - Search Sumo Logic Daemon
* August 17, 2023 (v1.7)
    + Updated Action - Search Sumo Logic (Updated Timestamp)
* September 4, 2023 (v1.8) - Fixed a bug where if the timeout was not specified, an error would occur
* September 19, 2023 (v1.9 - v1.12) - Versioning
* September 21, 2023 (v1.13)
    + Integration has been renamed from "**Sumo Logic CIP**" to "**Sumo Logic**"
    + Added Dynamic Table View for **Search Sumo Logic** Action
    + New Actions:
        - Search Metrics
        - Search Output Mapping
        - Resolve Alert
* September 22, 2023 (v1.14) - Updated **Search Metrics** Action
* September 27, 2023 (v1.15) - Updated **Search Sumo Logic** Action (Added Limit Field)
* September 28, 2023 (v1.16) - Updated **Search Sumo Logic** Action (Updated the default value for the Limit Field)
* October 3, 2023 (v1.17) - Updated **Search Sumo Logic** Action
* October 19, 2023 (v1.18) - Updated **Search Sumo Logic** Action (Subquery can now be executed)
* October 31, 2023 (v1.19)
    + Following Actions Updated:
        - Aggregates Sumo Logic Daemon (formerly **Records Sumo Logic Daemon**)
            * **Records Sumo Logic Daemon** Action renamed to **Aggregates Sumo Logic Daemon**
            * Subqueries can now be managed
            * **Last Result DateTime** field now accepts values as DateTime or Timestamp
        - Search Metrics
            * Added a new field called **Quantization**
        - Search Sumo Logic Daemon
            * Subqueries can now be managed
            * The **Last Result Timestamp** field now accepts values as DateTime or Timestamp
* November 28, 2023 (v1.20)
    + Updated **Search Sumo Logic** Action (Added Table View as an output for use in notes/tasks)
* March 4, 2024 (v1.22) - Updated code for compatibility with Python 3.12
* April 5, 2024 (v1.23)
    + The integration formerly known as "Sumo Logic" has been renamed to "Sumo Logic Log Analytics"
    + Added a new field *API Rate Limit Sleep* to the Integration resource (If API rate limit exceeded, wait for 1 second and then attempt a retry, with a maximum wait time of 10)
    + Search Sumo Logic Action updated:
        - If the Aggregates field is selected, the action will fetch only aggregates. If the Aggregates field is not selected, it will fetch only messages.
        - Added a new field *Escape Backslashes* if selected it will Escape all Backslashes in Query
* December 12, 2024 (v1.24)
    + Updated Actions: (Fixed Authentication Issue)
      + **Search Sumo Logic** Action
      + **Search Sumo Logic Daemon** Action
      + **Aggregates Sumo Logic Daemon** Action
