---
id: nginx-access-logs
title: Ingest Nginx Access Logs into Cloud SIEM
sidebar_label: Nginx Access Logs
description: Configure a syslog source to ingest Nginx Access log messages to be parsed by Cloud SIEM’s system parser for Nginx.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

To ingest Nginx Access Logs into Cloud SIEM:
1. [Configure a Syslog source](/docs/send-data/installed-collectors/sources/syslog-source/#configure-a-syslog-source) on a collector. When you configure the source, do the following:
    1. Click the **+Add Field** link, and add a field whose name is `_siemForward` and value is *true*. This will ensure all logs for this source are forwarded to Cloud SIEM.
    1. Add another field named `_parser` with value */Parsers/System/Nginx/Nginx Syslog*. This ensures that the Nginx Access Logs are parsed and normalized into structured records in Cloud SIEM.
       :::note
       The Sumo Logic parser for Nginx Access Log messages supports the default “combined” format defined in `/etc/nginx/nginx.conf` and will allow additional information to be appended to that format without causing parsing to fail. Note that appended fields in a custom format will not be parsed without local configurations being applied. Other than appended fields that have local configurations applied, changes you make to the default format itself are not supported by the Sumo Logic parser.
       :::
1. Follow the Nginx [instructions](https://docs.nginx.com/nginx/admin-guide/monitoring/logging/?_bt=569896217465&_bk=&_bm=&_bn=g&_bg=129938098486&gclid=Cj0KCQiAraSPBhDuARIsAM3Js4ofA0fdqQ-4JXfkhqJFoX7qjLl7hdHhuVe4CJsI1ESWUUdnekGV03saAuS9EALw_wcB) for configuring the access log. See [Configure forwarding to a Syslog Source](/docs/send-data/installed-collectors/sources/syslog-source/#configure-forwarding-to-a-syslogsource) for general instructions to configure forwarding to a syslog source. 
1. To verify that your logs are successfully making it into Cloud SIEM:
    1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the top menu select **Configuration**, and then under **Incoming Data** select **Log Mappings**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Configuration**, and then under **Cloud SIEM Integrations** select **Log Mappings**. You can also click the **Go To...** menu at the top of the screen and select **Log Mappings**.  
    1. On the **Log Mappings** tab search for "Nginx" and check the **Records** columns. A list of mappers for Nginx will appear and you can see if logs are coming in.
    1. For a more granular look at the incoming records, you can also search the Sumo Logic platform for Nginx security records. <br/><img src={useBaseUrl('img/cse/nginx-search.png')} alt="Nginix search" style={{border: '1px solid gray'}} width="400"/> 