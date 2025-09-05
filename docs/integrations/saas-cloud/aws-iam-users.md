---
id: aws-iam-users
title: AWS IAM Users
sidebar_label: AWS IAM Users
description: The AWS IAM Users app for Sumo Logic helps monitor user activity and security within your AWS environment.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/misc/aws-iam-logo.png')} alt="logo" width="80" />

The Sumo Logic app for AWS IAM Users provides clear insights into user activity and security within your AWS environment. Its intuitive dashboard helps you monitor and analyze user data to strengthen security and support compliance. With powerful visualizations, security teams can track user behavior, detect anomalies, and spot unauthorized access attempts. The app also helps monitor permissions, enforce best practices, and improve overall user management. Stay secure and informed with real-time monitoring and actionable insights from the AWS IAM Users app on Sumo Logic.

## Log types

This app uses Sumo Logic’s [AWS IAM Users Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/aws-iam-users-source/) to collect the users logs from the AWS IAM Users platform.

### Sample log messages

```json title="Users Log"
{
    "Arn": "arn:aws:iam::987883700038:user/alice",
    "CreateDate": "2024-03-20T07:57:17Z",
    "Path": "/",
    "UserId": "AIDA522VHNHFBP4UFAXLG",
    "UserName": "alice",
    "PasswordLastUsed": "2025-08-11T04:48:52Z",
    "PermissionsBoundary": null,
    "Tags": null
}
```

### Sample queries

```sql title="Total Users"
_sourceCategory="Labs/AWSIAMUsers"
| json "UserId", "UserName", "CreateDate", "PasswordLastUsed", "PermissionsBoundary", "Arn" as user_id, user_name, create_date, password_last_used, permission_boundry, arn nodrop

// global filters
| where user_name matches "{{user_name}}"

// panel specific
| count by user_id
| count
```

```sql title="Never Logged Users"
_sourceCategory="Labs/AWSIAMUsers"
| json "UserId", "UserName", "CreateDate", "PasswordLastUsed", "PermissionsBoundary", "Arn" as user_id, user_name, create_date, password_last_used, permission_boundry, arn nodrop

// global filters
| where user_name matches "{{user_name}}"

// panel specific
| where isNull(password_last_used)
| count by create_date, user_id, user_name
| fields - _count 
| sort by create_date asc
```

## Collection configuration and app installation

import CollectionConfiguration from '../../reuse/apps/collection-configuration.md';

<CollectionConfiguration/>

:::important
Use the [Cloud-to-Cloud Integration for AWS IAM Users](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/aws-iam-users-source/) to create the source and use the same source category while installing the app. By following these steps, you can ensure that your AWS IAM Users app is properly integrated and configured to collect and analyze your AWS IAM Users data.
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

## Viewing the AWS IAM Users dashboards​​

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

<ViewDashboards/>

### Overview

The **AWS IAM Users - Overview** dashboard provides a clear view of user activity, status, and security within AWS IAM. It highlights key metrics such as total users, login trends, newly created accounts, and the status of active, inactive, or never-logged-in users. This centralized dashboard helps security teams monitor user activity, detect potential risks, and ensure compliance with IAM best practices—improving both security and operational efficiency.<br/><img src='https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/AWS-IAM-Users/AWS+IAM+Users+-+Overview.png' alt="AWS IAM Users - Overview" />

## Upgrading the AWS IAM Users app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the AWS IAM Users app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>
