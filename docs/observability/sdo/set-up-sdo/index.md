---
slug: /observability/sdo/set-up-sdo
title: Set up the Software Development Optimization Solution
description: This page provides instruction for setting up the Software Development Optimization Solution including manual, Terraform, and Atlassian Marketplace.
---


You have two options for setup and configuration:

* Use a [Terraform script](/docs/observability/sdo/set-up-sdo/sdo-setup-with-terraform-script/).
* [Manually configure](/docs/observability/sdo/set-up-sdo/sdo-manual-configuration/) collection and install apps for tool integration, create field extraction rules (FERs) for each supported tool, and install the SDO app.

## Prerequisites

Each set up and configuration method includes a list of prerequisites.

These include:

* API keys/creds for Jira, GitHub, GitLab, Jenkins, Bitbucket, CircleCI, Opsgenie with Webhook creation capabilities. 
* Access to Jenkins (manage plugins permissions)
* Make sure you have access to the Sumo Logic console and as a user that is associated with a Sumo Logic role that has the following [role capabilities](/docs/manage/users-roles/roles/role-capabilities/):
  * Manage Field Extraction Rules
  * View Fields
  * View Field Extraction Rules
  * Manage Collectors
  * View Collectors
  * Manage Fields
  * Manage c\Connections
  * Manage Content
* Create a [Sumo Logic access key and ID](/docs/manage/security/access-keys) for the above user.
