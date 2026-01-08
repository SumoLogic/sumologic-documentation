---
id: aws-security-hub-ocsf
title: AWS Security Hub - OCSF
sidebar_label: AWS Security Hub - OCSF
keywords: [Open Cybersecurity Schema Framework, AWS Security Hub, Amazon OCSF, AWS integration service ]
description: This app offers a centralized, structured view into your AWS security findings using the Open Cybersecurity Schema Framework (OCSF).
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/cloud-security-monitoring-analytics/security-qs.png')} alt="Thumbnail icon" width="50"/>

The **AWS Security Hub – OCSF** app offers a centralized, structured view into your AWS security findings using the Open Cybersecurity Schema Framework (OCSF). This app is designed to help security teams identify threats, track compliance violations, and investigate affected resources with speed and clarity.

With pre-configured dashboards and in-depth visualizations, this app helps you to monitor findings by severity, region, account, and classification. You can assess security trends over time, evaluate cloud resource exposure, and analyze the effectiveness of your cloud security posture across multiple AWS services.

Whether you need to investigate recent security events, track compliance gaps against key industry standards like PCI or NIST, or prioritize remediation by impacted resources, this app provides actionable insights in one place. Designed for both strategic oversight and tactical response, the app streamlines cloud security operations and supports better decision-making across teams.

