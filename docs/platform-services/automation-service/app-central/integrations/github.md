---
title: GitHub
description: ''
tags: []
---

![](/img/platform-services/automation-service/app-central/logos/github.png)

Version: 1.5  
Updated: Jul 06, 2023

**GitHub** is an Internet hosting service for software development and version control using Git. It provides the distributed version control of Git plus access control, bug tracking, software feature requests, task management, continuous integration, and wikis for every project

## Actions

* **List Organizations** (*Enrichment*) - List organizations for the authenticated user
* **List Organization Members** (*Enrichment*) - List all users who are members of an organization
* **List Organization Repositories** (*Enrichment*) - Lists repositories for the specified organization
* **List Commits** (*Enrichment*) - List commits in repository
* **Get Commit** (*Enrichment*) - Returns the contents of a single commit reference
* **Get Commit By URL** (Enrichment) - Returns details of a commit by providing url

## GitHub in Automation Service and Cloud SOAR

1. To configure the integration, log into the application, expand the configuration menu in the top right corner by hovering over the gear icon and click Automation. <br/>![](/img/platform-services/automation-service/app-central/integrations/github/github-1.png)

1. In the Automation section, on the left menu, click Integrations. <br/>![](/img/platform-services/automation-service/app-central/integrations/github/github-2.png)

1. After the list of the integrations appears, search/look for the integration and click on the row.

1. The integration details will appear. Click on the "+" button to add new Resource. <br/>![](/img/platform-services/automation-service/app-central/integrations/github/github-3.png)

1. Populate all the required fields (\*)
   * API URL: default 'https://api.github.com'
   * Token : Insert the Token

1. Click Save. <br/>![](/img/platform-services/automation-service/app-central/integrations/github/github-4.png)

1. To make sure the resource is working, hover over the resource and then click the pencil icon that appears on the right. <br/>![](/img/platform-services/automation-service/app-central/integrations/github/github-5.png)

1. Click Test Saved Settings. <br/>![](/img/platform-services/automation-service/app-central/integrations/github/github-6.png)

1. You should receive a successful notification in the bottom right corner. <br/>![](/img/platform-services/automation-service/app-central/integrations/github/github-7.png)

## Change Log

* May 16, 2023 (v1.2) - First upload
* May 22, 2023 (v1.4) - Action Get Commit by URL refactored
* July 6, 2023 (v1.5) - Removed leading/trailing spaces
