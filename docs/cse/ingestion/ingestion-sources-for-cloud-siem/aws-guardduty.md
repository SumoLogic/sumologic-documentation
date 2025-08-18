---
id: aws-guardduty
title: Ingest AWS GuardDuty Data into Cloud SIEM
sidebar_label: AWS GuardDuty
description: Configure an HTTP source to ingest AWS GuardDuty log messages and send them to the GuardDuty system parser.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

To ingest AWS GuardDuty data into Cloud SIEM:
1. [Configure an HTTP source for GuardDuty](/docs/integrations/amazon-aws/guardduty/#step-1-configure-an-http-source) on a collector. When you configure the source, do the following:
    1. Select the **Forward to SIEM** option in the source configuration UI. This will ensure all logs for this source are forwarded to Cloud SIEM.
    1. Click the **+Add** link to add a field whose name is `_parser` with value */Parsers/System/AWS/GuardDuty*. This ensures that the GuardDuty logs are parsed and normalized into structured records in Cloud SIEM.
1. [Deploy the Sumo Logic GuardDuty events processor](/docs/integrations/amazon-aws/guardduty/#step-2-deploy-sumo-logic-guardduty-events-processor).
1. To verify that your logs are successfully making it into Cloud SIEM:
    1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu select **Data Management**, and then under **Incoming Data** select **Log Mappings**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu select **Data Management**, and then under **Cloud SIEM Integrations** select **Log Mappings**. You can also click the **Go To...** menu at the top of the screen and select **Log Mappings**.  
    1. On the **Log Mappings** tab search for "GuardDuty" and check the **Records** columns.
    1. For a more granular look at the incoming records, you can also search the Sumo Logic platform for GuardDuty security records:<br/>`_index=sec_record* and metadata_product = "GuardDuty"`
