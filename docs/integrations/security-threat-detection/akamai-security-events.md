---
id: akamai-security-events
title: Akamai Security Events
description: The Sumo Logic app for Akamai Security Events allows you to visualize security events generated on the Akamai platform.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/security-threat-detection/akamai_logo.png')} alt="thumbnail icon" width="100"/>

Akamai Security Events app allows you to visualize security events generated on the Akamai platform. The preconfigured dashboards provide insights into attack data, sources of attack, attack queries, geolocation of attack source, context on attack’s HTTP request, and rules triggered by the attack.

## Log types  

The Akamai Security Events app uses security events generated on the Akamai platform by leveraging the [V1 SIEM API](https://developer.akamai.com/api/cloud_security/siem/v1.html) and Sumo Logic’s [Akamai SIEM API Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/akamai-siem-api-source).

### Sample log messages

<details>

<summary>Click to view the log message</summary>

```json
{
  "type": "akamai_siem",
  "format": "json",
  "version": "1.0",
  "attackData": {
    "rule": "",
    "ruleVersion": "",
    "ruleMessage": "",
    "ruleTag": "",
    "ruleData": "",
    "ruleSelector": "",
    "ruleAction": "",
    "configId": "76756",
    "policyId": "prag_136180",
    "clientIP": "13.29.10.10"
  },
  "httpMessage": {
    "requestId": "2d442db6",
    "start": "1627663284",
    "protocol": "HTTP/1.1",
    "method": "GET",
    "host": "fierce.force.com",
    "port": "80",
    "path": "/",
    "query": "v=999999.9 union all select 0x31303235343830303536,0x31303235343830303536",
    "requestHeaders": {
      "Host": "fierce.force.com",
      "User-Agent": "Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.0.7) Gecko/20060909 Firefox/1.5.0.7",
      "Accept": "text/xml,application/xml,application/xhtml xml,text/html;q=0.9,text/plain;q=0.8,image/png,*/*;q=0.",
      "Keep-Alive": "300",
      "Proxy-Connection": "keep-alive",
      "Content-Length": "2"
    },
    "status": "200",
    "bytes": "22726",
    "responseHeaders": "Server%3a%20Apache%2f2.4.29%20(Ubuntu)...tive-Regex-Time%3a%20681%0d%0aAkamai-X-Request-ID%3a%202d442db6%0d%0a"
  },
  "geo": {
    "continent": "NA",
    "country": "US",
    "city": "WESTFORD",
    "regionCode": "MA",
    "asn": "7922"
  }
}
```
</details>

### Sample queries  

```sql
_sourceCategory=<akamai-foo>
| json field=_raw "attackData.clientIP", "attackData.configId", "attackData.policyId", "attackData.ruleAction", "attackData.rule", "attackData.ruleMessage", "attackData.ruleSelector", "attackData.ruleTag", "attackData.ruleVersion", "httpMessage.start", "httpMessage.status" as client_ip, config_id, policy_id, rule_action, rule, rule_message, rule_selector, rule_tag, rule_version, time_epoch, http_response nodrop
| time_epoch * 1000 as time_epoch_ms
|formatDate(toLong(time_epoch_ms), "MM-dd-yyyyHH:mm:ss") as attack_date
| json field=_raw "geo.city", "geo.continent", "geo.country", "geo.regionCode", "geo.asn" as city, continent, country, region_code, asn nodrop
|count by attack_date, client_ip, city, country, rule_action, rule, rule_message, rule_selector, rule_version, config_id, policy_id,http_response
```

## Collection configuration and app installation

Depending on the set up collection method, you can configure and install the app in three ways:

- **[Create a new collector and install the app](#create-a-new-collector-and-install-the-app)**. Create a new Sumo Logic Cloud-to-Cloud (C2C) source under a new Sumo Logic Collector and later install the app; Or
- **[Use an existing collector and install the app](#use-an-existing-collector-and-install-the-app)**. Create a new Sumo Logic Cloud-to-Cloud (C2C) source under an existing Sumo Logic Collector and later install the app; Or
- **[Use existing source and install the app](#use-an-existing-source-and-install-the-app)**. Use your existing configured Sumo Logic Cloud-to-Cloud (C2C) source and install the app.

:::important
Use the [Cloud-to-Cloud Integration for Akamai Security Events](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/akamai-siem-api-source) to create the source and use the same source category while installing the app. By following these steps, you can ensure that your Akamai Security Events app is properly integrated and configured to collect and analyze your Akamai Security Events data.
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

## Viewing the Akamai Security Events dashboards

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

<ViewDashboards/>

### Overview

The **Akamai Security Events - Overview** dashboard gives you an at-a-glance view of security events generated on the Akamai Platform.

Use this dashboard to:
* Identify IPs of attack.
* Find Geolocation of the attack.
* Analyze summary of last 20 attacks.

<img src={useBaseUrl('img/integrations/security-threat-detection/Akamai-Security-Events-Overview.png')} alt="Akamai Security Events dashboards" />

### Attack Data

The **Akamai Security Events - Attack Data** dashboard helps you understand the nature of each attack and its corresponding Rule information.

Use this dashboard to:
* Identify IPs of attack.
* Find top sources of attack.
* Analyze messages reported by each triggered rule.
* Understand the nature of attacks, and contextual information around attacks.

<img src={useBaseUrl('img/integrations/security-threat-detection/Akamai-Security-Events-Attack-Data.png')} alt="Akamai Security Events dashboards" />

### HTTP Data

The **Akamai Security Events - HTTP Data** dashboard provides context and visualization of attack’s HTTP request.

Use this dashboard to:
* Identify attacks by protocol, port and http method.
* Analyze bytes served during each attack request.
* Find request query which led to the attack.

<img src={useBaseUrl('img/integrations/security-threat-detection/Akamai-Security-Events-HTTP-Data.png')} alt="Akamai Security Events dashboards" />

### Threat Intel

The **Akamai Security Events - Threat Intel** dashboard provides an at-a-glance view of threats analyzed using Crowdstrike Threat Feed. Dashboard panels display threat count over a selected time period, geographic locations where threats occurred, source breakdown, actors responsible for threats, severity, and a correlation of IP addresses, method, and status code of threats.

<img src={useBaseUrl('img/integrations/security-threat-detection/Akamai-Security-Events-Threat-Intel.png')} alt="Akamai Security Events dashboards" />

## Upgrade/Downgrade the Akamai Security Events app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Akamai Security Events app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>