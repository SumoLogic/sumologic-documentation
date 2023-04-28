---
id: proofpoint-on-demand
title: Proofpoint On Demand
sidebar_label: Proofpoint On Demand
description: The Proofpoint On Demand app for Sumo Logic provides an improved security posture by analyzing message logs.
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/proofpoint-logo.png')} alt="proofpoint-logo" width="100"/>

Proofpoint On Demand is a cloud-based cybersecurity platform that offers wide range of services to protect businesses against cyber threats. This includes email security, threat intelligence, information protection, and compliance solutions.<br/> The Proofpoint on Demand app for Sumo Logic enables insights into the functioning of email security policies and helps you to gain visibility into the effectiveness of email security policies, therefore making informed decisions to improve security posture. This app will further provide information about the encryption status of the communication.

Key features of the Proofpoint On Demand app include: 
- **Email security monitoring**. Monitor message traffic to detect and prevent spam, phishing, and other email-borne threats.
- **Compliance monitoring**. Monitor email communications for compliance with internal policies and external regulations such as DLP, DMARC, etc.
- **Incident investigation**. Quickly investigate potential security incidents by searching and analyzing email security and compliance data. This includes identifying the source of a security threat and the extent of its impact.
- **User behavior monitoring**. Monitor behaviour related to email communication to identify potential insider threats or unauthorized access.

## Log Types

This app uses Proofpoint on Demand source to collect the data from Proofpoint On Demand (PoD) Log Service and uses the secure WebSocket (WSS) protocol, which securely stores the required authentication, scheduling, and state tracking information.

## Sample log message

```json title="Message log"
 {
 "final_module": "access",
 "msg": {
   "normalizedHeader": {},
   "sizeBytes": 819,
   "parsedAddresses": {},
   "lang": "",
   "header": {
     "to": [
       "mailive@knowledgefront.com"
     ],
     "message-id": [
       "<1581095749241195154.24679.9211199633289683320@tx01.kfront.net>"
     ],
     "from": [
       "mailive@knowledgefront.com"
     ],
     "subject": [
       "Mailive! Test - [FSMAILID:gmExdGJvdXBtaDg4dWpzMGI4dDVjcnEw]"
     ]
   }
 },
 "action_dmarc": [],
 "filter": {
   "routeDirection": "outbound",
   "isMsgReinjected": false,
   "verified": {
     "rcpts": [
       "mailive@knowledgefront.com"
     ]
   },
   "durationSecs": 0.058829,
   "isMsgEncrypted": false,
   "routes": [
     "allow_relay"
   ],
   "disposition": "accept",
   "actions": [
     {
       "rule": "pod-maillive",
       "isFinal": true,
       "action": "accept",
       "module": "access"
     }
   ],
   "qid": "017HEgfE030485",
   "suborgs": {
     "rcpts": [],
     "sender": "0"
   },
   "msgSizeBytes": 805,
   "quarantine": {
     "rule": "",
     "folder": "Audit"
   },
   "startTime": "2020-02-07T09:15:49.686439-0800"
 },
 "msgParts": [],
 "action_dkimv": [],
 "guid": "aOH73jx-Jt3cX8BzsgT0mtadA3boGiIG",
 "action_spf": [],
 "connection": {
   "tls": {
     "inbound": {
       "cipherBits": 128,
       "cipher": "ECDHE-RSA-AES128-GCM-SHA256",
       "version": "TLSv1.2"
     }
   },
   "sid": "2xybws990h",
   "protocol": "smtp:smtp",
   "country": "us",
   "helo": "tx01.kfront.net",
   "ip": "69.164.206.119",
   "host": "tx01.kfront.net",
   "resolveStatus": "ok"
 },
 "envelope": {
   "rcpts": [
     "mailive@knowledgefront.com"
   ],
   "from": "mailive@knowledgefront.com",
   "rcptsHashed": [
     "a78455da15dc5a93e0a59189ffe790c7@knowledgefront.com"
   ],
   "fromHashed": "a78455da15dc5a93e0a59189ffe790c7@knowledgefront.com"
 },
 "pps": {
   "agent": "m0072553.ppops.net",
   "cid": "pphosted_prodmgt_hosted",
   "version": "8.14.0.396"
 },
 "ts": "2020-02-07T09:15:49.686439-0800",
 "final_rule": "pod-maillive",
 "final_action": "accept",
 "metadata": {
   "origin": {
     "data": {
       "agent": "m0072553.ppops.net",
       "cid": "pphosted_prodmgt_hosted",
       "version": "8.14.0.396"
     }
   }
 }
}
```
## Sample Query

