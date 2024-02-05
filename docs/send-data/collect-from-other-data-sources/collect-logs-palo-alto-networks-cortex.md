---
id: collect-logs-palo-alto-networks-cortex
title: Collect Logs from Palo Alto Networks Cortex Data Lake
sidebar_label: Palo Alto Networks Cortex Data Lake
description: Learn how to Collect Logs from Palo Alto Networks Cortex Data Lake.
---


This page provides you instructions on how to Collect Logs from the Palo Alto Networks Cortex Data Lake.

To collect logs from Palo Alto Networks Cortex Data Lake: 

1. Create and configure a Cloud Syslog source in your Sumo Logic account using [these instructions](/docs/send-data/hosted-collectors/cloud-syslog-source).

    :::note
    After configuring the source, you can go to **Collectors and Sources > Show Token** to display the token for the newly created Cloud Syslog source.
    :::

1. To configure log forwarding to this new Cloud Syslog source, follow [these instructions](https://docs.paloaltonetworks.com/cortex/log-forwarding/log-forwarding-app-getting-started/get-started-with-log-forwarding-app/forward-logs-from-logging-service-to-syslog-server) in the Palo Alto Networks documentation.

    ::::note
    The field **Profile Token** is where you can enter the custom Cloud Syslog token from Step 1.
    :::
