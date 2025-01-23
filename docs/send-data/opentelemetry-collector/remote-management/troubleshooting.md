---
id: troubleshooting
title: Troubleshooting
description: Learn about common troubleshooting scenarios of Sumo Logic OpenTelemetry collector remote management.
---

This document contains common troubleshooting scenarios about the Sumo Logic OpenTelemetry collector remote management.

## Source template specific issues

### Docker: Path Permission Denied

#### Error message

`
Error: failed to setup configuration components: cannot start pipelines: permission denied while trying to connect to the Docker daemon socket at unix:///cav/run/docker.sock: Get "http://****>
collector server run finished with error: failed to setup configuration components: cannot start pipelines: permission denied while trying to connect to the Docker daemon soc>
`

#### Solution

1. Ensure that you have satisfied the [Docker source template pre-requisites](/docs/send-data/opentelemetry-collector/remote-management/source-templates/docker/#prerequisites).
1. Restart the agent.

### Windows: Failed to apply OpAMP agent remote config

#### Error message

`
Failed to start service: invalid configuration: no receiver configuration specified in config
`

#### Solution

1. Make sure that you have selected the **Event Channels/Scrappers** sub-options for the source template config.
1. Delete the invalid configuration from machine path `/etc/otelcol-sumo/opamp.d` for Linux/Mac operating system or `C:\ProgramData\Sumo Logic\OpenTelemetry Collector\config\opamp.d` for Windows operating system.
1. Update the invalid inputs, delete invalid configuration source templates, or unlink the agent from UI.
1. Restart the agent.

### Apache: Missing hostname / Invalid hostname

#### Error message

`
Failed to apply OpAMP agent remote config   {"kind": "extension", "name": "opamp", "error": "cannot save the OpAMP effective config to /etc/otelcol-sumo/opamp.d: cannot validate config: receivers::apache/ce121f50-***nha-aidn: missing hostname: 'localhost'"}
`

#### Solution

1. Ensure that you have satisfied the [Apache source template pre-requisites](/docs/send-data/opentelemetry-collector/remote-management/source-templates/apache/#prerequisites).
1. Delete the invalid configuration from machine path `/etc/otelcol-sumo/opamp.d` for Linux/Mac operating system or `C:\ProgramData\Sumo Logic\OpenTelemetry Collector\config\opamp.d` for Windows operating system.
1. Update the invalid inputs, delete invalid configuration source templates, or unlink the agent from UI.
1. Restart the agent.

### Syslog: Failed to listen on interface

#### Error message

`
Jan 17 11:34:14 ip-***-***-***-*** otelcol-sumo.sh[1234]: Error: failed to setup configuration components: cannot start pipelines: start stanza: failed to listen on interface: failed to configure tcp listener: listen tcp 0.0.0.0:***: bind: permission denied
Jan 17 11:34:14 ip-***-***-***-*** otelcol-sumo.sh[1234]: 2025/01/17 11:34:14 collector server run finished with error: failed to setup configuration components: cannot start pipelines: start stanza: failed to listen on interface: failed to configure tcp listener: listen tcp 0.0.0.0:***: bind: permission denied
`

#### Solution

1. Delete the invalid configuration from machine path `/etc/otelcol-sumo/opamp.d` for Linux/Mac operating system or `C:\ProgramData\Sumo Logic\OpenTelemetry Collector\config\opamp.d` for Windows operating system.
1. Update the invalid inputs (Ensure that valid ports have the right permissions), delete invalid configuration source templates, or unlink the agent from UI.
1. Restart the agent.

## Agent disconnected from opamp server

#### Error message

`
Agent Health Warning on UI : agent disconnected from opamp server. 
`

#### Solution

- Restart the agent.

## Failed to apply OpAMP agent remote config

#### Error messages

Error message 1:

`
Failed to apply OpAMP agent remote config        {"kind": "extension", "name": "opamp", "error": "cannot save the OpAMP effective config to /etc/otelcol-sumo/opamp.d: cannot validate config: processors::filter/logs/5c4f1d86-7946-4174-952f-bb52f016d2cd: unable to parse OTTL condition \"IsMatch(body, \\\"~!@#$%^&*()_+{}|:\\\\\\\"<>?/.,';\\\\\\\\][=-`\\\")\": couldn't create function: the pattern supplied to IsMatch is not a valid regexp pattern: error parsing regexp: missing closing ]: [=-``"}
`

Error message 2:

`
collector server run finished with error: failed to setup configuration components: failed to build pipelines: failed to create "filelog/8ee0d9e8-92cf-46c8-97be-764c67e59a83" receiver for data type "logs": compile line end regex: error parsing regexp: unexpected
`

#### Solution

1. Ensure the rules comply with [RE2 syntax](https://github.com/google/re2/wiki/Syntax). 
1. Delete the invalid configuration from machine path `/etc/otelcol-sumo/opamp.d` for Linux/Mac operating system or `C:\ProgramData\Sumo Logic\OpenTelemetry Collector\config\opamp.d` for Windows operating system.
1. Update the invalid inputs, delete invalid configuration source templates, or unlink the agent from UI. For example, replace the invalid regex with valid regex.

## Agent crashes completely

If there is a runtime error that leads the agent crash unexpectedly, follow the below steps to rectify the issue:

1. Delete the invalid configuration from machine path `/etc/otelcol-sumo/opamp.d` for Linux/Mac operating system or `C:\ProgramData\Sumo Logic\OpenTelemetry Collector\config\opamp.d` for Windows operating system.
1. Update the invalid inputs, delete invalid configuration source templates, or unlink the agent from UI.
1. Restart the agent.

## Agent stuck in the config processing loop

If the agent repeatedly fails to process the effective configuration, it will be unable to perform any other operations, including sending heartbeat signals to the server. The server may interpret the absence of these heartbeats as an indication that the agent is offline, which can complicate recovery efforts. To resolve this issue, follow the below-mentioned steps:

1. Delete the invalid configuration from machine path `/etc/otelcol-sumo/opamp.d` for Linux/Mac operating system or `C:\ProgramData\Sumo Logic\OpenTelemetry Collector\config\opamp.d` for Windows operating system.
1. Update the invalid inputs, delete invalid configuration source templates, or unlink the agent from the user interface.
1. Restart the agent.

##  Agent sends failure response to the server

If the agent attempts to apply the effective configuration but encounters errors, such as incompatible or invalid configuration parameters, it will send a failure response to the Opamp server to indicate the problem. This issue, however, disrupts data ingestion and leads to service interruptions. To resolve this, you can update the invalid inputs, delete any invalid configuration source templates, or unlink the agent from the UI.
