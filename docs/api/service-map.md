---
id: service-map
title: Service Map APIs
sidebar_label: Service Map
description: The Service Map API allows you to fetch a graph representation of the Service Map.
---

The Service Map API allows you to fetch a graph representation of the Service Map, which is a high-level view of your application environment, automatically derived from tracing data. For more information see [Service Map](/docs/apm/traces/services-list-map).

:::tip Other Tracing APIs
See also: [Span Analytics APIs](/docs/api/span-analytics) and [Traces APIs](/docs/api/traces).

Tracing APIs give you the ability to browse and execute queries for traces and span analytics, and request a service map of your application environment.
:::

## Endpoints for API access  

Sumo Logic has deployments that are assigned depending on the geographic location and the date an account is created. For API access, you must manually direct your API client to the correct Sumo Logic API URL.

See [Sumo Logic Endpoints](/docs/api/authentication-endpoints-security#sumo-logic-endpoints-by-deployment-and-firewall-security) for the list of the URLs.

An `HTTP 301 Moved error` suggests that the wrong endpoint was specified.


## Errors  

The APIs return operation failures with a description and error code, including the following generic errors that apply to all APIs:


<table>
  <tr>
   <td><strong>Code</strong>
   </td>
   <td><strong>Error</strong>
   </td>
   <td><strong>Description</strong>
   </td>
  </tr>
  <tr>
   <td>301
   </td>
   <td>moved
   </td>
   <td>The requested resource SHOULD be accessed through returned URI in Location Header.
   </td>
  </tr>
  <tr>
   <td>401
   </td>
   <td>unauthorized
   </td>
   <td>Credential could not be verified.
   </td>
  </tr>
  <tr>
   <td>403
   </td>
   <td>forbidden
   </td>
   <td>This operation is not allowed for your account type.
   </td>
  </tr>
  <tr>
   <td>404
   </td>
   <td>notfound
   </td>
   <td>Requested resource could not be found.
   </td>
  </tr>
  <tr>
   <td>405
   </td>
   <td>method.unsupported
   </td>
   <td>Unsupported method for URL.
   </td>
  </tr>
  <tr>
   <td>415
   </td>
   <td>contenttype.invalid
   </td>
   <td>Invalid content type.
   </td>
  </tr>
  <tr>
   <td>429
   </td>
   <td>rate.limit.exceeded
   </td>
   <td>The API request rate is higher than 4 request per second.
   </td>
  </tr>
  <tr>
   <td>500
   </td>
   <td>internal.error
   </td>
   <td>Internal server error.
   </td>
  </tr>
  <tr>
   <td>503
   </td>
   <td>service.unavailable
   </td>
   <td>Service is currently unavailable.
   </td>
  </tr>
</table>


## Documentation   

Documentation for OpenAPI built APIs is hosted on each deployment. Sumo Logic has several deployments that are assigned depending on the geographic location and the date an account is created. See [how to determine which endpoint to use](/docs/api/authentication-endpoints-security#which-endpoint-should-i-should-use) if you are unsure.

Select the documentation link for your deployment:

<table>
  <tr>
   <td>Deployment
   </td>
   <td>Documentation URL
   </td>
  </tr>
  <tr>
   <td>AU
   </td>
   <td>https://api.au.sumologic.com/docs/#tag/serviceMap
   </td>
  </tr>
  <tr>
   <td>CA
   </td>
   <td>https://api.ca.sumologic.com/docs/#tag/serviceMap
   </td>
  </tr>
  <tr>
   <td>DE
   </td>
   <td>https://api.de.sumologic.com/docs/#tag/serviceMap
   </td>
  </tr>
  <tr>
   <td>EU
   </td>
   <td>https://api.eu.sumologic.com/docs/#tag/serviceMap
   </td>
  </tr>
  <tr>
   <td>FED
   </td>
   <td>https://api.fed.sumologic.com/docs/#tag/serviceMap
   </td>
  </tr>
  <tr>
   <td>IN
   </td>
   <td>https://api.in.sumologic.com/docs/#tag/serviceMap
   </td>
  </tr>
  <tr>
   <td>JP
   </td>
   <td>https://api.jp.sumologic.com/docs/#tag/serviceMap
   </td>
  </tr>
  <tr>
   <td>US1
   </td>
   <td>https://api.sumologic.com/docs/#tag/serviceMap
   </td>
  </tr>
  <tr>
   <td>US2
   </td>
   <td>https://api.us2.sumologic.com/docs/#tag/serviceMap
   </td>
  </tr>
</table>
