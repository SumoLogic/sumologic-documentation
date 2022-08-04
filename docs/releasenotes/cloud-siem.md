---
id: cloud-siem
title: Cloud SIEM Enterprise Release Notes
sidebar_label: Cloud SIEM Enterprise
description: Here you'll find information about new and enhanced features, updated content (like rules, log mappers and parsers), bug fixes and other important announcements for Cloud SIEM Enterprise.
---


### Application Update 2022-07-14

#### Minor Changes and Enhancements
* [Updated] The text size has been adjusted in some areas on the Rules details page to improve readability.

#### Resolved Issues
* In some instances, after uploading Network Blocks via .csv file, they would fail to appear in the UI.

#### Announcement Update
* The new Signal Index (recently announced) has been delayed, and will be available starting next week. As a result, the deprecation of the old Signal Forwarding feature will be delayed until September 22, 2022.

---
### Content Release 2022-07-14

#### Log Mappers
* [New] Carbon Black Cloud Alert - Tuned Activity
* [Updated] Cisco ASA 106001 JSON
* [Updated] Cisco ASA 106002 JSON
* [Updated] Cisco ASA 106006 JSON
* [Updated] Cisco ASA 106007 JSON
* [Updated] Cisco ASA 106010 JSON
* [Updated] Cisco ASA 106012 JSON
* [Updated] Cisco ASA 106014 JSON
* [Updated] Cisco ASA 106015 JSON
* [Updated] Cisco ASA 106021 JSON
* [Updated] Cisco ASA 106027 JSON
* [Updated] Cisco ASA 106100 JSON
* [Updated] Cisco ASA 106102-3 JSON
* [Updated] Cisco ASA 109005-8 JSON
* [Updated] Cisco ASA 110002 JSON
* [Updated] Cisco ASA 113004 JSON
* [Updated] Cisco ASA 113005 JSON
* [Updated] Cisco ASA 113012-17 JSON
* [Updated] Cisco ASA 209004 JSON
* [Updated] Cisco ASA 302020-1 JSON
* [Updated] Cisco ASA 303002 JSON
* [Updated] Cisco ASA 304001 JSON
* [Updated] Cisco ASA 304002 JSON
* [Updated] Cisco ASA 305011-12 JSON
* [Updated] Cisco ASA 313001 JSON
* [Updated] Cisco ASA 313004 JSON
* [Updated] Cisco ASA 313005 JSON
* [Updated] Cisco ASA 314003 JSON
* [Updated] Cisco ASA 322001 JSON
* [Updated] Cisco ASA 338001-8+338201-4 JSON
* [Updated] Cisco ASA 4000nn JSON
* [Updated] Cisco ASA 406001 JSON
* [Updated] Cisco ASA 406002 JSON
* [Updated] Cisco ASA 419001 JSON
* [Updated] Cisco ASA 419002 JSON
* [Updated] Cisco ASA 500004 JSON
* [Updated] Cisco ASA 602303-4 JSON
* [Updated] Cisco ASA 605004-5 JSON
* [Updated] Cisco ASA 710002-3 JSON
* [Updated] Cisco ASA 710005 JSON
* [Updated] Cisco ASA tcp_udp_sctp_teardowns JSON


#### Parsers
* [Updated] /Parsers/System/VMware/Carbon Black Cloud
* [Updated] /Parsers/System/Cisco/Cisco ASA


---
### Application Update 2022-07-08

#### Announcement
* The built-in **HipChat Action** will be **deprecated **on **August 25, 2022**.

#### Minor Changes and Enhancements
* [Updated] An option has been added to the Enrichments tab which allows the user to hide any empty fields in the results.

#### Resolved Issues
* In some cases, changes to Rule Tuning Expressions were not being written to the Audit Logs properly.
* Mapper field format_parameters was not populating.
* Some of the links on the Related Entities tab of the Insight detail pages were malformed.


---
### Application Update 2022-07-08

#### Announcement
The built-in HipChat Action will be deprecated on August 25, 2022.

#### Minor Changes and Enhancements
* [Updated] An option has been added to the Enrichments tab which allows the user to hide any empty fields in the results.

#### Resolved Issues
In some cases, changes to Rule Tuning Expressions were not being written to the Audit Logs properly.

<small>tags: <a href="#application">application</a></small>


---
### Content Release 2022-07-07

#### Rules
* [New] MATCH-S00816 Interactive Logon to Domain Controller

#### Log Mappers
* [Updated] Palo Alto GlobalProtect - Custom Parser

#### Parsers
* [Updated] /Parsers/System/F5/F5 Syslog

---
### Content Release 2022-07-05

#### Rules
* [Updated] MATCH-S00246 AWS CloudTrail - GetSecretValue from non Amazon IP
* [Updated] THRESHOLD-S00096 Brute Force Attempt
