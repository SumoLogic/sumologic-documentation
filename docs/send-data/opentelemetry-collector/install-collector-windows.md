---
id: install-collector-windows
title: Installing Collector on Windows
sidebar_label: Install Collector on Windows
description: Learn how to install Collector
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Follow the steps in this topic to install or uninstall an OpenTelemetry Collector on Windows. See [OpenTelemetry Collector](/docs/send-data/opentelemetry-collector) for information on other operating systems.

## System Requirements

Minimal resource requirements are the following:

* 200 MB of disk space
* 64 MB of RAM

Supported Versions

* Windows 10 and up, Windows Server 2016 and up

## Install

You can install our OpenTelemetry Collector using either of the following methods:

* [UI Installation](#ui-installation)
* [Install script](#install-script)
* [Manual step-by-step installation](#manual-step-by-step-installation)

### UI Installation

1. In Sumo Logic, select **Manage Data** > **Collection** > **OpenTelemetry Collection**.
1. On the OpenTelemetry Collection page, click **Add Collector**.
1. On the left panel select **Windows** as the platform.<br/> <img src={useBaseUrl('img/send-data/opentelemetry-collector/windows.png')} alt="widows-terminal" style={{border: '1px solid black'}} width="900"/>
1. Select/create installation token and customize your tags.
1. (Optional) Select the **Auto Configure Host and Process metrics data collection** checkbox to collect host and process metrics.
1. Copy command and execute it in the powershell where the collector needs to be installed.<br/><img src={useBaseUrl('img/send-data/opentelemetry-collector/windows-ui-install-6.png')} alt="windows-ui-installation-6.png" width="900" />
1. Wait for the installation process to complete, then click **Next** to proceed.

### Install Script

A single line installation powered by Install Script.

#### Get the Installation Token

Get your [installation token](/docs/manage/security/installation-tokens) if you don't have it already. We are going to refer to this token as `<TOKEN>` in next streps.

#### Run Installation Script

Run the following command in the same PowerShell window, replacing `<TOKEN>` with your token from previous step:

```sh
Set-ExecutionPolicy RemoteSigned -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; $uri = "https://raw.githubusercontent.com/SumoLogic/sumologic-otel-collector/main/scripts/install.ps1"; $path="${env:TEMP}\install.ps1"; (New-Object System.Net.WebClient).DownloadFile($uri, $path); . $path -InstallationToken "<TOKEN>" -Tags @{"host.group" = "default"; "deployment.environment" = "default"}
```

The script is going to perform the following operations:

* Install or upgrade operation by placing the latest version as `C:\Program Files\Sumo Logic\OpenTelemetry Collector\bin`
* Get [static configuration](https://github.com/SumoLogic/sumologic-otel-collector/blob/main/examples/sumologic.yaml) and place it as `C:\ProgramData\Sumo Logic\OpenTelemetry Collector\config\sumologic.yaml`
* Create user configuration directory (`C:\ProgramData\Sumo Logic\OpenTelemetry Collector\config\conf.d`) with `common.yaml` file which will contain installation token
* Create `OtelcolSumo` (`Sumo Logic OpenTelemetry Collector`) service

#### Script Options

| Name           | Description      | Takes Value          |
|:---------------|:----------------|:-------------|
| `-InstallationToken` | Installation token      | Yes       |
| `-Tags`         | Sets tags for collector. This argument should be a map. | Yes, for example `@{"host.group" = "default"; "deployment.environment" = "default"}` |
| `-InstallHostMetrics` | Installs the hostmetrics configuration to collect host metrics. The default is `$False`. | Yes, for example: `-InstallHostMetrics $True` or `-InstallHostMetrics $False`. |

### Manual Step-by-Step Installation

1. Go to the [latest release documentation](https://github.com/SumoLogic/sumologic-otel-collector/releases/latest).
2. Download `otelcol-sumo_x.y.z.0_en-US.x64.msi` from the `Assets` section.<br/> <img src={useBaseUrl('img/send-data/opentelemetry-collector/windows-installation.png')} alt="windows-installation.png" width="450" />
3. Run Installer.<br/><img src={useBaseUrl('img/send-data/opentelemetry-collector/windows-installation-1.png')} alt="windows-installation-1.png" width="450" />
4. Read and accept End-User License Agreement.<br/> <img src={useBaseUrl('img/send-data/opentelemetry-collector/windows-installation-2.png')} alt="windows-installation-2.png" width="450" />
5. Select binary destination.<br/><img src={useBaseUrl('img/send-data/opentelemetry-collector/windows-installation-3.png')} alt="windows-installation-3.png" width="450" />
6. Set Installation Token and Tags properties.<br/> <img src={useBaseUrl('img/send-data/opentelemetry-collector/windows-installation-4.png')} alt="windows-installation-4.png" width="450" />
7. Click **Install** to begin installation.<br/> <img src={useBaseUrl('img/send-data/opentelemetry-collector/windows-installation-5.png')} alt="windows-installation-5.png" width="450" />
8. Wait for installation to be completed.<br/><img src={useBaseUrl('img/send-data/opentelemetry-collector/windows-installation-6.png')} alt="windows-stallation-6.png" width="450" />
9. You can modify configuration, which should be placed in `C:\ProgramData\Sumo Logic\OpenTelemetry Collector\config` directory.
   :::note
   `C:\ProgramData` directory is hidden by default.
   :::

### Verify the Installation

Run the following command in PowerShell:

```sh
> Get-Service OtelcolSumo

Status   Name               DisplayName
------   ----               -----------
Running  OtelcolSumo        Sumo Logic OpenTelemetry Collector
```
Alternatively, you can open `Services.msc` and check whether Sumo Logic OTel Collector Service is running or not.

## Additional Settings

This section describes common OpenTelemetry customizations.

#### Using Proxy

Exporters leverage the HTTP communication and respect the following proxy environment variables:

* `HTTP_PROXY`
* `HTTPS_PROXY`
* `NO_PROXY`

You can set it by adding the following properties to Windows Registry key `HKLM:\SYSTEM\CurrentControlSet\Services\OtelcolSumo\Environment`:

```text
FTP_PROXY=<PROXY-ADDRESS>:<PROXY-PORT>
HTTP_PROXY=<PROXY-ADDRESS>:<PROXY-PORT>
HTTPS_PROXY=<PROXY-ADDRESS>:<PROXY-PORT>
```

To exclude a specific domain or IP address from using the proxy, you can add it to the `NO_PROXY` environment variable. For example, to exclude the domain `sumologic.com` from using the proxy, you can add the following line:

```text
NO_PROXY=sumologic.com
```

:::info
Restart `Sumo Logic OpenTelemetry Collector` (`OtelcolSumo`) service to apply the changes.
:::

#### FIPS

We currently do not build FIPS binary for Windows.

Refer to [BoringCrypto and FIPS compliance](https://github.com/SumoLogic/sumologic-otel-collector/blob/main/docs/fips.md) in our repository for more details.

### Uninstall

1. Go to **Add or remove programs**.<br/> <img src={useBaseUrl('img/send-data/opentelemetry-collector/windows-uninstall-1.png')} alt="windows-uninstallation-1.png" width="550" />
1. Find **OpenTelemetry Collector** and click **Uninstall**.<br/>  <img src={useBaseUrl('img/send-data/opentelemetry-collector/windows-uninstall-2.png')} alt="windows-uninstallation-2.png" width="550" />
1. Confirm the uninstallation.<br/>  <img src={useBaseUrl('img/send-data/opentelemetry-collector/windows-uninstall-3.png')} alt="windows-uninstallation-3.png" width="350" />

## Upgrading the Collector

To upgrade the collector perform installation step and it will automatically upgrade the binary in-place.

## Troubleshooting

### Cannot restart service during Installation

If you get the following output while restarting the service:

```shell
> Restart-Service -Name OtelcolSumo
Restart-Service : Service 'Sumo Logic OpenTelemetry Collector (OtelcolSumo)' cannot be stopped due to the following
error: Cannot open OtelcolSumo service on computer '.'.
At line:1 char:1
+ Restart-Service -Name OtelcolSumo
+ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : CloseError: (System.ServiceProcess.ServiceController:ServiceController) [Restart-Service
   ], ServiceCommandException
    + FullyQualifiedErrorId : CouldNotStopService,Microsoft.PowerShell.Commands.RestartServiceCommand
```

Ensure that you run **PowerShell** as an Administrator.

For information on troubleshooting and solutions, refer to the [Troubleshooting](/docs/send-data/opentelemetry-collector/troubleshooting).
