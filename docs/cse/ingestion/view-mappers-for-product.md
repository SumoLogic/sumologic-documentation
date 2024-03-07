---
id: view-mappers-for-product
title: View a List of Cloud SIEM Log Mappers for a Product
sidebar_label: Viewing Log Mappers for a Product
description: Learn how to find what mappers Cloud SIEM provides for a product or service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This topic has instructions for find the log mappers that Cloud SIEM provides for particular product or service. 

See the [Cloud SIEM Content Catalog](https://github.com/SumoLogic/cloud-siem-content-catalog/blob/master/README.md) for a complete list of [Mappings](https://github.com/SumoLogic/cloud-siem-content-catalog/blob/master/mappings/README.md), [Vendors](https://github.com/SumoLogic/cloud-siem-content-catalog/blob/master/vendors/README.md), and [Products](https://github.com/SumoLogic/cloud-siem-content-catalog/blob/master/products/README.md).

Cloud SIEM may have more than one log mapping for a particular product. For example, there may be a separate mapping for each message type issued by a product. You can view the available mappings in the Cloud SIEM UI.

1. In the Cloud SIEM UI, click the gear icon and select **Log Mappings**.<br/><img src={useBaseUrl('img/cse/config-gear-mappings.png')} alt="Access log mappings" width="800"/>
1. In the **Filters** area, filter by **Output Vendor**, **Output Product**, or both. In the following screenshot, the list of mappings is filtered to display mappings for *Output Vendor is Proofpoint*. The list contains six mappings for two Proofpoint products: five for Targeted Attack Protection, and one for Proofpoint On Demand.<br/><img src={useBaseUrl('img/cse/proofpoint-log-mappers.png')} alt="Proofpoint log mapping" width="800"/>
