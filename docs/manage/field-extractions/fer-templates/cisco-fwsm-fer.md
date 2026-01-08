---
id: cisco-fwsm-fer
title: Sample Cisco FWSM Field Extraction Rule
description: Create field extraction rules for Cisco FWSM.
---



There are multiple rules to cover Cisco FWSM logs since these logs have multiple formats and multiple functions.

The first rule is generic and matches all messages:

## Cisco FWSM

**Rule Name:** Cisco FWSM   

**Log Type:** cisco fwsm  

**Sample Log:**

**Scope:**

```sql
_sourceCategory=networking/cisco/fwsm
```

**Extraction Rule:**

```sql
parse "FWSM-*-*:" as log_level,msg_code | parse regex " (?<host>.+)-(?:FWSM|fwsm)" | if(log_level=0,"emergency",if(log_level=1,"alert",if(log_level=2,"critical",if(log_level=3,"error",if(log_level=4,"warning",if(log_level=5,"notification",if(log_level=6,"informational",if(log_level=7,"debug","Other")))))))) as log_level_desc
```

## Cisco FWSM AcceptFWSM Accept

**Rule Name:** Cisco FWSM AcceptFWSM Accept  

**Log Type:** cisco fwsm  

**Sample Log:**

```
2014-10-14T13:38:09.185081-04:00 DEVICE-NAME %FWSM-6-302013: Built outbound TCP connection 146219215463786753 for Inside-FW:129.228.122.212/54734 (217.147.244.169/6226) to Outside:178.255.155.18/443 (178.255.155.18/443)
```

**Scope:**

```sql
_sourceCategory=networking/cisco/fwsm Built AND (outbound OR inbound)
```

**Extraction Rule:**

```sql
parse "Teardown * connection" as protocol nodrop | parse regex "for\s(?<src_dom>\S+):(?<src_ip>\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})/(?<src_port>\d+)\s" nodrop | parse regex "to\s(?<dest_dom>\S+):(?<dest_ip>\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})/(?<dest_port>\d+)\s" nodrop | "firewall-teardown" as eventtype | "cisco-firewall" as event
``` 

## Cisco FWSM TeardownFWSM Teardown  

**Rule Name:** Cisco FWSM TeardownFWSM Teardown  

**Log Type:** cisco fwsm  

**Sample Log:**

```
2014-10-14T13:42:10.544871-04:00 DEVICE-NAME %FWSM-6-302014: Teardown TCP connection 146520541779339583 for Inside-FW:129.228.122.212/60371 to Outside:176.223.220.230/443 duration 0:00:00 bytes 580 TCP FINs
```

**Scope:**

```sql
_sourceCategory=networking/cisco/asa Teardown !local-host !dynamic !ICMP
```

**Extraction Rule:**

```sql
parse "Teardown * connection" as protocol nodrop | parse regex "for\s(?<src_dom>\S+):(?<src_ip>\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})/(?<src_port>\d+)\s" nodrop | parse regex "to\s(?<dest_dom>\S+):(?<dest_ip>\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})/(?<dest_port>\d+)\s" nodrop | "firewall-teardown" as eventtype | "cisco-firewall" as event
```

## Cisco FWSM Deny

**Rule Name:** Cisco FWSM Deny src dstFWSM Deny src dst  

**Log Type:** cisco fwsm  

**Sample Log:**

```
2014-10-14T13:42:10.544871-04:00 DEVICE-NAME %FWSM-6-302014: Teardown TCP connection 146520541779339583 for Inside-FW:129.228.122.212/60371 to Outside:176.223.220.230/443 duration 0:00:00 bytes 580 TCP FINs
```

**Scope:**

```sql
_sourceCategory=networking/cisco/fwsm deny src dst !"Deny inbound" !"Deny protocol" !"Deny IP"
```

**Extraction Rule:**

```sql
parse "Deny * " as protocol nodrop | parse regex "src\s(?<src_dom>\S+):(?<src_ip>\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})" nodrop | parse regex "/(?<src_port>\d+)\s" nodrop | parse regex "dst\s(?<dest_dom>\S+):(?<dest_ip>\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})" nodrop | parse regex "/(?<dest_port>\d+)\s" nodrop | "firewall-deny" as eventtype | "cisco-firewall" as event
```

## Cisco FWSM Deny from toFWSM

**Rule Name:** Cisco FWSM Deny from toFWSM Deny from to  

**Log Type:** cisco fwsm  

**Sample Log:**

```
2014-10-14T13:55:23.469095-04:00 DEVICE-NAME %FWSM-6-106015: Deny TCP (no connection) from 190.93.246.9/80 to 217.147.244.123/45050 flags SYN ACK on interface Outside
```

**Scope:**

```sql
_sourceCategory=networking/cisco/fwsm deny from to !"Deny inbound" !"Deny protocol" !"Deny IP"
```

**Extraction Rule:**

```sql
parse "Deny * " as protocol nodrop | parse regex "from\s(?<src_ip>\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})/(?<src_port>\d+)\s" nodrop | parse regex "to\s(?<dest_ip>\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})/(?<dest_port>\d+)\s" nodrop | "firewall-deny" as eventtype | "cisco-firewall" as event
```

## Cisco FWSM Deny in outFWSM Deny in out

**Rule Name:** Cisco FWSM Deny in outFWSM Deny in out  

**Log Type:** cisco fwsm  

**Sample Log:**

```
2014-10-14T13:52:28.454444-04:00 DEVICE-NAME %FWSM-3-106011: Deny inbound (No xlate) icmp src Outside:190.93.244.9 dst Outside:217.147.245.50 (type 0, code 0)
```

**Scope:**

```sql
_sourceCategory=networking/cisco/fwsm src dst ("Deny inbound" OR "Deny protocol")
```

**Extraction Rule:**

```sql
| parse "Deny protocol * " as protocol nodrop | parse ") * " as protocol nodrop 
| parse regex "%[A-Z]{4}-(?<severity>\d)-(?<msg_code>\d{6}):\s" nodrop 
| parse regex "src\s(?<src_dom>\S+):(?<src_ip>\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})" nodrop 
| parse regex "/(?<src_port>\d+)\s" nodrop 
| parse regex "dst\s(?<dest_dom>\S+):(?<dest_ip>\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})" nodrop 
| parse regex "/(?<dest_port>\d+)\s" nodrop 
| "firewall-deny" as eventtype 
| "cisco-firewall" as event
```
