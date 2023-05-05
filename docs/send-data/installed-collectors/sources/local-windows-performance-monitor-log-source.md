---
id: local-windows-performance-monitor-log-source
title: Local Windows Performance Monitor Log Source
description: Collect local performance data from the Windows Performance Monitor.
---



Set up a Local Windows Performance Monitor Log Source to collect performance data that you would normally see in the Windows Performance Monitor. Setting up a Local Windows Performance Monitor Log Source is a quick process. There are no prerequisites for setting up the Source, and you'll begin collecting logs within a minute or so.

:::important
Local Windows Performance Monitor Log Sources can only be configured on systems running Windows Server 2012 and later.
:::

Windows Performance Monitor Sources use the WMI Query Language (WQL) to collect data at a frequency you choose. To learn more, see [Querying with WQL](http://msdn.microsoft.com/en-us/library/windows/desktop/aa392902(v=vs.85).aspx) at
MSDN.

To configure a Local Windows Performance Monitor Log Source:

1. In Sumo Logic, select **Manage Data** > **Collection** > **Collection**.
1. Find the name of the installed Collector to which you’d like to add a Source. Click **Add **and then choose **Add** **Source** from the menu. 
1. Click **Windows Performance**. 
1. Choose **Local** for the Type of **Windows Performance Source**. 
1. Set the following:

   * **Name.** Type the name to display for the new Source. **Description** is optional.
   * **Frequency.** Depending on your Windows system and its needs, select a frequency to run the selected queries. If your Windows system is relatively stable, a frequency of 15m should be appropriate. (Selecting a frequency of 1m could flood your system with logs and create an undesirable outcome.)
   * **Source Category.** Enter a string used to tag the logs collected from this Source with searchable metadata. For example, typing `web_apps` tags all the logs from this Source in the sourceCategory field, so running a search on `_sourceCategory=web_apps` would return logs from this Source. For more information, see [Metadata Naming Conventions](/docs/send-data/reference-information/metadata-naming-conventions.md) and our [Best Practices: Good Source Category, Bad Source     Category](/docs/send-data/best-practices). You can define a Source Category value using system environment variables, see [Configuring sourceCategory using variables](local-windows-performance-monitor-log-source.md) below.
   * **Fields.** Click the **+Add Field** link to define the fields you want to associate, each field needs a name (key) and value.

      * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
      * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo that does not exist in the Fields schema it is ignored, known as dropped.
1. **Processing Rules.** (Optional.) To add rules or filters click **Add Rule**. Enter a name, a filter, and select the type. Then click **Apply**.
1. **Perfmon Queries.** Select from the provided default Perfmon Queries, or create your own custom query.

    ![windows performance source.png](/img/send-data/windows-performance-source.png)

      * Click the query's check box to select it.
      * To add a custom query, click **Add Query**, enter a name and the query. Then click **Add**.
1. When you are finished configuring the Source, click **Save**.

You can return to this dialog and edit the settings for the Source at
any time.

## Configuring sourceCategory using variables

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
