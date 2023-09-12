---
id: automation-service-bridge
title: Automation Service Bridge
sidebar_label: Automation Service Bridge
description: Learn how to install a bridge for the Automation Service to allow running custom actions or integrations in an on-premise environment.   
---

import useBaseUrl from '@docusaurus/useBaseUrl';

You can only run custom actions or integrations outside of the Sumo Logic cloud in an "on-premise" environment. For on-premise environments, you need to install a bridge as described below.

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

### Using a proxy   
1. If docker has to use a proxy to pull images, follow the below instructions:
   ```
   mkdir -p /etc/systemd/system/docker.service.d
   ```
1. Create a file named `/etc/systemd/system/docker.service.d/http-proxy.conf`, and add:
   ```
   [Service]
   Environment="HTTP_PROXY=http://proxy.example.com:8080" 
   Environment="HTTPS_PROXY=http://proxy.example.com:8080"
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

1. Access the Automation Service:
   1. Click the **Configuration** button (gear icon) at the top of the Cloud SIEM UI.
   1. Under **Integrations**, select **Automation**.
   1. At the top of the screen, click **Manage Playbooks**.
1. Click **?** in the upper-right.
1. In the **Automation Bridge Manual** box, click **UBUNTU**.
1. Click **Download** to download the `automation-bridge-X.X.deb` file.
1. Copy the file to the bridge virtual machine.
1. To install the package run from ssh:
   ```
   sudo dpkg -i automation-bridge-X.X.deb
   ```

### CentOS/RedHat

1. Access the Automation Service:
   1. Click the **Configuration** button (gear icon) at the top of the Cloud SIEM UI.
   1. Under **Integrations**, select **Automation**.
   1. At the top of the screen, click **Manage Playbooks**.
1. Click **?** in the upper-right.
1. In the **Automation Bridge Manual** box, click **CENTOS/REDHAT**.
1. Click **Download** to download the `automation-bridge-X.X.rpm` file.
1. Copy the file to the bridge virtual machine.
1. To install the package run from ssh:
   ```
   sudo yum install automation-bridge-X.X.rpm
   ```

### Installation configuration
1. Edit the file `/opt/automation-bridge/etc/user-configuration.conf` and set the below mandatory parameters:
   * `1SOAR_URL1`
   * `1SOAR_TOKEN1`
1. To determine which is the correct SOAR_URL, see [Sumo Logic Endpoints by Deployment and Firewall Security](/docs/api/getting-started#sumo-logic-endpoints-by-deployment-and-firewall-security) and get the URL under the **API Endpoint** column. For example: `https://api.eu.sumologic.com/api/`

And you can set this optional parameter (do not include spaces and must be less than 20 characters): `ALIAS`

An example of a configuration file would be:
```
{
   "SOAR_URL":"API_ENDPOINT_FROM_FIREWALL_DOC_FOR_YOUR_REGION",
   "SOAR_TOKEN":"TOKEN_FROM_ADMINISTRATION_-->_SECURITY_-->_INSTALLATION TOKEN",
   "SIEM_URL":"https://YOUR_CSE_URL/sec",
   "ALIAS":"YOUR_ALIAS_NO_SPACES_LESS_THAN_20_CHARACTERS"
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

### Configuring the automation bridge for high availability

You may elect to deploy and register multiple bridges to your CSE tenant for high availability. To cluster automation bridges together logically within the Automation Service and ensure high availability, you must set the same ALIAS for each bridge within the cluster in each respective `user-configuration.conf` file upon installation. When multiple bridges are registered with the same ALIAS, they will appear as active. If one or more bridges within the cluster go offline, playbooks will execute via the active nodes utilizing the same ALIAS. So long as there is parity between the nodes and there is at least one active node registered, there will be no disruption in playbook execution. It is important to note that integration actions within the playbook must have the appropriate bridge ALIAS assigned within the resource configuration and that connectivity can be established with the appropriate resources. Advanced playbooks may elect to utilize multiple bridge clusters leveraging multiple aliases.

### Post-installation checks

To check if the bridge is running correctly, run the following command:
```
ps faux |grep automation-bridge
```

This is an example of running `automation-bridge`:<br/><img src={useBaseUrl('img/cse/automations-bridge-example-output.png')} alt="Example of running automation-bridge" width="800"/>

On the SOAR instance, the Automation Bridge Monitoring panel under **Settings > Audit and information > License information** shows a list of live bridge agents:<br/><img src={useBaseUrl('img/cse/automations-bridge-monitoring-panel.png')} alt="Automation Bridge Monitoring panel" width="600"/>

### Configuring the automation bridge for CyberArk

If you are using CyberArk, you must add the following certificates provided by CyberArk to the `/opt/automation-bridge/` directory:
* `RootCA_new.crt`
* `client_new.crt`
* `client_new.pem`
