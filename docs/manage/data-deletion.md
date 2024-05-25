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

The Data Deletion feature allows you to request the removal of ingested data from Sumo Logic, which can be particularly useful for sensitive or inadvertently ingested data.

Accidental ingestion of sensitive data due to misconfigurations, developer errors, or third-party sources can pose significant compliance and security risks. This feature provides a swift and accurate solution to mitigate such risks.

Key Features:

- User-friendly data deletion
- Support for multiple datasets and time ranges
- Customizable filters
- Robust auditing mechanisms


## Create a Data Deletion Request


### From the Logs tab

1. <!--Kanso [**Classic UI**](/docs/get-started/sumo-logic-ui/).Kanso--> Go to **Manage Data** > **Logs** > **Deletion Requests**.<!--Kanso <br/>[**New UI**](/docs/get-started/sumo-logic-ui-new/). In the left nav, click **Logs** > **Deletion Requests**. Kanso-->

1. Click **+ Raise Logs Deletion Request**.
1. Fill out the **Name**, **Reason**, and **Filter Expression** fields.
1. Select the **Time Range** when the data was ingested.
1. When you're done, click **Save**.

Next, your request will go to a Sumo Logic Customer Support Manager (CSM) for review.

To check on your request status, go to **Manage Data** > **Logs** > **Deletion Requests**. Here, you'll find a list of Deletion Requests, along with the Status and ID for each item.

### From a Log Search

1. From any **Log Search**, click the cog icon next to **Expand/Collapse**, then select **Raise Logs Deletion Request**.
1. Enter a **Name** and **Reason** for your deletion request, then click **Raise Request**.


## Cancel a Data Deletion Request

1. Click the **Cancel Request** button.

<!-- is this available now?
Auditing of the following activities:
-New Data Deletion Rule Addition, Deletion, Edit
-Number of Logs that have been masked/redacted/deleted.
-Daily Summary of Statistics, indicating number of queries matching each rule to make it easy for Admins to understand which rule still has data that is being hit.-->
