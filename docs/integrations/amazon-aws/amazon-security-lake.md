---
id: amazon-security-lake
title: Amazon Security Lake
sidebar_label: Amazon Security Lake
description: The Sumo Logic app for Amazon Security Lake provides comprehensive security monitoring and analytics across your AWS environment by ingesting security events from Amazon Security Lake.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/amazon-aws/amazon-security-lake-logo.png')} alt="Amazon Security Lake logo" width="50" />

The Sumo Logic App for Amazon Security Lake provides unified visibility into security activity across AWS accounts and regions by analyzing events ingested from Amazon Security Lake and normalized using the Open Cybersecurity Schema Framework (OCSF). With pre-built dashboards for network activity, identity and access management, application telemetry, and host-level system activity, the app helps security teams detect threats, investigate anomalies, monitor trends, and continuously assess their AWS security posture.

:::info
This app includes [built-in monitors](#amazon-security-lake-alerts). For details on creating custom monitors, refer to [Create monitors for Amazon Security Lake app](#create-monitors-for-amazon-security-lake-app).
:::

## Log type

This app uses the [Amazon Security Lake Source](/docs/send-data/hosted-collectors/amazon-aws/amazon-security-lake-source/) to collect security events from Amazon Security Lake. Events follow the [Open Cybersecurity Schema Framework (OCSF)](https://schema.ocsf.io/1.9.0/categories?extensions=&profiles=host) and are delivered in JSON format. The app supports the following OCSF event categories:

- **Identity & Access Management (IAM)**. Authentication, Authorize Session, Entity Management, Group Management, User Management, and Role Management events.
- **Network Activity**. Network, DHCP, HTTP, DNS, RDS SMB, SSH, FTP, Email, NTP, and Tunnel activity events.
- **Application Activity**. Web Resources, Application Lifecycle, API, Datastore, File Hosting, Scan, and Application Errors events
- **System Activity**. File System, Kernel Extension, Kernel, Memory, Module, Scheduled Job, Process, Event Log, Script, Peripheral, Device Power State, and Clipboard events

### Sample log message

<details>
<summary>Click to expand</summary>

```json title="OCSF Network Activity Event"
{
  "metadata": {
    "product": {
      "name": "Amazon VPC",
      "uid": "arn:aws:securitylake:us-east-1::product/aws/vpc-flow-logs",
      "vendor_name": "AWS",
      "version": "5"
    },
    "profiles": ["cloud", "datetime", "network"],
    "version": "1.9.0"
  },
  "time": 1695000000000,
  "severity": "Informational",
  "severity_id": 1,
  "class_name": "Network Activity",
  "class_uid": 4001,
  "category_name": "Network Activity",
  "category_uid": 4,
  "activity_id": 1,
  "activity_name": "Open",
  "type_name": "Network Activity: Open",
  "type_uid": 400101,
  "status": "Success",
  "status_id": 1,
  "cloud": {
    "account": {
      "type": "AWS Account",
      "type_id": 10,
      "uid": "123456789012"
    },
    "region": "us-east-1",
    "provider": "AWS"
  },
  "src_endpoint": {
    "ip": "10.0.1.25",
    "port": 54832,
    "vpc_uid": "vpc-0a1b2c3d4e5f6",
    "subnet_uid": "subnet-0abc123",
    "interface_uid": "eni-0aabbccdd1122",
    "type": "Server",
    "os": {
      "type": "Linux"
    }
  },
  "dst_endpoint": {
    "ip": "198.51.100.42",
    "port": 443,
    "type": "Unknown",
    "name": "external-host"
  },
  "connection_info": {
    "protocol_name": "TCP",
    "protocol_num": 6,
    "direction": "Outbound",
    "boundary": "External"
  },
  "traffic": {
    "bytes": 15234,
    "packets": 42
  },
  "disposition": "Allowed",
  "disposition_id": 1,
  "actor": {
    "user": {
      "account": {
        "uid": "123456789012"
      }
    }
  },
  "app_name": "HTTPS",
  "message": "Connection successfully established",
  "status_details": "OK",
  "device": {
    "hostname": "ip-10-0-1-25.ec2.internal",
    "type": "Server",
    "os": {
      "type": "Linux"
    },
    "region": "us-east-1"
  }
}
```

</details>

### Sample queries

```sumo title="Events by Category"
_sourceCategory={{Logsdatasource}} class_name activity_name category_name severity status metadata
| json "category_name","class_name","activity_name","cloud.account.uid","cloud.region","metadata.product.name","severity","status" as category_name,event_name,activity_name,aws_account, region, product_name, severity, status nodrop

| where !isBlank(category_name)

// global filters
| where if("{{aws_account}}" = "*", true, aws_account matches "{{aws_account}}") and if("{{region}}" = "*", true, region matches "{{region}}") and if("{{product}}" = "*", true, product_name matches "{{product}}") and if("{{category_type}}" = "*", true, category_name matches "{{category_type}}") and if("{{event_type}}" = "*", true, event_name matches "{{event_type}}") and if("{{severity}}" = "*", true, severity matches "{{severity}}") and if("{{status}}" = "*", true, status matches "{{status}}")

| count by category_name
| sort by _count, category_name asc
```

```sumo title="Critical Severity Events"
_sourceCategory={{Logsdatasource}} class_name activity_name category_name severity status metadata ("High" OR "Critical" OR "Fatal")
| json "category_name","class_name","activity_name","cloud.account.uid","cloud.region","metadata.product.name","severity","status" as category_name,event_name,activity_name,aws_account,region,product_name,severity,status nodrop

| where severity in ("High", "Critical", "Fatal")

// global filters
| where if("{{aws_account}}" = "*", true, aws_account matches "{{aws_account}}") and if("{{region}}" = "*", true, region matches "{{region}}") and if("{{product}}" = "*", true, product_name matches "{{product}}") and if("{{category_type}}" = "*", true, category_name matches "{{category_type}}") and if("{{event_type}}" = "*", true, event_name matches "{{event_type}}") and if("{{severity}}" = "*", true, severity matches "{{severity}}") and if("{{status}}" = "*", true, status matches "{{status}}")

| count
```

## Collection configuration and app installation

import CollectionConfiguration from '../../reuse/apps/collection-configuration.md';

<CollectionConfiguration/>

:::tip
Use the [Amazon Security Lake Source](/docs/send-data/hosted-collectors/amazon-aws/amazon-security-lake-source/) to create the source and use the same source category while installing the app.
:::

### Create a new collector and install the app

import AppCollectionOPtion1 from '../../reuse/apps/app-collection-option-1.md';

<AppCollectionOPtion1/>

### Use an existing collector and install the app

import AppCollectionOPtion2 from '../../reuse/apps/app-collection-option-2.md';

<AppCollectionOPtion2/>

### Use an existing source and install the app

import AppCollectionOPtion3 from '../../reuse/apps/app-collection-option-3.md';

<AppCollectionOPtion3/>

## Viewing Amazon Security Lake dashboards

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

<ViewDashboards/>

### Overview

The **Amazon Security Lake - Overview** dashboard provides a consolidated, high-level view of every OCSF event collected into your Security Lake. It tracks event volume by category, severity, status, AWS account, region, and reporting product, and highlights critical and failed activity across your environment. Geo-location panels map the global distribution of events and flag activity originating from embargoed locations, while trend charts reveal shifts in category and severity patterns over time.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/AmazonSecurityLake/Amazon-Security-Lake-Overview.png')} alt="Amazon Security Lake Overview" />

### Application - API Activity

The **Application - API Activity** dashboard provides visibility into API call events across your AWS environment, tracking request volume, success and failure rates, authorization denials, and service usage patterns. It breaks down activity by principal type, cloud region, user agent, and operation, while geo-location panels map the origin of both successful and failed API calls. Error analysis panels surface frequently thrown errors and failed operations to help identify misconfigurations or potential abuse.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/AmazonSecurityLake/Amazon-Security-Lake-Application-API-Activity.png')} alt="Amazon Security Lake Application API Activity" />

### Application - Datastore and File Hosting Activity

The **Application - Datastore and File Hosting Activity** dashboard monitors data access events across databases, storage services, and file hosting platforms. It tracks datastore operations, large file downloads and sharing activity, frequently accessed buckets and databases, and identifies the most active data access users. Dedicated panels surface failed data access attempts and confidential file sharing details, enabling teams to spot data exfiltration risks and policy violations.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/AmazonSecurityLake/Amazon-Security-Lake-Application-Datastore-and-File-Hosting-Activity.png')} alt="Amazon Security Lake Application Datastore and File Hosting Activity" />

### Application - Health and Vulnerability Management

The **Application - Health and Vulnerability Management** dashboard provides visibility into application errors and vulnerability scan operations across your environment. It tracks error volume by severity and status code, identifies frequently impacted devices and products, and monitors scan activity by type and operation. Dedicated detail panels surface recent error events and scan results, enabling teams to correlate application health issues with security vulnerabilities.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/AmazonSecurityLake/Amazon-Security-Lake-Application-Health-and-Vulnerability-Management.png')} alt="Amazon Security Lake Application Health and Vulnerability Management" />

### Application - Web Resources and Change Management

The **Application - Web Resources and Change Management** dashboard monitors web resource access and application lifecycle events across your environment. It tracks frequently accessed web resources by type, recently installed applications, high and critical risk app installations, and application lifecycle changes including installs, updates, and removals. Dedicated panels surface failed events and visualize lifecycle activity by risk level, giving teams control over their software supply chain.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/AmazonSecurityLake/Amazon-Security-Lake-Application-Web-Resources-and-Change-Management.png')} alt="Amazon Security Lake Application Web Resources and Change Management" />

### IAM - Successful Logins and Sessions

The **IAM - Successful Logins & Sessions** dashboard provides visibility into successful authentication and session authorization events normalized to the OCSF Identity & Access Management category. It tracks login volume, MFA adoption, logon type and protocol distribution, user role activity, and session privilege assignments. Geo-location panels map login origins and flag logins from embargoed locations, while trend charts reveal authentication patterns over time.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/AmazonSecurityLake/Amazon-Security-Lake-IAM-Successful-Logins-and-Sessions.png')} alt="Amazon Security Lake IAM Successful Logins and Sessions" />

### IAM - Failed Logins and Sessions

The **IAM - Failed Logins & Sessions** dashboard provides visibility into failed authentication and session authorization events across your environment. It tracks failure volume, failure rate percentage, top failure reasons, targeted users, and denied privilege assignments. Geo-location panels map the origin of failed login attempts, while outlier detection highlights users experiencing abnormally high failure counts, enabling rapid identification of brute-force or credential-stuffing attacks.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/AmazonSecurityLake/Amazon-Security-Lake-IAM-Failed-Logins-and-Sessions.png')} alt="Amazon Security Lake IAM Failed Logins and Sessions" />

### IAM - Change and Account Lifecycle Monitoring

The **IAM - Change & Account Lifecycle Monitoring** dashboard provides visibility into user, group, role, and entity management events across your AWS environment. It tracks change volume by management type and actor, monitors account and role lifecycle flows, and surfaces newly assigned privileges and resource ownership changes. Dedicated panels highlight critical IAM management events and display the most frequently updated resources and resource types, enabling teams to enforce least-privilege policies.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/AmazonSecurityLake/Amazon-Security-Lake-IAM-Change-and-Account-Lifecycle-Monitoring.png')} alt="Amazon Security Lake IAM Change and Account Lifecycle Monitoring" />

### Network - DNS Activity

The **Network - DNS Activity** dashboard provides visibility into OCSF DNS Activity events across your environment, tracking query and response volume trends, top queried hostnames, record types, response and operational codes, and DNS flags. It breaks down activity by application, protocol, operating system, and device type, while geo-location panels map the origin of DNS sources and targets. Detailed event panels surface recent DNS queries for forensic investigation.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/AmazonSecurityLake/Amazon-Security-Lake-Network-DNS-Activity.png')} alt="Amazon Security Lake Network DNS Activity" />

### Network - Email Activity

The **Network - Email Activity** dashboard provides visibility into OCSF Email Activity events, tracking message volume trends, top senders and recipients, email direction and protocol distribution, and frequently used commands. Geo-location panels map sender and receiver origins globally, while severity-based filtering highlights critical email events. Dedicated detail panels surface recent email activity for forensic analysis of suspicious communications.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/AmazonSecurityLake/Amazon-Security-Lake-Network-Email-Activity.png')} alt="Amazon Security Lake Network Email Activity" />

### Network - Network and Tunnel Activity

The **Network - Network and Tunnel Activity** dashboard provides visibility into OCSF Network Activity and Tunnel Activity events, tracking connection volume, outcomes, and traffic byte and packet counts. It breaks down activity by application protocol, traffic boundary, direction, region, and device type, while geo-location panels map source and target endpoints globally. Dedicated panels surface top targeted endpoints, active users, and total bytes in, out, and missed for bandwidth analysis.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/AmazonSecurityLake/Amazon-Security-Lake-Network-Network-and-Tunnel-Activity.png')} alt="Amazon Security Lake Network Network and Tunnel Activity" />

### Network - Remote Access and Protocol Activity

The **Network - Remote Access and Protocol Activity** dashboard provides unified visibility into DHCP, RDP, SMB, SSH, FTP, and NTP activity events across your environment. It tracks per-protocol volumes, activity and application distribution, SSH authentication methods, SMB and RDP response codes, and file access patterns. Dedicated panels surface critical events, active users, and recently accessed file types, enabling detection of remote access misuse and unauthorized protocol activity.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/AmazonSecurityLake/Amazon-Security-Lake-Network-Remote-Access-and-Protocol-Activity.png')} alt="Amazon Security Lake Network Remote Access and Protocol Activity" />

### Network - Web and HTTP Activity

The **Network - Web and HTTP Activity** dashboard provides visibility into OCSF HTTP Activity events, tracking request methods, response codes and statuses, top user agents, requested file types, and server domains contacted. It highlights unauthorized (401/403) requests and critical HTTP events, while geo-location panels map the origin of source requests and identify traffic from embargoed locations. Severity-based filtering enables prioritization of the most critical web threats.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/AmazonSecurityLake/Amazon-Security-Lake-Network-Web-and-HTTP-Activity.png')} alt="Amazon Security Lake Network Web and HTTP Activity" />

### System Activity Overview

The **System Activity Overview** dashboard provides a consolidated view of endpoint and host telemetry normalized into the OCSF System Activity category. It tracks event volume by event type, severity, outcome, operating system, host, and reporting product, while highlighting high, critical, and fatal system events. Trend charts reveal system event volume patterns over time, and a recent event summary enables rapid triage of the latest host-level activity.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/AmazonSecurityLake/Amazon-Security-Lake-System-Activity-Overview.png')} alt="Amazon Security Lake System Activity Overview" />

### System Activity - Execution, Memory and Kernel

The **System Activity - Execution, Memory & Kernel** dashboard provides deep visibility into what is running on your monitored hosts, tracking process launches, command-line arguments, script execution, module and driver loads, kernel object operations, and memory activity such as remote allocation and injection. It identifies the most frequently executed processes, top loaded modules, and hosts with the highest execution activity. Dedicated panels surface process lineage, memory injection details, and kernel extension actions for advanced threat hunting.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/AmazonSecurityLake/Amazon-Security-Lake-System-Activity-Execution-Memory-and-Kernel.png')} alt="Amazon Security Lake System Activity Execution Memory and Kernel" />

### System Activity - File, Persistence, Media and Audit

The **System Activity - File, Persistence, Media & Audit** dashboard monitors host activity that affects data integrity, persistence mechanisms, and audit trails. It tracks file system operations, scheduled job changes, event log clearing, peripheral and removable media use, clipboard activity, and device power state transitions. Dedicated panels surface frequently accessed file types, scheduled job configurations, and clipboard activity containing sensitive content, enabling detection of data theft and anti-forensic activity.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/AmazonSecurityLake/Amazon-Security-Lake-System-Activity-File-Persistence-Media-and-Audit.png')} alt="Amazon Security Lake System Activity File Persistence Media and Audit" />

## Create monitors for Amazon Security Lake app

import CreateMonitors from '../../reuse/apps/create-monitors.md';

<CreateMonitors/>

### Amazon Security Lake alerts

| Name                                                                     | Description                                                                                                                                                                                                                                                         | Trigger Type (Critical / Warning / MissingData) | Alert Condition |
| :----------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :---------------------------------------------- | :-------------- |
| `Amazon Security Lake - Application Error Event Detected`                | This alert is triggered when application error events are detected. Such errors may indicate underlying application failures, misconfigurations, or service disruptions that could impact system availability and security.                                         | Critical                                        | Count > 0       |
| `Amazon Security Lake - Confidential File Sharing Detected`              | This alert is triggered when confidential files are being shared. The activity may indicate potential data exposure or unauthorized sharing of sensitive information.                                                                                               | Critical                                        | Count > 0       |
| `Amazon Security Lake - High or Critical Severity Application Installed` | This alert is triggered when applications classified as High or Critical severity are installed. Such installations may introduce security risks and should be reviewed to verify that the software is authorized and safe.                                         | Critical                                        | Count > 0       |
| `Amazon Security Lake - Multiple Failed Logins From User`                | This alert is triggered when multiple failed login attempts from a single user are detected within a short period, helping identify potential brute-force attacks, account lockouts, or use of compromised credentials.                                             | Critical                                        | Count > 5       |
| `Amazon Security Lake - Confidential File Download Detected`             | This alert is triggered when frequently downloaded confidential files are identified. Unusual download activity may indicate unauthorized access or potential data exfiltration.                                                                                    | Critical                                        | Count > 0       |
| `Amazon Security Lake - Repeated Authentication Failures Detected`       | This alert is triggered when a surge in authentication failures occurs across multiple user accounts. The activity may indicate a coordinated credential stuffing campaign, automated attack tooling, or a widespread access disruption affecting the organization. | Critical                                        | Count > 5       |
| `Amazon Security Lake - Event from Embargoed Geo Location Detected`      | This alert is triggered when events originating from embargoed or restricted geographic locations are detected. Such activity may indicate a policy violation, unauthorized access, or attempts to bypass geographic access controls.                               | Critical                                        | Count > 0       |
| `Amazon Security Lake - Critical Severity Event Detected`                | This alert is triggered when security events with Critical, High, or Fatal severity levels are detected in Amazon Security Lake data. These events may indicate significant security risks and should be reviewed promptly.                                         | Critical                                        | Count > 0       |

## Upgrading/Downgrading the Amazon Security Lake app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Amazon Security Lake app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>
