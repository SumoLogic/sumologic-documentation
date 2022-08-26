---
id: start-stop-collector-using-scripts
title: Start or Stop a Collector using Scripts
---

#

Sumo Logic Collectors start automatically at system startup. The Sumo Logic Collector installation directory comes with a set of scripts used to start, stop, and check the status of the Collector process (Linux/Unix) and service (Windows).

Manually restarting or stopping a Sumo Logic Collector requires root (Mac and Linux) or Administrator (Windows) privileges.

## Linux/Unix and Mac

To start, stop, or check the status of the Collector, run one of the following commands from the Collector installation directory.

* `sudo ./collector start`
* `sudo ./collector stop`
* `sudo ./collector status`
* `sudo ./collector restart`

## Windows

Use these commands to install, start, or stop the Collector as a service, respectively.

* `InstallCollector-NT.bat`
* `startCollectorService.bat`
* `stopCollectorService.bat`

You can start and stop the Collector with a Windows NET.EXE command since the Collector runs as a Windows service.

* `net start sumo-collector`
* `net stop sumo-collector`
