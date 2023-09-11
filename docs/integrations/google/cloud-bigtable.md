---
id: cloud-bigtable
title: Google Cloud Bigtable
sidebar_label: Google Cloud Bigtable
description: Learn about the Sumo Logic collection process for the Google Cloud Bigtable service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/google/GoogleCloudBigtable.png')} alt="Thumbnail icon" width="50"/>

Bigtable is a fully managed wide-column and key-value NoSQL database service for large analytical and operational workloads. For more details, refer to the [GCP documentation](https://cloud.google.com/bigtable/docs/overview).

## Log and Metric types

* [Google Cloud Metrics](https://cloud.google.com/monitoring/api/metrics_gcp)
* [Platform Logs](https://docs.aws.amazon.com/appflow/latest/userguide/monitoring-cloudwatch.html)
* [Audit Logs](https://docs.aws.amazon.com/appflow/latest/userguide/appflow-cloudtrail-logs.html)

## Setup

You can collect the logs and metrics for Sumo Logic's Google Cloud Bigtable integration by following the below steps.

### Configure logs collection

* Collect **Audit Logs** using the [Google Cloud Platform source](/docs/send-data/hosted-collectors/google-source/google-cloud-platform-source). These Audit Logs can be accessed based on the [permissions and roles](https://cloud.google.com/bigtable/docs/audit-logging#audit_log_permissions). To enable logging for Google BigTable, refer to [Google documentation](https://cloud.google.com/bigtable/docs/audit-logging#enabling_audit_logging). For more detail on Bigtable operations being audited, refer to [audited operations](https://cloud.google.com/bigtable/docs/audit-logging#audited_operations). While creating the sync in GCP, as part of the **Choose logs to include in sink** section, you can use the following query:
   ```sql
   (resource.type=audited_resource and (resource.labels.service=bigtableadmin.googleapis.com or resource.labels.service=bigtable.googleapis.com))
   ```

  :::note
  Bigtable audit logs use the service name **bigtableadmin.googleapis.com** for admin operations and **bigtable.googleapis.com** for data operations.
  :::

* Collect **Platform Logs** using the [Google Cloud Platform source](/docs/send-data/hosted-collectors/google-source/google-cloud-platform-source). Bigtable platform logs include logs related to Bigtable instance, cluster, tables, and backup. While creating the sync in GCP, as part of the **Choose logs to include in sink** section, you can use the following query:
   ```sql
   (resource.type=bigtable_instance or bigtable_cluster or bigtable_table or bigtable_backup)
   ```

### Configure metrics collection

* Collect **GCP Metrics** using the [GCP Metric](/docs/send-data/hosted-collectors/google-source/gcp-metrics-source/) source. Under the **Services** dropdown, select **Bigtable**. For Google Bigtable metrics and dimensions, refer to [Google Bigtable metrics](https://cloud.google.com/monitoring/api/metrics_gcp#gcp-bigtable).
