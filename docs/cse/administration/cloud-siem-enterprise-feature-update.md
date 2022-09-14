---
id: cloud-siem-enterprise-feature-update
title: Cloud SIEM Enterprise Feature Update (2022)
sidebar_label: CSE Feature Update
description: Learn what's new in the 2022 Cloud SIEM Enterprise Platform update.
---

This topic describes what customers can expect from the February 2022 Cloud SIEM Enterprise (CSE) feature update. 

## New features

Several new CSE enhancements are included in this feature update. They include:

* **Audit Logging for CSE** - CSE now writes data to customers’ Sumo Logic Audit Event Index whenever there are system or user actions, such as an Insight changing state. This data can be used for a number of use cases in addition to auditing, such as dashboards, notifications, and other actions. For more information, see Audit Event Index.
* **Terraform Provider for CSE** — Users can now utilize the open-source Hashicorp Terraform tool to load content such as Rules, Custom Entity Types, Entity Criticality, Log Mappings, Network Blocks and more into Cloud SIEM Enterprise. For more information, see [Sumo Logic Provider](https://registry.terraform.io/providers/SumoLogic/sumologic/latest/docs).
* **Entity Normalization Lookup Tables** - Lookup tables can now be used to normalize user names and hostnames in cases where different logs use different names/IDs to refer to the same entity. For more information, see [Configure an Entity Lookup Table](../records-signals-entities-insights/configure-entity-lookup-table.md) .
* **Child Organization Provisioning and Consolidated Insights** — Customers who have child organizations, such as service providers with their own clients, can provision those children without requiring Sumo Logic intervention. In addition, Insights from child organizations can be viewed in a single consolidated list in the CSE UI. These features require setup by Sumo Logic.

## User interface URLs

The root URL for CSE will now be on the same sumologic.com domain as your existing Sumo Login platform URL, such as `https://customername.region.sumologic.com/sec/` (depending on the region and whether a custom subdomain has been defined). URLs will no longer contain `portal.jask.ai`. Users will all log in via the consolidated Sumo Logic login page using the same authentication method as previously served from `portal.jask.ai`.

This change will also impact the CSE APIs; see [API URLs and Authentication](#api-urls-and-authentication) below.

## User management

After the feature update, user accounts and roles will be managed centrally in the Sumo Logic platform, rather than separately in CSE. Existing users and roles will be automatically moved from CSE to the platform. (When migrated, CSE role names will be prefixed with "CSE". For example the CSE "Analyst" role is "CSE Analyst" when migrated.) 

Going forward, CSE-related capabilities will be granted to users via platform role assignments. For more information about user and role management in the Sumo Logic platform, see Users and Roles.

## API URLs and authentication

The URLs and authentication methods for the CSE API are changing to work the same as the Sumo Logic platform APIs. For a list of Sumo Logic API endpoints by region, see Sumo Logic Endpoints and Firewall Security. For authentication options, see API Authentication. You can simply create an Access ID and Key in CIP, and use that for basic authentication. 

The user/RBAC and audit logging APIs will be deprecated (since those functions will now be managed by the platform APIs).

You can find API documentation by going to the `/docs/sec` path at the API endpoint for your deployment. For example, `https://api.us2.sumologic.com/docs/sec/`. The CSE APIs themselves start with `/api/sec/v1/`. For example, `https://api.us2.sumologic.com/api/sec/v1/custom-insights`.

Customers that are using CSE APIs prior to the update should be ready for this change ahead of time as the older version of the API will no longer be available after the update.

## Insight Enrichment Server configuration

If you use the [Insight Enrichment Server](../integrations/insight-enrichment-server.md), be sure to update the server’s configuration settings  with the correct URL for connecting to the CSE APIs, and your access ID and key. For information about Insight Enrichment Server configuration settings,see [General settings](../integrations/insight-enrichment-server.md) in the *Insight Enrichment Server* topic. 

## Deprecated CSE pages

The following CSE UI pages will be removed by this update:

* The **Accounts**, **Invitations**, **Roles,** and **Teams** pages; these are now managed centrally in the Sumo Logic platform UI. For more information, see Users and Roles.
* The **Sensors** page; sensors are now managed by the platform UI. For current download links, see [Sensor Download Locations](../sensors/sensor-download-locations.md).
