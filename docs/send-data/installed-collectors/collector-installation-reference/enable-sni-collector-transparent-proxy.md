---
id: enable-sni-collector-transparent-proxy
title: Enabling SNI in a Collector to Support Transparent Proxy
description: You can enable Server Name Indication (SNI) on a Collector to support some third-party transparent proxy services, such as Squid.
---


The Sumo Logic Collector can optionally enable Server Name Indication (SNI), which is required to support some third-party transparent proxy services, such as Squid.

## Determine that SNI requires enabling

If the Collector is unable to connect to your transparent proxy, you might need to enable SNI.  Look for the following error message in the **collector.log** file in the Collector installation logs directory.

```
javax.net.ssl.SSLHandshakeException: Remote host closed connection during handshake
```

## Enable SNI

1. Stop the Sumo Logic Collector service.
   * On Windows: `net stop sumo-collector`
   * On Linux: `sudo ./collector stop`
1. Modify the **user.properties** file in the **config** subdirectory of the Sumo Logic collector installation directory.
    :::note
    Verify the `wrapper.java.additional` property in the **Java Additional Parameters** section in `config/wrapper.conf` file. If there is an existing property, make sure you use the next property. For example, if `wrapper.java.additional.2` is available then use `wrapper.java.additional.3`.
    :::
    * On Windows, add the following line and save. `wrapper.java.additional.2=-Djsse.enableSNIExtension=true`
    * On Linux, add the following line and save. `wrapper.java.additional.3=-Djsse.enableSNIExtension=true`      
1. Save the file.
1. Start the Sumo Logic Collector service.
    * On Windows: `net start sumo-collector`
    * On Linux: `sudo ./collector start`

To revert back to the default configuration or disable the feature, remove the line that you added from **user.properties** and restart the Collector service.
