---
id: test-connectivity-sumo-collectors
title: Test Connectivity for Sumo Logic Collectors
description: Learn how you can test access and connectivity from an installed Collector to the Sumo Logic service.
---



Make sure you have the required access and connectivity to the Sumo Logic service by running these checks from the machine where you want the Collector installed.

Choose one of these testing options:

* **Browser-based test.** Open a browser and go to [https://collectors.sumologic.com](https://collectors.sumologic.com/). You should see the word "Tweep". 

    ![image](/img/send-data/tweep.png)

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

* Check your firewall settings to verify that connectivity is allowed for collection endpoints. Refer to [Sumo Logic Endpoints](/docs/api/getting-started#Sumo-Logic-Endpoints-by-Deployment-and-Firewall-Security) for firewall-related suggestions.
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

 
