---
id: log-ingestion
title: Log Ingestion
description: When designing your deployment, consider how logs will be ingested across Collectors in your account. 
---

import useBaseUrl from '@docusaurus/useBaseUrl';

The rate of data creation is rarely constant. Whether your organization sees seasonal spikes, or if a new feature or product line produces huge increases in activity, Sumo Logic meets the needs of your organization, known or unknown, while maintaining the search performance you rely on.

When designing your deployment, it’s important to consider how logs will be ingested across Collectors in your account.

:::tip
[Ingest budgets](/docs/manage/ingestion-volume/ingest-budgets) can limit your ingestion volume.
:::

## Account caps for storage and ingestion

Sumo Logic imposes account caps on uploads to better protect your account from using On-Demand Capacity.

* Storage usage is calculated by taking the average of your total storage usage in the current billing cycle. For example, if your storage limit is 500TB, you will be charged for extra on-demand storage only if the average of your total storage for the month exceeds 500TB at the end of your billing cycle, or if there is an excessive spike in usage (see the next bullet item).
* Storage usage can exceed between 4 times to 10 times the daily maximum (depending on account size). Even if the cap is exceeded, log data is kept safely at the Collector level until quota is made available, at which time the data is ingested. 

Log data may not be kept when sent via HTTP Sources or Cloud Syslog Sources, as they may not have the caching and retry mechanisms that are built into Sumo Logic Collectors.

* Ingestion rate is calculated by taking the average of your daily ingestion rate in the current billing cycle. For example, if your contracted daily ingestion rate is 100GB, you will be charged for on-demand usage only if average daily ingestion is more than 100GB at the end of your billing cycle.
* Sumo Logic free accounts can expect slightly different behavior. If a Sumo Logic Free account regularly exceeds the cap, the account is temporarily disabled until quota becomes available (or until the account is upgraded).
* Sumo Logic accounts can be upgraded at any time to allow for additional quota. Contact [Sumo Logic Sales](mailto:sales@sumologic.com) to customize your account to meet your organization's needs.

:::important
Compressed files are decompressed before they are ingested, so they are ingested at the decompressed file size rate.
:::

## Log Throttling

Part of managing spikes in activity is properly slowing the rate of ingestion while the demand is at its peak, known as throttling. (This section pertains to logs. For metrics, see [Metrics Throttling](../../metrics/manage-metric-volume/metric-throttling.md)).

:::note
All accounts are subject to throttling, regardless of plan type (Cloud Flex or Cloud Flex Credits) or [Data Tier](/docs/manage/partitions-data-tiers).
:::

Watch this micro lesson to learn more about throttling.

<Iframe url="https://www.youtube.com/embed/dlKy9DyS0W8?rel=0"
     width="854px"
     height="480px"
     id="myId"
     className="video-container"
     display="initial"
     position="relative"
     allow="accelerometer; autoplay=1; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
     allowfullscreen
     />

import Iframe from 'react-iframe';

Throttling is enabled across all Collectors in an account. Sumo Logic measures the amount of data already committed to uploading against the number of previous requests and available resources (quota) in an account. In other words, Sumo Logic compares the current ingestion with the rate of ingest using a per minute rate that can be derived from the contracted Daily GB/day rate.

:::important
Throttling is not related to the monthly quota for an account. An account can be throttled when it exceeds the multiplier of the per-minute ingestion rate while being well within the monthly ingestion quota.
:::

Throttling is in place to protect both our customers and Sumo Logic from sudden and unexpectedly large increases in volume, which could result in your account using On-Demand Capacity, as well as ingest performance problems on the service side.

The multiplier for the per day average ingestion total varies based on the account size. 

| Account Size - Daily Average | Multiplier |
|:--|:--|
| Less than or equal to 100GB per day. | 10x |
| Greater than 100GB per day and less than or equal to 256GB per day.  | 8x |
| Greater than 256GB per day and less than or equal to 512 GB per day. | 6x |
| Greater than 512GB per day. | 4x |

To provide an example with a 10GB per day account, the average per minute rate is \~7.1 MB (10 GB/24h/60m). Throttling kicks in when the rate of ingestion exceeds a multiplier (4-10x with the 10x multiplier for smaller accounts and the 4x multiplier for bigger accounts) of the per minute rate. For example, the multiplier in the 10GB per day account would be 10x and throttling would be triggered when the per minute ingestion rate exceeds 71.11MB per minute. 

## How does throttling affect ingestion?

In the case of Installed Collectors with a Local File Source and S3 Hosted Collectors, Sumo Logic instructs the Collector (Installed or Hosted) on the quota limit, and tells it to delay ingestion until the quota is available. As a result, users will be unable to search for current data when throttling is happening, since the rate of uploads may be slowed from local or S3 hosted collectors but there is no dropping of ingested data. Unfortunately, we do not have the same ability with the sending of data for HTTP sources and endpoints. Any HTTP sources will get a response to any post requests with a "429 - Too Many Requests" message. When this occurs, the sending client would then be responsible for retrying to send that data as quota becomes available.

In the case of [Cloud Syslog Sources](/docs/send-data/hosted-collectors/cloud-syslog-source), similar to HTTP sources, incoming data will be dropped since the Cloud Syslog functions as a listener and cannot even return the 429 error.

Throttling also prevents one Collector from uploading more data than others to the point where all data is being ingested from one Collector.

When a collector is experiencing throttling, the throttling slows the rate at which the collector uploads data. If the upload rate is slower than the rate at which data is generated, then the collector will automatically queue the excess data on disk. When the quota becomes available, the queued data will be uploaded.

## How do I know which Collector is contributing to excess ingestion?

You can use the [Data Volume Index](/docs/manage/ingestion-volume/data-volume-index) and the [Data Volume App](/docs/integrations/sumo-apps/data-volume) to help determine the ingestion per Collector, Source, Source Category, View, or Partition.

## How can I be alerted when throttling takes place?

If the audit index is enabled you can set up a scheduled search to send an alert when throttling occurs. For more information, see [Audit Index](../security/audit-index.md).  

## Ingestion with file changes

When a file is updated, the way it is ingested depends on the type of Collector:

* For Installed Collectors, Sumo Logic can ingest only the new data. For example, if Sumo Logic ingests a log file with 25 lines, and then additional messages are added to the file, the next ingestion will start at line 26.
* For Hosted Collectors with S3 Sources, an ingested file is treated as a single object and is not expected to be updated or appended with new data. If an existing file is updated in any way, it is considered to be a new object and is ingested again in full. Updating existing objects in S3 Sources can result in duplicate messages, depending on the nature of the update.
* Treatment of Hosted Collectors with other Source types is based on customer configuration.
