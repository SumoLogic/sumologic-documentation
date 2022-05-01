---
id: schema-attributes
---

# Schema Attributes

This topic defines the attributes in CSE Schema v3. 

## accountId

| | |
|--|--|
| **Description**           | A unique identifier tied to an organizational account, such as a tenant. Common with cloud services where sub-accounts or multiple tenants can be present. Not to be used as a user account identifier. |
| **Type**                  | string |
| **Can be set by mapping** | True |
| **Enrichment field**      | False |

## action

|                           |                                                                                      |
|---------------------------|--------------------------------------------------------------------------------------|
| **Description**           | Action summarizes an operation undertaken by a device or user and recorded in a log. |
| **Type**                  | string                                                                               |
| **Can be set by mapping** | True                                                                                 |
| **Enrichment field**      | False                                                                                |

## application

|                           |                                                                                                                            |
|---------------------------|----------------------------------------------------------------------------------------------------------------------------|
| **Description**           | A service or software application referenced in a log indicating its execution, presence, or as context for a given event. |
| **Type**                  | string                                                                                                                     |
| **Can be set by mapping** | True                                                                                                                       |
| **Enrichment field**      | False                                                                                                                      |

## authProvider

| | |
|--|--|
| **Description**           | The SSO provider for an authentication attempt. Often found in cloud authentication events and is expected to be NULL if SSO was not used for the authentication attempt. |
| **Type**                  | string |
| **Can be set by mapping** | True |
| **Enrichment field**      | False |

## baseImage

|                           |                                                                                                  |
|---------------------------|--------------------------------------------------------------------------------------------------|
| **Description**           | The name of an executable process. Often found in process auditing and malware detection events. |
| **Type**                  | string                                                                                           |
| **Can be set by mapping** | True                                                                                             |
| **Enrichment field**      | False                                                                                            |

## bytesIn

|                           |                                  |
|---------------------------|----------------------------------|
| **Description**           | Amount of data received in bytes |
| **Type**                  | long                             |
| **Can be set by mapping** | True                             |
| **Enrichment field**      | False                            |

## bytesOut

|                           |                              |
|---------------------------|------------------------------|
| **Description**           | Amount of data sent in bytes |
| **Type**                  | long                         |
| **Can be set by mapping** | True                         |
| **Enrichment field**      | False                        |

## cause

|                           |                                                                                                                 |
|---------------------------|-----------------------------------------------------------------------------------------------------------------|
| **Description**           | Complementary to Cause, this field describes the reason for any particular outcome in a record in a common way. |
| **Type**                  | string                                                                                                          |
| **Can be set by mapping** | True                                                                                                            |
| **Enrichment field**      | False                                                                                                           |

## changeTarget

|                           |                                                                                                     |
|---------------------------|-----------------------------------------------------------------------------------------------------|
| **Description**           | The user, group, policy or other resource which is to be or has been modified, deleted, or created. |
| **Type**                  | string                                                                                              |
| **Can be set by mapping** | True                                                                                                |
| **Enrichment field**      | False                                                                                               |

## changeType

| | |
|--|--|
| **Description**           | The nature of the modification (modify, delete, create) and often the category of the object to be acted upon (user, group, policy, or other resource). |
| **Type**                  | string                                                                                                                                                  |
| **Can be set by mapping** | True                                                                                                                                                    |
| **Enrichment field**      | False                                                                                                                                                   |

## commandLine

| | |
|--|--|
| **Description**           | The instruction or set of instructions inputted into a text interface such as the command prompt (cmd.exe) or PowerShell in Windows, or terminal on Unix based systems. |
| **Type**                  | string                                                                                                                                                                  |
| **Can be set by mapping** | True                                                                                                                                                                    |
| **Enrichment field**      | False                                                                                                                                                                   |

## cseSignal

|                           |                                                                              |
|---------------------------|------------------------------------------------------------------------------|
| **Description**           | Used for signals received via log path e.g. scheduled search alert from CIP. |
| **Type**                  | map\[string\]string                                                          |
| **Can be set by mapping** | False                                                                        |
| **Enrichment field**      | False                                                                        |

## day

|                           |                                |
|---------------------------|--------------------------------|
| **Description**           | Day pulled from the timestamp. |
| **Type**                  | int                            |
| **Can be set by mapping** | False                          |
| **Enrichment field**      | False                          |

## description

| | |
|--|--|
| **Description**           | The summary conveying the high level meaning of a log message in a human readable form. In some circumstances no summary is provided in the log, this field is often manually defined in the mapping as a constant or as a lookup based on event IDs in the log message. |
| **Type**                  | string                                                                                                                                                                                                                                                                   |
| **Can be set by mapping** | True                                                                                                                                                                                                                                                                     |
| **Enrichment field**      | False                                                                                                                                                                                                                                                                    |

## device_hostname

| | |
|--|--|
| **Description**           | The computer name that generated the log message. Common examples include, but are not limited to, the endpoint reporting an infection or the network appliance reporting allowed or blocked network traffic. In cases where the log data has a source or destination context, there are situations where identical data is populated in one of those fields and this field. An example would be authentication logs from a firewall. The device_hostname would be the same as the dstDevice_hostname because the firewall is reporting a network authentication log about itself. |
| **Type**                  | string |
| **Can be set by mapping** | True |
| **Enrichment field**      | False |

## device_hostname_raw

|                           |                                                                                                              |
|---------------------------|--------------------------------------------------------------------------------------------------------------|
| **Description**           | The device hostname before any enrichments are applied. As the hostname appears in the original log message. |
| **Type**                  | string                                                                                                       |
| **Can be set by mapping** | False                                                                                                        |
| **Enrichment field**      | True                                                                                                         |

## device_ip

| | |
|---|--|
| **Description**           | The internet protocol (IP) address of a computer that generated the log message. Common examples include, but are not limited to, the endpoint reporting an infection or the network appliance reporting allowed or blocked network traffic. In cases where the log data has a source or destination context, there are situations where identical data is populated in one of those fields and this field. An example would be authentication logs from a firewall. The device_ip would be the same as the dstDevice_ip because the firewall is reporting a network authentication log about itself. |
| **Type**                  | string |
| **Can be set by mapping** | True |
| **Enrichment field**      | False |

## device_ip_asnNumber

|                           |                                                                                                                                               |
|---------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------|
| **Description**           | The autonomous system number for the device IP address based on the MaxMind GeoIP database, typically assigned to internet service providers. |
| **Type**                  | int                                                                                                                                           |
| **Can be set by mapping** | False                                                                                                                                         |
| **Enrichment field**      | True                                                                                                                                          |

## device_ip_asnOrg

|                           |                                                                                                                                |
|---------------------------|--------------------------------------------------------------------------------------------------------------------------------|
| **Description**           | The organzation associated with the ASN based on the MaxMind GeoIP database, typically assigned to internet service providers. |
| **Type**                  | string                                                                                                                         |
| **Can be set by mapping** | False                                                                                                                          |
| **Enrichment field**      | True                                                                                                                           |

## device_ip_city

|                           |                                                                     |
|---------------------------|---------------------------------------------------------------------|
| **Description**           | City for the device IP address based on the MaxMind GeoIP database. |
| **Type**                  | string                                                              |
| **Can be set by mapping** | False                                                               |
| **Enrichment field**      | True                                                                |

## device_ip_countryCode

|                           |                                                                                               |
|---------------------------|-----------------------------------------------------------------------------------------------|
| **Description**           | Country code (e.g. US, CA, DE) for the device IP address based on the MaxMind GeoIP database. |
| **Type**                  | string                                                                                        |
| **Can be set by mapping** | False                                                                                         |
| **Enrichment field**      | True                                                                                          |

## device_ip_countryName

|                           |                                                                                    |
|---------------------------|------------------------------------------------------------------------------------|
| **Description**           | Name of the country for the device IP address based on the MaxMind GeoIP database. |
| **Type**                  | string                                                                             |
| **Can be set by mapping** | False                                                                              |
| **Enrichment field**      | True                                                                               |

## device_ip_ipv4IntValue

|                           |                                                             |
|---------------------------|-------------------------------------------------------------|
| **Description**           | The ipv4 address stored as an unsigned 64-bit integer value |
| **Type**                  | long                                                        |
| **Can be set by mapping** | False                                                       |
| **Enrichment field**      | True                                                        |

## device_ip_isInternal

|                           |                                                                                                       |
|---------------------------|-------------------------------------------------------------------------------------------------------|
| **Description**           | Signifies whether the device IP address is internal or external. True if internal, False if external. |
| **Type**                  | boolean                                                                                               |
| **Can be set by mapping** | False                                                                                                 |
| **Enrichment field**      | True                                                                                                  |

## device_ip_isp

|                           |                                                                                  |
|---------------------------|----------------------------------------------------------------------------------|
| **Description**           | Internet Service Provider for the device IP based on the MaxMind GeoIP database. |
| **Type**                  | string                                                                           |
| **Can be set by mapping** | False                                                                            |
| **Enrichment field**      | True                                                                             |

## device_ip_latitude

|                           |                                                                                               |
|---------------------------|-----------------------------------------------------------------------------------------------|
| **Description**           | Geographic latitude coordinate for the device IP address based on the MaxMind GeoIP database. |
| **Type**                  | float                                                                                         |
| **Can be set by mapping** | False                                                                                         |
| **Enrichment field**      | True                                                                                          |

## device_ip_location

|                           |                                                                                                                                     |
|---------------------------|-------------------------------------------------------------------------------------------------------------------------------------|
| **Description**           | This value is populated based on uploaded Network Blocks. When there is a match, it will be populated with the network block label. |
| **Type**                  | string                                                                                                                              |
| **Can be set by mapping** | False                                                                                                                               |
| **Enrichment field**      | True                                                                                                                                |

## device_ip_longitude

|                           |                                                                                     |
|---------------------------|-------------------------------------------------------------------------------------|
| **Description**           | Longitude coordinate for the device IP address based on the MaxMind GeoIP database. |
| **Type**                  | float                                                                               |
| **Can be set by mapping** | False                                                                               |
| **Enrichment field**      | True                                                                                |

## device_ip_region

|                           |                                                                                   |
|---------------------------|-----------------------------------------------------------------------------------|
| **Description**           | State or Territory for the device IP address based on the MaxMind GeoIP database. |
| **Type**                  | string                                                                            |
| **Can be set by mapping** | False                                                                             |
| **Enrichment field**      | True                                                                              |

## device_ip_version

|                           |                                              |
|---------------------------|----------------------------------------------|
| **Description**           | Version of the IP protocol of the device IP. |
| **Type**                  | int                                          |
| **Can be set by mapping** | False                                        |
| **Enrichment field**      | True                                         |

## device_mac

| | |
|--|--|
| **Description**           | The media access control (MAC) ID of the device that generated the log message. Common examples include, but are not limited to, the endpoint reporting an infection or the network appliance reporting allowed or blocked network traffic. In cases where the log data has a source or destination context, there are situations where identical data is populated in one of those fields and this field. An example would be authentication logs from a firewall. The device_mac would be the same as the dstDevice_mac because the firewall is reporting a network authentication log about itself. |
| **Type**                  | string |
| **Can be set by mapping** | True |
| **Enrichment field**      | False |

## device_natIp

| | |
|--|--|
| **Description**           | The external network address translated (NAT) IP address of the device that generated the log message. Common examples include, but are not limited to, the endpoint reporting an infection or the network appliance reporting allowed or blocked network traffic. In cases where the log data has a source or destination context, there are situations where identical data is populated in one of those fields and this field. An example would be authentication logs from a firewall. The device_natIp would be the same as the dstDevice_natIp because the firewall is reporting a network authentication log about itself. |
| **Type** | string |
| **Can be set by mapping** | True |
| **Enrichment field**      | False |

## device_natIp_asnNumber

| | |
|--|--|
| **Description** | The autonomous system number for the NAT device IP address based on the MaxMind GeoIP database, typically assigned to internet service providers. |
| **Type** | int |
| **Can be set by mapping** | False |
| **Enrichment field**      | True |

## device_natIp_asnOrg

