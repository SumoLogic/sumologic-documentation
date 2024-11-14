---
title: November 15, 2024 - Application Update
keywords:
  - sumo logic
  - cloud soar
  - automation service
image: https://help.sumologic.com/img/sumo-square.png
hide_table_of_contents: true
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<a href="https://help.sumologic.com/release-notes-csoar/rss.xml"><img src={useBaseUrl('img/release-notes/rss-orange2.png')} alt="icon" width="50"/></a>

### Changes and Enhancements

#### Platform

* Playbooks
   * Improvement - Disabled Cartesian Product flag on all new nodes by default.

#### Automation Bridge

We are happy to announce a new version of the [Automation Bridge](/docs/platform-services/automation-service/automation-service-bridge/) that includes security fixes in various components of the Bridge.

* New CentOS version
    * The CentOS docker image version has been upgraded from CentOS 7 to CentOS 8.
* Security fixes to the following Golang packages:
    * http://github.com/docker/docker 
    * http://golang.org/x/net 
    * http://github.com/docker/distribution 
* Security fixes to the following Golang docker images:
    * http://github.com/docker/docker 
    * http://google.golang.org/grpc 
    * http://go.opentelemetry.io/contrib/instrumentation/net/http/otelhttp 
    * http://go.opentelemetry.io/contrib/instrumentation/net/http/httptrace/otelhttptrace 
    * http://golang.org/x/net 
    * http://go.opentelemetry.io/contrib/instrumentation/google.golang.org/grpc/otelgrpc 
    * http://github.com/opencontainers/runc 
    * http://google.golang.org/protobuf 
    * http://golang.org/x/crypto 
* Security fixes in the following Ubuntu 20.04 and CentOS 8 docker images:
    * libssl3
    * libcrypto3
    * openssh-client-default
    * openssh-keygen
    * openssh-client-common
    * busybox
    * busybox-binsh
    * ssl_client

### Bug Fixes

* Playbooks
   * Fixed Playbook nodes rendering issue on Safari browser.
   * Fixed issue related to use of underscore within playbooks input fields.
   * Fixed issue with using authorizer value from playbook input variables in user choice node.
* Integrations
   * Resolved an issue where the 'Close Insight' trigger action was not functioning as expected.
* Incidents
   * Improved Incident templates page load time.
   * Fixed issues while trying to update Incident templates.