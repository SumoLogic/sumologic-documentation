---
id: jenkins
title: Sumo Logic App for Jenkins
sidebar_label: Jenkins
description: The Sumo Logic App for Jenkins helps you monitor build successes, failures, and performance, ensuring that you know—before committing code to the repository—whether the code will work.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/app-development/jenkins.png')} alt="DB icon" width="50"/>


[Jenkins](https://jenkins.io/) is an open source automation server that provides a simple way to set up a continuous integration or delivery environment for building and testing software. The Sumo Logic App for Jenkins helps you monitor your build processes and Jenkins master and server health via pre-configured dashboards.

The Jenkins App allows you to monitor multiple Jenkins master nodes from a single-pane of glass. The app supports freestyle and pipeline jobs as well as pipeline, maven  and multi-branch pipeline projects.

1.png "image_tooltip")
Sumo Logic Jenkins plugin is compatible with Jenkins version 2.60.1 and above. For more information refer [Sumo Logic Jenkins Plugin WIKI](https://plugins.jenkins.io/sumologic-publisher) page.


### Log and Metric Types

All logs are JSON based, with the exception of job console logs. Graphite format metrics are generated.

The Jenkins App uses the following Log Types:

* Audit Logs - Log events related to user authentication, Jenkins system and job configuration changes and Jenkins job run events.
* Metric Data - Log events related to metric information of Jenkins Master.
* Periodic Logs - Log events related to Jenkins nodes, master shutdown events, jobs in progress and in queue.
* SCM Log - Log events related to Source Control Management systems like the github repository.
* Job Status Logs - Log events related to Jenkins jobs, test results and pipeline stages.
* Job Console Logs - Log events related to job console logs.


## Collect Logs and Metrics for Jenkins

This page provides instructions for configuring log and metric collection for the Sumo Logic App for Jenkins.


#### Collection overview

Configuring log and metric collection for the Jenkins App includes the following tasks:

1. Configure a Collector
2. Configure HTTP Logs and Metric source
3. Install Jenkins Plugin
4. Configure Jenkins Plugin
5. Optional - Advanced Configuration


2.png "image_tooltip")
Sumo Logic Jenkins plugin is compatible with Jenkins version 2.60.1 and above. For more information refer [Sumo Logic Jenkins Plugin WIKI](https://plugins.jenkins.io/sumologic-publisher) page.


##### Configure a Collector

**To create a new Sumo Logic hosted collector**, perform the steps in the [Configure a Hosted Collector](https://help.sumologic.com/03Send-Data/Hosted-Collectors/Configure-a-Hosted-Collector) section of the Sumo Logic documentation.


##### Configure an HTTP Log and Metric Source

**To create a new HTTP logs and metric source, do the following:**

1. Create a new HTTP Logs and Metrics Source in the hosted collector created above by following [these instructions.](https://help.sumologic.com/03Send-Data/Sources/02Sources-for-Hosted-Collectors/HTTP-Source)
2. Make a note of **HTTP Source URL** and **Source Category**, as you will need them later in the configuration process.


##### Install the Jenkins Plugin

3.png "image_tooltip")
You must have Admin privileges to perform any of the following installation procedures.

This section walks you through the ways in which you can install the Jenkins plugin:

* [Updating the Jenkins plugin](https://help.sumologic.com/07Sumo-Logic-Apps/08App_Development/Jenkins/Collect_Logs_and_Metrics_for_Jenkins#Updating_the_Jenkins_plugin)—use this method if the Jenkins plugin is installed on your system and you want to update the version.
* [Installing with sumologic publisher for the first time](https://help.sumologic.com/07Sumo-Logic-Apps/08App_Development/Jenkins/Collect_Logs_and_Metrics_for_Jenkins#Installing_with_sumologic_publisher_for_the_first_time)—use this method if you are using the sumologic publisher for the first time.
* [Manually installing the Jenkins plugin](https://help.sumologic.com/07Sumo-Logic-Apps/08App_Development/Jenkins/Collect_Logs_and_Metrics_for_Jenkins#Manually_installing_the_Jenkins_plugin)—use this method if there's a restriction on installing the plugin directly through the Jenkins plugin update center.




##### Updating the Jenkins plugin

This section shows you how to update the version of the Jenkins plugin you have running on your system.

**To update the Jenkins plugin, do the following:**

1. In the Jenkins console, go to **Manage Jenkins > Manage Plugins**.
2. Click the **Updates tab > Check now**.


4.png "image_tooltip")


1. Select "Sumologic Publisher".
2. Click **Download now and install after restart**. You may need to restart Jenkins for the plugin to show up.


5.png "image_tooltip")



##### Installing with sumologic publisher for the first time

This section shows you how to install the Jenkins plugin, if this is your first time using sumologic publisher.

**To perform a first time installation, do the following:**


1. In the Jenkins console, go to **Manage Jenkins** > **Manage Plugins**.


6.png "image_tooltip")


1. Click the **Available** tab.
2. Search for "**Sumologic Publisher**".
3. Click "Sumologic Publisher".
4. Click **Download now and install after restart**. You may need to restart Jenkins for the plugin to show up.


7.png "image_tooltip")

##### Manually installing the Jenkins plugin

This section shows you how to manually install the Jenkins plugin.

**To install the Jenkins Plugin, do the following:**

1. Download the Jenkins plugin HPI file from this [link](https://github.com/jenkinsci/sumologic-publisher-plugin/releases).
2. In the Jenkins console, go to **Manage Jenkins** > **Manage Plugins**.
3. Go to **Advanced > Upload Plugin **and click** Choose File**.


8.png "image_tooltip")


1. Select the downloaded **Sumologic-publisher.hpi** file from your machine and click **Upload**.


9.png "image_tooltip")


    A page similar to the following appears once the plugin is installed.



