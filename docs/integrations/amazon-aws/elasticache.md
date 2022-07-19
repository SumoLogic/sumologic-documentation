---
id: elasticache
title: Amazon Elasticache
sidebar_label: Amazon Elasticache
description: Amazon Elasticache
---

The Sumo Logic App for Amazon ElastiCache allows you to set up, run, and scale popular open-source compatible in-memory data stores in the cloud.

The Amazon ElastiCache dashboards provide visibility into key event and performance analytics that enable proactive diagnosis and response to system and environment issues. Use the preconfigured dashboards for at-a-glance analysis of event status trends, locations, successes and failures, as well as system health and performance metrics. The dashboards also have additional performance insights for Redis clusters.


## Log and Metric Types  
The Amazon ElastiCache app uses the following logs and metrics:


* [Amazon Elasticache Host-Level Metrics for individual cache nodes](https://docs.aws.amazon.com/AmazonElastiCache/latest/red-ug/CacheMetrics.HostLevel.html)
* [Amazon Elasticache Cache Engine metrics](https://docs.aws.amazon.com/AmazonElastiCache/latest/red-ug/CacheMetrics.Redis.html)
* [CloudTrail Amazon ElastiCache Data Event](https://docs.aws.amazon.com/AmazonElastiCache/latest/mem-ug/logging-using-cloudtrail.html)


### Sample CloudTrail Log Message

```
{"eventVersion":"1.05","userIdentity":{"type":"IAMUser","principalId":"A12345678904QEWUABG5Q","arn":
"arn:aws:iam::123456789038:user/myuser","accountId":"123456789038","accessKeyId":"A1234567890FHCUQYQRM","userName":"myuser",
"sessionContext":{"attributes":{"mfaAuthenticated":"true","creationDate":"2018-10-29T07:08:50Z"}},"invokedBy":
"signin.amazonaws.com"},"eventTime":"2018-10-29T08:38:13Z","eventSource":"elasticache.amazonaws.com","eventName":
"CreateCacheSubnetGroup","awsRegion":"us-west-1","sourceIPAddress":"29.28.30.17","userAgent":"signin.amazonaws.com",
"requestParameters":{"cacheSubnetGroupName":"myuser-redis-subnet-grp1","subnetIds":["subnet-b33fc55e"]},"responseElements":
{"cacheSubnetGroupDescription":" ","vpcId":"vpc-b12fc345","subnets":[{"subnetAvailabilityZone":{"name":"us-west-1a"},
"subnetIdentifier":"subnet-b33fc55e"}],"cacheSubnetGroupName":"myuser-redis-subnet-grp1"},"requestID":
"c6a79737-1234-5678-bb74-9f27f56e6306","eventID":"70c2c865-1234-4567-893c-9800b91e2502","eventType":"AwsApiCall",
"recipientAccountId":"123456789038"}
```



### Query sample (Metric based)

**Average Engine CPU Utilization by cacheclusterid and cachenodeid**


```
account=* region=* namespace=aws/elasticache metric=EngineCPUUtilization statistic=Average CacheClusterId=* CacheNodeId=* | avg by CacheClusterId, CacheNodeId, account, region, namespace
```



### Query sample (CloudTrail Log based)

**ElastiCache Node Reboot Events**


```
account={{account}} region={{region}} namespace={{namespace}} "\"eventSource\":\"elasticache.amazonaws.com\"" (Reboot* or CacheNodesRebooted)
| json "userIdentity", "eventSource", "eventName", "awsRegion", "sourceIPAddress", "userAgent", "eventType", "recipientAccountId", "requestParameters", "responseElements", "requestID", "errorCode", "errorMessage" as userIdentity, event_source, event_name, region, src_ip, user_agent, event_type, recipient_account_id, requestParameters, responseElements, request_id, error_code, error_message nodrop
| where event_source = "elasticache.amazonaws.com" and (event_name matches "Reboot*" or event_name="CacheNodesRebooted")
| json field=userIdentity "type", "principalId", "arn", "userName", "accountId" nodrop
| json field=userIdentity "sessionContext.attributes.mfaAuthenticated" as mfaAuthenticated nodrop
| json field=requestParameters "replicationGroupId", "engine", "engineVersion", "cacheClusterId" as req_replicationGroupId, req_engine, req_engineVersion, req_cacheClusterId nodrop
| json field=responseElements "replicationGroupId", "engine", "engineVersion", "status", "cacheClusterId", "res_cacheClusterStatus", "snapshotRetentionLimit" as res_replicationGroupId, res_engine, res_engineVersion, res_status, res_cacheClusterId, res_cacheClusterStatus, snapshotretentionlimit  nodrop
| json field=responseElements "autoMinorVersionUpgrade", "cacheNodeType", "numCacheNodes" as auto_minorversion_upgrade, cachenodetype, numcachenodes nodrop
| parse field=arn ":assumed-role/*" as user nodrop  
| parse field=arn "arn:aws:iam::*:*" as accountId, user nodrop
| if (isEmpty(error_code), "Success", "Failure") as eventStatus
| if (isEmpty(userName), user, userName) as user
| if (isEmpty(req_replicationGroupId), res_replicationGroupId, req_replicationGroupId) as replicationgroupid
| if (isEmpty(req_engine), res_engine, req_engine) as engine
| if (isEmpty(req_engineVersion), res_engineVersion, req_engineVersion) as engine_version
| if (isEmpty(req_cacheClusterId), res_cacheClusterId, req_cacheClusterId) as cacheclusterid
| eventStatus as status
| where (tolowercase(cacheclusterid) matches tolowercase("{{CacheClusterId}}")) or IsBlank(cacheclusterid)
| timeslice 1s
| count as Count by _timeslice, event_name, src_ip, user, type, request_id, user_agent, cacheclusterid, replicationgroupid // , engine, engine_version, snapshotretentionlimit, status, auto_minorversion_upgrade, cachenodetype, numcachenodes
| fields _timeslice, event_name, src_ip, user, type, request_id, user_agent, cacheclusterid, replicationgroupid // , engine, engine_version, snapshotretentionlimit, status, auto_minorversion_upgrade, cachenodetype, numcachenodes, Count
| sort by _timeslice
```

## Collect Logs and Metrics

## Install the App
