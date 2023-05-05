---
id: active-directory-json-opentelemetry
title: Active Directory JSON - OpenTelemetry Collector
sidebar_label: Active Directory JSON - OTel Collector
description: Learn about the Sumo Logic OpenTelemetry App for Active Directory JSON.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<img src={useBaseUrl('img/integrations/microsoft-azure/windows.png')} alt="Thumbnail icon" width="40"/> <img src={useBaseUrl('img/send-data/otel-color.svg')} alt="Thumbnail icon" width="45"/>

The [Active Directory](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/get-started/virtual-dc/active-directory-domain-services-overview) JSON App helps you monitor your Windows Active Directory deployment by analyzing Active Directory logs in the JSON based event log format. The app includes predefined searches and dashboards that provide user activity into your environment for real-time analysis of overall usage.

We recommend using the Active Directory JSON App in combination with the Windows JSON App.Active Directory logs are sent to Sumo Logic through OpenTelemetry [windowseventlogreceiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/windowseventlogreceiver).

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Active-Directory-OpenTelemetry/Active-Directory-Schematics.png' alt="Schematics" />

## Fields creation in Sumo Logic for Active Directory

Following are the [fields](https://help.sumologic.com/docs/manage/fields/) which will be created as part of Active Directory App install if not already present.

**`sumo.datasource`** - Has fixed value of **activeDirectory**

### Event Logs Used by Active Directory App

This section provides instructions for configuring log collection for Active Directory running on a non-Kubernetes environment for the Sumo Logic App for Active Directory.

#### Log Types

Standard Windows event channels include:
-   **Security**
-   **System**
-   **Application**

## Collection Configuration and App Installation

{@import ../../../reuse/apps/opentelemetry/config-app-install.md}

As part of the setting up the collection process and app installation, you can select the App from App Catalog and click on Install App. Please follow the steps below:

### Step 1: Set up Collector

{@import ../../../reuse/apps/opentelemetry/set-up-collector.md}

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Active-Directory-OpenTelemetry/Active-Directory-Collector.png' alt="Collector" />

### Step 2: Configure Integration

In this step, we will configure the yaml required for Active Directory Collection.

You can add any custom fields which you want to tag along with the data ingested in Sumo.

Click on the **Download YAML File** button to get the yaml file.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Active-Directory-OpenTelemetry/Active-Directory-YAML.png' alt="YAML" />

### Step 3: Send logs to Sumo

{@import ../../../reuse/apps/opentelemetry/send-logs-intro.md}

1. Copy the yaml at `C:\ProgramData\Sumo Logic\OpenTelemetry Collector\config\conf.d` folder in the machine which needs to be monitored.
2. Restart the collector using the command `Restart-Service -Name`.

{@import ../../../reuse/apps/opentelemetry/send-logs-outro.md}


## Sample Log Messages

```sql
{
record_id:"121139",
channel:"Security",
event_data:"S-1-0-0
-
-
0x0
S-1-0-0
TS

0xc000006d
%%2313
0xc0000064
3
NtLmSsp
NTLM
-
-
-
0
0x0
-
9.204.254.156\
0",
task:"Logon",
provider:"{\"event_source\":\"\",\"name\":\"Microsoft-Windows-Security-Auditing\",\"guid\":\"{54849625-5478-4994-a5ba-3e3b0328c30d}\"}",
system_time:"2023-01-16T08:53:57+0000664Z",
computer:"EC2AMAZ-T30T53R",
opcode:"Info",
keywords:"Audit Failure",
details:"{\"Account For Which Logon Failed\":\"\",\"Network Information\":\"\",\"Failure Information\":\"\",\"Detailed Authentication Information\":\"\",\"Subject\":\"\",\"Process Information\":\"\",\"Logon Type\":\"3\",\"Additional Context\":\"\"}",
message:"An account failed to log on.",
event_id:"{\"qualifiers\":\"0\",\"id\":\"4625\"}",
level:"Information"
}
```

## Sample Query

This sample Query is from the Active Directory - Active Directory Service Activity > Top 10 Messages panel.

```sql
%"sumo.datasource"=activeDirectory
| json "event_id", "computer", "message" as event_id, host, msg_summary nodrop
| parse regex field=msg_summary "(?<msg_summary>.*\.*)" nodrop
| where host matches "*"
| count by msg_summary
| top 10 msg_summary by _count
```

## Viewing Active Directory Dashboards

### Active Directory Service Activity

The **Active Directory Service Activity** dashboard provides insights into overall active directory services like Category overtime, object creation, top 10 messages.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Active-Directory-OpenTelemetry/Active-Directory-Service-Activity.png' alt="Service Activity" />

### Active Directory Service Failures

The **Active Directory Service Failures** dashboard provides an at-a-glance view of success, failures, and audit failures overtime.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Active-Directory-OpenTelemetry/Active-Directory-Service-Failures.png' alt="Service Failures" />
