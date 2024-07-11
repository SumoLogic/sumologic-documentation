---
id: cloud-datastore
title: Google Cloud Datastore
sidebar_label: Google Cloud Datastore
description: Learn about the Sumo Logic collection process for the Google Cloud Datastore service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/google/GoogleCloudDatastore.png')} alt="Thumbnail icon" width="50"/>

Datastore is a highly scalable NoSQL database for your web and mobile applications. For more details, refer to the [GCP documentation](https://cloud.google.com/datastore/docs)

## Log and metric types

* [Google Cloud Metrics](https://cloud.google.com/monitoring/api/metrics_gcp)
* [Platform Logs](https://docs.aws.amazon.com/appflow/latest/userguide/monitoring-cloudwatch.html)
* [Audit Logs](https://docs.aws.amazon.com/appflow/latest/userguide/appflow-cloudtrail-logs.html)

## Setup

You can collect the logs and metrics for Sumo Logic's Google Cloud Datastore integration by following the below steps.

### Configure logs collection

* Collect **Audit Logs** using the [Google Cloud Platform source](/docs/send-data/hosted-collectors/google-source/google-cloud-platform-source). These Audit Logs can be accessed based on the [permissions and roles](https://cloud.google.com/datastore/docs/audit-logging#audit_log_permissions) required for accessing audit logs. To enable logging for Google Datastore, refer to [Google documentation](https://cloud.google.com/datastore/docs/audit-logging#enabling_audit_logging). For more detail on Datastore operations being audited, refer to [audited operations](https://cloud.google.com/datastore/docs/audit-logging#audited_operations). While creating the sync in GCP, as part of the **Choose logs to include in sink** section, you can use the following query:
   ```sql
   resource.type=(datastore_database OR datastore_index)
   ```

* Collect **Platform Logs** using the [Google Cloud Platform source](/docs/send-data/hosted-collectors/google-source/google-cloud-platform-source). Datastore platform logs include logs related to datastore database and datastore index. Query to get these logs is same to that of Audit logs for Datastore.

### Configure metrics collection

* Collect **GCP Metrics** using the [GCP Metric](/docs/send-data/hosted-collectors/google-source/gcp-metrics-source/) source. Under the **Services** dropdown, select **Datastore**. For Google Datastore metrics and dimensions, refer to [Google Datastore metrics](https://cloud.google.com/monitoring/api/metrics_gcp#gcp-datastore).
