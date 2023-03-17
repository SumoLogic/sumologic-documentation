---
id: qualys-vmdr
title: Qualys VMDR
sidebar_label: Qualys VMDR
description: The Sumo Logic App for Qualys VMDR provides vulnerability summary across your IT infrastructure.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/saas-cloud/qualys-icon.png')} alt="qualys-icon.png" width="150" />

Qualys VMDR app is a new Sumo Logic app based on the [Qualys VMDR Cloud-to-Cloud source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/qualys-vmdr-source/), which tracks errors, reports its health, and start-up progress. It provides a cloud security, compliance, and vulnerability management solutions across your IT infrastructure.

## Log Types

The Sumo logic App for Qualys VMDR uses vulnerability data from [Vulnerability API](https://www.qualys.com/docs/qualys-api-vmpc-user-guide.pdf) and asset data from [Asset API](https://www.qualys.com/docs/qualys-global-ai-api-v2-user-guide.pdf).


### Sample Log Message

```json
{
  "Id": "9816652",
  "IP": "10.50.4.15",
  "Hostname": "vmauditdev",
  "Detection": {
    "Qid": "216273",
    "Type": "Potential",
    "Severity": "3",
    "Ssl": "0",
    "Results": "VMWare Build Version is  19832280",
    "Status": "New",
    "FirstFoundDateTime": "2022-12-07T10:50:00Z",
    "LastFoundDateTime": "2022-12-07T10:50:00Z",
    "TimesFound": "1",
    "LastTestDateTime": "2022-12-07T10:50:00Z",
    "LastUpdateDateTime": "2022-12-07T12:08:22Z",
    "IsIgnored": "0",
    "IsDisabled": "0",
    "LastProcessedDateTime": "2022-12-07T12:08:22Z"
  }
}
```


### Sample Queries

```sql
source=Qualys
| where (_raw matches /^\{.*\}$/)

| json "IP", "Hostname", "Detection.Qid" as ip, hostname, Qid nodrop
| first(_raw) as _raw by ip, hostname, Qid

| json "Detection" as vulnerability nodrop
| where ip matches "*"
| where hostname matches "*"

| json auto field=vulnerability nodrop
| fields -vulnerability

| where !IsEmpty(severity)
| where severity matches "*"

| "Unknown" as severity_label
| if(severity = 1, "Informational", severity_label) as severity_label
| if(severity = 2, "Low", severity_label) as severity_label
| if(severity = 3, "Medium", severity_label) as severity_label
| if(severity = 4, "High", severity_label) as severity_label
| if(severity = 5, "Critical", severity_label) as severity_label

| count as Total ip, hostname, severity, severity_label
| transpose row ip, hostname column severity, severity_label as %"1|Informational", %"2|Low", %"3|Medium", %"4|High", %"5|Critical"
| if(IsNull(%"1|Informational"), 0, %"1|Informational") as %"1|Informational"
| if(IsNull(%"2|Low"), 0, %"2|Low") as %"2|Low"
| if(IsNull(%"3|Medium"), 0, %"3|Medium") as %"3|Medium"
| if(IsNull(%"4|High"), 0, %"4|High") as %"4|High"
| if(IsNull(%"5|Critical"), 0, %"5|Critical") as %"5|Critical"
| %"1|Informational" + %"2|Low" + %"3|Medium" + %"4|High" + %"5|Critical" as %"Total"

| order by %"Total" desc
```

## Set up Collection

This section provides instructions for setting up [Cloud-to-Cloud-Integration for Qualys VMDR](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/qualys-vmdr-source.md) to create the source and use the same source category while installing the app.


## Installing the Qualys VMDR App​

This section provides instructions for installing the Qualys VMDR Sumo Logic App, as well as the descriptions of each of the app dashboards.
You can locate and install any app from the **App Catalog**. Before installing the app, if you want to see a preview of the dashboard click **Preview Dashboards**.

To install the Qualys VMDR app, follow the steps below:
1. From the **App Catalog**, search for the app and select it.
2. Select the version of the service you're using and click **Add to Library**.

:::note
Version selection is applicable only to a few apps currently. For details, see the [Install the Apps from the Library](/docs/get-started/apps-integrations#install-apps-from-the-library).
:::

3. Enter the following required fields.
   1. **App Name**. You can retain the existing name, or enter a name of your choice for the app.
   2. **Data Source**. Select either of these options for the data source:
     * Choose **Source Category** and then choose a source category from the list.
     * Select **Enter a Custom Data Filter** and type in a custom source category that starts with an underscore. For Example: `_sourceCategory=MyCategory`. 
   3. **Advanced**. Select the **Location in Library** (the default is the **Personal** folder in the library), or click **New Folder** to add a new folder.
4. Click **Add to Library**.

Once an app is installed, it will appear in your **Personal** folder, or other folder that you specified. You can share it with your organization.
The panels will begin to fill automatically. It's worth noting that each panel gradually fills with data that matches the time range query and has been received since the panel was created. The results will not be available right away, but with some patience, you will be able to view full graphs and maps.


## Viewing Qualys VMDR Dashboard

**Qualys VMDR - Overview dashboard** This dashboard gives you visibility into low, medium, high, and critical vulnerabilities by hosts in your network. Use the dashboard to slice and dice data by vulnerability severity, IPs, and hosts.
<img src={useBaseUrl('img/integrations/saas-cloud/qualys-vmdr-overview.png')} alt="Qyalys VMDR Overview" width="900"/>
