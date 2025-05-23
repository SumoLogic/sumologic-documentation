---
id: palo-alto-firewall
title: Ingest Palo Alto Firewall Data into Cloud SIEM
sidebar_label: Palo Alto Firewall
description: Configure collection of Palo Alto Firewall log messages to be parsed by Cloud SIEM's system parser for Palo Alto Firewall.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Sumo Logic Cloud SIEM supports the default comma separated value (CSV), as well as Common Event Format (CEF) logs from Palo Alto Firewalls running PAN OS 10.1 or greater. This article provides steps for collecting CSV format logs.

To ingest Palo Alto Firewall data into Cloud SIEM:
1. [Configure a Syslog source](/docs/send-data/installed-collectors/sources/syslog-source/#configure-a-syslog-source) on a collector. When you configure the source, do the following:
    1. Click the **+Add Field** link, and add a field whose name is `_siemForward` and value is *true*. This will ensure all logs for this source are forwarded to Cloud SIEM.
    1. Add another field named `_parser` with value */Parsers/System/Palo Alto/PAN Firewall CSV*. This ensures that the Palo Alto Firewall logs are parsed and normalized into structured records in Cloud SIEM.
1. Create a server profile to define the log destination. The profile will contain the host name, port and protocol (TLS) of the Sumo Logic Cloud syslog source:
    1. Login to the Palo Alto Networks Web interface as an administrative user.
    1. Select **Device** tab > **Server Profiles** > **Syslog**.
    1. Click **Add** at the bottom of the screen and provide endpoint details and a profile name, such as `Sumo_Logs_Profile01`.
    1. In the Syslog Server Profile window, select the **Servers** tab and click **Add**.
    1. In the Servers window, specify the following information:
       * Name: `Sumo_CloudSyslog_EndPoint01`
       * Syslog Server: Internal IP of Collector
       * Transport: UDP
       * Port: Port from Collector Setup
       * Format: BSD
       * Facility: `LOG_USER`
    1. In the **Syslog Server Profile** window, select the **Custom Log Format** tab, and use the following custom formats for the following log types:
       * [Config](https://docs.paloaltonetworks.com/pan-os/10-1/pan-os-admin/monitoring/use-syslog-for-monitoring/syslog-field-descriptions/config-log-fields)
          ```
          ,$receive_time,$serial,$type,$subtype,,$time_generated,$host,$vsys,$cmd,$admin,$client,$result,$path,$before-change-detail,$after-change-detail,$seqno,$actionflags,$dg_hier_level_1,$dg_hier_level_2,$dg_hier_level_3,$dg_hier_level_4,$vsys_name,$device_name,$dg_id,$comment,$high_res_timestamp
          ```
       * [System](https://docs.paloaltonetworks.com/pan-os/10-1/pan-os-admin/monitoring/use-syslog-for-monitoring/syslog-field-descriptions/system-log-fields)
          ```
          ,$receive_time,$serial,$type,$subtype,,$time_generated,$vsys,$eventid,$object,,,$module,$severity,$opaque,$seqno,$actionflags,$dg_hier_level_1,$dg_hier_level_2,$dg_hier_level_3,$dg_hier_level_4,$vsys_name,$device_name,$high_res_timestamp
          ```
       * [Threat](https://docs.paloaltonetworks.com/pan-os/10-1/pan-os-admin/monitoring/use-syslog-for-monitoring/syslog-field-descriptions/threat-log-fields)
          ```
          ,$receive_time,$serial,$type,$subtype,,$time_generated,$src,$dst,$natsrc,$natdst,$rule,$srcuser,$dstuser,$app,$vsys,$from,$to,$inbound_if,$outbound_if,$logset,,$sessionid,$repeatcnt,$sport,$dport,$natsport,$natdport,$flags,$proto,$action,$misc,$threatid,$category,$severity,$direction,$seqno,$actionflags,$srcloc,$dstloc,$contenttype,$pcap_id,$filedigest,$cloud,$url_idx,$user_agent,$filetype,$xff,$referer,$sender,$subject,$recipient,$reportid,$dg_hier_level_1,$dg_hier_level_2,$dg_hier_level_3,$dg_hier_level_4,$vsys_name,$device_name,$src_uuid,$dst_uuid,$http_method,$tunnelid/$imsi,$monitortag/$imei,$parent_session_id,$parent_start_time,$tunnel,$thr_category,$contentver,$assoc_id,$ppid,$http_headers,$rule_uuid,$dynusergroup_name
          ```
       * [Traffic](https://docs.paloaltonetworks.com/pan-os/10-1/pan-os-admin/monitoring/use-syslog-for-monitoring/syslog-field-descriptions/traffic-log-fields)
          ```
          ,$receive_time,$serial,$type,$subtype,,$time_generated,$src,$dst,$natsrc,$natdst,$rule,$srcuser,$dstuser,$app,$vsys,$from,$to,$inbound_if,$outbound_if,$logset,$sessionid,$repeatcnt,$sport,$dport,$natsport,$natdport$,flags,$proto,$action,$bytes,$bytes_sent,$bytes_received,$packets,$start,$elapsed,$category,$seqno,$actionflags,$srcloc,$dstloc,$pkts_sent,$pkts_received,$session_end_reason,$dg_hier_level_1,$dg_hier_level_2,$dg_hier_level_3,$dg_hier_level_4,$vsys_name,$device_name,$action_source,$src_uuid,$dst_uuid,$tunnelid/$imsi,$monitortag/$imei,$parent_session_id,$parent_start_time,$tunnel,$assoc_id,$chunks,$chunks_sent,$chunks_received,$rule_uuid,$link_change_count,$policy_id,$link_switches,$sdwan_cluster,$sdwan_device_type,$sdwan_cluster_type,$sdwan_site,$dynusergroup_name
          ```
       * [Hip Match](https://docs.paloaltonetworks.com/pan-os/10-1/pan-os-admin/monitoring/use-syslog-for-monitoring/syslog-field-descriptions/hip-match-log-fields)
          ```
          ,$receive_time,$serial,$type,$subtype,,$time_generated,$srcuser,$vsys,$machinename,$os,$src,$matchname,$repeatcnt,$matchtype,$seqno,$actionflags,$dg_hier_level_1,$dg_hier_level_2,$dg_hier_level_3,$dg_hier_level_4,$vsys_name,$device_name,$vsys_id,$srcipv6,$hostid,$serialnumber,$mac,$high_res_timestamp
          ```
       * [UserID](https://docs.paloaltonetworks.com/pan-os/10-1/pan-os-admin/monitoring/use-syslog-for-monitoring/syslog-field-descriptions/user-id-log-fields)
          ```
          ,$receive_time,$serial,$type,$subtype,,$time_generated,$vsys,$ip,$user,$datasourcename,$eventid,$repeatcnt,$timeout,$beginport,$endport,$datasource,$datasourcetype,$seqno,$actionflags,$dg_hier_level_1,$dg_hier_level_2,$dg_hier_level_3,$dg_hier_level_4,$vsys_name,$device_name,$vsys_id,$factortype,$factorcompletiontime,$factorno,,,$ugflags,$userbysource,$high_res_timestamp
          ```
       * [GlobalProtect](https://docs.paloaltonetworks.com/pan-os/10-1/pan-os-admin/monitoring/use-syslog-for-monitoring/syslog-field-descriptions/globalprotect-log-fields)
          ```
          ,$receive_time,$serial,$type,$subtype,,$time_generated,$vsys,$eventid,$stage,$auth_method,$tunnel_type,$srcuser,$srcregion,$machinename,$public_ip,$public_ipv6,$private_ip,$private_ipv6,$hostid,$serialnumber,$client_ver,$client_os,$client_os_ver,$repeatcnt,$reason,$error,$opaque,$status,$location,$login_duration,$connect_method,$error_code,$portal,$seqno,$actionflags
          ```
    7. Click **OK**.
    8. Commit the changes.
1. Configure Palo Alto Firewall to send log messages to the Sumo Logic platform. Follow the Palo Alto documentation to [Configure Log Forwarding](https://docs.paloaltonetworks.com/pan-os/10-1/pan-os-admin/monitoring/configure-log-forwarding). 
1. To verify that your logs are successfully making it into Cloud SIEM:
    1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the top menu select **Configuration**, and then under **Incoming Data** select **Log Mappings**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Configuration**, and then under **Cloud SIEM Integrations** select **Log Mappings**. You can also click the **Go To...** menu at the top of the screen and select **Log Mappings**.  
    1. On the **Log Mappings** tab search for "Palo Alto" and check the **Records**.
    1. For a more granular look at the incoming records, you can also search the Sumo Logic platform for Palo Alto Firewall security records: <br/>`_index=sec_record* and metadata_vendor = "Palo Alto" and metadata_product = "Firewall"`