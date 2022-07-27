---
id: keeper-security
title: Keeper Security
sidebar_label: Keeper Security
description: Keeper is the leading secure password manager and digital vault for businesses and individuals. The Keeper Security App for Sumo Logic helps you monitor admin actions, user activities and security risks.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/security-threat-detection/keeper.png')} alt="thumbnail icon" width="75"/>

This application has been developed and is supported by [Keeper Security](https://keepersecurity.com/). For more information about Keeper, visit [https://keepersecurity.com](https://keepersecurity.com/) or email **business.support@keepersecurity.com** for help.

Keeper is the leading secure password manager and digital vault for businesses and individuals. The Keeper Security App for Sumo Logic helps you monitor admin actions, user activities and security risks. The App consists of dashboards and queries that allow you to monitor events logged by Keeper to Sumo Logic.


#### Log Types
2


The Keeper Security App uses Keeper Audit logs in JSON format pushed to Sumo HTTP Log Source by Keeper. For a description of the information available in the logs see [Keeper Audit Event List](https://docs.keeper.io/enterprise-guide/event-reporting#event-list).


## Collect Logs for Keeper Security

3
This application has been developed and is supported by [Keeper Security](https://keepersecurity.com/). For more information about Keeper please visit [https://keepersecurity.com](https://keepersecurity.com/) or email **business.support@keepersecurity.com** for help.

This page provides instructions for collecting logs for the Keeper Security App for Sumo Logic.


### Log Types
4


The Keeper App uses Keeper Audit logs in JSON format pushed to Sumo HTTP Log Source by Keeper. For a description of the information available in the logs see [Keeper Audit Event List](https://docs.keeper.io/enterprise-guide/event-reporting#event-list).


### Configure collection for Keeper Security
5


This section describes how to configure log collection for use with the Keeper Security App. Configuring log collection from Keeper Security and sending them to Sumo Logic follows this process:

1. [Configure a collector](https://help.sumologic.com/07Sumo-Logic-Apps/22Security_and_Threat_Detection/Keeper_Security/Collect_Logs_for_Keeper_Security#Step1:_Configure_a_collector).
2. [Configure an HTTP source](https://help.sumologic.com/07Sumo-Logic-Apps/22Security_and_Threat_Detection/Keeper_Security/Collect_Logs_for_Keeper_Security#Step_2:_Configure_an_HTTP_source).
3. [Send Keeper logs to Sumo Logic](https://help.sumologic.com/07Sumo-Logic-Apps/22Security_and_Threat_Detection/Keeper_Security/Collect_Logs_for_Keeper_Security#Step_3:_Send_Keeper_logs_to_Sumo_Logic).
4. [Verify logging](https://help.sumologic.com/07Sumo-Logic-Apps/22Security_and_Threat_Detection/Keeper_Security/Collect_Logs_for_Keeper_Security#Step_4:_Verify_logging).


#### Step 1: Configure a collector
6


To configure a collector for Keeper Security, follow the instructions in the [Hosted Collector](https://help.sumologic.com/03Send-Data/Hosted-Collectors/Configure-a-Hosted-Collector) document.


#### Step 2: Configure an HTTP source
7


You can configure sources for collectors that are hosted in Amazon Web Services (AWS), Microsoft, or other hosting services.

**To configure an HTTP source for Keeper, do the following:**



1. Go to the [Sources for Hosted Collectors](https://help.sumologic.com/03Send-Data/Sources/02Sources-for-Hosted-Collectors) page.
2. Select the hosting service appropriate for your environment.
3. Follow the instructions for adding an **HTTP Log Source**, using the default options.





1. Copy the **HTTP Source Address** when prompted.


#### Step 3: Send Keeper logs to Sumo Logic
8


You configured a collector and an HTTP source for Keeper logs. This section shows you how to send Keeper logs to Sumo Logic for use with the Keeper Security App.

**To send Keeper logs to Sumo Logic, do the following:**



1. Open the [Keeper Admin Console](https://keepersecurity.com/console) and navigate to **Reporting & Alerts**.
2. Select the **External Logging** tab.
3. Click the Sumo Logic **Setup** button.
4. In the Sync Settings dialog, enter the **HTTP Source Address** from [step 4](https://help.sumologic.com/07Sumo-Logic-Apps/22Security_and_Threat_Detection/Keeper_Security/Collect_Logs_for_Keeper_Security#HTTP+Source+Address) of the previous task.





1. Continue with [verifying logging](https://help.sumologic.com/07Sumo-Logic-Apps/22Security_and_Threat_Detection/Keeper_Security/Collect_Logs_for_Keeper_Security#Step_4:_Verify_logging).


#### Step 4: Verify logging
9


This task shows you how to verify that events are being generated and received.

**To verify logging for Keeper, do the following:**



1. In the Sync Settings dialog, click **Test Connection**. If the HTTP source is configured correctly, the Save button is activated.
2. Click **Save**. From this moment on, events generated by your enterprise are collected by Sumo Logic.


##### Troubleshooting
10


If your log source gets deleted or changes the URL, Keeper generates an “audit_sync_failed” event. You can monitor these events in the Keeper Admin Console.

If the connectivity is not restored after a certain number of events (50), Keeper puts the event logging on pause. Keeper generates an “audit_sync_paused” event.

To resume logging, go to the “External Logging” section of the Keeper Admin Console.


## Install the Keeper Security App and view the Dashboards


11
This application has been developed and is supported by [Keeper Security](https://keepersecurity.com/). For more information about Keeper please visit [https://keepersecurity.com](https://keepersecurity.com/) or email **business.support@keepersecurity.com** for help.

This page provides instructions for installing the Keeper Security App, as well as examples of each of the App dashboards.


### Install the App  
12


Now that you have set up collection for Keeper, install the app to use the pre-configured searches and [dashboards](https://help.sumologic.com/07Sumo-Logic-Apps/06Google/Google_Cloud_Audit/Install-the-Google-Cloud-Audit-App-and-view-the-Dashboards#Dashboards) that provide visibility into your environment for real-time analysis.

To install the app:

Locate and install the app you need from the **App Catalog**. If you want to see a preview of the dashboards included with the app before installing, click **Preview Dashboards**.



1. From the **App Catalog**, search for and select the app**.**
2. Select the version of the service you're using and click **Add to Library**.


13
Version selection is applicable only to a few apps currently. For more information, see the [Install the Apps from the Library.](https://help.sumologic.com/01Start-Here/Library/Apps-in-Sumo-Logic/Install-Apps-from-the-Library)



1. To install the app, complete the following fields.
    1. **App Name.** You can retain the existing name, or enter a name of your choice for the app. 
    2. **Data Source.** Select either of these options for the data source. 
        * Choose **Source Category**, and select a source category from the list. 
        * Choose **Enter a Custom Data Filter**, and enter a custom source category beginning with an underscore. Example: (_sourceCategory=MyCategory). 
    3. **Advanced**. Select the **Location in Library** (the default is the Personal folder in the library), or click **New Folder** to add a new folder.
2. Click **Add to Library**.

Once an app is installed, it will appear in your **Personal** folder, or other folder that you specified. From here, you can share it with your organization.

Panels will start to fill automatically. It's important to note that each panel slowly fills with data matching the time range query and received since the panel was created. Results won't immediately be available, but with a bit of time, you'll see full graphs and maps.


### Dashboard filters    
14


**Each dashboard has a set of filters** that you can apply to the entire dashboard, as shown in the following example. Click the funnel icon in the top dashboard menu bar to display a scrollable list of filters that are applied across the entire dashboard.


15
You can use filters to drill down and examine the data on a granular level.



**Each panel has a set of filters** that are applied to the results for that panel only, as shown in the following example. Click the funnel icon in the top panel menu bar to display a list of panel-specific filters.




##### Keeper - Overview Dashboard
16


This is a general dashboard that shows the geographic locations of user activity, slicing the user activity by user, platform and time, most and least frequent events.

**Use this dashboard to analyze the following data:**



* **Activity locations**. See the number of application events across the world on a map in the last 24 hours.
* **Activity by platform**. See the the number of application events by the client or platform in the last 24 hours.
* **Activity by user**. See the number of application events by user in the last 24 hours.
* **Total users**. See the number of users that accessed the Keeper service in the last 30 days.
* **Users by country**. See the ratio of users that accessed the Keeper service from different countries in the last 30 days.
* **Top Events**. See the ratio of top events generated by Keeper service users.
* **Activity by an hour**. See the times when user activity peaked during the last 7 days.
* **Alerts last 7 days**. See the alerts generated and alerts sent for the last 7 days.
* **Security events last 24 hours**. See the event from “Security” category in the last 24 hours.


17
This panel is similar to the “All Security Events” predefined report in the [Keeper Admin Console](https://keepersecurity.com/console).




#### Keeper - Activity Dashboard
18


Provides detailed information on user activity, highlighting access and related risks.

**Use this dashboard to analyze the following data:**



* **Throttled logins**. If a Keeper user tries to log in repeatedly with an incorrect password, this user logins become “throttled” for some time. This panel shows such login attempts for the last 24 hours, which can be an indication that somebody tries to hack this specific user.
* **Failed logins**. See the time, event type, username, client version for all login failures (vault, console, 2fa) in the last 24 hours.
* **Alert distribution**. See the pie chart of all alerts received in the last 7 days grouped by the alert name.
* **New user or remote address**. See the users that had their first activity or activity from new ip addresses in the last 24 hours.
* **Multi-country users**. See the users who logged in from more than 1 country in the last 7 days.
* **Movement**. See the users who logged in from multiple locations that are far from each other in the last 24 hours. Note: while this report would show hacking attempts from foreign countries, users who used both VPN and non-VPN access, can also fall into this category.




#### Keeper - Policy and Share Dashboard
19


Shows details about user management, team and role management, permission management, sharing information, failed logins, and risk related information.

**Use this dashboard to analyze the following data:**



* **User management**. See the users who were created, removed, locked or unlocked in the last 7 days.
* **Team and Role management**. See the users who were added to a role or a team in the last 7 days. (**Note**: Keeper cannot obtain the names of a role and as such cannot log them to Sumo. If you’re interested in the particular role to which the user was added, try adding a test user to roles. Then, compare the ID for the test user role to the ID in which you are interested in.
* **Enforcements management**. See the permissions that were granted or removed from roles in the last 7 days.
* **Export activity**. See the users who exported their records to an external file in the last 7 days.
* **Share activity**. See users who shared information, including changes to share parameters, like being able to edit or being able to re-share in the last 7 days.
* **Users who shared information**. See users who shared information and how much they shared relatively to each other in the last 7 days.
