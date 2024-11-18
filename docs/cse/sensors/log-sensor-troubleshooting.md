---
id: log-sensor-troubleshooting
title: Log Sensor Troubleshooting
description: Learn how to collect Log Sensor status and data to support troubleshooting efforts.
---

:::warning end-of-life
The Cloud SIEM Log Sensor has reached end of life and is no longer supported. Please migrate to a Sumo Logic Hosted Collector or Installed Collector. For more information, see the [end of life notice](https://app.getbeamer.com/cloudsiementerprise/en/end-of-life-notice-_-cloud-siem-enterprise-sensors). 
:::

The Cloud SIEM Log Sensor collects log data and sends it to the legacy Cloud SIEM server. (The Log Sensor does not send log data to the Sumo Logic platform. Sumo Logic collectors serve that purpose.)

If your organization uses the Log Sensor, This section provides instructions for gathering troubleshooting information Cloud SIEM support may request if you have problems with the sensor.

## Restart sensor

The following command restarts the sensor. You need to restart the sensor after making changes to the sensor configuration file, `/opt/trident/log-sensor/conf/trident-sensor.cfg`.

`$ systemctl restart trident_log_sensor`

## Get sensor status

This command returns the status of the Log Sensor.

`$ systemctl status trident_log_sensor`  
 

## Show sensor listen ports

The following command lists the sensor's listen ports, and state information for each.

`$ ss -an | grep LIST | grep :::85.. `

## View sensor configuration file

This command lists the sensor’s configuration file.

`$ cat /opt/trident/log-sensor/conf/trident-sensor.cfg`  
 

## Edit sensor configuration file

This command opens the sensor’s configuration file in the vi editor.

`$ vi /opt/trident/log-sensor/conf/trident-sensor.cfg `

## View sensor log file

This command tails the sensor’s log file, assuming that it is located in its default location.

`$ tail -f /opt/trident/log-sensor/logs/trident-sensor.log`  
 

## View logs sent by the sensor to Cloud SIEM 

This command tails the sensor’s `output.log` file which contains logs that the sensor has sent to the Cloud SIEM server.

`$ tail -f /opt/trident/log-sensor/output/log/output.log`

## View count of logs sent by the sensor to Cloud SIEM 

This command returns a count of the logs sent by the sensor to the Cloud SIEM server.

`$ ls -lh /opt/trident/log-sensor/output/log/`

 
