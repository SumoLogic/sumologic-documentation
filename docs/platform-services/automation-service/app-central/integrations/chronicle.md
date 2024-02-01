---
title: Chronicle
description: ''
tags: [ ]
---

![](/img/platform-services/automation-service/app-central/logos/google.png)

Version: 1.2  
Updated: Jan 27, 2023

Chronicle SIEM is a cloud service, built as a specialized layer on top of core Google infrastructure, designed for
enterprises to privately retain, analyze, and search the massive amounts of security and network telemetry they
generate. Chronicle normalizes, indexes, correlates, and analyzes the data to provide instant analysis and context on
risky activity

## Actions

* **Alerts Daemon Chronicle** *(Daemon)* - Automatically pulls information about both asset-based and user-based alerts
  with event
* **Get Event** *(Enrichment)* - Returns a single event given the UID for the event
* **Get Log** *(Enrichment)* - Returns a single raw log given the UID for the event
* **List Alerts** *(Enrichment)* - Returns information about both asset-based and user-based alerts with event
  timestamps within the specified time range
* **List Assets** *(Enrichment)* - Lists all the assets that accessed the specified artifact in your enterprise within
  the specified time period
* **List Events** *(Enrichment)* - Lists all the events discovered within your enterprise on a particular device within
  the specified time range
* **List IOCs** *(Enrichment)* - Lists all the IoCs discovered within your enterprise within the specified time range
* **List IoC Details** *(Enrichment)* - Returns the threat intelligence associated with an artifact. The threat
  intelligence information is obtained from your enterprise security systems and from IoC partners of Google
* **UDM Search** *(Enrichment)* - UDM Search query and retrieve matches

## Change Log

* July 30, 2021 - First upload
* July 18, 2023 (v1.1) - Updated the integration with Environmental Variables
* January 26, 2024 (v1.2)
    * Integration refactored
    * The following new actions are added:
        * Get Event
        * Get Log
        * List Alerts
        * UDM Search
