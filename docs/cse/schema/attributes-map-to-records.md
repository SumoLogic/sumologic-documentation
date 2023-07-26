---
id: attributes-map-to-records
title: Attributes You Can Map to Records
sidebar_label: Mappable Attributes
description: Learn what CSE schema attributes you can map to Records.
---


This topic lists the schema attributes that you can map to Records. Note that you can map any of the attributes defined below to any [record type](/docs/cse/schema/cse-record-types). For information about all schema attributes, including those that cannot be mapped to Records, for example enrichment fields, see [Schema Attributes](/docs/cse/schema/schema-attributes).  

| Field | Type | Description |
|:--|:--|:--|
| accountId | string   | Account identifiers used in logs from environments where multiple accounts can be used. This is common for cloud providers like AWS.                                                                                                                                                    |
| action | string   | Indicates the action taken by the monitored product (the log producer) when something harmful occurred. For example, when a firewall log indicated a bad network packet, the firewall blocked the connection.                                                                           |
| application | string   | The name of the software that is the subject of this message.   Of interest to those who write mappers: Sometimes this software is the source of the message. In other cases a single source may produce messages related to many different applications and must name them explicitly. |
| authProvider | string | The SSO provider for an authentication attempt. Often found in cloud authentication events and is expected to be NULL if SSO was not used for the authentication attempt. |
| baseImage | string   | The base image of a process (ie notepad.exe) |
| bytesIn | long     | Amount of the data received in bytes. |
| bytesOut | long     | Amount of the data sent in bytes. |
| cause | string | Describes the reason for an outcome in a record in a common way. |
| changeTarget | string   | The user account that was affected by a change. |
| changeType | string   | Category of change the user made. |
| cloud_provider | string | The name of the cloud infrastructure operator, typically a public cloud provider. E.g. Google Cloud Platform (GCP), Amazon Web Services (AWS), Microsoft Azure, Alibaba Cloud etc. |
| cloud_region | string | The physical location a cloud provider operates their infrastructure from. E.g. AWS us-east-2 (Ohio), Azure Central US (Iowa), GCP asia-northeast1-a (Tokyo) etc. |
| cloud_service | string | The specific service offering from a cloud provider. E.g. AWS VPC Flow, Azure Virtual Machines, AWS Lambda, Alibaba Cloud ECS, GCP Compute Engine etc. |
| cloud_zone | string | The cloud infrastructure isolated within a region on which a resource is located or is running. |
| commandLine | string   | The command run by the user using a shell. |
| description | string   | The description of the log event. |
| device_container_id | string | The unique identifier provided to a discrete container which packages together the elements required to run software. |
| device_container_name | string | The name provided to a discrete container which packages together the elements required to run software. |
| device_container_runtime | string | The provider name of the engine whine underpins the container. E.g. Docker, AWS Lambda, containerd |
| device_hostname | string   | Fully Qualified Domain Name that uniquely and absolutely names a computer. If name normalization occurs this will be the normalized name. |
| device_image | string | The snapshot of the state of a device or similar which can be used to deploy or reproduce a system. E.g. A VM image, a container image.|
| device_ip | string   | The native assigned IP address of the device. |
| device_k8s_deployment | string |The deployment name described in the log. | 
| device_k8s_namespace | string | The namespace name within which resources are running as described in the log. | 
| device_k8s_pod | string | The name given to a pod described in the log. | 
| device_k8s_replicaSet | string | The replica set name described in the log. | 
| device_mac | string   | The hardware identification number that uniquely identifies the device on a network |
| device_natIp | string   | The external IP in cases where the internal IP goes through network address translation. |
| device_osName | string   | Operating system controlling on this device. |
| device_type | string | The instance, compute, or machine type. Typically used in cloud environments to describe computing specifications. |
| device_uniqueId | string   | The source specific identifier for device (if available). This is frequently an instance id in cloud environments. |
| dns_query | string   | The entire request made from the client machine to the DNS server. |
| dns_queryDomain | string   | This should be conditionally populated if the DNS request contains a domain. |
| dns_queryType | string   | The type of query that was made by the client machine. |
| dns_reply | string   | The DNS reply which can be a single record or multiple records concatenated into a string. |
| dns_replyDomain | string   | This should be conditionally populated if the DNS reply is a domain. |
| dns_replyIp | string   | This should be conditionally populated if the DNS reply is an IP address. |
| dns_returnCode | string   | Code indicating the outcome of a DNS request. |
| dstDevice_container_id | string | The unique identifier provided to a discrete container which packages together the elements required to run software. | 
| dstDevice_container_name | string | The name provided to a discrete container which packages together the elements required to run software. | 
| dstDevice_container_runtime | string | The provider name of the engine whine underpins the container. E.g. Docker, AWS Lambda, containerd. | 
| dstDevice_hostname | string   | Fully Qualified Domain Name that uniquely and absolutely names a computer. If name normalization occurs this will be the normalized name. |
| dstDevice_image | string | The snapshot of the state of a device or similar which can be used to deploy or reproduce a system for which traffic is destined. E.g. A VM image, a container image. |
| dstDevice_ip | string   | The native assigned IP address of the device. |
| dstDevice_k8s_deployment | string | The deployment name described in the log. |
| dstDevice_k8s_namespace | string | The namespace name within which resources are running as described in the log. |
| dstDevice_k8s_pod | string | The name given to a pod described in the log. |
| dstDevice_k8s_replicaSet | string | The replica set name described in the log. |
| dstDevice_mac | string   | The hardware identification number that uniquely identifies the device on a network |
| dstDevice_natIp | string   | The external IP in cases where the internal IP goes through network address translation. |
| dstDevice_osName | string   | Operating system controlling on this device. |
| dstDevice_type | string | The instance, compute, or machine type which network traffic is destined to. Typically used in cloud environments to describe computing specifications. |
| dstDevice_uniqueId | string   | The source specific identifier for device (if available). This is frequently an instance id in cloud environments. |
| dstPort | int      | The destination port for the network transaction. |
| email_messageId | string   | Unique identifier of the email. |
| email_recipient | string  | Address of the e-mail recipient. Note that only a single recipient can be mapped from a log. To be used only for logs related specifically to e-mail activity (spam filtering, message tracking, etc). | 
| email_sender | string   | Email of the user that sent the email. |
| email_subject | string   | Subject of the email. |
| errorCode | string  | Machine code or shortform message that represents a specific error. | 
| errorText | string | Human readable description of a specific error. | 
| file_basename | string   | The base file name plus extension (if present) minus any path components. |
| file_hash_imphash | string   | File hash created using the IMPHASH algorithm. |
| file_hash_md5 | string   | File hash created using the MD5 algorithm. |
| file_hash_pehash | string   | File hash created using the PEHASH algorithm. |
| file_hash_sha1 | string   | File hash created using the SHA1 algorithm. |
| file_hash_sha256 | string   | File hash created using the SHA256 algorithm. |
| file_hash_ssdeep | string   | File hash created using the SSDEEP algorithm. |
| file_mimeType | string   | Two-part identifier for file formats and format contents transmitted on the Internet. |
| file_path | string   | The full path (if possible) of the file. This field may contain partial paths and serves as the general place holder for path fields. |
| file_size | long     | Count of bytes taken up by the file. |
| file_uid | string   | The data source specific unique identifier for the file. |
| flowState | string   | The state of the flow when the netflow log was generated. |
| http_category | string | The high level category determined by a service based on the url or domain. |
| http_contentLength | int      | The number of bytes of data in the body of the response. |
| http_hostname | string   | Hostname from the client request |
| http_method | string   | Type of request being made. (e.g. GET or POST) |
| http_referer | string   | Identifies the address of the webpage (i.e. the URI or IRI) which is linked to the resource being requested. |
| http_requestHeaders | string | A map of the HTTP request headers. |
| http_response_contentLength | int      | The number of bytes of data in the body of the response |
| http_response_contentType   | string   | The format of the data in the HTTP response. |
| http_response_statusCode    | int      | The HTTP response code for a request. |
| http_response_statusText    | string   | Contains the status message corresponding to the status code. |
| http_url | string   | URL that the request is being made to. |
| http_userAgent | string   | Software agent that is acting on behalf of a user. |
| ipProtocol | string   | The internet protocol used in the traffic that generated the log event. This should be the IP protocol keyword or the protocol number, such as ICMP or 1, TCP or 6, UDP or 1. |
| logonType | string   | The type of authentication or logon that occurred. |
| mfa | boolean | True or false showing whether or not an authentication event was performed with multi-factor authentication. |
| moduleType | string   | The type of files loaded by a process to extend functionally such as DLLs. |
| normalizedAction | string | Complementary to the Action field, this field describes the initiation of an activity in a common way across records. normalizedAction is meant to describe the attempt of an action, using the success boolean as a modifier indicating whether or not the action was successful. Further, normalizedAction should be paired with normalizedResource to indicate where or upon what the initiated action was attempted against. |
| normalizedCause | string | Complementary to Cause, this field describes the reason for any particular outcome in a record in a common way. |
| normalizedResource | string |Complementary to Resource, this field describes the resource being acted upon or otherwise referenced within a record in a common way across records. Intended to be used to provide further normalized context to a record, particularly in tandem with normalizedAction. |
| normalizedSeverity | int      | A normalized severity score, on a 1-5 scale with 1 being Informational and 5 being Critical. |
| packetsIn | long     | The count of packets received in a network connection. |
| packetsOut | long     | The count of packets sent in a network connection. |
| parentBaseImage | string   | The base image name of a parent process (ie notepad.exe) |
| parentCommandLine | string   | The command line of a parent process |
| parentPid | int      | The process id of the program that initiated a process. |
| pid | int      | The process id of the process itself. |
| processUid | string   | A unique process identifier provided by the source record. |
| resource | string   | A generic place holder for the resource being accessed within a log. |
| resourceType | string | Generalized field to help describe the nature of a resource. Used when a resource exists for which there is no more specific field specified for that type of resource. (e.g. a file is a type of resource, file_basename exists to capture the name of the file and describes the type). |
| sessionId | string | An ephemeral and at least semi-unique identifier of a connection between two systems. E.g. HTTP session, user logon session, TCP session identifiers. |
| severity | string   | The source specific severity level with no normalization. |
| sourceUid | string   | A UID that is defined by the record itself. Each record is assigned a UID during mapping, but this is the unique identifier field that may exist within an originating record. |
| srcDevice_container_id | string | The unique identifier provided to a discrete container which packages together the elements required to run software. |
| srcDevice_container_name | string | The name provided to a discrete container which packages together the elements required to run software. |
| srcDevice_container_runtime | string | The provider name of the engine whine underpins the container. E.g. Docker, AWS Lambda, containerd. |
| srcDevice_hostname | string   | Fully Qualified Domain Name that uniquely and absolutely names a computer. If name normalization occurs this will be the normalized name. |
| srcDevice_image | string | The snapshot of the state of a device or similar which can be used to deploy or reproduce a system for which traffic is originating. E.g. A VM image, a container image. |
| srcDevice_ip | string   | The native assigned IP address of the device. |
| srcDevice_k8s_deployment  | string | The deployment name described in the log. |
| srcDevice_k8s_namespace | string | The namespace name within which resources are running as described in the log. |
| srcDevice_k8s_pod | string | The name given to a pod described in the log. |
| srcDevice_k8s_replicaSet | string | The replica set name described in the log. |
| srcDevice_mac | string   | The hardware identification number that uniquely identifies the device on a network |
| srcDevice_natIp | string   | The external IP in cases where the internal IP goes through network address translation. |
| srcDevice_osName | string   | Operating system controlling on this device. |
| srcDevice_type | string | The instance, compute, or machine type which network traffic originated from. Typically used in cloud environments to describe computing specifications. |
| srcDevice_uniqueId | string   | The source specific identifier for device (if available). This is frequently an instance id in cloud environments. |
| srcPort | int      | The port used to initiate a network connection. |
| success | boolean  | Boolean value to show whether or not an action was successful. |
| targetUser_authDomain | string | The authentication domain of a user which is subject to or is otherwise impacted by activity undertaken by another user. Such as the Active Directory domain to which a new user account being created belongs. | 
| targetUser_email | string | E-Mail address associated with the user which is subject to activity undertaken by another account. Such as an E-Mail address which was created for a new user account. | 
| targetUser_role | string | A privileged persona assumed by a user which is subject to activity undertaken by another user. Such as in CloudTrail logs as well as similar cases where a user is recorded taking on a different role for specific privileged activity. | 
| targetUser_userId | string | The semi-unique identifier associated with a user account which is subject to activity undertaken by another user account. | 
| targetUser_username | string | The name commonly used to identify the user. May include the domain. If name normalization occurs, this will be the normalized name. | 
| tcpProtocol | string   | Application layer protocol used to establish the connection. |
| threat_category  | string | The type of threat determined by a service based on the signature or threat name. | 
| threat_identifier | string   | The identifier or indicator specific to a threat. Generally speaking this should be populated with an indicator value. |
| threat_name | string   | Name of the threat. |
| threat_referenceUrl | string   | A external URL that can provide more information about the threat. This should NOT be the URL that represents an observed HTTP request. |
| threat_ruleType | string | This field should be used with logs that indicate detection of a security event has already occurred. These logs are produced by a security product's own detection capabilities like signatures or rule sets. | 
| threat_signalName | string | This field is used in conjunction with normalized rules designed to directly pass through security alerts from other security products, appliances, and services. Those rules will use the text populated in this field as an element of the signal name, allowing different signal names for different products while retaining the normalized rule logic. | 
| threat_signalSummary | string | This field is used in conjunction with normalized rules. Those rules will use the text populated in this field as an element of the signal summary, allowing different signal summaries for different products while retaining the normalized rule logic. | 
| timestamp | long     | The timestamp of the event in milliseconds since epoch. |
| user_authDomain | string   | The domain associated with this particular user. (e.g. sumologic.com, sumologic.local) |
| user_email | string   | The associated email address assigned to this user. |
| user_role  | string | A privileged persona which is assumed by an acting user. Such as in CloudTrail logs as well as similar cases where a user is recorded taking on a different role for specific privileged activity. | 
| user_userId | string   | The source unique identifier for the user account. |
| user_username | string   | The name commonly used to identify the user. Does not include domain. If name normalization occurs, this will be the normalized name. |
| vuln_bugtraq | string   | BugTraq is a full disclosure moderated mailing list for the *detailed* discussion and announcement of computer security vulnerabilities. |
| vuln_cert | string   | CERT Coordination Center (CERT/CC) prioritizes coordination efforts on vulnerabilities. |
| vuln_cve | string   | Common Vulnerabilities and Exposures identifier for the vulnerability. |
| vuln_cvss | string   | CVSS attempts to assign severity scores to vulnerabilities, allowing responders to prioritize responses and resources according to threat. |
| vuln_name | string   | Name of the vulnerability. |
| vuln_reference | string   | Location to find more information on the vulnerability. |
