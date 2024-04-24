---
id: terminology
title: Terminology
sidebar_label: Terminology
description: This document provides definitions for technical terms used in Monitors.
---

This document provides definitions for technical terms used in Monitors.

| Term | Definition |
| -- | -- |
| Detection Method | Static/Dynamic/Anomaly/Outlier |
| Disable | The monitor is in a disabled state when monitors are not processed by the backend, only their definition is persisted in the database. |
| Incident | When a specific alerting condition is met, as defined on the monitor, an incident is triggered. |
| Monitor | The monitor is the object that you configure within Sumo Logic that:<br/><br/>Checks for specific events of interest against a data source, based on your specified conditions. Events of interest are used in a general sense to denote an event that may be of interest to you.<br/><br/>Notifies you about the event-of-interest based on your preferences. |
| Monitor Type | The underlying data stream, either logs or metrics, on which the monitor is created. |
| Mute | When a monitor is in a mute state it continues to process your data stream as expected where Incidents are still generated. However, notifications are snoozed based on your mute condition. |
| Resolve | The process of closing an incident. |
| Status | The state of the monitor can be one of the following, Normal, Critical, Warning, or Missing Data. |
| Template | The section that describes the actual connection attributes. |
| Threshold | The static condition which when met an incident is triggered by a monitor. |
| Trigger (state) | The state when an alert condition has been met, and an incident has been created as a result. |
| Trigger Type | Type of Alert/Trigger condition defined Critical/Warning/Missing Data. |
| Alert Variables | Custom variables used inside the Action Payload. |
