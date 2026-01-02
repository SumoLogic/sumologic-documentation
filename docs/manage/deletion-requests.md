---
id: deletion-requests
title: Deletion Requests
keywords:
  - data deletion
  - delete data
description: Learn how to independently and efficiently control or remove your sensitive data from Sumo Logic.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<head>
  <meta name="robots" content="noindex" />
</head>

<p><a href={useBaseUrl('docs/beta')}><span className="beta">Beta</span></a></p>

<!-- Originally added as a beta article with DOCS-149. -->

Deletion requests allow you to quickly remove ingested data from Sumo Logic. This is particularly useful for addressing inadvertently ingested sensitive data.

You can independently and swiftly remove sensitive data, mitigating compliance issues and potential data exposure without needing to contact Sumo Logic support. You can also manage deletion requests programmatically via the [Data Deletion Rules API](/docs/api/data-deletion-rules).

Key features:

- **User-friendly deletion**. Easily delete data.
- **Multiple datasets and time ranges**. Flexible data management.
- **Customizable filters**. Tailor deletion to your needs.
- **Robust auditing mechanisms**. Ensure thorough tracking.

## Prerequisites

| Action | Required [role capability](/docs/manage/users-roles/roles/role-capabilities/#data-management) |
|:-------|:-------------------|
| Create or manage deletion requests | **Manage Deletion Requests** |
| View deletion requests only | **View Deletion Requests** or **Manage Deletion Requests** |
| Approve or reject requests | **Review Deletion Requests** (automatically includes Manage and View) |

## Create a deletion request

You can create a data deletion request from either the **Logs** tab or a **Log Search**. Before you begin, review the following:

:::danger
Data cannot be recovered once deleted. Ensure you have appropriately backed up any necessary data before submitting a deletion request.
:::

* Once a data deletion request has been approved, data will be deleted from the organization and no users within the organization (admin or otherwise) will be able to access the data.
* Data deletion requests should not be done without planning, and any data deletion approvals should be given sufficient consideration.
* During the data deletion process, existing messages may temporarily appear duplicated for a few seconds. These duplicated messages will automatically disappear once the data deletion is complete.
* Pinned queries may continue to display data identified for deletion for up to 24 hours from the initial run, prior to the data deletion request approval.
* Data deletion requests are automatically canceled after 30 days if no action is taken.

### From the Logs tab

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). Go to **Manage Data > Logs > Deletion Requests**.<br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu, select **Data Management**, and then under **Logs**, select **Deletion Requests**.
1. Click **+ Create Deletion Request**.
1. Fill out the **Name**, **Reason**, and **Filter Expression** fields.
   :::note
   Use the **Filter Expression** field to specify the criteria for the log messages you want to delete. The expression should match the content of the messages. For example, if you enter `Hello World`, all messages containing that specific phrase will be deleted.
   :::