|                           |                                                                                                                                |
|---------------------------|--------------------------------------------------------------------------------------------------------------------------------|
| **Description**           | The organzation associated with the ASN based on the MaxMind GeoIP database, typically assigned to internet service providers. |
| **Type**                  | string                                                                                                                         |
| **Can be set by mapping** | False                                                                                                                          |
| **Enrichment field**      | True                                                                                                                           |

## device_natIp_city

|                           |                                                                         |
|---------------------------|-------------------------------------------------------------------------|
| **Description**           | City for the NAT device IP address based on the MaxMind GeoIP database. |
| **Type**                  | string                                                                  |
| **Can be set by mapping** | False                                                                   |
| **Enrichment field**      | True                                                                    |

## device_natIp_countryCode

|                           |                                                                                                   |
|---------------------------|---------------------------------------------------------------------------------------------------|
| **Description**           | Country code (e.g. US, CA, DE) for the NAT device IP address based on the MaxMind GeoIP database. |
| **Type**                  | string                                                                                            |
| **Can be set by mapping** | False                                                                                             |
| **Enrichment field**      | True                                                                                              |

## device_natIp_countryName

|                           |                                                                                        |
|---------------------------|----------------------------------------------------------------------------------------|
| **Description**           | Name of the country for the NAT device IP address based on the MaxMind GeoIP database. |
| **Type**                  | string                                                                                 |
| **Can be set by mapping** | False                                                                                  |
| **Enrichment field**      | True                                                                                   |

## device_natIp_ipv4IntValue

|                           |                                                             |
|---------------------------|-------------------------------------------------------------|
| **Description**           | The ipv4 address stored as an unsigned 64-bit integer value |
| **Type**                  | long                                                        |
| **Can be set by mapping** | False                                                       |
| **Enrichment field**      | True                                                        |

## device_natIp_isInternal

|                           |                                                                                                           |
|---------------------------|-----------------------------------------------------------------------------------------------------------|
| **Description**           | Signifies whether the NAT device IP address is internal or external. True if internal, False if external. |
| **Type**                  | boolean                                                                                                   |
| **Can be set by mapping** | False                                                                                                     |
| **Enrichment field**      | True                                                                                                      |

## device_natIp_isp

|                           |                                                                                      |
|---------------------------|--------------------------------------------------------------------------------------|
| **Description**           | Internet Service Provider for the NAT device IP based on the MaxMind GeoIP database. |
| **Type**                  | string                                                                               |
| **Can be set by mapping** | False                                                                                |
| **Enrichment field**      | True                                                                                 |

## device_natIp_latitude

|                           |                                                                                                   |
|---------------------------|---------------------------------------------------------------------------------------------------|
| **Description**           | Geographic latitude coordinate for the NAT device IP address based on the MaxMind GeoIP database. |
| **Type**                  | float                                                                                             |
| **Can be set by mapping** | False                                                                                             |
| **Enrichment field**      | True                                                                                              |

## device_natIp_location

|                           |                                                                                                                                     |
|---------------------------|-------------------------------------------------------------------------------------------------------------------------------------|
| **Description**           | This value is populated based on uploaded Network Blocks. When there is a match, it will be populated with the network block label. |
| **Type**                  | string                                                                                                                              |
| **Can be set by mapping** | False                                                                                                                               |
| **Enrichment field**      | True                                                                                                                                |

## device_natIp_longitude

|                           |                                                                                         |
|---------------------------|-----------------------------------------------------------------------------------------|
| **Description**           | Longitude coordinate for the NAT device IP address based on the MaxMind GeoIP database. |
| **Type**                  | float                                                                                   |
| **Can be set by mapping** | False                                                                                   |
| **Enrichment field**      | True                                                                                    |

## device_natIp_region

|                           |                                                                                       |
|---------------------------|---------------------------------------------------------------------------------------|
| **Description**           | State or Territory for the NAT device IP address based on the MaxMind GeoIP database. |
| **Type**                  | string                                                                                |
| **Can be set by mapping** | False                                                                                 |
| **Enrichment field**      | True                                                                                  |

## device_natIp_version

|                           |                                                  |
|---------------------------|--------------------------------------------------|
| **Description**           | Version of the IP protocol of the NAT device IP. |
| **Type**                  | int                                              |
| **Can be set by mapping** | False                                            |
| **Enrichment field**      | True                                             |

## device_osName

| | |
|--|--|
| **Description**           | The operating system name present on the computer that generated the log message. Common examples include, but are not limited to, the endpoint reporting an infection or the network appliance reporting allowed or blocked network traffic. In cases where the log data has a source or destination context, there are situations where identical data is populated in one of those fields and this field. An example would be authentication logs from a firewall. The device_osName would be the same as the dstDevice_osName because the firewall is reporting a network authentication log about itself. |
| **Type**                  | string |
| **Can be set by mapping** | True |
| **Enrichment field**      | False |

## device_uniqueId

| | |
|--|--|
| **Description**           | The vendor or product specific identifier for a computer that generated the log message. Common examples include, but are not limited to, the endpoint reporting an infection or the network appliance reporting allowed or blocked network traffic. This field is also frequently used by cloud providers to identify instances. In cases where the log data has a source or destination context, there are situations where identical data is populated in one of those fields and this field. An example would be authentication logs from a firewall. The device_mac would be the same as the dstDevice_mac because the firewall is reporting a network authentication log about itself. |
| **Type**                  | string |
| **Can be set by mapping** | True |
| **Enrichment field**      | False |

## dns_query

|                           |                                                                        |
|---------------------------|------------------------------------------------------------------------|
| **Description**           | The entire DNS request made from the client machine to the DNS server. |
| **Type**                  | string                                                                 |
| **Can be set by mapping** | True                                                                   |
| **Enrichment field**      | False                                                                  |

## dns_queryDomain

|                           |                                                                               |
|---------------------------|-------------------------------------------------------------------------------|
| **Description**           | The fully qualified domain name being queried for in a DNS request if present |
| **Type**                  | string                                                                        |
| **Can be set by mapping** | True                                                                          |
| **Enrichment field**      | False                                                                         |

## dns_queryDomain_alexaRank

|                           |                                                                     |
|---------------------------|---------------------------------------------------------------------|
| **Description**           | Domain ranking in the alexa top 10k sites. NULL if not in the list. |
| **Type**                  | long                                                                |
| **Can be set by mapping** | False                                                               |
| **Enrichment field**      | True                                                                |

## dns_queryDomain_entropyFqdn

|                           |                                            |
|---------------------------|--------------------------------------------|
| **Description**           | The entropy calculation of the fqdn field. |
| **Type**                  | double                                     |
| **Can be set by mapping** | False                                      |
| **Enrichment field**      | True                                       |

## dns_queryDomain_entropyRootDomain

|                           |                                                  |
|---------------------------|--------------------------------------------------|
| **Description**           | The entropy calculation of the rootDomain field. |
| **Type**                  | double                                           |
| **Can be set by mapping** | False                                            |
| **Enrichment field**      | True                                             |

## dns_queryDomain_entropySubDomain

|                           |                                                                     |
|---------------------------|---------------------------------------------------------------------|
| **Description**           | Entropy is the measure of disorder. If this case on the sub domain. |
| **Type**                  | double                                                              |
| **Can be set by mapping** | False                                                               |
| **Enrichment field**      | True                                                                |

## dns_queryDomain_fqdn

|                           |                                                                |
|---------------------------|----------------------------------------------------------------|
| **Description**           | The fully qualified domain name (e.g. somehost.sumologic.com). |
| **Type**                  | string                                                         |
| **Can be set by mapping** | False                                                          |
| **Enrichment field**      | True                                                           |

## dns_queryDomain_possibleDga

|                           |                                                                                                                        |
|---------------------------|------------------------------------------------------------------------------------------------------------------------|
| **Description**           | Whether or not this domain is potentially a Domain Generation Algorithm created domain based on our backend analytics. |
| **Type**                  | boolean                                                                                                                |
| **Can be set by mapping** | False                                                                                                                  |
| **Enrichment field**      | True                                                                                                                   |

## dns_queryDomain_possibleDynDns

|                           |                                                                           |
|---------------------------|---------------------------------------------------------------------------|
| **Description**           | A likely dynamically (not static) IP address associated with this domain. |
| **Type**                  | boolean                                                                   |
| **Can be set by mapping** | False                                                                     |
| **Enrichment field**      | True                                                                      |

## dns_queryDomain_rootDomain

|                           |                                                                 |
|---------------------------|-----------------------------------------------------------------|
| **Description**           | The root domain of hostname in the domain (e.g. sumologic.com). |
| **Type**                  | string                                                          |
| **Can be set by mapping** | False                                                           |
| **Enrichment field**      | True                                                            |

## dns_queryDomain_tld

|                           |                                                                    |
|---------------------------|--------------------------------------------------------------------|
| **Description**           | The top-level-domain field of the domain name (e.g. com, net, org) |
| **Type**                  | string                                                             |
| **Can be set by mapping** | False                                                              |
| **Enrichment field**      | True                                                               |

## dns_queryType

|                           |                                                                 |
|---------------------------|-----------------------------------------------------------------|
| **Description**           | The type of DNS record which is being queried for by the client |
| **Type**                  | string                                                          |
| **Can be set by mapping** | True                                                            |
| **Enrichment field**      | False                                                           |

## dns_reply

|                           |                                                                                            |
|---------------------------|--------------------------------------------------------------------------------------------|
| **Description**           | The DNS reply which can be a single record or multiple records concatenated into a string. |
| **Type**                  | string                                                                                     |
| **Can be set by mapping** | True                                                                                       |
| **Enrichment field**      | False                                                                                      |

## dns_replyDomain

|                           |                                                                     |
|---------------------------|---------------------------------------------------------------------|
| **Description**           | The domain contained within the DNS if the reply contains a domain. |
| **Type**                  | string                                                              |
| **Can be set by mapping** | True                                                                |
| **Enrichment field**      | False                                                               |

## dns_replyDomain_alexaRank

|                           |                                                                     |
|---------------------------|---------------------------------------------------------------------|
| **Description**           | Domain ranking in the alexa top 10k sites. NULL if not in the list. |
| **Type**                  | long                                                                |
| **Can be set by mapping** | False                                                               |
| **Enrichment field**      | True                                                                |

## dns_replyDomain_entropyFqdn

|                           |                                            |
|---------------------------|--------------------------------------------|
| **Description**           | The entropy calculation of the fqdn field. |
| **Type**                  | double                                     |
| **Can be set by mapping** | False                                      |
| **Enrichment field**      | True                                       |

## dns_replyDomain_entropyRootDomain

|                           |                                                  |
|---------------------------|--------------------------------------------------|
| **Description**           | The entropy calculation of the rootDomain field. |
| **Type**                  | double                                           |
| **Can be set by mapping** | False                                            |
| **Enrichment field**      | True                                             |

## dns_replyDomain_entropySubDomain

|                           |                                                                     |
|---------------------------|---------------------------------------------------------------------|
| **Description**           | Entropy is the measure of disorder. If this case on the sub domain. |
| **Type**                  | double                                                              |
| **Can be set by mapping** | False                                                               |
| **Enrichment field**      | True                                                                |

## dns_replyDomain_fqdn

|                           |                                                                |
|---------------------------|----------------------------------------------------------------|
| **Description**           | The fully qualified domain name (e.g. somehost.sumologic.com). |
| **Type**                  | string                                                         |
| **Can be set by mapping** | False                                                          |
| **Enrichment field**      | True                                                           |

## dns_replyDomain_possibleDga

|                           |                                                                                                                        |
|---------------------------|------------------------------------------------------------------------------------------------------------------------|
| **Description**           | Whether or not this domain is potentially a Domain Generation Algorithm created domain based on our backend analytics. |
| **Type**                  | boolean                                                                                                                |
| **Can be set by mapping** | False                                                                                                                  |
| **Enrichment field**      | True                                                                                                                   |

## dns_replyDomain_possibleDynDns

|                           |                                                                           |
|---------------------------|---------------------------------------------------------------------------|
| **Description**           | A likely dynamically (not static) IP address associated with this domain. |
| **Type**                  | boolean                                                                   |
| **Can be set by mapping** | False                                                                     |
| **Enrichment field**      | True                                                                      |

## dns_replyDomain_rootDomain

