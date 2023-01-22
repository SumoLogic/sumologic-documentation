<img src="https://help.sumologic.com/img/sumo-docs-readme.png" width="400"/>

<p>
  <a href="https://github.com/SumoLogic/sumologic-documentation/blob/main/.github/workflows/production.yml"><img src="https://github.com/SumoLogic/sumologic-documentation/actions/workflows/production.yml/badge.svg" alt="GitHub Actions status"></a>
  <a href="https://help.sumologic.com/docs/contributing"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs Welcome"></a>
  <a href="LICENSE"><img src="https://img.shields.io/github/license/sourcerer-io/hall-of-fame.svg?colorB=ff0000"></a>
  <a href="https://twitter.com/SumoLogic"><img src="https://img.shields.io/twitter/follow/sumologic.svg?style=social" alt="Twitter Follow" /></a>
  <a href="https://help.sumologic.com/release-notes-service"><img src="https://img.shields.io/badge/RSS-FFA500?style=for-the-badge&logo=rss&logoColor=white" alt="RSS Follow" width="50"/></a>
</p>

Share your knowledge with the Sumo Logic community by contributing to our docs! You can contribute by creating an issue or pull request (PR) on our GitHub repository. We welcome all types of contributions; from minor typo fixes to new topics.

Documentation staff members review issues and pull requests on a regular basis. We do our best to address all issues as soon as possible, but working through the backlog takes time. We appreciate your patience.

## Contributing Content

For detailed guidelines, see [Contributor Guidelines](/docs/contributing).

We recommend forking the repo, creating all content changes in branches, and submitting pull requests. We will work with you to get this content reviewed, tested, and merged for publishing.

## Building Locally

Docusaurus requires the following to build on locals:

* [NodeJS](https://nodejs.org/en/download/) version >= 16.14
* [Yarn](https://yarnpkg.com/en/) version >= 1.5, you can install with [Homebrew](https://brew.sh/) if you have that installed: `brew install yarn`

The site includes translations into other languages. To build on your local:

1. Clone the repo using Git or tools like GitHub Desktop.
1. In a terminal, change to the cloned repo folder. Run the install command: `yarn install`.
1. To serve and review your content, use one of the following:
   * Use start, hot reloads as you make changes: `yarn start`. Any issues with broken links and images are listed according to file. Locate and update those issues, then run build and start again to verify.
   * Use npm serve to test and review multi-languages: `npm run serve`. This build does not hot reload and requires a rebuild to test and review.
1. To build locally and test your links, run `yarn build`.   

The static files are generated in the `build` folder and run on your local machine at: `http://localhost:3000/`. To stop the build or served site, hit Ctrl + C to interrupt. You can enter new commands in terminal, rebuild, and restart.

Sumo Docs was created using [Docusaurus 2](https://docusaurus.io/) with React, Rehype, and Remark plugin support. Our CLA bot was built using [cla-bot](https://colineberhardt.github.io/cla-bot/).

## Publishing Content

As pull requests are merged to the `main` branch by the Sumo Logic Doc team, the content builds and deploys to a staging site. This allows you to review and test your content thoroughly on a server, rather than a local build, prior to merging your code to production.
