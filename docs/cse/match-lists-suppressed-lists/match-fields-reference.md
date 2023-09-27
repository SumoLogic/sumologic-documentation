---
id: match-fields-reference
title: Match Fields Reference
description: Learn what Record fields a Match List with a given Target Column is compared to.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This topic is a reference to the Record fields that a Match List with a given Target Column will be compared to. Each header below—Hostname, Domain, Username, and—is a supported Target Column for a CSE Match List. The items listed below each header are Record fields 

If a Record contains a field whose name matches one of the match fields for a Target Column, the name of the Match List, CSE will append the Match List name to the Record in the `list_matches` array. 

## Hostname

* device_hostname
* dstDevice_hostname
* srcDevice_hostname
* http_hostname
* http_referrerHostname
* bro_ssl_serverName

## Domain

* bro_ntlm_domainame
* bro_ssl_serverName_rootDomain
* dns_queryDomain
* dns_replyDomain
* fromUser_authDomain
* http_referrerDomain
* http_url_rootDomain
* http_url_fqdn

## Username

* username
* fromUser_username
* user_username

## File Hash

* file_hash_md5
* file_hash_sha1
* file_hash_sha256
* file_hash_ssdeep
* file_hash_imphash
* file_hash_pehash

## URL

* http_url

## IP Address

* srcDevice_ip
* srcDevice_natIp
* bro_dhcp_assignedIp
* bro_smtp_headers.xOriginatingIp
* bro_socks_boundIp
* device_ip
* device_natIp
* dstDevice_ip
* dstDevice_natIp
* bro_radius_remoteIp
* bro_socks_requestIp
* dns_replyIp

## Source IP Address

* srcDevice_ip
* srcDevice_natIp
* bro_dhcp_assignedIp
* bro_smtp_headers.xOriginatingIp
* bro_socks_boundIp
* device_ip
* device_natIp

## Destination IP Address

* dstDevice_ip
* dstDevice_natIp
* bro_radius_remoteIp
* bro_socks_requestIp
* dns_replyIp

## IP ASN

* srcDevice_ip_asnNumber
* srcDevice_natIp_asnNumber
* bro_dhcp_assignedIp_asnNumber
* bro_smtp_headers.xOriginatingIp_asnNumber
* bro_socks_boundIp_asnNumber
* device_ip_asnNumber
* device_natIp_asnNumber
* dstDevice_ip_asnNumber
* dstDevice_natIp_asnNumber
* bro_radius_remoteIp_asnNumber
* bro_socks_requestIp_asnNumber
* dns_replyIp_asnNumber

## Source IP ASN

* srcDevice_ip_asnNumber
* srcDevice_natIp_asnNumber
* bro_dhcp_assignedIp_asnNumber
* bro_smtp_headers.xOriginatingIp_asnNumber
* bro_socks_boundIp_asnNumber
* device_ip_asnNumber
* device_natIp_asnNumber

## Destination IP ASN

* dstDevice_ip_asnNumber
* dstDevice_natIp_asnNumber
* bro_radius_remoteIp_asnNumber
* bro_socks_requestIp_asnNumber
* dns_replyIp_asnNumber

## IP ISP

* srcDevice_ip_isp
* srcDevice_natIp_isp
* bro_dhcp_assignedIp_isp
* bro_smtp_headers.xOriginatingIp_isp
* bro_socks_boundIp_isp
* device_ip_isp
* device_natIp_isp
* dstDevice_ip_isp
* dstDevice_natIp_isp
* bro_radius_remoteIp_isp
* bro_socks_requestIp_isp
* dns_replyIp_isp

## Source IP ISP

* srcDevice_ip_isp
* srcDevice_natIp_isp
* bro_dhcp_assignedIp_isp
* bro_smtp_headers.xOriginatingIp_isp
* bro_socks_boundIp_isp
* device_ip_isp
* device_natIp_isp

## Destination IP ISP

* dstDevice_ip_isp
* dstDevice_natIp_isp
* bro_radius_remoteIp_isp
* bro_socks_requestIp_isp
* dns_replyIp_isp

## IP Organization

* srcDevice_ip_asnOrg
* srcDevice_natIp_asnOrg
* bro_dhcp_assignedIp_asnOrg
* bro_smtp_headers.xOriginatingIp_asnOrg
* bro_socks_boundIp_asnOrg
* device_ip_asnOrg
* device_natIp_asnOrg
* dstDevice_ip_asnOrg
* dstDevice_natIp_asnOrg
* bro_radius_remoteIp_asnOrg
* bro_socks_requestIp_asnOrg
* dns_replyIp_asnOrg

## Source IP Organization

* srcDevice_ip_asnOrg
* srcDevice_natIp_asnOrg
* bro_dhcp_assignedIp_asnOrg
* bro_smtp_headers.xOriginatingIp_asnOrg
* bro_socks_boundIp_asnOrg
* device_ip_asnOrg
* device_natIp_asnOrg

## Destination IP Organization

* dstDevice_ip_asnOrg
* dstDevice_natIp_asnOrg
* bro_radius_remoteIp_asnOrg
* bro_socks_requestIp_asnOrg
* dns_replyIp_asnOrg    
