---
id: airtable-source
title: Airtable Source
sidebar_label: Arirtable Source
description: This document explains how to retrieve Airtable audit logs.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/airtable-icon.png')} alt="airtable-icon.png" width="150" />

With the Airtable API integration, you can ingest audit logs periodically from the Airtable app platform into the Sumo Logic environment for storing and analyzing data.

## Data Sources
The Airtable Integration consumes audit logs from the Airtable audit log API periodically and sends data to Sumo Logic in chunks.

## Prerequisite
To collect audit logs, you must have a Airtable Enterprise account.

## States
An Airtable Source let you pulls audit logs from Airtable app. When an Airtable Source goes through, the following states when created:

  1. **Pending**. Once the Source is submitted, it is validated, stored, and placed in a **Pending** state.
  1. **Started**. A collection task is created on the Hosted Collector.
  1. **Initialized**. The task configuration is complete in Sumo Logic.
  1. **Authenticated**. The Source successfully authenticated with Airtable app.
  1. **Collecting**. The Source is actively collecting data from Airtable app.

If the Source has any issues during any one of these states, it is placed in an **Error** state.
When you delete the Source, it is placed in a Stopping state. When it has successfully stopped, it is deleted from your Hosted Collector. On the Collection page, the Health and Status for Sources is displayed. Use Health Events to investigate issues with collection.

Hover your mouse over the status icon to view a tooltip with a count of the detected errors and warnings. You can click on the status icon to open a Health Events panel with details on each detected issue.

## Setup and Configuration
In this configuration, you will set up a Airtable source account with your Enterprise account and configure it to be authorized and authenticated to use audit logs from Airtable API.

To configure a Airtable Source:
1. In Sumo Logic, select **Manage Data** > **Collection** > **Collection**.
2. On the Collection page, click **Add Source** next to a **Hosted Collector**.
3. Search for and select **Airtable**.<br/><img src={useBaseUrl('img/send-data/airtable-icon.png')} alt="airtable-icon.png" width="150" />
4. Enter a **Name** for the Source. The description is optional.<br/><img src={useBaseUrl('img/send-data/airtable-config-main.png')} alt="airtable-config-main.png" width="500" />
5. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.
6. (Optional) **Fields**. Click the **+Add Field** link to define the fields you want to associate. Each field needs a name (key) and value.
    * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
    * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo that does not exist in the Fields schema it is ignored, known as dropped.  
7. In **Account ID**, enter an account ID that will be an unique identifier for your enterprise account.
8. In **Personal Access Token**, enter your personal access token. You will create a personal token from your account and that will be used to  authenticate API requests. To get the token, follow the steps below:
   1. Go to Airtable app URL https://airtable.com/create/tokens.
   2. Click the **Create new token** button to create a new personal access token.
   3. Give your token a unique name. This name will be visible in record revision history.
   4. Choose the scope **enterprise.auditLogs:read** to grant your token. This controls what API endpoints the token will be able to use.
   5. Click **add a base** to grant the token access to a base or workspace.
   6. You can grant access to any number and combination of **bases** and **workspaces**. You can also give access to all workspaces and bases associated with your account. Make sure that the token will only be able to read and write data within the bases and workspaces that have been assigned to it.

## Limitations
Integration will support authentication using `Personal access token`. The `Api key` and `OAuth token` based authentication will not be supported.

## Assumptions
* Size of single audit log will be less than 64 KB.
* Data URLs will expire after 7 days. If URLs are not processed by 7 days, integration will create a new request which may cause data duplication.
