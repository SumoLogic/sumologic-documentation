---
id: traceid-spanid-injection-into-logs
title: .NET TraceId and SpanId injection into logs configuration
sidebar_label: TraceId and SpanId injection into logs
description: Learn how to configure traceId, spanId, and trace flags data injection into user logs in .NET applications.
---

This page describes how to configure traceId and spanId data injection into user logs from .Net core. The goal is to correlate the relevant logs with your corresponding traces and spans.

The injection allows you to click a link from the Trace View tab and launch a search tab that displays the logs with the linked traceid/spanid. These logs should be stored in the Continuous data tier as the links in Sumo Logic default to searching there instead of other data tiers. It's worth noting that to search actual traces and not the logs, those can be found in `_index=_trace_spans`.

1. Get the current traceId and spanId, which can be obtained by:
  ```cs
  var traceId = Tracer.CurrentSpan.Context.TraceId;
  var spanId = Tracer.CurrentSpan.Context.SpanId;
  ```
2. It is a matter of logging this information like this:
 ```cs
 _logger.LogInformation("Hello World! - trace_id=" + traceId + " - span_id=" + spanId);
 ```
`_logger` is standard .net `ILogger` instance. The Sumo Logic demo system performs this using the Coffee Bar code example, which you can find here: [CalculatorController.cs | SumoLogic GitHub](https://github.com/SumoLogic/the-coffee-bar/blob/main/applications/dotnet-core-the-coffee-bar-app/dotnet-core-calculator-svc/Controllers/CalculatorController.cs).

3. [Optional] If using Activity in the code, then there is one more option: you can configure the ActivityTrackingOptions for logging in Program.cs and it will automatically add traceId and spanId into logs.
```cs
private static IHostBuilder CreateHostBuilder(string[] args) =>
        Host.CreateDefaultBuilder(args)
            .ConfigureLogging(loggingBuilder =>
                loggingBuilder.Configure(options =>
                    options.ActivityTrackingOptions =
                        ActivityTrackingOptions.TraceId
                        | ActivityTrackingOptions.SpanId))
            .ConfigureWebHostDefaults(webBuilder =>
            {
                webBuilder.UseStartup<Startup>();
                webBuilder.UseUrls(args[0]);
            });
```

:::note
The above solution has not yet been tested internally.
:::


## Additional Information

*  [NLog.DiagnosticSource | GitHub](https://github.com/NLog/NLog.DiagnosticSource)
