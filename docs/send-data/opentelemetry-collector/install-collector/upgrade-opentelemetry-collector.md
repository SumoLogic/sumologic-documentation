---
id: upgrade-opentelemetry-collector
title: Upgrade OpenTelemetry Collector
sidebar_label: Upgrade OpenTelemetry Collector
---

import useBaseUrl from '@docusaurus/useBaseUrl';

To ensure you have the latest features, security patches, and performance improvements, it's recommended to keep your Sumo Logic OpenTelemetry collector up to date.

Below are the commands and steps to upgrade the collector depending on your operating system.

## Step 1. Upgrade to the latest version

### RPM-based Systems (RHEL, CentOS, Amazon Linux, etc.)

Run the following command to upgrade to the latest version:

`yum update otelcol-sumo`

On RPM-based systems, use the yum package manager to update the existing otelcol-sumo package to the latest available version. This command checks for updates in your configured repositories and installs the latest release.

### Debian-based Systems (Ubuntu, Debian, etc.)

Run the following command to upgrade to the latest version:

`apt-get update --quiet && apt-get install otelcol-sumo --only-upgrade`

For Debian-based systems, the command first updates the package lists quietly, then upgrades only the otelcol-sumo package (without reinstalling or affecting other packages). This ensures your collector is updated to the latest version from the official repository.

### Windows

Run the following command to upgrade to the latest version:

```
Set-ExecutionPolicy RemoteSigned -Scope Process -Force
[System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072
$uri = "https://download-otel.sumologic.com/latest/download/install.ps1"
$path="${env:TEMP}\install.ps1"
(New-Object System.Net.WebClient).DownloadFile($uri, $path)
. $path -InstallationToken "<TOKEN>"
```
Important points:
- Windows installations require an installation token. Replace `<TOKEN>` with your valid Sumo Logic installation token.
- The script automatically downloads and installs (or upgrades) the latest version of the collector.
- Ensure PowerShell is being run with administrative privileges.

### macOS

Run the following command to upgrade to the latest version:

`sudo curl -sL https://download-otel.sumologic.com/latest/download/install.sh | sudo bash`

Running the installation script again on macOS will automatically detect any existing installation and upgrade the collector to the latest release. Ensure you have sudo privileges to perform the upgrade.

### FIPS-Enabled Package Upgrades

For systems using **FIPS-enabled packages**, the upgrade process differs by operating system.

#### RPM-based Systems (FIPS)

Run the following command to upgrade to the latest FIPS-compliant version:

`yum update otelcol-sumo-fips`

#### Debian-based Systems (FIPS)

Run the following command to upgrade to the latest FIPS-compliant version:

`apt-get update --quiet && apt-get install otelcol-sumo-fips --only-upgrade`

For Linux systems, FIPS packages use the otelcol-sumo-fips package name instead of otelcol-sumo.

#### Windows (FIPS)

Run the following command to upgrade to the latest FIPS-compliant version:

```
Set-ExecutionPolicy RemoteSigned -Scope Process -Force
[System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072
$uri = "https://download-otel.sumologic.com/latest/download/install.ps1"
$path="${env:TEMP}\install.ps1"
(New-Object System.Net.WebClient).DownloadFile($uri, $path)
. $path -InstallationToken "<TOKEN>" -Fips $True
```

**Important Points**:

- Add the `-Fips $True` parameter to install/upgrade the FIPS-compliant binary.
- FIPS binaries only work on Windows systems with FIPS mode enabled.
- An installation token is required.

#### macOS (FIPS)

FIPS binaries are not available for macOS. Standard upgrade procedures apply.

## Step 2. Restart the collector process

After upgrading, it's important to restart the collector process to apply any changes from the new version.

`sudo systemctl restart otelcol-sumo`

:::note
Systems using different process managers use the appropriate service restart command.
:::

## Step 3. Verify the version upgrade

To confirm the upgrade completed successfully, check the installed version:

`otelcol-sumo --version`

You can also verify the collector's running state:

`sudo systemctl status otelcol-sumo`

### Additional recommendations:
- Always review release notes before upgrading to understand new features, bug fixes, or breaking changes.
- Consider testing upgrades in a staging environment before applying to production.
- Keep a backup of your configuration files (`/etc/otelcol-sumo/config.yaml`) before performing upgrades.