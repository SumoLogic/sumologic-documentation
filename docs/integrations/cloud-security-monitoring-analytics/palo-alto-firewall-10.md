---
id: palo-alto-firewall-10
title: Palo Alto Firewall 10 Cloud Security Monitoring and Analytics
sidebar_label: Palo Alto Firewall 10
description: Introduction to the Cloud Security Monitoring and Analytics app for Palo Alto Firewall 10.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/cloud-security-monitoring-analytics/SecMon_PAN.png')} alt="Thumbnail icon" width="90"/>

The Palo Alto Firewall app helps you analyze traffic and gain a better understanding of your Palo Alto Networks environments. You can dig deep into the data, broken down by threat detection indicators, malware type, and so on.

## Sample Logs

The Palo Alto Networks 10 app uses [Traffic](https://docs.paloaltonetworks.com/pan-os/10-0/pan-os-admin/monitoring/use-syslog-for-monitoring/syslog-field-descriptions/traffic-log-fields) and [Threat](https://docs.paloaltonetworks.com/pan-os/10-0/pan-os-admin/monitoring/use-syslog-for-monitoring/syslog-field-descriptions/threat-log-fields) logs.

```json title="Traffic log"
Oct 09 10:19:15 SumPunFw07.sumotest.com 1,2019/10/09 10:19:15,001234567890002,TRAFFIC,drop,2304,2019/10/09 10:19:15,209.118.103.150,160.177.222.249,0.0.0.0,0.0.0.0,InternalServer,,,not-applicable,vsys1,inside,z1-FW-Transit,ethernet1/2,,All traffic,2019/10/09 10:19:15,0,1,63712,443,0,0,0x0,udp,deny,60,60,0,1,2019/10/09 10:19:15,0,any,0,0123456789,0x0,Netherlands,10.0.0.0-10.255.255.255,0,1,0,policy-deny,0,0,0,0,,SumPunFw07,from-policy,,,0,,0,,N/A,0,0,0,0,1202585d-b4d5-5b4c-aaa2-d80d77ba456e,0
```

```json title="Threat log"
 786 <10>1 2022-03-29T22:32:26+00:00 PA-VM.demo.bkacad.cf - - - - ,2022/03/29*22:32:26,164859314646745,THREAT,vulnerability,,2022/03/29*22:32:26,156.194.158.165,156.194.158.165,156.194.158.165,156.194.158.165,test-threat,,,unknown-udp,vsys1,Outside,Outside,ethernet1/1,ethernet1/1,Forward-Sumo,,8660,1,47495,9034,0,0,0x2000,udp,drop,,Realtek Jungle SDK Remote Code Execution Vulnerability(91535),any,critical,client-to-server,1648593146467628956,0x0,Korea Republic Of,156.194.158.165-156.194.158.165,,,0,,,0,,,,,,,,0,0,0,0,0,,PA-VM,,,,,N/A_id/0,/,0,,N/A,code-execution,AppThreat-8468-6979,,0,1648593146,,,141fd502-fc32-4867-b9a5-5c421583a44b,0,,,,,,,,,,,,,,, ,,,,,,,,,,,,,,0,2022-03-29T22:32:26.467+00:00,,,,unknown,unknown,unknown,1,,,no,no /
```

## Sample Query

This example query is from the **Top 20 Hosts with Outbound Traffic** panel of the **Outbound Traffic and Potential Exfiltration Activity** dashboard.

```sql
_sourceCategory = Labs/PaloAltoNetworksv10 TRAFFIC
| csv _raw extract 1 as f1, 2 as Receive_Time, 3 as serialNum, 4 as type, 5 as subtype, 6 as f2, 7 as LogGenerationTime, 8 as src_ip, 9 as dest_ip, 10 as NAT_src_ip, 11 as NAT_dest_ip, 12 as ruleName, 13 as src_user, 14 as dest_user, 15 as app, 16 as vsys, 17 as src_zone, 18 as dest_zone, 19 as inbound_interface, 20 as outbound_interface, 21 as LogAction, 22 as f3, 23 as SessonID, 24 as RepeatCount, 25 as src_port, 26 as dest_port, 27 as NAT_src_port, 28 as NAT_dest_port, 29 as flags, 30 as protocol, 31 as action, 32 as bytes, 33 as bytes_sent, 34 as bytes_recv, 35 as Packets, 36 as StartTime, 37 as ElapsedTime, 38 as Category, 39 as f4, 40 as seqNum, 41 as ActionFlags, 42 as src_Country, 43 as dest_country, 44 as f5, 45 as pkts_sent, 46 as pkts_received, 47 as session_end_reason, 48 as Device_Group_Hierarchy_l1, 49 as Device_Group_Hierarchy_l2, 50 as Device_Group_Hierarchy_l3, 51 as Device_Group_Hierarchy_l4, 52 as vsys_Name, 53 as DeviceName, 54 as action_source, 55 as Source_VM_UUID, 56 as Destination_VM_UUID, 57 as Tunnel_ID_IMSI, 58 as Monitor_Tag_IMEI, 59 as Parent_Session_ID, 60 as parent_start_time, 61 as Tunnel, 62 as SCTP_Association_ID, 63 as SCTP_Chunks, 64 as SCTP_Chunks_Sent, 65 as SCTP_Chunks_Received, 66 as UUIDforrule, 67 as HTTP2Connection, 68 as AppFlapCount ,69 as PolicyID ,70 as LinkSwitches ,71 as SDWANCluster ,72 as SDWANDeviceType ,73 as SDWANClusterType ,74 as SDWANSite ,75 as DynamicUserGroupName ,76 as XFFAddress ,77 as SourceDeviceCategory ,78 as SourceDeviceProfile ,79 as SourceDeviceModel ,80 as SourceDeviceVendor ,81 as SourceDeviceOSFamily ,82 as SourceDeviceOSVersion ,83 as SourceHostname ,84 as SourceMACAddress ,85 as DestinationDeviceCategory ,86 as DestinationDeviceProfile ,87 as DestinationDeviceModel ,88 as DestinationDeviceVendor ,89 as DestinationDeviceOSFamily ,90 as DestinationDeviceOSVersion ,91 as DestinationHostname ,92 as DestinationMACAddress ,93 as ContainerID ,94 as PODNamespace ,95 as PODName ,96 as SourceExternalDynamicList ,97 as DestinationExternalDynamicList ,98 as HostID ,99 as UserDeviceSerialNumber ,100 as SourceDynamicAddressGroup ,101 as DestinationDynamicAddressGroup ,102 as SessionOwner ,103 as HighResolutionTimestamp ,104 as ASliceServiceType ,105 as ASliceDifferentiator
| where type="TRAFFIC"
| isPrivateIP(src_ip) as private_src_ip
| where private_src_ip
| isPublicIP(dest_ip) as public_dest_ip
| where public_dest_ip
| sum(bytes_sent) as bytes_sent, sum(bytes_recv) as bytes_received by src_ip
| top 20 src_ip by bytes_sent
```


## Prerequisites

You must have Palo Alto Networks Web administrative user permissions to successfully complete these tasks.

## Collecting Logs for Palo Alto Firewall 10

This section provides instructions for configuring log collection for the Sumo Logic App for Palo Alto Firewall 10, as well as sample log messages and a query example from an app dashboard.

### Step 1. Create a hosted collector and Cloud Syslog source
In this step you configure a hosted collector with a Cloud Syslog source that will act as Syslog server to receive logs and events from Palo Alto Networks devices.

To configure a hosted collector with a Cloud Syslog source, do the following:

1. Log in to Sumo Logic and [create a Hosted Collector](/docs/send-data/hosted-collectors#Create-a-Hosted-Collector).
2. Create a [Cloud Syslog Source](/docs/send-data/hosted-collectors/cloud-syslog-source) on the hosted collector, specifying the following:
   * Enter a Source Name.
   * Provide a Source Category: **NW/PAN/V10**
3. Click **Save**.
4. Copy the Token, host URL and TCP TLS Port to a safe place. You will need this information in the tasks that follow.


### Step 2. Define the destination for the logs

In this step you create a server profile where you can define the log destination. This will be the host name, port and protocol (TLS) of the Sumo Logic Cloud Syslog source.

To create a server profile specifying  the log destination, do the following:

1. Login to the Palo Alto Networks Web interface as an administrative user.
2. Select **Device tab > Server Profiles > Syslog**.
3. Click **Add** at the bottom of the screen and provide endpoint details and a profile name, such as `Sumo_Logs_Profile01`.
4. In the **Syslog Server Profile** window, select the **Servers** tab and click **Add**.
5. In the **Servers** window, specify the following information:
   * **Name.** `Sumo_CloudSyslog_EndPoint01`
   * **Syslog Server.** URL from [Step 1](#step-1-create-a-hosted-collector-and-cloud-syslog-source)
   * **Transport**. SSL
   * **Port**. Port from [Step 1](#step-1-create-a-hosted-collector-and-cloud-syslog-source)
   * **Format**. IETF
   * **Facility.** LOG_USER
6. In the **Syslog Server Profile** window, select the **Custom Log Format** tab, and use the following custom formats for the following log types:
   * [Traffic](https://docs.paloaltonetworks.com/pan-os/10-0/pan-os-admin/monitoring/use-syslog-for-monitoring/syslog-field-descriptions/traffic-log-fields)
    ```bash
    ,$receive_time,$serial,$type,$subtype,,$time_generated,$src,$dst,$natsrc,$natdst,$rule,$srcuser,$dstuser,$app,$vsys,$from,$to,$inbound_if,$outbound_if,$logset,,$sessionid,$repeatcnt,$sport,$dport,$natsport,$natdport,$flags,$proto,$action,$bytes,$bytes_sent,$bytes_received,$packets,$start,$elapsed,$category,,$seqno,$actionflags,$srcloc,$dstloc,,$pkts_sent,$pkts_received,$session_end_reason,$dg_hier_level_1,$dg_hier_level_2,$dg_hier_level_3,$dg_hier_level_4,$vsys_name,$device_name,$action_source,$src_uuid,$dst_uuid,$tunnelid/$imsi,$monitortag/$imei,$parent_session_id,$parent_start_time,$tunnel,$assoc_id,$chunks,$chunks_sent,$chunks_received,$rule_uuid,$http2_connection,$link_change_count,$policy_id,$link_switches,$sdwan_cluster,$sdwan_device_type,$sdwan_cluster_type,$sdwan_site,$dynusergroup_name,$xff_ip,$src_category,$src_profile,$src_model,$src_vendor,$src_osfamily,$src_osversion,$src_host,$src_mac,$dst_category,$dst_profile,$dst_model,$dst_vendor,$dst_osfamily,$dst_osversion,$dst_host,$dst_mac,$container_id,$pod_namespace,$pod_name,$src_edl,$dst_edl,$hostid,$serialnumber,$src_dag,$dst_dag,$session_owner,$high_res_timestamp,$nsdsai_sst,$nsdsai_sd <Token from Step 1>
    ```
   * [Threat](https://docs.paloaltonetworks.com/pan-os/10-0/pan-os-admin/monitoring/use-syslog-for-monitoring/syslog-field-descriptions/threat-log-fields)
    ```bash
    ,$receive_time,$serial,$type,$subtype,,$time_generated,$src,$dst,$natsrc,$natdst,$rule,$srcuser,$dstuser,$app,$vsys,$from,$to,$inbound_if,$outbound_if,$logset,,$sessionid,$repeatcnt,$sport,$dport,$natsport,$natdport,$flags,$proto,$action,,$threatid,$category,$severity,$direction,$seqno,$actionflags,$srcloc,$dstloc,,$contenttype,$pcap_id,$filedigest,$cloud,$url_idx,$user_agent,$filetype,$xff,$referer,$sender,$subject,$recipient,$reportid,$dg_hier_level_1,$dg_hier_level_2,$dg_hier_level_3,$dg_hier_level_4,$vsys_name,$device_name,,$src_uuid,$dst_uuid,$http_method,$tunnel_id/$imsi,$monitortag/$imei,$parent_session_id,$parent_start_time,$tunnel,$thr_category,$contentver,,,,$http_headers,$url_category_list,$rule_uuid,$http2_connection,$dynusergroup_name,$xff_ip,$src_category,$src_profile,$src_model,$src_vendor,$src_osfamily,$src_osversion,$src_host,$src_mac,$dst_category,$dst_profile,$dst_model,$dst_vendor,$dst_osfamily,$dst_osversion,$dst_host,$dst_mac,$container_id,$pod_namespace,$pod_name,$src_edl,$dst_edl,$hostid,$serialnumber,,$src_dag,$dst_dag,$partial_hash,$high_res_timestamp,$reason,$justification, <Token from Step 1>
    ```
7. Click OK.
8. Commit the changes.


### Step 3. Configure syslog forwarding

To configure syslog forwarding for traffic and threat logs, follow the steps to [Configure Log Forwarding](https://docs.paloaltonetworks.com/pan-os/8-1/pan-os-admin/monitoring/configure-log-forwarding) as described in the Palo Networks documentation.

As of March 24, 2022, some Palo Alto Network systems have experienced troubles with validating the Sumo Logic certificate due to their OCSP checking logic. Please contact Palo Alto’s support for  a workaround, and if needed, contact Sumo Logic’s support for the related Palo Alto Case number.


### Step 4. Verify logs in Palo Alto Networks

In this step, you view logs using the Palo Alto Network Web interface to confirm the logs are generated on the firewall.

To verify the logs in Palo Alto Networks, do the following:
1. In the Palo Alto Networks UI, select **Monitor** > **Logs**.
2. Once the setup is done, log in to Sumo Logic.
3. To validate that the logs are flowing to Sumo Logic, run a query using the source category you configured during [Step 1](#step-1-create-a-hosted-collector-and-cloud-syslog-source), such as: `_sourceCategory = NW/PAN/V10`.


## Installing the PAN Firewall 10 Security App

Now that you have set up collection for the Palo Alto Firewall 10 app, you can install the app and use the preconfigured searches and dashboards that provide insight into your data.

This app supports PAN-OS v10.

{@import ../../reuse/apps/app-install.md}

## Viewing PAN Firewall 10 Security Dashboards

### Security Analytics - Communication via Critical Ports

**Dashboard description:** Provides analytics including trending for outbound communications via well known ports. Also provides additional analysis of application communications attempts across the firewall.

**Use case:** You can use this dashboard to analyze daily traffic patterns in outbound volumes of traffic for the following ports: 21, 22, 23, 53, 123, 137, 138, 389, 445, and 3389. The graph on the left compares the current day’s traffic volumes with the volumes of the same time one, two, and three days ago. The table on the right provides a sortable list of those connections.

Additionally at the top of the dashboard are two table containing analytics on known and unknown applications connections using the ports listed above.

<img src={useBaseUrl('img/integrations/cloud-security-monitoring-analytics/Palo-Alto-10-Security-Analytics-Communication-via-Critical-Ports.png')} alt="Palo Alto Firewall 10 Security Dashboards" />

### Security Analytics - Outbound Traffic and Potential Exfiltration Activity

**Dashboard description:** View outbound traffic analysis including DNS activity for potential indicators of exfiltration activity.

**Use case: **You can use this dashboard to review volumes of outbound traffic by host, by application, and timeframe comparisons with last week. Increased and unaccounted for increases in traffic may be the result of unauthorized exfiltration of information. Additional analysis is provided for DNS traffic alone as large amounts of DNS traffic are not part of normal operations.

<img src={useBaseUrl('img/integrations/cloud-security-monitoring-analytics/Palo-Alto-10-Security-Analytics-Outbound-Traffic-and-Potential-Exfiltration-Activity.png')} alt="Palo Alto Firewall 10 Security Dashboards" />


### Security Analytics - Potentially Malicious Activity

**Dashboard description:** See information about traffic to and from IP addresses called out as potentially malicious by threat intelligence, countries that are on the OFAC (embargoed) list, and potential port scans.

**Use case:** You can use this dashboard to analyze attempted and successful connections to IP addresses on threat intelligence lists both inbound and outbound. Additionally you can view connections to geolocation IP addresses associated with countries on the OFAC list (USA embargo list). Finally the bottom panel provides analysis on vertical port scans (one target, scanned on multiple network ports) and horizontal port scans (same port scanned across multiple destinations.)

<img src={useBaseUrl('img/integrations/cloud-security-monitoring-analytics/Palo-Alto-10-Security-Analytics-Potentially-Malicious-Activity.png')} alt="Palo Alto Firewall 10 Security Dashboards" />


### Security Monitoring - THREAT Log by Category

**Dashboard description:** See analytics about the THREAT type logs provided by the firewall. These are the indications of security events detected by the firewall’s defensive measures such as anti-malware, network intrusion detection, and the like.   

**Use case:** You can use this dashboard to review THREAT events in summary or broken down by category: Command-and-control, Phishing, Malware, Proxy Anonymizers, Newly Registered Domains, Cryptocurrency, Questionable,  and High-Risk.

<img src={useBaseUrl('img/integrations/cloud-security-monitoring-analytics/Palo-Alto-10-Security-Monitoring-THREAT-Log-by-Category.png')} alt="Palo Alto Firewall 10 Security Dashboards" />

### Security Monitoring - THREAT Logs by Severity

**Dashboard description:** See analytics about the THREAT type logs provided by the firewall. These are the indications of security events detected by the firewall’s defensive measures such as anti-malware, network intrusion detection, and the like.   

**Use case:** You can use this dashboard to review THREAT events broken down by severity, allowing you to focus on the critical events first but also providing events of lesser severity for additional triage and investigation if necessary.

<img src={useBaseUrl('img/integrations/cloud-security-monitoring-analytics/Palo-Alto-10-Security-Monitoring-THREAT-Log-by-Severity.png')} alt="Palo Alto Firewall 10 Security Dashboards" />


### Security Monitoring - TRAFFIC Log Overview

**Dashboard description:** See monitoring of allowed and denied traffic over time by volume and host.

**Use case:** You can use this dashboard to monitor allowed and denied traffic through the firewall. Analysis is provided over time and in lists of top 10 sources, destinations, and hosts.

<img src={useBaseUrl('img/integrations/cloud-security-monitoring-analytics/Palo-Alto-10-Security-Monitoring-TRAFFIC-Log-Overview.png')} alt="Palo Alto Firewall 10 Security Dashboards" />
