---
title: Terraform
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/terraform.png')} alt="terraform" width="100"/>

***Version: 1.1  
Updated: Jun 22, 2023***

Terraform is an open-source infrastructure as code software tool that provides a consistent CLI workflow to manage cloud services.

## Actions

* **Get Account Details** *(Enrichment)* - Get your account details.
* **Get Organization** *(Enrichment)* - Show an organization.
* **Get Workspace** *(Enrichment)* - Show workspace.
* **Get Run Details** *(Enrichment)* - Show details of a specific run.
* **List Agent Pools** *(Enrichment)* - List agent pools, their agents, and their tokens for an organization.
* **List User Tokens** *(Enrichment)* - Retrieve contain metadata, and do not include the secret text of any authentication tokens.
* **List Organizations** *(Enrichment)* - List organizations.
* **List Workspaces** *(Enrichment)* - Lists workspaces in the organization.
* **Show Entitlement Set** *(Enrichment)* - Shows the entitlements for an organization.
* **Create Workspace** *(Containment)* - Create a workspace.
* **Create User Token** *(Containment)* - This endpoint returns the secret text of the created authentication token. A token is only shown upon creation, and cannot be recovered later.
* **Delete User Token** *(Containment)* - Destroy a User Token.
* **Create Configuration Version** *(Containment)* - Create a configuration version on the workspace.
* **Upload Configuration Files** *(Containment)* - Upload configuration files to configuration version.
* **Create Run** *(Containment)* - Create a run on the workspace.
* **Apply Run** *(Containment)* - Apply a run.

## Terraform configuration

1. Log in to Terraform. Click on your profile picture on the top right corner.
1. Click **User settings**.
1. In the left menu, under Tokens, click Create an API token button. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/terraform/terraform-1.png')} style={{border:'1px solid gray'}} alt="terraform" width="400"/>
1. Then add a description and create your API token.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/terraform/terraform-2.png')} style={{border:'1px solid gray'}} alt="terraform" width="600"/>
1. Use the copy button to save your token. This token **will not be displayed again**, so make sure to save it to a safe place.

## Configure Terraform in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

1. Access integrations in the [Automation Service](/docs/platform-services/automation-service/automation-service-integrations/#view-integrations) or [Cloud SOAR](/docs/cloud-soar/automation).
1. After the list of the integrations appears, search/look for the integration and click on the row.
1. The integration details will appear. Click on the **"+"** button to add new Resource.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/terraform/terraform-5.png')} style={{border:'1px solid gray'}} alt="terraform" width="400"/>
1. Populate all the required fields (\*) then click **SAVE SETTINGS**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/terraform/terraform-6.png')} style={{border:'1px solid gray'}} alt="terraform" width="400"/>
1. To make sure the resource is working, hover over the resource and then click the pencil icon that appears on the right.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/terraform/terraform-7.png')} style={{border:'1px solid gray'}} alt="terraform" width="400"/>
1. Click **TEST SAVED SETTINGS**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/terraform/terraform-8.png')} style={{border:'1px solid gray'}} alt="terraform" width="400"/>
1. You should receive a successful notification in the bottom right corner.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/terraform/terraform-9.png')} style={{border:'1px solid gray'}} alt="terraform" width="400"/>

## Change Log

* April 08, 2022 - First Upload
* June 22, 2023 (v1.1) - Updated the integration with Environmental Variables
