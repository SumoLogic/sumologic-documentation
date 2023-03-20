---
id: install-collector-on-windows
title: Installing Collector on Windows
sidebar_label: Install Collector on Windows
description: Learn how to install Collector
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Follow the steps in this topic to install or uninstall an OpenTelemetry Collector on macOS. See [OpenTelemetry Collector](/docs/send-data/opentelemetry-collector) for information on other operating systems.

## System Requirements

Minimal resource requirements are the following:

* 200 MB of disk space
* 64 MB of RAM

## Install

You can install our OpenTelemetry Collector using either of the following methods:

* [Install script](#install-script)
* [Manual step-by-step installation](#manual-step-by-step-installation)
* [UI Installation via App Catalog](#ui-installation-via-app-catalog)

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

* install or upgrade operation by placing the latest version as `C:\Program Files\Sumo Logic\OpenTelemetry Collector\bin`
* get [static configuration](https://github.com/SumoLogic/sumologic-otel-collector/blob/main/examples/sumologic.yaml) and place it as `C:\ProgramData\Sumo Logic\OpenTelemetry Collector\config\sumologic.yaml`
* create user configuration directory (`C:\ProgramData\Sumo Logic\OpenTelemetry Collector\config\conf.d`) with `common.yaml` file which will contain installation token
* create `OtelcolSumo` (`Sumo Logic OpenTelemetry Collector`) service

#### Script Options

| Name               | Description                            | Takes Value                                               |
|:-------------------|:-----------------------------------------|:-------------------------------------|
| -InstallationToken | Installation token                                      | yes                                                                                  |
| -Tags              | Sets tags for collector. This argument should be a map. | yes, for example `@{"host.group" = "default"; "deployment.environment" = "default"}` |

### Manual Step-by-Step Installation

1. Go to the [latest release documentation](https://github.com/SumoLogic/sumologic-otel-collector/releases/latest).
2. Download `otelcol-sumo_x.y.z.0_en-US.x64.msi` from the `Assets` section.

   <img src={useBaseUrl('img/send-data/opentelemetry-collector/windows-installation.png')} alt="windows-installation.png" width="550" />

3. Run Installer.

   <img src={useBaseUrl('img/send-data/opentelemetry-collector/windows-installation-1.png')} alt="windows-installation-1.png" width="550" />

4. Read and accept End-User License Agreement.

   <img src={useBaseUrl('img/send-data/opentelemetry-collector/windows-installation-2.png')} alt="windows-installation-2.png" width="550" />

5. Select binary destination.

   <img src={useBaseUrl('img/send-data/opentelemetry-collector/windows-installation-3.png')} alt="windows-installation-3.png" width="550" />

6. Set Installation Token and Tags properties.

   <img src={useBaseUrl('img/send-data/opentelemetry-collector/windows-installation-4.png')} alt="windows-installation-4.png" width="550" />

7. Click Install to begin installation.

   <img src={useBaseUrl('img/send-data/opentelemetry-collector/windows-installation-5.png')} alt="windows-installation-5.png" width="550" />

8. Wait for installation to be completed.

   <img src={useBaseUrl('img/send-data/opentelemetry-collector/windows-installation-6.png')} alt="windows-installation-6.png" width="550" />

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

### UI Installation via App Catalog

1. Go to **App Catalog** and  select **find Windows 2012+ - OpenTelemetry**.<br/> <img src={useBaseUrl('img/send-data/opentelemetry-collector/windows-ui-install-1.png')} alt="windows-ui-installation-1.png" width="550" />
1. Click **Install App**.<br/>  <img src={useBaseUrl('img/send-data/opentelemetry-collector/windows-ui-install-2.png')} alt="windows-ui-installation-2.png" width="550" />
1. Select **Add New Collector** and click **Next**.<br/><img src={useBaseUrl('img/send-data/opentelemetry-collector/windows-ui-install-3.png')} alt="windows-ui-installation-3.png" width="550" />
1. Select the installation token and customize your tags.<br/> <img src={useBaseUrl('img/send-data/opentelemetry-collector/windows-ui-install-4.png')} alt="windows-ui-installation-4.png" width="550" />
1. Open Powershell.<br/><img src={useBaseUrl('img/send-data/opentelemetry-collector/windows-ui-install-5.png')} alt="windows-ui-installation-5.png" width="550" />
1. Copy the installation command to PowerShell, run it, and click **Next** after the successful installation.<br/><img src={useBaseUrl('img/send-data/opentelemetry-collector/windows-ui-install-6.png')} alt="windows-ui-installation-6.png" width="550" />
1. Customize the configuration, download it, and save it in the desired location.<br/><img src={useBaseUrl('img/send-data/opentelemetry-collector/windows-ui-install-7.png')} alt="windows-ui-installation-7.png" width="550" />
1. Open **Powershell** as an Administrator and restart the service by running this command.<br/> <img src={useBaseUrl('img/send-data/opentelemetry-collector/windows-ui-install-8.png')} alt="windows-ui-installation-8.png" width="550" />
1. Wait for the dashboards to be installed and for data to be ingested into Sumo Logic.<br/>  <img src={useBaseUrl('img/send-data/opentelemetry-collector/windows-ui-install-9.png')} alt="windows-ui-installation-9.png" width="550" />

## Additional Settings

This section describes common OpenTelemetry customisations:

* [Using Proxy](#using-proxy)
* [FIPS](#fips)

#### Using Proxy

TODO: how to set PROXY env for windows service?

#### FIPS

We currently do not build FIPS binary for Windows.

### Uninstall

1. Go to **add or remove programs**.<br/>   <img src={useBaseUrl('img/send-data/opentelemetry-collector/windows-uninstall-1.png')} alt="windows-uninstallation-1.png" width="550" />
1. Find `OpenTelemetry Collector` and click `Uninstall`.<br/>  <img src={useBaseUrl('img/send-data/opentelemetry-collector/windows-uninstall-2.png')} alt="windows-uninstallation-2.png" width="550" />
1. Confirm the uninstallation.<br/>  <img src={useBaseUrl('img/send-data/opentelemetry-collector/windows-uninstall-3.png')} alt="windows-uninstallation-3.png" width="550" />

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

### More Troubleshooting

To know more about troubleshooting and solutions, refer to the [Troubleshooting and Faqs](/docs/send-data/opentelemetry-collector/troubleshooting-and-faqs/#installing-apps-errors).
