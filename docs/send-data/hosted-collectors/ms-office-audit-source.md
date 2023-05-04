---
id: ms-office-audit-source
title: Microsoft Office 365 Audit Source
sidebar_label: MS Office 365 Audit Source
description: Collect Audit Log content types to track and monitor usage of Microsoft Office 365.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/office_365_48.png')} alt="Thumbnail icon" width="40"/>


## Office 365 Audit Log Workload types

:::note
[Office 365 Germany](https://docs.microsoft.com/en-us/office365/servicedescriptions/office-365-platform-service-description/office-365-germany) is a new, differentiated option to the Office 365 services currently available in Europe, and is not supported by Sumo Logic as an audit source for collection at this time.
:::

You can configure Sumo Logic to collect logs for the following Audit Log
content types to track and monitor usage of Microsoft Office 365.

 * **Office 365 Exchange Logs.** User activity and admin logs; This requires you enable Exchange Audit Logging
 * **Office 365 SharePoint Logs.** All audit data for file-based activity, including those for “OneDrive.”  SharePoint is the underlying service for multiple Office 365 services; User activity and admin logs.
 * **Office 365 Azure AD Logs.** Logon and admin logs.
 * **Office 365 General Logs.** Includes all workloads not included in other content types.
 * **Office 365 DLP Event Logs.** Data loss prevention (DLP) policy logs to identify, monitor, and automatically protect sensitive information across Office 365.

A single Office 365 Audit Source is limited to collecting audit logs of a single content type. If you want to collect logs from more than one of the available content types, you can create an individual Source for each content type under the same Hosted Collector.

You can use the same metadata across all of the Office 365 Audit Sources, or you can vary the metadata per Source.

Create only one Source for a given workload type. If you create an additional Source with the same workload type, none of the Sources with that workload type will work.

:::important
Audit log data can contain sensitive information. When you configure any audit log Source, make sure that you implement the appropriate RBAC permissions to limit access to the content as needed. 
:::

## Prerequisites

 * Enable unified auditing for your Office 365 organization. To enable, see https://docs.microsoft.com/en-us/office365/securitycompliance/turn-audit-log-search-on-or-off
 * [Office 365 admin roles](#office-365-admin-roles)
 * [Enable Exchange Audit Logging](#enable-exchange-audit-logging)
 * Authentication must be with a new Office 365 Audit Source, we do not support re-authenticating existing sources.

## Office 365 admin roles

Office 365 comes with a set of admin roles that you can assign to users in your organization. Each admin role maps to common business functions and gives people in your organization permissions to do specific tasks in the Office 365 admin center. 

When you configure a Microsoft Office 365 Audit Source in Sumo you will need to authenticate with Microsoft using standard OAuth v2. The user who authenticates must have Microsoft Office 365 admin rights for the content that is being audited. For the sake of the principle of least privilege (PoLP), the authenticating account should be as restrictive as possible while enabling appropriate access. What's appropriate for you depends on which Office 365 edition you use and your security policies.

Using the Global Administrator role is recommended:

| Role  |   Description |
|:-----------------------|:-------------|
| Global Administrator  | This role enables access to all administrative features in your Office 365 subscription. |

You could take a different, more granular, approach to assign roles to
the authenticating account. There are approximately 40 Office 365 roles,
and some subset of those roles might meet your collection requirements.
For more information, see the following topics in Microsoft help:

 * [Permissions in the Office 365 Security & Compliance Center](https://support.office.com/en-us/article/permissions-in-the-office-365-security-compliance-center-d10608af-7934-490a-818e-e68f17d0e9c1?ui=en-US&rs=en-US&ad=US)
 * [About Office 365 admin roles](https://support.office.com/en-us/article/about-office-365-admin-roles-da585eea-f576-4f55-a1e0-87090b6aaa9d)
 * [Assigning administrator roles in Azure Active Directory](https://docs.microsoft.com/en-gb/azure/active-directory/active-directory-assign-admin-roles-azure-portal)

:::note
The variety and range of configurations of Office 365 environments preclude exhaustive testing log ingestion from Office 365 sources. You might need to experiment with several roles to ensure that you are ingesting the data you want. Note also that Office 365 administrators must enable logging in their environments for the logs to be available.
:::

## Enable Exchange Audit Logging

Before you can configure a Sumo Logic Microsoft Office 365 Audit Source for Exchange log data, enable Exchange Audit Logging within your Office 365 tenant by following the steps at https://technet.microsoft.com/library/dn879651.aspx.

## Microsoft APIs

The Sumo Logic Microsoft Office 365 Audit Source uses Webhook based integration with the Microsoft Office 365 Management Activity API. For more information on the API, see [Office 365 Management Activity API reference](https://msdn.microsoft.com/EN-US/library/office/mt227394.aspx).

For information on the format of the audit log data that is returned,
see [Office 365 Management Activity API Schema](https://msdn.microsoft.com/EN-US/library/office/mt607130.aspx).

## Message format

Each log file from Microsoft contains one or more log messages formatted as a JSON array. If there is more than one message in the array, we separate each log line in the JSON array into an individual log line message within Sumo Logic.

## Configure a Microsoft Office 365 Audit Source

You must configure a separate Source for each Office 365 application you want to collect logs for. These can all be configured on the same Hosted Collector. 

:::important
During the configuration, you will need to authenticate to Microsoft using standard OAuth v2. The user who authenticates must have Microsoft Office 365 admin rights for the content that is being audited. Refer to the API references in this article for additional information on Microsoft admin rights.
:::

1. In Sumo Logic, select **Manage Data** > **Collection** > **Collection**. 
1. Click **Add Source** next to a Hosted Collector. If you dont already have a hosted collector, see [Set Up a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector) for instructions on setting up a new Hosted Collector.
1. Select **Office 365 Audit**. 
1. Enter a name to identify the Source. **Description** is optional.
1. For **O365 Region**, select the region that corresponds to your Microsoft 365 or Office 365 subscription plan, the supported regions are Commercial, GCC, and GCC High. See [Activity API operations](https://docs.microsoft.com/en-us/office/office-365-management-api/office-365-management-activity-api-reference#activity-api-operations) for more details.
  :::note
  Source creation will fail if an incorrect **O365 Region** is selected. You cannot change the **O365 Region** setting on an existing Source.
  :::
1. For **Content Type**, select the type of log to collect. If you want to collect from additional content types, create additional instances of this Source type.
1. For **Source Category**, enter any string to tag the output collected from this Source. (Category metadata is stored in a searchable field called `_sourceCategory`.) This is an important part of limiting access to this content using RBAC. Recommended Source Category naming conventions:
   * For SharePoint: **O365/SharePoint**
   * For Exchange: **O365/Exchange**
   * For Azure: **O365/Azure**
1. **Fields.** Click the **+Add Field** link to define the fields you want to associate, each field needs a name (key) and value.
   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo that does not exist in the Fields schema it is ignored, known as dropped.
1. Click **Sign in with Office 365** to authenticate to Microsoft using standard OAuth v2 interaction.  
  :::note
  Sumo Logic never receives your Microsoft Office 365 credentials.
  :::
1. [Create any Processing Rules](/docs/send-data/collection/processing-rules/create-processing-rule) you'd like for the new Source.
1. When you are finished configuring the Source, click **Save**.

## Audit Index events

The Microsoft Office 365 Audit Source has events logged in the Sumo Logic Audit Index for the following:

 * Source registration success with Microsoft
 * Failure to read back content from Microsoft
 * [Token-update](#access-tokens) failure events
 * [Subscription](#subscription-watchpoints) watchpoint failure events

To search for these events use the Audit Index.

## Known Issues

Refer to the following MSDN article for known issues, and notes: https://msdn.microsoft.com/EN-US/library/office/mt227394.aspx

Here are a few important items:   

* (From Microsoft) “When a subscription is created, it can take up to 12 hours for the first content blobs to become available for that subscription.”  We have found that data starts to arrive at Sumo Logic much sooner than this, but please wait this long before contacting Support.
* (From Microsoft) “The content blobs are created by collecting and aggregating actions and events across multiple servers and data centers. As a result of this distributed process, the actions and events contained in the content blobs will not necessarily appear in the order in which they occurred. One content blob can contain actions and events that occurred prior to the actions and events contained in an earlier content blob. We are working to decrease the latency between the occurrence of actions and events and their availability within a content blob, but we cannot guarantee that they appear sequentially.”
* There can be a significant delay between when an event occurs in O365, and when an audit log is available from Microsoft.  We receive the log files as soon as they are made available to us. The latency for log line available varies between content types, and from our observation, is not consistent. This is not within Sumo Logic’s control.  You may monitor this latency by querying the difference between the event time stamp and the receipt time stamp (when we processed the log message).

## OAuth 2.0 access token and subscription expiration

### Access Tokens

An access token is granted by a third party service, such as Microsoft Office 365, to Sumo for accessing audit log APIs required for collecting audit events. Access tokens are stored encrypted and have a short expiration time of several hours. Sumo automatically updates them before they expire to prevent data loss. Successful and failed token-update events are logged in the Audit Index. If the request fails Sumo will continue to try to update a token for about a week. After several failures, we recommend recreating the Office 365 Audit Source.

### Subscription Watchpoints

A subscription is a channel established with the third party service to receive notification events. Similar to access tokens, subscriptions are valid only before the expiration time. Before a subscription expires, Sumo invalidates the current subscription and obtains a new subscription. In the event of failure to update a subscription, an entry is logged in the Audit Index.
