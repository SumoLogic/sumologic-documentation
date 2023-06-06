---
id: cloud-soar-apis
title: Cloud SOAR APIs
sidebar_label: Cloud SOAR APIs
description: Learn how to access Cloud SOAR APIs and API documentation.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/icons/security/SOC.png')} alt="icon" width="60"/>

The Cloud SOAR APIs allow you to manage incidents, triage, and other Cloud SOAR features.

{@import ../reuse/api-intro.md}

{@import ../reuse/cloud-soar-api-table.md}

## Get started with Cloud SOAR APIs

The Cloud SOAR API documentation lists all the available endpoints and expected parameters. It provides a list of the required and accepted data schema to use for each of the exposed endpoints.
The **Request samples** provided for each endpoint should be used for documentation only; it does not currently support executing API endpoints directly from the documentation.

### Base path for API requests

Obtain the base path to be used to access the Cloud SOAR REST API by clicking the API command in the upper right of the API documentation:

<img src={useBaseUrl('img/cloud-soar/cloud-soar-basepath.png')} alt="API basepath" width="400"/>

### Generate an API token

The REST API can only be used by authorized users who possess a valid JWT API key. To issue an API key for an Cloud SOAR user:

1. Select the desired user in the [User Management](/docs/cloud-soar/global-functions-menu/#user-management) section.
1. Scroll to the **API Token** section.
1. Click the **+** button on the right-hand side of the screen.
1. Click **Generate** to confirm the generation of the API token. The new JWT token will be found in the **API Token** section of the user’s settings.

A user’s API token may be revoked at any time by clicking on the trash can icon to the far right side of the token row.

### GET/PUT Request (without data payload)

The following is an example of a GET (or PUT) request which does not contain a data payload using curl:

```
curl -X GET https://<host>/api/sec/v1/<endpoint> 
--header "Authorization: Bearer <token>" 
--header "Accept:application/json"
```

The following is an example of a GET (or PUT) request which does not contain a data payload using Python:

```
import requests
import json
headers = {'Authorization' : 'Bearer <token>', 'Accept' :'application/json'}
inc = requests.get('https://<host>/api/v1/incidents/<incidentId>, headers=headers)
incident = json.loads(inc.text)
```

### POST/PUT Request (with data payload)

The following is an example of a POST (or PUT) request which contains a data payload using curl:

```
--header "Authorization: Bearer <myAPIkey>" --header "Accept:application/json" --header "Content-Type: application/json" -d “{”<key1>”:”<value1>”, ”<key2>”:”<value2>”,...,”<keyN>”:”<valueN>”}”
```

The following is an example of a POST (or PUT) request which contains a data payload using Python:

```
import requests
import json
headers = {'Authorization' : 'Bearer <token>', 'Accept' : 'application/json', 'Content-Type' : 'application/json'}
new_incident = <incident data in JSON>
new_inc = requests.post('http[s]://<incmanhost>/incmansuite_ng/api/v2/incidents', data=new_incident, headers=headers)
incident = json.loads(new_inc.text)
In addition to JSON, the payload may also be sent in XML format using the headers:
"Accept: application/x-www-form-urlencoded"
"Content-Type: multipart/form-data format"
```

