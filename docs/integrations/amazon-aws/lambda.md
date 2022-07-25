---
id: lambda
title: AWS Lambda
sidebar_label: AWS Lambda
description: AWS Lambda
---

import useBaseUrl from '@docusaurus/useBaseUrl';

AWS Lambda allows you to run code without the burden of provisioning or managing servers. The AWS Lambda App is a unified logs and metrics app for monitoring operation and performance trends in the Lambda functions in your account.

The Sumo Logic AWS Lambda App uses the Lambda logs via CloudWatch, CloudWatch Metrics and the CloudTrail Lambda Data Events to visualize the operational and performance trends in all the Lambda functions in your account. The preconfigured dashboards provide insights into executions, memory and duration (including cold start) usage by function versions or aliases, errors, billed duration, function callers, IAM users and threat details.


### Log and metric types
The AWS Lambda app uses the following logs and metrics:

* [AWS CloudWatch Logs](https://docs.aws.amazon.com/lambda/latest/dg/monitoring-functions-logs.html)
* [CloudTrail Lambda Data Events](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/logging-management-and-data-events-with-cloudtrail.html#logging-data-events)
* [AWS Lambda metrics](https://docs.aws.amazon.com/lambda/latest/dg/monitoring-functions-metrics.html)


### Sample Log Messages
This section provides sample Amazon CloudWatch Log and CloudTrail Lambda Data Events log messages.

**Amazon CloudWatch Log**


```
{"id":"32563142671071560797760688825700039436306340248688066573","timestamp":1511808906799,"message":
"REPORT RequestId: cf75cfa3-fe16-11e5-9b16-e3e4c70845f2    Duration: 50.23 ms    Billed Duration:
100 ms     Memory Size: 128 MB    Max Memory Used: 24 MB ","requestID":null,"logStream"
:"2017/11/27/[Prod]1108153ced144f8cbb161aef096218d1","logGroup":"/aws/lambda/AWSlambda1"}
```


**CloudTrail Lambda Data Events**


```
{
   "eventVersion":"1.06",
   "userIdentity":{
      "type":"IAMUser",
      "principalId":"AIDAJ45Q7YFFAREXAMPLE",
      "arn":"arn:aws:iam::111111111111:user/duc",
      "accountId":"111111111111",
      "accessKeyId":"AKIAIOSFODNN7EXAMPLE",
      "userName":"duc"
   },
   "eventTime":"2017-11-27T19:05:20.524Z",
   "eventSource":"lambda.amazonaws.com",
   "eventName":"Invoke",
   "awsRegion":"us-west-1",
   "sourceIPAddress":"155.14.186.236",
   "userAgent":"aws-cli/1.11.129 Python/2.7.8 botocore/1.5.92",
   "requestParameters":{
      "invocationType":"RequestResponse",
      "functionName":"arn:aws:lambda:us-west-1:111111111111:function:function237",
      "clientContext":"ew0KICAiB99udGV6lGtleSIgOiAiY29udGV4dHZhbEXAMPLE=="
   },
   "responseElements":null,
   "additionalEventData":{
      "functionVersion":"arn:aws:lambda:us-west-1:111111111111:function:function238:$LATEST"
   },
   "requestID":"e38fb262-8f45-11e7-9845-e5f2f205b110",
   "eventID":"277a6881-66f4-4f3e-ade5-ba76255b7d93",
   "readOnly":false,
   "resources":[
      {
         "accountId":"111111111111",
         "type":"AWS::Lambda::Function",
         "ARN":"arn:aws:lambda:us-west-1:111111111111:function:function239"
      }
   ],
   "eventType":"AwsApiCall",
   "managementEvent":false,
   "recipientAccountId":"111111111111"
}
```



### Query sample  

**Requests by Function Versions (Based on CloudWatch logs)**


```
account={{account}} region={{region}} Namespace={{namespace}}
| json "message" nodrop | if (_raw matches "{*", message, _raw) as message
// | json "logStream", "logGroup" nodrop
| _sourceName as logStream | _sourceHost as logGroup
| parse regex field=message "REPORT\s+RequestId:\s+(?<RequestId>[^\s]+)\s+Duration:\s+(?<Duration>[^\s]+)\s+ms\s+Billed Duration:\s+(?<BilledDuration>[^\s]+)\s+ms\s+Memory\s+Size:\s+(?<MemorySize>[^\s]+)\s+MB\s+Max\s+Memory\s+Used:\s+(?<MaxMemoryUsed>[^\s]+)\s+MB"
| parse field=logstream "*/[*]*" as logstreamDate,version,logstreamID
| parse field=loggroup "/aws/lambda/*" as functionname
| where tolowercase(functionname) matches tolowercase("{{functionname}}")
| count by functionname, version
| transpose row functionname column version
```


**Top AWS Services Using Lambda Functions (Cloud Trail Logs Based)**


```
"lambda.amazonaws.com" "\"eventName\":\"Invoke\"" "\"type\":\"AWSService\"" account={{account}} Namespace={{namespace}} region={{region}}
| json "eventName", "eventSource", "awsRegion", "userAgent", "sourceIPAddress", "recipientAccountId", "userIdentity", "requestParameters", "additionalEventData" as event_name, event_source, Region, user_agent, src_ip, accountId, userIdentity, requestParameters, additionalEventData nodrop
| json field=userIdentity "type", "userName", "invokedBy", "arn" as caller_type, user_name, invoked_by, arn nodrop | json field=requestParameters "functionName", "resource" as functionname, resource nodrop | json field=additionalEventData "functionVersion" as func_version nodrop
| where event_name = "Invoke" and caller_type = "AWSService"
| parse regex field=functionname "\w+:\w+:\S+:[\w-]+:\S+:\S+:(?<functionname>[\S]+)$" nodrop
| parse field=resource "arn:aws:lambda:*:function:*" as f1, functionname2 nodrop
| if (isEmpty(functionname), functionname2, functionname) as functionname
| where tolowercase(functionname) matches tolowercase("{{functionname}}")
| parse regex field=func_version "\w+:\w+:\S+:[\w-]+:\S+:\S+:(?<function_version>[\S]+:[\S ]+)$" nodrop
| parse field=arn "arn:aws:*::*:*" as f1, f2, assumedroleuser nodrop
| if (isNull(user_name), invoked_by, user_name) as caller
| if (isNull(invoked_by), user_name, invoked_by) as caller
| if (isNull(caller), assumedroleuser, caller) as caller
| count as Invocations by caller
| top 10 caller by Invocations
```


**Error (Count)(Cloudwatch metric Based)**


```
namespace=aws/lambda metric=Errors statistic=Sum account=* region=* functionname=* Resource=* | su
```

## Collect Logs

## Install the App

## Viewing AWS Dashboards

<img src={useBaseUrl('img/integrations/amazon-aws/Overview.png')} alt="AWS API Gateway" />
