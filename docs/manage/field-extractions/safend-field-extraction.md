---
id: safend-field-extraction
title: Sample Safend Field Extraction
description: Create a field extraction rule for Safend.
---


**Rule Name:** Safend Log Parse  

**Log Type:** safend  

**Rule Description:** Parsing the common fields in your Safend logs  

**Sample Log:**

```
2014-10-09T15:12:33.912408-04:00 safend.host.com [Safend Data Protection] File Logging Alert details: User: user@user.com, Computer: computer.host.com, Operating System: Windows 7, Client GMT: 10/9/2014 7:12:33 PM, Client Local Time: 10/9/2014 3:12:33 PM, Server Time: 10/9/2014 7:12:33 PM, Group: , Policy: Safend for Cuomer Default Policy, Device Description: Disk drive, Device Info: SanDisk Cruzer Pattern USB Device, Port: USB, Device Type: Removable Storage Devices, Vendor: 0781, Model: 550A, Distinct ID: 3485320307908660, Details: , File Name: F:\SOME_FILE_NAME, File Type: PDF, File Size: 35607, Created: 10/9/2014 7:12:33 PM, Modified: 10/9/2014 7:12:34 PM, Action: Write
```

**Scope:**

```sql
_sourceCategory=safend
```

**Extraction Rule:**

```sql
parse regex "Action: (?<action>[^,]*)" nodrop
| parse " * [" as host nodrop | parse "] *:" as alert_type nodrop
| parse "User: *," as user nodrop
| parse "Computer: *," as computer nodrop
| parse "Device Info: *," as device_info nodrop
| parse "Device Type: *," as device_type nodrop
| parse "File Type: *," as file_type nodrop
| parse "File Name: *, File Type" as file_name nodrop
| parse "File Size: *," as file_size nodrop
| parse "Client Local Time: *," as client_local_time nodrop
```

**Resulting Fields:**

| Result Field |   |
|:--|:--|
| action | Write |
| alert_type | File Logging Alert details |
| client_local_time | 10/9/2014 3:12:33 PM |
| computer | computer.host.com |
| device_info | San Disk .... |
| device_type | Removable Storage Devices |
| file_name | F:\\SOME_FILE_NAME |
| file_size | 35607 |
| file_type | PDF |
| host | `safend.host.com` |
| user | `user@user.com` |
