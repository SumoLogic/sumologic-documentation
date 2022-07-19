---
id: ec2-cw-metrics
title: AWS EC2 CW Metrics
sidebar_label: AWS EC2 CW Metrics
description: AWS EC2 CW Metrics
---

Amazon Elastic Compute Cloud (Amazon EC2) provides scalable computing capacity in the Amazon Web Services (AWS) Cloud. You can use Amazon EC2 to launch as many or as few virtual servers as you need, configure security and networking, and manage storage.

The Sumo Logic App for AWS EC2 (CloudWatch Metrics) allows you to collect your EC2 instance metrics and display them using predefined dashboards. The App provides dashboards to display analysis of EC2 instance metrics for CPU, disk, network, EBS, and Health Status Check. Also, it provides detailed insights into all cloudtrail audit events associated with EC2 instances and specifically helps identify changes, errors, and user activities.


### Metrics Type

For details on the metrics of AWS EC2, see [here](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-cloudwatch.html).


#### Sample Cloud Trail log for EC2


```
{"eventVersion":"1.08","userIdentity":{"type":"IAMUser","principalId":"AIDAJ7LGGLTBHHDFNMPSM","arn":"arn:aws:iam::9XXXX34567898:user/cloudhealthuser","accountId":"9XXXXXXX898","accessKeyId":"AKIAXXXXXX22BUTQ","userName":"cloudhealthuser"},"eventTime":"2022-06-30T08:05:38Z","eventSource":"ec2.amazonaws.com","eventName":"DescribeReservedInstancesListings","awsRegion":"us-east-1","sourceIPAddress":"177.20.215.222","userAgent":"aws-sdk-ruby2/2.11.447 jruby/2.5.7 java cloudhealth","errorCode":"Client.OptInRequired","errorMessage":"AccountId '9XXXXXX898', You are not authorized to use the requested product. Please complete the seller registration null.","requestParameters":{"reservedInstancesListingSet":{},"reservedInstancesSet":{},"filterSet":{}},"responseElements":null,"requestID":"fe609b44-dbc5-454b-8f72-9475d1639441","eventID":"6fc6df43-1ba1-4eb3-948a-0aebc569c024","readOnly":true,"eventType":"AwsApiCall","managementEvent":true,"recipientAccountId":"9XXXXX7898","eventCategory":"Management","tlsDetails":{"tlsVersion":"TLSv1.2","cipherSuite":"ECDHE-RSA-XXXXX-SHA","clientProvidedHostHeader":"ec2.us-west-1.amazonaws.com"}}
```



## Query sample 

**CPU utilization (Cloudwatch metric)**


```
account=* region=* namespace=aws/ec2 instanceid=* metric=CPUUtilization Statistic=average | avg
```


**Top 10 Error Codes (Cloudtrail log-based)**


```
account={{account}} region={{region}} namespace={{namespace}} eventname eventsource "ec2.amazonaws.com" errorCode
| json "eventSource", "awsRegion", "requestParameters", "responseElements", "recipientAccountId" as event_source, region, requestParameters, responseElements, accountid nodrop
| json "userIdentity", "eventName", "sourceIPAddress", "userAgent", "eventType", "requestID", "errorCode", "errorMessage", "eventCategory", "managementEvent" as userIdentity, event_name, src_ip, user_agent, event_type, request_id, error_code, error_message, event_category, management_event nodrop
| where event_source = "ec2.amazonaws.com"
| "aws/ec2" as namespace
| json field=userIdentity "type", "principalId", "arn", "userName", "accountId" nodrop
| json field=userIdentity "sessionContext.attributes.mfaAuthenticated" as mfaAuthenticated nodrop
| parse field=arn ":assumed-role/*" as user nodrop  
| parse field=arn "arn:aws:iam::*:*" as accountId, user nodrop
| json field=requestParameters "instanceType", "instancesSet", "instanceId", "DescribeInstanceCreditSpecificationsRequest.InstanceId.content" as req_instancetype, req_instancesSet, req_instanceid_1, req_instanceid_2 nodrop
| json field=req_instancesSet "item", "items" as req_instancesSet_item, req_instancesSet_items nodrop
| parse regex field=req_instancesSet_item "\"instanceId\":\s*\"(?<req_instanceid_3>.*?)\"" nodrop
| parse regex field=req_instancesSet_items "\"instanceId\":\s*\"(?<req_instanceid_4>.*?)\"" nodrop
| json field=responseElements "instancesSet.items" as res_responseElements_items nodrop
| parse regex field=res_responseElements_items "\"instanceType\":\s*\"(?<res_instanceType>.*?)\"" nodrop
| parse regex field=res_responseElements_items "\"instanceId\":\s*\"(?<res_instanceid>.*?)\"" nodrop
| if (!isBlank(req_instanceid_1), req_instanceid_1,  if (!isBlank(req_instanceid_2), req_instanceid_2, if (!isBlank(req_instanceid_3), req_instanceid_3, if (!isBlank(req_instanceid_4), req_instanceid_4, "")))) as req_instanceid
| if (!isBlank(req_instanceid), req_instanceid, res_instanceid) as instanceid
| if (!isBlank(req_instancetype), req_instancetype, res_instancetype) as instanceType
| if (isEmpty(error_code), "Success", "Failure") as event_status
| if (isEmpty(userName), user, userName) as user
| tolowercase(instanceid) as instanceid
| count as count by error_code | sort by count, error_code asc | limit 10
```

## Collect Logs and Metrics

## Install the App
