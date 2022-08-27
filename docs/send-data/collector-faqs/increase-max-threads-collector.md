---
id: increase-max-threads-collector
title: Increase Max Threads for Collector
---


The Collector will use three threads per available CPU by default. For example, if you have a six CPU system the default number of threads used by Sources would be 18. This may not be enough to keep up with data collection.

If you're noticing a delay in ingestion and the data you do see is being ingested in batches check your Collector **/logs/** directory for the following type of log:

```
2018-09-26 15:14:15,701 -0400 [Blade0000000000000000-Scanner] INFO  com.sumologic.scala.collector.blade.wildcard.WildcardBlade$$anon$1 - purely dealing with non backlog items with 6 threads
```

If this log is present you need to increase the threads available to the Collector or reduce the rate and volume of data for it to collect. To increase the thread count:

1. Stop the current Collector service/process.
1. Locate the Collector configuration file `/<sumo_install_dir>/config/collector.properties`.
1. Add the following parameter to increase the max threads count. We suggest a max setting of 60.

    ```
    source.max.threads.num = 60
    ```

1. Restart the Collector process/service.
