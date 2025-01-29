---
id: st-with-secrets
title: Setting Environment variable with secret values for Source Template
sidebar_label: Setting env variables
description: Steps for setting environment variable with secret value which can be used by source template at runtime in a remotely managed opentelemetry collector.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<head>
  <meta name="robots" content="noindex" />
</head>

Certain source template use receiver which use secret/sensitive values like password to pull the data from service and send it to Sumo Logic using OpenTelemetry collector. For example [PostgreSQL receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/postgresqlreceiver) uses PostgreSQL username and password to bring in metrics from PostgreSQL instance. 

Below are the steps to make things work for such source templates : 

1. Set env variable in OpenTelemetry Collector process. For example : SECRET_ENV_VAR=Welcome@123 . Where SECRET_ENV_VAR is the variable name and Welcome@123 is password.
2. ST creation : While creating the source template you will need to provide the environment variable name instead of the actual password. In this case : SECRET_ENV_VAR and this will be part of the source template referring to the value of the environment variable like: 
`password: ${env:SECRET_ENV_VAR}`
3. Once this source template gets pushed to the respective OpenTelemetry collector, the environment variable will get resolved at runtime and will be substituted with the actual password value to make the config work and pull the data to send it to Sumo Logic.

This way your secret data is not shared with Sumo Logic.

Below are the steps to set the environment variable in different operating systems : 

## Linux
1. Under "/etc/otelcol-sumo/env" you will have `token.env` file. You can set an environment variable in this. For example
`ENV_KEY=password`
:::note
This file is accessible to user/group created while OpenTelemetry collector is installed which is `otelcol-sumo`. You can use this user or any other admin user to access/edit token.env file.
:::
2. Restart the agent to load the newly added env variables to the OTRM agent process. Using the command : 
`sudo systemctl restart otelcol-sumo`
3. Create a ST referring to above env variable (ENV_KEY) for password which will get remotely pushed to the OTRM agent.

## Mac
- You can set an environment variable in the OpenTelemetry agent by making changes to `/Library/LaunchDaemons/com.sumologic.otelcol-sumo.plist`. 
- This file already has the `SUMOLOGIC_INSTALLATION_TOKEN` set. Parallel to it we can set any environment variable. For example below, have set `MAC_ENV_VAR` in agent:

```
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>EnvironmentVariables</key>
	<dict>
		<key>SUMOLOGIC_INSTALLATION_TOKEN</key>
		<string>U1VNT3c2c2tv************************</string>
		<key>MAC_ENV_VAR</key>
		<string>etc</string>
	</dict>
	<key>GroupName</key>
	<string>_otelcol-sumo</string>
	<key>KeepAlive</key>
	<true/>
	<key>Label</key>
	<string>otelcol-sumo</string>
	<key>ProgramArguments</key>
	<array>
		<string>/usr/local/bin/otelcol-sumo</string>
		<string>--remote-config</string>
		<string>opamp:/etc/otelcol-sumo/sumologic.yaml</string>
	</array>
	<key>RunAtLoad</key>
	<true/>
	<key>StandardErrorPath</key>
	<string>/var/log/otelcol-sumo/otelcol-sumo.log</string>
	<key>StandardOutPath</key>
	<string>/var/log/otelcol-sumo/otelcol-sumo.log</string>
	<key>UserName</key>
	<string>_otelcol-sumo</string>
</dict>
</plist>
```
- You then need to restart the OpenTelemetry collector on your mac machine using the below command : 
`sudo launchctl unload /Library/LaunchDaemons/com.sumologic.otelcol-sumo.plist && sudo launchctl load -w /Library/LaunchDaemons/com.sumologic.otelcol-sumo.plist`

## Windows

1. On your Windows machine, open the Registry Editor.
2. Go to `Computer\HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\OtelcolSumo`.
3. Right-click on the right pane and select **New** > **Multi-String Value**. You need to name this as `environment`.
4. Right click on newly created entity `environment` in the step above and select `modify`.
5. You can set the environment variable as per your needs. For example, in the below screenshot, we have set `TEST_VAR` env variable with value `sumoemp`:<br/><img src={useBaseUrl('img/send-data/opentelemetry-collector/set_env_varibale_windows.png')} alt="linux-install" style={{border: '1px solid gray'}} width="800"/>
6. Click on **OK**.
7. (Optional step) By default, any variables stored in the registry are visible to all users. To control visibility and permissions, follow the steps below to manage the ACLs for both the service registry and the environment variables you set previously.
    1. Right-click on OtelcolSumo service in the left pane of the registry editor and click on permissions.
    1. Go to the advanced section by pressing the Advanced button.
    1. Since the permissions are inherited by services from its parent by default, you will need to disable inheritance in the Advanced Security Settings popup.
    1. When you disable inheritance, you’ll be given two options: you can either convert the existing inherited permissions, or remove them entirely and build a new permission list from scratch. Choose whichever option best fits your requirements. 
    1. You can then edit Users from this list to ensure appropriate access of this registry and environment variable set under it.<br/><img src={useBaseUrl('img/send-data/opentelemetry-collector/ACL_windows_registry.png')} alt="linux-install" style={{border: '1px solid gray'}} width="800"/>
8. Restart the windows agent using the below command: 
`Restart-Service -Name OtelcolSumo` 
