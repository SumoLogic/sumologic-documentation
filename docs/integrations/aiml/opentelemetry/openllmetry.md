---
id: openllmetry
title: OpenLLMetry
sidebar_label: OpenLLMetry - OpenTelemetry Collector or OTLP/HTTP Source
description: Learn about the Sumo Logic OpenTelemetry app for OpenLLMetry.
---

<head>
 <meta name="robots" content="noindex" />
</head>

<p><a href={useBaseUrl('docs/beta')}><span className="beta">Beta</span></a></p>

import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/OpenLLMetry/OpenLLMetry.png' alt="Thumbnail icon" width="175"/> <img src={useBaseUrl('img/send-data/otel-color.svg')} alt="Thumbnail icon" width="35"/>

OpenLLMetry is an open-source observability framework designed to provide visibility into applications built using Large Language Models (LLMs), Vector databases, AL Frameworks, Protocal (MCP). Built on top of OpenTelemetry standards, it enables developers and operations teams to collect and analyze telemetry data such as traces, metrics, and application-specific events generated during interactions.

With OpenLLMetry, you can monitor the complete lifecycle of LLM requests, including prompt execution, model responses, latency, token usage, and errors. It also helps track how different components—such as LLM providers, APIs, vector databases, frameworks, and supporting services—interact within AI/ML applications.

By capturing these insights, OpenLLMetry helps you troubleshoot issues faster, optimize performance, and gain deeper visibility into AI/ML systems and LLM-powered workflows.

## Setup

The OpenLLMetry SDK (Traceloop) uses the standard OpenTelemetry protocol, allowing you to use any OpenTelemetry collector. This provides flexibility to connect to any observability backend of your choice, such as Sumo Logic.

