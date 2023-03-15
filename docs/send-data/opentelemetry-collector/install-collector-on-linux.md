---
id: install-collector-on-linux
title: Installing Collector on Linux
sidebar_label: Install Collector on Linux
description: Learn how to install Collector
---

Follow the steps in this topic to install or uninstall a collector on Linux. See [Installed Collectors](/docs/send-data/opentelemetry-distro-collector) for information on other OSs.

## System Requirements

* Linux, major distributions 64-bit, both x86 and ARM architectures
* Single core, 512MB RAM
* 8GB disk space

## Install a collector on Linux

Choose one of these methods to install the Collector:

* [UI Installation via App Catalog](#ui-installation)
* [Installation using script](#install-using-script)
* [Manual installation](#manual-insallation)

<!-- After installing Collectors, you can configure Sources from Sumo Logic or by providing the [Source settings in a JSON file](/docs/send-data/use-json-configure-sources). If you're using a UTF-8 encoded JSON file, you must provide the file before starting the collector. The JSON file needs to be UTF-8 encoded. -->

### UI Installation via App Catalog

### Installation using Installation Script

1. Get your [installation token] if you don't have it already and assign it to environment variable:

   ```bash
   export SUMOLOGIC_INSTALLATION_TOKEN=<TOKEN>
   ```

1. Run installation script:

   Either by piping `curl` straight into `bash`:

   ```bash
   curl -Ls https://github.com/SumoLogic/sumologic-otel-collector/releases/latest/download/install.sh | sudo -E bash -s
   ```

   or by first downloading the script, inspecting its contents for security, and then running it:

   ```bash
   curl -Lo install-otelcol-sumo.sh https://github.com/SumoLogic/sumologic-otel-collector/releases/latest/download/install.sh
   sudo -E bash ./install-otelcol-sumo.sh
   ```

   The `-E` argument to `sudo` is needed to preserve the `SUMOLOGIC_INSTALLATION_TOKEN` environment variable in `sudo` session.

   It is going to perform the following operations:

   * install or upgrade operation by placing the latest version as `/usr/local/bin/otelcol-sumo`,
   * get [static configuration] and place it as `/etc/otelcol-sumo/sumologic.yaml`
   * create user configuration directory (`/etc/otelcol-sumo/conf.d`) with `common.yaml` file which will contain installation token
   * for Systemd:

     * the script is going to get [Systemd service configuration] and place it as `/etc/systemd/system/otelcol-sumo.service`
     * create a `otelcol-sumo` user and group which will be used to run the service
     * enable `otelcol-sumo` service
     * start `otelcol-sumo` service

[installation token]: https://help.sumologic.com/docs/manage/security/installation-tokens
[static configuration]: https://github.com/SumoLogic/sumologic-otel-collector/blob/main/examples/sumologic.yaml
[systemd service configuration]: https://github.com/SumoLogic/sumologic-otel-collector/blob/main/examples/systemd/otelcol-sumo.service

### Manual installation
