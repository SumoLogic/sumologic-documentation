---
id: set-run-as-user-for-collector
title: Set the Run As User for a Collector
description: If you are using the command-line installer to install a Collector, you can specify the user under whose account the Collector will run.
---

By default, the Installed Collector runs as the root user (Administrator on Windows). If you're using the command line installer to install a Collector, you can specify the `-VrunAs.username=[username]` and `-VwinRunAs.password=[password]` parameters to change the Run As user. See [Installed Collector CLI Parameters](parameters-command-line-installer.md) for a full list of supported parameters.

If you're using the [RPM/Debian or binary package to install the Collector](../linux.md), or would like to change the Run As user after installation, follow this procedure to change the Run As user. 

1. Change the Collector installation directory owner to the desired user name.
    ```bash
    sudo chown -R username /opt/SumoCollector
    ```
1. Navigate to the Collector installation directory.
    ```bash
    cd /opt/SumoCollector
    ```
1. Remove the Collector service, which was installed under the root user.
    ```bash
    sudo ./collector remove
    ```
1. Set the Collector `RUN_AS_USER` in the collector executable to the desired user name.
    ```bash
    sed -i "s:#RUN_AS_USER=:RUN_AS_USER=username:" collector
    ```
1. Install the Collector service.
    ```bash
    sudo ./collector install
    ```
