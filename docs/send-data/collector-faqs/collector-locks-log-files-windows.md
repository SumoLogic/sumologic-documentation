---
id: collector-locks-log-files-windows
title: Collector locking log files on Windows servers
---



The Sumo Logic Collector will hold a log file open for read while log messages are actively being written to the file, and may not close the file for up to a couple minutes after the log has stopped being written to. In some instances, this could prevent the log file from properly rotating. This issue can be resolved on 64-bit versions of Windows by upgrading to the 64-bit version of the Collector. This is a one-time manual update to existing Collectors. Any further upgrades of the Collectors through the UI will continue to update using the same 64-bit version.

To manually upgrade the Collector from 32-bit to 64-bit

1. Stop the existing Collector service.
1. Make a backup copy of the current `C:\Program Files (x86)\config` directory and place this in a safe temporary location.
1. Make a backup copy of the current `C:\Program Files (x86)\cache` directory and place this in a safe temporary location.
1. Run the Collector uninstall to completely remove the existing 32bit Collector.
1. Run the new 64-bit Collector install to reinstall the Collector.

    :::note
    The new install will create a new collector in the UI with an appended epoch time. Deleted this from the UI as the last step in this process.
    :::

1. Stop the new Collector service. (It will have automatically started.)
1. Copy the previously backed up `/config` and `/cache` directories and put them into the new Collector installation directory, overwriting the existing `/config` and `/cache` directories.
1. Restart the Collector service.

This should safely update the Collector and keep all your existing configurations and Sources. The Collector will start back where it left off in the logs when the previous Collector was stopped.
