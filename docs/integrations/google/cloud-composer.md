---
id: cloud-composer
title: Google Cloud Composer
sidebar_label: Google Cloud Composer
description: Learn about the Sumo Logic collection process for the Google Cloud Composer service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/google/GoogleCloudComposer.png')} alt="Thumbnail icon" width="50"/>

Cloud Composer is a managed Apache Airflow service that helps you create, schedule, monitor, and manage workflows.  For more details, refer to the [GCP documentation](https://cloud.google.com/composer/docs/how-to)

## Log and Metric types

* [Google Cloud Metrics](https://cloud.google.com/monitoring/api/metrics_gcp)
* [Platform Logs](https://docs.aws.amazon.com/appflow/latest/userguide/monitoring-cloudwatch.html)
* [Audit Logs](https://docs.aws.amazon.com/appflow/latest/userguide/appflow-cloudtrail-logs.html)

## Setup

You can collect the logs and metrics for Sumo Logic's Google Cloud Composer integration by following the below steps.

### Configure logs collection

* Collect **Audit Logs** using the [Google Cloud Platform source](/docs/send-data/hosted-collectors/google-source/google-cloud-platform-source). These Audit Logs can be accessed based on the [permissions and roles](https://cloud.google.com/composer/docs/composer-2/audit-logging#audit_log_permissions). To enable logging for Google Composer, refer to [Google documentation](https://cloud.google.com/composer/docs/composer-2/audit-logging#enabling_audit_logging). For more detail on Composer operations being audited, refer to [audited operations](https://cloud.google.com/composer/docs/composer-2/audit-logging#audited_operations). While creating the sync in GCP, as part of the **Choose logs to include in sink** section you can use the following query:
   ```sql
   (resource.type=audited_resource resource.labels.service=composer.googleapis.com)
   ```

* Collect **Platform Logs** using the [Google Cloud Platform source](/docs/send-data/hosted-collectors/google-source/google-cloud-platform-source). Composer platform logs include [streaming logs](https://cloud.google.com/composer/docs/composer-2/view-logs#streaming). While creating the sync in GCP, as part of the **Choose logs to include in sink** section, you can use the following query:
   ```sql
   (resource.type=cloud_composer_environment)
   ```

### Configure metrics collection

* Collect **GCP Metrics** using the [GCP Metric](/docs/send-data/hosted-collectors/google-source/gcp-metrics-source/) source. Make sure that you select **Cloud Composer** from the **Services** dropdown. For Google Cloud Composer metrics and dimensions, refer to [Google Cloud Composer metrics](https://cloud.google.com/monitoring/api/metrics_gcp#gcp-composer).