|                           |                                                                 |
|---------------------------|-----------------------------------------------------------------|
| **Description**           | The root domain of hostname in the domain (e.g. sumologic.com). |
| **Type**                  | string                                                          |
| **Can be set by mapping** | False                                                           |
| **Enrichment field**      | True                                                            |

## dns_replyDomain_tld

|                           |                                                                    |
|---------------------------|--------------------------------------------------------------------|
| **Description**           | The top-level-domain field of the domain name (e.g. com, net, org) |
| **Type**                  | string                                                             |
| **Can be set by mapping** | False                                                              |
| **Enrichment field**      | True                                                               |

## dns_replyIp

|                           |                                                                              |
|---------------------------|------------------------------------------------------------------------------|
| **Description**           | The IP address contained within the DNS if the reply contains an IP address. |
| **Type**                  | string                                                                       |
| **Can be set by mapping** | True                                                                         |
| **Enrichment field**      | False                                                                        |

## dns_replyIp_asnNumber

|                           |                                                                                                                                                  |
|---------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------|
| **Description**           | The autonomous system number for the DNS Reply IP address based on the MaxMind GeoIP database, typically assigned to internet service providers. |
| **Type**                  | int                                                                                                                                              |
| **Can be set by mapping** | False                                                                                                                                            |
| **Enrichment field**      | True                                                                                                                                             |

## dns_replyIp_asnOrg

|                           |                                                                                                                                |
|---------------------------|--------------------------------------------------------------------------------------------------------------------------------|
| **Description**           | The organzation associated with the ASN based on the MaxMind GeoIP database, typically assigned to internet service providers. |
| **Type**                  | string                                                                                                                         |
| **Can be set by mapping** | False                                                                                                                          |
| **Enrichment field**      | True                                                                                                                           |

## dns_replyIp_city

|                           |                                                                        |
|---------------------------|------------------------------------------------------------------------|
| **Description**           | City for the DNS Reply IP address based on the MaxMind GeoIP database. |
| **Type**                  | string                                                                 |
| **Can be set by mapping** | False                                                                  |
| **Enrichment field**      | True                                                                   |

## dns_replyIp_countryCode

|                           |                                                                                                  |
|---------------------------|--------------------------------------------------------------------------------------------------|
| **Description**           | Country code (e.g. US, CA, DE) for the DNS Reply IP address based on the MaxMind GeoIP database. |
| **Type**                  | string                                                                                           |
| **Can be set by mapping** | False                                                                                            |
| **Enrichment field**      | True                                                                                             |

## dns_replyIp_countryName

|                           |                                                                                       |
|---------------------------|---------------------------------------------------------------------------------------|
| **Description**           | Name of the country for the DNS Reply IP address based on the MaxMind GeoIP database. |
| **Type**                  | string                                                                                |
| **Can be set by mapping** | False                                                                                 |
| **Enrichment field**      | True                                                                                  |

## dns_replyIp_ipv4IntValue

|                           |                                                             |
|---------------------------|-------------------------------------------------------------|
| **Description**           | The ipv4 address stored as an unsigned 64-bit integer value |
| **Type**                  | long                                                        |
| **Can be set by mapping** | False                                                       |
| **Enrichment field**      | True                                                        |

## dns_replyIp_isInternal

|                           |                                                                                                          |
|---------------------------|----------------------------------------------------------------------------------------------------------|
| **Description**           | Signifies whether the DNS Reply IP address is internal or external. True if internal, False if external. |
| **Type**                  | boolean                                                                                                  |
| **Can be set by mapping** | False                                                                                                    |
| **Enrichment field**      | True                                                                                                     |

## dns_replyIp_isp

|                           |                                                                                     |
|---------------------------|-------------------------------------------------------------------------------------|
| **Description**           | Internet Service Provider for the DNS Reply IP based on the MaxMind GeoIP database. |
| **Type**                  | string                                                                              |
| **Can be set by mapping** | False                                                                               |
| **Enrichment field**      | True                                                                                |

## dns_replyIp_latitude

|                           |                                                                                                  |
|---------------------------|--------------------------------------------------------------------------------------------------|
| **Description**           | Geographic latitude coordinate for the DNS Reply IP address based on the MaxMind GeoIP database. |
| **Type**                  | float                                                                                            |
| **Can be set by mapping** | False                                                                                            |
| **Enrichment field**      | True                                                                                             |

## dns_replyIp_location

|                           |                                                                                                                                     |
|---------------------------|-------------------------------------------------------------------------------------------------------------------------------------|
| **Description**           | This value is populated based on uploaded Network Blocks. When there is a match, it will be populated with the network block label. |
| **Type**                  | string                                                                                                                              |
| **Can be set by mapping** | False                                                                                                                               |
| **Enrichment field**      | True                                                                                                                                |

## dns_replyIp_longitude

|                           |                                                                                        |
|---------------------------|----------------------------------------------------------------------------------------|
| **Description**           | Longitude coordinate for the DNS Reply IP address based on the MaxMind GeoIP database. |
| **Type**                  | float                                                                                  |
| **Can be set by mapping** | False                                                                                  |
| **Enrichment field**      | True                                                                                   |

## dns_replyIp_region

|                           |                                                                                      |
|---------------------------|--------------------------------------------------------------------------------------|
| **Description**           | State or Territory for the DNS Reply IP address based on the MaxMind GeoIP database. |
| **Type**                  | string                                                                               |
| **Can be set by mapping** | False                                                                                |
| **Enrichment field**      | True                                                                                 |

## dns_replyIp_version

|                           |                                                 |
|---------------------------|-------------------------------------------------|
| **Description**           | Version of the IP protocol of the DNS Reply IP. |
| **Type**                  | int                                             |
| **Can be set by mapping** | False                                           |
| **Enrichment field**      | True                                            |

## dns_returnCode

|                           |                                                                  |
|---------------------------|------------------------------------------------------------------|
| **Description**           | -\| The code or message indicating the outcome of a DNS request. |
| **Type**                  | string                                                           |
| **Can be set by mapping** | True                                                             |
| **Enrichment field**      | False                                                            |

## dstDevice_hostname

|                           |                                                             |
|---------------------------|-------------------------------------------------------------|
| **Description**           | The name of the host for which network traffic is destined. |
| **Type**                  | string                                                      |
| **Can be set by mapping** | True                                                        |
| **Enrichment field**      | False                                                       |

## dstDevice_hostname_raw

|                           |                                                                                                                          |
|---------------------------|--------------------------------------------------------------------------------------------------------------------------|
| **Description**           | The destination device hostname before any enrichments are applied. As the hostname appears in the original log message. |
| **Type**                  | string                                                                                                                   |
| **Can be set by mapping** | False                                                                                                                    |
| **Enrichment field**      | True                                                                                                                     |

## dstDevice_ip

|                           |                                                                   |
|---------------------------|-------------------------------------------------------------------|
| **Description**           | The IP address of the host for which network traffic is destined. |
| **Type**                  | string                                                            |
| **Can be set by mapping** | True                                                              |
| **Enrichment field**      | False                                                             |

## dstDevice_ip_asnNumber

|                           |                                                                                                                                                           |
|---------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Description**           | The autonomous system number for the destination device IP address based on the MaxMind GeoIP database, typically assigned to internet service providers. |
| **Type**                  | int                                                                                                                                                       |
| **Can be set by mapping** | False                                                                                                                                                     |
| **Enrichment field**      | True                                                                                                                                                      |

## dstDevice_ip_asnOrg

|                           |                                                                                                                                |
|---------------------------|--------------------------------------------------------------------------------------------------------------------------------|
| **Description**           | The organzation associated with the ASN based on the MaxMind GeoIP database, typically assigned to internet service providers. |
| **Type**                  | string                                                                                                                         |
| **Can be set by mapping** | False                                                                                                                          |
| **Enrichment field**      | True                                                                                                                           |

## dstDevice_ip_city

|                           |                                                                                 |
|---------------------------|---------------------------------------------------------------------------------|
| **Description**           | City for the destination device IP address based on the MaxMind GeoIP database. |
| **Type**                  | string                                                                          |
| **Can be set by mapping** | False                                                                           |
| **Enrichment field**      | True                                                                            |

## dstDevice_ip_countryCode

|                           |                                                                                                           |
|---------------------------|-----------------------------------------------------------------------------------------------------------|
| **Description**           | Country code (e.g. US, CA, DE) for the destination device IP address based on the MaxMind GeoIP database. |
| **Type**                  | string                                                                                                    |
| **Can be set by mapping** | False                                                                                                     |
| **Enrichment field**      | True                                                                                                      |

## dstDevice_ip_countryName

|                           |                                                                                                |
|---------------------------|------------------------------------------------------------------------------------------------|
| **Description**           | Name of the country for the destination device IP address based on the MaxMind GeoIP database. |
| **Type**                  | string                                                                                         |
| **Can be set by mapping** | False                                                                                          |
| **Enrichment field**      | True                                                                                           |

## dstDevice_ip_ipv4IntValue

|                           |                                                             |
|---------------------------|-------------------------------------------------------------|
| **Description**           | The ipv4 address stored as an unsigned 64-bit integer value |
| **Type**                  | long                                                        |
| **Can be set by mapping** | False                                                       |
| **Enrichment field**      | True                                                        |

## dstDevice_ip_isInternal

|                           |                                                                                                                   |
|---------------------------|-------------------------------------------------------------------------------------------------------------------|
| **Description**           | Signifies whether the destination device IP address is internal or external. True if internal, False if external. |
| **Type**                  | boolean                                                                                                           |
| **Can be set by mapping** | False                                                                                                             |
| **Enrichment field**      | True                                                                                                              |

## dstDevice_ip_isp

|                           |                                                                                              |
|---------------------------|----------------------------------------------------------------------------------------------|
| **Description**           | Internet Service Provider for the destination device IP based on the MaxMind GeoIP database. |
| **Type**                  | string                                                                                       |
| **Can be set by mapping** | False                                                                                        |
| **Enrichment field**      | True                                                                                         |

## dstDevice_ip_latitude

|                           |                                                                                                           |
|---------------------------|-----------------------------------------------------------------------------------------------------------|
| **Description**           | Geographic latitude coordinate for the destination device IP address based on the MaxMind GeoIP database. |
| **Type**                  | float                                                                                                     |
| **Can be set by mapping** | False                                                                                                     |
| **Enrichment field**      | True                                                                                                      |

## dstDevice_ip_location

|                           |                                                                                                                                     |
|---------------------------|-------------------------------------------------------------------------------------------------------------------------------------|
| **Description**           | This value is populated based on uploaded Network Blocks. When there is a match, it will be populated with the network block label. |
| **Type**                  | string                                                                                                                              |
| **Can be set by mapping** | False                                                                                                                               |
| **Enrichment field**      | True                                                                                                                                |

## dstDevice_ip_longitude

|                           |                                                                                                 |
|---------------------------|-------------------------------------------------------------------------------------------------|
| **Description**           | Longitude coordinate for the destination device IP address based on the MaxMind GeoIP database. |
| **Type**                  | float                                                                                           |
| **Can be set by mapping** | False                                                                                           |
| **Enrichment field**      | True                                                                                            |

## dstDevice_ip_region

|                           |                                                                                               |
|---------------------------|-----------------------------------------------------------------------------------------------|
| **Description**           | State or Territory for the destination device IP address based on the MaxMind GeoIP database. |
| **Type**                  | string                                                                                        |
| **Can be set by mapping** | False                                                                                         |
| **Enrichment field**      | True                                                                                          |

## dstDevice_ip_version

|                           |                                                          |
|---------------------------|----------------------------------------------------------|
| **Description**           | Version of the IP protocol of the destination device IP. |
| **Type**                  | int                                                      |
| **Can be set by mapping** | False                                                    |
| **Enrichment field**      | True                                                     |

## dstDevice_mac

|                           |                                                                                           |
|---------------------------|-------------------------------------------------------------------------------------------|
| **Description**           | The media access control (MAC) address of the host for which network traffic is destined. |
| **Type**                  | string                                                                                    |
| **Can be set by mapping** | True                                                                                      |
| **Enrichment field**      | False                                                                                     |

## dstDevice_natIp

