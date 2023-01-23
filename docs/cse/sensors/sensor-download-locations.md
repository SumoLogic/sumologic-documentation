---
id: sensor-download-locations
title: Sensor Download Locations
description: The Cloud SIEM Enterprise (CSE) Network sensor can be downloaded from a static URL that is specific to your CSE deployment.
---


The Cloud SIEM Enterprise (CSE) Network sensor can be downloaded from a static URL that is specific to your CSE deployment. Each Sumo Logic deployment has URLs used to download sensor software. If you are not sure which endpoint to use, see How can I determine which endpoint I should use?

## Installing the Network sensor

After downloading the Network sensor appropriate for your system architecture, run this command:

```bash
sudo wget -q -O - <URL> | sudo /bin/bash
```

For information about the installer prompts, see [Network Sensor Deployment Guide](/docs/cse/sensors/network-sensor-deployment-guide).

## Sensor download URLs for the AU region

| Sensor                  | URL                                                              |
|:-------------------------|:------------------------------------------------------------------|
| Network Sensor Ubuntu18 | https://collectors.au.sumologic.com/rest/sec/download/ubuntu18 |
| Network Sensor Ubuntu20 | https://collectors.au.sumologic.com/rest/sec/download/ubuntu20 |
| Network Sensor CentOS7  | https://collectors.au.sumologic.com/rest/sec/download/centos7 |
| Network Sensor CentOS8  | https://collectors.au.sumologic.com/rest/sec/download/centos8 |

## Sensor download URLs for the CA region

| Sensor                  | URL                                                              |
|:-------------------------|:------------------------------------------------------------------|
| Network Sensor Ubuntu18 | https://collectors.ca.sumologic.com/rest/sec/download/ubuntu18 |
| Network Sensor Ubuntu20 | https://collectors.ca.sumologic.com/rest/sec/download/ubuntu20 |
| Network Sensor CentOS7  | https://collectors.ca.sumologic.com/rest/sec/download/centos7 |
| Network Sensor CentOS8  | https://collectors.ca.sumologic.com/rest/sec/download/centos8 |

## Sensor download URLs for the US2 region

| Sensor                  | URL                                                               |
|:-------------------------|:-------------------------------------------------------------------|
| Network Sensor Ubuntu18 | https://collectors.us2.sumologic.com/rest/sec/download/ubuntu18 |
| Network Sensor Ubuntu20 | https://collectors.us2.sumologic.com/rest/sec/download/ubuntu20 |
| Network Sensor CentOS7  | https://collectors.us2.sumologic.com/rest/sec/download/centos7 |
| Network Sensor CentOS8  | https://collectors.us2.sumologic.com/rest/sec/download/centos8 |
