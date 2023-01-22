---
id: cyberark-source
title: CyberArk EPM
sidebar_label: CyberArk EPM
description: This integration accesses CyberArk EPMs API to retrieve administrative audit events from every Set in the environment.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

CyberArk Endpoint Privilege Manager (EPM) enforces least privilege and allows organizations to block and contain attacks at the endpoint, reducing the risk of information being stolen or encrypted and held for ransom. A combination of privilege security, application control, and credential theft prevention reduces the risk of malware infection.

This integration accesses the CyberArk EPM API to retrieve administrative audit events from every Set in the environment. API documents can be found
[here](https://docs.cyberark.com/Product-Doc/OnlineHelp/EPM/Latest/en/Content/LandingPages/LPDeveloper.htm).

## Data Sources

The CyberArk EPM Source consumes Sets and admin audit events.

* **Sets** are logical groupings of systems grouped around a single parameter such as OS Type or Location.
* **Admin Audit Events** are events created by performing actions using the EPM console, after login in, either directed or remotely by API.

## Create a CyberArk EPM Source​
When you create a CyberArk EPM Source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector.md).

**To configure a CyberArk EPM Source**

1. In Sumo Logic, select **Manage Data > Collection > Collection**.
1. On the **Collectors** page, click **Add Source** next to a Hosted Collector.
1. Select **CyberArk EPM**. <br/><img src={useBaseUrl('img/send-data/cyberark-source.png')} alt="cyberark-source.png" width="450"/>
1. **Name**. Enter a Name to display for the Source in the Sumo Logic web application.
1. **Description**. (Optional)
1. **Source Category**. Enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. **Forward to SIEM**. Check the checkbox to forward your data to Cloud SIEM Enterprise. When configured with the Forward to SIEM option the following metadata fields are set:
   * `_siemVendor`—Cyber-Ark
   * `_siemProduct`—EPM
   * `_siemFormat`—JSON
   * `_parser`—/Parsers/System/Cyber-Ark/CyberArk EPM JSON
1. Fields. (Optional) Click **+Add** to ad additional fields; each field needs a name (key) and value.
   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists and is enabled in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist, or is disabled, in the Fields table schema. In this case, an option to automatically add or enable the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo that does not exist in the Fields schema or is disabled it is ignored, known as dropped.
1. **EPM Username**. Enter your EPM username.
1. **EPM User Password**. Enter your EPM password.
1. **CyberArk EPM Dispatch Server**. Enter your CyberArk EPM Dispatch Server URL. For example, `https://login.cyberark.com`.
  :::note
  This is not your instance URL.
  :::
1. **Application ID**. Used to identify what's accessing the API. For example, *sumologic*.
1. **Rate Limit C2C**. The EPM Dispatch Server limits requests to 3 request per 5 minutes. The Sumo Logic connector will adhere to that limit when this box is checked. If the box is unchecked, the connector won't limit the number of requests, but unless you ask CyberArk Support to change the Dispatch Server rate limit, requests will be rate-limited on the EPM side.
1. **Polling Interval**. This field is pre-filled with 600.

## API Limitations

### Session Timeout

The session timeout for all APIs is part of the session token and is defined by the Timeout for inactive session Server Configuration parameter.
