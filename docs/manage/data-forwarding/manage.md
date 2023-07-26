---
id: manage
title: Manage Data Forwarding
description: View, edit, delete, activate, and deactivate data forwarding destinations.
---

:::note
Data forwarding is not currently supported for data assigned to the Infrequent Tier. 
:::

## View, edit, or delete a data forwarding destination

The following actions are available on the **Manage Data** > **Logs** > **Data Forwarding** page. Hover over a destination in the table and select any of the following:

* Click the **Information** icon to display details about the configured destination, including the status and any indexes that are currently forwarding to the destination.
* Click the **Edit** icon to make changes to the configuration.
* Click the **Delete** icon to delete the destination. If the destination is currently active, you must deactivate it before it deleting it, as described in the following section.

## Activate or Deactivate Data Forwarding

If you’d like to start or stop forwarding data, you can activate or deactivate the S3 bucket. 

1. In Sumo Logic, go to **Manage Data** > **Logs** > **Data Forwarding**.
1. Hover over the destination and click the **Edit** icon.
1. Select or deselect the **Active** checkbox.
1. Click **Save**.

## Audit logging for data forwarding

Sumo Logic logs audit events for both system and user data forwarding events. For more information, see [Audit Event Index](/docs/manage/security/audit-event-index.md).
