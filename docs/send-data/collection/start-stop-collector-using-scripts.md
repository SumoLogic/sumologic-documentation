---
id: start-stop-collector-using-scripts
title: Start or Stop a Collector using Scripts
description: Use scripts used to start, stop, and check the status of the collector process (Linux/Unix) and service (Windows).
---


Sumo Logic collectors start automatically at system startup. The Sumo Logic collector installation directory comes with a set of scripts used to start, stop, and check the status of the collector process (Linux/Unix) and service (Windows).

Manually restarting or stopping a Sumo Logic collector requires root (Mac and Linux) or Administrator (Windows) privileges.

## Linux/Unix and Mac

To start, stop, or check the status of the collector, run one of the following commands from the collector installation directory.

* `sudo ./collector start`
* `sudo ./collector stop`
* `sudo ./collector status`
* `sudo ./collector restart`

## Windows

Use these commands to install, start, or stop the collector as a service, respectively.

* `InstallCollector-NT.bat`
* `startCollectorService.bat`
* `stopCollectorService.bat`

You can start and stop the collector with a Windows NET.EXE command since the collector runs as a Windows service.

* `net start sumo-collector`
* `net stop sumo-collector`
