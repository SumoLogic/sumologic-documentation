---
id: cloud-network-topology
title: Google Cloud Network Topology
sidebar_label: Google Cloud Network Topology
description: Learn about the Sumo Logic collection process for the Google Cloud Network Topology service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/google/GoogleCloudNetworkTopology.png')} alt="Thumbnail icon" width="50"/>

Network Topology is a visualization tool that shows the topology of your Virtual Private Cloud (VPC) networks, hybrid connectivity to and from your on-premises networks, connectivity to Google-managed services, and the associated metrics. For further details refer [GCP documentation](https://cloud.google.com/network-intelligence-center/docs/network-topology/concepts/overview).

## Metric types

* [Google Cloud Metrics](https://cloud.google.com/monitoring/api/metrics_gcp)

## Setup

You can collect the metrics for Sumo Logic's Google Cloud Network Topology integration by following the below steps.

### Configure metrics collection

* Collect **GCP Metrics** using the [GCP Metric](/docs/send-data/hosted-collectors/google-source/gcp-metrics-source/) source. Note that in the Services dropdown, you'll need to select **Networking**. For Google Network Topology metrics and dimensions, refer to [Google Network Topology metrics](https://cloud.google.com/monitoring/api/metrics_gcp#gcp-networking).