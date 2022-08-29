---
id: windows-sensor-overview
title: Windows Sensor Overview
description: Learn about the CSE Windows Sensor functionality.
---

:::note
The CSE Windows Sensor has reached end of life and is no longer supported. Please migrate to a Sumo Logic  Installed Collector. For more information see the [end of life notice](https://app.getbeamer.com/cloudsiementerprise/en/end-of-life-notice-_-cloud-siem-enterprise-sensors). 
:::

The CSE Windows Sensor collects information from key elements of your Windows environments: the Microsoft Windows Event Log and Microsoft Active Directory. The sensor forwards the data it collects to either the Sumo Logic platform or to the legacy CSE server for ingestion, after which it becomes available for processing by CSE rules.  

CSE leverages the event logs and Active Directory state information that Windows Sensor collects to detect security issues, monitor compliance with standards such as HIPAA and SOX, and support threat hunting efforts. 

The CSE Windows Sensor is designed to work in a variety of topologies, from single-country to multinational. Under the hood, the sensor is made up of multiple  monitors. You can enable and disable monitor types, based on your requirements. You can deploy multiple sensors strategically around your organization to meet the needs and characteristics of your infrastructure. You configure sensor behaviors in the sensor’s [settings.conf](windows-sensor-configuration-settings.md#example-settingsconf-files) file. 

## Event Log Monitoring

The CSE Windows Sensor comes equipped with three types of Microsoft Windows Event Log monitors.  This section describes the three types of Event Log Monitors.

### Domain Controller Monitor

The Domain Controller Monitor collects logs from Windows domain controllers. This is the default monitor that is enabled when the CSE Windows Sensor is first installed. 

This section describes what the monitor does and how it works.

:::tip
If you don’t already know: A domain controller (DC) is the main server in a Windows domain that manages all the computers within the domain. A domain controller has an Active Directory database from which user accounts can be created and deleted, and security and access granted or revoked.
:::

When the Windows Sensor starts up, it detects that it is part of a Windows Active Directory Inventory (AD), and detects the (potentially many) domain controllers on the AD network. Each domain controller contains an event log that includes a security log. The sensor’s Domain Controller Monitor connects to each domain controller’s security log, and begins monitoring events. 

When the monitor begins, it obtains semi-real-time data from the domain controllers. Every time the monitor encounters one of the selected events, it adds it to a file. Then, it periodically uploads the contents of the file to the event log endpoint.

By default, the Windows Event Monitor collects events such as:

* Successful user logins
* Unsuccessful user logins
* User password resets
* User password errors
* User lockouts

You can configure the monitor to collect fewer, or more events, and which domain controllers it collects logs from.

You can control the DCs that a Domain Controller Monitor collects logs from.

The Domain Controller Monitor is enabled by default. Typically, you would only disable it if you choose to use the Windows Event Collector (WEC) Monitor, described below.

### Windows Event Collector (WEC) Monitor

The WEC monitor collects logs from the Windows Event Collector, an event collector that stores event data forward from other computers using Windows Event Forwarding. 

The log data that the WEC monitor collects is very similar to that collected by the Domain Controller Monitor.  Typically, if you enable Windows Event Forwarder Monitor, you disable the sensor’s Domain Controller Monitor.

Why use the WEC Monitor? There are many different reasons:

* The Windows Event Collector is a single source for obtaining event data from multiple Domain Controllers, so you can streamline collection with the WEC Monitor. Instead of collecting events from individual Domain Controllers, you can collect the events forwarded from Domain Controllers to the WEC server. This allows you to minimize the number of Windows Sensors you deploy.
* In a broadly distributed infrastructure you might have one region with a slow WAN link. You could use the Windows Event Forwarder to transmit event data to a machine closer to the Windows Sensor and use the WEC Monitor to collect from the WEC server. 
* You want to implement fine-grained filtering at the source level.

You have a huge volume of data to collect, likely to be the case if you collect a broad range of range of event IDs.

For more information about the Windows Event Collector, see Use Windows Event Forwarding to help with intrusion detection on the Microsoft site, and The Windows Event Forwarding Survival Guide, on https://hackernoon.com. 

### Localhost Monitor 

The Localhost Monitor collects logs from the machine it runs on. In an environment with many domain controllers, a high volume of data, poor interoffice connectivity, it can be advantageous to deploy the Windows Sensor to each domain controller and run the Localhost Monitor.  The Localhost Monitor is disabled by default. 

## Active Directory Monitor 

An individual entry in the Microsoft Windows Event Log may contain information such as computer names, user names, email address, and location information. Individually, this information may be less valuable than if it was correlated to other identifying information such as associating an email address with an employee’s full name.  The Active Directory database contains this additional information. CSE uses information from AD to enrich log data, building a more complete profile of your network, for example, by connecting the dots between a location, and the servers, workstations, and users in that location. 

By default, the Active Directory Monitor launches every 24 hours and queries Active Directory.  It serializes all Active Directory objects into a file — during this process, it extracts selected attributes. You can add attributes to an allow or deny list in the Window Sensor configuration file. The serializer then appends the JSON to a file containing one row per Active Directory entry and, when complete, uploads the file to CSE.

The monitor sends the following information to CSE.

* Username
* Email address
* Departments to which employee belongs
* Employee’s manager
* Security groups to which the employee is assigned, which allows CSE to determine the privileges the user has on the company network.

You can configure how often the sensor takes the snapshot and sends the data to CSE.
