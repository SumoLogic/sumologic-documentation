---
id: windows-event-source-custom-channels
title: Windows Event Source Custom Channels
description: Find Windows event channels to collect with a Local Windows Event Source.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

To configure a Local or Remote Windows Event Source, you must identify the channels to collect from. This section explains how to obtain this list of channel names from your systems, and describes channels which the Sumo Logic collector cannot process.

## Obtaining channel names

To find the available event channels for collection, execute the following PowerShell commands from an administrator PowerShell prompt. Then copy and paste the channel names into Source's Custom Events Channels text box.

<img src={useBaseUrl('img/send-data/window-custom-channels.png')} alt=" Custom Events Channels text box" style={{border: '1px solid gray'}} width="500" />

Enter the following command into PowerShell:

```
# to see channels listed in the standard order
Get-WinEvent -ListLog *

# to sort more active channels to the top of the list
Get-WinEvent -ListLog * | sort RecordCount -Descending

# to see channels present on a remote computer
Get-WinEvent -ListLog * -ComputerName <hostname>
```

The output will include a list of channels, along with the number of event records currently in those channels:

```
LogMode   MaximumSizeInBytes RecordCount LogName
-------   ------------------ ----------- -------
Circular            20971520       59847 Application
Circular            20000000       29339 Microsoft-Windows-Store/Operational
Circular            20971520       21903 Security
Circular             4194304       10098 Microsoft-Windows-GroupPolicy/Operational
Circular             5242880        9568 Microsoft-Windows-StateRepository/Operational
Circular            15728640        7066 Windows PowerShell
Circular             5242880        4644 Microsoft-Windows-AppXDeploymentServer/Operational
Circular             8388608        4114 Microsoft-Windows-SmbClient/Connectivity
Circular             1052672        2843 Microsoft-Windows-EapHost/Operational
Circular             1052672        2496 Microsoft-Client-Licensing-Platform/Admin
```

In the output, the `LogName` column contains the channel names to enter, comma-separated, into the Source's Custom Events Channels text box. You do not need to reenter the names of the standard Application, System, or Security logs, which are already selectable via check boxes.

For example, to collect events from the top 5 most active channels shown above, select the **Application** and **Security** check boxes, then enter the following string into the text box:

```
Microsoft-Windows-Store/Operational,Microsoft-Windows-GroupPolicy/Operational,Microsoft-Windows-StateRepository/Operational
```

You can also obtain a list of channel names from the cmd.exe console by running the following command:

```
rem List channels on the local system
wevtutil.exe enum-logs

rem List channels on a remote system
wevtutil.exe enum-logs /remote:<hostname>
```

## Unsupported channels

The Sumo Logic collector does not collect events from the following channels:

* Analytic ETW channels
* Debug ETW channels

:::note
Sumo does not support import of data directly from `.evtx` files. Sumo makes an API call to the Windows Event Log service to pull the data contained in the `.evtx` files. 
:::
