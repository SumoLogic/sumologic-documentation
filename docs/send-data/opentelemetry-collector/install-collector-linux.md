---
id: install-collector-linux
title: Installing Collector on Linux
sidebar_label: Install Collector on Linux
description: Learn how to install the Sumo Logic OpenTelemetry Collector.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Follow the steps in this topic to install or uninstall an OpenTelemetry Collector on Linux. See [OpenTelemetry Collector](/docs/send-data/opentelemetry-collector) for information on other operating systems.

## System Requirements​

The Sumo Logic OpenTelemetry Collector is supported on both amd64 and arm64 architectures.

Minimal resource requirements are the following:

* 200 MB of disk space
* 64 MB of RAM

Supported Versions

* RHEL (7-9), Debian (9-11), Ubuntu (18-22), SUSE (ES12, ES15), Amazon Linux 2, CentOS (7, 8)

## Install

You can install our OpenTelemetry Collector using one of the following methods:

* [UI Installation](#ui-installation)
* [Install script](#install-script)
* [Manual step-by-step installation](#manual-step-by-step-installation)

### UI Installation

1. In Sumo Logic, select **Manage Data** > **Collection** > **OpenTelemetry Collection**.
1. On the OpenTelemetry Collection page, click **Add Collector**.
1. On the left panel, select **Linux** as the platform.<br/> <img src={useBaseUrl('img/send-data/opentelemetry-collector/linux-terminal.png')} alt="linux-terminal" style={{border: '1px solid black'}} width="900"/>
1. Select/create installation token and customize your tags.
1. (Optional) Select the **Auto Configure Host and Process metrics data collection** checkbox to collect host and process metrics.
1. Copy the command and execute it in your system terminal where the collector needs to be installed.<br/> <img src={useBaseUrl('img/send-data/opentelemetry-collector/linux-terminal-installation.png')} alt="execute command in terminal" width="900"/>
1. Wait for the installation process to complete, then click **Next** to proceed.

### Install Script

#### 1. Get the Installation token

Get your [installation token](/docs/manage/security/installation-tokens) if you don't have it already and assign it to an environment variable:

```bash
export SUMOLOGIC_INSTALLATION_TOKEN=<TOKEN>
```

#### 2. Run the Installation script

You can run the script in two ways:

* By piping `curl` straight into `bash`:
   ```bash
   curl -s https://github.com/SumoLogic/sumologic-otel-collector/releases/latest/download/install.sh | sudo -E bash -s -- --tag "host.group=default" --tag "deployment.environment=default"
   ```
* By first downloading the script, inspecting its contents for security, and then running it:
   ```bash
   curl -Lso install-otelcol-sumo.sh https://github.com/SumoLogic/sumologic-otel-collector/releases/latest/download/install.sh
   sudo -E bash ./install-otelcol-sumo.sh
   ```

The `-E` argument to `sudo` is needed to preserve the `SUMOLOGIC_INSTALLATION_TOKEN` environment variable in `sudo` session.

This will perform the following operations:
* Install or upgrade operation by placing the latest version as `/usr/local/bin/otelcol-sumo`
* Get [static configuration](https://github.com/SumoLogic/sumologic-otel-collector/blob/main/examples/sumologic.yaml) and place it as `/etc/otelcol-sumo/sumologic.yaml`
* Create user configuration directory (`/etc/otelcol-sumo/conf.d`) with `common.yaml` file which will contain installation token
* For Systemd:
  * The script will get [Systemd service configuration][service file] and place it as `/etc/systemd/system/otelcol-sumo.service`
  * Create a `otelcol-sumo` user and group that will be used to run the service
  * Enable `otelcol-sumo` service
  * Start `otelcol-sumo` service

#### 3. Script Options

The following arguments can be passed to the script:

| long name  | short name | description  | takes value    |
|:----------------------------|:-----------|:--------------|:-------------|
| `--skip-installation-token` | `k`        | Skips requirement for installation token. This option do not disable default configuration creation.      | No          |
| `--tag`                     | `t`        | Sets tag for collector. This argument can be use multiple times. One per tag.              | Yes, in `key=value` format |
| `--download-only`           | `w`        | Download new binary only and skip configuration part.           | No                         |
| `--version`                 | `v`        | Version of Sumo Logic Distribution for OpenTelemetry Collector to install. By default, it gets latest version.             | Yes, e.g. `0.71.0-sumo-0`  |
| `--skip-config`             | `s`        | Do not create default configuration            | No                         |
| `--skip-systemd`            | `d`        | Preserves from Systemd service installation.               | No                         |
| `--fips`                    | `f`        | Install the FIPS-compliant binary. See [FIPS section](#fips) for more details.             | No                         |
| `--install-hostmetrics`     | `H`        | Install the hostmetrics configuration to collect host metrics.                              | No         |
| `--yes`                     | `y`        | Disable confirmation asks.               | No                         |
| `--uninstall`               | `u`        | Removes Sumo Logic Distribution for OpenTelemetry Collector from the system and disable Systemd service eventually. Use with `--purge` to remove all configurations as well. | No                |
| `--purge`                   | `p`        | It has to be used with `--uninstall`. It removes all Sumo Logic Distribution for OpenTelemetry Collector related configuration and data.         | No                         |
| `--help`      | `h`        | Prints help and usage.           |

The following env variables can be used along with script:

| name               | description        |
|:-------------------|:-----------------|
| `SUMOLOGIC_INSTALLATION_TOKEN` | Installation token |

### Manual step-by-step Installation

#### Step 1. Download the Binary

Examples for OpenTelemetry Collector version `0.73.0-sumo-0`.

<Tabs
  className="unique-tabs"
  defaultValue="amd64 (x86-64)"
  values={[
    {label: 'amd64 (x86-64)', value: 'amd64 (x86-64)'},
    {label: 'arm64', value: 'arm64'},
  ]}>

<TabItem value="amd64 (x86-64)">

```bash
curl -sLo otelcol-sumo \
"https://github.com/SumoLogic/sumologic-otel-collector/releases/download/v0.73.0-sumo-0/otelcol-sumo-0.73.0-sumo-0-linux_amd64"
```

</TabItem>
<TabItem value="arm64">

```bash
curl -sLo otelcol-sumo \
"https://github.com/SumoLogic/sumologic-otel-collector/releases/download/v0.73.0-sumo-0/otelcol-sumo-0.73.0-sumo-0-linux_arm64"
```

</TabItem>
</Tabs>

#### Step 2. Move the binary to your `PATH` environment

Move the downloaded binary into a directory from your `PATH` environment, so that it can be used by simply invoking `otelcol-sumo`.

```bash
chmod +x otelcol-sumo
sudo mv otelcol-sumo /usr/local/bin/otelcol-sumo
```

#### Step 3. Verify the Installation

To verify installation, run the OpenTelemetry Collector.

```bash
otelcol-sumo --version
```

#### Step 4. Run OpenTelemetry Collector as Systemd Service

We recommend using the [installation script](#install-script) as it supports the Systemd scenario. This section describes how to install it manually.

:::info prerequisites
Ensure that the user who will run the `otelcol-sumo` process has access to any directories used in your configuration within the filesystem.
:::

For example, if you use the [file_storage extension](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/extension/storage/filestorage) in your configuration like this:

```yaml
extensions:
file_storage/custom_settings:
directory: /var/lib/otelcol/mydir
timeout: 1s
```

Then the user running the process must have access to `/var/lib/otelcol/mydir`.

To run OpenTelemetry Collector as Systemd Service, follow the steps below:

1. Ensure that `otelcol-sumo` has been installed into `/usr/local/bin/otelcol-sumo` by running this command.
   ```bash
   /usr/local/bin/otelcol-sumo --version
   ```
1. Create configuration, follow the steps below.
   1. Get [recommended configuration](https://github.com/SumoLogic/sumologic-otel-collector/blob/main/examples/sumologic.yaml) from Sumo Logic repository and save it as `/etc/otelcol-sumo/sumologic.yaml`.
   1. Create your custom configuration file in the `/etc/otelcol-sumo/conf.d` directory. For example, you can create a file called `common.yaml` in this directory to store your custom configuration, like this `/etc/otelcol-sumo/conf.d/common.yaml`.
   :::note
   It is recommended to limit access to the configuration file as it contains sensitive information.
   :::
   1. You can change the access permissions to the configuration file by running the following command:
    ```bash
    mkdir -p /etc/otelcol-sumo/{conf.d,env}
    chmod 551 /etc/otelcol-sumo /etc/otelcol-sumo/{conf.d,env}
    chmod 440 /etc/otelcol-sumo/conf.d/common.yaml /etc/otelcol-sumo/sumologic.yaml
    ```
1. Create `user` and `group` to run OpenTelemetry by running the following command:
   ```bash
   sudo useradd -mrUs /bin/false -d /var/lib/otelcol-sumo otelcol-sumo
   ```
   * This command will create a home directory for the user. By default, the `sumologic` extension stores the credentials in a subdirectory of the home directory. However, if the user with name `otelcol-sumo` already exists, it won't be overwritten, so you should make sure that a home directory has been created for this user. If you don't want the user to have a home directory, use `useradd` with the `M` flag instead of `m` (`sudo useradd -MrUs ...`) and explicitly change the directory for saving the credentials. For example:
    ```yaml
    extensions:
    sumologic:
     # ...
    collector_credentials_directory: /var/lib/otelcol-sumo/credentials
    ```
   For more information, refer to the [sumologic extension](https://github.com/SumoLogic/sumologic-otel-collector/tree/main/pkg/extension/sumologicextension#configuration) documentation.
1. Ensure that the configuration can be accessed by `otelcol-sumo` user which will be used to run the service by running this command.
   ```bash
   $ sudo find /etc/otelcol-sumo/ -type 'f' | sudo xargs ls -al
   -r--r----- 1 otelcol-sumo otelcol-sumo   48 Feb 16 09:00 /etc/otelcol-sumo/conf.d/common.yaml
   -r--r----- 1 otelcol-sumo otelcol-sumo 4569 Feb 16 09:00 /etc/otelcol-sumo/sumologic.yaml
   ```
1. Verify if OpenTelemetry collector runs without errors by running this command:
   ```bash
   sudo su -s /bin/bash otelcol-sumo -c '/usr/local/bin/otelcol-sumo --config /etc/otelcol-sumo/sumologic.yaml --config "glob:/etc/otelcol-sumo/conf.d/*.yaml"'
   ```
1. Get [service file] and save as `/etc/systemd/system/otelcol-sumo.service`:
   ```bash
   curl https://raw.githubusercontent.com/SumoLogic/sumologic-otel-collector/main/examples/systemd/otelcol-sumo.service | sudo tee /etc/systemd/system/otelcol-sumo.service
   ```
   :::note
   Adjust memory configuration to your setup.
   :::
1. Enable autostart of the service by running the following command:
   ```bash
   sudo systemctl enable otelcol-sumo
   ```
1. Start service and check status by running the following command:
   ```bash
   sudo systemctl start otelcol-sumo
   sudo systemctl status otelcol-sumo  # checks status
   sudo journalctl -u otelcol-sumo  # checks logs
   ```

#### Using Environmental variable to store Installation token

We recommend keeping the install token in environmental variable for `Systemd` installation:

1. Ensure that the service file `/etc/systemd/system/otelcol-sumo.service` contains `EnvironmentFile=-/etc/otelcol-sumo/env/*.env` by running this command.
   ```shell
   $ sudo cat /etc/systemd/system/otelcol-sumo.service
   [Service]
   ...
   EnvironmentFile=-/etc/otelcol-sumo/env/*.env
   ```
1. Ensure that the `/etc/otelcol-sumo/env` directory exists by running this command.
   ```bash
   sudo mkdir -p /etc/otelcol-sumo/env
   ```
1. Create `/etc/otelcol-sumo/env/token.env` directory with your installation token. In this example, we use `SUMOLOGIC_INSTALLATION_TOKEN`, as it will be automatically used by the recommended configuration.
   ```bash
   SUMOLOGIC_INSTALLATION_TOKEN=<your token>
   ```
1. Ensure that the file has the correct owner and permissions by running this command.
   ```bash
   sudo chmod 440 /etc/otelcol-sumo/env/token.env
   sudo chown otelcol-sumo:otelcol-sumo /etc/otelcol-sumo/env/token.env
   ```
1. Remove `install_token` overrides from `/etc/otelcol-sumo/conf.d/*.yaml`. You can find them using the following command:
   ```shell
   $ sudo grep -Rn install_token /etc/otelcol-sumo/conf.d
   /etc/otelcol-sumo/conf.d/common.yaml:3:    install_token: <some token>
   ```
1. Restart `otelcol-sumo` service by running this command.
   ```bash
   sudo systemctl restart otelcol-sumo
   ```

#### Running Binary Manually

If your system does not support `Systemd`, or you don't want to create a service, you can run Collector manually.

```bash
sudo otelcol-sumo --config=/etc/otelcol-sumo/sumologic.yaml --config "glob:/etc/otelcol-sumo/conf.d/*.yaml"
```

### Additional Settings

This section describes common OpenTelemetry customizations.

#### Using Proxy

Exporters leverage the HTTP communication and respect the following proxy environment variables:

* `HTTP_PROXY`
* `HTTPS_PROXY`
* `NO_PROXY`

You may either export proxy environment variables locally, for example:

```bash
export FTP_PROXY=<PROXY-ADDRESS>:<PROXY-PORT>
export HTTP_PROXY=<PROXY-ADDRESS>:<PROXY-PORT>
export HTTPS_PROXY=<PROXY-ADDRESS>:<PROXY-PORT>
```

or make them available globally for all users, e.g.

```bash
tee -a /etc/profile << END
export FTP_PROXY=<PROXY-ADDRESS>:<PROXY-PORT>
export HTTP_PROXY=<PROXY-ADDRESS>:<PROXY-PORT>
export HTTPS_PROXY=<PROXY-ADDRESS>:<PROXY-PORT>
END
```

To exclude a specific domain or IP address from using the proxy, you can add it to the `NO_PROXY` environment variable. For example, to exclude the domain `sumologic.com` from using the proxy, you can add the following command:

`export NO_PROXY=sumologic.com`

:::note
For Systemd service, the variables can be placed in `/etc/otelcol-sumo/env/proxy.env`, as default configuration (`EnvironmentFile=-/etc/otelcol-sumo/env/*.env`) will load them automatically.
Service need to be restarted in order to apply the changes.
:::

#### FIPS

To install FIPS compliant binary, you should add `--fips` switch to installation command, so it will look like the following:

```bash
curl -Ls https://github.com/SumoLogic/sumologic-otel-collector/releases/latest/download/install.sh | SUMOLOGIC_INSTALLATION_TOKEN="TOKEN" sudo -E bash -s -- --tag "host.group=default" --tag "deployment.environment=default" --fips && sudo otelcol-sumo --config=/etc/otelcol-sumo/sumologic.yaml --config "glob:/etc/otelcol-sumo/conf.d/*.yaml"
```

Refer to [BoringCrypto and FIPS compliance](https://github.com/SumoLogic/sumologic-otel-collector/blob/main/docs/fips.md) in our repository for more details.

## Uninstall

The recommended way to uninstall the OpenTelemetry Collector depends on how you installed it.

### Install Script

If you installed the Collector with the install script, you can this command to uninstall the Collector:

```bash
curl -Ls https://github.com/SumoLogic/sumologic-otel-collector/releases/latest/download/install.sh | sudo -E bash -s -- -u -y
```

You can also use flag `-p` to remove all existing configurations as well:

```bash
curl -Ls https://github.com/SumoLogic/sumologic-otel-collector/releases/latest/download/install.sh | sudo -E bash -s -- -u -y -p
```

### Manual step-by-step Uninstall

If you installed the Collector manually, simply remove the binary from the directory you have placed it in by running the following command:

```bash
sudo rm /usr/local/bin/otelcol-sumo
```

## Upgrading the Collector

### Upgrade OpenTelemetry Collector

First, you have to upgrade the Collector's version. The way you should do it, depends on how you installed it.

#### Install Script

Running install script will simply upgrade collector to the latest version:

```bash
curl -Ls https://github.com/SumoLogic/sumologic-otel-collector/releases/latest/download/install.sh | sudo bash
```

:::note
You need to restart collector process manually in order to apply changes.
:::

#### Manual step-by-step Installation

If you installed the Collector manually, the simplest way to upgrade is to follow these steps:

* [Uninstall the Collector manually](#manual-step-by-step-installation-1)
* [Install the Collector again with a new version](#manual-step-by-step-installation)

### Update your Config

After an upgrade, you should make sure that your config for OpenTelemetry Collector is up to date.

To see changes in upstream OpenTelemetry components, refer to the [core changelog](https://github.com/open-telemetry/opentelemetry-collector/releases) and [contrib changelog](https://github.com/open-telemetry/opentelemetry-collector-contrib/releases).

List of breaking changes specific to Sumo Logic Distribution of OpenTelemetry Collector can be found [here](https://github.com/SumoLogic/sumologic-otel-collector/blob/main/docs/upgrading.md).

## Troubleshooting

For information on troubleshooting and solutions, refer to [Troubleshooting](/docs/send-data/opentelemetry-collector/troubleshooting).

[service file]: https://github.com/SumoLogic/sumologic-otel-collector/blob/main/examples/systemd/otelcol-sumo.service
