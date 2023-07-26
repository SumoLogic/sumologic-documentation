---
id: cloudpassage-halo
title: CloudPassage Halo
sidebar_label: CloudPassage Halo
description: The CloudPassage Halo App enables security operators and administrators to correlate security events across their Halo-managed infrastructure.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/security-threat-detection/cloudpassage.png')} alt="thumbnail icon" width="75"/>

The CloudPassage Halo App helps you detect security violations and look for threats across your complex infrastructure, through the analysis of massive volumes of Halo event data. CloudPassage’s Halo platform records over eighty different types of security events about your Halo-managed infrastructure, whether you deploy into public cloud environments or your private data center. These events deliver information about your infrastructure and include critical security alerts for firewall changes, access changes, configuration changes, and file integrity changes, and more.

You can leverage the security visibility provided by CloudPassage's Halo platform with Sumo Logic’s correlation and visualization capabilities to deliver a security reporting and analysis tool. This App enables security operators and administrators to correlate security events across their Halo-managed infrastructure.


## Collecting Logs for the CloudPassage Halo App

The CloudPassage Halo App uses the Halo REST API and AWS Lambda to collect Halo events.  

To collect CloudPassage Halo logs for Sumo Logic you need to configure:

* Two Sumo Logic hosted collectors.
* Two Lambda functions to call Halo’s REST APIs and forward Halo events to Sumo Logic.

<img src={useBaseUrl('img/integrations/security-threat-detection/CloudPassage2.png')} alt="cloudpassage" />


### Sumo Logic Collector Configuration

