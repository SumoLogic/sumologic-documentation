---
id: rsyslog
title: rsyslog
description: Learn how to configure your server to send syslog data with rsyslog.
---



Sumo Logic supports syslog clients such as rsyslog. This document has instructions on how to configure your server to send syslog data. If syslog data does not appear in Sumo Logic, refer to the Troubleshooting section in [Cloud Syslog Source](/docs/send-data/hosted-collectors/cloud-syslog-source).

## Set up TLS

Set up Transport Layer Security (TLS).

Download the **DigiCert** certificate from https://cacerts.digicert.com/DigiCertHighAssuranceEVRootCA.crt.

### rsyslog

To set up your **DigiCert** certificate follow these steps:

```bash
$ cd /etc/rsyslog.d/keys/ca.d
$ wget -O digicert_ca.der https://www.digicert.com/CACerts/DigiCertHighAssuranceEVRootCA.crt
$ openssl x509 -inform der -in digicert_ca.der -out digicert_ca.crt
```

### Send data to a Cloud Syslog Source with rsyslog

This section shows how to configure a syslog client using rsyslog that will send the syslog message to be received by the Sumo Logic Cloud syslog service. If you are new to rsyslog, follow the [rsyslog documentation](http://www.rsyslog.com/doc/v8-stable/installation/index.html) to install.

After rsyslog is installed, edit the configuration file to start sending
logs to Sumo. The configuration file is located at`/etc/rsyslog.conf` by
default. 

**For rsyslog v7 and earlier**

```bash
# Setup disk assisted queues
$WorkDirectory /var/spool/rsyslog         # where to place spool files
$ActionQueueFileName fwdRule1             # unique name prefix for spool files
$ActionQueueMaxDiskSpace 1g               # 1gb space limit (use as much as possible)
$ActionQueueSaveOnShutdown on             # save messages to disk on shutdown
$ActionQueueType LinkedList               # run asynchronously
$ActionResumeRetryCount -1                # infinite retries if host is down

# RsyslogGnuTLS
$DefaultNetstreamDriverCAFile /etc/rsyslog.d/keys/ca.d/digicert_ca.crt
$ActionSendStreamDriver gtls
$ActionSendStreamDriverMode 1
$ActionSendStreamDriverAuthMode x509/name
$ActionSendStreamDriverPermittedPeer syslog.collection.YOUR_DEPLOYMENT.sumologic.com

template(name="SumoFormat" type="string" string="<%pri%>%protocol-version% %timestamp:::date-rfc3339% %HOSTNAME% %app-name% %procid% %msgid% [YOUR_TOKEN] %msg%\n")

*.* action(type="omfwd" protocol="tcp" target="syslog.collection.YOUR_DEPLOYMENT.sumologic.com" port="6514" template="SumoFormat")
```

In the template statement, be sure to replace `YOUR_TOKEN` with your actual token, and `YOUR_DEPLOYMENT` with your deployment. Properties in the string begin and end with '%'. All other texts and white space are treated literally. For more information about rsyslog configuration, see the [rsyslog template documentation](http://www.rsyslog.com/doc/v7-stable/configuration/templates.html) or the [rsyslog omfwd documentation](http://www.rsyslog.com/doc/v7-stable/configuration/modules/omfwd.html).

**For rsyslog v8 and later**

```bash
# Setup disk assisted queues# Setup disk assisted queues
$WorkDirectory /var/spool/rsyslog     # where to place spool files
$ActionQueueFileName fwdRule1         # unique name prefix for spool files
$ActionQueueMaxDiskSpace 1g           # 1gb space limit (use as much as possible)
$ActionQueueSaveOnShutdown on         # save messages to disk on shutdown
$ActionQueueType LinkedList           # run asynchronously
$ActionResumeRetryCount -1            # infinite retries if host is down

# RsyslogGnuTLS
$DefaultNetstreamDriverCAFile /etc/rsyslog.d/keys/ca.d/digicert_ca.crt

template(name="SumoFormat" type="string" string="<%pri%>%protocol-version% %timestamp:::date-rfc3339% %HOSTNAME% %app-name% %procid% %msgid% [YOUR_TOKEN] %msg%\n")

action(type="omfwd"
    protocol="tcp"
    target="syslog.collection.YOUR_DEPLOYMENT.sumologic.com"
    port="6514"
    template="SumoFormat"
    StreamDriver="gtls"
    StreamDriverMode="1"
    StreamDriverAuthMode="x509/name"
    StreamDriverPermittedPeers="syslog.collection.*.sumologic.com")
```

In the template statement, be sure to replace `YOUR_TOKEN` with your actual token, and `YOUR_DEPLOYMENT` with your deployment. Properties in the string begin and end with '%'. All other texts and white space are treated literally. For more information about rsyslog configuration, see the [rsyslog template documentation](http://www.rsyslog.com/doc/master/configuration/templates.html) or the [rsyslog omfwd documentation](http://www.rsyslog.com/doc/master/configuration/modules/omfwd.html).
