---
id: template-doc
title: Sumo Logic Doc Template
sidebar_label: Doc Template
description: Example template for creating a document in the Sumo Logic guides.
---

:::note
Copy this markdown file and fill it out for documentation. See the markdown code to see how it all works. For full markdown code and options, see [Markdown Features](../markdown-features.md).
:::

Replace the H1 title above with the title for your documentation page. You should only every have one H1 entry used for the title. All other sections should be H2, H3, ...H5.

## Sample H2 section

To add an image, save the .png file with a simple name, no spaces in it, in `/static/img`. For many images, consider guide or product feature folders. Include alt text and the file location `/img/folder-name/` and file name.

```md title="Example format for image code"
![Sumo Logic logo](/img/sumo-square.png)
```

![Sumo Logic logo](/img/sumo-square.png)

### Instructions

Always use `1.` to start your instructions. You don't need to actually number the list. It will automatically number for you on build.

1. Click **Collections**, then **Sources** tab.
1. Next step, just write it out.

    * Bullet list just tab and use `*` or `1.`.
    * Next bullet.

    ![Sumo Logic logo](/img/sumo-square.png)

1. The numbers continue with content indented above!

Here is an example table:

| Item | Description |
| -- | -- |
| Dashboard | Info on **Dashboards**. Markdown works here too.|
| *Query* | More info! |
