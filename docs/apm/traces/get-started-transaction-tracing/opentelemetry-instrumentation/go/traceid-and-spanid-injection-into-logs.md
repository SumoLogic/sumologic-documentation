---
id: traceid-and-spanid-injection-into-logs
title: Go TraceId and SpanId Injection into Logs
sidebar_label: TraceId and SpanId injection into logs
description: Learn how to configure traceId and spanId data injection into user logs in Go applications using Logrus logging library.
---

This page describes how to configure **spanId** and **traceId** data injection into user logs in Go applications using the Logrus logging library. The process involves adding the necessary tracing dependencies and injecting the `span_id` and `trace_id` into relevant logs.

## Logrus instrumentation

1. Import dependency:
    ```go
    import (
        oteltrace "go.opentelemetry.io/otel/trace"
        "github.com/sirupsen/logrus"
    )
    ```
1. Configure logrus to format logs and extract span data by spanName:
    ```go
    func main() {
        // Ensure logrus behaves like TTY is disabled
        logrus.SetFormatter(&logrus.TextFormatter{
            DisableColors: true,
            FullTimestamp: true,
        })
    }
    ```
1. Prepare a function that will return logrus fields with `span_id` and `trace_id`:
    ```go
    func LogrusFields(span oteltrace.Span) logrus.Fields {
        return logrus.Fields{
            "span_id": span.SpanContext().SpanID().String(),
            "trace_id": span.SpanContext().TraceID().String(),
        }
    }
    ```
1. Use the fields function in your logging, whenever there's a tracing context available:
    ```go
    ...
        _, span := tracer.Start(ctx, "spanName", ...)
        defer span.End()
        logrus.WithFields(helper.LogrusFields(span)).Info("Some message...")
    ...
    ```
