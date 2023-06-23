---
id: import-raw-data-splunk
title: Import Raw Data from Splunk
sidebar_label: Splunk
description: Although you can import data from Splunk, Sumo Logic does not support Splunk functionality or commands.
---


:::important
Although you can import data from Splunk, Sumo Logic does not support Splunk functionality or any commands included below.
:::

To import raw data from Splunk:

1. Do one of the following:

   * Use the Splunk search command to construct queries that return a group of messages that match source configurations in Sumo (multiline detection, timezone settings, etc; for example, messages that match Unix logs and messages that match Windows logs). Then export these messages using the "splunk search"  command (at the command-line) with the "-output rawdata" option to individual files (with a simple redirect). Each file in turn can then be configured to be picked up by Sumo Logic.

   * Use the Splunk "export eventdata" command. This automatically creates copies of the original raw files for an index. Then you can pick and choose which of these you want to get to Sumo Logic using collector sources and configure each one according to your needs. 

2. Configure Sumo Logic [Sources](/docs/send-data/choose-collector-source) to pick up the logs from the directories you just exported.
