---
id: standard-match-lists
title: Entity Tags and Standard Match Lists
description: Learn about Entity Tags and standard Match Lists in CSE.
---

This topic has information about how you can identify specific Entities or indicators that should be treated differently during CSE rule processing. For example, you might want to prevent a rule from firing for Records that contain one of a certain set of IP addresses. Conversely, you might want to only fire a Signal if a user Entity belongs to a certain group, such as domain admins. There are currently two methods of achieving this sort of allowlist/denylist behavior:

* Schema key tags for Entities. This is the recommended approach. You simply apply predefined [schema key tags](/docs/cse/records-signals-entities-insights/tags-insights-signals-entities-rules.md) to new Entities once they come into CSE. See [Schema tag keys for Entities](#schema-tag-keys-for-entities) for information about which tag:value pairs to use for different Entities.  
:::tip
The most efficient way to assign tags to Entities is to configure [Entity Groups](/docs/cse/records-signals-entities-insights/create-an-entity-group.md), and allow CSE to automatically apply tags based on group membership.
:::
* Standard match lists. This is the original approach for excluding Entities from rule processing. It involves adding Entities to standard match lists, as described in [Create a Match List](/docs/cse/match-lists-suppressed-lists/create-match-list.md). Currently, standard match lists are still supported, but we recommend you use schema tag keys going forward. Standard match lists are described in [Standard match lists](#standard-match-lists) below.


## Schema tag keys for Entities

The keys and values described below are controlled by Sumo Logic. If you want to request additional tags or tag values, contact your Sumo Logic Customer Success Manager. You can also tag Entities with custom tags–if you do that, you’ll need to update your custom rules or add rule tuning expression to out-of-the-box rules to reference your custom tags.

### _deviceGroup

Assign the _deviceGroup tag to hosts involved with administrative or privileged activities. Select the appropriate tag value, based on the guidance in the table below.


|Tag values | When to use |
| :-- | :-- |
|admin |Devices that are known to be involved with specific administrative or privileged activity on the network. Can be used for tracking devices that are operated by admins and other privileged users, or are often the source of restricted, privileged or suspicious authorized actions, and so on. This sort of tracking is useful for baselining activity and as a result, surfacing more suspicious activity.|
|awsAdmin|Devices that are known to be involved with specific administrative or privileged activity in AWS. Can be used for tracking hosts that are operated by admins and other privileged users, or are often the source of restricted, privileged or suspicious authorized actions, and so on. This sort of tracking is useful for baselining activity and as a result, surfacing more suspicious activity.|
|business|Devices supporting business processes. Can be used for things like SSH servers for SFTP file exchanges (similarly, FTP servers).|
|gcpAdmin|Devices that are known to be involved with specific administrative or privileged activity in GCP. Can be used for tracking hosts that are operated by admins and other privileged users, or are often the source of restricted, privileged or suspicious authorized actions, and so on. This sort of tracking is useful for baselining activity and as a result, surfacing more suspicious activity.|
|googleWorkspaceAdmin|Devices that are known to be involved with specific administrative or privileged activity in Google Workspace. Can be used for tracking hosts that are operated by admins and other privileged users, or are often the source of restricted, privileged or suspicious authorized actions, and so on. This sort of tracking is useful for baselining activity and as a result, surfacing more suspicious activity.|
|salesforceAdmin|Devices that are known to be involved with specific administrative or privileged activity in Salesforce. Can be used for tracking hosts that are operated by admins and other privileged users, or are often the source of restricted, privileged or suspicious authorized actions, and so on. This sort of tracking is useful for baselining activity and as a result, surfacing more suspicious activity.|
|sandbox|Malware sandboxes or security devices interacting with malicious infrastructure.
scanTarget|Destination networks that are authorized/standard targets of vulnerability scans in customer environments.|

### _deviceService

Assign the _deviceService tag to services running in your environment. Select the appropriate tag value, based on the guidance in the table below.

|Tag values|When to use|
| :-- | :-- |
|dns|DNS caching resolvers/authoritative content servers. Can be used for source, destination, or other services.  |
|ftp | FTP servers. |
|smtp |SMTP sending/receiving hosts.|
|sql |Database servers. |
|ssh |SSH servers.|
|telnet |Telnet servers.|

### _deviceType
Assign the _deviceType tag to devices running in your environment. Select the appropriate tag value, based on the guidance in the table below.

|Tag values|When to use|
| :-- | :-- |
|authServer|Network authentication servers, including Active Directory, LDAP, Kerberos, RADIUS/TACACS, and NIS servers. May be used in analytics designed to detect [DCSync](https://attack.mitre.org/techniques/T1003/006/) attacks. |
|lanScanner |Devices excepted from analytics identifying Local Area Network (LAN)  scanning activity. Used in specific cases to exclude hosts from flagging particular types of rule content, primarily around scanning of commonly targeted LAN service ports, etc. Not an across-the-board allowlist. This tag value is not intended for vulnerability scanners, which should be tagged with _deviceType=vulnerabilityScanner.<br/><br/>Examples of devices that are suited for this tag value include telephony servers that push content to deployed softphones over SMB/CIFS and data security audit software that connect to SMB shares.|
|nms |Network Management Systems (NMS) that identify, configure, monitor, update,  and troubleshoot network devices – both wired and wireless – in an enterprise network. Can be used as an exception tag value to block content relying on the evaluation of data per-host from applying to hosts that are translated or aggregations of other hosts.|
|paloAltoSinkhole |IP addresses for the sinkhole IP or IPs configured for [Palo Alto DNS sinkhole](https://knowledgebase.paloaltonetworks.com/KCSArticleDetail?id=kA10g000000ClGECA0).<br/><br/>Use this tag value for the  default IPv4 sinkhole address from PANW (72.5.65.111) any other sinkhole IP you have configured.|
|proxyServer |Forward proxy servers, including HTTP and SOCKS proxies. |
|vpnServer |Vulnerability scanner and network mapping hosts.|
|vulnerabilityScanner |Vulnerability scanner and network mapping hosts. Devices engaged in actively scanning for Vulnerabilities on the network. These devices can be hosted internal or externally.|
|webServer |HTTP servers. |<br/><br/>

### _networkType
Assign the _networkType tag to network-related Entities. Select the appropriate tag value, based on the guidance in the table below.

|Tag values |When to use |
| :-- | :-- |
|guest |Guest WLAN and other guests/BYOD network addresses.|
|nat |Source NAT addresses. Can be used as an exception tag to block content relying on the evaluation of data per-host from applying to hosts that are translated or aggregations of other hosts. Note that this can also be achieved using _deviceType=proxyServer as an example of a specific case.|
|vpn |VPN/remote access user address pools and DHCP scopes.|

### _userGroup
Assign the _userGroup tag to users accounts  known to be involved with specific administrative or privileged activities. Select the appropriate tag value, based on the guidance in the table below.

|Tag values |When to use |
| :-- | :-- |
| awsAdmin |Users that are known to be involved with specific administrative or privileged activity in AWS. Can be used for tracking users that are admins and other privileged users, or are often the source of restricted, privileged or suspicious authorized actions, and so on. This sort of tracking is useful for baselining activity and as a result, surfacing more suspicious activity. |
|dsReplication |Authorized account names to initiate Directory Service Replication requests to Active Directory. <br/><br/>Use this tag value for account names confirmed in event_data['SubjectUserName'] for regularly occurring 4662 baseline events. This may be used in analytics designed to detect [DCSync](https://attack.mitre.org/techniques/T1003/006/) attacks.|
|gcpAdmin |Users that are known to be involved with specific administrative or privileged activity in GCP. Can be used for tracking users that are admins and other privileged users, or are often the source of restricted, privileged or suspicious authorized actions, and so on. This sort of tracking is useful for baselining activity and as a result, surfacing more suspicious activity. |
|googleWorkspaceAdmin |Users that are known to be involved with specific administrative or privileged activity in Google Workspace. Can be used for tracking users that are admins and other privileged users, or are often the source of restricted, privileged or suspicious authorized actions, and so on. This sort of tracking is useful for baselining activity and as a result, surfacing more suspicious activity. |
|kerberosDowngrade |Known account names that utilize downgraded encryption types with multiple SPNs. Use this tag value for Kerberos principal names (for example, jdoe@EXAMPLE.COM) matched in endpoint usernames that are known to trigger content around legacy downgraded encryption types. This is directly related to the detection of [Kerberoasting](https://attack.mitre.org/techniques/T1208/) attacks.|
|salesforceAdmin |Users that are known to be involved with specific administrative or privileged activity in Salesforce. Can be used for tracking users that are admins and other privileged users, or are often the source of restricted, privileged or suspicious authorized actions, and so on. This sort of tracking is useful for baselining activity and as a result, surfacing more suspicious activity.|


## Standard match lists

### admin_ips

**Target column:** Source IP Address

**Description:** Hosts that are known to be involved with specific administrative or privileged activity on the network. Can be used for tracking hosts that are operated by admins and other privileged users, or are often the source of restricted, privileged or suspicious authorized actions, and so on. This sort of tracking is useful for baselining activity and as a result, surfacing more suspicious activity.

The following CSE rules refer to this Match List:

* PSEXEC Admin Tool Detection
* PowerShell Remote Administration
* SMB write to admin hidden share
* AWS CloudTrail Aggressive Reconnaissance (IP)
* AWS CloudTrail Aggressive Reconnaissance (Username)
* AWS CloudTrail Database Snapshot Created (IP)
* AWS CloudTrail Database Snapshot Created (Username)
* AWS CloudTrail GetSecretValue from non Amazon IP
* AWS CloudTrail Reconnaissance related event (IP)
* AWS CloudTrail Reconnaissance related event (Username)
* AWS CloudTrail sensitive activity in KMS (IP)
* AWS CloudTrail sensitive activity in KMS (Username)

### auth_servers

**Target column:** IP Address

**Description:** Network authentication servers, including Active Directory, LDAP, Kerberos, RADIUS/TACACS, and NIS servers. May be used in analytics designed to detect [DCSync](https://attack.mitre.org/techniques/T1003/006/) attacks.

The following CSE rules refer to this Match List:

* DNS Lookup of High Entropy Domain

The following CSE rules refer to this Match List:

none

### auth_servers_dst

**Target column:** Destination IP Address

**Description:** Copy of the [auth_servers](#auth_servers) Match List for directional matches.

The following CSE rules refer to this Match List:

none

### auth_servers_src

**Target column:** Source IP Address

**Description:** Copy of the [auth_servers](#auth_servers) Match List for directional matches.

The following CSE rules refer to this Match List:

none

### AWS_admin_ips

**Target column:** Source IP Address

**Description:** Hosts that are known to be involved with specific administrative or privileged activity in AWS. Can be used for tracking hosts that are operated by admins and other privileged users, or are often the source of restricted, privileged or suspicious authorized actions, and so on. This sort of tracking is useful for baselining activity and as a result, surfacing more suspicious activity.

The following CSE rules refer to this Match List:

* AWS_CloudTrail_Aggressive_Reconnaissance.json
* AWS_CloudTrail_Database_Snapshot_Created.json
* AWS_CloudTrail_GetSecretValue_from_non_Amazon_IP.json
* AWS_CloudTrail_Reconnaissance_related_event.json
* AWS_CloudTrail_sensitive_activity_in_KMS.json
* AWS_ECS_Cluster_Deleted.json
* AWS_Route_53_Domain_Registered.json
* AWS_Route_53_Reconnaissance.json
* AWS_Route_53_Service_Tampering.json
* AWS_Route_53_TestDNSAnswer.json
* AWS_Route_53_Traffic_Policy_Creation.json
* AWS_WAF_Rule_Group_Updated.json
* AWS_WAF_Rule_Updated.json
* Anomalous_AWS_User_Executed_a_Command_on_ECS_Container.json

### AWS_admin_users

**Target column:** Username

**Description:** Users that are known to be involved with specific administrative or privileged activity in AWS. Can be used for tracking users that are admins and other privileged users, or are often the source of restricted, privileged or suspicious authorized actions, and so on. This sort of tracking is useful for baselining activity and as a result, surfacing more suspicious activity.

The following CSE rules refer to this Match List:

* AWS_CloudTrail_Aggressive_Reconnaissance.json
* AWS_CloudTrail_Database_Snapshot_Created.json
* AWS_CloudTrail_Reconnaissance_related_event.json
* AWS_CloudTrail_sensitive_activity_in_KMS.json
* AWS_ECS_Cluster_Deleted.json
* AWS_Route_53_Domain_Registered.json
* AWS_Route_53_Reconnaissance.json
* AWS_Route_53_Service_Tampering.json
* AWS_Route_53_TestDNSAnswer.json
* AWS_Route_53_Traffic_Policy_Creation.json
* AWS_WAF_Rule_Group_Updated.json
* AWS_WAF_Rule_Updated.json
* Anomalous_AWS_User_Executed_a_Command_on_ECS_Container.json

### business_asns

**Target column:** ASN

**Description:** Remote ASNs supporting business processes.

The following CSE rules refer to this Match List:

* Domain Resolution in Non Standard TLD
* Executable Downloaded Content Type Mismatch
* HTTP Request to Domain in Non Standard TLD
* Threat

### business_domains

**Target column:** Domain

**Description:** DNS domain names that are known business-related domains. This is intended to capture domains related to validated, expected, or critical business functions and may be used for allowlisting or filtering related uninteresting results from query result sets.

*Domain* matches against the `domain` field, not the FQDN (i.e. hostname or query), so *example.com* is a valid entry is but *www.example.com* is not.

The following CSE rules refer to this Match List:

* Anomalous Web Server Software
* Bitsadmin to Uncommon TLD
* Connection to High Entropy Domain,
* DNS DGA Lookup Behavior NXDOMAIN Responses
* DNS Lookup of High Entropy Domain
* DNS over TLS (DoT) Activity
* DNS query for dynamic DNS provider
* DNS Query Hex in Domain
* Domain Resolution in Non Standard TLD
* Executable Downloaded Content Type Mismatch
* HTTP External Request to PowerShell Extension
* HTTP Request for Possible DGA Domain
* HTTP request for single character file name
* HTTP Request to Domain in Non Standard TLD
* Possible DGA Domain
* Possible DNS Data Exfiltration
* Script CLI UserAgent string
* SSH Interesting Hostname Login   Threat

### business_hostnames

**Target column:** Hostname

**Description:** DNS hostnames that are known to be business-related FQDNs.

The following CSE rules refer to this Match List:

* Anomalous Web Server Software
* Bitsadmin to Uncommon TLD
* Connection to High Entropy Domain,
* DNS DGA Lookup Behavior NXDOMAIN Responses
* DNS Lookup of High Entropy Domain
* DNS Query Hex in Domain
* DNS query for dynamic DNS provider
* Domain Resolution in Non Standard TLD
* Executable Downloaded Content Type Mismatch
* HTTP request for single character file name
* HTTP Request to Domain in Non Standard TLD
* HTTP External Request to PowerShell Extension
* HTTP Request  for Possible DGA Domain
* HTTP request for single character file name
* Possible DGA Domain
* Possible DNS Data Exfiltration
* Script CLI UserAgent string
* SSH Interesting Hostname Login
* Threat
* VBS file downloaded

### business_ips

**Target column:** IP Address

**Description:** Remote IP addresses supporting business processes. Can be used for things like SSH servers for SFTP file exchanges (similarly, FTP servers).

The following CSE rules refer to this Match List:

* Anomalous Web Server Software, Bitsadmin to Uncommon TLD, Connection to High Entropy Domain
* HTTP External Request to PowerShell Extension
* HTTP Request for Possible DGA Domain,
* Noncompliant Protocol Tunnel Over Common Service Port
* Palo Alto Correlation Event (IP)
* Palo Alto Correlation Event (User)
* Palo Alto Failed Authentication Multiple Attempts from the Same IP
* Palo Alto Failed Authentication Multiple Attempts from the User
* Palo Alto Failed Authentication Multiple Usernames Attempted
* Palo Alto Firewall Threat (IP)
* Palo Alto Firewall Threat (User)
* Possible DGA Domain
* Potential malicious JVM download
* SMB Internal to External
* SSH Interesting Hostname Login
* SSH Password Brute Force
* Script CLI UserAgent string

### dns_servers

**Target column:** IP Address

**Description:** DNS caching resolvers/authoritative content servers in customer environments.

The following CSE rules refer to this Match List:

* Too many empty refused dns queries
* DNS over TLS (DoT) Activity

### dns_servers_dst

**Target column:** Destination IP Address

**Description:** Copy of the [dns_servers](#dns_servers) Match List for directional matches.

The following CSE rules refer to this Match List:

none

### dns_servers_src

**Target column:** Source IP Address

**Description:** Copy of the [dns_servers](#dns_servers) Match List for directional matches.

The following CSE rules refer to this Match List:

none

### downgrade_krb5_etype_authorized_users

**Target column:** Username

**Description:** Known account names that utilize downgraded encryption types with multiple SPNs. This is an exception Match List that should be populated with a list of Kerberos principal names (for example,  jdoe@EXAMPLE.COM) matched in endpoint username that are known to trigger content around legacy downgraded encryption types. This is directly related to the detection of [*Kerberoasting*](https://attack.mitre.org/techniques/T1208/) attacks.

The following CSE rules refer to this Match List:

* Too Many Kerberos Encryption Downgrade SPNs (IP)
* Too Many Kerberos Encryption Downgrade SPNs (User)

### ds_replication_authorized_users

**Target column:** Username

**Description:** Authorized account names to initiate Directory Service Replication requests to Active Directory.

This should be populated with list of account names confirmed in `event_data['SubjectUserName']` for regularly occurring 4662 baseline events. This may be used in analytics designed to detect [DCsync](https://attack.mitre.org/techniques/T1003/006/) attacks.

The following CSE rules refer to this Match List:

none

### ftp_servers

**Target column:** IP Address

**Description:** Known FTP servers.

The following CSE rules refer to this Match List:

none

### GCP_admin_ips

**Target column:** Source IP Address

**Description:** Hosts that are known to be involved with specific administrative or privileged activity in GCP. Can be used for tracking hosts that are operated by admins and other privileged users, or are often the source of restricted, privileged or suspicious authorized actions, and so on. This sort of tracking is useful for baselining activity and as a result, surfacing more suspicious activity.

### GCP_admin_users

**Target column:** Username

**Description:** Users that are known to be involved with specific administrative or privileged activity in GCP. Can be used for tracking users that are admins and other privileged users, or are often the source of restricted, privileged or suspicious authorized actions, and so on. This sort of tracking is useful for baselining activity and as a result, surfacing more suspicious activity.

### Google_Workspace_admin_ips

**Target column:** Source IP Address

**Description:** Hosts that are known to be involved with specific administrative or privileged activity in Google Workspace. Can be used for tracking hosts that are operated by admins and other privileged users, or are often the source of restricted, privileged or suspicious authorized actions, and so on. This sort of tracking is useful for baselining activity and as a result, surfacing more suspicious activity.

The following CSE rule refers to this Match List:

G Suite - Admin Activity

### Google_Workspace_admin_users

**Target column:** Username

**Description:** Users that are known to be involved with specific administrative or privileged activity in Google Workspace. Can be used for tracking users that are admins and other privileged users, or are often the source of restricted, privileged or suspicious authorized actions, and so on. This sort of tracking is useful for baselining activity and as a result, surfacing more suspicious activity.

The following CSE rule refers to this Match List:

G Suite - Admin Activity

### guest_networks

**Target column:** IP Address

**Description:** Known guest WLAN and other guests/BYOD network addresses.

The following CSE rules refer to this Match List:

* Base32 in DNS Query
* Bitsadmin to Uncommon TLD
* Connection to High Entropy Domain
* DNS DGA Lookup Behavior NXDOMAIN Responses
* DNS Lookup of High Entropy Domain
* DNS over TLS (DoT) Activity
* DNS query for dynamic DNS provider
* DNS Query Hex in Domain
* Domain Resolution in Non Standard TLD
* Executable Downloaded Content Type Mismatch
* HTTP request for single character file name
* HTTP Request to Domain in Non Standard TLD
* Noncompliant Protocol Tunnel Over Common Service Port
* Palo Alto Correlation Event (IP)
* Palo Alto Correlation Event (User)
* Palo Alto Failed Authentication Multiple Attempts from the Same IP
* Palo Alto Failed Authentication Multiple Attempts from the User
* Palo Alto Failed Authentication Multiple Usernames Attempted
* Palo Alto Firewall Threat (IP)
* Palo Alto Firewall Threat (User)
* Possible DNS Data Exfiltration
* RDP Error Messages
* Script CLI UserAgent string
*  SMB write to admin hidden share
* SQL Injection Attacker
* SQL Injection Victim
* SQL Select From
* SSH Interesting Hostname Login

### http_servers

**Target column:** IP Address

**Description:** Web servers in your environment.

The following CSE rules refer to this Match List:

none

### lan_scanner_exception_ips

**Target column:** IP Address

**Description:** IP addresses excepted from analytics identifying LAN protocol scanning activity. Used in specific cases to exclude hosts from flagging particular types of rule content, primarily around scanning of commonly targeted LAN service ports, etc. Not an across-the-board allowlist. This Match List is not intended for vulnerability scanners, which should be listed instead in vuln scanners.

Examples of hosts that are suited for this Match List:

* Telephony server that pushes content to deployed softphones over SMB/CIFS

* Data security audit software that connects to SMB shares

The following CSE rules refer to this Match List:

* Internal Port Scan
* Internal Port Sweep
* IP Address Scan Internal
* Port Scan Internal
* SMB Scanning Detected
* SSH Authentication Failures
* SSL Certificate Expired

### nat_ips

**Target column:** IP Address

**Description:** Source NAT addresses. Can be used as an exception Match List to block content relying on the evaluation of data per-host from applying to hosts that are translated or aggregations of other hosts. Note that this can also be applied using [proxy_servers](#proxy_servers) as an example of a specific case.

The following CSE rules refer to this Match List:

* DNS DGA Lookup Behavior NXDOMAIN Responses

### nms_ips

**Target column:** IP Address

**Description:**

Hosts known to be Network Management System (NMS) nodes.

Can be used as an exception Match List for systems that connect to other hosts in environment for purposes of management, monitoring, and so on.

The following CSE rules refer to this Match List:

* Internal Port Scan
* Internal Port Sweep
* IP Address Scan Internal
* Port Scan Internal

### palo_alto_sinkhole_ips

**Target column:** IP Address

**Description:** IP addresses for the sinkhole IP or IPs configured for [Palo Alto DNS sinkhole](https://knowledgebase.paloaltonetworks.com/KCSArticleDetail?id=kA10g000000ClGECA0).

Should contain the default IPv4 sinkhole address from PANW (72.5.65.111) and should include additionally any other sinkhole IP you have configured.

The following CSE rules refer to this Match List:

None

### proxy_servers

**Target column:** IP Address

**Description:** Forward proxy servers, including HTTP and SOCKS proxies.

The following CSE rules refer to this Match List:

* DNS DGA Lookup Behavior NXDOMAIN Responses
* Executable Downloaded Content Type Mismatch
* HTTP Response Error Spike Internal
* Internal Port Scan
* Internal Port Sweep
* IP Address Scan Internal
* Port Scan Internal
* Possible DNS Data Exfiltration

### proxy_servers_dst

**Target column:** Destination IP Address

**Description:** Copy of the [proxy_servers](#proxy_servers) Match List for directional matches.

The following CSE rules refer to this Match List:

* Executable Downloaded Content Type Mismatch

### proxy_servers_src

**Target column:** Source IP Address

**Description:** Copy of the [proxy_server](#proxy_servers) Match List for directional matches.

The following CSE rules refer to this Match List:

none

### salesforce_admin_ips

**Target column:** Source IP Address

**Description:** Hosts that are known to be involved with specific administrative or privileged activity in Salesforce. Can be used for tracking hosts that are operated by admins and other privileged users, or are often the source of restricted, privileged or suspicious authorized actions, and so on. This sort of tracking is useful for baselining activity and as a result, surfacing more suspicious activity.

### salesforce_admin_users

**Target column:** Username

**Description:** Users that are known to be involved with specific administrative or privileged activity in Salesforce. Can be used for tracking users that are admins and other privileged users, or are often the source of restricted, privileged or suspicious authorized actions, and so on. This sort of tracking is useful for baselining activity and as a result, surfacing more suspicious activity.

### sandbox_ips

**Target column:** IP Address

**Description:** Malware sandboxes or security devices interacting with malicious infrastructure.

The following CSE rules refer to this Match List:

* Threat

### scanner_targets

**Target column:** IP Address

**Description:** Destination networks that are authorized/standard targets of vulnerability scans in customer environment.

The following CSE rules refer to this Match List:

none

### smtp_servers

**Target column:** IP Address

**Description:** SMTP sending/receiving hosts in customer environment.

The following CSE rules refer to this Match List:

none

### sql_servers

**Target column:** IP Address

**Description:** Database servers in customer environment.

The following CSE rules refer to this Match List:

none

### ssh_servers

**Target column:** IP Address

**Description:** Known SSH servers.

The following CSE rules refer to this Match List:

none

### telnet_servers

**Target column:**     IP Address

**Description:** Telnet servers in your environment.

The following CSE rules refer to this Match List:

none

### threat

**Target column:** IP Address

**Description:** A record flagged an IP address from a threat intelligence Match List.

The following CSE rules refer to this Match List:

* Threat

### verified_uri_paths

**Target column:** HttpUrlPath (Custom)

**Description:** Reviewed and validated legitimate or non-threat IP addresses.

This is a shared match list that should be imported into target environments.

Match list items have a TTL specified that will result in the items having an expiration date set in the future.

The following CSE rules refer to this Match List:

* HTTP Request to Domain in Non Standard TLD

### vpn_networks

**Target column:** IP Address

**Description:** VPN/remote access user address pools and DHCP scopes.

The following CSE rules refer to this Match List:

none

### vpn_servers

**Target column:** IP Address

**Description:** VPN/remote access servers, including IKE/IPsec/SSL VPN concentrators, OpenVPN endpoints, and so on.

The following CSE rules refer to this Match List:

* Successful VPN Login From 2+ Countries Within 1 Hour.

### vuln_scanners

**Target column:** IP Address

**Description:** Vulnerability scanner and network mapping hosts.

The following CSE rules refer to this Match List:

* Base32 in DNS Query
* Bitsadmin to Uncommon TLD
* Connection to High Entropy Domain
* Critical Severity Intrusion Signature
* Directory Traversal Successful
* Directory Traversal Unsuccessful
* DNS DGA Lookup Behavior NXDOMAIN Responses
* DNS Lookup of High Entropy Domain
* DNS Lookup of High Entropy Domain
* DNS query for dynamic DNS provider
* DNS Query Hex in Domain
* Domain Resolution in Non Standard TLD
* Doublepulsar scan likely not infected
* Executable Downloaded Content Type Mismatch.
* HTTP request for single character file name
* HTTP Request to Domain in Non Standard TLD
* HTTP Request with Single Header
* Internal Communication on Unassigned Low Ports Destination Match
* Internal Port Scan
* Internal Port Sweep
* Intrusion Scan Targeted
* Intrusion Sweep
* IP Address Scan Internal
* Likely doublepulsar Infected
* Multiple High Severity Intrusion Events
* Noncompliant Protocol Tunnel Over Common Service Port
* Palo Alto Correlation Event (IP)
* Palo Alto Correlation Event (User)
* Palo Alto Failed Authentication Multiple Attempts from the Same IP
* Palo Alto Failed Authentication Multiple Attempts from the User
* Palo Alto Failed Authentication Multiple Usernames Attempted
* Palo Alto Firewall Threat (IP)
* Palo Alto Firewall Threat (User)
* Port Scan Internal
* Possible DNS Data Exfiltration
* RDP Brute Force Attempt
* RDP Error Messages
* Script CLI UserAgent string
* Shellshock
* SMB Scanning Detected
* SMB write to admin hidden share
* SQL Injection Attacker
* SQL Injection Victim
* SQL Select From
* SSH Authentication Failures
* SSH Interesting Hostname Login
* SSL Certificate Expired
* SSL Heartbleed Attack
* Windows Discovery of a System Time
* Windows Domain Trust Discovery (Hostname)
* Windows Domain Trust Discovery (User)
* Windows Local System executing whoami.exe (Hostname)
* Windows Network Sniffing (hostname)
* Windows Network Sniffing (user username)
* Windows Network trace capture using netsh.exe (Hostname)
* Windows Network trace capture using netsh.exe (User)
* Windows Permissions Group Discovery (Hostname)
* Windows Permissions Group Discovery (User)
* Windows Query Registry (hostname)
* Windows Query Registry (username).json
* Windows Remote System Discovery (Hostname)
* Windows System Network Configuration Discovery (User)
* Windows System Recon
* Windows Wifi Credential Harvesting with netsh (Hostname).json
* Windows Wifi Credential Harvesting with netsh (User)
