---
id: netskope-webtx-streaming
title: Netskope WebTx Streaming
sidebar_label: Netskope WebTx Streaming
description: The Sumo Logic app for Netskope WebTx Streaming collects transaction events from the Netskope platform to enhance visibility into your web transactions.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/security-threat-detection/netskope.png')} alt="Netskope-WebTx-icon" width="50" />

Netskope WebTx Streaming for Sumo Logic provides real-time visibility into web transaction data streamed from the Netskope platform, helping organizations monitor and secure their cloud and web traffic. The app includes five purpose-built dashboards covering transaction health, security posture, file activity, network insights, and user and application behavior. Security and IT teams can detect policy violations, track data movement, identify risky activity, and manage application governance from a single unified view.

:::info
This app includes [built-in monitors](#netskope-webtx-streaming-alerts). For details on creating custom monitors, refer to the [Create monitors for Netskope WebTx Streaming app](#create-monitors-for-the-netskope-webtx-streaming-app).
:::

## Log types
 
 You can configure [Netskope Log Streaming](https://docs.netskope.com/en/log-streaming) to send the comma-separated values (CSV) logs to an Amazon S3 bucket. The data can then be collected into Sumo Logic using the Sumo Logic [AWS S3 Source](/docs/send-data/hosted-collectors/amazon-aws/aws-s3-source/).

## Sample log message

```json title="Web Transaction Logs"
bytes,c-ip,cs-bytes,cs-content-type,cs-dns,cs-host,cs-method,cs-referer,cs-uri,cs-uri-port,cs-uri-query,cs-uri-scheme,cs-user-agent,cs-username,date,rs-status,s-ip,sc-bytes,sc-content-type,sc-status,time,time-taken,x-c-browser,x-c-browser-version,x-c-country,x-c-device,x-c-latitude,x-c-local-time,x-c-location,x-c-longitude,x-c-os,x-c-region,x-c-zipcode,x-category,x-category-id,x-client-ssl-err,x-cs-access-method,x-cs-app,x-cs-app-activity,x-cs-app-category,x-cs-app-cci,x-cs-app-ccl,x-cs-app-from-user,x-cs-app-instance-id,x-cs-app-instance-name,x-cs-app-instance-tag,x-cs-app-object-id,x-cs-app-object-name,x-cs-app-object-type,x-cs-app-suite,x-cs-app-tags,x-cs-app-to-user,x-cs-connect-host,x-cs-connect-port,x-cs-connect-user-agent,x-cs-domain-fronted-sni,x-cs-dst-ip,x-cs-dst-port,x-cs-http-version,x-cs-ip-connect-xff,x-cs-ip-xff,x-cs-page-id,x-cs-session-id,x-cs-site,x-cs-sni,x-cs-src-ip,x-cs-src-ip-egress,x-cs-src-port,x-cs-ssl-cipher,x-cs-ssl-engine-action,x-cs-ssl-engine-action-reason,x-cs-ssl-fronting-error,x-cs-ssl-handshake-error,x-cs-ssl-ja3,x-cs-ssl-version,x-cs-timestamp,x-cs-traffic-type,x-cs-tunnel-id,x-cs-uri-path,x-cs-url,x-cs-userip,x-error,x-other-category,x-other-category-id,x-policy-action,x-policy-dst-host,x-policy-dst-host-source,x-policy-dst-ip,x-policy-justification-reason,x-policy-justification-type,x-policy-name,x-policy-src-ip,x-r-cert-enddate,x-r-cert-expired,x-r-cert-incomplete-chain,x-r-cert-issuer-cn,x-r-cert-mismatch,x-r-cert-revocation-check,x-r-cert-revoked,x-r-cert-self-signed,x-r-cert-startdate,x-r-cert-subject-cn,x-r-cert-untrusted-root,x-r-cert-valid,x-request-id,x-rs-file-category,x-rs-file-language,x-rs-file-md5,x-rs-file-sha256,x-rs-file-size,x-rs-file-type,x-s-country,x-s-custom-signing-ca-error,x-s-dp-name,x-s-latitude,x-s-location,x-s-longitude,x-s-region,x-s-zipcode,x-sc-notification-name,x-server-ssl-err,x-sr-dst-ip,x-sr-dst-port,x-sr-headers-name,x-sr-headers-value,x-sr-src-ip,x-sr-src-port,x-sr-ssl-cipher,x-sr-ssl-client-certificate-error,x-sr-ssl-engine-action,x-sr-ssl-engine-action-reason,x-sr-ssl-handshake-error,x-sr-ssl-ja3s,x-sr-ssl-malformed-ssl,x-sr-ssl-version,x-ssl-bypass,x-ssl-bypass-reason,x-ssl-policy-action,x-ssl-policy-categories,x-ssl-policy-dst-host,x-ssl-policy-dst-host-source,x-ssl-policy-dst-ip,x-ssl-policy-name,x-ssl-policy-src-ip,x-transaction-id,x-type
10333,192.168.86.241,2084,application/octet-stream,clients4.google.com,clients4.google.com,POST,-,/chrome-sync/command/?client=Google+Chrome&client_id=B8jQ4eG9CZ5qQPIjy2pyTA%3D%3D,443,client=Google+Chrome&client_id=B8jQ4eG9CZ5qQPIjy2pyTA%3D%3D,https,""Chrome WIN 144.0.7559.133 (7da823b1d594d1b49797911900e003ec96a8c0e7-refs/branch-heads/7559@{#4253}) channel(stable)"",gjenkins@netskope.com,2026-02-06,200,142.250.189.206,7921,application/vnd.google.octet-stream-compressible,200,20:35:30,103,Chrome,-,US,Windows Device,37.245,2026-02-06 12:35:31,Los Gatos,-121.9541,Windows 11,California,95032,Cloud Storage,-,-,Client,Google Drive,Browse,Cloud Storage,88,high,-,-,-,-,-,-,-,Google App,Enterprise;Unsanctioned,-,-,-,-,-,142.250.189.238,443,HTTP1.1,-,-,4830650033293290103,4319947714362477059,google,clients4.google.com,192.168.86.241,73.241.101.104,28790,TLS_AES_256_GCM_SHA384,Allow,Established,No,No,d23cb79443a0fb0ed0c3b8a4cc8bec41,TLSv1.3,1770410130,CloudApp,-,/chrome-sync/command/,https://clients4.google.com/chrome-sync/command/?client=Google+Chrome&client_id=B8jQ4eG9CZ5qQPIjy2pyTA%3D%3D,192.168.86.241,-,""Cloud Storage,Technology"",-,allow,clients4.google.com,HttpHostHeader,142.250.189.206,-,-,AllowAll,192.168.86.241,2026-04-06 08:36:36,No,No,WR2,No,-,Disabled,No,2026-01-12 08:36:37,*.google.com,No,Yes,5173337355751008154,-,-,-,-,-,-,US,No,US-SFO1,37.774929,San Francisco,-122.419418,California,N/A,-,-,142.250.189.206,443,-,-,163.116.140.40,12818,TLS_AES_256_GCM_SHA384,No,Allow,Established,No,907bf3ecef1c987c889946b737b43de8,No,TLSv1.3,No,-,Decrypt,-,-,Unknown,-,-,-,5173337355751008154,http_transaction
```

## Sample queries

```sql title="Total Transactions"
_sourceCategory=Labs/NetskopeWebTx !bytes
| csv _raw extract  4 as cs_content_type, 5 as cs_dns, 7 as cs_method, 14 as cs_username, 20 as sc_status, 31 as x_c_os, 34 as x_category, 38 as x_cs_app, 77 as x_cs_traffic_type, 146 as x_type, 145 as x_transaction_id

///global filters
| where if ("{{cs_content_type}}" = "*", true, cs_content_type matches "{{cs_content_type}}")
| where if ("{{cs_dns}}" = "*", true, cs_dns matches "{{cs_dns}}")
| where if ("{{cs_method}}" = "*", true, cs_method matches "{{cs_method}}")
| where if ("{{cs_username}}" = "*", true, cs_username matches "{{cs_username}}")
| where if ("{{sc_status}}" = "*", true, sc_status matches "{{sc_status}}")
| where if ("{{x_c_os}}" = "*", true, x_c_os matches "{{x_c_os}}")
| where if ("{{x_category}}" = "*", true, x_category matches "{{x_category}}")
| where if ("{{x_cs_app}}" = "*", true, x_cs_app matches "{{x_cs_app}}")
| where if ("{{x_cs_traffic_type}}" = "*", true, x_cs_traffic_type matches "{{x_cs_traffic_type}}")
| where if ("{{x_type}}" = "*", true, x_type matches "{{x_type}}")

// panel specific
| count by x_transaction_id
| count
```

## Collection configuration and app installation

### Data Collection Setup

Use the [AWS S3 Source](/docs/send-data/hosted-collectors/amazon-aws/aws-s3-source/) to collect Netskope WebTx Streaming data. When installing the app, use the same source category that you configured while setting up the S3 source. By following these steps, you can ensure that your Netskope WebTx Streaming app is properly integrated and configured to collect and analyze your Netskope WebTx Streaming data

### Create a new collector and install the app

import AppCollectionOPtion1 from '../../reuse/apps/app-collection-option-1.md';

<AppCollectionOPtion1/>

### Use an existing collector and install the app

import AppCollectionOPtion2 from '../../reuse/apps/app-collection-option-2.md';

<AppCollectionOPtion2/>

### Use an existing source and install the app

import AppCollectionOPtion3 from '../../reuse/apps/app-collection-option-3.md';

<AppCollectionOPtion3/>

## Viewing the Netskope WebTx Streaming dashboards​​ 

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

<ViewDashboards/>

### Overview

The **Netskope WebTx Streaming - Overview** dashboard in Sumo Logic provides a high-level view of web transaction activity, covering total transactions, HTTP and WebSocket volumes, and average response times. It includes geographic maps for client and server locations along with breakdowns by HTTP status, cloud applications, and web categories. Transaction trends over time and a recent transactions table give teams a single-pane view for operational monitoring and performance management.

<img src={useBaseUrl('/img/send-data/Netskope-WebTx-Streaming-Overview.png')} alt="Netskope-WebTx-Streaming-Overview" />

### Security Overview

The **Netskope WebTx Streaming - Security Overview** dashboard in Sumo Logic delivers a focused view of web transaction security for network administrators and security teams. It highlights blocked transactions, triggered policies, unauthorized access attempts, and SSL errors, while surfacing risky geographic activity and potential data exfiltration. Upload and download trends provide additional context for data movement, making this dashboard essential for threat detection and compliance monitoring.

<img src={useBaseUrl('/img/send-data/Netskope-WebTx-Streaming-Security-Overview.png')} alt="Netskope-WebTx-Streaming-Security-Overview" />

### File Activity

The **Netskope WebTx Streaming - File Activity** dashboard in Sumo Logic tracks file transfer activity across web transactions. It provides visibility into object type distributions, top file types transferred, and data throughput trends over time. A detailed recent file transfer events table captures object names, types, categories, and sizes, helping teams monitor data movement and support data loss prevention efforts.

<img src={useBaseUrl('/img/send-data/Netskope-WebTx-Streaming-File-Activity.png')} alt="Netskope-WebTx-Streaming-File-Activity" />

### Client and Network Insights

The **Netskope WebTx Streaming - Client and Network Insights** dashboard in Sumo Logic offers visibility into the network and client-side aspects of web transactions. It covers top DNS destinations, transaction hosts, geographic regions, HTTP methods, operating systems, browser types, device types, and access methods. These insights give network and IT teams the context needed to understand client diversity, traffic patterns, and access behaviors across the environment.

<img src={useBaseUrl('/img/send-data/Netskope-WebTx-Streaming-Client-and-Network-Insights.png')} alt="Netskope-WebTx-Streaming-Client-and-Network-Insights" />

### Users and Applications Overview

The **Netskope WebTx Streaming - Users and Applications Overview** dashboard in Sumo Logic provides visibility into user behavior and application usage across web traffic. It surfaces top users with policy violations, login and logout trends, most-used applications, and application categories. Sanctioned versus unsanctioned traffic comparisons and Cloud Confidence Level (CCL) ratings help teams manage shadow IT risk and enforce application governance policies.

<br/><img src={useBaseUrl('/img/send-data/Netskope-WebTx-Streaming-Users-and-Applications-Overview.png')} alt="Netskope-WebTx-Streaming-Users-and-Applications-Overview" />


## Create monitors for the Netskope WebTx Streaming app

import CreateMonitors from '../../reuse/apps/create-monitors.md';

<CreateMonitors/>

### Netskope WebTx Streaming alerts

| Name | Description | Trigger Type (Critical / Warning / MissingData) | Alert Condition | 
|:--|:--|:--|:--|
| `Netskope WebTx Streaming - Embargoed Geo Locations of Clients Performing Web Transactions` | Detects and logs access from client IP addresses geolocated in embargoed or sanctioned regions, ensuring compliance with regulations and corporate policies. | Critical | Count > 1 |
| `Netskope WebTx Streaming - Embargoed Geo Locations of Servers of Web Transactions` | Detects and logs access from server IP addresses geolocated in embargoed or sanctioned regions, ensuring compliance with regulations and corporate policies. | Critical | Count > 1|
| `Netskope WebTx Streaming - File Transfer to Embargoed Location` | File transfers to embargoed or restricted geographic locations. Flags potential compliance or data‑exfiltration risks for timely review and response. | Critical | Count > 2|
| `Netskope WebTx Streaming - High Latency in Web Requests` | Monitors web request response times and alerts when latency exceeds 5 seconds, which may indicate server overload, network issues, or a DDoS attack. You can adjust the `threshold` variable to match your requirements. | Critical | Count > 1|
| `Netskope WebTx Streaming - Large Data Download Events` | Highlights any download transactions with abnormally large size (>500MB) to detect potential data exfiltration or abuse of cloud storage services. You can also adjust the `threshold` variable in the monitor query to match your requirements. | Critical | Count > 1|
| `Netskope WebTx Streaming - Sanctioned Application Access Detected` | Triggers when users access cloud applications tagged as "Sanctioned" beyond a threshold count, indicating shadow IT usage that violates organizational policy. | Warning | Count > 5|
| `Netskope WebTx Streaming - Suspicious Login from Unusual Location` | Flags logins from geographic locations that deviate from typical user patterns, which might indicate account compromise or unauthorized user access. | Critical | Count > 1|
| `Netskope WebTx Streaming - Unauthorized Access Attempts` | Tracks failed login attempts or resource access, highlighting potential breaches using status codes like "401 Unauthorized" and unusually frequent attempts from a single IP. | Critical | Count > 5|


## Upgrading/Downgrading the Netskope WebTx Streaming app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Netskope WebTx Streaming app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>
