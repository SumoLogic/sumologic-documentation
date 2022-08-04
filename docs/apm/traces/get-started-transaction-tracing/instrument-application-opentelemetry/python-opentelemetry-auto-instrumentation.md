---
id: python-opentelemetry-auto-instrumentation
title: Python OpenTelemetry auto-instrumentation
sidebar_label: Python OpenTelemetry auto-instrumentation
description: Learn how to configure OpenTelemetry Python instrumentation to capture data from the python written code applications.
---

OpenTelemetry Python instrumentation gives the possibility to capture telemetry data from the python written code applications. The best way to start it is to incorporate [OpenTelemetry-Python](https://github.com/open-telemetry/opentelemetry-python). See a list of the [supported libraries](https://github.com/open-telemetry/opentelemetry-python-contrib/tree/main/instrumentation) under OpenTelemetry Instrumentations.

## How to instrument your app?

The best way to instrument Python applications is to use OpenTelemetry-Python automatic instrumentation. This approach is simple, easy, and does not require many code changes. Only a few Python packages have to be installed to successfully instrument the code of the application. Instruction below applies to OpenTelemetry-Python instrumentation in version **1.9.1/0.28b1 with [OpenTelemetry Protocol HTTP Exporter](https://github.com/open-telemetry/opentelemetry-python/tree/v1.9.1/exporter/opentelemetry-exporter-otlp-proto-http").

## Mandatory packages installation

Installation of the package listed below is required to start the instrumentation and export telemetry data. Run the following pip commands:  

```
$ pip install opentelemetry-distro==0.28b1 $ pip install opentelemetry-exporter-otlp-proto-http==1.9.1
```

If requirements.txt is used to manage dependencies in the project add:

```
opentelemetry-distro==0.28b1 opentelemetry-exporter-otlp-proto-http==1.9.1
```

If pipfile, add these dependencies instead of using the pip commands.
For example:

```
opentelemetry-distro = "0.28b1" opentelemetry-exporter-otlp-proto-http = "1.9.1"
```

## Application specific packages installation

The next step is related to the installation of the instrumented packages used in the application. This step can be done by one simple command in the root directory of your Python application. Execution of the command below will install corresponding instrumented packages used by the application. This solution is recommended.

```
$ opentelemetry-bootstrap --action=install
```

It is possible to install instrumented packages manually but it will require from the user to find libraries used in the code and install their [instrumented counterparts](https://github.com/open-telemetry/opentelemetry-python-contrib/tree/v0.28b1/instrumentation") (such as Flask [opentelemetry-instrumentation-flask](https://github.com/open-telemetry/opentelemetry-python-contrib/tree/v0.28b1/instrumentation/opentelemetry-instrumentation-flask)).

## Instrumentation configuration

After successful installation of the packages it is important to properly configure instrumentation. Configuration is set through environment variables.

* Sets the exporter to OTLP HTTP:

   ```
   OTEL_TRACES_EXPORTER=otlp_proto_http
   ```

* Configures the endpoint where telemetry data will be sent:

   ```
   OTEL_EXPORTER_OTLP_TRACES_ENDPOINT=http://collection-sumologic-otelcol.sumologic:55681/v1/traces
   ```

   The value of the variable points to the default Sumologic Kubernetes Collector. For Kubernetes environments see the [available endpoints for a direct connection](../set-up-traces-collection-for-kubernetes-environments.md). For other environments see [endpoints and protocols](../set-up-traces-collection-for-other-environments.md).

* Configures the service name. Ensure the string value represents its business logic, such as "FinanceServiceCall". This will appear as a tracing service name in Sumo Logic.

   ```
   OTEL_SERVICE_NAME=SERVICE_NAME
   ```

* Configure the application name. This will appear as a tracing application name in Sumo Logic. Additional attributes can be added here as comma separated key=value pairs.

   ```
   OTEL_RESOURCE_ATTRIBUTES=application=APPLICATION_NAME
   ```

## Application execution

When everything is configured it is very simple to run an instrumented application.

```
$ opentelemetry-instrument python3 SCRIPT_NAME.py
```

## Context propagation

By default OpenTelemetry uses W3C context propagation standard. If application instrumented by OpenTelemetry communicates with services where different context propagation is used then it is recommended to configure additional propagator to correlate events across services. This can be achieved by installation of propagators packages and `OTEL_PROPAGATORS` environment variable configuration.

* **B3 context propagation** - common for service meshes like Istio, Linkerd and Zipkin instrumented applications.  

   * Propagator package installation:

      ```
      $ pip install opentelemetry-propagator-b3==1.9.1
      ```  

   * Configuration:

      ```
      export OTEL_PROPAGATORS=b3,b3multi,tracecontext,baggage
      ```

* **AWS X-Ray**- common for applications running in AWS Services:

   * Propagator package installation:

      ```
      $ pip install opentelemetry-propagator-aws-xray==1.0.1
      ```  

   * Configuration:

      ```
      export OTEL_PROPAGATORS=xray,tracecontext,baggage
      ```

* **Jaeger**- common for Jaeger instrumented applications  

   * Propagator package installation:

      ```
      $ pip install opentelemetry-propagator-jaeger==1.9.1
      ```  

   * Configuration:

      ```
      export OTEL_PROPAGATORS=jaeger,tracecontext,baggage
      ```

* **OpenTracing**- common for OT instrumented applications  

   * Propagator package installation:

      ```
      $ pip install opentelemetry-ot-trace==0.28b1
      ```  

   * Configuration:

      ```
      export OTEL_PROPAGATORS=ottrace,tracecontext,baggage
      ```

## Instrumentation notes

* For **Flask application** instrumentation debug mode has to be disabled (`debug=false`).
* In case of **Django**,** **application server has to be run with `--noreload` flag such as:

   ```
   opentelemetry-instrument python3  manage.py runserver ---noreload
   ```
