---
id: build-deploy
---

# Build and Deploy on Local

Docusaurus is a **static-site-generator**. To preview your work, make sure to run the following commands to install and build. We use Yarn for all installs and builds. Never use NPM commands for installing or updating packages.

It builds your site as simple **static HTML, JavaScript and CSS files**.

## Install requirements

Docusaurus requires the following to build on locals:

* [NodeJS](https://nodejs.org/en/download/) version >= 14
* [Yarn](https://yarnpkg.com/en/) version >= 1.5, you can install with Brew: `brew install yarn`

As we maintain the site, the `package.json` file tracks all packages, plugins, and more required for the site. To install on your local:

1. Pull the latest code and make your changes in a branch. 
1. Open a terminal on your local machine.
1. Change directory to your GitHub repo.
1. Enter: `yarn install`

## Build your site

Build and deploy your site **for production** on your local. 

1. In the terminal application and in the GitHub repo, enter: `yarn build`
1. When the build completes, enter: `yarn start`

The static files are generated in the `build` folder and run on your local machine at: `http://localhost:3000/`. As you make changes, it will hot reload, or refresh, on the fly.

To end builds and served sites, hit **Ctrl + C**. You can then enter commands again, like rebuilding and starting.
