---
title: Terraform
description: ''
tags: []
---

![](/img/platform-services/automation-service/app-central/logos/terraform.png)

Version: 1.1  
Updated: Jun 22, 2023

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

Login to Terraform. Click on your profile picture on the top right corner.

Click user settings.

In the left menu, under Tokens, click Create an API token button.

![](/img/platform-services/automation-service/app-central/integrations/terraform/terraform-1.png)  

Then add a description and create your API token.

![](/img/platform-services/automation-service/app-central/integrations/terraform/terraform-2.png)

Use the copy button to save your token.

This token **will not be displayed again**, so make sure to save it to a safe place.

## Terraform in Automation Service and Cloud SOAR

To configure the integration, log into the application, expand the configuration menu in the top right corner by hovering over the gear icon and click Automation.

![](/img/platform-services/automation-service/app-central/integrations/terraform/terraform-3.png)

In the Automation section, on the left menu, click Integrations.

![](/img/platform-services/automation-service/app-central/integrations/terraform/terraform-4.png)

After the list of the integrations appears, search/look for the integration and click on the row.

The integration details will appear. Click on the "+" button to add new Resource.

![](/img/platform-services/automation-service/app-central/integrations/terraform/terraform-5.png)

Populate all the required fields (\*) then click SAVE SETTINGS.

![](/img/platform-services/automation-service/app-central/integrations/terraform/terraform-6.png)

To make sure the resource is working, hover over the resource and then click the pencil icon that appears on the right.

![](/img/platform-services/automation-service/app-central/integrations/terraform/terraform-7.png)

Click Test Saved Settings.

![](/img/platform-services/automation-service/app-central/integrations/terraform/terraform-8.png)

You should receive a successful notification in the bottom right corner.

![](/img/platform-services/automation-service/app-central/integrations/terraform/terraform-9.png)

## Change Log

* April 08, 2022 - First Upload
* June 22, 2023 (v1.1) - Updated the integration with Environmental Variables
