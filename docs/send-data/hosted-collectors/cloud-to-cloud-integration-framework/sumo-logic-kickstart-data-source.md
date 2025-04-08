---
id: sumo-logic-kickstart-data-source
title: Sumo Logic Kickstart Data Source
sidebar_label: Sumo Logic Kickstart Data
keywords:
  - sumo-logic-kickstart-data
  - cloud-to-cloud
description: Learn how to collect audit reporting events from Sumo Logic Kickstart Data platform.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/sumo-logic-kickstart-data.png')} alt="thumbnail icon" width="55"/>

The Sumo Logic Kickstart Data source ingests logs and metrics into Sumo Logic for our pre-loaded OpenTelemetry demo application. This source is engineered to provide a continuous stream of data that simulates a specific scenario, highlighting latency spikes across various services.

:::tip
Learn more about [Kickstart Data](/docs/get-started/quickstart/#getting-started-with-kickstart-data-in-your-trial).
:::

## Data collected

| Name | Description |
| :--- | :--- |
| Initial Data             | The source ingests data from 6 hours in the past and 6 hours into the future. |
| Regular Ingestion        | Every 6 hours, the source ingests an additional 6 hours of future-dated data to ensure dashboards are always populated. |
| Latency Spike Simulation | The data demonstrate a scenario showcasing latency spikes, aiding in performance analysis and debugging. |

## Setup

### Source configuration

The Kickstart Data source is pre-installed for all users upon creation of a [new organization](/docs/manage/manage-subscription/create-and-manage-orgs).

## FAQ

:::info
Click [here](/docs/c2c/info) for more information about Cloud-to-Cloud sources.
:::
