---
id: palo-alto-networks
title: Palo Alto Networks
description: Parse the common fields in your Palo Alto Network Logs using the FER template.
---


**Log Type**: Palo Alto Networks

**Template Description**: Parsing the common fields in your Palo Alto Networks log.

**Sample Log**:

```
Jul 13 20:39:44 1,2017/07/13 20:39:44,0009C101317,TRAFFIC,end,1,2017/07/13 20:39:44,10.183.12.108,10.183.51.49,0.0.0.0,0.0.0.0,WinDomain_AUTH_TO_DC,,sumo\mkwan,msrpc,vsys1,ENG_USER,ENG_INFRA,ivlan_712,ivlan_751,Syslog,2017/07/13 20:39:44,1070831,1,65123,135,0,0,0x0,tcp,allow,1194,644,550,12,2017/07/13 20:39:44,40,any,0,3297977305,0x0,10.0.0.0_10.255.255.255,10.0.0.0_10.255.255.255,0,7,5
```

**Parsing Rule**:

```sql
parse "*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*" as f1,recvTime,serialNum,type,subtype,f2,genTime,src_ip,dest_ip,natsrc_ip,natdest_ip,ruleName,src_user,dest_user,app,vsys,src_zone,dest_zone,ingress_if,egress_if,logProfile,f3,sessionID,repeatCnt,src_port,dest_port,natsrc_port,natdest_port,flags,protocol,action,misc,threatID,cat,severity,direction,seqNum,action_flags,src_loc,dest_loc,f4,content_type
```

**Resulting Fields**:

| Field | Description | Example |
|:--|:--|:--|
| f1            |   | Jul 13 20:39:44 1 |
| recvTime      |   | 2017/07/13 20:39:44 |
| serialNum     |   | 0009C101317 |
| type          |   | TRAFFIC |
| subtype       |   | end |
|  f2           |   |  1 |
|  genTime      |   |  2017/07/13 20:39:44 |
|  src_ip       |   |  10.183.12.108 |
|  dest_ip      |   |  10.183.51.49 |
|  natsrc_ip    |   | 0.0.0.0 |
|  natdest_ip   |   | 0.0.0.0  |
|  ruleName     |   |  WinDomain_AUTH_TO_DC |
| src_user      |   | sumologic\\tvadmin |
| dest_user     |   | sumo\\mkwan |
| app           |   | msrpc |
|  vsys         |   |  vsys1 |
|  src_zone     |   |  ENG_USER |
|  dest_zone    |   |  ENG_INFRA |
|  ingress_if   |   | ivlan_712  |
|  egress_if    |   |  ivlan_751 |
|  logProfile   |   |  Syslog |
|  f3           |   |  2017/07/13 20:39:44 |
|  sessionID    |   |  1070831 |
|  repeatCnt    |   |  1 |
|  src_port     |   |  65123 |
|  dest_port    |   |  135 |
|  natsrc_port  |   |  0 |
|  natdest_port |   |  0 |
|  flags        |   |  0x0 |
| protocol      |   |  tcp |
| action        |   |  allow |
| misc          |   |  1194 |
| threatID      |   |  644 |
|  cat          |   |  550 |
| severity      |   |  12 |
| direction     |   |  2017/07/13 20:39:44 |
| seqNum        |   |  40 |
|  action_flags |   |  any |
|  src_loc      |   |  0 |
|  dest_loc     |   |  3297977305 |
|  f4           |   |  0x0 |
|  content_type |   |  10.0.0.0_10.255.255.255,10.0.0.0_10.255.255.255,0,7,5 |
