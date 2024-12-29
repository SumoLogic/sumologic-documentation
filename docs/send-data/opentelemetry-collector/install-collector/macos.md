---
id: macos
title: Install OpenTelemetry Collector on macOS
sidebar_label: macOS
description: Learn how to install the Sumo Logic OpenTelemetry Collector on macOS.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<img src={useBaseUrl('img/send-data/mac-logo.png')} alt="macOS" width="30"/>

Follow the steps in this topic to install or uninstall an OpenTelemetry Collector on macOS. See [OpenTelemetry Collector](/docs/send-data/opentelemetry-collector) for information on other operating systems.

## System requirements​

The Sumo Logic OpenTelemetry Collector is supported on both amd64 and arm64 architectures.

Minimal resource requirements are the following:

* 200 MB of disk space
* 64 MB of RAM

Versions Supported

* macOS 10.X and up

## Install

You can install our OpenTelemetry Collector using one of the following methods:

* [UI Installation](#ui-installation)
* [Install script](#install-script)
* [Manual step-by-step installation](#manual-step-by-step-installation)

### UI installation

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > OpenTelemetry Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic top menu select **Configuration**, and then under **Data Collection** select **OpenTelemetry Collection**. You can also click the **Go To...** menu at the top of the screen and select **OpenTelemetry Collection**. 
1. On the OpenTelemetry Collection page, click **Add Collector**.
1. On the left panel, select **macOS** as the platform.<br/> <img src={useBaseUrl('img/send-data/opentelemetry-collector/macOs.png')} alt="macOs-terminal" style={{border: '1px solid gray'}} width="900"/>
1. Select/create installation token and customize your tags.
1. (Optional) Select the **Auto Configure Host and Process metrics data collection** checkbox to collect host and process metrics.
1. Copy the command and execute it in your system terminal where the collector needs to be installed.<br/><img src={useBaseUrl('img/send-data/opentelemetry-collector/macos-terminal.png')} alt="execute command in terminal" />
1. Wait for the installation process to complete, then click **Next** to proceed.

### Install script

#### Get the Installation token

Get your [installation token](/docs/manage/security/installation-tokens) (if you do not have it already) and assign it to an environment variable:

```bash
export SUMOLOGIC_INSTALLATION_TOKEN=<TOKEN>
```

#### Run the installation script

You can run the script in two ways:

* By piping `curl` straight into `bash`:
   ```bash
   sudo curl -Ls https://github.com/SumoLogic/sumologic-otel-collector-packaging/releases/latest/download/install.sh | sudo -E bash -s -- --tag "host.group=default" --tag "deployment.environment=default" && sudo otelcol-sumo --config=/etc/otelcol-sumo/sumologic.yaml --config "glob:/etc/otelcol-sumo/conf.d/*.yaml"
   ```
* Or by first downloading the script, inspecting its contents for security, and then running it:
   ```bash
   curl -Lso install-otelcol-sumo.sh https://github.com/SumoLogic/sumologic-otel-collector-packaging/releases/latest/download/install.sh
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
| `--version`                 | `v`        | Version of Sumo Logic Distribution for OpenTelemetry Collector to install. By default, it gets latest version.                                                               | Yes (for example: `0.94.0-sumo-2`)  |
| `--skip-config`             | `s`        | Do not create default configuration        | No                         |
| `--skip-systemd`            | `d`        | Preserves from Systemd service installation.                                               | No        |
| `--fips`                    | `f`        | Install the FIPS-compliant binary. See [FIPS section](#fips) for more details.              | No                         |
| `--install-hostmetrics`     | `H`        | Install the hostmetrics configuration to collect host metrics.                         | No                         |
| `--yes`                     | `y`        | Disable confirmation asks.      | No                         |
| `--uninstall`               | `u`        | Removes Sumo Logic Distribution for OpenTelemetry Collector from the system and disable Systemd service eventually. Use with `--purge` to remove all configurations as well. | No                         |
| `--purge`                   | `p`        | It has to be used with `--uninstall`. It removes all Sumo Logic Distribution for OpenTelemetry Collector related configuration and data.                                     | No                         |
| `--help`                    | `h`        | Prints help and usage.                                                                                                                                                       | No                         |

The following env variables can be used along with your script:

| name                           | description        |
|:-------------------------------|:-------------------|
| `SUMOLOGIC_INSTALLATION_TOKEN` | Installation token |

### Manual step-by-step Installation

#### Step 1. Download the binary

Examples for OpenTelemetry Collector version `0.94.0-sumo-2`.

<Tabs
  className="unique-tabs"
  defaultValue="amd64 (x86-64)"
  values={[
    {label: 'amd64 (x86-64)', value: 'amd64 (x86-64)'},
    {label: 'arm64 (Apple Silicon)', value: 'arm64 (Apple Silicon)'},
  ]}>

<TabItem value="amd64 (x86-64)">

```bash
curl -sLo otelcol-sumo "https://github.com/SumoLogic/sumologic-otel-collector/releases/download/v0.94.0-sumo-2/otelcol-sumo-0.94.0-sumo-2-darwin_amd64"
```

</TabItem>
<TabItem value="arm64 (Apple Silicon)">

```bash
curl -sLo otelcol-sumo "https://github.com/SumoLogic/sumologic-otel-collector/releases/download/v0.94.0-sumo-2/otelcol-sumo-0.94.0-sumo-2-darwin_arm64"
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
sudo curl -Ls https://github.com/SumoLogic/sumologic-otel-collector-packaging/releases/latest/download/install.sh | sudo -E bash -s -- -u -y
```

You can also use flag `-p` to remove all existing configurations as well:

```bash
sudo curl -Ls https://github.com/SumoLogic/sumologic-otel-collector-packaging/releases/latest/download/install.sh | sudo -E bash -s -- -u -y -p
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
sudo curl -Ls https://github.com/SumoLogic/sumologic-otel-collector-packaging/releases/latest/download/install.sh | sudo bash
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

For general Sumo Logic OTel Collector troubleshooting, refer to [Troubleshooting](/docs/send-data/opentelemetry-collector/troubleshooting).

Here are some troubleshooting steps specific to macOS.

### uninstall.sh: No such file or directory error when uninstalling collector

If you're trying to uninstall the collector on macOS, and you see an error similar to the following:

```console
$ sudo curl -Ls https://github.com/SumoLogic/sumologic-otel-collector-packaging/releases/latest/download/install.sh | sudo -E bash -s -- -u -y -p
Detected OS type:	darwin
Detected architecture:	arm64
Going to uninstall otelcol-sumo.
main: line 785: /Library/Application Support/otelcol-sumo/uninstall.sh: No such file or directory
```

This means that you've installed the collector before the installation script was able to use packages in macOS.

To uninstall, use an older version of the installation script:

```shell
sudo curl -L https://github.com/SumoLogic/sumologic-otel-collector-packaging/releases/latest/download/install.sh | sudo -E bash -s -- --uninstall --purge --yes
```

The output should be similar to this:

```console
$ sudo curl -L https://github.com/SumoLogic/sumologic-otel-collector-packaging/releases/latest/download/install.sh | sudo -E bash -s -- --uninstall --purge --yes
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0
100 48284  100 48284    0     0  64169      0 --:--:-- --:--:-- --:--:-- 64169
Going to remove Otelcol binary, user, file storage and configurations.
Uninstallation completed
```

### Verify that the 'launchd' daemon has been installed

```console
$ sudo launchctl list | grep otelcol-sumo
54109	0	otelcol-sumo
```

### Verify that the 'launchd' daemon is running

```console
$ sudo launchctl print system/otelcol-sumo
system/otelcol-sumo = {
	active count = 1
	path = /Library/LaunchDaemons/com.sumologic.otelcol-sumo.plist
	type = LaunchDaemon
	state = running

	program = /usr/local/bin/otelcol-sumo
	arguments = {
		/usr/local/bin/otelcol-sumo
		--config
		/etc/otelcol-sumo/sumologic.yaml
		--config
		glob:/etc/otelcol-sumo/conf.d/*.yaml
	}

	stdout path = /var/log/otelcol-sumo/otelcol-sumo.log
	stderr path = /var/log/otelcol-sumo/otelcol-sumo.log
	default environment = {
		PATH => /usr/bin:/bin:/usr/sbin:/sbin
	}

	environment = {
		SUMOLOGIC_INSTALLATION_TOKEN=(redacted) =>
		XPC_SERVICE_NAME => otelcol-sumo
	}

	domain = system
	username = _otelcol-sumo
	group = _otelcol-sumo

	minimum runtime = 10
	exit timeout = 5
	runs = 1
	pid = 54109
	immediate reason = speculative
	forks = 2
	execs = 1
	initialized = 1
	trampolined = 1
	started suspended = 0
	proxy started suspended = 0
	last exit code = (never exited)

	spawn type = daemon (3)
	jetsam priority = 40
	jetsam memory limit (active) = (unlimited)
	jetsam memory limit (inactive) = (unlimited)
	jetsamproperties category = daemon
	submitted job. ignore execute allowed
	jetsam thread limit = 32
	cpumon = default
	probabilistic guard malloc policy = {
		activation rate = 1/1000
		sample rate = 1/0
	}

	properties = keepalive | runatload | inferred program
}
```

The output should include `active count = 1` and `state = running`. This means the daemon is running.

### Verify that the collector process is running

```shell
$ ps aux | grep '[o]telcol-sumo'
_otelcol-sumo    55368   0.0  0.2 409731808 125232   ??  Ss   12:25PM   0:00.21 /usr/local/bin/otelcol-sumo --config /etc/otelcol-sumo/sumologic.yaml --config glob:/etc/otelcol-sumo/conf.d/*.yaml
```

### View logs from the collector

```shell
cat /var/log/otelcol-sumo/otelcol-sumo.log
```

For more troubleshooting, refer to [Troubleshooting](/docs/send-data/opentelemetry-collector/troubleshooting).
