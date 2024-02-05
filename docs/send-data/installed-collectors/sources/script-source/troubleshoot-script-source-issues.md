---
id: troubleshoot-script-source-issues
title: Troubleshoot Script Source Issues
description: Use these tips to help resolve collection issues with Script Sources.
---



This document covers common issues with Script Sources not ingesting log data. If you're having an issue creating a Script Source see the [preparation and configuration steps](/docs/send-data/installed-collectors/sources/script-source) for guidance.

To check the status of a Script Source, you can look at the **Manage Data > Collection** tab of Sumo Logic. If you need more information about the reason a Script Source isn't generating log data, you can look at the Collector's logs to help identify what needs to change.

## Checking the Collectors Tab to Verify a Source's Operation

The simplest way to confirm that a Source is online, connected to Sumo Logic, and is collecting data is to check the status of the Source in the Collectors tab. Note that if the Source has been configured to run a script once daily and that time has not yet occurred the Source will not yet be online.

To view Source status in the Collectors Tab:

1. In Sumo Logic, select **Manage Data** > **Collection** > **Collection**.
1. Scroll to the name of the Collector hosting the Script Source.
1. Check to see the icon next to the Source. A green icon indicates that the Source is connected to Sumo Logic and that it's generating/collecting log data. A red icon that the Source is either not connected to Sumo Logic, or that there is an issue with the script that is preventing data from being collected.

## Checking a Collector's Logs to Understand Script Failures

Installed Collectors store log events in its installation directory under the `/logs` directory. These logs are useful when troubleshooting script-related failures.

## Messages related to scripts

Where a script isn't executable or has failed, or doesn't exist, you'll find messages similar to:

`Working dir %s does not exist`

where `%s` is the working directory specified in Sumo Logic.

`Error in executing script: %s`

where `%s` is the script.

## Messages related to CRON expression errors

If a CRON expression is invalid a message with information about the issue will be logged.

## Messages related to timeout errors

`Script '%s' failed to start or finish within timeout`
