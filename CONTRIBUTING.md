# Contributing

Thank you for your interest in contributing to Sumo Logic documentation!

## <a name="coc"></a> Code of Conduct

Please help us keep Sumo Logic open and inclusive. Read and follow our [Code of Conduct](CODE_OF_CONDUCT.md).

## <a name="ways"></a> Ways to Contribute

There are many ways in which you can contribute to content:

* **Submit Issues and Bugs**: If you find a bug in documentation or site tools, you can help us by [submitting an issue](https://github.com/SumoLogic/sumologic-documentation/issues/new?assignees=&labels=type%3Abug&template=bug_report.md&title=) to our GitHub Repository. You can enter an issue through GitHub or from any page on the documentation site. To share your knowledge, submit a Pull Request with a fix.
* **Feature Requests**: You can request a new feature by [submitting a feature request](https://github.com/SumoLogic/sumologic-documentation/issues/new?assignees=&labels=type%3Afeature&template=feature_request.md&title=) to our GitHub Repository. 
* **Edit Pages**: As you review content on the site, you can click *Edit this page* to commit changes through GitHub directly.

If you would like to implement a new section or tutorial, then consider what kind of change it is:

* **New content** of tutorials and sample code can be discussed with the documentation team in Discord and through submitted issues. We can work with you on the project.
* **Updates** that you wish to contribute can be discussed with the documentation team in Slack, through submitted issues, and in pull requests. These include rewriting content, changing flow, adding a new topic or section, and deprecating content.
* **Minor changes** can be directly submitted to the GitHub Repository as a Pull Request. These include typos, updated code samples, troubleshooting, added guide steps, terms, and more. See the section about [Pull Request Submission Guidelines](#submit-pr).

## <a name="cla"></a> Contributor License Agreements

When you open a pull request, you will be asked to acknowledge our Contributor License Agreement. We allow both individual contributions and contributions made on behalf of companies. We use an open source tool called CLA assistant. If you have any questions on our CLA, please submit an issue.

## <a name="submit-pr"></a> Pull Request Submission Guidelines

We currently cut branches from **main branch** for accepting documentation. As our processes refine and work expands, we may use the [Gitflow Workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow) for development content.

As Pull Requests (PR) are merged to the main branch by the Sumo Logic Doc team, the content builds and deploys to a staging site. This can be reviewed and tested thoroughly on a server, rather than a local.

When all content is tested and ready for live, a Sumo Logic Doc team member can tag a release to build and deploy to Production. This site is live to the world to search, use, and read to learn Sumo Logic.

### Commit Message Guidelines

Use descriptive commit messages detailing the content updates you are entering for content. Mention issue or ticket numbers as relevant for work.

Always write a clear log message for your commits. One-line messages are fine for small changes, but bigger changes should look like this:

    $ git commit -m "A brief summary of the commit
    > 
    > A paragraph describing what changed and its impact."

For example: `$ git commit -m "Updating query for metrics"`

## Contributing Guide

For a complete guide to contributing, creating branches, using Markdown, and more, see the [Contributing Guide](https://github.com/SumoLogic/sumologic-documentation/wiki).