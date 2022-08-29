---
id: configure-limits-collector-caching
title: Configure Limits for Collector Caching
---



Caching of outbound data is supported for Installed Collectors when a Collector is throttled or paused or the connection is broken. Data is cached first in memory and then on disk.

You can configure the amount of space available for caching of log and metric data on disk.

By default, the Collector supports caching the following amount of compressed data:

* Up to 4GB total disk space, including:  

  * Up to 3GB for log data
  * Up to 1GB for metric data

To raise or lower the disk limits for Collector caching:

1. Stop the Sumo Logic Collector service.

    * On Windows: `net stop sumo-collector`
    * On Linux:   `sudo ./collector stop`    

1. Modify the **collector.properties** file located in the **config** subdirectory of the Sumo Logic Collector installation directory.  Make the following changes and save the file.

    * To set the limit for disk caching for logs (for example, 2GB), add the following line: `queue.max.disk.gb = 2`
    * To set the limit for disk caching for metrics (for example, 2GB), add the following line: `queue.metrics.max.disk.gb = 2`    

1. Start the Sumo Logic Collector service.

    * On Windows: `net start sumo-collector`
    * On Linux: `sudo ./collector start`

You can revert back to a default configuration by removing the corresponding line from the **collector.properties** file and restarting the Collector service.

## Flushing Mode

Unlike the fixed size cache, which evicts old data to make room for new data, Flushing Mode stops collection of new data and focuses only on sending existing data (flushing the cache).

The Collector enters Flushing Mode when less than 10% of free disk space remains on the disk where the Collector is installed.

**To raise or lower the disk limits for Flushing Mode:**

1. Stop the Sumo Logic Collector service.

    * On Windows: `net stop sumo-collector`
    * On Linux: `sudo ./collector stop`    

1. Modify the **collector.properties** file located in the **config** subdirectory of the Sumo Logic Collector installation directory. Make the following changes and save the file.

    * To set the free space percentage threshold for entering flush mode (by default, 10%), add the following line: `freeSpace.threshold.percent = 10`
    * To disable Flushing Mode: `freeSpace.threshold.percent = 0`

1. Start the Sumo Logic Collector service.

    * On Windows: `net start sumo-collector`
    * On Linux: `sudo ./collector start`

You can revert back to a default configuration by removing the corresponding line from **collector.properties** file and restarting the Collector service.
