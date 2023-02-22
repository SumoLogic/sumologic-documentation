---
id: installation
title: Installation
---

You can run the Sumo Logic Distribution for OpenTelemetry Collector using either the binary file (available in our GitHub releases) or
the container images (stored in the [AWS Public ECR](https://gallery.ecr.aws/sumologic/sumologic-otel-collector)).

## Standalone

Sumo Logic Distribution for OpenTelemetry Collector is a static Go binary. To run it as a standalone process, you only need to run the binary file downloaded from
GitHub releases with an appropriate configuration.

### Installation using script

1. Get your installation token, if you don't have it already, and assign it to environment variable:

   ```bash
   export SUMOLOGIC_INSTALLATION_TOKEN=<TOKEN>
   ```

1. Run installation script:

    Either by piping `curl` straight into `bash`:

    ```bash
    curl -s https://raw.githubusercontent.com/SumoLogic/sumologic-otel-collector/main/scripts/install.sh | sudo -E bash -s
    ```

    or by first downloading the script, inspecting its contents for security, and then running it:

   ```bash
   curl -o install-otelcol-sumo.sh https://raw.githubusercontent.com/SumoLogic/sumologic-otel-collector/main/scripts/install.sh
   sudo -E bash ./install-otelcol-sumo.sh
   ```

   The `-E` argument to `sudo` is needed to preserve the `SUMOLOGIC_INSTALLATION_TOKEN` environment variable in `sudo` session.

    It is going to perform the following operations:

      - install or upgrade operation by placing the latest version as `/usr/local/bin/otelcol-sumo`,
      - get [static configuration](https://github.com/SumoLogic/sumologic-otel-collector/blob/main/sumologic.yaml) and place it as `/etc/otelcol-sumo/sumologic.yaml`
      - create user configuration directory (`/etc/otelcol-sumo/conf.d`) with `common.yaml` file which will contain installation token
      - for Systemd:

        - the script is going to get [Systemd service configuration](https://github.com/SumoLogic/sumologic-otel-collector/blob/main/systemd/otelcol-sumo.service) and place it as `/etc/systemd/system/otelcol-sumo.service`
        - create a `otelcol-sumo` user and group which will be used to run the service
        - enable `otelcol-sumo` service
        - start `otelcol-sumo` service
