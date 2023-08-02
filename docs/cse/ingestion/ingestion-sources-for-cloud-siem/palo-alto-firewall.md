---
id: palo-alto-firewall
title: Palo Alto Firewall - Cloud SIEM
sidebar_label: Palo Alto Firewall
description: Configure collection of Palo Alto Firewall log messages to be parsed by CSE's system parser for Palo Alto Firewall.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This section has instructions for collecting Palo Alto Firewall log messages and sending them to Sumo Logic to be ingested by CSE.

Sumo Logic CSE supports the default comma separated value (CSV), as well as Common Event Format (CEF) logs from Palo Alto Firewalls running PAN OS 10.1 or greater. This guide provides steps for collecting CSV format logs.

## Step 1: Configure collection

In this step, you configure a Syslog Source to collect Palo Alto Firewall log messages. You can configure the source on an existing Installed Collector or create a new collector. If you’re going to use an existing collector, jump to [Configure a Syslog Source](#configure-a-syslog-source) below. Otherwise, create a new collector as described in [Configure an Installed Collector](#configure-an-installed-collector) below, and then create the Syslog Source on the collector.

### Configure an Installed Collector

1. In the Sumo Logic platform, select **Manage Data** > **Collection** > **Collection**.
1. Click **Add Collector**.
1. Click **Installed Collector**.
1. The **Add Installed Collector** popup appears.
1. Download the appropriate collector for your operating system.
1. Install the collector. Instructions for your preferred operating system and method of installation are available on the [Installed Collectors](/docs/send-data/installed-collectors) page.
1. Once the collector is installed, confirm it is available on the **Collection** page and select **Edit**.
1. The **Edit Collector popup** appears. <br/><img src={useBaseUrl('img/cse/edit-collector.png')} alt="Edit collector" width="500"/>
1. **Name**. Provide a Name for the Collector.
1. **Description**. (Optional)
1. **Category**. Enter a string to tag the output collected from the source. The string that you supply will be saved in a metadata field called `_sourceCategory`. 
1. **Fields**. 
   1. If you are planning that all the sources you add to this collector will forward log messages to CSE, click the **+Add Field** link, and add a field whose name is `_siemForward` and value is *true*. This will cause the collector to forward all of the logs collected by all of the sources on the collector to CSE.
   1. If you are planning that all sources you add to this collector will use the same log parser (if they are the same type of log), click the **+Add Field** link, and add a field whose name is `_parser` with the value */Parsers/System/Palo Alto/PAN Firewall CSV*. This will cause all sources on the collector to use the specified parser. It’s also possible to configure individual sources to forward to CSE, as described in the following section
1. Click **Save**.

### Configure a Syslog Source

1. In Sumo Logic, select **Manage Data** > **Collection** > **Collection**. 
1. Navigate to the Installed Collector where you want to create the source.
1. On the **Collectors** page, click **Add Source** next to an Installed Collector.
1. Select **Syslog**. 
1. The page refreshes. <br/><img src={useBaseUrl('img/cse/syslog-source.png')} alt="Syslog source" width="500"/> 
1. **Name**. Enter a name for the source. 
1. **Description**. (Optional) 
1. **Protocol**. Select the protocol that your syslog-enabled devices are currently using to send syslog data, UDP or TCP. For more information, see [Choosing TCP or UDP](/docs/send-data/installed-collectors/sources/syslog-source#choosing-tcp-or-udp) on the *Syslog Source* page.
1. **Port**. Enter the port number for the Source to listen to. If the collector runs as root (default), use 514. Otherwise, consider 1514 or 5140. Make sure the devices are sending to the same port.
1. **Source Category**. Enter a string to tag the output collected from the source. The string that you supply will be saved in a metadata field called `_sourceCategory`. Make a note of the source category. You’ll supply it in [Step 2](#step-2-configure-palo-alto-firewall) below.
1. **Fields**. 
    1. If you have not configured the Installed Collector to forward  all sources in the collector to CSE, click the **+Add Field** link, and add a field whose name is `_siemForward` and value is *true*.
    1. If you have not configured the Installed Collector to parse all sources in the collector with the same parser, click the **+Add Field** link, and add a field whose name is `_parser` with the value */Parsers/System/Palo Alto/PAN Firewall CSV*. 
1. Click **Save**.

## Step 2: Define destination for the logs

In this step you create a server profile where you can define the log destination. This will be the host name, port and protocol (TLS) of the Sumo Logic Cloud Syslog source.

To create a server profile specifying the log destination, do the following:

1. Login to the Palo Alto Networks Web interface as an administrative user.
2. Select **Device** tab > **Server Profiles** > **Syslog**.
3. Click **Add** at the bottom of the screen and provide endpoint details and a profile name, such as `Sumo_Logs_Profile01`.
4. In the Syslog Server Profile window, select the **Servers** tab and click **Add**.
5. In the Servers window, specify the following information:
   * Name: `Sumo_CloudSyslog_EndPoint01`
   * Syslog Server: Internal IP of Collector
   * Transport: UDP
   * Port: Port from Collector Setup
   * Format: BSD
   * Facility: `LOG_USER`
6. In the **Syslog Server Profile** window, select the **Custom Log Format** tab, and use the following custom formats for the following log types:

[Config](https://docs.paloaltonetworks.com/pan-os/10-1/pan-os-admin/monitoring/use-syslog-for-monitoring/syslog-field-descriptions/config-log-fields)
```
,$receive_time,$serial,$type,$subtype,,$time_generated,$host,$vsys,$cmd,$admin,$client,$result,$path,$before-change-detail,$after-change-detail,$seqno,$actionflags,$dg_hier_level_1,$dg_hier_level_2,$dg_hier_level_3,$dg_hier_level_4,$vsys_name,$device_name,$dg_id,$comment,$high_res_timestamp
```

[System](https://docs.paloaltonetworks.com/pan-os/10-1/pan-os-admin/monitoring/use-syslog-for-monitoring/syslog-field-descriptions/system-log-fields)
```
,$receive_time,$serial,$type,$subtype,,$time_generated,$vsys,$eventid,$object,,,$module,$severity,$opaque,$seqno,$actionflags,$dg_hier_level_1,$dg_hier_level_2,$dg_hier_level_3,$dg_hier_level_4,$vsys_name,$device_name,$high_res_timestamp
```

[Threat](https://docs.paloaltonetworks.com/pan-os/10-1/pan-os-admin/monitoring/use-syslog-for-monitoring/syslog-field-descriptions/threat-log-fields)
```
,$receive_time,$serial,$type,$subtype,,$time_generated,$src,$dst,$natsrc,$natdst,$rule,$srcuser,$dstuser,$app,$vsys,$from,$to,$inbound_if,$outbound_if,$logset,,$sessionid,$repeatcnt,$sport,$dport,$natsport,$natdport,$flags,$proto,$action,$misc,$threatid,$category,$severity,$direction,$seqno,$actionflags,$srcloc,$dstloc,$contenttype,$pcap_id,$filedigest,$cloud,$url_idx,$user_agent,$filetype,$xff,$referer,$sender,$subject,$recipient,$reportid,$dg_hier_level_1,$dg_hier_level_2,$dg_hier_level_3,$dg_hier_level_4,$vsys_name,$device_name,$src_uuid,$dst_uuid,$http_method,$tunnelid/$imsi,$monitortag/$imei,$parent_session_id,$parent_start_time,$tunnel,$thr_category,$contentver,$assoc_id,$ppid,$http_headers,$rule_uuid,$dynusergroup_name
```

[Traffic](https://docs.paloaltonetworks.com/pan-os/10-1/pan-os-admin/monitoring/use-syslog-for-monitoring/syslog-field-descriptions/traffic-log-fields)
```
,$receive_time,$serial,$type,$subtype,,$time_generated,$src,$dst,$natsrc,$natdst,$rule,$srcuser,$dstuser,$app,$vsys,$from,$to,$inbound_if,$outbound_if,$logset,$sessionid,$repeatcnt,$sport,$dport,$natsport,$natdport$,flags,$proto,$action,$bytes,$bytes_sent,$bytes_received,$packets,$start,$elapsed,$category,$seqno,$actionflags,$srcloc,$dstloc,$pkts_sent,$pkts_received,$session_end_reason,$dg_hier_level_1,$dg_hier_level_2,$dg_hier_level_3,$dg_hier_level_4,$vsys_name,$device_name,$action_source,$src_uuid,$dst_uuid,$tunnelid/$imsi,$monitortag/$imei,$parent_session_id,$parent_start_time,$tunnel,$assoc_id,$chunks,$chunks_sent,$chunks_received,$rule_uuid,$link_change_count,$policy_id,$link_switches,$sdwan_cluster,$sdwan_device_type,$sdwan_cluster_type,$sdwan_site,$dynusergroup_name
```

[Hip Match](https://docs.paloaltonetworks.com/pan-os/10-1/pan-os-admin/monitoring/use-syslog-for-monitoring/syslog-field-descriptions/hip-match-log-fields)
```
,$receive_time,$serial,$type,$subtype,,$time_generated,$srcuser,$vsys,$machinename,$os,$src,$matchname,$repeatcnt,$matchtype,$seqno,$actionflags,$dg_hier_level_1,$dg_hier_level_2,$dg_hier_level_3,$dg_hier_level_4,$vsys_name,$device_name,$vsys_id,$srcipv6,$hostid,$serialnumber,$mac,$high_res_timestamp
```

[UserID](https://docs.paloaltonetworks.com/pan-os/10-1/pan-os-admin/monitoring/use-syslog-for-monitoring/syslog-field-descriptions/user-id-log-fields)
```
,$receive_time,$serial,$type,$subtype,,$time_generated,$vsys,$ip,$user,$datasourcename,$eventid,$repeatcnt,$timeout,$beginport,$endport,$datasource,$datasourcetype,$seqno,$actionflags,$dg_hier_level_1,$dg_hier_level_2,$dg_hier_level_3,$dg_hier_level_4,$vsys_name,$device_name,$vsys_id,$factortype,$factorcompletiontime,$factorno,,,$ugflags,$userbysource,$high_res_timestamp
```

[GlobalProtect](https://docs.paloaltonetworks.com/pan-os/10-1/pan-os-admin/monitoring/use-syslog-for-monitoring/syslog-field-descriptions/globalprotect-log-fields)
```
,$receive_time,$serial,$type,$subtype,$time_generated,$vsys,$eventid,$stage,$auth_method,$tunnel_type,$src_user,$srcregion,$machinename,$public_ip,$public_ipv6,$private_ip,$private_ipv6,$hostid,$serialnumber,$client_ver,$client_os,$client_os_ver,$repeatcnt,$reason,$error,$opaque,$status,$location,$login_duration,$connect_method,$error_code,$portal,$seqno,$actionflags
```

7. Click OK.
8. Commit the changes.


## Step 3: Configure Palo Alto Firewall

In this step, you configure Palo Alto Firewall to send log messages to the Sumo Logic platform. Follow Palo Alto documentation to [Configure Log Forwarding](https://docs.paloaltonetworks.com/pan-os/10-1/pan-os-admin/monitoring/configure-log-forwarding). 

## Step 4: Verify ingestion

In this step, you verify that your logs are successfully making it into CSE. 

1. Click the gear icon, and select **Log Mappings** under **Incoming Data**. <br/><img src={useBaseUrl('img/cse/log-mappings-link.png')} alt="Log Mappings link" width="400"/> 
1. On the **Log Mappings** page search for "Palo Alto" and check under **Record Volume**. <br/><img src={useBaseUrl('img/cse/palo-alto-firewall-record-volume.png')} alt="Palo Alto Firewall record volume" width="600"/>  
1. For a more granular look at the incoming records, you can also search the Sumo Logic platform for Palo Alto Firewall security records.<br/><img src={useBaseUrl('img/cse/palo-alto-firewall-search.png')} alt="Palo Alto Firewall search" width="500"/> 