If this is the first time you are creating an HTTPS collector, review how to create an [HTTP source](/docs/send-data/hosted-collectors/http-source/logs-metrics). Then, follow the instructions on how to [create a collector](#Create-the-collector).


#### Create the collector

1. Click **Manage** **Data** > **Collection** > **Add Collector**.
2. Click **Hosted Collector.**
3. In **Add Hosted Collector** enter:
   * **Name.** Halo_Lambda_Ingestor.
   * **Description.** Halo Events Collector.
   * **Category. **CP_Halo.
   * And click **Save**.
4. Click OK to add a source to your collector.
5. Select **HTTP** as the source type.
6. Enter the information as below for **Halo Security Events**.
   * **Name.** CP_Halo_Workload_Security_Events_Collector.
   * **Description.** Halo Security Events Collector.
   * **Source Host. **CP_Halo.
   * **Source Category.** halo/workload/security/events
7. Click **Save.** Be sure to note the endpoint URL provided for this collection. You will need it later.
8. Create a second source.
9. Click **Hosted Collector.**
10. Select **HTTP** as the source type.
11. Enter the information as below for **Halo Metric Events**.
   * **Name.** CP_Halo_Metrics_Collector.
   * **Description.** Halo key metrics collector.
   * **Source Host. **CP_Halo.
   * **Source Category.** halo/metrics.
12. When you are done, you should have two collections **CP_Halo_Metrics_Collector** and  **CP_Halo_Workload_Security_Events_Collector** set up under a single collector **Halo_Lambda_Ingestor**.


### CloudPassage Halo

You will need your CloudPassage login to set up CloudPassage Halo.

To set up CloudPassage Halo, do the following:

1. Use the official [CloudPassage documentation](https://www.cloudpassage.com/) to set up CloudPassage. You will need your CloudPassage login.
2. Follow the instructions on how to create a [read-only API key](https://library.cloudpassage.com/help/working-with-groups#api-keys) for the App.


### AWS Configuration

If this is the first time you are using the SQS, it is strongly recommended to go through [Quick start with SQS](http://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-getting-started.html) first.

**SQS (Simple Queue Service)**: This queue stores one message at any given time.  It contains “the last time (in Zulu format)” the script ran to collect the events from Halo.  The message is then deleted and new one (with the current time in Zulu format) is added into the queue.

The queue is automatically created the first time you run the **Halo_events_to_SumoLogic** Lambda code.


#### Lambda Functions

If this is the first time you are using the Lambda, it is strongly recommended to go through [Quick start with Lambda](http://docs.aws.amazon.com/lambda/latest/dg/getting-started.html) first.


#### Recommended configuration

Download the Python code from the following two zip file links:

* [Halo_events_to_SumoLogic.zip](https://github.com/cloudpassage/halo-sumologic/raw/master/Halo_events_to_SumoLogic.zip) - Python Lambda code to collect Halo events and forward them to Sumo Logic. This Python Lambda code would use Halo’s API to collect the security events reported by the agents installed in your workloads.  It takes the “last time” the Lambda code ran from the SQS.  Then initiate API call(s) to request any events that has been reported between the “last time” the Lambda code ran and the current time. It uses the SQS to store the “last time” the event was collected.
* [Halo_metrics_to_SumoLogic.zip](https://github.com/cloudpassage/halo-sumologic/raw/master/Halo_metrics_to_SumoLogic.zip) - Python Lambda code to collect Halo metrics and forward them to Sumo Logic. This Python Lambda code would use Halo’s API to collect the key stats from your Halo account.   


#### Configure AWS Lambda for Halo_events_to_SumoLogic

Sample policy: Be sure to use the proper permission level.

1. Configure Lambda.

2. Click **Blank Function**.

3. Click **Next.**
4. Fill in **Configure Function** with: \
**Name.** halo_events_to_sumologic.
**Runtime.** Python 2.7.


5. Change **Code entry Type **to **Upload a .ZIP** file.  And upload the **Halo_events_to_SumoLogic.zip** file.  Then enter in the environment variables with proper values (refer to the steps above).


6. Fill in the information to match the screenshot below.  Enter **halo_events_to_sumologic.lambda_handler** for **Handler**.  Then select “Create a custom role” for **Role**.


7. Fill in the information to match the screenshot below.  Select “Choose a new IAM Role” for IAM Role and **lambda_basic_execution** for **Role Name**.

8. Change the **Timeout** to **4 minutes** under **Advanced Settings**.
9. Verify all the information is entered correctly. Then click **Create Function** to proceed.

The screenshot does not have values for the Environment Variables.  But you should have entered it with your information.
10. Now we need to create an IAM role. Select **IAM**.
11. Select **lamda_basic_execution** role that was created in the previous step.
12. Select **AmazonSQSFullAccess** and **AWSLambdaBasicExecutionRole** for the policies. If you don’t have these policies, refer to the AWS manual and next few steps to create them.
13. Here is the sample policy for the **AmazonSQSFullAccess**.  Make sure you change the permission to meet your security requirements.
Sample policy: Use a proper permission level. Below is a sample.
```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "sqs:*”
      ],
       "Effect": "Allow",
       "Resource": "*"
       }
   ]
}
```

14. Here is the sample policy for **AWSLambdaBasicExecutionRole**. Make sure you change the permission to meet your security requirements.
```json
{
    "Version": "2012-10-17",
    "Statement": [{
        "Effect": "Allow",
        "Action": [
            "logs:CreateLogGroup",
            "logs:CreateLogStream",
            "logs:PutLogEvents"
        ],
        "Resource": "*"
    }]
}
```
15. Let’s test the Lambda code. Click on **Test** and then **Save** and test to start the code.
16. If it is configured properly, it should create the SQS queue for you.  And the outcome should look something similar to below.  Result should show you the time in Zulu format and Log Output should include [create_queue].


17. If you check the SQS dashboard, you will see the new queue, **last_time_scan**, has been created for you automatically.
18. Let's create a trigger for our Lambda code.  I want this code to run every 5 minutes. Select Triggers from the tab.  Then click **Add trigger**.

19. Then click on the blank square to bring out the pulldown menu.  Select **CloudWatch Events - Schedule**.

20. Fill in the information and make sure you set the** Schedule expression **as **rate(5 minutes)**.


21. A successfully configured trigger will have a success message and appear similar to the trigger below.

22.  You are done for the first Lambda code!  You can follow the same steps to configure **Lambda for Halo_metrics_to_SumoLogic**.


## Installing the CloudPassage Halo App

Now that you have configured CloudPassage Halo, install the Sumo Logic App for CloudPassage Halo to take advantage of the preconfigured searches and dashboards to analyze your data.

{@import ../../reuse/apps/app-install.md}

## Viewing CloudPassage Dashboards

### Overview

View counts of key information for you system as well as top and bottom 10 processes for Linux, top and bottom 10 services for Windows, and top and bottom 10 software vulnerabilities found by CloudPassage Halo.

* **Critical Issues / Non-Critical Issues. **Number of critical and non-critical issues  (Single Number Panel with 15min time range).
* **Severity(Active) Count.** Number of active workloads (Single Number Panel with 15min time range)
* **Number of OS Types.** Number of OS types found from each and every workloads managed by Halo (Single Number Panel with 15min time range)
* **Number of Processes.** Number of processes found from each and every workloads managed by Halo  (Single Number Panel with 15min time range)
* **Number of User Accounts**. Number of user accounts found from each and every workloads managed by Halo (Single Number Panel with 15min time range.
* **Number of SWs.** Number of SW packages found from each and every workloads managed by Halo (Single Number Panel with 15min time range)
* **Halo Related Security Events and Metrics. **This is a line graphs for Halo related events and metrics from the account (Line graph with running average with 24hrs time range)
* **Top 10 Linux Processes / Bottom 10 Linux Processes. **Top & Bottom 10 Linux processes found from the workloads managed by Halo (Table panel with 7min time range)
* **Top 10 Windows Services / Bottom 10 Windows Services**. Top & Bottom 10 Windows services found from the workloads managed by Halo (Table panel with 7min time range
* **Top 10 SW Vulnerabilities / Bottom 10 SW Vulnerabilities.** Top & Bottom 10 software vulnerabilities found from the workloads managed by Halo (Table panel with 7min time range)

<img src={useBaseUrl('img/integrations/security-threat-detection/CloudPassage_overview_dashboard.png')} alt="cloudpassage dashboards" />

### Critical Events

View critical issues for the last 24 hours, outliers for the critical issues threshold during that time, and compare today's critical issues and outliers with the previous day.

* **Critical Issues Over Time.** View a count of critical issues over the last 24 hours, timesliced by every 5 minutes.
* **Critical Issues Outlier.** View outliers outside the established threshold for critical issues over the last 24 hours, timesliced by every 5 minutes.
* **Outlier on Delta (today - yesterday) of Critical Issues.** View the outlier difference between the count of issues today and yesterday

<img src={useBaseUrl('img/integrations/security-threat-detection/CloudPassage_CriticalEvents_Dashboard.png')} alt="cloudpassage dashboards" />
