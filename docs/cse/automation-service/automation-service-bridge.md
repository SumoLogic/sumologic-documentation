---
id: automation-service-bridge
title: Bridge
sidebar_label: Bridge
description: Learn how to install a bridge to allow running custom actions or integrations in an on-premise environment.   
---

import useBaseUrl from '@docusaurus/useBaseUrl';



You can only run custom actions or integrations outside of the Sumo Logic cloud in an "on-premise" environment. For on-premise environments, you need to install a bridge as described below.

<!-- github-comment
Write. The content below was copied from the doc accessed from the ? menu option.
-->

## Requirements 

### Hardware requirements

* OS: 
   * Ubuntu (18.04/20.04)
   * CentOS 7
   * RedHat 8
* RAM: 8GB
* CPU: 4 Core
* DISK: 160GB
* Network card: 1

### Network requirements

The Bridge has to be able to resolve DNS hostnames and needs to reach the below destinations

| DESTINATION | PROTOCOL | PORT |
| :-- | :-- | :-- |
| sumo-logic-api-url | TCP| 443| 
| siem-cloud-url | 	TCP| 	443| 
| 926226587429.dkr.ecr.us-west-2.amazonaws.com| 	TCP| 	443| 
| index.docker.io* | 	TCP| 	443| 
| registry-1.docker.io* | 	TCP| 	443| 
| auth.docker.io* | 	TCP| 	443| 
| production.cloudflare.docker.com* | 	TCP| 	443| 
| long-endpoint1-events.sumologic.net | 	TCP| 	443| 

\* Needed only to connect to docker hub.

## Install Docker

1. Install Docker-CE following the [installation instructions in Docker Docs](https://docs.docker.com/engine/install/). Install at least version 20.10 (do not use nightly build).
1. As soon as the docker daemon is installed, start it with: 
   ```
   systemctl start docker
   ```
1. Enable it on boot: 
   ```
   systemctl enable docker
   ```
1. If docker has to use a proxy to pull images, follow the below instructions:
   ```
   mkdir -p /etc/systemd/system/docker.service.d
   ```
1. Create a file named `/etc/systemd/system/docker.service.d/http-proxy.conf`, and add:
   ```
   [Service]
   Environment="HTTP_PROXY=http://proxy.example.com:8080\" 
   Environment="HTTPS_PROXY=http://proxy.example.com:8080\"
   ```
1. Reload the systemd daemon with:
   ```
   systemctl daemon-reload
   ```
1. And restart docker service with:
   ```
   systemctl restart docker
   ```

## Get installation token

Login to Sumo Logic and create a new [installation token](/docs/manage/security/installation-tokens/) with name prefix `csoar-bridge-token`.

<img src={useBaseUrl('img/cse/automations-bridge-installation-token.png')} alt="Installation token" width="800"/>

## Automation bridge installation

### Ubuntu

1. Download the `automation-bridge-X.X.deb` and copy it on the bridge virtual machine.
1. To install the package run from ssh:
   ```
   sudo dpkg -i automation-bridge-X.X.deb
   ```

### CentOS/RedHat

1. Download the `automation-bridge-X.X.rpm` and copy it on the bridge virtual machine.
1. To install the package run from ssh:
   ```
   sudo yum install automation-bridge-X.X.rpm
   ```
1. Edit the file `/opt/automation-bridge/etc/user-configuration.conf` and set the below mandatory parameters:
   * `1SOAR_URL1`
   * `1SOAR_TOKEN1`
1. To determine which is the correct SOAR_URL, see [Sumo Logic Endpoints by Deployment and Firewall Security](/docs/api/getting-started#sumo-logic-endpoints-by-deployment-and-firewall-security) and get the URL under the **API Endpoint** column. For example: `https://api.eu.sumologic.com/api/`

And you can set this optional parameter: `ALIAS`

An example of a configuration file would be:
```
{
"SOAR_URL": "https://
"SOAR_TOKEN": "
"SIEM_URL":"https://
"ALIAS": "
}
```

### Bridge ALIAS

With bridge ALIAS, it is possible to distinguish which integration resources will be executed with this automation bridge. When a new integration resource is created or edited it is possible to select the default ALIAS or to create a new one. So every automatic action configured to use this resource will be performed with the Bridge that has the same ALIAS.

<img src={useBaseUrl('img/cse/automations-bridge-alias-create.png')} alt="Create ALIAS bridge" width="400"/>

<img src={useBaseUrl('img/cse/automations-bridge-alias-default.png')} alt="Use default ALIAS bridge" width="400"/>

### Automation bridge update

For Ubuntu and CentOS/RedHat, the update process works as the installation process. Follow the same steps described in [Automation bridge installation](#automation-bridge-installation) above.

:::note
If you are not using the SIEM:
1. Set `SIEM_URL` to `NONE`.
1. Restart the service with:
   ```
   systemctl restart automation-bridge
   ```
1. If you need to allow automation-bridge communication through a proxy, edit the file `/etc/opt/automation-bridge/automation-bridge.conf` and set the correct value. Below is an example:
   ```
   HTTP_PROXY="http://proxy.example.com:8080\"
   HTTPS_PROXY="http://proxy.example.com:8080\"
   ```
1. Restart the service with:
   ```
   systemctl restart automation-bridge
   ```
:::

### Post-installation checks

To check if the bridge is running correctly, run the following command:
```
ps faux |grep automation-bridge
```

This is an example of running `automation-bridge`:<br/><img src={useBaseUrl('img/cse/automations-bridge-example-output.png')} alt="Example of running automation-bridge" width="800"/>

On the SOAR instance, the Automation Bridge Monitoring panel under **Settings > Audit and information > License information** shows a list of live bridge agents:<br/><img src={useBaseUrl('img/cse/automations-bridge-monitoring-panel.png')} alt="Automation Bridge Monitoring panel" width="600"/>
