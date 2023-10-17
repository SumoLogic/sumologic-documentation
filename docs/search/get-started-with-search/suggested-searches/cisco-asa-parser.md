---
id: cisco-asa-parser
title: Suggested Searches for the Cisco ASA Parser
sidebar_label: Cisco ASA Parser
description: These suggested searches cover some of the most common scenarios for monitoring issues on a Linux server.
---


These suggested searches cover some of the most common scenarios for monitoring Security, Audit, and Performance issues on a Linux server. You can enter these queries into the Search box as a starting baseline, and then customize the queries for your system.

Be sure to [save your search](../search-basics/save-search.md) queries if you plan to run them often.

These are a few valuable search queries you can enter in the Search field when you want to discover details about your Cisco ASA traffic.

The **`_sourceCategory`** fields shown in these sample queries are based on Sumo Logic's recommendations for [adding metadata to Sources](/docs/send-data/collection/edit-source.md). To reuse these queries, type the Category you entered for the relevant Source after `"_sourceCategory="` or use an asterisk wildcard (`*`) instead.

## Top Denied Sources

Returns the top sources that were denied.

* Suggested Time Range: -1h

```sql
_sourceCategory=*cisco*asa* AND ("denied" OR "Deny")
| parse using public/cisco/asa
| where access_decision="denied" OR action matches "Deny *"
| count_frequent src_host
| limit 10
```

## Top Denied Destinations

Returns the top destinations that were denied.

* Suggested Time Range: -1d

```sql
_sourceCategory=*cisco*asa* AND ("denied" OR "Deny")
| parse using public/cisco/asa
| where access_decision="denied" OR action matches "Deny *"
| count_frequent dest_host
| limit 10
```

## Top Sources with Outbound Connections

Returns the top sources with outbound connections by the number of connections.

* Suggested Time Range: -1h

```sql
_sourceCategory=*cisco*asa* AND "built outbound"
| parse using public/cisco/asa
| where src_host !=""
| count_frequent src_host
| limit 10
```

## Top Internal Destinations

Returns the top internal destinations by number of connections.

* Suggested Time Range: -1h

```sql
_sourceCategory=*cisco*asa* AND "built inbound"
| parse using public/cisco/asa
| where dest_host !=""
| dest_host as internal_destination
| count_frequent internal_destination
| limit 10
```

## Detected Attacks

Returns all attacks detected by the IPS.

* Suggested Time Range: -15m; run as a scheduled search to return results only if number of messages is > 0

```sql
_sourceCategory=*cisco*asa* ": ``ips``:" AND ("attack" OR "Proxied RPC Request" OR "buffer overflow" OR "IP Impossible Packet" OR "IP Fragments Overlap" OR "Fragmented ICMP Traffic" OR "Large ICMP Traffic" OR "TCP NULL flags" OR "TCP SYN+FIN flags" OR "TCP FIN only flags") | parse using public/cisco/``asa
```
