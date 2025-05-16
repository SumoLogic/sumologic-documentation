---
id: symantec-proxy-secure-gateway-blue-coat-proxy
title: Ingest Symantec Proxy Secure Gateway (Blue Coat Proxy) Data into Cloud SIEM
sidebar_label: Symantec Proxy Secure Gateway - Blue Coat Proxy
description: Learn how to configure a Syslog source to collect and send Symantec Proxy Secure Gateway (ProxySG) log messages to Sumo Logic to be ingested by Cloud SIEM.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This article has instructions for collecting Symantec Proxy Secure Gateway (ProxySG) log messages as comma-separated values (CSV) and sending them to Sumo Logic to be ingested by Cloud SIEM. While this article shows how to configure and ingest logs as CSV, Cloud SIEM also supports Common Event Format (CEF) ProxySG logs.

Sumo Logic Cloud SIEM supports the following Proxy Secure Gateway logging fields:

```
dt,time,c-ip,cs-username,x-exception-id,sc-filter-result,cs-categories,cs-referer,sc-status,proxy_cache_code,cs-method,cs-content-type,cs-protocol,cs-host,cs-uri-port,c-uri,cs-uri-query,cs-uri-extension,cs-user-agent,s-ip,sc-bytes,cs-bytes,x-bluecoat-access-type,x-bluecoat-application-name,r-ip
```

Cloud SIEM supports collection either from a file or over syslog. Instructions for syslog are included in this article.

To ingest Symantec Proxy Secure Gateway data into Cloud SIEM:
1. [Configure a Syslog source](/docs/send-data/installed-collectors/sources/syslog-source/#configure-a-syslog-source) on a collector. When you configure the source, do the following:
    1. Click the **+Add Field** link, and add a field whose name is `_siemForward` and value is *true*. This will ensure all logs for this source are forwarded to Cloud SIEM.
    1. Add another field named `_parser` with value */Parsers/System/Blue Coat/Blue Coat ProxySG CSV*. This ensures that the Symantec Proxy Secure Gateway (Blue Coat Proxy) logs are parsed and normalized into structured records in Cloud SIEM.
1. Configure ProxySG to forward access logs to the the syslog source. For instructions, see [Sending Access Logs to a Syslog Server](https://knowledge.broadcom.com/external/article/166529/sending-access-logs-to-a-syslog-server.html) on the Broadcom knowledge site. 
1. To verify that your logs are successfully making it into Cloud SIEM:
   1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the top menu select **Configuration**, and then under **Incoming Data** select **Log Mappings**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Configuration**, and then under **Cloud SIEM Integrations** select **Log Mappings**. You can also click the **Go To...** menu at the top of the screen and select **Log Mappings**.  
   1. On the **Log Mappings** tab search for "ProxySG" and check the **Records** columns. A list of mappers for ProxySG will appear and you can see if logs are coming in.
   1. For a more granular look at the incoming records, you can also search Sumo Logic for ProxySG records. <br/><img src={useBaseUrl('img/cse/proxysg-search.png')} alt="ProxySG search" style={{border: '1px solid gray'}} width="500"/> 