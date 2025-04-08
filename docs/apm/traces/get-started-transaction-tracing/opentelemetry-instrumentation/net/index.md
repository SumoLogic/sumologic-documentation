---
slug: /apm/traces/get-started-transaction-tracing/opentelemetry-instrumentation/net
title: .NET OpenTelemetry Auto-Instrumentation
sidebar_label: OpenTelemetry Auto-Instrumentation
description: The simplest way to start capturing telemetry data is to implement the solution coming from OpenTelemetry-dotNet.
---

Automatic instrumentation of the .NET applications is a very easy task. The simplest way to start capturing telemetry data is to implement the solution coming from OpenTelemetry-dotNet. All the libraries shipped with the [OpenTelemetry-dotNet](https://github.com/open-telemetry/opentelemetry-dotnet) repository support all the officially supported versions of .NET Core (including deployments in the [Microsoft Azure Service Fabric Containers](https://docs.microsoft.com/en-us/azure/service-fabric/service-fabric-containers-overview)) and .NET framework with an except for .NET Framework 3.5 SP1. See this [list of the supported libraries](https://github.com/open-telemetry/opentelemetry-dotnet#getting-started).

## .NET full auto-instrumentation vs library-instrumentation (partial auto)

It is important to understand difference between two types of instrumentations that are available in .NET.

* **Fully automatic instrumentation** does not require code.
* **Partially automatic instrumentation**, which is called *library instrumentation* by the OpenTelemetry community, requires some initialization in the code. It is partial auto-instrumentation as traces are generated automatically depending on settings provided by developer(s) during the initialization phase.

:::note
The below description applies to [v1.6.0](https://github.com/open-telemetry/opentelemetry-dotnet-instrumentation/releases/tag/v1.6.0).
:::

## Instrument a .NET application automatically (Windows)

OpenTelemetry .NET Automatic Instrumentation has to be installed via PowerShell
module. This process requires administrator permissions.

```sh
# Download the module
$module_url = "https://github.com/open-telemetry/opentelemetry-dotnet-instrumentation/releases/download/v1.6.0/OpenTelemetry.DotNet.Auto.psm1"
$download_path = Join-Path $env:temp "OpenTelemetry.DotNet.Auto.psm1"
Invoke-WebRequest -Uri $module_url -OutFile $download_path -UseBasicParsing

# Import the module to use its functions
Import-Module $download_path

# Install core files (online vs offline method)
Install-OpenTelemetryCore
```

After installation, you can set the service name and run the application.

```sh
# Set up the instrumentation for the current PowerShell session.
# Can be done via environment variable.
Register-OpenTelemetryForCurrentSession -OTelServiceName "MyServiceDisplayName"
```

The final step is to configure the exporter endpoint, service and application name otherwise defaults will be used. In this example, the instrumentation will be configured by environment variables.

* `OTEL_EXPORTER_OTLP_PROTOCOL=http/protobuf` - configures OTLP exporter to use OTLP HTTP protocol
* `OTEL_EXPORTER_OTLP_ENDPOINT=http://OTLP_HTTP_ENDPOINT:4318` - environment variable configures the endpoint where telemetry data will be sent. The value of the variable points to OpenTelemetry Collector/Agent (recommended for production) or [OTLP/HTTP source](/docs/send-data/hosted-collectors/http-source/otlp).
* `OTEL_SERVICE_NAME=SERVICE_NAME` - configure the service name. Ensure the string value represents its business logic, such as "FinanceServiceCall". This will appear as a tracing service name in Sumo Logic.
* `OTEL_RESOURCE_ATTRIBUTES=application=APPLICATION_NAME` - configure the application name. This will appear as a tracing application name in Sumo Logic. Additional attributes can be added here as comma-separated key=value pairs. Add the `deployment.environment=[environment-name]` tag as needed to allow for filtering by environment on dashboard panels. For more information, see [Add services panel to dashboard](/docs/apm/services-list-map/#add-services-panel-to-dashboard).

More extensive description of all available options can be found [here](https://github.com/open-telemetry/opentelemetry-dotnet-instrumentation/blob/main/docs/config.md)

```sh
# Run your application with instrumentation
.\MyNetApp.exe
```


### ASP.NET application on IIS

ASP.NET application that runs on IIS requires two additional steps.

#### Step 1. Setup IIS instrumentation

This step requires to execute following command in powershell.

```sh
# Setup IIS instrumentation
Register-OpenTelemetryForIIS
```

#### Step 2. Define opentelemetry modules loaded by IIS

There are two options in order to achieve the goal.

First, update the application's `web.config` with the following section.

```xml
  <system.webServer>
    <validation validateIntegratedModeConfiguration="false" />
    <modules>
      <remove name="TelemetryHttpModule" />
      <add name="TelemetryHttpModule" type="OpenTelemetry.Instrumentation.AspNet.TelemetryHttpModule, OpenTelemetry.Instrumentation.AspNet.TelemetryHttpModule" preCondition="managedHandler" />
    </modules>
  </system.webServer>
```

Second, update `applicationHost.config`, which is located in `%SystemDrive%\Windows\system32\inetsrv\config` like below.

```xml
  <location path="" overrideMode="Allow">
    <system.webServer>
      <modules>
        <add name="TelemetryHttpModule" type="OpenTelemetry.Instrumentation.AspNet.TelemetryHttpModule, OpenTelemetry.Instrumentation.AspNet.TelemetryHttpModule" preCondition="managedHandler" />
      </modules>
    </system.webServer>
  </location>
```

The final step is to configure the exporter endpoint, service and application name otherwise defaults will be used. In this example, the instrumentation will be configured by environment variables.

* `OTEL_EXPORTER_OTLP_PROTOCOL=http/protobuf`. Configures OTLP exporter to use OTLP HTTP protocol
* `OTEL_EXPORTER_OTLP_ENDPOINT=http://OTLP_HTTP_ENDPOINT:4318`. Environment variable configures the endpoint where telemetry data will be sent. The value of the variable points to the default Sumologic Kubernetes Collector.
* `OTEL_SERVICE_NAME=SERVICE_NAME`. Configure the service name. Ensure the string value represents its business logic, such as "FinanceServiceCall". This will appear as a tracing service name in Sumo Logic.
* `OTEL_RESOURCE_ATTRIBUTES=application=APPLICATION_NAME`. Configure the application name. This will appear as a tracing application name in Sumo Logic. Additional attributes can be added here as comma separated key=value pairs.

More extensive description of the installation process is available on the following [page](https://github.com/open-telemetry/opentelemetry-dotnet-instrumentation/blob/main/docs/iis-instrumentation.md). Advanced configuration methods are described  [here](https://github.com/open-telemetry/opentelemetry-dotnet-instrumentation/blob/main/docs/config.md#configuration-methods).

#### Instrumentation logs

Internal OpenTelemetry DotNet auto-instrumentation logs are available in:
* Windows: `%ProgramData%\OpenTelemetry .NET AutoInstrumentation\logs`
* Linux: `/var/log/opentelemetry/dotnet`
* macOS: `/var/log/opentelemetry/dotnet`

For more information see the [documentation](https://github.com/open-telemetry/opentelemetry-dotnet-instrumentation/blob/main/docs/config.md#internal-logs).

## Instrument a ASP.NET Core application (library instrumentation)

There are a few simple steps to instrument the application and obtain telemetry data.

### Step 1. Install packages

The installation of the packages listed below is required to apply the instrumentation and export telemetry data.

```bash
$ dotnet add package OpenTelemetry -v 1.8.1
$ dotnet add package OpenTelemetry.Exporter.OpenTelemetryProtocol -v 1.8.1
$ dotnet add package OpenTelemetry.Instrumentation.AspNetCore -v 1.8.1
$ dotnet add package OpenTelemetry.Extensions.Hosting -v 1.8.1
```

### Step 2. Initialize instrumentation

In this step, all the magic related to code instrumentation will happen. To enable instrumentation in the application it is enough to add the code below into your Startup class in the ConfigureServices method.

In the code line `.AddAspNetCoreInstrumentation()` add the [OpenTelemetry instrumentation](https://github.com/open-telemetry/opentelemetry-dotnet/tree/Instrumentation.AspNetCore-1.8.1/src/OpenTelemetry.Instrumentation.AspNetCore#aspnet-core-instrumentation-for-opentelemetry-net) to the .NET Core application. Line `.SetResourceBuilder()` reads `OTEL_RESOURCE_ATTRIBUTES` environment variable. This gives possibility to configure service name, application and other attributes. The last line `.UseOtlpExporter()` is responsible for the configuration of the [OpenTelemetryProtocol Exporter](https://github.com/open-telemetry/opentelemetry-dotnet/tree/core-1.8.1/src/OpenTelemetry.Exporter.OpenTelemetryProtocol#otlp-exporter-for-opentelemetry-net).

```cs
// If your application is .NET Standard 2.1 or above, and you are using an  
// an insecure (http) endpoint, the following switch must be set.
// Usually needed when exporting telemetry data to the OpenTelemetry Collector distribution.
AppContext.SetSwitch("System.Net.Http.SocketsHttpHandler.Http2UnencryptedSupport", true)

// Initialize OTel builder
var otel = builder.Services.AddOpenTelemetry();

// Set resources
var otelResources = ResourceBuilder.CreateEmpty()
    .AddTelemetrySdk()
    .AddEnvironmentVariableDetector();

// Configure tracing
otel.WithTracing(tracing =>
{
   tracing.AddAspNetCoreInstrumentation();
   tracing.SetResourceBuilder(otelResources);
   tracing.AddOtlpExporter()
   // Just for troubleshooting purposes to see if spans are generated and printed out to logs.
   // tracing.AddConsoleExporter();
});

var app = builder.Build();

```

### Step 3. Configure instrumentation

The final step is to provide configuration for instrumentation. There are a few things which have to be configured: exporter endpoint, service, and application name. Configuration can be provided using environment variables or `appsettings.json` file.

#### Environment variables

* `OTEL_EXPORTER_OTLP_PROTOCOL=http/protobuf`. Configures OTLP exporter to use OTLP HTTP protocol
* `OTEL_EXPORTER_OTLP_ENDPOINT=http://OTLP_HTTP_ENDPOINT:4318/v1/traces`. Environment variable configures the endpoint where telemetry data will be sent. The value of the variable points to OpenTelemetry Collector/Agent (recommended for production) or [OTLP/HTTP source](/docs/send-data/hosted-collectors/http-source/otlp).
* `OTEL_SERVICE_NAME=SERVICE_NAME`. Configure the service name. Ensure the string value represents its business logic, such as "FinanceServiceCall". This will appear as a tracing service name in Sumo Logic.
* `OTEL_RESOURCE_ATTRIBUTES=application=APPLICATION_NAME`. Configure the application name. This will appear as a tracing application name in Sumo Logic. Additional attributes can be added here as comma separated key=value pairs.

#### appsettings.json file

In `appsettings.json` file add the following key value pairs:

```json
{
   "OTEL_EXPORTER_OTLP_ENDPOINT": "YOUR_OTLP_HTTP_ENDPOINT/v1/traces",
   "OTEL_SERVICE_NAME": "YOUR_SERVICE_NAME",
   ...
}
```

The final step is to modify tracing configuration code like in example below.

```cs
// Get OTLP endpoint URL from appsettings.json
var otelTracingExporterEndpoint = builder.Configuration.GetValue<String>("OTEL_EXPORTER_OTLP_ENDPOINT");

// Get service name from appsettings.json
var otelServiceName = builder.Configuration.GetValue<String>("OTEL_SERVICE_NAME");

// Set resources
var otelResources = ResourceBuilder.CreateEmpty()
   // Configure service name
   .AddService(serviceName: otelServiceName)

   // Add your additional attributes e.g. application=AssetDomain
   .AddAttributes(new Dictionary<string, object>
   {
      ["application"] = "YOUR_APPLICATION_NAME",
      ["other_attribute"] = "YOUR_OTHER_ATTRIBUTE",
   })
   .AddTelemetrySdk();

// Configure tracing
otel.WithTracing(tracing =>
{
   tracing.AddAspNetCoreInstrumentation();
   tracing.SetResourceBuilder(otelResources);
   tracing.AddOtlpExporter(opts =>
      {
         opts.Endpoint = new System.Uri(otelTracingExporterEndpoint);
         opts.Protocol = OtlpExportProtocol.HttpProtobuf;
      });
   // Just for troubleshooting purposes to see if spans are generated and printed out to logs.
   // tracing.AddConsoleExporter();
});
```

## Instrument a ASP.NET application (library instrumentation)

Instrumentation of the .NET application requires a little more effort but is still simple.

### Step 1. Install packages

The installation of the packages listed below is required to apply the instrumentation and export telemetry data.

```bash
$ dotnet add package OpenTelemetry -v 1.8.0
$ dotnet add package OpenTelemetry.Exporter.OpenTelemetryProtocol -v 1.8.0
$ dotnet add package OpenTelemetry.Instrumentation.AspNet -v 1.8.0-beta.2
$ dotnet add package OpenTelemetry.Instrumentation.AspNet.TelemetryHttpModule -v 1.8.0-beta.2
$ dotnet add package OpenTelemetry.Extensions.Hosting -v 1.8.0
```

### Step 2. Web.config file changes

After packages installation some entries should appear in the Web.config file.  

In `<system.web>` section additional HTTP Module should be added:

```xml
<system.web>
   <httpModules>
       <add name="TelemetryHttpModule"
            type="OpenTelemetry.Instrumentation.AspNet.TelemetryHttpModule,
                  OpenTelemetry.Instrumentation.AspNet.TelemetryHttpModule"/>
   </httpModules>
</system.web>
```
 

In `<system.webServer>` section additional HTTP Module should be added:  

```xml
<system.webServer>
   <modules>
       <add name="TelemetryHttpModule"
            type="OpenTelemetry.Instrumentation.AspNet.TelemetryHttpModule,
                  OpenTelemetry.Instrumentation.AspNet.TelemetryHttpModule"
            preCondition="managedHandler" />
   </modules>
</system.webServer>
```

### Step 3. Instrumentation initialization

To enable [.NET instrumentation](https://github.com/open-telemetry/opentelemetry-dotnet-contrib/tree/Instrumentation.AspNet-1.8.0-beta.3/src/OpenTelemetry.Instrumentation.AspNet#aspnet-instrumentation-for-opentelemetry) some additional code has to be introduced. The code needs to be added at the application startup phase usually located in the **Global.asax.cs** file. A few things in the code below were added.

`private TracerProvider tracerProvider` was added as a class variable to create the trace provider in the next step. In the `Application_Start()` method, `Sdk.CreateTracerProviderBuilder()` was introduced. Thanks to this it is possible to configure what can be instrumented and where the telemetry data will be sent.

`.AddAspNetInstrumentation()` adds .NET instrumentation. The service name and application attributes are set by the `.SetResourceBuilder()` which reads the values from the `OTEL_RESOURCE_ATTRIBUTES` environment variable. An exporter has to be configured to send the spans. In this case, it is the [OpenTelemetryProtocol exporter](https://github.com/open-telemetry/opentelemetry-dotnet/tree/core-1.8.0/src/OpenTelemetry.Exporter.OpenTelemetryProtocol#otlp-exporter-for-opentelemetry-net) which is configured by the `.AddOtlpExporter()` method.

```cs
public class MvcApplication : System.Web.HttpApplication
{   
   private TracerProvider tracerProvider;

   protected void Application_Start()
   {   
       this.tracerProvider = Sdk.CreateTracerProviderBuilder()
           .AddAspNetInstrumentation()
           .SetResourceBuilder(ResourceBuilder.CreateDefault()
                    .AddTelemetrySdk()
                    .AddEnvironmentVariableDetector())
           .AddOtlpExporter()
         // Add ConsoleExporter to see generated spans in the application log console
         // just for troubleshooting purposes
         // .AddConsoleExporter()
           .Build();

       AreaRegistration.RegisterAllAreas();
       FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
       RouteConfig.RegisterRoutes(RouteTable.Routes);
       BundleConfig.RegisterBundles(BundleTable.Bundles);
   }

   protected void Application_End()
   {
       this.tracerProvider?.Dispose();
   }
}
```

### Step 4. Instrumentation configuration

The final step is to provide configuration for instrumentation. There are a few things which have to be configured: exporter endpoint, service, and application name. Configuration can be provided using environment variables or `web.config` file.

#### Environment variables

* `OTEL_EXPORTER_OTLP_PROTOCOL=http/protobuf`. Configures OTLP exporter to use OTLP HTTP protocol
* `OTEL_EXPORTER_OTLP_ENDPOINT=http://OTLP_HTTP_ENDPOINT:4318/v1/traces`. Environment variable configures the endpoint where telemetry data will be sent. The value of the variable points to OpenTelemetry Collector/Agent (recommended for production) or [OTLP/HTTP source](/docs/send-data/hosted-collectors/http-source/otlp).
* `OTEL_SERVICE_NAME=SERVICE_NAME`. Configure the service name. Ensure the string value represents its business logic, such as "FinanceServiceCall". This will appear as a tracing service name in Sumo Logic.
* `OTEL_RESOURCE_ATTRIBUTES=application=APPLICATION_NAME`. Configure the application name. This will appear as a tracing application name in Sumo Logic. Additional attributes can be added here as comma separated key=value pairs.

#### web.config file

In `web.config` file add in the `appSettings` section all required configuration options like in example below.

```xml
<configuration>
  <appSettings>
    <add key="OTEL_SERVICE_NAME" value="YOUR_SERVICE_NAME" />
    <add key="OTEL_EXPORTER_OTLP_ENDPOINT" value="https://YOUR_OTLP_HTTP_ENDPOINT/v1/traces" />
  </appSettings>
  ...
</configuration>
```

It will be required to modify `tracerProvider` like in example below:

```cs
   string serviceName = System.Configuration.ConfigurationManager.AppSettings["OTEL_SERVICE_NAME"];
   string exporterEndpoint = System.Configuration.ConfigurationManager.AppSettings["OTEL_EXPORTER_OTLP_ENDPOINT"];
   List<KeyValuePair<string, object>> resourceAttributes = new List<KeyValuePair<string, object>>
   {
         new KeyValuePair<string, object>("application", "YOUR_APPLICATION_NAME"),
         new KeyValuePair<string, object>("other_attrib", "YOUR_OTHER_ATTRIBUTE"),
   };

   tracerProvider = Sdk.CreateTracerProviderBuilder()
      .SetResourceBuilder(ResourceBuilder.CreateDefault()
         .AddService(serviceName: serviceName)
         .AddAttributes(resourceAttributes)
         .AddTelemetrySdk())
      .AddAspNetInstrumentation()
      .AddHttpClientInstrumentation()
      .AddOtlpExporter(opts =>
      {
         opts.Endpoint = new System.Uri(exporterEndpoint);
         opts.Protocol = OtlpExportProtocol.HttpProtobuf;
      })
      // Add ConsoleExporter to see generated spans in the application log console
      // just for troubleshooting purposes
      // .AddConsoleExporter()
      .Build();
```

## Additional libraries instrumentation

In the case of the other libraries like GrpcNetClient, HttpClient, StackExchangeRedis, and SqlClient, it is highly recommended to install specific packages by adding a single line of code in the application startup methods. This will ensure full end-to-end visibility includingthe health of client calls. To see all supported instrumentation libraries please check [OpenTelemetry Dotnet Contrib repository](https://github.com/open-telemetry/opentelemetry-dotnet-contrib/tree/main/src).

### GrpcNetClient instrumentation

Requires installation of the package:

```bash
$ dotnet add package OpenTelemetry.Instrumentation.GrpcNetClient -v 1.8.0-beta.1
```

and a small code change, in addition to the GrpcClient instrumentation `.AddGrpcClientInstrumentation()`. More details can be found [here](https://github.com/open-telemetry/opentelemetry-dotnet/tree/Instrumentation.GrpcNetClient-1.8.0-beta.1/src/OpenTelemetry.Instrumentation.GrpcNetClient#grpcnetclient-instrumentation-for-opentelemetry).

   ```cs title=".NET Core code example"
   services.AddOpenTelemetryTracing((builder) => builder
         .AddAspNetCoreInstrumentation()
         .AddGrpcClientInstrumentation()
   ```

   ```cs title=".NET code example"
   this.tracerProvider = Sdk.CreateTracerProviderBuilder()
         .AddAspNetInstrumentation()
         .AddGrpcClientInstrumentation()
   ```

### HttpClient instrumentation

Requires installation of the package:

```bash
$ dotnet add package OpenTelemetry.Instrumentation.Http -v 1.8.0
```

and a small code change, in addition to the HttpClient instrumentation
`.AddHttpClientInstrumentation()`. More details can be found
[here](https://github.com/open-telemetry/opentelemetry-dotnet/tree/Instrumentation.Http-1.8.0/src/OpenTelemetry.Instrumentation.Http#httpclient-and-httpwebrequest-instrumentation-for-opentelemetry).

    ```cs title=".NET Core code example"
    services.AddOpenTelemetryTracing((builder) => builder
       .AddAspNetCoreInstrumentation()
       .AddHttpClientInstrumentation()
    ```  

    ```cs title=".NET code example"
    this.tracerProvider = Sdk.CreateTracerProviderBuilder()
           .AddAspNetInstrumentation()
           .AddHttpClientInstrumentation()
    ```

### Redis instrumentation

Requires installation of the package:

```bash
$ dotnet add package OpenTelemetry.Instrumentation.StackExchangeRedis -v 1.0.0-rc14
```

and a small code change, in addition to the Redis instrumentation `.AddRedisInstrumentation(connection)` Redis instrumentation requires a connection to the Redis server. More details can be found [here](https://github.com/open-telemetry/opentelemetry-dotnet-contrib/tree/Instrumentation.StackExchangeRedis-1.0.0-rc9.14/src/OpenTelemetry.Instrumentation.StackExchangeRedis#stackexchangeredis-instrumentation-for-opentelemetry).

   ```cs title=".NET Core code example"
   services.AddOpenTelemetryTracing((builder) => builder
         .AddAspNetCoreInstrumentation()
         .AddRedisInstrumentation(connection)
   ```

   ```cs title=".NET code example"
   this.tracerProvider = Sdk.CreateTracerProviderBuilder()
           .AddAspNetInstrumentation()
           .AddRedisInstrumentation(connection)
   ```

### SqlClient instrumentation

Requires installation of the package:

```bash
$ dotnet add package OpenTelemetry.Instrumentation.SqlClient -v 1.8.0-beta.1
```

and a small code change, in addition to the SqlClient instrumentation `.AddSqlClientInstrumentation()`. More details can be found [here](https://github.com/open-telemetry/opentelemetry-dotnet/tree/Instrumentation.SqlClient-1.8.0-beta.1/src/OpenTelemetry.Instrumentation.SqlClient).

   ```cs title=".NET Core code example"
   services.AddOpenTelemetryTracing((builder) => builder
       .AddAspNetCoreInstrumentation()
       .AddSqlClientInstrumentation()
   ```

   ```cs title=".NET code example"
   this.tracerProvider = Sdk.CreateTracerProviderBuilder()
           .AddAspNetInstrumentation()
           .AddSqlClientInstrumentation()
   ```
