---
id: windows-opentelemetry
title: Windows - Cloud Security Monitoring and Analytics - OpenTelemetry
sidebar_label: Windows - OpenTelemetry
description: The Sumo Logic app for Windows Cloud Security Monitoring and Analytics - OpenTelemetry provides pre-built dashboards and queries to help you track your Windows system, user accounts, login activity, and Windows updates.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/cloud-security-monitoring-analytics/SecMon_Windows.png')} alt="Thumbnail icon" width="85"/>

Windows - Cloud Security Monitoring and Analytics - OpenTelemetry is a unified log app that ingests distribution of Windows data to Sumo Logic via OpenTelemetry [filelog receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/filelogreceiver). The app's preconfigured dashboards provide insight into user accounts, login activity, and Windows updates.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/PCI-Compliance-For-Windows-JSON/OpenTelemetry/PCI-WIndows-JSON-Schematics.png' alt="PCI-Windows-JSON-Schematics" style={{border: '1px solid black'}} />

## Fields created in Sumo Logic for Windows

The following tag will be created as part of Windows app installation, if not already present. 

- `sumo.datasource`. Has a fixed value of **windows**.
- `host.group`. User configured tag which signifies a group of hosts for the operating system.
- `deployment.environment`. User configured tag which identifies the environment where the windows system resides. For example: dev, prod or qa.

## Log types

The Windows app assumes events are coming from the Windows Event Log receiver in JSON format. It does not work with third party logs.

Standard Windows event channels include:
- Security
- System

## Collection configuration and app installation

:::note
You can skip this section if you have already set up the logs collection through [Windows](/docs/integrations/hosts-operating-systems/opentelemetry/windows-opentelemetry/). Additional collection is not required as the logs used by this app are already ingested into Sumo Logic.
:::

{@import ../../../reuse/apps/opentelemetry/config-app-install.md}

### Step 1: Set up Collector

{@import ../../../reuse/apps/opentelemetry/set-up-collector.md}

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/PCI-Compliance-For-Linux/OpenTelemetry/Linux-Collector.png' alt="Linux-Collector" style={{border: '1px solid black'}} />

### Step 2: Configure integration

In this step, you will configure the yaml file required for Windows event logs and metrics Collection.

Any custom fields can be tagged along with the data in this step.

Once the details are filled in, click on the **Download YAML File** button to get the yaml file.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/PCI-Compliance-For-Windows-JSON/OpenTelemetry/PCI-Windows-YAML.png' style={{border: '1px solid black'}} alt="YAML" />

### Step 3: Send logs to Sumo Logic

{@import ../../../reuse/apps/opentelemetry/send-logs-intro.md}

1. Copy the YAML file to `C:\ProgramData\Sumo Logic\OpenTelemetry Collector\config\conf.d` folder in the machine which needs to be monitored.
2. Restart the collector using:
    ```sh
    Restart-Service -Name OtelcolSumo
    ```

{@import ../../../reuse/apps/opentelemetry/send-logs-outro.md}

## Sample log message

