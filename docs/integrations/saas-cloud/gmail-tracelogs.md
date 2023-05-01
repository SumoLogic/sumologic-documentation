---
id: gmail-tracelogs
title: Gmail Trace Logs
sidebar_label: Gmail Trace Logs
description: The Sumo Logic App for Gmail Trace Logs monitors spam, malware threats, dropped messages, and rejected messages.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/saas-cloud/gmail-icon.png')} alt="Thumbnail icon" width="100"/>

Gmail Trace Logs is a new Sumo Logic app based on the Gmail BigQuery Cloud-to-Cloud source, which is a managed analytics data warehouse that provides scalable Gmail reports of your organization.

The Sumo Logic App for Gmail Trace Logs helps monitor spam messages, malware, dropped messages and rejected messages. It allows you to view messages with objectionable content, messages detected by your **Security Sandbox**, and messages flagged by the Walled Garden Rule.

## Log Types

The Sumo Logic App for Gmail Trace Logs uses [Gmail Logs via BigQuery](https://support.google.com/a/topic/7233311?hl=en&ref_topic=2683886).

For details, see the [Schema for Gmail logs in BigQuery](https://support.google.com/a/answer/7230050?hl=en&ref_topic=7233311).

### Sample Logs

```json
{
  "event_info": {
    "timestamp_usec": 1669101504309964,
    "elapsed_time_usec": 2115298,
    "success": true
  },
  "message_info": {
    "action_type": 3,
    "rfc2822_message_id": "\u003c2f9102a27ddd041edc7654ef84e4e06ddb843aba-20231242-111224498@wcwgkemdsf.com\u003e",
    "subject": "[Update] For GCP Organizations, all Security and Privacy Notifications will be sent through Advisory Notifications",
    "payload_size": 33084,
    "source": {
      "address": "CloudPlatform-noreply@wcwgkemdsf.com",
      "service": "smtp-inbound",
      "selector": null,
     "from_header_address": "cloudplatform-noreply@wcwgkemdsf.com",
     "from_header_displayname": "Google Cloud Platform"
   },
   "destination": [
     {
       "address": "Thomas@wcwgkemdsf.com",
       "service": "gmail-ui",
       "selector": "",
       "smime_signature_verification_success": null,
       "smime_decryption_success": null,
       "smime_parsing_success": null,
       "smime_extraction_success": null,
       "rcpt_response": null
     }
   ],
   "flattened_destinations": "gmail-ui::Thomas@wcwgkemdsf.com",
   "description": "No Error",
   "connection_info": {
     "client_ip": "95.184.117.158",
     "smtp_in_connect_ip": null,
     "smtp_out_connect_ip": null,
     "failed_smtp_out_connect_ip": null,
     "smtp_tls_state": 1,
     "smtp_reply_code": 0,
     "tls_required_but_unavailable": null,
     "smtp_out_remote_host": null,
     "smtp_user_agent_ip": "95.184.117.158",
     "is_intra_domain": false,
     "dmarc_pass": true,
     "dmarc_published_domain": "google.com",
     "client_host_zone": "google.com",
     "smtp_response_reason": null,
     "ip_geo_city": null,
     "ip_geo_country": "US",
     "authenticated_domain": [
       {
       },
      {
        "name": "scoutcamp.bounces.google.com",
        "type": 1
      }
    ],
    "is_internal": false,
    "dkim_pass": true,
    "spf_pass": true,
    "smtp_tls_version": null,
    "smtp_tls_cipher": null
  },
  "is_spam": false,
  "is_policy_check_for_sender": false,
  "num_message_attachments": 0,
  "message_set": [
    {
      "type": 9
    },
    {
      "type": 15
    },
    {
      "type": 1
    }
  ],
  "smtp_relay_error": null,
  "upload_error_category": null,
  "structured_policy_log_info": null,
  "triggered_rule_info": null,
  "flattened_triggered_rule_info": null,
  "smime_sign_message": null,
  "smime_encrypt_message": null,
  "smime_packaging_success": null,
  "smime_extraction_success": null,
  "smime_content_type": 0,
  "link_domain": [
    "google.com"
  ],
  "attachment": null,
  "spam_info": {
    "classification_reason": 2,
    "classification_timestamp_usec": null,
    "disposition": 1,
    "ip_whitelist_entry": ""
  }
}
}
```

### Sample Queries

```sql title="Gmail messages classifications"
_sourceCategory=Labs/GmailTraceLogs
| json "event_info.success", "message_info.action_type", "message_info.attachment[*].file_extension_type", "message_info.attachment", "message_info.subject", "message_info.attachment[*].malware_family", "message_info.attachment[*].sha256", "message_info.connection_info.client_ip", "message_info.connection_info.ip_geo_city", "message_info.connection_info.ip_geo_country", "message_info.connection_info.is_internal", "message_info.connection_info.smtp_response_reason", "message_info.connection_info.smtp_reply_code", "message_info.connection_info.smtp_tls_state", "message_info.destination[*].address", "message_info.is_spam", "message_info.spam_info.classification_reason", "message_info.spam_info.disposition", "message_info.message_set[*].type", "message_info.source.address" as is_event_success, action_type, file_extension_type, message_attachment, message_subject, message_malware_family, message_sha256, client_ip,  client_city,  client_country, is_message_internal, smtp_response_reason, smtp_reply_code, smtp_tls_state, destination_email, is_spam, spam_classification_reason, spam_disposition, message_set_type, message_source_email  nodrop
| parse regex field=message_set_type "(?<message_setType>[\w]+)" multi
| if(message_setType matches "6","Message triggered the walled garden rule you configured that restricts messages to authorized addresses or domains.",
  if(message_setType matches "4","Message contains objectionable content, as defined by one of your policies.",
  if(message_setType matches "61","Message was caught by Security sandbox.", "Other Type, Check message_set_type Field for more info."))) as message_set_type
| count by message_set_type
| sort by _count
```

## Collecting Logs for Gmail Trace Logs app

This section provides instructions for setting up [Cloud-to-Cloud-Integration for Gmail Trace Logs App](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/gmail-tracelogs-source.md) to create the source and use the same source category while installing the app.

## Installing the Gmail Trace Logs app

{@import ../../reuse/app-install.md}

## Viewing Gmail Trace Logs Dashboards

**All dashboard have a set of filters** that you can apply to the entire dashboard, as shown in the following example. Click the funnel icon in the top dashboard menu bar to display a scrollable list of filters that are applied across the entire dashboard.

You can use filters to drill down and examine the data on a granular level. Filters include client country, client device type, client IP, client request host, client request URI, client request user agent, edge response status, origin IP, and origin response status.

**Each panel has a set of filters** that are applied to the results for that panel only, as shown in the following example. Click the funnel icon in the top panel menu bar to display a list of panel-specific filters.

### Security Overview Dashboard

**Gmail Trace Logs - Security Overview**. This dashboard lets you monitor spam messages, malware threats, dropped messages, and rejected messages.

<img src={useBaseUrl('img/integrations/saas-cloud/tracelogsapp-overview.png')} alt="Gmail Trace Logs Overview" width="900"/>

**CrowdStrike Analysis**. To protect your organisation from threats, the app also scans the SHA256 hash of Gmail attachments with CrowdStrike's threat detection service.

<img src={useBaseUrl('img/integrations/saas-cloud/crowdstrike-analysis.png')} alt="Crowdstrike Analysis" width="900"/>
