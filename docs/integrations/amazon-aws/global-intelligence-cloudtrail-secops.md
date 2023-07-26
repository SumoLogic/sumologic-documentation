---
id: global-intelligence-cloudtrail-secops
title: Global Intelligence for AWS CloudTrail SecOps
description: The Global Intelligence for AWS CloudTrail App enables you to detect potentially malicious configuration changes in your AWS account by comparing AWS CloudTrail events in your account against a cohort of AWS customers.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/amazon-aws/gi-secops.png')} alt="Thumbnail icon" width="50"/>

The Global Intelligence for AWS CloudTrail App enables you to detect potentially malicious configuration changes in your AWS account by comparing [AWS CloudTrail](https://aws.amazon.com/cloudtrail/) events in your account against a cohort of AWS customers. CloudTrail events are curated from AWS penetration tests and operational best practices.

This application name is abbreviated to **GI CloudTrail** on these documentation pages, as well as in the application pages.

The App dashboard displays enable you to determine the following:
* How your attack surface compares to your peers
* [MITRE Attack Framework](https://attack.mitre.org/) tactics that are evident in your organization compared to your peers. MITRE ATT&CK is a globally-accessible knowledge base of adversary tactics and techniques based on real-world observations.  
* Resources that are impacted
* An action plan to improve security posture in your AWS infrastructure

The current scope of this application includes the following AWS services and associated resource types:
* **Amazon EC2**: count of compute instances, security groups, route tables and Amazon Machine Images
* **Amazon S3**: count of buckets
* **Amazon RDS**: count of database instances, DB security groups
* **Amazon Redshift**: count of database clusters and parameter groups
* **AWS Lambda**: count of function names
* **AWS IAM**: count of IAM users, roles and groups
* **AWS CloudTrail**: counts of trail instances


## Prerequisites

This feature is available in the following account plans.

| Account Type | Account level
| :---- | :----
|  Cloud Flex  |  Trial, Enterprise
| Cloud Flex Credits | Trial, Enterprise Suite, Enterprise Security


## Log Types  

Global Intelligence for AWS CloudTrail App uses AWS CloudTrail logs. When this app is initially installed, the dashboards appear with empty panels until scheduled searches are run and the indices are populated.

:::info Important Notes

<details><summary><strong>Click to Expand</strong><br/>This application relies on 45 Scheduled Searches that Save to two different Indexes and one Lookup Table. As a result, they will consume the related quotas for your account. The following is the list of Scheduled Searches:</summary>

* To reduce false positives, the benchmarks and application filter out AWS CloudTrail events from legitimate cloud services including AWS itself and CloudHealth by VMware.
* Security posture requirements may vary between AWS accounts for a given customer. For example, development accounts might have less strict controls than production accounts. The app supports filtering findings by AWS account ID to facilitate AWS account level posture assessment.
* The benchmarking models use cohorts calculated from similar AWS accounts.
* This app relies on scheduled searches that save to an index in order to update AWS CloudTrail events periodically. When you first install the app, these searches will take 24 hours to accumulate sufficient data for meaningful comparisons over a 24-hour duration. As a result, it is important that you wait for at least 24 hours after the app installation before using the insights from the app dashboards.
* Initially, when the app is installed, the dashboards will have empty panels until the scheduled searches have run and the indices are populated.
* Scheduled searches are prefixed with "gis_benchmarks" to allow users to isolate these searches in the Data Volume Index.
* If multiple AWS accounts are referenced in the AWS CloudTrail data, the graphs will show values for each benchmark and AWS account combination. To optimize experience, select one AWS Account ID in the application dropdown.
* Do not modify the 24-hour time range in the dashboards as the benchmark data and comparisons are based on a prior 24-hour comparison only.
* Do not modify the schedule and time range of the scheduled searches.
* Do not modify the lookups in the dashboard search queries.
* The panel “Summary of Notable Events and Recommended Actions” on the dashboard “04 Action Plan” will not work until the scheduled search “Event Priority computation” populates the required lookup.
* The "infer" operator is not intended for direct customer use -  modifying the queries will result in unexpected/incorrect results.
* For links to the CloudTrail events in the Action Plan dashboard watchlists to work, please make sure to set your Sumo Logic Region Code by clicking on the dashboard filter icon.
* The `infer` operator is not intended for use outside of Sumo Logic Global Intelligence apps.
* Install the Sumo Logic [Audit](/docs/integrations/sumo-apps/audit.md) App to monitor the health of scheduled searches. The following two dashboards of the Audit app will help look into details for scheduled searches
* [User Activity - Scheduled Searches](/docs/integrations/sumo-apps/audit#user-activity-scheduled-search)
* [Scheduled Searches - Triggered Summary](/docs/integrations/sumo-apps/audit#scheduled-search-triggered-summary)

</details>

:::



### Sample Log Message

```json
{
	"eventVersion":"1.05",
	"userIdentity":{
		"type":"IAMUser",
		"principalId":"AIDAJK3NPEULWEXAMPLE",
		"arn":"arn:aws:iam::224064EXAMPLE:user/username",
		"accountId":"2240example0808",
		"userName":"Pamelia@example.com"
	},
	"eventTime":"2020-01-11 00:42:12+0000",
	"eventSource":"signin.amazonaws.com",
	"eventName":"ConsoleLogin",
	"awsRegion":"us-example",
	"sourceIPAddress":"10.10.10.10",
	"userAgent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36",
	"requestParameters":null,
	"responseElements":{
		"ConsoleLogin":"Success"
	},
	"additionalEventData":{
		"LoginTo":"https://us-example.console.aws.amazon...sauthcode=true",
		"MobileVersion":"No",
		"MFAUsed":"Yes"
	},
	"eventID":"8fd88195-8576-example-8330cb492604",
	"eventType":"AwsConsoleSignIn",
	"recipientAccountId":"22406424example0808"
}
```

### Sample Query

The following sample query is from the **Unique AWS Resource Types** panel of **Dashboard 01: Attack Surface Benchmark**.
```sql
_sourceCategory=Labs/AWS/CloudTrail/Analytics
| json "eventSource", "errorCode" nodrop
| where isBlank(errorCode)
| count_distinct(eventSource) as count
| "ResourcesCount_Service" as benchmarkname
| fillmissing values("ResourcesCount_Service") in benchmarkname
| toInt(count) as count
| infer _category=cloudtrail _model=benchmark
| first(count) as MyCompany, first(lower_limit) as cohort_low, first(median) as cohort_median, first(upper_limit) as cohort_high by benchmarkname
```

In some cases, your query results may show `"HIDDEN_DUE_TO_SECURITY_REASONS"` as the value of the `userName` field. That's because AWS does not log the user name that was entered when a sign-in failure is caused by an incorrect user name.


## Collecting Logs for the GI for AWS CloudTrail SecOps App

This section provides an overview of the log collection process and instructions for configuring log collection for the Sumo Logic App for Gl CloudTrail.

If you have already AWS CloudTrail logs flowing into Sumo Logic, you can skip the steps in this section and [install the app](#installing-the-gi-for-aws-cloudtrail-secops-app).

The following illustration is a graphical representation of the process for collecting logs from AWS CloudTrail and delivering them to Sumo Logic.

<img src={useBaseUrl('img/integrations/amazon-aws/Collection_Process_Overview.png')} alt="Collection_Process_Overview" />


### Configuring Log Collection

To configure log collection for Global Intelligence for AWS CloudTrail, follow the steps described [here](/docs/integrations/amazon-aws/cloudtrail#Collect-logs-for-the-AWS-CloudTrail-App).


## Installing the GI for AWS CloudTrail SecOps App

Locate and install the app you need from the **App Catalog**. If you want to see a preview of the dashboards included with the app before installing, click **Preview Dashboards**.

Do not install the app more than once. Share a single copy of the app with other users in your organization.

To install the app, do the following:
1. From the **App Catalog**, search for and select the app.
2. To install the app, click **Add to Library** and complete the following fields.
    1. **App Name.** You can retain the existing name, or enter a name of your choice for the app. 
    2. **Data Source.** Select either of these options for the data source. 
        * Choose **Source Category**, and select a source category from the list. 
        * Choose **Enter a Custom Data Filter**, and enter a custom source category beginning with an underscore. Example: (`_sourceCategory=MyCategory`). 
    3. **Advanced**. Select the **Location in Library** (the default is the Personal folder in the library), or click **New Folder** to add a new folder.
3. Click **Add to Library**.

Once an app is installed, it will appear in your **Personal** folder, or other folder that you specified. From here, you can share it with your organization.


## Viewing GI CloudTrail Dashboards

This section provides descriptions and examples of the Global Intelligence for AWS CloudTrail App dashboards.


### 01 Attack Surface Benchmark

**GI CloudTrail - 01 Attack Surface Benchmark** dashboard provides insights into the volume, variety, and velocity of the AWS infrastructure that are correlated with greater breach risks. The number of distinct AWS services in use measures variety, the number of distinct AWS resources measures volume while CloudTrail events measure velocity. The volume dimension only counts resources from 7 services noted above while the variety dimension includes all services referenced in your AWS CloudTrail data. These factors are also used to cohort customers into peer groups. Configuration changes are baselined by peer group to compare the configuration changes of a company and their related breach risks.

<img src={useBaseUrl('img/integrations/amazon-aws/GI-CloudTrail-01Attack.png')} alt="GI CloudTrail" />

Use this dashboard to understand how your company compares to peers with respect to the following:
* Variety: Number of distinct services in use among EC2, S3, KMS, IAM, Lambda, Redshift and RDS
* Volume: Number unique AWS resources within each service
* Velocity: The number of create, update, or delete events across all resources within the company

### 02 Tactics and Techniques: My Company v. Peers

**GI CloudTrail - 02 Tactics and Techniques: My Company v. Peers** dashboard uses ATT&CK to organize tactics implied by AWS CloudTrail events that appear in your infrastructure and shows the comparison to other AWS customers in your peer group. MITRE ATT&CK is a globally-accessible knowledge base of adversary tactics and techniques based on real-world observations.  

<img src={useBaseUrl('img/integrations/amazon-aws/GI-CloudTrail-02-Tactics.png')} alt="GI CloudTrail" />

Use this dashboard to:

* Understand how attack tactics & techniques in my company differ from peers.
* Analyze findings organized by the following ATT&CK techniques:
    * Credential Access
    * Defense Evasion
    * Discovery
    * Execution
    * Exfiltration
    * Initial Access
    * Lateral Movement
    * Persistence
    * Privilege Escalation

### 03 Tactics by Resource Type: My Company v. Peers

**GI CloudTrail - 03 Tactics by Resource Type: My Company v. Peers** dashboard utilizes ATT&CK tactics implied by AWS CloudTrail events and maps them to the resources they impact. It also presents data for comparisons of your company impacted resources against that of your peers.

<img src={useBaseUrl('img/integrations/amazon-aws/GI-CloudTrail-03-Tactics.png')} alt="GI CloudTrail" />

Use this dashboard to:
* Understand tactics and techniques for my company versus peers.
* Analyze results organized by the following AWS services:
    * Amazon EC2: count of compute instances, security groups, route tables and Amaon Machine Images
    * Amazon S3: count of buckets
    * Amazon RDS: count of database instances, DB security groups
    * Amazon Redshift: count of database clusters and parameter groups
    * AWS Lambda: count of function names
    * AWS IAM: count of IAM users, roles and groups
    * AWS CloudTrail: counts of trail instances
    * S3 Tactics


### 04 Action Plan

**GI CloudTrail - 04 Action Plan** dashboard identifies the affected resources for every notable event. This data then enables you to create a proactive action plan for your environment.

<img src={useBaseUrl('img/integrations/amazon-aws/GI-CloudTrail-04-Action-Plan.png')} alt="GI CloudTrail" />

Use this dashboard to:

* Create an action plan from the findings of Global Intelligence for AWS CloudTrail.
* Implement and then review the progress of the plan.
