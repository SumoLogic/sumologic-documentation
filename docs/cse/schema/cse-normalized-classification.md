---
id: cse-normalized-classification
title: CSE Normalized Classification
sidebar_label: Normalized Classification
description: Learn about CSE's Normalized Classification Fields, schema fields that have an enforced output defined by CSE.
---



This topic describes how CSE applies normalized classification to Records. 

In CSE Records can be classified at two levels. First, all Records are classified at a high level by Record Type. At a more detailed level, you can classify more specifically using Normalized Classification Fields alongside the mapped attributes within a Record.

## Record Types

Every CSE Record has a Record Type. A Record Type classifies the nature of the event that the Record describes. CSE Record Types include **Authentication,** **Endpoint**, **NetworkHTTP** and so on.

A Record’s type is set by the [log mapping](create-structured-log-mapping.md) that processes it. For more information, see [CSE Record Types](cse-record-types.md).

## Normalized Classification Fields

For more granular classification of a Record, CSE uses *Normalized Classification Fields*. These are special normalized schema fields that have an enforced output defined by CSE. These fields provide a taxonomy that can be used to tie Records from multiple vendors and products together in a standard way. Rather than holistically trying to describe a Record as Record Type does, these fields exist alongside commonly used normalization schema fields which most often contain the what, where, and why of a particular Record. This allows for far more dynamic and specific classification of a Record than Record Type alone. 

Normalized Classification Fields are completely optional when creating a log mapping. When using Normalized Classification Fields, it is best to consider whether a parallel normalized schema field exists for the Record and whether there is an analogous enforced output available in the desired Normalized Classification Field. These fields will most typically utilize the lookup unless the vendor log output exactly matches the enforced outputs or a constant value is assigned.

:::note
* When creating a log mapping, if the output value used for a given Normalized Classification Field is not listed in the Enforced Output Values for that field, it will not be populated.
* Normalized Classification Fields are a new feature and will be backfilled to existing out-of-the-box mappings over time.
:::

## normalizedAction

Complementary to the [action](schema-attributes.md) field, the `normalizedAction` field describes the initiation of an activity in a
standard way across Records. `normalizedAction` is meant to describe an attempt to perform an action, using the success boolean as a modifier to indicate whether or not the action was successful. Note that `normalizedAction` should be used with [normalizedResource](cse-normalized-classification.md) to indicate where an action was attempted, or the resource or entity upon which the action was attempted.

| Enforced Output Value | Description |
|:--|:--|
| abort | Use for actions synonymous with "abort". For instance, in an event describing the attempt, successful or not, to interrupt an ongoing task. |
| allow | Use for actions synonymous with "allow”. For instance, in an event describing the attempt, successful or not, to permit an object or the occurrence of an activity. This is common in actions pertaining to network traffic.                                            |
| change | Use for actions synonymous with "change". For instance, in an event describing the attempt, successful or not, to modify a resource. |
| clean | Use for actions synonymous with "clean". For instance, in an event describing the attempt, successful or not, of the sanitization of a resource. Common in actions pertaining to anti-malware. |
| create | Use for actions synonymous with "create". For instance, in an event describing the attempt, successful or not, to create a resource. |
| decrypt | Use for actions synonymous with "decrypt". For instance, in an event describing the attempt, successful or not, of the decryption of a resource |
| delete | Use for actions synonymous with "delete". For instance, in an event describing the attempt, successful or not, to create a resource. |
| deny | Use for actions synonymous with "deny". For instance, in an event describing the attempt, successful or not, to reject an object or the occurrence of an activity. Common in actions pertaining to network traffic. |
| domainLogon | Use for events describing the attempt, successful or not, to leverage domain resources to attempt credential validation. |
| disable | Use for actions synonymous with "disable". For instance, in an event describing the attempt, successful or not, to render a resource inactive and/or unable. Common in actions pertaining to identity and access management. |
| enable | Use for actions synonymous with "enable". For instance, in an event describing the attempt, successful or not, to render a resource active and/or able. Common in actions pertaining to identity and access management. |
| execute | Use for actions synonymous with "execute". For instance, in an event describing the attempt, successful or not, to initiate the performance of a task. |
| ignore | Use for actions synonymous with "ignore". For instance, in an event describing the attempt, successful or not, to disregard a resource or the occurrence of an activity. |
| inspect | Use for actions synonymous with "inspect". For instance, in an event describing the attempt, successful or not, to submit a resource to further scrutiny. |
| install | Use for actions synonymous with "install". For instance, in an event describing the attempt, successful or not, of the installation of a piece of software or hardware. |
| lock | Use for actions synonymous with "lock". For instance, in an event describing the attempt, successful or not, to make a resource secure or inaccessible. Common in actions pertaining to identity and access management. |
| logoff | Use for actions synonymous with "logoff". For instance, in an event describing the attempt, successful or not, of a computer, service, or user account logging off. |
| logon | Use for actions synonymous with "logon". For instance, in an event describing the attempt, successful or not, of a computer, service, or user account logging in. |
| quarantine | Use for actions synonymous with "quarantine". For instance, in an event describing the attempt, successful or not, of isolating a resource. Common in actions pertaining to anti-malware. |
| receive | Use for actions synonymous with "receive". For instance, in an event describing the attempt, successful or not, to accept the arrival of a resource. Common in actions pertaining to email. |
| reset | Use for actions synonymous with "reset". For instance, in an event describing the attempt, successful or not, to discard the current state of a resource. Common in actions pertaining to network network traffic and identity access management, depending on context. |
| restore | Use for actions synonymous with "restore". For instance, in an event describing the attempt, successful or not, to re-establish the prior state of a resource. Common in actions pertaining to backups. |
| scan | Use for actions synonymous with "scan". For instance, in an event describing the attempt, successful or not, to initiate a scan of a resource. Common in actions pertaining to anti-malware. |
| send | Use for actions synonymous with "send". For instance, in an event describing the attempt, successful or not, to dispatch a resource. Common in actions pertaining to email. |
| start | Use for actions synonymous with "start". For instance, in an event describing the attempt, successful or not, to initiate an activity. |
| stop | Use for actions synonymous with "stop". For instance, in an event describing the attempt, successful or not, to cease an activity. |
| uninstall | Use for actions synonymous with "uninstall". For instance, in an event describing the attempt, successful or not, to remove a piece of software or hardware. |

