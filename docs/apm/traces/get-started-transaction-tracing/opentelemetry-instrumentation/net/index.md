---
slug: /apm/traces/get-started-transaction-tracing/opentelemetry-instrumentation/net
title: .NET OpenTelemetry auto-instrumentation
sidebar_label: .NET OpenTelemetry auto-instrumentation
description: The simplest way to start capturing telemetry data is to implement the solution coming from OpenTelemetry-dotNet.
---

Automatic instrumentation of the .NET applications is a very easy task. The simplest way to start capturing telemetry data is to implement the solution coming from OpenTelemetry-dotNet. All the libraries shipped with the [OpenTelemetry-dotNet](https://github.com/open-telemetry/opentelemetry-dotnet) repository support all the officially supported versions of .NET Core (including deployments in the [Microsoft Azure Service Fabric Containers](https://docs.microsoft.com/en-us/azure/service-fabric/service-fabric-containers-overview)) and .NET framework with an except for .NET Framework 3.5 SP1. See this [list of the supported libraries](https://github.com/open-telemetry/opentelemetry-dotnet#getting-started).

# .Net full auto-instrumentation vs library-instrumentation (partial auto)

It is important to understand difference between two types of instrumentations that
are available in .Net. First one, is fully automatic one that does not require
code. Second one, requires some initialization that has to be done in the code
and is called library instrumentation by opentelemetry community. It is partial
auto-instrumentation as traces are generated automatically depending on settings
provided by developer(s) during initialization phase.

:::note
The below description applies to v0.7.0.
:::

## How to instrument a .NET application automatically (Windows)

OpenTelemetry .NET Automatic Instrumentation has to be installed via Powershell
module, process require administrator permissions.

```powershell
# Download the module
$module_url = "https://raw.githubusercontent.com/open-telemetry/opentelemetry-dotnet-instrumentation/v0.7.0/OpenTelemetry.DotNet.Auto.psm1"
$download_path = Join-Path $env:temp "OpenTelemetry.DotNet.Auto.psm1"
Invoke-WebRequest -Uri $module_url -OutFile $download_path -UseBasicParsing

# Import the module to use its functions
Import-Module $download_path

# Install core files (online vs offline method)
Install-OpenTelemetryCore
```

After installation, we can set service name and run application

```powershell
# Set up the instrumentation for the current PowerShell session.
# Can be done via environment variable.
Register-OpenTelemetryForCurrentSession -OTelServiceName "MyServiceDisplayName"
```

The final step is to configure the exporter endpoint, service and application name otherwise defaults will be used. In this example, the instrumentation will be configured by environment variables.

* `OTEL_EXPORTER_OTLP_PROTOCOL=http/protobuf` - configures OTLP exporter to use OTLP HTTP protocol
* `OTEL_EXPORTER_OTLP_ENDPOINT=http://collection-sumologic-otelcol.sumologic:55681` - environment variable configures the endpoint where telemetry data will be sent. The value of the variable points to the default Sumologic Kubernetes Collector.
* `OTEL_SERVICE_NAME=SERVICE_NAME` - configure the service name. Ensure the string value represents its business logic, such as "FinanceServiceCall". This will appear as a tracing service name in Sumo Logic.
* `OTEL_RESOURCE_ATTRIBUTES=application=APPLICATION_NAME` - configure the application name. This will appear as a tracing application name in Sumo Logic. Additional attributes can be added here as comma separated key=value pairs.

More extensive description of all available options can be found [here](https://github.com/open-telemetry/opentelemetry-dotnet-instrumentation/blob/main/docs/config.md)

```powershell
# Run your application with instrumentation
.\MyNetApp.exe
```


### ASP.NET application on IIS

ASP.NET application that runs on IIS requires two additional steps.

#### Step 1. Setup IIS instrumentation

This step requires to execute following command in powerhell.

```powershell
# Setup IIS instrumentation
Register-OpenTelemetryForIIS
```

#### Step 2. Define opentelemetry modules loaded by IIS

There are two options in order to achieve the goal.

First, update application `web.config` with following section.

```xml
  <system.webServer>
    <validation validateIntegratedModeConfiguration="false" />
    <modules>
      <remove name="TelemetryHttpModule" />
      <add name="TelemetryHttpModule" type="OpenTelemetry.Instrumentation.AspNet.TelemetryHttpModule, OpenTelemetry.Instrumentation.AspNet.TelemetryHttpModule" preCondition="managedHandler" />
    </modules>
  </system.webServer>
```

Second, update `applicationHost.config` which is located in located in `%SystemDrive%\Windows\system32\inetsrv\config` like below.

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

* `OTEL_EXPORTER_OTLP_PROTOCOL=http/protobuf` - configures OTLP exporter to use OTLP HTTP protocol
* `OTEL_EXPORTER_OTLP_ENDPOINT=http://collection-sumologic-otelcol.sumologic:55681` - environment variable configures the endpoint where telemetry data will be sent. The value of the variable points to the default Sumologic Kubernetes Collector.
* `OTEL_SERVICE_NAME=SERVICE_NAME` - configure the service name. Ensure the string value represents its business logic, such as "FinanceServiceCall". This will appear as a tracing service name in Sumo Logic.
* `OTEL_RESOURCE_ATTRIBUTES=application=APPLICATION_NAME` - configure the application name. This will appear as a tracing application name in Sumo Logic. Additional attributes can be added here as comma separated key=value pairs.

More extensive description is available on the following [page](https://github.com/open-telemetry/opentelemetry-dotnet-instrumentation/blob/main/docs/iis-instrumentation.md)

## How to instrument your ASP.NET Core application (library instrumentation)

There are a few simple steps to instrument the application and obtain telemetry data.

### Step 1. Packages installation

The installation of the packages listed below is required to apply the instrumentation and export telemetry data.

```bash
$ dotnet add package OpenTelemetry -v 1.2.0-rc2 $ dotnet add package OpenTelemetry.Exporter.OpenTelemetryProtocol -v 1.2.0-rc2
$ dotnet add package OpenTelemetry.Instrumentation.AspNetCore -v 1.0.0-rc9
$ dotnet add package OpenTelemetry.Extensions.Hosting -v 1.0.0-rc9
```

### Step 2. Instrumentation with OpenTelemetryProtocol exporter

In this step, all the magic related to code instrumentation will happen. To enable instrumentation in the application it is enough to add the code below into your Startup class in the ConfigureServices method.

In the code line `.AddAspNetCoreInstrumentation()` add the [OpenTelemetry instrumentation](https://github.com/open-telemetry/opentelemetry-dotnet/tree/1.0.0-rc7/src/OpenTelemetry.Instrumentation.AspNetCore#aspnet-core-instrumentation-for-opentelemetry-net) to the .NET Core application. Line `.SetResourceBuilder()` reads `OTEL_RESOURCE_ATTRIBUTES` environment variable. This gives possibility to configure service name, application and other attributes. The last line `.AddOtlpExporter()` is responsible for the configuration of the [OpenTelemetryProtocol Exporter](https://github.com/open-telemetry/opentelemetry-dotnet/tree/core-1.2.0-rc2/src/OpenTelemetry.Exporter.OpenTelemetryProtocol#otlp-exporter-for-opentelemetry-net).

```cs
public void ConfigureServices(IServiceCollection services)
{

// If your application is .NET Standard 2.1 or above, and you are using an  
// an insecure (http) endpoint, the following switch must be set before adding // OtlpExporter.
AppContext.SetSwitch("System.Net.Http.SocketsHttpHandler.Http2UnencryptedSupport", true)

services.AddOpenTelemetryTracing(builder => builder
       .AddAspNetCoreInstrumentation()
       .SetResourceBuilder(ResourceBuilder.CreateDefault()
                    .AddTelemetrySdk()
                    .AddEnvironmentVariableDetector())
       .AddOtlpExporter()
   );
}
```

The final step is to configure the exporter endpoint, service and application name. In this example, the instrumentation will be configured by environment variables.

* `OTEL_EXPORTER_OTLP_PROTOCOL=http/protobuf` - configures OTLP exporter to use OTLP HTTP protocol
* `OTEL_EXPORTER_OTLP_ENDPOINT=http://collection-sumologic-otelcol.sumologic:55681` - environment variable configures the endpoint where telemetry data will be sent. The value of the variable points to the default Sumologic Kubernetes Collector.
* `OTEL_SERVICE_NAME=SERVICE_NAME` - configure the service name. Ensure the string value represents its business logic, such as "FinanceServiceCall". This will appear as a tracing service name in Sumo Logic.
* `OTEL_RESOURCE_ATTRIBUTES=application=APPLICATION_NAME` - configure the application name. This will appear as a tracing application name in Sumo Logic. Additional attributes can be added here as comma separated key=value pairs.

## How to instrument your ASP.NET application (library instrumentation)

Instrumentation of the .NET application requires a little more effort but is still simple.

### Step 1. Packages installation

The installation of the packages listed below is required to apply the instrumentation and export telemetry data.

```bash
$ dotnet add package OpenTelemetry -v 1.2.0-rc2
$ dotnet add package OpenTelemetry.Exporter.OpenTelemetryProtocol -v 1.2.0-rc2
$ dotnet add package OpenTelemetry.Instrumentation.AspNet -v 1.0.0-rc9
$ dotnet add package OpenTelemetry.Extensions.Hosting -v 1.0.0-rc9
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

### Step 3. Instrumentation with OpenTelemetryProtocol exporter

To enable [.NET instrumentation](https://github.com/open-telemetry/opentelemetry-dotnet/tree/1.0.0-rc7/src/OpenTelemetry.Instrumentation.AspNet#aspnet-instrumentation-for-opentelemetry) some additional code has to be introduced. The code needs to be added at the application startup phase usually located in the **Global.asax.cs** file. A few things in the code below were added.

`private TracerProvider tracerProvider` was added as a class variable to create the trace provider in the next step. In the `Application_Start()` method, `Sdk.CreateTracerProviderBuilder()` was introduced. Thanks to this it is possible to configure what can be instrumented and where the telemetry data will be sent.

`.AddAspNetInstrumentation()` adds .NET instrumentation. The service name and application attributes are set by the `.SetResourceBuilder()`which reads the values from `OTEL_RESOURCE_ATTRIBUTES` environment variable. An exporter has to be configured to send the spans. In this case, it is the [OpenTelemetryProtocol exporter](https://github.com/open-telemetry/opentelemetry-dotnet/tree/core-1.1.0/src/OpenTelemetry.Exporter.OpenTelemetryProtocol#otlp-exporter-for-opentelemetry-net) which is configured by the `.AddOtlpExporter()` method.

```
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

The final step is to configure the exporter endpoint, service and application name. In this example, the instrumentation will be configured by environment variables.

* `OTEL_EXPORTER_OTLP_PROTOCOL=http/protobuf` - configures OTLP exporter to use OTLP HTTP protocol
* `OTEL_EXPORTER_OTLP_ENDPOINT=http://collection-sumologic-otelcol.sumologic:55681` - environment variable configures the endpoint where telemetry data will be sent. The value of the variable points to the default Sumologic Kubernetes Collector.
* `OTEL_SERVICE_NAME=SERVICE_NAME` - configure the service name. Ensure the string value represents its business logic, such as "FinanceServiceCall". This will appear as a tracing service name in Sumo Logic.
* `OTEL_RESOURCE_ATTRIBUTES=application=APPLICATION_NAME` - configure the application name. This will appear as a tracing application name in Sumo Logic. Additional attributes can be added here as comma separated key=value pairs.

## Additional libraries instrumentation

In the case of the other libraries like GrpcNetClient, HttpClient, StackExchangeRedis, and SqlClient, it is highly recommended to install specific packages by adding a single line of code in the application startup methods. This will ensure full end-to-end visibility includingthe health of client calls. 

### GrpcNetClient instrumentation

Requires installation of the package:

```bash
$ dotnet add package OpenTelemetry.Instrumentation.GrpcNetClient -v 1.0.0-rc9
```

and a small code change, in addition to the GrpcClient instrumentation `.AddGrpcClientInstrumentation()`. More details can be found [here](https://github.com/open-telemetry/opentelemetry-dotnet/tree/1.0.0-rc7/src/OpenTelemetry.Instrumentation.GrpcNetClient#grpcnetclient-instrumentation-for-opentelemetry).

* .NET Core code example:  

   ```
   services.AddOpenTelemetryTracing((builder) => builder
         .AddAspNetCoreInstrumentation()
         .AddGrpcClientInstrumentation()
   ```
     
* .NET code example:  

   ```
   this.tracerProvider = Sdk.CreateTracerProviderBuilder()
         .AddAspNetInstrumentation()
         .AddGrpcClientInstrumentation()
   ```

### HttpClient instrumentation

Requires installation of the package:

```
$ dotnet add package OpenTelemetry.Instrumentation.Http -v 1.0.0-rc9
```

and a small code change, in addition to the HttpClient instrumentation
`.AddHttpClientInstrumentation()`. More details can be found
[here](https://github.com/open-telemetry/opentelemetry-dotnet/tree/1.0.0-rc7/src/OpenTelemetry.Instrumentation.Http#httpclient-and-httpwebrequest-instrumentation-for-opentelemetry).

* .NET Core code example  

    ```
    services.AddOpenTelemetryTracing((builder) => builder
       .AddAspNetCoreInstrumentation()
       .AddHttpClientInstrumentation()
    ```  
     

* .NET code example  

    ```
    this.tracerProvider = Sdk.CreateTracerProviderBuilder()
           .AddAspNetInstrumentation()
           .AddHttpClientInstrumentation()
    ```

### Redis instrumentation

Requires installation of the package:

```bash
$ dotnet add package OpenTelemetry.Instrumentation.StackExchangeRedis -v 1.0.0-rc9
```

and a small code change, in addition to the Redis instrumentation `.AddRedisInstrumentation(connection)` Redis instrumentation requires a connection to the Redis server. More details can be found [here](https://github.com/open-telemetry/opentelemetry-dotnet/tree/1.0.0-rc7/src/OpenTelemetry.Instrumentation.StackExchangeRedis#stackexchangeredis-instrumentation-for-opentelemetry).

* .NET Core code example  

   ```
   services.AddOpenTelemetryTracing((builder) => builder
         .AddAspNetCoreInstrumentation()
         .AddRedisInstrumentation(connection)
   ```
     

* .NET code example  

   ```
   this.tracerProvider = Sdk.CreateTracerProviderBuilder()
           .AddAspNetInstrumentation()
           .AddRedisInstrumentation(connection)
   ```

### SqlClient instrumentation

Requires installation of the package:

```bash
$ dotnet add package OpenTelemetry.Instrumentation.SqlClient -v 1.0.0-rc9
```

and a small code change, in addition to the SqlClient instrumentation `.AddSqlClientInstrumentation()`. More details can be found [here](https://github.com/open-telemetry/opentelemetry-dotnet/tree/1.0.0-rc7/src/OpenTelemetry.Instrumentation.SqlClient#sqlclient-instrumentation-for-opentelemetry).

* .NET Core code example  

   ```
   services.AddOpenTelemetryTracing((builder) => builder
       .AddAspNetCoreInstrumentation()
       .AddSqlClientInstrumentation()
   ```

* .NET code example  

   ```
   this.tracerProvider = Sdk.CreateTracerProviderBuilder()
           .AddAspNetInstrumentation()
           .AddSqlClientInstrumentation()
   ```
