---
id: troubleshooting
title: Troubleshooting Installed Collectors
description: Learn how to test Installed Collector connectivity and troubleshoot common errors.
---

On this page, you'll learn how to test connectivity and troubleshoot errors that might arise during Installed Collector setup.

## Test Installed Collector Connectivity

Learn how to test access and connectivity from an Installed Collector to the Sumo Logic service.

Make sure you have the required access and connectivity to the Sumo Logic service by running these checks from the machine where you've installed the Collector.

Choose one of these testing options:

* **Browser-based test.** Open a browser and go to [https://collectors.sumologic.com](https://collectors.sumologic.com/). You should see the word "Tweep".<br/>  ![image](/img/send-data/tweep.png)
* **Telnet.** Telnet session to **collectors.sumologic.com 443** and you should see a result like this one:
    ```bash
    $telnet collectors.sumologic.com 443
    Trying collectors.sumologic.com...
    Connected to prod-events-lb-1056629993.us-east-1.elb.amazonaws.com.
    ```
* **curl command.** The fastest way to check your connectivity is to use a curl command to connect to the service. The "curl" tool is available in Windows in the "SSL enabled" form for testing.
    ```bash
    $ curl -i https://collectors.sumologic.com
    $ curl -i https://collectors.sumologic.com/rest/registry/ping
    $ time nslookup collectors.sumologic.com
    ```

:::important
If these commands do not work or are very slow, read the error messages and check for **DNS**, **Proxy** server, and **Network** issues depending on the message you see.
:::

## Troubleshoot common firewall issues

If your results show a connection failure, it can be a firewall issue.

* Check your firewall settings to verify that connectivity is allowed for collection endpoints. Refer to [Sumo Logic Endpoints](/docs/api/getting-started/#sumo-logic-endpoints-by-deployment-and-firewall-security) for firewall-related suggestions.
* For Windows firewalls, you can create an outbound rule to allow outbound Collector connections, and try again.

These are instructions for a Windows 2008r2 system for your convenience. If you are installing on another version of Windows, follow the instructions for that version.

To create a new outbound rule for the Windows firewall:

1. Go to **Administrative Tools > Firewall Settings**.
1. Click **New Rule**.
1. Select **Port** for the type of rule, and then click **Next**.
1. Enter **443** for the port, and then click **Next**.
1. Select **Allow** for the connection and then click **Next**.
1. Select the appropriate Profile for your environment, but we recommend you leave all three options checked:  
   * Domain  
   * Public  
   * Private
1. Click **Next**.
1. Enter a name and a description for your new rule, and then click **Finish**.

## Collector Installation Error Messages

During the installation of the collector, you may encounter various issues or error messages. Here are some common error messages along with troubleshooting steps and their corresponding solutions.

**Unable to start Sumo Logic Collector service**

* This happens when the Collector installer is unable to set up the Sumo Logic Collector as a service and then successfully run it.
* Verify that no previous installation exists. Delete previous installation directories manually if necessary.
* Verify that you are running the Collector as root (run it as sudo on Unix) / Administrator.
* Read the logs under **$SUMO_INSTALL_DIRECTORY/.install4j/installation.log** for more information.

**An unknown error occurred while attempting to reach Sumo Logic. Please try again.**

This happens when the Collector installer is unable to successfully reach Sumo Logic to translate a customer's username and password to obtain a one-time registration token.

* Verify Internet connectivity / proxy / URL settings are correct.
* Attempt to access the appropriate [Sumo endpoint](/docs/api/getting-started/#sumo-logic-endpoints-by-deployment-and-firewall-security) manually.

**It's taking longer than expected to register your Collector with Sumo Logic. Please check your settings and try again.**

This happens when the Installer has successfully installed the Collector, but the Collector has not yet been able to register with Sumo Logic.

* Verify Internet connectivity / proxy / URL settings are correct (as above).
* Verify that the Service is up (visit status.sumologic.com for more information)
* Read the logs under **$SUMO_INSTALL_DIRECTORY/logs/collector.log** and **collector.out.log** for more information.

**Startup failed: Timed out waiting for a signal from the JVM**

The Tanuki wrapper that starts the Collector application uses ports 31000 - 32000 to start up the Java Virtual Machine (JVM). If these ports are unavailable because they are bound to other applications or are disabled due to firewall configuration, the JVM or the Collector fails to start up.

To solve the problem, update the firewall settings or update the port range to a different unused port range as follows.

1. Edit `<sumo_install_dir>/config/wrapper.conf` add the following lines to the end of the file:

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
