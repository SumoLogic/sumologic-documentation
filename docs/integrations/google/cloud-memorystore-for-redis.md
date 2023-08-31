---
id: cloud-memorystore-for-redis
title: Google Cloud Memorystore for Redis
sidebar_label: Google Cloud Memorystore for Redis
description: Learn about the Sumo Logic collection process for the Google Cloud Memorystore for Redis service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/google/GoogleCloudMemorystoreforRedis.png')} alt="Thumbnail icon" width="50"/>

Memorystore for Redis is a fully managed service that is powered by the Redis in-memory data store, to build application caches that provide sub-millisecond data access. For more details, refer to the [GCP documentation](https://cloud.google.com/memorystore/docs/redis/redis-overview).

## Log and Metric types

* [Google Cloud Metrics](https://cloud.google.com/monitoring/api/metrics_gcp)
* [Platform Logs](https://docs.aws.amazon.com/appflow/latest/userguide/monitoring-cloudwatch.html)
* [Audit Logs](https://docs.aws.amazon.com/appflow/latest/userguide/appflow-cloudtrail-logs.html)

## Setup

You can collect the logs and metrics for Sumo Logic's Google Cloud Memorystore for Redis integration by following the below steps.

### Configure logs collection

* Collect **Audit Logs** using the [Google Cloud Platform source](/docs/send-data/hosted-collectors/google-source/google-cloud-platform-source). These Audit Logs can be accessed based on the [permissions and roles](https://cloud.google.com/memorystore/docs/redis/audit-logs#audit_log_permissions). To enable logging for Google Memorystore for Redis, refer to the [Google documentation](https://cloud.google.com/memorystore/docs/redis/audit-logs#enabling_audit_logging). For more detail on Memorystore for Redis operations being audited, refer to [audited operations](https://cloud.google.com/memorystore/docs/redis/audit-logs#audited_operations). While creating the sync in GCP, as part of the **Choose logs to include in sink** section, you can use the following query:
   ```sql
   (resource.type=audited_resource and resource.labels.service=redis.googleapis.com)
   ```
* Collect **Platform Logs** using the [Google Cloud Platform source](/docs/send-data/hosted-collectors/google-source/google-cloud-platform-source). Memorystore for Redis platform logs include logs related to Redis instance. While creating the sync in GCP, as part of the **Choose logs to include in sink** section, you can use the following query:
   ```sql
   (resource.type=redis_instance)
   ```

### Configure metrics collection

* Collect **GCP Metrics** using the [GCP Metric](/docs/send-data/hosted-collectors/google-source/gcp-metrics-source/) source. Under the **Services** dropdown, select **Cloud Memorystore for Redis**. For Google Memorystore for Redis metrics and dimensions, refer to [Google Memorystore for Redis metrics](https://cloud.google.com/monitoring/api/metrics_gcp#gcp-redis).
