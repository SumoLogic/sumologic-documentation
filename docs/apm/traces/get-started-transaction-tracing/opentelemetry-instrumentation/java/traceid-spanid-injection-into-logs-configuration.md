---
id: traceid-spanid-injection-into-logs-configuration
title: Java TraceId and SpanId Injection into Logs Configuration
sidebar_label: TraceId and SpanId Injection into Logs Configuration
description: Learn how to configure traceId and spanId data injection into user logs in Java applications.
---

This page describes how to configure **spanId** and **traceId** data injection into user logs in Java applications.

## Log4j instrumentation

1. Add instrumented **Log4j2** and **OpenTelemetry-api** libraries into the project dependencies:
   * Maven projects
        ```xml
        <dependencies>
            <dependency>
                <groupId>io.opentelemetry.instrumentation</groupId>
                <artifactId>opentelemetry-log4j-context-data-2.17-autoconfigure</artifactId>
                <version>2.6.0-alpha</version>
                <scope>runtime</scope>
            </dependency>
        </dependencies>
        ```
   * Gradle projects  
        ```gradle
        dependencies {
            runtimeOnly("io.opentelemetry.instrumentation:opentelemetry-log4j-context-data-2.17-autoconfigure:2.6.0-alpha")
        }
        ```
1. Update the **log4j2.xml** configuration file, typically stored in **resources** directory, with `traceId`, `spanId`, and `sampled` keys. The following is an example configuration.
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <Configuration status="WARN">
        <Appenders>
            <Console name="Console" target="SYSTEM_OUT">
                <PatternLayout pattern="%d{HH:mm:ss.SSS} [%t] %-5level %logger{36} traceId: %X{trace_id} spanId: %X{span_id} - %msg%n" />
            </Console>
        </Appenders>
        <Loggers>
            <Root level="All" >
                <AppenderRef ref="Console"/>
            </Root>
        </Loggers>
    </Configuration>
    ```

## Logback instrumentation

1. Add instrumented **logback** library into the project dependencies:
   * Maven projects  
        ```xml
        <dependencies>
            <dependency>
                <groupId>io.opentelemetry.instrumentation</groupId>
                <artifactId>opentelemetry-logback-mdc-1.0</artifactId>
                <version>2.6.0-alpha</version>
                <scope>runtime</scope>
            </dependency>
        </dependencies>
        ```
   * Gradle projects
        ```gradle
        dependencies {
            runtimeOnly("io.opentelemetry.instrumentation:opentelemetry-logback-mdc-1.0:2.6.0-alpha")
        }
        ```
1. Update the **logback.xml** configuration file, typically stored in the **resources** directory, with `traceId`, `spanId`, and `sampled` keys. The following is an example configuration.
    ```xml
    <?xml version="1.0" encoding="UTF-8" ?>
    <configuration>
        <appender name="STDOUT" class="ch.qos.logback.core.ConsoleAppender">
            <encoder>
                <pattern><![CDATA[%date{HH:mm:ss.SSS} [%thread] %-5level %logger{15}#%line %X{req.requestURI} traceId: %X{trace_id} spanId: %X{span_id} %msg\n]]></pattern>
            </encoder>
        </appender>

        <appender name="OTEL" class="io.opentelemetry.instrumentation.logback.v1_0.OpenTelemetryAppender">
            <appender-ref ref="STDOUT" />
        </appender>

        <root>
            <level value="DEBUG" />
            <appender-ref ref="STDOUT" />
        </root>

    </configuration>
    ```

:::note
For more details, refer to the [Logger MDC auto-instrumentation](https://github.com/open-telemetry/opentelemetry-java-instrumentation/blob/release/v2.6.x/docs/logger-mdc-instrumentation.md).
:::
