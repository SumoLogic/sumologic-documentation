---
id: performance-metrics
title: Performance Metrics Script Setup
description: This section has instructions for setting up the performance metrics script on Windows for the Oracle app.
---

This section has instructions for setting up the performance metrics script on Linux and Windows for the Oracle app.

The Sumo app for Oracle uses a Python script to query database tables to collect Oracle server performance metrics.

The script connects the database using a database user account, runs a set of example SQL queries, and prints the query results in JSON format to the console. The account credentials and SQL queries are specified in the script configuration file, `oracle-perf-monitor.cfg`.

The SQL queries in the “`[queries]`”  section of the configuration file are provided as examples. You can add, modify, and remove queries, as desired. We recommend having the queries you plan to use reviewed by your DBA.

The database user that you use to run the SQL queries should have permission to access query-specific databases, tables, and views. The table below shows the SQL commands to grant the required permissions for each query.


<table>
  <tr>
   <td><strong>Query </strong>
   </td>
   <td><strong>SQL Command to Grant Permissions</strong>
  </td>
  </tr>
  <tr>
   <td>For Queries 1 through 3</td>
   <td><p><code>SQL> grant select on sys.v_$tablespace to &#60;username&#62;;</code></p>
<p><code>SQL> grant select on sys.dba_free_space to &#60;username&#62;;</code></p>
<p><code>SQL> grant select on sys.v_$datafile to &#60;username&#62;;</code></p>
<p><code>SQL> grant select on v_$sysstat to &#60;username&#62;;</code></p>
   </td>
  </tr>
  <tr>
   <td>For Query 4</td>
   <td><p><code>SQL> grant select on sys.v_$session to &#60;username&#62;;</code></p>
<p><code>SQL> grant select on sys.v_$process to &#60;username&#62;;</code></p>
   </td>
  </tr>
  <tr>
   <td>For Queries 5 and 6</td>
   <td><code>SQL> grant select on sys.v_$session_wait to &#60;username&#62;;</code>
<p><code>SQL> grant select on sys.dba_jobs to &#60;username&#62;;</code></p></td>
  </tr>
</table>



## Linux

The script was developed and tested on:
* Linux Server 8.4, Python (3.7.10), Oracle Database 19c Enterprise Edition Release 19.0.0.0.0 - Production - Version 19.3.0.0.0


### Prerequisite

### Check Linux version

Check the version of Linux currently running on your machine to ensure compatibility with the script.

```bash
$ lsb_release -a
LSB Version: :core-4.1-amd64:core-4.1-noarch
Distributor ID: OracleServer
Description: Oracle Linux Server release 8.4
Release: 8.4
Codename: n/a
```


If you get the error lsb_release: command not found , use below command to install lsb core and then re-run above command

sudo yum update && sudo yum install redhat-lsb-core


#### Install Python 3.7.10+ for Linux

In this step, you install Python 3.7.10 for Linux.

1. Install Python using the following command.
  ```bash
  yum install python3 -y
  ln -s /usr/bin/python3 /usr/bin/python
  ```
2. To check the Python version:
  ```bash
  python3 --version
  Python 3.7.10
  ```
3. In this step, you install pip if it’s not already installed. To determine whether pip is installed, run this command:
  ```bash
  $ pip3 -V
  ```
  If pip is not installed, you’ll see this message: `The program 'pip' is currently not installed`. To install pip, run this command:
  ```bash
  yum install python3-pip -y
  ```
  To verify the installation, run this command:
  ```bash
  $ pip3 -V
  ```
  You should see a message like this: `pip 20.2.2 from /usr/lib/python3.7/site-packages/pip (python 3.7)`.


### Install Oracle Instant Client on Linux 64bit OS

1.  Install Oracle Instant Client packages
```bash
$ dnf install oracle-instantclient-release-el8 -y
$ dnf install oracle-instantclient-basic
$ oracle-instantclient-devel oracle-instantclient-jdbc
$ oracle-instantclient-odbc oracle-instantclient-sqlplus oracle-instantclient-tools -y
```
2. Install the `libaio` and `libaio-dev` packages if they are not already installed. Typically, in standard Oracle Linux Server, the `libaio` and `libaio-dev` are not pre-installed. These packages are required to start the Oracle Instant Client.
```bash
$ dnf install -y libaio libaio-devel
```
3. Test the client
```bash
$ sqlplus username/password@//databasehost:1521/sidvalue
SQL*Plus: Release 19.0.0.0.0 - Production on Thu Nov 25 12:42:35 2021
Version 19.3.0.0.0
Copyright (c) 1982, 2019, Oracle.  All rights reserved.
Connected to:
Oracle Database 19c Enterprise Edition Release 19.0.0.0.0 - Production
Version 19.3.0.0.0
```
1. Run a sample SQL query to test the connection.
```sql
SQL> select BANNER from v$version;                
BANNER
--------------------------------------------------------------------------------
Oracle Database 19c Enterprise Edition Release 19.0.0.0.0 - Production
```

