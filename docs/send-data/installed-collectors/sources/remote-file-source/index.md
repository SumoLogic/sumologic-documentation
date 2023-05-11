---
slug: /send-data/installed-collectors/sources/remote-file-source
title: Remote File Source
description: You can collect file tail data from a remote system using SSH.
---


Log files collected using a Remote File Source must be encoded in UTF-8 or ASCII. If you are editing a Source, metadata changes are reflected going forward. Metadata for previously collected log data will not be retroactively changed.

Sumo Logic scans remote directories every 30 seconds.

:::note
To collect remote Windows logs using CIFS/SMB, see CIFS/SMB, see [Prerequisites for Remote Windows Event Log Collection](prerequisites-windows-remote-file-collection.md). To collect Windows Events, see [Configuring a Local Windows Event Log Source](../local-windows-event-log-source.md).
:::

To configure a Remote File Source:

1. First see [Prerequisites for Windows Remote File Collection](prerequisites-windows-remote-file-collection.md).
1. In Sumo Logic, select **Manage Data** > **Collection** > **Collection**.
1. Find the name of the installed Collector here you'd like to add a Source. Click **Add** and then choose** Add **Source from the pop-up menu.
1. Select **Remote File** for the Source type.   

    ![Remote File Source icon.png](/img/send-data/Remote-File-Source-icon.png) 

1. Set the following:

   * **Name.** Type the name you'd like to display for the new Source. **Description** is optional. Source name metadata is stored in a searchable field called `_sourceCategory`.
   * **Host.** Enter the hostname or the IP address of the remote machine (the hostname entered must be the system hostname or IP address and cannot be changed). The hostname is stored in a searchable field called `_sourceHost`. The hostname can be a maximum of 128 characters. You can define a Source Host value using system environment variables, see [Configuring sourceCategory and sourceHost using variables](#configuring-sourcecategory-and-sourcehost-using-variables) below.
   * **Port.** If your SSH server is listening on a nonstandard port, type the port number.
   * **Path Expression.** Enter the absolute path expression to the file the Source should tail. Remote File Sources support wildcards in file paths. If the timestamp formats for the files are not identical, set up a separate Remote File Source for each file. [For Windows collections using Open SSH and Cygwin](prerequisites-windows-remote-file-collection.md), specify the File path starting with **/cygdrive**. For example, if the path is "**C:\\mandy test\\6.log**" enter "**/cygdrive/c/mandy\\ test/6.log**" in the File field. Use "\\" to escape any spaces if they are present in the file path.
   * **Collection should begin.** Choose or enter how far back you'd like to begin collecting historical logs. You can either:

     * Choose a predefined value from dropdown list, ranging from “Now” to “24 hours ago” to “All Time”.
     * Enter a relative value. To enter a relative value, click the **Collection should begin** field and press the delete key on your keyboard to clear the field. Then, enter a relative time expression, for example “-1w”. You can define when you want collection to begin in terms of months (M), weeks (w), days (d), hours (h) and minutes (m).

   * **Source Category.** Type any string to tag the logs collected from this Source with searchable metadata. For example, type firewall to tag all entries from this Source in a field called _sourceCategory. See our [Best Practices: Good and Bad Source Categories](/docs/send-data/best-practices#good-and-bad-source-categories). You can define a Source Category value using system environment variables, see [Configuring sourceCategory and sourceHost using variables](#configuring-sourcecategory-and-sourcehost-using-variables) below.

   * **Fields.** Click the **+Add Field** link to define the fields you want to associate, each field needs a name (key) and value.

      * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
      * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo that does not exist in the Fields schema it is ignored, known as dropped.

1. Choose the type of Credentials used for this Source:

   * Username and Password. Enter valid user credentials for the remote machine.
   * Local SSH Config. Enter the username and the absolute path, including file name, to the PEM SSH key file located on the Collector host. Enter a password if required.

    ![remote file source credential input.png](/img/send-data/remote-file-source-credential-input.png)

1. Set any of the following under **Advanced.**

    ![Local File UI June 2021.png](/img/send-data/Local-File-UI.png)

    * **Denylist.** Optional. Add any files to be excluded by including one or more path expressions separated by commas. Note that this field takes a maximum of 10240 characters.
    * **Enable Timestamp Parsing.** This option is selected by default. If it's deselected, no timestamp information is parsed at all.
      * **Time Zone.** There are two options for Time Zone. You can use the time zone present in your log files, and then choose an option in case time zone information is missing from a log message. Or, you can have Sumo Logic completely disregard any time zone information present in logs by forcing a time zone. It's very important to have the proper time zone set, no matter which option you choose. If the time zone of logs can't be determined, Sumo Logic assigns logs UTC; if the rest of your logs are from another time zone your search results will be affected.
      * **Timestamp Format.** By default, Sumo Logic will automatically detect the timestamp format of your logs. However, you can manually specify a timestamp format for a Source. See [Timestamps, Time Zones, Time Ranges, and Date Formats](/docs/send-data/reference-information/time-reference for more information.

   * **Enable Multiline Processing.** See [Collecting Multiline Logs](/docs/send-data/reference-information/collect-multiline-logs) for details on multiline processing and its options. This is enabled by default. Use this option if you're working with multiline messages (for example, log4J or exception stack traces). Deselect this option if you want to avoid unnecessary processing when collecting single-message-per-line files (for example, Linux system.log). Choose one of the following:

     * **Infer Boundaries.** Enable when you want Sumo Logic to automatically attempt to determine which lines belong to the same message. If you deselect the **Infer Boundaries** option, you will need to enter a regular expression in the **Boundary Regex** field to use for detecting the entire first line of multiline messages.
     * **Boundary Regex.** You can specify the boundary between messages using a regular expression. Enter a regular expression that matches the entire first line of every multiline message in your log files.

1. Create any processing rules you'd like for the new Source.
1. When you are finished configuring the Source, click **Save**.

## Configuring sourceCategory and sourceHost using variables

Collector versions 19.216-22 and later allow you to define Source Category and Source Host metadata values with system environment variables from the host machine.

:::note
Not all Sources can define a Source Host value.
:::

When configuring your Source, specify the system environment variables by prepending sys. and wrapping them in double curly brackets `{{}}` in this form:

```
{{sys.VAR_NAME}}
```

Where VAR_NAME is an environment variable name, for example:

```
{{sys.PATH}}
```

You can use multiple variables, for example:

```
{{sys.PATH}}-{{sys.YourEnvVar}}
```

![img](/img/send-data/environment-variable-usage.png)

:::tip
The example above uses a hyphen - character to separate variable components. Separator characters are not required. Curly brackets and spaces are not allowed. Underscores and hyphens are recommended.
:::

You can incorporate text in the metadata expression, for example:

```
AnyTextYouWant_{{sys.PATH}}_{{sys.YourEnvVar}}
```
