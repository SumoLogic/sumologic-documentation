---
id: cloud-tasks
title: Google Cloud Tasks
sidebar_label: Google Cloud Tasks
description: Learn about the Sumo Logic collection process for the Google Cloud Tasks service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/google/GoogleCloudTasks.png')} alt="Thumbnail icon" width="50"/>

 Cloud Tasks is a fully managed service that allows you to manage the execution, dispatch, and delivery of a large number of distributed tasks. For more details, refer to the [GCP documentation](https://cloud.google.com/tasks/docs/dual-overview).

## Log and Metric types

* [Google Cloud Metrics](https://cloud.google.com/monitoring/api/metrics_gcp)
* [Platform Logs](https://docs.aws.amazon.com/appflow/latest/userguide/monitoring-cloudwatch.html)

## Setup

You can collect the logs and metrics for Sumo Logic's Google Cloud Tasks integration by following the below steps.

### Configure logs collection

* Collect **Platform Logs** using [Google Cloud Platform source](/docs/send-data/hosted-collectors/google-source/google-cloud-platform-source). To enable logging for Google Cloud tasks follow the instruction [here](https://cloud.google.com/tasks/docs/logging#turning_on_logging). While creating the sync in GCP, as part of the **Choose logs to include in sink** section, you can use the following query:
   ```sql
   resource.type=cloud_tasks_queue
   ```

### Configure metrics collection

* Collect **GCP Metrics** using the [GCP Metric](/docs/send-data/hosted-collectors/google-source/gcp-metrics-source/) source. Note that in the Services dropdown, you'll need to select **Cloud Tasks**. For Google Tasks metrics and dimensions, refer to [Google Tasks metrics](https://cloud.google.com/monitoring/api/metrics_gcp#gcp-cloudtasks).