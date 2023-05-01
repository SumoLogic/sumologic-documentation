---
id: cis-aws-foundations-benchmark
title: CIS AWS Foundations Benchmark
description: Gain operational visibility into your AWS security posture using the Sumo Logic for CIS AWS Foundations Benchmark App, which maps to Section 3 (Monitoring) of the CIS AWS Benchmarks Foundation recommendations.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/amazon-aws/cisaws.png')} alt="Thumbnail icon" width="50"/>

The Center for Internet Security (CIS) is a 501(c)(3) organization dedicated to enhancing the cyber-security readiness and response among public and private sector entities. Utilizing its strong industry and government partnerships, CIS combats evolving cyber-security challenges on a global scale and helps organizations adopt key best practices to achieve immediate and effective defenses against cyber attacks.  

The CIS AWS Foundations Benchmark is a set of security configuration best practices for AWS. These industry-accepted best practices go beyond the high-level security guidance already available, providing AWS users with clear, step-by-step implementation and assessment procedures.

The Sumo Logic for CIS AWS Foundations Benchmark App maps to Section 3 (Monitoring) of the [CIS AWS Benchmarks Foundation ](https://d0.awsstatic.com/whitepapers/compliance/AWS_CIS_Foundations_Benchmark.pdf)recommendations. Using the pre-configured alerts and dashboards, customers are able to alert on and gain operational visibility into their AWS security posture.

## Log Types

The Sumo Logic App for CIS AWS Foundations Benchmark uses [CloudTrail](/docs/integrations/amazon-aws/cloudtrail.md) logs. For details on the specifics of which attributes are used, refer to Section 3 (Monitoring) of the [CIS AWS Benchmarks Foundation](https://d0.awsstatic.com/whitepapers/compliance/AWS_CIS_Foundations_Benchmark.pdf).


## Collecting Logs for the CIS AWS Foundation Benchmark App

### Configure Collector and Source

The CIS AWS Foundation Benchmark App ingests [AWS CloudTrail](/docs/integrations/amazon-aws/cloudtrail.md) data. To collect logs for the CIS AWS Foundation Benchmark App, perform the following steps:

1. Add a Sumo Logic [Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector) to your Sumo Logic Org.
2. Configure an [AWS CloudTrail Source](/docs/integrations/amazon-aws/cloudtrail#Collect-logs-for-the-AWS-CloudTrail-App).
3. Set your `_sourceCategory` (example: `aws/cloudtrail`).


## Installing the CIS AWS Foundations Benchmark App

Now that you have configured CIS AWS Foundation Benchmark, install the Sumo Logic App for CIS AWS Foundation Benchmark to take advantage of the preconfigured searches and dashboards to analyze your data.

{@import ../../reuse/app-install.md}

For context regarding the CIS AWS Foundation Benchmark App, check out this [blog](https://www.sumologic.com/blog/cis-aws-foundations-benchmark-monitoring/) where we describe the monitoring controls.


## Viewing the CIS AWS Foundations Benchmark Dashboards


### CIS AWS Foundations Benchmark App - Change Control

This Change Control Dashboard includes filters that you can use in Interactive Mode to further analyze your data.

**Config Changes.** Shows the count of configuration changes done by each user for the last 24 hours.

**IAM Policy Changes.** Shows the count of IAM policy changes done by each user for the last 24 hours.

**CloudTrail Changes.** Shows the count of CloudTrail changes done by each user for the last 24 hours.

**Gateway Changes.** Shows the count of Gateway changes done by each user for the last 24 hours.

**Route Table Changes.** Shows the count of Route Table changes done by each user for the last 24 hours.

**Network ACL Changes. **Shows the count of Network ACL changes done by each user for the last 24 hours.

**Security Group Changes.** Shows the count of Security Group changes done by each user for the last 24 hours.

**VPC Changes.** Shows the count of VPC changes done by each user for the last 24 hours.

**S3 Bucket Policy Changes.** Shows the count of S3 Bucket Policy changes done by each user for the last 24 hours.

<img src={useBaseUrl('img/integrations/amazon-aws/CIS AWS benchmark-overview.png')} alt="CIS AWS Foundations Benchmark" />


### CIS AWS Foundations Benchmark App - Access and Authentication

This Access and Authentication Dashboard includes filters that you can use in Interactive Mode to further analyze your data.

**Console Logins without MFA.** All users must be using multi-factor authentication. This Panel show the count of logins that are not using MFA, by user, for the last 24 hours.  

**Disabled and Scheduled Deletion of CMK.** Shows the count of CMKs that are disabled or scheduled to be deleted, by user, for the last 24 hours.

**Failed Console Logins.** Shows the count of failed logins by user, for the last 24 hours.

**Root Account Logins.** Shows the count of "root" account logins, by user, for the last 24 hours.

**Unauthorized AWS API Requests.** Shows the count of unauthorized API requests,  by user, for the last 24 hours.

**Failed Console Logins by Location.** Shows the count of failed logins by location, for the last 24 hours.

**Outlier - Failed Console Logins.** Identifies failed console logins outside of 3 standard deviations, for the last 24 hours.

<img src={useBaseUrl('img/integrations/amazon-aws/CIS AWS benchmark monitoring access auth dashboard.png')} alt="CIS AWS Foundations Benchmark" />
