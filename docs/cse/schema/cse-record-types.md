---
id: cse-record-types
title: CSE Record Types
sidebar_label: Record Types
description: Learn about the Record types to which you can map schema attributes.
---



This topic defines the Record Types that CSE supports. For related information, see [Attributes You Can Map to Records](/docs/cse/schema/attributes-map-to-records).

Each message that CSE maps must be assigned one, and only one, Record Type.

Note that it is possible for multiple mappers to match a particular log message and each create a unique Record for that message—those multiple Records can have different Record Types. It isn’t standard practice to create multiple CSE Records from a single log message, but it is possible if there is a use case.

## Record Types

| Record Type | When to Use |
|:--|:--|
| Audit | Use this Record Type for log sources that leave a basic audit trail. Whenever possible, it is preferable to use one of these more specific audit Record Types: AuditChange, AuditFile, or AuditResourceAccess. |
| AuditChange | Use this Record Type for log sources that leave an audit record indicating a change has occurred on a system. |
| AuditFile | Use this Record Type for log sources that record information about file changes such as file integrity monitoring. |
| AuditResourceAccess | Use this Record Type for log sources that track when  an entity accesses a resource. For example, the Windows Security-5140 log event indicates when a network share object was accessed. |
| Authentication | Use this Record Type for log sources that report successful or unsuccessful authentication events. |
| AuthenticationPrivilegeEscalation | Use this Record Type for authentication log messages that note a user has elevated their privileges. |
| Canary | This is an internal CSE Record Type and should not be used. |
| Email | Log sources containing email information such as email protection applications and services. |
| Endpoint | Logs generated about endpoint behavior. |
| EndpointModuleLoad | Use this Record Type for logs that indicate a process is loading one or more modules such as DLL files. |
| EndpointProcess | Use this Record Type for logs that capture endpoint process auditing. |
| Network | Use this Record Type for generic log sources that describe network events. Whenever possible, it is preferable to use one of these more specific network Record Types: NetworkDHCP, NetworkDNS, NetworkFlow, NetworkHTTP, NetworkProxy. |
| NetworkDHCP | Use this Record Type for network logs that contain DHCP information. |
| NetworkDNS | Use this Record Type for network logs containing Domain Name Services information |
| NetworkFlow | Use this Record Type for network logs that contain flow information, for example, network bytes, packets, protocols, flow states and so on. |
| NetworkHTTP | Use this Record Type for network logs that contain HTTP-specific information. |
| NetworkProxy | This Record Type is very similar to NetworkFlow, but should be used when the log source is a network proxy and needs access to a wide array of other network fields. |
| Notification | Use this Record Type for log sources that report  general notifications. |
| NotificationVulnerability | Use this Record Type for log sources that report notifications about detected vulnerabilities. |
