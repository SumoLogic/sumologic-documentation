---
id: build-deploy
---

# Build and Deploy on Local

Docusaurus is a **static-site-generator**. To preview your work, make sure to run the following commands to install and build. We use Yarn for all installs and builds. Never use NPM commands for installing or updating packages.

It builds your site as simple **static HTML, JavaScript and CSS files**.

## Install requirements

You need the following at a minimum installed on your machine to run builds:

* [NodeJS](https://nodejs.org/en/download/) version >= 14
* [Yarn](https://yarnpkg.com/en/) version >= 1.5, you can install with [Homebrew](https://brew.sh/) if you have that installed: `brew install yarn`

## Build your site

The site includes translations into other languages. To build on your local:

1. Clone the repo using Git or tools like GitHub Desktop.
2. In a terminal, change to the cloned repo folder. Run the install command: `yarn install` 
3. To build locally and test links, use build: `yarn build`
4. To serve and review, use one of the following:

    * Use start, hot reloads as you make changes: `yarn start`

        Any issues with broken links and images are listed according to file. Locate and update those issues, then run build and start again to verify.

    * Use npm serve to test and review multi-languages: `npm run serve`

        This build does not hot reload and requires a rebuild to test and review.

The static files are generated in the `build` folder and run on your local machine at: `http://localhost:3000/`. As you make changes, it will hot reload, or refresh, on the fly.

To end builds and served sites, hit **Ctrl + C**. You can then enter commands again, like rebuilding and starting.
