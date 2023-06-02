---
id: using-sensor-zones
title: Using Sensor Zones
sidebar_label: Sensor Zones
description: You can use sensor zones to distinguish among Entities in CSE that have the same IP address.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This topic has information about how to use _sensor zones_ to distinguish among CSE Entities that have the same IP address. For example, you might have two servers that are deployed in two different Cloud regions that use the same private IP address space.

A sensor zone is an attribute that CSE adds to Records at ingest time. You can set a sensor zone for a Sumo Logic Source by assigning a field named `_siemSensorZone` to the Source.

You can set the field value to whatever you want, for example, _us-west_, _europe_, or _aws_. When CSE creates a Record or inventory data for a message from the Source, it will add an attribute named `metadata_sensorZone` that contains the sensor zone assigned to the Source. (If `_siemSensorZone` is not set for a Source, the value of the `metadata_sensorZone`attribute in Records from that Source will be _default_.) The sensor zone attribute will be attached to all Records from the Source it’s assigned to but it will only be mapped toIP address Entities that are the primary Entities on a Signal or Insight.

Wherever the CSE UI displays a private IP address whose `metadata_sensorZone` value is not equal to default in a Record, Signal, or Entity, it will append the sensor zone value to the IP address. This allows a security analyst to easily tell the difference between Entities that have the same IP address, for example:

`10.10.32.168 (us-west)`

`10.10.32.168 (europe)`

In the [Insight generation process](/docs/cse/get-started-with-cloud-siem/insight-generation-process/), Signals are correlated by the full IP address-sensor zone combination.

#### Set sensor zones

You can assign a sensor zone to a Sumo Logic Source when you create a Source, or you can edit an existing Source to add a sensor zone to it.

:::note
Sensor zones will only apply to IP addresses in private address ranges.
:::

To define a sensor zone for a Source:

1. In the Sumo Logic UI, navigate to the Source you want to update, at **Manage Data** > **Collection** > **Collection**.  
2. In the **Fields/Metadata** area, define a [Field](/docs/manage/fields.md) named `_siemSensorZone` and set it to the desired value.
<img src={useBaseUrl('img/cse/source.png')} alt="source.png" />
3. Click **Save**.

After you add the field, Records and inventory data from the Source will have the attribute `_siemSensorZone` set to the value you specified.

#### Sensor zones in CSE

In the CSE user interface, when viewing an Entity or a Record (or a Signal that is based on either one) that has `_siemSensorZone` set, the sensor zone will also be displayed in the UI.

The following screenshot shows an Insight whose primary Entity has a sensor zone defined.

#### Sensor zones in Sumo Logic

The screenshot below shows a CSE Record returned by a search in Sumo Logic. In the example record, no sensor zone has been added to the Record, so the value of `metadata_sensorZone` is _default_.

<img src={useBaseUrl('img/cse/sensor-zone-cip.png')} alt="sensor-zone-cip.png" />
