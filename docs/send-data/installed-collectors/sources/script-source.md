---
slug: script-source
title: Script Source
description: Use a script to fetch from custom sources of data, such a database or a third-party monitoring app.
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

Collectors do not allow Script Sources to run by default. To allow Script Sources:

1. Set the Collector parameter `enableScriptSource=true` in [user.properties](/docs/send-data/installed-collectors/collector-installation-reference/user-properties)  and restart the Collector.
1. <!--Kanso [**Classic UI**](/docs/get-started/sumo-logic-ui/). Kanso--> In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. <!--Kanso <br/>[**New UI**](/docs/get-started/sumo-logic-ui-new/). In the Sumo Logic top menu select **Configuration**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**. Kanso-->
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
   * **Other (CRON Expression)** if you'd like to set a customized frequency using a CRON Expression, then type the [CRON Expression](cron-examples-reference.md) in the **Expression** text box. Using a CRON Expression allows you to specify an exact time for your script to run, like each day at 2:15 pm, or Monday through Friday at midnight. See details below on the behavior of unfinished script executions related to its frequency.
1. If you'd like to [set a timeout for your script](#when-should-i-set-a-timeout-for-my-script), select **Specify a timeout for your command**. If you do not need a timeout, or if you're running a script once daily, we recommend that you leave this option deselected. 
1. For **Command**, select or type a custom command you're going to use.
   * To provide a custom command use the delete or backspace key to clear out the selection, then type your command. The command must be in the format: `/path/to/command;file extension` Provide a path and an extension separated by a semicolon (`;`). For example, a Python command:  `/bin/python;py`
   * If selecting a command, the provided options depend on the operating system you're using:
     * Mac/Linux Options<br/>  ![script source cmd options.png](/img/send-data/script-source-cmd-options.png)
     * Windows Options<br/>  ![script source win cmds.png](/img/send-data/script-source-win-cmds.png)
1. For **Script**, do one of the following:
   * Choose **Type a path to the script to execute** if you have the script saved to a file location.
   * Choose **Type the script to execute** if you'd like to enter the script directly in the Sumo web app. Then type the script in the text box.
1. For **Working Directory**, you'll only need to enter a path if your script refers to a file indirectly. So, enter the path of the file you'd like to collect if required; otherwise, this option can remain blank.
1. Under **Advanced** you'll see options regarding timestamps and time zones:
   * **Timestamp Parsing**. By default **Extract timestamp information from log file entries** is selected, meaning that we use the timestamp information from the data you collect. Deselecting this option turns off all timestamp parsing.
   * **Time Zone.** Select an option under **Use time zone from log file, but if none present use**. Or, if you'd like to override all time zones from data you collect, choose an option under **Ignore time zone and instead use**.
1. **Enable Multiline Processing**. See [Collecting Multiline Logs](/docs/send-data/reference-information/collect-multiline-logs) for details on multiline processing and its options.
1. If you'd like to filter data being collected, set **Processing Rule** options. [Hash and Mask filters](/docs/send-data/collection/processing-rules/create-processing-rule) can be used to obfuscate proprietary information included in data collected from a script source.
1. Click **Save** to complete the Source setup.

### Configuring sourceCategory and sourceHost using variables

You can define Source Category and Source Host metadata values with system environment variables from the host machine.

:::note
Not all Sources can define a Source Host value.
:::

When configuring your Source, specify the system environment variables by prepending sys. and wrapping them in double curly brackets `{{ }}` in this form:

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

### When should I set a timeout for my script?

A timeout essentially allows a grace period for a script to finish. Without it, when the next run of the script is scheduled to go, and the script hasn't finished, the Collector will kill the script before running it again. If you're running a long script that needs to complete on its own, setting a timeout will cancel the next scheduled run and all subsequent ones that fall within the timeout period). However, after the timeout, it's important to note that if the script still hasn't finished, it will be killed by the Collector.

## Advanced - Using a CRON Expression

If you're configuring a Script Source and need to specify a frequency that's different than any existing option, you can specify a CRON expression to collect data on a specified schedule.

Sumo Logic supports the Quartz CRON framework.

