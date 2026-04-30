---
id: krutrim-object-storage
title: Krutrim Object Storage
sidebar_label: Krutrim Object Storage
description: Krutrim Object Storage enables seamless log ingestion and centralized observability across S3-compatible cloud platforms.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import CollBegin from '../../../reuse/collection-should-begin-note.md';

<img src={useBaseUrl('img/send-data/krutrim-icon.png')} alt="Krutrim Object Storage icon" width="40"/>

Krutrim is a part of the Ola group’s AI computing stack, which provides S3-compatible object storage as part of its broader AI infrastructure and cloud platform.

Sumo Logic can collect and analyze logs from Krutrim Object Storage using the existing Amazon Web Services S3 Source, since Krutrim implements the standard S3 API. This allows reuse of the same connector logic, authentication model, and ingestion pipeline with only a custom endpoint configuration specific to Krutrim.

This integration enables how Sumo Logic extends its existing S3 ingestion capabilities to support Krutrim and other S3-compatible storage systems with minimal changes, enabling centralized observability across multiple cloud providers while maintaining consistent data collection and analytics.

## Why S3 compatibility matters

S3 compatibility enables seamless interoperability across storage providers by adhering to a common API standard. This provides several key advantages:

- **Portability**. Workloads can be migrated between storage providers without requiring code changes.
- **Tooling Compatibility**. Integrates with existing AWS SDKs, CLI, and widely used tools such as s3cmd, rclone, and restic.
- **Multi-cloud Flexibility**. Supports hybrid and multi-cloud architectures across public and private cloud environments.

## Supported ingestion behavior

- If you're editing the `Collection should begin` date on a Source the new date must be after the current `Collection should begin` date.

 :::note

 <CollBegin/>

 :::
- Sumo Logic uses a scan-based ingestion model for Krutrim Object Storage, periodically scanning configured buckets to detect new objects using their key and object ID, with no event-driven mechanisms required.
- Only new, previously unprocessed objects are ingested in full during each scan.
- Objects must be immutable after upload to ensure consistent ingestion behavior.
- If an object is overwritten or modified, it is treated as a new object and re-ingested.
- Appending or changing existing files may result in duplicate ingestion.
- Event-based ingestion (such as notifications or messaging systems) is not supported or required.

This ensures reliable and consistent ingestion without dependency on external event systems.

## Configure Krutrim Object Storage Source

1. Grant Sumo Logic access to the storage bucket. - add access link here
1. Ensure logs are being delivered to the Krutrim Object Storage bucket.
1. Identify or create a Hosted Collector in Sumo Logic.
    When you create a Krutrim Object Storage Source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).

## Create a Krutrim Object Storage Source

1. [**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic main menu select **Data Management**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**. <br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. 
1. On the **Collectors** page, click **Add Source** next to a Hosted Collector, either an existing Hosted Collector, or one you have created for this purpose.
1. Select **Krutrim Object Storage**.
1. Enter a name for the new Source. A description is optional.
1. (Optional) For **Source Category**, enter any string to tag the output collected from this Source. (Category metadata is stored in a searchable field called _sourceCategory.)

1. **Region**. Select the appropriate region:
    - Bangalore (ap-south-1)
    - Hyderabad (ap-south-1)
1. **Bucket Name**. Enter the exact bucket name from Krutrim Object Storage.
1. **Path Expression**. Enter the wildcard pattern that matches the Krutrim Object Storage objects you'd like to collect. You can use more than one wildcard (\*) in this string. Recursive path expressions use a multiple wildcard. Do **NOT** use a leading forward slash. [See About Amazon Path Expressions](amazon-path-expressions.md) for details.
1. **Collection should begin.** Set the collection start time to define historical ingestion range. You can either:
   * Choose a predefined value from dropdown list, ranging from "Now" to “72 hours ago” to “All Time”.
   * Enter a relative value. To enter a relative value, click the **Collection should begin** field and press the delete key on your keyboard to clear the field. Then, enter a relative time expression, for example `-1w`. You can define when you want collection to begin in terms of months (M), weeks (w), days (d), hours (h), and minutes (m).

    :::note
    If you paused the Source and want to skip some data when you resume, update the **Collection should begin** setting to a time after it was paused.
    :::

    :::note
    <CollBegin/>
    :::
1. (Optional) **Fields.** Click the **+Add Field** link to define the fields you want to associate, each field needs a name (key) and value.
   * <img src={useBaseUrl('img/reuse/green-check-circle.png')} alt="Green check circle" width="20"/> A green circle with a check mark is shown when the field exists and is enabled in the Fields table schema.
   * <img src={useBaseUrl('img/reuse/orange-exclamation-point.png')} alt="Orange exclamation point" width="20"/> An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, you'll see an option to automatically add or enable the nonexistent fields to the Fields table schema. If a field is sent to Sumo Logic but isn’t present or enabled in the schema, it’s ignored and marked as **Dropped**.
1. **Krutrim Access**. Enter the **Access ID** and **Secret Key.** See [AWS Access Key ID](https://docs.aws.amazon.com/STS/latest/UsingSTS/UsingTokens.html#RequestWithSTS) and [AWS Secret Access Key](https://aws.amazon.com/iam/) for details.
1. **Log File Discovery**. Configure the **Scan Interval** from the dropdown to periodically scan your Krutrim Object Storage for new items. **Automatic** is recommended to not incur additional charges.
1. When you are finished configuring the Source, click **Save**.
