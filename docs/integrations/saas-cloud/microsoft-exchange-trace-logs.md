---
id: microsoft-exchange-trace-logs
title: Microsoft Exchange Trace Logs
sidebar_label: Microsoft Exchange Trace Logs
description: This Sumo Logic App for Microsoft Exchange Trace logs provides visibility into Delivered, Failed, Quarantined, Pending, and Spam messages.
---

import useBaseUrl from '@docusaurus/useBaseUrl';


The Microsoft Exchange Trace Logs App provides a comprehensive view of email flow within your Exchange environment, offering deep insights into message transmission, delivery, and security posture. It helps administrators analyze trends, identify anomalies, and monitor communication efficiency. With built-in dashboards for both operational performance and security, the app centralizes trace log data for simplified monitoring and decision-making. This solution enhances visibility and supports proactive management of mail traffic and threats.

## Log types

This app uses [Message Trace](https://learn.microsoft.com/en-us/graph/api/messagetracingroot-list-messagetraces?view=graph-rest-1.0&tabs=http) logs collected via the Microsoft Graph API. For details about the available fields, see the [Message Trace properties](https://learn.microsoft.com/en-us/graph/api/resources/exchangemessagetrace?view=graph-rest-1.0#properties) documentation.

### Sample log message

```json
{
  "id": "eae9f88e-4c85-4eaa-abd9-08de67858004",
  "messageId": "<80b868fd-fdf9-4a0c-9612-ccfd8fdc870b@az.westus2.microsoft.com>",
  "status": "delivered",
  "receivedDateTime": "2026-02-09T02:47:00.929Z",
  "recipientAddress": "ryaduvanshi.ctr@itsumologic.onmicrosoft.com",
  "senderAddress": "microsoft-noreply@microsoft.com",
  "subject": "View your Office 365 E3 Developer invoice",
  "size": 628118,
  "fromIP": "2a01:111:f403:c007::2",
  "toIP": ""
}
```

### Sample query

```sumo title="Delivered Messages"
_sourceCategory={{Logsdatasource}} id senderAddress recipientAddress delivered
| json "id","fromIP","toIP","status","senderAddress","recipientAddress" as id,from_ip,top_ip,status,sender_address,recipient_address nodrop

| where status = "delivered"

// Global filter
| lookup  country_name from geo://location on ip = from_ip
| country_name as source
| lookup  country_name from geo://location on ip = top_ip
| country_name as destination_country
| if(isBlank(destination_country),"Exchange Online",destination_country) as destination
| where if("{{source}}" ="*",true,source matches "{{source}}")
| where if("{{destination}}"="*",true,destination matches "{{destination}}")
| where if("{{sender_address}}"="*",true,sender_address matches "{{sender_address}}")
| where if("{{recipient_address}}"="*",true,recipient_address matches "{{recipient_address}}")

// Panel specific
| count by id,sender_address,recipient_address,_messagetime
| count
```
## Collection configuration and app installation

import CollectionConfiguration from '../../reuse/apps/collection-configuration.md';

<CollectionConfiguration/>

:::important
Use the [Cloud-to-Cloud Integration for Microsoft Exchange Trace Logs](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/microsoft-exchange-trace-logs) (use 2.0.x version of source) to create the source and use the same source category while installing the app. By following these steps, you can ensure that your Microsoft Exchange Trace Logs app is properly integrated and configured to collect and analyze your Microsoft Exchange Trace Logs data.
:::

### Create a new collector and install the app

import AppCollectionOPtion1 from '../../reuse/apps/app-collection-option-1.md';

<AppCollectionOPtion1/>

### Use an existing collector and install the app

import AppCollectionOPtion2 from '../../reuse/apps/app-collection-option-2.md';

<AppCollectionOPtion2/>

### Use an existing source and install the app

import AppCollectionOPtion3 from '../../reuse/apps/app-collection-option-3.md';

<AppCollectionOPtion3/>

## Viewing Microsoft Exchange Trace Logs dashboards

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

<ViewDashboards/>

:::note
If you are using version 1.0.x of the [Microsoft Exchange Trace Logs C2C source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/microsoft-exchange-trace-logs), the legacy **Microsoft Exchange Trace Logs - Overview** and **Microsoft Exchange Trace Logs - Message Monitoring** dashboards are available to visualize your data. We recommend upgrading to the latest version of the C2C source and app for improved functionality and support.
:::

### Overview

The **Microsoft Exchange Trace Logs Overview** dashboard provides a comprehensive view of email flow and performance across your Exchange environment. It highlights key metrics such as message volumes, delivery success and failure rates, and total data transmitted. The dashboard also offers insights into top senders and recipients, geo-location patterns, and inbound or outbound domain activity. Additionally, it includes trend analyses and detailed message-level information to help identify anomalies, monitor high-volume transmissions, and ensure smooth mail operations.<br/><img src={useBaseUrl('img/integrations/saas-cloud/Microsoft-Exchange-Trace-Logs-Overview.png')} alt="Microsoft Exchange Trace Logs - Overview" width="900"/>

### Security Overview

The **Microsoft Exchange Trace Logs - Security Overview** dashboard offers a focused view of email security metrics within your Exchange environment. It monitors quarantined and spam messages, delivery failure trends, and the geographic origins of emails from embargoed regions. The dashboard integrates threat intelligence to analyze sender and recipient addresses, highlighting potential risks. It also showcases top senders, recipients, domains, and subjects associated with specific entities, helping security teams quickly identify suspicious patterns, assess threats, and strengthen overall email protection.<br/><img src={useBaseUrl('img/integrations/saas-cloud/Microsoft-Exchange-Trace-Logs-Security-Overview.png')} alt="Microsoft Exchange Trace Logs - Security Overview" width="900"/>

## Create monitors for Microsoft Exchange Trace Logs app

import CreateMonitors from '../../reuse/apps/create-monitors.md';

<CreateMonitors/>

### Microsoft Exchange Trace Logs alerts

| Name  | Description | Alert Condition |
|:--|:--|:--|
| `Microsoft Exchange Trace Logs - High Volume Data Transmitted Emails Detected` | Monitors identify emails transmitting unusually large volumes of data. Triggers an alert when high-volume data transfers are detected, helping uncover potential data exfiltration or compliance breaches promptly. You can also modify the "threshold" value as per your requirement. | Count > 0 |
| `Microsoft Exchange Trace Logs - Recipients in Embargoed Geo Locations Detected` | Tracks Microsoft Exchange trace logs to identify email recipients located in embargoed or restricted regions. Triggers an alert when messages are delivered to these high-risk locations, helping detect potential compliance breaches or data transfer violations promptly. | Count > 0 |
| `Microsoft Exchange Trace Logs - Senders from Embargoed Geo Locations Detected` | Tracks Microsoft Exchange trace logs to identify email senders originating from embargoed or restricted regions. Triggers an alert when messages are sent from these high-risk locations, helping detect potential policy violations or compliance risks promptly. | Count > 0 |

## Upgrading the Microsoft Exchange Trace Logs app (optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Microsoft Exchange Trace Logs app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>
