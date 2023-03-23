---
id: collection-aws-govcloud
title: Collection from AWS GovCloud
sidebar_label: AWS GovCloud
description: AWS GovCloud regions are specific regions authorized to a FedRAMP-High baseline.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/AWSGovCloudUS-Logo.jpeg')} alt="icon" width="50"/>

AWS GovCloud regions are specific regions authorized to a FedRAMP-High baseline. This region is where users with strict compliance requirements may operate in adherence with ITAR, FedRAMP, and DoD requirements. See [AWS GovCloud](https://aws.amazon.com/govcloud-us/?whats-new-ess.sort-by=item.additionalFields.postDateTime&whats-new-ess.sort-order=desc) for more information.

While Sumo Logic does provide collection of logs and metrics from GovCloud regions, Sumo Logic does not itself run in AWS GovCloud. Be aware, collection of data from AWS GovCloud means your data will be leaving a FedRAMP-high environment. It is with great emphasis that you must recognize and understand that the responsibility to mitigate information spillage is solely yours. We do not have insight into your data nor how your data is classified.

Sumo Logic does provide collection to a Public Cloud offering in the AWS US-East region built out and authorized to FedRAMP-Moderate controls. We recommend that customers with elevated compliance and regulatory requirements use our Fed deployment. Read more about [Sumo Logic and FedRAMP](https://www.sumologic.com/blog/fedramp-moderate-authorization) or contact your account representative for more information.

The use of IAM roles is disabled when setting up authentication of collection services from GovCloud regions. As detailed in AWS's [documentation](https://docs.aws.amazon.com/govcloud-us/latest/UserGuide/govcloud-iam.html), IAM roles cannot be used to delegate access between an AWS GovCloud (US) account and a standard AWS account created in a GovCloud environment.
