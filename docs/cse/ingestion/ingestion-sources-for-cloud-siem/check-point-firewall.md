---
id: check-point-firewall
title: Ingest Check Point Firewall Data into Cloud SIEM
sidebar_label: Check Point Firewall
description: Configure a syslog source to ingest Check Point Firewall log messages to be parsed by Cloud SIEM’s system parser for Check Point Firewall.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

To ingest Check Point Firewall data into Cloud SIEM:
1. [Configure a Syslog source](/docs/send-data/installed-collectors/sources/syslog-source/#configure-a-syslog-source) on a collector. When you configure the source, do the following:
    1. Click the **+Add Field** link, and add a field whose name is `_siemForward` and value is *true*. This will ensure all logs for this source are forwarded to Cloud SIEM.
    1. Add another field named `_parser` with value */Parsers/System/Check Point/Check Point Firewall Syslog*. This ensures that the Check Point Firewall logs are parsed and normalized into structured records in Cloud SIEM.
1. Configure Check Point Firewall to send log messages to the Sumo Logic platform. Sumo Logic supports the default Syslog format from Check Point’s Log Exporter. For more information on Syslog forwarding, see [Log Exporter - Check Point Log Export](https://support.checkpoint.com/results/sk/sk122323) in the Check Point documentation.
1. To verify that your logs are successfully making it into Cloud SIEM:
    1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the top menu select **Configuration**, and then under **Incoming Data** select **Log Mappings**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Configuration**, and then under **Cloud SIEM Integrations** select **Log Mappings**. You can also click the **Go To...** menu at the top of the screen and select **Log Mappings**.  
    1. On the **Log Mappings** tab search for "checkpoint" and check the **Records** columns.
    1. For a more granular look at the incoming records, you can also search the Sumo Logic platform for Check Point Firewall security records:<br/>`_index=sec_record* and metadata_product = "checkpoint"`