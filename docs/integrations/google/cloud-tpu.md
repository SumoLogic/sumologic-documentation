---
id: cloud-tpu
title: Google Cloud TPU
sidebar_label: Google Cloud TPU
description: Learn about the Sumo Logic collection process for the Google Cloud TPU service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/google/GoogleCloudTPU.png')} alt="Thumbnail icon" width="50"/>

Tensor Processing Units (TPUs) are Google's custom-developed application-specific integrated circuits (ASICs) used to accelerate machine learning workloads.  For more details, refer to the [GCP documentation](https://cloud.google.com/tpu/docs/intro-to-tpu)

## Log and Metric types

* [Google Cloud Metrics](https://cloud.google.com/monitoring/api/metrics_gcp)
* [Platform Logs](https://docs.aws.amazon.com/appflow/latest/userguide/monitoring-cloudwatch.html)
* [Audit Logs](https://docs.aws.amazon.com/appflow/latest/userguide/appflow-cloudtrail-logs.html)

## Setup

You can collect the logs and metrics for Sumo Logic's Google Cloud TPU integration by following the below steps.

### Configure logs collection

* Collect **Audit Logs** using [Google Cloud Platform source](/docs/send-data/hosted-collectors/google-source/google-cloud-platform-source). Refer to the [permissions and roles](https://cloud.google.com/tpu/docs/audit-logs#audit_log_permissions) required for accessing audit logs. To enable logging for Google TPU refer to [Google documentation](https://cloud.google.com/tpu/docs/audit-logs#enabling_audit_logging). For more detail, on TPU operations being audited refer to [audited operations](https://cloud.google.com/tpu/docs/audit-logs#audited_operations). While creating the sync in GCP, as part of the **Choose logs to include in sink** section you can use the following query:
   ```sql
   (resource.type=audited_resource resource.labels.service=tpu.googleapis.com)
   ```

* Collect **Platform Logs** using [Google Cloud Platform source](/docs/send-data/hosted-collectors/google-source/google-cloud-platform-source). Cloud TPU Worker logs contain information about a specific Cloud TPU worker in a specific zone, for example the amount of memory available on the Cloud TPU worker (system_available_memory_GiB). While creating the sync in GCP, as part of the **Choose logs to include in sink** section, you can use the following query:
   ```sql
   (resource.type=tpu_worker)
   ```

### Configure metrics collection

* Collect **GCP Metrics** using the [GCP Metric](/docs/send-data/hosted-collectors/google-source/gcp-metrics-source/) source. Note that in the Services dropdown, you'll need to select **Cloud TPU**. For Google Cloud TPU metrics and dimensions, refer to [Google Cloud TPU metrics](https://cloud.google.com/monitoring/api/metrics_gcp#gcp-tpu).