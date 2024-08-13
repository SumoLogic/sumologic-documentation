---
id: set-collector-as-ephemeral
title: Set a Collector as Ephemeral
description: During the installation process, if a Collector is flagged as ephemeral, the Collector will be deleted automatically after being offline for 12 hours.
---

During the installation process, if you flag an Installed Collector as ephemeral, the it will be deleted automatically after being offline for 12 hours. This can be helpful when using certain APIs, for example, where Amazon Machine Images (AMIs) are constantly created as new Collectors, but serve a purpose for only a short while. After being offline for a while, the AMI-created Collector is automatically deleted.

:::note
If the Collector is already registered (activated) with Sumo Logic you need to use the Collector Management API to set the ephemeral property.
:::

## Using Quiet Mode installation

To set the ephemeral flag via command line argument:

1. When starting the installer from the command line, pass the argument `-Vephemeral=true`.
1. Install the Collector.
1. Verify that the generated user.properties file (under the `config` directory) contains the property `ephemeral=true`.

## Using the Binary Package

To set the ephemeral flag via the user.properties file or sumo.conf file:

1. Create the user.properties config file (located in the `config` directory of your Collector installation).
1. Type `ephemeral=true` in the file, then save and close it.
1. Start the Collector.

## What happens to logs collected from ephemeral Collectors?

Logs are only deleted from Sumo Logic when your organization’s retention period expires, including data from ephemeral Collectors that have been deleted, meaning that you'll still be able to run searches against logs collected from deleted Collectors. You can also search against metadata for Collectors and Sources that have been deleted.
