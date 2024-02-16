---
title: February 6, 2024 - Application Update
hide_table_of_contents: true
image: https://help.sumologic.com/img/sumo-square.png
authors:
  - url: https://help.sumologic.com/release-notes-csoar/rss.xml
    image_url: /img/release-notes/rss-orange.png
---

### New Documentation for the Cloud SOAR SaaS version​

We are excited to announce the following new documentation for features in our Cloud SOAR SaaS version:
* Features:
   * [Dashboards](/docs/cloud-soar/main-menu/#create-a-dashboard)
   * [Create widgets for dashboards](/docs/cloud-soar/main-menu#create-widgets)
   * Directly manage User Choice actions within the playbooks from your [Slack workspace](/docs/cloud-soar/automation/#configure-slack-for-cloud-soar).
 * Open Integration Framework:
    * [Integration Builder](/docs/cloud-soar/automation#integration-builder) allows you to build integrations without needing to provide code
   * Integrations, and related action execution, can be done [in the cloud or through the Bridge](/docs/cloud-soar/automation#cloud-or-bridge-execution). Only certified integrations can be executed in the cloud.
    * Certified integrations allow you to customize JSON and table output schema
    * Actions configuration during playbook design is rearranged for easier use
* Architecture:
     * Fully-functional in the Cloud (the Bridge is only required for custom integrations)
     * User and profile management is in Sumo Logic core platform instead of Cloud SOAR
     * Automatic scalability based on server load
     * [Cloud SOAR APIs](/docs/api/cloud-soar/) are standardized to use the same infrastructure as APIs in the Sumo Logic core platform
