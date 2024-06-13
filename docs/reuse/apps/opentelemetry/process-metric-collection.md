By default, the collector will not send process metrics to Sumo Logic. This is because the number of processes running on a host can be very large, which would result in a significant increase in Data Points per Minute (DPM).

Click the **Enable process metric collection** checkbox to collect [process-level metrics](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/hostmetricsreceiver/internal/scraper/processscraper/documentation.md).
- **Name of process**. Add the list of process names.
- **Include/Exclude the above pattern**. Signifies if you want to exclude or include the metrics for the processes listed previously.
- **Match type for process name**. Select if the process name given should be considered for a strict match with the host machine processes or if it should be considered as regex when matching.<br/><img src="/img/integrations/hosts-operating-systems/process-metric-collection.png" style={{border:'1px solid gray'}} alt="process-metric-collection" width="500" />

:::note

If you need to edit the process list in the future, you can do this manually in the OTEL config yaml by adding or removing in the names list under process scrapper.

```yaml
process:
  include:
    names: [ <process name1>, <process name2> ... ]
    match_type: <strict|regexp>
```

:::
