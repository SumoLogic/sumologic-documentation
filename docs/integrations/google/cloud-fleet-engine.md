---
id: cloud-fleet-engine
title: Google Cloud Fleet Engine
sidebar_label: Google Cloud Fleet Engine
description: Learn about the Sumo Logic collection process for the Google Cloud Fleet Engine service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/google/GoogleCloudFleetEngine.png')} alt="Thumbnail icon" width="50"/>

The Fleet Engine On-demand Rides and Deliveries API lets you manage trips and vehicle state for your Trip and Order Progress applications. For more details, refer to the [GCP documentation](https://developers.google.com/maps/documentation/transportation-logistics/on-demand-rides-deliveries-solution/trip-order-progress/fleet-engine).

## Log types

* [Platform Logs](https://docs.aws.amazon.com/appflow/latest/userguide/monitoring-cloudwatch.html)

## Setup
You can collect the logs for Sumo Logic's Google Cloud Fleet Engine integration by following the below steps.

### Configure logs collection

* Collect **Platform Logs** using [Google Cloud Platform source](/docs/send-data/hosted-collectors/google-source/google-cloud-platform-source). To enable logging for Google Cloud Fleet Engine follow the instruction [here](https://developers.google.com/maps/documentation/transportation-logistics/on-demand-rides-deliveries-solution/trip-order-progress/fleet-engine/logging#enable_cloud_logging). [Here](https://developers.google.com/maps/documentation/transportation-logistics/on-demand-rides-deliveries-solution/trip-order-progress/fleet-engine/logging#what_logs) are the details of what fleet engines logs. While creating the sync in GCP, as part of the **Choose logs to include in sink** section, you can use the following query:
   ```sql
   resource.type=(fleetengine.googleapis.com/Fleet OR fleetengine.googleapis.com/DeliveryFleet)
   ```