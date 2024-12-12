---
id: deletion-requests
title: Deletion Requests
description: Learn how to independently and efficiently control or remove your sensitive data from Sumo Logic.
---

<head>
  <meta name="robots" content="noindex" />
</head>

<p><a href="/docs/beta"><span className="beta">Beta</span></a></p>

import useBaseUrl from '@docusaurus/useBaseUrl';

Deletion requests allow you to quickly and easily request the removal of ingested data from Sumo Logic. This is particularly useful for removing inadvertently ingested sensitive data.

You can independently and swiftly remove sensitive data, mitigating compliance issues and potential data exposure without needing to contact Sumo Logic support.

Key features:

- **User-friendly deletion**. Easily delete data.
- **Multiple datasets and time ranges**. Flexible data management.
- **Customizable filters**. Tailor deletion to your needs.
- **Robust auditing mechanisms**. Ensure thorough tracking.

## Create a deletion request

:::warning
After a data deletion request is approved, data will be deleted from the organization and no users within the organization (admin or otherwise) will be able to access the data. Data deletion requests should not be done without planning, and any data deletion approvals should be given sufficient consideration.
:::

:::note
During the data deletion process, existing messages may temporarily appear duplicated for a few seconds. These duplicated messages will automatically disappear once the data deletion is complete.
:::

:::info
To create or view data deletion requests, you must have the **Manage Deletion Rules** capability. But to only view the data deletion requests, you must have either `viewDeletionRules` or `manageDeletionRules` capability.
:::

Data cannot be recovered once it gets deleted. Ensure that you have appropriately backed up any necessary data before submitting a deletion request. You can create a data deletion request from either the **Logs** tab or any **Log Search**.

### From the Logs tab

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). Go to **Manage Data** > **Logs** > **Deletion Requests**.<br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Configuration**, and then under **Logs** select **Deletion Requests**. 
1. Click **+ Create Deletion Request**.
1. Fill out the **Name**, **Reason**, and **Filter Expression** fields.
   :::note
   Use the **Filter Expression** field to specify the criteria for the log messages you want to delete. The expression should match the content of the messages. For example, if you enter `Hello World`, all messages containing that specific phrase will be deleted.
   :::
1. Select the **Time Range** when the data was ingested.
1. When you're done, click **Save**.
1. Your request will go to a Sumo Logic Customer Support Manager (CSM) for review and approval. You can check on your request in the **Status** column. <br/><img src={useBaseUrl('img/search/get-started-search/deletion-request-status.png')} alt="deletion request status" style={{border: '1px solid gray'}} width="400"/>

### From a Log Search

1. In the **Log Search**, search for the required logs that needs to be deleted.
1. Click the cog icon, then in the dropdown, select **Create Deletion Request**.<br/><img src={useBaseUrl('img/search/get-started-search/deletion-request.png')} alt="deletion request" style={{border: '1px solid gray'}} width="400"/>
1. In the popup window, enter a **Name** and **Reason** for your data deletion request, then click **Create Request**.
   
#### Delete events

The Audit Event Index and System Event Index has detailed JSON logs. To search for audit events or system events for data deletion logs, use metadata field `_sourceCategory=deletionRule`. 

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

## Limitations

### Handling future ingestion of sensitive data

Customers must manage the future ingestion of sensitive data using [processing rules](/docs/send-data/collection/processing-rules). Deletion requests will only apply to data that has already been indexed, not to data that will be ingested in the future.

### Deletion scope

Deletion is restricted to partitions and the default view (sumologic_default) in Sumo Logic. Deletion is currently not supported for other view types, such as [Scheduled Views](/docs/manage/scheduled-views) or ad hoc views created using the save view operator. Sensitive data may still be present in these unsupported views.

### Deletion request limit

Each deletion request is limited to 100,000 messages. This means that any deletion operation can only target up to 100,000 messages at a time.

### Supported operators

Currently, we only support [`as`](/docs/search/search-query-language/search-operators/as), [`concat`](/docs/search/search-query-language/search-operators/concat), [`contains`](/docs/search/search-query-language/search-operators/contains), [`decToHex`](/docs/search/search-query-language/search-operators/dectohex), [`floor`](/docs/search/search-query-language/math-expressions/floor), [`if`](/docs/search/search-query-language/search-operators/if), [`in`](/docs/search/search-query-language/search-operators/in), [`lookup`](/docs/search/search-query-language/search-operators/lookup), [`toLower`](/docs/search/search-query-language/search-operators/tolowercase-touppercase), [`matches`](/docs/search/search-query-language/search-operators/matches), [`parse`](/docs/search/search-query-language/parse-operators), [`toUpper`](/docs/search/search-query-language/search-operators/tolowercase-touppercase), and [`where`](/docs/search/search-query-language/search-operators/where) search query operators.
