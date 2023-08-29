
---
id: cloud-auto-scaler
title: Google Cloud Auto Scaler
sidebar_label: Google Cloud Auto Scaler
description: Learn about the Sumo Logic collection process for the Google Cloud Auto Scaler service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/google/GoogleAutoScaler.png')} alt="Thumbnail icon" width="50"/>

Managed instance groups (MIGs) offer autoscaling capabilities that let you automatically add or delete virtual machine (VM) instances from a MIG based on increases or decreases in load. Autoscaling helps your apps gracefully handle increases in traffic and reduce costs when the need for resources is lower. For more details, refer to the [GCP documentation](https://cloud.google.com/compute/docs/autoscaler).

## Log and Metric types

* [Google Cloud Metrics](https://cloud.google.com/monitoring/api/metrics_gcp)
* [Platform Logs](https://docs.aws.amazon.com/appflow/latest/userguide/monitoring-cloudwatch.html)

## Setup
You can collect the logs and metrics for Sumo Logic's Google Cloud Auto Scaler integration by following the below steps.

### Configure logs collection

* Collect **Platform Logs** using [Google Cloud Platform source](/docs/send-data/hosted-collectors/google-source/google-cloud-platform-source).When you enable autoscaling, the autoscaler makes scaling decisions based on the options that you specify. Each scaling decision is logged by Cloud Logging which can be collected, [here](https://cloud.google.com/compute/docs/autoscaler/viewing-autoscaler-logs) are the details. While creating the sync in GCP, as part of the **Choose logs to include in sink** section, you can use the following query:
   ```sql
   (resource.type=autoscaler)
   ```

### Configure metrics collection

* Collect **GCP Metrics** using the [GCP Metric](/docs/send-data/hosted-collectors/google-source/gcp-metrics-source/) source. Note that in the Services dropdown, you'll need to select **Auto Scaler**. For Google Auto Scaler metrics and dimensions, refer to [Google Auto Scaler metrics](https://cloud.google.com/monitoring/api/metrics_gcp#gcp-autoscaler).
