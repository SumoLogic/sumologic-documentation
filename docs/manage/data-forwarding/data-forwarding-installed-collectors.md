---
id: data-forwarding-installed-collectors
---

# Forward Data from an Installed Collector

You can set up one or more data forwarding destinations and configure an Installed Collector to send raw log data from specified Sources to those destinations. The Collector will send the raw data to external destinations at the same time it sends data to Sumo.

You can forward raw log data using the following protocols.

* Syslog (TCP and UDP)—Send log data to a syslog server.
* Generic REST API—Send log data to a web services endpoint.
* Hitachi Data Systems HTTP REST API—Send log data to Hitachi Content Platform (HCP).

Follow the steps below to set up a Collector to forward raw log data to an external destination.

You can set up Installed Collector data forwarding when you first configure Sources or at a later time. If you apply rules at a later time, keep in mind that they are not applied retroactively.

:::note
Data forwarding processing rules are processed after all other [processing rules](/docs/manage/collection/processing-rules).
:::

## Configure data forwarding destination

You need the [Manage Collectors role capability] (../Users-and-Roles/Manage-Roles/05-Role-Capabilities.md "Role Capabilities") to create a data forwarding destination.

To set up a data forwarding destination:

1. Choose **Manage Data \> Logs \> Data Forwarding**.
1. Click **+** to add a new destination.
1. Select one of these options for **Destination Type**.  

   * Hitachi
   * Generic REST
   * Syslog

1. Enter a name to identify the destination.
1. (Generic REST and Hitachi) **URL**. Enter a URL to access the destination.
1. (Generic REST and Hitachi) **Object id**. (optional) Enter a path name or other file format and include any of the following variables: 

    * `{day}` Replace with the day of the year in the yyyy-MM-dd format.
    * `{hour}` Replace with hour in day (0-23).
    * `{minute}` Replace with minute in hour.
    * `{second}` Replace with second in hour.
    * `{uuid}` Replace with a unique, randomly generated identifier (UUID)

1. (Generic REST and Hitachi) Enter a **Username** and **Password** to access the destination. These are placed in a Basic Auth header in the HTTP request from the Collector.  If you're sending to a Sumo Logic HTTP Source this header is simply ignored and your data is ingested. You must have administrator privileges for the Collector.
1. (syslog) **Protocol**. Select the protocol (TCP or UDP) for sending the syslog messages.
1. (syslog) **Port**. Enter the port for sending the syslog messages.
1. (syslog) **Token**. Enter the token to prepend when forwarding a message via syslog. The token uses the following special variables:

    * `{file}` Maps to the name of the originating file, when applicable.
    * `{hostname} `Name of the host that originated the message.
    * `{category}` Category of the source that collected this message.

1. Click **Save** to save the information and add the new destination to the list.

## Configure processing rules for data forwarding

In this procedure, you define one or more processing rules that define the raw log data from a Source that you want to send to the external destination. Data forwarding processing rules are processed after all other processing rules.

There are several methods you can use to configure processing rules: 

* Sumo Web Application - See the instructions below.
* With JSON - See [Creating Processing Rules Using a JSON File] (../../03Send-Data/Sources/03Use-JSON-to-Configure-Sources.md "Use JSON to Configure Sources"). 
* Collector Management API - See [Collector Management API] (../../APIs/Collector-Management-API.md "Collector Management API") for instructions on using the API to configure sources for Data Forwarding.
* Local Source configuration files -  See [Local File Configuration Management] (../../03Send-Data/Sources/03Use-JSON-to-Configure-Sources/Local-Configuration-File-Management.md "Local Configuration File Management") for general information on managing sources using local file configuration.

**To configure processing rules for data forwarding using the web
application**

1. Go to **Manage Data** \> **Collection** \> **Collection**.
1. Search for the source that you want to configure, and click the **Edit** link for the source. The source must be associated with an Installed Collector.
1. Scroll down to the **Processing Rules** section and click the arrow to expand the section.
1. Click **Add Rule**.
1. Enter a name to define the rule.
1. In the Filter field, enter the regular expression that defines the messages you want to forward. The regular expression must be [RE2 compliant](https://github.com/google/re2/wiki/Syntax). For example, the regular expression `.*ERROR.*` matches all messages that contain ERROR. 

    For more information about creating processing rules, see [Create a Processing Rule](../collection/processing-rules/create-processing-rule.md).

1. Select **Forward messages that match** as the rule type. This option is visible only if you have defined at least one data forwarding destination, as described in the previous section. 
1. Select the Destination from the drop-down menu. If a **Syslog Destination Type** is selected, an option to select **Transparent Forwarding** is provided. Syslog forwarding by default prepends a timestamp and hostname to messages to ensure they comply with RFC 3164. If your syslog messages already comply, you can enable **Transparent Forwarding** to disable the default prepending behavior.    
    
    ![transparent syslog forwarding option.png](/img/data-forwarding/transparent-syslog-forwarding-option.png)

1. Click **Apply**. The new rule is listed along with any other previously defined processing rules.
1. Click **Add Rule** if you want to add another rule.
    
    ![ProcessingRule.png](/img/data-forwarding/ProcessingRule.png)

1. Click **Save** to save the rules you defined and start forwarding data that matches the rules.

## Configuring the size of forwarded syslog messages

In accordance with RFC 3164, by default the Collector forwards syslog messages in 1024-byte segments, sending each segment as a separate message. To change the segment size, add the `forwarding.syslog.maxMessageSize` property to the Collector's `collector.properties` file (in the Collector's config directory) and restart the Collector. Specify the desired size in bytes. For example:

```
forwarding.syslog.maxMessageSize = 2048
```

## Configure data forwarding queue size

In Collector version 19.216-22 and later, in-memory storage of an Installed Collector’s data forwarding queue is backed by disk storage. When the in-memory queue reaches a given size, the Collector extends the queue on disk.

Sumo allocates memory and disk storage for data to be forwarded to REST and TCP syslog destinations. By default, Sumo allocates:

* 8MB of memory and 500MB of disk storage for each syslog destination.

    :::note
    Data forwarding using UDP isn't queued.
    :::

* 8MB of memory and 500MB of disk storage for each REST endpoint.  

You can add properties to the collector.properties file, in the Collector's /config directory, to specify how much memory and disk the data forwarding queue can consume. The limits you specify for a destination type will apply to each destination of that type.

After the memory and disk limits are reached, data will be dropped, so the limits should not be set too low

| Property | Description |
| -- | -- |
| `queue.rest.max.memory.mb` | Specifies the amount of memory allocated to the data forwarding queue for each REST destination.<br/><br/>Default: 8MB |
| `queue.rest.max.disk.mb` | Specifies the amount of disk space allocated to the data forwarding queue for each REST destination.<br/><br/>Default: 500MB |
| `queue.syslog.max.memory.mb` | Specifies the amount of memory allocated to the data forwarding queue for each Syslog destination.<br/><br/>Default: 8MB |
| `queue.syslog.max.disk.mb` | Specifies the amount of disk space allocated to the data forwarding queue for each Syslog destination.<br/><br/>Default: 500MB |
