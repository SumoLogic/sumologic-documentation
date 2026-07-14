import translations from '@theme-original/SearchTranslations';

export default {
  ...translations,
  modal: {
    ...translations.modal,
    searchBox: {
      ...translations.modal.searchBox,
      placeholderText: 'Search docs or ask AI a question',
    },
  },
};
