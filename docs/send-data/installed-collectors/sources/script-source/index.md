---
slug: /send-data/installed-collectors/sources/script-source
title: Script Source
description: Uses a script to fetch from custom sources of data, such a database or a third-party monitoring app.
---



If you need to collect data that isn't stored in log files, like system performance metrics, database records, or perhaps data output from third-party monitoring solutions you can use a Script Source that runs a script to fetch those custom sources of data from your machine's standard output and error streams. The script executes at defined intervals and then sends the data to Sumo for analysis. This allows you to collect all sorts of data from any supported OS, including data from command-line tools such as iostat, transient, or unstable data sources.

The Collector executes the script as the user running the Collector process. Your script needs to output the data to your machine's `stdout` or `stderror` output streams to be collected.

Once a Script Source is configured, access to the machine running the Collector associated with the Source is granted to all Sumo users with roles that include collector management.

## Preparing your script

Collecting from a Script Source depends on a well-constructed script. When considering the data you'd like to collect through a script, keep the following in mind:

* The script must run on the host computer; remote scripts won't result in data collection. The Script Source assumes that the Collector is running on the host where the script is executed. However, the script itself can connect to remote hosts to gather relevant information.
* Supported script types:

  * .bat (Windows only)
  * Visual Basic (Windows only)
  * PowerShell (Windows only)
  * Ruby
  * Python
  * Perl
  * csh
  * bash

* Wildcards are not supported in these scripts.

Data from `stdout` and `stderror` streams are collected.

## Configuring a Script Source

To configure a Script Source:

1. Collectors using version 19.245-4 and later do not allow Script Sources to run by default. To allow Script Sources you need to set the Collector parameter `enableScriptSource=true` in [user.properties](/docs/send-data/installed-collectors/collector-installation-reference/user-properties.md)  and restart the Collector.
1. In Sumo select **Manage Data** > **Collection** > **Collection**.
1. Find the name of the Installed Collector to which you'd like to add a Source. Click **Add...** then choose **Add Source** from the pop-up menu.
1. Select **Script** for the source type.
1. Enter a **Name** to display for the new Source. Description is optional. Source name metadata is stored in a searchable field called `_sourceCategory`.
1. For **Source Host**, enter the hostname or the IP address of the machine. The hostname is stored in a searchable field called `_sourceHost`. The hostname can be a maximum of 128 characters. You can define a Source Host value using system environment variables, see [Configuring sourceCategory and sourceHost using variables](#configuring-a-script-source), below.
1. For **Source Category**, enter any information you'd like to include in the metadata. This Source Category value is stored in a searchable metadata field called _sourceCategory. See our [Best Practices: Good and Bad Source Categories](/docs/send-data/best-practices#good-and-bad-source-categories). You can define a Source Category value using system environment variables, see [Configuring sourceCategory and sourceHost using variables](#configuring-sourcecategory-and-sourcehost-using-variables), below.
1. **Fields.** Click the **+Add Field** link to define the fields you want to associate, each field needs a name (key) and value.

   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo that does not exist in the Fields schema it is ignored, known as dropped.
1. For **Frequency**, choose one of the following:

   * An option to run the script at the selected frequency.
   * **Other (CRON Expression)** if you'd like to set a customized frequency using a CRON Expression, then type the [CRON Expression](cron-examples-reference.md) in the **Expression** text box. Using a CRON Expression allows you to specify an exact time for your script to run, like each day at 2:15 pm, or Monday through Friday at midnight.

    See details below on the behavior of unfinished script executions related to its frequency.

1. If you'd like to [set a timeout for your script](#when-should-i-set-a-timeout-for-my-script), select **Specify a timeout for your command**. If you don't need a timeout, or if you're running a script once daily, we recommend that you leave this option deselected. 
1. For **Command**, select or type a custom command you're going to use.

   * To provide a custom command use the delete or backspace key to clear out the selection, then type your command. The command must be in the format: `/path/to/command;file extension` Provide a path and an extension separated by a semicolon (`;`). For example, a Python command:  `/bin/python;py`
   * If selecting a command, the provided options depend on the operating system you're using:

     * Mac/Linux Options
        ![script source cmd options.png](/img/send-data/script-source-cmd-options.png)
     * Windows Options  
        ![script source win cmds.png](/img/send-data/script-source-win-cmds.png)

1. For **Script**, do one of the following:

   * Choose **Type a path to the script to execute** if you have the script saved to a file location.
   * Choose **Type the script to execute** if you'd like to enter the script directly in the Sumo web app. Then type the script in the text box.

1. For **Working Directory**, you'll only need to enter a path if your script refers to a file indirectly. So, enter the path of the file you'd like to collect if required; otherwise, this option can remain blank.
1. Under **Advanced** you'll see options regarding timestamps and time zones:

   * **Timestamp Parsing**. By default **Extract timestamp information from log file entries** is selected, meaning that we use the timestamp information from the data you collect. Deselecting this option turns off all timestamp parsing.
   * **Time Zone.** Select an option under **Use time zone from log file, but if none present use**. Or, if you'd like to override all time zones from data you collect, choose an option under **Ignore time zone and instead use**.

1. **Enable** **Multiline Processing**, see [Collecting Multiline Logs](/docs/send-data/reference-information/collect-multiline-logs) for details on multiline processing and its options.
1. If you'd like to filter data being collected, set **Processing Rule** options. [Hash and Mask filters](/docs/send-data/collection/processing-rules/create-processing-rule.md) can be used to obfuscate proprietary information included in data collected from a script source.
1. Click **Save** to complete the Source setup.

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

If a user-defined variable doesn’t exist, that portion of the metadata field will be blank.

## When should I set a timeout for my script?

A timeout essentially allows a grace period for a script to finish. Without it, when the next run of the script is scheduled to go, and the script hasn't finished, the Collector will kill the script before running it again. If you're running a long script that needs to complete on its own, setting a timeout will cancel the next scheduled run and all subsequent ones that fall within the timeout period). However, after the timeout, it's important to note that if the script still hasn't finished, it will be killed by the Collector.
