---
id: cloud-run
title: Google Cloud Run
sidebar_label: Google Cloud Run
description: Learn about the Sumo Logic collection process for the Google Cloud Run service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/google/GoogleCloudRun.png')} alt="Thumbnail icon" width="50"/>

Cloud Run is a managed compute platform that lets you run containers directly on top of Google's scalable infrastructure. For more details, refer to the [GCP documentation](https://cloud.google.com/run/docs/overview/what-is-cloud-run)

## Log and Metric types

* [Google Cloud Metrics](https://cloud.google.com/monitoring/api/metrics_gcp)
* [Platform Logs](https://docs.aws.amazon.com/appflow/latest/userguide/monitoring-cloudwatch.html)
* [Audit Logs](https://docs.aws.amazon.com/appflow/latest/userguide/appflow-cloudtrail-logs.html)

## Setup

You can collect the logs and metrics for Sumo Logic's Google Cloud Run integration by following the below steps.

### Configure logs collection

* Collect **Audit Logs** using [Google Cloud Platform source](/docs/send-data/hosted-collectors/google-source/google-cloud-platform-source). Refer to the [permissions and roles](https://cloud.google.com/run/docs/audit-logging#audit_log_permissions) required for accessing audit logs. To enable logging for Google Run refer to [Google documentation](https://cloud.google.com/logging/docs/audit/configure-data-access). For more detail, on Run operations being audited refer to [audited operations](https://cloud.google.com/run/docs/audit-logging#audited_operations). While creating the sync in GCP, as part of the **Choose logs to include in sink** section you can use the following query:
   ```sql
   (resource.type=audited_resource resource.labels.service=run.googleapis.com)
   ```

* Collect **Platform Logs** using [Google Cloud Platform source](/docs/send-data/hosted-collectors/google-source/google-cloud-platform-source). Cloud Run Logs are send to Cloud Logging and are enabled by default. These logs include information around : 
    - **Request logs (services only)**: logs of requests sent to Cloud Run services. These logs are created automatically.
    - **Container logs (services and jobs)**: logs emitted from the instances, typically from your own code, written to supported locations as described in [Writing container logs](https://cloud.google.com/run/docs/logging#container-logs). 

 While creating the sync in GCP, as part of the **Choose logs to include in sink** section, you can use the following query:
   ```sql
   (resource.type=(cloud_run_job or cloud_run_revision))
   ```

### Configure metrics collection

* Collect **GCP Metrics** using the [GCP Metric](/docs/send-data/hosted-collectors/google-source/gcp-metrics-source/) source. Note that in the Services dropdown, you'll need to select **Cloud Run**. For Google Cloud Run metrics and dimensions, refer to [Google Cloud Run metrics](https://cloud.google.com/monitoring/api/metrics_gcp#gcp-run).