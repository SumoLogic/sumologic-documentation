
---
id: cloud-dataproc
title: Google Cloud Dataproc
sidebar_label: Google Cloud Dataproc
description: Learn about the Sumo Logic collection process for the Google Cloud Dataproc service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/google/GoogleCloudDataproc.png')} alt="Thumbnail icon" width="50"/>

Dataproc is a managed Spark and Hadoop service that lets you take advantage of open source data tools for batch processing, querying, streaming, and machine learning. For more details, refer to the [GCP documentation](https://cloud.google.com/dataproc/docs/how-to)

## Log and Metric types

* [Google Cloud Metrics](https://cloud.google.com/monitoring/api/metrics_gcp)
* [Platform Logs](https://docs.aws.amazon.com/appflow/latest/userguide/monitoring-cloudwatch.html)
* [Audit Logs](https://docs.aws.amazon.com/appflow/latest/userguide/appflow-cloudtrail-logs.html)

## Setup

You can collect the logs and metrics for Sumo Logic's Google Cloud Dataproc integration by following the below steps.

### Configure logs collection

* Collect **Audit Logs** using [Google Cloud Platform source](/docs/send-data/hosted-collectors/google-source/google-cloud-platform-source). Refer to the [permissions and roles](https://cloud.google.com/dataproc/docs/guides/audit-logging#audit_log_permissions) required for accessing audit logs. To enable logging for Google Dataproc refer to [Google documentation](https://cloud.google.com/dataproc/docs/guides/audit-logging#enabling_audit_logging). For more detail, on Dataproc operations being audited refer to [audited operations](https://cloud.google.com/dataproc/docs/guides/audit-logging#audited_operations). While creating the sync in GCP, as part of the **Choose logs to include in sink** section you can use the following query:
   ```sql
   (resource.type=audited_resource resource.labels.service=dataproc.googleapis.com)
   ```

* Collect **Platform Logs** using [Google Cloud Platform source](/docs/send-data/hosted-collectors/google-source/google-cloud-platform-source). Dataproc platform logs include job logs and cluster logs. [Here](https://cloud.google.com/dataproc/docs/guides/logging#permissions) are the permissions required to access job and cluster logs. While creating the sync in GCP, as part of the **Choose logs to include in sink** section, you can use the following query:
   ```sql
   (resource.type=(cloud_dataproc_cluster or cloud_dataproc_job))
   ```

### Configure metrics collection

* Collect **GCP Metrics** using the [GCP Metric](/docs/send-data/hosted-collectors/google-source/gcp-metrics-source/) source. Note that in the Services dropdown, you'll need to select **Cloud Dataproc**. For Google Dataproc metrics and dimensions, refer to [Google Dataproc metrics](https://cloud.google.com/monitoring/api/metrics_gcp#gcp-dataproc).