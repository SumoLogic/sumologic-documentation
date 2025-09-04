---
title: Basic Tools
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/basic-tools.png')} alt="basic-tools" width="100"/>

***Version: 1.11  
Updated: Apr 17, 2024***

Basic Tools implement some utils method to use inside Playbook

## Actions

* **Send Email** (*Notification*) - Send an email.
* **Payload Regex** (*Custom*) - use regular expressions to extract data from the payload.

## Configure Basic Tools in Automation Service and Cloud SOAR

No configuration is needed. Basic Tools executes without additional authentication.

## Change Log

* September 21, 2023 - First upload
* October 24, 2023 (v1.5)
    + Added new action: Payload Regex
* April 17, 2024 (v1.11)
    + Added new Field *Cc Recipients* to Send Email Action 
    + Removed the *Plain Text Content* Field from Send Email Action
