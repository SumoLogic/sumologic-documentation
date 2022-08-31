---
id: install-syslog-ng
title: Install syslog-ng
---



Syslog-ng is an open source log management daemon, providing implementation of the syslog protocol for Unix and Unix-like systems. You can install syslog-ng for Source log management. See [Cloud Syslog Source](/docs/send-data/sources/hosted-collectors/cloud-syslog-source) for more information about configuring a Cloud Syslog Source for syslog-ng.

**Check OS version on System:**  

```bash
$ lsb_release -a
No LSB modules are available.
Distributor ID:    Ubuntu
Description:    Ubuntu 18.04.2 LTS
Release:    18.04
Codename:    bionic
```

**Install syslog-ng on Ubuntu:**

```bash
$ sudo apt-get install syslog-ng -y
```  

or 

```bash
$ apt-get install syslog-ng syslog-ng-core
```

**Install using yum:**  

```bash
$ yum install syslog-ng
```

**Install using Amazon EC2 Linux:**

Remove the rsyslog that came with EC2 and then install syslog-ng.  

```bash
$ sudo rpm -e --nodeps rsyslog
$ sudo yum install --enablerepo=epel syslog-ng
$ sudo yum install --enablerepo=epel syslog-ng-libdbi
$ sudo /etc/init.d/syslog-ng start
```

**Verify installed version of syslog-ng:**  

```bash
$ syslog-ng --version
syslog-ng 3 (3.13.2)
Config version: 3.13
```

**Verify your syslog-ng server is running properly:**

These commands should return success messages.   

```bash
$ service syslog-ng status
$ sudo systemctl status syslog-ng.service
$ journalctl -xe
```

## Troubleshooting

If you receive the error message **Unable to locate package syslog-ng** while installing a syslog-ng server on Ubuntu run the following commands and then try installing syslog-ng again.   

```bash
$ sudo apt update
$ sudo apt upgrade
```
