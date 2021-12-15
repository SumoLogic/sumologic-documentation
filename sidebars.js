/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 Create as many sidebars as you want.

{type: 'category',
      label: 'Advanced',
      collapsible: true,
      collapsed: false,
      link: {type: 'doc', id: 'contribution/contribution'},
      items: [
        'contribution/doc-versions',
        'contribution/translate'
      }




 */

module.exports = {
  docs: [
    {
      type: 'category',
      label: 'Get Started',
      collapsible: true,
      collapsed: false,
      link: {type: 'doc', id: 'get-started/get-started'},
      items: [
        'get-started/sign-up',
        'get-started/manage-account',
        'get-started/checklist'
      ],
    },
  ],
  contribution: [
    {
      type: 'category',
      label: 'Contributing Guide',
      collapsible: true,
      collapsed: false,
      link: {type: 'doc', id: 'contribution/contribution'},
      items: [
        'contribution/create-page', 
        'contribution/create-document',
        'contribution/markdown-features',
        'contribution/build-deploy',
        {
          type: 'category',
          label: 'Advanced',
          collapsible: true,
          collapsed: false,
          link: {type: 'doc', id: 'contribution/contribution'},
          items: [
            'contribution/doc-versions',
            'contribution/translate'
        ]
      }
      ],
    },
  ],
}