10.png "image_tooltip")


1. Select **Restart Jenkins when installation is complete and no jobs are running**. You may need to restart Jenkins for the plugin to appear.


11.png "image_tooltip")
The plugin is available on Jenkins plugin center. Ignore the version mentioned in the Jenkins Plugin update center.


##### Configure Jenkins Plugin

This task walks you through configuring the Jenkins Plugin for Sumo Logic.

**To configure the Jenkins Plugin, do the following:**


1. Go to **Jenkins > Manage Jenkins** and select **Configure System.**


12.png "image_tooltip")




1. Search for the **Sumo Logic Jenkins** **Plugin**.
2. In the Sumo Logic Jenkins Plugin dialog,  specify the following:
* **SumoLogic Portal Name** - This is the domain name of the hosted collector. For example, `service.sumologic.com` or `service.us2.sumologic.com`.
* **Metric Data Prefix**: Enter the name of the Jenkins Master on which plugin is installed.
* **HTTP Source URL**: HTTP Source URL from step 2. The HTTP source URL will look something like this: `https://sumologic_url/receiver/v1/http/SECRET_STRING`
* **Source Category**: This is the Source Category you defined for the source.
* **Keep Old Configuration for Jobs**: Enable this option to send old configuration for jobs.


13.png "image_tooltip")




1. Specify the types of data you want to send to Sumo Logic:
* **Metric Data** - Sends metric information.
* **Audit Logs** - Sends audit information like login, logouts, login failures, configuration changes to jobs and the Jenkins servers.
* **Periodic Logs** - Sends periodic information like node information, master information, shutdown events, Jenkins system logs.
* **SCM logs** - Send Source Control Management logs related to builds.
1. Specify the following:
* **Job Status Information**:** **Select to send status for all jobs
* **Console Logs Information**: Select to send console logs for all jobs
1. Jenkins plugin can be configured with an HTTP proxy. Once this is configured all the logs which are being sent from the Jenkins plugin will go through the proxy before getting ingested in sumo logic. Following are the parameters which are introduced to support the same:
* **Enable Proxy Setting (checkbox): **Check to Enable proxy setting
* **Proxy Host: **User to input the proxy server host-name here.
* **Proxy port: **Specify the port of the proxy server.
* **Enable Proxy Authentication(checkbox):  **Check to enable Authentication for the proxy. This can be used if the proxy is configured with authentication.
* **Username: **Username to be used for the proxy Authentication.
* **Password**: Password to be used for proxy authentication.
14.png "image_tooltip")

1. Click **Apply**, and then click **Save**.


##### Optional - Advanced Configuration

This section provides instructions for configuring Sumo Logic Jenkins Plugin for specific projects using Jenkins **configuration as code**. For more information see [configuration as code](https://jenkins.io/projects/jcasc/).

**To configure Sumo Logic Jenkins Plugin for specific projects using configuration as code, do the following:**



1. The plugin can be configured using **configuration as code** provided by Jenkins as detailed [in this document](https://jenkins.io/projects/jcasc/).
2. In case of specific jobs, do the following:
    1. For freestyle and maven Projects, go to J**ob Configuration **and in the Post-build Actions, select **Sumo Logic Build Logger.**


15.png "image_tooltip")


1. For Pipeline projects, do the following,
1. In the pipeline configuration, for normal script make the following as the top level.


```
SumoPipelineLogCollection {
// your script
```




16.png "image_tooltip")




