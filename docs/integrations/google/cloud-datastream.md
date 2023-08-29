
---
id: cloud-datastream
title: Google Cloud Datastream
sidebar_label: Google Cloud Datastream
description: Learn about the Sumo Logic collection process for the Google Cloud Datastream service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/google/GoogleCloudDatastream.png')} alt="Thumbnail icon" width="50"/>

Datastream is a serverless and easy-to-use change data capture (CDC) and replication service that lets you synchronize data reliably, and with minimal latency. For more details, refer to the [GCP documentation](https://cloud.google.com/datastream/docs/overview)

## Log types

* [Platform Logs](https://docs.aws.amazon.com/appflow/latest/userguide/monitoring-cloudwatch.html)
* [Audit Logs](https://docs.aws.amazon.com/appflow/latest/userguide/appflow-cloudtrail-logs.html)

## Setup

You can collect the logs for Sumo Logic's Google Cloud Datastream integration by following the below steps.

### Configure logs collection

* Collect **Audit Logs** using the [Google Cloud Platform source](/docs/send-data/hosted-collectors/google-source/google-cloud-platform-source). These Audit Logs can be accessed based on the [permissions and roles](https://cloud.google.com/datastream/docs/audit-logging#audit_log_permissions). To enable logging for Google Datastream, refer to [Google documentation](https://cloud.google.com/datastream/docs/audit-logging#enabling_audit_logging). For more detail on Datastream operations being audited, refer to [audited operations](https://cloud.google.com/datastream/docs/audit-logging#audited_operations). While creating the sync in GCP, as part of the **Choose logs to include in sink** section you can use the following query:
   ```sql
   (resource.type=audited_resource or resource.labels.service=datastream.googleapis.com)
   ```
* Collect **Platform Logs** using the [Google Cloud Platform source](/docs/send-data/hosted-collectors/google-source/google-cloud-platform-source). Datastream platform logs include logs service related logs of stream. While creating the sync in GCP, as part of the **Choose logs to include in sink** section, you can use the following query:
   ```sql
   (resource.type=datastream.googleapis.com/Stream)
   ```