1. Select the **Time Range** when the data was ingested.
1. When you're done, click **Save**.
1. An email about your request will be sent to 50 most recently active approval users with [approval access](#approve-a-deletion-request).
    :::note
    If you need approval from someone outside these 50 users, forward them the deletion request email.
    :::
     You can check on your request in the **Status** column.<br/><img src={useBaseUrl('img/search/get-started-search/deletion-request-status.png')} alt="deletion request status" style={{border: '1px solid gray'}} width="400"/>

### From a Log Search

1. In the **Log Search**, search for the required logs that needs to be deleted.
1. Click the cog icon, then in the dropdown, select **Create Deletion Request**.<br/><img src={useBaseUrl('img/search/get-started-search/deletion-request.png')} alt="deletion request" style={{border: '1px solid gray'}} width="400"/>
1. In the popup window, enter a **Name** and **Reason** for your data deletion request, then click **Create Request**.

## Audit deletion events

The Audit Event Index and System Event Index contain detailed JSON logs for deletion activities. To search for these events, use the metadata field `_sourceCategory=deletionRule`.

```sql
(_index=sumologic_*_events) AND _sourceCategory=deletionRule
| json field=_raw "resourceIdentity.name" as name nodrop
| json field=_raw "resourceIdentity.id" as id nodrop
| json field=_raw "eventName"
| json field=_raw "operator.interface" as operator nodrop
| json field=_raw "operator.email" as email nodrop

| count by _messagetime,eventname,name,id,operator,email,_view
| sort _messagetime asc
```

The events `DeletionRuleCreated` and `DeletionRuleStateUpdated` are contained in the `sumologic_audit_events` index and `DeletionRuleProcessingConcluded` is in the `sumologic_system_events` index.

## Cancel a deletion request

To cancel a data deletion request:

1. Go to **Deletion Requests**.
1. Select your request.
1. Click **Cancel Request**.

<img src={useBaseUrl('img/search/get-started-search/deletion-request-cancel.png')} alt="screenshot showing how to cancel a deletion request" style={{border: '1px solid gray'}} width="800"/>

## Approve a deletion request

Once the deletion request is created, an email notification will be sent to the users who have approval access. To approve or reject a request, follow the steps below:

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). Go to **Manage Data > Logs > Deletion Requests**.<br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic main menu, select **Data Management**, and then under **Logs**, select **Deletion Requests**.<br/><img src={useBaseUrl('img/search/get-started-search/pending-requests-deletion-requests.png')} alt="filter for pending deletion requests" style={{border: '1px solid gray'}} width="800"/>
1. Filter for the status with **Pending review**.<br/><img src={useBaseUrl('img/search/get-started-search/pending-requests.png')} alt="filter for pending deletion requests" style={{border: '1px solid gray'}} width="800"/>
1. Click a deletion request to review it.<br/><img src={useBaseUrl('img/search/get-started-search/pending-requests-select.png')} alt="filter for pending deletion requests" style={{border: '1px solid gray'}} width="800"/>
1. **Approve** or **Reject** the request based on your requirement.<br/><img src={useBaseUrl('img/search/get-started-search/approve-reject-deletion-request.png')} alt="Approve/Reject deletion requests side panel" style={{border: '1px solid gray'}} width="400"/>
    - **Approve**. In the **Approve Deletion Request** pop-up, enter **Delete**, and then click **Delete Data**. This will permanently delete the data.<br/><img src={useBaseUrl('img/search/get-started-search/approve-deletion-request.png')} alt="Approve deletion requests pop-up" style={{border: '1px solid gray'}} width="400"/>
    - **Reject**. Enter the reason for rejection in the **Reject Deletion Request** pop-up to help the requester understand the reason for rejection and take any necessary actions, and click the **Reject Request** button.<br/><img src={useBaseUrl('img/search/get-started-search/reject-deletion-request.png')} alt="Reject deletion requests pop-up" style={{border: '1px solid gray'}} width="400"/>

## Limitations

- Deletion requests are processed sequentially (one at a time).
- Maximum 100 deletion requests at a time.
- Each request can include up to 1 petabyte (PB) of scanned data.
- Maximum 1,000,000 messages per request.
- Maximum time range of one year per request.
- Up to 10 active concurrent deletion tasks across different customers.
- Requests cannot delete data prior to February 1, 2024. Requests before this timestamp will fail.

### Handling future ingestion of sensitive data

Deletion requests only apply to data already indexed, and not to future ingestion. Use [processing rules](/docs/send-data/collection/processing-rules) to manage future ingestion of sensitive data.

### Deletion scope

Deletion is restricted to [Partitions](/docs/manage/partitions/), Default view (`sumologic_default`), [Scheduled Views](/docs/manage/scheduled-views), [Scheduled Search](/docs/alerts/scheduled-searches/), and ad hoc views in Sumo Logic. Deletion is currently not supported for audit indexes, security indexes, and other view types. Sensitive data may still be present in these unsupported views.

### Supported operators

Deletion requests support these search operators: [`as`](/docs/search/search-query-language/search-operators/as), [`concat`](/docs/search/search-query-language/search-operators/concat), [`contains`](/docs/search/search-query-language/search-operators/contains), [`decToHex`](/docs/search/search-query-language/search-operators/dectohex), [`floor`](/docs/search/search-query-language/math-expressions/floor), [`if`](/docs/search/search-query-language/search-operators/if), [`in`](/docs/search/search-query-language/search-operators/in), [`lookup`](/docs/search/search-query-language/search-operators/lookup), [`toLower`](/docs/search/search-query-language/search-operators/tolowercase-touppercase), [`matches`](/docs/search/search-query-language/search-operators/matches), [`parse`](/docs/search/search-query-language/parse-operators), [`toUpper`](/docs/search/search-query-language/search-operators/tolowercase-touppercase), and [`where`](/docs/search/search-query-language/search-operators/where).
