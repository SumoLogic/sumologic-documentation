---
id: proofpoint-on-demand
title: Proofpoint on Demand
sidebar_label: Proofpoint on Demand
description: The Proofpoint on Demand app for Sumo Logic provides an improved security posture by analyzing message logs.
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/proofpoint-logo.png')} alt="proofpoint-logo" width="100"/>

Proofpoint on Demand is a cloud-based cybersecurity platform that offers a wide range of services to protect businesses against cyber threats. This includes email security, threat intelligence, information protection, and compliance solutions. The Proofpoint on Demand app for Sumo Logic provides insight into the functioning and effectiveness of your email security policies, allowing you to make informed decisions to improve security posture. This app will further provide information about the encryption status of the communication.

Key features of the Proofpoint on Demand app include:
- **Email security monitoring**. Monitor message traffic to detect and prevent spam, phishing, and other email-borne threats.
- **Compliance monitoring**. Monitor email communications for compliance with internal policies and external regulations such as Data Loss Prevention (DLP), Domain-based Message Authentication, Reporting and Conformance (DMARC), and other relevant regulations.
- **Incident investigation**. Quickly investigate potential security incidents by searching and analyzing email security and compliance data. This includes identifying the source of a security threat and the extent of its impact.
- **User behavior monitoring**. Monitor behavior related to email communication to identify potential insider threats or unauthorized access.

## Log Types

This app uses Proofpoint on Demand source to collect the data from Proofpoint on Demand (PoD) Log Service and uses the secure WebSocket (WSS) protocol, which securely stores the required authentication, scheduling, and state tracking information.

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

## Installing the Proofpoint on Demand app​

This section has instructions for installing the Proofpoint on Demand app for Sumo Logic.

import AppInstall from '../../reuse/apps/app-install.md';

<AppInstall/>

## Viewing Proofpoint on Demand Dashboards​​

* All dashboards have a set of filters that you can apply to the entire dashboard, as shown in the following example. Click the funnel icon in the top dashboard menu bar to display a scrollable list of filters that are applied across the entire dashboard.

 You can use filters to drill down and examine the data on a granular level. Filters include client country, client device type, client IP, client request host, client request URI, client request user agent, edge response status, origin IP, and origin response status.

* Each panel has a set of filters that are applied to the results for that panel only, as shown in the following example. Click the funnel icon in the top panel menu bar to display a list of panel-specific filters.

### Proofpoint on Demand - Message Monitoring

The **Proofpoint on Demand - Message Monitoring** dashboard offers valuable insights into message traffic, such as the number of distinct sender and receiver domains, geo-locations of senders, and blocked messages. It also tracks trends in the actions taken on messages and provides a list of the top 10 senders and receivers. Leveraging this information gives you a better understanding of the email traffic patterns and takes action to improvise email security posture.<br/><img src={useBaseUrl('img/integrations/saas-cloud/Proofpoint-on-Demand-Message-Monitoring.png')} alt="Proofpoint-on-Demand-Message-Monitoring" width="750"/>

### Proofpoint on Demand - Security Overview

The **Proofpoint on Demand - Security Overview** dashboard is designed to monitor email communications for compliance with both internal policies and external regulations, such as DLP and DMARC. It includes widgets for geo-location tracking of messages from high-risk countries, a summary of policy results for DMARC, DLP, Anti-Spam and Anti-Virus, and messages in the quarantine folder by category. In addition, the dashboard includes a TLS message trend chart that displays the ratio of encrypted to unencrypted messages, along with insights into the unencrypted sender and receiver domains. Overall, the Security Overview dashboard helps organizations maintain compliance with relevant regulations and policies while also providing valuable insights to improve their email security posture.<br/><img src={useBaseUrl('img/integrations/saas-cloud/Proofpoint-on-Demand-Security-Overview.png')} alt="Proofpoint-on-Demand-Security-Overview" width="750"/>
