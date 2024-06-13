---
title: Mail Tools
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/mail-tools.png')} alt="mail-tools" width="100"/>

***Version: 1.5  
Updated: February 23, 2024***

:::sumo Cloud SOAR
This integration is only for Cloud SOAR.
:::

Set of scripts for Emails to perform actions within Cloud SOAR. You can add emails to an incident or triage, save the email attachments in the incident and use the regex actions to extract the desired information.

## Actions

* **Analyze MSG EML** *(Enrichment)* - This action extracts a series of IOCs from the email and its EML/MSG Attachments.
* **Add Email To Incident** (*Custom*) - Add email to incident using an Email ID.
* **Add Email Attachments To Incident** (*Custom*) - Add email attachments to Incident Attachments/Object using an Email ID.
* **Add Email To Triage** (*Custom*) - Add email to triage using an Email ID.
* **List Incident Emails** (*Enrichment*) - List already added/linked email to Incident.
* **Email Body Regex** (*Enrichment*) - Uses Regex with email body and fetch the desired information/string or list from the body.
* **Email Header Regex** (*Enrichment*) - Uses Regex with email header and fetch the desired information/string or list from the header.
* **Email Subject Regex** (*Enrichment*) - Uses Regex with email subject and fetch the desired information/string or list from the header.
* **Get Email from Cloud SOAR** (*Enrichment*) - Fetch email.
* **List Email Attachments** (*Enrichment*) - List email attachments.
* **Remove Email From Incident** (*Custom*) - Remove email from Incident.
* **List Cloud SOAR Emails** (*Enrichment*) - List all the Emails its alternative of Data sources E-mail section.
* **Discard Email** (*Custom*) - Discard email.

## External Libraries

* [MSG Parser](https://github.com/vikramarsid/msg_parser/blob/master/LICENSE)


## Change Log

* February 3, 2022 - First upload
* January 17, 2023 - Action Email Header Regex added. Integration refactored
* July 18, 2023 (v1.3) - Removed leading/trailing spaces
* October 2, 2023 (v1.4) - Integration Updated
* February 23, 2024 (v1.5)
    + Analyze MSG EML: Updated with new Cloud SOAR API