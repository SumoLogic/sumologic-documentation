The APIs return operation failures with a description and error code, including the following generic errors that apply to all APIs:

| Code | Error    | Description      |
|:------|:--------|:------------|
| 301  | moved    | The requested resource SHOULD be accessed through returned URI in Location Header. |
| 401  | unauthorized    | Credential could not be verified.        |
| 403  | forbidden    | This operation is not allowed for your account type.   |
| 404  | notfound    | Requested resource could not be found.   |
| 405  | method.unsupported  | Unsupported method for URL.    |
| 415  | contenttype.invalid | Invalid content type.           |
| 429  | rate.limit.exceeded | The API request rate is higher than 4 request per second.        |
| 500  | internal.error      | Internal server error.    |
| 503  | service.unavailable | Service is currently unavailable.    |
