---
id: aws-cloudtrail-logs
title: AWS CloudTrail Logs
description: Parse the common fields in your AWS CloudTrail Logs using the FER template.
---


**Log Type**: AWS CloudTrail

**Template Description**: Parsing the common fields in your AWS
CloudTrail log.

**Sample Log**:

```json
{  
   "eventVersion":"1.0",
   "userIdentity":{  
      "type":"IAMUser",
      "principalId":"AJNVDKSMCKLNVSJVNVNFJVNF",
      "arn":"arn:aws:iam::4574573938433:user/bsmith",
      "accountId":"4574573938433",
      "accessKeyId":"ADNFVZBRXERAF32GHCGXQ",
      "userName":"bsmith",
      "sessionContext":{  
         "attributes":{  
            "creationDate":"Wed Oct 23 14:36:48 UTC 2013",
            "mfaAuthenticated":"false"
         }
      }
   },
   "eventTime":"2017-07-13T18:21:12Z",
   "eventSource":"IAM",
   "eventName":"GetAccountPasswordPolicy",
   "awsRegion":"us-west-2",
   "sourceIPAddress":"34.87.4.6",
   "userAgent":"AWSConsole",
   "errorCode":"AccessDenied",
   "errorMessage":"User: arn:aws:iam::4574573938433:user/bsmith is not authorized to perform: iam:GetAccountPasswordPolicy",
   "requestParameters":null,
   "responseElements":null
}
```

**Parsing Rule:**

```sql
parse "eventSource\":\"*\"" as event_source
| parse "\"sourceIPAddress\":\"*\"" as source_ipaddress
| parse "\"eventName\":\"*\"" as event_name
| parse "awsRegion\":\"*\"" as aws_Region
| parse "\"userName\":\"*\"" as user
```

**Resulting Fields:**

| Field | Description | Example |
|:--|:--|:--|
| event_source | The service that the request was made to | IAM |
| source_ipaddress | The IP address that the request was made from | 34.87.4.6 |
| event_name | The requested action, which is one of the actions in the API for that service | GetAccountPasswordPolicy |
| aws_Region | The AWS region that the request was made to | us-west-2 |
| user | The friendly name of the identity that made the call | bsmith |

 
