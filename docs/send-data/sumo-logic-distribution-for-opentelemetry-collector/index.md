---
slug: /send-data/sumo-logic-distribution-for-opentelemetry-collector
title: Sumo Logic Distribution for OpenTelemetry Collector
description: Use our Sumo Logic Distribution for OpenTelemetry to send data to Sumo Logic.
---

import DocCardList from '@theme/DocCardList';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

OpenTelemetry is the future of agent-based collection for Sumo Logic and the Sumo Logic Distribution for OpenTelemetry Collector is our next generation collector built on OpenTelemetry. It provides a single unified agent to send Logs, Metrics, Traces, and Metadata for Observability to Sumo Logic.

You can also see the [OT Distro GitHub repository](https://github.com/SumoLogic/sumologic-otel-collector#readme) for detailed instructions on how to configure and migrate your existing collection.

:::tip
Instrument your applications with OpenTelemetry using our [OpenTelemetry Libraries](/docs/apm/traces/get-started-transaction-tracing/opentelemetry-instrumentation).
:::


import Iframe from 'react-iframe';

:::sumo Micro Lesson
Introducing OpenTelemetry.

<Iframe url="https://www.youtube.com/embed/XLgCW0WYN5Q?rel=0"
        width="854px"
        height="480px"
        id="myId"
        className="video-container"
        display="initial"
        position="relative"
        allow="accelerometer; autoplay=1; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        />

:::

<!--
In this section, we'll introduce the following concepts:

<DocCardList items={useCurrentSidebarCategory().items}/>
-->

- [Installation](/docs/send-data/sumo-logic-distribution-for-opentelemetry-collector/installation)
- [Configuration](/docs/send-data/sumo-logic-distribution-for-opentelemetry-collector/configuration)
- [Migration from Installed Collector](/docs/send-data/sumo-logic-distribution-for-opentelemetry-collector/migration)
- [Differences between Installed Collector and OpenTelemetry Collector](/docs/send-data/sumo-logic-distribution-for-opentelemetry-collector/comparison)
- [Performance](/docs/send-data/sumo-logic-distribution-for-opentelemetry-collector/performance)
- [Best Practices](/docs/send-data/sumo-logic-distribution-for-opentelemetry-collector/best-practices)
- [Mapping OpenTelemetry concepts to Sumo Logic](/docs/send-data/sumo-logic-distribution-for-opentelemetry-collector/opentelemetry-concepts)
- [FIPS compliance](/docs/send-data/sumo-logic-distribution-for-opentelemetry-collector/fips)
- [Known Issues](/docs/send-data/sumo-logic-distribution-for-opentelemetry-collector/known-issues)
- [Troubleshooting](/docs/send-data/sumo-logic-distribution-for-opentelemetry-collector/troubleshooting)
- [Purpose of Sumo Logic Distribution for OpenTelemetry Collector](/docs/send-data/sumo-logic-distribution-for-opentelemetry-collector/upstream-relation#purpose-of-sumo-logic-distribution-for-opentelemetry-collector)
- [Versioning policy](/docs/send-data/sumo-logic-distribution-for-opentelemetry-collector/upstream-relation#versioning-policy)
- [Breaking changes policy](/docs/send-data/sumo-logic-distribution-for-opentelemetry-collector/upstream-relation#breaking-changes-policy)
