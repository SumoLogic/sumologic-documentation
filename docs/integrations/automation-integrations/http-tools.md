---
title: HTTP Tools
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/http-tools.png')} alt="HTTP tools icon" width="80"/>

***Version: 1.7  
Updated: November 13, 2026***

Set of scripts to perform simple HTTP requests.

## Actions

* **HTTP DELETE** (*Containment*) - Sends an HTTP DELETE request to delete the specified resource.
* **HTTP GET** (*Enrichment*) - Sends an HTTP Get request to retrieve data from a specified resource.
* **HTTP HEAD** (*Enrichment*) - Sends an HTTP HEAD request to retrieve data but without the response body.
* **HTTP PATCH** (*Enrichment*) - Sends an HTTP PATCH request to apply partial modifications to a resource.
* **HTTP POST** (*Enrichment*) - Sends an HTTP POST request to create a resource. You can override the configured API URL with the **Action API URL** field.
* **HTTP PUT** (*Enrichment*) - Sends an HTTP PUT request to to update a resource.

## Configure HTTP Tools in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **HTTP API URL**. Enter the URL to send the requests.

* **Username**. Enter the username to use to access the URL.

* **Password**. Enter the password for the user.

* **Extra Headers**. Enter additional HTTP headers to send with the requests for example, `key1:value1, key2:value2` or JSON.
* <IntegrationTimeout/>
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/http-tools-configuration.png')} style={{border:'1px solid gray'}} alt="HTTP Tools configuration" width="400"/>
   
## Override the API URL in the HTTP POST action

By default, the **HTTP POST** action sends requests to the **HTTP API URL** you set in the integration configuration. To send a request to a different endpoint without creating another integration instance, enter a URL in the optional **Action API URL** field of the action. This is the same override the other HTTP Tools actions provide.

- If you leave **Action API URL** empty, the action uses the **HTTP API URL** from the configuration, so existing playbooks keep working without changes.
- If you enter a value, it takes priority over the configured **HTTP API URL**. The URL needs to start with `http://` or `https://` and include a host.
- The authentication, extra headers, timeout, certificate, and proxy settings from the configuration still apply to the overridden URL.
- The field accepts playbook placeholders, so you can build the URL from the output of previous actions.

If the request fails, the error message includes the URL that was called, without the query string or credentials, to help you troubleshoot. The action also returns clearer messages for timeouts, SSL certificate errors, and connection failures.

### Example

A playbook uses **HTTP GET** to retrieve incident details from a ticketing tool, then needs to post a comment to a different endpoint on the same tool. In the **HTTP POST** action, set **Action API URL** to the comment endpoint, for example `https://tickets.example.com/api/v2/incidents/12345/comments`, and add the comment text in **Request Body as JSON**. Both actions run from one HTTP Tools integration instance.

## Change Log

| Version | Date | Description |
|:--|:--|:--|
| v1.7 | November 13, 2026 | Added the optional **Action API URL** field to the **HTTP POST** action to override the **HTTP API URL** from the configuration. Improved error messages to include the called URL and to describe timeout, SSL, and connection failures. |
| v1.6 | April 29, 2026 | Upgraded the `python3_generic` Docker image (Python 3.8) to `python3_12_generic` (Python 3.12) to address Python 3.8 end-of-life and improve security and performance. |
| v1.4 | June 12, 2024 | Added new actions: **HTTP DELETE**, **HTTP HEAD**, **HTTP PATCH**, and **HTTP PUT**. |
| v1.5 | January 09, 2024 | Fixed an issue with the `output.raw` JSON field in the **HTTP POST** action. |
| v1.3 | September 25, 2023 | Updated the **HTTP POST** action. |
| v1.2 | June 14, 2023 | Updated the integration with Environmental Variables. |
| | March 20, 2023 | Updated the **HTTP POST** action to add a new field for form data to be sent in the body of the request. |
| | February 02, 2023 | Initial release of the HTTP Tools integration. |
