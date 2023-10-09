---
id: prerequisites-windows-remote-file-collection
title: Prerequisites for Windows Remote File Collection
---



Sumo Logic requires a few extra steps when you set up collection in Windows environments. For remote file collection from Windows systems, choose one of these two methods:

* Set up a UNC Share Path to collect Windows logs using CIFS/SMB
* Set up a third-party tool on the target system to handle SSH

## Collect Windows Logs from a UNC Share Path

As an alternative to using SSH for remote Windows collections, Sumo Logic Collectors can collect files remotely using CIFS/SMB by configuring a Local File Source (not a Remote File Source) with a UNC share path.

Here is an overview of the required steps:

* [Install a Collector on Windows](/docs/send-data/installed-collectors/windows.md).
* On the machine where the files reside (the target or remote machine), use Windows Advanced Sharing options to create a UNC share for the log directory.
* [Set up a Local File Source](../local-file-source.md).

The Collector must reside within the same Active Directory domain as the target host, and the target host must allow access without requiring a password.

### Step 1. Install a Sumo Logic Collector.

[Install a Collector on Windows](/docs/send-data/installed-collectors/windows.md) on a machine within the same Active Directory domain as the target system
where files reside.

### Step 2. Set UNC share permissions.

1. Set up the UNC share permissions (Share with "Everyone" and "Read-Only") for the folder on the target machine.

   * Open Explorer in the machine where the files reside.
   * Right-click the log directory, and select **Properties**.
   * Click **Advanced Sharing**.
   * In the Advanced Sharing dialog, give the log directory a share name (or just use the actual folder name), and then click **Permissions**.
   * Set the permissions for **Everyone** to **Read**.

      :::note
      The Collector runs in the System context and cannot use drive mappings created by users who logon via interactive login. For example, if you map the network drive **\\\\192.168.0.16\\logs** to**Z:\\logs**, the Collector will not be able to access the **Z:\\** drive. Instead, specify the full UNC path in your Source Path Expression (i.e., **\\\\192.168.0.16\\logs\\filename.log**) and set the permissions on the remote share to allow **Read** access to **Everyone**.  
      :::

    ![img](/img/send-data/Win-UNC-share-permissions-sm.png)

1. Click **OK**. When the Permissions dialog closes, you will see your UNC path listed under Network Path. This is the exact path you will enter when you are configuring a Local File Source in Sumo Logic.

    ![img](/img/send-data/Win-UNC-path.png)

1. Verify that you have set up the share correctly. Open Explorer on the machine where the Collector is installed. Type in the UNC share path. If you can see the log files listed, you can collect them. If Explorer asks you to enter a password, then you have not set up permissions correctly. Make sure that permissions for the folder are set to "Everyone" and "Read-Only."
1. From Sumo Logic, [create a new Local File Source](../local-file-source.md).
1. Enter the file path to the UNC share. For this example, the UNC path looks like this:  **\\\\WIN-QR0406514NE\\LogFiles**

    In general, a UNC path has this format: **\\\\server\\share\\file_path**.

1. The ***server*** portion of a UNC path references the server name set by a system administrator, or an IP address. The ***share*** portion of a UNC name references a labeled share point created by an administrator, as in Step 2. The ***file path*** portion of a UNC name references the local sub-directories beneath the share point.
1. Save your Local File Source configuration. Wait a few seconds, and then click the **Status** tab to check the message volume for the Collector.

## Use a third-party client to handle SSH in Windows

This topic has instructions for setting up a remote file source to collect log data via SSH.  Because Windows does not handle SSH natively, you must install a third-party product (OpenSSH) to enable data collection using SSH.

To install OpenSSH and Cygwin:

1. [Download OpenSSH from Sourceforge](http://sourceforge.net/projects/sshwindows/files/OpenSSH-for-Windows---Release/3.8p1-1-20040709-Build/).
1. Install OpenSSH to C:\\OpenSSH or another directory.
1. [Download and install Cygwin](http://cygwin.com/install.html).
1. Open a cmd window and start the SSH service: run "**net start opensshd**".
1. SSH into the window system. Verify that SSH works and that you can tail a file. For example, for a user called "mandy" run these commands in the terminal window:

    ```
    ssh mandy@192.168.1.114
    (enter password)
    tail -f –n+1 /cygdrive/c/mandy\ test/6.log
    ```

When you [configure the Remote File Source](prerequisites-windows-remote-file-collection.md) to
collect from the Windows machine, make sure to:

1. Specify the host as the Windows system.
1. Specify the File path starting with **/cygdrive**. For example, enter "**/cygdrive/c/mandy\\ test/6.log**" in the File field if the path is "**C:\\mandy test\\6.log**".

Use "\\" to escape any spaces if they are present in the file path.
