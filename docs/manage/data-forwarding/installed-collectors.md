---
id: installed-collectors
title: Forward Data from an Installed Collector
description: Learn how to set up data forwarding destinations for Installed Collectors.
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import useBaseUrl from '@docusaurus/useBaseUrl';

You can set up one or more data forwarding destinations and configure an Installed Collector to send raw log data from specified sources to those destinations. The collector will send the raw data to external destinations at the same time it sends data to Sumo Logic.

You can forward raw log data using the following protocols.

* Syslog (TCP and UDP)—Send log data to a syslog server.
* Generic REST API—Send log data to a web services endpoint.
* Hitachi Data Systems HTTP REST API—Send log data to Hitachi Content Platform (HCP).

Follow the steps below to set up a collector to forward raw log data to an external destination.

You can set up Installed Collector data forwarding when you first configure sources or at a later time. If you apply rules at a later time, keep in mind that they are not applied retroactively.

:::note
Data forwarding processing rules are processed after all other [processing rules](/docs/send-data/collection/processing-rules).
:::

## Step 1: Configure data forwarding destination

You need the [Manage Collectors role capability](/docs/manage/users-roles/roles/role-capabilities/#data-management) to create a data forwarding destination.

To set up a data forwarding destination:

1. [**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu select **Data Management**, and then under **Data Collection** select **Data Archiving**. You can also click the **Go To...** menu at the top of the screen and select **Data Archiving**. <br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Data Archiving**. 
1. Click **+ Destination** to add a new destination.
1. Select one of these options for **Destination Type**. 
   * Hitachi
   * Generic REST
   * Syslog
1. Enter a name to identify the destination.
1. Follow the instructions for your destination type in [Config settings for each destination type](#config-settings-for-each-destination-type) and then click **Save** to save the information and add the new destination to the list.

### Config settings for each destination type

Follow the instructions for the destination type you chose.
<Tabs
  groupId="destinations"
  defaultValue="rest"
  values={[
    {label: 'Generic REST and Hitachi', value: 'rest'},
    {label: 'Syslog', value: 'syslog'},
    {label: 'AWS Archive Bucket', value: 'archive'},
  ]}>

  <TabItem value="rest">

  * **URL**. Enter a URL to access the destination.
  * **Object ID** (Optional). Enter a path name or other file format and include any of the following variables:
    * `{day}` - Replace with the day of the year in the yyyy-MM-dd format.
    * `{hour}` Replace with hour in day (0-23).
    * `{minute}` Replace with minute in hour.
    * `{second}` Replace with second in hour.
    * `{uuid}` Replace with a unique, randomly generated identifier (UUID)

  * **Username and Password**. Enter the credentials to access the destination. These are placed in a Basic Auth header in the HTTP request from the collector.  If you're sending to a Sumo Logic HTTP source this header is simply ignored and your data is ingested. You must have administrator privileges for the collector.


</TabItem>
<TabItem value="syslog">

* **Protocol**. Select the protocol (TCP or UDP) for sending the syslog messages.
* **Host**. Fully qualified hostname of the target syslog server.
* **Port**. Enter the port for sending the syslog messages.
* **Token**. Enter the token to prepend when forwarding a message via syslog. The token uses the following special variables:
  * `{file}` Maps to the name of the originating file, when applicable.
  * `{hostname}` Name of the host that originated the message.
  * `{category}` Category of the source that collected this message.

</TabItem>
<TabItem value="archive">

:::note
Data forwarding to S3 Archive locations will forward log data from Installed Collectors to AWS S3 buckets to collect at a later time. Data **will not** be forked to both Sumo Logic and AWS S3. In that case, you will want to send the data to Sumo Logic first and then configure [forwarding data from Sumo Logic to S3](/docs/manage/data-forwarding/forward-data-from-sumologic/).
:::

* **Bucket Name**. Enter the exact name of the S3 bucket. You can create only one destination with a particular bucket name. If you try to create a new destination with the bucket name of an existing destination, the new destination replaces the old one.
*  **Description**. (Optional)
* **S3 Region**. Select the S3 region or keep the default value of **Others**. The S3 region must match the appropriate S3 bucket created in your Amazon account.
* **AWS Access**. Select **Role-based access** or **Key access** based on the AWS authentication you are providing. Role-based access is preferred, this was completed in the prerequisite step [Grant Access to an AWS Product](/docs/send-data/hosted-collectors/amazon-aws/grant-access-aws-product).
  * For **Role-based access**, enter the Role ARN that was provided by AWS after creating the role.
  * For **Key access** enter the Access Key ID and Secret Access Key. See [Manage access keys for IAM users](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html) for details.

</TabItem>
</Tabs>


## Step 2: Configure processing rules for data forwarding

In this procedure, you define one or more processing rules that define the raw log data from a source that you want to send to the external destination. Data forwarding processing rules are processed after all other processing rules.

There are several methods you can use to configure processing rules: 

* In Sumo Logic - See the instructions below.
* With JSON - See [Use JSON to Configure Sources](/docs/send-data/use-json-configure-sources). 
* Collector Management API - See [Collector Management APIs](/docs/api/collector-management) for instructions on using the API to configure sources for data forwarding.
* Local source configuration files -  See [Local Configuration File Management](/docs/send-data/use-json-configure-sources/local-configuration-file-management) for general information on managing sources using local file configuration.

**To configure processing rules for data forwarding using the web application**

1. [**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu select **Data Management**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**. <br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. 
1. Search for the source that you want to configure, and click the **Edit** link for the source. The source must be associated with an Installed Collector.
1. Scroll down to the **Processing Rules** section and click the arrow to expand the section.
1. Click **Add Rule**.
1. Enter a name to define the rule.
1. In the **Filter** field, enter the regular expression that defines the messages you want to forward. The regular expression must be [RE2 compliant](https://github.com/google/re2/wiki/Syntax). For example, the regular expression `.*ERROR.*` matches all messages that contain ERROR. For more information about creating processing rules, see [Create a Processing Rule](/docs/send-data/collection/processing-rules/create-processing-rule).
1. Select **Forward messages that match** as the rule type. This option is visible only if you have defined at least one data forwarding destination, as described in the previous section. 
1. Select the Destination from the dropdown menu. If a **Syslog Destination Type** is selected, an option to select **Transparent Forwarding** is provided. Syslog forwarding by default prepends a timestamp and hostname to messages to ensure they comply with RFC 3164. If your syslog messages already comply, you can enable **Transparent Forwarding** to disable the default prepending behavior. <br/><img src={useBaseUrl('img/manage/data-forwarding/transparent-syslog-forwarding-option.png')} alt="Transparent Forwarding toggle " style={{border: '1px solid gray'}} width="400" />
1. Click **Apply**. The new rule is listed along with any other previously defined processing rules.
1. Click **Add Rule** if you want to add another rule. <br/><img src={useBaseUrl('img/manage/data-forwarding/ProcessingRule.png')} alt="Add Rule button " style={{border: '1px solid gray'}} width="400" />
1. Click **Save** to save the rules you defined and start forwarding data that matches the rules.

## Configuring the size of forwarded syslog messages

In accordance with RFC 3164, by default the collector forwards syslog messages in 1024-byte segments, sending each segment as a separate message. To change the segment size, add the `forwarding.syslog.maxMessageSize` property to the collector's `collector.properties` file (in the collector's config directory) and restart the collector. Specify the desired size in bytes. For example:

```
forwarding.syslog.maxMessageSize = 2048
```

## Configure data forwarding queue size

In collector version 19.216-22 and later, in-memory storage of an Installed Collector’s data forwarding queue is backed by disk storage. When the in-memory queue reaches a given size, the collector extends the queue on disk.

Sumo Logic allocates memory and disk storage for data to be forwarded to REST and TCP syslog destinations. By default, Sumo Logic allocates:

* 8MB of memory and 500MB of disk storage for each syslog destination.<br/>
    :::note
    Data forwarding using UDP isn't queued.
    :::
* 8MB of memory and 500MB of disk storage for each REST endpoint.  

You can add properties to the `collector.properties` file, in the collector's `/config` directory, to specify how much memory and disk the data forwarding queue can consume. The limits you specify for a destination type will apply to each destination of that type.

After the memory and disk limits are reached, data will be dropped, so the limits should not be set too low.

| Property | Description |
| :-- | :-- |
| `queue.rest.max.memory.mb` | Specifies the amount of memory allocated to the data forwarding queue for each REST destination.<br/><br/>Default: 8MB |
| `queue.rest.max.disk.mb` | Specifies the amount of disk space allocated to the data forwarding queue for each REST destination.<br/><br/>Default: 500MB |
| `queue.syslog.max.memory.mb` | Specifies the amount of memory allocated to the data forwarding queue for each syslog destination.<br/><br/>Default: 8MB |
| `queue.syslog.max.disk.mb` | Specifies the amount of disk space allocated to the data forwarding queue for each syslog destination.<br/><br/>Default: 500MB |
