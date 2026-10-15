---
id: using-sensor-zones
title: Using Sensor Zones
sidebar_label: Sensor Zones
description: You can use sensor zones to distinguish among entities in Cloud SIEM that have the same IP address.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This topic has information about how to use _sensor zones_ to distinguish among Cloud SIEM entities that have the same IP address. For example, you might have two servers that are deployed in two different Cloud regions that use the same private IP address space.

A sensor zone is an attribute that Cloud SIEM adds to records at ingest time. You can set a sensor zone for a Sumo Logic source by assigning a field named `_siemSensorZone` to the source.

You can set the field value to whatever you want, for example, _us-west_, _europe_, or _aws_. When Cloud SIEM creates a record or inventory data for a message from the source, it will add an attribute named `metadata_sensorZone` that contains the sensor zone assigned to the source. (If `_siemSensorZone` is not set for a source, the value of the `metadata_sensorZone` attribute in records from that source will be _default_.) The sensor zone attribute will be attached to all records from the source it’s assigned to but it will only be mapped to IP address entities that are the primary entities on a signal or insight.

Wherever the Cloud SIEM UI displays a private IP address whose `metadata_sensorZone` value is not equal to default in a record, signal, or entity, it will append the sensor zone value to the IP address. This allows a security analyst to easily tell the difference between entities that have the same IP address, for example:

`10.10.32.168 (us-west)`

`10.10.32.168 (europe)`

In the [insight generation process](/docs/cse/get-started-with-cloud-siem/insight-generation-process/), signals are correlated by the full IP address-sensor zone combination.

#### Set sensor zones

You can assign a sensor zone to a Sumo Logic source when you create a source, or you can edit an existing source to add a sensor zone to it.

:::note
Sensor zones will only apply to IP addresses in private address ranges.
:::

To define a sensor zone for a source:

1. [**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic main menu select **Data Management**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**. <br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**.  
1. Navigate to the source you want to update.
1. In the **Fields/Metadata** area, define a [field](/docs/manage/fields) named `_siemSensorZone` and set it to the desired value.<br/><img src={useBaseUrl('img/cse/source.png')} alt="Fields/Metadata field" width="600"/>
1. Click **Save**.

After you add the field, records and inventory data from the source will have the attribute `_siemSensorZone` set to the value you specified.

#### Sensor zones in Cloud SIEM

In the Cloud SIEM user interface, when viewing an entity or a record (or a signal that is based on either one) that has `_siemSensorZone` set, the sensor zone will also be displayed in the UI.

The following screenshot shows an insight whose primary entity has a sensor zone defined.

#### Sensor zones in Sumo Logic

The screenshot below shows a Cloud SIEM record returned by a search in Sumo Logic. In the example record, no sensor zone has been added to the record, so the value of `metadata_sensorZone` is _default_.

<img src={useBaseUrl('img/cse/sensor-zone-cip.png')} alt="Example of a record" width="600" />
