---
slug: /apm/traces/get-started-transaction-tracing/opentelemetry-instrumentation/go
title: Go OpenTelemetry auto-instrumentation
sidebar_label: Go OpenTelemetry auto-instrumentation
description: OpenTelemetry Golang instrumentation gives you the possibility to capture telemetry (metrics and traces) data from code written in Golang.
---

OpenTelemetry Golang instrumentation gives you the possibility to capture telemetry (metrics and traces) data from code written in Golang. The best way is to use https://github.com/open-telemetry/opentelemetry-go. See the list of [supported libraries](https://github.com/open-telemetry/opentelemetry-go-contrib/tree/v1.4.0/instrumentation#instrumentation-packages).

## Instrumentation types

### Automatic instrumentation

The best way to use Golang instrumentation is to include a [supported library](https://github.com/open-telemetry/opentelemetry-go-contrib/tree/v1.4.0/instrumentation#instrumentation-packages) into your code. See below for steps required to instrument the application automatically.

### Manual instrumentation

If you’re using libraries that are not officially supported or in case you want to be very specific and granular with instrumentation, you can instrument your code manually using https://pkg.go.dev/go.opentelemetry.io/otel/api. Examples of using manual instrumentation can be found in [https://github.com/open-telemetry/opentelemetry-go/tree/master/example](https://github.com/open-telemetry/opentelemetry-go/tree/main/example)

## Automatic instrumentation steps

The instructions below apply to version **v1.4.1 (sdk) and 0.29.0 (instrumentation)** of **OpenTelemetry**.

### Mandatory packages installation

Installation of packages listed below is mandatory to start working with instrumentation:

```bash
go get -u go.opentelemetry.io/otel@v1.4.1
go get -u go.opentelemetry.io/otel/sdk@v1.4.1
```

It downloads and installs OpenTelemetry package for golang. It includes APIs for traces.

Next, you'll install the spans exporter. There are currently three supported protocols OTLP, Zipkin and Jaeger. Sumo Logic recommends the OTLP HTTP exporter. Execute the command below:

```bash
go get -u go.opentelemetry.io/otel/exporters/otlp/otlptrace@v1.4.1
go get -u go.opentelemetry.io/otel/exporters/otlp/otlptrace/otlptracehttp@v1.4.1
```

### Application specific packages installation

Next, we need to download instrumented versions of libraries and put them into the following path:

```bash
go.opentelemetry.io/contrib/instrumentation/{IMPORT_PATH}/otel{PACKAGE_NAME}@{VERSION}
```

For example, net/http package, which will be used in the example HTTP client code below:

```bash
go get go.opentelemetry.io/contrib/instrumentation/net/http/otelhttp@v0.29.0
```

### Import and initialize instrumentation packages 

To get traces from your application you need to import instrumented libraries and initialize them. An Example of an HTTP client-server app using an instrumented library can be found [here](https://github.com/open-telemetry/opentelemetry-go-contrib/tree/main/instrumentation/net/http/otelhttp/example#http-client-server-example).

Tracing initialization requires a few steps to be ready. The first one is to configure the OTLP HTTP exporter client. The next step is to set up a Batch Span Processor responsible for batching spans and then TracerProvider. For details of the configuration see [TracerProvider](https://github.com/open-telemetry/opentelemetry-go/blob/v1.4.0/sdk/trace/provider.go#L35) implementation. Last part of the code is responsible for trace context propagation.

```
func initTracer() {

    ctx := context.Background()

    client := otlptracehttp.NewClient()

    otlpTraceExporter, err := otlptrace.New(ctx, client)
    if err != nil {
        log.Fatal(err)
    }

    batchSpanProcessor := trace.NewBatchSpanProcessor(otlpTraceExporter)

    tracerProvider := trace.NewTracerProvider(
        trace.WithSpanProcessor(batchSpanProcessor),
        //trace.WithSampler(sdktrace.AlwaysSample()), - please check TracerProvider.WithSampler() implementation for details.
    )

    otel.SetTracerProvider(tracerProvider)
    otel.SetTextMapPropagator(propagation.NewCompositeTextMapPropagator(
        propagation.TraceContext{}, propagation.Baggage{}))
}
```

After preparing the tracing initialization code use the initTracer() method and instrumented library. See the following example HTTP client main function:

```
func main() {

    initTracer()

    client := http.Client{Transport: otelhttp.NewTransport(http.DefaultTransport)}

    ctx := baggage.ContextWithoutBaggage(context.Background())

    req, _ := http.NewRequestWithContext(ctx, "GET", "http://sumologic.com", nil)

    fmt.Printf("Sending request...\n")
    res, err := client.Do(req)
    if err != nil {
        panic(err)
    }
    fmt.Printf("Response status code: %v\n", res.Status)
    fmt.Printf("Waiting for few seconds to export spans ...\n\n")
    time.Sleep(10 * time.Second)
}
```

The last step is to configure few other things like:

* `SERVICE_NAME` - insert the application service name. Ensure the string value represents its business logic, such as "SumoWebCall". This will appear as a tracing service name in Sumo Logic.
* `APPLICATION_NAME` - insert the application name. This will appear as a tracing application name in Sumo Logic. Additional attributes can be added here as comma separated key=value pairs. For example, add the `deployment.environment=[environment-name]` tag as needed to allow for filtering by environment on dashboard panels (for more information, see [Services Dashboard Panels](/docs/apm/traces/services-list-map#services-dashboard-panels)).
* `ENDPOINT_ADDRESS` - OTLP HTTP (default port 4318) endpoint address must be provided with the location of the OpenTelemetry Collector/Agent (recommended for production) or [Sumo Logic HTTP Traces source](../../http-traces-source.md). Refer to the following setup instructions if you haven't yet installed a collector:
   * [Set up traces collection for Kubernetes environments](/docs/apm/traces/get-started-transaction-tracing/set-up-traces-collection-for-kubernetes-environments.md)
   * [Set up traces collection for other environments usage](/docs/apm/traces/get-started-transaction-tracing/set-up-traces-collection-for-other-environments.md)

All of them can be configured by [environment variables](https://github.com/open-telemetry/opentelemetry-go/tree/v1.4.0/exporters/otlp/otlptrace#otlptracehttp) specific for the exporter. For OTLP HTTP Exporter these are:

```
export OTEL_EXPORTER_OTLP_ENDPOINT="ENDPOINT_ADDRESS"
export OTEL_SERVICE_NAME="SERVICE_NAME"
export OTEL_RESOURCE_ATTRIBUTES="application=APPLICATION_NAME,deployment.environment=ENVIRONMENT_NAME"
```