:::info
This app includes [built-in monitors](#aws-security-hub---ocsf-alerts). For details on creating custom monitors, refer to [Create monitors for AWS Security Hub - OCSF app](#create-monitors-for-aws-security-hub---ocsf-app).
:::

## Log types

The AWS Security Hub - OCSF app uses the [Security Hub Findings](https://docs.aws.amazon.com/securityhub/latest/userguide/security-hub-adv-ocsf-findings.html) log types.

### Sample log message

```json title="Findings"
{
  "version": "0",
  "id": "994b02ab-3ee4-9576-abcb-6a920op2c085",
  "detail-type": "Findings Imported V2",
  "source": "aws.securityhub",
  "account": "869728294964",
  "time": "2025-07-22T03:03:15Z",
  "region": "us-east-1",
  "resources": [
    "1d24e91799652d9e17025b61d94f436b20b515b6f3cd9bda788f48c1db9cf244"
  ],
  "detail": {
    "findings": [
      {
        "activity_id": 2,
        "activity_name": "Update",
        "category_name": "Findings",
        "category_uid": 2,
        "class_name": "Detection Finding",
        "class_uid": 2004,
        "cloud": {
          "account": {
            "type": "AWS Account",
            "type_id": 10,
            "uid": "869728294964"
          },
          "cloud_partition": "aws",
          "provider": "AWS",
          "region": "us-east-1"
        },
        "comment": "John's testing",
        "count": 264,
        "evidences": [
          {
            "api": {
              "operation": "DeleteTrail",
              "service": {
                "name": "cloudtrail.amazonaws.com"
              }
            },
            "data": {
              "affected_resource": {
                "AWS::CloudTrail::Trail": "Aws-Observability-e2esumoqeui"
              },
              "resource_role": "TARGET"
            }
          }
        ],
        "finding_info": {
          "analytic": {
            "type": "Rule",
            "type_id": 1,
            "uid": "b4c71b47fb852d3fc0e99a82fa2841aa"
          },
          "created_time": 1729766226938,
          "created_time_dt": "2024-10-24T10:37:06.938Z",
          "desc": "AWS CloudTrail trail Aws-Observability-e2esumoqeui was disabled by cis_automation calling DeleteTrail under unusual circumstances. This can be attackers attempt to cover their tracks by eliminating any trace of activity performed while they accessed your account.",
          "first_seen_time": 1729765286000,
          "first_seen_time_dt": "2024-10-24T10:21:26.000Z",
          "last_seen_time": 1753152734000,
          "last_seen_time_dt": "2025-07-22T02:52:14.000Z",
          "modified_time": 1753153354272,
          "modified_time_dt": "2025-07-22T03:02:34.272Z",
          "product": {
            "uid": "b4c71b47fb852d3fc0e99a82fa2841aa"
          },
          "title": "An AWS CloudTrail trail Aws-Observability-e2esumoqeui was disabled.",
          "types": [
            "Stealth:IAMUser/CloudTrailLoggingDisabled"
          ],
          "uid": "arn:aws:guardduty:us-east-1:869728294630:detector/b4c71b47fb852d3fc0e99a82fa2841aa/finding/06c95f0cfdfd3b579b977e20e9da1aa4",
          "uid_alt": "06c95f0cfdfd3b579b977e20e9da1aa4"
        },
        "metadata": {
          "product": {
            "name": "GuardDuty",
            "uid": "arn:aws:securityhub:us-east-1::productv2/aws/guardduty",
            "vendor_name": "AWS"
          },
          "profiles": [
            "cloud",
            "datetime"
          ],
          "uid": "1d24e91799652d9e17025b61d94f436b20b515b6f3cd9bda788f48c1db9cf244",
          "version": "1.5.0"
        },
        "remediation": {
          "desc": "Please review the remediation guidance provided in the referenced documentation",
          "references": [
            "https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_finding-types-iam.html#stealth-iam-cloudtrailloggingdisabled"
          ]
        },
        "resources": [
          {
            "cloud_partition": "aws",
            "data": {
              "access_key_id": "ASIA4U76YS3TB3MEOA3O",
              "principal_id": "AROA4U76YS3THXXBAIOOA:aws-go-sdk-1753152318418995274",
              "user_name": "cis_automation",
              "user_type": "AssumedRole"
            },
            "name": "cis_automation",
            "owner": {
              "account": {
                "type": "AWS Account",
                "type_id": 10,
                "uid": "869728294964"
              }
            },
            "region": "us-east-1",
            "type": "AWS::IAM::AccessKey",
            "uid": "ASIA4U76YS3TEOA3O"
          }
        ],
        "severity": "Low",
        "severity_id": 2,
        "status": "Suppressed",
        "status_id": 3,
        "time": 1753153354272,
        "time_dt": "2025-07-22T03:02:34.272Z",
        "type_name": "Detection Finding: Update",
        "type_uid": 200402,
        "vendor_attributes": {
          "severity": "Low",
          "severity_id": 2
        }
      }
    ]
  }
}
```

### Sample query

```sql total="Total Findings"
_sourcecategory="yl/webhook" category_name activity_name
| json "detail.findings[0]" as finding nodrop
| json field=finding "finding_info.uid","finding_info.first_seen_time","finding_info.last_seen_time","finding_info.modified_time", "finding_info.modified_time_dt", "severity","cloud.account.uid","status","compliance.status","finding_info.types","cloud.region","class_name","finding_info.analytic.category","activity_name","metadata.product.name","metadata.product.vendor_name","resources[*]","finding_info.title","remediation.desc","remediation.references[0]","evidences[*].data.resource_role" as finding_id,finding_first_seen_time,finding_last_seen_time,finding_modified_time,finding_info_modified_time_dt,severity,aws_account_id,finding_status,compliance_status,finding_types,cloud_region,class_name,category_name,activity_name,product_name,vendor_name,resources,title,remediation_description,remediation_references,evidences_data_resource_roles nodrop
| topk(1, finding_modified_time) by finding_id
| parse regex field=resources "(?<resource>\{(?:[^\{\}]|\{(?:[^\{\}]|\{[^\{\}]*\})*\})*\})" multi
| json field=resource "type","uid","name","owner.account.uid","region" as resource_type,resource_name,resource_title,resource_account_id,resource_region nodrop

// global filters
| where if ("{{aws_account_id}}" = "*", true, aws_account_id matches "{{aws_account_id}}")
| where if ("{{severity}}" = "*", true, severity matches "{{severity}}")
| where if ("{{finding_status}}" = "*", true, finding_status matches "{{finding_status}}")
| where if ("{{compliance_status}}" = "*", true, compliance_status matches "{{compliance_status}}")
| where if ("{{aws_region}}" = "*", true, cloud_region matches "{{aws_region}}")
| where if ("{{class_name}}" = "*", true, class_name matches "{{class_name}}")
| where if ("{{finding_activity}}" = "*", true, activity_name matches "{{finding_activity}}")
| where if ("{{finding_category}}" = "*", true, category_name matches "{{finding_category}}")
| where if ("{{resource_type}}" = "*", true, resource_type matches "{{resource_type}}")
| where if ("{{resource_name}}" = "*", true, resource_name matches "{{resource_name}}")

// panel specific
| count by finding_id
| count
```

## Set up collection

This integration enables the ingestion of AWS Security Hub findings into Sumo Logic using Amazon EventBridge and a Sumo Logic HTTP Source. It provides a scalable and real-time pipeline: **Security Hub** > **EventBridge** > **Sumo Logic HTTP Source**

### Step 1: Create an HTTP Source in Sumo Logic

1. To create an HTTP source in Sumo Logic, refer to [Configure an HTTP Logs and Metrics Source](/docs/send-data/hosted-collectors/http-source/logs-metrics/#configure-an-httplogs-and-metrics-source).
1. After creation, copy and save the **HTTP Source URL** and **Source Category** for further steps.

### Step 2: Configure EventBridge API destination

Follow the below steps to configure the EventBridge API destination:

1. Sign in to your [AWS Eventbridge Console](https://aws.amazon.com/eventbridge/).
1. In the navigation bar, click **API destinations**.
1. Click **Create destination**.
1. Enter a name for the API Destination.
1. Provide the HTTP Source URL collected from [Step 1](#step-1-create-an-http-source-in-sumo-logic).
1. Click **Create a new connection** to create a connection for the API destination.
    1. Provide a connection name.
    1. Keep the **API Type** as **Public**.
    1. In the **Authorization type** select **Basic (Username/Password)** and add any value of your choice for Username and Password.

### Step 3: Create the EventBridge rule

Follow the below steps to create the EventBridge rule:

1. Sign in to your [AWS Eventbridge Console](https://aws.amazon.com/eventbridge/)..
1. In the navigation bar, click **Rules**.
1. Set the event source to **AWS services** and then select **Security Hub** as the AWS service.
1. Select **All Events** in the **Event Type**.
1. Under **Select targets**, choose **EventBridge API destination**.
1. Select the API Destination created in [Step 2](#step-2-configure-eventbridge-api-destination).
1. Select **Create a new role for this specific resource** in the **Execution role**.
1. Click **Create** to activate the rule.

Once the rule is active, **Security Hub findings** will automatically be sent to the configured Sumo Logic HTTP source.

## Installing the AWS Security Hub - OCSF app

import AppInstall2 from '../../reuse/apps/app-install-v2.md';

<AppInstall2/>

## Viewing AWS Security Hub - OCSF dashboards

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

<ViewDashboards/>

### Overview

The **AWS Security Hub - OCSF - Overview** dashboard delivers a broad, real-time snapshot of your AWS Security Hub findings. It provides high-level insight into alert volume, severity distribution, account-level risk, and compliance status across your AWS environment.

These dashboard panels help you to track findings over time, analyze spikes in critical issues, and assess which accounts or regions are experiencing the most significant activity. You can also drill into findings by classification, category, type, or vendor to understand threat sources and affected services.

Additionally, this dashboard highlights recently discovered findings and affected resources, helping teams quickly spot emerging risks. Use this dashboard to stay informed of your overall security posture and to surface high-priority issues that demand immediate attention.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AWS-Security-Hub-OCSF/AWS-Security-Hub-OCSF-Overview.png')} alt="AWS Security Hub - OCSF - Overview Dashboard" style={{border: '1px solid gray'}} />

### Compliance Summary

The **AWS Security Hub - OCSF - Compliance Summary** dashboard provides a focused analysis of your AWS compliance posture, aggregating finding data across key compliance standards. The dashboard highlights the failures that occurs across accounts, resources, and time, providing teams the visibility needed to assess audit readiness and take corrective action.

It surfaces trends in compliance violations, enabling you to monitor status changes, detect regressions, and evaluate severity distribution. You can also identify the top misconfigured resources and non-compliant AWS accounts, helping prioritize efforts to improve adherence to security frameworks.

This dashboard is ideal for security and compliance teams who need to ensure ongoing alignment with internal policies and external regulatory standards.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AWS-Security-Hub-OCSF/AWS-Security-Hub-OCSF-Compliance-Summary.png')} alt="AWS Security Hub - OCSF - Compliance Summary Dashboard" style={{border: '1px solid gray'}} />

### Regulatory Compliance

The **AWS Security Hub - OCSF - Regulatory Compliance** dashboard presents an in-depth view of your organization's alignment with major cloud security benchmarks and compliance standards, such as AWS Foundational Security Best Practices, CIS Benchmarks, NIST publications, and PCI DSS.

The dashboard shows pass percentages and summary details for each standard, allowing teams to compare compliance levels across frameworks. With this level of granularity, security and governance teams can pinpoint specific areas of misalignment, measure improvement over time, and tailor remediation efforts by standard.

Use this dashboard to assess policy adherence in detail, validate control coverage, and support audit processes with clearly segmented compliance insights.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AWS-Security-Hub-OCSF/AWS-Security-Hub-OCSF-Regulatory-Compliance.png')} alt="AWS Security Hub - OCSF - Regulatory Compliance Dashboard" style={{border: '1px solid gray'}} />

### Resources Affected

The **AWS Security Hub - OCSF - Resources Affected** dashboard helps security teams understand which AWS resources are impacted by security findings and where those resources are distributed across cloud accounts and regions.

By organizing data by resource type, severity, and geography, this dashboard helps prioritize remediation based on criticality and business impact. You can identify top affected resource names, evaluate role-based exposure, and explore findings across various infrastructure layers.

With this information, teams can quickly assess the blast radius of an incident, uncover systemic misconfigurations, and take action to protect their most sensitive and critical cloud assets.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AWS-Security-Hub-OCSF/AWS-Security-Hub-OCSF-Resources-Affected.png')} alt="AWS Security Hub - OCSF - Resources Affected Dashboard" style={{border: '1px solid gray'}} />

### Action Plan

The **AWS Security Hub - OCSF - Action Plan** dashboard provides a tactical view into common misconfigurations and high-risk behaviors across your AWS environment. It surfaces key remediation opportunities such as exposed credentials, weak password policies, non-compliant security group rules, public access violations, and critical S3 and EC2 misconfigurations.

This dashboard helps operationalize findings by translating alerts into prioritized action items. Security teams can easily pinpoint unused credentials, monitor MFA adoption, and address overly permissive network settings or encryption gaps.

Use this dashboard to drive remediation workflows, reduce the attack surface, and continuously improve your cloud security hygiene through targeted action.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AWS-Security-Hub-OCSF/AWS-Security-Hub-OCSF-Action-Plan.png')} alt="AWS Security Hub - OCSF - Action Plan Dashboard" style={{border: '1px solid gray'}} />

## Create monitors for AWS Security Hub - OCSF app

import CreateMonitors from '../../reuse/apps/create-monitors.md';

<CreateMonitors/>

### AWS Security Hub - OCSF alerts

| Name | Description | Trigger Type (Critical / Warning / MissingData) | Alert Condition | 
|:--|:--|:--|:--|
| `Critical Severity Findings` | This alert is triggered when a finding with critical severity is detected, indicating a high-impact threat that requires immediate attention and remediation. | Critical | Count > 0 | 
| `High Severity Findings` | This alert is triggered when a high-severity finding is generated, signaling a significant security issue that should be investigated promptly. | Critical | Count > 0|
| `S3 Bucket Access Violation` | This alert is triggered when a finding indicates that an S3 bucket lacks proper access controls or configurations that may expose data to unauthorized access. Alert is activated when the finding matches any of the following:<br/><ul><li>S3 general purpose buckets should have block public access settings enabled.</li><li>S3 general purpose buckets should block public read access</li><li>S3 general purpose buckets should block public write access.</li> <li>S3 general purpose bucket policies should restrict access to other AWS accounts.</li> <li>S3 general purpose buckets should block public access</li> <li>S3 general purpose buckets should have server access logging enabled.</li> <li>S3 general purpose buckets with versioning enabled should have Lifecycle configurations.</li> <li>ACLs should not be used to manage user access to S3 general purpose buckets.</li> <li>S3 access points should have block public access settings enabled.</li> <li>S3 Multi-Region Access Points should have block public access settings enabled.</li></ul><br/>These misconfigurations significantly increase the risk of data exposure or unauthorized access to sensitive resources. | Critical | Count > 0 |
| `Security Groups Allowing Unrestricted Access` | This alert is triggered when a finding identifies overly permissive security group rules that could expose cloud resources to unauthorized access. Alert is activated when the finding matches any of the following:<br/><ul><li>Security groups should not allow unrestricted access to ports with high risk.</li> <li>Security groups should not allow ingress from `0.0.0.0/0` or `::/0` to port `3389` or `22`.</li> <li>EC2 security groups should not allow ingress from `0.0.0.0/0` or `::/0` to the remote server administration ports.</li></ul> <br/> These configurations can create open attack surfaces and significantly increase the likelihood of brute-force attacks, lateral movement, or unauthorized remote access.| Critical | Count > 0 |
| `Public Access Violations` | This alert is triggered when publicly accessible cloud resources, such as S3 buckets, CloudTrail log storage, or KMS keys are detected. These cloud resources pose a significant risk of data leakage or unauthorized access. Alert is activated when the finding matches any of the following: <br/> <ul><li>S3 general purpose buckets should have block public access settings enabled.</li> <li>S3 general purpose buckets should block public read access.</li> <li>S3 general purpose buckets should block public write access.</li> <li>S3 general purpose buckets should block public access.</li> <li>S3 access points should have block public access settings enabled.</li> <li>Ensure the S3 bucket used to store CloudTrail logs is not publicly accessible.</li> <li>KMS keys should not be publicly accessible</li></ul> <br/> These above findings highlight the misconfigurations that can expose sensitive data or services to the public internet and should be remediated promptly. | Critical | Count > 0 |

## Upgrade/Downgrade the AWS Security Hub - OCSF app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the AWS Security Hub - OCSF app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>
