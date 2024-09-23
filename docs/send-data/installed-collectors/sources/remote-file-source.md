---
id: remote-file-source
title: Remote File Source
description: You can collect file tail data from a remote system using SSH.
---

import CollBegin from '../../../reuse/collection-should-begin-note.md';

You can collect file tail data from a remote system using SSH.

Log files collected using a Remote File Source must be encoded in UTF-8 or ASCII. If you are editing a Source, metadata changes are reflected going forward. Metadata for previously collected log data will not be retroactively changed.

Sumo Logic scans remote directories every 30 seconds.

:::note
To collect remote Windows logs using CIFS/SMB, see CIFS/SMB, see [Prerequisites for Remote Windows Event Log Collection](prerequisites-windows-remote-file-collection.md). To collect Windows Events, see [Configuring a Local Windows Event Log Source](../local-windows-event-log-source.md).
:::

To configure a Remote File Source:

1. First see [Prerequisites for Windows Remote File Collection](prerequisites-windows-remote-file-collection.md).
1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic top menu select **Configuration**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**. 
1. Find the name of the installed Collector here you'd like to add a Source. Click **Add** and then choose **Add Source** from the pop-up menu.
1. Select **Remote File** for the Source type.  <br/>  ![Remote File Source icon.png](/img/send-data/Remote-File-Source-icon.png) 
1. Set the following:
   * **Name.** Type the name you'd like to display for the new Source. **Description** is optional. Source name metadata is stored in a searchable field called `_sourceCategory`.
   * **Host.** Enter the hostname or the IP address of the remote machine (the hostname entered must be the system hostname or IP address and cannot be changed). The hostname is stored in a searchable field called `_sourceHost`. The hostname can be a maximum of 128 characters. You can define a Source Host value using system environment variables, see [Configuring sourceCategory and sourceHost using variables](#configuring-sourcecategory-and-sourcehost-using-variables) below.
   * **Port.** If your SSH server is listening on a nonstandard port, type the port number.
   * **Path Expression.** Enter the absolute path expression to the file the Source should tail. Remote File Sources support wildcards in file paths. If the timestamp formats for the files are not identical, set up a separate Remote File Source for each file. [For Windows collections using Open SSH and Cygwin](prerequisites-windows-remote-file-collection.md), specify the File path starting with **/cygdrive**. For example, if the path is "**C:\\mandy test\\6.log**" enter "**/cygdrive/c/mandy\\ test/6.log**" in the File field. Use "\\" to escape any spaces if they are present in the file path.
   * **Collection should begin.** Choose or enter how far back you'd like to begin collecting historical logs. You can either:
     * Choose a predefined value from dropdown list, ranging from “Now” to “24 hours ago” to “All Time”.
     * Enter a relative value. To enter a relative value, click the **Collection should begin** field and press the delete key on your keyboard to clear the field. Then, enter a relative time expression, for example “-1w”. You can define when you want collection to begin in terms of months (M), weeks (w), days (d), hours (h) and minutes (m).
     :::note
     <CollBegin/>
     :::
   * **Source Category.** Type any string to tag the logs collected from this Source with searchable metadata. For example, type firewall to tag all entries from this Source in a field called _sourceCategory. See our [Best Practices: Good and Bad Source Categories](/docs/send-data/best-practices#good-and-bad-source-categories). You can define a Source Category value using system environment variables, see [Configuring sourceCategory and sourceHost using variables](#configuring-sourcecategory-and-sourcehost-using-variables) below.
   * **Fields.** Click the **+Add Field** link to define the fields you want to associate, each field needs a name (key) and value.
      * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
      * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo that does not exist in the Fields schema it is ignored, known as dropped.
1. Choose the type of Credentials used for this Source:
   * Username and Password. Enter valid user credentials for the remote machine.
   * Local SSH Config. Enter the username and the absolute path, including file name, to the PEM SSH key file located on the Collector host. Enter a password if required.<br/>  ![remote file source credential input.png](/img/send-data/remote-file-source-credential-input.png)
1. Set any of the following under **Advanced.**<br/>![Local File UI June 2021.png](/img/send-data/Local-File-UI.png)
    * **Denylist.** Optional. Add any files to be excluded by including one or more path expressions separated by commas. Note that this field takes a maximum of 10240 characters.
    * **Enable Timestamp Parsing.** This option is selected by default. If it's deselected, no timestamp information is parsed at all.
      * **Time Zone.** There are two options for Time Zone. You can use the time zone present in your log files, and then choose an option in case time zone information is missing from a log message. Or, you can have Sumo Logic completely disregard any time zone information present in logs by forcing a time zone. It's very important to have the proper time zone set, no matter which option you choose. If the time zone of logs cannot be determined, Sumo Logic assigns logs UTC; if the rest of your logs are from another time zone your search results will be affected.
      * **Timestamp Format.** By default, Sumo Logic will automatically detect the timestamp format of your logs. However, you can manually specify a timestamp format for a Source. See [Timestamps, Time Zones, Time Ranges, and Date Formats](/docs/send-data/reference-information/time-reference) for more information.
   * **Enable Multiline Processing.** See [Collecting Multiline Logs](/docs/send-data/reference-information/collect-multiline-logs) for details on multiline processing and its options. This is enabled by default. Use this option if you're working with multiline messages (for example, log4J or exception stack traces). Deselect this option if you want to avoid unnecessary processing when collecting single-message-per-line files (for example, Linux system.log). Choose one of the following:
     * **Infer Boundaries.** Enable when you want Sumo Logic to automatically attempt to determine which lines belong to the same message. If you deselect the **Infer Boundaries** option, you will need to enter a regular expression in the **Boundary Regex** field to use for detecting the entire first line of multiline messages.
     * **Boundary Regex.** You can specify the boundary between messages using a regular expression. Enter a regular expression that matches the entire first line of every multiline message in your log files.
1. Create any processing rules you'd like for the new Source.
1. When you are finished configuring the Source, click **Save**.

## Configuring sourceCategory and sourceHost using variables

Sumo Logic Collector versions 19.216-22 and later allow you to define Source Category and Source Host metadata values with system environment variables from the host machine.

:::note
Not all Sources can define a Source Host value.
:::

When configuring your Source, specify the system environment variables by prepending sys. and wrapping them in double curly brackets `{{}}` in this form:

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


## Prerequisites for Windows Remote File Collection

Sumo Logic requires a few extra steps when you set up collection in Windows environments. For remote file collection from Windows systems, choose one of these two methods:

* Set up a UNC Share Path to collect Windows logs using CIFS/SMB
* Set up a third-party tool on the target system to handle SSH

### Collect Windows Logs from a UNC Share Path

As an alternative to using SSH for remote Windows collections, Sumo Logic Collectors can collect files remotely using CIFS/SMB by configuring a Local File Source (not a Remote File Source) with a UNC share path.

Here is an overview of the required steps:

* [Install a Collector on Windows](/docs/send-data/installed-collectors/windows.md).
* On the machine where the files reside (the target or remote machine), use Windows Advanced Sharing options to create a UNC share for the log directory.
* [Set up a Local File Source](../local-file-source.md).

The Collector must reside within the same Active Directory domain as the target host, and the target host must allow access without requiring a password.

#### Step 1. Install a Sumo Logic Collector.

[Install a Collector on Windows](/docs/send-data/installed-collectors/windows.md) on a machine within the same Active Directory domain as the target system where files reside.

#### Step 2. Set UNC share permissions.

1. Set up the UNC share permissions (share with "Everyone" and "Read-Only") for the folder on the target machine.
   * Open Explorer in the machine where the files reside.
   * Right-click the log directory, and select **Properties**.
   * Click **Advanced Sharing**.
   * In the Advanced Sharing dialog, give the log directory a share name (or just use the actual folder name), and then click **Permissions**.
   * Set the permissions for **Everyone** to **Read**.<br/> ![img](/img/send-data/Win-UNC-share-permissions-sm.png)
      :::note
      The Collector runs in the System context and cannot use drive mappings created by users who logon via interactive login. For example, if you map the network drive **\\\\192.168.0.16\\logs** to**Z:\\logs**, the Collector will not be able to access the **Z:\\** drive. Instead, specify the full UNC path in your Source Path Expression (i.e., **\\\\192.168.0.16\\logs\\filename.log**) and set the permissions on the remote share to allow **Read** access to **Everyone**.  
      :::
1. Click **OK**. When the Permissions dialog closes, you will see your UNC path listed under Network Path. This is the exact path you will enter when you are configuring a Local File Source in Sumo Logic.<br/>  ![img](/img/send-data/Win-UNC-path.png)
1. Verify that you have set up the share correctly. Open Explorer on the machine where the Collector is installed. Type in the UNC share path. If you can see the log files listed, you can collect them. If Explorer asks you to enter a password, then you have not set up permissions correctly. Make sure that permissions for the folder are set to "Everyone" and "Read-Only."
1. From Sumo Logic, [create a new Local File Source](../local-file-source.md).
1. Enter the file path to the UNC share. For this example, the UNC path looks like this: **\\\\WIN-QR0406514NE\\LogFiles**. In general, a UNC path has this format: **\\\\server\\share\\file_path**.
1. The ***server*** portion of a UNC path references the server name set by a system administrator, or an IP address. The ***share*** portion of a UNC name references a labeled share point created by an administrator, as in Step 2. The ***file path*** portion of a UNC name references the local sub-directories beneath the share point.
1. Save your Local File Source configuration. Wait a few seconds, and then click the **Status** tab to check the message volume for the Collector.

### Use a third-party client to handle SSH in Windows

This topic has instructions for setting up a remote file source to collect log data via SSH.  Because Windows does not handle SSH natively, you must install a third-party product (OpenSSH) to enable data collection using SSH.

To install OpenSSH and Cygwin:
1. [Download OpenSSH from Sourceforge](http://sourceforge.net/projects/sshwindows/files/OpenSSH-for-Windows---Release/3.8p1-1-20040709-Build/).
1. Install OpenSSH to C:\\OpenSSH or another directory.
1. [Download and install Cygwin](http://cygwin.com/install.html).
1. Open a cmd window and start the SSH service: run "**net start opensshd**".
1. SSH into the window system. Verify that SSH works and that you can tail a file. For example, for a user called "mandy", run these commands in the terminal window:
    ```sh
    ssh mandy@192.168.1.114
    (enter password)
    tail -f –n+1 /cygdrive/c/mandy\ test/6.log
    ```

When you [configure the Remote File Source](prerequisites-windows-remote-file-collection.md) to collect from the Windows machine, make sure to:
* Specify the host as the Windows system.
* Specify the File path starting with **/cygdrive**. For example, enter "**/cygdrive/c/mandy\\ test/6.log**" in the File field if the path is "**C:\\mandy test\\6.log**".

Use `"\\"` to escape any spaces if they are present in the file path.


## Enable Collector Remote Host Key Verification

The Sumo Logic Collector can optionally verify the RSA fingerprint for a remote server against a list of known hosts. When host verification is enabled, the Collector collects from a Remote File Source only if the remote host fingerprint is whitelisted in a **known_hosts** file.

### Generate a remote host key verification file

Remote host key verification uses the RSA algorithm to verify host keys. By default, SSH stores known host fingerprints in a **known_hosts** file located in **\~/.ssh/known_hosts**.

To obtain the RSA host key fingerprint, use SSH to access the remote server.

If the key fingerprint is not an RSA key fingerprint, use SSH to access the server again with the **HostKeyAlgorithms** configuration option, as follows.

```bash
ssh -oHostKeyAlgorithms=’ssh-rsa’ username@hostname
```

Example **known_hosts** file format:

```
192.168.1.2 ssh-rsa AAAAB3NzaC1...nXIDE=
195.145.6.2 ssh-rsa AAAAB3NzaC1...dlZDm=
192.35.212.357 ssh-rsa AAAAB3NzaC1...UffAaQ=
```

### Enable Remote Host Key Verification

1. Stop the Sumo Logic Collector service.
    * On Windows: `net stop sumo-collector`
    * On Linux: `sudo ./collector stop`
1. Add the following line to the **config/collector.properties** file in the Collector installation directory and save the file. Replace the placeholder `<pathto>` with the actual path to your known_hosts file.
    ```
    ssh.host.verify.file = /<pathto>/known_hosts
    ```
1. Start the Sumo Logic Collector service:
   * On Windows: `net start sumo-collector`
   * On Linux: `sudo ./collector start`

You can revert back to default configurations or disable the feature by removing the line you added from **collector.properties** and restarting the Collector service.
