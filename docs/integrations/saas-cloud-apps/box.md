---
id: box
title: Sumo Logic App for Box
sidebar_label: Box
description: Provides insight into user behavior patterns, monitors resources, and even tracks administrative activities.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/saas-cloud-apps/box.png')} alt="Thumbnail icon" width="100"/>

The Sumo Logic App for Box provides insight into user behavior patterns, monitors resources, and even tracks administrative activities. The app consists of three predefined Dashboards, providing visibility into your environment for real time analysis.

## Log Types

The Sumo Logic App for Box collects Box events, which are described in detail here: https://developers.box.com/docs/#events

## Collect Events for Box

This section provides instructions for setting up event collection from Box for analysis in Sumo Logic.

### Requirements and process overview

Before you begin setting up log collection, review the required prerequisites and process overview described in the following sections.

### Prerequisites

* You must have Admin or Co-Admin Box user permissions. See [Step 5: Authenticate Box Prerequisites](#Prerequisites_2) for more information.
* The integration between Sumo and Box requires the SumoJanus configuration, described below. The system where you deploy SumoJanus and configure your installed collector and script source must have Java.

To ensure that SumoJanus can find your Java installation, set your `JAVA_HOME` environment or absolute `PATH` variable. For more information, see [Step 5: Authenticate Box](#Prerequisites_2).


### Process Overview

Setting up event collection from Box for analysis in Sumo Logic includes the following tasks, which must be performed in the order in which they are presented.

1. Configure an Installed Collector.
2. Download the SumoJanus for Box package necessary for authentication.
3. Deploy the SumoJanus for Box package on the local server that is running the Sumo Logic Collector.
4. Edit the local properties file. The Properties file will be generated in step 2 when you download and deploy the SumoJanus package.
5. Authenticate Box.
6. Configure a source to send the data to Sumo Logic.


#### Configuring Box event collection

This section walks you through the process of setting up log collection from Box for analysis in Sumo Logic.


#### Step 1: Configure a Collector

If you don't already have an [installed collector, set one up](/docs/send-data/Installed-Collectors) now. Linux and Windows are supported.


#### Step 2: Download the SumoJanus

The following SumoJanus for Box package is required to collect logs from Box. SumoJanus is a proprietary library used for script-based collection from applications such as Okta, Box, and Salesforce.

SumoJanus for Box v3.0.0 package file:

* **For Linux**, download `sumojanus-box-dist.3.0.1.tar.gz` from [https://script-collection.s3.amazonaws.com/box/r3.0.1/sumojanus-box-dist.3.0.1.tar.gz](https://script-collection.s3.amazonaws.com/box/r3.0.1/sumojanus-box-dist.3.0.1.tar.gz).
* **For Windows**, download `sumojanus-box-dist.3.0.1.zip` from [https://script-collection.s3.amazonaws.com/box/r3.0.1/sumojanus-box-dist.3.0.1.zip](https://script-collection.s3.amazonaws.com/box/r3.0.1/sumojanus-box-dist.3.0.1.zip).


#### Step 3: Deploy the SumoJanus for Box package

In this task, you copy the package file to the folder where it will be deployed and then unpack the contents.

1. Copy the downloaded package file to the location where it will be deployed.
2. Unpack the contents of the file in that location, in one of the following ways:
* **On Linux**, run the following command:

```sh
tar xzvf sumojanus-box-dist.3.0.0.tar.gz
```

* **On Windows**, you can use Windows Explorer to open the package and copy it to the target folder.

    After you unpack the file, there should be a folder called **sumojanus-box** that contains files like this:


#### Step 4: Edit the properties file

In this task, you modify the properties file.

1. Open the `sumojanus-box/conf/sumologic.properties` file in an ASCII text editor.

Add the following lines: \
`[boxcollector]`


```
token_path = ${path}/data/box_enc.token
stream_pos_path = ${path}/data/box_stream_position.dat
# optional, default is admin event
#event_type = admin
# optional, encrypt token file or not. Default is false
encrypt_token_file = true
# Optional, Overwrite default encryption key
# encryption_key =
# optional, startTime to query for Event Log files, in epoch milliseconds, optional, default is 2 days back.
#startTime = 1435709058000
# optional, endTime to query for Event Log files, in epoch milliseconds
#endTime = 1436377600000
```


2. Save your changes.


#### Step 5: Authenticate Box

This section shows you how to set up authentication.


#### Prerequisites

* **You must have Admin or Co-Admin role permissions** to perform this procedure. A Co-Admin user only needs “Runs new report and access existing reports” privilege (under “Reports and Settings” section, as shown in the following image).

* You need an internet-connected computer with a web browser. We recommended that you use a Chrome or Firefox browser for the authentication procedure, _not_ Internet Explorer (IE).
* As part of authentication, the script opens and listens to port 8080. It also creates a token file under the **sumojanus-box/data **folder. **Make sure the local firewall settings and file permissions allow these operations**. **On Windows machines, you may need to create a firewall exception rule to allow port 8080 to be opened.**
* Verify the current JRE folder the collector is using by going to the **collector** folder under **config/wrapper.conf**, and looking for the **wrapper.java.command** variable.

**To authenticate Box, do the following:


To avoid errors, use the latest bundled JRE version listed in the [Collector Release Notes](/docs/releasenotes/collector). Since the JRE folder **can change** with collector upgrades, we **strongly recommend** copying this JRE folder to a separate place and pointing the JAVAPATH to that folder. To check the current JRE folder the collector is using, go to the **collector** folder under **config/wrapper.conf, and look for the variable wrapper.java.command.

1. By default the Collector will come with a Java Runtime Environment. To ensure that SumoJanus can locate Java, you may need to update the .bat or .bash file, as described below. \
**On Windows, update SumoJanus_Box.bat file \
**Navigate to the folder where you installed SumoJanus, and open SumoJanus_Box.bat file in a text editor. Line 3 of the script sets `JAVAPATH` to `C:\Program Files\Sumo Logic Collector\jre\bin` as shown below: \
`set JAVAPATH="C:\Program Files\Sumo Logic Collector\jre\bin" \
`If your collector JRE is in a different location, update Line 3 accordingly.   \
 \
On Linux, update SumoJanus_Box.bash file \
Navigate to the folder where you installed SumoJanus, and open SumoJanus_Box.bash  file in a text editor. Then, modify the line `"export JAVAPATH="${JAVA_HOME}""` to `"export JAVAPATH=/opt/SumoCollector/jre/"` (or the path to the JRE folder) and save the file.
2. If you are logged in to your Box account, log out.
3. From the **sumojanus-box** folder, open a terminal window and run one of the following commands:
    1. For Linux: `bin/SumoJanus_Box.bash -s`
    2. For Windows: `bin\SumoJanus_Box.bat -s`
4. **If Box presents a Disabled by Administrator** **message**, follow these steps to grant access to the Sumo app, then re-run the script.
    3. Go to **Enterprise Settings **or **Business Settings** and click **Apps**.
    4. Scroll to the **Invididual Application Controls** section, search for **SumoLogic**, and select **Available** for the app **SumoLogic_BoxCollector**.
    5. Repeat Step 3 (re-run the script). The script opens a browser window.
5. When the script opens the browser, provide your Box email password and click **Authorize.** Once Authorized, the app is enabled within your Developer enterprise. NOTE: If the SumoJanus script does not open a browser, it prints a URL in the terminal window that you can copy and paste into a browser to open the window.



1. To grant access to all requested permissions, click **Grant access to Box.**

After after granting access in this step, you must perform the next step within 30 seconds or you’ll receive a "The authorization code has expired" error. If you get this error message, simply rerun the SumoJanus script as described in step 3.

    Your browser will display the message:  "This site can't be reached." **This is expected.**



1. **Copy the URL from the browser, change the protocol from "https" to "http" then use one of the following options ON THE SAME MACHINE where the script is running (in case your browser is actually on a different machine):**
    * **For Linux**, open a terminal window and run: `curl -X GET 'the above url'`
    * **For Windows**, open a Powershell window and run: `Invoke-WebRequest 'the above url'  -Method Get`


8
The use of single quotes surrounding the URL is **required.**


    **If everything was successful, you should see the message “Thank you for granting access for SumoLogic BoxCollector” somewhere in the return value. If you see an error regarding an expired authorization code instead, make sure you finish this step within 30 seconds of the previous step as noted above.**



1. Once permissions are granted, the script saves the access token to a local file—the default location is `${path}/data` or `./data`. Verify that the file was created. If not, repeat the authentication steps.  \
 \
**On some Windows machines, the SumoJanus folder has “Read only” permission by default. Make sure you allow Write permission.**


9


The path to the token file is configured in the `conf/sumologic.properties` file, under the property `token_path`.



1. (Optional) Test the script manually by going to the **sumojanus-box **folder and running one of the following commands:
    *For Linux **systems, run this command:

```
bin/SumoJanus_Box.bash
```

**For Windows** systems, run this command:
```
bin\SumoJanus_Box.bat
```

You should now see a list of results of collected Box events.

1. Close the CLI (Windows) or shell (Linux) window to kill the running script. By default it runs for 30 minutes.


#### Step 6: Configure a Source

For guidance creating your source category naming convention, see [Best Practices: Good Source Category, Bad Source Category](/docs/send-data/design-deployment/best-practices-source-categories).

**To configure a source, do the following:**

1. Configure a [Script Source](/docs/send-data/Sources/sources-installed-collectors/Script-Source). Collectors using version 19.245-4 and later do not allow Script Sources to run by default.
10
To enable Script Sources you must set the Collector parameter `enableScriptSource` in [user.properties](/docs/send-data/Installed-collectors/collector-installation-reference/user-properties) to true and [restart](/docs/manage/collection/start-stop-collector-using-scripts.md) the Collector.
11

2. Configure the source fields:
    1. **Name**. (Required) BoxCollector. (Description is optional.)
    2. **Source Category**. (Required) box
    3. **Frequency** (Required) **Every 5 Minutes**
    4. **Specify a timeout for your command**: Active the checkbox and select **60 Minutes**
    5. **Command** (Required)`/bin/bash` (specify the correct path on your system)
    6. **Script** (Required) Use the path to `sumojanus`, such as: `/home/ubuntu/sumojanus-box/bin/SumoJanus_Box.bash`  \
(Do not select “Type the script to execute.”)
    7. **Working Directory.** `/home/ubuntu/sumojanus-box`
3. Click **Save**.


### Sample log messages


```json
{
   "source": {
      "type": "user",
      "id": "225980941",
      "name": "First Last",
      "login": "user@sumologic.com"
   },
   "created_by": {
      "type": "user",
      "id": "225980941",
      "name": "First Last",
      "login": "user@sumologic.com"
   },
   "created_at": "2016-12-15T11:08:58-08:00",
   "event_id": "7988d00a-aca3-4454-9021-652477f4fa78",
   "event_type": "LOGIN",
   "ip_address": "1.1.1.1",
   "type": "event",
   "session_id": null,
   "additional_details": null
}

{
   "source": {
      "type": "user",
      "id": "262207389",
      "name": "user",
      "login": "luser@sumologic.com"
   },
   "created_by": {
      "type": "user",
      "id": "225980941",
      "name": "first last",
      "login": "user1@sumologic.com"
   },
   "created_at": "2016-12-14T16:09:33-08:00",
   "event_id": "d82f1946-2c51-43fe-bfcc-3452f9e2f6ff",
   "event_type": "DELETE_USER",
   "ip_address": "1.1.1.1",
   "type": "event",
   "session_id": null,
   "additional_details": null
}
```



### Sample Query

```sql title="Top 10 Failed Logins"
_sourceCategory=box  type "event_type" login
| json "created_at","ip_address","event_type","created_by.name","created_by.login" as messagetime,src_ip,event_type, src_user,src_login nodrop
| json "source.name","source.login","source.type"  as dest_user,dest_login, item_type nodrop
| where event_type="FAILED_LOGIN"
| count as EventCount by src_user,src_login,src_ip | top 10 src_user,src_login,src_ip by EventCount
```


## Install the Box App

Now that you have set up collection for Box, install the Sumo Logic App for Box to use the preconfigured searches and [dashboards](#Dashboards) to analyze your data.

To install the app:

Locate and install the app you need from the **App Catalog**. If you want to see a preview of the dashboards included with the app before installing, click **Preview Dashboards**.

1. From the **App Catalog**, search for and select the app**.**
2. Select the version of the service you're using and click **Add to Library**.

Version selection is applicable only to a few apps currently. For more information, see the [Install the Apps from the Library.](/docs/get-started/library/install-apps)

1. To install the app, complete the following fields.
    1. **App Name.** You can retain the existing name, or enter a name of your choice for the app. 
    2. **Data Source.** Select either of these options for the data source. 
        * Choose **Source Category**, and select a source category from the list. 
        * Choose **Enter a Custom Data Filter**, and enter a custom source category beginning with an underscore. Example: (`_sourceCategory=MyCategory`). 
    3. **Advanced**. Select the **Location in Library** (the default is the Personal folder in the library), or click **New Folder** to add a new folder.
2. Click **Add to Library**.

Once an app is installed, it will appear in your **Personal** folder, or other folder that you specified. From here, you can share it with your organization.

Panels will start to fill automatically. It's important to note that each panel slowly fills with data matching the time range query and received since the panel was created. Results won't immediately be available, but with a bit of time, you'll see full graphs and maps.

The Script Source is available for Linux or Windows environments with Java Runtime Environments.


## Viewing Box Dashboards

### Box Collaborations and Shares

<img src={useBaseUrl('img/integrations/saas-cloud-apps/box_app_collaborations.png')} alt="Box dashboards" />

**Users with Most Collaboration Activities.** Shows the top users with the most collaboration activities and displays them as a column chart for the last 24 hours.

**Collaborations by Item.** Top items invoked in collaboration activities, displayed as a column chart for the last 24 hours.

**Collaboration Details.** Displays Box collaboration event information details in an aggregation table with columns for message time, event type, item name, source user, and source login for the last 24 hours.

**Shared Resources.** Displays the details of shared resources such as message time, event type, item name, item type, source user, and source login in an aggregation table for the last 24 hours.


### Box Resource Access

<img src={useBaseUrl('img/integrations/saas-cloud-apps/box_app_resource.png')} alt="Box dashboards" />

**Top 10 Resource Creators.** Displays the top 10 resource creators by showing details of Box upload or create events by user and count as a pie chart for the last 24 hours.

**Top 10 Resource Consumers.** Provides information on the top 10 resource consumers by showing Box download or preview events by user and event count as a pie chart for the last 24 hours.

**Access Types Over Time.** Shows access event types by count as a stacked column chart using timeslices of one hour on a timeline for the last 24 hours.

**Top 10 Most Accessed Resources.** Lists the top 10 most accessed resources by name in a bar chart for the last 24 hours.

**Top 10 Most Downloaded or Viewed Resources.** Lists the top 10 most downloaded or viewed resources by name in a bar chart for the last 24 hours.

**Resources Moved or Copied.** Displays details on resources that have been copied or moved such as message time, item type, item name, event type, source login, and source user in an aggregation table for the last 24 hours.


### Box User Monitoring

<img src={useBaseUrl('img/integrations/saas-cloud-apps/box_app_user_monitoring.png')} alt="Box dashboards" />

**Top 10 Logins by User.** Displays details about the top 10 users with the most logins, such as source user, source login, and event count in an aggregation table for the last 24 hours.

**Top 10 Logins by IP.** Shows the top 10 IP address that logged into the account in a pie chart for the last 24 hours.

**Top 10 Failed Logins.** Provides details on failed logins by user and event count in a column chart for the last 24 hours.

**Administrative Activities.** Displays administrative details such as message time, event type, source IP address, source user, source login, destination user, and destination login in an aggregation table for the last 24 hours.

**Recent Login Devices Added.** Reports details on recently added login devices such as message time, source login, source user, and source IP address in an aggregation table for the last 24 hours.

**Top 10 Automated Users.** Displays information on top automated users by user and event count in a column chart for the last 24 hours. Automated users are devices or applications that login through a user account.
