---
title: October 1, 2025 - Application Update
hide_table_of_contents: true
image: https://assets-www.sumologic.com/company-logos/_800x418_crop_center-center_82_none/SumoLogic_Preview_600x600.jpg?mtime=1617040082
keywords:
  - automation service
  - cloud soar
  - soar
---

import useBaseUrl from '@docusaurus/useBaseUrl';

## September release

Following are the updates made in September.

### Changes and enhancements

#### Playbooks

- Enhanced playbook node results UI with intuitive action buttons and detailed node information and execution details.
- Added the ability to test nodes in playbooks. [Learn more](/release-notes-csoar/2025/09/10/application-update/).

#### Integrations

- Added new integration: [Microsoft EWS (Graph)](/docs/platform-services/automation-service/app-central/integrations/microsoft-ews-graph/).
- Added IAM support for the following AWS integrations:
[AWS Athena](/docs/platform-services/automation-service/app-central/integrations/aws-athena/), [AWS CloudFront](/docs/platform-services/automation-service/app-central/integrations/aws-cloudfront/), [AWS CloudTrail](/docs/platform-services/automation-service/app-central/integrations/aws-cloudtrail/), [AWS EC2](/docs/platform-services/automation-service/app-central/integrations/aws-ec2/), [AWS Inspector](/docs/platform-services/automation-service/app-central/integrations/aws-inspector/), [AWS Private Certificate Authority](/docs/platform-services/automation-service/app-central/integrations/aws-private-certificate-authority/), [AWS Route 53](/docs/platform-services/automation-service/app-central/integrations/aws-route53/), [AWS S3](/docs/platform-services/automation-service/app-central/integrations/aws-s3/), [AWS Simple Notification Service](/docs/platform-services/automation-service/app-central/integrations/aws-simple-notification-service/), [AWS SQS](/docs/platform-services/automation-service/app-central/integrations/aws-sqs/)

### Bug Fixes

#### Playbooks

- Fixed issue where multiple outputs of iterations of the same node are not shown separately in list view on the playbook execution page.
- Improved error handling with a toast message while attempting to clone a playbook with a duplicate name.
- Added line numbers to the Input field on the Start Node for easier error tracking in JSON parsing.

#### Integrations

- Action [Issues Jira Daemon] - Added new deamon action in the [Atlassian Jira Cloud](/docs/platform-services/automation-service/app-central/integrations/atlassian-jira-cloud/) integration.
- Integration [Zscaler] - Updated the exception handling for better error messages in all the actions and integration file for the [Zscaler](/docs/platform-services/automation-service/app-central/integrations/zscaler/) integration.
- Action [Splunk Alerts Daemon] - Improved timezone handling in alert queries and improved URL encoding to handle reserved characters in the [Splunk](/docs/platform-services/automation-service/app-central/integrations/splunk/) Integration.