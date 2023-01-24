---
id: attributes-map-to-records
title: Attributes You Can Map to Records
sidebar_label: Mappable Attributes
description: Learn what CSE schema attributes you can map to Records.
---


This topic lists the schema attributes that you can map to Records. Note that you can map any of the attributes defined below to any [record type](cse-record-types.md). For information about all schema attributes, including those that cannot be mapped to Records, for example enrichment fields, see [Schema Attributes](schema-attributes.md).  

| Field | Type | Description |
|:--|:--|:--|
| accountId | string   | Account identifiers used in logs from environments where multiple accounts can be used. This is common for cloud providers like AWS.                                                                                                                                                    |
| action | string   | Indicates the action taken by the monitored product (the log producer) when something harmful occurred. For example, when a firewall log indicated a bad network packet, the firewall blocked the connection.                                                                           |
| application | string   | The name of the software that is the subject of this message.   Of interest to those who write mappers: Sometimes this software is the source of the message. In other cases a single source may produce messages related to many different applications and must name them explicitly. |
| baseImage | string   | The base image of a process (ie notepad.exe) |
| bytesIn | long     | Amount of the data received in bytes. |
| bytesOut | long     | Amount of the data sent in bytes. |
| cause | string | Describes the reason for an outcome in a record in a common way. |
| changeTarget | string   | The user account that was affected by a change. |
| changeType | string   | Category of change the user made. |
| commandLine | string   | The command run by the user using a shell. |
| description | string   | The description of the log event. |
| device_hostname | string   | Fully Qualified Domain Name that uniquely and absolutely names a computer. If name normalization occurs this will be the normalized name. |
| device_ip | string   | The native assigned IP address of the device. |
| device_mac | string   | The hardware identification number that uniquely identifies the device on a network |
| device_natIp | string   | The external IP in cases where the internal IP goes through network address translation. |
| device_osName | string   | Operating system controlling on this device. |
| device_uniqueId | string   | The source specific identifier for device (if available). This is frequently an instance id in cloud environments. |
| dns_query | string   | The entire request made from the client machine to the DNS server. |
| dns_queryDomain | string   | This should be conditionally populated if the DNS request contains a domain. |
| dns_queryType | string   | The type of query that was made by the client machine. |
| dns_reply | string   | The DNS reply which can be a single record or multiple records concatenated into a string. |
| dns_replyDomain | string   | This should be conditionally populated if the DNS reply is a domain. |
| dns_replyIp | string   | This should be conditionally populated if the DNS reply is an IP address. |
| dns_returnCode | string   | Code indicating the outcome of a DNS request. |
| dstDevice_hostname | string   | Fully Qualified Domain Name that uniquely and absolutely names a computer. If name normalization occurs this will be the normalized name. |
| dstDevice_ip | string   | The native assigned IP address of the device. |
| dstDevice_mac | string   | The hardware identification number that uniquely identifies the device on a network |
| dstDevice_natIp | string   | The external IP in cases where the internal IP goes through network address translation. |
| dstDevice_osName | string   | Operating system controlling on this device. |
| dstDevice_uniqueId | string   | The source specific identifier for device (if available). This is frequently an instance id in cloud environments. |
| dstPort | int      | The destination port for the network transaction. |
| email_messageId | string   | Unique identifier of the email. |
| email_sender | string   | Email of the user that sent the email. |
| email_subject | string   | Subject of the email. |
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
| fromUser_authDomain | string   | The domain associated with this particular user. (e.g. sumologic.com, sumologic.local) |
| fromUser_email | string   | The associated email address assigned to this user. |
| fromUser_userId | string   | The source unique identifier for the user account. |
| fromUser_username | string   | The name commonly used to identify the user. Does not include domain. If name normalization occurs, this will be the normalized name. |
| http_contentLength | int      | The number of bytes of data in the body of the response. |
| http_hostname | string   | Hostname from the client request |
| http_method | string   | Type of request being made. (e.g. GET or POST) |
| http_referer | string   | Identifies the address of the webpage (i.e. the URI or IRI) which is linked to the resource being requested. |
| http_response_contentLength | int      | The number of bytes of data in the body of the response |
| http_response_contentType   | string   | The format of the data in the HTTP response. |
| http_response_statusCode    | int      | The HTTP response code for a request. |
| http_response_statusText    | string   | Contains the status message corresponding to the status code. |
| http_url | string   | URL that the request is being made to. |
| http_userAgent | string   | Software agent that is acting on behalf of a user. |
| ipProtocol | string   | The internet protocol used in the traffic that generated the log event. This should be the IP protocol keyword or the protocol number, such as ICMP or 1, TCP or 6, UDP or 1. |
| logonType | string   | The type of authentication or logon that occurred. |
| moduleType | string   | The type of files loaded by a process to extend functionally such as DLLs. |
| normalizedSeverity | int      | A normalized severity score, on a 1-5 scale with 1 being Informational and 5 being Critical. |
| packetsIn | long     | The count of packets received in a network connection. |
| packetsOut | long     | The count of packets sent in a network connection. |
| parentBaseImage | string   | The base image name of a parent process (ie notepad.exe) |
| parentCommandLine | string   | The command line of a parent process |
| parentPid | int      | The process id of the program that initiated a process. |
| pid | int      | The process id of the process itself. |
| processUid | string   | A unique process identifier provided by the source record. |
| resource | string   | A generic place holder for the resource being accessed within a log. |
| severity | string   | The source specific severity level with no normalization. |
| sourceUid | string   | A UID that is defined by the record itself. Each record is assigned a UID during mapping, but this is the unique identifier field that may exist within an originating record. |
| srcDevice_hostname | string   | Fully Qualified Domain Name that uniquely and absolutely names a computer. If name normalization occurs this will be the normalized name. |
| srcDevice_ip | string   | The native assigned IP address of the device. |
| srcDevice_mac | string   | The hardware identification number that uniquely identifies the device on a network |
| srcDevice_natIp | string   | The external IP in cases where the internal IP goes through network address translation. |
| srcDevice_osName | string   | Operating system controlling on this device. |
| srcDevice_uniqueId | string   | The source specific identifier for device (if available). This is frequently an instance id in cloud environments. |
| srcPort | int      | The port used to initiate a network connection. |
| success | boolean  | Boolean value to show whether or not an action was successful. |
| tcpProtocol | string   | Application layer protocol used to establish the connection. |
| threat_identifier | string   | The identifier or indicator specific to a threat. Generally speaking this should be populated with an indicator value. |
| threat_name | string   | Name of the threat. |
| threat_referenceUrl | string   | A external URL that can provide more information about the threat. This should NOT be the URL that represents an observed HTTP request. |
| timestamp | long     | The timestamp of the event in milliseconds since epoch. |
| user_authDomain | string   | The domain associated with this particular user. (e.g. sumologic.com, sumologic.local) |
| user_email | string   | The associated email address assigned to this user. |
| user_userId | string   | The source unique identifier for the user account. |
| user_username | string   | The name commonly used to identify the user. Does not include domain. If name normalization occurs, this will be the normalized name. |
| vuln_bugtraq | string   | BugTraq is a full disclosure moderated mailing list for the *detailed* discussion and announcement of computer security vulnerabilities. |
| vuln_cert | string   | CERT Coordination Center (CERT/CC) prioritizes coordination efforts on vulnerabilities. |
| vuln_cve | string   | Common Vulnerabilities and Exposures identifier for the vulnerability. |
| vuln_cvss | string   | CVSS attempts to assign severity scores to vulnerabilities, allowing responders to prioritize responses and resources according to threat. |
| vuln_name | string   | Name of the vulnerability. |
| vuln_reference | string   | Location to find more information on the vulnerability. |
