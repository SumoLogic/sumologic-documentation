---
id: traceid-spanid-injection-into-logs-configuration
title: TraceId and SpanId injection into logs configuration
sidebar_label: TraceId and SpanId injection into logs configuration
description: It is simple to configure traceId and spanId data injection into user logs in Java applications.
---

It is very simple to configure **traceId** and **spanId** data injection into user logs in Java applications. In general, it is enough to add instrumented versions of the logging packages into project dependencies. **Log4j2** and **logback** loggers are supported since OpenTelemetry-Java-Instrumentation version [0.10.1](https://github.com/open-telemetry/opentelemetry-java-instrumentation/tree/v0.10.1).

## Log4j instrumentation

1. Add instrumented **Log4j2** and **OpenTelemetry-api** libraries into the project dependencies:

   * Maven projects  

       ```xml
       <dependencies>
       <dependency>
           <groupId>io.opentelemetry.instrumentation</groupId>
           <artifactId>opentelemetry-log4j-2.13.2</artifactId>
           <version>1.9.2-alpha</version>
           <scope>runtime</scope>
       </dependency>
       <dependency>
           <groupId>io.opentelemetry</groupId>
           <artifactId>opentelemetry-api</artifactId>
           <version>1.26.0</version>
       </dependency>
       </dependencies>
       ```

   * Gradle projects  

       ```
       dependencies {
       runtimeOnly("io.opentelemetry.instrumentation:opentelemetry-log4j-2.13.2:1.9.2-alpha")
       implementation("io.opentelemetry:opentelemetry-api:1.26.0")
       }
       ```
     

1. Update the **log4j2.xml** configuration file, typically stored in **resources** directory, with `traceId`, `spanId`, `and sampled` keys. The following is an example configuration.

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
           <artifactId>opentelemetry-logback-1.0</artifactId>
           <version>1.9.2-alpha</version>
           <scope>runtime</scope>
       </dependency>
       </dependencies>
       ```

   * Gradle projects  

       ```
       dependencies {
       runtimeOnly("io.opentelemetry.instrumentation:opentelemetry-logback-1.0:1.9.2-alpha")
       }
       ```

1. Update the **logback.xml** configuration file, typically stored in the **resources** directory, with `traceId`, `spanId`, `and sampled` keys. The following is an example configuration.

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
