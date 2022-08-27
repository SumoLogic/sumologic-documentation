---
id: increase-windows-event-messages-retrieval
title: Increase the number of Windows Event messages a Collector can retrieve
---

#

The Sumo Logic Collector currently has a hard limit on the number of events a Source can retrieve from an Event Log Source every second. This limit is set to 512 events every 300ms by default. The following message in the Collector logs reference this setting.

```
2015-01-12 11:20:10,616 -0800 [Blade: 00000000074AB69D - localWinEvent]  INFO com.sumologic.scala.collector.blade.win.LocalWinEventLogJNIInput - Retrieved 512 from Security log from RN 2118395523
```

On Windows servers where the generated number of events is much higher than approximately 1536 events per second, for any single event type, the Collector could start to fall behind on Collection. To address this issue there is a parameter that can be set within the Collector to increase this limit.

1. Open `/<sumo_home>/config/collector.properties` for editing. 
1. Add the following parameter to the end of the file, or update the existing parameter.

    ```
    localWindowsEventLog.batchSize=1024
    ```

1. Save the new `collector.properties` file.
1. Restart the Collector service.
