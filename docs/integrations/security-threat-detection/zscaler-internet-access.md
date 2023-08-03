---
id: zscaler-internet-access
title: Zscaler Internet Access
sidebar_label: Zscaler Internet Access
description: This page introduces the Sumo Logic App for Zscaler Internet Access (ZIA) App.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/security-threat-detection/zscaler.png')} alt="thumbnail icon" width="75"/>

The Sumo Logic App for Zscaler Internet Access (ZIA) collects logs via Cloud Nanolog Streaming Service (NSS) to populate pre-configured searches and Dashboards in order to visualize and provide insight into threats, DNS, web traffic behaviors, security, user browsing activities, and risk.


## Log Types

The Sumo Logic App for Zscaler uses NSS feed output logs (Web, Tunnel, DNS, Firewall), as documented [here](https://help.zscaler.com/zia/documentation-knowledgebase/analytics/nss/nss-feeds/formatting-nss-feeds).


## Collect Logs for the Zscaler Internet Access App

Zscaler uses Cloud Nanolog Streaming Service (NSS), which allows direct cloud-to-cloud log streaming for all types of ZIA logs into Sumo Logic.

To collect logs for Zscaler, perform these steps, detailed in the following sections.

### Step 1: Configure Sumo Logic Hosted Collector and an HTTP Source

To collect logs for Zscaler Web Security, do the following in Sumo Logic:

1. Configure a [Hosted Collector](/docs/send-data/hosted-collectors).
1. Configure an [HTTP Source](/docs/send-data/hosted-collectors/http-source/logs-metrics).
    1. For Source Category, enter any string to tag the output collected from this Source, such as **ZIA**.
    1. Click **Save** and make note of the HTTP address for the Source. You will need it when you configure the Zscaler Cloud NSS in the next section.


### Step 2: Configure Zscaler Cloud NSS

Zscaler uses Cloud Nanolog Streaming Service (NSS), which allows direct cloud-to-cloud log streaming for all types of ZIA logs into Sumo Logic.

To send logs to Sumo Logic using Cloud NSS, add a feed in ZIA using the following steps.
1. Log into your Zscaler Internet Access system.
1. Go to **Administration > Nanolog Streaming Service > Cloud NSS Feeds**.
<br/>Cloud NSS is not enabled by default in ZIA. If you do not see Cloud NSS Feeds option in your ZIA environment, create a support request with Zscaler support.
1. From the **Cloud** **NSS Feeds** tab, click **Add Cloud NSS Feed**. <br/>For more information about adding Cloud NSS Feeds, see [Zscaler documentation](https://help.zscaler.com/zia/adding-cloud-nss-feeds-web-logs).
1. In the **Add NSS Feed** dialog:
   1. **Feed Name**. Enter a name for your NSS feed.
   1. **NSS Type**. Select **NSS for Web**.
   1. **Status**. Select **Enabled**.
   1. **SIEM Type**. Select **Sumo Logic**.
   1. **API URL**. Paste the HTTP address for the Source generated in the previous section.
   1. **Add HTTP Header**. No headers are required for Sumo Logic. If it requires at least one header, add a dummy header.
   1. **Log Type**. Select **Web Log**.
   1. **Feed Output Type**. Select **JSON**.
   1. **JSON Array Notation**. Disable if you would like to get logs in individual JSON objects instead of JSON array. 
   1. **Feed Escape Character**. Leave this field blank.
   1. **Feed Output Format**. The JSON format is displayed.
   1. **Timezone**. Set to GMT by default.
   1. **Web Log Filters**. Choose filters you would like to have.
   1. Click **Save**.
1. Repeat above steps for:
    1. NSS Type: NSS for Web and Log Type: Tunnel.
    1. NSS Type: NSS for Web and Log Type: SaaS Security.
    1. NSS Type: NSS for FireWall and Log Type: Firewall Logs.
    1. NSS Type: NSS for FireWall and Log Type: DNS Logs.

:::note
Sumo Logic Dashboards utilize Web, Tunnel, DNS Logs.
:::

#### (Optional) Configure the Zscaler NSS Feeds

If you are not able to use Zscaler Cloud NSS, you can collect logs for the ZIA App using NSS Servers. For DNS, Firewall, and Tunnel logs you can select JSON as the output format for the feed in the Add NSS Feeds dialog. For Web logs you will need to configure the feed as follows:

1. Log into your Zscaler NSS system.
1. Go to **Administration > Settings > Nanolog Streaming Service**.
1. From the **NSS Feeds** tab, click **Add**.
1. In the **Add NSS Feed** dialog: 
    1. **Feed Name.** Enter a name for your NSS feed.
    1. **NSS Server.** Select the NSS Server.
    1. **SIEM IP Address.** Enter the Sumo Logic Installed Collector IP address.
    1. **Log Type.** Select Web Log.
    1. **Feed Output Type.** Custom.
    1. **NSS Type.** NSS for Web is the default.
    1. **Status.** Select Enabled.
    1. **SIEM TCP Port.** Enter the Sumo Logic Syslog Source TCP port number.
    1. **Feed Escape Character.** Leave this field blank.
    1. **Feed Output Format.** Select Custom and paste the following:
      ```
      \{ "sourcetype" : "zscalernss-web", "event" : \{"datetime":"%d{yy}-%02d{mth}-%02d{dd} %02d{hh}:%02d{mm}:%02d{ss}","reason":"%s{reason}","event_id":"%d{recordid}","protocol":"%s{proto}","action":"%s{action}","transactionsize":"%d{totalsize}","responsesize":"%d{respsize}","requestsize":"%d{reqsize}","urlcategory":"%s{urlcat}","serverip":"%s{sip}","clienttranstime":"%d{ctime}","requestmethod":"%s{reqmethod}","refererURL":"%s{ereferer}","useragent":"%s{ua}","product":"NSS","location":"%s{location}","ClientIP":"%s{cip}","status":"%s{respcode}","user":"%s{login}","url":"%s{eurl}","vendor":"Zscaler","hostname":"%s{ehost}","clientpublicIP":"%s{cintip}","threatcategory":"%s{malwarecat}","threatname":"%s{threatname}","filetype":"%s{filetype}","appname":"%s{appname}","pagerisk":"%d{riskscore}","department":"%s{dept}","urlsupercategory":"%s{urlsupercat}","appclass":"%s{appclass}","dlpengine":"%s{dlpeng}","urlclass":"%s{urlclass}","threatclass":"%s{malwareclass}","dlpdictionaries":"%s{dlpdict}","fileclass":"%s{fileclass}","bwthrottle":"%s{bwthrottle}","servertranstime":"%d{stime}","contenttype":"%s{contenttype}","unscannabletype":"%s{unscannabletype}","deviceowner":"%s{deviceowner}","devicehostname":"%s{devicehostname}"\}\}
      ```
   1. **Duplicate Logs.** Disabled by default.
   1. **Timezone.** Set to GMT by default.
   1. Click **Save**.

### Sample Log Message


```json title="Web Log Sample"
{
  "sourcetype": "zscalernss-web",
  "event": {
    "datetime": "2021-06-17 14:53:16",
    "reason": "Allowed",
    "event_id": "6974776045860487177",
    "protocol": "HTTP_PROXY",
    "action": "Allowed",
    "transactionsize": "639",
    "responsesize": "65",
    "requestsize": "574",
    "urlcategory": "Corporate Marketing",
    "serverip": "104.21.31.16",
    "clienttranstime": "0",
    "requestmethod": "CONNECT",
    "refererURL": "None",
    "useragent": "Windows Microsoft Windows 10 Pro ZTunnel/1.0",
    "product": "NSS",
    "location": "Road Warrior",
    "ClientIP": "40.83.138.250",
    "status": "200",
    "user": "testuser2@bd-dev.com",
    "url": "hamsan.yektanet.com:443",
    "vendor": "Zscaler",
    "hostname": "hamsan.yektanet.com",
    "clientpublicIP": "40.83.138.250",
    "threatcategory": "None",
    "threatname": "None",
    "filetype": "None",
    "appname": "General Browsing",
    "pagerisk": "0",
    "department": "Service Admin",
    "urlsupercategory": "Business and Economy",
    "appclass": "General Browsing",
    "dlpengine": "None",
    "urlclass": "Business Use",
    "threatclass": "None",
    "dlpdictionaries": "None",
    "fileclass": "None",
    "bwthrottle": "NO",
    "servertranstime": "0",
    "contenttype": "Other",
    "unscannabletype": "None",
    "odeviceowner": "5864177",
    "odevicehostname": "4051327232"
  }
}
```

#### Query Sample


```sql title="Top 10 Blocked Base URLs"
_sourceCategory=ZIA
| json field=_raw "event.clientpublicIP", "event.user", "event.url", "event.action" as src_ip, src_user, url, action
| where action != "Allowed"
| parse regex field=url "(?<baseurl>.+?)[:/]" nodrop
| count by baseurl
| sort _count
| top 10 baseurl by _count
```

## Install the Zscaler Internet Access app

This section provides instructions on how to install the Zscaler Internet Access app, and provides examples of each of the dashboards. The preconfigured searches and dashboards provides you an easy-to-access visual insights into your data.

{@import ../../reuse/apps/app-install.md}

## Viewing ZIA dashboards

### Overview  

The **Zscaler - Overview** Dashboard provides general information of the Zscaler Web Gateway logs, including Panels that drill-down into the other Zscaler Dashboards. The Overview Dashboard gives a good starting point for detecting anomalies in blocked traffic and geographic hotspots for allowed and blocked traffic.

<img src={useBaseUrl('img/integrations/security-threat-detection/ZIA-Overview.png')} alt="zscaler internet access Dashboard" />

### Behavior  

The **Zscaler - Behavior** Dashboard focuses on allowed traffic behaviors, showing trends and deviations by users, content types accessed, content categories, super categories, and bandwidth trends.

<img src={useBaseUrl('img/integrations/security-threat-detection/ZIA-Behavior.png')} alt="zscaler internet access Dashboard" />

### Blocked Traffic  

The **Zscaler - Blocked** Traffic Dashboard illustrates outliers in both blocked traffic peaks and multi-dimensional outliers for blocked activity specific to user.

<img src={useBaseUrl('img/integrations/security-threat-detection/ZIA-Blocked-Traffic.png')} alt="zscaler internet access Dashboard" />

### File Classification Activity

The **Zscaler - File Classification Activity** Dashboard focuses on file-based threats by users, threat name, file types, and subtypes for a overarching view of blocked files across the Zscaler environment.

<img src={useBaseUrl('img/integrations/security-threat-detection/ZIA-File-Classification-Activity.png')} alt="zscaler internet access Dashboard" />

### DNS

The **ZIA - DNS** Dashboard focuses on DNS activity specifically around denied requests and responses, server locations across the Zscaler environment.

Use this dashboard to:
* Gain insights into DNS health and performance.
* Determine if rules need tweaking based on volume of denied/allowed requests and responses.

<img src={useBaseUrl('img/integrations/security-threat-detection/ZIA-DNS.png')} alt="zscaler internet access Dashboard" />

### Logs

The **ZIA - Logs** Dashboard gives insights into different logs being produced in the Zscaler environment.

Use this dashboard to:
* Get quick insights into logs volume by source.
* View logs filtered by type and users and determine any potential issues.

<img src={useBaseUrl('img/integrations/security-threat-detection/ZIA-Logs.png')} alt="zscaler internet access Dashboard" />

### Threats

The **ZIA - Threats** Dashboard focuses on threats in your Zscaler environment.

Use this dashboard to:
* Detect anomalies in blocked traffic and geographic hotspots for allowed and blocked traffic.
* Gain insights into threats by categories and transactions.
* Identify locations and users being blocked as a sign of potential suspicious or malicious activity.

<img src={useBaseUrl('img/integrations/security-threat-detection/ZIA-Threats.png')} alt="zscaler internet access Dashboard" />
