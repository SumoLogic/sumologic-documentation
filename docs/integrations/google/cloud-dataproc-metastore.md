
---
id: cloud-dataproc-metastore
title: Google Cloud Dataproc Metastore
sidebar_label: Google Cloud Dataproc Metastore
description: Learn about the Sumo Logic collection process for the Google Cloud Dataproc Metastore service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/google/GoogleCloudDataprocMetastore.png')} alt="Thumbnail icon" width="50"/>


Dataproc Metastore is a fully managed, highly available, autohealing, serverless, Apache Hive metastore (HMS) that runs on Google Cloud.  For more details, refer to the [GCP documentation](https://cloud.google.com/dataproc-metastore/docs/overview)

## Log types

* [Platform Logs](https://docs.aws.amazon.com/appflow/latest/userguide/monitoring-cloudwatch.html)
* [Audit Logs](https://docs.aws.amazon.com/appflow/latest/userguide/appflow-cloudtrail-logs.html)

## Setup
You can collect the logs for Sumo Logic's Google Cloud Dataproc Metastore integration by following the below steps.

### Configure logs collection

* Collect **Audit Logs** using [Google Cloud Platform source](/docs/send-data/hosted-collectors/google-source/google-cloud-platform-source). Refer to the [permissions and roles](https://cloud.google.com/dataproc-metastore/docs/audit-logging#audit_log_permissions) required for accessing audit logs. To enable logging for Google Dataproc Metastore refer to [Google documentation](https://cloud.google.com/dataproc-metastore/docs/audit-logging#enabling_audit_logging). For more detail, on Dataproc Metastore operations being audited refer to [audited operations](https://cloud.google.com/dataproc-metastore/docs/audit-logging#audited_operations). While creating the sync in GCP, as part of the **Choose logs to include in sink** section you can use the following query:
   ```sql
   (resource.type=audited_resource and resource.labels.service=metastore.googleapis.com)
   ```
* Collect **Platform Logs** using [Google Cloud Platform source](/docs/send-data/hosted-collectors/google-source/google-cloud-platform-source). Platform logs include serevice logs and [Metadata federation](https://cloud.google.com/dataproc-metastore/docs/hms-federation). While creating the sync in GCP, as part of the **Choose logs to include in sink** section, you can use the following query:
   ```sql
   resource.type=metastore.googleapis.com/Service or metastore.googleapis.com/Federation
   ```