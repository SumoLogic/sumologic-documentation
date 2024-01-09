---
id: collector-installation-error-messages
title: Collector Installation Error Messages
description: Learn how to troubleshoot issues that arise during installation using any of the installation methods.
---

During the installation of the collector, you may encounter various issues or error messages. Here are some common error messages along with troubleshooting steps and their corresponding solutions.

**Unable to start Sumo Logic Collector service**

* This happens when the Collector installer is unable to set up the Sumo Logic Collector as a service and then successfully run it.
* Verify that no previous installation exists. Delete previous installation directories manually if necessary.
* Verify that you are running the Collector as root (run it as sudo on Unix) / Administrator.
* Read the logs under **$SUMO_INSTALL_DIRECTORY/.install4j/installation.log** for more information.

**An unknown error occurred while attempting to reach Sumo Logic. Please try again.**

This happens when the Collector installer is unable to successfully reach Sumo Logic to translate a customer's username and password to obtain a one-time registration token.

* Verify Internet connectivity / proxy / URL settings are correct.
* Attempt to access the appropriate [Sumo endpoint](/docs/api/getting-started#Sumo-Logic-Endpoints-by-Deployment-and-Firewall-Security) manually.

**It's taking longer than expected to register your Collector with Sumo Logic. Please check your settings and try again.**

This happens when the Installer has successfully installed the Collector, but the Collector has not yet been able to register with Sumo Logic.

* Verify Internet connectivity / proxy / URL settings are correct (as above).
* Verify that the Service is up (visit status.sumologic.com for more information)
* Read the logs under **$SUMO_INSTALL_DIRECTORY/logs/collector.log** and **collector.out.log** for more information.

**Startup failed: Timed out waiting for a signal from the JVM**

The Tanuki wrapper that starts the Collector application uses ports 31000 - 32000 to start up the Java Virtual Machine (JVM). If these ports are unavailable because they are bound to other applications or are disabled due to firewall configuration, the JVM or the Collector fails to start up.

To solve the problem, update the firewall settings or update the port range to a different unused port range as follows.

1. Edit <sumo_install_dir>/config/wrapper.conf add the following lines to the end of the file:

    ```
    wrapper.jvm.port.min=<min_port_number>  # default 31000
    wrapper.jvm.port.max=<max_port_number> #default 31999
    wrapper.port=<some_port_number> #default 32000
    ```

1. Restart the collector from the Sumo Logic installation directory:

    ```bash
    sudo ./collector restart
    ```

1. Verify that the collector is using the correct port:

    ```bash
    ps -ef| grep coll   ## Linux example
    ```

**collectors.unauthorized**

Make sure your credentials are correct. Verify your username/password or access ID/access key combination by logging into Sumo Logic or using the Collector Management API.

**collectors.rate.limit.exceeded.auth**

* Make sure your credentials are correct.
* Try again in 1 minute.

**collectors.service.unavailable**

Visit [status.sumologic.com](https://status.sumologic.com/). The Service might be undergoing maintenance. Try again in a few minutes.

**collectors.forbidden**

Attempt to register a Collector when a Customer's account is disabled or their ingestion is disabled. Fixing this requires an account change in Zuora.

**collector.error.401**

Make sure your credentials are correct. Verify your access ID/access key combination by logging into Sumo Logic or using the Collector Management API.

**collectors.ambiguous.identify**

Due to multi-account support, if the same e-mail address is used on multiple accounts, it cannot be used to register a Collector.

Instead, you must use an access ID/access key to register the Collector.

**collectors.collector.forbidden**

The user is not authorized to modify the specified Collector. The user account must have the Collector Management or Admin role to be able to create a Collector.

**Wrapper Process has not received any CPU time for x seconds**

If the Wrapper detects that it was denied CPU for an extended period of time, you may see messages like the following from the Wrapper, the JVM, or both.

```txt title="Error Log Example"
INFO   | wrapper  | Wrapper Process has not received any CPU time for x seconds.
                        Extending timeouts.
INFO   | jvm 1    | JVM Process has not received any CPU time for x seconds.
                        Extending timeouts.
```

These messages are warnings that, in this case, both the Wrapper and its JVM process were denied access to the CPU for a period of x seconds.

To solve this issue and improve the resilience of the Wrapper and its JVM process when facing a lack of CPU, you can modify the `wrapper.conf` file by adding the following configurations at the end.

  ```
  wrapper.cpu.timeout=85
  wrapper.ping.timeout=95
  wrapper.startup.timeout=90
  wrapper.shutdown.timeout=90
  ```
