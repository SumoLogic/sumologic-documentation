---
id: cloud-spanner
title: Google Cloud Spanner
sidebar_label: Google Cloud Spanner
description: Learn about the Sumo Logic collection process for the Google Cloud Spanner service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/google/GoogleCloudSpanner.png')} alt="Thumbnail icon" width="50"/>

Cloud Spanner is a fully managed, mission-critical, relational database service that offers transactional consistency at global scale, automatic, synchronous replication for high availability, and support for two SQL dialects: GoogleSQL (ANSI 2011 with extensions) and PostgreSQL. For more details, refer to the [GCP documentation](https://cloud.google.com/spanner/docs#docs).

## Log and Metric types

* [Google Cloud Metrics](https://cloud.google.com/monitoring/api/metrics_gcp)
* [Audit Logs](https://docs.aws.amazon.com/appflow/latest/userguide/appflow-cloudtrail-logs.html)

## Setup

You can collect the logs and metrics for Sumo Logic's Google Cloud Spanner integration by following the below steps.

### Configure logs collection

* Collect **Audit Logs** using [Google Cloud Platform source](/docs/send-data/hosted-collectors/google-source/google-cloud-platform-source). These Audit Logs can be accessed based on the [permissions and roles](https://cloud.google.com/spanner/docs/audit-logging#audit_log_permissions). To enable logging for Google Spanner, refer to [Google documentation](https://cloud.google.com/spanner/docs/audit-logging#enabling_audit_logging). For more detail on Spanner operations being audited, refer to [audited operations](https://cloud.google.com/spanner/docs/audit-logging#audited_operations). While creating the sync in GCP, as part of the **Choose logs to include in sink** section you can use the following query:
   ```sql
   (resource.type=spanner_instance)
   ```

### Configure metrics collection

* Collect **GCP Metrics** using the [GCP Metric](/docs/send-data/hosted-collectors/google-source/gcp-metrics-source/) source. Make sure that you select **Spanner** from the **Services** dropdown. For Google Spanner metrics and dimensions, refer to [Google Spanner metrics](https://cloud.google.com/monitoring/api/metrics_gcp#gcp-spanner).