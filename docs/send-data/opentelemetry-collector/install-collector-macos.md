---
id: install-collector-macos
title: Installing Collector on macOS
sidebar_label: Install Collector on macOS
description: Learn how to install the Sumo Logic OpenTelemetry Collector on macOS.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Follow the steps in this topic to install or uninstall an OpenTelemetry Collector on macOS. See [OpenTelemetry Collector](/docs/send-data/opentelemetry-collector) for information on other operating systems.

## System Requirements​

The Sumo Logic OpenTelemetry Collector is supported on both amd64 and arm64 architectures.

Minimal resource requirements are the following:

* 200 MB of disk space
* 64 MB of RAM

Versions Supported

* macOS 10.X and up

## Install

You can install our OpenTelemetry Collector using one of the following methods:

* [Install script](#install-script)
* [UI Installation via App Catalog](#ui-installation-via-app-catalog)
* [Manual step-by-step installation](#manual-step-by-step-installation)

### Install Script

#### Get the Installation token

Get your [installation token](/docs/manage/security/installation-tokens) (if you don't have it already) and assign it to an environment variable:

```bash
export SUMOLOGIC_INSTALLATION_TOKEN=<TOKEN>
```

#### Run the installation script

You can run the script in two ways:

* By piping `curl` straight into `bash`:
   ```bash
   sudo curl -s https://github.com/SumoLogic/sumologic-otel-collector/releases/latest/download/install.sh | sudo -E bash -s -- --tag "host.group=default" --tag "deployment.environment=default" && sudo otelcol-sumo --config=/etc/otelcol-sumo/sumologic.yaml --config "glob:/etc/otelcol-sumo/conf.d/*.yaml"
   ```
* Or by first downloading the script, inspecting its contents for security, and then running it:
   ```bash
   curl -Lso install-otelcol-sumo.sh https://github.com/SumoLogic/sumologic-otel-collector/releases/latest/download/install.sh
   sudo -E bash ./install-otelcol-sumo.sh -d
   ```

The `-E` argument to `sudo` is needed to preserve the `SUMOLOGIC_INSTALLATION_TOKEN` environment variable in `sudo` session.

The `-d` argument to the script is needed on macOS. It will skip Systemd installation, which is not supported on macOS.

It will perform the following operations:

* Install or upgrade operation by placing the latest version as `/usr/local/bin/otelcol-sumo`
* Get [static configuration](https://github.com/SumoLogic/sumologic-otel-collector/blob/main/examples/sumologic.yaml) and place it as `/etc/otelcol-sumo/sumologic.yaml`
* Create user configuration directory (`/etc/otelcol-sumo/conf.d`) with `common.yaml` file which will contain installation token

#### Script Options

The following arguments can be passed to the script:

| long name    | short name | description   | takes value   |
|:----------|:-----------|:------------|:---------------|
| `--skip-installation-token` | `k`        | Skips requirement for installation token. This option do not disable default configuration creation.           | No      |
| `--tag`                     | `t`        | Sets tag for collector. This argument can be use multiple times. One per tag.               | Yes, in `key=value` format |
| `--download-only`           | `w`        | Download new binary only and skip configuration part.                                       | No                         |
| `--version`                 | `v`        | Version of Sumo Logic Distribution for OpenTelemetry Collector to install. By default, it gets latest version.                                                               | Yes (for example: `0.71.0-sumo-0`)  |
| `--skip-config`             | `s`        | Do not create default configuration        | No                         |
| `--skip-systemd`            | `d`        | Preserves from Systemd service installation.                                               | No        |
| `--fips`                    | `f`        | Install the FIPS-compliant binary. See [FIPS section](#fips) for more details.              | No                         |
| `--install-hostmetrics`     | `H`        | Install the hostmetrics configuration to collect host metrics.                         | No                         |
| `--yes`                     | `y`        | Disable confirmation asks.      | No                         |
| `--uninstall`               | `u`        | Removes Sumo Logic Distribution for OpenTelemetry Collector from the system and disable Systemd service eventually. Use with `--purge` to remove all configurations as well. | No                         |
| `--purge`                   | `p`        | It has to be used with `--uninstall`. It removes all Sumo Logic Distribution for OpenTelemetry Collector related configuration and data.                                     | No                         |
| `--help`                    | `h`        | Prints help and usage.                                                                                                                                                       | No                         |

The following env variables can be used along with script:

| name                           | description        |
|:-------------------------------|:-------------------|
| `SUMOLOGIC_INSTALLATION_TOKEN` | Installation token |

### UI Installation via App Catalog

1. From the **App Catalog** and select **macOS - OpenTelemetry application**.<br/> <img src={useBaseUrl('img/send-data/opentelemetry-collector/app-catalog-mac-os.png')} alt="macOS in app catalog" width="350" />
1. Click **Install App** for your first installation, or **View Details**, then **More Actions** and finally **Add another Host** for next installation.<br/> <img src={useBaseUrl('img/send-data/opentelemetry-collector/app-catalog-macos-overview.png')} alt="macOS app overview" width="550" />
1. Select **Add New Collector** and click **Next**.<br/> <img src={useBaseUrl('img/send-data/opentelemetry-collector/app-catalog-macos-set-up-collector.png')} alt="set up collector" />
1. Select installation token and customize your tags.<br/> <img src={useBaseUrl('img/send-data/opentelemetry-collector/app-catalog-macos-add-new-collector.png')} alt="add new collector" />
1. Copy command and execute it in your system terminal.<br/><img src={useBaseUrl('img/send-data/opentelemetry-collector/macos-terminal.png')} alt="execute command in terminal" />
1. Wait for installation to be completed.<br/> <img src={useBaseUrl('img/send-data/opentelemetry-collector/app-catalog-macos-success-registration.png')} alt="collector successfully registered" />
1. Customize source configuration, download it, place it in `/etc/otelcol-sumo/conf.d` and then restart collector manually.<br/> <img src={useBaseUrl('img/send-data/opentelemetry-collector/app-catalog-macos-source-creation.png')} alt="source customization" />
1. Wait for finishing the installation.<br/> <img src={useBaseUrl('img/send-data/opentelemetry-collector/app-catalog-macos-success-installation.png')} alt="application installed successfully" />

### Manual step-by-step Installation

#### Step 1. Download the binary

Examples for OpenTelemetry Collector version `0.73.0-sumo-0`.

<Tabs
  className="unique-tabs"
  defaultValue="amd64 (x86-64)"
  values={[
    {label: 'amd64 (x86-64)', value: 'amd64 (x86-64)'},
    {label: 'arm64 (Apple Silicon)', value: 'arm64 (Apple Silicon)'},
  ]}>

<TabItem value="amd64 (x86-64)">

```bash
curl -sLo otelcol-sumo "https://github.com/SumoLogic/sumologic-otel-collector/releases/download/v0.73.0-sumo-0/otelcol-sumo-0.73.0-sumo-0-darwin_amd64"
```

</TabItem>
<TabItem value="arm64 (Apple Silicon)">

```bash
curl -sLo otelcol-sumo "https://github.com/SumoLogic/sumologic-otel-collector/releases/download/v0.73.0-sumo-0/otelcol-sumo-0.73.0-sumo-0-darwin_arm64"
```


</TabItem>
</Tabs>

#### Step 2. Move the binary to your `PATH` environment

Move the downloaded binary into a directory from your `PATH` environment so that it can be used by simply invoking `otelcol-sumo`.

```bash
chmod +x otelcol-sumo
sudo mv otelcol-sumo /usr/local/bin/otelcol-sumo
```

#### Step 3. Verify the Installation

To verify installation, run the OpenTelemetry Collector.

```bash
otelcol-sumo --version
```

#### Step 4. Running Binary

As for now, we do not support installation of OpenTelemetry Collector as service for macOS. It needs to be run manually.

```bash
sudo otelcol-sumo --config=/etc/otelcol-sumo/sumologic.yaml --config "glob:/etc/otelcol-sumo/conf.d/*.yaml"
```

### Additional settings

This section describes common OpenTelemetry customizations.

#### Using Proxy

Exporters leverage the HTTP communication and respect the following proxy environment variables:

* `HTTP_PROXY`
* `HTTPS_PROXY`
* `NO_PROXY`

You can either export proxy environment variables locally, e.g.

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

```bash
export NO_PROXY=sumologic.com
```

#### FIPS

We currently do not build FIPS binary for macOS. Refer to [BoringCrypto and FIPS compliance](https://github.com/SumoLogic/sumologic-otel-collector/blob/main/docs/fips.md) in our repository for more details.

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

You can also run the following command to clear the cache. This will remove any cached data associated with the Collector. 

```bash
sudo rm -rf /var/cache/otelcol-sumo
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
You'll need to restart the collector process manually in order to apply changes.
:::

#### Manual step-by-step installation

If you installed the Collector manually, the simplest way to upgrade is to follow these steps:

* [Uninstall the Collector manually](#manual-step-by-step-installation-1)
* [Install the Collector again with a new version](#manual-step-by-step-installation)

### Update your config

After an upgrade, you should make sure that your config for OpenTelemetry Collector is up to date.

To see changes in upstream OpenTelemetry components, refer to the [core changelog](https://github.com/open-telemetry/opentelemetry-collector/releases) and [contrib changelog](https://github.com/open-telemetry/opentelemetry-collector-contrib/releases).

List of breaking changes specific to Sumo Logic Distribution of OpenTelemetry Collector can be found [here](https://github.com/SumoLogic/sumologic-otel-collector/blob/main/docs/upgrading.md).

## Troubleshooting

For information on troubleshooting and solutions, refer to [Troubleshooting and FAQ](/docs/send-data/opentelemetry-collector/troubleshooting-faq).