## normalizedResource

Complementary to the [resource](schema-attributes.md) field, this field describes the resource being acted upon or otherwise referenced within a Record in a standard way across Records. Intended to be used to provide further normalized context to a Record, particularly in tandem with [normalizedAction](cse-normalized-classification.md).

| Enforced Output Value | Description |
|:--|:--|
| account | Use where the resource being acted upon or referenced in a Record pertains to an account. |
| application | Use where the resource being acted upon or referenced in a Record pertains to an application. |
| backup | Use where the resource being acted upon or referenced in a Record pertains to a backup. |
| bucket | Use where the resource being acted upon or referenced in a Record pertains to a specific bucket. Common in cloud computing. |
| database | Use where the resource being acted upon or referenced in a Record pertains to a database. |
| directory | Use where the resource being acted upon or referenced in a Record pertains to a directory or similar hierarchical organizational unit. |
| email | Use where the resource being acted upon or referenced in a Record pertains to email or email delivery. |
| file | Use where the resource being acted upon or referenced in a Record pertains to a file. |
| group | Use where the resource being acted upon or referenced in a Record pertains to a group, for example, an organizational unit, security group, user group, computer group, access control list, and so on. |
| instance | Use where the resource being acted upon or referenced in a Record pertains to a specific machine instance, typically virtual. Common in cloud computing. |
| key | Use where the resource being acted upon or referenced in a Record pertains to a cryptographic key. |
| malware | Use where the resource being acted upon or referenced in a Record pertains to malware itself or the prevention, detection, or removal of malware. |
| network | Use where the resource being acted upon or referenced in a Record is or pertains to network traffic. |
| operating system | Use where the resource being acted upon or referenced in a Record pertains to an operating system component. |
| process | Use where the resource being acted upon or referenced in a Record pertains to a process |
| role | Use where the resource being acted upon or referenced in a Record pertains to a role. Common in cloud computing. |
| scheduled task | Use where the resource being acted upon or referenced in a Record pertains to a scheduled task or analogous functionality. |
| service | Use where the resource being acted upon or referenced in a Record pertains to a service. |

## normalizedCause

Complementary to the [cause](schema-attributes.md) \field, this field describes the reason for any particular outcome in a Record in a standard way.

|  Enforced Output Value |  Description |
|:--|:--|
| incorrect password | For a Record describing an authentication failure where the cause of the failure was an incorrect password. |
| incorrect username | For a Record describing an authentication failure where the cause of the failure was an incorrect username. |
| failed challenge | For a Record describing an authentication failure where the cause of the failure was a failed multi-factor authentication challenge or other secondary authentication challenge, such as a security question. |
| system error | For a Record describing a failed operation where the cause of the failure was a system error. |
| allow list | For a Record describing the successful outcome of an operation based on the presence of an object on an allow list. For instance, an Allow ACL. |
| deny list | For a Record describing the failed outcome of an operation based on the presence of an object on a deny list. For instance, a Deny ACL. |

### success

True or false showing whether or not an action or event Recorded in a log was successful. This field is either defined as a constant or based on a lookup in a mapping.

## normalizedSeverity

Severity score on a scale of 0 to 10 with 0 being informational and 10 being critical. This is defined either explicitly per mapping or by a lookup to normalize a vendor specific severity level. Certain normalized threat rules will use normalizedSeverity to pass a dynamic severity into the signal.

### Examples

#### Failed User Logon

|                        |                    |
|:------------------------|:--------------------|
| **Record Type**        | Authentication     |
| **normalizedAction**   | logon              |
| **normalizedResource** | account            |
| **normalizedCause**    | incorrect password |
| **success**            | false              |

#### Firewall Denied Traffic

|                        |           |
|:------------------------|:-----------|
| **Record Type**        | Network   |
| **normalizedResource** | network   |
| **normalizedAction**   | deny      |
| **normalizedCause**    | deny list |
| **success**            | false     |
| **normalizedSeverity** | 2         |

#### Successful Process Execution

|                        |                 |
|:------------------------|:-----------------|
| **Record Type**        | EndpointProcess |
| **normalizedResource** | process         |
| **normalizedAction**   | execute         |
| **success**            | true            |

#### Successful Account Management

|                        |         |
|:------------------------|:---------|
| **Record Type**        | Audit   |
| **normalizedAction**   | change  |
| **normalizedResource** | account |
| **success**            | true    |
