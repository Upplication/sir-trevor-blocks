// Webpack JS entry point
var Utils = require('./common/utils');

Utils.loadLocale('es', require('./locales/es'));
Utils.loadLocale('en', require('./locales/en'));
Utils.loadLocale('pt', require('./locales/pt'));

Utils.loadBlock(require('./blocks/button'));
Utils.loadBlock(require('./blocks/ck_editor'));
Utils.loadBlock(require('./blocks/columns'));
Utils.loadBlock(require('./blocks/image_edit'));
Utils.loadBlock(require('./blocks/map'));
Utils.loadBlock(require('./blocks/spacer'));
Utils.loadBlock(require('./blocks/widget'));

Utils.loadMixin(require('./mixins/alignable'));
Utils.loadMixin(require('./mixins/clonable'));
