---
id: custom-tags-configuration
title: Custom tags configuration
sidebar_label: Custom tags configuration
description: Custom tags configuration for Java OpenTelemetry Instrumentation.
---

## Custom tags configuration via startup parameter

You can use `OTEL_RESOURCE_ATTRIBUTES=` startup parameter to pass a custom static tag to all spans generated in the service. For example:

```bash
OTEL_RESOURCE_ATTRIBUTES="service.name=Accounts"
OTEL_RESOURCE_ATTRIBUTES="application=OnlineBanking,exampleKey=exampleValue"
```

## Custom tags configuration through your code

If the default tags are not providing enough relevant data you can add custom tags or attributes into spans. Follow these steps:

## Step 1: Satisfy project dependencies

Add the [opentelemetry-sdk](https://mvnrepository.com/artifact/io.opentelemetry/opentelemetry-sdk/1.26.0) library.

* Maven projects

    ```
    <!-- https://mvnrepository.com/artifact/io.opentelemetry/opentelemetry-sdk -->
    <dependency>
        <groupId>io.opentelemetry</groupId>
        <artifactId>opentelemetry-sdk</artifactId>
        <version>1.26.0</version>
    </dependency>
    ```

* Gradle projects

    ```
    dependencies {
    compile 'io.opentelemetry:opentelemetry-sdk:1.26.0'
    }
    ```

## Step 2: Import dependencies

Import dependencies in the application Java class file:

```java
import io.opentelemetry.api.trace.Span;
```

## Step 3: Add custom tag into Span

Use the following to add a custom tag:

```
Span currentSpan = Span.current();
currentSpan.setAttribute("foo","bar");
```
