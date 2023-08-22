---
id: local-windows-event-log-source
title: Local Windows Event Log Source
description: You can collect local events from the Windows Events Viewer.
---



Set up a Local Windows Event Log Source to collect local events you would normally see in the Windows Event Viewer. Setting up a Local Windows Event Source is a quick process. There are no prerequisites for setting up the Source, and you'll begin collecting logs within a minute or so.

:::note
Local Windows Events Sources can only be configured on systems running Windows Server 2012 and later. New features require the latest Collector version.
:::

Local Windows Event Log Sources are only for collecting Windows Event Logs. All other types of log Sources need to be configured either as a Remote File Source or as a Local File Source.

To configure a Local Windows Event Log Source:

1. In Sumo Logic, select **Manage Data** > **Collection** > **Collection**.

1. Find the name of the installed collector to which you'd like to add a Source. Click **Add** and then choose** Add Source** from the pop-up menu.

    ![add source from collection page.png](/img/send-data/add-source-from-collection-page.png)

1. Click **Windows Event Log**.

    ![windows event log source icon.png](/img/send-data/windows-event-log-source-icon.png)

1. Choose **Local** for **Type of Windows Source**.

    ![type of windows event log source.png](/img/send-data/type-windows-event-log-source.png)

1. Set the following:

    :::note
    Hostname values are parsed and applied to your event logs as \_sourceHost [metadata](remote-windows-event-log-source.md) automatically. The value is parsed from the field `Computer` in your event logs.
    :::

   * **Name.** Type the name you'd like to display for the new Source. 
   * **Description** is optional.
   * **Source Category.** Enter a string used to tag the output collected from this Source with searchable metadata. For example, typing `web_apps` tags all the logs from this Source in the sourceCategory field, so running a search on `_sourceCategory=web_apps` would return logs from this Source. For more information, see [Metadata Naming Conventions](/docs/send-data/reference-information/metadata-naming-conventions.md) and our [Best Practices: Good and Bad Source Categories](/docs/send-data/best-practices#good-and-bad-source-categories). You can define a Source Category value using system environment variables, see [Configuring sourceCategory using variables](#configuring-sourcecategory-using-variables) below.
   * **Fields.** Click the **+Add Field** link to define the fields you want to associate, each field needs a name (key) and value.

      * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
      * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo that does not exist in the Fields schema it is ignored, known as dropped.
   * **Event Format**. Select how you want your event logs formatted:
        ![JSON format name update.png](/img/send-data/JSON-format-name-update.png)
     * **Collect using legacy format**. Events retain their default text format from Windows.
     * **Collect using JSON format**. Events are formatted into JSON that is designed to work with Sumo Logic features, making it easier for you to reference your data.

     :::note
     To **Collect using JSON format** the Collector must have version 19.319.2 or later installed. The Windows JSON App requires **JSON format**.
     :::

   * **Windows Event Types.** Select the event types you want to collect:

        ![windows events types 2021 June.png](/img/send-data/windows-events-types.png)

     * **Standard Event Channels**. Select the main check box for all types, or individual check boxes for specific types (Security, Application, and/or System).
     * **Forwarded Events**. See how to [Collect Forwarded Events from a Windows Event Collector.](collect-forwarded-events-windows-event-collector.md)
     * **Custom Event Channels** to specify, in a comma-separated list, the channels you'd like to collect from. If you need help finding channels on the machine where the Source is installed, see [Windows Event Source Custom Channels](local-windows-event-log-source.md).  To collect from custom event channels in a Local Event Source, the Collector must have version 19.118 or later installed.

   * Depending on the **Event Format** selected, you'll have different options.
     * **Event Collection Level**. When JSON format is selected you have the option to select:

        ![event levels.png](/img/send-data/event-levels.png)

     * **Complete Message** will ingest the entire event content along with metadata.
     * **Concise Message** will ingest the first line of event messages along with all of the metadata.
     * **Metadata Only** will ingest metadata fields from each event, including event ID and timestamp. The Windows JSON App requires **Complete Message**.
     * **Event IDs.** (Available in Collector version 19.351-4 and later.) You can set allow and deny Windows Event ID filters to only collect important events. Select the checkbox next to the type of filter you want to set, we recommend only using one at a time. Your list needs to be a comma-separated list of event IDs.

        ![windows event ID filter example.png](/img/send-data/windows-event-ID-filter-example.png)

     * **Metadata.** When the legacy format is selected choose whether you would like the collector to minimize the amount of data collected by omitting the full message text of each event. Core metadata fields such as event ID, timestamp, user name, as well as the unformatted event data will still be present. This can reduce data usage and increase event throughput, but will prevent many dashboards and apps from correctly extracting data. To omit full event text and only collect event metadata, the collector must have version 19.155 or later installed.

    ![legacy metadata option.png](/img/send-data/legacy-metadata-option.png)

   * **Collection should begin**. Choose or enter how far back you'd like to begin collecting historical logs. You can either:

     * Choose a predefined value from dropdown list, ranging from “Now” to “24 hours ago” to “All Time”.
     * Enter a relative value. To enter a relative value, click the **Collection should begin** field and press the delete key on your keyboard to clear the field. Then, enter a relative time expression, for example “-1w”. You can define when you want collection to begin in terms of months (M), weeks (w), days (d), hours (h) and minutes (m).

       :::note   
       When updating the **Collection should begin** setting you will need to restart the Collector.
       :::
    
       :::note
       {@import ../../../reuse/collection-should-begin-note.md}
       :::

   * **Security Identifier**. Collectors on version 19.182-17 or later can map [security identifiers](https://docs.microsoft.com/en-us/troubleshoot/windows-server/identity/security-identifiers-in-windows) (SIDs) to usernames. During collection, the `Security ``ID` field in your log `message` (if you selected **Complete Message**) is translated into the format of your choice. Choose:

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

You can return to this dialog and edit the settings for the Source at
any time.

## Configuring sourceCategory using variables

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

If a user-defined variable doesn’t exist, that portion of the metadata field will be blank.
