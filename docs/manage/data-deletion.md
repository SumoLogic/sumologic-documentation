---
id: data-deletion
title: Data Deletion
description: Learn how to independently and efficiently control or remove your sensitive data from Sumo Logic.
---

<head>
  <meta name="robots" content="noindex" />
</head>

<p><a href="/docs/beta"><span className="beta">Beta</span></a></p>

import useBaseUrl from '@docusaurus/useBaseUrl';

Users can face critical challenges when inadvertently ingesting sensitive data into Sumo Logic, necessitating swift and accurate deletion procedures. Common causes include misconfigurations, developer oversight, or third-party data containing sensitive information. The urgency stems from potential compliance violations, financial repercussions, and the risk of data exposure within their organization.

With Data Deletion, you're empowered to independently and efficiently control or remove sensitive or inadvertently ingested data without having to contact Sumo Logic support.

Key features include user-friendly deletion capabilities, support for multiple datasets and time ranges, customizable filters, and robust auditing mechanisms.

## Create a Data Deletion Request

### From a Log Search

1. Open a log search.
1. Type in a log search query, and run search.
1. Click the cog icon next to Expand, then select **Raise Logs Deletion Request**.
1. Enter a name and reason for your deletion request, then click **Raise Request**. This sends your request to a Sumo Logic CSM for approval.
1. To verify creation, go to **Logs** > **Deletion Requests**. Here, you'll find a list of Deletion Requests, along with the Status (Waiting for Approval, Running, Complete) and ID for each item.
1. Approval process ?

:::warning limitations
Auto-refresh is not available yet. You'll have to manually refresh the page to update the **Status**.
:::

### From the Logs tab

1. Go to **Logs** > **Deletion Requests**.
1. Click **+ Raise Logs Deletion Request**.

## Cancel a Data Deletion Request

1. Click the **Cancel Request** button.

<!-- is this available?
Auditing of the following activities:
-New Data Deletion Rule Addition, Deletion, Edit
-Number of Logs that have been masked/redacted/deleted.
-Daily Summary of Statistics, indicating number of queries matching each rule to make it easy for Admins to understand which rule still has data that is being hit.-->