|                           |                                                                                          |
|---------------------------|------------------------------------------------------------------------------------------|
| **Description**           | The external IP in cases where the internal IP goes through network address translation. |
| **Type**                  | string                                                                                   |
| **Can be set by mapping** | True                                                                                     |
| **Enrichment field**      | False                                                                                    |

## dstDevice_natIp_asnNumber

|                           |                                                                                     |
|---------------------------|-------------------------------------------------------------------------------------|
| **Description**           | An autonomous system number for the IP address based on the MaxMind GeoIP database. |
| **Type**                  | int                                                                                 |
| **Can be set by mapping** | False                                                                               |
| **Enrichment field**      | True                                                                                |

## dstDevice_natIp_asnOrg

|                           |                                                                                          |
|---------------------------|------------------------------------------------------------------------------------------|
| **Description**           | Organization associated with the IP address address based on the MaxMind GeoIP database. |
| **Type**                  | string                                                                                   |
| **Can be set by mapping** | False                                                                                    |
| **Enrichment field**      | True                                                                                     |

## dstDevice_natIp_city

|                           |                                                              |
|---------------------------|--------------------------------------------------------------|
| **Description**           | City for the IP address based on the MaxMind GeoIP database. |
| **Type**                  | string                                                       |
| **Can be set by mapping** | False                                                        |
| **Enrichment field**      | True                                                         |

## dstDevice_natIp_countryCode

|                           |                                                                      |
|---------------------------|----------------------------------------------------------------------|
| **Description**           | Country Code for the IP address based on the MaxMind GeoIP database. |
| **Type**                  | string                                                               |
| **Can be set by mapping** | False                                                                |
| **Enrichment field**      | True                                                                 |

## dstDevice_natIp_countryName

|                           |                                                                      |
|---------------------------|----------------------------------------------------------------------|
| **Description**           | Country Code for the IP address based on the MaxMind GeoIP database. |
| **Type**                  | string                                                               |
| **Can be set by mapping** | False                                                                |
| **Enrichment field**      | True                                                                 |

## dstDevice_natIp_ipv4IntValue

|                           |                                                             |
|---------------------------|-------------------------------------------------------------|
| **Description**           | The ipv4 address stored as an unsigned 64-bit integer value |
| **Type**                  | long                                                        |
| **Can be set by mapping** | False                                                       |
| **Enrichment field**      | True                                                        |

## dstDevice_natIp_isInternal

|                           |                                                                                                |
|---------------------------|------------------------------------------------------------------------------------------------|
| **Description**           | Signifies whether the IP address is internal or external. True if internal, False if external. |
| **Type**                  | boolean                                                                                        |
| **Can be set by mapping** | False                                                                                          |
| **Enrichment field**      | True                                                                                           |

## dstDevice_natIp_isp

|                           |                                                                                   |
|---------------------------|-----------------------------------------------------------------------------------|
| **Description**           | Internet Service Provider for the IP address based on the MaxMind GeoIP database. |
| **Type**                  | string                                                                            |
| **Can be set by mapping** | False                                                                             |
| **Enrichment field**      | True                                                                              |

## dstDevice_natIp_latitude

|                           |                                                                  |
|---------------------------|------------------------------------------------------------------|
| **Description**           | Latitude for the IP address based on the MaxMind GeoIP database. |
| **Type**                  | float                                                            |
| **Can be set by mapping** | False                                                            |
| **Enrichment field**      | True                                                             |

## dstDevice_natIp_location

|                           |                                                                                                                                                  |
|---------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------|
| **Description**           | This value is populated based on the Network Blocks you have uploaded. When there is a match, it will be populated with the network block label. |
| **Type**                  | string                                                                                                                                           |
| **Can be set by mapping** | False                                                                                                                                            |
| **Enrichment field**      | True                                                                                                                                             |

## dstDevice_natIp_longitude

|                           |                                                                   |
|---------------------------|-------------------------------------------------------------------|
| **Description**           | Longitude for the IP address based on the MaxMind GeoIP database. |
| **Type**                  | float                                                             |
| **Can be set by mapping** | False                                                             |
| **Enrichment field**      | True                                                              |

## dstDevice_natIp_region

|                           |                                                                            |
|---------------------------|----------------------------------------------------------------------------|
| **Description**           | State or Territory for the IP address based on the MaxMind GeoIP database. |
| **Type**                  | string                                                                     |
| **Can be set by mapping** | False                                                                      |
| **Enrichment field**      | True                                                                       |

## dstDevice_natIp_version

|                           |                                          |
|---------------------------|------------------------------------------|
| **Description**           | The version of IP protocol (e.g. 4 or 6) |
| **Type**                  | int                                      |
| **Can be set by mapping** | False                                    |
| **Enrichment field**      | True                                     |

## dstDevice_osName

|                           |                                                                                 |
|---------------------------|---------------------------------------------------------------------------------|
| **Description**           | The operating system running on the host for which network traffic is destined. |
| **Type**                  | string                                                                          |
| **Can be set by mapping** | True                                                                            |
| **Enrichment field**      | False                                                                           |

## dstDevice_uniqueId

|                           |                                                                                                                    |
|---------------------------|--------------------------------------------------------------------------------------------------------------------|
| **Description**           | The source specific identifier for device (if available). This is frequently an instance id in cloud environments. |
| **Type**                  | string                                                                                                             |
| **Can be set by mapping** | True                                                                                                               |
| **Enrichment field**      | False                                                                                                              |

## dstPort

|                           |                                                           |
|---------------------------|-----------------------------------------------------------|
| **Description**           | The port number for which the network traffic is destined |
| **Type**                  | int                                                       |
| **Can be set by mapping** | True                                                      |
| **Enrichment field**      | False                                                     |

## email_messageId

|                           |                                                                                                                                                                                                                                                                                                                                                                      |
|---------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Description**           | A semi-unique identifier for an e-mail message generated by the sending mail system often ending with the fully qualified domain name of the sending system. It is not completely unique as copies of the same e-mail message, such as one sent to multiple recipients, may have the same message ID. Different mail systems may form message IDs in different ways. |
| **Type**                  | string                                                                                                                                                                                                                                                                                                                                                               |
| **Can be set by mapping** | True                                                                                                                                                                                                                                                                                                                                                                 |
| **Enrichment field**      | False                                                                                                                                                                                                                                                                                                                                                                |

## email_sender

|                           |                                                                                                                                         |
|---------------------------|-----------------------------------------------------------------------------------------------------------------------------------------|
| **Description**           | Address of the e-mail sender. To be used only for logs related specifically to e-mail activity (spam filtering, message tracking, etc). |
| **Type**                  | string                                                                                                                                  |
| **Can be set by mapping** | True                                                                                                                                    |
| **Enrichment field**      | False                                                                                                                                   |

## email_subject

|                           |                           |
|---------------------------|---------------------------|
| **Description**           | Subject line of an e-mail |
| **Type**                  | string                    |
| **Can be set by mapping** | True                      |
| **Enrichment field**      | False                     |

## errorCode

|                           |                                                                     |
|---------------------------|---------------------------------------------------------------------|
| **Description**           | Machine code or shortform message that represents a specific error. |
| **Type**                  | string                                                              |
| **Can be set by mapping** | True                                                                |
| **Enrichment field**      | False                                                               |

## errorText

|                           |                                                 |
|---------------------------|-------------------------------------------------|
| **Description**           | Human readable description of a specific error. |
| **Type**                  | string                                          |
| **Can be set by mapping** | True                                            |
| **Enrichment field**      | False                                           |

## fieldTags

|                           |                                                           |
|---------------------------|-----------------------------------------------------------|
| **Description**           | A map of entity fields to a list of tags for that entity. |
| **Type**                  | map\[string\]array\[string\]                              |
| **Can be set by mapping** | False                                                     |
| **Enrichment field**      | False                                                     |

## fields

|                           |                                                                               |
|---------------------------|-------------------------------------------------------------------------------|
| **Description**           | This is a general purpose container for all un-mapped data from the log line. |
| **Type**                  | map\[string\]string                                                           |
| **Can be set by mapping** | False                                                                         |
| **Enrichment field**      | False                                                                         |

## file_basename

|                           |                                                                    |
|---------------------------|--------------------------------------------------------------------|
| **Description**           | The name and extension (if applicable) of a file without the path. |
| **Type**                  | string                                                             |
| **Can be set by mapping** | True                                                               |
| **Enrichment field**      | False                                                              |

## file_hash_imphash

|                           |                                                              |
|---------------------------|--------------------------------------------------------------|
| **Description**           | File hash created using the Import Hash (Imphash) algorithm. |
| **Type**                  | string                                                       |
| **Can be set by mapping** | True                                                         |
| **Enrichment field**      | False                                                        |

## file_hash_md5

|                           |                                                    |
|---------------------------|----------------------------------------------------|
| **Description**           | File hash created using the 128 bit MD5 algorithm. |
| **Type**                  | string                                             |
| **Can be set by mapping** | True                                               |
| **Enrichment field**      | False                                              |

## file_hash_pehash

|                           |                                                                                           |
|---------------------------|-------------------------------------------------------------------------------------------|
| **Description**           | Hash value for Portable Executable (PE) file binaries created using the PEHash algorithm. |
| **Type**                  | string                                                                                    |
| **Can be set by mapping** | True                                                                                      |
| **Enrichment field**      | False                                                                                     |

## file_hash_sha1

|                           |                                                     |
|---------------------------|-----------------------------------------------------|
| **Description**           | Hash of the file generated using the SHA1 algorithm |
| **Type**                  | string                                              |
| **Can be set by mapping** | True                                                |
| **Enrichment field**      | False                                               |

## file_hash_sha256

|                           |                                                       |
|---------------------------|-------------------------------------------------------|
| **Description**           | Hash of the file generated using the SHA256 algorithm |
| **Type**                  | string                                                |
| **Can be set by mapping** | True                                                  |
| **Enrichment field**      | False                                                 |

## file_hash_ssdeep

|                           |                                                    |
|---------------------------|----------------------------------------------------|
| **Description**           | The fuzzy hash of the file generated using ssdeep. |
| **Type**                  | string                                             |
| **Can be set by mapping** | True                                               |
| **Enrichment field**      | False                                              |

## file_mimeType

|                           |                                                                                                                   |
|---------------------------|-------------------------------------------------------------------------------------------------------------------|
| **Description**           | Two-part media type (MIME type/subtype) indicating the nature and format of a file transmitted over the internet. |
| **Type**                  | string                                                                                                            |
| **Can be set by mapping** | True                                                                                                              |
| **Enrichment field**      | False                                                                                                             |

## file_path

|                           |                                                                                                                                                   |
|---------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------|
| **Description**           | The full path (if possible) of the file. This field may contain partial paths and serves as the general placeholder for file/process path fields. |
| **Type**                  | string                                                                                                                                            |
| **Can be set by mapping** | True                                                                                                                                              |
| **Enrichment field**      | False                                                                                                                                             |

## file_size

|                           |                                      |
|---------------------------|--------------------------------------|
| **Description**           | Count of bytes taken up by the file. |
| **Type**                  | long                                 |
| **Can be set by mapping** | True                                 |
| **Enrichment field**      | False                                |

## file_uid

|                           |                                                                        |
|---------------------------|------------------------------------------------------------------------|
| **Description**           | The data source specific unique identifier for the file, often a GUID. |
| **Type**                  | string                                                                 |
| **Can be set by mapping** | True                                                                   |
| **Enrichment field**      | False                                                                  |

## flowState

|                           |                                                                                                                         |
|---------------------------|-------------------------------------------------------------------------------------------------------------------------|
| **Description**           | Value indicating the state (e.g. begin, end, or continue) of a network traffic flow as it enters or exits an interface. |
| **Type**                  | string                                                                                                                  |
| **Can be set by mapping** | True                                                                                                                    |
| **Enrichment field**      | False                                                                                                                   |

## friendlyName

|                           |                                                                |
|---------------------------|----------------------------------------------------------------|
| **Description**           | Name of the table the data is mapped to. Always Record for V3. |
| **Type**                  | string                                                         |
| **Can be set by mapping** | False                                                          |
| **Enrichment field**      | False                                                          |

