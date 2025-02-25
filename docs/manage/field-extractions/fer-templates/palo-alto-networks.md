---
id: palo-alto-networks
title: Palo Alto Networks
description: Parse the common fields in your Palo Alto Network Logs using the FER template.
---


**Log Type**: Palo Alto Networks

**Template Description**: Parsing the common fields in your Palo Alto Networks log.

**Sample Log**:

```
Jul 13 20:39:44 1,2017/07/13 20:39:44,0009C101317,TRAFFIC,end,1,2017/07/13 20:39:44,10.183.12.108,10.183.51.49,0.0.0.0,0.0.0.0,WinDomain_AUTH_TO_DC,,sumo\mkwan,msrpc,vsys1,ENG_USER,ENG_INFRA,ivlan_712,ivlan_751,Syslog,2017/07/13 20:39:44,1070831,1,65123,135,0,0,0x0,tcp,allow,1194,644,550,12,1,40,any,0,3297977305,0x0,10.0.0.0_10.255.255.255,10.0.0.0_10.255.255.255,0,7,5
```

**Parsing Rule**:

```sql
parse "*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*,*" as f1,recvTime,serialNum,type,subtype,f2,genTime,src_ip,dest_ip,natsrc_ip,natdest_ip,ruleName,src_user,dest_user,app,vsys,src_zone,dest_zone,ingress_if,egress_if,logProfile,f3,sessionID,repeatCnt,src_port,dest_port,natsrc_port,natdest_port,flags,protocol,action,misc,threatID,cat,severity,direction,seqNum,action_flags,src_loc,dest_loc,f4,content_type
```

**Resulting Fields**:

| Field | Description | Example |
|:--|:--|:--|
| f1            | The timestamp of the log. | Jul 13 20:39:44 1 |
| recvTime      | Time the log was received.  | 2017/07/13 20:39:44 |
| serialNum     | Serial number of the firewall that generated the log.  | 0009C101317 |
| type          | The type of log.  | TRAFFIC |
| subtype       | Subtype of the system log.  | end |
|  f2           | Catchall field. |  1 |
|  genTime      | Time the log was generated on the dataplane.  |  2017/07/13 20:39:44 |
|  src_ip       | The source IP address.  |  10.183.12.108 |
|  dest_ip      | The destination IP address.  |  10.183.51.49 |
|  natsrc_ip    | The source IP address after Network Address Translation (NAT).  | 0.0.0.0 |
|  natdest_ip   | The destination IP address after NAT.  | 0.0.0.0  |
|  ruleName     | The name of the rule that the session matched.  |  WinDomain_AUTH_TO_DC |
| src_user      | Username of the user who initiated the session.  | sumologic\\tvadmin |
| dest_user     | Username of the user to which the session was destined.  | sumo\\mkwan |
| app           | Application associated with the session.  | msrpc |
|  vsys         | Virtual system associated with the session.  |  vsys1 |
|  src_zone     | The zone from which the session was sourced.  |  ENG_USER |
|  dest_zone    | The zone from which the session was destined.  |  ENG_INFRA |
|  ingress_if   | The interface from which the session was sourced.  | ivlan_712  |
|  egress_if    | The interface from which the session was destined.  |  ivlan_751 |
|  logProfile   | The log profile associated with the rule.  |  Syslog |
|  f3           | Catchall field.  |  2017/07/13 20:39:44 |
|  sessionID    | An internal numerical identifier applied for each session.  |  1070831 |
|  repeatCnt    | Number of sessions with the same Source IP, Destination IP, Application, and Subtype seen within 5 seconds.  |  1 |
|  src_port     | Source port utilized by the session.  |  65123 |
|  dest_port    | Destination port utilized by the session.  |  135 |
|  natsrc_port  | Post-NAT source port.  |  0 |
|  natdest_port | Post-NAT destination port.  |  0 |
|  flags        | A 32-bit field that provides details about the session.  |  0x0 |
| protocol      | IP protocol associated with the session.  |  tcp |
| action        | The action taken for the session. |  allow |
| misc          | Field with variable length(URL/Filename).  |  1194 |
| threatID      | Palo Alto Networks identifier for known and custom threats.  |  644 |
|  cat          | For **URL** Subtype, it is the URL Category; For **WildFire** subtype, it is the verdict on the file that is either ‘malware’, ‘phishing’, ‘grayware’, or ‘benign’; For other subtypes, the value is ‘any’.  |  550 |
| severity      | Severity associated with the threat. |  12 |
| direction     | Indicates the direction of the attack. It can be client to server or from server to client. <br/> `0` - Indicates the direction of threat is from client to server. <br/> `1` - Indicates the direction of threat is from server to client.  |  1 |
| seqNum        | Sequentially incremented identifier.  |  40 |
|  action_flags | A bit field indicating if the log was forwarded to Panorama.  |  any |
|  src_loc      | Source country or Internal region for private addresses.  |  0 |
|  dest_loc     | Destination country or Internal region for private addresses.  |  3297977305 |
|  f4           | Catchall field.  |  0x0 |
|  content_type | Content type of the HTTP response data.  |  10.0.0.0_10.255.255.255,10.0.0.0_10.255.255.255,0,7,5 |
