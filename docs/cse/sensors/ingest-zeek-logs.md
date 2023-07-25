---
id: ingest-zeek-logs
title: Ingest Zeek Logs
description: Learn how to collect Zeek (Bro) logs and ingest them to CSE.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This topic has instructions for ingesting Zeek logs into CSE. 

## What is Zeek?

Cloud SIEM Enterprise (CSE) uses [Zeek](https://zeek.org/) (formerly known as Bro) for network visibility. Zeek is an open source network analysis framework that organizes packets into flows, decodes common protocols, performs file extraction, SSL certificate validation, OS fingerprinting and more. Zeek can be extended through plugins for additional detection capabilities.

## Best collection method: Network Sensor

Sumo Logic recommends using CSE’s Network Sensor to collect Zeek logs and upload them to an HTTP Source on a Sumo Logic Hosted Collector. This is far and away the preferred method: it ensures that supported Bro policies are enabled and that the supported Bro output format is configured. It also results in the creation of CSE Records from the raw Zeek log messages. For instructions, see [Network Sensor Deployment Guide](/docs/cse/sensors/network-sensor-deployment-guide). 

The Network Sensor extracts files observed over cleartext protocols that match selected MIME types. You can configure what types will be extracted using the [extracted_file_types](/docs/cse/sensors/network-sensor-deployment-guide) property in the Network Sensor’s configuration file, `trident-sensor.cfg`. By default the sensor will upload password-protected zip files and the following types of executables:

* `application/x-dosexec`
* `application/x-msdownload`
* `application/x-msdos-program`

:::note
YARA [file analysis](/docs/cse/rules/import-yara-rules) is supported only for files extracted by the Network Sensor. If you use
your own Zeek deployment and ingest logs using a Sumo Logic Source you can't also upload extracted files. 
:::

### Filtering Zeek logs

This section describes two methods you can use to filter the logs that the Network Sensor sends to CSE.

* You can configure a Berkeley Packet Filter (BPF) filter using the [filter](/docs/cse/sensors/network-sensor-deployment-guide) parameter in Network Sensor’s configuration file, `trident-sensor.cfg`. This is the most efficient filtering mechanism as it is performed before Network Sensor processing.

    The value of the `filter` parameter is an expression that begins with `not`. This example expression ensures the that the Network Sensor won't process any traffic involving host `a.b.c.com` or host `d.e.f.com`:

    `not ( host a.b.c.com ) and not ( host d.e.f.com )`

    For information about BPF filter syntax, see https://biot.com/capstats/bpf.html.  
     
* You can also filter by Zeek log type using the [skipped_log_types](/docs/cse/sensors/network-sensor-deployment-guide) property in `trident-sensor.cfg`. The default value of `skipped_log_types` is:

   ```
   dpd,weird,syslog,pe,tunnel,communication,conn-summary,known_hosts,software,stdout.stderr,loaded_scripts,ntp
   ```

    You can add additional Zeek log types to the list to exclude them.

The BPF filter is applied before `skipped_log_types`. So, given the example BPF filter above, if you add `dns` to the `skipped_log_types` value, you won't ingest logs related to traffic involving hosts `a.b.c.com` or `d.e.f.com`, and you won't ingest DNS data.

## Alternative collection method: Sumo Logic Source 

Although the Network Sensor is the preferred method for collecting Zeek logs, there is an alternative. If you already have a Zeek deployment, you can collect logs using a Sumo Logic Collector and Source.

:::note
This method requires that your Zeek logs are in JSON format. 
:::

### Configure a Sumo Logic Source

In this step, you configure a Sumo Logic Source on an Sumo Logic Installed Collector. Choose the appropriate Source type based on:

* If you already have a method of forwarding Zeek logs in JSON format in Syslog format to a collector in your environment, you can use a Syslog Source to ingest the logs.
* If you’re not set up to use Syslog, and have Zeek log files stored on a filesystem, you can use a Local File Source to ingest the logs.

After configuring the appropriate source, use one of the methods described in [Enable parsing and mapping of Zeek logs](#enable-parsing-and-mapping-of-zeek-logs) to provide information CSE requires to parse and map Zeek logs.

### Enable parsing and mapping of Zeek logs

This configuration step is required to ensure that CSE knows how to parse incoming Zeek logs, correctly map the log fields to schema attributes, and create CSE Records. The most important bit of information is what type of data a particular log contains. Zeek has a variety of log types, for example `conn` for TCP/UDP/ICMP connections, `http` for HTTP requests and replies, and `ftp` for FTP activity.

So, how to determine whether a Zeek log is a `conn`, `http`, `ftp`, or some other log type? Zeek logs don’t contain a key that explicitly holds a value that is only the log type identifier. There are two options for dealing with this:

* Use Corelight to add a field to each Zeek log that identifies its log type. See [Use Corelight](#use-corelight) below.
* Use Sumo Logic Field Extraction Rules (FERs) to create fields that provide the log type and other data that enables CSE to parse and map the logs. See [Use FERs](#use-fers).

### Use Corelight

With this method, you use Corelight’s [json-streaming-logs](https://github.com/corelight/json-streaming-logs), a Bro script package that creates JSON formatted logs, and adds an extension field, named _path that identifies the Zeek log type to each Zeek log. Then, you map that field to **Event ID** in a Sumo Logic ingest mapping.

After installing the `json-streaming-logs` package, follow these instructions to set up the Sumo Logic mapping.

1. In CSE, click the gear icon and select **Sumo Logic** under **Integrations**.<br/><img src={useBaseUrl('img/cse/gear-integrations-sumo.png')} alt="Gear integrations" width="800"/>
1. On the **Sumo Logic Ingest Mappings** page, click **Create**.<br/><img src={useBaseUrl('img/cse/ingest-mappings.png')} alt="Ingest mappings" width="800"/>
1. On the **Create Sumo Logic Mapping** page:
   1. **Source Category**. Enter the Source Category value you assigned to the Source you configured above in [Configure a Sumo Logic Source](#configure-a-sumo-logic-source).
   1. **Format**. Choose Bro/Zeek JSON.
   1. **Event ID**. Enter *_path*.
   1. **Enabled**. Use the slider to enable the mapping if you’re ready to receive Zeek logs.
   1. Click **Create**.<br/><img src={useBaseUrl('img/cse/create-mapping.png')} alt="Create mapping" width="600"/>

### Use FERs

With this method, you use Sumo Logic Field Extraction Rules (FERs) to extract fields from each Zeek log. The fields you extract will provide the information necessary for CSE to correctly parse and map the logs. 

Here’s an example Bro log from the Security Onion platform. 

```
{"TAGS":".source.s_bro_conn","SOURCEIP":"127.0.0.1","PROGRAM":"bro_conn","PRIORITY":"notice","MESSAGE":"{\"ts\":\"2020-05-28T10:32:51.997054Z\",\"uid\":\"Cu3KVA2TbWqZm1Z0S6\",\"id.orig_h\":\"1.2.3.4\",\"id.orig_p\":16030,\"id.resp_h\":\"5.6.7.8\",\"id.resp_p\":161,\"proto\":\"udp\",\"duration\":30.000317811965942,\"orig_bytes\":258,\"resp_bytes\":0,\"conn_state\":\"S0\",\"local_orig\":true,\"local_resp\":true,\"missed_bytes\":0,\"history\":\"D\",\"orig_pkts\":6,\"orig_ip_bytes\":426,\"resp_pkts\":0,\"resp_ip_bytes\":0,\"sensorname\":\"test\"}","ISODATE":"2020-05-28T10:34:24+00:00","HOST_FROM":"somehost","HOST":"somehost","FILE_NAME":"/nsm/bro/logs/current/conn.log","FACILITY":"user"}
```

In the log above, the content of the Bro log is the value of the `MESSAGE` key. Note that no key in the log explicitly states the log type, which is `conn`. 

To enable CSE to successfully process the log, we need to create the
following fields listed in the table below.

| Field          | Parse Expression                                                                                       |
|:----------------|:--------------------------------------------------------------------------------------------------------|
| `_siemMessage` | `json field=_raw "MESSAGE" as _siemMessage`                                                            |
| `_siemEventId` | `json field=_raw "PROGRAM" as _siemEventId | parse regex field=_siemEventId "bro_(\<_siemEventI\>.*)"` |
| `_siemFormat`  | `“bro” as _siemFormat`                                                                                 |
| `_siemVendor`  | `“bro” as _siemVendor`                                                                                 |
| `_siemProduct` | `“bro” as _siemProduct`                                                                                |


Perform these steps for each of the FERs.

1. In the Sumo Logic UI, go to **Manage Data > Logs > Field Extraction Rules**.
1. Click **Add Rule**.
1. In the **Add Field Extraction Rule** pane:
   1. **Rule Name**. Enter a meaningful name for the rule.
   1. **Applied At**. Click Ingest Time. 
   1. **Scope**. Click **Specific Data**.
   1. **Parse Expression**. Enter the parse expression shown in the table above for the field the rule will extract.
1. Click **Save**.<br/><img src={useBaseUrl('img/cse/example-fer.png')} alt="Example FER" width="400"/>
