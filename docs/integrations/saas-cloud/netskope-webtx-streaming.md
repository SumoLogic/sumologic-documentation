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


## Sample log message

```json title="Web Transaction Logs"
date time time-taken cs-bytes sc-bytes bytes c-ip s-ip cs-username cs-method cs-uri-scheme cs-uri-query cs-user-agent cs-content-type sc-status sc-content-type cs-dns cs-host cs-uri cs-uri-port cs-referer x-cs-session-id x-cs-access-method x-cs-app x-s-country x-s-latitude x-s-longitude x-s-location x-s-region x-s-zipcode x-c-country x-c-latitude x-c-longitude x-c-location x-c-region x-c-zipcode x-c-os x-c-browser x-c-browser-version x-c-device x-cs-site x-cs-timestamp x-cs-page-id x-cs-userip x-cs-traffic-type x-cs-tunnel-id x-category x-other-category x-type x-server-ssl-err x-client-ssl-err x-transaction-id x-request-id x-cs-sni x-cs-domain-fronted-sni x-category-id x-other-category-id x-sr-headers-name x-sr-headers-value x-cs-ssl-ja3 x-sr-ssl-ja3s x-ssl-bypass x-ssl-bypass-reason x-r-cert-subject-cn x-r-cert-issuer-cn x-r-cert-startdate x-r-cert-enddate x-r-cert-valid x-r-cert-expired x-r-cert-untrusted-root x-r-cert-incomplete-chain x-r-cert-self-signed x-r-cert-revoked x-r-cert-revocation-check x-r-cert-mismatch x-cs-ssl-fronting-error x-cs-ssl-handshake-error x-sr-ssl-handshake-error x-sr-ssl-client-certificate-error x-sr-ssl-malformed-ssl x-s-custom-signing-ca-error x-cs-ssl-engine-action x-cs-ssl-engine-action-reason x-sr-ssl-engine-action x-sr-ssl-engine-action-reason x-ssl-policy-src-ip x-ssl-policy-dst-ip x-ssl-policy-dst-host x-ssl-policy-dst-host-source x-ssl-policy-categories x-ssl-policy-action x-ssl-policy-name x-cs-ssl-version x-cs-ssl-cipher x-sr-ssl-version x-sr-ssl-cipher x-cs-src-ip-egress x-s-dp-name x-cs-src-ip x-cs-src-port x-cs-dst-ip x-cs-dst-port x-sr-src-ip x-sr-src-port x-sr-dst-ip x-sr-dst-port x-cs-ip-connect-xff x-cs-ip-xff x-cs-connect-host x-cs-connect-port x-cs-connect-user-agent x-cs-url x-cs-uri-path x-cs-http-version rs-status x-cs-app-category x-cs-app-cci x-cs-app-ccl x-cs-app-tags x-cs-app-suite x-cs-app-instance-id x-cs-app-instance-name x-cs-app-instance-tag x-cs-app-activity x-cs-app-from-user x-cs-app-to-user x-cs-app-object-type x-cs-app-object-name x-cs-app-object-id x-rs-file-type x-rs-file-category x-rs-file-language x-rs-file-size x-rs-file-md5 x-rs-file-sha256 x-error x-c-local-time x-policy-action x-policy-name x-policy-src-ip x-policy-dst-ip x-policy-dst-host x-policy-dst-host-source x-policy-justification-type x-policy-justification-reason x-sc-notification-name sr-bytes rs-bytes x-action x-action-reason x-c-authn-user x-c-authn-source x-c-authn-surrogate x-c-authn-surrogate-status x-c-authz-groups x-c-authz-ou x-cs-xau x-cs-connect-xau x-c-user-confidence-index x-c-hostname x-c-device-uid x-c-os-family x-c-os-version x-c-nsclient-version x-c-nsclient-client-profile x-c-nsclient-steering-profile x-c-device-classification x-cs-nsclient-tunnel-type x-cs-process x-cs-pid x-cs-parent-process x-cs-ppid x-tp-result x-tp-engine x-tp-malware-name x-tp-severity x-sr-forward-dest x-ssl-policy-issuer x-eip-policy-name x-eip-policy-footprint x-policy-categories x-c-timezone x-support
2026-03-10,18:24:06,64,234,683,913,172.31.4.1,-,user33@example.com,GET,https,-,Websocket availability measurement test,-,101,-,substrate.svc.cloud.microsoft,substrate.svc.cloud.microsoft,/apc/trans.gif,443,-,3866470295364597527,Client,Microsoft Accounts,US,37.3388,-121.8916,City31,State1,95141,US,33.9553,-117.2457,City4,State1,92557,Windows 11,-,-,Windows Device,cloud,1772043846,7993528709090876702,172.17.25.226,CloudApp,-,Application Suite,"Application Suite,Technology,All Categories,SKX - AVD Block [Temp Project]",WebSocket,-,-,1777804929358157695,1777804929358157695,substrate.svc.cloud.microsoft,-,-,-,-,-,2800f914a7a4ba98aa9df62d316a460c,NotAvailable,No,-,NotChecked,NotChecked,,,NotChecked,NotChecked,NotChecked,NotChecked,NotChecked,NotChecked,NotChecked,NotChecked,No,No,NotChecked,NotChecked,NotChecked,No,Allow,Established,None,NotEstablished,-,-,-,Unknown,-,Decrypt,-,TLSv1.3,TLS_AES_256_GCM_SHA384,NotChecked,NotChecked,173.242.15.202,US-LAX2,172.17.25.226,65371,52.96.166.130,443,-,-,169.254.8.66,790,-,-,-,-,-,https:
```

## Sample queries

```sql title="Total Transactions"
_sourceCategory=Labs/NetskopeWebTx  !bytes
| csv _raw extract  14 as cs_content_type, 17 as cs_dns, 10 as cs_method, 9 as cs_username, 15 as sc_status, 37 as x_c_os, 47 as x_category, 24 as x_cs_app, 45 as x_cs_traffic_type, 49 as x_type, 52 as x_transaction_id

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


## Collecting logs

This section has instructions for collecting logs for the Sumo Logic app for Netskope WebTx Streaming.

### Collection process overview

To collect logs for Netskope WebTx Streaming, configure [Netskope Log Streaming](https://docs.netskope.com/en/log-streaming) to forward CSV logs to an Amazon S3 bucket, then use an [AWS S3 Source](/docs/send-data/hosted-collectors/amazon-aws/aws-s3-source/) to ingest the data into Sumo Logic. If you are already collecting Netskope data via an existing S3 source, note the source category configured for that source and use it when installing the app.

## Installing the Netskope WebTx Streaming app   

This section shows you how to install the Sumo Logic app for Netskope WebTx Streaming.

import AppInstall2 from '../../reuse/apps/app-install-v2.md';

<AppInstall2/>

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
