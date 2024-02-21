---
id: cloud-soar-bridge
title: Cloud SOAR Bridge
sidebar_label: Bridge
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
| 784093250948.dkr.ecr.us-east-1.amazonaws.com | 	TCP| 	443|
| 784093250948.dkr.ecr.us-west-2.amazonaws.com | 	TCP| 	443|
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

## Get installation token

Log in to Sumo Logic and create a new [installation token](/docs/manage/security/installation-tokens/) with the name prefix `csoar-bridge-token`.

<img src={useBaseUrl('img/cse/automations-bridge-installation-token.png')} alt="Installation token" width="800"/>

## Automation installation

### Ubuntu

1. Click **?** in the upper-right of the Cloud SOAR UI.
1. In the **Automation Bridge** box, click **UBUNTU**.
1. Click **Download** to download the `automation-bridge-X.X.deb` file.
1. Copy the file to the bridge virtual machine. You can use SCP - see example below:
    ```
    scp -r -i /path/to/private_key /path/to/local/folder remote_user@remote_ip:/path/to/remote/folder
    ```
3. To install the package run from ssh:
   ```
   sudo dpkg -i automation-bridge-X.X.deb
   ```

### CentOS/RedHat

1. Click **?** in the upper-right of the Cloud SOAR UI.
1. In the **Automation Bridge** box, click **CENTOS/REDHAT**.
1. Click **Download** to download the `automation-bridge-X.X.rpm` file.
1. Copy the file to the bridge virtual machine (You can use SCP, see example below).
    ```
    scp -r -i /path/to/private_key /path/to/local/folder remote_user@remote_ip:/path/to/remote/folder
    ```
1. To install the package run from ssh:
   ```
   sudo yum install automation-bridge-X.X.rpm
   ```

### Installation configuration

1. Verify that the prefix name of the generated token respects the requirements (see [Get installation token](#get-installation-token)).
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
   HTTP_PROXY="http://proxy.example.com:8080"
   HTTPS_PROXY="http://proxy.example.com:8080"
   ```
1. Restart the service with:
   ```
   systemctl restart automation-bridge
   ```
:::

### Configuring the automation bridge for high availability

You may elect to deploy and register multiple bridges to your Cloud SOAR tenant for high availability. To cluster automation bridges together logically within Cloud SOAR and ensure high availability, you must set the same ALIAS for each bridge within the cluster in each respective `user-configuration.conf` file upon installation. When multiple bridges are registered with the same ALIAS, they will appear as active. If one or more bridges within the cluster go offline, playbooks will execute via the active nodes utilizing the same ALIAS. So long as there is parity between the nodes and there is at least one active node registered, there will be no disruption in playbook execution. It is important to note that integration actions within the playbook must have the appropriate bridge ALIAS assigned within the resource configuration and that connectivity can be established with the appropriate resources. Advanced playbooks may elect to utilize multiple bridge clusters leveraging multiple aliases.

### Post-installation checks

To check if the bridge is running correctly, run the following command:
```
ps faux |grep automation-bridge
```

This is an example of running `automation-bridge`:<br/><img src={useBaseUrl('img/cloud-soar/automations-bridge-example-output.png')} alt="Example of running automation-bridge" width="800"/>

On the SOAR instance, under **Automation > Bridge**, a list of live bridge agents will be displayed along with their status.

### Configuring the automation bridge for CyberArk

If you are using CyberArk, you must add the following certificates provided by CyberArk to the `/opt/automation-bridge/` directory:
* `RootCA_new.crt`
* `client_new.crt`
* `client_new.pem`

### Configuring automation bridge with Podman

#### Enable Podman socket

1. Run the following commands:
   ```bash
   systemctl enable podman.socket && systemctl start podman.socket
   ```
1. Create a symbolic link:
   ```bash
   ln -s /run/podman/podman.sock /var/run/docker.sock
   ```

#### Change automation bridge configuration

Change the automation bridge configuration file `/usr/lib/systemd/system/automation-bridge-worker@.service`.

```bash title="systemd"
[Unit]
Description=Automation-bridge worker %i

[Service]
User=root
EnvironmentFile=/etc/opt/automation-bridge/automation-bridge.conf
ExecStart=/opt/automation-bridge/bin/automation-bridge -f /opt/automation-bridge/etc/user-configuration.conf -n %H-%i
ExecStop=/bin/kill -s TERM  $MAINPID
Restart=on-failure
TimeoutStartSec=10
RestartSec=10

NoNewPrivileges=yes
PrivateTmp=yes
PrivateDevices=yes

[Install]
WantedBy=multi-user.target
```

:::important
This is the current solution and it needs to run service as `root`.
:::