## fromUser_authDomain

|                           |                                                                                        |
|---------------------------|----------------------------------------------------------------------------------------|
| **Description**           | The domain associated with this particular user. (e.g. sumologic.com, sumologic.local) |
| **Type**                  | string                                                                                 |
| **Can be set by mapping** | False                                                                                  |
| **Enrichment field**      | False                                                                                  |

## fromUser_email

|                           |                                                     |
|---------------------------|-----------------------------------------------------|
| **Description**           | The associated email address assigned to this user. |
| **Type**                  | string                                              |
| **Can be set by mapping** | False                                               |
| **Enrichment field**      | False                                               |

## fromUser_role

|                           |                                                                                                                                                     |
|---------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------|
| **Description**           | The role of the user account in question. Typically, this shows up in CloudTrail logs as an assumed role, but can be broadly applied to other logs. |
| **Type**                  | string                                                                                                                                              |
| **Can be set by mapping** | False                                                                                                                                               |
| **Enrichment field**      | False                                                                                                                                               |

## fromUser_userId

|                           |                                                    |
|---------------------------|----------------------------------------------------|
| **Description**           | The source unique identifier for the user account. |
| **Type**                  | string                                             |
| **Can be set by mapping** | False                                              |
| **Enrichment field**      | False                                              |

## fromUser_username

|                           |                                                                                                                                      |
|---------------------------|--------------------------------------------------------------------------------------------------------------------------------------|
| **Description**           | The name commonly used to identify the user. May include the domain. If name normalization occurs, this will be the normalized name. |
| **Type**                  | string                                                                                                                               |
| **Can be set by mapping** | False                                                                                                                                |
| **Enrichment field**      | False                                                                                                                                |

## fromUser_username_raw

|                           |                                                |
|---------------------------|------------------------------------------------|
| **Description**           | The raw (un-normalized) version of a username. |
| **Type**                  | string                                         |
| **Can be set by mapping** | False                                          |
| **Enrichment field**      | False                                          |

## fromUser_username_role

|                           |                                                                                                |
|---------------------------|------------------------------------------------------------------------------------------------|
| **Description**           | The role that is parsed out of the normalized username (usually from an AWS assumed role ARN). |
| **Type**                  | string                                                                                         |
| **Can be set by mapping** | False                                                                                          |
| **Enrichment field**      | False                                                                                          |

## hour

|                           |                                 |
|---------------------------|---------------------------------|
| **Description**           | Hour pulled from the timestamp. |
| **Type**                  | int                             |
| **Can be set by mapping** | False                           |
| **Enrichment field**      | False                           |

## http_category

|                           |                                                                             |
|---------------------------|-----------------------------------------------------------------------------|
| **Description**           | The high level category determined by a service based on the url or domain. |
| **Type**                  | string                                                                      |
| **Can be set by mapping** | True                                                                        |
| **Enrichment field**      | False                                                                       |

## http_contentLength

|                           |                                                         |
|---------------------------|---------------------------------------------------------|
| **Description**           | The number of bytes of data in the body of the request. |
| **Type**                  | int                                                     |
| **Can be set by mapping** | True                                                    |
| **Enrichment field**      | False                                                   |

## http_hostname

|                           |                                         |
|---------------------------|-----------------------------------------|
| **Description**           | Name of the host within an HTTP request |
| **Type**                  | string                                  |
| **Can be set by mapping** | True                                    |
| **Enrichment field**      | False                                   |

## http_method

|                           |                                                  |
|---------------------------|--------------------------------------------------|
| **Description**           | Type of HTTP request being made (e.g. GET, POST) |
| **Type**                  | string                                           |
| **Can be set by mapping** | True                                             |
| **Enrichment field**      | False                                            |

## http_referer

|                           |                                                                                                                                                     |
|---------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------|
| **Description**           | Identifies the address of the webpage (i.e. the URI or IRI) which is linked to the resource being requested to determine the origin of the request. |
| **Type**                  | string                                                                                                                                              |
| **Can be set by mapping** | True                                                                                                                                                |
| **Enrichment field**      | False                                                                                                                                               |

## http_referer_alexaRank

|                           |                                                                                                        |
|---------------------------|--------------------------------------------------------------------------------------------------------|
| **Description**           | The HTTP referer domain's rank among the top 10k sites by Alexa traffic rank. NULL if not in the list. |
| **Type**                  | long                                                                                                   |
| **Can be set by mapping** | False                                                                                                  |
| **Enrichment field**      | True                                                                                                   |

## http_referer_entropyFqdn

|                           |                                                                                        |
|---------------------------|----------------------------------------------------------------------------------------|
| **Description**           | The entropy calculation of the Fully Qualified Domain Name (FQDN) of the HTTP referer. |
| **Type**                  | double                                                                                 |
| **Can be set by mapping** | False                                                                                  |
| **Enrichment field**      | True                                                                                   |

## http_referer_entropyRootDomain

|                           |                                                                 |
|---------------------------|-----------------------------------------------------------------|
| **Description**           | The entropy calculation of the root domain of the HTTP referer. |
| **Type**                  | double                                                          |
| **Can be set by mapping** | False                                                           |
| **Enrichment field**      | True                                                            |

## http_referer_fqdn

|                           |                                                                                        |
|---------------------------|----------------------------------------------------------------------------------------|
| **Description**           | The fully qualified domain name in the HTTP referer URL (e.g. somehost.sumologic.com). |
| **Type**                  | string                                                                                 |
| **Can be set by mapping** | False                                                                                  |
| **Enrichment field**      | True                                                                                   |

## http_referer_path

|                           |                                                                      |
|---------------------------|----------------------------------------------------------------------|
| **Description**           | The path component of the HTTP referer URL (e.g. somepath/something) |
| **Type**                  | string                                                               |
| **Can be set by mapping** | False                                                                |
| **Enrichment field**      | True                                                                 |

## http_referer_possibleDga

|                           |                                                                                                                        |
|---------------------------|------------------------------------------------------------------------------------------------------------------------|
| **Description**           | Whether or not this domain is potentially a Domain Generation Algorithm created domain based on our backend analytics. |
| **Type**                  | boolean                                                                                                                |
| **Can be set by mapping** | False                                                                                                                  |
| **Enrichment field**      | True                                                                                                                   |

## http_referer_possibleDynDns

|                           |                                                                           |
|---------------------------|---------------------------------------------------------------------------|
| **Description**           | A likely dynamically (not static) IP address associated with this domain. |
| **Type**                  | boolean                                                                   |
| **Can be set by mapping** | False                                                                     |
| **Enrichment field**      | True                                                                      |

## http_referer_protocol

|                           |                                             |
|---------------------------|---------------------------------------------|
| **Description**           | The HTTP referer URL protocol (e.g. https). |
| **Type**                  | string                                      |
| **Can be set by mapping** | False                                       |
| **Enrichment field**      | True                                        |

## http_referer_rootDomain

|                           |                                                                           |
|---------------------------|---------------------------------------------------------------------------|
| **Description**           | The root domain of hostname in the HTTP referer URL (e.g. sumologic.com). |
| **Type**                  | string                                                                    |
| **Can be set by mapping** | False                                                                     |
| **Enrichment field**      | True                                                                      |

## http_referer_tld

|                           |                                                                                            |
|---------------------------|--------------------------------------------------------------------------------------------|
| **Description**           | The top-level-domain field of the domain name in the HTTP referer URL (e.g. com, net, org) |
| **Type**                  | string                                                                                     |
| **Can be set by mapping** | False                                                                                      |
| **Enrichment field**      | True                                                                                       |

## http_requestHeaders

|                           |                                    |
|---------------------------|------------------------------------|
| **Description**           | A map of the HTTP request headers. |
| **Type**                  | map\[string\]string                |
| **Can be set by mapping** | True                               |
| **Enrichment field**      | False                              |

## http_response_contentLength

|                           |                                                          |
|---------------------------|----------------------------------------------------------|
| **Description**           | The number of bytes of data in the body of the response. |
| **Type**                  | int                                                      |
| **Can be set by mapping** | True                                                     |
| **Enrichment field**      | False                                                    |

## http_response_contentType

|                           |                                                                                                                     |
|---------------------------|---------------------------------------------------------------------------------------------------------------------|
| **Description**           | Two-part media type (MIME type/subtype) indicating the nature and format of data contained within an HTTP response. |
| **Type**                  | string                                                                                                              |
| **Can be set by mapping** | True                                                                                                                |
| **Enrichment field**      | False                                                                                                               |

## http_response_statusCode

|                           |                                               |
|---------------------------|-----------------------------------------------|
| **Description**           | The numeric response code for an HTTP request |
| **Type**                  | int                                           |
| **Can be set by mapping** | True                                          |
| **Enrichment field**      | False                                         |

## http_response_statusText

|                           |                                                                             |
|---------------------------|-----------------------------------------------------------------------------|
| **Description**           | The response text for an HTTP request corresponding to an HTTP status code. |
| **Type**                  | string                                                                      |
| **Can be set by mapping** | True                                                                        |
| **Enrichment field**      | False                                                                       |

## http_url

|                           |                                                                      |
|---------------------------|----------------------------------------------------------------------|
| **Description**           | The Uniform Resource Locator (URL) of an HTTP resource (a web page). |
| **Type**                  | string                                                               |
| **Can be set by mapping** | True                                                                 |
| **Enrichment field**      | False                                                                |

## http_url_alexaRank

|                           |                                                                                                        |
|---------------------------|--------------------------------------------------------------------------------------------------------|
| **Description**           | The HTTP referer domain's rank among the top 10k sites by Alexa traffic rank. NULL if not in the list. |
| **Type**                  | long                                                                                                   |
| **Can be set by mapping** | False                                                                                                  |
| **Enrichment field**      | True                                                                                                   |

## http_url_entropyFqdn

|                           |                                                                                        |
|---------------------------|----------------------------------------------------------------------------------------|
| **Description**           | The entropy calculation of the Fully Qualified Domain Name (FQDN) of the HTTP referer. |
| **Type**                  | double                                                                                 |
| **Can be set by mapping** | False                                                                                  |
| **Enrichment field**      | True                                                                                   |

## http_url_entropyRootDomain

|                           |                                                                 |
|---------------------------|-----------------------------------------------------------------|
| **Description**           | The entropy calculation of the root domain of the HTTP referer. |
| **Type**                  | double                                                          |
| **Can be set by mapping** | False                                                           |
| **Enrichment field**      | True                                                            |

## http_url_fqdn

|                           |                                                                                |
|---------------------------|--------------------------------------------------------------------------------|
| **Description**           | The fully qualified domain name in the HTTP URL (e.g. somehost.sumologic.com). |
| **Type**                  | string                                                                         |
| **Can be set by mapping** | False                                                                          |
| **Enrichment field**      | True                                                                           |

## http_url_path

|                           |                                                              |
|---------------------------|--------------------------------------------------------------|
| **Description**           | The path component of the HTTP URL (e.g. somepath/something) |
| **Type**                  | string                                                       |
| **Can be set by mapping** | False                                                        |
| **Enrichment field**      | True                                                         |

## http_url_possibleDga

|                           |                                                                                                                        |
|---------------------------|------------------------------------------------------------------------------------------------------------------------|
| **Description**           | Whether or not this domain is potentially a Domain Generation Algorithm created domain based on our backend analytics. |
| **Type**                  | boolean                                                                                                                |
| **Can be set by mapping** | False                                                                                                                  |
| **Enrichment field**      | True                                                                                                                   |

## http_url_possibleDynDns

|                           |                                                                           |
|---------------------------|---------------------------------------------------------------------------|
| **Description**           | A likely dynamically (not static) IP address associated with this domain. |
| **Type**                  | boolean                                                                   |
| **Can be set by mapping** | False                                                                     |
| **Enrichment field**      | True                                                                      |

## http_url_protocol

|                           |                                     |
|---------------------------|-------------------------------------|
| **Description**           | The HTTP URL protocol (e.g. https). |
| **Type**                  | string                              |
| **Can be set by mapping** | False                               |
| **Enrichment field**      | True                                |

## http_url_rootDomain

