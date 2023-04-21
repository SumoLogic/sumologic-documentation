---
id: automation-service-enrichments
title: Automation Service enrichments
sidebar_label: Automation Service enrichments
description: Learn how enrichments and threat indicators are added by the Automation Service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';


 In addition to being added by the [Insight Enrichment server](/docs/cse/integrations/insight-enrichment-server/), enrichments can also be added by the [Automation Service](/docs/cse/automation-service/about-automation-service). Enrichments added by the Automation Service can add [threat indicators](#threat-indicators) to show risk level in Insights and Entities. 

## Enrichments

You can view the results of enrichments in Cloud SIEM by navigating to the **Enrichments** tab (which will appear on the Entity, Signal, and Insight details pages if there are any enrichments to display):

<img src={useBaseUrl('img/cse/enrichments.png')} alt="Enrichments" width="800"/>

The enhancements include:
* Enrichments are grouped by Entity, not by enrichment source.
* Groups can be collapsed and expanded.
* The list can be filtered.
* Empty fields (fields with a null or empty value) can be optionally hidden.
* Links, if set by the enrichment, will be displayed and open in a new tab if clicked.
* Threat indicators, if set by the enrichment, will be displayed.

## Threat indicators

Threat indicators, if set, will be displayed throughout the CSE UI either as a full label or as a colored icon depending on the location:

| Label | Description | Icon |
|:--|:--|:--|
| **Malicious** | ![indicator-malicious-label.png](/img/cse/indicator-malicious-label.png) | ![indicator-malicious-icon.png](/img/cse/indicator-malicious-icon.png) |
| **Suspicious** | ![indicator-suspicious-label.png](/img/cse/indicator-suspicious-label.png) | ![indicator-suspicious-icon.png](/img/cse/indicator-suspicious-icon.png) |
| **Not Flagged** | ![indicator-suspicious-label.png](/img/cse/indicator-notflagged-label.png) | None |

No icon is displayed for Entities that with the **Not Flagged** label.

:::note
**Not Flagged** is not the default value (which is no indicator at all). Cloud SIEM will not automatically determine the indicator value; enrichments must explicitly set it.
:::

## Enrichment attributes

The enrichment schema includes support for the following optional attributes:
* `expiresAt`. Defines when the enrichment should be auto-deleted from Cloud SIEM (by default, enrichments will never be auto-deleted).
* `externalUrl`. Defines a link that will be displayed with an enrichment (for example, to include a link to the VirusTotal details page for this Entity, put the link in this field).
* `reputation`. Associates a threat indicator with this enrichment data. The allowable values are `malicious`, `suspicious`, and `notflagged`. The default is not to display any reputation.