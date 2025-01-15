---
id: cisco-umbrella
title: Cisco Umbrella
sidebar_label: Cisco Umbrella
description: Provides analytics on DNS, Proxy, and Audit admin activities.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/saas-cloud/cisco-icon.png')} alt="cisco icon" width="100"/>

The Sumo Logic App for Cisco Umbrella provides analytics and visibility into DNS, Proxy, and Admin activity. It gives insights into Geolocation of traffic sources, blocked clients, top categories, and more. It also analyzes traffic passing through Umbrella SWG and selective proxy, and provides information on client requests, malware, AV detections, and traffic summary. The Admin Activity dashboard provides snapshots of changes made in Umbrella's settings.

## Log types

Sumo Logic app for Cisco Umbrella uses the following log types:
* [DNS Logs](https://docs.umbrella.com/deployment-umbrella/docs/log-formats-and-versioning#dns)
* [Proxy Logs](https://docs.umbrella.com/deployment-umbrella/docs/log-formats-and-versioning#proxy)
* [Admin Audit Logs](https://docs.umbrella.com/deployment-umbrella/docs/log-formats-and-versioning#audit)

### Sample log messages

To know about the Sample Logs and Schema for Cisco Umbrella logs, [click here](https://docs.umbrella.com/deployment-umbrella/docs/log-formats-and-versioning#format).

### Sample queries

```sql title="DNS Logs"
_sourceCategory=Labs/cisco_umbrella
| where _sourceName matches "*dnslogs*"
| parse "\"*\",\"*\",\"*\",\"*\",\"*\",\"*\",\"*\",\"*\",\"*\",\"*\",\"*\",\"*\",\"*\"" as timestamp,identity,identites_all,internal_ip,external_ip,action,query_type,response_code,domain_name,categories,first_identity_type_matched,all_identity_types,blocked_categories
```

```sql title="Proxy Logs"
_sourceCategory=Labs/cisco_umbrella
| where _sourceName matches "*proxylogs*"
| parse "\"*\",\"*\",\"*\",\"*\",\"*\",\"*\",\"*\",\"*\",\"*\",\"*\",\"*\",\"*\",\"*\",\"*\",\"*\",\"*\",\"*\",\"*\",\"*\",\"*\",\"*\",\"*\",\"*\",\"*\",\"*\",\"*\",\"*\",\"*\",\"*\",\"*\",\"*\",\"*\",\"*\",\"*\",\"*\"" as timestamp,policy_identity_label,internal_client_ip,external_client_ip,destination_ip,content_type,action,url,referer,user_agent,status_code,request_size,response_size,response_body_size,sha256,categories,av_detections,PUAs,AMP_disposition,AMP_malware_name,AMP_score,policy_identity_type,blocked_categories,identities,identity_types,request_method,DLP_status,certificate_errors,file_name,ruleset_ID,rule_ID,destination_list_IDs,isolate_action,file_action,warn_status
```

```sql title=Admin Logs"
_sourceCategory=Labs/cisco_umbrella
| where _sourceName matches "*auditlogs*"
| parse "\"*\",\"*\",\"*\",\"*\",\"*\",\"*\",\"*\",\"*\",\"*\"" as  id, timestamp, email, user, type, action, ip, before, after
```

## Collecting logs for Cisco Umbrella

This section provides instructions for setting up collection for Cisco Umbrella for analysis in Sumo Logic.

The Cisco Umbrella app offers logging to Amazon S3 as it has the ability to upload, store, and archive traffic activity logs from your Umbrella dashboards to the cloud through Amazon S3. CSV formatted Umbrella logs are compressed (gzip) and uploaded every ten minutes so that there's a minimum of delay between traffic from the customer's Umbrella dashboard being logged and then being available to download from an S3 bucket.

1. Login to your Amazon S3 admin account. You need to have a admin account to collect logs from Amazon S3 account.
2. Navigate to the **Log Management**.<br/><img src={useBaseUrl('img/integrations/saas-cloud/aws-s3-logs.png')} alt="aws s3 logs" width="750"/>
3. You have the following two options on Cisco Umbrella Amazon S3:
   * **A self-managed bucket**. You own the Amazon S3 bucket, including its configuration and management.
   * **A Cisco-managed bucket**. Cisco Umbrella owns the bucket and sets the configuration and management of it. For more information, see [Enable Logging to a Cisco-managed S3 Bucket](https://docs.umbrella.com/deployment-umbrella/docs/cisco-managed-s3-bucket).

 <img src={useBaseUrl('img/integrations/saas-cloud/options-aws-s3.png')} alt="options aws s3 cisco" width="750"/>

Collection from a Cisco-managed S3 bucket has the following limitations:

* AWS versioned APIs are not supported. The **Use AWS versioned APIs** setting on the Source must be disabled.
* S3 Event Notifications Integration is not supported, so you cannot use an SNS subscription endpoint.
* Access must be provided with an Access ID and Key. Role-based access is not supported.
* Use a prefix in the path expression so it doesn't point to the root directory.
* Ensure that your path expression ends in `/*`. Otherwise, you will get a ListBucket error. For example:
  * Bucket Name: 'cisco-managed-us-east-1'
  * Path Expression: '987654321_12e34c..../*'


By having all your logs uploaded to an S3 bucket, you can then download logs automatically to keep in perpetuity in backup storage. Or, ingest the logs through your SIEM or another security tool to determine if any security events in these Umbrella logs coincide with events in other security tools.

For more information, see [Cisco Umbrella Documentation](https://docs.umbrella.com/managed-services/docs/msc-manage-logs).

## Installing the Cisco Umbrella app

import AppInstall2 from '../../reuse/apps/app-install-v2.md';

<AppInstall2/>

## Viewing Cisco Umbrella dashboards

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

<ViewDashboards/>

### Admin Activities

**Cisco Umbrella - Admin Activities**. This dashboard displays snapshots of changes made to Umbrella's settings by the admin. By using the dashboard's filters, you can easily sort through the data based on key fields such as action.<br/><img src={useBaseUrl('img/integrations/saas-cloud/cisco-umbrella-admin.png')} alt="cisco umbrella admin" width="750"/>

### DNS

**Cisco Umbrella - DNS**. This dashboard offers insights into traffic that has been processed by Cisco DNS resolvers. It provides a view of the geographical location of the traffic sources, clients that were blocked, the most popular categories and categories blocked by DNS. Additionally, it analyzes the domains requested, the related blocked requests and traffic, and the identities associated with them. The dashboard filters can be utilized to analyze the data based on crucial fields such as action, identity, response code, blocked category, and category.<br/><img src={useBaseUrl('img/integrations/saas-cloud/cisco-umbrella-dns.png')} alt="cisco umbrella dns" width="750"/>

### Proxy

**Cisco Umbrella - Proxy**. This dashboard provides insights into the traffic that has gone through Umbrella's Secure Web Gateway (SWG) or Selective Proxy. It gives you a clear view of the geographical location of the traffic sources, client requests by blocked or allowed actions, malware detections, blocked sources and URLs, anti-virus detections, traffic request/response size, and an overall traffic summary.
By using the dashboard's filters, you can easily analyze the data by different key fields such as action, identity, malware, anti-virus detection, blocked category, referrer, and category.<br/><img src={useBaseUrl('img/integrations/saas-cloud/cisco-umbrella-proxy.png')} alt="cisco umbrella proxy" width="750"/>

## Upgrade/Downgrade the Cisco Umbrella app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Cisco Umbrella app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>
