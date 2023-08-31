---
id: cloud-trace
title: Google Cloud Trace
sidebar_label: Google Cloud Trace
description: Learn about the Sumo Logic collection process for the Google Cloud Trace service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/google/GoogleCloudTrace.png')} alt="Thumbnail icon" width="50"/>

Cloud Trace, a distributed tracing system for Google Cloud, helps you understand how long it takes your application to handle incoming requests from users or other applications, and how long it takes to complete operations like RPC calls performed when handling the requests. For more details, refer to the [GCP documentation](https://cloud.google.com/trace/docs/overview).

## Log types

* [Audit Logs](https://docs.aws.amazon.com/appflow/latest/userguide/appflow-cloudtrail-logs.html)

## Setup

You can collect the logs for Sumo Logic's Google Cloud Trace integration by following the below steps.

### Configure logs collection

* Collect **Audit Logs** using the [Google Cloud Platform source](/docs/send-data/hosted-collectors/google-source/google-cloud-platform-source). These Audit Logs can be accessed based on the [permissions and roles](https://cloud.google.com/trace/docs/audit-logging#audit_log_permissions). To enable logging for Google Trace, refer to [Google documentation](https://cloud.google.com/trace/docs/audit-logging#enabling_audit_logging). For more detail on Trace operations being audited, refer to [audited operations](https://cloud.google.com/trace/docs/audit-logging#audited_operations). While creating the sync in GCP, as part of the **Choose logs to include in sink** section, you can use the following query:
   ```sql
   (resource.type=audited_resource resource.labels.service=cloudtrace.googleapis.com)
   ```