---
id: sumo-logic-opentelemetry-vs-opentelemetry-upstream-relationship
title: Sumo Logic OpenTelemetry vs OpenTelemetry Upstream Relationship
sidebar_label: Sumo Logic OpenTelemetry vs OpenTelemetry Upstream Relationship
description: Learn about Sumo Logic OpenTelemetry vs OpenTelemetry Upstream Relationship
---

This document explains the purpose of the Sumo Logic Distribution for OpenTelemetry Collector, why we offer an alternative distribution of the OpenTelemetry Collector, and our approach to versioning and handling breaking changes.

The Sumo Logic Distribution for OpenTelemetry Collector is the OpenTelemetry Collector with addition of Sumo Logic specific changes. Our aim is to extend and not to replace the OpenTelemetry Collector. Releasing our own distribution allows us to:
* Include Sumo Logic platform-specific features
* Provide a easier user experience by having a tigher integration between the collector and SumoLogic SaaS service
* Provide better customer support
* Bypass the OpenTelemetry release schedule for critical bug fixes
* Provide various installation methods
* Quickly respond to customer needs
* Offer use case oriented documentation


We work closely with the OpenTelemetry community in order to improve overall experience by:
* Attending SIG meetings
* Creating issues in upstream if we find a bug or have a feature request
* Issuing pull requests in upstream with bug fixes and features


## Versioning policy

The Sumo Logic Distribution for OpenTelemetry Collector version numbers are based on the upstream OpenTelemetry Collector version numbers.
For example, the `v0.47.0-sumo-0` version is based on `v0.47.0` of the OpenTelemetry Collector core and `contrib` packages.

To avoid confusion, we will add its specific features when updating the OpenTelemetry Collector version. We release our distribution up to a week after the OpenTelemetry Collector is released every two weeks. If there are critical fixes in our code, we will provide a version with the same base as the OpenTelemetry Collector, but with a changed suffix such as `v0.47.0-sumo-1`.

## Breaking changes policy

Since the OpenTelemetry Collector is updated frequently, there may be breaking changes between releases that we inherit in the Sumo Logic Distribution for OpenTelemetry Collector. We follow the same policy, so minor updates may also contain breaking changes. Therefore, it's important to read the release notes carefully before upgrading to a new version.
