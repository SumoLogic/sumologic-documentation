---
id: cloud-logging
title: Google Cloud Logging
sidebar_label: Google Cloud Logging
description: Learn about the Sumo Logic collection process for the Google Cloud Logging service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/google/GoogleCloudLogging.png')} alt="Thumbnail icon" width="50"/>

Cloud Logging is a real-time log-management system with storage, search, analysis, and monitoring support. Cloud Logging automatically collects logs from Google Cloud resources. For more details, refer to the [GCP documentation](https://cloud.google.com/logging/docs/overview)

## Log and Metric types

* [Google Cloud Metrics](https://cloud.google.com/monitoring/api/metrics_gcp)
* [Audit Logs](https://docs.aws.amazon.com/appflow/latest/userguide/appflow-cloudtrail-logs.html)

## Setup

You can collect the logs and metrics for Sumo Logic's Google Cloud Logging integration by following the below steps.

### Configure logs collection

* Collect **Audit Logs** using [Google Cloud Platform source](/docs/send-data/hosted-collectors/google-source/google-cloud-platform-source). Refer to the [permissions and roles](https://cloud.google.com/logging/docs/audit-logging#audit_log_permissions) required for accessing audit logs. To enable logging for Google Logging refer to [Google documentation](https://cloud.google.com/logging/docs/audit-logging#enabling_audit_logging). For more detail, on Logging operations being audited refer to [audited operations](https://cloud.google.com/logging/docs/audit-logging#audited_operations). While creating the sync in GCP, as part of the **Choose logs to include in sink** section you can use the following query:
   ```sql
   (resource.type=(logging_bucket or logging_exclusion or logging_log or logging_sink ))
   ```

### Configure metrics collection

* Collect **GCP Metrics** using the [GCP Metric](/docs/send-data/hosted-collectors/google-source/gcp-metrics-source/) source. Note that in the Services dropdown, you'll need to select **Cloud Logging**. For Google Logging metrics and dimensions, refer to [Google Logging metrics](https://cloud.google.com/monitoring/api/metrics_gcp#gcp-logging).