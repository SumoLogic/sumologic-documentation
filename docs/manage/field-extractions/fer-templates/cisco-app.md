---
id: cisco-app
title: Cisco Logs Extraction Template
description: Parse the common fields in your Cisco ASA Logs using the FER template.
---


**Log Type**: Cisco ASA

**Template Description:** Parsing the common fields in your Cisco
ASA log.

**Sample Log:**

```
Tue Aug 15 23:30:09 %ASA-6-302016: Teardown UDP connection 40 for outside:44.44.4.4/500 to inside:44.44.2.2/500 duration 0:02:02 bytes 1416
```

**Parsing Rule:**

```sql
extract "%[A-Z]{3}-(?<severity>\d)-(?<msg_code>\d{6}):(?<action>.+)$" nodrop
| extract " duration (?<duration>[\d:]+) bytes (?<bytes>\d+)" nodrop
| extract "(?<connection_count>\d+ in use, \d+ most used)" nodrop
| extract "%[A-Z]{3}-\d-\d{6}:.+? for (?<src_interface>\S+):(?<src_host>[\S ]+)\/(?<src_port>\d+) .*?to (?<dest_interface>\S+):(?<dest_host>\S+)\/(?<dest_port>\d+)" nodrop
| extract "(?<action>Built .+?) (?:for |from )" nodrop
| extract "Built \w+ (?<protocol>\w+) (?:translation|connection) " nodrop
| extract " from (?<src_interface>\S+):(?<src_host>[\S ]+) to (?<dest_interface>\S+):(?<dest_host>\S+)(?:\s|$)" nodrop
| extract " from (?<src_interface>\S+):(?<src_host>[\S ]+)/(?<src_port>\d+) to (?<dest_interface>\S+):(?<dest_host>\S+)/(?<dest_port>\d+)" nodrop
| extract "(?<action>access-list) (?<acl_id>.+?) (?<access_decision>\w+) (?<protocol>\w+) (?<src_interface>\S+)/(?<src_host>[\S ]+)\((?<src_port>\d+)\) -[>]{0,1} (?<dest_interface>\S+)/(?<dest_host>\S+)\((?<dest_port>\d+)\) hit-cnt (?<hit_cnt>\d+) (?<hit_cnt_interval>.+?)(?: \[|$)" nodrop
| extract "(?<action>access-list) (?<acl_id>.+?) (?<access_decision>\w+) (?<protocol>\w+) (?<src_interface>\S+)/(?<src_host>[\S ]+)\((?<src_port>\d+)\) -[>]{0,1} (?<dest_interface>\S+)/(?<dest_host>\S+)\((?<dest_port>\d+)\) hit-cnt (?<hit_cnt>\d+) \((?<hit_cnt_interval>.+?)\)" nodrop
| extract "(?<action>Deny .+?) from (?<src_host>[\S ]+) to (?<dest_host>\S+) on interface (?<src_interface>\S+)(?:\s|$)"  nodrop
| extract "(?<action>Deny .+?) src (?<src_interface>\S+):(?<src_host>[\S ]+) dst (?<dest_interface>\S+):(?<dest_host>\S+)(?:\s|$)" nodrop
| extract "Deny (?<protocol>\w+) (?:reverse path|connection spoof|src )" nodrop
| extract "(?<action>Deny inbound \(No xlate\))"  nodrop
| extract "(?<action>Deny inbound \(No xlate\)) (?<protocol>\w+) src (?<src_interface>\S+):(?<src_host>[\S ]+) dst (?<dest_interface>\S+):(?<dest_host>\S+)(?:\s|$)" nodrop
| extract "(?<action>Deny inbound \(No xlate\)) (?<protocol>\w+) src (?<src_interface>\S+):(?<src_host>[\S ]+)\/(?<src_port>\d+) dst (?<dest_interface>\S+):(?<dest_host>\S+)\/(?<dest_port>\d+)" nodrop
| extract " (?<protocol>\w+) (?<action>Connection denied by outbound list) (?<acl_id>.+?) src (?<src_host>[\S ]+) dest (?<dest_host>\S+)(?:\s|$)" nodrop
| extract "(?<action>Deny inbound) (?<protocol>\w+) from (?<src_host>[\S ]+)/(?<src_port>\d+) to (?<dest_host>\S+)/(?<dest_port>\d+)" nodrop
| extract "(?<action>Deny inbound) (?<protocol>\w+) from (?<src_host>[\S ]+)/(?<src_port>\d+) to (?<dest_host>\S+)/(?<dest_port>\d+) on interface (?<src_interface>\S+)(?:\s|$)" nodrop
| extract "(?<action>Deny inbound) (?<protocol>\w+) src (?<src_interface>\S+):(?<src_host>[\S ]+)/(?<src_port>\d+) dst (?<dest_interface>\S+):(?<dest_host>\S+)/(?<dest_port>\d+)" nodrop
| extract "(?<action>Deny IP) from (?<src_host>[\S ]+) to (?<dest_host>\S+)(?:,|\s|$)" nodrop
| extract "(?<action>Dropping echo request) from (?<src_host>[\S ]+) to PAT address" nodrop
| extract "(?<action>Deny inbound icmp) src (?<src_interface>\S+):(?<src_host>[\S ]+) dst (?<dest_interface>\S+):(?<dest_host>\S+)(?:\s|$)" nodrop
| extract "(?<action>Deny TCP \(no connection\)) from (?<src_host>[\S ]+)/(?<src_port>\d+) to (?<dest_host>\S+)/(?<dest_port>\d+) flags (?<flags>.+?) on interface (?<src_interface>\S+)(?:\s|$)" nodrop
| extract "(?<action>Deny IP spoof) from \((?<src_host>[\S ]+)\) to (?<dest_host>\S+) on interface (?<src_interface>\S+)(?:\s|$)" nodrop
| extract "(?<action>Deny IP due to Land Attack) from (?<src_host>[\S ]+) to (?<dest_host>\S+)(?:\s|$)" nodrop
| extract "(?<action>ICMP packet type .+? denied by outbound list) (?<acl_id>.+?) src (?<src_host>[\S ]+) dest (?<dest_host>\S+)(?:\s|$)" nodrop
| extract "(?<action>Deny IP teardrop fragment .+?) from (?<src_host>[\S ]+) to (?<dest_host>\S+)(?:\s|$)" nodrop
| extract "(?<action>Teardown) (?<protocol>TCP|UDP) connection \d+ for " nodrop
| extract "%[A-Z]{3}-\d-\d{6}: (?<src_host>[\S ]+) (?<action>Accessed URL) (?<dest_host>[\d\.]+):(?<url>.+)$" nodrop
| extract "%[A-Z]{3}-\d-\d{6}: (?<user>.+?)@(?<src_host>[\S ]+) (?<action>Accessed URL) (?<dest_host>\S+):(?<url>.+)$" nodrop
| extract "(?<action>\w+ local-host) (?<src_interface>\S+):(?<src_host>[\S ]+)$" nodrop
| extract "(?<action>\w+ local-host) (?<src_interface>\S+):(?<src_host>[\S ]+) duration (?<duration>.+)$" nodrop
| extract "%[A-Z]{3}-(?<severity>\d)-(?<msg_code>\d{6})[:]{0,1} IPS:(?<ips_num>\d+) (?<action>.+?) from (?<src_host>[\S ]+) to (?<dest_host>\S+) on interface (?<src_interface>\S+)(?:\s|$)" nodrop
```
