import translations from '@theme-original/SearchTranslations';

export default {
  ...translations,
  button: {
    ...translations.button,
    buttonText: 'Search Docs or Ask AI',
    buttonAriaLabel: 'Search Docs or Ask AI',
  },
  modal: {
    ...translations.modal,
    searchBox: {
      ...translations.modal.searchBox,
      placeholderText: 'Search Docs or Ask AI',
    },
  },
};
