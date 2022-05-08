---
id: compare-installed-and-hosted-collectors
---

# Compare Installed and Hosted Collectors

Depending on the method you'd like to collect logs, and the types of logs you'd like to collect, Sumo Logic has two types of Collectors you can choose from.

<Iframe url="https://www.youtube.com/embed/ZcbHoC1jZz4"
        width="854px"
        height="480px"
        id="myId"
        className="video-container"
        display="initial"
        position="relative"
        allow="accelerometer; autoplay=1; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen
        />

import Iframe from 'react-iframe';

The following table shows the major differences between them.

| Installed Collector | Hosted Collector |
|--|--|
| <ul><li>Installed on a system within your deployment locally or remotely.</li><li>Sources collect data available in your deployment.</li><li>Easy to troubleshoot based on Collector logs.</li><li>Supports using Local Configuration File Management so you can use JSON files to configure Sources.</li></ul> | <ul><li>Hosted by Sumo Logic. Agentless: no software to install or activate on a system in your deployment.</li><li>Hosts Sources to collect seamlessly from AWS, Google, and Microsoft products.</li><li>Can receive logs and metrics uploaded via a URL.</li></ul> |
