---
id: cloud-net-app-cloud-volumes-service
title: Google Cloud Net App Cloud Volumes Service
sidebar_label: Google Cloud Net App Cloud Volumes Service
description: Learn about the Sumo Logic collection process for the Google Cloud Net App Cloud Volumes Service service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/google/gcp_netapp.png')} alt="Thumbnail icon" width="50"/>

NetApp Cloud Volumes Service is a fully managed, cloud-native data storage service that provides advanced data management capabilities and highly scalable performance.  For more details, refer to the [GCP documentation](https://cloud.google.com/architecture/partners/netapp-cloud-volumes)

## Metric types

* [Google Cloud Metrics](https://cloud.google.com/monitoring/api/metrics_gcp)

## Setup

You can collect the metrics for Sumo Logic's Google Cloud NetApp Cloud Volumes integration by following the below steps.


### Configure metrics collection

* Collect **GCP Metrics** using the [GCP Metric](/docs/send-data/hosted-collectors/google-source/gcp-metrics-source/) source. Note that in the Services dropdown, you'll need to select **loudvolumes Net App**. For Google NetApp Cloud Volumes metrics and dimensions, refer to [Google NetApp Cloud Volumes metrics](https://cloud.google.com/monitoring/api/metrics_other#other-cloudvolumesgcp-api.netapp.com).