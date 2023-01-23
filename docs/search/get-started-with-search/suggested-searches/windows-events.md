---
id: windows-events
title: Suggested Searches for Windows Events
sidebar_label: Windows Events
description: The following searches were built for use with Windows 2008 Events.
---

The following searches were built for use with Windows 2008 Events.

## Domain Controller/Windows Server Events

We recommend saving the following searches and scheduling them to run every 10 minutes over the last 10 minutes.

### Detect when the audit policy was cleared

* Suggested Time Range: -10m

```sql
_sourceCategory=OS/Windows 1102
| parse using public/windows/2008
| where event_id="1102"
```

### Detect when the audit policy was changed

* Suggested Time Range: -10m

```sql
_sourceCategory=OS/Windows 4719
| parse using public/windows/2008
| where event_id="4719"
```

### Detect account policy changes

This event indicates that the computer's Security Settings\\Account Policy or Account policy was modified, either via Local Security Policy or Group Policy in Active Directory. Similar to the audit policy, the Account Policy should not change often, making this a critical event to
monitor.

* Suggested Time Range: -10m

```sql
_sourceCategory=OS/Windows 4739
| parse using public/windows/2008
| where event_id="4739"
```

### Detect system restarts

This event indicates a machine restart, and is important to monitor because production systems should never go down.

* Suggested Time Range: -10m

```sql
_sourceCategory=OS/Windows 4608
| parse using public/windows/2008
| where event_id="4608"
```

### Detect service installation

This events indicates that a new service was installed in the system. Any new service installed on the domain controller needs to be monitored closely.

* Suggested Time Range: -10m

```sql
_sourceCategory=OS/Windows (4946 OR 4947 OR 4948)
| parse using public/windows/2008
| where event_id="4946","4947","4948"
```

## Logon/Logoff Events

### Failed logins on the Domain Controller

These events indicate failed logins, either on the Domain Controller or on member servers.

* Suggested Time Range: -1h

```sql
_sourceCategory=OS/Windows (4771 OR 4768 OR 4776)
| parse using public/windows/2008
| where event_id="4771" OR (event_id="4768" AND result_code !="0x0") OR event_id="4776"
```

### Consecutive failed logins by the same user

These events indicate consecutive failed logins whether on the Domain Controller or on member servers.

* Suggested Time Range: Save as a search; set the search to run every 15 minutes only if the number of groups is greater than 0.

```sql
_sourceCategory=OS/Windows (4771 OR 4768 OR 4776)
| parse using public/windows/2008
| where event_id="4771" OR (event_id="4768" AND result_code !="0x0") OR event_id="4776"
```

### User account changed

This event is logged when a user account is changed.

* Suggested Time Range: -1d

```sql
_sourceCategory=OS/Windows 4738
| parse using public/windows/2008
| where event_id="4738"
```

### User added to a group

These events are logged when a user is added to a group.

* Suggested Time Range: -1d

```sql
_sourceCategory=OS/Windows (4728 OR 4732 OR 4756)
| parse using public/windows/2008
| where event_id in ("4728" ,"4732","4756")
```

### New accounts created

This event is logged when new accounts are created.

* Suggested Time Range: -1d

```sql
_sourceCategory=OS/Windows 4720
| parse using public/windows/2008
| where event_id="4720"
```

### User locked out

This event is logged when a user is locked out after repeated logon failures.

* Suggested Time Range: -15m; Save as a search to run every 15 minutes if the number of messages is less than one.

```sql
_sourceCategory=OS/Windows 4740
| parse using public/windows/2008
| where event_id="4740"
```

### Successful logins over time

This search returns the total number of successful logins on a local machine every hour, over the past 24 hours.

* Suggested Time Range: -24h

```sql
_sourceCategory=OS/Windows 4624
| parse using public/windows/2008
| where event_id="4624"
| timeslice by 1d
| count by _timeslice
```

### Consecutive failed logins on a local machine

* Suggested Time Range:-15m; Save as a search to run every 15 minutes and return results if the number of messages is >1.

```sql
_sourceCategory=OS/Windows 4625
| parse using public/windows/2008
| where event_id="4625"
| count by target_acct
| where _count\> 3
```

### Top reasons for failed logins

This search returns the top reasons why logins are failing.

* Suggested Time Range: -6h

```sql
_sourceCategory=OS/Windows 4625
| parse using public/windows/2008
| where event_id="4625"
| count by dest_user
| top 10 fail_reason by _count
```

## User/Account Changes

### User password reset attempt

This search returns all instances where an attempt has been made to reset a user's password. This event is triggered by someone else changing a user's password (not the user himself).

* Suggested Time Range: -6h

```sql
_sourceCategory=OS/Windows 4724
| parse using public/windows/2008
| where event_id="4724"
```

### User password changes

This search returns the number of times user have changed their own passwords each day over the past week.

* Suggested Time Range: -7d

```sql
_sourceCategory=OS/Windows 4723
| parse using public/windows/2008
| where event_id="4723"
| timeslice by 1d
| count by _timeslice
```
