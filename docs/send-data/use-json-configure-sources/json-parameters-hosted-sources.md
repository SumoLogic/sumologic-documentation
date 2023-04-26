---
id: json-parameters-hosted-sources
title: JSON Parameters for Hosted Sources
description: This topic describes JSON Source parameters for hosted Collectors.
---

This topic describes JSON Source parameters for Hosted Collectors. See the following topics for additional information:

 * [Use JSON to Configure Sources](/docs/send-data/use-json-configure-sources). The topic includes a list of [common parameters](/docs/send-data/use-json-configure-sources) for all log Source types. For Sources, the common parameter `name` must be unique per Collector.
 * Source API Methods and Examples for information on creating Sources.
 * [JSON Source Parameters for Installed Collectors](/docs/send-data/use-json-configure-sources/json-parameters-installed-sources).
 * [View or Download Collector or Source JSON Configuration](/docs/send-data/use-json-configure-sources/local-configuration-file-management/view-download-source-json-configuration) from Sumo Logic.

:::note
JSON files need to be UTF-8 encoded following [RFC 8259](https://tools.ietf.org/html/rfc8259).
:::

:::note Common Parameters
See [Use JSON to Configure Sources](/docs/send-data/use-json-configure-sources) for a list of common parameters.
:::

## Source types for Hosted Collectors

Each Source can have its own unique fields in addition to the generic fields listed in [Use JSON to Configure Sources](/docs/send-data/use-json-configure-sources). The `sourceType` field determines the type of Source (and the associated parameters). The next table lists the valid field types. The sections that follow list the unique parameters for each and associated JSON examples.

The Google Workspace Apps Audit Source cannot be created with JSON. This Source requires manual 0Auth confirmation which is only supported in the Sumo web interface.

## Log Sources for Installed Collectors

| Field Type | Type Value |
|:--|:--|
| [Local File Source](/docs/send-data/use-json-configure-sources/json-parameters-installed-sources#local-file-source) | LocalFile |
| [Remote File Source](/docs/send-data/use-json-configure-sources/json-parameters-installed-sources#remote-file-source) | RemoteFileV2 |
| [Local Windows Event Log Source](/docs/send-data/use-json-configure-sources/json-parameters-installed-sources#local-windows-event-log-source) | LocalWindowsEventLog |
| [Remote Windows Event Log Source](/docs/send-data/use-json-configure-sources/json-parameters-installed-sources#remote-windows-event-log-source) | RemoteWindowsEventLog |
| [Local Windows Performance Source](/docs/send-data/use-json-configure-sources/json-parameters-installed-sources#local-windows-performance-source) | LocalWindowsPerfMon |
| [Remote Windows Performance Source](/docs/send-data/use-json-configure-sources/json-parameters-installed-sources#remote-windows-performance-source) | RemoteWindowsPerfMon |
| [Windows Active Directory Inventory Source](/docs/send-data/use-json-configure-sources/json-parameters-installed-sources#windows-active-directory-inventory-source) | ActiveDirectory |
| [Syslog Source](/docs/send-data/use-json-configure-sources/json-parameters-installed-sources#syslog-source)	 | Syslog |
| [Script Source](/docs/send-data/use-json-configure-sources/json-parameters-installed-sources#script-source) | Script |
| [Docker Log Source](/docs/send-data/use-json-configure-sources/json-parameters-installed-sources#docker-log-source) | DockerLog |
| [Docker Stats Source](/docs/send-data/use-json-configure-sources/json-parameters-installed-sources#docker-stats-source) | DockerStats |

## Metric Sources for Installed Collectors

| Field Type | Type Value |
|:--|:--|
| [Host Metrics Source](/docs/send-data/use-json-configure-sources/json-parameters-installed-sources#host-metrics-source)  | SystemStats |
| [Streaming Metrics Source](/docs/send-data/use-json-configure-sources/json-parameters-installed-sources#streaming-metrics-source) | StreamingMetrics |


### Log Sources for Hosted Collectors

| Field Type | Type Value |
|:--|:--|
| [Akamai SIEM API Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/akamai-siem-api-source) | Universal |
| [Amazon S3 Source](/docs/send-data/use-json-configure-sources/json-parameters-hosted-sources#amazon-s3-source) | Polling |
| [AWS S3 Archive Source](/docs/send-data/use-json-configure-sources/json-parameters-hosted-sources#aws-s3-archive-source) | Polling |
| [AWS CloudFront Source](/docs/send-data/use-json-configure-sources/json-parameters-hosted-sources#aws-cloudfront-source) | Polling |
| [AWS CloudTrail Source](/docs/send-data/use-json-configure-sources/json-parameters-hosted-sources#aws-cloudtrail-source) | Polling
| [AWS Elastic Load Balancing Source](/docs/send-data/use-json-configure-sources/json-parameters-hosted-sources#aws-elastic-load-balancing-source) | Polling |
| [AWS Kinesis Firehose for Logs Source](/docs/send-data/use-json-configure-sources/json-parameters-hosted-sources#aws-kinesis-firehose-for-logs-source) | HTTP |
| [Amazon S3 Audit Source](/docs/send-data/use-json-configure-sources/json-parameters-hosted-sources#amazon-s3-audit-source) | Polling |
| [AWS Metadata (Tag) Source](/docs/send-data/use-json-configure-sources/json-parameters-hosted-sources#aws-metadata-tag-source) | Polling |
| [Azure Event Hubs Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/azure-event-hubs-source) | Universal |
| [Carbon Black Cloud Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/carbon-black-cloud-source) | Universal |
| [Carbon Black Inventory Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/carbon-black-inventory-source) | Universal |
| [Cloud Syslog Source](/docs/send-data/use-json-configure-sources/json-parameters-hosted-sources#cloud-syslog-source) | Cloudsyslog |
| [Cisco AMP Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/cisco-amp-source) | Universal |
| [Cisco Meraki Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/cisco-meraki-source) | Universal |
| [Crowdstrike FDR Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/crowdstrike-fdr-source) | Universal |
| [CrowdStrike Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/crowdstrike-source) | 	Universal |
| [CSE AWS EC2 Inventory Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/cse-aws-ec-inventory-source) | Universal |
| [Cybereason Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/cybereason-source) | Universal |
| [Duo Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/duo-source) | Universal |
| [Google Cloud Platform Source](/docs/send-data/use-json-configure-sources/json-parameters-hosted-sources#google-cloud-platform-source) | HTTP |
| [HTTP Source](/docs/send-data/use-json-configure-sources/json-parameters-hosted-sources#http-source) | HTTP |
| [Microsoft Graph Security API Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/microsoft-graph-security-api-source) | Universal |
| [Mimecast Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/mimecast-source) | Universal |
| [Netskope Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/netskope-source) | Universal |
| [Okta Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/okta-source) | Universal |
| [Palo Alto Cortex XDR](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/palo-alto-cortex-xdr-source) | Universal |
| [Proofpoint On Demand Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/proofpoint-on-demand-source) | Universal |
| [Proofpoint TAP Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/proofpoint-tap-source) | Universal |
| [Salesforce Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/salesforce-source) | Universal |
| [Sophos Central Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/sophos-central-source) | Universal |
| [Tenable Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/tenable-source) | Universal |

### Metrics sources for hosted collectors

| Field Type | Type Value |
|:--|:--|
| [AWS CloudWatch Source](/docs/send-data/use-json-configure-sources/json-parameters-hosted-sources#aws-cloudwatch-source) | Polling |

## Log Source parameters for Hosted Collectors

### HTTP Source

In addition to the common parameters, the following parameters are for an HTTP Source.

| Parameter | Type | Required? | Default | Description | Access |
|:--|:--|:--|:--|:--|:--|
| `fields` | JSON Object | No |  | Enable Extended HTTP Metadata Collection by adding `_convertHeadersToFields=true`. | modifiable |
| `sourceType` | String | Yes |  | HTTP | not modifiable |
| `messagePerRequest` | Boolean | Yes |  | When set to `true`, only a single message will be sent for each HTTP request. To disable this feature, set to `false`. <br/>You need to specify the common parameter `multilineProcessingEnabled` as false when setting `messagePerRequest` to `true`. | modifiable |
| `url` | String | No | URL assigned by Sumo for Source | The Source's unique HTTP endpoint web address. | not modifiable |

```json title="HTTP Source JSON example"
{
    "api.version": "v1",
    "source": {
        "sourceType": "HTTP",
        "name": "Example1",
        "fields":{
          "_convertHeadersToFields":"true"
        },
        "messagePerRequest": true,
        "multilineProcessingEnabled": false
    }
}
```

### Cloud Syslog Source

In addition to the [common parameters](/docs/send-data/use-json-configure-sources), the following parameters are for a Cloud Syslog Source.

| Parameter | Type |  Required? | Default | Description | Access |
|:---------------|:----------|:---------------|:-------------|:-----------------|:----------------|
| sourceType    | String   | Yes           |             | Cloudsyslog     | not modifiable |

Cloud Syslog Source JSON example: 

```json
{
   "api.version":"v1",
   "source":{
      "sourceType":"Cloudsyslog",
      "name":"Example1"
   }
}
```

### Google Cloud Platform Source

In addition to the [common parameters](/docs/send-data/use-json-configure-sources),
the following parameters are for a Google Cloud Platform Source.

| Parameter | Type |  Required? | Default | Description | Access |
|:---------------|:----------|:---------------|:-------------|:-----------------|:----------------|
| `sourceType` | String | Yes | 	HTTP | not modifiable |
| `thirdPartyRef` | Nested | JSON | Yes |  | Specify the the serviceType as GoogleCloudLogs. | not modifiable |

Google Cloud Platform Source JSON example: 

```json
{
  "source": {
    "name": "Example-GCP",
    "thirdPartyRef":{
      "resources":[
         {
            "serviceType":"GoogleCloudLogs"
         }
      ]
    },
    "sourceType": "HTTP"
  }
}
```

### AWS Log Sources

In addition to the [common parameters](/docs/send-data/use-json-configure-sources), the following parameters are for all AWS log Sources except Kinesis.

| Parameter | Type |  Required? | Default | Description | Access |
|:---------------|:----------|:---------------|:-------------|:-----------------|:----------------|
| `sourceType` | String | Yes |  | Polling | not modifiable |
| `contentType` | String | No |  | Define based on the AWS Source you are creating.<br/>[Archive](#awss3-archive-source): AwsS3ArchiveBucket<br/>[S3](#amazon-s3-source): AwsS3Bucket<br/>[S3 Audit](#amazon-s3-audit-source): AwsS3AuditBucket<br/>[CloudFront](#aws-cloudfront-source): AwsCloudFrontBucket<br/>[CloudTrail](#aws-cloudtrail-source): AwsCloudTrailBucket<br/>[ELB](#aws-elastic-load-balancing-source): AwsElbBucket<br/>[Metadata](#aws-metadata-tag-source): AwsMetadata<br/>[Kinesis](#aws-kinesis-firehose-for-logs-source): KinesisLog	| not modifiable |
| `scanInterval` | Long | Yes | 300000 | Time interval of S3 bucket scans for new data, in milliseconds. Minimum value:  1000<br/>For Automatic assign to: -1 | modifiable |
| `paused` | Boolean | Yes | false | When set to true, the scanner for S3 bucket items is paused. To disable, set to false. | modifiable |
| `url` | String | No | URL | assigned by Sumo for Source | Used to set up Event Based Notifications with AWS. This value is created and assigned by Sumo when the Source is created. | not modifiable |
| `thirdPartyRef` | Nested | JSON | Yes |  | Includes all required information for third-party integration, including the S3 bucket name, path expression for the S3 objects, and access credentials.<br/>See examples below table. | modifiable |
| `snsTopicOrSubscriptionArn`<br/>This parameter goes in the thirdPartyRef nested JSON. | String | No |  | SNS topic/subscription ARN. If SNS has been successfully configured and has received a subscription confirmation request isSuccess will be true.<br/>See example below table. | not modifiable |
| `bucketName`<br/>This parameter goes in the thirdPartyRef nested JSON. | String | Yes |  | Name of your Amazon S3 bucket. | Modifiable |
| `pathExpression`<br/>This parameter goes in the thirdPartyRef nested JSON. | String | Yes |  | Wildcard pattern that matches the S3 objects you'd like to collect. | Modifiable |


**IAM User authentication example:**

```json
"authentication": {
  "type": "S3BucketAuthentication",
  "awsId": "AKIAIOSFODNN7EXAMPLE",
  "awsKey": "*******"
}
```

**IAM Role authentication example:**

```json
"authentication": {
  "type": "AWSRoleBasedAuthentication",
  "roleARN": "arn:aws:iam::123456789012:role/myrole"
}
```

**snsTopicOrSubscriptionArn example**

```json
"thirdPartyRef": {
        "resources": [{
            "serviceType": "#",
            "path": {
                "type": "#",
                "bucketName": "#",
                "pathExpression": "*",
                "snsTopicOrSubscriptionArn": {
                    "isSuccess": true,
                    "arn": "arn:aws:sns:#:#:SumoSNSTopic-#:#"
                }
            },
            "authentication": {...
            }
        }]
    }
```

#### AWS S3 Archive Source

The parameters for this Source can be referenced in the [AWS Log Sources](#aws-log-sources) section. This is an AWS S3 Archive Source JSON example:

```json
{
  "api.version":"v1",
  "source":{
    "name":"my_new_archive",
    "automaticDateParsing":true,
    "multilineProcessingEnabled":true,
    "useAutolineMatching":true,
    "contentType":"AwsS3ArchiveBucket",
    "forceTimeZone":false,
    "filters":[],
    "cutoffTimestamp":0,
    "encoding":"UTF-8",
    "fields":{

    },
    "thirdPartyRef":{
      "resources":[{
        "serviceType":"AwsS3ArchiveBucket",
        "path":{
          "type":"S3BucketPathExpression",
          "bucketName":"awsbucketname",
          "pathExpression":"*"
        },
        "authentication":{
          "type":"AWSRoleBasedAuthentication",
          "roleARN":"arn:aws:iam::123456789012:role/myrole"
        }
      }]
    },
    "scanInterval":300000,
    "paused":false,
    "sourceType":"Polling"
  }
}
```

#### Amazon S3 Source

The parameters for this Source can be referenced in the [AWS Log Sources](#aws-log-sources)  section. This is an Amazon S3 Source JSON example: 

```json
{
  "api.version":"v1",
  "source":{
    "sourceType": "Polling",
    "name": "Example1",
    "contentType": "AwsS3Bucket",
    "thirdPartyRef":{
      "resources":[
        {
          "serviceType": "AwsS3Bucket",
          "path": {
            "type": "S3BucketPathExpression",
            "bucketName": "Bucket1",
            "pathExpression": "*"
          },
          "authentication": {
            "type": "AWSRoleBasedAuthentication",
            "roleARN": "arn:aws:iam::123456789012:role/myrole"
          }
        }    
      ]
    },
    "scanInterval": 300000,
    "paused": false
  }
}
```

#### AWS Elastic Load Balancing Source

The parameters for this Source can be referenced in the [AWS Log Sources](#aws-log-sources) section. This is an AWS Elastic Load Balancing Source JSON example: 

```json
{
    "api.version": "v1",
    "source": {
        "sourceType": "Polling",
        "name": "Example1",
        "contentType": "AwsElbBucket",
        "thirdPartyRef": {
            "resources": [{
                "serviceType": "AwsElbBucket",
                "path": {
                    "type": "S3BucketPathExpression",
                    "bucketName": "Bucket1",
                    "pathExpression": "*"
                },
                "authentication": {
                    "type": "AWSRoleBasedAuthentication",
                    "roleARN": "arn:aws:iam::123456789012:role/myrole"
                }
            }]
        },
        "scanInterval": 300000,
        "paused": false
    }
}
```

#### AWS CloudFront Source

The parameters for this Source can be referenced in the [AWS Log Sources](#aws-log-sources) section. This is an AWS CloudFront Source JSON example: 

```json
{
    "api.version": "v1",
    "source": {
        "sourceType": "Polling",
        "name": "Example1",
        "contentType": "AwsCloudFrontBucket",
        "thirdPartyRef": {
            "resources": [{
                "serviceType": "AwsCloudFrontBucket",
                "path": {
                    "type": "S3BucketPathExpression",
                    "bucketName": "Bucket1",
                    "pathExpression": "*"
                },
                "authentication": {
                    "type": "AWSRoleBasedAuthentication",
                    "roleARN": "arn:aws:iam::123456789012:role/myrole"
                }
            }]
        },
        "scanInterval": 300000,
        "paused": false
    }
}
```

#### AWS CloudTrail Source

The parameters for this Source can be referenced in the [AWS Log Sources](#aws-log-sources) section. This is an AWS CloudTrail Source JSON example: 

```json
{
    "api.version": "v1",
    "source": {
        "sourceType": "Polling",
        "name": "Example1",
        "contentType": "AwsCloudTrailBucket",
        "thirdPartyRef": {
            "resources": [{
                "serviceType": "AwsCloudTrailBucket",
                "path": {
                    "type": "S3BucketPathExpression",
                    "bucketName": "Bucket1",
                    "pathExpression": "*"
                },
                "authentication": {
                    "type": "AWSRoleBasedAuthentication",
                    "roleARN": "arn:aws:iam::123456789012:role/myrole"
                }
            }]
        },
        "scanInterval": 300000,
        "paused": false
    }
}
```

#### Amazon S3 Audit Source

The parameters for this Source can be referenced in the [AWS Log Sources](#aws-log-sources) section. This is an AWS S3 Audit Source JSON example: 

```json
{
    "api.version": "v1",
    "source": {
        "sourceType": "Polling",
        "name": "Example1",
        "contentType": "AwsS3AuditBucket",
        "thirdPartyRef": {
            "resources": [{
                "serviceType": "AwsS3AuditBucket",
                "path": {
                    "type": "S3BucketPathExpression",
                    "bucketName": "Bucket1",
                    "pathExpression": "*"
                },
                "authentication": {
                    "type": "AWSRoleBasedAuthentication",
                    "roleARN": "arn:aws:iam::123456789012:role/myrole"
                }
            }]
        },
        "scanInterval": 300000,
        "paused": false
    }
}
```

#### AWS Metadata (Tag) Source

The parameters for this Source can be referenced in the [AWS Log Sources](#aws-log-sources) section. This is an AWS Metadata Source JSON example: 

```json
{
    "api.version": "v1",
    "source": {
        "sourceType": "Polling",
        "name": "exampleName",
        "description": "Poll metadata for data",
        "automaticDateParsing": false,
        "multilineProcessingEnabled": false,
        "useAutolineMatching": false,
        "contentType": "AwsMetadata",
        "forceTimeZone": false,
        "filters": [],
        "cutoffTimestamp": 0,
        "encoding": "UTF-8",
        "fields": {

        },
        "thirdPartyRef": {
            "resources": [{
                "serviceType": "AwsMetadata",
                "path": {
                    "type": "AwsMetadataPath",
                    "limitToRegions": ["ap-southeast-2", "us-east-1", "us-west-2"],
                    "limitToNamespaces": ["AWS/EC2"],
                    "tagFilters": ["tag1", "tag2", "tag3", "tag4", "name"]
                },
                "authentication": {
                    "type": "AWSRoleBasedAuthentication",
                    "roleARN": "arn:aws:iam::123456789012:role/myrole"
                }
            }]
        },
        "scanInterval": 60000,
        "paused": false
    }
}
```

#### AWS Kinesis Firehose for Logs Source

This is an AWS Kinesis Firehose for Logs Source JSON example. It uses the `thirdPartyRef` parameter to enable **S3 Replay**. Leave `thirdPartyRef` empty if you don't want to enable S3 replay.

```json
{
  "source":
     {
           "name":"test-source",
           "automaticDateParsing":true,
           "multilineProcessingEnabled":true,
           "useAutolineMatching":true,
           "contentType":"AwsS3Bucket",
           "forceTimeZone":false,
           "filters":[],
           "cutoffTimestamp":1634972400000,
           "encoding":"UTF-8",
           "fields":{},
           "thirdPartyRef":{   
               "resources":[
                   {     
                        "serviceType":"AwsS3Bucket",
                        "path":{       
                            "type":"S3BucketPathExpression",       
                            "bucketName":"test-kinesis-bucket-name",       
                            "pathExpression":"http-endpoint-failed/*",       
                            "useVersionedApi":true     
                        },     
                        "authentication":{       
                            "type":"S3BucketAuthentication",
                            "awsId":"XXX",
                            "awsKey":"XXX"
                        }   
                    }
                ]
            },
            "sourceType":"HTTP"
  }
}
```

To disable S3 Replay use the `NoPathExpression` placeholder for `path` and `authentication`, for example:

```json
{
    "source":
        {
            "name": "test-kinesis-source",
            "automaticDateParsing": true,
            "multilineProcessingEnabled": true,
            "useAutolineMatching": true,
            "contentType": "KinesisLog",
            "forceTimeZone": false,
            "filters": [],
            "cutoffTimestamp": 0,
            "encoding": "UTF-8",
            "fields": {},
            "thirdPartyRef": {
                "resources": [
                    {
                        "serviceType": "KinesisLog",
                        "path": {
                            "type": "NoPathExpression"
                        },
                        "authentication": {
                            "type": "NoAuthentication"
                        }
                    }
                ]
            },
            "messagePerRequest": false,
            "sourceType": "HTTP"
        }
}
```

## Metrics Source parameters for Hosted Collectors

### AWS CloudWatch Source

The following parameters are for an AWS CloudWatch Source.

| Parameter | Type |  Required? | Default | Description | Access |
|:---------------|:----------|:---------------|:-------------|:-----------------|:----------------|
| `name` | String | Yes |  | Type a desired name of the Source. The name must be unique per Collector. This value is assigned to the metadata field `_source`. | modifiable |
| `description` | String | No | null | Type a description of the Source. | modifiable |
| `category` | String | No | null | Type a category of the source. This value is assigned to the metadata field `_sourceCategory`. See best practices for details. | modifiable |
| `sourceType` | String | Yes |  | Polling | not modifiable |
| `contentType` | String | No |  | AwsCloudWatch | not modifiable |
| `scanInterval` | Long | Yes | 300000 | Time interval of S3 bucket scans for new data, in milliseconds.<br/>Minimum value:  1000 | modifiable |
| `paused` | Boolean | Yes | false | When set to `true`, the scanner for metrics is paused. To disable, set to `false`. | modifiable |
| `thirdPartyRef` | Nested | JSON | Yes |  | Includes all required information for third-party integration, including the relevant Amazon regions, namespaces, and access credentials. | 	modifiable |

AWS CloudWatch Source JSON example: 

```json
{
   "api.version":"v1",
   "source":{
      "sourceType": "Polling",
      "name": "Example1",
      "contentType": "AwsCloudWatch",
      "thirdPartyRef":{
         "resources":[
            {
               "serviceType": "AwsCloudWatch",
               "path": {
                  "type": "CloudWatchPath",
                  "limitToRegions": ["region-1", "region-2"],
                  "limitToNamespaces": ["AWS/ELB", "AWS/Route53", "AWS/OpsWork"]
               },
               "authentication": {
                  "type": "S3BucketAuthentication",
                  "awsId": "AKIAIOSFODNN7EXAMPLE",
                  "awsKey": "*******"
               }
            }
         ]
      },
      "scanInterval": 300000,
      "paused": false
   }
}
```

### AWS Kinesis Firehose for Metrics Source

This is an AWS Kinesis Firehose for Metrics Source JSON example:

```json
{
  "api.version": "v1",
  "source": {
    "sourceType": "HTTP",
    "name": "CloudWatch Metrics via Kinesis",
    "contentType": "KinesisMetric",
    "description": "Managed by Terraform in content-management / myDeployment",
    "fields": {},
    "thirdPartyRef": {
      "resources": [
        {
          "serviceType": "KinesisMetric",
          "authentication": {
            "roleARN": "arn:aws:iam::123456789012:role/myrole",
            "type": "AWSRoleBasedAuthentication"
          },
          "path": {
            "type": "KinesisMetricPath",
            "tagFilters": [
              {
                "namespace": "AWS/EBS",
                "tags": [
                  "Deployment=myDeployment",
                  "Cluster=my_cluster_a;my_cluster_b",
                  "VolumeSet=commitlog;data"
                ],
                "type": "TagFilters"
              }
          }
        }
      ]
    }
  }
}
```
