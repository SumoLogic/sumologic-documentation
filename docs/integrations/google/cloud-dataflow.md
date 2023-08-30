---
id: cloud-dataflow
title: Google Cloud Dataflow
sidebar_label: Google Cloud Dataflow
description: Learn about the Sumo Logic collection process for the Google Cloud Dataflow service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/google/GoogleCloudDataflow.png')} alt="Thumbnail icon" width="50"/>

Dataflow is a managed service for executing a wide variety of data processing patterns. For more details, refer to the [GCP documentation](https://cloud.google.com/dataflow/docs)

## Log types

* [Platform Logs](https://docs.aws.amazon.com/appflow/latest/userguide/monitoring-cloudwatch.html)
* [Audit Logs](https://docs.aws.amazon.com/appflow/latest/userguide/appflow-cloudtrail-logs.html)

## Setup

You can collect the logs for Sumo Logic's Google Cloud Dataflow integration by following the below steps.

### Configure logs collection

* Collect **Audit Logs** using the [Google Cloud Platform source](/docs/send-data/hosted-collectors/google-source/google-cloud-platform-source). These Audit Logs can be accessed based on the [permissions and roles](https://cloud.google.com/dataflow/docs/audit-logging#audit_log_permissions). To enable logging for Google Dataflow, refer to [Google documentation](https://cloud.google.com/dataflow/docs/audit-logging#enabling_audit_loggin). For more detail on Dataflow operations being audited, refer to [audited operations](https://cloud.google.com/dataflow/docs/audit-logging#audited_operations). While creating the sync in GCP, as part of the **Choose logs to include in sink** section you can use the following query:
   ```sql
   (resource.type=audited_resource and resource.labels.service=datapipelines.googleapis.com)
   ```

* Collect **Platform Logs** using the [Google Cloud Platform source](/docs/send-data/hosted-collectors/google-source/google-cloud-platform-source). [Here](https://cloud.google.com/dataflow/docs/guides/logging#log-types) are the log types collected as pipeline logs. By default, only log lines marked INFO and higher will be sent to Cloud Logging. While creating the sync in GCP, as part of the **Choose logs to include in sink** section, you can use the following query:
   ```sql
   (resource.type=dataflow_step )
   ```