To use a CRON Expression in a Script Source:

1. <!--Kanso [**Classic UI**](/docs/get-started/sumo-logic-ui/). Kanso--> In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. <!--Kanso <br/>[**New UI**](/docs/get-started/sumo-logic-ui-new/). In the Sumo Logic top menu select **Configuration**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**. Kanso-->
1. Click **Add Source** for the Collector you choose.
1. Select **Script** for the Source type.
1. Enter the source name, description (optional), source host, and source category.
1. For Frequency, choose **Other (CRON Expression)**, then type the expression.<br/>![img](/img/send-data/other-cron-1.png)
1. If you'd like to set a timeout for your script, select **Specify a timeout for your command**. If you do not need a timeout, or if you're running a script once daily, we recommend that you leave this option deselected. Learn more in [Configuring a Script Source](/docs/send-data/installed-collectors/sources/script-source).
1. For Command, choose the type of command you're going to use. The options in this menu depend on the type of Collector you're using:
    * Mac/Linux Command options.<br/>  ![img](/img/send-data/Script_Source_Mac_Commands.png)
    * Windows Command options.<br/>  ![img](/img/send-data/Script_Source_Win_Commands.png)
1. For Script, do one of the following:
   * Choose **Type a path to the script to execute** if you have the script saved to a file location. For example:<br/>  ![img](/img/send-data/script-path.png)
   * Choose **Type the script to execute** if you'd like to enter the script directly in Logic. Then type the script in the text box. For example:<br/>![img](/img/send-data/script.png)
1. For Working Directory, you'll only need to enter a path if your script refers to a file indirectly. So, enter the path of the file you'd like to collect if required; otherwise this option can remain blank.
1. Click **Advanced** to see options regarding timestamps and time zones:
   * **Timestamp Parsing**. By default **Extract timestamp information from log file entries** is selected, meaning that Sumo Logic will use the timestamp information from the data you collect. Deselecting this option turns off all timestamp parsing.
   * **Time Zone.** Select an option under **Use time zone from log file, but if none present use**. Or, if you'd like to override all time zones from data you collect, choose an option under **Ignore time zone and instead use**.
1. For **Multiline Processing**, by default only Boundary Regex is selected. To make any changes to this setting, select **Detect messages spanning multiple lines** only if the type of data you're collecting is suited to being collected as multiline log messages.
1. If you'd like to filter data being collected, set **Filter** options. See [Create a Processing Rule](/docs/send-data/collection/processing-rules/create-processing-rule) for more information.
1. Click **Save** to complete the Source setup.

### Syntax

Sumo Logic uses Quartz CRON expressions. The syntax for a Quartz CRON expression is:

```bash
<seconds> <minutes> <hours> <day of the month> <month> <day of the week> <year>
```

where is `<year>` optional.

