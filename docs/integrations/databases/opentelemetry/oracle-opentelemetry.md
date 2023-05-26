---
id: oracle-opentelemetry
title: Oracle - OpenTelemetry Collector
sidebar_label: Oracle - OTel Collector
description: Learn about the Sumo Logic OpenTelemetry App for Oracle.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<img src={useBaseUrl('img/integrations/databases/oracle.png')} alt="Thumbnail icon" width="100"/> <img src={useBaseUrl('img/send-data/otel-color.svg')} alt="Thumbnail icon" width="45"/>

The [Oracle](https://docs.oracle.com/database/121/CNCPT/intro.htm#CNCPT001) app is a logs based app. Preconfigured dashboards and searches provide insight into the listeners, sys/xml audit logs, alerts, performance and security.

This App is tested with the following Oracle versions:

- Non-Kubernetes: Oracle Database 19c Enterprise Edition Release 19.0.0.0.0 - Production - Version 19.3.0.0.0

Oracle logs are sent to Sumo Logic through OpenTelemetry [filelog receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/filelogreceiver).

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Oracle-OpenTelemetry/Oracle-Schematics.png' alt="Schematics" />

## Log Types

- Alert Logs
- Listener Logs
- Audit Logs

## Fields creation in Sumo Logic for Oracle

Following are the tags which that be created as part of Oracle App install if not already present. 

- `db.cluster.name`. User configured. Enter a name to identify this Oracle cluster. This cluster name will be shown in the Sumo Logic dashboards.
- `db.system`. Has a fixed value of **oracle**.
- `sumo.datasource`. Has a fixed value of **oracle**.

## Prerequisites

Here are the steps required to configure log collection for Oracle running on a non-Kubernetes environment.

* [Enable Oracle logging](#enable-oracle-logging)
* [Verify log files path](#verify-local-logs-file-directories-and-path)
* [Set up Oracle performance metrics script](#performance-metrics-script-setup)
* [Configure three local log file Sources](#step-2-configure-integration)

### Enable Oracle logging

If logging is not enabled, you can configure it by following the steps below.

- **Alert log**. Alert logs contain important information about error messages and exceptions that occur during database operations.
- **Listener log**. To enable listener log, run the following commands from `ORACLE_HOME/bin`:
   ```sh
   lsnrctl command  [listener_name]
   lsnrctl set log_status on
   ```
- **Audit Log**. Follow [this](https://docs.oracle.com/cd/E11882_01/server.112/e10575/tdpsg_auditing.htm#TDPSG50000) guide to enable Audit Logs.

### Verify local logs file directories and path

- **Oracle Alert Logs**. For 11g and later releases (12c, 18c, 19c). By default, Oracle logs are stored in
`$ORACLE_BASE/diag/rdbms/$DB_UNIQUE_NAME/$ORACLE_SID/trace/`. The default directory for log files is stored in `BACKGROUND_DUMP_DEST` parameter. You can query the value of `BACKGROUND_DUMP_DEST`, an initialization parameter, where you can find Oracle alert log by executing the command below:
  ```sh
  SQL > show parameter background_dump_dest;
  ```
- **Oracle Listener Logs**. You can check listener log file with the following command:
  ```
  [oracle@sumolab alert]$ lsnrctl status
  ```
- **Oracle Audit Logs**. By default, Oracle logs are stored in
  ```
  $ORACLE_BASE/app/oracle/admin/orcl/adump
  ```

The default directory for log files is stored as the value of `audit_file_dest`. In order to display it, run the following command: `SQL> show parameter audit`.

Audit Logs should be in either `XML`, `EXTENDED`, or `{{OS }}` format for the app to work.

The location of these logs will be required when you set up the app through the app catalog.

### Performance Metrics Script Setup

To set up the performance metrics script on Linux and Windows for the Oracle app:

1. Follow [these instructions](/docs/integrations/databases/oracle/#performance-metrics-script-setup) for your operating system. You don't need to configure the Sumo Logic Script Source at this time.
2. As per the above instructions, once the python script is available locally, you need to trigger this script periodically by copying the [cronJob.py](https://github.com/SumoLogic/sumologic-solution-templates/blob/master/application-data-collection/Utils/cronJob.py) file. This will generate an output log file, path for which needs to be given at the time of app installation. Based on your platform please follow the steps below:

<Tabs
  className="unique-tabs"
  defaultValue="Linux"
  values={[
    {label: 'Linux', value: 'Linux'},
    {label: 'Windows', value: 'Windows'},
  ]}>

<TabItem value="Linux">

Configure a cron job to trigger the python script using crontab. Frequency of this job can be set following the instructions from [here](https://www.python-engineer.com/posts/cron-jobs-for-python/#crontab).

* To find the python3 path, you can run: 
  ```sh
  which python3
  ```
* Here is the command which needs to be configured as part of cron to trigger the script:
  ```sh
  <frequency_expression> <output_of_which_python3> <path_to_cronJob.py> <path_to_oracle-perf-monitor.py> <timeout_in_seconds> <output_location_of_file>
  ```

</TabItem>
<TabItem value="Windows">

* Find the location of python.exe by running:
  ```
  where python3
  ```
* Create a `.bat` file with the following arguments:
  ```sh
  @ECHO OFF
  <output_of_where_python3> <path_to_cronJob.py> <path_to_oracle-perf-monitor.py> <timeout_in_seconds> <output_location_of_file>
  ```

The `.bat` file created above can then be triggered periodically using windows Task Scheduler following an example [here](https://www.thewindowsclub.com/how-to-schedule-batch-file-run-automatically-windows-7).

</TabItem>
</Tabs>

## Collection Configuration and App installation

{@import ../../../reuse/apps/opentelemetry/config-app-install.md}

### Step 1: Set up the Collector

{@import ../../../reuse/apps/opentelemetry/set-up-collector.md}

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Oracle-OpenTelemetry/Oracle-Collector.png' alt="Collector" />

### Step 2: Configure integration

In this step, you will configure the yaml required for Oracle Collection.

Path of the log file configured to capture oracle logs needs to be given here. Here is the list of logs which are required by the application. 

- Alert Logs
- Listener Logs
- Audit Logs
- Performance metric script-based logs

You can get the location of these logs by following the instructions in the prerequisite step.

Once the details are filled, click on the **Download YAML File** button to get the yaml file.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Oracle-OpenTelemetry/Oracle-YAML.png' alt="YAML" />

### Step 3: Send logs to Sumo

{@import ../../../reuse/apps/opentelemetry/send-logs-intro.md}

<Tabs
  className="unique-tabs"
  defaultValue="Linux"
  values={[
    {label: 'Linux', value: 'Linux'},
    {label: 'Windows', value: 'Windows'},
    {label: 'macOS', value: 'macOS'},
  ]}>

<TabItem value="Linux">

1. Copy the yaml file to `/etc/otelcol-sumo/conf.d/` folder in the Oracle instance which needs to be monitored.
2. Place Env file in the following directory:
   ```sh
   /etc/otelcol-sumo/env/
   ```
3. Restart the collector using:
   ```sh
   sudo systemctl restart otelcol-sumo
   ```

</TabItem>
<TabItem value="Windows">

1. Copy the yaml file to **`C:\ProgramData\Sumo Logic\OpenTelemetry Collector\config\conf.d`** folder in the machine which needs to be monitored.
2. Restart the collector using: 
   ```sh
   Restart-Service -Name OtelcolSumo
   ```

</TabItem>
<TabItem value="macOS">

1. Copy the yaml file to `/etc/otelcol-sumo/conf.d/` folder in the Oracle instance which needs to be monitored.
2. Restart the otelcol-sumo process using:
   ```sh
   otelcol-sumo --config /etc/otelcol-sumo/sumologic.yaml --config "glob:/etc/otelcol-sumo/conf.d/*.yaml"
   ```

</TabItem>
</Tabs>

{@import ../../../reuse/apps/opentelemetry/send-logs-outro.md}

## Sample Log Messages

Sample Log Message in Non-Kubernetes environment:

```sh title="Time"
20-Jan-2023 11:02:56 * (CONNECT_DATA=(CID=(PROGRAM=null)(HOST=__jdbc__)(USER=null))(SERVICE_NAME=sumo.cmdb01.com)) * (ADDRESS=(PROTOCOL=TCP)(HOST=124.243.25.82)(PORT=56486)) * establish * sumo.cmdb01.com * 12514

TNS-12514: TNS:listener does not currently know of service requested in connect descriptor
```

## Sample Queries

This sample Query is from the **Oracle - Overview** dashboard > **DB Connection** panel.

```sql title="Query String"
 %"db.cluster.name"=* %"deployment.environment"=* %"sumo.datasource"=oracle establish ("SID=" or "SERVICE_NAME=")  | json "log" as _rawlog nodrop 
| if (isEmpty(_rawlog), _raw, _rawlog) as oracle_log_message 
| parse regex field=oracle_log_message "CONNECT_DATA[\s\S]+?SERVICE_NAME=(?<serviceName>[^)]*)\)[\s\S]+establish" nodrop
| parse regex field=oracle_log_message "CONNECT_DATA[\s\S]+?service_name=(?<serviceName>[^)]*)\)[\s\S]+establish" nodrop
| parse regex field=oracle_log_message "CONNECT_DATA[\s\S]+?SID=(?<SID>[^)]*)\)[\s\S]+establish" nodrop
| parse regex field=oracle_log_message "CONNECT_DATA[\s\S]+?sid=(?<SID>[^)]*)\)[\s\S]+establish" nodrop
| count as %"ConnectionCount"
```

## Viewing Oracle Dashboards

### Overview

See the overview of Oracle listener process activity, including successful DB connections, TNS error information, SID and Service Name usage, and top usage, in terms of ports, database users, user hosts, client hosts, and user programs as derived from the Oracle Listener log.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Oracle-OpenTelemetry/Oracle-Overview.png' alt="Overview" />

DB Connections. The count of database connections established during the previous 24 hours.

TNS Errors. The count of TNS errors during the previous 24 hours.

Top TNS Errors. A table that shows the top 10 TNS errors and the count of each in the previous 24 hours.

TNS Error Trend. A stacked column chart that shows the count of each TNS error per one hour timeslice, over the previous 24 hours.

SID. A donut chart that shows the breakdown of connections by SID over the previous 24 hours.

Service Name. A donut chart that shows the breakdown of connections by service name over the previous 24 hours.

Service Name Vs SID Adoption A donut chart that shows the breakdown of connections by SID versus by Service Name over the previous 24 hours.

TNS Protocol Used. A donut chart that shows the breakdown of connection requests by protocol over the previous 24 hours.

Command Execution Status. A donut chart that shows the breakdown of successful and failed Listener commands over the previous 24 hours.

Commands Executed. A donut chart that shows the breakdown of specific lsnrctl commands over the previous 24 hours.

Top Ports Used by Client. A table that shows the top 20 client ports that initiated connections, and connection count for each over the previous 24 hours.

Top Database Users. A table that shows the top 20 database users for which the client initiated connections, and connection count for each over the previous 24 hours.

Most Active User Hosts. A table that shows the top 20 user hosts that initiated connections, and connection count for each over the previous 24 hours.

Top User Program Name. A table that shows the top 20 programs that initiated connections over the previous 24 hours.

### Alert Analysis

See information about Oracle errors, including counts of various error types, ORA messages, oracle instance state, and other data derived from the Oracle Alert log.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Oracle-OpenTelemetry/Oracle-Alert-Analysis.png' alt="Alert Analysis" />

Deadlock Errors. Count of ORA-00060 messages over the previous 24 hours.

Database Crash Errors. Count of database crash errors (ORA-00603, ORA-00449, ORA-00471, or ORA-01092) over the previous 24 hours.

Archival Log Creation Errors. Count of ORA-00270 messages over the previous 24 hours.

Internal Errors. Count of internal errors (ORA-00600 or ORA-07445) over the previous 24 hours.

Fatal NI Connect Errors. Count fatal NI connect errors over the previous 24 hours.

Top ORA Messages A donut chart that shows the breakdown of ORA messages by message type over the previous 24 hours.

ORA Messages Over Time. A stacked column chart that shows the count of ORA messages of each message type per one hour timeslice over the previous 24 hours.

Hosts Reporting ORA Messages. A stacked column chart that shows the count of ORA messages of all types by host per one hour timeslice over the previous 24 hours.

Top TNS Errors. A table that shows the count of Transparent Network Substrate (TNS) errors of each type over the previous 24 hours.

Log Switch Activity By Hosts. An area chart that shows the count of log switch events per one hour timeslice by host. (A log switch is the point at which the database stops writing to one redo log file and begins writing to another.)

Failures, Warnings and Errors by Instance Source. An area chart that shows the count of messages from the Oracle Alert log that match patterns like: fail*, warn*, or error*.

Archival Errors by Instance. A stacked column chart that shows the count of messages from the Oracle Alert log that contain the string "Archival Error" by per one hour timeslice by database instance over the previous 24 hours.

Unable to Extend Tablespace Errors. A table that lists errors related to a failure to extend a tablespace, that occurred during the previous 24 hours.

Instance Started. A table that lists when database instances were started during the previous three days.

Instance Shutdown Initiated. A table that lists when shutdowns of database instances were initiated during the previous three days.

Instance Shutdown Complete. A table that lists when shutdowns of database instances were initiated during the previous three days.

### Listener Troubleshooting

See details of Oracle listener process activity, including database connections by host and application, connection failures, command execution status and trends, and other data derived from the Oracle Listener log.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Oracle-OpenTelemetry/Oracle-Listener-Troubleshooting.png' alt="Listener Troubleshooting" />

DB Connections By Host. An area chart that shows the count of database connections by host, per 5 minute timeslice, over the previous 24 hours.

DB Connections By Applications. A stacked column chart that shows the count of database connection by initiating program, per one day timeslice, over the previous 7 days.

Failed to Success Connection Ratio - Outlier. A visualization that shows when the ratio of failed to successful connections was statistically significant (more than three standard deviations higher than the running average), over the previous 30 days.

Failed Connection Attempts. A table that lists failed database connection attempts over the previous three days.

Command Execution Status. A table that lists the count of specific lsnrctl commands that were issued in the previous seven days, and the count of failures and successes for each.

Command Execution Trend. A stacked column chart that shows the count of specific lsnrctl commands that were issued in the previous seven days per one day timeslice.

Listener Stopped Events. A table that lists listener stop events during the previous 7 days.

SID or Service Name Detailed Breakup. A table that shows the count of connections performed with sid or service name, by userhost, clienthost, and databaseuser.

### Security Monitoring

See information about database connections established by privileged users, connection attempts from public IP addresses, attempts to execute unauthorized commands, and events that are associated with potentially inappropriate activities as derived from Oracle Listener and Alert Logs.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Oracle-OpenTelemetry/Oracle-Security-Monitoring.png' alt="Security Monitoring" />

Admin Restricted Command Execution. The count of database commands that resulted in TNS-12508 errors over the previous 24 hours.

Unauthorized Command Execution. The count of database commands that resulted in TNS-01190 errors over the previous 24 hours.

Possible Inappropriate Activity. The count of lsnrctl commands the resulted in errors of the following types over the previous 24 hours: TNS-01169, TNS-01189, TNS-01190, "TNS-12508", ORA-12525, ORA-28040, or ORA-12170.

Connections By Privileged Users. A donut chart that shows the breakdown of connections from privileged user accounts, such as root and administrator, over the previous 24 hours.

Connection Status by Privileged Users. A table that shows the count of successful and unsuccessful connections from privileged user accounts, such as root and administrator, over the previous 24 hours.

Connections By Privileged Users - Trend. A line chart that shows the count of connections from privileged user accounts, such as root and administrator, per one hour timeslice over over the previous 24 hours.

Recent Successful DB Connections by Privileged Users. A table that shows the count of successful connections from privileged user accounts, such as root and administrator, per one minute timeslice, over the previous 24 hours.

Failed Connection Attempt From PublicIP Location. A map chart that shows the count and location of failed connection attempts from geographical locations over the previous 24 hours.

Successful Connection Attempt From PublicIP Location. A map chart that shows the count and location of successful connection attempts from geographical locations over the previous 24 hours.

Failed DB Connections by Privileged Users. A table that provides information about failed database connections from privileged user accounts, such as root and administrator, over the previous 24 hours.

### Sys Audit Log

See information derived from the syslog audit trail, including successful and failed activities, and top usage by client, database user, and privileges used.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Oracle-OpenTelemetry/Oracle-Sys-Audit-Log.png' alt="Sys Audit Log" />

Status Trend. A stacked column chart that shows the count of successful and unsuccessful database actions over the previous 24 hours.

Failure Status Trend. A stacked column chart that shows the count of unsuccessful database actions by failure status code over the previous 24 hours.

Recent Failure Activities. A table that lists unsuccessful database actions over the previous 60 minutes.

Top Client Users. A table that shows the top 10 client users over the previous 24 hours, and a count of the events associated with each.

Top Database Users. A table that shows the top 10 database users over the previous 24 hours, and a count of the events associated with each.

Top Privileges Used. A table that shows the top 10 database privileges used over the previous 24 hours, and a count of the events associated with each.

Recent Successful Activities. A table that lists information about successful database actions over the previous 60 minutes.

### Sys Audit Log - Logon Analysis

See logon activity information derived from the syslog audit trail, including successful and failed logons, logon status trends, multiple database user logons and client user logons from the same UserHost, and multiple UserHost logons with the same database user.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Oracle-OpenTelemetry/Oracle-Sys-Audit-Log-Logon-Analysis.png' alt="Sys Audit Log - Logon Analysis" />

Successful Logons. Count of successful logins in the previous 24 hours.

Failed Logons. Count of failed logins in the previous 24 hours.

Successful Logoffs. Count of successful logoffs in the previous 24 hours.

Logon Activities Trend. Stacked column chart that shows the count of logons and logoffs per one hour timeslice over the previous 24 hours.

Brute Force Login Success. Table that lists information about brute force login attempts that succeeded during the previous three days.

Excessive Failed Logons. A table that lists information about incidents where there were more than five failed logons within 5 minutes during last three days.

Multiple Database User Logons From Same UserHost. A table that lists UserHosts that successfully established connections using more than one database user over the previous 24 hours.

Multiple Client User Logons From Same UserHost. A table that lists UserHosts that successfully established connections using more than one client user over the previous 24 hours.

Multiple UserHosts Logons with Same Database User. A table that lists database users that successfully established connections from the multiple user hosts over the previous 24 hours.

### XML Audit Log - Logon Analysis

See logon activity information derived from the XML audit trail, including successful and failed logons, logon status trends, multiple database user logons and client user logons from the same UserHost, and multiple UserHost logons with the same database user.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Oracle-OpenTelemetry/Oracle-XML-Audit-Log-Logon-Analysis.png' alt="XML Audit Log - Logon Analysis" />

### XML Audit Log - SQL Statement Analysis

See information derived from the XML audit trail about user management, role management, Data Definition Language (DDL), Data Manipulation Language (DML), and Transaction Control Language (TCL) activity.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Oracle-OpenTelemetry/Oracle-XML-Audit-Log-SQL-Statement-Analysis.png' alt="XML Audit Log - SQL Statement Analysis" />

Recent User Management Activities. A table that lists information about user management activities in the previous 24 hours.

User Management Activity Trend. A stacked column chart that shows the count of user management actions by action type per one hour timeslice over the last 7 days.

Recent Role Management Activities. A table that lists information about role management activities in the previous 24 hours.

Role Management Activity Trend. A stacked column chart that shows the count of role management actions by action type per one hour timeslice over the last 7 days.

Recent DDL Activities. A table that lists information about Data Definition Language (DDL) activities in the previous 24 hours.

DDL Activity Trend. A stacked column chart that shows the count of DDL actions by action type per one hour timeslice over the last 7 days.

Recent DML Activities. A table that lists information about Data Manipulation Language (DML) activities in the previous 24 hours.

DML Activity Trend. DDL Activity Trend. A stacked column chart that shows the count of DML actions by action type per one hour timeslice over the last 7 days.

Recent TCL Activities. A table that lists information Transaction Control Language (TCL) activities in the previous 24 hours.

TCL Activity Trend. A stacked column chart that shows the count of DML actions by action type per one hour timeslice over the last 7 days.

### Monitor Performance by DB Script

See database usage information obtained by the Oracle script source, including tablespace and datafile utilization; recent active connections; wait times; and recent jobs.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Oracle-OpenTelemetry/Oracle-Monitor-Performance-by-DB-Script.png' alt="Monitor Performance by DB Script" />

TableSpace Utilization. A table that shows, for each tablespace, the percentage of tablespace used for each 5 minute timeslice over the last 60 minutes.

TableSpace Utilization Trend. A line chart that shows, for each tablespace, the percentage of tablespace used over the last 24 hours.

Datafile Space Utilization. A table that shows, for each database file (.dbf), the percentage of allocated file space used for each 5 minute timeslice over the last 60 minutes.

Datafile Space Utilization Trend. A line chart that shows, for each database file (.dbf), the percentage of allocated file space used over the last 24 hours.

Buffer Cache Hit Ratio. An area chart that shows the buffer cache hit ratio for each 5 minute timeslice over the last 60 minutes.

Recent Active Connections. A table of information about recent active connections, including the user, machine, and number of connections.

Maximum Wait Time (sec) by User. A line chart that shows, for each user, the session wait times for each 5 minute timeslice over the last 60 minutes.

Top Session Wait Time Events. A table that shows the top 10 event types associated with session waits, and the count of each event type.

Recent Jobs in the database. A table of information about recent database jobs, including when each job ran, low long it ran, and when it will next run.