### Set up cx_Oracle on Linux

In this step, you set up cx_Oracle, an open-source Python interface to Oracle.

1. Install cx_Oracle.
```bash
pip3 install cx_Oracle==7.3
```
2. Check the cx_oracle version.
```bash
pip3 list | grep cx-Oracle
cx-Oracle (7.3.0)
```


### Set up and Configure Performance Metrics Script

In this step, you set up the performance metrics script.


#### Download the script - Clone the git repo

Clone the Sumo Logic Python performance metrics script and configuration files from the git repo inside a folder (for example: oracle_script) using below command:

```bash
$ git clone git@github.com:SumoLogic/sumologic-oracle-perf-monitor.git
```

Once the script is cloned, navigate to oracle_script/sumooracle

Two files [oracle-perf-monitor.cfg](https://github.com/SumoLogic/sumologic-oracle-perf-monitor/blob/main/sumooracle/oracle-perf-monitor.cfg) and [oracle-perf-monitor.py](https://github.com/SumoLogic/sumologic-oracle-perf-monitor/blob/main/sumooracle/oracle-perf-monitor.py) should be present.


#### Configure the script

Make the following updates to the script configuration file (`oracle-perf-monitor.cfg`). In the `[dbLogin]` section, supply values for each parameter:

If you do not wish to keep the password in the configuration file, keep the oraPassword field blank. You can set the password in the environment variable **DB_PASSWORD.**

To set environment variable , add variable in your  `~/.bash_profile` file in your environment

`export DB_PASSWORD = DB Password`

The script first tries to read the password from the config file, if the password is not found in the config file, it searches for an environment variable `DB_PASSWORD`.

 `[dbLogin]`


* `oraUser= database user id       example myuser123`
* `oraPassword= user password      example mypwd123`
* `oraHost=server name        example ip-101-25-17-22`
* `oraPort=port number             example 1521`
* `oraInstance=oracle instance SID (SID_NAME)          example XE`


#### Test the script

```bash
$ python3 oracle-perf-monitor.py
```


### Configure the Sumo Logic Script Source

1. In Sumo Logic, go to **Manage Data > Collection > Collection**.
2. Find the name of the installed collector to which you'd like to add a Source. Click **Add.** Then choose **Add Source** from the pop-up menu.
3. Select **Script** for the Source type. Collectors using version 19.245-4 and later do not allow Script Sources to run by default. To allow Script Sources you need to set the Collector parameter `enableScriptSource` in [user.properties](/docs/send-data/installed-collectors/collector-installation-reference/user-properties) to true and [restart](/docs/send-data/collection/start-stop-collector-using-scripts.md) the Collector.
    1. For **Name** enter any name you like, for instance, Oracle Server Script
    2. The **Description** is optional.
    3. For **Source Category**, enter the desired category. It can be any value you like, for example, `DB/Oracle/DBQueryScript`.
    4. **Fields.** Set the following fields:
        * `component = database`
        * `db_system = oracle`
        * `db_cluster = <Your_Oracle_Cluster_Name>`. Enter **Default** if you do not have one.
        * `environment = <Your_Environment_Name>`(for example, `Dev`, `QA`, or `Prod`)


    5. For **Frequency**, select desired frequency, for instance, 5 minutes
    6. For **Specify a timeout for your command**, select a value that is long enough that long-running queries can complete, for instance, 30 seconds.
    7. For **Command**, `select /usr/bin/python`
    8. For **Script**, enter a path to the script, for example, `oracle_script/sumooracle/oracle-perf-monitor.py`
    9. For **Working Directory**, enter a directory, for example,
`oracle_script/sumooracle`
    10. Click **Save**.

After a few minutes, your new Source should be propagated down to the Collector and will begin submitting your Oracle log files to the Sumo Logic service.


## Windows

This section has instructions for setting up the performance metrics script on Windows OS for the Oracle app.

The script was developed and tested on:
* Windows Server 2019 standard, Python (3.7.10), Oracle Database 19c (19.3) for Microsoft Windows x64 (64-bit)


### Prerequisite


### Install Python 3.7.10+ for Windows

1. Download and install Python for Windows from: [https://www.python.org/downloads/](https://www.python.org/downloads/).
2. Add the python installation folder to your Path system variable: **Control Panel** > **Systems** > **Advanced System Settings** > **Advanced Tab** > **Environment Variable** > **System Variables** > **Path**.

To confirm that you have successfully installed Python and added it to your path, open a new command window and run the following command:
```bash
C:\Users\Administrator>python3 --version
```

You should see this response: `Python 3.7.10`.



### Install Oracle Instant Client for Windows 64bit  

1. Download and setup Oracle Instant Client for Win 64bit.
   * http://www.oracle.com/technetwork/topics/winx64soft-089540.html
   * instantclient-sdk-windows.x64-21.3.0.0.0.zip
   * instantclient-basic-windows.x64-21.3.0.0.0.zip
   * instantclient-sqlplus-windows.x64-21.3.0.0.0.zip
2. Unzip the packages into a single directory, for example:
```bash
C:\oracle\instantclient_21_3\
```
3. Add this directory to the PATH environment variable. If you have multiple versions of Oracle libraries installed, make sure the new directory occurs first in the path.
4. Download and install the correct Visual Studio Redistributable from Microsoft. Instant Client 21.3 requires the [Visual Studio 2017 redistributable](https://support.microsoft.com/en-us/help/2977003/the-latest-supported-visual-c-downloads).
5. Test the client:
```bash
sqlplus username/password@//databasehost:1521/sidvalue
C:\Users\Administrator>sqlplus user/password//IP_ORACLE_SERVER:1521/remote_service_name

SQL*Plus: Release 19.0.0.0.0 - Production on Thu Nov 25 17:03:16 2021
Version 19.3.0.0.0
Copyright (c) 1982, 2019, Oracle.  All rights reserved.
Connected to:
Oracle Database 19c Enterprise Edition Release 19.0.0.0.0 - Production
Version 19.3.0.0.0
```
6. Run some sample SQL queries to test the connection,
```sql
SQL> select BANNER from v$version;
BANNER
-----------------------------------------------------------------
Oracle Database 19c Enterprise Edition Release 19.0.0.0.0 - Production
```


### Install cx_Oracle on Windows

1. Use Python’s pip package to install cx_Oracle.
```bash
python3 -m pip install cx_Oracle==7.3
```
2. Check the cx_Oracle version.
```bash
C:\Users\Administrator>python3
Python 3.7.10 (v2.7.18:8d21aa21f2, Apr 20 2020, 13:25:05) [MSC v.1500 64 bit (AMD64)] on win32
Type "help", "copyright", "credits" or "license" for more information.
>>> import cx_Oracle
>>> print cx_Oracle.version
7.3.0
>>>
```


### Set up and Configure Performance Metrics Script

In this step, you set up the performance metrics script.


### Download the script - Clone the git repo

Clone the Sumo Logic Python performance metrics script and configuration files from the git repo inside a folder (for example: oracle_script) using below command:
```bash
$ git clone git@github.com:SumoLogic/sumologic-oracle-perf-monitor.git
```

Once the script is cloned, navigate to oracle_script/sumooracle.

Two files [oracle-perf-monitor.cfg](https://github.com/SumoLogic/sumologic-oracle-perf-monitor/blob/main/sumooracle/oracle-perf-monitor.cfg) and [oracle-perf-monitor.py](https://github.com/SumoLogic/sumologic-oracle-perf-monitor/blob/main/sumooracle/oracle-perf-monitor.py) should be present.


#### Configure the script

Make the following updates to the script configuration file (`oracle-perf-monitor.cfg`). In the `[dbLogin]` section, supply values for each parameter:

If you do wish to keep the password in the configuration file, keep the oraPassword field blank. You can keep the password in the environment variable `DB_PASSWORD`.

To set environment variable , add variable using below command:
```
setx DB_PASSWORD = DB Password
```

The script first tries to read password from the config file, if the password is not found in config file, it searches for an environment variable **DB_PASSWORD**

`[dbLogin]`

* `oraUser= database user id      example myuser123`
* `oraPassword= user password      example mypwd123`
* `oraHost=server name        example ip-101-25-17-22`
* `oraPort=port number        example 1521`
* `oraInstance=oracle instance SID (SID_NAME)           example XE`


#### Test the script

```bash_profile
oracle_script/sumooracle>python3 oracle-perf-monitor.py
```


### Configure the Sumo Logic Script Source

1. In Sumo Logic, go to **Manage Data > Collection > Collection**.
2. Find the name of the Installed Collector to which you'd like to add a Source. Click **Add.** Then choose **Add Source** from the pop-up menu.
3. Select **Script** for the Source type. Collectors using version 19.245-4 and later do not allow Script Sources to run by default. To allow Script Sources you need to set the Collector parameter `enableScriptSource` in [user.properties](/docs/send-data/installed-collectors/collector-installation-reference/user-properties) to true and [restart](/docs/send-data/collection/start-stop-collector-using-scripts.md) the Collector.
    * For **Name** enter any name you like, for instance, **Oracle Server Script.**
    * The **Description** is optional.
    * For **Source Category**, enter the desired category. It can be any value you like, for example, `DB/Oracle/DBQueryScript`.
    * For **Frequency**, select desired frequency, for instance, 5 minutes.
    * For **Specify a timeout for your command**, select a value that is long enough that long-running queries can complete, for instance, 30 sec.
    * For **Command**, select **Windows Script.**
    * For **Script**, select **Type a path to the script to execute**, then enter: for instance `oracle_script/sumooracle\oracle-perf-monitor.py`.
    * For **Working Directory**, enter: for instance oracle_script/sumooracle
    * Click **Save**.
