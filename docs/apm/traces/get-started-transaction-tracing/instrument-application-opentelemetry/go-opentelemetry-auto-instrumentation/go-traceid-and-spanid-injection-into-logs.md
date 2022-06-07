---
id: go-traceid-and-spanid-injection-into-logs
---

# Go TraceId and SpanId injection into logs

This page describes how to configure **traceId** and **spanId** data injection into user logs in GoLang applications using Logrus logging library. Essentially, you only need to add tracing dependencies and injecting the `span_id` and `trace_id` into relevant logs.

## Logrus instrumentation

1. Import dependency:

    ```
    import (
        oteltrace "go.opentelemetry.io/otel/trace"
        "github.com/sirupsen/logrus"
    )
    ```

1. Configure logrus to format logs and extract span data by spanName:

    ```
    func main() {
        // Ensure logrus behaves like TTY is disabled
        logrus.SetFormatter(&logrus.TextFormatter{
            DisableColors: true,
            FullTimestamp: true,
        })
    }
    ```

1. Prepare a function which will return logrus fields with `span_id` and `trace_id`:

    ```
    func LogrusFields(span oteltrace.Span) logrus.Fields {
        return logrus.Fields{
            "span_id": span.SpanContext().SpanID().String(),
            "trace_id": span.SpanContext().TraceID().String(),
        }
    }
    ```

1. Use the fields function in your logging, whenever there's a tracing context available:

    ```
    ...
            _, span := tracer.Start(ctx, "spanName", ...)
            defer span.End()
            logrus.WithFields(helper.LogrusFields(span)).Info("Some message...")
    ...
    ```
