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
    * [Remote File Source](/docs/send-data/installed-collectors/sources/Remote-File-Source)
    * [Syslog Source](/docs/send-data/installed-collectors/sources/Syslog-Source)


## Installing the PCI Compliance for Linux App

Now that you have set up collection, install the Sumo Logic App for PCI Compliance for Linux to use the preconfigured searches and [dashboards](#viewing-dashboards) that provide insight into your data.

To install the app:

Locate and install the app you need from the **App Catalog**. If you want to see a preview of the dashboards included with the app before installing, click **Preview Dashboards**.

1. From the **App Catalog**, search for and select the app**.**
2. Select the version of the service you're using and click **Add to Library**. Version selection is applicable only to a few apps currently. For more information, see the [Install the Apps from the Library.](/docs/get-started/apps-integrations#install-apps-from-the-library)
3. To install the app, complete the following fields.
    1. **App Name.** You can retain the existing name, or enter a name of your choice for the app. 
    2. **Data Source.** Select either of these options for the data source. 
        * Choose **Source Category**, and select a source category from the list. 
        * Choose **Enter a Custom Data Filter**, and enter a custom source category beginning with an underscore. Example: (`_sourceCategory=MyCategory`). 
    3. **Advanced**. Select the **Location in Library** (the default is the Personal folder in the library), or click **New Folder** to add a new folder.
4. Click **Add to Library**.

Once an app is installed, it will appear in your **Personal** folder, or other folder that you specified. From here, you can share it with your organization.

Panels will start to fill automatically. It's important to note that each panel slowly fills with data matching the time range query and received since the panel was created. Results won't immediately be available, but with a bit of time, you'll see full graphs and maps.


## Viewing PCI Compliance for Linux Dashboards

### Account, User, System Monitoring

**Dashboard description:** This dashboard meets PCI Requirements 02, 07, 08 and 10 by monitoring user accounts and services. It presents information about user accounts created and deleted, stopped services, running services active services over time, unique services running, and running services, and more.

**Use case:** Use this dashboard to monitor administrative actions (create, delete users) performed by end users, ensure proper services are running on all systems, detect attempts to change the system time, and verify that critical systems are up and running.You can also monitor excessive failed login attempts to detect attempts to break into the system.

<img src={useBaseUrl('img/integrations/pci-compliance/PCILinuxAccountUserSystem.png')} alt="PCI Compliance for Linux dashboards" />


### Login Activity

**Dashboard description: **This dashboard meets PCI Requirements 02 and 10 by tracking login activity. It provides information about failed and successful user logins, and failed and successful super-user logins.

**Use case:** Use this dashboard to monitor access to the cardholder data environment. You can monitor failed and successful user logins.

<img src={useBaseUrl('img/integrations/pci-compliance/PCIComplianceLinuxLoginActivity.png')} alt="PCI Compliance for Linux dashboards" />



### Privileged Activity

**Dashboard description: **This dashboard meets PCI Requirement 10. It provides information about total sudo attempts, failed sudo attempts, the top 10 users and hosts that have issued sudo attempts, recent sudo attempts, and sudo attempts over time.

**Use case:** Use this dashboard to monitor successful and failed access attempts to systems, especially with administrative privileges. It also helps monitor actions performed by users with administrative privileges.

<img src={useBaseUrl('img/integrations/pci-compliance/PCIComplianceLinuxpa.png')} alt="PCI Compliance for Linux dashboards" />
