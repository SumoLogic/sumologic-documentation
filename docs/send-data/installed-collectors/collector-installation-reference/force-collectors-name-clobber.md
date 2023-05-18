---
id: force-collectors-name-clobber
title: Force a Collector's Name with Clobber
description: During the installation process, use the clobber flag in situations where you're creating a new Collector that will use a name that is already in use by another Collector.
---


Each collector name must be unique. If you are installing a collector that would have the same name as an existing collector, the system automatically appends a 13-digit unix timestamp to the collector name. If you don't want to use the timestamp in a collector name, you can do either of the following:

 * Specify a unique name for the collector. You can do so during installation, or by editing the collector configuration following installation. In Sumo, select **Manage Data** > **Collection** > **Collection**. Click **Edit** for the Collector.
 * During installation, use the clobber option described in this topic to replace the existing collector with the one that you are installing. 

:::important
Using the clobber flag deletes (clobbers) any existing collector with the same name, so make sure that is what you want to do. clobber is effective only before the new collector has been registered (activated) with Sumo Logic.
:::

(Using Quiet Mode installation) To set the clobber flag via command line argument:

1. When starting the installer from the command line, pass the argument:

    ```
    -Vclobber=true
    ```

1. Install the collector.
1. Verify that the generated `user.properties` file (under the `config` directory) contains the property `clobber=true`.

(Using the Binary Package) To set the clobber flag via user.properties or sumo.conf file:

1. Create the configuration file.

   * (Collector version 19.137 and newer) Create and edit the `user.properties` file (in the `config` directory of your Collector installation).
   * (Collector version 19.127 and older) Create and edit the `sumo.conf` (in the `/etc/sumo.conf` directory on Mac or Linux; in the `C:\sumo ` directory on Windows).

1. Type `clobber=true` in the file, then save and close it.
1. Start the collector.
