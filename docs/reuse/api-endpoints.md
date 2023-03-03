To determine which Sumo Logic API endpoint you should use, find the deployment pod referenced in your browser's Sumo Logic service URL.

If you see `https://service.us2.sumologic.com`, for example, that means you're running on the **US2** pod and need to use the API endpoint `https://api.us2.sumologic.com/api/`. For the service URL `https://service.eu.sumologic.com`, you'd need to use the API endpoint `https://api.eu.sumologic.com/api/`, and so on. The only exception is the **US1** pod (`https://service.sumologic.com`), which uses the API endpoint `https://api.sumologic.com/api/`.

To view all available endpoints, see [Sumo Logic Endpoints](/docs/api/getting-started#sumo-logic-endpoints-by-deployment-and-firewall-security).
