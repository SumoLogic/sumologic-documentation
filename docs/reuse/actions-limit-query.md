Automation action events are provided to the audit index (`_index=sumologic_audit`) or the system index (`_index=sumologic_system_events`) in the `OAR` source category (`_sourceCategory=oar*`). For more information about using these indexes to query for automation action events as well as other events, see [Audit Logging for the Automation Service and Cloud SOAR](/docs/platform-services/automation-service/automation-service-audit-logging/).

Run the following query to find the actions count per hour:

```
(_index=sumologic_audit_events OR _index=sumologic_system_events) _sourceCategory=oar*
| json field=_raw "AutomationAction.name" as actionName nodrop
| json field=_raw "AutomationAction.playbook" as playbook nodrop 
| where eventName = "AutomationActionStarted"
| timeslice 60m
| count by _timeslice | fillmissing timeslice
```

You can use a query like this to [set up a scheduled search](/docs/alerts/scheduled-searches/) or a [create a monitor](/docs/alerts/monitors/) to send an alert when the actions count exceeds the limit per hour, or when node failure occurs. 