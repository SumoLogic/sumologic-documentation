---
id: cloud-pub-sub
title: Google Cloud Pub Sub
sidebar_label: Google Cloud Pub Sub
description: Learn about the Sumo Logic collection process for the Google Cloud Pub Sub service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/google/GooglePubSub.png')} alt="Thumbnail icon" width="50"/>

Pub/Sub is an asynchronous and scalable messaging service that decouples services producing messages from services processing those messages. For more details, refer to the [GCP documentation](https://cloud.google.com/pubsub/docs/overview).

## Log and Metric types

* [Google Cloud Metrics](https://cloud.google.com/monitoring/api/metrics_gcp)
* [Audit Logs](https://docs.aws.amazon.com/appflow/latest/userguide/appflow-cloudtrail-logs.html)

## Setup

You can collect the logs and metrics for Sumo Logic's Google Cloud PubSub integration by following the below steps.

### Configure logs collection

* Collect **Audit Logs** using the [Google Cloud Platform source](/docs/send-data/hosted-collectors/google-source/google-cloud-platform-source). These Audit Logs can be accessed based on the [permissions and roles](https://cloud.google.com/pubsub/docs/audit-logging#audit_log_permissions). To enable logging for Google PubSub, refer to [Google documentation](https://cloud.google.com/pubsub/docs/audit-logging#enabling_audit_logging). For more detail on PubSub operations being audited, refer to [audited operations](https://cloud.google.com/pubsub/docs/audit-logging#audited_operations). While creating the sync in GCP, as part of the **Choose logs to include in sink** section, you can use the following query:
   ```sql
   (resource.type=(pubsub_snapshot or pubsub_subscription or pubsub_topic))
   ```

### Configure metrics collection

* Collect **GCP Metrics** using the [GCP Metric](/docs/send-data/hosted-collectors/google-source/gcp-metrics-source/) source. Under the **Services** dropdown, select **Pub/Sub**. For Google PubSub metrics and dimensions, refer to [Google PubSub metrics](https://cloud.google.com/monitoring/api/metrics_gcp#gcp-pubsub).
