---
id: install-collector-on-windows
title: Installing Collector on Windows
sidebar_label: Install Collector on Windows
description: Learn how to install Collector
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Follow the steps in this topic to install or uninstall an OpenTelemetry Collector on macOS. See [OpenTelemetry Collector](/docs/send-data/opentelemetry-collector) for information on other operating systems.

## System Requirements

TODO - add some info about system and hardware


## Install

You can install our OpenTelemetry Collector using either of the following methods:

* [Install script](#install-script)
* [Manual step-by-step installation](#manual-step-by-step-installation)

### Install Script

A single line installation powered by Install Script.

#### Get the Installation Token

Get your [installation token](https://help.sumologic.com/docs/manage/security/installation-tokens) if you don't have it already and assign it to environment variable.

```bash
export SUMOLOGIC_INSTALLATION_TOKEN=<TOKEN>
```

#### Run Installation Script

You can run the script in two ways:

* by piping `curl` straight into `bash`:

```bash
curl -s https://raw.githubusercontent.com/SumoLogic/sumologic-otel-collector/main/scripts/install.sh | sudo -E bash -s
```

* by first downloading the script, inspecting its contents for security, and then running it.

```bash
curl -o install-otelcol-sumo.sh https://raw.githubusercontent.com/SumoLogic/sumologic-otel-collector/main/scripts/install.sh`sudo -E bash ./install-otelcol-sumo.sh`
```

The `-E` argument to sudo is needed to preserve the `SUMOLOGIC_INSTALLATION_TOKEN` environment variable in `sudo` session. It is going to perform the following operations:
* install or upgrade operation by placing the latest version as `/usr/local/bin/otelcol-sumo`
* get [static configuration](https://github.com/SumoLogic/sumologic-otel-collector/blob/main/examples/sumologic.yaml) and place it as `/etc/otelcol-sumo/sumologic.yaml`
* create user configuration directory (`/etc/otelcol-sumo/conf.d`) with `common.yaml` file which will contain installation token
* configure Systemd:
  * the script will retrieve the [Systemd service configuration](https://github.com/SumoLogic/sumologic-otel-collector/blob/main/examples/systemd/otelcol-sumo.service) and place it as `/etc/systemd/system/otelcol-sumo.service`
  * create a `otelcol-sumo` user and group which will be used to run the service
  * enable `otelcol-sumo` service
  * start `otelcol-sumo` service

#### Script Options

| Long Name                       | Short Name | Description                                                                                                  | Takes Value                  |
|--------------------------------|------------|--------------------------------------------------------------------------------------------------------------|------------------------------|
| --skip-installation-token      | k          | Skips requirement for installation token. This option does not disable default configuration creation.       | no                           |
| --tag                          | t          | Sets tag for collector. This argument can be used multiple times. One per tag.                               | yes, in key=value format     |
| --download-only                | w          | Download new binary only and skip configuration part.                                                        | no                           |
| --version                      | v          | Version of Sumo Logic Distribution for OpenTelemetry Collector to install. By default, it gets the latest version. | yes, e.g. 0.71.0-sumo-0      |
| --skip-config                  | s          | Do not create default configuration.                                                                          | no                           |
| --skip-systemd                 | d          | Preserves from Systemd service installation.                                                                  | no                           |
| --fips                         | f          | Install the FIPS-compliant binary. See [this document](https://github.com/SumoLogic/sumologic-otel-collector/blob/main/docs/fips.md) for more details.                                        | no                           |
| --install-hostmetrics          | H          | Install the hostmetrics configuration to collect host metrics.                                               | no                           |
| --yes                          | y          | Disable confirmation asks.                                                                                    | no                           |
| --uninstall                    | u          | Removes Sumo Logic Distribution for OpenTelemetry Collector from the system and disables Systemd service eventually. Use with --purge to remove all configurations as well. | no                           |
| --purge                        | p          | It has to be used with --uninstall. It removes all Sumo Logic Distribution for OpenTelemetry Collector related configuration and data.                      | no                           |
| --help                         | h          | Prints help and usage.                                                                                        |                              |

The following env variables can be used along with script:

| Name                          | Description                          |
|-------------------------------|--------------------------------------|
| `SUMOLOGIC_INSTALLATION_TOKEN`  | Installation token                   |

### Manual Step-by-Step Installation

1. Go to the [latest release documentation](https://github.com/SumoLogic/sumologic-otel-collector/releases/tag/v0.73.0-sumo-1).
2. Download `otelcol-sumo_x.y.z.0_en-US.x64.msi` from the `Assets` section. <br/><img src={useBaseUrl('img/send-data/windows-installation.png')} alt="windows-installation.png" width="550" />
3. Run Installer.
4. Read and accept End-User License Agreement.
5. Select binary destination.
6. Set Installation Token and Tags properties.
7. Click Install to begin installation.
8. Wait for installation to be completed.
9. You can modify configuration, which should be placed in `C:\ProgramData\Sumo Logic\OpenTelemetry Collector\config` directory.

  `C:\ProgramData` directory is hidden by default.


### Verify the Installation

TODO

### UI Installation via App Catalog

TODO

## Additional Settings

TODO

#### Using Proxy

TODO

#### FIPS

TODO

### Uninstall

The recommended way to uninstall the OpenTelemetry Collector depends on how you installed it.

### Install Script

If you installed the Collector with the install script, you can use it to uninstall the Collector.

```bash
sudo bash ./install.sh -u
```

You can also use flag `-p` to remove all existing configurations as well.

```bash
sudo bash ./install.sh -u -p
```

### Manual Step-by-Step Installation

If you installed the Collector manually, simply remove the binary from the directory you have placed it in:

```bash
sudo rm /usr/local/bin/otelcol-sumo
```

## Upgrading the Collector

### Upgrade OpenTelemetry Collector

First, you have to upgrade the Collector's version. The way you should do it, depends on how you installed it.

#### Install Script

If you installed the Collector with the install script, you can use it to upgrade the Collector by using `-w` flag:

```bash
sudo bash ./install.sh -w -v 0.73.0-sumo-1
```
#### Manual Step-by-Step Installation

If you installed the Collector manually, the simplest way to upgrade is to follow these steps:

- [Uninstall the Collector manually](#manual-step-by-step-installation-1)
- [Install the Collector again with a new version](#manual-step-by-step-installation)

## Troubleshooting specific to Windows

TODO

#### Script options