For more information on how to specify a CRON expression, see [CRON Reference](#cron-reference). For example expressions, see [CRON Examples](#cron-examples).

:::tip
Use a [CRON Expression Generator](https://www.freeformatter.com/cron-expression-generator-quartz.html) to generate a Quartz CRON expression with an easy to use online interface.
:::

### Reference 

CRON expressions are comprised of six required fields (seconds, minutes, hours, day of the month, month, day of the week) and one optional field (year) separated by white space:

| Field Name |  Allowed Values | Allowed Special Characters |
|:-----------------|:--------------------|:--------------------------------|
| Seconds         | 0-59               | \- \* /                        |
| Minutes         | 0-59               | \- \* /                        |
| Hours           | 0-23               | \- \* /                        |
| Day (of month)  | 1-31               | \* ? / L W                     |
| Month           | 1-12 or JAN-DEC    | \- \* /                        |
| Day (of week)   | 1-7 or SUN-SAT     | \- \* ? / L #                  |
| Year (optional) | empty              | \- \* /                        |

There are several special characters that are used to specify values:

| Character |  Specifies | Notes |
|:--|:--|:--|
| \* | All values. | `*` in the minute field means every minute. |
| ? | No specific value in the day of month and day of week fields. | `?` specifies a value in one field, but not the other. |
| - | A range. | `10-12` in the hour field means the script will run at 10, 11, and 12 (noon). |
| , | Additional values. | Typing "MON,WED,FRI" in the day-of-week field means the script will run only on Monday, Wednesday, and Friday. |
| / | Increments. | `0/15` in the seconds field means the seconds 0, 15, 30, and 45. `*` before the '/' is equivalent to specifying 0 is the value to start with. Essentially, for each field in the expression, there is a set of numbers that can be turned on or off. For seconds and minutes, the numbers range from 0 to 51. |
| # | Day of a month. | `6#3` in the day of week field means the third Friday (day 6 is Friday; #3 is the 3rd Friday in the month). If you specify, say` #5`, and there isn't a 5th occurrence of the given day, the CRON job won't fire. If `#` is used, there can only be one expression in the day of week field. |
| L | The last day of a month or week. | `L` means the last day of the month. If used in the day of week field by itself, it means` 7` or `SAT`. If used in the day of week field after another value, it means the last \[day\] of the month; for example, `6L` means the last Friday of the month. You can also specify an offset from the last day of the month; `L-3` means the third to last day of the month. Make sure not to use `L` to specify lists or ranges of values. |
| W | The weekday (Mon-Fri) nearest the specified day. | Specifying `15W` means the CRON job will fire on the nearest weekday to the 15th of the month. If the 15th is a Saturday, the trigger fires on Friday the 14th. If the 15th is a Sunday, the trigger fires on Monday the 16th. W can only be specified when the day of month is a single day (not a range or list of days). |

### Examples

These are examples of CRON expressions:

* A run frequency of 12:00 PM (noon) every day: `0 0 12 * * ?`
* A run frequency of 11:00 PM every weekday night: `0 0 23 ? * MON-FRI`
* A run frequency of 10:15 AM every day:` 0 15 10 * * ?`
* A run frequency of 10:15 AM every Monday, Tuesday, Wednesday, Thursday and Friday: `0 15 10 ? * MON-FRI`
* A run frequency of 12:00 PM (noon) every first day of the month: `0 0 12 1 1/1 ? *`
* A run frequency of every hour between 8:00 AM and 5:00 PM Monday-Friday: `0 0 8-17 ? * MON-FRI`

## Troubleshoot Script Source Issues

Use these tips to help resolve log data collection issues with Script Sources. If you're having an issue creating a Script Source, see the [preparation](#preparing-your-script) and [configuration steps](#configuring-a-script-source) for guidance.

To check the status of a Script Source, you can look at the **Manage Data > Collection** tab of Sumo Logic. If you need more information about the reason a Script Source isn't generating log data, you can look at the Collector's logs to help identify what needs to change.

### Checking the Collectors Tab to Verify a Source's Operation

The simplest way to confirm that a Source is online, connected to Sumo Logic, and is collecting data is to check the status of the Source in the Collectors tab. Note that if the Source has been configured to run a script once daily and that time has not yet occurred the Source will not yet be online.

To view Source status in the Collectors Tab:

1. <!--Kanso [**Classic UI**](/docs/get-started/sumo-logic-ui/). Kanso--> In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. <!--Kanso <br/>[**New UI**](/docs/get-started/sumo-logic-ui-new/). In the Sumo Logic top menu select **Configuration**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**. Kanso-->
1. Scroll to the name of the Collector hosting the Script Source.
1. Check to see the icon next to the Source. A green icon indicates that the Source is connected to Sumo Logic and that it's generating/collecting log data. A red icon that the Source is either not connected to Sumo Logic, or that there is an issue with the script that is preventing data from being collected.

### Checking a Collector's Logs to Understand Script Failures

Installed Collectors store log events in its installation directory under the `/logs` directory. These logs are useful when troubleshooting script-related failures.

### Messages related to scripts

Where a script isn't executable or has failed, or doesn't exist, you'll find messages similar to:

`Working dir %s does not exist`

where `%s` is the working directory specified in Sumo Logic.

`Error in executing script: %s`

where `%s` is the script.

### Messages related to CRON expression errors

If a CRON expression is invalid a message with information about the issue will be logged.

### Messages related to timeout errors

`Script '%s' failed to start or finish within timeout`
