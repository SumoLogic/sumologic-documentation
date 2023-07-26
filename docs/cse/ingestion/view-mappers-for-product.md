---
id: view-mappers-for-product
title: View a List of Cloud SIEM Log Mappers for a Product
sidebar_label: Viewing Log Mappers for a Product
description: Learn how to find what mappers CSE provides for a product or service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This topic has instructions for find the log mappers that CSE provides for particular product or service.

CSE may have more than one log mapping for a particular product. For example, there may be a separate mapping for each message type issued by a product. You can view the available mappings in the CSE UI.

1. In the CSE UI, click the gear icon and select **Log Mappings**.<br/><img src={useBaseUrl('img/cse/config-gear-mappings.png')} alt="Access log mappings" width="800"/>
1. In the **Filters** area, filter by **Output Vendor**, **Output Product**, or both. In the following screenshot, the list of mappings is filtered to display mappings for *Output Vendor is Proofpoint*. The list contains six mappings for two Proofpoint products: five for Targeted Attack Protection, and one for Proofpoint On Demand.<br/><img src={useBaseUrl('img/cse/proofpoint-log-mappers.png')} alt="Proofpoint log mapping" width="800"/>
