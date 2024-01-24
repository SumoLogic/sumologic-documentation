---
title: Snyk
description: ''
tags: []
---

![](/img/platform-services/automation-service/app-central/logos/snyk.png)

Version: 1.1  
Updated: Jul 07, 2023

**Snyk** is a platform allowing you to scan, prioritize, and fix security vulnerabilities in your own code, open source dependencies, container images, and Infrastructure as Code (IaC) configurations.

## Actions

* **Get My User Details** (*Enrichment*) - Get my user details
* **List All Organizations in a Group** (*Enrichment*) - List organizations in a group
* **List Projects** (*Enrichment*) - List all projects for an organization
* **List Latest Issues** (*Enrichment*) - Get list of latest issues

## Snyk in Automation Service and Cloud SOAR

To configure the integration, log into the application, expand the configuration menu in the top right corner by hovering over the gear icon and click Automation.

![](/img/platform-services/automation-service/app-central/integrations/snyk/snyk-1.png)

In the Automation section, on the left menu, click Integrations.

![](/img/platform-services/automation-service/app-central/integrations/snyk/snyk-2.png)

After the list of the integrations appears, search/look for the integration and click on the row.

The integration details will appear. Click on the "+" button to add new Resource.

![](/img/platform-services/automation-service/app-central/integrations/snyk/snyk-3.png)

Populate all the required fields (\*)

* API URL: default (*https://api.snyk.io/*)
* Token : Insert the Token

Click Save.

![](/img/platform-services/automation-service/app-central/integrations/snyk/snyk-4.png)

To make sure the resource is working, hover over the resource and then click the pencil icon that appears on the right.

![](/img/platform-services/automation-service/app-central/integrations/snyk/snyk-5.png)

Click Test Saved Settings.

![](/img/platform-services/automation-service/app-central/integrations/snyk/snyk-6.png)

You should receive a successful notification in the bottom right corner.

![](/img/platform-services/automation-service/app-central/integrations/snyk/snyk-7.png)

## Note

**Required permissions:**

* **List Projects -** View Organization; View Project; View Project Snapshot
* **List Latest Issues -** View Project for every Organization in filters.orgs; View Organization Reports for every Organization in filters.orgs

## Change Log

* May 25, 2023 (v1.0) - First upload
* July 7, 2023 (v1.1) - Removed leading/trailing spaces
