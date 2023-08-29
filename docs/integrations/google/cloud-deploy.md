
---
id: cloud-deploy
title: Google Cloud Deploy
sidebar_label: Google Cloud Deploy
description: Learn about the Sumo Logic collection process for the Google Cloud Deploy service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/google/GoogleCloudDeploy.png')} alt="Thumbnail icon" width="50"/>

Cloud Deploy is a managed service that automates delivery of your applications to a series of target environments in a defined promotion sequence. For more details, refer to the [GCP documentation](https://cloud.google.com/deploy/docs/overview)

## Log types

* [Platform Logs](https://docs.aws.amazon.com/appflow/latest/userguide/monitoring-cloudwatch.html)
* [Audit Logs](https://docs.aws.amazon.com/appflow/latest/userguide/appflow-cloudtrail-logs.html)

## Setup

You can collect the logs for Sumo Logic's Google Cloud Deploy integration by following the below steps.

### Configure logs collection

* Collect **Audit Logs** using [Google Cloud Platform source](/docs/send-data/hosted-collectors/google-source/google-cloud-platform-source). Refer to the [permissions and roles](https://cloud.google.com/deploy/docs/audit-logs#access) required for accessing audit logs. To enable logging for Google Deploy refer to [Google documentation](https://cloud.google.com/deploy/docs/audit-logs#enable). For more detail, on Deploy operations being audited refer to [audited operations](https://cloud.google.com/deploy/docs/audit-logs#audited_operations). While creating the sync in GCP, as part of the **Choose logs to include in sink** section you can use the following query:
   ```sql
   resource.type=(clouddeploy.googleapis.com/DeliveryPipeline or 	clouddeploy.googleapis.com/Target)
   ```

* Collect **Platform Logs** using [Google Cloud Platform source](/docs/send-data/hosted-collectors/google-source/google-cloud-platform-source). Deploy platform logs include logs related to render status change, failure to send pub/sub notification for status change. While creating the sync in GCP, as part of the **Choose logs to include in sink** section, you can use the same query as audit logs. The platform logs ingested can then be further filtered on the basis of log id given [here](https://cloud.google.com/logging/docs/api/platform-logs#cloud_deploy).