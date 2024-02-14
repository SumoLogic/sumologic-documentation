---
id: getting-started-with-docs
title: Getting Started with Docs
description: Learn how to setup the repository, writing, and publishing tools for the Sumo Logic.
--- 

This document is intended to provide you a step-by-step guide to start authoring and publishing great developer documentation. 

:::info
This setup guide is only for first-time users.
:::

:::note
For procedural documentation, refer to [Contribute to Sumo Docs](/docs/contributing/).
:::

## Set up your GitHub environment

We believe that docs and code belong together. That's why we have our documentation available in the GitHub repository. You'll use this to manage content between local docs on your computer and the remote file repository on GitHub.

### Register your GitHub account

1. If you don't have a GitHub account, [sign up here](https://github.com).
1. Raise a Help Desk ticket to get added to the [Sumo Logic org GitHub repo](https://github.com/SumoLogic).
1. Request docs team site engineer (Kim Pohas) to grant you Admin access to the [Sumo Docs repo](https://github.com/SumoLogic/sumologic-documentation).
1. Associate your Sumo Logic email address with your GitHub account, if you haven’t yet, to ensure that you’re getting all communication related to your Sumo Logic GitHub projects.
1. As a security measure, it’s best to Sign In to your GitHub account via SSO authentication. Go to [Sumo Logic Okta](https://sumologic.okta.com/app/UserHome) and look for the GitHub app.
1. Request docs team site engineer (Kim Pohas) to add your GitHub username to `CODEOWNERS` and `.clabot`, so that you’re recognized as a content owner and verified contributor.

### Configure SSH connection protocol

GitHub repositories that you access through a browser URL are called remotes, and the corresponding mirrors of those repositories that you copy to your local machine are called clones. To send and receive data between them, you need to establish a connection over HTTPS or SSH connection protocol. For optimal security, SSH is recommended.

Generate an SSH key on your local machine and add it to your GitHub account. Refer to [Connecting to GitHub with SSH](https://docs.github.com/en/authentication/connecting-to-github-with-ssh).

### Install Git

You will use Git commands to execute most of the operations that move data between the Sumo Logic Docs repository and your local clone.

1. **Install Homebrew.** Homebrew is a package manager that simplifies installing basically anything. You don't have to use it, but you’ll be glad if you do. To install, open a Terminal shell and run the following command:
    ```
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    ```
1. **Install Git.** Open a macOS terminal shell and run the following command:
    ```
    brew install git
    ```
1. Confirm your installation was successful by running the following command:
    ```
    git --version
    ```
    If a version is returned, you're installation was successful.
1. **Set your Git identity**. Once your Git installation was successful, set your global user name and email address. This is important because every Git commit uses this information, and it’s immutably baked into the commits you start creating. Set these variables by entering the following commands in your Terminal.
    ```
    git config --global user.name "<your first name> <your last name>"
    git config --global user.email "<your Sumo Logic email address>"
    ```
1. **Install Node.** Node.js is a runtime environment that executes scripts that are triggered by the commands you run in your development environment.     Install Node by running the following command:
    ```
    brew install node
    ```
1. Confirm your installation was successful by running the following command:
    ```
    node -v
    ```
    If a version is returned, you're installation was successful.

## Set up your docs workspace

### Clone Sumo Logiv docs repository

Clone the `sumologic-documentation` repository to create a local working directory, so that you can open and edit the files in your local apps.

1. Navigate to the [Sumo Docs repo](https://github.com/SumoLogic/sumologic-documentation), click the green **Code** button > choose the **SSH** tab > click the clipboard icon to copy the clone address.
1. Open a terminal shell and run the following command to clone Sumo Docs to your local home directory:
    ```
    git clone <paste clipboard contents here>
    ```

### Install Docusaurus

Docusaurus is a documentation publishing tool that renders GitHub Markdown into a full functional documentation portal UI. When you install Docusaurus in the root of your local Sumo Docs project directory, you’ll be able to view your changes in a local preview of the actual site.

1. Navigate to your local sumologic-documentation project directory:
    ```
    cd sumologic-documentation
    ```
1. Install Yarn, which is a package manager that runs the Docusaurus execution command scripts and simplifies your interactions with Docusaurus:
    ```
    brew install yarn
    ```
1. Close out of your Terminal shell and open a new one, then navigate back to your sumologic-documentation root directory:
    ```
    cd sumologic-documentation
    ```
1. Install the Docusaurus local client:
    ```
    yarn install
    ```
1. Test your Sumo Logic Docs environment by initiating the `localhost:3000` server and launching the Sumo Docs homepage in a browser window:
    ```
    yarn start
    ```

### Install a code editor

We recommend using Atom or Visual Studio Code as your markdown authoring tool, but feel free to use anything you’re comfortable with.

1. Download and open [Atom](https://atom.io/) or [VS Code](https://code.visualstudio.com/download).
1. Import your Sumo Docs project directory:
    - In Atom, go to **File > Add Project Folder >** Find your **sumologic-documentation** root folder and click on it > Click **Open**.
    - In Visual Studio Code, go to **File > Open Folder >** Find your **sumologic-documentation** root folder and click on it > Click **Open**.

You should now see the entire docs project directory in the left-hand nav pane.

## Write/Edit your doc

Your environment is now ready to go and your local files are in sync with the upstream repo. Time to create your first GitHub branch and get to work!

When you cloned the sumologic-documentation repo, you inherited all of its existing branches. The source-of-truth branch is main, the branch from which our published documentation is generated and the branch into which all other *ready to be published* branches will be merged.

:::warning
Do not author your changes in the `main` branch.
:::

### Create a new GitHub branch

1. In your terminal, navigate to your sumologic-documentation root directory using the following command:
    ```
    cd sumologic-documentation
    ```
1. Confirm you’re on the main branch by running:
    ```
    git branch
    ```
1. Create a branch for a doc you're working on and name it accordingly (e.g., awsobservability-update):
    ```
    git checkout -b <branch-name>
    ```
    :::info
     If applicable, name your branch after the corresponding Jira ticket number. For example, if the ticket number is SUMO-195267, that’s what you’d name it. This is to represent the feature that the work on the branch reflects, and will automatically link the GitHub branch to your Jira ticket, where you can access it.
    :::

### Write your doc

1. Open your Atom or VS Code editor.
1. Choose an option:
    - To create a new doc, refer to [Create Your First Doc](/docs/contributing/create-document/).
    - To edit an existing doc, open its markdown file and apply your change.
1. Save your local markdown file changes in the traditional **File > Save** way. Each time you save these local changes, Git keeps track of every edit. At some point, you’ll want to migrate your changes to the `HEAD` repo, so they can be published. The next steps will help you do that.

## Publish your doc

### Stage and push your changes

1. When you’re ready to publish, go to your terminal and preview your changes:
    ```
    yarn start
    ```
1. Then queue up your changes:
    ```
    git add -A
    ```
1. Commit your changes along with a brief summary in quotes (e.g., “Updated metrics.md”):
    ```
    git commit -m “<summary of changes>”
    ```
1. Push your build to GitHub:
    ```
    git push origin <branch-name>
    ```

### Create your first pull request

Submit a pull request (PR) to merge your changes into the `main` branch of the sumologic-documentation repo. 

1. In your browser, go to [Sumologic documentation](https://github.com/SumoLogic/sumologic-documentation). You should see a yellow banner confirming that you’ve just committed changes and asking whether you want to open a pull request.
1. Click the **Compare & pull request** button.
1. In the next screen, make sure the **base** is main and set to **compare** to the branch you are merging. You should also see a message below that telling you whether the branch can be automatically merged (in green) or cannot be automatically merged (in red). If you see the latter message, that means that your branch has one or more merge conflicts that need to be resolved before merging. You will fix those before merging, but for now, just continue creating the PR.
1. Add a brief title for the PR that clearly identifies the work that is being merged (e.g., New AWS integration feature doc, Removed deprecated page, SUMO-123 Fix: Update code sample).
1. In the **Purpose of this pull request** and **Select the type of change** sections, provide all relevant details about what was changed and why.
1. In the **Reviewers** section, request a peer review by tagging at least one SME and/or a Technical Writer.
1. From the **Assignees** dropdown, select your name to assign it to yourself.
1. From the **Labels** dropdown, select the label that best suits your changes (see the labels list [here](https://github.com/SumoLogic/sumologic-documentation/wiki#github-labels)).
1. Click **Files Changed** tab to confirm your changes are present and that you did not accidentally introduce unintended changes.
1. Once you’re satisfied with the set of changes, click the **Create Pull Request** button.

### Merge your changes

Once your PR has been approved by all requested reviewers, you can merge it into the main branch by clicking **Merge when ready**.

### Keeping your workspace in sync

Since our team is constantly submitting changes and merging them to `main`, it’s important to periodically refresh your local copy so it’s synced with everyone's latest updates as well as back-end development updates that improve our tool.

1. Go to your desired branch:
    ```
    git checkout <branch-name>
    ```
1. Copy all latest updates from the `main` branch into your current branch:
    ```
    git pull origin main
    ```
1. Pull in what your teammates have been working on (commits, files, and refs):
    ```
    git fetch
    ```
1. Incorporate any back-end changes into your local build:
    ```
    yarn install
    ```
1. Launch your build in `localhost:3000:`
    ```
    yarn start
    ```

This updates your current branch, but will not update the other branches of your local workspace. You would need to repeat this process in each branch to update them all. Depending on how long you’ve been working on your changes, they may or may not be necessary, so use your judgment. 

## Resources

### Contributor Guidelines

See our [Contributor Guidelines](https://d10g313yy2pc88.cloudfront.net/docs/contributing) and to learn more about markdown, SEO, style, voice/tone, accessibility, and more.

### Git Cheat Sheet

<details>
<summary>Git Cheat Sheet</summary>
| Command | Description |
| :- | :- |
| `git status` | Returns a list of files that have not yet been updated. Files in red are changes that have not been added to your Git stage. Files in green are staged, but have not been committed. |
| `git branch` | Returns a list of branches that you’ve created in your local working directory. When you run this command, the branch you’re currently working on will be highlighted in green. |
| `git checkout -b <branch-name>` | Creates and switches to a new branch with the name you specify in the command. Branch names should be brief and clear, with no spaces. <br/> If you're working in an unpublished branch and need to create a new branch, switch back to the main branch before running this command. Otherwise, the unpublished changes in your previous branch will be copied into the new one.|
| `git checkout <branch-name>` | Switches from your current working branch to the one you specify. Your changes must be saved (committed, staged, or stashed) on your current branch before switching. |
| `git branch -D <branch-name>` | Deletes a branch from your local workspace. Once the work from a branch has been merged to main, you should delete the branch to keep your workspace clean. You cannot delete a branch while working in it. You must check out a different branch first. |
| `git stash` | Temporarily shelves (stashes) changes you've made to your working branch. This allows you to switch to another branch without losing your changes. |
| `git stash pop` | Pulls the most recent `git stash` from history and makes the appropriate changes to files in your local workspace. |
| `git add -A` | Adds *all* changed files to the Git stage so they are ready to be committed. |
| `git add "path/to/file-name.md"` | Adds *one* changed file to the Git stage so it is ready to be committed. |
| `git commit -m "<description of changes>"` | Commits all files currently in the stage and "records" them so to speak. Git makes a snapshot of them and saves them as one bundled "commit". However, the changes will not be reflected until you push them. For now, they are safely tucked in your local Git memory. You can switch to another branch, do some other work there; switch back to this branch, make some more changes, add them and create another commit. |
| `git push origin <branch-name>` | Takes all of the commits that have been sitting in Git's memory for the current branch and checks them into that branch of the remote repo. <br/> If it's the first time you are pushing for this branch, it will create a new branch in the repo. When it completes, open [Sumo Docs in your browser](https://github.com/SumoLogic/sumologic-documentation), use the branch dropdown to find your branch, and you will see your changes. <br/> You can check in changes like this as many times as you want before or after submitting a pull request to the main branch. |
</details>

### Git tutorials

If you’re not too familiar with git, tutorials like [Git Essential Training](https://www.linkedin.com/learning/git-essential-training-the-basics) or [GitHub Skills](https://skills.github.com/) could help save you hours of time troubleshooting frustrating common errors like [merge conflicts](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/addressing-merge-conflicts/resolving-a-merge-conflict-on-github).