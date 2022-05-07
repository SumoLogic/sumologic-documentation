---
id: enabling-updated-remote-windows-event-collection
---

# Enabling updated Remote Windows Event Collection with 19.155 Collector

The 19.155 release of the Sumo Logic collector introduces a new collection approach for Remote Windows Event sources.  The new approach provides increased collection throughput, lower resource consumption, and easier configuration.

However, [system configuration requirements for the new implementation](../Sources/01Sources-for-Installed-Collectors/Remote-Windows-Event-Log-Source/Preconfigure-a-Machine-to-Collect-Remote-Windows-Events.md "Send_Data/Sources/Preconfiguring_a_Machine_to_Collect_Remote_Windows_Events") differ from those of earlier collector versions. For the sake of compatibility, the new implementation is left as "opt-in" for version 19.155. This topic describes how to enable this new capability.

:::important
This topic applies only to the 19.155 version of the Sumo Logic collector, and only relates to Remote Windows Event Log sources.
:::

## Enabling updated remote event collection

Take the following steps to opt-in to the updated Remote Windows Event source:

1. Stop the Sumo Logic collector service  

    ```bash
    net stop sumo-collector
    ```

1. Modify the text file "collector.properties", located in the "config" subdirectory of the Sumo Logic collector installation directory. Add the following line, and save: 

    ```
    windows.remote.jni = true
    ```

1. Start the Sumo Logic collector service:

    ```
    net start sumo-collector
    ```

You can revert back to legacy WMI-based event collection at any time by removing this line from "collector.properties" (or setting the value to "false"), and restarting the collector service.
