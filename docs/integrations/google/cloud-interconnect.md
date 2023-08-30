---
id: cloud-interconnect
title: Google Cloud Interconnect
sidebar_label: Google Cloud Interconnect
description: Learn about the Sumo Logic collection process for the Google Cloud Interconnect service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/google/GoogleCloudInterconnect.png')} alt="Thumbnail icon" width="50"/>

Cloud Interconnect extends your external network to the Google network through a high-availability, low-latency connection. For more details, refer to the [GCP documentation](https://cloud.google.com/network-connectivity/docs/interconnect/concepts/overview)

## Metric types

* [Google Cloud Metrics](https://cloud.google.com/monitoring/api/metrics_gcp)

# Setup
You can collect the metrics for Sumo Logic's Google Cloud Interconnect integration by following the below steps.

### Configure metrics collection

* Collect **GCP Metrics** using the [GCP Metric](/docs/send-data/hosted-collectors/google-source/gcp-metrics-source/) source. Note that in the Services dropdown, you'll need to select **Cloud Interconnec**. For Google Interconnect metrics and dimensions, refer to [Google Interconnect metrics](https://cloud.google.com/monitoring/api/metrics_gcp#gcp-interconnect).