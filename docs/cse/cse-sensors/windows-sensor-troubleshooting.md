---
id: windows-sensor-troubleshooting
title: Windows Sensor Troubleshooting
description: Troubleshoot issues with the CSE Windows Sensor.
---


:::note
The CSE Windows Sensor has reached end of life and is no longer supported. Please migrate to a Sumo Logic  Installed Collector. For more information see the [end of life notice](https://app.getbeamer.com/cloudsiementerprise/en/end-of-life-notice-_-cloud-siem-enterprise-sensors). 
:::

This topic describes basic steps for troubleshooting problems with the Windows Sensor.

## Verify Windows Service configuration

1. Open the **Services** (service.msc) tool from the Microsoft Windows Control Panel.
1. Select **Sumo Logic CSE Windows Service** from the list of services. Right-click and choose **Properties**. 
1. Choose the **Log On** tab. Verify that: * **This account** is selected. * **This account** has the correct username.    

    ![image7.png](/img/cse/verify-windows-service.png)
1. Still on the **Log On** tab, re-enter the current password for the account in both password fields, and click **OK**. This will result in the account being granted the “Logon as a service” permission, if it does not already have it.
1. Open the **Recovery** tab. Verify that each failure mode is set to **Restart the Service**, as shown below.

    ![image5.png](/img/cse/restart-service.png)

## Verify that the service account has the necessary permissions

1. Choose the **Log On** tab. 
1. Make sure that the account is a dedicated account that runs only the Windows Sensor. 
1. Verify that the account has “Logon as a service” permission. If the account doesn't have the permission, follow the instructions in [Give service account “Log on as a Service” permission](windows-sensor-troubleshooting.md).
1. Verify that the service account a member of the server’s local Performance Monitor Users group. Alternatively, you can grant the service account local administrator rights, in which case, it does not have to be a member of the Performance Monitor Users group.
1. If the Windows Sensor’s [Domain Controller Monitor](windows-sensor-overview.md#domain-controller-monitor) is being used, as is the default, verify that the service account a member of the Domain Event Log Readers group.
1. If the Windows Sensor [Active Directory Monitor](windows-sensor-overview.md#active-directory-monitor) is being used, as is the default, verify that the service account a member of the Domain Users group.
1. If the Windows Sensor’s [Localhost Monitor](windows-sensor-overview.md#localhost-monitor) is enabled verify that the service account is a member of the local machine’s Event Log Readers group.
1. If the Windows Sensor’s [Windows Event Collector (WEC) Monitor](windows-sensor-overview.md#windows-event-collector-wec-monitor) is enabled, verify that the service account is a member of the appropriate group to be granted access to the Forwarded Events log on the WEC Server. (This is usually the Event Log Readers group).

### Give service account “Log on as a Service” permission

When you install the Windows service, the service account should be granted the "Log on as service" permission. In rare cases, this doesn't happen.

To manually grant the "Log on as service" permission:

1. Run **Start \> Control Panel \> Administrative Tools \> Local Security Policy**.
1. Select **Local Policies \> User Rights Assignment \> Log on as a service**.
1. Click **Add user or Group** and then add the service account to the list of accounts that have the "Log on as a service" permission.

## Verify sensor is sending data

In its default configuration, the Windows Sensor sends event log and directory inventory to the Sumo Logic platform. In some instances, the sensor may be configured to send data to the legacy CSE server, rather than to the Sumo Logic platform. In either case, you should verify that the sensor is sending data to the configured destination. If it is not, that could indicate a problem with the sensor configuration.

### Check that Sumo Logic received data from sensor

Perform this step if the Windows Sensor is running in its default mode, which is to send event logs and directory inventory to the Sumo Logic platform. 

1. Log in to Sumo Logic.
1. In the Sumo Logic UI, go to **Manage Data \> Collection**. 
1. In the list of Collectors and their Sources, locate the Sumo Logic HTTP Source running on Hosted Collector—this is the Source that was set up when the Windows Sensor was installed. (The procedure is described in [Set up Sumo Logic Collector and Source](windows-sensor-installation.md) section of the Windows Sensor Installation topic.)
1. Mouse over the name of the HTTP Source and click on the left blue icon to “Open in Log Search.” This will open a search in another tab and display data recently received from the Windows Sensor. 

    ![image3.png](/img/cse/windows-sensor.png)

If the sensor is properly configured, you should see messages in the search results.  

#### If you don’t see Records in Sumo Logic

If the search you performed above did not return messages, compare the URL of the HTTP Source in Sumo Logic, to the URL configured in the Windows Sensor configuration file.

1. In the Sumo Logic UI, go to **Manage Data \> Collection**. 
1. In the list of collectors and sources, navigate to the HTTP Source that was created to receive data from the sensor.
1. Click **Show URL** and note the URL.
1. Open the Windows Sensor configuration file, `C:\ProgramData\Sumo Logic\CSE Windows Sensor\settings.conf`.
1. Verify that the value of the `address` setting is the same as the URL shown for the Source in Sumo Logic.

### Check that data is coming into the CSE Server

In some instances, the sensor may be configured to send data to the legacy CSE server rather than to Sumo Logic. In this case, verify that data is being ingested to the the CSE server.

1. Navigate to the Windows Sensor in the CSE UI. Click on the gear in the upper right corner, and choose **Sensors** from the configuration menu.
1. Look for the sensor in the list that matches the name of the computer where the sensor service is installed. When the sensor service is working properly and sending records, the **Records Per Second (RPS)** value should be greater than zero. Slide the mouse pointer along the RPS graph to see values at a given time.

    ![sensor-rps.png](/img/cse/sensor-rps.png)

1. To search for individual Records that have been ingested, click the information icon next to the sensor name.
1. On the popup that appears, click the icon next to the Sensor ID to copy the Sensor ID to your clipboard. Then, close the popup.     

    ![sensor-info-popup.png](/img/cse/sensor-info-popup.png)
1. Click the **Records** tab at the top of the page.     

    ![tabs.png](/img/cse/tabs.png)

1. In the **Filters** area, filter by **Metadata Sensor ID** and supply the Sensor ID you copied above. You can enter the following, or select the field and “is” when those options are suggested. Paste in the sensor ID from your clipboard. `Metadata Sensor ID is\<sensor I\>`
1. A list of Records appears.

    ![record-search-by-sensor.png](/img/cse/record-search-by-sensor.png)

1. To view Record details click the plus sign at the left end of the row for a Record.
1. Examine the Records, checking that:     

   * The computer name in a Record matches the computer name where the associated event occurred.
   * The Records have recent timestamps. Be sure to take time zone settings into account.
   * Compare the Records to source event logs, using the Windows Event Viewer. Keep in mind that the sensor configuration determines which categories of events are sent to the portal. For more information, see [EventIdAllowList](windows-sensor-configuration-settings.md#eventidallowlist) and [EventIdDenyList](windows-sensor-configuration-settings.md#eventiddenylist).                   

    ![record-details.png](/img/cse/record-details.png)

### Check that Records appear in CSE UI

If you didn’t see Records in the step above, check the values of the [SensorAPIKey](windows-sensor-configuration-settings.md#sensorapikey) and [SensorID](windows-sensor-configuration-settings.md#sensorid) options in `C:\ProgramData\Sumo Logic\CSE Windows Sensor\settings.conf`. They should match the values shown on the sensor details popup that appears when you click the info icon for a sensor on the **Sensors** page.  

![sensor-id-and-key.png](/img/cse/sensor-id-and-key.png)

## Check the sensor log file

### How to view the sensor log file

You can open the Windows Sensor log file, `C:\Program Data\Sumo Logic\CSE Windows Sensor\SumoLogic.CSEWindowsSensor.log`, with Notepad or another text editor. 

:::note
By default, the `ProgramData` folder is hidden by Windows and does not show up in Windows Explorer. To find it, enter `C:\Program Data` in the Windows Explorer address bar. Another option is to click the **View** tab in Windows Explorer and put a check mark next to “Hidden Items.”  This will make hidden files and folders visible, including the `ProgramData` folder.
:::

If you prefer, you can use a log tail program, like BareTail, instead of a text editor.

When you use [BareTail](https://baremetalsoft.com/baretail/), the view auto-updates so that you can watch the logs update in real time.

### Turn on additional logging

By default, the Windows Sensor logs messages at an Informational level and above. This includes Informational, Warning, and Error levels. For more advanced troubleshooting, you can configure the sensor to log lower-level Debug or Trace messages as well. There are two approaches to changing the logging levels.

Using the command prompt, as described in [Option 1](windows-sensor-troubleshooting.md#option-1-turn-on-additional-logging-from-the-command-prompt), is the simplest approach to quickly enable and disable additional logging. However, if the problem you are troubleshooting involves the service not starting properly, or if you want the logging changes to persist across service restarts, you will need to edit the configuration files, as described in [Option 2](windows-sensor-troubleshooting.md#option-2-turn-on-additional-logging-by-editing-the-logging-configuration-file).

#### Option 1:  Turn on additional logging from the command prompt

Using the `sc` command, you can send commands to the sensor service while it’s running to make adjustments to logging settings.

The available command codes are:

* 200 - Reload the sensor settings file  
* 201 - Print current settings to the log  
* 202 - Enable trace and debug logging  
* 203 - Disable trace and debug logging  
* 204 - Toggle Event Log verbose logging on or off  
* 205 - Toggle Directory verbose logging on or off

To send a command, open a command prompt in Windows. Enter:

`sc control SLCSEWS\<command cod\>`

and press return.

For example, if you are troubleshooting a problem with the Event Log, run:

`sc control SLCSEWS 204`

to turn on verbose logging for Event Logs. The command will output some information about the state of the sensor service, which you can ignore. Check the sensor log file, `C:\ProgramData\Sumo Logic\CSE Windows Sensor\logs\SumoLogic.CSEWindowsSensor.log`,  to see that your changes have taken effect.

![image4.png](/img/cse/verbose-logging.png)

:::important Reset Logging Levels
It is **very** **important** to reset logging levels after you’re done troubleshooting. Continued trace-level logging will cause your log files to grow enormously and consume large amounts of disk space.
:::

For example, if you used code 202 to turn Trace and Debug logging on, be sure to use code 203 to disable it when troubleshooting is complete. If you used command 204 or 205 to toggle verbose logging ON for Event Log or Directory, issue the same command a second time to toggle it OFF. Alternatively, you can issue the following command to reload the original settings from the configuration file:

`sc control SLCSEWS 204`

Another way to reset logging is to simply restart the sensor service.

#### Option 2:  Turn on additional logging by editing the logging configuration file

A more permanent alternative to issuing commands to the service while it is running is to edit the configuration files that control these settings.

To change logging levels for the sensor service as a whole:

Open a text editor as an Administrator (right-click on the icon and choose **Run as Administrator**), so that Windows will let you to save the updated logging configuration file in its current location. In the text editor, open `C:\Program Files\Sumo Logic\CSE Windows Sensor\NLog.conf`. Find the logging rule and change the line so that it looks like the following. Then save the file and restart the Windows service that runs the sensor.

```
<rules>
<logger name="*" minlevel="Trace" writeTo="file"/>
</rules>
```

After a sufficient period of time has passed to capture the problem (an hour or less, ideally), turn off trace-level logging. Edit `NLog.conf` again, to change `minlevel` back to “Info”, as shown below, and restart the service.

```
<rules>
<logger name="*" minlevel="Info" writeTo="file"/>
</rules>
```

:::important Reset minLevel
It is **very important** to reset `minlevel` back to “Info” when you’re done troubleshooting is complete. Continued trace-level logging will cause your log files to grow enormously and consume large amounts of disk space.
:::

To turn on detailed, verbose logging for Event Log or Directory inventory:

1. Open `C:\ProgramData\Sumo Logic\CSE Windows Sensor\settings.conf` in a text editor. Add these additional lines between the curly brackets:

    `"EventLogVerboseTrace": true, "DirectoryLogVerboseTrace": true`

1. The settings in this file require a comma at the end of each line, except for the last line.

1. Save the file and restart the sensor service.

Setting `EventLogVerboseTrace` to “true” results in very detailed logging about the event log collection and upload process. Setting `DirectoryLogVerboseTrace` to “true” results in very detailed logging about the Active Directory inventory logging and upload process.  

*Both of these settings rely on the sensor logging level being set to Trace as described above*. 

For more information about setting Sensor configuration options, see [Windows Sensor Configuration Settings](windows-sensor-configuration-settings.md).

### Interpreting the Log Files

By default, entries for the sensor log contain the following components:

* Timestamp. The date and time that the event was logged, in local machine time
* Log level. ERROR, WARN, INFO, DEBUG, TRACE
* TID(1234). 1234 is the ID of the thread that generated the log message
* Identity. Domain and user name of the user running the sensor service
* Message. The log message, including exception information, if one occurred.

Some example messages that could indicate problems:

`ERROR | Loading the settings.conf failed`

Possible causes:

* The settings file doesn’t exist or is not accessible by the sensor service. The settings file is usually created during the installation process, and should be located at `C:\ProgramData\Sumo Logic\CSE Windows Sensor\settings.conf`. For more information, see [Check folder permissions](windows-sensor-troubleshooting.md).
* The Sensor couldn’t deserialize (parse) the JSON in the settings file. Check for syntax errors like missing commas, or opening brackets without closing brackets, and so on. For more information, see [Windows Sensor Configuration Settings](windows-sensor-configuration-settings.md).

`ERROR | Username: [user] is not in Event Log Reader Group OR Performance Monitor Users Group`

Possible causes:

* The service is not running under the correct user name.
* The username is not an Administrator and does not have the required permissions. For more information, see [Verify that the service account has the necessary permissions](windows-sensor-troubleshooting.md).

`ERROR | A queue path could not be found or created.  Please check permissions.`

Possible cause:

* The user that the service is running under does not have permissions to write to the `C:\ProgramData` directory. For more information, see [Check folder permissions](windows-sensor-troubleshooting.md).

`ERROR | There have been many recent errors.  Enable trace-logging to view them.`

Possible cause:

* The sensor service has detected a large number of errors that may not have been logged due to the configured logging level. The errors are related to analyzing and storing Event Log records. Use one of the options in [Turn on additional logging](windows-sensor-troubleshooting.md) above to turn on Trace logging for more information about the root cause.

`WARN | Could not post to DirectoryUploadUrl [directory URL] OR EventUploadUrl [event URL]`

Possible causes:

* The URL was not entered properly during installation. Check the `Address` entry in `settings.conf`.
* A firewall may be blocking outbound communication to Sumo Logic. For more information, see [Outbound internet communications requirements](windows-sensor-installation.md) in the *Windows Sensor Installation* topic.
* The computer that the sensor service is installed on may be behind an HTTP Proxy. For more information, see the [sample configuration settings for Proxy configuration](windows-sensor-configuration-settings.md) in the *Windows Sensor Configuration Settings* topic.

### How to send Sensor troubleshooting data to Sumo Logic 

If your troubleshooting efforts are not successful, you can send CSE log and configuration files to CSE support. 

1. Before you send the data to CSE support, we recommend you configure the sensor for trace-level logging using one of the options in [Turn on additional logging](windows-sensor-troubleshooting.md) above.
1. After one hour, **turn off trace-level logging**. Continued trace-level logging will cause your log files to grow enormously and consume large amounts of disk space.
1. Zip up the contents of `C:\ProgramData\Sumo Logic\CSE Windows Sensor\` and contact your Technical Account Manager for the best way to send the data to support.

## Check folder permissions

If the sensor is having difficulty sending data either after a fresh install or an upgrade, verify that the Service Account assigned to run the event sensor has permissions to the folders as follows:

The CSE Windows Sensor Service Account must have READ and WRITE access to this folder:

`C:\ProgramData\Sumo Logic\CSE Windows Sensor`

The CSE Windows Sensor Service Account must have READ access to this folder:

`C:\Program Files\Sumo Logic\CSE Windows Sensor`

## Check for sufficient hard drive space

The sensor requires that some hard drive space is available on the local machine in order to store sensor log files as well as event logs and directory entries that have been queued for upload. It is important to make sure that sufficient space is available on the hard drive so that the sensor can operate properly.

The sensor stores files in the `Common Application Data`  folder, which by default is located at `C:\ProgramData`. To check available disk space:

1. Open File Explorer in Windows. 
1. Under **This PC**, look for **Local Disk (C:**).  
1. Right-click **Local Disk (C:)** and select **Properties**.
1. The **General** tab displays information about the used space, free space, and capacity of the drive.

The sensor requires that at least 5% of the disk’s capacity be free.

## Check if the sensor is preventing additional log file accumulation

The sensor has built-in protection to keep it from filling up the hard drive. When the sensor detects that available space is too low, it will stop capturing event logs or directory entries until the disk space issue has been resolved.

The sensor uses three metrics to determine if disk space is too low. 

* Available Hard Drive Space must be more than 5% of disk capacity.
* Size of Event Log Queue folder (`C:\ProgramData\Sumo Logic\CSE Windows Sensor\EventLogQueue`) must be less than 2048 MB.
* Size of Directory Queue folder (`C:\ProgramData\Sumo Logic\CSE Windows Sensor\DirectoryQueue`) must be less than 2048 MB.
* These limits are configurable. See [MinPercentDiskSpaceLeft](windows-sensor-configuration-settings.md#minpercentdiskspaceleft), [MaxEventLogQueueFolderDirectorySize](windows-sensor-configuration-settings.md#maxeventlogqueuefolderdirectorysize), and [MaxDirectoryQueueFolderDirectorySize](windows-sensor-configuration-settings.md#maxdirectoryqueuefolderdirectorysize) in the *Windows Sensor Configuration Settings* topic.

To determine if the sensor is not reporting event logs or directory entries due to low disk space, you need to turn on additional logging. First, configure the sensor for trace-level logging, as described in [Turn on additional logging](windows-sensor-troubleshooting.md#turn-on-additional-logging) above.
 
Once the logging and configuration settings have been changed, and the sensor service has been restarted, check the log file. Search the log file for the words “dropping message.” If these appear in the file with a recent timestamp, it indicates that the sensor is no longer logging, either due to low disk space on the machine or the folder size limits being hit. To resolve the first issue, clear up disk space on the local hard drive by deleting unnecessary files. If enough disk space is available, see [Check if the EventLogQueue or DirectoryQueue has a backlog](windows-sensor-troubleshooting.md#check-if-the-eventlogqueue-or-directoryqueue-has-a-backlog), below.

Once the issue has been resolved, be sure to **reset the logging levels**, so as not to exacerbate any low disk space conditions that may exist.

## Check if the EventLogQueue or DirectoryQueue has a backlog

One scenario that could result in event logs or directory entries not being logged is when the folders where logs are accumulated have reached the maximum size limit allowed by the sensor (2048 MB each, configurable).

Use Windows File Explorer to navigate to the queue folders, which are located at:

* `C:\ProgramData\Sumo Logic\CSE Windows Sensor\EventLogQueue`
* `C:\ProgramData\Sumo Logic\CSE Windows Sensor\DirectoryQueue`

To check the size of the folder, right-click on its name in File Explorer, choose **Properties**, and look for the **Size** listing on the **General** tab. The number of files will also be listed next to **Contains**.  

Under normal operation, there should be only a handful of files in each folder. If there are a large number of files in the folder, it could indicate that there is a backlog of messages being uploaded.

Open the folder using File Explorer to view its contents. If the view does not show the file details (file name, date modified, size, and so on), right click on the pane, choose **View** and then select **Details**. Watch the folder while the sensor is running. The temporary files in the directory will increase in size while events or directory entries are being logged to them, and they will be deleted as the messages in those files are uploaded to the Sumo Logic platform.

Sort the list by **date modified**. If there are files with modified dates more than several minutes old, this could indicate a problem.

If the ` EventLogQueue` or `DirectoryQueue` folders show a backlog, check the sensor log files for error messages relating to upload. If the logs do not reveal any issues, the problem could be related to insufficient network bandwidth for the volume of logs processed.

## Verify that Microsoft.NET Framework v4.8 or later is installed

Make sure that the member server where the sensor runs has .NET, v4.8 or later, and that all operating system updates and patches have also been installed

To check the version of .NET using regedit:

1. On the Windows Start menu, choose **Run**.
1. In the **Open** box, enter `regedit.exe`. You must have administrative credentials to run `regedit.exe`.
1. In the Registry Editor, open the following subkey: `HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\NET Framework Setup\NDP\v4\Full`. 
1. Find the `Release` key, and verify that the value is 528040 or higher.  

    ![image2.png](/img/cse/image2.png)

## Verify connectivity to the Event Log Service

The CSE Windows Sensor makes a low-level RPC connection to the Event Log service. Sometimes this connection doesn’t function properly. In this test, you will make a connection using out-of-the-box Microsoft Windows tools. If it doesn’t work in Windows, then the CSE Windows Sensor won’t work.

From the member server that the CSE Windows Sensor is installed on:

1. Start the Microsoft Event Viewer (from the Control Panel).
1. Use **Action \> Connect** to another computer to connect to a remote machine.
1. For the server name, enter localhost, the WEC server, or each domain controller depending on how the sensor is configured.   By default, the domain controller monitor is enabled. If you're using the default configuration, then enter a domain controller as the server name. 

Once you connect, make sure that you can see events in the Security log.

If you're using the WEC monitor, then make sure that you can see events in the Forwarded Events log (or other log if you’ve directed the WEC server to a different location.

Repeat these steps for each domain controller. In other words, if you have 10 domain controllers, you should try to connect to each of the controllers from the member server where the sensor runs.

## Verify domain controller IP addresses and hostnames

Make sure that the hostnames of your domain controllers match the
expected IP addresses.  

From the server where the sensor runs, ping each domain controller. For example:

`ping dc1.example.com ping dc2.example.com ping dc3.example.com`

From the server where the sensor runs, use `nslookup` and check the IP address of each domain controller. For example:

`nslookup dc1.example.com nslookup dc2.example.com nslookup dc3.example.com`

Check that the IP addresses are what you expect.

## Verify the IP Addresses and hostname of the Sumo Logic endpoint  

During the installation of the Windows Sensor, you were prompted to supply the URL of the HTTP Source to which the sensor will send data. Using that address perform the following:

:::note
Replace the example URL with the actual URL of the HTTP Source in the following examples.
:::

Ping the address. For example:

`ping https://collectors.sumologic.com/receiver/v1/http/…`

Using `nslookup`, make sure that the address’s IP address is reasonable. You may not know the Sumo Logic IP addresses. For now, just make sure that the IP address is not on your LAN. For example:

`nslookup https://collectors.sumologic.com/receiver/v1/http/…`

Using curl, attempt to access the end point. Use the “verbose” switch (-v). A successful connection returns an HTTP 200 and SSL certificates are valid. For example:  

`curl -v https://collectors.sumologic.com/receiver/v1/http/…`

## Advanced troubleshooting

### Check for RPC port issues (rare problem)

Verify that the RPC port works between the member server and the domain controller,

Use [psping](https://docs.microsoft.com/en-us/sysinternals/downloads/psping) to check that the member server where the Windows Sensor is install can connect to each domain controller over one of these ports: 135, 137, 139

### Check outbound firewall rules

1. Run the following command in any terminal window to determine the IP address associated with the URL at which users access the CSE UI.   `dig\<customernam\>.portal.jask.ai`
1. Save  the IP address that is returned.
1. Run the following command in any terminal window to determine the IP addresses that CSE has configured for the endpoint. There are more than one because the end-point is load balanced.   `dig\<customernam\>-ingest.jask.ai`
1. Save the four IP addresses that are returned.
1. Verify that your firewall rules enable outbound TCP traffic on port 443 for each of these:

   * `<customername>.portal.jask.ai`
   * `<customername>-ingest.jask.ai`
   * The IP address returned by the command you ran in step 1 above.
   * The four IP addresses returned by the command you ran in step 3 above.
