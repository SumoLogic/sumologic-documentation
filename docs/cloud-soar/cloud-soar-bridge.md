---
id: cloud-soar-bridge
title: Cloud SOAR Bridge
sidebar_label: Cloud SOAR Bridge
description: Learn how to install a bridge for Cloud SOAR to allow running custom actions or integrations in an on-premise environment.   
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
<!-- These network requirements differ from those for the Automation Service bridge -->

The Bridge must be able to resolve DNS hostnames and reach the below destinations.

| DESTINATION | PROTOCOL | PORT |
| :-- | :-- | :-- |
| soar-cloud-url | TCP | 443 |
| siem-cloud-url | TCP| 443| 
| 784093250948.dkr.ecr.eu-central-1.amazonaws.com | 	TCP| 	443| 
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

## Get JWT token
<!-- This section is different from the Automation Service, where it is titled "Get installation token". -->
1. Click the gear icon at the top of the Cloud SOAR screen and select **Settings**.
1. Add a new profile:
   1. Select **User Management > Profiles**. 
   1. Click the **+** button to the left of **Profiles**.
   1. In the **Add profile** dialog, enter a **Name** for the new profile.
   1. Click the **Settings** box.
   1. In the **API** box select **Use**.
   1. Click **CREATE**.
1. Add a new user:
   1. Select **User Management > Users**.
   1. Click the **+** button to the left of **Users**.
   1. In the **Add user** dialog, for **Profile** select the profile you created above. Fill out the rest of the fields.
   1. Click **CREATE**. 
1. Copy the JWT token for the new user:
   1. Log in to Cloud SOAR as the new user.
   1. Click the gear icon at the top of the Cloud SOAR screen and select **Settings**.
   1. Select **User Management > Users**.
   1. Select the new user.
   1. Scroll down to the **JWT Token** section.
   1. Copy the token. You will use this token later in the installation process.

## Automation installation

### Ubuntu

1. Click **?** in the upper-right of the Cloud SOAR UI.
1. In the **Automation Bridge** box, click **UBUNTU**.
1. Click **Download** to download the `automation-bridge-X.X.deb` file.
1. Copy the file to the bridge virtual machine.
1. To install the package run from ssh:
   ```
   sudo dpkg -i automation-bridge-X.X.deb
   ```

### CentOS/RedHat

1. Click **?** in the upper-right of the Cloud SOAR UI.
1. In the **Automation Bridge** box, click **CENTOS/REDHAT**.
1. Click **Download** to download the `automation-bridge-X.X.rpm` file.
1. Copy the file to the bridge virtual machine.
1. To install the package run from ssh:
   ```
   sudo yum install automation-bridge-X.X.rpm
   ```

### Installation configuration

1. Edit the file `/opt/automation-bridge/etc/user-configuration.conf` and set the below mandatory parameters: <!-- These parameters differ from those for the Automation Service -->
   * `SOAR_URL`
   * `SOAR_TOKEN`
1. To determine which is the correct SOAR_URL, see [Sumo Logic Endpoints by Deployment and Firewall Security](/docs/api/getting-started#sumo-logic-endpoints-by-deployment-and-firewall-security) and get the URL under the **API Endpoint** column. For example: `https://api.eu.sumologic.com/api/`

And you can set this optional parameter (do not include spaces): `ALIAS`

An example of a configuration file would be:
<!-- This example differs from that for the Automation Service bridge -->
```
{
        "SOAR_URL":"https://YOUR_DOMAIN/incmansuite_ng/api", 
        "SOAR_TOKEN":"YOUR_JWT_TOKEN",
        "SIEM_URL":"https://YOUR_CSE_URL/sec",
        "ALIAS": "YOUR_ALIAS_NO_SPACES"
}
```
Obtain the `SOAR_URL` by clicking **?** at the top of the Cloud SOAR UI and navigating to **API Documentation**. Note the **Servers** value and remove `/v3/` from the end of the URL. The bridge cannot currently be registered to a Cloud SOAR instance with the `/v3/` API. 

### Bridge ALIAS

With bridge ALIAS, it is possible to distinguish which integration resources will be executed with this automation bridge. When a new integration resource is created or edited, it is possible to select the default ALIAS or to create a new one. So every automatic action configured to use this resource will be performed with the Bridge that has the same ALIAS.

<img src={useBaseUrl('img/cloud-soar/automations-bridge-alias-create.png')} alt="Create ALIAS bridge" width="400"/>

<img src={useBaseUrl('img/cloud-soar/automations-bridge-alias-default.png')} alt="Use default ALIAS bridge" width="400"/>

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

### Configuring the automation bridge for High Availability

You may elect to deploy and register multiple bridges to your CloudSOAR tenant for high availability. To cluster automation bridges together logically within CloudSOAR and ensure high availability, you must set the same ALIAS for each bridge within the cluster in each respective user-configuration.conf file upon installation / registration. When multiple bridges are registered with the same ALIAS, they will appear as active. If one or more bridges within the cluster go offline, playbooks will execute via the active node(s) utilizing the same ALIAS. So long as there is parity between the nodes and there is at least one active node registered, there will be no disruption in playbook execution. It is important to note that integration actions within the Playbook must have the appropriate bridge ALIAS assigned within the resource configuration and that connectivity can be established with the appropriate resources. Advanced playbooks may elect to utilize multiple bridge clusters leveraging multiple aliases.

### Post-installation checks

To check if the bridge is running correctly, run the following command:
```
ps faux |grep automation-bridge
```

This is an example of running `automation-bridge`:<br/><img src={useBaseUrl('img/cloud-soar/automations-bridge-example-output.png')} alt="Example of running automation-bridge" width="800"/>

On the SOAR instance, the Automation Bridge Monitoring panel under **Settings > Audit and information > License information** shows a list of live bridge agents:<br/><img src={useBaseUrl('img/cloud-soar/automations-bridge-monitoring-panel.png')} alt="Automation Bridge Monitoring panel" width="600"/>

### Configuring the automation bridge for CyberArk

If you are using CyberArk, you must add the following certificates provided by CyberArk to the `/opt/automation-bridge/` directory:
* `RootCA_new.crt`
* `client_new.crt`
* `client_new.pem`
