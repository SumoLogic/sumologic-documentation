---
id: metric-throttling
title: Metric Throttling
sidebar_label: Metric Throttling
description: Information about how Sumo throttles metric when your metrics ingestion exceeds your data points per minute (DPM)  burst limit.
---

Metric data volume is measured in Data Points per Minute (DPM). The **Account Page** in the Sumo web app shows the DPM limit for your account and your average daily DPM for the current billing period.

To allow for spikes in metrics ingestion, Sumo applies a multiplier to your DPM limit to allow you to send metrics at a higher rate, referred to as your burst rate, before Sumo starts to throttle your sources.

:::note
All accounts are subject to throttling, regardless of plan type (Cloud Flex or Cloud Flex Credits) or Data Tier.
:::

The multiplier depends on your daily DPM account limit.   

| DPM Limit | DPM Burst Limit |
|:--|:--|
| Less than or equal to 10K | 5 x DPM Limit |
| Greater than 10K and less than or equal to 50K  | 4 x DPM Limit |
| Greater than 50K and less than or equal to 100K | 3 x DPM Limit |
| Greater than 100K | 2 x DPM Limit |

For example, if your daily DPM limit is 5,000 DPM, your ingest rate can increase to 25,000 DPM before Sumo starts to throttle your metric sources.  

When you exceed your DPM burst limit, Sumo throttles your metric sources—your ingestion will be slowed down until the rate of ingestion is within the allowable contracted limits.

Throttling of metric sources has no effect on log sources.

Metric throttling behavior varies by source type:

* **Installed collector with host metrics source**. Up to 1GB of compressed metrics data is cached on the host. After 1GB of compressed data is reached on disk, older data is evicted (dropped) to make room for new data. For information about changing the size of the cache, see Configure Limits for Collector Caching.
* **Hosted collector with HTTP source**. When hosted collectors in your account are sending metric data at a combined rate that is over the burst rate for your account, additional requests will receive a 429 Rate Limit Exceeded response code and the data will not be ingested and will be dropped. Note that when an HTTP source is throttled, if the client sending the metrics cannot buffer or retry the upload, metrics will be dropped.
* **Hosted collector with AWS CloudWatch source**. For the AWS CloudWatch source there are two places throttling can happen:

  * **AWS throttling**. AWS automatically throttles CloudWatch data if the limits that Amazon sets for the associated APIs are exceeded. If you have a high volume of metrics data points in your account, it is likely that Amazon will throttle your CloudWatch data. If no adjustments are made on the Sumo Logic     side, throttling on the Amazon side can cause metrics data to be dropped. To prevent this from occurring, Sumo Logic automatically doubles the CloudWatch scan interval if more than one throttling message is received in a single interval. Sumo will poll CloudWatch metrics less frequently until AWS throttling subsides.
  * **Sumo Logic throttling**. Sumo Logic may throttle your ingest if you exceed the DPM Burst Limits defined above. In case of Sumo Logic throttling, data will be dropped if you are throttled for more than 5 minutes.
