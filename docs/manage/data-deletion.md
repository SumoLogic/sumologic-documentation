---
id: data-deletion
title: Data Deletion Requests
description: Learn how to independently and efficiently control or remove your sensitive data from Sumo Logic.
---

<head>
  <meta name="robots" content="noindex" />
</head>

<p><a href="/docs/beta"><span className="beta">Beta</span></a></p>

import useBaseUrl from '@docusaurus/useBaseUrl';

Data Deletion allows you to quickly and easily request the removal of ingested data from Sumo Logic. This is particularly useful for removing inadvertently ingested sensitive data.

You can independently and swiftly remove sensitive data, mitigating compliance issues and potential data exposure without needing to contact Sumo Logic support.

Key features:

- **User-friendly deletion**. Easily delete data.
- **Multiple datasets and time ranges**. Flexible data management.
- **Customizable filters**. Tailor deletion to your needs.
- **Robust auditing mechanisms**. Ensure thorough tracking.


## Create a Data Deletion Request


### From the Logs tab

1. <!--Kanso [**Classic UI**](/docs/get-started/sumo-logic-ui/).Kanso--> Go to **Manage Data** > **Logs** > **Deletion Requests**.<!--Kanso <br/>[**New UI**](/docs/get-started/sumo-logic-ui-new/). From the top nav, click **Configuration** (cog icon) > **Data Deletion**. Kanso-->
1. Click **+ Create Deletion Request**.
1. Fill out the **Name**, **Reason**, and **Filter Expression** fields.
1. Select the **Time Range** when the data was ingested.
1. When you're done, click **Save**.
1. Your request will go to a Sumo Logic Customer Support Manager (CSM) for review and approval. You can check on your request in the **Status** column. <br/><img src={useBaseUrl('img/search/get-started-search/data-deletion-status.png')} alt="data-deletion-status" width="400"/>


### From a Log Search

1. From any **Log Search**, click the cog icon, then in the dropdown, select **Create Deletion Request**.<br/><img src={useBaseUrl('img/search/get-started-search/data-deletion-request.png')} alt="data-deletion-status" width="400"/>
1. In the popup window, enter a **Name** and **Reason** for your data deletion request, then click **Create Request**.


## Cancel a Data Deletion Request

To cancel a deletion request:

1. Go to **Deletion Requests**.
1. Select your request.
1. Click **Cancel Request**.

<img src={useBaseUrl('img/search/get-started-search/data-deletion-cancel.png')} alt="data-deletion-cancel" width="800"/>

## Limitations

### Handling future ingestion of sensitive data

Customers must manage the future ingestion of sensitive data using [Processing Rules](/docs/send-data/collection/processing-rules). Deletion requests will only apply to data that has already been indexed, not to data that will be ingested in the future.

### Deletion scope

Deletion is restricted to partitions and the default view (sumologic_default) in Sumo Logic. Deletion is currently not supported for other view types, such as [Scheduled Views](/docs/manage/scheduled-views) or ad hoc views created using the save view operator. Sensitive data may still be present in these unsupported views.

### Deletion request limit

Each deletion request is limited to 100,000 messages. This means that any deletion operation can only target up to 100,000 messages at a time.

<!-- is this available now?
Auditing of the following activities:
-Number of Logs that have been masked/redacted/deleted.
-Daily Summary of Statistics, indicating number of queries matching each rule to make it easy for Admins to understand which rule still has data that is being hit.
-->
