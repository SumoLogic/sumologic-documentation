1. Commit your changes to the branch with a meaningful message.<br/>![pull request](/img/contributing/commit.png) Use descriptive commit messages (and issue or ticket numbers, if applicable) detailing the content updates you are entering for content. One-line messages are fine for small changes, but bigger changes should look like this:
    ```bash
    $ git commit -m "A brief summary of the commit
    >
    > A paragraph describing what changed and its impact."
    ```
1. Set permissions to allow maintainers to edit and update the PR ([learn more](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/allowing-changes-to-a-pull-request-branch-created-from-a-fork)).
1. Push your branch to the forked repo.
1. Visit [our repo](https://github.com/SumoLogic/sumologic-documentation) after pushing your branch. If you see an option to **Compare & pull request** for your branch, click this.<br/>![compare](/img/contributing/compare-pr.png)
   * If you do not see it, [create a new PR](https://github.com/SumoLogic/sumologic-documentation/compare).
      1. Select `main` for the base branch. This is the branch all staging and production content builds from.
      1. Select your branch for the **compare**.
      1. Click **Create pull request**.
1. On the Pull Request page, enter the following:
   * Make sure **base** branch is `main` and **compare** branch is the one you pushed.
   * Enter a title for the PR.
   * If applicable, include a GitHub issue number (or, for internal Sumos, the Jira ticket number).
   * Describe what changed, new pages, updates.
   * Apply a [label](https://github.com/SumoLogic/sumologic-documentation/wiki#github-labels) that best describes your contribution.
1. (Optional). For urgent, high-priority PRs (for example, doc edits tied to a GA release happening within 24 hours):
   1. Add the GA release date to the title. For example, `AWS Integration release (GA: Jan 1, 2023)`.
   1. From the labels list, select the `hot🔥` label, signifying it's an extremely urgent PR.
   1. For internal Sumos only: after completion of all GitHub checks, send your PR link to the `#doc-int` and `#open-source` Slack channels for review.
1. Click **Create pull request**.<br/> ![pull request](/img/contributing/pull-request.png)
1. First-time contributors will be prompted in a comment to sign our Contributor License Agreement. We allow individual contributions and contributions made on behalf of companies.<br/> ![CLA bot](/img/contributing/clabot.png)
