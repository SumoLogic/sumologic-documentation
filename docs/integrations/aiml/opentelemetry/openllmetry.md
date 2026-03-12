---
id: openllmetry
title: OpenLLMetry
sidebar_label: OpenLLMetry - Otel Collector or OTLP/HTTP Source
description: Learn about the Sumo Logic OpenTelemetry app for OpenLLMetry.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/OpenLLMetry/OpenLLMetry.png' alt="Thumbnail icon" width="175"/> <img src={useBaseUrl('img/send-data/otel-color.svg')} alt="Thumbnail icon" width="35"/>

OpenLLMetry is an open-source observability framework designed to provide visibility into applications built using Large Language Models (LLMs), Vector databases, AL Frameworks, Protocal (MCP). Built on top of OpenTelemetry standards, it enables developers and operations teams to collect and analyze telemetry data such as traces, metrics, and application-specific events generated during interactions.

With OpenLLMetry, teams can monitor the complete lifecycle of LLM requests, including prompt execution, model responses, latency, token usage, and errors. It also helps track how different components—such as LLM providers, APIs, vector databases, frameworks, and supporting services—interact within AI/ML applications.

By capturing these insights, OpenLLMetry helps teams troubleshoot issues faster, optimize performance, and gain deeper visibility into AI/ML systems and LLM-powered workflows.

## Setup

The OpenLLMetry SDK (Traceloop) uses the standard OpenTelemetry protocol, allowing you to use any OpenTelemetry Collector. This provides flexibility to connect to any observability backend of your choice, such as Sumologic.

It supports SDKs in different languages [Python](https://traceloop.com/docs/openllmetry/getting-started-python), [Golang](https://traceloop.com/docs/openllmetry/getting-started-go), [Next.js](https://traceloop.com/docs/openllmetry/getting-started-nextjs), [Nodejs](https://traceloop.com/docs/openllmetry/getting-started-ts), [Ruby](https://traceloop.com/docs/openllmetry/getting-started-ruby).

### Collection Setup and Configuration

#### There are two ways of doing collections:
    1. Setup the destination as an **Otel Collector**.
    2. Setup the destination as an **OTLP/HTTP source**.

#### Setup the destination as an **Otel Collector**.

* **Step1**. Install Sumologic Otel Collector with Default configuration  
   Use default configuration and follow the installation instructions provided [here](/docs/send-data/opentelemetry-collector/)

* **Step2**. Install OpenLLMetry SDK on host
  ```bash
   pip install traceloop-sdk
  ```
* **Step3**. Set Environment for collector otlp endpoint
  ```bash
   export TRACELOOP_BASE_URL="http://localhost:4318"
  ```
* **Step4**. Instrument your application for OpenLLMetry
  ```python
    from traceloop.sdk import Traceloop
    Traceloop.init()
  ```
#### Setup the destination as an **OTLP/HTTP source**
* **Step1**.  Install Sumologic Hosted Collector
   Follow the installation instructions provided [here](/docs/send-data/hosted-collectors/configure-hosted-collector/)

* **Step2**. Create Sumologic OTLP/HTTP Source under Hosted Collector
   Follow the installation instructions provided [here](/docs/send-data/hosted-collectors/http-source/otlp/#create-an-otlphttpsource)

* **Step3**. Use endpoint url in Instrumentation code
  - Click on **Show URL** as display in below image on your OTLP/HTTP Source 
    <img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/OpenLLMetry/OTLP-HTTP-Source.png' alt="Source" width="800"/>
  * Presigned URL
    * Use a complete URL with embedded authentication
    <img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/OpenLLMetry/Presigned-URL.png' alt="PresignedURL" width="800"/>
    * Traces Instrumentation
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
    * Logs, Metrics - [refer](https://www.sumologic.com/help/docs/send-data/hosted-collectors/http-source/otlp/#data-differentiation)
  * Auth Header
    * Use a base URL with separate authentication header
    <img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/OpenLLMetry/Auth-Header.png' alt="AuthHeader" width="800"/>
    * Trace Instrumentation
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
   #### Prerequisites
   Before running the code, install required libraries:
  ```python
   pip install chromadb sentence-transformers traceloop-sdk
  ```
   What these libraries are for
    - **Chroma**: Used to store and query document embeddings for semantic search.
    - **SentenceTransformers**: Generates embeddings using the model `all-MiniLM-L6-v2`.
    - **OpenLLMetry**(Traceloop): Adds observability to the workflow by tracing tasks using OpenTelemetry.

   #### How it Works
   This example demonstrates a practical implementation of a vector search system using the Chroma with a local embedding model.
   - **Initialize Tracing**  
     The application initializes Traceloop to enable observability and trace the workflow and tasks during execution.
     **OpenLLMetry SDK**(Traceloop) is configured to export telemetry data using the OpenTelemetry protocol.   
     - **For Otel Collector**, the endpoint connects to http://localhost:4318, and the Sumo exporter forwards the collected data to the SaaS platform.
     - **For OTLP/HTTP source**, the endpoint connects to https://collectors.sumologic.com/receiver/v1/otlp
   - **Load the Embedding Model**  
     The embedding model all-MiniLM-L6-v2 is loaded using SentenceTransformers.
     This model converts text into vector embeddings that can be used for semantic search.
   - **Create a Vector Collection**  
     A collection named company_data is created in Chroma.
     The collection stores documents along with their generated embeddings.
   - **Store Documents**  
     Sample documents describing companies are added to the collection.
     Each document is automatically converted into a vector representation using the embedding model.
   - **Perform Semantic Query**  
     When a question is asked, Chroma converts the query into an embedding and performs a similarity search against stored vectors.
   - **Return Relevant Results**  
     The system returns the top matching documents that are semantically similar to the query.

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

   #### Trace Overview
   <img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/OpenLLMetry/Traces-Sumo-Logic.png' alt="Traces-Sumo-Logic" width="800"/>
   #### Trace Detail View
   <img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/OpenLLMetry/Trace-View-Sumo-Logic.png' alt="Traces-Sumo-Logic" width="800"/>

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
   #### Trace Overview
   <img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/OpenLLMetry/Traces-Sumo-Logic-OTLP-HTTP-Source.png' alt="Traces-Sumo-Logic" width="800"/>
   #### Trace Detail View
   <img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/OpenLLMetry/Trace-View-Sumo-Logic-OTLP-HTTP-Source.png' alt="Traces-Sumo-Logic" width="800"/>
