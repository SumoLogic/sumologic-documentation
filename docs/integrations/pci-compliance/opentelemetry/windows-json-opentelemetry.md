---
id: windows-json-opentelemetry
title: PCI Compliance for Windows JSON - OpenTelemetry
dashboard: The Sumo Logic App for Payment Card Industry (PCI) Compliance for Windows offers dashboards to monitor systems, account and users activity to ensure that login activity and privileged users are within the expected ranges.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/pci-compliance/pci-logo.png')} alt="Thumbnail icon" width="90"/>

The PCI Compliance for Windows JSON - OpenTelemetry is a log app that sends Windows log data to Sumo Logic via OpenTelemetry [windows event log receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/windowseventlogreceiver#readme). The app's preconfigured dashboards help you to monitor system, account, and user activity to ensure that login activity and privileged users are within the expected ranges.

:::info
The PCI Compliance for Windows JSON app covers PCI requirements 02, 06, 08, and 10.
:::

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/PCI-Compliance-For-Windows-JSON/OpenTelemetry/PCI-WIndows-JSON-Schematics.png' alt="PCI-Windows-JSON-Schematics" style={{border: '1px solid black'}} />

## Fields created in Sumo Logic for PCI Compliance Windows JSON App

Following tag will be created as part of Linux app installation, if not already present. 

- `sumo.datasource`: has the fixed value of **windows**.
- `host.group`: user configured tag which signifies a group of hosts for the operating system.
- `deployment.environment`: user configured tag which identifies the environment where the windows system resides. For example: dev, prod or qa.

## Log Types

The Windows App assumes events are coming from Windows Event Log receiver in JSON format. It does not work with third party logs.

Standard Windows event channels include:

- Security
- System

## Collection Configuration and App installation

:::note
You can skip this section if you have already set up the logs collection through [Windows](/docs/integrations/hosts-operating-systems/opentelemetry/windows-opentelemetry/). Additional collection is not required as the logs used by this app are already ingested into Sumo Logic.
:::

As part of data collection setup and app installation, you can select the App from App Catalog and click on Install App. Follow the steps below.

### Step 1: Set up Collector

:::note
If you want to use an existing OpenTelemetry Collector, you can skip this step by selecting the Use an existing Collector option.
:::

To create a new Collector:

- Select the Add a new Collector option.
- Select the platform where you want to install the Sumo Logic OpenTelemetry Collector.

This will generate a command that you can execute in the machine environment you need to monitor. Once executed, it will install the Sumo Logic OpenTelemetry Collector.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/PCI-Compliance-For-Windows-JSON/OpenTelemetry/PCI-Windows-Collector.png" />

### Step 2: Configure integration

In this step, you will configure the yaml file required for Windows event logs collection.

Any custom fields can be tagged along with the data in this step.

Once the details are filled in, click on the **Download YAML File** button to get the yaml file.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/PCI-Compliance-For-Windows-JSON/OpenTelemetry/PCI-Windows-YAML.png' alt="YAML" />


### Step 3: Send logs to Sumo

{@import ../../../reuse/apps/opentelemetry/send-logs-intro.md}

1. Copy the yaml file to `C:\ProgramData\Sumo Logic\OpenTelemetry Collector\config\conf.d` folder in the machine which needs to be monitored.
2. Restart the collector using:
  ```sh
  Restart-Service -Name OtelcolSumo
  ```

{@import ../../../reuse/apps/opentelemetry/send-logs-outro.md}

## Sample Queries

This sample log query is from the **Windows - PCI Req 02, 08, 10 - Account, User, System Monitoring** dashboard > **User Account Created** panel.

```sql title="Log Query String"
sumo.datasource=windows deployment.environment={{deployment.environment}} host.group={{host.group}} "\"channel\":\"Security\"" 4720
| json "event_id.id", "computer", "message", "event_data.SubjectUserName",  "event_data.SubjectDomainName", "event_data.TargetUserName", "event_data.TargetDomainName" as event_id, host, msg_summary, src_user, src_domain, dest_user, dest_domain nodrop
| if(isBlank(src_user), "Unknown", src_user) as src_user
| if(isBlank(src_domain), "Unknown", src_domain) as src_domain
| if(isBlank(dest_user), "Unknown", dest_user) as dest_user
| if(isBlank(dest_domain), "Unknown", dest_domain) as dest_domain
| where event_id = "4720" and host matches "{{host.name}}" and _collector matches "{{collector}}" and _sourceHost matches "{{sourcehost}}" and src_user matches "{{src_user}}" and src_domain matches "{{src_domain}}" and dest_user matches "{{dest_user}}" and dest_domain matches "{{dest_domain}}"
| fields host, dest_user, dest_domain, src_user, src_domain, event_id, msg_summary
| timeslice 1s
| count as event_count by _timeslice, host, dest_user, dest_domain, src_user, src_domain, event_id, msg_summary
| sort by _timeslice
```


## Sample Logs

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

## Viewing Windows Event Log-Based Dashboards

### Windows - PCI Req 02, 08, 10 - Account, User, System Monitoring

Track your user accounts and recent system changes.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/PCI-Compliance-For-Windows-JSON/OpenTelemetry/Windows-PCI-Req-02%2C08%2C10-Account%2CUser%2CSystem-Monitoring.png' alt="Windows - PCI Req 02, 08, 10 - Account, User, System Monitoring" />

### Windows - PCI Req 02, 10 - Login Activity

Track login successes and failures.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/PCI-Compliance-For-Windows-JSON/OpenTelemetry/Windows-PCI-Req-02%2C10-Login-Activity.png' alt="Windows - PCI Req 02, 10 - Login Activity" />

### Windows - PCI Req 08 - Other User Activity

Track user activities such as password changes, password resets, excessive failed access attempts, unlocked accounts, and changed accounts.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/PCI-Compliance-For-Windows-JSON/OpenTelemetry/Windows-PCI-Req-06-Windows-Updates-Activity.png' alt="Windows - PCI Req 08 - Other User Activity" />

### Windows - PCI Req 06 - Windows Updates Activity

Track your Windows Update activities.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/PCI-Compliance-For-Windows-JSON/OpenTelemetry/Windows-PCI-Req-06-Windows-Updates-Activity.png' alt="Windows - PCI Req 06 - Windows Updates Activity" />
