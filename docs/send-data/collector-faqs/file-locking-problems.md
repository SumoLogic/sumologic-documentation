---
id: file-locking-problems
title: File Locking problems when using Windows UNC with Local File Sources
---

:::note
The contents of this article are only valid for Collector versions later than 19.73.
:::

The Sumo Logic Collector uses two different code paths when attempting to Collect from local file sources on Windows:

1. "Windows Rollable" path: This code path will be used by a Collector for local files that are not UNC paths. 
1. Normal code path: Anything else. This code path is more efficient, but it could block rolling on some Windows files.

Historically, the Windows Rollable path had some issues collecting from UNC file paths that pointed to mounted network drives, which is why the "Windows Rollable" option for UNC paths was disabled altogether. If you're collecting local files via UNC paths, its likely the locking semantics of the local filesystem are preserved, which does not allow for the rotation.

The Collector has an option to override the default path it uses for collection. The following flag will tell the Collector to use the Windows Rollable path for UNC file paths and should address any problems with file locking on the remote system.

1. Open `/<sumo_home>/config/collector.properties` to edit.
1. Add the following parameter to the end of the file or update the existing parameter:

    ```
    collector.localfile.inputType = nonblocking
    ```

1. Save the new **collector.properties** file.
1. Restart the Collector service.
