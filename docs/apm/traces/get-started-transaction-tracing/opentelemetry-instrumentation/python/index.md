---
slug: /apm/traces/get-started-transaction-tracing/opentelemetry-instrumentation/python
title: Python OpenTelemetry auto-instrumentation
sidebar_label: Python
description: Learn how to configure OpenTelemetry Python instrumentation to capture data from the python written code applications.
---

OpenTelemetry Python instrumentation provides the ability to capture telemetry data from the Python-written code applications. The best way to start it is to incorporate [OpenTelemetry-Python](https://github.com/open-telemetry/opentelemetry-python). See a list of the [supported libraries](https://github.com/open-telemetry/opentelemetry-python-contrib/tree/main/instrumentation) under OpenTelemetry Instrumentations.

## How to instrument your app

The best way to instrument Python applications is to use OpenTelemetry-Python automatic instrumentation. This approach is simple, easy, and does not require many code changes. Only a few Python packages have to be installed to successfully instrument the code of the application. Instruction below applies to OpenTelemetry-Python instrumentation in version **1.17.0/0.38b0** with [OpenTelemetry Protocol HTTP Exporter](https://github.com/open-telemetry/opentelemetry-python/tree/v1.17.0/exporter/opentelemetry-exporter-otlp-proto-http).

## Mandatory packages installation

Installation of the package listed below is required to start the instrumentation and export telemetry data. Run the following pip commands:  

```bash
pip install opentelemetry-distro==0.38b0
pip install opentelemetry-exporter-otlp-proto-http==1.17.0
```

If requirements.txt is used to manage dependencies in the project add:

```bash
opentelemetry-distro==0.38b0 opentelemetry-exporter-otlp-proto-http==1.17.0
```

If pipfile, add these dependencies instead of using the pip commands. For example:

```bash
opentelemetry-distro = "0.38b0" opentelemetry-exporter-otlp-proto-http = "1.17.0"
```

## Application specific packages installation

The next step is related to the installation of the instrumented packages used in the application. This step can be done by one simple command in the root directory of your Python application. Execution of the command below will install corresponding instrumented packages used by the application. This solution is recommended.

```bash
opentelemetry-bootstrap --action=install
```

It is possible to install instrumented packages manually but it will require from the user to find libraries used in the code and install their [instrumented counterparts](https://github.com/open-telemetry/opentelemetry-python-contrib/tree/v0.38b0/instrumentation) (such as Flask [opentelemetry-instrumentation-flask](https://github.com/open-telemetry/opentelemetry-python-contrib/tree/v0.38b0/instrumentation/opentelemetry-instrumentation-flask)).

## Instrumentation configuration

After successful installation of the packages it is important to properly configure instrumentation. Configuration is set through environment variables.

* Disables metrics exporter:

 ```bash
 OTEL_METRICS_EXPORTER=none
 ```

* Sets the exporter to OTLP:

```bash
OTEL_TRACES_EXPORTER=otlp
```

* Sets the exporter protocol to OTLP/http:

```bash
OTEL_EXPORTER_OTLP_PROTOCOL=http/protobuf
```

* Configures the endpoint where telemetry data will be sent:

```bash
OTEL_EXPORTER_OTLP_ENDPOINT=http://HOSTNAME:4318
```

For Kubernetes environments, see the [available endpoints for a direct connection](docs/apm/traces/get-started-transaction-tracing/set-up-traces-collection-for-kubernetes-environments.md). For other environments see [endpoints and protocols](docs/apm/traces/get-started-transaction-tracing/set-up-traces-collection-for-other-environments.md).

* Configures the service name. Ensure the string value represents its business logic, such as "FinanceServiceCall". This will appear as a tracing service name in Sumo Logic.

```bash
OTEL_SERVICE_NAME=SERVICE_NAME
```

* Configure the application name. This will appear as a tracing application name in Sumo Logic. Additional attributes can be added here as comma separated key=value pairs.

```bash
OTEL_RESOURCE_ATTRIBUTES=application=APPLICATION_NAME
```

## Application execution

When everything is configured it is very simple to run an instrumented application.

```bash
opentelemetry-instrument python3 SCRIPT_NAME.py
```

## Context propagation

By default, OpenTelemetry uses W3C context propagation standard. If application instrumented by OpenTelemetry communicates with services where different context propagation is used, then it is recommended to configure additional propagator to correlate events across services. This can be achieved by installation of propagators packages and `OTEL_PROPAGATORS` environment variable configuration.

* **B3 context propagation** - common for service meshes like Istio, Linkerd and Zipkin instrumented applications.  
  * Propagator package installation:

      ```bash
      pip install opentelemetry-propagator-b3==1.17.0
      ```  

  * Configuration:

      ```bash
      export OTEL_PROPAGATORS=b3,b3multi,tracecontext,baggage
      ```

* **AWS X-Ray** - common for applications running in AWS Services:
  * Propagator package installation:

      ```bash
      pip install opentelemetry-propagator-aws-xray==1.0.1
      ```  

  * Configuration:

      ```bash
      export OTEL_PROPAGATORS=xray,tracecontext,baggage
      ```

* **Jaeger** - common for Jaeger instrumented applications  
  * Propagator package installation:

      ```bash
      pip install opentelemetry-propagator-jaeger==1.17.0
      ```  

  * Configuration:

      ```bash
      export OTEL_PROPAGATORS=jaeger,tracecontext,baggage
      ```

* **OpenTracing** - common for OT instrumented applications  
  * Propagator package installation:

      ```bash
      pip install opentelemetry-ot-trace==0.38b0
      ```  

  * Configuration:

      ```bash
      export OTEL_PROPAGATORS=ottrace,tracecontext,baggage
      ```

## Instrumentation notes

* For **Flask application** instrumentation debug mode has to be disabled (`debug=false`).
* In case of **Django**, the application server has to be run with `--noreload` flag such as:

   ```bash
   opentelemetry-instrument python3 manage.py runserver ---noreload
   ```

## Log correlation

* To enable trace context injection into logs, set the `OTEL_PYTHON_LOG_CORRELATION` environment variable to `true` ([learn more](https://opentelemetry-python-contrib.readthedocs.io/en/latest/instrumentation/logging/logging.html#enable-trace-context-injection))
