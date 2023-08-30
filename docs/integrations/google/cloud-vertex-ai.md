---
id: cloud-vertex-ai
title: Google Cloud Vertex AI
sidebar_label: Google Cloud Vertex AI
description: Learn about the Sumo Logic collection process for the Google Cloud Vertex AI service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/google/GoogleCloudVertexAI.png')} alt="Thumbnail icon" width="50"/>

Vertex AI is a machine learning (ML) platform that lets you train and deploy ML models and AI applications, and customize large language models (LLMs). For more details, refer to the [GCP documentation](https://cloud.google.com/vertex-ai/docs/start/introduction-unified-platform).

## Log types

* [Platform Logs](https://docs.aws.amazon.com/appflow/latest/userguide/monitoring-cloudwatch.html)
* [Audit Logs](https://docs.aws.amazon.com/appflow/latest/userguide/appflow-cloudtrail-logs.html)

## Setup

You can collect the logs for Sumo Logic's Google Cloud Vertex AI integration by following the below steps.

### Configure logs collection

* Collect **Audit Logs** using the [Google Cloud Platform source](/docs/send-data/hosted-collectors/google-source/google-cloud-platform-source). These Audit Logs can be accessed based on the [permissions and roles](https://cloud.google.com/vertex-ai/docs/general/audit-logging#audit_log_permissions). To enable logging for Google Vertex AI, refer to [Google documentation](https://cloud.google.com/vertex-ai/docs/general/audit-logging#enabling_audit_logging). For more detail on Vertex AI operations being audited, refer to [audited operations](https://cloud.google.com/vertex-ai/docs/general/audit-logging#audited_operations). While creating the sync in GCP, as part of the **Choose logs to include in sink** section you can use the following query:
   ```sql
   (resource.type=audited_resource resource.labels.service=aiplatform.googleapis.com)
   ```

* Collect **Platform Logs** using the [Google Cloud Platform source](/docs/send-data/hosted-collectors/google-source/google-cloud-platform-source). Vertex AI generates logs for endpoint, feature stores and vertex pipeline job as platform logs, by default, these logs are generated. In addition to this, audit logs will also be collected. While creating the sync in GCP, as part of the **Choose logs to include in sink** section, you can use the following query:
   ```sql
   (resource.type=(aiplatform.googleapis.com/Endpoint or aiplatform.googleapis.com/Featurestore or aiplatform.googleapis.com/PipelineJob))
   ```