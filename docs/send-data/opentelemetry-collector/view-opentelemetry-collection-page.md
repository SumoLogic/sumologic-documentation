---
id: view-opentelemetry-collection-page
title: View Details About an OpenTelemetry Collector
description: Learn how to view details about an OpenTelemetry Collector.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

To view details about an OpenTelemetry Collector:

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu select **Manage Data > Collection > OpenTelemetry Collector**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Configuration**, and then under **Collection** select **OpenTelemetry Collector**. You can also click the **Go To...** menu at the top of the screen and select **OpenTelemetry Collector**. <br/><img src={useBaseUrl('img/send-data/opentelemetry-collection-page.png')} alt="opentelemetry-collection-page" style={{border:'1px solid gray'}} width="1000"/>
    - **Name**. Name of the OpenTelemetry Collector.
    - **Health**. Displays the health status of the collector.
    - **Operating System**. Displays the operating system where the collector is installed.
    - **Collector Tags**. Displays the tags linked with the selected collector, which helps in searching and managing the collector.
    - **Source Templates**. Shows the number of source templates linked with the selected collector.
    - **IP Address**. Displays the IP address where the collector is running.
    - **Log Messages (-1h)**. Displays the histogram which shows the data ingested in last one hour.
          :::info
          Dashed line indicates there was no data ingestion in last hour.
          :::
    - **Last Modified**. Timestamp when the collector was last modified.
1. Click on the desired collector.<br/><img src={useBaseUrl('img/send-data/opentelemetry-collection-details-page.png')} alt="opentelemetry-collection-details-page" style={{border:'1px solid gray'}} width="400"/>
    - **Basic Info**
        - **Name**. Name of the OpenTelemetry Collector.
        - **Collector Version**. The collector version with which the collector was created.
        - **Source Templates**. Displays the number of source templte 
        - **Health**. Displays the health status of the collector.
        - **Time Zone**. By default, time zone is set to UTC.
        - **Collector Tags**. Displays the tags linked with the selected collector, which helps in searching and managing the collector. To add or edit the tags, refer to the [Collector Tags](/docs/send-data/opentelemetry-collector/remote-management/source-templates/manage-source-templates/#collector-tags).
        - **Data Ingested**. Displays the histogram which shows data ingested in last hour. The histogram timeline reflects the ingestion time as closely as possible, but minor variations may occur.
        - **System Information**. Displays the operating system, OS version, IP Address, and Host name of the user who created the collector.
        - **Audit Logs**. Records the collector changes. Click on **View Details** to view the changes.
        - **Collector ID**. Unique ID for the selected collector.
        - **Last Modified**. Timestamp when the collector was last modified.
        - **Created**. Timestamp when the collector was created.
    - **Source Templates**. Displays all the source configuration linked with the collector.
