---
id: rapid7
title: Rapid7
sidebar_label: Rapid7
description: The Rapid7 app for Sumo Logic provides an improved security posture by analyzing message logs.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/rapid7-logo.png')} alt="rapid7-logo" width="100" />

The Sumo Logic app for Rapid7 enables you to gain deeper insights into asset and vulnerability management activities by collecting asset and vulnerability activities using Sumo Logic's cloud-to-cloud Rapid7 source.

Rapid7 app provides vital information, including asset count, distribution of assets based on risk score and type, and a detailed breakdown of vulnerabilities based on severity and status. This app also tracks the count of newly identified vulnerabilities, vulnerabilities based on severity, and the most frequently occurring vulnerabilities. Using this information, you can prioritize remediation efforts, minimize attack surfaces, and make well-informed decisions to enhance your overall security posture.

## Log Types

This app uses Sumo Logic’s Rapid7 Source to collect [assets](https://help.rapid7.com/insightvm/en-us/api/integrations.html#tag/Asset) and [vulnerabilities](https://help.rapid7.com/insightvm/en-us/api/integrations.html#tag/Vulnerability) from Rapid7.

## Sample log message

```json title="Asset Log"
 {
  "assessed_for_policies": false,
  "assessed_for_vulnerabilities": true,
  "credential_assessments": [
    {
      "port": 449,
      "protocol": "TCP",
      "status": "NO_CREDS_SUPPLIED"
    },
    {
      "port": 445,
      "protocol": "TCP",
      "status": "NO_CREDS_SUPPLIED"
    },
    {
      "port": 161,
      "protocol": "UDP",
      "status": "NO_CREDS_SUPPLIED"
    },
    {
      "port": 23,
      "protocol": "TCP",
      "status": "NO_CREDS_SUPPLIED"
    },
    {
      "port": 22,
      "protocol": "TCP",
      "status": "NO_CREDS_SUPPLIED"
    }
  ],
  "critical_vulnerabilities": 4,
  "exploits": 1,
  "host_name": "bld.ihi.local",
  "id": "4b8cdd43-3bd3-411a-9597-41aedf04b62f-default-asset-370",
  "ip": "10.221.64.100",
  "last_assessed_for_vulnerabilities": "2023-04-12T06:58:24.911Z",
  "last_scan_end": "2023-04-12T06:58:24.911Z",
  "last_scan_start": "2023-04-12T06:30:07.616Z",
  "mac": "6C:AE:8B:6A:5E:90",
  "malware_kits": 0,
  "moderate_vulnerabilities": 9,
  "os_architecture": "",
  "os_description": "IBM OS/400",
  "os_family": "OS/400",
  "os_name": "OS/400",
  "os_system_name": "IBM OS/400",
  "os_type": "",
  "os_vendor": "IBM",
  "risk_score": 13497.2060546875,
  "severe_vulnerabilities": 12,
  "tags": [
    {
      "name": "temp - colo discovery",
      "type": "SITE"
    },
    {
      "name": "vuln - lco (group 2) - unauthenticated",
      "type": "SITE"
    },
    {
      "name": "temp - discovery",
      "type": "SITE"
    }
  ],
  "total_vulnerabilities": 25,
  "type": "physical",
  "unique_identifiers": []
}
```
```json title="Vulnerability Finding Log"
{
  "asset_id": "4b8cdd43-3bd3-411a-9597-41aedf04b62f-default-asset-519",
  "check_id": null,
  "finding_status": "remediated",
  "first_found": "2023-02-01T07:51:38Z",
  "key": "",
  "last_found": "2023-03-29T06:52:25.006Z",
  "port": null,
  "proof": "<p><p>Able to determine system boot time.</p></p>",
  "protocol": null,
  "solution_fix": null,
  "solution_id": null,
  "solution_summary": null,
  "solution_type": null,
  "status": "VULNERABLE_EXPL",
  "vulnerability_id": "generic-tcp-timestamp"
}
```

```json title="Vulnerability Log"
{
  "added": "2018-02-06T00:00:00Z",
  "categories": "XSS,jQuery",
  "cves": "CVE-2015-9251",
  "cvss_v2_access_complexity": "medium",
  "cvss_v2_access_vector": "network",
  "cvss_v2_authentication": "none",
  "cvss_v2_availability_impact": "none",
  "cvss_v2_confidentiality_impact": "none",
  "cvss_v2_exploit_score": 8.588799953460693,
  "cvss_v2_impact_score": 2.8627500620484354,
  "cvss_v2_integrity_impact": "partial",
  "cvss_v2_score": 4.3,
  "cvss_v2_vector": "(AV:N/AC:M/Au:N/C:N/I:P/A:N)",
  "cvss_v3_attack_complexity": "low",
  "cvss_v3_attack_vector": "network",
  "cvss_v3_availability_impact": "none",
  "cvss_v3_confidentiality_impact": "low",
  "cvss_v3_exploit_score": 2.8352547300000004,
  "cvss_v3_impact_score": 2.7267508438373347,
  "cvss_v3_integrity_impact": "low",
  "cvss_v3_privileges_required": "none",
  "cvss_v3_scope": "changed",
  "cvss_v3_score": 6.1,
  "cvss_v3_user_interaction": "required",
  "cvss_v3_vector": "CVSS:3.0/AV:N/AC:L/PR:N/UI:R/S:C/C:L/I:L/A:N",
  "denial_of_service": false,
  "description": "jQuery before 3.0.0 is vulnerable to Cross-site Scripting (XSS) attacks when a cross-domain Ajax request is performed without the dataType option, causing text/javascript responses to be executed.",
  "exploits": [],
  "id": "jquery-cve-2015-9251",
  "links": [
    {
      "href": "http://nvd.nist.gov/vuln/detail/CVE-2015-9251",
      "id": "CVE-2015-9251",
      "source": "cve"
    },
    {
      "href": "http://rhn.redhat.com/errata/RHSA-2020-0729.html",
      "id": "RHSA-2020:0729",
      "source": "redhat"
    },
    {
      "href": "http://rhn.redhat.com/errata/RHSA-2020-0481.html",
      "id": "RHSA-2020:0481",
      "source": "redhat"
    },
    {
      "href": "http://www.securityfocus.com/bid/105658",
      "id": "105658",
      "source": "bid"
    }
  ],
  "malware_kits": [],
  "modified": "2023-04-05T00:00:00Z",
  "pci_cvss_score": 4.3,
  "pci_fail": true,
  "pci_severity_score": 3,
  "pci_special_notes": "XSS vulnerabilities are a violation of the PCI DSS, and result in an automatic failure. ",
  "pci_status": "fail",
  "published": "2018-01-18T00:00:00Z",
  "references": "bid:105658,cve:CVE-2015-9251,redhat:RHSA-2020:0481,redhat:RHSA-2020:0729",
  "risk_score": 187.13,
  "severity": "severe",
  "severity_score": 4,
  "title": "jQuery Vulnerability: CVE-2015-9251"
}
``` 
## Sample Query

```sql title="Assets by Type"
_sourceCategory="Rapid7" assessed_for_policies // fetches assets
| json "id", "type", "os_system_name", "risk_score", "host_name", "ip","severe_vulnerabilities", "total_vulnerabilities", "last_assessed_for_vulnerabilities", "mac", "last_scan_end", "tags[*].name" as id, type, operating_system, risk_score, host_name, ip, severe_vulnerabilities, total_vulnerabilities, last_assessed_time, mac, last_scan_end, tag_name_list nodrop
| extract field=tag_name_list "\"?(?<tag_name>[\w\s\-&.-z)(,]*?)\"?[,\n\]]" multi
| where tag_name matches "{{tag}}"
| where operating_system matches "{{operating_system}}"
| where !isNull(type)
|count_distinct(id) as frequency by type
| sort by frequency
```

```sql title="Top 10 Vulnerabilities"
_sourceCategory="Rapid7" (cvss_v2_access_complexity or asset_id) 
| join
(json "id","severity","risk_score" as id, severity,risk_score) as vulnerability,
(json "vulnerability_id","asset_id","finding_status" as vulnerability_id, asset_id, finding_status) as asset_vulnerability
on vulnerability.id=asset_vulnerability.vulnerability_id // get information of asset related vulnerabilities from knowledge base
| fields vulnerability_severity, vulnerability_id, vulnerability_risk_score, asset_vulnerability_asset_id, asset_vulnerability_finding_status
| first(asset_vulnerability_finding_status) as aasset_vulnerability_finding_status group by vulnerability_id, asset_vulnerability_asset_id, vulnerability_severity, vulnerability_risk_score
| count_distinct(asset_vulnerability_asset_id) as related_assets by vulnerability_id, vulnerability_severity, vulnerability_risk_score
| sort by related_assets     
| limit 10
```

## Set up collection

To set up [Cloud to Cloud Integration Rapid7 Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/rapid7-source) for the Rapid7 app, follow the instructions provided. These instructions will guide you through the process of creating a source using the Rapid7 Source category, which you will need to use when installing the app. By following these steps, you can ensure that your Rapid7 app is properly integrated and configured to collect and analyze your Rapid7 data.

## Installing the Rapid7 app​

This section has instructions for installing the Sumo Logic app for Rapid7 and descriptions of each of the dashboards.

Locate and install the app you need from the **App Catalog**. If you want to see a preview of the dashboards included with the app before installing, click **Preview Dashboards**.
1. From the **App Catalog**, search for the app and select it.
1. Select **Add Integration** button to install the app.
1. Configure the **Rapid7** app using the steps described in the [Rapid7 Cloud-to-Cloud Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/rapid7-source). If you already have set up your data, skip this step by clicking on **Next**.
1. Complete the following fields:
   1. **Data Source**. Select either of these options for the data source:
      * Choose **Source Category** and then choose a source category from the list.
      * Select **Enter a Custom Data Filter** and type in a custom source category that starts with an underscore. For Example, `_sourceCategory=MyCategory`.
    2. **Folder Name**. You can retain the existing name, or enter a name of your choice for the app.
    3. Select the **Location in Library** (the default is the **Personal** folder in the library), or click **New Folder** to add a new folder.
1. Click **Next**.

Once an app is installed, it will appear in your **Personal** folder, or other folder that you specified. You can share it with your organization.

The panels will begin to fill automatically. It's worth noting that each panel gradually fills with data that matches the time range query and has been received since the panel was created. The results will not be available right away, but with some patience, you will be able to view full graphs and maps.

## Viewing Rapid7 Dashboards​​

* All dashboards have a set of filters that you can apply to the entire dashboard, as shown in the following example. Click the funnel icon in the top dashboard menu bar to display a scrollable list of filters that are applied across the entire dashboard.

 You can use filters to drill down and examine the data on a granular level. Filters include client country, client device type, client IP, client request host, client request URI, client request user agent, edge response status, origin IP, and origin response status.

* Each panel has a set of filters that are applied to the results for that panel only, as shown in the following example. Click the funnel icon in the top panel menu bar to display a list of panel-specific filters.

### Rapid7 - Assets Overview

The **Rapid7 - Assets Overview** dashboard provides a detailed summary of the assets within the Rapid7 source. It presents a comprehensive view of the total asset count, highlighting the top 10 vulnerable assets based on their risk score and the number of associated vulnerabilities. Additionally, this dashboard offers valuable information about the leading operating systems among assets, the distribution of assets by type, the geographic location of assets, and a summary of recent assets based on their most recent scan time.<br/><img src={useBaseUrl('img/integrations/saas-cloud/Rapid7-Assets-Overview.png')} alt="Rapid7-Assets-Overview" width="750"/>

### Rapid7 - Vulnerabilities Overview

The **Rapid7 - Vulnerabilities Overview** dashboard offers significant insights into vulnerability findings from the assets. It tracks the number of new and remediated vulnerability findings over the period. The dashboard includes visual representations of vulnerabilities categorized by severity and highlights the top 10 vulnerabilities related to assets. Additionally, it presents a summary of the leading 10 solutions utilized to address vulnerabilities and showcases recent vulnerability instances based on their most recent discovery time, along with information on the assets involved.<br/><img src={useBaseUrl('img/integrations/saas-cloud/Rapid7-Vulnerabilities-Overview.png')} alt="Rapid7-Vulnerabilities-Overview" width="750"/>