It supports SDKs in different languages [Python](https://traceloop.com/docs/openllmetry/getting-started-python), [Golang](https://traceloop.com/docs/openllmetry/getting-started-go), [Next.js](https://traceloop.com/docs/openllmetry/getting-started-nextjs), [Nodejs](https://traceloop.com/docs/openllmetry/getting-started-ts), [Ruby](https://traceloop.com/docs/openllmetry/getting-started-ruby).

There are two ways of collecting data:
- Set up the destination as the **OpenTelemetry collector**.
- Set up the destination as the **OTLP/HTTP source**.

### Set up the destination as the OpenTelemetry collector

1. Install Sumo Logic OpenTelemetry collector with Default configuration. Use default configuration and follow the installation instructions provided in [Create an OTLP/HTTP Source](/docs/send-data/opentelemetry-collector/).
2. Install OpenLLMetry SDK on host.
```bash
pip install traceloop-sdk
```
3. Set Environment for collector otlp endpoint.
```bash
export TRACELOOP_BASE_URL="http://localhost:4318"
```
4. Instrument your application for OpenLLMetry.
```python
from traceloop.sdk import Traceloop
Traceloop.init()
```

### Set up the destination as the OTLP/HTTP source

1. Install Sumo Logic hosted collector.
Follow the installation instructions provided [here](/docs/send-data/hosted-collectors/configure-hosted-collector/).
2. Create Sumo Logic OTLP/HTTP Source under Hosted Collector.
Follow the installation instructions provided [here](/docs/send-data/hosted-collectors/http-source/otlp/#create-an-otlphttpsource)
3. Use endpoint URL in Instrumentation code
    - Click on **Show URL** as display in below image on your OTLP/HTTP Source.<br/><img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/OpenLLMetry/OTLP-HTTP-Source.png' alt="Source" style={{border: '1px solid gray'}} width="800"/>
    - **Presigned URL**
        - Use a complete URL with embedded authentication.<br/><img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/OpenLLMetry/Presigned-URL.png' alt="PresignedURL" style={{border: '1px solid gray'}} width="800"/>
        - Traces instrumentation
        ```python
        OTLP_ENDPOINT="https://collectors.sumologic.com/receiver/v1/otlp/<TOKEN>"
        Traceloop.init(
            app_name="http-trace-demo",
            api_endpoint=OTLP_ENDPOINT,
        )
        ```
        or 
        ```python
        OTLP_ENDPOINT="https://collectors.sumologic.com/receiver/v1/otlp/<TOKEN>/v1/traces"
        Traceloop.init(
            app_name="http-trace-demo",
            api_endpoint=OTLP_ENDPOINT,
        )
        ```
        - Logs and metrics - See [Data differentiation](/docs/send-data/hosted-collectors/http-source/otlp/#data-differentiation).
    - **Auth Header**
        - Use a base URL with separate authentication header.<br/><img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/OpenLLMetry/Auth-Header.png' alt="AuthHeader" style={{border: '1px solid gray'}} width="800"/>
        - Trace instrumentation
        ```python
        HTTP_SOURCE_TOKEN = "<TOKEN>"
        OTEL_EXPORTER_OTLP_ENDPOINT="https://collectors.sumologic.com/receiver/v1/otlp"

        Traceloop.init(
            app_name="http-trace-with-auth-header-demo",
            api_endpoint=OTEL_EXPORTER_OTLP_ENDPOINT,
            headers={"x-sumo-token": HTTP_SOURCE_TOKEN},
            disable_batch=True
        )
        ```

## Instrument sample application for OpenLLMetry

The following sample code demonstrates a practical implementation of Chroma as a vector database.

### Prerequisites

Before running the code, install required libraries:

```python
    pip install chromadb sentence-transformers traceloop-sdk
```

Library Overview
- **Chroma**: Used to store and query document embeddings for semantic search.
- **SentenceTransformers**: Generates embeddings using the model `all-MiniLM-L6-v2`.
- **OpenLLMetry**(Traceloop): Adds observability to the workflow by tracing tasks using OpenTelemetry.

### How it works
   
This example demonstrates a practical implementation of a vector search system using the Chroma with a local embedding model.
#### Step 1: Initialize tracing

The application initializes **Traceloop** to enable observability and trace the workflow and tasks during execution.
The **OpenLLMetry SDK(Traceloop)** is configured to export telemetry data using the **OpenTelemetry protocol(OTLP)**.

The following two configurations are supported:

- **Using an OpenTelemetry collector**. For OpenTelemetry collector, the endpoint connects to `http://localhost:4318`, and the Sumo Logic exporter forwards the collected data to the SaaS platform.
- **Using an OTLP/HTTP directly**. For OTLP/HTTP source, the endpoint connects to `https://collectors.sumologic.com/receiver/v1/otlp`.

#### Step 2: Load the embedding model

- The embedding model `all-MiniLM-L6-v2` is loaded using **SentenceTransformers**.
- This model converts text into vector embeddings that can be used for semantic search and similarity comparison.

#### Step 3: Create a vector collection

- A collection named `company_data` is created in **Chroma**.
- This collection stores documents and their corresponding vector embeddings.

#### Step 4: Store documents

- Sample documents describing companies are added to the collection.
- Each document is automatically converted into a vector embedding using the embedding model.

#### Step 5: Perform a semantic query

When you submit a question:
- The query is converted into an embedding.
- Chroma performs a similarity search against the stored document embeddings.

#### Step 6: Return relevant results

The system returns the top matching documents that are semantically similar to the query. This enables efficient retrieval of relevant information based on meaning rather than exact keyword matches.

### Sample code

<details>
<summary>OpenTelemetry collector</summary>

   ```python title="Otel Collector"
    import chromadb
    from chromadb.utils import embedding_functions
    
    from traceloop.sdk import Traceloop
    from traceloop.sdk.decorators import workflow, task
    
    Traceloop.init(app_name="openllmetry-trace-demo")
    
    # Local embedding model (runs locally)
    hf_ef = embedding_functions.SentenceTransformerEmbeddingFunction(
        model_name="all-MiniLM-L6-v2"
    )
    
    @task(name="create_collection")
    def create_collection():
        client = chromadb.Client()
    
        collection = client.get_or_create_collection(
            name="company_data",
            embedding_function=hf_ef
        )
    
        collection.add(
            documents=[
                "Sumologic provides software intelligence and observability solutions.",
                "OpenAI develops artificial intelligence models.",
                "AWS provides cloud infrastructure services."
            ],
            ids=["1", "2", "3"]
        )
        return collection
    
    
    @task(name="query_collection")
    def query_collection(question):
        collection = create_collection()
    
        results = collection.query(
            query_texts=[question],
            n_results=2
        )
    
        return results
    
    
    @workflow(name="chromadb_search")
    def search_company_info():
        question = "What does Sumologic do?"
        return query_collection(question)
    
    
    if __name__ == "__main__":
        print(search_company_info())
   ```

#### Trace overview
  
<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/OpenLLMetry/Traces-Sumo-Logic.png' alt="Traces-Sumo-Logic" style={{border: '1px solid gray'}} width="800"/>

#### Trace view detail

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/OpenLLMetry/Trace-View-Sumo-Logic.png' alt="Traces-Sumo-Logic" style={{border: '1px solid gray'}} width="800"/>

</details>

<details>
<summary>OTLP/HTTP source-auth header</summary>

    ```python title="OTLP/HTTP source-Auth Header"
    import chromadb
    from chromadb.utils import embedding_functions
    
    from traceloop.sdk import Traceloop
    from traceloop.sdk.decorators import workflow, task
    
    HTTP_SOURCE_TOKEN = "<TOKEN>"
    OTEL_EXPORTER_OTLP_ENDPOINT="https://collectors.sumologic.com/receiver/v1/otlp"
    
    Traceloop.init(
        app_name="http-trace-with-auth-header-demo",
        api_endpoint=OTEL_EXPORTER_OTLP_ENDPOINT,
        headers={"x-sumo-token": HTTP_SOURCE_TOKEN},
        disable_batch=True
    )
    
    
    # Local embedding model (runs locally)
    hf_ef = embedding_functions.SentenceTransformerEmbeddingFunction(
        model_name="all-MiniLM-L6-v2"
    )
    
    @task(name="create_collection")
    def create_collection():
        client = chromadb.Client()
    
        collection = client.get_or_create_collection(
            name="company_data",
            embedding_function=hf_ef
        )
    
        collection.add(
            documents=[
                "Sumologic provides software intelligence and observability solutions.",
                "OpenAI develops artificial intelligence models.",
                "AWS provides cloud infrastructure services."
            ],
            ids=["1", "2", "3"]
        )
        return collection
    
    
    @task(name="query_collection")
    def query_collection(question):
        collection = create_collection()
    
        results = collection.query(
            query_texts=[question],
            n_results=2
        )
    
        return results
    
    
    @workflow(name="chromadb_search")
    def search_company_info():
        question = "What does Sumologic do?"
        return query_collection(question)
    
    
    if __name__ == "__main__":
        print(search_company_info())
   ```

#### Trace overview

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/OpenLLMetry/Traces-Sumo-Logic-OTLP-HTTP-Source.png' alt="Traces-Sumo-Logic" style={{border: '1px solid gray'}} width="800"/>

#### Trace view detail

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/OpenLLMetry/Trace-View-Sumo-Logic-OTLP-HTTP-Source.png' alt="Traces-Sumo-Logic" style={{border: '1px solid gray'}} width="800"/>

</details>