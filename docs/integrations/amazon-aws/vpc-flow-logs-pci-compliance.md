---
id: vpc-flow-logs-pci-compliance
title: PCI Compliance for Amazon VPC Flow Logs
sidebar_label: PCI Compliance for Amazon VPC Flow Logs
description: The Sumo Logic App for Payment Card Industry (PCI) Compliance for Amazon VPC Flow Logs App offers dashboards to monitor systems, account and users activity to ensure that login activity and privileged users are within the expected ranges.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/pci-compliance/pci-logo.png')} alt="PCI icon" width="90"/>

The Sumo Logic App for Payment Card Industry (PCI) Compliance for Amazon VPC Flow Logs App offers dashboards to monitor systems, account and users activity to ensure that login activity and privileged users are within the expected ranges. The PCI Compliance for Amazon VPC Flow Logs App covers PCI requirements 01, 02, and 04.

For more information on Amazon VPC Flow Logs, see [here](https://docs.aws.amazon.com/AmazonVPC/latest/UserGuide/flow-logs.html).

## Sample log messages

```
2 123456789012 eni-abc123de 10.0.1.5 203.0.113.12 49152 3306 6 15 12000 1620077460 1620077520 ACCEPT OK
```

## Sample queries

```sumo title="Possible Vertical Port Scan - Allowed"
_sourceCategory=vpc_flow_logs ACCEPT
| where Action="ACCEPT"
| if (isPrivateIP(src_ip) and isPrivateIP(dest_ip), "internal", if (isPrivateIP(src_ip) and !isPrivateIP(dest_ip), "outbound","inbound")) as direction2
| if (!isEmpty(direction), direction, direction2) as direction
| count_distinct(dest_port) as UniqueDestinationPorts by dest_ip
| where UniqueDestinationPorts > 4
| sort by UniqueDestinationPorts
```

## Collect Logs for the PCI Compliance for Amazon VPC Flow Logs App

VPC Flow Logs can be published to Amazon CloudWatch Logs and Amazon S3. Each method has advantages. Using an Amazon S3 source is more reliable, while using a CloudFormation template allows you to customize your logs by adding more information and filtering unwanted data.

You can use either of the following methods to collect Amazon VPC Flow Logs:

* [Collect Amazon VPC Flow Logs using an Amazon S3 source](/docs/integrations/amazon-aws/vpc-flow-logs#collecting-amazon-vpc-flow-logs-using-an-amazon-s3-source)
* [Collect Amazon VPC Flow Logs using a CloudFormation template](/docs/integrations/amazon-aws/vpc-flow-logs#collecting-amazon-vpc-flow-logs-from-cloudwatch-using-cloudformation)

## Installing the PCI Compliance for Amazon VPC Flow Logs app

Now that you have set up collection, install the Sumo Logic app for PCI Compliance For Amazon VPC Flow to use the preconfigured searches and dashboards that provide insight into your data.

import AppInstallV2 from '../../reuse/apps/app-install-v2.md';

<AppInstallV2/>

As part of the app installation process, the following **content** will be created by default along with dashboards and monitor template:

#### Fields

- `logStream` CloudWatch log stream name (present when ingesting via CloudWatch).
- `logGroup` CloudWatch log group name (present when ingesting via CloudWatch).
- `msg` Normalized raw VPC flow log message used for field parsing.
- `direction` Traffic direction (inbound, outbound, or internal).
- `version` VPC Flow Logs version number.
- `accountID` AWS account ID associated with the flow log.
- `interfaceID` ID of the network interface for which traffic is recorded.
- `src_ip` Source IP address of the traffic.
- `dest_ip` Destination IP address of the traffic.
- `src_port` Source port of the traffic.
- `dest_port` Destination port of the traffic.
- `Protocol` IANA protocol number of the traffic.
- `Packets` Number of packets transferred during the flow.
- `bytes` Number of bytes transferred during the flow.
- `StartSample` Start time of the flow (Unix timestamp).
- `EndSample` End time of the flow (Unix timestamp).
- `Action` Whether traffic was ACCEPT or REJECT.
- `status` Logging status (OK, NODATA, or SKIPDATA).

#### Field Extraction Rule(s)

The FER **PciComplianceForAmazonVpcFlowFER** to extract fields `logStream`, `logGroup`, `msg`, `direction`, `version`, `accountID`, `interfaceID`, `src_ip`, `dest_ip`, `src_port`, `dest_port`, `Protocol`, `Packets`, `bytes`, `StartSample`, `EndSample`, `Action`, and `status` will be created as a part of app installation.

import DoNotModify from '../../reuse/apps/do-not-modify-installed-content.md';

<DoNotModify/>

## Viewing the PCI VPC dashboards

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

<ViewDashboards/>

:::note 
The PCI Compliance for Amazon VPC Flow App covers PCI requirements 01, 02, and 04.
:::

### PCI Req 01 - Accepted and Rejected Traffic

Monitor accepted and rejected traffic, drill down on accepted network traffic, or drill down on rejected network traffic.

<img src={useBaseUrl('img/integrations/amazon-aws/VPCFlowAcceptedandRejectedTraffic.png')} alt="PCI Compliance for Amazon VPC Flow App dashboards" />

* **Allowed Network Activity by Direction.** View a comparison between inbound and outbound traffic over the last 60 minutes, timesliced by 1 minute intervals.
* **Denied Network Activity by Direction.** View a comparison between inbound and outbound traffic over the last 60 minutes, timesliced by 1 minute intervals.
* **Allowed Traffic Over Time.** View a count of accepted traffic for the last 60 minutes.
* **Denied Traffic Over Time.** View a count of denied traffic for the last 60 minutes.
* **Allowed Network Activity by Transport and Internet Layer Protocol.** View a comparison between transport layers (IPV4, IPV6, TCP, SCTP, ICMP, UDP) over the last 60 minutes, timesliced by 1 minute intervals.
* **Network Traffic Accepted vs Rejected.** View a comparison between accepted and rejected network traffic over the last 60 minutes, timesliced by 1 minute intervals.
* **Network Traffic Accepted (Success) Top SrcIP.** View a count of the top 10 source IP addresses for accepted network traffic.
* **Network Traffic Accepted (Success) Top DestIP.** View a count of the top 10 destination IP addresses for accepted network traffic.
* **Network Traffic Rejected (Failure) Top SrcIP.** View a count of the top 10 source IP addresses for rejected network traffic.
* **Network Traffic Rejected (Failure) Top DestIP.** View a count of the top 10 destination IP addresses for rejected network traffic.


### PCI Req 01 - Traffic Direction Monitoring

Monitor inbound and outbound traffic.

<img src={useBaseUrl('img/integrations/amazon-aws/VPCFlowTrafficDirectionMonitoring.png')} alt="Amazon VPC Flow - PCI" />

* **Traffic to Cardholder Environment.**  View traffic to cardholder environments by time, destination IP address, destination port, source IP, account ID, interface ID, event count, message, and severity for the last 60 minutes.
* **Outbound Network Activity.** View the overall outbound network activity by source host IP address for the last 60 minutes.
* **Top 10 Host - Sending Outbound Traffic.** View sending network activity by the top 10 source host IP addresses for the last 60 minutes.
* **Inbound Network Activity.** View the overall inbound network activity by source host IP address for the last 60 minutes.
* **Top 10 Host - Receiving Inbound Traffic.** View the top 10 hosts receiving inbound network traffic by destination host and megabytes received for the last 60 minutes.


### PCI Req 01, 02 - Data Access Monitoring

Monitor data access.

<img src={useBaseUrl('img/integrations/amazon-aws/VPCFlowDataAccessMonitoring.png')} alt="Amazon VPC Flow - PCI" />

* **Traffic By Application Over Time.** View a bar chart of accepted network traffic by application for the last 60 minutes, timesliced by every 5 minutes.
* **Top TCP Dest Ports.** View an aggregation table of the top TCP 10 destination ports and a count of how often they were accessed over the last 60 minutes.
* **Multi-service Detected on Same Host.** View the an aggregation table of the destination IP address, time, message, and severity when multi-services are detected on the same host during the last 60 minutes.
* **Possible Port Scan Attack - Rejected.** View destination IPs with more than 4 unique destination ports rejected, indicating a possible vertical port scan that was blocked by security groups.
* **Possible Horizontal Port Scan Attack - Allowed.** View destination ports that were accepted on more than 4 distinct destination hosts, indicating a successful horizontal port scan where an attacker is discovering services across multiple hosts.
* **Possible Vertical Port Scan Attack - Allowed.** View destination IPs with more than 4 distinct accepted destination ports, indicating a successful vertical port scan where an attacker is mapping open services on a specific host.
* **Top UDP Dest Ports.** View an aggregation table of the top UDP 10 destination ports and a count of how often they were accessed over the last 60 minutes.


### PCI Req 02, 04 - Insecure Data In Transit

Monitor cardholder data in transit.

<img src={useBaseUrl('img/integrations/amazon-aws/VPCFlowInsecureDatainTransit.png')} alt="PCI Compliance for Amazon VPC Flow App dashboards" />

* **Insecure Transport Protocol to or from CDE.** View an aggregation table of high severity insecure network port activity  with the message “Insecure Transport Protocol to or from CDE” during the last 60 minutes. Table includes time, account ID, destination IP, destination port, interface ID, protocol, source IP, source count, event count, severity, and message.
* **Insecure Allowed Traffic by Application and Involved Host.** See a bar chart of the types of insecure network allowed traffic by each host IP address during the last 60 minutes.
* **Insecure Allowed Traffic by Target Port and Involved Host.** View the insecure allowed traffic by target port and involved host during the last 60 minutes.
* **Insecure Allowed Traffic by Protocol.** View the insecure allowed traffic by network protocol as a bar chart timesliced by every 5 minutes for the last 60 minutes.
* **Insecure Denied Traffic by Protocol.** View the insecure denied traffic by network protocol as a bar chart timesliced by every 5 minutes for the last 60 minutes.
* **Network Activity - Unencrypted Default Port.** View network activity by unencrypted default port as a bar chart timesliced by every 5 minutes for the last 60 minutes.

## Create monitors for the PCI Compliance for Amazon VPC Flow Logs app

import CreateMonitors from '../../reuse/apps/create-monitors.md';

<CreateMonitors/>

### PCI Compliance for Amazon VPC Flow Logs alerts

| Name | Description | Alert Condition | Recover Condition |
|:--|:--|:--|:--|
| `PCI Compliance For Amazon VPC Flow - External Direct Access to Database Ports` | This alert is triggered when an external (non-private) IP address successfully connects to a database port on an internal host. This is a direct PCI Req 01 violation indicating that database services in the cardholder data environment are accessible from the internet. | Count > 0 | Count < = 0 |
| `PCI Compliance For Amazon VPC Flow - Insecure Transport Protocol to or from CDE` | This alert is triggered when insecure transport protocols (FTP, Telnet, rlogin, or TFTP) are accepted to or from the cardholder data environment. This is a direct PCI Req 02, 04 violation as these protocols transmit data in clear text. | Count > 0 | Count < = 0 |
| `PCI Compliance For Amazon VPC Flow - Rejected Traffic Burst from Single Source` | This alert is triggered when a single source IP generates more than 100 rejected flows within a 5 minute window, indicating a targeted attack or brute-force scanning attempt against the network perimeter. | Count > 0 | Count < = 0 |
| `PCI Compliance For Amazon VPC Flow - Possible Horizontal Port Scan - Allowed` | This alert is triggered when a single destination port is accepted on more than 4 distinct destination hosts, indicating a successful horizontal port scan where an attacker is discovering services across multiple hosts. | Count > 0 | Count < = 0 |
| `PCI Compliance For Amazon VPC Flow - Possible Vertical Port Scan - Allowed` | This alert is triggered when a single destination IP has more than 4 distinct destination ports accepted, indicating a successful vertical port scan where an attacker is mapping open services on a specific host. | Count > 0 | Count < = 0 |
| `PCI Compliance For Amazon VPC Flow - Multi-Service Detected on Same Host` | This alert is triggered when a host is detected accepting both web traffic (ports 80, 8008, 8080, 443) and database traffic (MySQL, Redshift, PostgreSQL, MSSQL, etc.) simultaneously. This violates PCI DSS Req 2.2.1 which requires single primary function per server and indicates a network segmentation failure. | Count > 0 | Count < = 0 |
| `PCI Compliance For Amazon VPC Flow - Unencrypted HTTP Traffic to or from CDE` | This alert is triggered when unencrypted HTTP traffic (ports 80, 8008, 8080) is accepted to or from the cardholder data environment. PCI Req 04 requires all cardholder data to be encrypted during transmission over open, public networks. | Count > 0 | Count < = 0 |
| `PCI Compliance For Amazon VPC Flow - Large Outbound Data Transfer` | This alert is triggered when an internal host sends more than 100MB of data outbound in a 5 minute window. This is a potential data exfiltration indicator relevant to PCI Req 10.6 (review logs for anomalies) and Req 12.10 (incident response). | Count > 0 | Count < = 0 |

## Upgrade/Downgrade the PCI Compliance for Amazon VPC Flow Logs app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the PCI Compliance for Amazon VPC Flow Logs app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>
