---
id: custom-tags-configuration
title: Custom Tags Configuration
description: Custom tags configuration for Java OpenTelemetry Instrumentation.
---

## Custom tags configuration via startup parameter

You can use the `OTEL_RESOURCE_ATTRIBUTES=` startup parameter to pass a custom static tag to all spans generated in the service. For example:

```bash
OTEL_RESOURCE_ATTRIBUTES="service.name=Accounts"
OTEL_RESOURCE_ATTRIBUTES="application=OnlineBanking,exampleKey=exampleValue"
```

Add the `deployment.environment=[environment-name]` tag as needed to allow for filtering by environment on dashboard panels. For more information, see [Add services panel to dashboard](/docs/apm/services-list-map/#add-services-panel-to-dashboard).

## Custom tags configuration through your code

If the default tags are not providing enough relevant data, you can add custom tags or attributes into spans. Follow these steps:

### Step 1: Satisfy project dependencies

Add the [opentelemetry-sdk](https://mvnrepository.com/artifact/io.opentelemetry/opentelemetry-sdk/1.40.0) library.

* Maven projects
    ```xml
    <!-- https://mvnrepository.com/artifact/io.opentelemetry/opentelemetry-sdk -->
    <dependency>
        <groupId>io.opentelemetry</groupId>
        <artifactId>opentelemetry-sdk</artifactId>
        <version>1.40.0</version>
    </dependency>
    ```
* Gradle projects
    ```
    dependencies {
        compile 'io.opentelemetry:opentelemetry-sdk:1.40.0'
    }
    ```

### Step 2: Import dependencies

Import dependencies in the application Java class file:

```java
import io.opentelemetry.api.trace.Span;
```

### Step 3: Add custom tag into Span

Use the following to add a custom tag:

```java
Span currentSpan = Span.current();
currentSpan.setAttribute("foo","bar");
```
