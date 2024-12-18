---
id: airtable
title: Airtable
sidebar_label: Airtable
description: The Sumo Logic app for the Airtable app offers functionality for monitoring and analyzing your organization's Airtable audit logs.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/airtable-icon.png')} alt="airtable-icon.png" width="50" />

The Airtable app for Sumo Logic monitors and analyzes your organization's Airtable audit logs, providing insights into user activity, data trends, and security events. This app is based on the Airtable Audit Logs, which provide detailed information on all actions performed in your Airtable account.

The Airtable app makes it simple to import data from your Airtable audit logs into Sumo Logic, where you can perform real-time analysis and build dashboards to visualize key metrics. You can monitor security events and gain insights into user activity across your organization.

The Airtable app allows you to:
* Keep track of user activity within your Airtable account in real-time.
* Analyze user actions, identify failed executions, and track trends over time.
* View a summary of audit logs in table format, enabling you to identify anomalous behavior and potential security threats.
* Create customized dashboards to visualize important metrics and track key performance indicators.

The Airtable app also offers a pre-built dashboard that enables you to start monitoring your Airtable audit logs right away. The Airtable App for Sumo Logic is especially useful for organizations that must comply with regulatory requirements or maintain a high level of security. With the ability to monitor user activity and track changes in real time, you can quickly identify potential issues and respond to security incidents as they occur.

## Log type

The Sumo Logic app for Airtable consumes Audit logs from your Airtable Enterprise account. Audit Logs track user activity and record changes made to the data in the system.

To understand how to access detailed records of changes made to the Airtable Enterprise account, refer to the [Airtable Audit logs](https://support.airtable.com/docs/how-to-access-enterprise-audit-logs#interpreting-audit-logs) documentation. This documentation provides information on the different types of logs that are available, how to access them, and what information they contain.

### Sample log messages

<details>
<summary>Click to view the sample log message</summary>

```json
{
  "enterpriseaccountid": "entdfgc0BXGp",
  "originatinguserid": "usrcdagdfQ1B",
  "apiname": "PUBLIC_API",
  "apiversion": "0.1",
  "actionid": "acfdgdfCht9zR",
  "client": {
    "ipaddress": "100.108.203.58"
  },
  "context": {
    "workspaceid": null,
    "applicationid": null,
    "tableid": null
  },
  "request": {
    "requestid": "reqesfgstSbadd",
    "starttime": "2023-01-18T10:26:45.281Z",
    "modelclassname": "enterpriseAccount",
    "modelid": "entmDsrgfc0BXGp",
    "action": "getEnterpriseAuditLog",
    "parametersjson": "{\"enterpriseAuditLogTaskId\":\"ealtossregfCp47\"}"
  },
  "response": {
    "success": true,
    "message": null
  }
}
```
</details>

### Sample queries

```sql="Active Team Members"
_sourceCategory="Labs/airtable"
| Json "enterprise_account_id", "originating_user_id", "api_name", "api_version", "action_id", "client.ipaddress", "request.requestid", "request.starttime", "request.modelclassname", "request.modelid", "request.action", "response.success" as enterprise_account_id, originating_user_id, api_name, api_version, action_id, ipaddress, requestid, starttime, modelclassname, modelid, action, success nodrop
| where api_name matches "{{api}}" or isNull(api_name)
| where modelclassname matches "{{model}}" or isNull(modelclassname)
| where action matches "{{action}}" or isNull(action)
| count_distinct (action_id)
```

## Collection configuration and app installation

Depending on the set up collection method, you can configure and install the app in three ways:

- **[Create a new collector and install the app](#create-a-new-collector-and-install-the-app)**. Create a new Sumo Logic Cloud-to-Cloud (C2C) source under a new Sumo Logic Collector and later install the app; Or
- **[Use an existing collector and install the app](#use-an-existing-collector-and-install-the-app)**. Create a new Sumo Logic Cloud-to-Cloud (C2C) source under an existing Sumo Logic Collector and later install the app; Or
- **[Use existing source and install the app](#use-an-existing-source-and-install-the-app)**. Use your existing configured Sumo Logic Cloud-to-Cloud (C2C) source and install the app.

:::important
Use the [Cloud-to-Cloud Integration for Airtable](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/airtable-source) to create the source and use the same source category while installing the app. By following these steps, you can ensure that your Airtable app is properly integrated and configured to collect and analyze your Airtable data.
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

## Viewing Airtable dashboards​

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

<ViewDashboards/>

### Overview

The **Airtable - Overview** dashboard provides a high-level view of key metrics related to Airtable platform user activity, audits, and execution. It contains widgets that display data such as total audit logs and failed executions, action distribution, and top-performing actions and users. The dashboard also provides information on activity trends over time and user locations. The Audit Log Summary widget provides a quick overview of all platform activity. Overall, the dashboard helps users quickly understand how the platform is used and identify areas for improvement.<br/><img src={useBaseUrl('img/integrations/saas-cloud/airtable-overview.png')} alt="airtable-overview.png" width="600"/>

## Upgrade/Downgrade the Airtable app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Airtable app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>