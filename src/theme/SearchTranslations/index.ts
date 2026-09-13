import translations from '@theme-original/SearchTranslations';

export default {
  ...translations,
  button: {
    ...translations.button,
    buttonText: 'Search or Ask AI',
    buttonAriaLabel: 'Search docs or ask AI a question',
  },
  modal: {
    ...translations.modal,
    searchBox: {
      ...translations.modal.searchBox,
      placeholderText: 'Search docs or ask AI a question',
    },
  },
};
