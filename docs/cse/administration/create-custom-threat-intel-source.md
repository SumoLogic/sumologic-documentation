---
id: create-custom-threat-intel-source
title: Custom Threat Intelligence Sources
sidebar_label: Custom Threat Intelligence Sources
description: Learn how to manage custom threat intelligence sources in Cloud SIEM.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

:::info
**You can no longer add custom threat intelligence sources in Cloud SIEM**. To create new sources, use the Sumo Logic threat intelligence framework. For more information, see [About Sumo Logic Threat Intelligence](/docs/security/threat-intelligence/about-threat-intelligence).
:::

Prior to the introduction of [Sumo Logic Threat Intelligence](/docs/security/threat-intelligence), administrators created their own custom threat intelligence sources, which they manually populated as opposed to using an automatic feed. This article has information about managing these custom threat intelligence sources in Cloud SIEM. 

Previously, administrators created custom threat intelligence sources interactively from the Cloud SIEM UI by uploading a .csv file, or using Cloud SIEM APIs. They populated the sources with IP addresses, domains, URLs, email addresses, and file hashes.

## View threat intelligence sources in Cloud SIEM

[**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the top menu select **Content > Threat Intelligence**.

[**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu, select **Cloud SIEM > Threat Intelligence**. You can also click the **Go To...** menu at the top of the screen and select **Threat Intelligence**.  

## Search indicators

To search threat indicators, click the **Search All Indicators** button at the top of the **Threat Intelligence** page. 

You can search using the same functionality available for other Cloud SIEM searches, including regular expressions. For more information, see [Filter and Search Cloud SIEM List Pages](/docs/cse/administration/filter-search).

## How Cloud SIEM uses indicators

When Cloud SIEM encounters an indicator from a threat source in an incoming record, it adds relevant information to the record. Because threat intelligence information is persisted within records, you can reference it downstream in both rules and search. The built-in rules that come with Cloud SIEM automatically create a signal for records that have been enriched in this way.

Rule authors can also write rules that look for threat intelligence information in records. To leverage the information in a rule, you can extend your custom rule expression, or add a rule tuning expression to a built-in rule. For a more detailed explanation of how to use threat intelligence information in rules, see [Threat Intelligence Indicators in Cloud SIEM](/docs/security/threat-intelligence/threat-indicators-in-cloud-siem/).

### Target fields for threat indicators

Following are the fields that threat indicators are compared to. 

* Domain:
      * bro_ntlm_domainname
      * bro_ssl_serverName_rootDomain
      * dns_queryDomain
      * dns_replyDomain
      * fromUser_authDomain
      * http_referrerDomain
      * http_url_rootDomain
      * http_url_fqdn
* Email:
      * email_sender
      * fromUser_email
      * fromUser_email_raw
      * targetUser_email
      * targetUser_email_raw
      * user_email
      * user_email_raw
* File hash:
      * file_hash_imphash
      * file_hash_md5
      * file_hash_pehash  
      * file_hash_sha1
      * file_hash_sha256
      * file_hash_ssdeep
* IP:
      * bro_dhcp_assignedIp
      * bro_radius_remoteIp
      * bro_smtp_headers.xOriginatingIp
      * bro_socks_boundIp
      * bro_socks_requestIp
      * device_ip
      * device_natIp
      * dns_replyIp
      * dstDevice_ip
      * dstDevice_natIp
      * srcDevice_ip
      * srcDevice_natIp
* URL:
      * http_url
