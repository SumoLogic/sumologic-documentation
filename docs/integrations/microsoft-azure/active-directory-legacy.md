---
id: active-directory-legacy
title: Sumo Logic App for Active Directory Legacy
sidebar_label: Active Directory (Legacy)
description: Allows you to analyze Windows Active Directory logs and gain insight into your deployment.
---

The Active Directory Legacy App allows you to analyze Windows Active Directory logs and gain insight into your deployment. Using the app, you can identify user activity across your network and security administration systems. The app uses predefined searches and Dashboards that provide visibility into your environment for real-time analysis of overall usage.

We recommend using the Active Directory App in combination with the Windows App.

## Collecting Logs


## Installing the Sumo Logic App

Now that you have set up collection for Active Directory, install the Sumo Logic App for Active Directory Legacy to use the pre-configured searches and [dashboards](https://help.sumologic.com/07Sumo-Logic-Apps/04Microsoft-and-Azure/Active_Directory_Legacy/Active-Directory-Legacy-App-Dashboards#Dashboards) that provide visibility into your environment for real-time analysis of overall usage.

**To install the app:**

Locate and install the app you need from the **App Catalog**. If you want to see a preview of the dashboards included with the app before installing, click **Preview Dashboards**.

1. From the **App Catalog**, search for and select the app**.**
2. To install the app, click **Add to Library** and complete the following fields.
    1. **App Name.** You can retain the existing name, or enter a name of your choice for the app. 
    2. **Data Source.** Select **Enter a Custom Data Filter** and enter a filter that references the Windows Event Logs source and the script sources" (configured as described in [Collect Active Directory Log Files](https://help.sumologic.com/07Sumo-Logic-Apps/04Microsoft-and-Azure/Active_Directory_Legacy/Collect_Log_Files_for_the_Active_Directory_Legacy_App)).  For example:  \
`(_sourceCategory=OS/Windows OR _sourcecategory=*adscripts*)`.
    3. **Advanced**. Select the **Location in Library** (the default is the Personal folder in the library), or click **New Folder** to add a new folder.
    4. Click **Add to Library**.

Once an app is installed, it will appear in your **Personal** folder, or other folder that you specified. From here, you can share it with your organization. See [Welcome to the New Library](https://help.sumologic.com/01Start-Here/Welcome-to-the-New-Library) for information on working with the library in the new UI.

Panels will start to fill automatically. It's important to note that each panel slowly fills with data matching the time range query and received since the panel was created. Results won't immediately be available, but with a bit of time, you'll see full graphs and maps.

Sumo Logic recommends using the Sumo Logic App for Active Directory in combination with the [Sumo Logic App for Windows](https://help.sumologic.com/07Sumo-Logic-Apps/04Microsoft-and-Azure/Windows_Legacy).


## Viewing Active Directory Legacy Dashboards

The Sumo Logic application for Windows Active Directory (AD) includes several Dashboards that allow you instant access to information about your system's visitors, traffic, and web server operations.


### Information Dashboard

This Dashboard will not display data unless you have downloaded and deployed the scripts, as described in [Collecting Active Directory log files](https://help.sumologic.com/07Sumo-Logic-Apps/04Microsoft-and-Azure/Active_Directory_Legacy/Collect_Log_Files_for_the_Active_Directory_Legacy_App).


By default the time range for these panels is two hours. If your source only pulls in data every 12-24 hours, you may see a No Data Available error.  Adjust the time range for the panels in this dashboard to match your source.


**Topology.** Displays your deployment's topology listing the forests, sites, domain DNs, and netbiosnames that have been active for the past two hours in a table.

**Organizational Units per Domain.** Shows the distinct organizational units per domain in a bar chart for the past two hours.

**Groups per Domain.** Provides information on the distinct groups per domain in a bar chart for the past two hours.

**Computer OS per Domain.** Displays the computer operating systems used by visitors to your site per domain for the past two hours.


### Service Activity

**Top 10 Messages.** Displays the top 10 messages reported in your system with message text and count in a table for the past 24 hours.

**Rights Management.** Reports the events for rights assigned or removed in timeslices of one hour for the past 24 hours using a combination line chart.

**Messages Over Time by Category.** Provides details on the messages reported by your system by category in timeslices of one hour over the last 24 hours, displayed in a combination line chart.

**Logon/off Activity.** Displays details on remote and interactive logon and logoff activity in timeslices of one hour for the past 24 hours using a stacked column chart.

**Object Creation.** Reports on creation events for users, computers, groups, and objects in timeslices of one hour for the past 24 hours using a stacked column chart.

**Object Deletion.** Reports on deletion events for users, computers, groups, and objects in timeslices of one hour for the past 24 hours using a combination line chart.


### Service Failures

**Successes vs Failures.** Displays the number of messages generated by your system for success vs failure in timeslices of one hour over the past 24 hours, in a stacked column chart.

**Admin Activity by Category.** Shows the administrator activity by category and count for the past 24 hours in a table.

**Audit Failures Over Time.** Displays the type and number of failures in timeslices of one hour for the past 24 hours in a stacked column chart.

**All Failures by IP.** Provides the IP addresses where failures have occurred along with the number of failures over the last 24 hours in a table.
