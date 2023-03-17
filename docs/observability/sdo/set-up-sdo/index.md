---
slug: /observability/sdo/set-up-sdo
title: Set up the Software Development Optimization Solution
description: This page provides instruction for setting up the Software Development Optimization Solution including manual, Terraform, and Atlassian Marketplace.
---


You have two options for setup and configuration:

* Use a [Terraform Script](sdo-setup-with-terraform-script.md).
* [Manually configure](sdo-manual-configuration.md) collection and install apps for tool integration, create field extraction rules (FERs) for each supported tool, and install the SDO app.

## Prerequisites

Each set up and configuration method includes a list of prerequisites.

These include:

* API Keys/Creds for Jira, GitHub, GitLab, Jenkins, Bitbucket, CircleCI, Opsgenie with Webhook creation capabilities. 
* Access to Jenkins (Manage Plugins permissions)
* Make sure you have access to the Sumo Logic console and as a user that is associated with a Sumo Logic role that has the following permissions:
  * Manage field extraction rules
  * View Fields
  * View field extraction rules
  * Manage Collectors
  * View Collectors
  * Manage Fields
  * Manage connections
  * Manage Content
* Create a [Sumo Logic API key and ID](/docs/manage/security/access-keys.md) for the above user.
