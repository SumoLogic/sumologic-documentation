---
id: collect-forwarded-events-windows-event-collector
title: Collect Forwarded Events from a Windows Event Collector
description: Use a Windows Event Source to collect forwarded events from a Windows Event Collector.
---



A Sumo Logic Windows Event Log Source can track and collect forwarded events from a [Windows Event Collector](https://docs.microsoft.com/en-us/windows/win32/wec/windows-event-collector). A Windows Event Collector receives forwarded events from other remote Windows computers.

To collect forwarded events from a Windows Event Collector you need to create a dedicated Windows Event Log Source on the same local machine as the Windows Event Collector. When configuring the Windows Event Log Source in Sumo Logic you'll only select **Forwarded Events** from the checkbox options for **Windows Event Types**. If you have custom Forwarded Event Channels you can additionally specify them in the Custom Event Channels textbox.

If you need to collect from different channels you need to create a separate Source for each **Windows Event Type**. For example, each of the following types should have its own dedicated Source:

* Collect Standard Event Channels Application, System, and Security.
* Collect Forwarded Events
* Custom Event Channels (except for custom forwarding channels)

## Requirements

* Windows Server 2012 and later.
* Collector version 19.338-5 or newer.

## Create a Windows Event Log Source

To configure a Windows Event Log Source:

1. In Sumo Logic, select **Manage Data** > **Collection** > **Collection**.

1. Find the name of the Installed Collector to which you'd like to add a source. Click **Add** and then choose** Add Source** from the pop-up menu.

    ![add source from collection page.png](/img/send-data/add-source-from-collection-page.png)

1. Select the **Windows Event Log** Source.

    ![windows event log source icon.png](/img/send-data/windows-event-log-source-icon.png)

1. Choose **Local** or **Remote** for **Type of Windows Source**. Remote types require you to [configure a few settings](preconfigure-machine-collect-remote-windows-events.md) to enable remote access. A Remote Windows Event Log Source uses a single Sumo Logic Collector to collect Windows event log entries from multiple remote systems.

    ![type of windows event log source.png](/img/send-data/windows-event-log-source.png)

1. Set the following: 
   * **Name.** Type the name you'd like to display for this source in Sumo Logic. 
   * **Description.** Optional description.
   * **Windows host(s).** (Remote Source only.) Enter one or more hostnames for the Windows machines from which you want to collect Windows Events. If you'd like to collect from more than one remote host, separate the hostnames with a comma. (If you enter more than one hostname, each host must allow event log access from the same domain user. See the [prerequisites](preconfigure-machine-collect-remote-windows-events.md) for more information.) The hostname can be a maximum of 128 characters. 
     :::note
     The hostname values are parsed and applied to your event logs as `_sourceHost `[metadata](remote-windows-event-log-source.md) automatically. The value is parsed from the field `Computer` in your event logs. `Channel` or `LogFile` values are parsed and applied as `_sourceName` metatdata automatically. The `_sourceHost` and `_sourceName` metadata fields are supported in log search but not LiveTail. 
     :::
   * **Source Category.** Enter a string to tag the logs collected from this Source with searchable metadata. For example, typing **web_apps** tags all the logs from this Source in the sourceCategory field. For more information, see [Metadata Naming Conventions](/docs/send-data/reference-information/metadata-naming-conventions.md) and our [Best Practices: Good and Bad Source Categories](/docs/send-data/best-practices#good-and-bad-source-categories). You can define a Source Category value using system environment variables, see [Configuring sourceCategory using variables](#configuring-sourcecategory-using-variables) below.
   * **Fields.** Click the **+Add Field** link to define the fields you want to associate, each field needs a name (key) and value.

      * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
      * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo that does not exist in the Fields schema it is ignored, known as dropped.

   * **Windows Domain. (Remote Source only)** Type the name of the Windows domain, the username for this host, and the password. 
   * **Event Format**. Select how you want your event logs formatted:

        ![JSON format name update.png](/img/send-data/JSON-format-name-update.png)

     * **Collect using legacy format**. Events retain their default text format from Windows.
     * **Collect using JSON format**. Events are formatted into JSON that is designed to work with Sumo Logic features, making it easier for you to reference your data.

     :::note
     The Windows JSON App requires **JSON format**.
     :::

   * **Windows Event Types.** Select **Forwarded Events**. If you have custom Forwarded Event Channels you can additionally specify them in the **Custom Event Channels** textbox. 

        ![forwarded events checkbox Windows Event Source.png](/img/send-data/forwarded-events-checkbox-Windows-Event-Source.png)

        If you need to collect from different channels you need to create a separate Source for each **Windows Event Type**. For example, each of the following types should have its own dedicated Source:

     * Collect Standard Event Channels Application, System, and Security.
     * Collect Forwarded Events
     * Custom Event Channels (except for custom forwarding channels)            

   * **Custom Event Channels** allows you to specify, in a comma-separated list, the channels you'd like to collect from. You can specify custom Forwarded Events Channels. If you need help finding channels on the machine where the Source is installed, see [Windows Event Source Custom Channels](windows-event-source-custom-channels.md). Do not enter Standard Event Channels or Forwarded Events in the Custom Events Channels text box. To collect from custom event channels in a Local Event Source, the Collector must have version 19.118 or later installed.
   * Depending on the **Event Format** selected, you'll have different options.

     * **Event Collection Level**. When JSON format is selected you have the option to select:

    ![event levels.png](/img/send-data/event-levels.png)

       * **Complete Message** will ingest the entire event content along with metadata.
       * **Concise Message** will ingest the first line of event messages along with all of the metadata.
       * **Metadata Only** will ingest metadata fields from each event, including event ID and timestamp. The Windows JSON App requires **Complete Message**.
     * **Metadata.** When the legacy format is selected choose whether you would like the collector to minimize the amount of data collected by omitting the full message text of each event. Core metadata fields such as event ID, timestamp, user name, as well as the unformatted event data will still be present. This can reduce data usage and increase event throughput, but will prevent many dashboards and apps from correctly extracting data.

        :::note
        To omit full event text and only collect event metadata, the collector must have version 19.155 or later installed.
        :::

    ![legacy metadata option.png](/img/send-data/legacy-metadata-option.png)

   * **Collection should begin**. Choose or enter how far back you'd like to begin collecting historical logs. You can either:

     * Choose a predefined value from dropdown list, ranging from “Now” to “24 hours ago” to “All Time”, or
     * Enter a relative value. To enter a relative value, click the **Collection should begin** field and press the delete key on your keyboard to clear the field. Then, enter a relative time expression, for example “-1w”. You can define when you want collection to begin in terms of months (M), weeks (w), days (d), hours (h) and minutes (m).

       :::note
       When updating the **Collection should begin** setting you will need to restart the Collector.
       :::
     
       :::note
       {@import ../../../reuse/collection-should-begin-note.md}
       :::

   * **Security Identifier**. Collectors on version 19.182 or later can map [security identifiers](https://docs.microsoft.com/en-us/troubleshoot/windows-server/identity/security-identifiers-in-windows) (SIDs) to usernames. During collection, the `Security ``ID` field in your log `message` (if you selected **Complete Message**) is translated into the format of your choice. Choose:

     * Both Security Identifier and Username
     * Security Identifier Only
     * Username Only (Default) For example, in the following snippet of a security event `message` we have chosen both Security Identifier and Username:

        ```
        "An account was logged off.

        Subject:
            Security ID:        NT AUTHORITY\SYSTEM (S-1-5-18)
            Account Name:        IP-C6136038$
            Account Domain:        CORP
            Logon ID:        0x1B522D52
        ```

        If we would have chosen Security Identifier Only, the `Security ID` field would be `S-1-5-18`. If we would have chosen Username Only, the `Security ID` field would be `NT AUTHORITY\SYSTEM`.
    * Create any Processing Rules you'd like for the new Source.

1. Click **Save**.

You can return to this dialog and edit the settings for the Source at any time.

## Configuring sourceCategory using variables

Collector versions 19.216-22 and later allow you to define Source Category and Source Host metadata values with system environment variables from the host machine.

:::note
Not all Sources can define a Source Host value.
:::

When configuring your Source, specify the system environment variables by prepending sys. and wrapping them in double curly brackets `{{}}` in this form:

`{{sys.VAR_NAME}}`

Where VAR_NAME is an environment variable name, for example:

`{{sys.PATH}}`

You can use multiple variables, for example:

`{{sys.PATH}}-{{sys.YourEnvVar}}`

![environment-variable-usage](/img/send-data/environment-variable-usage.png)

:::tip
The example above uses a hyphen - character to separate variable components. Separator characters are not required. Curly brackets and spaces are not allowed. Underscores and hyphens are recommended.
:::

You can incorporate text in the metadata expression, for example:

`AnyTextYouWant_{{sys.PATH}}_{{sys.YourEnvVar}}`

If a user-defined variable doesn’t exist, that portion of the metadata field will be blank.
