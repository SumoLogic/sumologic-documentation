---
id: ruby
title: Ruby OpenTelemetry auto-instrumentation
sidebar_label: Ruby
description: Learn how to collect telemetry data from applications written in Ruby.
---

Obtaining telemetry data from applications written in Ruby has never been easier. Thanks to [Opentelemetry-Ruby](https://github.com/open-telemetry/opentelemetry-ruby) the instrumentation process is very simple. Enabling auto-instrumentation requires you to perform three steps, explained in detail below. First, installation of the required gems, which hold the OpenTelemetry SDK and library-specific instrumentation. Second, code changes required for instrumentation enable and lastly, the exporter configuration.

## How to instrument your Ruby application?

There are a few simple steps to instrument the application and export the telemetry data by [OpenTelemetry Protocol exporter](https://github.com/open-telemetry/opentelemetry-ruby/tree/opentelemetry-exporter-otlp/v0.24.0/exporter/otlp) - **version sdk=1.2.0, exporter=0.24.0**.

## Step 1. Gems Installation  

Installation of the packages listed below is required to apply the instrumentation and export telemetry data. All listed gems are located on RubyGems.org and they can be installed in two different ways:

* **gem** command

   ```bash
   gem install opentelemetry-sdk -v 1.2.0
   gem install opentelemetry-exporter-otlp -v 0.24.0
   ```

* **bundler**, the packages have to be inserted into your **gemfile** and **bundle install** command has to be run

   ```bash
   gem 'opentelemetry-sdk', '1.2.0'
   gem 'opentelemetry-exporter-otlp', '0.24.0'
   ```

Installation of the gems above is mandatory. The next step is to install instrumentation packages corresponding to the libraries used in the application. A complete list of available plugins can be found [here](https://github.com/open-telemetry/opentelemetry-ruby/tree/master/instrumentation).

There are two solutions:

* Installation of the specific packages - for example, if the application is a **Sinatra** HTTP server which is also performing some HTTP requests using **Net HTTP** package. To instrument all the incoming and outgoing requests corresponding instrumented packages have to be installed:

   ```bash
   gem install opentelemetry-instrumentation-sinatra -v 0.22.0
   gem install opentelemetry-instrumentation-net_http -v 0.22.0
   ```

* Installation of the “all in one” package - installing this package will install all available instrumentation packages:

   ```bash
   gem install opentelemetry-instrumentation-all -v 0.35.0
   ```

## Step 2. Required code changes  

To enable instrumentation in the application and export the telemetry data it is enough to add the code below to the project. Two examples below present a specific package and an “all in one” instrumentation. 

* Specific package instrumentation - in this example only Sinatra and Net HTTP libraries will be instrumented.

   ```bash
   require 'opentelemetry/sdk'
   Bundler.require
   OpenTelemetry::SDK.configure do |c|
      c.use 'OpenTelemetry::Instrumentation::Sinatra'
      c.use 'OpenTelemetry::Instrumentation::Net::HTTP'
   end
   ```

* "All in one" instrumentation - this configuration will instrument all available package:

   ```bash
   require 'opentelemetry/sdk'
   Bundler.require
   OpenTelemetry::SDK.configure do |c|
      c.use_all
   end
   ```

## Step 3. Telemetry data exporter configuration  

The final step is to configure the exporter host and service name. This can be done [directly in the code](https://github.com/open-telemetry/opentelemetry-ruby/tree/opentelemetry-exporter-otlp/v0.24.0/exporter/otlp#how-do-i-get-started) or by environment variables. In this example, the exporter will be configured by environment variables.

* Environment variable sets the exporter to OTLP:

   ```bash
   OTEL_EXPORTER=otlp
   ```

* Environment variable configures the endpoint where telemetry data will be sent:

   ```bash
   OTEL_EXPORTER_OTLP_ENDPOINT=http://collection-sumologic-otelagent.sumologic:4318
   ```

   In this example, the value of the variable points to the default Sumologic Kubernetes Collector. For Kubernetes environments see the [available endpoints for a direct connection](docs/apm/traces/get-started-transaction-tracing/set-up-traces-collection-for-kubernetes-environments.md). For other environments see [endpoints and protocols](docs/apm/traces/get-started-transaction-tracing/set-up-traces-collection-for-other-environments.md).

* Configure the service name. Ensure the string value represents its business logic, such as `FinanceServiceCall`.  This will appear as a tracing service name in Sumo Logic.

   ```bash
   OTEL_SERVICE_NAME=SERVICE_NAME
   ```

* Configure the application name. This will appear as a tracing application name in Sumo Logic. Additional attributes can be added here as comma separated key=value pairs:

   ```bash
   OTEL_RESOURCE_ATTRIBUTES=application=APPLICATION_NAME
   ```

## TraceID, SpanID and operation data injection into logs

Additional information like TraceID, SpanID or operation data in the application logs could be very helpful to correlate traces, spans and operations with specific logs. To add this data to the logs it is required to obtain it from `OpenTelemetry::Trace` and modify logger.

Please see example code:

```bash
logger = ::Logger.new(STDOUT)
logger.formatter = proc do |severity, time, progname, msg|
  span_id = OpenTelemetry::Trace.current_span.context.hex_span_id
  trace_id = OpenTelemetry::Trace.current_span.context.hex_trace_id
  if defined? OpenTelemetry::Trace.current_span.name
    operation = OpenTelemetry::Trace.current_span.name
  else
    operation = 'undefined'
  end

  "#{time}, #{severity}: #{msg} - trace_id=#{trace_id} - span_id=#{span_id} - operation=#{operation}\n"
end
set :logger, logger
```

Example output:

```json
"2022-02-28 13:01:25 +0000, INFO: {:remote_ip\>\"127.0.0.6\", :request_path\>\"/get_beans\", :query_string\>\"\", :request_method\>\"POST\", :execution_time_sec\>0.00033453479409217834, :response_status_code\>200} - trace_id=cdd460d538917f82560cbb91373a05a6 - span_id=12a09921c89fd6e9 - operation=POST /get_beans
```
