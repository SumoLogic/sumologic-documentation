---
id: linux-opentelemetry
title: PCI Compliance for Linux - OpenTelemetry
dashboard: The Sumo Logic app for Payment Card Industry (PCI) Compliance for Linux - OpenTelemetry offers dashboards to monitor systems, account and users activity to ensure that login activity and privileged users are within the expected ranges.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/pci-compliance/pci-logo.png')} alt="Thumbnail icon" width="90"/>

The PCI Compliance for Linux - OpenTelemetry is a unified log app that sends Linux log data to Sumo Logic via OpenTelemetry [filelog receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/filelogreceiver). The app's preconfigured dashboards help you to monitor system, account, and user activity to ensure that login activity and privileged users are within the expected ranges.

:::info
The PCI Compliance for Linux app covers PCI requirements 02, 07, 08, and 10.
:::

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/PCI-Compliance-For-Linux/OpenTelemetry/Linux-Schematics.png' alt="Linux-Schematics" style={{border: '1px solid black'}} />

## Fields created in Sumo Logic for Linux PCI Compliance

Following tag will be created as part of Linux app installation, if not already present. 

- `sumo.datasource`. Has a fixed value of **linux**.

## Collection configuration and app installation

:::note
You can skip this section if you have already set up the logs collection through [Linux](/docs/integrations/hosts-operating-systems/opentelemetry/linux-opentelemetry/) or [Linux - Cloud Security Monitoring and Analytics](/docs/integrations/cloud-security-monitoring-analytics/opentelemetry/linux-opentelemetry) app installation. Additional collection is not required as the logs used by this app are already ingested into Sumo Logic.
:::

{@import ../../../reuse/apps/opentelemetry/config-app-install.md}

### Step 1: Set up Collector

{@import ../../../reuse/apps/opentelemetry/set-up-collector.md}

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/PCI-Compliance-For-Linux/OpenTelemetry/Linux-Collector.png' alt="Linux-Collector" style={{border: '1px solid black'}} />

### Step 2: Configure integration

In this step, you will configure the yaml required for Linux Collection. The app requires path for system log file based on the Linux version used.

#### Required Logs for Ubuntu

The following logs, located in the `/var/log` folder, are required for using the Sumo Logic app for PCI compliance for Linux with Ubuntu.

- auth.log
- syslog
- daemon.log
- dpkg.log
- kern.log

#### Required Logs for CentOS, Amazon Linux, and Red Hat

The following logs, located in the `/var/log` folder, are required for using the Sumo Logic app for PCI compliance for Linux with CentOS, Amazon Linux, and Red Hat.

- audit/audit.log
- secure
- Messages
- yum.log 

Click on the **Download YAML File** button to get the yaml file.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/PCI-Compliance-For-Linux/OpenTelemetry/Linux-YAML.png' alt="Linux-YAML.png" style={{border: '1px solid black'}}/>

:::note
By default, the path for Linux log files required for all the distros are pre-populated in the UI. (Optional) Unwanted file paths can be removed from the list if the files are not available on your Linux distribution. The collection will work even if not all the files are present in your system.
:::

### Step 3: Send logs to Sumo Logic

{@import ../../../reuse/apps/opentelemetry/send-logs-intro.md}

1.  Copy the YAML file to `/etc/otelcol-sumo/conf.d/` folder in the Linux instance which needs to be monitored.
2.  Restart the collector using:
    ```sh
    sudo systemctl restart otelcol-sumo
    ```

{@import ../../../reuse/apps/opentelemetry/send-logs-outro.md}

## Sample log message

```
Jun 28 07:46:03 bruno-supercomputer useradd[1602]: new account added - account=root1, uid=1002, gid=100, home=/home/root1, shell=/bin/bash, by=0
```

## Sample log query

```sql
sumo.datasource=linux deployment.environment=* host.group=* host.name=* "useradd" and ("new user" or "new account")
| parse regex "\S*\s+\d+\s+\d+:\d+:\d+\s+(?<_sourceHost>\S+)\s+\w*" nodrop
| parse regex "\S*\s+\d+\s+\d+:\d+:\d+\s+(?<dest_host>\S*)\s+(?<process>\w*)(?:\[\d+\]:|:)\s*(?<msg>.+)$" nodrop
| parse field=msg "name=*, UID=" as dest_user nodrop
| parse field=msg "name=*, UID=*, GID=*, home=*, shell=*" as dest_user, UID, GID, home, shell nodrop
| parse field=msg ", shell=*\"" as shell nodrop
| parse field=msg "account=*, uid=*, gid=*, home=*, shell=*" as dest_user, UID, GID, home, shell nodrop
| parse field=msg "account=*, uid=" as dest_user nodrop
| "Local Server" as type | _sourceHost as dest_ip
| timeslice 15m
|where if ("{{dest_host}}" = "*", true, dest_host matches "{{dest_host}}") AND if ("{{dest_user}}" = "*", true, dest_user matches "{{dest_user}}") AND if ("{{process}}" = "*", true, process matches "{{process}}")
|count as eventCount by _timeslice, dest_host, dest_user, process, UID, GID, home, shell, type
| fields -eventCount
| sort by _timeslice
```

## Viewing PCI Compliance for Linux dashboards

{@import ../../../reuse/filter-dashboards.md}

### Account, User, System Monitoring

The **PCI Compliance for Linux - PCI Requirements 02, 07, 08, 10 - Account, User, System Monitoring** dashboard meets PCI Requirements 02, 07, 08 and 10 by monitoring user accounts and services. This dashboard provides information about user accounts created and deleted, stopped services, running services, and active services over time.

Use this dashboard to:

- Monitor administrative actions (create and delete users) performed by end users.
- Ensure proper services are running on all systems.
- Detect attempts to change the system time.
- Verify the status of critical systems.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/PCI-Compliance-For-Linux/OpenTelemetry/PCI-Compliance-Req-02-07%2C08%2C10.png')} alt="PCI Compliance for Linux dashboards" style={{border: '1px solid black'}}/>

### Login Activity

The **PCI Compliance for Linux - PCI Requirements 02, 10 - Login Activity** dashboard meets PCI Requirements 02 and 10 by tracking login activity. This dashboard provides information about failed and successful logins of users and super-user.

Use this dashboard to:

- Monitor access to the cardholder data environment.
- Monitor failed and successful user logins.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/PCI-Compliance-For-Linux/OpenTelemetry/PCI-Compliance-Req-02-10.png')} alt="PCI Compliance for Linux dashboards" style={{border: '1px solid black'}}/>


### Privileged Activity

The **PCI Compliance for Linux - PCI Requirements 10 - Privileged Activity** dashboard meets PCI Requirement 10. This dashboard provides information about total sudo attempts, failed sudo attempts, top 10 users and hosts that have issued sudo attempts, recent sudo attempts, and sudo attempts over time.

Use this dashboard to:
- Monitor successful and failed access attempts to systems with administrative privileges. 
- Monitor actions performed by users with administrative privileges.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/PCI-Compliance-For-Linux/OpenTelemetry/PCI-Compliance-Req-10.png')} alt="PCI Compliance for Linux dashboards" style={{border: '1px solid black'}}/>
