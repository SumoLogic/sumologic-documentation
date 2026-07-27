---
id: view-mappers-for-product
title: View a List of SIEM Log Mappers for a Product
sidebar_label: Viewing Log Mappers for a Product
description: Learn how to find what mappers SIEM provides for a product or service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This topic has instructions for find the log mappers that SIEM provides for particular product or service. 

See the [SIEM Content Catalog](https://github.com/SumoLogic/siem-content-catalog/blob/master/README.md) for a complete list of [mappings](https://github.com/SumoLogic/siem-content-catalog/blob/master/mappings/README.md), [vendors](https://github.com/SumoLogic/siem-content-catalog/blob/master/vendors/README.md), and [products](https://github.com/SumoLogic/siem-content-catalog/blob/master/products/README.md).

SIEM may have more than one log mapping for a particular product. For example, there may be a separate mapping for each message type issued by a product. You can view the available mappings in the SIEM UI.

1. [**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu select **SIEM**, and then under **SIEM Integrations** select **Log Mappings**. You can also click the **Go To...** menu at the top of the screen and select **Log Mappings**.<br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the top SIEM menu select **Configuration**, and then under **Incoming Data** select **Log Mappings**. 
1. In the **Filters** area, filter by **Output Vendor**, **Output Product**, or both. 

In the following screenshot, the list of mappings is filtered to display mappings for *Output Vendor is Proofpoint*. The list contains six mappings for two Proofpoint products: one for Proofpoint On Demand, and the rest for Targeted Attack Protection.<br/><img src={useBaseUrl('img/cse/proofpoint-log-mappers.png')} alt="Proofpoint log mapping" style={{border: '1px solid gray'}} width="800"/>