|                           |                                                                   |
|---------------------------|-------------------------------------------------------------------|
| **Description**           | The root domain of hostname in the HTTP URL (e.g. sumologic.com). |
| **Type**                  | string                                                            |
| **Can be set by mapping** | False                                                             |
| **Enrichment field**      | True                                                              |

## http_url_tld

|                           |                                                                                    |
|---------------------------|------------------------------------------------------------------------------------|
| **Description**           | The top-level-domain field of the domain name in the HTTP URL (e.g. com, net, org) |
| **Type**                  | string                                                                             |
| **Can be set by mapping** | False                                                                              |
| **Enrichment field**      | True                                                                               |

## http_userAgent

|                           |                                                                       |
|---------------------------|-----------------------------------------------------------------------|
| **Description**           | Software agent that is acting on behalf of a user in an HTTP request. |
| **Type**                  | string                                                                |
| **Can be set by mapping** | True                                                                  |
| **Enrichment field**      | False                                                                 |

## ipProtocol

|                           |                                                                                                                                                                                                                                                             |
|---------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Description**           | The transport layer internet protocol used in the traffic that generated the log event. This should be the IP protocol keyword or the protocol number, such as ICMP or 1, TCP or 6, UDP or 17 as defined by the Internet Assigned Numbers Authority (IANA). |
| **Type**                  | string                                                                                                                                                                                                                                                      |
| **Can be set by mapping** | True                                                                                                                                                                                                                                                        |
| **Enrichment field**      | False                                                                                                                                                                                                                                                       |

## listMatches

|                           |                                                                  |
|---------------------------|------------------------------------------------------------------|
| **Description**           | Name(s) of the match list(s) that a value in the log matched on. |
| **Type**                  | array\[string\]                                                  |
| **Can be set by mapping** | False                                                            |
| **Enrichment field**      | False                                                            |

## logonType

|                           |                                                                 |
|---------------------------|-----------------------------------------------------------------|
| **Description**           | The method of authentication or type of user session initiated. |
| **Type**                  | string                                                          |
| **Can be set by mapping** | True                                                            |
| **Enrichment field**      | False                                                           |

## matchedItems

|                           |                                                                      |
|---------------------------|----------------------------------------------------------------------|
| **Description**           | Value(s) in the match list(s) that an a value in the log matched on. |
| **Type**                  | array\[MatchedItem\]                                                 |
| **Can be set by mapping** | False                                                                |
| **Enrichment field**      | False                                                                |

## metadata_defaultTz

|                           |                                        |
|---------------------------|----------------------------------------|
| **Description**           | Default timezone for timestamp parsing |
| **Type**                  | int                                    |
| **Can be set by mapping** | False                                  |
| **Enrichment field**      | False                                  |

## metadata_deviceEventId

|                           |                                                                                                               |
|---------------------------|---------------------------------------------------------------------------------------------------------------|
| **Description**           | Vendor specific event identifier. Is provided in the parser output and determines which mapping will be used. |
| **Type**                  | string                                                                                                        |
| **Can be set by mapping** | False                                                                                                         |
| **Enrichment field**      | False                                                                                                         |

## metadata_mapperName

|                           |                                              |
|---------------------------|----------------------------------------------|
| **Description**           | CSE mapper name which normalizes the record. |
| **Type**                  | string                                       |
| **Can be set by mapping** | False                                        |
| **Enrichment field**      | False                                        |

## metadata_mapperUid

|                           |                                                              |
|---------------------------|--------------------------------------------------------------|
| **Description**           | Universally unique identifier for CSE normalization mappers. |
| **Type**                  | string                                                       |
| **Can be set by mapping** | False                                                        |
| **Enrichment field**      | False                                                        |

## metadata_orgId

|                           |                                                               |
|---------------------------|---------------------------------------------------------------|
| **Description**           | The Sumo Customer Org ID that originated the raw log message. |
| **Type**                  | string                                                        |
| **Can be set by mapping** | False                                                         |
| **Enrichment field**      | False                                                         |

## metadata_parseTime

|                           |                                                                                                                      |
|---------------------------|----------------------------------------------------------------------------------------------------------------------|
| **Description**           | The time at which the log line was parsed into a record by the parser and mapper service in milliseconds since epoch |
| **Type**                  | long                                                                                                                 |
| **Can be set by mapping** | False                                                                                                                |
| **Enrichment field**      | False                                                                                                                |

## metadata_parser

|                           |                                                                          |
|---------------------------|--------------------------------------------------------------------------|
| **Description**           | Name of the parser which extracted fields from the original log message. |
| **Type**                  | string                                                                   |
| **Can be set by mapping** | False                                                                    |
| **Enrichment field**      | False                                                                    |

## metadata_product

|                           |                                               |
|---------------------------|-----------------------------------------------|
| **Description**           | The specific product name of the data source. |
| **Type**                  | string                                        |
| **Can be set by mapping** | False                                         |
| **Enrichment field**      | False                                         |

## metadata_productGuid

|                           |                                                                 |
|---------------------------|-----------------------------------------------------------------|
| **Description**           | Globally unique identifier for the combined vendor and product. |
| **Type**                  | string                                                          |
| **Can be set by mapping** | False                                                           |
| **Enrichment field**      | False                                                           |

## metadata_receiptTime

|                           |                                                                                          |
|---------------------------|------------------------------------------------------------------------------------------|
| **Description**           | The time at which the log line was received by the collector in milliseconds since epoch |
| **Type**                  | long                                                                                     |
| **Can be set by mapping** | False                                                                                    |
| **Enrichment field**      | False                                                                                    |

## metadata_schemaVersion

|                           |                                 |
|---------------------------|---------------------------------|
| **Description**           | The current schema version (3). |
| **Type**                  | int                             |
| **Can be set by mapping** | False                           |
| **Enrichment field**      | False                           |

## metadata_sensorId

|                           |                                                      |
|---------------------------|------------------------------------------------------|
| **Description**           | UID of the Sumo Logic sensor used to ingest the log. |
| **Type**                  | string                                               |
| **Can be set by mapping** | False                                                |
| **Enrichment field**      | False                                                |

## metadata_sensorZone

| | |
|--|--|
| **Description**           | A name propagated from the sensors. In the case where sensors are installed in environments with overlapping IP address spaces, this is used to distinguish two identical IP addresses from each other. |
| **Type**                  | string |
| **Can be set by mapping** | False |
| **Enrichment field**      | False |

## metadata_sourceCategory

|                           |                                            |
|---------------------------|--------------------------------------------|
| **Description**           | The Sumologic source category of the data. |
| **Type**                  | string                                     |
| **Can be set by mapping** | False                                      |
| **Enrichment field**      | False                                      |

## metadata_sourceMessageId

|                           |                                                                          |
|---------------------------|--------------------------------------------------------------------------|
| **Description**           | The \_messageID of the original source log message (from SumoLogic CIP). |
| **Type**                  | string                                                                   |
| **Can be set by mapping** | False                                                                    |
| **Enrichment field**      | False                                                                    |

## metadata_vendor

|                           |                                                          |
|---------------------------|----------------------------------------------------------|
| **Description**           | The name of the company responsible for the data source. |
| **Type**                  | string                                                   |
| **Can be set by mapping** | False                                                    |
| **Enrichment field**      | False                                                    |

## mfa

|                           |                                                                                                              |
|---------------------------|--------------------------------------------------------------------------------------------------------------|
| **Description**           | True or false showing whether or not an authentication event was performed with multi-factor authentication. |
| **Type**                  | boolean                                                                                                      |
| **Can be set by mapping** | True                                                                                                         |
| **Enrichment field**      | False                                                                                                        |

## moduleType

|                           |                                                                                                                                             |
|---------------------------|---------------------------------------------------------------------------------------------------------------------------------------------|
| **Description**           | Attribute of a file loaded by a process to extend functionality which identifies its file type or otherwise indicating how it is to behave. |
| **Type**                  | string                                                                                                                                      |
| **Can be set by mapping** | True                                                                                                                                        |
| **Enrichment field**      | False                                                                                                                                       |

## month

|                           |                                  |
|---------------------------|----------------------------------|
| **Description**           | Month pulled from the timestamp. |
| **Type**                  | int                              |
| **Can be set by mapping** | False                            |
| **Enrichment field**      | False                            |

## normalizedAction

| | |
|--|--|
| **Description**           | Complementary to the Action field, this field describes the initiation of an activity in a common way across records. normalizedAction is meant to describe the attempt of an action, using the success boolean as a modifier indicating whether or not the action was successful. Further, normalizedAction should be paired with normalizedResource to indicate where or upon what the initiated action was attempted against. |
| **Type**                  | string |
| **Can be set by mapping** | True |
| **Enrichment field**      | False |

## normalizedCause

|                           |                                                                                                                 |
|---------------------------|-----------------------------------------------------------------------------------------------------------------|
| **Description**           | Complementary to Cause, this field describes the reason for any particular outcome in a record in a common way. |
| **Type**                  | string                                                                                                          |
| **Can be set by mapping** | True                                                                                                            |
| **Enrichment field**      | False                                                                                                           |

## normalizedResource

| | |
|--|--|
| **Description**           | Complementary to Resource, this field describes the resource being acted upon or otherwise referenced within a record in a common way across records. Intended to be used to provide further normalized context to a record, particularly in tandem with normalizedAction. |
| **Type**                  | string |
| **Can be set by mapping** | True |
| **Enrichment field**      | False |

## normalizedSeverity

| | |
|--|--|
| **Description**           | Severity score on a scale of 0 to 10 with 0 being informational and 10 being critical. This is defined either explicitly per mapping or by a lookup to normalize a vendor specific severity level. Certain normalized threat rules will use normalizedSeverity to pass a dynamic severity into the signal. normalizedSeverity is an enforced output value field, this means that the output value must be an integer between 0 and 1. |
| **Type**                  | int |
| **Can be set by mapping** | True |
| **Enrichment field**      | False |

## normalizedSeverity_description

|                           |                                     |
|---------------------------|-------------------------------------|
| **Description**           | A string representing the severity. |
| **Type**                  | string                              |
| **Can be set by mapping** | False                               |
| **Enrichment field**      | True                                |

## objectType

|                           | |
|--|--|
| **Description** | The name of the top level schema object type. (e.g. Authentication, Audit, Endpoint, Network, Notification, etc.). Displayed as Record Type in the UI. |
| **Type**                  | string |
| **Can be set by mapping** | False |
| **Enrichment field**      | False |

## packetsIn

|                           |                                                        |
|---------------------------|--------------------------------------------------------|
| **Description**           | The count of packets received in a network connection. |
| **Type**                  | long                                                   |
| **Can be set by mapping** | True                                                   |
| **Enrichment field**      | False                                                  |

## packetsOut

|                           |                                                    |
|---------------------------|----------------------------------------------------|
| **Description**           | The count of packets sent in a network connection. |
| **Type**                  | long                                               |
| **Can be set by mapping** | True                                               |
| **Enrichment field**      | False                                              |

## parentBaseImage

|                           |                                                                                                                                    |
|---------------------------|------------------------------------------------------------------------------------------------------------------------------------|
| **Description**           | The name of an executable process which has spawned a child process. Often found in process auditing and malware detection events. |
| **Type**                  | string                                                                                                                             |
| **Can be set by mapping** | True                                                                                                                               |
| **Enrichment field**      | False                                                                                                                              |

## parentCommandLine

|                           |                                                                                                                                                                                                          |
|---------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Description**           | The instruction or set of instructions inputted into a text interface such as the command prompt (cmd.exe) or PowerShell in Windows, or terminal on Unix based systems associated with a parent process. |
| **Type**                  | string                                                                                                                                                                                                   |
| **Can be set by mapping** | True                                                                                                                                                                                                     |
| **Enrichment field**      | False                                                                                                                                                                                                    |

## parentPid

|                           |                                                                                         |
|---------------------------|-----------------------------------------------------------------------------------------|
| **Description**           | The process id of the program that initiated a process (typically the parentBaseImage). |
| **Type**                  | int                                                                                     |
| **Can be set by mapping** | True                                                                                    |
| **Enrichment field**      | False                                                                                   |

## pid

|                           |                                                        |
|---------------------------|--------------------------------------------------------|
| **Description**           | The process id of a process (typically the baseImage). |
| **Type**                  | int                                                    |
| **Can be set by mapping** | True                                                   |
| **Enrichment field**      | False                                                  |