```json
{
 "record_id":161812,
 "channel":"Security",
 "event_data":{
   "WorkstationName":"-",
   "TargetDomainName":"",
   "SubjectUserSid":"S-1-0-0",
   "LogonProcessName":"NtLmSsp ",
   "TargetUserName":"ADMINISTRATOR",
   "TargetUserSid":"S-1-0-0",
   "IpAddress":"3.137.149.192",
   "ProcessId":"0x0",
   "KeyLength":"0",
   "ProcessName":"-",
   "SubjectUserName":"-",
   "LogonType":"3",
   "TransmittedServices":"-",
   "FailureReason":"%%2313",
   "SubjectLogonId":"0x0",
   "IpPort":"0",
   "AuthenticationPackageName":"NTLM",
   "Status":"0xc000006d",
   "LmPackageName":"-",
   "SubStatus":"0xc000006a",
   "SubjectDomainName":"-"
 },
 "task":"Logon",
 "provider":{
   "name":"Microsoft-Windows-Security-Auditing",
   "guid":"{54849625-5478-4994-a5ba-3e3b0328c30d}",
   "event_source":""
 },
 "system_time":"2023-07-11T14:14:51.1731050Z",
 "computer":"EC2AMAZ-V57A85N",
 "opcode":"Info",
 "keywords":[
   "Audit Failure"
 ],
 "details":{
   "Account For Which Logon Failed":{
     "Security ID":"S-1-0-0",
     "Account Name":"ADMINISTRATOR",
     "Account Domain":"-"
   },
   "Network Information":{
     "Workstation Name":"-",
     "Source Network Address":"3.137.149.192",
     "Source Port":"0"
   },
   "Failure Information":{
     "Failure Reason":"Unknown user name or bad password.",
     "Status":"0xC000006D",
     "Sub Status":"0xC000006A"
   },
   "Detailed Authentication Information":{
     "Transited Services":"-",
     "Key Length":"0",
     "Logon Process":"NtLmSsp",
     "Authentication Package":"NTLM",
     "Package Name (NTLM only)":"-"
   },
   "Subject":{
     "Security ID":"S-1-0-0",
     "Account Name":"-",
     "Account Domain":"-",
     "Logon ID":"0x0"
   },
   "Process Information":{
     "Caller Process ID":"0x0",
     "Caller Process Name":"-"
   },
   "Logon Type":"3",
   "Additional Context":[
     "This event is generated when a logon request fails. It is generated on the computer where access was attempted.",
     "The Subject fields indicate the account on the local system which requested the logon. This is most commonly a service such as the Server service, or a local process such as Winlogon.exe or Services.exe.",
     "The Logon Type field indicates the kind of logon that was requested. The most common types are 2 (interactive) and 3 (network).",
     "The Process Information fields indicate which account and process on the system requested the logon.",
     "The Network Information fields indicate where a remote logon request originated. Workstation name is not always available and may be left blank in some cases.",
     "The authentication information fields provide detailed information about this specific logon request.",
     "- Transited services indicate which intermediate services have participated in this logon request.",
     "- Package name indicates which sub-protocol was used among the NTLM protocols.",
     "- Key length indicates the length of the generated session key. This will be 0 if no session key was requested."
   ]
 },
 "message":"An account failed to log on.",
 "event_id":{
   "qualifiers":0,
   "id":4625
 },
 "level":"Information"
}
```

## Sample log query

This sample log query is from the **Windows - Security Analytics - User Account Changes** dashboard > **Failed Logins Summary** panel.

```sql
sumo.datasource=windows "Microsoft-Windows-Security-Auditing" ("4770" OR "4771" OR "4772" OR "4776" OR "4777" OR "4768" OR "4769" OR "4820" OR "4625" OR "4624" OR "4647" OR "4778" OR "4779" OR "4800" OR "4801" OR "4802" OR "4803") "Audit Failure" * * * * *
| json "channel", "provider", "event_id", "computer","task","keywords","event_data","message" as Channel, Provider, EventID, Computer, Task, Keywords, Event_Data, Message  nodrop
| json field=EventID "qualifiers","id" as  qualifiers, EventID
| json field=Provider "guid","event_source","name" as  Guid, EventSource,Provider
| where Channel = "Security"
| where provider = "Microsoft-Windows-Security-Auditing"
| where EventID in ("4770", "4771", "4772", "4776", "4776", "4768", "4769", "4820", "4625", "4624", "4647", "4778", "4779", "4800", "4801", "4802","4803")
| where EventID matches "{{EventID}}"
| where Keywords matches "*Audit Failure*"
| where Computer matches "{{Computer}}"
| json field=Event_Data "TargetDomainName","TargetUserName", "SubjectDomainName", "SubjectUserName", "IpAddress", "LogonType" as  TargetDomainName, TargetUserName, SubjectDomainName, SubjectUserName, IpAddress, LogonType nodrop
| where !(TargetUserName matches "*$")
| replace(IpAddress, "::ffff:", "") as IpAddress
| formatDate(_messageTime, "yyyy-MM-dd hh:mm:ss") as date
| format("%s/%s", SubjectDomainName, SubjectUserName) as subject
| format("%s/%s", TargetDomainName, TargetUserName) as target
| parse field=Message "*\n" as message nodrop
| where subject matches "{{{Subject}}}"
| where target matches "{{{Target}}}"
| where IpAddress matches "{{{IpAddress}}}"
| timeslice 1h
| count as Total _timeslice
| order by _timeslice
```