1. Then, in the pipeline configuration, for declarative pipeline script update the option.


```
options {
SumoPipelineLogCollection()
}
```




17.png "image_tooltip")




1. Click **Apply**, and then click **Save**.


#### Sample Log Message

The following table shows sample log messages for different log types.


**INSERT TABLE**



#### Sample Query

This sample Query is from the **Jobs in Progress** panel of the **Jenkins - Job Overview** dashboard.


```
_sourceCategory=Labs/Jenkins/Sourabh/Logs In_Progress
| json "name", "result", "number" as Job_Name, Result, Job_Number
| where Result = "In_Progress"
| first(_raw) by Job_Name, Job_Number
| json field=_first "jobBuildURL", "label", "nodeName", "jobStartTime", "jobRunDuration" as Job_URL, Job_Label, Node_Name, Job_Start_Time, Job_Run_Duration nodrop
| where ![subquery : _sourceCategory=Labs/Jenkins/Sourabh/Logs Job_Status
| json "name", "number" as Job_Name, Job_Number   
| count by Job_Name, Job_Number
| compose Job_Number, Job_Name]
| tourl(Job_URL, Job_Name) as Job_URL
| count by Job_Name, Job_URL, Job_Label, Node_Name, Job_Start_Time, Job_Run_Duration, Job_Number
| fields Job_Name, Job_URL, Job_Label, Node_Name, Job_Start_Time, Job_Run_Duration, Job_Number
```



## Install the Jenkins App and view the Dashboards

This page provides instructions for installing the Sumo Logic App for Jenkins, as well as examples and descriptions for each of the app dashboards.


### Install the App

Now that you have set up collection for Jenkins you can install the Sumo Logic App for Jenkins, and use its pre-configured searches and dashboards.

**To install the app, do the following:**

Locate and install the app you need from the **App Catalog**. If you want to see a preview of the dashboards included with the app before installing, click **Preview Dashboards**.

1. From the **App Catalog**, search for and select the app**.**
2. Select the version of the service you're using and click **Add to Library**.


18.png "image_tooltip")
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


### Dashboard Filter with Template Variables      

Template variables provide dynamic dashboards that re-scope data on the fly. As you apply variables to troubleshoot through your dashboard, you can view dynamic changes to the data for a fast resolution to the root cause. For more information, see the [Filter with template variables](https://help.sumologic.com/Visualizations-and-Alerts/Dashboard_(New)/Filter_with_template_variables) help page.


19.png "image_tooltip")
You can use template variables to drill down and examine the data on a granular level.


### Jenkins - Overview

The **Jenkins - Overview** dashboard shows relationships between jobs and executors (worker nodes) on a Jenkins master. This dashboard provides insights into job run durations, status, physical memory, disk memory, and unused machines.

Use this dashboard to:



* Correlate job builds with Jenkins executors (worker nodes), physical memory utilization, disk space utilization, console logs, the number of executors used by jobs, and the number of unused (free) worker nodes.
* Identify worker nodes not used by Jenkins master jobs to understand worker node usage.
* Analyze job health by filtering data for a specific job to identify the console log errors, system errors, number of executors used, disk space utilization, physical memory utilization.
* Identify Jenkins master shutdown events.
* Analyze the jobs in the queue with job queue duration, reason, job URL.
* Generate alerts based on shutdown events, job run duration, physical memory utilization, disk space utilization, and more.


20.png "image_tooltip")



### System Monitoring Dashboards

System Monitoring Dashboards provide information on system activities related to master node metrics, job metrics, worker nodes, and audit activities. System Monitoring dashboards help you to monitor changes related to the Jenkins configuration, job configuration, the health of the Jenkins master, performance of the job queue and run duration, as well as the health of all worker nodes available to the Jenkins master node.


#### Jenkins - Audit Dashboard

The **Jenkins - Audit** dashboard provides insight into user events, including configuration changes, authentication events, and job activities.

Use this dashboard to:



* Ensure only authorized users are accessing the Jenkins System and are modifying Jenkins system and job configurations
* Keep track of the job configuration changes
* Compare old and new Jenkins system and job configuration settings
* View trends for Jenkins job start and finish events


