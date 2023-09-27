---
id: puppet
title: Puppet - Classic Collector
sidebar_label: Puppet
description: The Sumo Logic App for Puppet helps you monitor Puppet metrics and events.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<img src={useBaseUrl('img/integrations/app-development/puppet.png')} alt="Thumbnail icon" width="50"/>

Puppet is a software configuration management tool. Puppet can provision infrastructure and enforce desired configurations across new and existing servers. The Sumo Logic App for Puppet helps you monitor Puppet metrics and events, which means that you can easily:

* Determine when Puppet runs occurred.
* Track service and applying times for each run.
* Find out how often resources have changed, skipped, failed to update, or are out-of-sync.
* Find out the root cause of issues by correlating puppet runs with metrics from other components in your infrastructure.

## Log Types

Sumo’s Puppet Logs source and Puppet Reports source use an installed collector to gather the following data from Puppet:

* Puppet Server logs. For more information about the logs location, see [Puppet Server Logs](https://puppet.com/docs/puppetserver/5.3/config_file_logbackxml.html).
* Puppet Server Access logs. For more information about the logs location, see [Puppet Server Logs](https://puppet.com/docs/puppetserver/5.3/config_file_logbackxml.html).
* Puppet Reports. Puppet generates reports in YAML format. SumoLogic supports report format 10. This is the format of reports output by Puppet versions 5.5.3 and newer. It is backward compatible with report format 9 (in Puppet versions 5.5.0 to 5.5.2). For more information about the puppet reports, see [Puppet Reports](https://puppet.com/docs/puppet/5.5/format_report.html).

### Puppet Reports

Puppet reports are in YAML format. They must be converted to JSON prior to ingestion to Sumo.

<Tabs
  className="unique-tabs"
  defaultValue="YAML"
  values={[
    {label: 'YAML', value: 'YAML'},
    {label: 'JSON', value: 'JSON'},
  ]}>

<TabItem value="YAML">

```yml title="Partial Puppet report in YAML format."
-- !ruby/object:Puppet::Transaction::Report
host: puppet-node-1
time: '2018-08-28T03:25:05.628370065Z'
configuration_version: 1535426713
transaction_uuid: 8a3bb8e5-c5ec-44a2-a3a4-45aed3ae13e9
report_format: 6
puppet_version: 4.10.12
status: unchanged
transaction_completed:
noop: false
noop_pending: false
environment: production
logs:
- level: notice
  message: Applied catalog in 2.03 seconds
  source: Puppet
  tags:
  - notice
  time: '2018-08-28T03:25:17.345922191Z'
  file:
  line:
metrics:
  resources:
    name: resources
    label: Resources
    values:
    - - total
      - Total
```

</TabItem>
<TabItem value="JSON">

```json title="Partial Puppet report in JSON format."
{
	"host":"puppet-node-1",
	"time":"2018-08-14T22:22:50.931239059Z",
	"configuration_version":1534247572,
	"transaction_uuid":"43b51400-e009-4e5e-b856-1dff5dae9c64",
	"report_format":10,
	"puppet_version":"5.5.3",
	"status":"unchanged",
	"transaction_completed":true,
	"noop":false,
	"noop_pending":false,
	"environment":"production",
	"logs":[
		{
			"level":"err",
			"message":"Could not retrieve catalog from remote server: Error 500 on SERVER: Server Error: Syntax error at '}' (file: /etc/puppetlabs/code/environments/production/modules/sumo/manifests/nix_config.pp, line: 185, column: 1) on node puppet-node-1",
			"source":"Puppet",
			"tags":[
				"err"
			],
			"time":"2018-08-14T22:22:52.910348336Z",
			"file":null,
			"line":null
		},
		{
			"level":"notice",
			"message":"Applied catalog in 0.05 seconds",
			"source":"Puppet",
			"tags":[
				"notice"
			],
			"time":"2018-08-14T22:22:53.024015171Z",
			"file":null,
			"line":null
		}
	],
	"metrics":{
		"resources":{
			"name":"resources",
			"label":"Resources",
			"values":[
				[
					"total",
					"Total",
					10
				],
				[
					"skipped",
					"Skipped",
					0
				],
				[
					"failed",
					"\"Fail",
```

</TabItem>
</Tabs>


### Sample Log Messages

```json title=" Puppet Server"
2018-08-22 00:03:14,141 INFO  [qtp839286351-63] [puppetserver] Puppet Compiled catalog for puppet-node-1 in environment production in 0.18 seconds
2018-08-22 00:19:33,594 ERROR [qtp839286351-62] [puppetserver] Puppet Could not find node statement with name 'default' or 'puppet-node-2' on node puppet-node-2
```

```bash title="Puppet Access"
54.90.112.107 - - [28/Aug/2018:06:42:49 +0000] "PUT /puppet/v3/report/puppet-node-1?environment=production& HTTP/1.1" 200 9 "-" "Puppet/5.5.3 Ruby/2.4.4-p296 (x64-mingw32)" 134
10.1.3.83 - - [28/Aug/2018:06:44:18 +0000] "GET /puppet/v3/node/puppet-node-3?environment=production&configured_environment=production&transaction_uuid=f95ce8bd-f97e-4d99-9a72-3b010a50ceb1&fail_on_404=true HTTP/1.1" 200 11394 "-" "Puppet/5.5.3 Ruby/2.4.4-p296 (x86_64-linux)" 77
```

### Sample Query

```sql title="Failed Resources"
_sourceCategory=prod/web/puppet/reports
| parse "\"resources\":{\"name\":\"resources\",\"label\":\"Resources\",\"values\":[[\"total\",\"Total\",*],[\"skipped\",\"Skipped\",*],[\"failed\",\"Failed\",*],[\"failed_to_restart\",\"Failed to restart\",*],[\"restarted\",\"Restarted\",*],[\"changed\",\"Changed\",*],[\"out_of_sync\",\"Out of sync\",*],[\"scheduled\",\"Scheduled\",*],[\"corrective_change\",\"Corrective change\",*]]" as total_res,skipped,failed,failed_to_restart,restarted,changed,out_of_sync,scheduled,corrective_change
| sum(total_res) as total_resources, sum(failed) as failed_resources
| failed_resources/total_resources*100 as failed_res_pct
| fields failed_res_pct
```

## Collecting Logs for Puppet

Learn how to collect Puppet logs, reports, and events for the Sumo App for Puppet.

The sections below provide instructions for installing a collector on a Puppet Master host, setting up Sumo Puppet sources (server, access and reports logs), and installing the Sumo app for Puppet. With this configuration you can collect Puppet logs, events, and reports, and visualize resource performance and puppet runs data in the dashboards provided by the app.


### Step 1: Create access keys

Follow the instructions in [Access Keys](/docs/manage/security/access-keys) to create a Sumo Logic access ID and key. You’ll need to supply them when you set up a collector on the Puppet Master host in the following step.


### Step 2: Install collector on Puppet Master

In this step you install a collector on the Puppet Master host. Follow the instructions on [Install a Collector on Linux](/docs/send-data/installed-collectors/linux).

Puppet Master only runs on Linux.


### Step 3: Configure local file source for Puppet Server logs

In this step, you add a local file source to the installed collector you created in [Step 2](#Step_2:_Install_collector_on_Puppet_Master). The local file source will receive Puppet Server logs.  

Follow the steps on [Local File Source](/docs/send-data/installed-collectors/sources/local-file-source), with these additional instructions:

* For **File Path**, Enter the puppet server log file path. The default Puppet Server log file is: `/var/log/puppetlabs/puppetserver/puppetserver.log`. If your Puppet Server logs are located elsewhere, enter the correct path.  
* For **Source Category**, enter a value like: `prod/web/puppet/server`.
* For **Advanced Options**, accept the default values.


### Step 4: Configure local file source for Puppet Server Access logs

In this step, you add another local file source to the installed collector you created in [Step 2](#step-2-install-collector-on-puppet-master). The local file source will receive Puppet Server Access logs.

Follow the steps on [Local File Source](/docs/send-data/installed-collectors/sources/local-file-source), with these additional instructions:

* For **File Path**, Enter the puppet server log file path. The default Puppet Server Access log file is: `/var/log/puppetlabs/puppetserver/puppetserver-access.log`. If your Puppet Server Access logs are located elsewhere, enter the correct path.  
* For **Source Category**, enter a value like: `prod/web/puppet/access`
* For **Advanced Options**, accept the default values.


### Step 5: Configure Puppet Reports script source

Puppet reports are in YAML format. They must be converted into JSON format before Sumo ingests them.

This section has instructions for setting up a Script source that runs a shell script to convert the YAML files to JSON for ingestion by the Sumo collector. Alternatively, you can convert the YAML files with a third party tool and provide the configure a local file source on installed collection to obtain the JSON from the directory you specify.  


#### Script source prerequisites

The following requirements apply to the script source:

* The user running the collector process must have read and write access to the Puppet Reports directory.
* The collector executes the script as the user running the collector process. The script outputs data to your machine's stdout or stderror output streams to be collected. For more information, see [Script Source](/docs/send-data/installed-collectors/sources/script-source).
* The machine where you run the script must have Ruby installed.
* The script generates a log in the configured working directory that you can review in case of issues.

For more information, see [Script Source](/docs/send-data/installed-collectors/sources/script-source).

#### To set up a script source

The script requires Ruby on the host machine.

1. In the Sumo web app, select **Manage Data** > **Collection** > **Collection**.
2. Navigate to the collector you installed on the Puppet Master host, and select **Add > Add Source**.
3. Select **Script**. New Collectors using version 19.245-4 and later do not allow Script Sources to run by default. To allow Script Sources you need to set the Collector parameter `enableScriptSource` in [user.properties](/docs/send-data/installed-collectors/collector-installation-reference/user-properties) to true and [restart](/docs/send-data/collection/start-stop-collector-using-scripts.md) the Collector.
4. **Name**. (Required).
5. **Description**. (Optional).
6. **Source Host**. Enter the hostname or IP address of the source host. The hostname can be a maximum of 128 characters.
7. **Source Category**. (Required) Enter a value like: `prod/web/puppet/reports`
8. **Frequency**. Default is 15 mins.
9. **Command**. Leave the default value, `/bin/sh`, selected.
10. **Script**. Choose **Type the script to execute** and copy/paste the below script in the text box:

<details><summary>Click to expand</summary>

```
MaxFileSize=20
log_file_name=puppet_rpt_conversion.log
#Get size in bytes**
    file_size=`du -b puppet_rpt_conversion.log | tr -s '\t' ' ' | cut -d' ' -f1`
    file_size=$(($file_size/1048576))
    if [ $file_size -gt "$MaxFileSize" ];then   
        timestamp=`date +%s`
        mv puppet_rpt_conversion.log puppet_rpt_conversion.log.$timestamp
    fi
echo "YAML to JSON conversion started!!" >> "$log_file_name"
echo "Start Time: $(date)" >> "$log_file_name"
if [ ! -e last_run_date.tmp ]
then
date "+%Y-%m-%d" --date=1970-01-01 > last_run_date.tmp;
fi
find . -maxdepth 2 -type f -name "*.yaml" -newermt "$(cat last_run_date.tmp)" |
while read f;
do
if [ -s "$f" ]
then
sed 1d "$f" > tmpfile;
ruby -rjson -ryaml -e "resource_list = ''
json = JSON.generate({});data = JSON.parse(json);
obj = JSON.parse(YAML.load_file('tmpfile').to_json);
data['host'] = obj['host'];
data['time'] = obj['time'];
data['configuration_version'] = obj['configuration_version'];
data['transaction_uuid'] = obj['transaction_uuid'];
data['report_format'] = obj['report_format'];
data['puppet_version'] = obj['puppet_version'];
data['status'] = obj['status'];
data['transaction_completed'] = obj['transaction_completed'];
data['noop'] = obj['noop'];
data['noop_pending'] = obj['noop_pending'];
data['environment'] = obj['environment'];
data['metrics'] = obj['metrics'];
data['resource_list'] = resource_list;
i = 0;
obj['resource_statuses'].each{
  |j|
if i == 0 then
  tempdata = j[0];
else
  tempdata = ',' + j[0];
end
data['resource_list'] << tempdata;
i = i + 1;
};

puts data.to_json;
obj['resource_statuses'].each{
  |y|  logsres = y[1];
  logsres['transaction_uuid'] = obj['transaction_uuid'];
  logsres['environment'] = obj['environment'];
  logsres['host'] = obj['host'];
  puts logsres.to_json;
  };
obj['logs'].each {
  |x|logsjson = x;
  logsjson['host'] = obj['host'];
  logsjson['transaction_uuid'] = obj['transaction_uuid'];
  logsjson['environment'] = obj['environment'];
  puts logsjson.to_json
  };"
echo "$f conversion status:" $? >> "$log_file_name"
date "+%d-%b-%Y %H:%M:%S" > last_run_date.tmp
fi
done
echo "Conversion Completed. End Time: $(date)" >> "$log_file_name"
```

</details>

11. **Working Directory**. Default Puppet reports directory: `/opt/puppetlabs/server/data/puppetserver/reports.` If Puppet is installed in a different location, enter the correct path.
12. Configure **Advanced options**.
    1. **Enable Timestamp Parsing**. This option is checked by default.
    2. **Time Zone**. Default is “Use time zone from log file”.
    3. **Timestamp Format**. Click **Specify a format**.
        1. **Format**. Enter: `yyyy-MM-dd'T'HH:mm:ss.SSS'Z'`
        2. **Timestamp locator.** Enter: `"time":"(.*?)"`
    4. **Enable Multiline Processing**.
        1. **Detect messages spanning multiple lines**. This option is checked by default.
        2. **Infer Boundaries**. This option is checked by default.
        3. **Boundary Regex**. If multiple processing is enabled, and **Infer Boundaries** is disabled, enter a regular expression for message boundaries.
    5. **Processing Rules**. Configure processing rules, as desired. For more information, see [Processing Rules](/docs/send-data/collection/processing-rules).

Puppet logs and reports should start flowing into Sumo Logic.


#### Troubleshooting the script source

If you encounter problems:

* Review [Script source prerequisites](#Script_source_prerequisites).
* Review the contents of the log file that the script creates in the configured working directory.



## Installing the Puppet App

Now that you have set up collection for Puppet, install the Sumo Logic App for Puppet to use the preconfigured searches and Dashboards that provide insight into your data.

To install the app:

Locate and install the app you need from the App Catalog. If you want to see a preview of the dashboards included with the app before installing, click **Preview Dashboards**.

1. From the App Catalog, search for and select the app.
2. To install the app, click **Add to Library** and complete the following fields.
   * **App Name**. You can retain the existing name, or enter a name of your choice for the app. 
   * **Puppet Server Log Source**. Choose Source Category, and select the Source Category that you configured for the source from the list.
   * **Puppet Server Access Log Source**. Choose Source Category, and select the Source Category that you configured for the source from the list.
   * **Puppet Reports Source**. Choose Source Category, and select the Source Category that you configured for the source from the list.
3. **Advanced**. Select the Location in Library (the default is the Personal folder in the library), or click **New Folder** to add a new folder.
4. Click **Add to Library**.

Once an app is installed, it will appear in your Personal folder, or other folder that you specified. From here, you can share it with your organization. See Welcome to the New Library for information on working with the library in the new UI.

Panels will start to fill automatically. It's important to note that each panel slowly fills with data matching the time range query and received since the panel was created. Results won't immediately be available, but with a bit of time, you'll see full graphs and maps.


## Viewing Puppet App Dashboards

### Overview

See an overview of Puppet activity, including puppet versions, environments, service times, unique nodes, nodes puppet runs, node requests and nodes responding.

<img src={useBaseUrl('img/integrations/app-development/puppet-overview.png')} alt="puppet" />

### Error Analysis

See an analysis of errors in Puppet Master and nodes.

<img src={useBaseUrl('img/integrations/app-development/puppet-error-analysis.png')} alt="puppet" />

### Node Puppet Runs Analysis

See an analysis of puppet runs on nodes, including resources analysis, average time to apply, node puppet activity.

<img src={useBaseUrl('img/integrations/app-development/puppet-node-puppet-runs-analysis.png')} alt="puppet" />
