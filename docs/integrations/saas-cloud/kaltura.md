---
id: kaltura
title: Kaltura
sidebar_label: Kaltura
description: The Sumo Logic app for Kaltura allows you to monitor trends, detect changes, and optimize your content strategies within your content management ecosystem.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/kaltura-logo.png')} alt="Thumbnail icon" width="70"/>

The Sumo Logic app for Kaltura offers a comprehensive overview of key metrics within the content management ecosystem, including total entries, user activity trends, and event distributions. It provides visualizations and analytics to help you monitor trends, detect changes, and optimize your content strategies, enabling you to make informed decisions and maintain the security of the platform.

:::info
This app includes [built-in monitors](#kaltura-monitors). For details on creating custom monitors, refer to the [Create monitors for Kaltura app](#create-monitors-for-kaltura-app).
:::

## Log types

This app uses Sumo Logic’s [Kaltura Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/kaltura-source/) to collect the [base entry events](https://developer.kaltura.com/api-docs/service/baseEntry/action/list) and the [audit trail events](https://developer.kaltura.com/api-docs/service/auditTrail/action/list) from the Kaltura platform.

### Sample log messages

<details>
<summary>Audit Trail Event Log</summary>

```json
{
   "id": 1747229372,
    "createdAt": 1747229372,
    "status": 2,
    "auditObjectType": "accessControl",
    "objectId": "1_accessControl03",
    "entryId": "1_accessControl03",
    "masterPartnerId": 5721612,
    "partnerId": 5721612,
    "requestId": "627081177",
    "userId": "ojames",
    "action": "COPIED",
    "data": {
        "changedItems": [
            {
                "descriptor": "accessControl.TYPE",
                "oldValue": "restricted",
                "newValue": "unrestricted",
                "objectType": "KalturaAuditTrailChangeItem"
            },
            {
                "descriptor": "accessControl.RULE",
                "oldValue": "ruleA",
                "newValue": "ruleB",
                "objectType": "KalturaAuditTrailChangeItem"
            }
        ],
        "objectType": "KalturaAuditTrailChangeInfo"
    },
    "ks": "djJ8NTcyMTYxMnz4000R7odJuJvBFHRM1tsCApuOv-61TnUTXSrSkNRtVdPzuahbx1bkWLP9BfvHxh0wKUV9wlIf1-So-elhmMAageO_XNNFhsQtPNI4x0mpV4PXj1MaDuPqPRQ2sw5f4DevBxdfyEzwMtj8kBRCPts5TLfiEiXSFvhVpsBT_2qdNM4Kz91sSYAzzmVE6XPBIJsxw6Nx-G2Ee0bIVROBV0v19q5GuJK5RA7MU4bggbbvh31T0dpguRGxxVn7LKfD2JGAGJcqY63CMfSbdm6k2nS8iCrMzhwaP5PqC8edsh8IZLejhKyJ6Qf2nopwg0JN17phVuFsgmR6",
    "context": 1,
    "entryPoint": "accessControl::copy",
    "serverName": "nvp1-fapi-rty9",
    "ipAddress": "193.124.185.120",
    "userAgent": "KMS-1223456afe-1747229372.519",
    "clientTag": "KMS 5.150.13, build 0;1223456afe;nvp1-mediaspace-kms-main-777979b8f8-w7kct",
    "objectType": "KalturaAuditTrail"
}
```
</details>

<details>
<summary>Base Entry Event Log</summary>

```json
{
    "id": "1_qasdad7l4x8yz",
    "name": "Virtual Reality Expo Highlights",
    "description": "A recap of the exciting virtual reality technologies showcased at the expo.",
    "partnerId": 5721612,
    "userId": "mstevens",
    "creatorId": "mstevens",
    "tags": "VR, technology, expo",
    "adminTags": "expo_highlights",
    "categories": "Technology",
    "categoriesIds": "458901234",
    "status": 2,
    "moderationStatus": 6,
    "moderationCount": 0,
    "type": 1,
    "createdAt": 1747229272,
    "updatedAt": 1747229272,
    "rank": 4.4,
    "totalRank": 44,
    "votes": 10,
    "downloadUrl": "https://jaromivaxenox.xyz/p/5721612/sp/0/playManifest/entryId/1_q7l4x8yz/format/download/protocol/https/flavorParamIds/0",
    "searchText": "_PAR_ONLY_ _5721612_ _MEDIA_TYPE_1| Virtual Reality Expo Highlights",
    "version": 1,
    "thumbnailUrl": "https://jaromivaxenox.xyz/p/5721612/sp/0/thumbnail/entry_id/1_q7l4x8yz/version/100011",
    "accessControlId": 7294800,
    "referenceId": "VRExpo2025",
    "replacementStatus": 0,
    "partnerSortValue": 150,
    "conversionProfileId": 25121350,
    "rootEntryId": "1_q7l4x8yz",
    "operationAttributes": [],
    "entitledUsersEdit": "mstevens,rgarcia",
    "entitledUsersPublish": "rgarcia",
    "entitledUsersView": "mstevens,rgarcia,awilliams",
    "capabilities": "",
    "displayInSearch": 1,
    "blockAutoTranscript": false,
    "plays": 80,
    "views": 110,
    "width": 1920,
    "height": 1080,
    "duration": 3000,
    "msDuration": 3000000,
    "mediaType": 1,
    "conversionQuality": 25121350,
    "sourceType": "4",
    "dataUrl": "https://jaromivaxenox.xyz/p/5721612/sp/0/playManifest/entryId/1_q7l4x8yz/format/url/protocol/https",
    "flavorParamsIds": "489001,489002",
    "objectType": "KalturaMediaEntry",
    "application": 0,
    "licenseType": 4
}
```
</details>

### Sample queries

```sql title="Entries by Status"
_sourceCategory="Labs/Kaltura" accessControlId
| json "id", "status", "type", "objectType", "application", "displayInSearch", "moderationStatus", "replacementStatus", "licenseType", "userId", "name", "description", "creatorId", "dataUrl", "updatedAt" as id, status, type, object_type, application, display_in_search, moderation_status, replacement_status, license_type, user_id, name, description, creator_id, data_url, updated_at nodrop

| where !isNull(application) and !isNull(license_type)
| lookup status_name as status from https://sumologic-app-data.s3.us-east-1.amazonaws.com/kaltura/kaltura_status_mapping.csv on status=status_code
| lookup type_name as type from https://sumologic-app-data.s3.us-east-1.amazonaws.com/kaltura/kaltura_type_mapping.csv on type=type_code
| lookup application_name as application from https://sumologic-app-data.s3.us-east-1.amazonaws.com/kaltura/kaltura_application_mapping.csv on application=application_code
| lookup display_search_name as display_in_search from https://sumologic-app-data.s3.us-east-1.amazonaws.com/kaltura/kaltura_display_search_mapping.csv on display_in_search=display_search_code
| lookup moderation_status_name as moderation_status from https://sumologic-app-data.s3.us-east-1.amazonaws.com/kaltura/kaltura_moderation_status_mapping.csv on moderation_status=moderation_status_code
| lookup replacement_status_name as replacement_status from https://sumologic-app-data.s3.us-east-1.amazonaws.com/kaltura/kaltura_replacement_status_mapping.csv on replacement_status=replacement_status_code
| lookup license_type_name as license_type from https://sumologic-app-data.s3.us-east-1.amazonaws.com/kaltura/kaltura_license_type_mapping.csv on license_type=license_type_code

| where status matches "{{status}}"
| where type matches "{{type}}"
| where application matches "{{application}}"
| where display_in_search matches "{{display_in_search}}"
| where moderation_status matches "{{moderation_status}}"
| where replacement_status matches "{{replacement_status}}"
| where license_type matches "{{license_type}}"
| where object_type matches "{{object_type}}"

| count by id, status
| count by status
| sort by _count, status
```

## Collection configuration and app installation

import CollectionConfiguration from '../../reuse/apps/collection-configuration.md';

<CollectionConfiguration/>

:::important
Use the [Cloud-to-Cloud Integration for Kaltura](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/kaltura-source/) to create the source and use the same source category while installing the app. By following these steps, you can ensure that your Kaltura app is properly integrated and configured to collect and analyze your Kaltura data.
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

## Viewing Kaltura dashboards

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

<ViewDashboards/>

### Entries Overview

The **Kaltura - Entries Overview** dashboard provides a detailed view of content management metrics, including total and active entries, categorized by status, type, application, and moderation status. Using visualizations like pie charts and bar graphs, it helps you track entry distribution, identify trends, and optimize content strategies. Insights into virus-infected entries, flagged actions, and top license types support informed decision-making and help maintain data integrity within the Kaltura platform.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/Kaltura/Kaltura+-+Entries+Overview.png')} alt="Entries Overview dashboard" />

### Audits Overview

The **Kaltura - Audits Overview** dashboard provides a clear view of audit trail data, highlighting key metrics like total events, actions, and contextual details. Visualizations such as pie charts and bar graphs display event distributions by action, context, status, and critical object changes. You can identify anomalies, monitor user behavior, and improve security by analyzing trends, user activity, and geographical data. The dashboard supports informed decision-making and helps optimize auditing processes within the Kaltura platform.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/Kaltura/Kaltura+-+Audits+Overview.png')} alt="Audits Overview dashboard" />

## Create monitors for Kaltura app

import CreateMonitors from '../../reuse/apps/create-monitors.md';

<CreateMonitors/>

### Kaltura monitors

| Name | Description | Trigger Type (Critical / Warning / MissingData) | Alert Condition | 
|:--|:--|:--|:--|
| `Events from Embargoed Locations` | This alert is triggered when events originating from embargoed locations are detected, ensuring adherence to security restrictions and protocols. | Critical | Count > 0 | 
| `Infected Entry Detected` | This alert is triggered when entries are marked and flagged as infected, indicating potential security threats and content integrity issues. | Critical | Count > 0|
| `Virus Scan Failed Entry Detected` | This alert is triggered when virus scans fail on entries, highlighting vulnerabilities and possible malware presence within the platform. | Critical | Count > 0|
| `Critical Object Changes` | This alert is triggered when critical changes occur in essential object types, ensuring system integrity and security. | Critical | Count > 0|

## Upgrade/Downgrade the Kaltura app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Kaltura app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>