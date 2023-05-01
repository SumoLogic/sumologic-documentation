---
id: use-cron-expression
title: Advanced - Using a CRON Expression
description: Set up a CRON job to collect data on a specified schedule.
---



If you're configuring a Script Source and need to specify a frequency that's different than any existing option, you can specify a CRON expression to collect data at a custom frequency.

:::note
For examples, see [CRON Examples and Reference](cron-examples-reference.md). 
:::

Sumo Logic supports the Quartz CRON framework.

To use a CRON Expression in a Script Source:

1. In Sumo Logic, select **Manage Data** > **Collection** > **Collection**.
1. Click **Add Source** for the Collector you choose.
1. Select **Script** for the Source type.
1. Enter the source name, description (optional), source host, and source category.
1. For Frequency, choose **Other (CRON Expression)**, then type the expression.

    ![img](/img/send-data/other-cron-1.png)

1. If you'd like to set a timeout for your script, select **Specify a timeout for your command**. If you don't need a timeout, or if you're running a script once daily, we recommend that you leave this option deselected. Learn more in [Configuring a Script Source](/docs/send-data/installed-collectors/sources/script-source).
1. For Command, choose the type of command you're going to use. The options in this menu depend on the type of Collector you're using:

    * Mac/Linux Command options.

        ![img](/img/send-data/Script_Source_Mac_Commands.png)

    * Windows Command options.

        ![img](/img/send-data/Script_Source_Win_Commands.png)

1. For Script, do one of the following:

   * Choose **Type a path to the script to execute** if you have the script saved to a file location. For example:

    ![img](/img/send-data/script-path.png)

   * Choose **Type the script to execute** if you'd like to enter the script directly in Logic. Then type the script in the text box. For example:        

    ![img](/img/send-data/script.png)

1. For Working Directory, you'll only need to enter a path if your script refers to a file indirectly. So, enter the path of the file you'd like to collect if required; otherwise this option can remain blank.
1. Click **Advanced** to see options regarding timestamps and time zones:

   * **Timestamp Parsing**. By default **Extract timestamp information from log file entries** is selected, meaning that Sumo Logic will use the timestamp information from the data you collect. Deselecting this option turns off all timestamp parsing.
   * **Time Zone.** Select an option under **Use time zone from log file, but if none present use**. Or, if you'd like to override all time zones from data you collect, choose an option under **Ignore time zone and instead use**.
1. For **Multiline Processing**, by default only Boundary Regex is selected. To make any changes to this setting, select **Detect messages spanning multiple lines** only if the type of data you're collecting is suited to being collected as multiline log messages.
1. If you'd like to filter data being collected, set **Filter** options. See [Create a Processing Rule](/docs/send-data/collection/processing-rules/create-processing-rule.md) for more information.
1. Click **Save** to complete the Source setup.
