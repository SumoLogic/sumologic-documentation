---
id: evident-security-platform
title: Evident.io ESP
sidebar_label: Evident.io ESP
description: The Evident.io ESP App provides pre-configured searches and Dashboards that allow you to investigate Evident-specific events and provide operational visibility to team members without logging into Evident.io.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/security-threat-detection/evidentio.png')} alt="thumbnail icon" width="75"/>

The Evident.io ESP App provides pre-configured searches and Dashboards that allow you to investigate Evident-specific events and provide operational visibility to team members without logging into Evident.io.

The Evident.io Evident Security Platform (ESP) streamlines and optimizes vulnerability and risk management. It continuously monitors the AWS cloud, automatically identifies security misconfigurations, enables rapid mitigation of risk through guided remediation and provides visibility to their service through integrations with a central security analytics platform like Sumo Logic. By combining the vulnerability and identified security misconfigurations from Evident and other data sources, you can reduce your security risk and improve your overall security posture.


## Log Types

The Evident.io ESP App collects monitoring alerts.

For details on the log format and definitions, refer to Evident.io documentation at [http://docs.evident.io/](http://docs.evident.io/).


### Sample Log Message

<details><summary>Click to expand</summary>

```json
{
   "data":{
      "id":"881237069",
      "type":"alerts",
      "attributes":{
         "created_at":"2017-10-02t18:39:11.577Z",
         "status":"fail",
         "risk_level":"medium",
         "resource":"dgadoury",
         "updated_at":"2017-10-02t18:39:11.577Z",
         "started_at":"2017-10-02T18:39:11.578Z",
         "ended_at":null
      },
      "relationships":{
         "external_account":{
            "data":{
               "id":"3256",
               "type":"external_accounts"
            },
            "links":{
               "related":"https://esp.evident.io/api/v2/external_accounts/3256.json"
            }
         },
         "region":{
            "data":{
               "id":"8",
               "type":"regions"
            },
            "links":{
               "related":"https://esp.evident.io/api/v2/regions/8.json"
            }
         },
         "signature":{
            "data":{
               "id":"83",
               "type":"signatures"
            },
            "links":{
               "related":"https://esp.evident.io/api/v2/signatures/83.json"
            }
         },
         "custom_signature":{
            "data":null,
            "links":{
               "related":null
            }
         },
         "suppression":{
            "links":{
               "related":null
            }
         },
         "metadata":{
            "data":{
               "id":"262926952",
               "type":"metadata"
            },
            "links":{
               "related":"https://esp.evident.io/api/v2/alerts/264543844/metadata.json"
            }
         },
         "cloud_trail_events":{
            "data":[

            ],
            "links":{
               "related":"https://esp.evident.io/api/v2/alerts/264543844/cloud_trail_events.json"
            }
         },
         "tags":{
            "data":[

            ],
            "links":{
               "related":"https://esp.evident.io/api/v2/alerts/264543844/tags.json"
            }
         },
         "compliance_controls":{
            "links":{
               "related":"https://esp.evident.io/api/v2/alerts/2645:43844/compliance_controls.json"
            }
         }
      }
   },
   "included":[
      {
         "id":"2433",
         "type":"external_accounts",
         "attributes":{
            "created_at":"2016-03-22t20:55:47.000Z",
            "name":"Test",
            "updated_at":"2016-10-05t01:05:22.000Z",
            "arn":"arn:aws:iam::926226587429:role/Evident_Service",
            "account":"123226587429",
            "external_id":"62dd0abc-5b44-410b-99d9-063f2c2b203e",
            "cloudtrail_name":null
         },
         "relationships":{
            "organization":{
               "links":{
                  "related":"https://esp.evident.io/api/v2/organizations/1000.json"
               }
            },
            "sub_organization":{
               "links":{
                  "related":"https://esp.evident.io/api/v2/sub_organizations/2000.json"
               }
            },
            "team":{
               "links":{
                  "related":"https://esp.evident.io/api/v2/teams/3000.json"
               }
            },
            "scan_intervals":{
               "links":{
                  "related":"https://esp.evident.io/api/v2/external_accounts/5000/scan_intervals.json"
               }
            }
         }
      },
      {
         "id":"8",
         "type":"regions",
         "attributes":{
            "code":"ap_southeast_1",
            "created_at":"2014-06-05t23:42:37.000Z",
            "updated_at":"2014-06-05t23:42:37.000Z"
         }
      },
      {
         "id":"83",
         "type":"signatures",
         "attributes":{
            "created_at":"2014-06-09t22:33:54.000Z",
            "description":"Ensure RDS restorable windows are within bounds -- exceeding 5 minutes is problematic.",
            "identifier":"AWS:ELB-070",
            "name":"ELB SSL Expiry 90day",
            "resolution":"RDS Restorable Windows are the timeframe to which the latest data is restorable. If these windows begin to exceed 5 minutes, then something is generally lagging in the system and could be broken. This signature alerts users if the 'latest restorable time' stops working as intended, which increases your potential risk if you need to recover data from your backups. Overall, it is expect to see this alert switch from PASS to FAIL on occasion with ESP due to transient delays from AWS.  If this alert fails consistently for one of your accounts, we recommend contacting AWS Support and asking them to take a look. For more information, AWS has information explaining how the Latest Restorable Time impacts your ability to restore a DB instance to a specific point in time http://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_PIT.html",
            "risk_level":"Low",
            "updated_at":"2016-10-13t00:00:15.000Z"
         },
         "relationships":{
            "service":{
               "links":{
                  "related":"https://esp.evident.io/api/v2/services/10.json"
               }
            }
         }
      }
   ]
}
```

</details>


### Sample Query


```sql title="Alerts by Status"
_sourceCategory=security_evident
| json "data.id", "data.attributes" as id, data_attrib
| json "included.[0].attributes.name" as account_name
| json "included.[1].attributes.code" as region
| json "included.[2].attributes" as sig_attrib
| json field=data_attrib "resource", "status", "started_at", "created_at", "ended_at", "updated_at"
| json field=sig_attrib "description", "identifier", "name", "resolution", "risk_level"
| first(updated_at) by id, status
| count by status
```

## Collecting Logs for the Evident.io ESP App

This page demonstrates how to configure log collection for the Evident.io ESP App, and provides an example log message and query.


### Step 1. Add a Sumo Logic Collector and Source

1. In Sumo Logic, configure a [Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).
2. Configure an [HTTP Source](/docs/send-data/hosted-collectors/http-source/logs-metrics).
    1. **Name. **Enter Evident.io SNS Integration.  
    2. **Source Category. **Enter security_evident.
3. In the **Advanced** section, configure:
    3. **Enable Timestamp Parsing. **Activate the check box Extract timestamp information from log files.
    4. **Time Zone.** Select Ignore time zone from log file, and select (UTC) Etc/UTC
4. **Processing Rules.** Create the following [Mask Rule](/docs/send-data/collection/processing-rules/Mask-Rules): \

    5. **Name.** Enable proper timestamp parsing
    6. **Filter. **Enter `\"(?:created_at|updated_at|ended_at)\":\"\d+-\d+-\d+(T)\d+:\d+:\d+.\d+Z\"`
    7. **Type.** Select Mask messages that match.
    8. **Mask String.** Enter t.
5. Click **Apply**.
6. Click **Save**.
7. Copy the HTTP Source Address URL and use it in the following section.


### Step 2. Configure an Evident.io Integration with Amazon SNS

To configure an Evident.IO Integration with Amazon SNS:

1. In Evident.io, [add an Integration](http://docs.evident.io/#to-add-an-integration).
2. Enable an [Amazon SNS integration](http://docs.evident.io/#amazon-sns).


### Step 3. Subscribe to SNS Notifications

Once the Hosted Collector and HTTP Source are configured, subscribe your Hosted Collector to the topic collecting data from Evident.io.

If this is a new SNS topic, first subscribe an email address to it to make sure the path from ESP to the SNS topic works correctly before subscribing the Hosted Collector.

1. In the **AWS Management Console**, go to **SNS > Topics**, and find the topic you created in Configure an Evident.IO Integration with Amazon SNS.
2. Select the checkbox for the topic.
3. Under **Amazon SNS**, in the **Actions** menu, select **Subscribe to Topic**.
4. Under **Protocol**, select **HTTPS**, and paste the Sumo Logic HTTP Source URL you created in the first step into the **Endpoint** field.
5. Click **Create Subscription**.
6. In a few minutes, a confirmation message is sent to Sumo Logic.
7. In Sumo Logic, find the confirmation message from your HTTP Source by searching for `SubscribeURL`.
For example, use the query: `_sourceCategory=security_evident SubscribeURL`
8. Then, in the **Messages** tab, find the JSON field `SubscribeURL`, and copy the URL to your clipboard, as shown.

9. In the **AWS Management Console**, select **SNS >Topics**.
10. Under **Amazon SNS > Actions**, select **Confirm a subscription**.
11. Paste the `SubscribeURL` into the field **Subscription confirmation URL**, and click **Confirm subscription**.


### Step 4. Enable Raw Message Delivery

Enable Raw Message Delivery for the topic.

For details, see [http://docs.aws.amazon.com/sns/latest/dg/large-payload-raw-message.html](http://docs.aws.amazon.com/sns/latest/dg/large-payload-raw-message.html).

1. Select the AWS Topic.
2. Click **Other subscription actions**.
3. Click **Edit subscription attributes**.
4. Select the **Raw message delivery** check box.
5. Click **Set subscription attributes.**



## Installing the Evident.io ESP App

Now that you have configured Evident.io ESP, install the Sumo Logic App for Evident.io ESP to take advantage of the preconfigured searches and dashboards to analyze your data.

{@import ../../reuse/app-install.md}

## Viewing Evident.io Dashboards

### Evident.io ESP - Overview

<img src={useBaseUrl('img/integrations/security-threat-detection/Evident.ioESP_Overview_Dashboard.png')} alt="Evident.io ESP dashboards" />

**New Risks. **Displays the number of new risks in a single value chart over the previous 24 hours.

**New Risks by Severity. **Shows the severity of new risks in a stacked column chart on a timeline for the last 24 hours.

**New High Severity Risks.** Provides details on the new high severity risks in a table chart over the last 24 hours.

**Alerts by Status.** Provides details on the number and status of new alerts over the last 24 hours in a column chart

**Resolved Risks.** Shows which risks have been resolved over the last 24 hours in a table chart.

**Total Risks over Time. **Shows a trendline of all alerts over the last 14 days in a stacked area chart.


### Evident.io ESP - Detailed Risks

<img src={useBaseUrl('img/integrations/security-threat-detection/Evident.ioESP_DetailedRisks_Dashboard.png')} alt="Evident.io ESP dashboards" />

**Total Risks. **Shows the number of total risks in a single value chart over the last 24 hours

**New Risks.** Displays the number of new risks for the last 24 hours in a single value chart.

**Unresolved Risks.** Displays the number of unresolved risks reported over the last 24 hours in a single value chart.

**Risks by Region.** Displays the total number of risks by region over the last 24 hours in a donut chart.

**Risks by Signature. **Provides details on risks by signature name and identifier over the last 24 hours in a table chart.

**Risks by Account.** Displays the total number of risks by account name over the last 24 hours in a column chart.
