---
id: cloud-siem
title: Cloud SIEM Enterprise Release Notes
sidebar_label: Cloud SIEM Enterprise
---

### Application Update 2022-07-08

#### Announcement
The built-in HipChat Action will be deprecated on August 25, 2022.

#### Minor Changes and Enhancements
* [Updated] An option has been added to the Enrichments tab which allows the user to hide any empty fields in the results.

#### Resolved Issues
In some cases, changes to Rule Tuning Expressions were not being written to the Audit Logs properly.

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
