---
id: remote-management
title: OpenTelemetry Remote Management Beta
sidebar_label: Remote Management
description: tk
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<head>
  <meta name="robots" content="noindex" />
</head>

<p><a href="/docs/beta"><span className="beta">Beta</span></a></p>

OpenTelemetry collectors to support remote management of data collection configuration. Set up data collection configuration from Sumo UI and push the configuration to one or multiple collectors.  

New Concepts:

Collector Tags:
Add Tags to the collectors installed which can be used to categorize and group the collectors. These tags are also enriched in your data so you can also use them in your dashboards and searches.

Source Templates:
Data configuration setup for OT collectors will be done using Source Templates. Source templates is an extension of existing Source concept for Installed collectors which has a new capability to be attached to multiple collectors.

Use collector tags to group the collector and associate the Source Template to these groups of collectors thus helping in reducing redundancy of data collection setup. This additional step for Source Template is called Collector Linking.

To get started with using this feature we will provide a scenario which can be replicated in your environment.

Goal: As a user I have 50 Linux servers where we are running Apache servers and would like to monitor the Apache error logs from all these servers.


## Step 1: Install collector on 50 servers and add a uniquely identifiable tag to these collectors depicting that these have Apache server running on them


1. In Sumo Logic, select Manage Data > Collection > OpenTelemetry Collection.
1. On the OpenTelemetry Collection page, click Add Collector.
1. On the left panel, select Linux as the platform.
1. Select/create installation token.
1. Add a new Tag “Application = Apache” as in screenshot below to identify these collectors as Apache running on them. We will keep the Collector setting to default.
1. Copy the command and execute it in your system terminal where the collector needs to be installed.
1. Wait for the installation process to complete, then click Next to proceed. On this screen you will see a list of available Source Templates. For our use case we will Select Apache Source Template.
If you choose to close this screen, you can also navigate to create a new Source template by following
1. Select Manage Data > Collection > Source Template.


## Step 2: Create a data collection configuration to collect Apache error logs and link them to all the collectors that have tag Application = Apache

Complete the Source Template form by providing the Name, Error log file path and Click next.

On the Collector Linking step you will have the option to link the collectors using Collector name or add Tags to find the group of collectors.

For our scenario we will add Tag Application = Apache.
Click Preview collectors to see the list of collectors that will be linked to the newly created source Template.

Click next to complete Source Template Creation. In the background system will apply the configuration to all the linked collectors and start collecting from Apache error files. Click on Log search Icon to search for data collected for this Source Template.
