---
id: match-fields-reference
title: Match Fields Reference
description: Learn what record fields a match list with a given target column is compared to.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This topic is a reference to the record fields that a match list with a given target column will be compared to. Each header below (Domain, Hostname, Username, etc.) is a supported target column for a Cloud SIEM match list. The items listed below each header are record fields 

If a record contains a field whose name matches one of the match fields for a target column, Cloud SIEM will append the match list name to the record in the `list_matches` array.

## Destination IP Address

* bro_radius_remoteIp
* bro_socks_requestIp
* dns_replyIp
* dstDevice_ip
* dstDevice_natIp

## Destination IP ASN

* bro_radius_remoteIp_asnNumber
* bro_socks_requestIp_asnNumber
* dns_replyIp_asnNumber
* dstDevice_ip_asnNumber
* dstDevice_natIp_asnNumber

## Destination IP ISP

* bro_radius_remoteIp_isp
* bro_socks_requestIp_isp
* dns_replyIp_isp
* dstDevice_ip_isp
* dstDevice_natIp_isp

## Destination IP Organization

* bro_radius_remoteIp_asnOrg
* bro_socks_requestIp_asnOrg
* dns_replyIp_asnOrg 
* dstDevice_ip_asnOrg
* dstDevice_natIp_asnOrg

## Domain

* bro_ntlm_domainame
* bro_ssl_serverName_rootDomain
* dns_queryDomain
* dns_replyDomain
* fromUser_authDomain
* http_referrerDomain
* http_url_rootDomain
* http_url_fqdn

## File Hash

* file_hash_imphash
* file_hash_md5
* file_hash_pehash
* file_hash_sha1
* file_hash_sha256
* file_hash_ssdeep


## Hostname

* bro_ssl_serverName
* device_hostname
* dstDevice_hostname
* http_hostname
* http_referrerHostname
* srcDevice_hostname

## IP Address

* bro_dhcp_assignedIp
* bro_radius_remoteIp
* bro_smtp_headers.xOriginatingIp
* bro_socks_boundIp
* bro_socks_requestIp
* device_ip
* device_natIp
* dns_replyIp
* dstDevice_ip
* dstDevice_natIp
* srcDevice_ip
* srcDevice_natIp

## IP ASN

* bro_dhcp_assignedIp_asnNumber
* bro_radius_remoteIp_asnNumber
* bro_smtp_headers.xOriginatingIp_asnNumber
* bro_socks_boundIp_asnNumber
* bro_socks_requestIp_asnNumber
* device_ip_asnNumber
* device_natIp_asnNumber
* dns_replyIp_asnNumber
* dstDevice_ip_asnNumber
* dstDevice_natIp_asnNumber
* srcDevice_ip_asnNumber
* srcDevice_natIp_asnNumber

## IP ISP

* bro_dhcp_assignedIp_isp
* bro_radius_remoteIp_isp
* bro_smtp_headers.xOriginatingIp_isp
* bro_socks_boundIp_isp
* bro_socks_requestIp_isp
* device_ip_isp
* device_natIp_isp
* dns_replyIp_isp
* dstDevice_ip_isp
* dstDevice_natIp_isp
* srcDevice_ip_isp
* srcDevice_natIp_isp

## IP Organization

* bro_dhcp_assignedIp_asnOrg
* bro_radius_remoteIp_asnOrg
* bro_smtp_headers.xOriginatingIp_asnOrg
* bro_socks_boundIp_asnOrg
* bro_socks_requestIp_asnOrg
* device_ip_asnOrg
* device_natIp_asnOrg
* dns_replyIp_asnOrg
* dstDevice_ip_asnOrg
* dstDevice_natIp_asnOrg
* srcDevice_ip_asnOrg
* srcDevice_natIp_asnOrg

## Source IP Address

* bro_dhcp_assignedIp
* bro_smtp_headers.xOriginatingIp
* bro_socks_boundIp
* device_ip
* device_natIp
* srcDevice_ip
* srcDevice_natIp

## Source IP ASN

* bro_dhcp_assignedIp_asnNumber
* bro_smtp_headers.xOriginatingIp_asnNumber
* bro_socks_boundIp_asnNumber
* device_ip_asnNumber
* device_natIp_asnNumber
* srcDevice_ip_asnNumber
* srcDevice_natIp_asnNumber

## Source IP ISP

* bro_dhcp_assignedIp_isp
* bro_smtp_headers.xOriginatingIp_isp
* bro_socks_boundIp_isp
* device_ip_isp
* device_natIp_isp
* srcDevice_ip_isp
* srcDevice_natIp_isp

## Source IP Organization

* bro_dhcp_assignedIp_asnOrg
* bro_smtp_headers.xOriginatingIp_asnOrg
* bro_socks_boundIp_asnOrg
* device_ip_asnOrg
* device_natIp_asnOrg
* srcDevice_ip_asnOrg
* srcDevice_natIp_asnOrg

## URL

* http_url

## Username

* fromUser_username
* username
* user_username