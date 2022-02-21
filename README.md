# Welcome to Sumo Logic Documentation

Share your knowledge with the community by contributing to Sumo Logic Documentation!

You can contribute by creating an issue or pull request (PR) on our GitHub repository. We welcome all types of contributions; from minor typo fixes to new topics.

Documentation staff members review issues and pull requests on a regular basis. We do our best to address all issues as soon as possible, but working through the backlog takes time. We appreciate your patience.

## Contributing Content

For details on contributions, see [CONTRIBUTING](https://github.com/SumoLogic/sumologic-documentation/blob/main/CONTRIBUTING.md) and the [GitHub Wiki](https://github.com/SumoLogic/sumologic-documentation/wiki).

We recommend forking the repo, creating all content changes in branches, and submitting pull requests. We will work with you to get this content reviewed, tested, and merged for publishing.

## Building Locally

Docusaurus requires the following to build on locals:

* [NodeJS](https://nodejs.org/en/download/) version >= 14
* [Yarn](https://yarnpkg.com/en/) version >= 1.5, you can install with [Homebrew](https://brew.sh/) if you have that installed: `brew install yarn`

The site includes translations into other languages. To build on your local:

1. Clone the repo using Git or tools like GitHub Desktop.
2. In a terminal, change to the cloned repo folder. Run the install command: `yarn install` 
3. To build locally and test links, use build: `yarn build`
4. To serve and review, use one of the following:

    * Use start, hot reloads as you make changes: `yarn start`

        Any issues with broken links and images are listed according to file. Locate and update those issues, then run build and start again to verify.

    * Use npm serve to test and review multi-languages: `npm run serve`

        This build does not hot reload and requires a rebuild to test and review.

The static files are generated in the `build` folder and run on your local machine at: `http://localhost:3000/`.

The site was created using [Docusaurus 2](https://docusaurus.io/) with React, Rehype, and Remark plugin support.

To stop the build or served site, hit Ctrl + C to interupt. You can enter new commands in terminal, rebuild, and restart.

## Publishing Content

As Pull Requests (PR) are merged to the main branch by the Sumo Logic Doc team, the content builds and deploys to a staging site. This can be reviewed and tested thoroughly on a server, rather than a local.

When all content is tested and ready for live, a Sumo Logic Doc team member can tag a release to build and deploy to Production. This site is live to the world to search, use, and read to learn Sumo Logic.