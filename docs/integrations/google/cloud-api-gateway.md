
---
id: cloud-api-gateway
title: Google Cloud API Gateway
sidebar_label: Google Cloud API Gateway
description: Learn about the Sumo Logic collection process for the Google Cloud API Gateway service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/google/GoogleCloudAPIGateway.png')} alt="Thumbnail icon" width="50"/>

With API Gateway, you can create, secure, and monitor APIs for Google Cloud serverless back ends, including Cloud Functions, Cloud Run, and App Engine. For more details, refer to the [GCP documentation](https://cloud.google.com/api-gateway/docs/how-to).

## Log types

* [Platform Logs](https://docs.aws.amazon.com/appflow/latest/userguide/monitoring-cloudwatch.html)
* [Audit Logs](https://docs.aws.amazon.com/appflow/latest/userguide/appflow-cloudtrail-logs.html)

## Setup

You can collect the logs and metrics for Sumo Logic's Google Cloud API Gateway integration by following the below steps.

### Configure logs collection

* Collect **Audit Logs** using the [Google Cloud Platform source](/docs/send-data/hosted-collectors/google-source/google-cloud-platform-source). These Audit Logs can be accessed based on [permissions and roles](https://cloud.google.com/api-gateway/docs/audit-logging#audit_log_permissions). To enable logging for Google API Gateway, refer to [Google documentation](https://cloud.google.com/api-gateway/docs/audit-logging#enabling_audit_logging). For more detail on API Gateway operations being audited, refer to [audited operations](https://cloud.google.com/api-gateway/docs/audit-logging#audited_operations). While creating the sync in GCP, as part of the **Choose logs to include in sink** section you can use the following query:
   ```sql
   (resource.type=apigateway.googleapis.com/Gateway OR (resource.type=audited_resource AND resource.labels.service=apigateway.googleapis.com))
   ```

* Collect **Platform Logs** using the [Google Cloud Platform source](/docs/send-data/hosted-collectors/google-source/google-cloud-platform-source). While creating the sync in GCP, as part of the **Choose logs to include in sink** section, you can use the following query:
   ```sql
   (resource.type=apigateway.googleapis.com/Gateway)
   ```
