---
id: linux-opentelemetry
title: Linux - Cloud Security Monitoring and Analytics - OpenTelemetry
dashboard: The Sumo Logic app for Linux Cloud Security Monitoring and Analytics - OpenTelemetry provides better understanding of your production environments, and surface relevant insights by tuning out-of-the-box content to align with your security team’s focus
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/cloud-security-monitoring-analytics/SecMon_Linux.png')} alt="Thumbnail icon" width="100"/>

Linux - Cloud Security Monitoring and Analytics - OpenTelemetry is a unified log app that ingests distribution of Linux data to Sumo Logic via OpenTelemetry [filelog receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/filelogreceiver). The app's preconfigured dashboards provide insight into user, service, systems, login, and privilege activity, providing a better understanding of your production environments and surface relevant insights by tuning out-of-the-box content to align with your security team's focus.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/PCI-Compliance-For-Linux/OpenTelemetry/Linux-Schematics.png' alt="Linux-Schematics" style={{border: '1px solid black'}} />

## Fields created in Sumo Logic for Linux - Security Analytics

The following tag will be created as part of Linux app installation, if not already present. 

- `sumo.datasource`. Has a fixed value of **linux**.

## Collection configuration and app installation

:::note
You can skip this section if you have already set up the logs collection through [Linux](/docs/integrations/hosts-operating-systems/opentelemetry/linux-opentelemetry/) or [Linux PCI](/docs/integrations/pci-compliance/opentelemetry/linux-opentelemetry) app installation. Additional collection is not required as the logs used by this app are already ingested into Sumo Logic.
:::

As part of data collection setup and app installation, you can select the **Linux - Cloud Security Monitoring and Analytics - OpenTelemetry** app from the **App Catalog** and click on **Install App**. Follow the steps below to configure the collection.

### Step 1: Set up Collector

{@import ../../../reuse/apps/opentelemetry/set-up-collector.md}

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/PCI-Compliance-For-Linux/OpenTelemetry/Linux-Collector.png' alt="Linux-Collector" style={{border: '1px solid black'}} />

### Step 2: Configure integration

In this step, you will configure the YAML required for Linux collection. The app requires path for system log file based on the Linux version used.

#### Required Logs for Ubuntu

The following logs, located in the `/var/log` folder, are required for using the Sumo Logic app for Cloud Security Monitoring and Analytics for Linux with Ubuntu.

- auth.log
- syslog
- daemon.log
- dpkg.log
- kern.log

#### Required Logs for CentOS, Amazon Linux, and Red Hat

The following logs, located in the `/var/log` folder, are required for using the Sumo Logic app for Cloud Security Monitoring and Analytics for Linux with CentOS, Amazon Linux, and Red Hat.

- audit/audit.log
- secure
- Messages
- yum.log 

Click on the **Download YAML File** button to get the YAML file.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/PCI-Compliance-For-Linux/OpenTelemetry/Linux-YAML.png' alt="Linux-YAML.png" style={{border: '1px solid black'}}/>

:::note
By default, the path for Linux log files required for all the distros are pre-populated in the UI. (Optional) Unwanted file paths can be removed from the list if the files are not available on your Linux distribution. The collection will work even if not all the files are present in your system.
:::

### Step 3: Send logs to Sumo Logic

{@import ../../../reuse/apps/opentelemetry/send-logs-intro.md}

1. Copy the YAML file to `/etc/otelcol-sumo/conf.d/` folder in the Linux instance which needs to be monitored.
2. Restart the collector using:
    ```sh
    sudo systemctl restart otelcol-sumo
    ```

{@import ../../../reuse/apps/opentelemetry/send-logs-outro.md}

## Sample log message

```
Dec 13 04:44:00 <1> [zypper++] Summary.cc(readPool):133 I_TsU(27372)Mesa-libGL1-8.0.4-20.4.1.i586(@System)
```

## Sample log query

```sql
sumo.datasource=linux deployment.environment=* host.group=* host.name=*
| parse regex "\S*\s+\d+\s+\d+:\d+:\d+\s+(?<dest_host>\S*)\s+(?<process>\w*)(?:\[\d+\]:|:)\s*(?<message>.+)$" nodrop
| if (isEmpty(dest_host), _sourceHost, dest_host) as dest_host
| parse regex "(?<service>\w*)\[\d+\]:\s+" 
| where !isEmpty(service)
| where dest_host matches "*"
| where process matches "*"
| count as eventCount, first(_messagetime) as latest, last(_messagetime) as earliest by service, dest_host 
| formatDate(fromMillis(latest),"MM/dd/yyyy HH:mm:ss Z") as %"LatestTime" 
| formatDate(fromMillis(earliest),"MM/dd/yyyy HH:mm:ss Z") as %"EarliestTime" 
| fields -latest, earliest, eventCount
| sort by %"LatestTime" 
```

## Viewing Linux - Cloud Security Monitoring and Analytics dashboards

{@import ../../../reuse/filter-dashboards.md}

### Overview

The **Linux - Security Analytics - Overview** dashboard provides an overview of security statistics relevant for Linux systems and presents information about successful and failed logins, root login successes and failures, user accounts created and deleted, sudo attempts, and total services.

Use this dashboard to:

- Monitor administrative actions (create, delete users) performed by end users.
- Ensure proper services are running on all systems.
- Detect attempts to change the system time.
- Verify the status of critical systems.
- Monitor excessive failed login attempts and detect total number of attempts to break into the system.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Linux-Cloud-Security-Monitoring-and-Analytics/Opentelemetry/Linux-Security-Monitoring-Overview.png' style={{border: '1px solid black'}} alt="Linux-Security-Monitoring-Overview" />

### Login Activity

The **Linux - Security Analytics - Login Activity** dashboard tracks the login activity and provides information about failed and successful user and root logins.

Use this dashboard to:
- Monitor access to the Linux computing environment.
- Monitor failed and successful user logins.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Linux-Cloud-Security-Monitoring-and-Analytics/Opentelemetry/Linux-Security-Analytics-Login-Activity.png' style={{border: '1px solid black'}} alt="Linux-Security-Analytics-Login-Activity" />

### Privileged Activity

The **Linux - Security Analytics - Privileged Activity** dashboard provides information about total sudo attempts, failed sudo attempts, top 10 users and hosts that have issued sudo attempts, recent sudo attempts, and sudo attempts over time.

Use this dashboard to:
- Monitor successful and failed access attempts to systemswith administrative privileges. 
- Monitor actions performed by users with administrative privileges.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Linux-Cloud-Security-Monitoring-and-Analytics/Opentelemetry/Linux-Security-Analytics-Privileged-Activity.png' style={{border: '1px solid black'}} alt="Linux-Security-Analytics-Privileged-Activity" />


### User, Service, and System Monitoring

The **Linux - Security Analytics - User, Service, and System Monitoring** dashboard provides information about total sudo attempts, failed sudo attempts, top 10 users and hosts that have issued sudo attempts, recent sudo attempts, and sudo attempts over time.

Use this dashboard to:
- Monitor accounts created and deleted. 
- Monitor service usage and other system activity.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Linux-Cloud-Security-Monitoring-and-Analytics/Opentelemetry/Linux-Security-Analytics-User-Service-and-System-Monitoring.png' style={{border: '1px solid black'}} alt="Linux-Security-Analytics-User-Service-and-System-Monitoring" />

