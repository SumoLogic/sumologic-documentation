---
id: inventory-sources-and-data
title: Inventory Sources and Data
sidebar_label: Inventory Sources and Data
description: Inventory data is information about computers and users in your environment that CSE uses to provide context to Entities in the CSE UI.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This topic has information about _inventory sources_ and the _inventory data_ they collect.

Inventory data is information about computers and users in your environment that CSE uses to provide context to Entities in the CSE UI. For example, when an analyst is investigating a user or system, it might be beneficial to know the department or manager to which they belong.

In addition to providing context to CSE Insights and Entities, inventory data can be leveraged in other beneficial ways. For example, you can save computer and user information to a lookup table and use the data for search time enrichment. For more information, see [Save Inventory Data to a Lookup Table](/docs/cse/administration/save-inventory-data-lookup-table.md)

## Inventory data in the CSE UI

The screenshots in this section show how CSE presents inventory data in the UI.

This screenshot shows inventory data for a user for a user on the **Insight Details** page. When you mouse over the **Entity** value a popup appears, and displays any inventory that is available for the Entity.

<img src={useBaseUrl('img/cse/entity-data-popup.png')} alt="CSE image" width="400" />

This screenshot shows the **Entity Details** page; inventory data is displayed for a user.

<img src={useBaseUrl('img/cse/entity-inventory.png')} alt="CSE image" width="400"/>

## About inventory data sources

