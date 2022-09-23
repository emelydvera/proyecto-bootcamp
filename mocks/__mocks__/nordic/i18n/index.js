const I18n = require('nordic/i18n');

const i18n = new I18n({ translations: [] });

I18n.useI18n = () => ({ i18n });

module.exports = I18n;