---
id: cloud-soar-apis
title: Cloud SOAR APIs
sidebar_label: Cloud SOAR APIs
description: Learn how to access Cloud SOAR APIs and API documentation.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import ApiIntro from '../reuse/api-intro.md';

The Cloud SOAR APIs allow you to manage incidents, triage, and other Cloud SOAR features.

:::info
This article applies to your organization *only if* your instance URL is a subdomain of `soar.sumologic.com`.
Otherwise, please refer to:

* [Cloud SOAR APIs](/docs/api/cloud-soar) for the endpoints by geographic location
* [API Authentication](/docs/api/getting-started#authentication) for details about API best practises.

:::

### Inline API documentation

For organizations having Cloud SOAR available at URL pattern `*.soar.sumologic.com`,
the API documentation is available through your Cloud SOAR instance at the following URL:

```
http[s]:///<cloudsoarhost>/incmansuite_ng/lib/gui/app.php#support_apidoc|api_documentation_v3
```

The APIs listed at this location are internal-facing and unique to the tenant. The documentation lists all the available endpoints, expected parameters, and the required and accepted data schema to use for each exposed endpoint.

### Base path for API requests

The base path to be used to access the Cloud SOAR REST API is:

```
http[s]://<cloudsoarhost>/incmansuite_ng/api/v3/<endpoint>
```

### Generate an API token

The REST API can only be used by authorized users who possess a valid JWT API key. An administrator should perform the
following steps to issue an API key for an Cloud SOAR user:

1. Select the desired user in the [User Management](/docs/cloud-soar/global-functions-menu/#user-management) section.
1. Scroll to the **API Token** section.
1. Click the **+** button on the right-hand side of the screen.
1. Click **Generate** to confirm the generation of the API token. You can find your new JWT token in the **API Token** section of your user settings.

You can use the token displayed in the **API Token** section to provide authorization for your API calls. Org administrators can revoke user API tokens by clicking the trash can icon to the far right side of the token row.

### GET/PUT request (without data payload)

The following is an example of a GET (or PUT) request which does not contain a data payload using curl:

```
curl -X GET http[s]://<cloudsoarhost>/incmansuite_ng/api/v3/<endpoint>
--header "Authorization: Bearer <token>"
--header "Accept:application/json"
```

The following is an example of a GET (or PUT) request which does not contain a data payload using Python:

```
import requests
import json
headers = {'Authorization' : 'Bearer <token>', 'Accept' :'application/json'}
inc = requests.get('http[s]://<cloudsoarhost>/incmansuite_ng/api/v3/incidents/<incidentId>, headers=headers)
incident = json.loads(inc.text)
```

### POST/PUT request (with data payload)

The following is an example of a POST (or PUT) request which contains a data payload using curl:

```
--header "Authorization: Bearer <token>"
--header "Accept:application/json"
--header "Content-Type: application/json"
-d “{”<key1>”:”<value1>”, ”<key2>”:”<value2>”,...,”<keyN>”:”<valueN>”}”
```

The following is an example of a POST (or PUT) request which contains a data payload using Python:

```
import requests
import json
headers = {'Authorization' : 'Bearer <token>', 'Accept' : 'application/json', 'Content-Type' : 'application/json'}
new_incident = <incident data in JSON>
new_inc = requests.post('http[s]://<cloudsoarhost>/incmansuite_ng/api/v3/incidents', data=new_incident, headers=headers)
incident = json.loads(new_inc.text)
```

In addition to JSON, the payload may also be sent in XML format using the headers:

```
"Accept: application/x-www-form-urlencoded"
"Content-Type: multipart/form-data format"
```