## Viewing Windows - Cloud Security Monitoring and Analytics dashboards

{@import ../../../reuse/filter-dashboards.md}

### Default Accounts Usage​

The **Windows - Security Analytics - Default Accounts Usage** dashboard displays analytics of default account usage including Administrator, Guest, System, and Root accounts.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Windows-Cloud-Security-Monitoring-and-Analytics/OpenTelemetry/Windows-Security-Analytics-Default-Accounts-Usage.png' style={{border: '1px solid black'}} alt="Windows-Security-Analytics-Default-Accounts-Usage" />

### TLS Certificates and Secure Channels​

The **Windows - Security Analytics - TLS Certificates and Secure Channels** dashboard provides security analytics on TLS and Schannel events.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Windows-Cloud-Security-Monitoring-and-Analytics/OpenTelemetry/Windows-Security-Analytics-TLS-Certificates-and-Secure-Channels.png' style={{border: '1px solid black'}} alt="Windows-Security-Analytics-TLS-Certificates-and-Secure-Channels" />

### User Account Changes​

The **Windows - Security Analytics - User Account Changes** dashboard provides analytics on user account changes and events.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Windows-Cloud-Security-Monitoring-and-Analytics/OpenTelemetry/Windows-Security-Analytics-User-Account-Changes.png' style={{border: '1px solid black'}} alt="Windows-Security-Analytics-User-Account-Changes" />

### User Authentication​

The **Windows - Security Analytics - User Authentication** dashboard provides security analytics on successful and failed account logins.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Windows-Cloud-Security-Monitoring-and-Analytics/OpenTelemetry/Windows-Security-Analytics-User-Authentication.png' style={{border: '1px solid black'}} alt="Windows-Security-Analytics-User-Authentication" />

### User Group Updates

The **Windows - Security Analytics - User Group Updates** dashboard provides security analytics on user group updates.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Windows-Cloud-Security-Monitoring-and-Analytics/OpenTelemetry/Windows-Security-Analytics-User-Group-Updates.png' style={{border: '1px solid black'}} alt="Windows-Security-Analytics-User-Group-Updates" />

### Windows Defender

The **Windows - Security Analytics - User Authentication** dashboard provides security analytics on Windows Defender events.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Windows-Cloud-Security-Monitoring-and-Analytics/OpenTelemetry/Windows-Security-Analytics-Windows-Defender.png' style={{border: '1px solid black'}} alt="Windows-Security-Analytics-Windows-Defender" />

### Windows Firewall

The **Windows - Security Analytics - Windows Firewall** dashboard provides security analytics on Windows Firewall events.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Windows-Cloud-Security-Monitoring-and-Analytics/OpenTelemetry/Windows-Security-Analytics-Windows-Firewall.png' style={{border: '1px solid black'}} alt="Windows-Security-Analytics-Windows-Firewall" />

### Windows Updates

The **Windows - Security Analytics - Windows Updates** dashboard provides security Windows Updates events.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Windows-Cloud-Security-Monitoring-and-Analytics/OpenTelemetry/Windows-Security-Analytics-Windows-Updates.png' style={{border: '1px solid black'}} alt="Windows-Security-Analytics-Windows-Updates" />

### Critical Events​

The **WWindows - Security Monitoring - Critical Events** dashboard provides analysis of critical security events related to services stopped, audit logs tampered, and logging ingestion delays.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Windows-Cloud-Security-Monitoring-and-Analytics/OpenTelemetry/Windows-Security-Monitoring-Critical-Events.png' style={{border: '1px solid black'}} alt="Windows-Security-Monitoring-Critical-Events" />

### Inventory​

The **Windows - Security Monitoring - Inventory** dashboard helps you to monitor windows events provided by computer, channel, and provider. This dashboard also provides additional information on computer reboots.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Windows-Cloud-Security-Monitoring-and-Analytics/OpenTelemetry/Windows-Security-Monitoring-Inventory.png' style={{border: '1px solid black'}} alt="Windows-Security-Monitoring-Inventory" />