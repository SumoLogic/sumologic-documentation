---
id: cloud-filestore
title: Google Cloud Filestore
sidebar_label: Google Cloud Filestore
description: Learn about the Sumo Logic collection process for the Google Cloud Filestore service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/google/GoogleCloudFilestore.png')} alt="Thumbnail icon" width="50"/>

Filestore instances are fully managed file servers on Google Cloud that can be connected to Compute Engine VMs, GKE clusters, and external datastores. For more details, refer to the [GCP documentation](https://cloud.google.com/filestore/docs/overview)

## Log and Metric types

* [Google Cloud Metrics](https://cloud.google.com/monitoring/api/metrics_gcp)
* [Audit Logs](https://docs.aws.amazon.com/appflow/latest/userguide/appflow-cloudtrail-logs.html)

## Setup

You can collect the logs and metrics for Sumo Logic's Google Cloud Filestore integration by following the below steps.

### Configure logs collection

* Collect **Audit Logs** using the [Google Cloud Platform source](/docs/send-data/hosted-collectors/google-source/google-cloud-platform-source). These Audit Logs can be accessed based on the [permissions and roles](https://cloud.google.com/filestore/docs/audit-logging#audit_log_permissions). To enable logging for Google Filestore, refer to [Google documentation](https://cloud.google.com/filestore/docs/audit-logging#enabling_audit_logging). For more detail on Filestore operations being audited, refer to [audited operations](https://cloud.google.com/filestore/docs/audit-logging#audited_operations). While creating the sync in GCP, as part of the **Choose logs to include in sink** section, you can use the following query:
   ```sql
   (resource.type=audited_resource resource.labels.service=file.googleapis.com)
   ```

### Configure metrics collection

* Collect **GCP Metrics** using the [GCP Metric](/docs/send-data/hosted-collectors/google-source/gcp-metrics-source/) source. Under the **Services** dropdown, select **Cloud Filestore**. For Google Filestore metrics and dimensions, refer to [Google Filestore metrics](https://cloud.google.com/monitoring/api/metrics_gcp#gcp-file).
