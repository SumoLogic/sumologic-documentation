---
title: AWS Athena
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/aws.png')} alt="automox" width="50"/>

***Version: 1.1  
Updated: Jun 15, 2023***

Amazon Athena is a cloud-based service that enables you to run SQL queries on data stored in Amazon S3 without the need to set up any infrastructure. It is a serverless, pay-per-query service that makes it easy to analyze large amounts of data.
  
* **Run Query** *(Enrichment)* - The action runs the SQL query statements contained in the Query and retrieve the results from the query.
* **Start Query** *(Enrichment)* - Start a query execution.
* **Get Query Execution** (*Enrichment*) - Returns the details of a single query execution or a list of up to 50 query executions.
* **Get Query Results** *(Enrichment)* - Streams the results of a single query execution specified by the Query Execution ID.
* **Cancel Query** (*Enrichment*) - Stops a query execution.
* **List Databases** (*Enrichment*) - Lists the databases in the specified data catalog.
* **List Workgroups** *(Enrichment)* - Lists available workgroups for the account.
* **List Table Metadata** (*Enrichment*) - Lists the metadata for the tables in the specified data catalog database.

## Amazon Athena configuration

To [get access key and secret access key](https://docs.aws.amazon.com/athena/latest/ug/key-management.html), you will need to follow these steps:

1. Sign in to your [AWS Management Console](https://console.aws.amazon.com/).
1. Click on your account name in the top-right corner of the screen and select **My Security Credentials** from the drop-down menu.
1. Click on the **Access keys** section in the left-hand menu.
1. Click on the **Create New Access Key** button.
1. Your new access key and secret access key will be displayed on the screen. Make sure to copy and save them in a secure location as you will not be able to access them again.

## Configure Amazon Athena in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationsAuthAWS from '../../../../reuse/integrations-authentication-aws.md';
import AWSRegions from '../../../../reuse/automation-service/aws/region.md';
import AWSAccesskey from '../../../../reuse/automation-service/aws/access-key.md';
import AWSSecret from '../../../../reuse/automation-service/aws/secret.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>

* <IntegrationLabel/>
* <AWSRegions/>
* <AWSAccesskey/>
* <AWSSecret/>
* <IntegrationTimeout/>
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/aws-athena-configuration.png')} style={{border:'1px solid gray'}} alt="AWS Athena configuration" width="400"/>

<IntegrationsAuthAWS/>

For information about Amazon Athena, see [Athena documentation](https://docs.aws.amazon.com/athena/).

## External Libraries

* [AWS Athena](https://github.com/boto/boto3/blob/develop/LICENSE)

## Change Log

* February 22, 2023 (v1.0) - First upload
* June 15, 2023 (v1.1) - Updated the integration with Environmental Variables
