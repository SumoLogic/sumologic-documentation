---
id: auth0
title: Ingest Auth0 Data into Cloud SIEM
sidebar_label: Auth0
description: Configure an HTTP source to ingest Auth0 log messages and send them to Cloud SIEM’s Auth0 system parser.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

To ingest Auth0 data into Cloud SIEM:
1. [Configure a source for Auth0](/docs/integrations/saml/auth0/#configure-a-source) on a collector. When you configure the source, do the following:
    1. Select the [**Forward to SIEM** option](/docs/c2c/info/#metadata-fields) in the source configuration UI. This will ensure all logs for this source are forwarded to Cloud SIEM.
    1. Click the **+Add** link to add a field whose name is `_parser` with value */Parsers/System/Auth0/Auth0*. This ensures that the Auth0 logs are parsed and normalized into structured records in Cloud SIEM.
1. To verify that your logs are successfully making it into Cloud SIEM:
    1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the top menu select **Configuration**, and then under **Incoming Data** select **Log Mappings**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Configuration**, and then under **Cloud SIEM Integrations** select **Log Mappings**. You can also click the **Go To...** menu at the top of the screen and select **Log Mappings**.  
    1. On the **Log Mappings** tab search for Auth0 and check the **Records** columns.<br/><img src={useBaseUrl('img/cse/auth0-reocrd-volume.png')} alt="Record volume" style={{border: '1px solid gray'}} style={{border: '1px solid gray'}} width="800" />
    1. For a more granular look at the incoming records, you can also use the Sumo Logic platform to search for Auth0 security records.<br/><img src={useBaseUrl('img/cse/auth0-search.png')} alt="Auth0 search" style={{border: '1px solid gray'}} style={{border: '1px solid gray'}} width="500" />