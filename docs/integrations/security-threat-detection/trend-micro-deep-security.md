---
id: trend-micro-deep-security
title: Trend Micro Deep Security
sidebar_label: Trend Micro Deep Security
description: The Trend Micro Deep Security App works with system and security events to monitor event history such as anti-malware, IPS, web reputation, firewall, integrity and log inspection events.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src='https://upload.wikimedia.org/wikipedia/commons/f/f4/Trend_Micro_logo.svg' alt="thumbnail icon" width="100"/>

The Trend Micro Deep Security App works with system and security events to monitor event history such as anti-malware, IPS, web reputation, firewall, integrity and log inspection events. The App analyzes security events from both on-premises and cloud-based Trend Micro Deep Security products.


## Log Types

There are two types of Deep Security events:

* System Events
* Security Events

For complete details on configuring your Deep Security system for use with Sumo Logic, see the White Paper, [“Deep Security Integration with Sumo Logic”](http://www.trendmicro.com/aws/wp-content/uploads/2016/06/Deep-Security-Sumo-Logic-Integration-Guide-FV1.62.pdf).


## Collect on-premises logs for the Trend Micro Deep Security App

This section provides instructions for configuring on-prem log collection for the Trend Micro Deep Security App, as well as examples of relevant log and query samples.


### Configure Collector and Sources

To collect logs for Deep Security, do the following:

1. Configure a [Installed Collector](/docs/send-data/installed-collectors).
2. Configure a [Syslog Source](/docs/send-data/installed-collectors/sources/syslog-source).

When you configure the Syslog Sources, for Protocol, select UDP.


### Configure Deep Security System Event Log Forwarding

For complete details on configuring your Deep Security system for use with Sumo Logic, see the White Paper, “[Deep Security Integration with Sumo Logic](http://www.trendmicro.com/aws/wp-content/uploads/2016/06/Deep-Security-Sumo-Logic-Integration-Guide-FV1.62.pdf)”.


To forward Deep Security system events to Sumo Logic, do the following:

1. In Deep Security, go to **Administration > System Settings > SIEM**.
2. Configure **SIEM**:
    1. **Forward System Events to a remote computer (via Syslog). **Activate this check box.
    2. **Hostname or IP address to which events should be sent.** This is the hostname or IP address of the Sumo Logic Installed Collector.
    3. **UDP port to which events should be sent. ** Enter 514.
    4. **Syslog Facility.** Select Local 0.
    5. **Syslog Format.** Select Common Event Format.
3. Save your changes.


### Configure the Policy

Now you must add the Syslog Source to your Policy configuration. Set the integration details at the Top (root/base) policy as follows:

1. Go to **Settings > SIEM**.
2. For **Anti-Malware Event Forwarding**, select **Forward Events To:** and **Relay via the Manager**.
    1. **Hostname or IP address to which events should be sent. **This is the hostname or IP address of the Sumo Logic Installed Collector.
    2. **UPD port to which events should be sent. ** Enter **514**.
    3. **Syslog Facility. **Select **Local 1**.
    4. **Syslog Format.** Select **Common Event Format**.
3. For **Web Reputation Event Forwarding**, select **Forward Events To:** and **Relay via the Manager**.
    5. **Hostname or IP address to which events should be sent. **This is the hostname or IP address of the Sumo Logic Installed Collector.
    6. **UPD port to which events should be sent.**  Enter **514**.
    7. **Syslog Facility.** Select **Local 1**.
    8. **Syslog Format.** Select **Common Event Format**.
4. Click **Save**.


### Sample Log Message

```json
<142>Oct  2 16:41:16 CEF:0|Trend Micro|Deep Security Agent|9.6.3177|21|Unsolicited UDP|5|cn1=34 cn1Label=Host ID dvchost=workstation_tsiley TrendMicroDsTenant=Primary TrendMicroDsTenantId=0 act=Deny dmac=B0:B9:B9:F8:E7:8F smac=39:D2:AE:D6:1F:05 TrendMicroDsFrameType=IP src=130.202.140.130 dst=10.0.102.94 in=291 cs3= cs3Label=Fragmentation Bits proto=UDP spt=445 dpt=42 cnt=1
```

### Query Sample


```sql title="Top 5 Reasons For Prevented Packets"
_sourceCategory=Trendmicro dst
| parse "CEF:0|*|*|*|*|*|*|*" as Device_Vendor,Device_Product,Device_Version,Signature_ID, Name, Severity, Extension
| where (signature_id >= 100 AND signature_id <= 199) OR signature_id = 20 OR signature_id = 21
| count Name
| top 5 Name by _count
```



### Collect cloud-based logs for the Trend Micro Deep Security App

This section has instructions for collecting logs for the Trend Micro Deep Security using a Sumo Cloud Syslog source on a hosted collector.


#### Step 1: Create a Cloud Syslog source on a hosted collector

1. Select an existing [hosted collector](/docs/send-data/hosted-collectors), or create a new one.
2. Add a [Cloud Syslog source](/docs/send-data/hosted-collectors/cloud-syslog-source) to the hosted collector.
    1. Give the source a name
    2. Enter a Source Category.
    3. Deselect the **Enable Timestamp Parsing**.
    4. Click **Save**.
3. The Cloud Syslog Source Token will be generated. You'll supply this information as input to the Log Source Identifier, Server Name, and Server Port within Deep Security.

Supply this information as input to the Log Source Identifier: Server Name, and Server Port within Deep Security.

For Log Source Identifier field, use this format: `Deep Security Manager [token from Cloud Syslog source]`

Note the spaces with `Deep Security Manager`.



#### Step 2: Configure Sumo as a syslog server in Trend Micro Deep Security.

1. In the Deep Security Manager console, select **Policies > Common Objects.**
2. Expand the **Other** node in the left pane.
3. Select **Syslog Configurations**.
4. Select the **New **button to create a new configuration.
    1. **Log Source Identifier**. Enter a three word label, for example “Deep Security Manager” or “My Log Source”, followed by value that was shown in the **Token** field on the **Cloud Syslog Source Token** page (when you configured the Cloud Syslog Source above), surrounded by square brackets like this: `Deep Security Manager [token from Cloud Syslog source]`. It's important that you use this format. `Deep Security Manager` followed by the `token` (for the Cloud Syslog Source) in square brackets like this:
     ```
     Deep Security Manager [token from Cloud Syslog source]
     ```
1. **Server Name**. Enter the value that was shown in the **Host** field on the **Cloud Syslog Source Token** page when you configured the Cloud Syslog Source above.
2. **Server Port**.  Enter the value that was shown in the **Port** field on the **Cloud Syslog Source Token** page when you configured the Cloud Syslog Source above.
3. **Transport**. Leave "TLS" selected. To check your connection for TLS, see [Troubleshooting](/docs/send-data/hosted-collectors/cloud-syslog-source#troubleshooting) in our Cloud Syslog Source article.
4. Click **OK**.


#### Step 3: Forward system and security events to Sumo Logic

1. In the Deep Security Manager console, select **Policies**.
2. Double-click the policy you want to use for forwarding events.
3. Go to **Settings > Event Forwarding**.
4. Under **Event Forwarding Frequency (from the Agent/Appliance)**, specify how often events are to be sent to Sumo Logic.
5. Under **Event Forwarding Configuration (from the Agent/Appliance)**, specify the syslog configuration to use for each protection module, choosing from the following options:
   * **Inherited (configuration name):** The behavior is inherited from a parent policy or computer.
   * **None:** Events are not forwarded.
   * **_Syslog (configuration name):** Events are forwarded to the specified syslog configuration. To see details about the configuration or edit it, click **Edit**. The configuration must have **Agents should forward logs** set to "Via the Deep Security Manager".
   * **New:** Enables you to define a new configuration (for details, see [Define a syslog configuration](https://help.deepsecurity.trendmicro.com/siem-syslog-forwarding-secure.html#Define).) The configuration must have **Agents should forward logs** set to "Via the Deep Security Manager".
1. Click **Save**.


#### Verify configuration

Send System Events to confirm communication with Sumo Logic. There may be a 5-10 minute delay.


## Installing the Trend Micro Deep Security App

This section provides instructions on how to install the Trend Micro Deep Security App, and examples of each of the dashboards. The App reconfigured searches and dashboards that provide easy-to-access visual insights into your data.

{@import ../../reuse/apps/app-install.md}

## Viewing Trend Micro Dashboards


### Deep Security - Overview

<img src={useBaseUrl('img/integrations/security-threat-detection/TMDS_Overview_Dashboard.png')} alt="Trendmicro Dashboard" />

**Anti-Malware Event History.** Displays the number and types of anti-malware events in a stacked column chart on a timeline for the last 24 hours.

**IPS Event History.** Shows the number and types of IPS events in a stacked column chart on a timeline for the last 24 hours.

**Web Reputation Event History.** Provides details on the number and types of web reputation events in a stacked column chart on a timeline for the last 24 hours.

**Firewall Event History.** Displays the number and types of firewall events in a stacked column chart on a timeline for the last 24 hours.

**Integrity Monitoring Event History.** Shows the number and types of integrity monitoring events in a stacked column chart on a timeline for the last 24 hours.

**Log Inspection Events History.** Provides details on the number and types of log inspection events in a stacked column chart on a timeline for the last 24 hours.


### Deep Security - Anti-Malware

<img src={useBaseUrl('img/integrations/security-threat-detection/TMDS_AntiMalware_Dashboard.png')} alt="Trendmicro Dashboard" />

**Anti-Malware Event History.** Displays the number and type of anti-malware events in a column chart on a timeline for the last 24 hours.

**Top 5 Detected Malware.** Shows the top 5 types of malware detected in a pie chart for the last 24 hours.

**Top 5 Infected Computers.** Lists the top 5 infected computers in a table chart by device host name and count for the last 24 hours.


### Deep Security - Firewall

<img src={useBaseUrl('img/integrations/security-threat-detection/TMDS_Firewall_Dashboard.png')} alt="Trendmicro Dashboard" />

**Firewall Events History.** Displays the number and type of firewall events in a column chart on a timeline for the last 24 hours.

**Reconnaissance Scan History.** Shows the number and type of reconnaissance scan events in a column chart on a timeline for the last 24 hours.

**Top 5 Reasons for Prevented Packets.** Lists the top 5 reasons why packets were prevented in a table chart by device host name and count for the last 24 hours.

**Top 5 Computers for Prevented Firewall Events. **Displays the top 5 computers that had prevented firewall events in a table chart by device host name and count for the last 24 hours.

**Top 5 Source IDs for Prevented Firewall Events. **Shows the top 5 computers that had prevented firewall events in a table chart by source IP address and count for the last 24 hours.

**Top 5 Destination Ports for Prevented Firewall Events. **Provides details on the top 5 destination ports that had prevented firewall events in a table chart by destination port and count for the last 24 hours.

**Top 5 Scans Detected.** Displays the top 5 scans detected in a table chart by name and count for the last 24 hours.

**Top 5 Computers for Reconnaissance Scans.** Shows the top 5 computers for reconnaissance scans in a table chart by target entry and count for the last 24 hours.


### Deep Security - Integrity Monitoring

<img src={useBaseUrl('img/integrations/security-threat-detection/TMDS_IntegrityMonitoring_Dashboard.png')} alt="Trendmicro Dashboard" />

**Integrity Monitoring Event History. **Displays the number and type of integrity monitoring events in a column chart on a timeline for the last 24 hours.

**Top 5 Computers for Integrity Monitoring Events. **Shows the top 5 computers that had integrity monitoring events in a table chart by device host name and count for the last 24 hours.

**Top 5 Reasons for Integrity Monitoring Events.** Lists the top 5 reasons for integrity monitoring events in a table chart by name and count for the last 24 hours.

**Top 5 Keys for Integrity Monitoring Events.** Displays the top 5 keys for integrity monitoring events in a table chart for the last 24 hours.


### Deep Security - Intrusion Prevention

<img src={useBaseUrl('img/integrations/security-threat-detection/TMDS_IntrusionPrevention_Dashboard.png')} alt="Trendmicro Dashboard" />

**IPS Event History. **Displays the number and type of intrusion prevention events in a column chart on a timeline for the last 24 hours.

**Top 5 Source IPs for Detected IPS Events. **Lists the top 5 Source IPs for detected intrusion prevention events in a table chart by source IP and count for the last 24 hours.  

**Top Hosts for Prevented IPS Events.** Shows the top 5 hosts for prevented intrusion events in a table chart by device host name and count for the last 24 hours.

**Top 5 Reasons for Detected IPS Events.** Displays the top 5 reasons for detected intrusion prevention events in a table chart by name and count for the last 24 hours.


### Deep Security - Log Inspection

<img src={useBaseUrl('img/integrations/security-threat-detection/TMDS_LogInspection_Dashboard.png')} alt="Trendmicro Dashboard" />

**Log Inspection Events History.** Displays the number and type of log inspection events in a column chart on a timeline for the last 24 hours.

**Top 5 Computers for Log Inspection Events. **Lists the top 5 computers for log inspection events in a table chart by device host name and count for the last 24 hours.

**Top 5 Reasons for Log Inspection Events.** Shows the top 5 reasons for log inspection events in a table chart by device host name and count for the last 24 hours.

**Top 5 Descriptions for Log Inspection Events.** Displays the top 5 descriptions for log inspection events in a table chart by device host name and count for the last 24 hours.


### Deep Security - Web Reputation

<img src={useBaseUrl('img/integrations/security-threat-detection/TMDS_WebReputation_Dashboard.png')} alt="Trendmicro Dashboard" />

**Web Reputation Event History.** Displays the number and type of web reputation events in a column chart on a timeline for the last 24 hours.

**Top 5 Computers for Web Reputation Events.** Shows the top 5 computers that have had web reputation events by device host name and count for the last 24 hours.

**Top 5 URLs for Web Reputation Events.** Lists the top 5 URLs that have had web reputation events by URL and count for the last 24 hours.


## Filters

The Sumo Logic App for Trend Micro - Deep Security provides the following filters:

* file
* severity
* signature_id