```sql title="Unique Inbound Domains"
_sourceCategory="pod_src"
| json "guid","filter.routeDirection","msg.header.from","msg.header.to","filter.disposition","connection.ip","ts","msg.header.subject","msg.header.message-id","final_module","final_rule","action_dmarc","filter.quarantine.folder","filter.isMsgEncrypted","final_action" as guid,route_direction,sender_email,receiver_email,disposition,ip,time_stamp,subject,message_id,final_module,final_rule,action_dmarc,quarantine_folder,is_encrypted,final_action nodrop
| where route_direction matches "{{route_direction}}"
| where final_action matches "{{action}}"
| where disposition matches "{{disposition}}"
| where is_encrypted matches "{{is_encrypted}}"
| where final_rule matches "{{rule}}"
| where final_module matches "{{module}}"
// extracting individual emails from array of emails
| extract field=receiver_email "\"?(?<individual_receiver_email>[\w\s\-@.<>]*)\"?[,\n\]]" multi
| extract field=individual_receiver_email ".@(?<inbound_domain>[a-z0-9-.]*)"
| count_distinct(inbound_domain)
```

## Set up collection

To set up [Cloud to Cloud Integration Proofpoint on Demand Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/proofpoint-on-demand-source) for the Proofpoint on Demand app, follow the instructions provided. These instructions will guide you through the process of creating a source using the Proofpoint on Demand Source category, which you will need to use when installing the app. By following these steps, you can ensure that your Proofpoint on Demand app is properly integrated and configured to collect and analyze your Proofpoint on Demand data.

## Installing the Proofpoint On Demand app​

This section has instructions for installing the Proofpoint On Demand app for Sumo Logic and descriptions of each of the dashboards.

Locate and install the app you need from the **App Catalog**. If you want to see a preview of the dashboards included with the app before installing, click **Preview Dashboards**.
1. From the **App Catalog**, search for the app and select it.
1. Select **Add Integration** button to install the app.
1. Configure **Proofpoint On Demand** app using the steps described in the [Proofpoint On Demand Cloud-to-Cloud Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/proofpoint-on-demand-source/). If you already have set up your data, skip this step by clicking on **Next**.
1. Complete the following fields:
   1. **Data Source**. Select either of these options for the data source:
      * Choose **Source Category** and then choose a source category from the list.
      * Select **Enter a Custom Data Filter** and type in a custom source category that starts with an underscore. For Example, `_sourceCategory=MyCategory`.
    2. **Folder Name**. You can retain the existing name, or enter a name of your choice for the app.
    3. Select the **Location in Library** (the default is the **Personal** folder in the library), or click **New Folder** to add a new folder.
1. Click **Next**.

Once an app is installed, it will appear in your **Personal** folder, or other folder that you specified. You can share it with your organization.

The panels will begin to fill automatically. It's worth noting that each panel gradually fills with data that matches the time range query and has been received since the panel was created. The results will not be available right away, but with some patience, you will be able to view full graphs and maps.

## Viewing Proofpoint On Demand Dashboards​​

* All dashboards have a set of filters that you can apply to the entire dashboard, as shown in the following example. Click the funnel icon in the top dashboard menu bar to display a scrollable list of filters that are applied across the entire dashboard.

 You can use filters to drill down and examine the data on a granular level. Filters include client country, client device type, client IP, client request host, client request URI, client request user agent, edge response status, origin IP, and origin response status.

* Each panel has a set of filters that are applied to the results for that panel only, as shown in the following example. Click the funnel icon in the top panel menu bar to display a list of panel-specific filters.

### Proofpoint on Demand - Message Monitoring

The **Proofpoint on Demand - Message Monitoring** dashboard offers valuable insights into message traffic, such as the number of distinct sender and receiver domains, geo-locations of senders, and blocked messages. It also tracks trends in the actions taken on messages and provides a list of the top 10 senders and receivers. Leveraging this information gives you a better understanding of the email traffic patterns and takes action to improvise email security posture.<br/><img src={useBaseUrl('img/integrations/saas-cloud/Proofpoint-on-Demand-Message-Monitoring.png')} alt="Proofpoint-on-Demand-Message-Monitoring" width="750"/>

### Proofpoint on Demand - Security Overview

The **Proofpoint on Demand - Security Overview** dashboard is designed to monitor email communications for compliance with both internal policies and external regulations, such as DLP and DMARC. It includes widgets for geo-location tracking of messages from high-risk countries, a summary of policy results for DMARC, DLP, Anti-Spam and Anti-Virus, and messages in the quarantine folder by category. In addition, the dashboard includes a TLS message trend chart that displays the ratio of encrypted to unencrypted messages, along with insights into the unencrypted sender and receiver domains. Overall, the Security Overview dashboard helps organizations maintain compliance with relevant regulations and policies while also providing valuable insights to improve their email security posture.<br/><img src={useBaseUrl('img/integrations/saas-cloud/Proofpoint-on-Demand-Security-Overview.png')} alt="Proofpoint-on-Demand-Security-Overview" width="750"/>