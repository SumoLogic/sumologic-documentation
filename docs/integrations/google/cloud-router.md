---
id: cloud-router
title: Google Cloud Router
sidebar_label: Google Cloud Router
description: Learn about the Sumo Logic collection process for the Google Cloud Router service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/google/GoogleCloudRouter.png')} alt="Thumbnail icon" width="50"/>

Cloud Router is a fully distributed and managed Google Cloud service that uses the Border Gateway Protocol (BGP) to advertise IP prefixes. For more details, refer to the [GCP documentation](https://cloud.google.com/network-connectivity/docs/router/concepts/overview).

## Log and Metric types

* [Google Cloud Metrics](https://cloud.google.com/monitoring/api/metrics_gcp)
* [Platform Logs](https://docs.aws.amazon.com/appflow/latest/userguide/monitoring-cloudwatch.html)

## Setup

You can collect the logs and metrics for Sumo Logic's Google Cloud Router integration by following the below steps.

### Configure logs collection

* Collect **Platform Logs** using the [Google Cloud Platform source](/docs/send-data/hosted-collectors/google-source/google-cloud-platform-source). Cloud Router sends logging information to Cloud Logging. These logs include information around:
    - Router events related to your Cloud Router
    - BGP events related to a BGP configuration and session
    - Route events related to route announcements between the two BGP peers.

While creating the sync in GCP, as part of the **Choose logs to include in sink** section, you can use the following query:
   ```sql
   (resource.type=gce_router)
   ```

### Configure metrics collection

* Collect **GCP Metrics** using the [GCP Metric](/docs/send-data/hosted-collectors/google-source/gcp-metrics-source/) source. Under the **Services** dropdown, select **Cloud Router**. For Google Router metrics and dimensions, refer to the [Google Router metrics](https://cloud.google.com/monitoring/api/metrics_gcp#gcp-router).
