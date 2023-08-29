
---
id: cloud-firestore
title: Google Cloud Firestore
sidebar_label: Google Cloud Firestore
description: Learn about the Sumo Logic collection process for the Google Cloud Firestore service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/google/GoogleCloudFireStore.png')} alt="Thumbnail icon" width="50"/>

Firestore is a NoSQL document database built for automatic scaling, high performance, and ease of application development. For more details, refer to the [GCP documentation](https://cloud.google.com/firestore/docs)

## Log and Metric types

* [Google Cloud Metrics](https://cloud.google.com/monitoring/api/metrics_gcp)
* [Platform Logs](https://docs.aws.amazon.com/appflow/latest/userguide/monitoring-cloudwatch.html)
* [Audit Logs](https://docs.aws.amazon.com/appflow/latest/userguide/appflow-cloudtrail-logs.html)

## Setup

You can collect the logs and metrics for Sumo Logic's Google Cloud Firestore integration by following the below steps.

### Configure logs collection

* Collect **Audit Logs** using [Google Cloud Platform source](/docs/send-data/hosted-collectors/google-source/google-cloud-platform-source). Refer to the [permissions and roles](https://cloud.google.com/firestore/docs/audit-logging#audit_log_permissions) required for accessing audit logs. To enable logging for Google Firestore refer to [Google documentation](https://cloud.google.com/firestore/docs/audit-logging#enabling_audit_logging). For more detail, on Firestore operations being audited refer to [audited operations](https://cloud.google.com/firestore/docs/audit-logging#audited_operations). While creating the sync in GCP, as part of the **Choose logs to include in sink** section you can use the following query:
   ```sql
   (resource.type=(datastore_database or datastore_index))
   ```

* Collect **Platform Logs** using [Google Cloud Platform source](/docs/send-data/hosted-collectors/google-source/google-cloud-platform-source). Firestore platform logs include logs related to firestore database and firestore index. Query to get these logs is same to that of Audit logs for Firestore.

### Configure metrics collection

* Collect **GCP Metrics** using the [GCP Metric](/docs/send-data/hosted-collectors/google-source/gcp-metrics-source/) source. Note that in the Services dropdown, you'll need to select **Cloud Firestore**. For Google Firestore metrics and dimensions, refer to [Google Firestore metrics](https://cloud.google.com/monitoring/api/metrics_gcp#gcp-firestore).