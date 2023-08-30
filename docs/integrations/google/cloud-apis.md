---
id: cloud-apis
title: Google Cloud APIs
sidebar_label: Google Cloud APIs
description: Learn about the Sumo Logic collection process for the Google Cloud APIs service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/google/GoogleCloudAPIs.png')} alt="Thumbnail icon" width="50"/>

Google Cloud APIs are programmatic interfaces to Google Cloud Platform services. For more details, refer to the [GCP documentation](https://cloud.google.com/apis/docs/monitoring).

## Metric types

* [Google Cloud Metrics](https://cloud.google.com/monitoring/api/metrics_gcp)

## Setup

You can collect the metrics for Sumo Logic's Google Cloud API's integration by following the below steps.

### Configure metrics collection

* Collect **GCP Metrics** using the [GCP Metric](/docs/send-data/hosted-collectors/google-source/gcp-metrics-source/) source. Make sure that you select **Cloud APIs** from the **Services** dropdown. For Google Cloud API metrics and dimensions, refer to [Google API metrics](https://cloud.google.com/monitoring/api/metrics_gcp#gcp-serviceruntim).


