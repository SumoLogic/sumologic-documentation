---
id: sensor-download-locations
title: Sensor Download Locations
description: The Cloud SIEM Network Sensor can be downloaded from a static URL that is specific to your Cloud SIEM deployment.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import SensorEOL from '../../reuse/cloud-siem-network-sensor-eol.md';

:::warning end-of-life
<SensorEOL/>
:::

The Cloud SIEM Network Sensor can be downloaded from a static URL that is specific to your Cloud SIEM deployment. Each Sumo Logic deployment has URLs used to download sensor software. If you are not sure which endpoint to use, see How can I determine which endpoint I should use?

## Installing the Network Sensor

After downloading the Network Sensor appropriate for your system architecture, run this command:

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
