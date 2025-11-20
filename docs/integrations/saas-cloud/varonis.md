---
id: varonis
title: Varonis
sidebar_label: Varonis
description: The Sumo Logic app for Varonis provides insights into your organization's cybersecurity practices to strengthen security.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/misc/varonis-logo.png')} alt="thumbnail icon" width="100"/>

The Sumo Logic app for Varonis provides a centralized view of threat intelligence and detection activity across your Varonis environment. It helps you quickly evaluate threat volume, confidence levels, types, and associated detection sources and techniques.

## Log types

This app uses Sumo Logic’s [Varonis source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/varonis-source/) to collect the alerts from the Varonis platform.

## Sample log messages

<details>
<summary>Varonis Alert</summary>

```json
{
  "escalationType": null,
  "eventsCount": 1,
  "hasSensitiveResource": false,
  "hasTaggedResource": false,
  "id": "EBB74744-5D3A-47B5-8CD3-81C4B70026A0",
  "isAssignedToVaronis": false,
  "status": "NEW",
  "closedBy": {
    "name": null
  },
  "closeReason": {
    "id": "0",
    "name": null
  },
  "dataSource": [
    {
      "id": "9",
      "name": "psg49574-Proxy1",
      "type": "PROXY"
    }
  ],
  "generationTime": {
    "dateTimeUtc": "2025-11-04T12:13:52.034Z"
  },
  "note": null,
  "policy": {
    "category": "EXFILTRATION",
    "id": "89",
    "name": "Abnormal behavior: an unusual amount of data was uploaded to email websites",
    "severity": "HIGH"
  }
}
```
</details>

## Sample queries

```sql title="Total Alerts"
_sourcecategory=*varonis*
| json  "id", "dataSource", "policy.category", "policy.severity", "policy.name",  "generationTime.dateTimeUtc", "escalationType", "status" as threat.id, detection.source, detection.technique, detection.confidence, threat.name, event.time, event.type, finding.status  nodrop
| where detection.confidence !=NULL

| timeslice 1d
| count as frequency by _timeslice, detection.confidence
| fillmissing timeslice, values all in detection.confidence
| transpose row _timeslice column detection.confidence
```

## Collection configuration and app installation

import CollectionConfiguration from '../../reuse/apps/collection-configuration.md';

<CollectionConfiguration/>

:::important
Use the [Cloud-to-Cloud Integration for Varonis](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/varonis-source/) to create the source and use the same source category while installing the app. By following these steps, you can ensure that your Varonis app is properly integrated and configured to collect and analyze your Varonis data.
:::

### Create a new collector and install the app

import AppCollectionOPtion1 from '../../reuse/apps/app-collection-option-1.md';

<AppCollectionOPtion1/>

### Use an existing collector and install the app

import AppCollectionOPtion2 from '../../reuse/apps/app-collection-option-2.md';

<AppCollectionOPtion2/>

### Use an existing source and install the app

import AppCollectionOPtion3 from '../../reuse/apps/app-collection-option-3.md';

<AppCollectionOPtion3/>

## Viewing the Varonis dashboards​​

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

<ViewDashboards/>

### Security Overview

The **Varonis - Security Overview** dashboard provides a unified view of security threats detected across your environment. It surfaces key insights such as threat volume, confidence levels, detection techniques, and data sources including Active Directory, SharePoint, and Exchange Online. You can easily spot spikes in activity, monitor emerging or ongoing threats, and identify recurring issues such as abnormal data uploads or policy violations. The detailed threat summary table enables deeper investigation by presenting event-level data, detection methods, and associated confidence levels. Together, these capabilities help security teams assess risk exposure and prioritize incident response more effectively. <br/><img src={useBaseUrl('img/integrations/saas-cloud/Varonis-SecurityOverview.png')} alt="Varonis - Security Overview Dashboard" />

## Upgrading the Varonis app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Varonis app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>
