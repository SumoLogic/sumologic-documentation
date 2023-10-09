---
id: linux
title: PCI Compliance for Linux
dashboard: The Sumo Logic App for Payment Card Industry (PCI) Compliance for Linux offers dashboards to monitor systems, account and users activity to ensure that login activity and privileged users are within the expected ranges.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/pci-compliance/pci-logo.png')} alt="Thumbnail icon" width="90"/>

This guide helps you set up Sumo Logic Collectors, install the PCI Compliance for Linux App, and create dashboards from samples so you can begin monitoring your usage and determine if you are meeting Compliance benchmarks.


## Collect Logs for PCI Compliance for Linux

The PCI Compliance for Linux App works with your existing Linux logs to identify any compliance issues.

To collect Linux logs, you'll need:

* An [Installed Collector](/docs/send-data/installed-collectors). Choose the one right for your host environment.
* A Linux [Source](/docs/send-data/installed-collectors/sources), depending on your environment.
    * [Local File Source](/docs/send-data/installed-collectors/sources/local-file-source)
    * [Remote File Source](/docs/send-data/installed-collectors/sources/remote-file-source)
    * [Syslog Source](/docs/send-data/installed-collectors/sources/syslog-source)

### Required Logs for Ubuntu

The following logs, located in your Linux machine's `/var/log` folder, are required for using the Sumo Logic app for Linux with Ubuntu:
* auth.log
* syslog
* daemon.log
* dpkg.log
* kern.log

### Required Logs for CentOS, Amazon Linux, and Red Hat

The following logs, located in your Linux machine's `/var/log` folder, are required for using the Sumo Logic app for Linux with CentOS, Amazon Linux, and most Red Hat forks:
* audit/audit.log
* secure
* messages
* yum.log


## Installing the PCI Compliance for Linux App

Now that you have set up collection, install the Sumo Logic App for PCI Compliance for Linux to use the preconfigured searches and dashboards that provide insight into your data.

{@import ../../reuse/apps/app-install.md}

## Viewing PCI Compliance for Linux Dashboards

### Account, User, System Monitoring

**Dashboard description:** This dashboard meets PCI Requirements 02, 07, 08 and 10 by monitoring user accounts and services. It presents information about user accounts created and deleted, stopped services, running services active services over time, unique services running, and running services, and more.

**Use case.** Use this dashboard to monitor administrative actions (create, delete users) performed by end users, ensure proper services are running on all systems, detect attempts to change the system time, and verify that critical systems are up and running.You can also monitor excessive failed login attempts to detect attempts to break into the system.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/PCI-Compliance-For-Linux/PCI-Compliance-For-Linux-PCI-Req-02-07-08-10-Account-User-System-Monitoring.png')} alt="PCI Compliance for Linux dashboards" />

### Login Activity

**Dashboard description: **This dashboard meets PCI Requirements 02 and 10 by tracking login activity. It provides information about failed and successful user logins, and failed and successful super-user logins.

**Use case:** Use this dashboard to monitor access to the cardholder data environment. You can monitor failed and successful user logins.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/PCI-Compliance-For-Linux/PCI-Compliance-For-Linux-PCI-Req-02-10-Login-Activity.png')} alt="PCI Compliance for Linux dashboards" />


### Privileged Activity

**Dashboard description: **This dashboard meets PCI Requirement 10. It provides information about total sudo attempts, failed sudo attempts, the top 10 users and hosts that have issued sudo attempts, recent sudo attempts, and sudo attempts over time.

**Use case.** Use this dashboard to monitor successful and failed access attempts to systems, especially with administrative privileges. It also helps you to monitor actions performed by users with administrative privileges.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/PCI-Compliance-For-Linux/PCI-Compliance-For-Linux-PCI-Req-10-Privileged-Activity.png')} alt="PCI Compliance for Linux dashboards" />
