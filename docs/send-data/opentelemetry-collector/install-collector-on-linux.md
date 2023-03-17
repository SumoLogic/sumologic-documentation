---
id: install-collector-on-linux
title: Installing Collector on Linux
sidebar_label: Install Collector on Linux
description: Learn how to install Collector
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Follow the steps in this topic to install or uninstall an OpenTelemetry Collector on Linux. See [OpenTelemetry Collector](/docs/send-data/opentelemetry-collector) for information on other operating systems.

## System Requirements​

The Sumo Logic OpenTelemetry Collector is supported on both amd64 and arm64 architectures.

Minimal resource requirements are the following:

* 200 MB of disk space
* 64 MB of RAM

## Install

You can install our OpenTelemetry Collector using either of the following methods:

* [Install script](#install-script)
* [Manual step-by-step installation](#manual-step-by-step-installation)

### Install script

#### Get the installation token

Get your [installation token](https://help.sumologic.com/docs/manage/security/installation-tokens) if you don't have it already and assign it to an environment variable:

```bash
export SUMOLOGIC_INSTALLATION_TOKEN=<TOKEN>
```

#### Run the installation script

You can run the script in two ways:

* by piping `curl` straight into `bash`:

   ```bash
   sudo curl -Ls https://github.com/SumoLogic/sumologic-otel-collector/releases/latest/download/install.sh | sudo -E bash -s --
   ```

* by first downloading the script, inspecting its contents for security, and then running it:

   ```bash
   curl -Lso install-otelcol-sumo.sh https://github.com/SumoLogic/sumologic-otel-collector/releases/latest/download/install.sh
   sudo -E bash ./install-otelcol-sumo.sh
   ```

The `-E` argument to `sudo` is needed to preserve the `SUMOLOGIC_INSTALLATION_TOKEN` environment variable in `sudo` session.

It is going to perform the following operations:

* install or upgrade operation by placing the latest version as `/usr/local/bin/otelcol-sumo`,
* get [static configuration](https://github.com/SumoLogic/sumologic-otel-collector/blob/main/examples/sumologic.yaml) and place it as `/etc/otelcol-sumo/sumologic.yaml`
* create user configuration directory (`/etc/otelcol-sumo/conf.d`) with `common.yaml` file which will contain installation token

* for Systemd:

  * the script is going to get [Systemd service configuration][service file] and place it as `/etc/systemd/system/otelcol-sumo.service`
  * create a `otelcol-sumo` user and group which will be used to run the service
  * enable `otelcol-sumo` service
  * start `otelcol-sumo` service

#### Script options

The following arguments can be passed to the script:

| long name                   | short name | description                                                                                                                                                                  | takes value                |
|-----------------------------|------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------|
| `--skip-installation-token` | `k`        | Skips requirement for installation token. This option do not disable default configuration creation.                                                                         | no                         |
| `--tag`                     | `t`        | Sets tag for collector. This argument can be use multiple times. One per tag.                                                                                                | yes, in `key=value` format |
| `--download-only`           | `w`        | Download new binary only and skip configuration part.                                                                                                                        | no                         |
| `--version`                 | `v`        | Version of Sumo Logic Distribution for OpenTelemetry Collector to install. By default, it gets latest version.                                                               | yes, e.g. `0.71.0-sumo-0`  |
| `--skip-config`             | `s`        | Do not create default configuration                                                                                                                                          | no                         |
| `--skip-systemd`            | `d`        | Preserves from Systemd service installation.                                                                                                                                 | no                         |
| `--fips`                    | `f`        | Install the FIPS-compliant binary. See [this document](https://github.com/SumoLogic/sumologic-otel-collector/blob/main/docs/fips.md) for more details.                       | no                         |
| `--install-hostmetrics`     | `H`        | Install the hostmetrics configuration to collect host metrics.                                                                                                               | no                         |
| `--yes`                     | `y`        | Disable confirmation asks.                                                                                                                                                   | no                         |
| `--uninstall`               | `u`        | Removes Sumo Logic Distribution for OpenTelemetry Collector from the system and disable Systemd service eventually. Use with `--purge` to remove all configurations as well. | no                         |
| `--purge`                   | `p`        | It has to be used with `--uninstall`. It removes all Sumo Logic Distribution for OpenTelemetry Collector related configuration and data.                                     | no                         |
| `--help`                    | `h`        | Prints help and usage.                                                                                                                                                       | no                         |

The following env variables can be used along with script:

| name                           | description        |
|--------------------------------|--------------------|
| `SUMOLOGIC_INSTALLATION_TOKEN` | Installation token |

### Manual step-by-step installation

#### Download the binary

Examples for OpenTelemetry Collector version `0.73.0-sumo-0`.

##### amd64 (x86-64)

```bash
curl -sLo otelcol-sumo "https://github.com/SumoLogic/sumologic-otel-collector/releases/download/v0.73.0-sumo-0/otelcol-sumo-0.73.0-sumo-0-linux_amd64"
```

##### arm64

```bash
curl -sLo otelcol-sumo "https://github.com/SumoLogic/sumologic-otel-collector/releases/download/v0.73.0-sumo-0/otelcol-sumo-0.73.0-sumo-0-linux_arm64"
```

#### Move the binary to your `PATH` environment

Move the downloaded binary into a directory from your `PATH` environment, so that it can be used by simply invoking `otelcol-sumo`.

```bash
chmod +x otelcol-sumo
sudo mv otelcol-sumo /usr/local/bin/otelcol-sumo
```

#### Verify the installation

In order to verify installation please run OpenTelemetry Collector.

```bash
otelcol-sumo --version
```

#### Systemd service

We recommend to use [installation script](#install-script) as it supports Systemd scenario.

This section describes how to install it manually.

> **IMPORTANT NOTE**:
>
> Make sure that the user that will run the `otelcol-sumo` process has access to
> any directories within your filesystem that have been used in you configuration.
>
> For instance, using [filestorage extension][filestorage_help] in your configuration
> like so:
>
> ```yaml
> extensions:
>   file_storage/custom_settings:
>     directory: /var/lib/otelcol/mydir
>     timeout: 1s
> ```
>
> will require that the user running the process has access to `/var/lib/otelcol/mydir`.

[filestorage_help]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/extension/storage/filestorage

To run opentelemetry collector as Systemd Service please apply following steps:

1. Ensure that `otelcol-sumo` has been installed into `/usr/local/bin/otelcol-sumo`:

   ```bash
   /usr/local/bin/otelcol-sumo --version
   ```

1. Create configuration:

   * Get [recommended configuration](https://github.com/SumoLogic/sumologic-otel-collector/blob/main/examples/sumologic.yaml) from Sumo Logic repository and save it as `/etc/otelcol-sumo/sumologic.yaml`.
   * Create your custom configuration in `/etc/otelcol-sumo/conf.d`, e.g. `/etc/otelcol-sumo/conf.d/common.yaml`

   > **IMPORTANT NOTE**:
   > It is recommended to limit access to the configuration file as it contains sensitive information.
   > You can change access permissions to the configuration file using:
   >
   > ```bash
   > mkdir -p /etc/otelcol-sumo/{conf.d,env}
   > chmod 551 /etc/otelcol-sumo /etc/otelcol-sumo/{conf.d,env}
   > chmod 440 /etc/otelcol-sumo/conf.d/common.yaml /etc/otelcol-sumo/sumologic.yaml
   > ```

1. Create `user` and `group` to run opentelemetry by:

   ```bash
   sudo useradd -mrUs /bin/false -d /var/lib/otelcol-sumo otelcol-sumo
   ```

   > **IMPORTANT NOTE**:
   > This command will create a home directory for the user. By default, the `sumologic` extension stores the credentials in a subdirectory of the home directory.
   > However, if the user with name `otelcol-sumo` already exists, it won't be overwritten, so you should make sure that a home directory has been created for this user.
   >
   > If you don't want the user to have a home directory, you should use `useradd` with the `M` flag instead of `m` (`sudo useradd -MrUs ...`)
   > and explicitly change the directory for saving the credentials, for example:
   >
   > ```yaml
   > extensions:
   >   sumologic:
   >     # ...
   >     collector_credentials_directory: /var/lib/otelcol-sumo/credentials
   > ```
   >
   > For more information, please refer to the documentation of [sumologic extension].

1. Ensure that configuration can be accessed by `otelcol-sumo` user
   which will be used to run the service.

   ```bash
   $ sudo find /etc/otelcol-sumo/ -type 'f' | sudo xargs ls -al
   -r--r----- 1 otelcol-sumo otelcol-sumo   48 Feb 16 09:00 /etc/otelcol-sumo/conf.d/common.yaml
   -r--r----- 1 otelcol-sumo otelcol-sumo 4569 Feb 16 09:00 /etc/otelcol-sumo/sumologic.yaml
   ```

1. Verify if opentelemetry collector runs without errors:

   ```bash
   sudo su -s /bin/bash otelcol-sumo -c '/usr/local/bin/otelcol-sumo --config /etc/otelcol-sumo/sumologic.yaml --config "glob:/etc/otelcol-sumo/conf.d/*.yaml"'
   ```

1. Get [service file] and save as `/etc/systemd/system/otelcol-sumo.service`:

   ```bash
   sudo curl https://raw.githubusercontent.com/SumoLogic/sumologic-otel-collector/main/examples/systemd/otelcol-sumo.service -o /etc/systemd/system/otelcol-sumo.service
   ```

   _Note: adjust memory configuration to your setup._

1. Enable autostart of the service:

   ```bash
   sudo systemctl enable otelcol-sumo
   ```

1. Start service and check status:

   ```bash
   sudo systemctl start otelcol-sumo
   sudo systemctl status otelcol-sumo  # checks status
   sudo journalctl -u otelcol-sumo  # checks logs
   ```

##### Using environmental variable to store installation token

We recommend to keep install token in environmental variable for Systemd installation:

1. Ensure that service file `/etc/systemd/system/otelcol-sumo.service` contains `EnvironmentFile=-/etc/otelcol-sumo/env/*.env`:

   ```shell
   $ sudo cat /etc/systemd/system/otelcol-sumo.service
   [Service]
   ...
   EnvironmentFile=-/etc/otelcol-sumo/env/*.env
   ```

1. Ensure that the `/etc/otelcol-sumo/env` directory exists:

   ```bash
   sudo mkdir -p /etc/otelcol-sumo/env
   ```

1. Create `/etc/otelcol-sumo/env/token.env` with your installation token, eg:

   ```text
   SUMOLOGIC_INSTALLATION_TOKEN=<your token>
   ```

   We use `SUMOLOGIC_INSTALLATION_TOKEN` in example, as it will be autoamtically used by recommended configuration.

1. Ensure that file has correct owner and permissions:

   ```bash
   sudo chmod 440 /etc/otelcol-sumo/env/token.env
   sudo chown otelcol-sumo:otelcol-sumo /etc/otelcol-sumo/env/token.env
   ```

1. Remove `install_token` overrides from `/etc/otelcol-sumo/conf.d/*.yaml`.
   You can find them using the following command:

   ```shell
   $ sudo grep -Rn install_token /etc/otelcol-sumo/conf.d
   /etc/otelcol-sumo/conf.d/common.yaml:3:    install_token: <some token>
   ```

1. Restart `otelcol-sumo` service:

   ```bash
   sudo systemctl restart otelcol-sumo
   ```

#### Running Binary Manually

If your system does not support Systemd, or you don't want to create a service, you can run Collector manually.

```bash
sudo otelcol-sumo --config=/etc/otelcol-sumo/sumologic.yaml --config "glob:/etc/otelcol-sumo/conf.d/*.yaml"
```

### UI Installation via App Catalog

1. Go to app catalog and select `Linux`

   <img src={useBaseUrl('img/send-data/opentelemetry-collector/app-catalog-linux.png')} alt="linux in app catalog" />

1. Select `Add New Collector` and click `Next`

   <img src={useBaseUrl('img/send-data/opentelemetry-collector/app-catalog-linux-collector.png')} alt="set up collector" />

1. Select installation token and customise your tags

   <img src={useBaseUrl('img/send-data/opentelemetry-collector/app-catalog-linux-register-collector.png')} alt="add new collector" />

1. Copy command and execute it in your system terminal

   <img src={useBaseUrl('img/send-data/opentelemetry-collector/linux-terminal-installation.png')} alt="execute command in terminal" />

1. Wait for installation to be completed

   <img src={useBaseUrl('img/send-data/opentelemetry-collector/app-catalog-linux-registration-success.png')} alt="application installed successfully" />

1. Read the prerequisite section

   <img src={useBaseUrl('img/send-data/opentelemetry-collector/app-catalog-linux-prerequisite.png')} alt="collector successfully registered" />

1. Customize source configuration, download it, place it in `/etc/otelcol-sumo/conf.d` and then restart collector

   <img src={useBaseUrl('img/send-data/opentelemetry-collector/app-catalog-linux-configure.png')} alt="source customisation" />

1. Wait for installation to be completed

   <img src={useBaseUrl('img/send-data/opentelemetry-collector/app-catalog-linux-success.png')} alt="application installed successfully" />

### Additional settings

This section describes common OpenTelemetry customisations:

* [Using Proxy](#using-proxy)
* [FIPS](#fips)

#### Using Proxy

ToDo: fix it for systemd

Exporters leverage the HTTP communication and respect the following proxy environment variables:

* `HTTP_PROXY`
* `HTTPS_PROXY`
* `NO_PROXY`

You may either export proxy environment variables locally e.g.

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

#### FIPS

To install FIPS compliant binary, you should add `--fips` switch to installation command, so it will look like the following:

```yaml
sudo curl -Ls https://github.com/SumoLogic/sumologic-otel-collector/releases/latest/download/install.sh | SUMOLOGIC_INSTALLATION_TOKEN="TOKEN" sudo -E bash -s -- --tag "host.group=default" --tag "deployment.environment=default" --fips && sudo otelcol-sumo --config=/etc/otelcol-sumo/sumologic.yaml --config "glob:/etc/otelcol-sumo/conf.d/*.yaml"
```

## Uninstall

The recommended way to uninstall the OpenTelemetry Collector depends on how you installed it.

### Install script

If you installed the Collector with the install script, you can use it to uninstall the Collector:

```bash
sudo curl -Ls https://github.com/SumoLogic/sumologic-otel-collector/releases/latest/download/install.sh | sudo -E bash -s -- -u -y
```

You can also use flag `-p` to remove all existing configurations as well:

```bash
sudo curl -Ls https://github.com/SumoLogic/sumologic-otel-collector/releases/latest/download/install.sh | sudo -E bash -s -- -u -y -p
```

### Manual step-by-step installation

If you installed the Collector manually, simply remove the binary from the directory you have placed it in:

```bash
sudo rm /usr/local/bin/otelcol-sumo
```

## Upgrading the collector

### Upgrade OpenTelemetry Collector

First, you have to upgrade the Collector's version. The way you should do it, depends on how you installed it.

#### Install script

Running install script will simply upgrade collector to the latest version:

```bash
sudo curl -Ls https://github.com/SumoLogic/sumologic-otel-collector/releases/latest/download/install.sh | sudo -E bash -s -- -u -y
```

:::note
You need to restart collector process manually in order to apply changes
:::

#### Manual step-by-step installation

If you installed the Collector manually, the simplest way to upgrade is to follow these steps:

* [Uninstall the Collector manually](#manual-step-by-step-installation-1)
* [Install the Collector again with a new version](#manual-step-by-step-installation)

### Update your config

After an upgrade, you should make sure that your config for OpenTelemetry Collector is up to date.

To see changes in upstream OpenTelemetry components, refer to the [core changelog](https://github.com/open-telemetry/opentelemetry-collector/releases) and [contrib changelog](https://github.com/open-telemetry/opentelemetry-collector-contrib/releases).

List of breaking changes specific to Sumo Logic distribution of OpenTelemetry Collector can be found [here](https://github.com/SumoLogic/sumologic-otel-collector/blob/main/docs/upgrading.md).

## Troubleshooting

Refer to [Troubleshooting and Faqs](/docs/send-data/opentelemetry-collector/troubleshooting-and-faqs/#installing-apps-errors)

[sumologic extension]: https://github.com/SumoLogic/sumologic-otel-collector/tree/main/pkg/extension/sumologicextension#configuration
[service file]: https://github.com/SumoLogic/sumologic-otel-collector/blob/main/examples/systemd/otelcol-sumo.service
