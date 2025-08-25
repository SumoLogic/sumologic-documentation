---
id: okta
title: Ingest Okta Data into Cloud SIEM
sidebar_label: Okta
description: Configure an Okta source to ingest Okta log messages and send them to Cloud SIEM’s Okta system parser.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

To ingest Okta data into Cloud SIEM:
1. [Configure an Okta source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/okta-source/#source-configuration) on a collector. When you configure the source, do the following:
    1. Select the **Forward to SIEM** option in the source configuration UI. This will ensure all logs for this source are forwarded to Cloud SIEM.
    1. Add another field named `_parser` with value */Parsers/System/Okta/Okta*. This ensures that the Okta logs are parsed and normalized into structured records in Cloud SIEM.
1. To verify that your logs are successfully making it into Cloud SIEM:
    1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the top menu select **Configuration**, and then under **Incoming Data** select **Log Mappings**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Configuration**, and then under **Cloud SIEM Integrations** select **Log Mappings**. You can also click the **Go To...** menu at the top of the screen and select **Log Mappings**.  
    1. On the **Log Mappings** tab search for Okta and check the **Records** columns.
    1. For a more granular look at the incoming records, you can also use the Sumo Logic platform to search for Okta security records:<br/>`_index=sec_record* and metadata_product = "Okta"`