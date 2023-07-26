---
id: active-directory-legacy
title: Active Directory Legacy
sidebar_label: Active Directory (Legacy)
description: Allows you to analyze Windows Active Directory logs and gain insight into your deployment.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/microsoft-azure/windows.png')} alt="Thumbnail icon" width="40"/>

The Sumo Logic app for Active Directory Legacy (2008+) allows you to analyze Windows Active Directory logs and gain insight into your deployment. Using the app, you can identify user activity across your network and security administration systems. The app uses predefined searches and Dashboards that provide visibility into your environment for real-time analysis of overall usage.

We recommend using the Active Directory App in combination with the Windows App.

## Log Types

Active Directory diagnostic log files are described in more detail in [Microsoft help](https://docs.microsoft.com/en-us/previous-versions/windows/it-pro/windows-2000-server/cc961809(v=technet.10)).


### Sample Log Messages

```json title="Domain Controller"
DomainController DName=="DC=local" DomainName=="local" Forest=="local" NetBIOSName=="LOCAL" ControllerHostName=="HOST1DC01.local" IP=="102.240.30.12" Site=="DC1"
```


```json title="AD Domain"
UserMembership SearchBase=="DC=local" DistinguishedName=="NN=Service My-Service,OU=DC=local" Name=="My-Service" ObjectGUID=="c1234249-6401-40e7-18a8-289fbb2faf26" Parent=="DC=local"
```


```js title="Windows Event"
instance of Win32_NTLogEvent
{
    Computer = "HOSTDC01";
    EventCode = 4634;
    EventIdentifier = 4634;
    Logfile = "Security";
    RecordNumber = 184879601;
    SourceName = "Microsoft-Windows-Security-Auditing";
    TimeGenerated = "20170213222816.000000-000";
    TimeWritten = "20170213222816.000000-000";
    Type = "Audit Success";
    EventType = 4;
    Category = 12545;
    CategoryString = "Logoff";
    Message = "An account was logged off.

Subject:
    Security ID:        HOST1DC01$ (S-1-5-21-3123024953-243645673-3382258605-1103)
    Account Name:        HOST1DC01$
    Account Domain:        Local
    Logon ID:        0x6C367A5

Logon Type:            3

This event is generated when a logon session is destroyed. It may be positively correlated with a logon event using the Logon ID value. Logon IDs are only unique between reboots on the same computer.";
    InsertionStrings = {"S-1-5-21-3123024953-2436456723-3382258605-1103", "HOST1DC01$", "HOSTING", "0x6c488a5", "3"};
};
```


## Sample Query

```sql title="Directory Service Object Changes (from Active Directory App)"
_sourceCategory=delete_test _sourceName=Security "Directory Service Changes"
| parse "EventCode = *;" as event_id nodrop | parse "Computer = \"*\";" as host nodrop | parse "ComputerName = \"*\";" as host nodrop | parse regex "Message = \"(?<msg_summary>[^\r]+?)\r" nodrop | parse "CategoryString = \"*\";" as CategoryString nodrop | parse regex "Subcategory:\s+(?<subcategory>[^\r]+?)\r" nodrop
| parse regex "Logfile = \"Security\";[\s\S]+?Account Name:\s+(?<src_user>[^\r]+?)\r[\s\S]+?Account Domain:\s+(?<src_domain>[^\r]+?)\r" nodrop
| parse regex "Logfile = \"Security\";[\s\S]+?Account Name:\s+(?<src_user>[^\r]+?)\r[\s\S]+?Account Domain:\s+(?<src_domain>[^\r]+?)\r[\s\S]+?Account Name:\s+(?<dest_user>[^\r]+?)\r[\s\S]+?Account Domain:\s+(?<dest_domain>[^\r]+?)(?:\r|\";)" nodrop
| parse regex "Directory Service:[\s\S]+?Name:\s+(?<directory_ServiceName>[^\r]+?)\r" nodrop | parse regex "Directory Service:[\s\S]+?Type:\s+(?<directory_ServiceType>[^\r]+?)\r" nodrop | parse "Object:\r\n\tDN:\t*\r\n\tGUID" as dest_ou nodrop
| fields msg_summary, categoryString, subcategory, event_id, src_user, src_domain, dest_user, dest_domain, host
| where categoryString="Directory Service Changes" or subcategory="Directory Service Changes"
```


## Collecting Log Files for the Active Directory Legacy App

Windows Active Directory (AD) is a directory service developed by Microsoft that stores information about various objects on a network.

The Active Directory Legacy App analyzes, then graphically displays this information to users and network administrators, including information about domain controllers, forest, site, users, groups, computers and organizational units. Sumo Logic allows you to augment or couple regular Windows Events with this data to get more contextual insights from the logs. For example, by augmenting the events based on the domain name, you can build searches specific to a particular AD site or track activities to users under a specific Organizational Unit.

### Prerequisites

To begin collecting Active Directory logs, first:

* A. Verify the Active Directory module
* B. Download and deploy Sumo Logic scripts


### A. Verify Active Directory module

Before proceeding, verify that the Active Directory module is available. The Active Directory module is supported on Windows 7 and Windows 2008 Server (R2 and later) if Remote Server Administration Tools (RSAT) are installed. You'll find more information at [Microsoft TechNet](https://technet.microsoft.com/en-us/library/dd378937(WS.10).aspx).

**To verify that Active Directory Module is available**

1. Choose **Start > Administrative Tools**.
2. Look for **Active Directory Module for Windows PowerShell**.
3. If the module isn't installed, install RSAT as described on [Microsoft TechNet](https://technet.microsoft.com/en-us/library/cc730825.aspx).


### B. Download and deploy Sumo scripts

In order to collect files, download the following scripts:

* <a href="https://help.sumologic.com/files/adQueryDS.ps1" target="_blank">adQueryDS.ps1</a>: Core functions that are leveraged by the other scripts
* <a href="https://help.sumologic.com/files/adObjectCollector.ps1" target="_blank">adObjectCollector</a>: Active Directory object collector
* <a href="https://help.sumologic.com/files/domainCollector.ps1" target="_blank">domainCollector</a>: Active Directory domain collector


These scripts should be deployed on a machine that is part of the domain where the log files exist. After deploying the scripts, you'll need to configure a script source on Sumo Logic for **domainCollector.ps1** and another script source for **adObjectCollector.ps1**.

To deploy the scripts, do the following:

1. Download the scripts to a folder, for example `C:\PSScripts`.
2. Edit the scripts so that `SCRIPTPATH` matches the path to the folder.

Testing the scripts is optional, but recommended.

To manually test the scripts, do the following:

1. Open a command line interface.
2. Run `domainCollector` and `adObjectCollector`, using the path where the scripts were installed.

```sh
powershell.exe -ExecutionPolicy Bypass -InputFormat None -File c:\PSScripts\domainCollector.ps1
powershell.exe -ExecutionPolicy Bypass -InputFormat None -File c:\PSScripts\adObjectCollector.ps1
```


If the setup was successful, Active Directory domain and object information will be collected and the scripts will print results to the screen:


## Step 1: Configure a collector

Configure an [Installed Collector](/docs/send-data/installed-collectors).

Make sure the collector is installed on a machine that belongs to the domain managed by Active Directory. You can install a single collector and use a remote source, but Sumo Logic recommends installing a collector on each of your domain controllers for performance.


## Step 2: Configure event log sources

If you have installed collectors on each domain controller, as recommended, configure a [Local Windows Event Log Source](/docs/send-data/installed-collectors/sources/local-windows-event-log-source) on each one. Otherwise, configure a [Remote Windows Event Log Source](/docs/send-data/installed-collectors/sources/remote-windows-event-log-source) to collect events from each Active Directory server. For these Windows Event sources, set the source category to **OS/Windows** and **Event Format** as **Collect using legacy format**.



**Collect using legacy format.** Events retain their default text format from Windows.


## Step 3: Configure Script Sources

Perform the configuration described below twice, to set up one script source for `adObjectCollector.ps1` and one for `domainCollector.ps1`.

If your Domain Controllers are in the same domain, then you can just run the scripts on a select one or a few of the Domain Controller machines. Because each Domain Controller may have or allow different data, you will need to select the best ones. The adObjectCollector.ps1 script is the heaviest. There is no reason to pull your AD objects multiple times.

To configure a script source, do the following:

1. In Sumo Logic, select** Manage Data > Collection > Collection**.
2. Find the name of the installed collector to which you'd like to add a Source. Click **Add...** then choose** Add Source **from the pop-up menu.
3. Select **Script** for the Source type. Collectors using version 19.245-4 and later do not allow Script Sources to run by default. To allow Script Sources you need to set the Collector parameter `enableScriptSource` in [user.properties](/docs/send-data/installed-collectors/collector-installation-reference/user-properties) to true and [restart](/docs/send-data/collection/start-stop-collector-using-scripts.md) the Collector.
4. **Name**. Enter **DomainCollector** or **ADObjects**, depending on which script you are configuring. Description is optional.
5. **Source Host** (optional). Enter the hostname or the IP address of the machine. The hostname is stored in a searchable field called `_sourceHost`. The hostname can be a maximum of 128 characters.
6. **Source Category**. Enter a Source Category following the [Best Practices](/docs/send-data/best-practices) that allows you to include both the logs from these scripts and the logs from your Windows Event logs from the Domain Controller(s). For example, `DC/Windows/adObjects`, `DC/Windows/domainCollector`, and `DC/Windows/Event`. This will allow you to specify a query like `sourceCategory=DC/Windows/*` to bring in all AD-related logs.
7. **Frequency.** Select a short time for testing (for example, every 5 minutes), then change it to a longer interval once you confirm it’s working.


The **Frequency** option should be set according to your environment. We use a short interval in our example and testing, but in your deployment, the proper **Frequency** value depends on how often your topology changes. It's important that the **Frequency** be set to a time longer than it takes for the script to run. For example, if a script takes two hours to finish, the **Frequency** should be set to **Every 3 Hours**. If the topology is relatively stable, the **Frequency** can be set to a longer value, such as **Every 12 hours** (it is recommended that each script run at least once every day).


1. If you'd like to set a timeout for your script, select **Specify a timeout for your command**. If you don't need a timeout, or if you're running a script once daily, we recommend that you leave this option deselected.
2. **Command**. Select **PowerShell Script.**
3. **Script.** Do one of the following:
    * If you have the script saved to a file location and you do not have restrictions on running scripts, choose **Type a path to the script to execute** and enter the path to the script. For example, `c:\PSScripts\adObjectCollector.ps1` or  `c:\PSScripts\domainCollector.ps1`. (The script path you enter will depend on which script source you are currently configuring.)
    * If you have restrictions for running scripts, then select **Type the script the execute**. Enter the command executed during testing on your system. The command will be specific to the script you’re configuring:
    ```
    powershell.exe -ExecutionPolicy Bypass -InputFormat None -File c:\PSScripts\adObjectCollector.ps1
    powershell.exe -ExecutionPolicy Bypass -InputFormat None -File c:\PSScripts\domainCollector.ps1
    ```
4. **Working Directory**: Enter the path where your scripts are located.
5. Click the icon next to **Processing Rules** to expand the dialog.
6. Click **Add Rule**.
7. **Name**. Enter a name for the processing rule (for example, domainCollector).
8. **Filter**. Enter the following filters to exclude command outputs from being logged.
`.*domainCollector\.ps1.* \
.*adObjectCollector\.ps1.* \
.*adQueryDS\.ps1.*`
9. **Type**: Select **Exclude messages that match**.
10. Click **Save** to create the source.



## Installing the Sumo Logic App

Now that you have set up collection for Active Directory, install the Sumo Logic App for Active Directory Legacy to use the pre-configured searches and dashboards that provide visibility into your environment for real-time analysis of overall usage.

To install the app:

Locate and install the app you need from the **App Catalog**. If you want to see a preview of the dashboards included with the app before installing, click **Preview Dashboards**.

1. From the **App Catalog**, search for and select the app.
2. To install the app, click **Add to Library** and complete the following fields.
    * **App Name.** You can retain the existing name, or enter a name of your choice for the app. 
    * **Data Source.** Select **Enter a Custom Data Filter** and enter a filter that references the Windows Event Logs source and the script sources" (configured as described in [Collect Active Directory Log Files](/docs/integrations/microsoft-azure/active-directory-legacy#Collect_Log_Files_for_the_Active_Directory_Legacy_App)). For example: `(_sourceCategory=OS/Windows OR _sourcecategory=*adscripts*)`.
    * **Advanced**. Select the **Location in Library** (the default is the Personal folder in the library), or click **New Folder** to add a new folder.
3. Click **Add to Library**.

Once an app is installed, it will appear in your **Personal** folder, or other folder that you specified. From here, you can share it with your organization. See [Welcome to the New Library](/docs/get-started/library) for information on working with the library in the new UI.

Panels will start to fill automatically. It's important to note that each panel slowly fills with data matching the time range query and received since the panel was created. Results won't immediately be available, but with a bit of time, you'll see full graphs and maps.

Sumo Logic recommends using the Sumo Logic App for Active Directory in combination with the [Sumo Logic App for Windows](/docs/integrations/microsoft-azure/windows-legacy).


## Viewing Active Directory Legacy Dashboards

The Sumo Logic application for Windows Active Directory (AD) includes several Dashboards that allow you instant access to information about your system's visitors, traffic, and web server operations.


### Information Dashboard

This Dashboard will not display data unless you have downloaded and deployed the scripts, as described in [Collecting Active Directory log files](/docs/integrations/microsoft-azure/active-directory-legacy#Collect_Log_Files_for_the_Active_Directory_Legacy_App).


By default the time range for these panels is two hours. If your source only pulls in data every 12-24 hours, you may see a No Data Available error.  Adjust the time range for the panels in this dashboard to match your source.

**Topology.** Displays your deployment's topology listing the forests, sites, domain DNs, and netbiosnames that have been active for the past two hours in a table.

**Organizational Units per Domain.** Shows the distinct organizational units per domain in a bar chart for the past two hours.

**Groups per Domain.** Provides information on the distinct groups per domain in a bar chart for the past two hours.

**Computer OS per Domain.** Displays the computer operating systems used by visitors to your site per domain for the past two hours.

<img src={useBaseUrl('img/integrations/microsoft-azure/ad_app_information_new.png')} alt="Active Directory Legacy dashboards" width="500"/>


### Service Activity

<img src={useBaseUrl('img/integrations/microsoft-azure/ad_app_service_activity_new.png')} alt="Active Directory Legacy dashboards" width="500"/>

**Top 10 Messages.** Displays the top 10 messages reported in your system with message text and count in a table for the past 24 hours.

**Rights Management.** Reports the events for rights assigned or removed in timeslices of one hour for the past 24 hours using a combination line chart.

**Messages Over Time by Category.** Provides details on the messages reported by your system by category in timeslices of one hour over the last 24 hours, displayed in a combination line chart.

**Logon/off Activity.** Displays details on remote and interactive logon and logoff activity in timeslices of one hour for the past 24 hours using a stacked column chart.

**Object Creation.** Reports on creation events for users, computers, groups, and objects in timeslices of one hour for the past 24 hours using a stacked column chart.

**Object Deletion.** Reports on deletion events for users, computers, groups, and objects in timeslices of one hour for the past 24 hours using a combination line chart.


### Service Failures

<img src={useBaseUrl('img/integrations/microsoft-azure/ad_app_service_failures.png')} alt="Active Directory Legacy dashboards" width="500" />

**Successes vs Failures.** Displays the number of messages generated by your system for success vs failure in timeslices of one hour over the past 24 hours, in a stacked column chart.

**Admin Activity by Category.** Shows the administrator activity by category and count for the past 24 hours in a table.

**Audit Failures Over Time.** Displays the type and number of failures in timeslices of one hour for the past 24 hours in a stacked column chart.

**All Failures by IP.** Provides the IP addresses where failures have occurred along with the number of failures over the last 24 hours in a table.