21.png "image_tooltip")



#### Jenkins - Master Health Dashboard

The **Jenkins - Master Health** dashboard provides insight into the health of Jenkins master nodes with information on shutdown events, Jenkins system logs, and metrics events such as CPU, memory, job duration,  threads, and executors.

Executors are similar to threads that run jobs, so they are indicators of the load placed on Jenkins. If the executors are full, it means there are a lot of jobs running on the system and more executors may be needed to balance the load.

Use this dashboard to:



* Monitor shutdown events for Jenkins master nodes
* Monitor Jenkins system sogs to determine the root cause of system issues
* Monitor Jenkins master CPU usage and memory usage to allocate additional resources if neededMonitor free executors and busy executors on Jenkins master


22.png "image_tooltip")



#### Jenkins - Job Health Dashboard

The **Jenkins - Job Health** dashboard provides insight into the health of Jenkins jobs across various master nodes with information on job counts, job run duration, queue information, and garbage collection metrics.

Use this dashboard to:



* Monitor jobs in the queue, blocked and pending jobs to make sure your continuous integrations are running as expected
* Monitor garbage collection statistics  on the Jenkins master to understand how to improve performance and allocate additional resources if necessary


23.png "image_tooltip")



#### Jenkins - Node Health Dashboard

The **Jenkins - Node Health** dashboard provides insights into the health of all Jenkins master and worker nodes, with information on node details, recent builds, resource consumption, and node events.

Use this dashboard to:



* Monitor the health of all Jenkins nodes to understand and resolve potential bottlenecks
* Monitor  node resource utilization and resize if necessary
* Monitor removed nodes and node offline and launch failure events to ensure intended operations are being performed


24.png "image_tooltip")



### Job Monitoring Dashboards

Job Monitoring Dashboards provide information on job activities like job run duration, job status, test results, pipeline stages, and console Logs. Job monitoring dashboards help you monitor job duration, status, failed jobs, and test cases. You can determine stack trace failures, failed stages details, source control management details, job configuration changes, and stage-wise console logs.


#### Jenkins - Job Overview Dashboard

The **Jenkins - Job Overview** dashboard provides a high-level view of the job and builds status, trends, comparisons, and results.

Use this dashboard to:



* Monitor the total number of builds, successful and failed builds.
* Monitor recent builds and view detailed information in  the Jenkins console
* Monitor  job duration trends to understand how to improve the execution of various stages in the pipeline
* Monitor  jobs in progress, and in queue to determine how the pipelines are performing and make adjustments to the build process if needed
* Identify the slowest failed builds
* View trends for job results and use that information to identify source code components and teams that need the most improvements


25.png "image_tooltip")



#### Jenkins - Job Information Dashboard

The **Jenkins - Job Information** dashboard provides detailed information about a specific job. Panels show information on job URLs, duration trends, execution results, test case trends, slowest stages for pipeline jobs, console logs, and common errors.

Use this dashboard to:



* Monitor the total number of builds, successful builds, duration and failed builds for the job in question to understand how to best improve its execution going forward
*  Drilldown to Jenkins build information as needed
* Investigate common errors using console logs
* Investigate common stage failures
* Monitor recent configuration changes and commits to identify potential causes of failure


26.png "image_tooltip")



#### Jenkins - Build Information Dashboard

The **Jenkins - Build Information** dashboard provides detailed information about a specific build. Panels show information on build parameters, source control management, commit details, test cases, pipeline stages, console logs, and configuration changes prior to a build.

Use this dashboard to:



* Monitor parameters used for the build and source control management, such as Github Repository, to understand recent commits that have been added to the build.
* Investigate possible causes for build failure using configuration change before build details, test case failure, commit changes, pipeline stage failure, and console logs.
* Investigate the cause for failed test cases by analyzing stack traces.
* Investigate configuration changes before the build by comparing the old configuration and current configurations.
* Identify command failure for pipeline jobs using stage and stack trace information.



27.png "image_tooltip")

Jenkins - Pipeline Stage Monitoring

The **Jenkins - Pipeline Stage Monitoring** dashboard provides insights into pipeline performances.

Use this dashboard to:



* Identify which pipelines are taking the longest to complete.
* Drilldown to slowest stages and steps within each pipeline.
* Compare pipeline executions to identify which runs are slower or faster than others.
* Identify the failed pipeline stages and steps.


28.png "image_tooltip")
