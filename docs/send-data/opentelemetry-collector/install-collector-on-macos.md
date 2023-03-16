---
id: install-collector-on-macos
title: Installing Collector on macOS
sidebar_label: Install Collector on macOS
description: Learn how to install Collector
---

Follow the steps in this topic to install or uninstall an OpenTelemetry Collector on macOS. See [OpenTelemetry Collector](/docs/send-data/opentelemetry-collector) for information on other operating systems.

## System Requirements​

TODO - add some info about system and hardware

The Sumo Logic OpenTelemetry Collector is supported on both amd64 and arm64 architectures.

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
   sudo curl -Ls https://github.com/SumoLogic/sumologic-otel-collector/releases/latest/download/install.sh | sudo -E bash -s -- -d
   ```

* by first downloading the script, inspecting its contents for security, and then running it:

   ```bash
   curl -Lso install-otelcol-sumo.sh https://github.com/SumoLogic/sumologic-otel-collector/releases/latest/download/install.sh
   sudo -E bash ./install-otelcol-sumo.sh -d
   ```

The `-E` argument to `sudo` is needed to preserve the `SUMOLOGIC_INSTALLATION_TOKEN` environment variable in `sudo` session.

The `-d` argument to the script is needed on macOS. It will skip Systemd installation, which is not supported on macOS.

It is going to perform the following operations:

* install or upgrade operation by placing the latest version as `/usr/local/bin/otelcol-sumo`,
* get [static configuration](https://github.com/SumoLogic/sumologic-otel-collector/blob/main/examples/sumologic.yaml) and place it as `/etc/otelcol-sumo/sumologic.yaml`
* create user configuration directory (`/etc/otelcol-sumo/conf.d`) with `common.yaml` file which will contain installation token

#### Script options

The following arguments can be passed to the script:

| long name                        | short name | description                                                                                                                                                                  | takes value                |
|----------------------------------|------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------|
| `--skip-installation-token`      | `k`        | Skips requirement for installation token. This option do not disable default configuration creation.                                                                         | no                         |
| `--tag`                          | `t`        | Sets tag for collector. This argument can be use multiple times. One per tag.                                                                                                | yes, in `key=value` format |
| `--download-only`                | `w`        | Download new binary only and skip configuration part.                                                                                                                        | no                         |
| `--version`                      | `v`        | Version of Sumo Logic Distribution for OpenTelemetry Collector to install. By default, it gets latest version.                                                                 | yes, e.g. `0.71.0-sumo-0`  |
| `--skip-config`                  | `s`        | Do not create default configuration                                                                                                                                          | no                         |
| `--skip-systemd` | `d`        | Preserves from Systemd service installation.                                                                                                                                 | no                         |
| `--fips`                          | `f`        | Install the FIPS-compliant binary. See [this document](https://github.com/SumoLogic/sumologic-otel-collector/blob/main/docs/fips.md) for more details.                                                                                                                                                  | no                         |
| `--install-hostmetrics`          | `H`        | Install the hostmetrics configuration to collect host metrics.                                                                                                               | no                         |
| `--yes`                          | `y`        | Disable confirmation asks.                                                                                                                                                   | no                         |
| `--uninstall`                    | `u`        | Removes Sumo Logic Distribution for OpenTelemetry Collector from the system and disable Systemd service eventually. Use with `--purge` to remove all configurations as well. | no                         |
| `--purge`                        | `p`        | It has to be used with `--uninstall`. It removes all Sumo Logic Distribution for OpenTelemetry Collector related configuration and data.                                     | no                         |
| `--help`                         | `h`        | Prints help and usage.                                                                                                                                                       | no                         |

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

##### arm64 (Apple Silicon)

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

#### Running Binary

As for now we do not support installation of OpenTelemetry Collector as service for macOS. It needs to be run manually.

```bash
sudo otelcol-sumo --config=/etc/otelcol-sumo/sumologic.yaml --config "glob:/etc/otelcol-sumo/conf.d/*.yaml"
```

### UI Installation via App Catalog

1. Go to app catalog and select `macOS - OpenTelemetry application`

![macOS in app catalog](/static/img/send-data/opentelemetry-collector/app-catalog-mac-os.png)

1. Select `Add New Collector` and click `Next`

![set up collector](/static/img/send-data/opentelemetry-collector/app-catalog-macos-set-up-collector.png)

1. Select installation token and customise your tags

![add new collector](/static/img/send-data/opentelemetry-collector/app-catalog-macos-add-new-collector.png)

1. Copy command and execute it in your system terminal

![execute command in terminal](/static/img/send-data/opentelemetry-collector/macos-terminal.png)

1. Wait for installation to be completed

![collector successfuly registered](/static/img/send-data/opentelemetry-collector/app-catalog-macos-success-registration.png)

1. Customize source configuration, download it, place it in `/etc/otelcol-sumo/conf.d` and then restart collector manually

![source customisation](/static/img/send-data/opentelemetry-collector/app-catalog-macos-source-creation.png)

1. Wait for finishing the installation

![application installed successfuly](/static/img/send-data/opentelemetry-collector/app-catalog-macos-success-installation.png)

### Additional settings

This section describes common customer customisations:

* [Using Proxy](#using-proxy)
* [FIPS](#fips)

#### Using Proxy

Exporters leverage the HTTP communication and respect the following proxy environment variables:

* `HTTP_PROXY`
* `HTTPS_PROXY`
* `NO_PROXY`

You may either export proxy environment variables locally e.g.

```bash
export NO_PROXY=<ADDRESS>:<PORT>
export HTTP_PROXY=<PROXY-ADDRESS>:<PROXY-PORT>
export HTTPS_PROXY=<PROXY-ADDRESS>:<PROXY-PORT>
```

or make them available globally for all users, e.g.

```bash
tee -a /etc/profile << END
export NO_PROXY=<ADDRESS>:<PORT>
export HTTP_PROXY=<PROXY-ADDRESS>:<PROXY-PORT>
export HTTPS_PROXY=<PROXY-ADDRESS>:<PROXY-PORT>
END
```

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

:::Note
You need to restart collector process manually in order to apply changes
"""

#### Manual step-by-step installation

If you installed the Collector manually, the simplest way to upgrade is to follow these steps:

* [Uninstall the Collector manually](#manual-step-by-step-installation-1)
* [Install the Collector again with a new version](#manual-step-by-step-installation)

### Update your config

After an upgrade, you should make sure that your config for OpenTelemetry Collector is up to date.

To see changes in upstream OpenTelemetry components, refer to the [core changelog](https://github.com/open-telemetry/opentelemetry-collector/releases) and [contrib changelog](https://github.com/open-telemetry/opentelemetry-collector-contrib/releases).

List of breaking changes specific to Sumo Logic distribution of OpenTelemetry Collector can be found [here](https://github.com/SumoLogic/sumologic-otel-collector/blob/main/docs/upgrading.md).

## Troubleshooting specific to macOS

TODO