Sumo Logic provides a number of [Sources](/docs/send-data/choose-collector-source) you can use to ingest inventory data from services such as Microsoft Azure AD, Carbon Black, and AWS EC2. Each inventory source is listed in the [Inventory Source Mappings](#inventory-source-mappings) section below. The mapping table for each source shows the inventory attributes that are populated and the associated data source field or fields for each.

Some of the inventory sources are strictly for collecting inventory data—such sources usually include “Inventory” in the source name, for example, the **Microsoft Azure AD Inventory Source**. A few of the sources that collect inventory data also collect event data. For example, the **Sailpoint Source** collects inventory data about users and also collects events from the SalePoint Search API.

Some inventory sources provide user inventory information, some provide computer inventory information, and some provide both. The table below lists currently available inventory sources.

| Inventory source | Type of source | Inventory data collected |
| :-- | :-- | :-- |
| [CSE AWS EC2 Inventory Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/cse-aws-ec-inventory-source.md)| Cloud-to-Cloud | Computer |
| [Microsoft Azure AD Inventory Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/microsoft-azure-ad-inventory-source.md) | Cloud-to-Cloud | Computer and User |
| [Carbon Black Inventory Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/carbon-black-inventory-source.md) | Cloud-to-Cloud | Computer |
| [Google Workspace Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/google-workspace-source.md) | Cloud-to-Cloud | User |
| [Okta Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/okta-source.md) | Cloud-to-Cloud | User |
| [Sailpoint Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/sailpoint-source.md) | Cloud-to-Cloud | User |
| [SentinelOne Mgmt API Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/sentinelone-mgmt-api-source.md) | Cloud-to-Cloud | Computer |
| [Tenable Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/tenable-source.md) | Cloud-to-Cloud | Computer |  
|[Windows Active Directory Inventory Source](/docs/send-data/installed-collectors/sources/windows-active-directory-inventory-source.md) | Part of Installed Collector | Computer and User |  

## Best practices for collecting inventory data

Sumo Logic Sources that collect inventory data generally have a configuration setting that controls the frequency of collection. For example, the Windows Active Directory Inventory Source has a **Fetch Interval** option. Similarly, the Carbon Black Inventory Source has a **Polling Interval** option. These frequency options are typically set to a sensible value, between 10 to 24 hours. We recommend a frequency of 24 hours. Do not change the frequency to more often than 10 hours—if you do, you will end up collecting a lot of redundant data.

## Searching inventory data

You can search the inventory data collected by inventory sources in a log search tab in Sumo Logic. You can scope your search using [built-in metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata.md), for example, by specifying the source category assigned to the inventory source:

```
_sourceCategory=AD_inventory
```

You can use run a broader search using `_siemDataType=Inventory`

## Inventory source mappings  
There are two types of normalized inventory objects, Computers and Users. Some sources only support one type of object, others both. For each inventory source mapped into the normalized inventory object, the original data is stored in the `rawRecord` attribute.

### CSE AWS (EC2) Inventory Source - Computer

| Inventory Attribute | Data Source Field | Note |  
| :-- | :-- | :-- |
| uniqueID | Account Id + Instance ID | A globally unique ID that distinguishes this object from inventory from all other sources |
| ip | PublicIpAddress  | If PublicIpAddress is not defined it will fall back to PrivateIpAddress |
| hostname | PublicDnsName | If PublicDnsName is not defined (or is an empty string) it will fall back to PrivateDnsName |
 normalizedHostname | Normalized form of PublicDnsName | Falls back to Normalized form of PrivateDnsName |  
| osVersion | os_version |
| deviceUniqueId | Instance ID | A per-source unique ID |

### Microsoft Azure AD Inventory Source - Computer and User

#### Computer inventory data mapping  

| Inventory Attribute | Data Source Field | Note |
| :-- | :-- | :-- |
| uniqueID | “AzureAD” + deviceID | A globally unique ID that distinguishes this object from inventory from all other sources |
| hostname | displayName |   |  
| normalizedHostname | Normalized form of displayName |   |
| computerName | displayName |   |
| groups | memberOf |   |
| os | operatingSystem |    |
| osVersion | operatingSystemVersion |   |
| deviceUniqueId | deviceId | A per-source unique ID |

#### User inventory data mapping

| Inventory Attribute | Data Source Field | Note |
| :-- | :-- | :-- |
| uniqueID | “AzureAD” + ID | A globally unique ID that distinguishes this object from inventory from all other sources |  
| userId | ID | A per-source unique ID |  |
| username | userPrincipalName |   |
| normalizedUsername | Normalized form of userPrincipalName |   |   
| groups | memberOf |   |  
| givenName | givenName |   |
| lastName | surname |   |
| department | department |   |  

### Carbon Black Inventory Source - Computer

| Inventory Attribute | Data Source Field | Note |
| :-- | :-- | :-- |
| uniqueID | “carbonblack” + ID | A globally unique ID that distinguishes this object from inventory from all other sources |  
| hostname | name | Falls back to ip (see below) if name is not defined |  
| normalizedHostname | Normalized form of name |   |  |  |  |  |  |  |  
| computerName | displayName |   |   
| ip | last_external_ip_address     | Falls back to last_internal_ip_address |   
| osVersion | os_version |   |
| deviceUniqueId | ID | A per-source unique ID |   

#### Cylance Source - Computer

|  Inventory Attribute | Data Source Field | Note |
| :-- | :-- | :-- |
| uniqueID | “cylance” + host_name | A globally unique ID that distinguishes this object from inventory from all other sources. <br/> Falls back to ip_address if hostname is not defined |  
| hostname | host_name |   |  
| normalizedHostname | Normalized form of host_name |   |  
| osVersion | os_version |   |  |  
| deviceUniqueId | ID | A per-source unique ID. |  |

### Google Workspace Inventory Source - User

| Inventory Attribute | Data Source Field | Note |  
| :-- | :-- | :-- |
| uniqueID | “google-workspace” + ID | A globally unique ID that distinguishes this object from inventory from all other sources. |
| userId | ID | A per-source unique ID. |   
| username | primaryEmail |   |
| normalizedUsername | Normalized form of primaryEmail |   |   
| givenName | name.givenName |   |
| lastName | name.FamilyName |   |
| emails | emails.address |   |  

### Okta Source - User

| Inventory Attribute | Data Source Field | Note |
| :-- | :-- | :-- |
 uniqueID | “okta” + ID | A globally unique ID that distinguishes this object from inventory from all other sources. |  
 username | profile.login |   |  
 normalizedUsername | Normalized form of profile.login |   |  
 givenName | profile.firstName |    
 lastName | profile.lastName |   |  
 emails | credentials.emails.value |   |  

### Sailpoint Source - User

| Inventory Attribute | Data Source Field | Note |  
| :-- | :-- | :-- |
| uniqueID | “sailpoint” + ID | A globally unique ID that distinguishes this object from inventory from all other sources |
| username | email |   |   
| normalizedUsername | Normalized form of email |   |
| givenName | name |   |
| emails | email |   |

### Tenable Source - Computer  

| Inventory Attribute | Data Source Field | Note |  
| :-- | :-- | :-- |
| uniqueID | “tenable” + id | A globally unique ID that distinguishes this object from inventory from all other sources. |
| computername | hostnames.1 |   |  
| normalizedComputerName | Normalized form of hostnames.1 |    
| hostname | hostnames.1 |   |
| normalizedHostname | Normalized form of computerName |   |    
| os | operating_systems.1 |   |  |  |  |  |  |  |  
| deviceUniqueId | id | A per-source unique ID. |  |
| ip | ipv4s |   |  
| natIp | ipv4s |   |

### Windows Active Directory Inventory Source

#### Computer inventory data mapping

| Inventory Attribute | Data Source Field | Note |  
| :-- | :-- | :-- |
| uniqueID | objectGUID | A globally unique ID that distinguishes this object from inventory from all other sources. |
| computername | cn |   |  
| hostname | dNSHostName |   |   
| normalizedHostname | Normalized form of dNSHostName |   |   
| deviceUniqueId | objectSid | A per-source unique ID. |  
| os | operatingSystem |   |  
| osVersion | operatingSystemVersion |   |
| groups | memberOf | Windows groups are reformatted from the LDAP form to a basic name.

#### User inventory data mapping

| Inventory Attribute | Data Source Field | Note |   
| :-- | :-- | :-- |
| uniqueID | objectSid | A globally unique ID that distinguishes this object from inventory from all other sources. |  
| userId | objectSid | A per-source unique ID. |
| username | sAMAccountName |   |  
| normalizedUsername | Normalized form of sAMAccountName |   |  
| givenName | givenName |   |  
| middleName | middleName |   |   
| lastName | sn |   |    
| emails | mail |   |
| groups | memberOf | Windows groups are reformatted from the LDAP form to a basic name. |  
