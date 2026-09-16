---
title: Basic Tools
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/basic-tools.png')} alt="Basic tools icon" width="100"/>

***Version: 1.12  
Updated: Jul 20, 2026***

Basic Tools implement some utils method to use inside Playbook

## Actions

* **Send Email** (*Notification*) - Send an email.
* **Payload Regex** (*Custom*) - use regular expressions to extract data from the payload.

## Configure Basic Tools in Automation Service and Cloud SOAR

No configuration is needed. Basic Tools executes without additional authentication.

## Change Log

| Version | Date | Description |
|:--|:--|:--|
| v1.12 | July 20, 2026 | Upgraded the `python3_generic` Docker image (Python 3.8) to `python3_12_generic` (Python 3.12) to address Python 3.8 end-of-life and improve security and performance. |
| v1.11 | April 17, 2024 | <ul><li>Added a new **Cc Recipients** field to the **Send Email** action.</li><li>Removed the **Plain Text Content** field from the **Send Email** action.</li></ul> |
| v1.5 | October 24, 2023 | Added a new action: **Payload Regex**. |
| v1.4 | September 21, 2023 | Initial release of the Basic Tools integration. |