## processUid

|                           |                                                                       |
|---------------------------|-----------------------------------------------------------------------|
| **Description**           | A data source specific unique identifier for a process, often a GUID. |
| **Type**                  | string                                                                |
| **Can be set by mapping** | True                                                                  |
| **Enrichment field**      | False                                                                 |

## resource

| | |
|--|--|
| **Description**           | Generalized field to capture an object referenced within a log that does not have a more specific field currently specified in the mapping schema. (e.g. a file is a resource, however file_basename and file_path both exist to capture this value) |
| **Type**                  | string |
| **Can be set by mapping** | True |
| **Enrichment field**      | False |

## severity

|                           |                                                           |
|---------------------------|-----------------------------------------------------------|
| **Description**           | The source specific severity level with no normalization. |
| **Type**                  | string                                                    |
| **Can be set by mapping** | True                                                      |
| **Enrichment field**      | False                                                     |

## sourceUid

| | |
|--|--|
| **Description**           | A UID that is defined by the record itself. Each record is assigned a UID during mapping, but this is the unique identifier field that may exist within an originating record. |
| **Type**                  | string |
| **Can be set by mapping** | True |
| **Enrichment field**      | False |

## srcDevice_hostname

|                           |                                                             |
|---------------------------|-------------------------------------------------------------|
| **Description**           | The name of the host which network traffic originated from. |
| **Type**                  | string                                                      |
| **Can be set by mapping** | True                                                        |
| **Enrichment field**      | False                                                       |

## srcDevice_hostname_raw

|                           |                                                                                                                     |
|---------------------------|---------------------------------------------------------------------------------------------------------------------|
| **Description**           | The source device hostname before any enrichments are applied. As the hostname appears in the original log message. |
| **Type**                  | string                                                                                                              |
| **Can be set by mapping** | False                                                                                                               |
| **Enrichment field**      | True                                                                                                                |

## srcDevice_ip

|                           |                                                                   |
|---------------------------|-------------------------------------------------------------------|
| **Description**           | The IP address of the host which network traffic originated from. |
| **Type**                  | string                                                            |
| **Can be set by mapping** | True                                                              |
| **Enrichment field**      | False                                                             |

## srcDevice_ip_asnNumber

|                           |                                                                                                                                                      |
|---------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Description**           | The autonomous system number for the source device IP address based on the MaxMind GeoIP database, typically assigned to internet service providers. |
| **Type**                  | int                                                                                                                                                  |
| **Can be set by mapping** | False                                                                                                                                                |
| **Enrichment field**      | True                                                                                                                                                 |

## srcDevice_ip_asnOrg

|                           |                                                                                                                                |
|---------------------------|--------------------------------------------------------------------------------------------------------------------------------|
| **Description**           | The organzation associated with the ASN based on the MaxMind GeoIP database, typically assigned to internet service providers. |
| **Type**                  | string                                                                                                                         |
| **Can be set by mapping** | False                                                                                                                          |
| **Enrichment field**      | True                                                                                                                           |

## srcDevice_ip_city

|                           |                                                                            |
|---------------------------|----------------------------------------------------------------------------|
| **Description**           | City for the source device IP address based on the MaxMind GeoIP database. |
| **Type**                  | string                                                                     |
| **Can be set by mapping** | False                                                                      |
| **Enrichment field**      | True                                                                       |

## srcDevice_ip_countryCode

|                           |                                                                                                      |
|---------------------------|------------------------------------------------------------------------------------------------------|
| **Description**           | Country code (e.g. US, CA, DE) for the source device IP address based on the MaxMind GeoIP database. |
| **Type**                  | string                                                                                               |
| **Can be set by mapping** | False                                                                                                |
| **Enrichment field**      | True                                                                                                 |

## srcDevice_ip_countryName

|                           |                                                                                           |
|---------------------------|-------------------------------------------------------------------------------------------|
| **Description**           | Name of the country for the source device IP address based on the MaxMind GeoIP database. |
| **Type**                  | string                                                                                    |
| **Can be set by mapping** | False                                                                                     |
| **Enrichment field**      | True                                                                                      |

## srcDevice_ip_ipv4IntValue

|                           |                                                             |
|---------------------------|-------------------------------------------------------------|
| **Description**           | The ipv4 address stored as an unsigned 64-bit integer value |
| **Type**                  | long                                                        |
| **Can be set by mapping** | False                                                       |
| **Enrichment field**      | True                                                        |

## srcDevice_ip_isInternal

|                           |                                                                                                              |
|---------------------------|--------------------------------------------------------------------------------------------------------------|
| **Description**           | Signifies whether the source device IP address is internal or external. True if internal, False if external. |
| **Type**                  | boolean                                                                                                      |
| **Can be set by mapping** | False                                                                                                        |
| **Enrichment field**      | True                                                                                                         |

## srcDevice_ip_isp

|                           |                                                                                         |
|---------------------------|-----------------------------------------------------------------------------------------|
| **Description**           | Internet Service Provider for the source device IP based on the MaxMind GeoIP database. |
| **Type**                  | string                                                                                  |
| **Can be set by mapping** | False                                                                                   |
| **Enrichment field**      | True                                                                                    |

## srcDevice_ip_latitude

|                           |                                                                                                      |
|---------------------------|------------------------------------------------------------------------------------------------------|
| **Description**           | Geographic latitude coordinate for the source device IP address based on the MaxMind GeoIP database. |
| **Type**                  | float                                                                                                |
| **Can be set by mapping** | False                                                                                                |
| **Enrichment field**      | True                                                                                                 |

## srcDevice_ip_location

|                           |                                                                                                                                     |
|---------------------------|-------------------------------------------------------------------------------------------------------------------------------------|
| **Description**           | This value is populated based on uploaded Network Blocks. When there is a match, it will be populated with the network block label. |
| **Type**                  | string                                                                                                                              |
| **Can be set by mapping** | False                                                                                                                               |
| **Enrichment field**      | True                                                                                                                                |

## srcDevice_ip_longitude

|                           |                                                                                            |
|---------------------------|--------------------------------------------------------------------------------------------|
| **Description**           | Longitude coordinate for the source device IP address based on the MaxMind GeoIP database. |
| **Type**                  | float                                                                                      |
| **Can be set by mapping** | False                                                                                      |
| **Enrichment field**      | True                                                                                       |

## srcDevice_ip_region

|                           |                                                                                          |
|---------------------------|------------------------------------------------------------------------------------------|
| **Description**           | State or Territory for the source device IP address based on the MaxMind GeoIP database. |
| **Type**                  | string                                                                                   |
| **Can be set by mapping** | False                                                                                    |
| **Enrichment field**      | True                                                                                     |

## srcDevice_ip_version

|                           |                                                     |
|---------------------------|-----------------------------------------------------|
| **Description**           | Version of the IP protocol of the source device IP. |
| **Type**                  | int                                                 |
| **Can be set by mapping** | False                                               |
| **Enrichment field**      | True                                                |

## srcDevice_mac

|                           |                                                                                           |
|---------------------------|-------------------------------------------------------------------------------------------|
| **Description**           | The media access control (MAC) address of the host which network traffic originated from. |
| **Type**                  | string                                                                                    |
| **Can be set by mapping** | True                                                                                      |
| **Enrichment field**      | False                                                                                     |

## srcDevice_natIp

|                           |                                                                                          |
|---------------------------|------------------------------------------------------------------------------------------|
| **Description**           | The external IP in cases where the internal IP goes through network address translation. |
| **Type**                  | string                                                                                   |
| **Can be set by mapping** | True                                                                                     |
| **Enrichment field**      | False                                                                                    |

## srcDevice_natIp_asnNumber

|                           |                                                                                     |
|---------------------------|-------------------------------------------------------------------------------------|
| **Description**           | An autonomous system number for the IP address based on the MaxMind GeoIP database. |
| **Type**                  | int                                                                                 |
| **Can be set by mapping** | False                                                                               |
| **Enrichment field**      | True                                                                                |

## srcDevice_natIp_asnOrg

|                           |                                                                                          |
|---------------------------|------------------------------------------------------------------------------------------|
| **Description**           | Organization associated with the IP address address based on the MaxMind GeoIP database. |
| **Type**                  | string                                                                                   |
| **Can be set by mapping** | False                                                                                    |
| **Enrichment field**      | True                                                                                     |

## srcDevice_natIp_city

|                           |                                                              |
|---------------------------|--------------------------------------------------------------|
| **Description**           | City for the IP address based on the MaxMind GeoIP database. |
| **Type**                  | string                                                       |
| **Can be set by mapping** | False                                                        |
| **Enrichment field**      | True                                                         |

## srcDevice_natIp_countryCode

|                           |                                                                      |
|---------------------------|----------------------------------------------------------------------|
| **Description**           | Country Code for the IP address based on the MaxMind GeoIP database. |
| **Type**                  | string                                                               |
| **Can be set by mapping** | False                                                                |
| **Enrichment field**      | True                                                                 |

## srcDevice_natIp_countryName

|                           |                                                                      |
|---------------------------|----------------------------------------------------------------------|
| **Description**           | Country Code for the IP address based on the MaxMind GeoIP database. |
| **Type**                  | string                                                               |
| **Can be set by mapping** | False                                                                |
| **Enrichment field**      | True                                                                 |

## srcDevice_natIp_ipv4IntValue

|                           |                                                             |
|---------------------------|-------------------------------------------------------------|
| **Description**           | The ipv4 address stored as an unsigned 64-bit integer value |
| **Type**                  | long                                                        |
| **Can be set by mapping** | False                                                       |
| **Enrichment field**      | True                                                        |

## srcDevice_natIp_isInternal

|                           |                                                                                                |
|---------------------------|------------------------------------------------------------------------------------------------|
| **Description**           | Signifies whether the IP address is internal or external. True if internal, False if external. |
| **Type**                  | boolean                                                                                        |
| **Can be set by mapping** | False                                                                                          |
| **Enrichment field**      | True                                                                                           |

## srcDevice_natIp_isp

|                           |                                                                                   |
|---------------------------|-----------------------------------------------------------------------------------|
| **Description**           | Internet Service Provider for the IP address based on the MaxMind GeoIP database. |
| **Type**                  | string                                                                            |
| **Can be set by mapping** | False                                                                             |
| **Enrichment field**      | True                                                                              |

## srcDevice_natIp_latitude

|                           |                                                                  |
|---------------------------|------------------------------------------------------------------|
| **Description**           | Latitude for the IP address based on the MaxMind GeoIP database. |
| **Type**                  | float                                                            |
| **Can be set by mapping** | False                                                            |
| **Enrichment field**      | True                                                             |

## srcDevice_natIp_location

|                           |                                                                                                                                                  |
|---------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------|
| **Description**           | This value is populated based on the Network Blocks you have uploaded. When there is a match, it will be populated with the network block label. |
| **Type**                  | string                                                                                                                                           |
| **Can be set by mapping** | False                                                                                                                                            |
| **Enrichment field**      | True                                                                                                                                             |

## srcDevice_natIp_longitude

|                           |                                                                   |
|---------------------------|-------------------------------------------------------------------|
| **Description**           | Longitude for the IP address based on the MaxMind GeoIP database. |
| **Type**                  | float                                                             |
| **Can be set by mapping** | False                                                             |
| **Enrichment field**      | True                                                              |

## srcDevice_natIp_region

|                           |                                                                            |
|---------------------------|----------------------------------------------------------------------------|
| **Description**           | State or Territory for the IP address based on the MaxMind GeoIP database. |
| **Type**                  | string                                                                     |
| **Can be set by mapping** | False                                                                      |
| **Enrichment field**      | True                                                                       |

## srcDevice_natIp_version

|                           |                                          |
|---------------------------|------------------------------------------|
| **Description**           | The version of IP protocol (e.g. 4 or 6) |
| **Type**                  | int                                      |
| **Can be set by mapping** | False                                    |
| **Enrichment field**      | True                                     |

## srcDevice_osName

