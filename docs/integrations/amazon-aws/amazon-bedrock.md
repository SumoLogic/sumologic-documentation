---
id: amazon-bedrock
title: Amazon Bedrock
sidebar_label: Amazon Bedrock
description: Learn about the collection process for the Amazon Bedrock service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/amazon-aws/amazon-bedrock-logo.png')} alt="Thumbnail icon" width="50"/>

[Amazon Bedrock Service](https://aws.amazon.com/bedrock/) is a fully managed service that offers a choice of high-performing foundation models (FMs) from leading AI companies like AI21 Labs, Anthropic, Cohere, Meta, Mistral AI, Stability AI, and Amazon through a single API, along with a broad set of capabilities you need to build generative AI applications with security, privacy, and responsible AI. Using Amazon Bedrock, you can easily experiment with and evaluate top FMs for your use case, privately customize them with your data using techniques such as fine-tuning and Retrieval Augmented Generation (RAG), and build agents that execute tasks using your enterprise systems and data sources. Since Amazon Bedrock is serverless, you don't have to manage any infrastructure, and you can securely integrate and deploy generative AI capabilities into your applications using the AWS services you are already familiar with.

The Sumo Logic Amazon Bedrock app dashboards offer insights into CloudTrail, CloudWatch Logs, and performance metrics for your Amazon Bedrock service. These preconfigured dashboards enable you to monitor logs and the runtime performance metrics of your Amazon Bedrock.

## Log and metrics types  

The Amazon Bedrock app uses the following logs and metrics:
* [Monitor Amazon Bedrock API calls using CloudTrail](https://docs.aws.amazon.com/bedrock/latest/userguide/logging-using-cloudtrail.html).
* [Monitor model invocation using CloudWatch Logs](https://docs.aws.amazon.com/bedrock/latest/userguide/model-invocation-logging.html).
* [Amazon Bedrock runtime metrics](https://docs.aws.amazon.com/bedrock/latest/userguide/monitoring.html#runtime-cloudwatch-metrics).

### Sample CloudTrail log message

<details>
<summary>Click to expand</summary>

```json title="CloudTrail"
{
  "eventVersion": "1.10",
  "userIdentity": {
    "type": "IAMUser",
    "principalId": "AIDAIHL7V6WZEXAMPLEVU",
    "arn": "arn:aws:iam::956882123456:user/himan",
    "accountId": "956882123456",
    "accessKeyId": "AKIA12345EXAMPLE67890",
    "userName": "himan"
  },
  "eventTime": "2024-10-01T11:52:37Z",
  "eventSource": "bedrock.amazonaws.com",
  "eventName": "InvokeModel",
  "awsRegion": "us-west-2",
  "sourceIPAddress": "182.70.74.235",
  "userAgent": "Boto3/1.34.162 md/Botocore#1.34.162 ua/2.0 os/macos#22.6.0 md/arch#x86_64 lang/python#3.12.0 md/pyimpl#CPython cfg/retry-mode#legacy Botocore/1.34.162",
  "requestParameters": {
    "modelId": "anthropic.claude-3-5-sonnet-20240620-v1:0"
  },
  "responseElements": null,
  "requestID": "0873fdcf-2c18-413a-9288-7e9bbbb8f29d",
  "eventID": "a8d388e2-3111-44bf-b78f-b0e263dc3d25",
  "readOnly": true,
  "eventType": "AwsApiCall",
  "managementEvent": true,
  "recipientAccountId": "956882123456",
  "eventCategory": "Management",
  "tlsDetails": {
    "tlsVersion": "TLSv1.3",
    "cipherSuite": "TLS_AES_128_GCM_SHA256",
    "clientProvidedHostHeader": "bedrock-runtime.us-west-2.amazonaws.com"
  }
}
```
</details>

### Sample CloudWatch logs

<details>
<summary>Click to expand</summary>

```json title="CloudWatch"
{
  "schemaType": "ModelInvocationLog",
  "schemaVersion": "1.0",
  "timestamp": "2024-10-01T11:50:35Z",
  "accountId": "956882123456",
  "identity": {
    "arn": "arn:aws:iam::956882123456:user/himan"
  },
  "region": "us-west-2",
  "requestId": "a3517f6a-7f98-4dfe-94dd-ad7340c8dce5",
  "operation": "InvokeModel",
  "modelId": "anthropic.claude-3-5-sonnet-20240620-v1:0",
  "input": {
    "inputContentType": "application/json",
    "inputBodyJson": {
      "max_tokens": 4000,
      "temperature": 0.2,
      "stop_sequences": [
        "\n\nHuman:"
      ],
      "tools": [
        {
          "name": "QueryResponseArray",
          "description": "",
          "input_schema": {
            "properties": {
              "query_response": {
                "default": null,
                "description": "Json object response for each query",
                "items": {
                  "properties": {
                    "location": {
                      "default": null,
                      "description": "Location of the Sumo Logic query string inside &lt;location&gt; tag",
                      "type": "string"
                    },
                    "original_query_string": {
                      "default": null,
                      "description": "Original input Sumo Logic query string inside &lt;query&gt; tag",
                      "type": "string"
                    },
                    "optimized_query_string": {
                      "default": null,
                      "description": "Optimized Sumo Logic query string, if no optimization is required then the value becomes NOCHANGE",
                      "type": "string"
                    },
                    "review": {
                      "default": null,
                      "description": "Explanations of optimizations performed in the optimized query, if no optimization is required then the value becomes NOCHANGE",
                      "type": "string"
                    },
                    "priority": {
                      "default": 0,
                      "description": "rewards score",
                      "type": "integer"
                    }
                  },
                  "type": "object"
                },
                "type": "array"
              }
            },
            "type": "object"
          }
        }
      ],
      "tool_choice": {
        "type": "tool",
        "name": "QueryResponseArray"
      },
      "anthropic_version": "bedrock-2023-05-31",
      "messages": [
        {
          "role": "user",
          "content": "```\n{'&lt;location&gt;Dashboard: IIS - Threat Analysis Panel: Threat by Malicious Confidence QueryKey: A&lt;/location&gt;&lt;query&gt;sumo.datasource=iis deployment.environment={{deployment.environment}} webengine.cluster.name={{webengine.cluster.name}} webengine.node.name={{webengine.node.name}} | json \"log\" as _rawlog nodrop \\\\n| if (isEmpty(_rawlog), _raw, _rawlog) as iis_log_message\\\\n| parse regex field=iis_log_message \"(?&lt;server_ip&gt;\\\\d{1,3}\\\\.\\\\d{1,3}\\\\.\\\\d{1,3}\\\\.\\\\d{1,3}) (?&lt;method&gt;\\\\S+?) (?&lt;cs_uri_stem&gt;\\\\S+?) (?&lt;cs_uri_query&gt;\\\\S+?) (?&lt;s_port&gt;\\\\S+?) (?&lt;cs_username&gt;\\\\S+?) (?&lt;c_ip&gt;\\\\S+?) (?&lt;cs_User_Agent&gt;\\\\S+?) (?&lt;cs_referer&gt;\\\\S+?) (?&lt;sc_status&gt;\\\\S+?) (?&lt;sc_substatus&gt;\\\\S+?) (?&lt;sc_win32_status&gt;\\\\S+?) (?&lt;time_taken&gt;\\\\S+?)$\" \\\\n| count by c_ip\\\\n| where !isPrivateIP(c_ip)\\\\n| lookup type, actor, raw, threatlevel as malicious_confidence from sumo://threat/cs on threat=c_ip \\\\n| json field=raw \"labels[*].name\" as label_name\\\\n| replace(label_name, \"\\\\\\\\\\\\/\",\"-&gt;\") as label_name\\\\n| replace(label_name, \"\\\\\\\\\"\",\" \") as label_name\\\\n| where type=\"ip_address\" and !isNull(malicious_confidence)\\\\n| if (isEmpty(actor), \"Unassigned\", actor) as actor\\\\n| sum(_count) as threatCount by malicious_confidence\\\\n| sort by malicious_confidence,threatCount  asc&lt;/query&gt;\\n&lt;location&gt;Dashboard: IIS - Threat Analysis Panel: Threat Table QueryKey: A&lt;/location&gt;&lt;query&gt;sumo.datasource=iis deployment.environment={{deployment.environment}} webengine.cluster.name={{webengine.cluster.name}} webengine.node.name={{webengine.node.name}} | json \"log\" as _rawlog nodrop \\\\n| if (isEmpty(_rawlog), _raw, _rawlog) as iis_log_message\\\\n| parse regex field=iis_log_message \"(?&lt;server_ip&gt;\\\\d{1,3}\\\\.\\\\d{1,3}\\\\.\\\\d{1,3}\\\\.\\\\d{1,3}) (?&lt;method&gt;\\\\S+?) (?&lt;cs_uri_stem&gt;\\\\S+?) (?&lt;cs_uri_query&gt;\\\\S+?) (?&lt;s_port&gt;\\\\S+?) (?&lt;cs_username&gt;\\\\S+?) (?&lt;c_ip&gt;\\\\S+?) (?&lt;cs_User_Agent&gt;\\\\S+?) (?&lt;cs_referer&gt;\\\\S+?) (?&lt;sc_status&gt;\\\\S+?) (?&lt;sc_substatus&gt;\\\\S+?) (?&lt;sc_win32_status&gt;\\\\S+?) (?&lt;time_taken&gt;\\\\S+?)$\" \\\\n| count c_ip, sc_status, cs_uri_stem, cs_referer, cs_User_Agent\\\\n| where !isPrivateIP(c_ip)\\\\n| lookup type, actor, raw, threatlevel as malicious_confidence from sumo://threat/cs on threat=c_ip \\\\n| json field=raw \"labels[*].name\" as label_name\\\\n| replace(label_name, \"\\\\\\\\\\\\/\",\"-&gt;\") as label_name\\\\n| replace(label_name, \"\\\\\\\\\"\",\" \") as label_name\\\\n| where  type=\"ip_address\" and !isNull(malicious_confidence)\\\\n| if (isEmpty(actor), \"Unassigned\", actor) as Actor\\\\n| count by malicious_confidence, Actor,c_ip, sc_status, cs_uri_stem, cs_referer, cs_User_Agent\\\\n| sort by _count\\\\n| _count as count\\\\n| limit 50\\\\n| fields malicious_confidence, Actor, c_ip,sc_status, cs_uri_stem, cs_referer, cs_User_Agent&lt;/query&gt;\\n&lt;location&gt;Dashboard: IIS - Threat Analysis Panel: Threat Count QueryKey: A&lt;/location&gt;&lt;query&gt;sumo.datasource=iis deployment.environment={{deployment.environment}} webengine.cluster.name={{webengine.cluster.name}} webengine.node.name={{webengine.node.name}} | json \"log\" as _rawlog nodrop \\\\n| if (isEmpty(_rawlog), _raw, _rawlog) as iis_log_message\\\\n| parse regex field=iis_log_message \"(?&lt;server_ip&gt;\\\\d{1,3}\\\\.\\\\d{1,3}\\\\.\\\\d{1,3}\\\\.\\\\d{1,3}) (?&lt;method&gt;\\\\S+?) (?&lt;cs_uri_stem&gt;\\\\S+?) (?&lt;cs_uri_query&gt;\\\\S+?) (?&lt;s_port&gt;\\\\S+?) (?&lt;cs_username&gt;\\\\S+?) (?&lt;c_ip&gt;\\\\S+?) (?&lt;cs_User_Agent&gt;\\\\S+?) (?&lt;cs_referer&gt;\\\\S+?) (?&lt;sc_status&gt;\\\\S+?) (?&lt;sc_substatus&gt;\\\\S+?) (?&lt;sc_win32_status&gt;\\\\S+?) (?&lt;time_taken&gt;\\\\S+?)$\" \\\\n| count by c_ip\\\\n| where !isPrivateIP(c_ip)\\\\n| lookup type, actor, raw, threatlevel as malicious_confidence from sumo://threat/cs on threat=c_ip \\\\n| json field=raw \"labels[*].name\" as label_name\\\\n| replace(label_name, \"\\\\\\\\\\\\/\",\"-&gt;\") as label_name\\\\n| replace(label_name, \"\\\\\\\\\"\",\" \") as label_name\\\\n| where type=\"ip_address\" and !isNull(malicious_confidence)\\\\n| if (isEmpty(actor), \"Unassigned\", actor) as actor\\\\n| sum(_count) as threatCount&lt;/query&gt;\\n&lt;location&gt;Dashboard: IIS - Visitor Access Types Panel: Requests by App Over Time QueryKey: A&lt;/location&gt;&lt;query&gt;sumo.datasource=iis deployment.environment={{deployment.environment}} webengine.cluster.name={{webengine.cluster.name}} webengine.node.name={{webengine.node.name}} | json \"log\" as _rawlog nodrop \\\\n| if (isEmpty(_rawlog), _raw, _rawlog) as iis_log_message\\\\n| parse regex field=iis_log_message \"(?&lt;server_ip&gt;\\\\d{1,3}\\\\.\\\\d{1,3}\\\\.\\\\d{1,3}\\\\.\\\\d{1,3}) (?&lt;method&gt;\\\\S+?) (?&lt;cs_uri_stem&gt;\\\\S+?) (?&lt;cs_uri_query&gt;\\\\S+?) (?&lt;s_port&gt;\\\\S+?) (?&lt;cs_username&gt;\\\\S+?) (?&lt;c_ip&gt;\\\\S+?) (?&lt;cs_User_Agent&gt;\\\\S+?) (?&lt;cs_referer&gt;\\\\S+?) (?&lt;sc_status&gt;\\\\S+?) (?&lt;sc_substatus&gt;\\\\S+?) (?&lt;sc_win32_status&gt;\\\\S+?) (?&lt;time_taken&gt;\\\\S+?)$\"\\\\n| parse regex field=cs_uri_stem \"/(?&lt;app&gt;[^\\\\./]+?)(?:/|$)\" nodrop\\\\n| if (isEmpty(app), cs_uri_stem, app) as app\\\\n| timeslice 1m \\\\n| count by _timeslice, app \\\\n| transpose row _timeslice column app&lt;/query&gt;\\n&lt;location&gt;Dashboard: IIS - Visitor Access Types Panel: Requests Stats by Client IP QueryKey: A&lt;/location&gt;&lt;query&gt;sumo.datasource=iis deployment.environment={{deployment.environment}} webengine.cluster.name={{webengine.cluster.name}} webengine.node.name={{webengine.node.name}} | json \"log\" as _rawlog nodrop \\\\n| if (isEmpty(_rawlog), _raw, _rawlog) as iis_log_message\\\\n| parse regex field=iis_log_message \"(?&lt;server_ip&gt;\\\\d{1,3}\\\\.\\\\d{1,3}\\\\.\\\\d{1,3}\\\\.\\\\d{1,3}) (?&lt;method&gt;\\\\S+?) (?&lt;cs_uri_stem&gt;\\\\S+?) (?&lt;cs_uri_query&gt;\\\\S+?) (?&lt;s_port&gt;\\\\S+?) (?&lt;cs_username&gt;\\\\S+?) (?&lt;c_ip&gt;\\\\S+?) (?&lt;cs_User_Agent&gt;\\\\S+?) (?&lt;cs_referer&gt;\\\\S+?) (?&lt;sc_status&gt;\\\\S+?) (?&lt;sc_substatus&gt;\\\\S+?) (?&lt;sc_win32_status&gt;\\\\S+?) (?&lt;time_taken&gt;\\\\S+?)$\"\\\\n| if(sc_status matches \"2*\", 1, 0) as successes \\\\n| if(sc_status matches \"3*\", 1, 0) as redirects \\\\n| if(sc_status matches \"4*\", 1, 0) as client_errors\\\\n| if(sc_status matches \"5*\", 1, 0) as server_errors \\\\n| withtime _messagetime\\\\n| count as Requests, most_recent(_messagetime_withtime), least_recent(_messagetime_withtime), count_distinct(cs_uri_stem) as UniquePagesVisited, sum(successes) as successes, sum(redirects) as redirects, sum(client_errors) as client_errors,  sum(server_errors) as server_errors by c_ip\\\\n| formatDate(fromMillis(_mostrecent), \"MM/dd/yyyy HH:mm:ss:SSS Z\") as LatestRequest\\\\n| formatDate(fromMillis(_leastrecent), \"MM/dd/yyyy HH:mm:ss:SSS Z\") as EarliestRequest\\\\n| top 20 c_ip, LatestRequest, EarliestRequest, Requests, UniquePagesVisited, successes, redirects, client_errors, server_errors by Requests, UniquePagesVisited&lt;/query&gt;\\n&lt;location&gt;Dashboard: IIS - Visitor Access Types Panel: Top Apps by Request QueryKey: A&lt;/location&gt;&lt;query&gt;sumo.datasource=iis deployment.environment={{deployment.environment}} webengine.cluster.name={{webengine.cluster.name}} webengine.node.name={{webengine.node.name}} | json \"log\" as _rawlog nodrop \\\\n| if (isEmpty(_rawlog), _raw, _rawlog) as iis_log_message\\\\n| parse regex field=iis_log_message \"(?&lt;server_ip&gt;\\\\d{1,3}\\\\.\\\\d{1,3}\\\\.\\\\d{1,3}\\\\.\\\\d{1,3}) (?&lt;method&gt;\\\\S+?) (?&lt;cs_uri_stem&gt;\\\\S+?) (?&lt;cs_uri_query&gt;\\\\S+?) (?&lt;s_port&gt;\\\\S+?) (?&lt;cs_username&gt;\\\\S+?) (?&lt;c_ip&gt;\\\\S+?) (?&lt;cs_User_Agent&gt;\\\\S+?) (?&lt;cs_referer&gt;\\\\S+?) (?&lt;sc_status&gt;\\\\S+?) (?&lt;sc_substatus&gt;\\\\S+?) (?&lt;sc_win32_status&gt;\\\\S+?) (?&lt;time_taken&gt;\\\\S+?)$\"\\\\n| parse regex field=cs_uri_stem \"/(?&lt;app&gt;[^\\\\./]+?)(?:/|$)\" nodrop\\\\n| if (isEmpty(app), cs_uri_stem, app) as app\\\\n| count as Requests by app \\\\n| top 20 app by Requests, app asc&lt;/query&gt;\\n&lt;location&gt;Dashboard: IIS - Visitor Access Types Panel: Cumulative User Request Percentiles QueryKey: A&lt;/location&gt;&lt;query&gt;sumo.datasource=iis deployment.environment={{deployment.environment}} webengine.cluster.name={{webengine.cluster.name}} webengine.node.name={{webengine.node.name}} | json \"log\" as _rawlog nodrop \\\\n| if (isEmpty(_rawlog), _raw, _rawlog) as iis_log_message\\\\n| parse regex field=iis_log_message \"(?&lt;server_ip&gt;\\\\d{1,3}\\\\.\\\\d{1,3}\\\\.\\\\d{1,3}\\\\.\\\\d{1,3}) (?&lt;method&gt;\\\\S+?) (?&lt;cs_uri_stem&gt;\\\\S+?) (?&lt;cs_uri_query&gt;\\\\S+?) (?&lt;s_port&gt;\\\\S+?) (?&lt;cs_username&gt;\\\\S+?) (?&lt;c_ip&gt;\\\\S+?) (?&lt;cs_User_Agent&gt;\\\\S+?) (?&lt;cs_referer&gt;\\\\S+?) (?&lt;sc_status&gt;\\\\S+?) (?&lt;sc_substatus&gt;\\\\S+?) (?&lt;sc_win32_status&gt;\\\\S+?) (?&lt;time_taken&gt;\\\\S+?)$\" \\\\n| count as Requests by cs_username | where cs_username != \"-\" | sort -Requests \\\\n| pct(requests,50) as Pct50, pct(requests,55) as Pct55, pct(requests,60) as Pct60, pct(requests,65) as Pct65, pct(requests,70) as Pct70, pct(requests,75) as Pct75, pct(requests,80) as Pct80, pct(requests,85) as Pct85, pct(requests,90) as Pct90, pct(requests,95) as Pct95, pct(requests,98) as Pct98, pct(requests,100) as Pct100&lt;/query&gt;\\n&lt;location&gt;Dashboard: IIS - Visitor Access Types Panel: Cumulative Client Request Percentiles QueryKey: A&lt;/location&gt;&lt;query&gt;sumo.datasource=iis deployment.environment={{deployment.environment}} webengine.cluster.name={{webengine.cluster.name}} webengine.node.name={{webengine.node.name}} | json \"log\" as _rawlog nodrop \\\\n| if (isEmpty(_rawlog), _raw, _rawlog) as iis_log_message\\\\n| parse regex field=iis_log_message \"(?&lt;server_ip&gt;\\\\d{1,3}\\\\.\\\\d{1,3}\\\\.\\\\d{1,3}\\\\.\\\\d{1,3}) (?&lt;method&gt;\\\\S+?) (?&lt;cs_uri_stem&gt;\\\\S+?) (?&lt;cs_uri_query&gt;\\\\S+?) (?&lt;s_port&gt;\\\\S+?) (?&lt;cs_username&gt;\\\\S+?) (?&lt;c_ip&gt;\\\\S+?) (?&lt;cs_User_Agent&gt;\\\\S+?) (?&lt;cs_referer&gt;\\\\S+?) (?&lt;sc_status&gt;\\\\S+?) (?&lt;sc_substatus&gt;\\\\S+?) (?&lt;sc_win32_status&gt;\\\\S+?) (?&lt;time_taken&gt;\\\\S+?)$\"\\\\n| count as Requests by c_ip | sort -Requests \\\\n| pct(requests,50) as Pct50, pct(requests,55) as Pct55, pct(requests,60) as Pct60, pct(requests,65) as Pct65, pct(requests,70) as Pct70, pct(requests,75) as Pct75, pct(requests,80) as Pct80, pct(requests,85) as Pct85, pct(requests,90) as Pct90, pct(requests,95) as Pct95, pct(requests,98) as Pct98, pct(requests,100) as Pct100&lt;/query&gt;'}\n```\n"
        }
      ],
      "system": "You are Sumo Logic app developer whose job is to analyse logs and metrics and writes sumo logic log queries, based on below best practices optimize the sumo logic log query.\nConsider following order as precedence of rules priority. Reward each optimization a score starting from 1 and increase reward by 1 on each optimization applied, do not increase reward if no change is applied.\n1. Be specific with search scope. Use key words inside regex or match expressions in the query scope. If sourceCategory is not used in scope do not append it in query.\n2. Do not remove metadata and filters from query.\n3. Filter your data before aggregation.\n4. Use \"parse\" anchor instead of \"parse regex\" for structured messages.\n5. When using parse regex avoid expensive tokens.\n6. Aggregate operator(count, sum, count_distinct etc) should be before lookup.\n7. Minimize the use of wildcard characters at the beginning of search terms to optimize query performance.\n\nFor each input Sumo Logic log query wrapped in &lt;query&gt; tag, perform the Sumo Logic Query optimization:\n\nThe output should be formatted as a JSON instance that conforms to the JSON schema below.\n\nAs an example, for the schema {\"properties\": {\"foo\": {\"title\": \"Foo\", \"description\": \"a list of strings\", \"type\": \"array\", \"items\": {\"type\": \"string\"}}}, \"required\": [\"foo\"]}\nthe object {\"foo\": [\"bar\", \"baz\"]} is a well-formatted instance of the schema. The object {\"properties\": {\"foo\": [\"bar\", \"baz\"]}} is not well-formatted.\n\nHere is the output schema:\n```\n{\"$defs\": {\"QueryResponse\": {\"properties\": {\"location\": {\"default\": null, \"description\": \"Location of the Sumo Logic query string inside &lt;location&gt; tag\", \"title\": \"Location\", \"type\": \"string\"}, \"original_query_string\": {\"default\": null, \"description\": \"Original input Sumo Logic query string inside &lt;query&gt; tag\", \"title\": \"Original Query String\", \"type\": \"string\"}, \"optimized_query_string\": {\"default\": null, \"description\": \"Optimized Sumo Logic query string, if no optimization is required then the value becomes NOCHANGE\", \"title\": \"Optimized Query String\", \"type\": \"string\"}, \"review\": {\"default\": null, \"description\": \"Explanations of optimizations performed in the optimized query, if no optimization is required then the value becomes NOCHANGE\", \"title\": \"Review\", \"type\": \"string\"}, \"priority\": {\"default\": 0, \"description\": \"rewards score\", \"title\": \"Priority\", \"type\": \"integer\"}}, \"title\": \"QueryResponse\", \"type\": \"object\"}}, \"properties\": {\"query_response\": {\"default\": null, \"description\": \"Json object response for each query\", \"items\": {\"$ref\": \"#/$defs/QueryResponse\"}, \"title\": \"Query Response\", \"type\": \"array\"}}}\n```\n"
    },
    "inputTokenCount": 5143
  },
  "output": {
    "outputContentType": "application/json",
    "outputBodyJson": {
      "id": "msg_bdrk_01Nc5NkpiJ8v7PMQZnHZr44C",
      "type": "message",
      "role": "assistant",
      "model": "claude-3-5-sonnet-20240620",
      "content": [
        {
          "type": "tool_use",
          "id": "toolu_bdrk_018SZ88zDcMnLqHPKdUEjjLQ",
          "name": "QueryResponseArray",
          "input": {}
        }
      ],
      "stop_reason": "max_tokens",
      "stop_sequence": null,
      "usage": {
        "input_tokens": 5143,
        "output_tokens": 3997
      }
    },
    "outputTokenCount": 3997
  }
}
```
</details>

### Sample queries


```sql title="Successful Event Locations (CloudTrail log based)"
account=* region=us-east-1 namespace=aws/bedrock "\"eventSource\":\"bedrock.amazonaws.com\"" !errorCode
| json "eventSource", "eventName", "eventType", "sourceIPAddress", "errorCode", "errorMessage" nodrop
| json "userIdentity.type", "userIdentity.userName", "userIdentity.arn", "recipientAccountId", "awsRegion" as user_type, user_name, arn, accountid, region nodrop
| parse field=arn "arn:aws:sts::*:*/*" as f1, user_type, user_name nodrop
| json "requestParameters.modelId", "responseElements.modelId" as reqModelid, resmodelId nodrop
| if (!isBlank(reqModelid), reqModelid, resmodelId) as modelid
| where eventSource matches "bedrock.amazonaws.com"
| where modelid matches "ai21.j2-mid-v1" or isBlank(modelid)
| count as eventCount by sourceIPAddress
| lookup latitude, longitude from geo://location on ip=sourceIPAddress
```

```sql title="Top 10 Error Message (CloudTrail log based)"
account=* region=us-east-1 namespace=aws/bedrock "\"eventSource\":\"bedrock.amazonaws.com\"" errorCode
| json "eventSource", "eventName", "eventType", "sourceIPAddress", "errorCode", "errorMessage" nodrop
| json "userIdentity.type", "userIdentity.userName", "userIdentity.arn", "recipientAccountId", "awsRegion" as user_type, user_name, arn, accountid, region nodrop
| parse field=arn "arn:aws:sts::*:*/*" as f1, user_type, user_name nodrop
| json "requestParameters.modelId", "responseElements.modelId" as reqModelid, resmodelId nodrop
| if (!isBlank(reqModelid), reqModelid, resmodelId) as modelid
| where eventSource matches "bedrock.amazonaws.com"
| where modelid matches "ai21.j2-mid-v1" or isBlank(modelid)
| count as eventCount by errorMessage
| sort by eventCount, errorMessage asc
```

```sql title="Top 20 Non-ReadOnly Events (CloudTrail log based)"
account=* region=us-east-1 namespace=aws/bedrock "\"eventSource\":\"bedrock.amazonaws.com\""
| json "eventSource", "eventName", "eventType", "sourceIPAddress", "errorCode", "errorMessage" nodrop
| json "userIdentity.type", "userIdentity.userName", "userIdentity.arn", "recipientAccountId", "awsRegion" as user_type, user_name, arn, accountid, region nodrop
| parse field=arn "arn:aws:sts::*:*/*" as f1, user_type, user_name nodrop
| json "requestParameters.modelId", "responseElements.modelId" as reqModelid, resmodelId nodrop
| if (!isBlank(reqModelid), reqModelid, resmodelId) as modelid
| where eventSource matches "bedrock.amazonaws.com"
| where modelid matches "ai21.j2-mid-v1" or isBlank(modelid)
| where !(eventName matches "Get*") and !(eventName matches "List*")
| count as eventCount by eventName 
| sort by eventCount, eventName asc
| limit 20
```

```sql title="Event Details (CloudWatch log based)"
account=* region=* namespace=aws/bedrock
| json "accountId", "region", "operation", "identity.arn", "modelId" as accountid, region, operation, arn, modelid nodrop
| parse field=arn "arn:aws:*::*:user/*" as user_type, f1, user_name nodrop
| parse field=arn "arn:aws:sts::*:*/*" as f1, user_type, user_name nodrop
| where accountid matches "*" and operation matches "*" and user_name matches "*" and modelid matches "*"
| count as events by accountid, region, operation, user_type, user_name, modelid
| sort by events, accountid asc, region asc, operation asc, user_type asc, user_name asc, modelid asc
```

```sql title="Operations Trend (CloudWatch log based)"
account=* region=* namespace=aws/bedrock
| json "accountId", "region", "operation", "identity.arn", "modelId" as accountid, region, operation, arn, modelid nodrop
| parse field=arn "arn:aws:*::*:user/*" as user_type, f1, user_name nodrop
| parse field=arn "arn:aws:sts::*:*/*" as f1, user_type, user_name nodrop
| where accountid matches "*" and operation matches "*" and user_name matches "*" and modelid matches "*"
| timeslice 1h
| count by _timeslice, operation
| transpose row _timeslice column operation
```

```sql title="ModelId Trend (CloudWatch log based)"
account=* region=* namespace=aws/bedrock
| json "accountId", "region", "operation", "identity.arn", "modelId" as accountid, region, operation, arn, modelid nodrop
| parse field=arn "arn:aws:*::*:user/*" as user_type, f1, user_name nodrop
| parse field=arn "arn:aws:sts::*:*/*" as f1, user_type, user_name nodrop
| where accountid matches "*" and operation matches "*" and user_name matches "*" and modelid matches "*"
| timeslice 1h
| count by _timeslice, modelid
| transpose row _timeslice column modelid
```


```sql title="Invocation Latency By Model (CloudWatch Metric)"
account=* region=* namespace=aws/bedrock modelid=* metric=InvocationLatency statistic=average | avg by modelid 
```

```sql title="Trend Invocations By Model (CloudWatch Metric)"
account=* region=* namespace=aws/bedrock modelid=* metric=Invocations statistic= sum | quantize using sum | sum by modelid
```

## Collecting logs and metrics for the Amazon Bedrock app

### Collect CloudWatch Metrics

Sumo Logic supports collecting metrics using two source types:

* Configure an [AWS Kinesis Firehose for Metrics Source](/docs/send-data/hosted-collectors/amazon-aws/aws-kinesis-firehose-metrics-source) (Recommended); or
* Configure an [Amazon CloudWatch Source for Metrics](/docs/send-data/hosted-collectors/amazon-aws/amazon-cloudwatch-source-metrics)

* Namespace for **Amazon Bedrock** Service is **AWS/Bedrock**.
   * ​​​**Metadata**. Add an **account** field to the source and assign it a value that is a friendly name/alias to your AWS account from which you are collecting metrics. Metrics can be queried via the “account field”.

### Collect Amazon Bedrock CloudTrail logs

1. Add an [AWS CloudTrail Source](/docs/send-data/hosted-collectors/amazon-aws/aws-cloudtrail-source.md) to your Hosted Collector.
   * **Name**. Enter a name to display the new Source.
   * **Description**. Enter an optional description.
   * **S3 Region**. Select the Amazon Region for your **Amazon Bedrock** S3 bucket.
   * **Bucket Name**. Enter the exact name of your **Amazon Bedrock** S3 bucket.
   * **Path Expression**. Enter the string that matches the S3 objects you'd like to collect. You can use a wildcard (*) in this string. (DO NOT use a leading forward slash. See [Amazon Path Expressions](/docs/send-data/hosted-collectors/amazon-aws/amazon-path-expressions)). The S3 bucket name is not part of the path. Don’t include the bucket name when you are setting the Path Expression.
   * **Source Category**. Enter `aws/observability/cloudtrail/logs`.
   * **Fields**. Add an **account** field and assign it a value that is a friendly name/alias to your AWS account from which you are collecting logs. Logs can be queried via the “account field”.
   * **Access Key ID and Secret Access Key**. Enter your Amazon [Access Key ID and Secret Access Key](http://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSGettingStartedGuide/AWSCredentials.html). Learn how to use Role-based access to AWS [here](/docs/send-data/hosted-collectors/amazon-aws/aws-sources).
   * **Log File Discovery** > **Scan Interval**. Use the default of 5 minutes. Alternately, enter the frequency. Sumo Logic will scan your S3 bucket for new data. Learn how to configure **Log File Discovery** [here](/docs/send-data/hosted-collectors/amazon-aws/aws-sources).
   * **Enable Timestamp Parsing**. Select the **Extract timestamp information from log file entries** check box.
   * **Time Zone**. Select **Ignore time zone from the log file and instead use**, and select **UTC** from the dropdown.
   * **Timestamp Format.** Select **Automatically detect the format**.
   * **Enable Multiline Processing**. Select the **Detect messages spanning multiple lines** check box, and select **Infer Boundaries**.
2. Click **Save**.

### Collect Amazon Bedrock CloudWatch logs

To enable Amazon Bedrock CloudWatch Logs, follow the steps mentioned in [AWS Documentation](https://docs.aws.amazon.com/bedrock/latest/userguide/model-invocation-logging.html)

:::note
Ensure that when configuring `CloudWatch Logs`, the log group name follows the pattern `/aws/bedrock/*`.
:::

<img src={useBaseUrl('img/integrations/amazon-aws/Amazon-Bedrock-Settings.png')} alt="Amazon Bedrock Setting" style={{border: '1px solid gray'}} />


Sumo Logic supports several methods for collecting logs from Amazon CloudWatch. You can choose either of them to collect logs:

- **AWS Kinesis Firehose for Logs**. Configure an [AWS Kinesis Firehose for Logs](/docs/send-data/hosted-collectors/amazon-aws/aws-kinesis-firehose-logs-source/#create-an-aws-kinesis-firehose-for-logssource) (Recommended); or
- **Lambda Log Forwarder**. Configure a collection of Amazon CloudWatch Logs using our AWS Lambda function using a Sumo Logic provided CloudFormation template, as described in [Amazon CloudWatch Logs](/docs/send-data/collect-from-other-data-sources/amazon-cloudwatch-logs/) or configure collection without using CloudFormation, see [Collect Amazon CloudWatch Logs using a Lambda Function](/docs/send-data/collect-from-other-data-sources/amazon-cloudwatch-logs/collect-with-lambda-function/).<br/>

- While configuring the CloudWatch log source, following fields can be added in the source:
   - Add an **account** field and assign it a value which is a friendly name/alias to your AWS account from which you are collecting logs. Logs can be queried via the **account** field.
   - Add a **region** field and assign it the value of the respective AWS region where the **Bedrock** exists.
   - Add an **accountId** field and assign it the value of the respective AWS account id which is being used.

   <img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AWS-Lambda/lamda-cw-logs-source-fields.png')} alt="Fields" />   

### Field in Field Schema

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Logs > Fields**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Configuration**, and then under **Logs** select **Fields**. You can also click the **Go To...** menu at the top of the screen and select **Fields**. 
1. Search for the `modelId` field.
1. If not present, create it. Learn how to create and manage fields [here](/docs/manage/fields#manage-fields).

### Field Extraction Rule(s)

Create a Field Extraction Rule for CloudTrail Logs. Learn how to create a Field Extraction Rule [here](/docs/manage/field-extractions/create-field-extraction-rule).

```sql
Rule Name: AwsObservabilityBedrockCloudTrailLogsFER
Applied at: Ingest Time
Scope (Specific Data): account=* eventname eventsource "bedrock.amazonaws.com"
```

```sql title="Parse Expression"
json "eventSource", "awsRegion", "recipientAccountId" as event_source, region, accountid nodrop
| where event_source matches "bedrock.amazonaws.com"
| "aws/bedrock" as namespace
| json "requestParameters.modelId", "responseElements.modelId" as reqModelid, resmodelId nodrop
| if (!isBlank(reqModelid), reqModelid, resmodelId) as modelId
| fields accountid, region, namespace, modelId
```

#### Create/Update Field Extraction Rule(s) for Bedrock CloudWatch logs

```sql
Rule Name: AwsObservabilityBedrockCloudWatchLogsFER
Applied at: Ingest Time
Scope (Specific Data):
account=* region=* _sourceHost=/aws/bedrock/*
```

```sql title="Parse Expression"
if (isEmpty(namespace),"unknown",namespace) as namespace
| if (_sourceHost matches "/aws/bedrock/*", "aws/bedrock", namespace) as namespace
| json "modelId" as modelId nodrop
| tolowercase(modelId) as modelId
| fields namespace, modelId
```

### Centralized AWS CloudTrail log collection

In case you have a centralized collection of CloudTrail logs and are ingesting them from all accounts into a single Sumo Logic CloudTrail log source, create the following Field Extraction Rule to map a proper AWS account(s) friendly name/alias. Create it if not already present / update it as required.

```sql
Rule Name: AWS Accounts
Applied at: Ingest Time
Scope (Specific Data): _sourceCategory=aws/observability/cloudtrail/logs
```

**Parse Expression**:

Enter a parse expression to create an “account” field that maps to the alias you set for each sub account. For example, if you used the `“dev”` alias for an AWS account with ID `"956882123456"` and the `“prod”` alias for an AWS account with ID `"567680881046"`, your parse expression would look like:

```sql
| json "recipientAccountId"
// Manually map your aws account id with the AWS account alias you setup earlier for individual child account
| "" as account
| if (recipientAccountId = "956882123456",  "dev", account) as account
| if (recipientAccountId = "567680881046",  "prod", account) as account
| fields account
```

## Installing the Bedrock app  

Now that you have set up a collection for **Amazon Bedrock**, install the Sumo Logic app to use the pre-configured [dashboards](#viewing-the-bedrock-dashboards) that provide visibility into your environment for real-time analysis of overall usage.

import AppInstall from '../../reuse/apps/app-install-v2.md';

<AppInstall/>

## Viewing the Bedrock dashboards  

We highly recommend you view these dashboards in the [AWS Observability view](/docs/dashboards/explore-view/#aws-observability) of the AWS Observability solution.

### Overview

The **Amazon Bedrock - Overview** dashboard provides a overall heath of Bedrock service based logs and metrics.

Use this dashboard to:
* Monitor locations of successful and failed Amazon Bedrock user activity events.
* Monitor all read-only and non-read-only events.
* Monitor most active users working on Bedrock infrastructure and various events invoked on Bedrock service.

<img src={useBaseUrl('img/integrations/amazon-aws/Amazon-Bedrock-Overview.png')} alt="Amazon Bedrock dashboard" style={{border: '1px solid gray'}} />

### CloudTrail Audit Overview

The **Amazon Bedrock - CloudTrail Audit Overview** dashboard provides a record of actions taken by a user, role, or an AWS service in Amazon Bedrock. CloudTrail captures all API calls for Amazon Bedrock as events.

Use this dashboard to:
* Monitor Amazon Bedrock-related audit logs using CloudTrail Events.
* Monitor locations of successful and failed Amazon Bedrock user activity events.
* Monitor all read-only and non-read-only events.
* Monitor most active users working on Bedrock infrastructure and various events invoked on Bedrock service.

<img src={useBaseUrl('img/integrations/amazon-aws/Amazon-Bedrock-CloudTrail-Audit-Overview.png')} alt="Amazon Bedrock dashboard" style={{border: '1px solid gray'}} />

### Model Invocation Log Analysis

The **Amazon Bedrock - Model Invocation Log Analysis** dashboard provides insights into audit events of your invocation logs, model input data, and model output data for all invocations in your AWS account used in Amazon Bedrock.

Use this dashboard to:
* Monitor Amazon Bedrock-related audit logs using CloudWatch Events.
* Monitor operational events and the models being utilized.
* Monitor most active users working on Bedrock service.

<img src={useBaseUrl('img/integrations/amazon-aws/Amazon-Bedrock-Model-Invocation-Log-Analysis.png')} alt="Amazon Bedrock dashboard" style={{border: '1px solid gray'}} />

### Runtime Performance Monitoring

The **Amazon Bedrock - Runtime Performance Monitoring** dashboard provides statistical insights of runtime model invocation metrics.

Use this dashboard to:
* Monitor all Invocations related metrics.
* Monitor and track of input and output tokens.
* Monitor and track images in the output.

<img src={useBaseUrl('img/integrations/amazon-aws/Amazon-Bedrock-Runtime-Performance-Monitoring.png')} alt="Amazon Bedrock dashboard" style={{border: '1px solid gray'}} />

