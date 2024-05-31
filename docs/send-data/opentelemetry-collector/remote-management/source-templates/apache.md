---
id: apache
title: Apache Source Template
sidebar_label: Apache
description: Learn about the Sumo Logic Apache source template for OpenTelemetry.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<head>
  <meta name="robots" content="noindex" />
</head>

<p><a href="/docs/beta"><span className="beta">Beta</span></a></p>

<img src={useBaseUrl('img/integrations/web-servers/apache.png')} alt="Thumbnail icon" width="100"/> <img src={useBaseUrl('img/send-data/otel-color.svg')} alt="Thumbnail icon" width="30"/>

Apache source template creates an OpenTelemetry configuration that can be pushed to a remotely managed OpenTelemetry collector. By creating this source template and pushing the config to the appropriate OpenTelemetry agent you can ensure collection of logs and metrics of Apache to Sumo Logic.
		
## Fields creation in Sumo Logic for Apache

If not already present, the following [Fields](/docs/manage/fields/) are created as part of the Apache app installation.

- **`webengine.cluster.name`**. User configured. Enter a uniquely identifiable name for your Apache web server cluster to show in the Sumo Logic dashboards.
- **`webengine.system`**. Fixed value of **apache**.
- **`sumo.datasource`**. Fixed value of **apache**.
- **`webengine.node.name`**. Includes the value of the hostname of the machine which is being monitored.
		
## Prerequisites
		
### For metrics collection
		
The receiver gets stats from an Apache Web Server instance using the `server-status?auto` endpoint. This receiver supports Apache Web Server version 2.4+.
		
Receive server statistics by configuring the server's `httpd.conf` file to [enable status support](https://httpd.apache.org/docs/2.4/mod/mod_status.html).
		
### For logs collection
		
Configure the Apache log files:
1. Configure the logging of access logs and error logs via the instructions described in their [documentation](https://httpd.apache.org/docs/2.4/logs.html).
1. Locate your local `httpd.conf` configuration file in the Apache directory. After determining the location of the conf file, modify the `httpd.conf` configuration file logging parameters if required.
	* For access logs, the following directive is to be noted:
		- **CustomLog**. Access log file path and format (standard common and combined).
	* For error logs, the following directives are to be noted:
		- **ErrorLog**. Error log file path.
		- **LogLevel**. To control the number of messages logged to the `error_log`.
		
Ensure that the otelcol has adequate permissions to access all log file paths. Execute the following command for the same:
		
```
sudo setfacl -R -m d:u:otelcol-sumo:r-x,u:otelcol-sumo:r-x,g:otelcol-sumo:r-x <PATH_TO_LOG_FILE>
```

import LogsCollectionPrereqisites from '../../../../reuse/apps/logs-collection-prereqisites.md';
		
<LogsCollectionPrereqisites/>
		
For Windows systems, the collected log files should be accessible by the SYSTEM group. Use the following set of PowerShell commands if the SYSTEM group does not have access.
		
```
$NewAcl = Get-Acl -Path "<PATH_TO_LOG_FILE>"
# Set properties
$identity = "NT AUTHORITY\SYSTEM"
$fileSystemRights = "ReadAndExecute"
$type = "Allow"
# Create a new rule
$fileSystemAccessRuleArgumentList = $identity, $fileSystemRights, $$fileSystemAccessRule = New-Object -TypeName System.Security.AccessControl.FileSystemAccessRule -ArgumentList $fileSystemAccessRuleArgumentList
# Apply new rule
$NewAcl.SetAccessRule($fileSystemAccessRule)
Set-Acl -Path "<PATH_TO_LOG_FILE>" -AclObject $NewAcl
```
		
## Source Template configuration
		
You can follow the below steps to set a remotely managed OpenTelemetry collector and push Source Template to it.
		
### Step 1: Set up remotely managed Otel collector
		
import CollectorInstallation from '../../../../reuse/apps/opentelemetry/collector-installation.md';
		
<CollectorInstallation/>
		
### Step 2: Configuring Source Template
		
In this step, you will configure the yaml required for Apache Collection.
		
Below are the inputs required:
		
- **Endpoint**. The URL of the httpd status endpoint (default: `http://localhost:80/server-status?auto`).
- **Access File log Path**. Enter the path to the Access log file for your Apache instance.
- **Error file log path**. Enter the path to the error log file for your Apache instance.
- **Fields**. `webengine.cluster.name`.
		
You can add any custom fields which you want to tag along with the data ingested through the source template in Sumo Logic.

### Step 3: Pushing Source Template to appropriate remotely managed collectors

import DataConfiguration from '../../../../reuse/apps/opentelemetry/data-configuration.md';

<DataConfiguration/>
