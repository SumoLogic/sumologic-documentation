---
id: schema-attributes
title: Schema Attributes
sidebar_label: Schema Attributes
description: Learn about CSE schema attributes, how values are set, and schema models they support.
---

This topic defines the attributes in CSE Schema v3. 

|Field|Type|Description |
| :-- | :-- | :-- |
|accountId|string|A unique identifier tied to an organizational account, such as a tenant. Common with cloud services where sub-accounts or multiple tenants can be present. Not to be used as a user account identifier.|
|action|string|Action summarizes an operation undertaken by a device or user and recorded in a log.|
|application|string|A service or software application referenced in a log indicating its execution, presence, or as context for a given event.|
|authProvider|string|The SSO provider for an authentication attempt. Often found in cloud authentication events and is expected to be NULL if SSO was not used for the authentication attempt.|
|baseImage|string|The name of an executable process. Often found in process auditing and malware detection events.|
|bro_dceRpc_endpoint|string|Endpoint name looked up from the uuid.|
|bro_dceRpc_namedPipe|string|Remote pipe name.|
|bro_dceRpc_operation|string|Operation seen in the DCE-RPC call.|
|bro_dceRpc_rtt|float|Round trip time from the request to the response. If either the request or response wasn't seen, this will be null.|
|bro_dhcp_assignedIp|string|IP address assigned by the dhcp server.|
|bro_dhcp_assignedIp_asnNumber|int|An autonomous system number for the IP address based on the Neustar GeoIP database.|
|bro_dhcp_assignedIp_asnOrg|string|Organization associated with the IP address address based on the Neustar GeoIP database.|
|bro_dhcp_assignedIp_city|string|City for the IP address based on the Neustar GeoIP database.|
|bro_dhcp_assignedIp_countryCode|string|Country Code for the IP address based on the Neustar GeoIP database.|
|bro_dhcp_assignedIp_countryName|string|Country Code for the IP address based on the Neustar GeoIP database.|
|bro_dhcp_assignedIp_ipv4IntValue|long|The ipv4 address stored as an unsigned 64-bit integer value|
|bro_dhcp_assignedIp_isInternal|boolean|Signifies whether the IP address is internal or external. True if internal, False if external.|
|bro_dhcp_assignedIp_isp|string|Internet Service Provider for the IP address based on the Neustar GeoIP database.|
|bro_dhcp_assignedIp_latitude|float|Latitude for the IP address based on the Neustar GeoIP database.|
|bro_dhcp_assignedIp_location|string|This value is populated based on the Network Blocks you have uploaded. When there is a match, it will be populated with the network block label.|
|bro_dhcp_assignedIp_longitude|float|Longitude for the IP address based on the Neustar GeoIP database.|
|bro_dhcp_assignedIp_region|string|State or Territory for the IP address based on the Neustar GeoIP database.|
|bro_dhcp_assignedIp_version|int|The version of IP protocol (e.g. 4 or 6)|
|bro_dhcp_leaseTime|double|IP address lease interval.|
|bro_dhcp_mac|string|Client's hardware address.|
|bro_dns_answers|array[BroDnsAnswer]|The set of resource descriptions in the DNS query answer.|
|bro_dns_qclass|string|The QCLASS value specifying the class of the DNS query.|
|bro_file_bytes|map[string]string|Total number of bytes that are supposed to comprise the full file.|
|bro_file_connUids|array[string]|Connection UIDs over which the file was transferred.|
|bro_file_depth|int|A value to represent the depth of this file in relation to its source. In SMTP, it is the depth of the MIME attachment on the message. In HTTP, it is the depth of the request within the TCP connection.|
|bro_file_isOrigin|boolean|If the source of this file is a network connection, this field indicates if the file is being sent by the originator of the connection or the responder.|
|bro_file_localOrigin|boolean|If the source of this file is a network connection, this field indicates if the data originated from the local network or not.|
|bro_file_parentFuid|string|Identifier associated with a container file from which this one was extracted as part of the file analysis.|
|bro_file_source|string|An identification of the source of the file data. I.e. it may be a network protocol over which it was transferred, or a local file path which was read, or some other input source.|
|bro_flow_duration|float|This field does not have a defined description yet.|
|bro_flow_history|string|This field does not have a defined description yet.|
|bro_flow_inIpBytes|long|This field does not have a defined description yet.|
|bro_flow_origL2Addr|string|This field does not have a defined description yet.|
|bro_flow_outIpBytes|long|This field does not have a defined description yet.|
|bro_flow_respL2Addr|string|This field does not have a defined description yet.|
|bro_flow_service|array[string]|This field does not have a defined description yet.|
|bro_ftp_arg|string|Argument for the command if one is given.|
|bro_ftp_cmdarg|BroFtpCmdarg|This field does not have a defined description yet.|
|bro_ftp_command|string|Command given by the client.|
|bro_ftp_cwd|string|Current working directory that this session is in.|
|bro_ftp_dataChannel|BroFtpDataChannel|Expected FTP data channel.|
|bro_ftp_fileSize|string|Size of the file if the command indicates a file transfer.|
|bro_ftp_fuid|string|File unique ID.|
|bro_ftp_lastAuthRequested|string|This field does not have a defined description yet.|
|bro_ftp_mimeType|string|Sniffed mime type of file.|
|bro_ftp_passive|boolean|Indicates if the session is in active or passive mode.|
|bro_ftp_password|string|Password for the current FTP session if captured.|
|bro_ftp_pendingCommands|array[BroFtpCmdarg]|This field does not have a defined description yet.|
|bro_ftp_replyCode|int|Reply code from the FTP server in response to the command.|
|bro_ftp_replyMsg|string|Reply message from the FTP server in response to the command.|
|bro_http_cookieVars|array[string]|This field does not have a defined description yet.|
|bro_http_origFuids|array[string]|This field does not have a defined description yet.|
|bro_http_origMimeTypes|array[string]|This field does not have a defined description yet.|
|bro_http_request_contentLength|int|This field does not have a defined description yet.|
|bro_http_request_headers|map[string]string|A list of HTTP headers typically used to indicate proxied requests.|
|bro_http_request_password|string|This field does not have a defined description yet.|
|bro_http_request_proxied|array[string]|All of the headers that may indicate if the request was proxied.|
|bro_http_response_headers|map[string]string|This field does not have a defined description yet.|
|bro_http_response_infoCode|int|This field does not have a defined description yet.|
|bro_http_response_infoMsg|string|This field does not have a defined description yet.|
|bro_http_response_respFuids|array[string]|An ordered vector of file unique IDs.|
|bro_http_response_respMimeTypes|array[string]|An ordered vector of mime types.|
|bro_http_tags|array[string]|This field does not have a defined description yet.|
|bro_http_transDepth|int|Represents the pipelined depth into the connection of this request/response transaction.|
|bro_http_uriVars|array[string]|This field does not have a defined description yet.|
|bro_irc_additionalData|string|Any additional data for the IRC command.|
|bro_irc_command|string|Command given by the IRC client.|
|bro_irc_nick|string|Nickname given for the IRC connection.|
|bro_irc_value|string|Value for the IRC command given by the client.|
|bro_kerberos_cipher|string|Ticket encryption type|
|bro_kerberos_client|string|This field does not have a defined description yet.|
|bro_kerberos_clientCert|map[string]string|This field does not have a defined description yet.|
|bro_kerberos_errorCode|int|This field does not have a defined description yet.|
|bro_kerberos_errorMsg|string|This field does not have a defined description yet.|
|bro_kerberos_forwardable|boolean|Forwardable ticket requested|
|bro_kerberos_from|float|Timestamp ticket valid from|
|bro_kerberos_renewable|boolean|Renewable ticket requested|
|bro_kerberos_requestType|string|Request type - Authentication Service ("AS") or Ticket Granting Service ("TGS")|
|bro_kerberos_serverCert|map[string]string|This field does not have a defined description yet.|
|bro_kerberos_service|string|This field does not have a defined description yet.|
|bro_kerberos_success|boolean|This field does not have a defined description yet.|
|bro_kerberos_til|float|Timestamp ticket valid to|
|bro_ntlm_domainname|string|Domain name given by the NTLM client.|
|bro_ntlm_status|string|This field does not have a defined description yet.|
|bro_ntlm_success|boolean|Indicates whether or not the NTLM authentication was successful.|
|bro_protocol|string|Network protocol of the traffic analyzed.|
|bro_radius_connectInfo|string|RADIUS connect information, if present.|
|bro_radius_mac|string|RADIUS client MAC address, if present.|
|bro_radius_remoteIp|string|RADIUS client IP address.|
|bro_radius_remoteIp_asnNumber|int|An autonomous system number for the IP address based on the Neustar GeoIP database.|
|bro_radius_remoteIp_asnOrg|string|Organization associated with the IP address address based on the Neustar GeoIP database.|
|bro_radius_remoteIp_city|string|City for the IP address based on the Neustar GeoIP database.|
|bro_radius_remoteIp_countryCode|string|Country Code for the IP address based on the Neustar GeoIP database.|
|bro_radius_remoteIp_countryName|string|Country Code for the IP address based on the Neustar GeoIP database.|
|bro_radius_remoteIp_ipv4IntValue|long|The ipv4 address stored as an unsigned 64-bit integer value|
|bro_radius_remoteIp_isInternal|boolean|Signifies whether the IP address is internal or external. True if internal, False if external.|
|bro_radius_remoteIp_isp|string|Internet Service Provider for the IP address based on the Neustar GeoIP database.|
|bro_radius_remoteIp_latitude|float|Latitude for the IP address based on the Neustar GeoIP database.|
|bro_radius_remoteIp_location|string|This value is populated based on the Network Blocks you have uploaded. When there is a match, it will be populated with the network block label.|
|bro_radius_remoteIp_longitude|float|Longitude for the IP address based on the Neustar GeoIP database.|
|bro_radius_remoteIp_region|string|State or Territory for the IP address based on the Neustar GeoIP database.|
|bro_radius_remoteIp_version|int|The version of IP protocol (e.g. 4 or 6)|
|bro_radius_result|string|Successful or failed RADIUS authentication.|
|bro_rdp_certCount|int|The number of certs seen. X.509 can transfer an entire certificate chain.|
|bro_rdp_certPermanent|boolean|Indicates if the provided certificate or certificate chain is permanent or temporary.|
|bro_rdp_certType|string|If the connection is being encrypted with native RDP encryption, this is the type of cert being used.|
|bro_rdp_clientBuild|string|RDP client version used by the client machine.|
|bro_rdp_clientDigProductId|string|Product ID of the RDP client machine.|
|bro_rdp_clientName|string|Name of the RDP client machine.|
|bro_rdp_cookie|string|Cookie value used by the RDP client machine. This is typically a username.|
|bro_rdp_desktopHeight|string|This field does not have a defined description yet.|
|bro_rdp_desktopWidth|string|Desktop width of the RDP client machine.|
|bro_rdp_done|boolean|Track status of logging RDP connections.|
|bro_rdp_encryptionLevel|string|Encryption level of the RDP connection.|
|bro_rdp_encryptionMethod|string|Encryption method of the RDP connection.|
|bro_rdp_keyboardLayout|string|Keyboard layout (language) of the RDP client machine.|
|bro_rdp_requestedColorDepth|string|Desktop height of the RDP client machine.|
|bro_rdp_result|string|Status result for the connection. It's a mix between RDP negotiation failure messages and GCC server create response messages.|
|bro_rdp_securityProtocol|string|Security protocol chosen by the RDP server.|
|bro_rdp_ssl|boolean|Flag the RDP connection if it was seen over SSL.|
|bro_rfb_authenticationMethod|string|Identifier of RFB authentication method used.|
|bro_rfb_authenticationSuccessful|boolean|Whether or not RFB authentication was successful.|
|bro_rfb_clientMajorVersion|string|Major version of the RFB client.|
|bro_rfb_clientMinorVersion|string|Minor version of the RFB client.|
|bro_rfb_desktopName|string|Name of the screen that is being shared.|
|bro_rfb_height|int|Height of the screen that is being shared.|
|bro_rfb_serverMajorVersion|string|Major version of the RFB server.|
|bro_rfb_serverMinorVersion|string|Minor version of the RFB server.|
|bro_rfb_sharedSession|boolean|Whether the RFB client has an exclusive or a shared session.|
|bro_rfb_width|int|Width of the screen that is being shared.|
|bro_sip_headers|map[string]string|This field does not have a defined description yet.|
|bro_sip_requestBodyLength|int|This field does not have a defined description yet.|
|bro_sip_requestFrom|string|Contents of the response From: header (Note: The tag= value that's usually appended to the sender is stripped off and not logged)|
|bro_sip_requestMethod|string|Verb used in the SIP request (INVITE, REGISTER etc.).|
|bro_sip_requestPath|array[string]|The client message transmission path, as extracted from the headers.|
|bro_sip_requestTo|string|This field does not have a defined description yet.|
|bro_sip_requestUri|string|URI used in the request.|
|bro_sip_responseBodyLength|int|This field does not have a defined description yet.|
|bro_sip_responseFrom|string|Contents of the response From: header (Note: The tag= value that's usually appended to the sender is stripped off and not logged)|
|bro_sip_responsePath|array[string]|The server message transmission path, as extracted from the headers.|
|bro_sip_responseTo|string|This field does not have a defined description yet.|
|bro_sip_statusCode|int|This field does not have a defined description yet.|
|bro_sip_statusMsg|string|Verb used in the SIP request (INVITE, REGISTER etc.).|
|bro_smb_command|BroSmbCommand|This field does not have a defined description yet.|
|bro_smb_file|BroSmbFile|This field does not have a defined description yet.|
|bro_smb_mapping|BroSmbMapping|This field does not have a defined description yet.|
|bro_smb_tree|BroSmbTree|This field does not have a defined description yet.|
|bro_smtp_headers|BroSmtpHeaders|This field does not have a defined description yet.|
|bro_smtp_isWebmail|boolean|Boolean indicator of if the SMTP message was sent through a webmail interface.|
|bro_smtp_lastReply|string|The last message that the SMTP server sent to the client.|
|bro_smtp_path|string|The SMTP message transmission path, as extracted from the headers.|
|bro_smtp_tls|boolean|Indicates that the SMTP connection has switched to using TLS.|
|bro_smtp_transDepth|int|A count to represent the depth of this SMTP message transaction in a single connection where multiple messages were transferred.|
|bro_smtp_userAgent|string|Value of the User-Agent header from the SMTP client.|
|bro_snmp_community|string|The community string of the first SNMP packet associated with the session. This is used as part of SNMP's (v1 and v2c) administrative/security framework. See RFC 1157 or RFC 1901.|
|bro_snmp_displayString|string|A system description of the SNMP responder endpoint.|
|bro_snmp_duration|double|The amount of time between the first packet beloning to the SNMP session and the latest one seen.|
|bro_snmp_getBulkRequests|int|The number of variable bindings in GetBulkRequest PDUs seen for the session.|
|bro_snmp_getRequests|int|The number of variable bindings in GetRequest/GetNextRequest PDUs seen for the session.|
|bro_snmp_getResponses|int|The number of variable bindings in GetResponse/Response PDUs seen for the session.|
|bro_snmp_setRequests|int|The number of variable bindings in SetRequest PDUs seen for the session.|
|bro_snmp_upSince|long|The time at which the SNMP responder endpoint claims it's been up since.|
|bro_snmp_version|string|The version of SNMP being used.|
|bro_socks_boundIp|string|Proxy server bound address.|
|bro_socks_boundIp_asnNumber|int|An autonomous system number for the IP address based on the Neustar GeoIP database.|
|bro_socks_boundIp_asnOrg|string|Organization associated with the IP address address based on the Neustar GeoIP database.|
|bro_socks_boundIp_city|string|City for the IP address based on the Neustar GeoIP database.|
|bro_socks_boundIp_countryCode|string|Country Code for the IP address based on the Neustar GeoIP database.|
|bro_socks_boundIp_countryName|string|Country Code for the IP address based on the Neustar GeoIP database.|
|bro_socks_boundIp_ipv4IntValue|long|The ipv4 address stored as an unsigned 64-bit integer value|
|bro_socks_boundIp_isInternal|boolean|Signifies whether the IP address is internal or external. True if internal, False if external.|
|bro_socks_boundIp_isp|string|Internet Service Provider for the IP address based on the Neustar GeoIP database.|
|bro_socks_boundIp_latitude|float|Latitude for the IP address based on the Neustar GeoIP database.|
|bro_socks_boundIp_location|string|This value is populated based on the Network Blocks you have uploaded. When there is a match, it will be populated with the network block label.|
|bro_socks_boundIp_longitude|float|Longitude for the IP address based on the Neustar GeoIP database.|
|bro_socks_boundIp_region|string|State or Territory for the IP address based on the Neustar GeoIP database.|
|bro_socks_boundIp_version|int|The version of IP protocol (e.g. 4 or 6)|
|bro_socks_boundName|string|Proxy server bound name.|
|bro_socks_boundPort|int|Proxy server bound port.|
|bro_socks_password|string|Password used to request a login to the proxy.|
|bro_socks_requestIp|string|Client requested address.|
|bro_socks_requestIp_asnNumber|int|An autonomous system number for the IP address based on the Neustar GeoIP database.|
|bro_socks_requestIp_asnOrg|string|Organization associated with the IP address address based on the Neustar GeoIP database.|
|bro_socks_requestIp_city|string|City for the IP address based on the Neustar GeoIP database.|
|bro_socks_requestIp_countryCode|string|Country Code for the IP address based on the Neustar GeoIP database.|
|bro_socks_requestIp_countryName|string|Country Code for the IP address based on the Neustar GeoIP database.|
|bro_socks_requestIp_ipv4IntValue|long|The ipv4 address stored as an unsigned 64-bit integer value|
|bro_socks_requestIp_isInternal|boolean|Signifies whether the IP address is internal or external. True if internal, False if external.|
|bro_socks_requestIp_isp|string|Internet Service Provider for the IP address based on the Neustar GeoIP database.|
|bro_socks_requestIp_latitude|float|Latitude for the IP address based on the Neustar GeoIP database.|
|bro_socks_requestIp_location|string|This value is populated based on the Network Blocks you have uploaded. When there is a match, it will be populated with the network block label.|
|bro_socks_requestIp_longitude|float|Longitude for the IP address based on the Neustar GeoIP database.|
|bro_socks_requestIp_region|string|State or Territory for the IP address based on the Neustar GeoIP database.|
|bro_socks_requestIp_version|int|The version of IP protocol (e.g. 4 or 6)|
|bro_socks_requestName|string|Client requested name.|
|bro_socks_requestPort|int|Client requested port.|
|bro_socks_status|string|Server status for the attempt at using the proxy.|
|bro_socks_version|int|This field does not have a defined description yet.|
|bro_ssh_authSuccess|boolean|SSH authentication result (T=success, F=failure, unset=unknown)|
|bro_ssh_cipherAlgorithm|string|The SSH encryption algorithm in use|
|bro_ssh_client|string|The SSH client's version string|
|bro_ssh_compressionAlgorithm|string|The SSH compression algorithm in use|
|bro_ssh_hostKeyAlgorithm|string|The SSH server host key's algorithm|
|bro_ssh_keyExchangeAlgorithm|string|The SSH key exchange algorithm in use|
|bro_ssh_macAlgorithm|string|The SSH signing (MAC) algorithm in use|
|bro_ssh_server|string|The SSH server's version string|
|bro_ssh_version|int|SSH major version (1 or 2)|
|bro_ssl_certChainFuids|array[string]|An ordered vector of all certificate file unique IDs for the certificates offered by the SSL/TLS server.|
|bro_ssl_cipher|string|SSL/TLS cipher suite that the server chose.|
|bro_ssl_clientCertChainFuids|array[string]|An ordered vector of all certificate file unique IDs for the certificates offered by the SSL/TLS client.|
|bro_ssl_curve|string|Elliptic curve the SSL/TLS server chose when using ECDH/ECDHE.|
|bro_ssl_established|boolean|Flag to indicate if this SSL/TLS session has been established successfully, or if it was aborted during the handshake.|
|bro_ssl_issuer|string|Subject of the signer of the X.509 certificate offered by the SSL/TLS server.|
|bro_ssl_nextProtocol|string|Next protocol the SSL/TLS server chose using the application layer next protocol extension, if present.|
|bro_ssl_resumed|boolean|Flag to indicate if the SSL/TLS session was resumed reusing the key material exchanged in an earlier connection.|
|bro_ssl_serverName|string|Value of the Server Name Indicator SSL/TLS extension. It indicates the server name that the client was requesting.|
|bro_ssl_serverName_alexaRank|long|Domain ranking in the alexa top 10k sites. NULL if not in the list.|
|bro_ssl_serverName_conditionalFrequency|double|(Deprecated) DO NOT INCLUDE IN THE DOCUMENTATION|
|bro_ssl_serverName_entropyFqdn|double|The entropy calculation of the fqdn field.|
|bro_ssl_serverName_entropyRootDomain|double|The entropy calculation of the rootDomain field.|
|bro_ssl_serverName_entropySubDomain|double|Entropy is the measure of disorder. If this case on the sub domain.|
|bro_ssl_serverName_fqdn|string|The fully qualified domain name (e.g. somehost.sumologic.com).|
|bro_ssl_serverName_possibleDga|boolean|Whether or not this domain is potentially a Domain Generation Algorithm created domain based on our backend analytics.|
|bro_ssl_serverName_possibleDynDns|boolean|A likely dynamically (not static) IP address associated with this domain.|
|bro_ssl_serverName_rootDomain|string|The root domain of hostname in the domain (e.g. sumologic.com).|
|bro_ssl_serverName_tld|string|The top-level-domain field of the domain name (e.g. com, net, org)|
|bro_ssl_subject|string|Subject of the X.509 certificate offered by the SSL/TLS server.|
|bro_ssl_version|string|SSL/TLS version that the server chose.|
|bytesIn|long|Amount of data received in bytes|
|bytesOut|long|Amount of data sent in bytes|
|cause|string|Complementary to Cause, this field describes the reason for any particular outcome in a record in a common way.|
|changeTarget|string|The user, group, policy or other resource which is to be or has been modified, deleted, or created.|
|changeType|string|The nature of the modification (modify, delete, create) and often the category of the object to be acted upon (user, group, policy, or other resource).|
|cloud_provider|string|The name of the cloud infrastucture operator, typically a public cloud provider. E.g. Google Cloud Platform (GCP), Amazon Web Services (AWS), Microsoft Azure, Alibaba Cloud etc.|
|cloud_region|string|The physical location a cloud provider operates their infrastucture from. E.g. AWS us-east-2 (Ohio), Azure Central US (Iowa), GCP asia-northeast1-a (Tokyo) etc.|
|cloud_service|string|The specific service offering from a cloud provider. E.g. AWS VPC Flow, Azure Virtual Machines, AWS Lambda, Alibaba Cloud ECS, GCP Compute Engine etc.|
|cloud_zone|string|The cloud infrastucture isolated within a region on which a resource is located or is running.|
|commandLine|string|The instruction or set of instructions inputted into a text interface such as the command prompt (cmd.exe) or PowerShell in Windows, or terminal on Unix based systems.|
|cseSignal|map[string]string|Used for signals received via log path e.g. scheduled search alert from CIP.|
|day|int|Day pulled from the timestamp.|
|description|string|The summary conveying the high level meaning of a log message in a human readable form. In some circumstances no summary is provided in the log, this field is often manually defined in the mapping as a constant or as a lookup based on event IDs in the log message.|
|device_container_id|string|The unique identifier provided to a discreet container which packages together the elements required to run software.|
|device_container_name|string|The name provided to a discreet container which packages together the elements required to run software.|
|device_container_runtime|string|description: The provider name of the engine whine underpins the container. E.g. Docker, AWS Lambda, containerd|
|device_hostname|string|The computer name that generated the log message. Common examples include, but are not limited to, the endpoint reporting an infection or the network appliance reporting allowed or blocked network traffic. 
In cases where the log data has a source or destination context, there are situations where identical data is populated in one of those fields and this field. An example would be authentication logs from a firewall. The device_hostname would be the same as the dstDevice_hostname because the firewall is reporting a network authentication log about itself.|
|device_hostname_raw|string|The device hostname before any enrichments are applied. As the hostname appears in the original log message.|
|device_image|string|The snapshot of the state of a device or similar which can be used to deploy or reproduce a system. E.g. A VM image, a container image. |
|device_ip|string|The internet protocol (IP) address of a computer that generated the log message. Common examples include, but are not limited to, the endpoint reporting an infection or the network appliance reporting allowed or blocked network traffic. 
In cases where the log data has a source or destination context, there are situations where identical data is populated in one of those fields and this field. An example would be authentication logs from a firewall. The device_ip would be the same as the dstDevice_ip because the firewall is reporting a network authentication log about itself.|
|device_ip_asnNumber|int|The autonomous system number for the device IP address based on the Neustar GeoIP database, typically assigned to internet service providers.|
|device_ip_asnOrg|string|The organzation associated with the ASN based on the Neustar GeoIP database, typically assigned to internet service providers.|
|device_ip_city|string|City for the device IP address based on the Neustar GeoIP database.|
|device_ip_countryCode|string|Country code (e.g. US, CA, DE) for the device IP address based on the Neustar GeoIP database.|
|device_ip_countryName|string|Name of the country for the device IP address based on the Neustar GeoIP database.|
|device_ip_ipv4IntValue|long|The ipv4 address stored as an unsigned 64-bit integer value|
|device_ip_isInternal|boolean|Signifies whether the device IP address is internal or external. True if internal, False if external.|
|device_ip_isp|string|Internet Service Provider for the IP address based on the Neustar GeoIP database.|
|device_ip_latitude|float|Geographic latitude coordinate for the device IP address based on the Neustar GeoIP database.|
|device_ip_location|string|This value is populated based on uploaded Network Blocks. When there is a match, it will be populated with the network block label.|
|device_ip_longitude|float|Longitude coordinate for the device IP address based on the Neustar GeoIP database.|
|device_ip_region|string|State or Territory for the device IP address based on the Neustar GeoIP database.|
|device_ip_version|int|Version of the IP protocol of the device IP.|
|device_mac|string|The media access control (MAC) ID of the device that generated the log message. Common examples include, but are not limited to, the endpoint reporting an infection or the network appliance reporting allowed or blocked network traffic. 
In cases where the log data has a source or destination context, there are situations where identical data is populated in one of those fields and this field. An example would be authentication logs from a firewall. The device_mac would be the same as the dstDevice_mac because the firewall is reporting a network authentication log about itself.|
|device_natIp|string|The external network address translated (NAT) IP address of the device that generated the log message. Common examples include, but are not limited to, the endpoint reporting an infection or the network appliance reporting allowed or blocked network traffic. 
In cases where the log data has a source or destination context, there are situations where identical data is populated in one of those fields and this field. An example would be authentication logs from a firewall. The device_natIp would be the same as the dstDevice_natIp because the firewall is reporting a network authentication log about itself.|
|device_natIp_asnNumber|int|The autonomous system number for the NAT device IP address based on the Neustar GeoIP database, typically assigned to internet service providers.|
|device_natIp_asnOrg|string|The organzation associated with the ASN based on the Neustar GeoIP database, typically assigned to internet service providers.|
|device_natIp_city|string|City for the NAT device IP address based on the Neustar GeoIP database.|
|device_natIp_countryCode|string|Country code (e.g. US, CA, DE) for the NAT device IP address based on the Neustar GeoIP database.|
|device_natIp_countryName|string|Name of the country for the NAT device IP address based on the Neustar GeoIP database.|
|device_natIp_ipv4IntValue|long|The ipv4 address stored as an unsigned 64-bit integer value|
|device_natIp_isInternal|boolean|Signifies whether the NAT device IP address is internal or external. True if internal, False if external.|
|device_natIp_isp|string|Internet Service Provider for the IP address based on the Neustar GeoIP database.|
|device_natIp_latitude|float|Geographic latitude coordinate for the NAT device IP address based on the Neustar GeoIP database.|
|device_natIp_location|string|This value is populated based on uploaded Network Blocks. When there is a match, it will be populated with the network block label.|
|device_natIp_longitude|float|Longitude coordinate for the NAT device IP address based on the Neustar GeoIP database.|
|device_natIp_region|string|State or Territory for the NAT device IP address based on the Neustar GeoIP database.|
|device_natIp_version|int|Version of the IP protocol of the NAT device IP.|
|device_osName|string|The operating system name present on the computer that generated the log message. Common examples include, but are not limited to, the endpoint reporting an infection or the network appliance reporting allowed or blocked network traffic. 
In cases where the log data has a source or destination context, there are situations where identical data is populated in one of those fields and this field. An example would be authentication logs from a firewall. The device_osName would be the same as the dstDevice_osName because the firewall is reporting a network authentication log about itself.|
|device_type|string|The instance, compute, or machine type. Typically used in cloud environments to describe computing specifications.|
|device_uniqueId|string|The vendor or product specific identifier for a computer that generated the log message. Common examples include, but are not limited to, the endpoint reporting an infection or the network appliance reporting allowed or blocked network traffic. This field is also frequently used by cloud providers to identify instances.
In cases where the log data has a source or destination context, there are situations where identical data is populated in one of those fields and this field. An example would be authentication logs from a firewall. The device_mac would be the same as the dstDevice_mac because the firewall is reporting a network authentication log about itself.|
|dns_query|string|The entire DNS request made from the client machine to the DNS server.|
|dns_queryDomain|string|The fully qualified domain name being queried for in a DNS request if present|
|dns_queryDomain_alexaRank|long|Domain ranking in the alexa top 10k sites. NULL if not in the list.|
|dns_queryDomain_conditionalFrequency|double|(Deprecated) DO NOT INCLUDE IN THE DOCUMENTATION|
|dns_queryDomain_entropyFqdn|double|The entropy calculation of the fqdn field.|
|dns_queryDomain_entropyRootDomain|double|The entropy calculation of the rootDomain field.|
|dns_queryDomain_entropySubDomain|double|Entropy is the measure of disorder. If this case on the sub domain.|
|dns_queryDomain_fqdn|string|The fully qualified domain name (e.g. somehost.sumologic.com).|
|dns_queryDomain_possibleDga|boolean|Whether or not this domain is potentially a Domain Generation Algorithm created domain based on our backend analytics.|
|dns_queryDomain_possibleDynDns|boolean|A likely dynamically (not static) IP address associated with this domain.|
|dns_queryDomain_rootDomain|string|The root domain of hostname in the domain (e.g. sumologic.com).|
|dns_queryDomain_tld|string|The top-level-domain field of the domain name (e.g. com, net, org)|
|dns_queryType|string|The type of DNS record which is being queried for by the client|
|dns_reply|string|The DNS reply which can be a single record or multiple records concatenated into a string.|
|dns_replyDomain|string|The domain contained within the DNS if the reply contains a domain.|
|dns_replyDomain_alexaRank|long|Domain ranking in the alexa top 10k sites. NULL if not in the list.|
|dns_replyDomain_conditionalFrequency|double|(Deprecated) DO NOT INCLUDE IN THE DOCUMENTATION|
|dns_replyDomain_entropyFqdn|double|The entropy calculation of the fqdn field.|
|dns_replyDomain_entropyRootDomain|double|The entropy calculation of the rootDomain field.|
|dns_replyDomain_entropySubDomain|double|Entropy is the measure of disorder. If this case on the sub domain.|
|dns_replyDomain_fqdn|string|The fully qualified domain name (e.g. somehost.sumologic.com).|
|dns_replyDomain_possibleDga|boolean|Whether or not this domain is potentially a Domain Generation Algorithm created domain based on our backend analytics.|
|dns_replyDomain_possibleDynDns|boolean|A likely dynamically (not static) IP address associated with this domain.|
|dns_replyDomain_rootDomain|string|The root domain of hostname in the domain (e.g. sumologic.com).|
|dns_replyDomain_tld|string|The top-level-domain field of the domain name (e.g. com, net, org)|
|dns_replyIp|string|The IP address contained within the DNS if the reply contains an IP address.|
|dns_replyIp_asnNumber|int|The autonomous system number for the DNS Reply IP address based on the Neustar GeoIP database, typically assigned to internet service providers.|
|dns_replyIp_asnOrg|string|The organzation associated with the ASN based on the Neustar GeoIP database, typically assigned to internet service providers.|
|dns_replyIp_city|string|City for the DNS Reply IP address based on the Neustar GeoIP database.|
|dns_replyIp_countryCode|string|Country code (e.g. US, CA, DE) for the DNS Reply IP address based on the Neustar GeoIP database.|
|dns_replyIp_countryName|string|Name of the country for the DNS Reply IP address based on the Neustar GeoIP database.|
|dns_replyIp_ipv4IntValue|long|The ipv4 address stored as an unsigned 64-bit integer value|
|dns_replyIp_isInternal|boolean|Signifies whether the DNS Reply IP address is internal or external. True if internal, False if external.|
|dns_replyIp_isp|string|Internet Service Provider for the IP address based on the Neustar GeoIP database.|
|dns_replyIp_latitude|float|Geographic latitude coordinate for the DNS Reply IP address based on the Neustar GeoIP database.|
|dns_replyIp_location|string|This value is populated based on uploaded Network Blocks. When there is a match, it will be populated with the network block label.|
|dns_replyIp_longitude|float|Longitude coordinate for the DNS Reply IP address based on the Neustar GeoIP database.|
|dns_replyIp_region|string|State or Territory for the DNS Reply IP address based on the Neustar GeoIP database.|
|dns_replyIp_version|int|Version of the IP protocol of the DNS Reply IP.|
|dns_returnCode|string|-| The code or message indicating the outcome of a DNS request.|
|dstDevice_container_id|string|The unique identifier provided to a discreet container which packages together the elements required to run software.|
|dstDevice_container_name|string|The name provided to a discreet container which packages together the elements required to run software.|
|dstDevice_container_runtime|string|The provider name of the engine whine underpins the container. E.g. Docker, AWS Lambda, containerd|
|dstDevice_hostname|string|The name of the host for which network traffic is destined.|
|dstDevice_hostname_raw|string|The destination device hostname before any enrichments are applied. As the hostname appears in the original log message.|
|dstDevice_image|string|The snapshot of the state of a device or similar which can be used to deploy or reproduce a system for which traffic is destined. E.g. A VM image, a container image. |
|dstDevice_ip|string|The IP address of the host for which network traffic is destined.|
|dstDevice_ip_asnNumber|int|The autonomous system number for the destination device IP address based on the Neustar GeoIP database, typically assigned to internet service providers.|
|dstDevice_ip_asnOrg|string|The organzation associated with the ASN based on the Neustar GeoIP database, typically assigned to internet service providers.|
|dstDevice_ip_city|string|City for the destination device IP address based on the Neustar GeoIP database.|
|dstDevice_ip_countryCode|string|Country code (e.g. US, CA, DE) for the destination device IP address based on the Neustar GeoIP database.|
|dstDevice_ip_countryName|string|Name of the country for the destination device IP address based on the Neustar GeoIP database.|
|dstDevice_ip_ipv4IntValue|long|The ipv4 address stored as an unsigned 64-bit integer value|
|dstDevice_ip_isInternal|boolean|Signifies whether the destination device IP address is internal or external. True if internal, False if external.|
|dstDevice_ip_isp|string|Internet Service Provider for the IP address based on the Neustar GeoIP database.|
|dstDevice_ip_latitude|float|Geographic latitude coordinate for the destination device IP address based on the Neustar GeoIP database.|
|dstDevice_ip_location|string|This value is populated based on uploaded Network Blocks. When there is a match, it will be populated with the network block label.|
|dstDevice_ip_longitude|float|Longitude coordinate for the destination device IP address based on the Neustar GeoIP database.|
|dstDevice_ip_region|string|State or Territory for the destination device IP address based on the Neustar GeoIP database.|
|dstDevice_ip_version|int|Version of the IP protocol of the destination device IP.|
|dstDevice_mac|string|The media access control (MAC) address of the host for which network traffic is destined.|
|dstDevice_natIp|string|The external IP in cases where the internal IP goes through network address translation.|
|dstDevice_natIp_asnNumber|int|An autonomous system number for the IP address based on the Neustar GeoIP database.|
|dstDevice_natIp_asnOrg|string|Organization associated with the IP address address based on the Neustar GeoIP database.|
|dstDevice_natIp_city|string|City for the IP address based on the Neustar GeoIP database.|
|dstDevice_natIp_countryCode|string|Country Code for the IP address based on the Neustar GeoIP database.|
|dstDevice_natIp_countryName|string|Country Code for the IP address based on the Neustar GeoIP database.|
|dstDevice_natIp_ipv4IntValue|long|The ipv4 address stored as an unsigned 64-bit integer value|
|dstDevice_natIp_isInternal|boolean|Signifies whether the IP address is internal or external. True if internal, False if external.|
|dstDevice_natIp_isp|string|Internet Service Provider for the IP address based on the Neustar GeoIP database.|
|dstDevice_natIp_latitude|float|Latitude for the IP address based on the Neustar GeoIP database.|
|dstDevice_natIp_location|string|This value is populated based on the Network Blocks you have uploaded. When there is a match, it will be populated with the network block label.|
|dstDevice_natIp_longitude|float|Longitude for the IP address based on the Neustar GeoIP database.|
|dstDevice_natIp_region|string|State or Territory for the IP address based on the Neustar GeoIP database.|
|dstDevice_natIp_version|int|The version of IP protocol (e.g. 4 or 6)|
|dstDevice_osName|string|The operating system running on the host for which network traffic is destined.|
|dstDevice_type|string|The instance, compute, or machine type which network traffic is destined to. Typically used in cloud environments to describe computing specifications.|
|dstDevice_uniqueId|string|The unique ID of the host which network traffic is destined to. This field is frequently used by cloud providers to identify instances.|
|dstPort|int|The port number for which the network traffic is destined|
|email_messageId|string|A semi-unique identifier for an e-mail message generated by the sending mail system often ending with the fully qualified domain name of the sending system. It is not completely unique as copies of the same e-mail message, such as one sent to multiple recipients, may have the same message ID. Different mail systems may form message IDs in different ways.|
|email_sender|string|Address of the e-mail sender. To be used only for logs related specifically to e-mail activity (spam filtering, message tracking, etc).|
|email_subject|string|Subject line of an e-mail|
|errorCode|string|Machine code or shortform message that represents a specific error.|
|errorText|string|Human readable description of a specific error.|
|fieldTags|map[string]array[string]|A map of entity fields to a list of tags for that entity.|
|fields|map[string]string|This is a general purpose container for all un-mapped data from the log line.|
|file_basename|string|The name and extension (if applicable) of a file without the path.|
|file_hash_imphash|string|File hash created using the Import Hash (Imphash) algorithm.|
|file_hash_md5|string|File hash created using the 128 bit MD5 algorithm.|
|file_hash_pehash|string|Hash value for Portable Executable (PE) file binaries created using the PEHash algorithm.|
|file_hash_sha1|string|Hash of the file generated using the SHA1 algorithm|
|file_hash_sha256|string|Hash of the file generated using the SHA256 algorithm|
|file_hash_ssdeep|string|The fuzzy hash of the file generated using ssdeep.|
|file_mimeType|string|Two-part media type (MIME type/subtype) indicating the nature and format of a file transmitted over the internet.|
|file_path|string|The full path (if possible) of the file. This field may contain partial paths and serves as the general placeholder for file/process path fields.|
|file_size|long|Count of bytes taken up by the file.|
|file_uid|string|The data source specific unique identifier for the file, often a GUID.|
|flowState|string|Value indicating the state (e.g. begin, end, or continue) of a network traffic flow as it enters or exits an interface.|
|friendlyName|string|Name of the table the data is mapped to. Always Record for V3.|
|fromUser_authDomain|string|The domain associated with this particular user. (e.g. sumologic.com, sumologic.local)|
|fromUser_email|string|The associated email address assigned to this user.|
|fromUser_role|string|The role of the user account in question. Typically, this shows up in CloudTrail logs as an assumed role, but can be broadly applied to other logs.|
|fromUser_userId|string|The source unique identifier for the user account.|
|fromUser_username|string|The name commonly used to identify the user. May include the domain.  If name normalization occurs, this will be the normalized name.|
|fromUser_username_raw|string|The raw (un-normalized) version of a username.|
|fromUser_username_role|string|The role that is parsed out of the normalized username (usually from an AWS assumed role ARN).|
|hour|int|Hour pulled from the timestamp.|
|http_category|string|The high level category determined by a service based on the url or domain.|
|http_contentLength|int|The number of bytes of data in the body of the request.|
|http_hostname|string|Name of the host within an HTTP request|
|http_method|string|Type of HTTP request being made (e.g. GET, POST)|
|http_referer|string|Identifies the address of the webpage (i.e. the URI or IRI) which is linked to the resource being requested to determine the origin of the request.|
|http_referer_alexaRank|long|The HTTP referer domain's rank among the top 10k sites by Alexa traffic rank. NULL if not in the list.|
|http_referer_conditionalFrequency|double|(Deprecated) DO NOT INCLUDE IN THE DOCUMENTATION|
|http_referer_entropyFqdn|double|The entropy calculation of the Fully Qualified Domain Name (FQDN) of the HTTP referer.|
|http_referer_entropyRootDomain|double|The entropy calculation of the root domain of the HTTP referer.|
|http_referer_entropySubDomain|double|Deprecated and not populated|
|http_referer_fqdn|string|The fully qualified domain name in the HTTP referer URL (e.g. somehost.sumologic.com).|
|http_referer_path|string|The path component of the HTTP referer URL (e.g. somepath/something)|
|http_referer_possibleDga|boolean|Whether or not this domain is potentially a Domain Generation Algorithm created domain based on our backend analytics.|
|http_referer_possibleDynDns|boolean|A likely dynamically (not static) IP address associated with this domain.|
|http_referer_protocol|string|The HTTP referer URL protocol (e.g. https).|
|http_referer_rootDomain|string|The root domain of hostname in the HTTP referer URL (e.g. sumologic.com).|
|http_referer_tld|string|The top-level-domain field of the domain name in the HTTP referer URL (e.g. com, net, org)|
|http_requestHeaders|map[string]string|A map of the HTTP request headers.|
|http_response_contentLength|int|The number of bytes of data in the body of the response.|
|http_response_contentType|string|Two-part media type (MIME type/subtype) indicating the nature and format of data contained within an HTTP response.|
|http_response_statusCode|int|The numeric response code for an HTTP request|
|http_response_statusText|string|The response text for an HTTP request corresponding to an HTTP status code.|
|http_url|string|The Uniform Resource Locator (URL) of an HTTP resource (a web page).|
|http_url_alexaRank|long|The HTTP referer domain's rank among the top 10k sites by Alexa traffic rank. NULL if not in the list.|
|http_url_conditionalFrequency|double|(Deprecated) DO NOT INCLUDE IN THE DOCUMENTATION|
|http_url_entropyFqdn|double|The entropy calculation of the Fully Qualified Domain Name (FQDN) of the HTTP referer.|
|http_url_entropyRootDomain|double|The entropy calculation of the root domain of the HTTP referer.|
|http_url_entropySubDomain|double|Deprecated and not populated|
|http_url_fqdn|string|The fully qualified domain name in the HTTP URL (e.g. somehost.sumologic.com).|
|http_url_path|string|The path component of the HTTP URL (e.g. somepath/something)|
|http_url_possibleDga|boolean|Whether or not this domain is potentially a Domain Generation Algorithm created domain based on our backend analytics.|
|http_url_possibleDynDns|boolean|A likely dynamically (not static) IP address associated with this domain.|
|http_url_protocol|string|The HTTP URL protocol (e.g. https).|
|http_url_rootDomain|string|The root domain of hostname in the HTTP URL (e.g. sumologic.com).|
|http_url_tld|string|The top-level-domain field of the domain name in the HTTP URL (e.g. com, net, org)|
|http_userAgent|string|Software agent that is acting on behalf of a user in an HTTP request.|
|ipProtocol|string|The transport layer internet protocol used in the traffic that generated the log event. This should be the IP protocol keyword or the protocol number, such as ICMP or 1, TCP or 6, UDP or 17 as defined by the Internet Assigned Numbers Authority (IANA).|
|listMatches|array[string]|Name(s) of the match list(s) that a value in the log matched on.|
|logonType|string|The method of authentication or type of user session initiated.|
|matchedItems|array[MatchedItem]|Value(s) in the match list(s) that an a value in the log matched on.|
|metadata_defaultTz|int|Default timezone for timestamp parsing|
|metadata_deviceEventId|string|Vendor specific event identifier. Is provided in the parser output and determines which mapping will be used.|
|metadata_mapperName|string|CSE mapper name which normalizes the record.|
|metadata_mapperUid|string|Universally unique identifier for CSE normalization mappers.|
|metadata_orgId|string|The Sumo Customer Org ID that originated the raw log message.|
|metadata_parseTime|long|The time at which the log line was parsed into a record by the parser and mapper service in milliseconds since epoch|
|metadata_parser|string|Name of the parser which extracted fields from the original log message.|
|metadata_product|string|The specific product name of the data source.|
|metadata_productGuid|string|Globally unique identifier for the combined vendor and product.|
|metadata_receiptTime|long|The time at which the log line was received by the collector in milliseconds since epoch|
|metadata_relayHostname|string|(Deprecated) Hostname of the syslog server that forwarded the log to the Sumo Logic sensor.|
|metadata_relayIp|string|(Deprecated) IP address of the syslog server that forwarded the log to the Sumo Logic sensor.|
|metadata_schemaVersion|int|The current schema version (3).|
|metadata_sensorId|string|UID of the Sumo Logic sensor used to ingest the log.|
|metadata_sensorInformation|map[string]string|(Deprecated) Information about the sensor used to ingest the log.|
|metadata_sensorZone|string|A name propagated from the sensors. In the case where sensors are installed in environments with overlapping IP address spaces, this is used to distinguish two identical IP addresses from each other.|
|metadata_sourceCategory|string|The Sumologic source category of the data.|
|metadata_sourceMessageId|string|The _messageID of the original source log message (from SumoLogic CIP).|
|metadata_tenantId|string|(Deprecated) Unique identifier for the portal that data is being sent to.|
|metadata_vendor|string|The name of the company responsible for the data source.|
|mfa|boolean|True or false showing whether or not an authentication event was performed with multi-factor authentication.|
|moduleType|string|Attribute of a file loaded by a process to extend functionality which identifies its file type or otherwise indicating how it is to behave.|
|month|int|Month pulled from the timestamp.|
|normalizedAction|string|Complementary to the Action field, this field describes the initiation of an activity in a common way across records. normalizedAction is meant to describe the attempt of an action, using the success boolean as a modifier indicating whether or not the action was successful. Further, normalizedAction should be paired with normalizedResource to indicate where or upon what the initiated action was attempted against.|
|normalizedCause|string|Complementary to Cause, this field describes the reason for any particular outcome in a record in a common way.|
|normalizedResource|string|Complementary to Resource, this field describes the resource being acted upon or otherwise referenced within a record in a common way across records. Intended to be used to provide further normalized context to a record, particularly in tandem with normalizedAction.|
|normalizedSeverity|int|Severity score on a scale of 0 to 10 with 0 being informational and 10 being critical. This is defined either explicitly per mapping or by a lookup to normalize a vendor specific severity level. Certain normalized threat rules will use normalizedSeverity to pass a dynamic severity into the signal. normalizedSeverity is an enforced output value field, this means that the output value must be an integer between 0 and 10.|
|normalizedSeverity_description|string|A string representing the severity.|
|objectType|string|The name of the top level schema object type. (e.g. Authentication, Audit, Endpoint, Network, Notification, etc.). Displayed as Record Type in the UI.|
|packetsIn|long|The count of packets received in a network connection.|
|packetsOut|long|The count of packets sent in a network connection.|
|parentBaseImage|string|The name of an executable process which has spawned a child process. Often found in process auditing and malware detection events.|
|parentCommandLine|string|The instruction or set of instructions inputted into a text interface such as the command prompt (cmd.exe) or PowerShell in Windows, or terminal on Unix based systems associated with a parent process.|
|parentPid|int|The process id of the program that initiated a process (typically the parentBaseImage).|
|pid|int|The process id of a process (typically the baseImage).|
|processUid|string|A data source specific unique identifier for a process, often a GUID.|
|resource|string|Generalized field to capture an object referenced within a log that does not have a more specific field currently specified in the mapping schema. (e.g. a file is a resource, however file_basename and file_path both exist to capture this value)|
|resourceType|string|Generalized field to help describe the nature of a resource. Used when a resource exists for which there is no more specific field specified for that type of resource. (e.g. a file is a type of resource, file_basename exists to capture the name of the file and describes the type)|
|severity|string|The source specific severity level with no normalization.|
|sourceUid|string|A UID that is defined by the record itself. Each record is assigned a UID during mapping, but this is the unique identifier field that may exist within an originating record.|
|srcDevice_container_id|string|The unique identifier provided to a discreet container which packages together the elements required to run software.|
|srcDevice_container_name|string|The name provided to a discreet container which packages together the elements required to run software.|
|srcDevice_container_runtime|string|The provider name of the engine whine underpins the container. E.g. Docker, AWS Lambda, containerd|
|srcDevice_hostname|string|The name of the host which network traffic originated from.|
|srcDevice_hostname_raw|string|The source device hostname before any enrichments are applied. As the hostname appears in the original log message.|
|srcDevice_image|string|The snapshot of the state of a device or similar which can be used to deploy or reproduce a system for which traffic is originating. E.g. A VM image, a container image. |
|srcDevice_ip|string|The IP address of the host which network traffic originated from.|
|srcDevice_ip_asnNumber|int|The autonomous system number for the source device IP address based on the Neustar GeoIP database, typically assigned to internet service providers.|
|srcDevice_ip_asnOrg|string|The organzation associated with the ASN based on the Neustar GeoIP database, typically assigned to internet service providers.|
|srcDevice_ip_city|string|City for the source device IP address based on the Neustar GeoIP database.|
|srcDevice_ip_countryCode|string|Country code (e.g. US, CA, DE) for the source device IP address based on the Neustar GeoIP database.|
|srcDevice_ip_countryName|string|Name of the country for the source device IP address based on the Neustar GeoIP database.|
|srcDevice_ip_ipv4IntValue|long|The ipv4 address stored as an unsigned 64-bit integer value|
|srcDevice_ip_isInternal|boolean|Signifies whether the source device IP address is internal or external. True if internal, False if external.|
|srcDevice_ip_isp|string|Internet Service Provider for the IP address based on the Neustar GeoIP database.|
|srcDevice_ip_latitude|float|Geographic latitude coordinate for the source device IP address based on the Neustar GeoIP database.|
|srcDevice_ip_location|string|This value is populated based on uploaded Network Blocks. When there is a match, it will be populated with the network block label.|
|srcDevice_ip_longitude|float|Longitude coordinate for the source device IP address based on the Neustar GeoIP database.|
|srcDevice_ip_region|string|State or Territory for the source device IP address based on the Neustar GeoIP database.|
|srcDevice_ip_version|int|Version of the IP protocol of the source device IP.|
|srcDevice_mac|string|The media access control (MAC) address of the host which network traffic originated from.|
|srcDevice_natIp|string|The external IP in cases where the internal IP goes through network address translation.|
|srcDevice_natIp_asnNumber|int|An autonomous system number for the IP address based on the Neustar GeoIP database.|
|srcDevice_natIp_asnOrg|string|Organization associated with the IP address address based on the Neustar GeoIP database.|
|srcDevice_natIp_city|string|City for the IP address based on the Neustar GeoIP database.|
|srcDevice_natIp_countryCode|string|Country Code for the IP address based on the Neustar GeoIP database.|
|srcDevice_natIp_countryName|string|Country Code for the IP address based on the Neustar GeoIP database.|
|srcDevice_natIp_ipv4IntValue|long|The ipv4 address stored as an unsigned 64-bit integer value|
|srcDevice_natIp_isInternal|boolean|Signifies whether the IP address is internal or external. True if internal, False if external.|
|srcDevice_natIp_isp|string|Internet Service Provider for the IP address based on the Neustar GeoIP database.|
|srcDevice_natIp_latitude|float|Latitude for the IP address based on the Neustar GeoIP database.|
|srcDevice_natIp_location|string|This value is populated based on the Network Blocks you have uploaded. When there is a match, it will be populated with the network block label.|
|srcDevice_natIp_longitude|float|Longitude for the IP address based on the Neustar GeoIP database.|
|srcDevice_natIp_region|string|State or Territory for the IP address based on the Neustar GeoIP database.|
|srcDevice_natIp_version|int|The version of IP protocol (e.g. 4 or 6)|
|srcDevice_osName|string|The operating system running on the host which network traffic originated from.|
|srcDevice_type|string|The instance, compute, or machine type which network traffic originated from. Typically used in cloud environments to describe computing specifications.|
|srcDevice_uniqueId|string|The unique ID of the host which network traffic originated from. This field is frequently used by cloud providers to identify instances.|
|srcPort|int|The port number which the network traffic originated from.|
|success|boolean|True or false showing whether or not an action or event recorded in a log was successful. This field is either defined as a constant or based on a lookup in a mapping.|
|targetUser_authDomain|string|The authentication domain of a user which is subject to or is otherwise impacted by activity undertaken by another user. Such as the Active Directory domain to which a new user account being created belongs.|
|targetUser_email|string|E-Mail address associated with the user which is subject to activity undertaken by another account. Such as an E-Mail address which was created for a new user account.|
|targetUser_role|string|A privileged persona assumed by a user which is subject to activity undertaken by another user. Such as in CloudTrail logs as well as similar cases where a user is recorded taking on a different role for specific privileged activity.|
|targetUser_userId|string|The semi-unique identifier associated with a user account which is subject to activity undertaken by another user account.|
|targetUser_username|string|The name commonly used to identify the user. May include the domain.  If name normalization occurs, this will be the normalized name.|
|targetUser_username_raw|string|The raw (un-normalized) version of a username.|
|targetUser_username_role|string|The role that is parsed out of the normalized username (usually from an AWS assumed role ARN).|
|tcpProtocol|string|Application layer protocol used to establish the connection as defined by the Internet protocol Suite (TCP/IP).|
|threat_category|string|The type of threat determined by a service based on the signature or threat name.|
|threat_identifier|string|The identifier or indicator specific to a threat (not a vulnerability). Generally speaking this should be populated with an indicator value.|
|threat_name|string|Name of a specific threat (not a vulnerability), such as malware or an exploit. Often a threat signature.|
|threat_referenceUrl|string|An external URL that can provide more information about the threat. This should NOT be the URL that represents an observed HTTP request.|
|threat_ruleType|string|This field should be used with logs that indicate detection of a security event has already occurred. These logs are produced by a security product's own detection capabilities like signatures or rule sets. As an example, if a log has a severity, risk, or impact in the message, it should have threat_ruleType included and populated in its mapper. The logs using this field will all be a form of pass through content. Messages that do not include security event detection must leave this field out of the mapper or leave it blank.|
|threat_signalName|string|This field is used in conjunction with normalized rules designed to directly pass through security alerts from other security products, appliances, and services. Those rules will use the text populated in this field as an element of the signal name, allowing different signal names for different products while retaining the normalized rule logic.|
|threat_signalSummary|string|This field is used in conjunction with normalized rules. Those rules will use the text populated in this field as an element of the signal summary, allowing different signal summaries for different products while retaining the normalized rule logic.|
|timestamp|long|The timestamp of the event stored as milliseconds since epoch. Time can be directly mapped if the log contains epoch time, however other time formats can be mapped if the format is provided. If no timestamp is defined in the mapping, ingest time will be used by default.|
|uid|string|UID for the parsed record in Sumo Logic CSE.|
|user_authDomain|string|The authentication domain associated with an acting user. Such as an Active Directory domain of a user logging in or is performing an action.|
|user_email|string|E-Mail address associated with the acting user.|
|user_role|string|A privileged persona which is assumed by an acting user. Such as in CloudTrail logs as well as similar cases where a user is recorded taking on a different role for specific privileged activity.|
|user_userId|string|The semi-unique identifier associated with an acting user account.|
|user_username|string|The name commonly used to identify the user. May include the domain.  If name normalization occurs, this will be the normalized name.|
|user_username_raw|string|The actor username before any enrichments are applied. As the username appears in the original log message.|
|user_username_role|string|The role that is extracted from the normalized actor username (such as from an AWS assumed role ARN).|
|vuln_bugtraq|string|Bugtraq identifier assigned by SecurityFocus. BugTraq is a full disclosure moderated mailing list for the detailed discussion and announcement of computer security vulnerabilities.|
|vuln_cert|string|Numeric identifier for a vulnerability assigned by the United States Computer Emergency Readiness Team Coordination Center (US CERT/CC).|
|vuln_cve|string|Common Vulnerabilities and Exposures identifier for the vulnerability. Follows the format `CVE-<year>-<number>`|
|vuln_cvss|string|Common Vulnerability Scoring System (CVSS) score designed to help responders to prioritize their response and resources to a vulnerability.|
|vuln_name|string|Name that briefly summarizes the nature of a vulnerability. |
|vuln_reference|string|Additional information on a vulnerability in the form of a link, a specific vendor ID (e.g. MS14-068), or further description.|
|year|int|Year pulled from the timestamp.|


