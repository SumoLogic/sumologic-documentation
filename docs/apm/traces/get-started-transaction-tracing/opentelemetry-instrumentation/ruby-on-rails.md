---
id: ruby-on-rails
title: Ruby on Rails OpenTelemetry auto-instrumentation
sidebar_label: Ruby on Rails
description: Learn how to collect telemetry data from Ruby on Rails applications.
---

[Opentelemetry-Ruby](https://github.com/open-telemetry/opentelemetry-ruby) gives the possibility to obtain telemetry data from Ruby on Rails (RoR) applications by adding a few lines of code to your project.

There are a few simple steps to instrument the application and export the telemetry data by [OpenTelemetry Protocol exporter](https://github.com/open-telemetry/opentelemetry-ruby/tree/opentelemetry-exporter-otlp/v0.24.0/exporter/otlp).

## Step 1. OpenTelemetry dependencies installation  

Installation of the packages listed below is required to apply the instrumentation and export telemetry data. All listed gems are located on RubyGems.org and they can be installed in two different ways:

* **gem** command:  

   ```bash
   gem install opentelemetry-sdk -v 1.2.0
   gem install opentelemetry-exporter-otlp -v 0.24.0
   ```

* **bundler**, the packages have to be inserted into your **gemfile** and the **bundle install** command has to be run:  

   ```bash
   gem 'opentelemetry-sdk', '1.2.0'
   gem 'opentelemetry-exporter-otlp', '0.24.0'
   ```

Installation of the gems above is mandatory. The next step is to install instrumentation packages corresponding to the libraries used in the application. A complete list of available plugins can be found [here](https://github.com/open-telemetry/opentelemetry-ruby/tree/master/instrumentation).

There are two solutions:

* Installation of the specific package - for example, if the application is a **Rails** Web server that is also performing some database queries using **MySQL** package. To get traces from libraries used in the project, corresponding instrumented packages have to be installed:  

   ```bash
   gem install opentelemetry-instrumentation-rails -v 0.26.0
   gem install opentelemetry-instrumentation-action_pack -v 0.6.0
   gem install opentelemetry-instrumentation-action_view -v 0.5.0
   gem install opentelemetry-instrumentation-active_job -v 0.5.0
   gem install opentelemetry-instrumentation-active_model_serializers -v 0.20.0
   gem install opentelemetry-instrumentation-active_record -v 0.6.0
   gem install opentelemetry-instrumentation-mysql2 -v 0.23.0
   ```

* Installation of the "all in one" package - installing this package will install all available instrumentation packages:

   ```bash
   gem install opentelemetry-instrumentation-all -v 0.35.0
   ```

## Step 2. Code changes  

To enable instrumentation in the Ruby on Rails application and export the telemetry data it is enough to add the code below to the project. Two examples below present a specific package and an "all in one" instrumentation. The code has to be added in the **config/environment.rb** file before application initialization as in the examples below:

* Specific package instrumentation - in this example only Rails library will be instrumented:  

   ```bash
   require 'opentelemetry/sdk'
   require_relative 'application'

   OpenTelemetry::SDK.configure do |c|
   c.use 'OpenTelemetry::Instrumentation::Rails'
   c.use 'OpenTelemetry::Instrumentation::ActionPack'
   c.use 'OpenTelemetry::Instrumentation::ActionView'
   c.use 'OpenTelemetry::Instrumentation::ActiveJob'
   c.use 'OpenTelemetry::Instrumentation::ActiveModelSerializers'
   c.use 'OpenTelemetry::Instrumentation::ActiveRecord'
   end

   Rails.application.initialize!
   ```

* "All in one" instrumentation - this configuration will instrument Rails and other supported and used in project libraries:  

   ```bash
   require 'opentelemetry/sdk'
   require_relative 'application'

   OpenTelemetry::SDK.configure do |c|
     c.use_all
   end

   Rails.application.initialize!
   ```

## Step 3. Telemetry data exporter configuration  

The final step is to configure the exporter host, service and application name. This can be done [directly in the code](https://github.com/open-telemetry/opentelemetry-ruby/tree/opentelemetry-exporter-otlp/v0.24.0/exporter/otlp#how-do-i-get-started) or by environment variables. In this example, the exporter will be configured by environment variables.

* `OTEL_EXPORTER=otlp` - environment variable sets the exporter to OTLP

* `OTEL_EXPORTER_OTLP_ENDPOINT=http://collection-sumologic-otelagent.sumologic:4318` - environment variable configures the endpoint where telemetry data will be sent.  

 In this example, the value of the variable points to the default Sumologic Kubernetes Collector. For Kubernetes environments see the [available endpoints for a direct connection](docs/apm/traces/get-started-transaction-tracing/set-up-traces-collection-for-kubernetes-environments.md). For other environments see [endpoints and protocols](docs/apm/traces/get-started-transaction-tracing/set-up-traces-collection-for-other-environments.md).

* `OTEL_SERVICE_NAME=SERVICE_NAME` - configure the service name. Ensure the string value represents its business logic, such as "FinanceServiceCall". This will appear as a tracing service name in Sumo Logic.

* `OTEL_RESOURCE_ATTRIBUTES=application=APPLICATION_NAME` - configure the application name. This will appear as a tracing application name in Sumo Logic. Additional attributes can be added here as comma separated key=value pairs.

* {@import ../../../../reuse/otel-deployment-environment-tag.md}

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
"2022-02-28 13:01:25 +0000, INFO: {:remote_ip=>\"127.0.0.6\", :request_path=>\"/get_beans\", :query_string=>\"\", :request_method=>\"POST\", :execution_time_sec=>0.00033453479409217834, :response_status_code=>200} - trace_id=cdd460d538917f82560cbb91373a05a6 - span_id=12a09921c89fd6e9 - operation=POST /get_beans
```
