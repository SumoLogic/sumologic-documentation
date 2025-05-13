---
id: sysdig-secure
title: Sysdig Secure
sidebar_label: Sysdig Secure
description: The Sysdig Secure app for Sumo Logic provides insights into container security and manage runtime protection.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/misc/sysdig-logo.png')} alt="thumbnail icon" width="125"/>

The Sumo Logic app for Sysdig Secure integrates Sysdig Secure’s security insights with Sumo Logic's powerful analytics to help security teams monitor and protect Kubernetes and containerized environments. It provides real-time visibility into vulnerabilities, compliance, and threats by analyzing security events from various sources such as Kubernetes clusters, container registries, and runtime environments. With it's intuitive dashboards, Sysdig Secure helps security professionals understand risks, assess vulnerability impact, and monitor runtime behavior to detect threats before they affect production environments. By centralizing data and presenting it through clear visualizations, the app enables effective collaboration, proactive defense, faster remediation, and continuous compliance in dynamic, containerized environments.

:::info
This app includes [built-in monitors](#sysdig-secure-monitors). For details on creating custom monitors, refer to [Create monitors for Sysdig Secure app](#create-monitors-for-sysdig-secure-app).
:::

## Log types

This app uses Sumo Logic’s [Sysdig Secure Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/sysdig-secure-source/) to collect the detected open vulnerabilities and active assets from the Sysdig Secure platform.

### Sample log messages

<details>
<summary>Runtime Scan</summary>

```json
{
    "mainAssetName": "mcr.microsoft.com/azure-policy/policy-kubernetes-addon-prod:1.10.1",
    "policyEvaluationResult": "failed",
    "resourceId": "sha256:73fce251be0bb71b38a642a3eed2831e5cb26e02f49023bf89fa76ce7ab2ca7d",
    "resultId": "18393741b66ab761884752af58d8ac32",
    "runningVulnTotalBySeverity": {
        "critical": 0,
        "high": 0,
        "low": 0,
        "medium": 0,
        "negligible": 0
    },
    "sbomId": null,
    "scope": {
        "asset.type": "workload",
        "kubernetes.cluster.name": "gke-alliances-test",
        "kubernetes.namespace.name": "kube-system",
        "kubernetes.pod.container.name": "konnectivity-agent-metrics-collector",
        "kubernetes.workload.name": "konnectivity-agent",
        "kubernetes.workload.type": "deployment",
        "workload.name": "konnectivity-agent",
        "workload.orchestrator": "kubernetes"
    },
    "vulnTotalBySeverity": {
        "critical": 0,
        "high": 1,
        "low": 1,
        "medium": 0,
        "negligible": 0
    }
}
```
</details>

<details>
<summary>Full Scan of Vulnerability</summary>

```json
{
  "_resultId": "18392a48e55ef07e827e47719a5295d1",
  "_resourceId": "1489835514684399099",
  "assetType": "host",
  "stage": "runtime",
  "metadata": {
    "architecture": "x86_64",
    "hostId": "1489835514684399099",
    "hostName": "eksa-vsphere-conformitron-md-0-28n7h-vzqdk",
    "os": "bottlerocket 1.26.1"
  },
  "vulnerability": {
    "c360bd86-4f6d-49bf-b9ce-9fa26d2e4eac": {
      "cisaKev": {},
      "cvssScore": {
        "score": 5.5,
        "vector": "CVSS:3.1/AV:L/AC:L/PR:L/UI:N/S:U/C:N/I:N/A:H",
        "version": "3.1"
      },
      "disclosureDate": "2024-11-19",
      "exploitable": false,
      "fixVersion": "6.1.128",
      "mainProvider": "bottlerocket",
      "name": "CVE-2024-50304",
      "packageRef": "ebe6d690-3753-4749-8001-b5391b9ba0a3",
      "providersMetadata": {
        "amazon": {
          "publishDate": "2025-02-12T22:57:00Z"
        },
        "euleros": {
          "publishDate": "2025-02-08T14:57:02Z"
        },
        "first.org": {
          "epssScore": {
            "score": 0.00045,
            "percentile": 0.13532,
            "timestamp": "2025-04-23T00:00:00Z"
          }
        },
        "nvd": {
          "publishDate": "2024-11-19T18:15:22.343Z",
          "cvssScore": {
            "version": "3.1",
            "score": 5.5,
            "vector": "CVSS:3.1/AV:L/AC:L/PR:L/UI:N/S:U/C:N/I:N/A:H"
          },
          "severity": "medium"
        },
        "rhel": {
          "publishDate": "2024-11-19T00:00:00Z",
          "cvssScore": {
            "version": "3.1",
            "score": 5.5,
            "vector": "AV:L/AC:L/PR:L/UI:N/S:U/C:N/I:N/A:H"
          },
          "severity": "medium"
        },
        "ubuntu": {
          "publishDate": "2024-11-19T18:15:00Z"
        },
        "vulndb": {
          "publishDate": "2024-11-19T00:00:00Z"
        }
      },
      "riskAcceptRefs": null,
      "severity": "medium",
      "solutionDate": "2025-02-25"
    }
  }
}
```
</details>

<details>
<summary>Full Scan of Package</summary>

```json
{
  "_resultId": "18392a48e55ef07e827e47719a5295d1",
  "_resourceId": "1489835514684399099",
  "assetType": "host",
  "stage": "runtime",
  "metadata": {
    "architecture": "x86_64",
    "hostId": "1489835514684399099",
    "hostName": "eksa-vsphere-conformitron-md-0-28n7h-vzqdk",
    "os": "bottlerocket 1.26.1"
  },
  "package": {
    "8edec454-c929-49b0-86e8-d72412592109": {
      "isRemoved": false,
      "isRunning": false,
      "name": "google.golang.org/grpc",
      "path": "/usr/bin/containerd-shim",
      "type": "golang",
      "version": "v1.59.0",
      "vulnerabilitiesRefs": null
    }
  }
}
```
</details>

### Sample queries

```sql title="Total Running Critical Severity Vulnerabilities"
_sourceCategory=Labs/SysdigSecure mainAssetName
| json "mainAssetName", "resourceId", "runningVulnTotalBySeverity.critical","vulnTotalBySeverity.critical", "runningVulnTotalBySeverity.high", "vulnTotalBySeverity.high", "runningVulnTotalBySeverity.medium", "vulnTotalBySeverity.medium", "runningVulnTotalBySeverity.low", "vulnTotalBySeverity.low", "runningVulnTotalBySeverity.negligible", "vulnTotalBySeverity.negligible", "policyEvaluationResult", "$['scope']['asset.type']", "$['scope']['kubernetes.cluster.name']", "$['scope']['workload.name']", "$['scope']['kubernetes.workload.type']" as asset_name, resource_id, running_critical_vuln, total_critical_vuln, running_high_vuln, total_high_vuln, running_medium_vuln, total_medium_vuln, running_low_vuln, total_low_vuln, running_negligible_vuln, total_negligible_vuln, policy_result, asset_type, kubernete_cluster, workload_name, kubernete_workload_type nodrop

// global filters
| where asset_type matches "{{asset_type}}"
| where policy_result matches "{{policy_evaluation_result}}"
| where kubernete_cluster matches "{{kubernete_cluster}}"

// panel specific
| where !isNull(asset_name)
| first(running_critical_vuln) as running_critical_vuln group by asset_name, resource_id
| sum(running_critical_vuln)
```

```sql title="Resources by Package Count"
_sourceCategory=sysdig_secure_app
| json "_resourceId", "assetType", "metadata.os", "metadata.architecture", "vulnerability", "package" as resource_id, asset_type, os, architecture, vuln, package nodrop
| extract field=vuln "\"severity\":\s*\"(?<severity>[^\"]+)\"" nodrop
| extract field=vuln "\"exploitable\":\s*(?<exploitable>true|false)" nodrop

// global filters
| where os matches "{{os}}"
| where architecture matches "{{architecture}}"
| where isBlank(severity) or severity matches "{{severity}}"
| where isBlank(exploitable) or exploitable matches "{{exploitable_vuln}}"

// panel specific
| where !isNull(asset_type) and !isBlank(package)
| count as package_count by resource_id
| sort by package_count
```

## Collection configuration and app installation

import CollectionConfiguration from '../../reuse/apps/collection-configuration.md';

<CollectionConfiguration/>

:::important
Use the [Cloud-to-Cloud Integration for Sysdig Secure](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/sysdig-secure-source/) to create the source and use the same source category while installing the app. By following these steps, you can ensure that your Sysdig Secure app is properly integrated and configured to collect and analyze your Sysdig Secure data.
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

## Viewing the Sysdig Secure dashboards​​

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

<ViewDashboards/>

### Runtime Scan

The **Sysdig Secure - Runtime Scan** dashboard provides real-time insights into the security posture of assets and Kubernetes environments during runtime. It aggregates data from Sysdig Secure’s runtime scanning API, allowing you to monitor active threats and vulnerabilities in running assets. Key features highlight vulnerabilities, track security events such as privilege escalations, and identify compliance violations. By presenting detailed information on runtime risks and potential attack vectors, the dashboard helps security professionals effectively mitigate threats and maintain secure, compliant environments.<br/><img src='https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/Sysdig+Secure/Sysdig+Secure+-+Runtime+Scan.png' alt="Runtime-Scan" />

### Full Scan

The **Sysdig Secure - Full Scan** dashboard serves as a strategic assessment tool, providing detailed information on asset packages and vulnerabilities based on results from the runtime scan API. It illustrates asset evolution over time and their distribution across operating systems and architectures. The dashboard also highlights the most frequent vulnerabilities, exploitable vulnerabilities, and detailed package data. By identifying the most at-risk assets, it supports the maintenance of a robust and secure infrastructure.<br/><img src='https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/Sysdig+Secure/Sysdig+Secure+-+Full+Scan.png' alt="Full-Scan" />

## Create monitors for Sysdig Secure app

import CreateMonitors from '../../reuse/apps/create-monitors.md';

<CreateMonitors/>

### Sysdig Secure monitors

| Name | Description | Trigger Type (Critical / Warning / MissingData) | Alert Condition | 
|:--|:--|:--|:--|
| `Sysdig Secure - Critical Vulnerabilities` | This alert is triggered when the assets with 5 or more critical severity vulnerabilities are highlighted. | Critical | Count >= 5 |

## Upgrading the Sysdig Secure app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Sysdig Secure app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>
