---
id: cloud-vpn
title: Google Cloud VPN
sidebar_label: Google Cloud VPN
description: Learn about the Sumo Logic collection process for the Google Cloud VPN service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/google/GoogleCloudVPN.png')} alt="Thumbnail icon" width="50"/>

Cloud VPN securely connects your peer network to your Virtual Private Cloud (VPC) network through an IPsec VPN connection. For more details, refer to the [GCP documentation](https://cloud.google.com/network-connectivity/docs/vpn/concepts/overview).

## Log and Metric types

* [Google Cloud Metrics](https://cloud.google.com/monitoring/api/metrics_gcp)
* [Platform Logs](https://docs.aws.amazon.com/appflow/latest/userguide/monitoring-cloudwatch.html)

## Setup

You can collect the logs and metrics for Sumo Logic's Google Cloud VPN integration by following the below steps.

### Configure logs collection

* Collect **Platform Logs** using the [Google Cloud Platform source](/docs/send-data/hosted-collectors/google-source/google-cloud-platform-source). Cloud VPN log entries contain useful information for monitoring and debugging your VPN tunnels, such as the following:
    - General information shown in most Google Cloud logs, such as severity, project ID, project number, and timestamp.
    - Other information that varies depending on the log entry.

While creating the sync in GCP, as part of the **Choose logs to include in sink** section, you can use the following query:
   ```sql
   (resource.type=vpn_gateway)
   ```

### Configure metrics collection

* Collect **GCP Metrics** using the [GCP Metric](/docs/send-data/hosted-collectors/google-source/gcp-metrics-source/) source. Make sure that you select **VPN** from the **Services** dropdown. For Google VPN metrics and dimensions, refer to [Google VPN metrics](https://cloud.google.com/monitoring/api/metrics_gcp#gcp-vpn).