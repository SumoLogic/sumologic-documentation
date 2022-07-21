---
id: jfrog-xray
title: Sumo Logic App for JFrog Xray
sidebar_label: JFrog Xray
---

The JFrog Xray app provides visibility into the state of artifacts and components in your JFrog Artifactory repository. The pre-configured dashboards present information about issues detected in your software components in Artifactory, including vulnerable containers, artifacts and components; license and security issues; and top Common Vulnerabilities and Exposures (CVEs). The app also helps identify all incoming threats detected via Sumo Logic Threat Intel.


1.png "image_tooltip")
The Sumo Logic app for JFrog Xray and collection are tested on JFrog Xray 2.9.0 version.


#### Log types

The JFrog Xray app uses the following log types:



* JFrog Xray logs. JFrog Xray logs are in JSON format. For more information, see JFrog Xray [Webhook payload](https://www.jfrog.com/confluence/display/XRAY/Policies#Policies-WebhookPayload).
* Artifactory logs. For more information, see [Collect Logs for Artifactory.](https://help.sumologic.com/07Sumo-Logic-Apps/08App_Development/Artifactory/01-Collect-Logs-for-Artifactory)
* Kubernetes logs. For more information, see [Collect Logs for Kubernetes.](https://help.sumologic.com/07Sumo-Logic-Apps/10Containers_and_Orchestration/Kubernetes/Collect_Logs_and_Metrics_for_the_Kubernetes_App)


## Collect Logs for JFrog Xray



1. **Last updated \
**Jun 16, 2020
2. [Save as PDF](https://help.sumologic.com/@api/deki/pages/7211/pdf/Collect%2bLogs%2bfor%2bJFrog%2bXray.pdf?stylesheet=default)
3.  
4. [ Share](https://help.sumologic.com/07Sumo-Logic-Apps/08App_Development/JFrog_Xray/Collect_Logs_for_JFrog_Xray#)

    Table of contents


This page explains how to collect logs from JFrog Xray and ingest them into Sumo Logic for use with the JFrog Xray pre-defined dashboards and searches. To get the most of out this app, we recommend you also collect logs from Artifactory as well as Kubernetes.


### Collection Overview

To configure log collection for the JFrog Xray app, you will perform the following tasks:



* [Step 1: Collect JFrog Xray instance details](https://help.sumologic.com/07Sumo-Logic-Apps/08App_Development/JFrog_Xray/Collect_Logs_for_JFrog_Xray#Step_1:_Collect_Jfrog_Xray_instance_details)
* [Step 2: Collect Artifactory logs](https://help.sumologic.com/07Sumo-Logic-Apps/08App_Development/JFrog_Xray/Collect_Logs_for_JFrog_Xray#Step_2:_Collect_Artifactory_logs)
* [Step 3: Collect Kubernetes logs](https://help.sumologic.com/07Sumo-Logic-Apps/08App_Development/JFrog_Xray/Collect_Logs_for_JFrog_Xray#Step_3:_Collect_Kubernetes_logs)
* [Step 4: Add a hosted collector and HTTP source](https://help.sumologic.com/07Sumo-Logic-Apps/08App_Development/JFrog_Xray/Collect_Logs_for_JFrog_Xray#Step_4:_Add_a_Hosted_Collector_and_HTTP_Source)
* [Step 5: Configure a collection method for JFrog Xray](https://help.sumologic.com/07Sumo-Logic-Apps/08App_Development/JFrog_Xray/Collect_Logs_for_JFrog_Xray#Step_5:_Set_up_a_collection_method_for_JFrog_Xray)
* [Troubleshooting](https://help.sumologic.com/07Sumo-Logic-Apps/08App_Development/JFrog_Xray/Collect_Logs_for_JFrog_Xray#Troubleshooting)


### Step 1: Collect Jfrog Xray instance details

In this step you collect details for your JFrog Xray instance that you will use in the following tasks.

Collect the following details:



* HostName and Port for your JFrog Xray instance — such as, JFrog instance URL **http://host-example:8000/web/#/login**
    * HostName = **host-example**
    * Port = **8000**
* Your Username and Password for your JFrog Xray instance


### Step 2: Collect Artifactory logs

We recommend collecting data from JFrog Artifactory so as to investigate sources of vulnerable artifacts and who is using them. This is done by correlating Xray logs with Artifactory logs.

To do so, follow the instructions in [Collect Logs for Artifactory](https://help.sumologic.com/07Sumo-Logic-Apps/08App_Development/Artifactory/01-Collect-Logs-for-Artifactory).


### Step 3: Collect Kubernetes logs

If you have set up a Docker repository in Aritfactory and are running containers in a Kubernetes cluster, we recommend collecting data from your Kubernetes cluster so as to understand all vulnerable containers running in production.

To perform this setup, follow the instructions in [Collect Logs for Kubernetes](https://help.sumologic.com/07Sumo-Logic-Apps/10Containers_and_Orchestration/Kubernetes/Collect_Logs_and_Metrics_for_the_Kubernetes_App).


### Step 4: Add a Hosted Collector and HTTP Source

In this step you set up a hosted Sumo Logic collector and HTTP source to collect JFrog Xray logs.

Identify an existing Sumo Logic Hosted Collector you want to use, or create a new Hosted Collector as described in the following task.


2.png "image_tooltip")
When you configure the HTTP source, make sure to save the HTTP Source Address URL. You will need it when you configure the webhook in [Step 5](https://help.sumologic.com/07Sumo-Logic-Apps/08App_Development/JFrog_Xray/Collect_Logs_for_JFrog_Xray#Step_5:_Set_up_a_collection_method_for_JFrog_Xray).  

**To add a hosted collector and HTTP source**



1. Create a new Sumo Logic hosted collector by performing the steps in [Configure a Hosted Collector](https://help.sumologic.com/03Send-Data/Hosted-Collectors/Configure-a-Hosted-Collector).
2. Create a new HTTP source on the hosted collector created above by following [these instructions](https://help.sumologic.com/03Send-Data/Sources/02Sources-for-Hosted-Collectors/HTTP-Source).


### Step 5: Set up a collection method for JFrog Xray

This section covers the various ways in which to collect logs from JFrog Xray and send them to Sumo Logic. The logs are then shown in dashboards as part of the JFrog Xray App. You can configure a Sumo Logic collector for JFrog Xray in Amazon Web Services (AWS) using AWS Lambda service, or use a script on a Linux machine with a cron job. Choose the method that best suits your environment:



* [Method 1 - AWS Lambda based collection via a Serverless Application Model (SAM) application](https://help.sumologic.com/07Sumo-Logic-Apps/08App_Development/JFrog_Xray/Collect_Logs_for_JFrog_Xray#Method_1-_Sumo_Logic_JFrog_Xray_SAM_application)
* [Method 2 - Script based collection](https://help.sumologic.com/07Sumo-Logic-Apps/08App_Development/JFrog_Xray/Collect_Logs_for_JFrog_Xray#Method_2:_Sumo_Logic_JFrog_Xray_Script_based_collection)


##### Method 1- Sumo Logic JFrog Xray SAM application

In this collection method, you deploy the SAM application, which creates the necessary  resources in your AWS account.

**To deploy the Sumo Logic JFrog xray SAM Application, do the following:**



1. Go to [https://serverlessrepo.aws.amazon.com/applications](https://serverlessrepo.aws.amazon.com/applications).
2. Search for **sumologic-jfrog-xray** and make sure  the checkbox **Show apps that create custom IAM roles or resource policies** is checked, and click the app link when it appears.


3.png "image_tooltip")


1. When the page for the Sumo app appears, click **Deploy**.
2. Go to the **AWS Lambda > Functions >** **Application Settings** panel, and enter parameters for the following fields:
* **HTTPLogsEndpoint**: Copy and paste the URL for the HTTP log source from [Step 4](https://help.sumologic.com/07Sumo-Logic-Apps/08App_Development/JFrog_Xray/Collect_Logs_for_JFrog_Xray#Step_4:_Add_a_Hosted_Collector_and_HTTP_Source).
* **Hostname**: Copy and paste the Hostname from [Step 1](https://help.sumologic.com/07Sumo-Logic-Apps/08App_Development/JFrog_Xray/Collect_Logs_for_JFrog_Xray#Step_1:_Collect_Jfrog_Xray_instance_details).
* **Port**: Copy and paste the Port from [Step 1](https://help.sumologic.com/07Sumo-Logic-Apps/08App_Development/JFrog_Xray/Collect_Logs_for_JFrog_Xray#Step_1:_Collect_Jfrog_Xray_instance_details).
* **Username**: Copy and paste the Username from [Step 1](https://help.sumologic.com/07Sumo-Logic-Apps/08App_Development/JFrog_Xray/Collect_Logs_for_JFrog_Xray#Step_1:_Collect_Jfrog_Xray_instance_details).
* **Password**: Copy and paste the Password from [Step 1](https://help.sumologic.com/07Sumo-Logic-Apps/08App_Development/JFrog_Xray/Collect_Logs_for_JFrog_Xray#Step_1:_Collect_Jfrog_Xray_instance_details).


4.png "image_tooltip")


1. Click **Deploy.**




###### **Optional - Configure multiple JFrog Xray instances**

If you have multiple JFrog Xray instances from which you want to collect logs and send to Sumo Logic, perform the following task.

**To configure collection for multiple JFrog Xray instances, do the following:**



1. [Deploy the SAM application](https://help.sumologic.com/07Sumo-Logic-Apps/08App_Development/JFrog_Xray/Collect_Logs_for_JFrog_Xray#Deploy+a+SAM+application) with configuration for a new project.
2. After the deployment is complete, change the database name by adding environment variable (**DBNAME**) in [AWS Lambda](https://docs.aws.amazon.com/lambda/latest/dg/env_variables.html).


5.png "image_tooltip")




##### Method 2: Sumo Logic JFrog Xray Script based collection

This section provides instructions for configuring script based collection for the Sumo Logic JFrog Xray App.


6.png "image_tooltip")
The _sumologic-jfrog-xray_ script is compatible with python 3.7 and python 2.7, and has been tested on Ubuntu 18.04 LTS.




###### **Prerequisites**



* You must have successfully added a **Hosted Collector** and **HTTP source **and copied details for JFrog Xray instance, as described in [Step 4](https://help.sumologic.com/07Sumo-Logic-Apps/08App_Development/JFrog_Xray/Collect_Logs_for_JFrog_Xray#Step_4:_Add_a_Hosted_Collector_and_HTTP_Source).
* You must be logged in to the user account with which you will install the collector. If you are not, use the following command to switch to that account:  \
sudo su &lt;user_name>
* A Linux machine compatible with either Python 3.7 or Python 2.7




###### **Step 1. Configure the script on a Linux machine**

This task shows you how to install the script on a Linux machine.


7.png "image_tooltip")
For Python 3 you will use pip3 install **sumologic-jfrog-xray** (step 3 in the following task). For systems where Python 3 is not the default - you will use **/usr/bin/python3 -m sumojfrogxray.main** (step 5 in the following task).

**To deploy the script, do the following:**



1. If **pip** is not already installed, follow the instructions in the [pip documentation](https://pip.pypa.io/en/stable/installing/) to download and install **pip**.
2. Log in to a Linux machine compatible with either Python 3.7 or Python 2.7.
3. Do one of the following:
* For Python 2 - run the following command: **pip install sumologic-jfrog-xray**
* For Python 3 - run the following command: **pip3 install sumologic-jfrog-xray**
1. Create a configuration file **jfrogxraycollector.yaml** in the home directory as shown below, and fill in the parameter &lt;Variables> where indicated.


8.png "image_tooltip")




1. Create a cron job  to run the collector every 5 minutes, (use the crontab -e option), in one of the following ways:
* For Python 2 - add the following line in your crontab: */5 * * * *  /usr/bin/python -m sumojfrogxray.main > /dev/null 2>&1
* For Python 3 - add the following line in your crontab: */5 * * * *  /usr/bin/python3 -m sumojfrogxray.main > /dev/null 2>&1




###### **Optional - Configure collection for multiple projects**

If you have multiple projects from which you want to collect logs and send to Sumo Logic, perform the following task.

**To configure collection for multiple projects, do the following:**



1. [Configure the script on a Linux machine](https://help.sumologic.com/07Sumo-Logic-Apps/08App_Development/JFrog_Xray/Collect_Logs_for_JFrog_Xray#Step_1._Configure_the_script_on_a_Linux_machine), then navigate to your configuration file.
2. Change the **DB_NAME** in the **jfrogxraycollector.yaml,** the **&lt;DB NAME>** variable in the following example.


9.png "image_tooltip")





###### **Step 2. Advanced configuration**


10.png "image_tooltip")
Advanced configuration can be used with all JFrog Xray script-based collection configurations.

This section provides a list of variables for Jfrog Xray that you can define in the configuration file.


<table>
  <tr>
   <td>Variable
   </td>
   <td>Usage
   </td>
  </tr>
  <tr>
   <td>BACKFILL_DAYS in Collection Section
   </td>
   <td>Number of days before the event collection will start. If the value is 1, then events are fetched from yesterday to today.
   </td>
  </tr>
  <tr>
   <td>LOG_FORMAT in Logging Section
   </td>
   <td>Log format used by the python logging module to write logs in a file.
   </td>
  </tr>
  <tr>
   <td>ENABLE_LOGFILE in Logging Section
   </td>
   <td>Set to TRUE to write all logs and errors to a log file.
   </td>
  </tr>
  <tr>
   <td>ENABLE_CONSOLE_LOG  in Logging Section
   </td>
   <td>Enables printing logs in a console.
   </td>
  </tr>
  <tr>
   <td>LOG_FILEPATH in Logging Section
   </td>
   <td>Path of the log file used when ENABLE_LOGFILE is set to TRUE.
   </td>
  </tr>
  <tr>
   <td>NUM_WORKERS in Collection Section
   </td>
   <td>Number of threads to spawn for API calls.
   </td>
  </tr>
  <tr>
   <td>MAX_RETRY in Collection Section
   </td>
   <td>Number of retries to attempt in case of request failure.
   </td>
  </tr>
  <tr>
   <td>BACKOFF_FACTOR in Collection Section
   </td>
   <td>A backoff factor to apply between attempts after the second try. If the backoff_factor is 0.1, then sleep() will sleep for [0.0s, 0.2s, 0.4s, ...] between retries.
   </td>
  </tr>
  <tr>
   <td>TIMEOUT in Collection Section
   </td>
   <td>Request time out used by the requests library.
   </td>
  </tr>
  <tr>
   <td>HTTP_LOGS_ENDPOINT in SumoLogic section
   </td>
   <td>HTTP source endpoint url created in Sumo Logic for ingesting Logs.
   </td>
  </tr>
</table>



### Troubleshooting

This section shows you how to run the function manually and then verify that log messages are being sent from JFrog Xray.

**To run the function manually, do the following:**



1. Do one of the following:
* For **python**, run this command: **python -m sumojfrogxray.main**
* For **python3**, run this command: **python3 -m sumojfrogxray.main**
1. The script generates logs in **/tmp/sumoapiclient.log **by default. Check these logs to verify whether the script is getting triggered or not.
2. If you get an error such as “**unable to execute 'gcc': No such file or directory, error: command 'gcc' failed with exit status 1**”, go to your AWS EC2 instance and run the following commands:


```
sudo yum -y install gcc
sudo yum install python-devel
```



### Sample Log Message


```
{
  "created": "2019-09-03 22:01:19,804 +0530",
  "top_severity": "High",
  "watch_name": "Maven_watch",
  "policy_name": "License_policy",
  "issues": [
    {
      "severity": "medium",
      "type": "License",
      "provider": "JFrog",
      "created": "2019-09-03 22:01:19,804 +0530",
      "summary": "In Libgcrypt 1.8.4, the C implementation of AES is vulnerable to a flush-and-reload side-channel attack because physical addresses are available to other processes. (The C implementation is used on platforms where an assembly-language implementation is unavailable.)",
      "description": "In Libgcrypt 1.8.4, the C implementation of AES is vulnerable to a flush-and-reload side-channel attack because physical addresses are available to other processes. (The C implementation is used on platforms where an assembly-language implementation is unavailable.)",
      "impacted_artifacts": [
        {
          "name": "mina-core-2.0.0-RC1-javadoc.jar",
          "display_name": "mina-core:2.0.0-RC1",
          "path": "/milestone/org/apache/mina/mina-core/2.0.0-RC1/mina-core-2.0.0-RC1-javadoc.jar",
          "pkg_type": "zip",
          "sha256": "ca013ac5c09f9a9f6db8370c1b759a29fe997d64d6591e9a75b71748858f7da0",
          "sha1": "4cc3661681baf84566f4e3f166127074548d4519",
          "depth": 0,
          "parent_sha": "ca013ac5c09f9a9f6db8370c1b759a29fe997d64d6591e9a75b71748858f7da0",
          "infected_files": [
            {
              "name": "SQLAlchemy-1.3.8.tar.gz",
              "path": "SQLAlchemy:1.3.8",
              "sha256": "dd1ca0d765607415523d57b7464c0bb259412cff5d9a09c281d0acfbd4eed7e3",
              "depth": 0,
              "parent_sha": "35c102085707f703de2d9eaad8752d6fe1b8f02b5d2149f1d8357c9cc7fb7d0a",
              "display_name": "/libs-milestone-local/org/springframework/spring/3.2.0.RC2/spring-framework-3.2.0.RC2-dist.zip",
              "pkg_type": "spring"
            }
          ]
        }
      ],
      "cve": "CVE-2019-12904"
    }
  ]
}
```



### Query Sample

The sample query is from Watches Invoked panel of the **JFrog Xray - Overview** dashboard.


```
_sourceCategory = Labs/jfrog/xray
| json "top_severity", "issues", "watch_name", "policy_name" as TopSeverity, Issues, WatchName, PolicyName nodrop
| where !(TopSeverity matches "Pending Scan")
| parse regex field=Issues "(?<Issue>\{.*?(?=,\{\"severity\"|\]$))" multi
| json field=Issue "impacted_artifacts", "severity", "summary", "cve", "provider", "created", "description", "type" as Artifacts, Severity, Summary, CVE, Provider, Created, Description, PolicyType nodrop
| parse regex field=Artifacts "(?<Artifact>\{.*?(?=,\{\"sha1\"|\]$))" multi
| json field=Artifact "infected_files", "sha1", "path", "depth", "sha256", "name", "parent_sha", "display_name", "pkg_type" as Files, ArtifactSha, ArtifactPath, ArtifactDepth, ArtifactSha256, ArtifactName, ArtifactParentSha, ArtifactDisplayName, ArtifactPkgType nodrop
| parse regex field=Files "(?<File>\{[^\}]+(?:\}\}|\}))" multi
| json field=File "path", "depth", "sha256", "name", "parent_sha", "display_name", "pkg_type" as ComponentPath, ComponentDepth, ComponentSha, ComponentName, ComponentParentSha, ComponentDisplayName, ComponentPkgType nodrop
| count_distinct(WatchName) as %"Number of Watches"
```



## Install the JFrog Xray App and View the Dashboards

#### Install the app

This section has instructions for installing the JFrog Xray app.

**To install the app, do the following:**



1. In the App Catalog, search for and select the **JFrog Xray** app.


11.png "image_tooltip")
To see a preview of the dashboards included with the app before installing, click Preview Dashboards.



1. Click **Add to Library**. The **Add JFrog Xray to Library** dialog appears.


12.png "image_tooltip")


1. Specify the following:
* **App Name**. You can retain the existing name, or enter a name of your choice for the app.
* **JFrog Xray log data source**. Click in the **Source Category** entry field, and select the source category you assigned to the HTTP source you created in [Step 3: Add a hosted collector and HTTP source](https://help.sumologic.com/07Sumo-Logic-Apps/08App_Development/JFrog_Xray/Collect_Logs_for_JFrog_Xray#Step_3:_Add_a_Hosted_Collector_and_HTTP_Source).
* Artifactory log data source. Enter a string that matches the source categories you assigned to  the local file sources that you set up to receive Artifactory logs in [Step 1: Collect Artifactory logs](https://help.sumologic.com/07Sumo-Logic-Apps/08App_Development/JFrog_Xray/Collect_Logs_for_JFrog_Xray#Step_3:_Add_a_Hosted_Collector_and_HTTP_Source) of the "Collect Logs for JFrog Xray" page. If you followed the instructions for setting the source categories on [Collect Logs for Artifactory](https://help.sumologic.com/07Sumo-Logic-Apps/08App_Development/Artifactory/01-Collect-Logs-for-Artifactory), enter `_sourceCategory=*artifactory*`
* **Kubernetes log data source**. Select the log source for the HTTP source that receives Kubernetes Events logs.
* **Advanced**. (Optional) If desired, specify the location in Library where the app will be installed (the default is the Personal folder in the library), or click **New Folder** to add a new folder in which to place the app.
1. Click **Add to Library**. Once an app is installed, it appears in your **Personal** folder, or other folder that you specified. From here, you can share it with your organization.

Panels start to fill automatically. It's important to note that each panel slowly fills with data matching the time range query and received since the panel was created. Results won't immediately be available, but with a bit of time, you'll see full graphs and maps.


#### Dashboard filters

Each dashboard has a set of filters that you can apply to the entire dashboard, as shown in the following example. Click the funnel icon in the top dashboard menu bar to display a scrollable list of filters that are applied across the entire dashboard.


13.png "image_tooltip")



14.png "image_tooltip")


You can use filters to drill down and examine the data on a granular level

Each panel has a set of filters that are applied to the results for that panel only, as shown in the following example. Click the funnel icon in the top panel menu bar to display a list of panel-specific filters.


15.png "image_tooltip")



#### JFrog Xray - Overview dashboard

The **JFrog Xray - Overview dashboard **provides an at-a-glance overview of issues detected in your software components in Artifactory, including vulnerable containers, artifacts and components, as well as the top Common Vulnerabilities and Exposures (CVEs) detected.

Use this dashboard to:



* Monitor watches invoked, policies invoked, vulnerable artifacts and components.
* Monitor threats, vulnerable containers, CVEs.
* Monitor security and license vulnerabilities.
* Monitor high severity information for all artifacts.
* Identify artifacts with most severities segregated by type of severity.
* Look at the recently discovered vulnerabilities.




#### JFrog Xray - Detected Vulnerabilities dashboard

The **JFrog Xray - Detected Vulnerabilities** dashboard provides insight around users and client IP addresses that both uploaded and downloaded vulnerable artifacts into Artifactory.

Use this dashboard to:



* Monitor all vulnerable artifacts and components across your artifactory.
* Identify the top CVE that has affected the artifactory.
* Identify the trends for vulnerable artifacts and components.
* Identify number of artifacts and components affected by CVE along with description.
* Identify most vulnerable package types for artifacts and components.


16.png "image_tooltip")



#### JFrog Xray - Vulnerable Containers dashboard

The **JFrog Xray - Vulnerable Containers** dashboard provides information on vulnerable containers as well as hosts and namespaces associated with them.



* Use this dashboard to:
* Identify vulnerable containers, hosts and namespaces.
* Identify the trend of vulnerable containers.
* Monitor recent images pulled from Artifactory by vulnerable containers.


17.png "image_tooltip")



#### JFrog Xray - Threat Analysis dashboard

The **JFrog Xray - Threat Analysis **dashboard provides insight into threats and indicators of compromise of all vulnerable artifacts detected by Xray by correlating  Artifactory logs with Xray logs.

Use this dashboard to:



* Identify all vulnerable artifacts that are downloaded or uploaded on Artifactory via Sumo Logic Threat intel.
* Identify locations of all vulnerable IP’s downloading or uploading artifacts.
* Monitor the malicious confidence for the threats.


18.png "image_tooltip")



#### JFrog Xray - Vulnerable Artifacts dashboard

The **JFrog Xray - Vulnerable Artifacts** dashboard provides detailed insight into Xray issues, vulnerable artifacts and files.

Use this dashboard to:

* Identify top users uploading or downloading the vulnerable artifacts.
* Identify all the IPs uploading or downloading the vulnerable artifacts.
* Monitor recent uploaded and downloaded artifacts.


19.png "image_tooltip")
