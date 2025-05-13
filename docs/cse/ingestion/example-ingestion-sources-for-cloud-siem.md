---
id: example-ingestion-sources-for-cloud-siem
title: Example Ingestion Sources for Cloud SIEM
sidebar_label: Example Ingestion Sources
description: See examples of sources that Cloud SIEM supports for log ingestion.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This article lists examples of sources you can use to ingest data into Cloud SIEM. There are many sources you can use to ingest data into Cloud SIEM. The ones described in this article are just a few.

The most common method to ingest data into Cloud SIEM is to install a [Cloud-to-Cloud Integration Framework source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/) and select the [**Forward to SIEM** option](/docs/c2c/info/#metadata-fields) in the configuration UI. For all available methods to ingest data into Cloud SIEM, see [Recommended methods to ingest data into Cloud SIEM](/docs/cse/ingestion/cse-ingestion-best-practices/#recommended-methods-to-ingest-data-into-cloud-siem).

## Auth0

To ingest data into Cloud SIEM, select the [**Forward to SIEM** option](/docs/c2c/info/#metadata-fields) in the source configuration UI, and click the **+Add Field** link to add a field whose name is `_parser` with value */Parsers/System/Auth0/Auth0*. For complete directions, see [Collecting logs for Auth0](/docs/integrations/saml/auth0/#collecting-logs-for-auth0).

To verify that your logs are successfully making it into Cloud SIEM:
1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the top menu select **Configuration**, and then under **Incoming Data** select **Log Mappings**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Configuration**, and then under **Cloud SIEM Integrations** select **Log Mappings**. You can also click the **Go To...** menu at the top of the screen and select **Log Mappings**.  
1. On the **Log Mappings** tab search for Auth0 and check the **Records** columns.<br/><img src={useBaseUrl('img/cse/auth0-reocrd-volume.png')} alt="Record volume" style={{border: '1px solid gray'}} style={{border: '1px solid gray'}} width="800" />
1. For a more granular look at the incoming records, you can also use the Sumo Logic platform to search for Auth0 security records.<br/><img src={useBaseUrl('img/cse/auth0-search.png')} alt="Auth0 search" style={{border: '1px solid gray'}} style={{border: '1px solid gray'}} width="500" />




