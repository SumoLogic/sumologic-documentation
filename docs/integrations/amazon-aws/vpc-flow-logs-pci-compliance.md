---
id: vpc-flow-logs-pci-compliance
title: PCI Compliance for Amazon VPC Flow Logs
description: The Sumo Logic App for Payment Card Industry (PCI) Compliance for Amazon VPC Flow Logs App offers dashboards to monitor systems, account and users activity to ensure that login activity and privileged users are within the expected ranges.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/pci-compliance/pci-logo.png')} alt="Thumbnail icon" width="90"/>

The Sumo Logic App for Payment Card Industry (PCI) Compliance for Amazon VPC Flow Logs App offers dashboards to monitor systems, account and users activity to ensure that login activity and privileged users are within the expected ranges. The PCI Compliance for Amazon VPC Flow Logs App covers PCI requirements 01, 02, and 04.

For more information on Amazon VPC Flow Logs, see [here](http://docs.aws.amazon.com/AmazonVPC/latest/UserGuide/flow-logs.html).


## Collect Logs for the PCI Compliance for Amazon VPC Flow Logs App

VPC Flow Logs can be published to Amazon CloudWatch Logs and Amazon S3. Each method has advantages. Using an Amazon S3 source is more reliable, while using a CloudFormation template allows you to customize your logs by adding more information and filtering unwanted data.

You can use either of the following methods to collect Amazon VPC Flow Logs:

* [Collect Amazon VPC Flow Logs using an Amazon S3 source](/docs/integrations/amazon-aws/vpc-flow-logs#collecting-amazon-vpc-flow-logs-using-an-amazon-s3-source)
* [Collect Amazon VPC Flow Logs using a CloudFormation template](/docs/integrations/amazon-aws/vpc-flow-logs#collecting-amazon-vpc-flow-logs-from-cloudwatch-using-cloudformation)

## Field Extraction Rule(s) for VPC Flow logs  
Create Field Extraction Rule for VPC Flow Logs.

```sql
Rule Name: VPCFlowLogFER
Applied at: Ingest Time
Scope (Specific Data):
_sourceCategory=<Source category for respective VPC flow log source>
Parse Expression:
json "logStream", "logGroup", "message", "direction" as logStream, logGroup, msg, direction nodrop
| if (_raw matches "{*", msg, _raw) as msg
| parse field=msg "* * * * * * * * * * * * * *" as version,accountID,interfaceID,src_ip,dest_ip,src_port,dest_port,Protocol,Packets,bytes,StartSample,EndSample,Action,status nodrop
```


## Installing the PCI Compliance for Amazon VPC Flow Logs App

Now that you have set up collection, install the Sumo Logic App for PCI Compliance For Amazon VPC Flow App to use the preconfigured searches and dashboards that provide insight into your data.

{@import ../../reuse/apps/app-install.md}

## Viewing the PCI VPC Dashboards

The Sumo Logic App for Payment Card Industry (PCI) Compliance for Amazon VPC Flow App offers dashboards to help you monitor that network traffic, network activities, and network security are within your expected ranges. The PCI Compliance for Amazon VPC Flow App covers PCI requirements 01, 02 and 04.


### PCI Req 01 - Accepted and Rejected Traffic

Monitor accepted and rejected traffic, drill down on accepted network traffic, or drill down on rejected network traffic.

<img src={useBaseUrl('img/integrations/amazon-aws/VPCFlowAcceptedandRejectedTraffic.png')} alt="PCI Compliance for Amazon VPC Flow App dashboards" />

* **Allowed Network Activity by Direction.** View a comparison between inbound and outbound traffic over the last 60 minutes, timesliced by 1 minute intervals.
* **Denied Network Activity by Direction.** View a comparison between inbound and outbound traffic over the last 60 minutes, timesliced by 1 minute intervals.
* **Allowed Traffic Over Time. **View a count of accepted traffic for the last 60 minutes.
* **Denied Traffic Over Time.** View a count of denied traffic for the last 60 minutes.
* **Allowed Network Activity by Transport and Internet Layer Protocol.** View a comparison between transport layers (IPV4, IPV6, TCP, SCTP, ICMP, UDP) over the last 60 minutes, timesliced by 1 minute intervals.
* **Network Traffic Accepted vs Rejected.** View a comparison between accepted and rejected network traffic over the last 60 minutes, timesliced by 1 minute intervals.
* **Network Traffic Accepted (Success) Top SrcIP. **View a count of the top 10 source IP addresses for accepted network traffic.
* **Network Traffic Accepted (Success) Top DestIP.** View a count of the top 10 destination IP addresses for accepted network traffic.
* **Network Traffic Rejected (Failure) Top SrcIP.** View a count of the top 10 source IP addresses for rejected network traffic.
* **Network Traffic Accepted (Failure) Top DestIP.** View a count of the top 10 destination IP addresses for rejected network traffic.


### PCI Req 01 - Traffic Direction Monitoring

Monitor inbound and outbound traffic.

<img src={useBaseUrl('img/integrations/amazon-aws/VPCFlowTrafficDirectionMonitoring.png')} alt="Amazon VPC Flow - PCI" />

* **Traffic to Cardholder Environment.**  View traffic to cardholder environments by time, destination IP address, destination port, source IP, account ID, interface ID, event count, message, and severity for the last 60 minutes.
* **Outbound Network Activity. **View the overall outbound network activity by source host IP address for the last 60 minutes.
* **Top 10 Host - Sending Outbound Traffic.** View sending network activity by the top 10 source host IP addresses for the last 60 minutes.
* **Inbound Network Activity.** View the overall inbound network activity by source host IP address for the last 60 minutes.
* **Top 10 Host - Receiving Inbound Traffic.** View the top 10 hosts receiving inbound network traffic by destination host and megabytes received for the last 60 minutes.


### PCI Req 01, 02 - Data Access Monitoring

Monitor data access.

<img src={useBaseUrl('img/integrations/amazon-aws/VPCFlowDataAccessMonitoring.png')} alt="Amazon VPC Flow - PCI" />

* **Traffic By Application Over Time.** View a bar chart of accepted network traffic by application for the last 60 minutes, timesliced by every 5 minutes.
* **Top TCP Dest Ports.** View an aggregation table of the top TCP 10 destination ports and a count of how often they were accessed over the last 60 minutes.
* **Multi-service Detected on Same Host. **View the an aggregation table of the destination IP address, time, message, and severity when multi-services are detected on the same host during the last 60 minutes.
* **Top UDP Dest Ports.** View an aggregation table of the top UDP 10 destination ports and a count of how often they were accessed over the last 60 minutes.


### PCI Req 02, 04 - Insecure Data In Transit

Monitor cardholder data in transit.

<img src={useBaseUrl('img/integrations/amazon-aws/VPCFlowInsecureDatainTransit.png')} alt="PCI Compliance for Amazon VPC Flow App dashboards" />

* **Insecure Transport Protocol to or from CDE.** View an aggregation table of high severity insecure network port activity  with the message “Insecure Transport Protocol to or from CDE” during the last 60 minutes. Table includes time, account ID, destination IP, destination port, interface ID, protocol, source IP, source count, event count, severity, and message.
* **Insecure Allowed Traffic by Application and Involved Host. **See a bar chart of the types of insecure network allowed traffic by each host IP address during the last 60 minutes.
* **Insecure Allowed Traffic by Target Port and Involved Host.** View the insecure allowed traffic by target port and involved host during the last 60 minutes.
* **Insecure Allowed Traffic by Protocol.** View the insecure allowed traffic by network protocol as a bar chart timesliced by every 5 minutes for the last 60 minutes.
* **Insecure Denied Traffic by Protocol.** View the insecure denied traffic by network protocol as a bar chart timesliced by every 5 minutes for the last 60 minutes.
* **Network Activity - Unencrypted Default Port.** View network activity by unencrypted default port as a bar chart timesliced by every 5 minutes for the last 60 minutes.