|                           |                                                                                 |
|---------------------------|---------------------------------------------------------------------------------|
| **Description**           | The operating system running on the host which network traffic originated from. |
| **Type**                  | string                                                                          |
| **Can be set by mapping** | True                                                                            |
| **Enrichment field**      | False                                                                           |

## srcDevice_uniqueId

|                           |                                                                                                                                          |
|---------------------------|------------------------------------------------------------------------------------------------------------------------------------------|
| **Description**           | The unique ID of the host which network traffic originated from. This field is frequently used by cloud providers to identify instances. |
| **Type**                  | string                                                                                                                                   |
| **Can be set by mapping** | True                                                                                                                                     |
| **Enrichment field**      | False                                                                                                                                    |

## srcPort

|                           |                                                            |
|---------------------------|------------------------------------------------------------|
| **Description**           | The port number which the network traffic originated from. |
| **Type**                  | int                                                        |
| **Can be set by mapping** | True                                                       |
| **Enrichment field**      | False                                                      |

## success

|                           |                                                                                                                                                                         |
|---------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Description**           | True or false showing whether or not an action or event recorded in a log was successful. This field is either defined as a constant or based on a lookup in a mapping. |
| **Type**                  | boolean                                                                                                                                                                 |
| **Can be set by mapping** | True                                                                                                                                                                    |
| **Enrichment field**      | False                                                                                                                                                                   |

## targetUser_authDomain

| | |
|--|--|
| **Description**           | The authentication domain of a user which is subject to or is otherwise impacted by activity undertaken by another user. Such as the Active Directory domain to which a new user account being created belongs. |
| **Type**                  | string |
| **Can be set by mapping** | True |
| **Enrichment field**      | False |

## targetUser_email

| | |
|--|--|
| **Description**           | E-Mail address associated with the user which is subject to activity undertaken by another account. Such as an E-Mail address which was created for a new user account. |
| **Type**                  | string |
| **Can be set by mapping** | True |
| **Enrichment field**      | False |

## targetUser_role

| | |
|--|--|
| **Description**           | A privileged persona assumed by a user which is subject to activity undertaken by another user. Such as in CloudTrail logs as well as similar cases where a user is recorded taking on a different role for specific privileged activity. |
| **Type**                  | string |
| **Can be set by mapping** | True |
| **Enrichment field**      | False |

## targetUser_userId

|                           |                                                                                                                            |
|---------------------------|----------------------------------------------------------------------------------------------------------------------------|
| **Description**           | The semi-unique identifier associated with a user account which is subject to activity undertaken by another user account. |
| **Type**                  | string                                                                                                                     |
| **Can be set by mapping** | True                                                                                                                       |
| **Enrichment field**      | False                                                                                                                      |

## targetUser_username

|                           |                                                                                                                                      |
|---------------------------|--------------------------------------------------------------------------------------------------------------------------------------|
| **Description**           | The name commonly used to identify the user. May include the domain. If name normalization occurs, this will be the normalized name. |
| **Type**                  | string                                                                                                                               |
| **Can be set by mapping** | True                                                                                                                                 |
| **Enrichment field**      | False                                                                                                                                |

## targetUser_username_raw

|                           |                                                |
|---------------------------|------------------------------------------------|
| **Description**           | The raw (un-normalized) version of a username. |
| **Type**                  | string                                         |
| **Can be set by mapping** | False                                          |
| **Enrichment field**      | True                                           |

## targetUser_username_role

|                           |                                                                                                |
|---------------------------|------------------------------------------------------------------------------------------------|
| **Description**           | The role that is parsed out of the normalized username (usually from an AWS assumed role ARN). |
| **Type**                  | string                                                                                         |
| **Can be set by mapping** | False                                                                                          |
| **Enrichment field**      | True                                                                                           |

## tcpProtocol

|                           |                                                                                                                 |
|---------------------------|-----------------------------------------------------------------------------------------------------------------|
| **Description**           | Application layer protocol used to establish the connection as defined by the Internet protocol Suite (TCP/IP). |
| **Type**                  | string                                                                                                          |
| **Can be set by mapping** | True                                                                                                            |
| **Enrichment field**      | False                                                                                                           |

## threat_category

|                           |                                                                                   |
|---------------------------|-----------------------------------------------------------------------------------|
| **Description**           | The type of threat determined by a service based on the signature or threat name. |
| **Type**                  | string                                                                            |
| **Can be set by mapping** | True                                                                              |
| **Enrichment field**      | False                                                                             |

## threat_identifier

|                           |                                                                                                                                              |
|---------------------------|----------------------------------------------------------------------------------------------------------------------------------------------|
| **Description**           | The identifier or indicator specific to a threat (not a vulnerability). Generally speaking this should be populated with an indicator value. |
| **Type**                  | string                                                                                                                                       |
| **Can be set by mapping** | True                                                                                                                                         |
| **Enrichment field**      | False                                                                                                                                        |

## threat_name

|                           |                                                                                                           |
|---------------------------|-----------------------------------------------------------------------------------------------------------|
| **Description**           | Name of a specific threat (not a vulnerability), such as malware or an exploit. Often a threat signature. |
| **Type**                  | string                                                                                                    |
| **Can be set by mapping** | True                                                                                                      |
| **Enrichment field**      | False                                                                                                     |

## threat_referenceUrl

|                           |                                                                                                                                          |
|---------------------------|------------------------------------------------------------------------------------------------------------------------------------------|
| **Description**           | An external URL that can provide more information about the threat. This should NOT be the URL that represents an observed HTTP request. |
| **Type**                  | string                                                                                                                                   |
| **Can be set by mapping** | True                                                                                                                                     |
| **Enrichment field**      | False                                                                                                                                    |

## threat_ruleType

| | |
|--|--|
| **Description**           | This field should be used with logs that indicate detection of a security event has already occurred. These logs are produced by a security product's own detection capabilities like signatures or rule sets. As an example, if a log has a severity, risk, or impact in the message, it should have threat_ruleType included and populated in its mapper. The logs using this field will all be a form of pass through content. Messages that do not include security event detection must leave this field out of the mapper or leave it blank. |
| **Type**                  | string |
| **Can be set by mapping** | True |
| **Enrichment field**      | False |

## threat_signalName

| | |
|--|--|
| **Description**           | This field is used in conjunction with normalized rules designed to directly pass through security alerts from other security products, appliances, and services. Those rules will use the text populated in this field as an element of the signal name, allowing different signal names for different products while retaining the normalized rule logic. |
| **Type**                  | string |
| **Can be set by mapping** | True |
| **Enrichment field**      | False |

## threat_signalSummary

| | |
|--|--|
| **Description**           | This field is used in conjunction with normalized rules. Those rules will use the text populated in this field as an element of the signal summary, allowing different signal summaries for different products while retaining the normalized rule logic. |
| **Type**                  | string |
| **Can be set by mapping** | True |
| **Enrichment field**      | False |

## timestamp

| | |
|--|--|
| **Description**           | The timestamp of the event stored as milliseconds since epoch. Time can be directly mapped if the log contains epoch time, however other time formats can be mapped if the format is provided. If no timestamp is defined in the mapping, ingest time will be used by default. |
| **Type**                  | long |
| **Can be set by mapping** | True |
| **Enrichment field**      | False |

## uid

|                           |                                              |
|---------------------------|----------------------------------------------|
| **Description**           | UID for the parsed record in Sumo Logic CSE. |
| **Type**                  | string                                       |
| **Can be set by mapping** | False                                        |
| **Enrichment field**      | False                                        |

## user_authDomain

|                           |                                                                                                                                               |
|---------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------|
| **Description**           | The authentication domain associated with an acting user. Such as an Active Directory domain of a user logging in or is performing an action. |
| **Type**                  | string                                                                                                                                        |
| **Can be set by mapping** | True                                                                                                                                          |
| **Enrichment field**      | False                                                                                                                                         |

## user_email

|                           |                                                 |
|---------------------------|-------------------------------------------------|
| **Description**           | E-Mail address associated with the acting user. |
| **Type**                  | string                                          |
| **Can be set by mapping** | True                                            |
| **Enrichment field**      | False                                           |

## user_role

| | |
|---|--|
| **Description**           | A privileged persona which is assumed by an acting user. Such as in CloudTrail logs as well as similar cases where a user is recorded taking on a different role for specific privileged activity. |
| **Type**                  | string |
| **Can be set by mapping** | True |
| **Enrichment field**      | False |

## user_userId

|                           |                                                                    |
|---------------------------|--------------------------------------------------------------------|
| **Description**           | The semi-unique identifier associated with an acting user account. |
| **Type**                  | string                                                             |
| **Can be set by mapping** | True                                                               |
| **Enrichment field**      | False                                                              |

## user_username

|                           |                                                                                                                                      |
|---------------------------|--------------------------------------------------------------------------------------------------------------------------------------|
| **Description**           | The name commonly used to identify the user. May include the domain. If name normalization occurs, this will be the normalized name. |
| **Type**                  | string                                                                                                                               |
| **Can be set by mapping** | True                                                                                                                                 |
| **Enrichment field**      | False                                                                                                                                |

## user_username_raw

|                           |                                                                                                             |
|---------------------------|-------------------------------------------------------------------------------------------------------------|
| **Description**           | The actor username before any enrichments are applied. As the username appears in the original log message. |
| **Type**                  | string                                                                                                      |
| **Can be set by mapping** | False                                                                                                       |
| **Enrichment field**      | True                                                                                                        |

## user_username_role

|                           |                                                                                                       |
|---------------------------|-------------------------------------------------------------------------------------------------------|
| **Description**           | The role that is extracted from the normalized actor username (such as from an AWS assumed role ARN). |
| **Type**                  | string                                                                                                |
| **Can be set by mapping** | False                                                                                                 |
| **Enrichment field**      | True                                                                                                  |

## vuln_bugtraq

| | |
|--|--|
| **Description**           | Bugtraq identifier assigned by SecurityFocus. BugTraq is a full disclosure moderated mailing list for the detailed discussion and announcement of computer security vulnerabilities. |
| **Type**                  | string |
| **Can be set by mapping** | True |
| **Enrichment field**      | False |

## vuln_cert

|                           |                                                                                                                                          |
|---------------------------|------------------------------------------------------------------------------------------------------------------------------------------|
| **Description**           | Numeric identifier for a vulnerability assigned by the United States Computer Emergency Readiness Team Coordination Center (US CERT/CC). |
| **Type**                  | string                                                                                                                                   |
| **Can be set by mapping** | True                                                                                                                                     |
| **Enrichment field**      | False                                                                                                                                    |

## vuln_cve

|                           |                                                                                                  |
|---------------------------|--------------------------------------------------------------------------------------------------|
| **Description**           | Common Vulnerabilities and Exposures identifier for the vulnerability. Follows the format CVE- - |
| **Type**                  | string                                                                                           |
| **Can be set by mapping** | True                                                                                             |
| **Enrichment field**      | False                                                                                            |

## vuln_cvss

|                           |                                                                                                                                             |
|---------------------------|---------------------------------------------------------------------------------------------------------------------------------------------|
| **Description**           | Common Vulnerability Scoring System (CVSS) score designed to help responders to prioritize their response and resources to a vulnerability. |
| **Type**                  | string                                                                                                                                      |
| **Can be set by mapping** | True                                                                                                                                        |
| **Enrichment field**      | False                                                                                                                                       |

## vuln_name

|                           |                                                             |
|---------------------------|-------------------------------------------------------------|
| **Description**           | Name that briefly summarizes the nature of a vulnerability. |
| **Type**                  | string                                                      |
| **Can be set by mapping** | True                                                        |
| **Enrichment field**      | False                                                       |

## vuln_reference

|                           |                                                                                                                                |
|---------------------------|--------------------------------------------------------------------------------------------------------------------------------|
| **Description**           | Additional information on a vulnerability in the form of a link, a specific vendor ID (e.g. MS14-068), or further description. |
| **Type**                  | string                                                                                                                         |
| **Can be set by mapping** | True                                                                                                                           |
| **Enrichment field**      | False                                                                                                                          |

## year

|                           |                                 |
|---------------------------|---------------------------------|
| **Description**           | Year pulled from the timestamp. |
| **Type**                  | int                             |
| **Can be set by mapping** | False                           |
| **Enrichment field**      | False                           |
