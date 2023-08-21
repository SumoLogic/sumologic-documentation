---
id: standard-match-lists
title: Entity Tags and Standard Match Lists
description: Learn about Entity Tags and standard Match Lists in CSE.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This topic has information about how you can identify specific Entities or indicators that should be treated differently during CSE rule processing. For example, you might want to prevent a rule from firing for Records that contain one of a certain set of IP addresses. Conversely, you might want to only fire a Signal if a user Entity belongs to a certain group, such as domain admins. There are currently two methods of achieving this sort of allowlist/denylist behavior:

* Schema key tags for Entities. This is the recommended approach. You simply apply predefined [schema key tags](/docs/cse/records-signals-entities-insights/tags-insights-signals-entities-rules) to new Entities once they come into CSE. See [Schema tag keys for Entities](#schema-tag-keys-for-entities) for information about which tag:value pairs to use for different Entities.  
:::tip
The most efficient way to assign tags to Entities is to configure [Entity Groups](/docs/cse/records-signals-entities-insights/create-an-entity-group), and allow CSE to automatically apply tags based on group membership.
:::
* Standard match lists. This is the original approach for excluding Entities from rule processing. It involves adding Entities to standard match lists, as described in [Create a Match List](/docs/cse/match-lists-suppressed-lists/create-match-list). Currently, standard match lists are still supported, but we recommend you use schema tag keys going forward. Standard match lists are described in [Standard match lists](#standard-match-lists) below. When creating Standard match lists using the [CSE REST API](/docs/api/cloud-siem-enterprise/), the expected `target_column` value is indicated in the entries below using parentheses, as in: "**Target column:** Source IP Address (`SrcIp`)."


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

### admin_accounts

**Target column:** Username (`Username`)

**Description:** Accounts that are known to be involved with specific administrative or privileged activity.

The following CSE rules refer to this Match List:

* Windows - Excessive User Interactive Logons Across Multiple Hosts

### admin_ips

**Target column:** Source IP Address (`SrcIp`)

**Description:** Hosts that are known to be involved with specific administrative or privileged activity on the network. Can be used for tracking hosts that are operated by admins and other privileged users, or are often the source of restricted, privileged or suspicious authorized actions, and so on. This sort of tracking is useful for baselining activity and as a result, surfacing more suspicious activity.

The following CSE rules refer to this Match List:

* PowerShell Remote Administration
* PSEXEC Admin Tool Detection
* SMB write to admin hidden share

### admin_username

**Target column:** Username (`Username`)

**Description:** Users that are known to be involved with specific administrative or privileged activity.

The following CSE rules refer to this Match List:

* Lateral Movement Using the Windows Hidden Admin Share

### Alibaba_admin_ips

**Target column:** IP Address (`Ip`)

**Description:** IPs that are known to be involved with specific administrative or privileged activity on the network.

The following CSE rules refer to this Match List:

* Alibaba ActionTrail KMS Activity

### Alibaba_admin_users

**Target column:** Username (`Username`)

**Description:** Users that are known to be involved with specific administrative or privileged activity on the network.

The following CSE rules refer to this Match List:

* Alibaba ActionTrail KMS Activity

### auth_servers

**Target column:** IP Address (`Ip`)

**Description:** Network authentication servers, including Active Directory, LDAP, Kerberos, RADIUS/TACACS, and NIS servers. May be used in analytics designed to detect [DCSync](https://attack.mitre.org/techniques/T1003/006/) attacks.

The following CSE rules refer to this Match List:

* DNS Lookup of High Entropy Domain

### authorized_third_party_domains

**Target column:** Domain (`Domain`)

**Description:** Authorized third party domains.

The following CSE rules refer to this Match List:

* Salesforce LoginAs Event

### AWS_admin_ips

**Target column:** Source IP Address (`SrcIp`)

**Description:** Hosts that are known to be involved with specific administrative or privileged activity in AWS. Can be used for tracking hosts that are operated by admins and other privileged users, or are often the source of restricted, privileged or suspicious authorized actions, and so on. This sort of tracking is useful for baselining activity and as a result, surfacing more suspicious activity.

The following CSE rules refer to this Match List:

* AWS Cloud Storage Deletion
* AWS CloudTrail - Aggressive Reconnaissance
* AWS CloudTrail - Database Snapshot Created
* AWS CloudTrail - GetSecretValue from non Amazon IP
* AWS CloudTrail - Reconnaissance related event
* AWS CloudTrail - sensitive activity in KMS
* AWS CloudWatch Alarm Actions Disabled
* AWS CloudWatch Alarm Deletion
* AWS CloudWatch Anomaly Detector Deletion
* AWS CloudWatch Log Group Deletion
* AWS CloudWatch Log Stream Deletion
* AWS Config Recorder Deletion
* AWS Config Recorder Stopped
* AWS Config Service Tampering
* AWS ECS Cluster Deleted
* AWS Image Creation
* AWS Image Deletion
* AWS Image Discovery
* AWS Image Modification
* AWS Instance Creation
* AWS Instance Deletion
* AWS Instance Discovery
* AWS Instance Modification
* AWS Route 53 Domain Registered
* AWS Route 53 Reconnaissance
* AWS Route 53 Service Tampering
* AWS Route 53 TestDNSAnswer
* AWS Route 53 Traffic Policy Creation
* AWS WAF Access Control List Updated
* AWS WAF Reconnaissance
* AWS WAF Rule Group Updated
* AWS WAF Rule Updated
* AWS WAF Service Tampering
* Anomalous AWS User Executed a Command on ECS Container

### AWS_admin_users

**Target column:** Username (`Username`)

**Description:** Users that are known to be involved with specific administrative or privileged activity in AWS. Can be used for tracking users that are admins and other privileged users, or are often the source of restricted, privileged or suspicious authorized actions, and so on. This sort of tracking is useful for baselining activity and as a result, surfacing more suspicious activity.

The following CSE rules refer to this Match List:

* AWS Cloud Storage Deletion
* AWS CloudTrail - Aggressive Reconnaissance
* AWS CloudTrail - Database Snapshot Created
* AWS CloudTrail - Reconnaissance related event
* AWS CloudTrail - sensitive activity in KMS
* AWS CloudWatch Alarm Actions Disabled
* AWS CloudWatch Alarm Deletion
* AWS CloudWatch Anomaly Detector Deletion
* AWS CloudWatch Log Group Deletion
* AWS CloudWatch Log Stream Deletion
* AWS Config Recorder Deletion
* AWS Config Recorder Stopped
* AWS Config Service Tampering
* AWS ECS Cluster Deleted
* AWS Image Creation
* AWS Image Deletion
* AWS Image Discovery
* AWS Image Modification
* AWS Instance Creation
* AWS Instance Deletion
* AWS Instance Discovery
* AWS Instance Modification
* AWS Route 53 Domain Registered
* AWS Route 53 Reconnaissance
* AWS Route 53 Service Tampering
* AWS Route 53 TestDNSAnswer
* AWS Route 53 Traffic Policy Creation
* AWS WAF Access Control List Updated
* AWS WAF Reconnaissance
* AWS WAF Rule Group Updated
* AWS WAF Rule Updated
* AWS WAF Service Tampering
* Anomalous AWS User Executed a Command on ECS Container
* Spike in AWS API Call from User

### business_asns

**Target column:** ASN (`Asn`)

**Description:** Remote ASNs supporting business processes.

The following CSE rules refer to this Match List:

* Domain Resolution in Non-Standard TLD
* Executable Downloaded - Content-Type Mismatch
* HTTP Request to Domain in Non-Standard TLD
* Threat Intel Match - IP Address
* Threat Intel - Matched Domain Name
* Threat Intel - Device IP Matched Threat Intel Domain Name
* Threat Intel - Device IP Matched Threat Intel URL

### business_domains

**Target column:** Domain (`Domain`)

**Description:** DNS domain names that are known business-related domains. This is intended to capture domains related to validated, expected, or critical business functions and may be used for allowlisting or filtering related uninteresting results from query result sets.

*Domain* matches against the `domain` field, not the FQDN (i.e. hostname or query), so *example.com* is a valid entry is but *www.example.com* is not.

The following CSE rules refer to this Match List:

* Bitsadmin to Uncommon TLD
* Connection to High Entropy Domain
* DNS DGA Lookup Behavior - NXDOMAIN Responses
* DNS Lookup of High Entropy Domain
* DNS query for dynamic DNS provider
* Domain Resolution in Non-Standard TLD
* Executable Downloaded - Content-Type Mismatch
* HTTP External Request to PowerShell Extension
* HTTP Request to Domain in Non-Standard TLD
* HTTP request for single character file name
* Hexadecimal in DNS Query Domain
* Possible DNS Data Exfiltration
* Request to Anomalous Web Server Software
* SSH Interesting Hostname Login
* Script/CLI UserAgent string
* Threat Intel Match - IP Address
* Threat Intel - Matched Domain Name
* Threat Intel - Device IP Matched Threat Intel Domain Name
* Threat Intel - Device IP Matched Threat Intel URL

### business_hostnames

**Target column:** Hostname (`Hostname`)

**Description:** DNS hostnames that are known to be business-related FQDNs.

The following CSE rules refer to this Match List:

* Bitsadmin to Uncommon TLD
* Connection to High Entropy Domain
* DNS DGA Lookup Behavior - NXDOMAIN Responses
* DNS Lookup of High Entropy Domain
* DNS query for dynamic DNS provider
* Domain Resolution in Non-Standard TLD
* Executable Downloaded - Content-Type Mismatch
* HTTP External Request to PowerShell Extension
* HTTP Request to Domain in Non-Standard TLD
* HTTP request for single character file name
* Hexadecimal in DNS Query Domain
* Possible DNS Data Exfiltration
* Request to Anomalous Web Server Software
* SSH Interesting Hostname Login
* Script/CLI UserAgent string
* Threat Intel Match - IP Address
* VBS file downloaded from Internet
* Web Request to Punycode Domain
* Threat Intel - Matched Domain Name
* Threat Intel - Device IP Matched Threat Intel Domain Name
* Threat Intel - Device IP Matched Threat Intel URL

### business_ips

**Target column:** IP Address (`Ip`)

**Description:** Remote IP addresses supporting business processes. Can be used for things like SSH servers for SFTP file exchanges (similarly, FTP servers).

The following CSE rules refer to this Match List:

* Bitsadmin to Uncommon TLD
* Connection to High Entropy Domain
* Domain Resolution in Non-Standard TLD
* Executable Downloaded - Content-Type Mismatch
* HTTP External Request to PowerShell Extension
* HTTP Request to Domain in Non-Standard TLD
* Noncompliant Protocol Tunnel Over Common Service Port
* Outbound Data Transfer Protocol Over Non-standard Port
* Potential malicious JVM download
* Request to Anomalous Web Server Software
* SMB Internal to External traffic
* SSH Interesting Hostname Login
* Script/CLI UserAgent string
* Threat Intel Match - IP Address
* Web Request to IP Address
* Threat Intel - Matched Domain Name
* Threat Intel - Device IP Matched Threat Intel Domain Name
* Threat Intel - Device IP Matched Threat Intel URL

### dns_servers

**Target column:** IP Address (`Ip`)

**Description:** DNS caching resolvers/authoritative content servers in customer environments.

The following CSE rules refer to this Match List:

* Direct Outbound DNS Traffic
* Possible DNS over TLS (DoT) Activity
* Too many empty/refused DNS queries

### domain_controllers

**Target column:** IP Address (`Ip`)

**Description:** Domain controllers.

The following CSE rules refer to this Match List:

* Brute Force Attempt
* Domain Brute Force Attempt
* Domain Password Attack
* First Seen Anonymous Logon Change Activity to Domain Controller
* Interactive Logon to Domain Controller
* Password Attack
* Successful Brute Force
* Suspicious DC Logon

### downgrade_krb5_etype_authorized_users

**Target column:** Username (`Username`)

**Description:** Known account names that utilize downgraded encryption types with multiple SPNs. This is an exception Match List that should be populated with a list of Kerberos principal names (for example,  jdoe@EXAMPLE.COM) matched in endpoint username that are known to trigger content around legacy downgraded encryption types. This is directly related to the detection of [*Kerberoasting*](https://attack.mitre.org/techniques/T1208/) attacks.

The following CSE rules refer to this Match List:

* First Seen Kerberoasting Attempt from User - Global
* First Seen Kerberoasting Attempt from User - Host
* Too Many Kerberos Encryption Downgrade SPNs (Kerberoasting)

### ds_replication_authorized_users

**Target column:** Username (`Username`)

**Description:** Authorized account names to initiate Directory Service Replication requests to Active Directory.

This should be populated with list of account names confirmed in `event_data['SubjectUserName']` for regularly occurring 4662 baseline events. This may be used in analytics designed to detect [DCsync](https://attack.mitre.org/techniques/T1003/006/) attacks.

The following CSE rules refer to this Match List:

none

### dyndns_exception_domains

**Target column:** Domain (`Domain`)

**Description:** Authorized domains.

The following CSE rules refer to this Match List:

* Connection to High Entropy Domain
* DNS query for dynamic DNS provider
* HTTP request for single character file name
* Possible DNS Data Exfiltration

### dyndns_exception_hostnames

**Target column:** Hostname (`Hostname`)

**Description:** Authorized hostnames.

The following CSE rules refer to this Match List:

* Connection to High Entropy Domain
* DNS query for dynamic DNS provider
* HTTP request for single character file name
* Possible DNS Data Exfiltration

### ftp_servers

**Target column:** IP Address (`Ip`)

**Description:** Known FTP servers.

The following CSE rules refer to this Match List:

none

### gcp_admin

**Target column:** Username (`Username`) or Source IP Address (`SrcIp`)

**Description:** Users or hosts that are known to be involved with specific administrative or privileged activity in GCP. Can be used for tracking users or hosts that are admins and other privileged users, or are often the source of restricted, privileged or suspicious authorized actions, and so on. This sort of tracking is useful for baselining activity and as a result, surfacing more suspicious activity.

The following CSE rules refer to this Match List:

* GCP Audit Cloud SQL Database Modified
* GCP Audit GCE Firewall Rule Modified
* GCP Audit GCE Network Route Created or Modified
* GCP Audit GCE VPC Network Modified
* GCP Audit IAM CreateServiceAccount Observed
* GCP Audit IAM Custom Role Created or Modified
* GCP Audit IAM Custom Role Deletion
* GCP Audit IAM DeleteServiceAccount Observed
* GCP Audit IAM DisableServiceAccount Observed
* GCP Audit KMS Activity
* GCP Audit Logging Sink Modified
* GCP Audit Pub/Sub Subscriber Modified
* GCP Audit Pub/Sub Topic Deleted
* GCP Audit Secrets Manager Activity
* GCP Bucket Modified

### GCP_admin_ips

**Target column:** Source IP Address (`SrcIp`)

**Description:** Hosts that are known to be involved with specific administrative or privileged activity in GCP. Can be used for tracking hosts that are operated by admins and other privileged users, or are often the source of restricted, privileged or suspicious authorized actions, and so on. This sort of tracking is useful for baselining activity and as a result, surfacing more suspicious activity.

The following CSE rules refer to this Match List:

* GCP Image Creation
* GCP Image Deletion
* GCP Image Discovery
* GCP Image Modification
* GCP Instance Creation
* GCP Instance Deletion
* GCP Instance Discovery
* GCP Instance Modification

### GCP_admin_users

**Target column:** Username (`Username`)

**Description:** Users that are known to be involved with specific administrative or privileged activity in GCP. Can be used for tracking users that are admins and other privileged users, or are often the source of restricted, privileged or suspicious authorized actions, and so on. This sort of tracking is useful for baselining activity and as a result, surfacing more suspicious activity.

The following CSE rules refer to this Match List:

* GCP Image Creation
* GCP Image Deletion
* GCP Image Discovery
* GCP Image Modification
* GCP Instance Creation
* GCP Instance Deletion
* GCP Instance Discovery
* GCP Instance Modification

### Google_Workspace_admin_ips

**Target column:** Source IP Address (`SrcIp`)

**Description:** Hosts that are known to be involved with specific administrative or privileged activity in Google Workspace. Can be used for tracking hosts that are operated by admins and other privileged users, or are often the source of restricted, privileged or suspicious authorized actions, and so on. This sort of tracking is useful for baselining activity and as a result, surfacing more suspicious activity.

The following CSE rule refers to this Match List:

* G Suite - Admin Activity

### Google_Workspace_admin_users

**Target column:** Username (`Username`)

**Description:** Users that are known to be involved with specific administrative or privileged activity in Google Workspace. Can be used for tracking users that are admins and other privileged users, or are often the source of restricted, privileged or suspicious authorized actions, and so on. This sort of tracking is useful for baselining activity and as a result, surfacing more suspicious activity.

The following CSE rule refers to this Match List:

* G Suite - Admin Activity

### guest_networks

**Target column:** IP Address (`Ip`)

**Description:** Known guest WLAN and other guests/BYOD network addresses.

The following CSE rules refer to this Match List:

* Base32 in DNS Query
* Bitsadmin to Uncommon TLD
* Connection to High Entropy Domain
* DNS DGA Lookup Behavior - NXDOMAIN Responses
* DNS Lookup of High Entropy Domain
* DNS query for dynamic DNS provider
* Domain Resolution in Non-Standard TLD
* Executable Downloaded - Content-Type Mismatch
* HTTP Request to Domain in Non-Standard TLD
* HTTP request for single character file name
* Hexadecimal in DNS Query Domain
* Noncompliant Protocol Tunnel Over Common Service Port
* Possible DNS Data Exfiltration
* Possible DNS over TLS (DoT) Activity
* RDP Error Messages
* SMB write to hidden admin share
* SQL Injection Attacker
* SQL Injection Victim
* SQL-Select-From
* SSH Interesting Hostname Login
* Script/CLI UserAgent string
* Web Request to IP Address
* Web Request to Punycode Domain

### honeypot_ip_addresses

**Target column:** IP Address (`Ip`)

**Description:** List of IPs for Honeypots.

The following CSE rules refer to this Match List:

* Traffic to Honeypot IP

### http_servers

**Target column:** IP Address (`Ip`)

**Description:** Web servers in your environment.

The following CSE rules refer to this Match List:

* Spike in URL Length from IP Address

### lan_scanner_exception_ips

**Target column:** IP Address (`Ip`)

**Description:** IP addresses excepted from analytics identifying LAN protocol scanning activity. Used in specific cases to exclude hosts from flagging particular types of rule content, primarily around scanning of commonly targeted LAN service ports, etc. Not an across-the-board allowlist. This Match List is not intended for vulnerability scanners, which should be listed instead in vuln scanners.

Examples of hosts that are suited for this Match List:

* Telephony server that pushes content to deployed softphones over SMB/CIFS

* Data security audit software that connects to SMB shares

The following CSE rules refer to this Match List:

* Amazon VPC - Network Scan
* Amazon VPC - Port Scan
* Excessive Outbound Firewall Blocks
* GCP Port Scan
* GCP Port Sweep
* IP Address Scan - Internal
* Internal Port Scan
* Internal Port Sweep
* Port Scan - Internal
* SMB Scanning Detected
* SSH Authentication Failures
* SSL Certificate Expired
* Suspicious HTTP User-Agent
* Traffic to Honeypot IP

### nat_ips

**Target column:** IP Address (`Ip`)

**Description:** Source NAT addresses. Can be used as an exception Match List to block content relying on the evaluation of data per-host from applying to hosts that are translated or aggregations of other hosts. Note that this can also be applied using [proxy_servers](#proxy_servers) as an example of a specific case.

The following CSE rules refer to this Match List:

* DNS DGA Lookup Behavior - NXDOMAIN Responses

### nms_ips

**Target column:** IP Address (`Ip`)

**Description:**

Hosts known to be Network Management System (NMS) nodes.

Can be used as an exception Match List for systems that connect to other hosts in environment for purposes of management, monitoring, and so on.

The following CSE rules refer to this Match List:

* Amazon VPC - Network Scan
* Amazon VPC - Port Scan
* GCP Port Scan
* GCP Port Sweep
* IP Address Scan - Internal
* Internal Port Scan
* Internal Port Sweep
* Port Scan - Internal
* Traffic to Honeypot IP

### Okta_Admins

**Target column:** Username (`Username`)

**Description:** Users that are known to be involved with specific administrative or privileged activity.

The following CSE rules refer to this Match List:

* Okta Admin App Accessed

### palo_alto_sinkhole_ips

**Target column:** IP Address (`Ip`)

**Description:** IP addresses for the sinkhole IP or IPs configured for [Palo Alto DNS sinkhole](https://knowledgebase.paloaltonetworks.com/KCSArticleDetail?id=kA10g000000ClGECA0).

Should contain the default IPv4 sinkhole address from PANW (72.5.65.111) and should include additionally any other sinkhole IP you have configured.

The following CSE rules refer to this Match List:

None

### proxy_servers

**Target column:** IP Address (`Ip`)

**Description:** Forward proxy servers, including HTTP and SOCKS proxies.

The following CSE rules refer to this Match List:

* Amazon VPC - Network Scan
* Amazon VPC - Port Scan
* DNS DGA Lookup Behavior - NXDOMAIN Responses
* GCP Port Scan
* GCP Port Sweep
* HTTP Response Error Spike - Internal
* IP Address Scan - Internal
* Internal Port Scan
* Internal Port Sweep
* Port Scan - Internal
* Possible DNS Data Exfiltration

### proxy_servers_dst

**Target column:** Destination IP Address (`DstIp`)

**Description:** Copy of the [proxy_servers](#proxy_servers) Match List for directional matches.

The following CSE rules refer to this Match List:

* Bitsadmin to Uncommon TLD
* Excessive Outbound Firewall Blocks
* Executable Downloaded - Content-Type Mismatch
* GitHub Raw URL Resource Request
* HTTP External Request to PowerShell Extension
* HTTP Request with Single Header
* HTTP Shell Script Download Disguised as a Common Web File
* HTTP request for single character file name
* High risk file extension download without hostname and referrer
* Large File Upload
* Large Outbound ICMP Packets
* Noncompliant Protocol Tunnel Over Common Service Port
* Outbound Data Transfer Protocol Over Non-standard Port
* Outbound IRC Traffic
* Outbound TFTP Traffic
* Pastebin Raw URL Resource Request
* Possible DNS over TLS (DoT) Activity
* Request to Anomalous Web Server Software
* SMB Internal to External traffic
* Self-signed Certificates
* Suspicious Typical Malware Back Connect Ports
* VBS file downloaded from Internet
* Web Request to IP Address
* Web Request to Punycode Domain

### proxy_servers_src

**Target column:** Source IP Address (`SrcIp`)

**Description:** Copy of the [proxy_server](#proxy_servers) Match List for directional matches.

The following CSE rules refer to this Match List:

none

### public_ips

**Target column:** IP Address (`Ip`)

**Description:** Public Ip Addresses.

The following CSE rules refer to this Match List:

* Doublepulsar scan - likely not infected
* Likely doublepulsar Infected

### salesforce_admin_ips

**Target column:** Source IP Address (`SrcIp`)

**Description:** Hosts that are known to be involved with specific administrative or privileged activity in Salesforce. Can be used for tracking hosts that are operated by admins and other privileged users, or are often the source of restricted, privileged or suspicious authorized actions, and so on. This sort of tracking is useful for baselining activity and as a result, surfacing more suspicious activity.

The following CSE rules refer to this Match List:

* Salesforce Custom Permission Creation
* Salesforce Excessive Documents Downloaded
* Salesforce LoginAs Event
* Salesforce Permission Set Addition
* Salesforce Permission Set Assigned
* Salesforce Permission Set Creation
* Salesforce Permission Set Deletion
* Salesforce Permission Set Modification
* Salesforce Report Exported
* Salesforce Role Creation
* Salesforce User Creation
* Salesforce User Role Changed
* Salesforce WaveDownload Event

### salesforce_admin_users

**Target column:** Username (`Username`)

**Description:** Users that are known to be involved with specific administrative or privileged activity in Salesforce. Can be used for tracking users that are admins and other privileged users, or are often the source of restricted, privileged or suspicious authorized actions, and so on. This sort of tracking is useful for baselining activity and as a result, surfacing more suspicious activity.

The following CSE rules refer to this Match List:

* Salesforce Custom Permission Creation
* Salesforce Excessive Documents Downloaded
* Salesforce LoginAs Event
* Salesforce Permission Set Addition
* Salesforce Permission Set Assigned
* Salesforce Permission Set Creation
* Salesforce Permission Set Deletion
* Salesforce Permission Set Modification
* Salesforce Report Exported
* Salesforce Role Creation
* Salesforce User Creation
* Salesforce User Role Changed
* Salesforce WaveDownload Event

### sandbox_ips

**Target column:** IP Address (`Ip`)

**Description:** Malware sandboxes or security devices interacting with malicious infrastructure.

The following CSE rules refer to this Match List:

* Threat Intel Match - IP Address
* Threat Intel - Matched Domain Name
* Threat Intel - Device IP Matched Threat Intel Domain Name

### scanner_targets

**Target column:** IP Address (`Ip`)

**Description:** Destination networks that are authorized/standard targets of vulnerability scans in customer environment.

The following CSE rules refer to this Match List:

none

### smtp_servers

**Target column:** IP Address (`Ip`)

**Description:** SMTP sending/receiving hosts in customer environment.

The following CSE rules refer to this Match List:

none

### sql_servers

**Target column:** IP Address (`Ip`)

**Description:** Database servers in customer environment.

The following CSE rules refer to this Match List:

none

### ssh_servers

**Target column:** IP Address (`Ip`)

**Description:** Known SSH servers.

The following CSE rules refer to this Match List:

none

### ssl_exception_ips

**Target column:** IP Address (`Ip`)

**Description:** SSL exception IPs.

The following CSE rules refer to this Match List:

* SSL Certificate Expired
* SSL Certificate Expires Soon
* SSL Certificate Not Valid Yet
* SSL Invalid Server Cert

### telnet_servers

**Target column:** IP Address (`Ip`)

**Description:** Telnet servers in your environment.

The following CSE rules refer to this Match List:

none

### threat

**Target column:** IP Address (`Ip`)

**Description:** A record flagged an IP address from a threat intelligence Match List.

The following CSE rules refer to this Match List:

* Threat Intel - Successful Authentication from Threat IP
* Threat Intel Match - IP Address
* Threat Intel - Inbound Traffic Context
* Threat Intel - Matched File Hash
* Threat Intel - Matched Domain Name

### unauthorized_external_media

**Target column:** Hostname (`Hostname`)

**Description:** A list of devices that should not have external media installed on them.

The following CSE rules refer to this Match List:

* Unauthorized External Device Installation

### verified_applications

**Target column:** Application (Custom)

**Description:** Reviewed and validated legitimate or non-threat applications.

The following CSE rules refer to this Match List:

* Lateral Movement Using the Windows Hidden Admin Share

### verified_domains

**Target column:** Domain (`Domain`)

**Description:** Reviewed and validated legitimate or non-threat domains.

The following CSE rules refer to this Match List:

* Base32 in DNS Query
* Bitsadmin to Uncommon TLD
* Connection to High Entropy Domain
* DNS Lookup of High Entropy Domain
* DNS query for dynamic DNS provider
* Domain Resolution in Non-Standard TLD
* Executable Downloaded - Content-Type Mismatch
* HTTP External Request to PowerShell Extension
* HTTP Request to Domain in Non-Standard TLD
* HTTP request for single character file name
* Hexadecimal in DNS Query Domain
* Possible DNS Data Exfiltration
* Request to Anomalous Web Server Software
* SSH Interesting Hostname Login
* Script/CLI UserAgent string
* Threat Intel Match - IP Address
* Threat Intel - Matched Domain Name
* Threat Intel - Device IP Matched Threat Intel Domain Name

### verified_hostnames

**Target column:** Hostname (`Hostname`)

**Description:** Reviewed and validated legitimate or non-threat hostnames.

The following CSE rules refer to this Match List:

* Bitsadmin to Uncommon TLD
* Connection to High Entropy Domain
* DNS Lookup of High Entropy Domain
* DNS query for dynamic DNS provider
* Domain Resolution in Non-Standard TLD
* Executable Downloaded - Content-Type Mismatch
* HTTP External Request to PowerShell Extension
* HTTP Request to Domain in Non-Standard TLD
* HTTP request for single character file name
* Hexadecimal in DNS Query Domain
* Possible DNS Data Exfiltration
* Request to Anomalous Web Server Software
* SSH Interesting Hostname Login
* Script/CLI UserAgent string
* Threat Intel Match - IP Address
* Threat Intel - Matched Domain Name
* Threat Intel - Device IP Matched Threat Intel Domain Name
* Web Request to Punycode Domain

### verified_ips

**Target column:** IP Address (`Ip`)

**Description:** Reviewed and validated legitimate or non-threat ips.

The following CSE rules refer to this Match List:

* Domain Resolution in Non-Standard TLD
* HTTP Request to Domain in Non-Standard TLD
* Threat Intel Match - IP Address
* Threat Intel - Matched Domain Name
* Threat Intel - Device IP Matched Threat Intel Domain Name
* Web Request to IP Address

### verified_uri_ips

**Target column:** IP Address (`Ip`)

**Description:** Reviewed and validated legitimate or non-threat IP addresses.

The following CSE rules refer to this Match List:

* Executable Downloaded - Content-Type Mismatch

### verified_uri_paths

**Target column:** HttpUrlPath (Custom)

**Description:** Reviewed and validated legitimate or non-threat IP addresses.

This is a shared match list that should be imported into target environments.

Match list items have a TTL specified that will result in the items having an expiration date set in the future.

The following CSE rules refer to this Match List:

* Executable Downloaded - Content-Type Mismatch
* HTTP Request to Domain in Non-Standard TLD

### vpn_networks

**Target column:** IP Address (`Ip`)

**Description:** VPN/remote access user address pools and DHCP scopes.

The following CSE rules refer to this Match List:

none

### vpn_servers

**Target column:** IP Address (`Ip`)

**Description:** VPN/remote access servers, including IKE/IPsec/SSL VPN concentrators, OpenVPN endpoints, and so on.

The following CSE rules refer to this Match List:

none

### vuln_scanners

**Target column:** IP Address (`Ip`)

**Description:** Vulnerability scanner and network mapping hosts.

The following CSE rules refer to this Match List:

* Amazon VPC - Network Scan
* Amazon VPC - Port Scan
* Base32 in DNS Query
* Bitsadmin to Uncommon TLD
* Brute Force Attempt
* Connection to High Entropy Domain
* Critical Severity Intrusion Signature
* DNS DGA Lookup Behavior - NXDOMAIN Responses
* DNS Lookup of High Entropy Domain
* DNS query for dynamic DNS provider
* Directory Traversal - Successful
* Directory Traversal - Unsuccessful
* Domain Brute Force Attempt
* Domain Password Attack
* Domain Resolution in Non-Standard TLD
* Doublepulsar scan - likely not infected
* Excessive Outbound Firewall Blocks
* Executable Downloaded - Content-Type Mismatch
* GCP Port Scan
* GCP Port Sweep
* HTTP Request to Domain in Non-Standard TLD
* HTTP Request with Single Header
* HTTP request for single character file name
* Hexadecimal in DNS Query Domain
* High Severity Intrusion Signature
* IP Address Scan - Internal
* Informational Severity Intrusion Signature
* Internal Communication on Unassigned Low Ports - Destination Match
* Internal Port Scan
* Internal Port Sweep
* Intrusion Scan - Targeted
* Intrusion Sweep
* Likely doublepulsar Infected
* Low Severity Intrusion Signature
* Medium Severity Intrusion Signature
* Noncompliant Protocol Tunnel Over Common Service Port
* Password Attack
* Port Scan - Internal
* Possible DNS Data Exfiltration
* RDP Error Messages
* SMB Scanning Detected
* SMB write to hidden admin share
* SQL Injection Attacker
* SQL Injection Victim
* SQL-Select-From
* SSH Authentication Failures
* SSH Interesting Hostname Login
* SSL Certificate Expired
* SSL Heartbleed Attack
* Script/CLI UserAgent string
* Shellshock
* Spike in Login Failures from a User
* Spring4Shell Exploitation - URL
* Successful Brute Force
* Suspicious HTTP User-Agent
* Traffic to Honeypot IP

### web_servers

**Target column:** Hostname (`Hostname`) or IP Address (`Ip`)

**Description:** List of webserver hostnames or IPs.

The following CSE rules refer to this Match List:

* Web Servers Executing Suspicious Processes

### zoom_admins

**Target column:** Username (`Username`)

**Description:** Known admin users of Zoom.

The following CSE rules refer to this Match List:

* Zoom - Account Created
* Zoom - Account Deleted
* Zoom - Group Admin Added
* Zoom - Group Admin Deleted
* Zoom - Group Changes
* Zoom - Information Barrier Policy Changes
