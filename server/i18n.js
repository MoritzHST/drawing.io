const i18n = require('i18next')
const Backend = require('i18next-node-fs-backend');
const i18nextMiddleware = require('i18next-express-middleware');

i18n
    .use(Backend)
    .use(i18nextMiddleware.LanguageDetector)
    .init({
        lng: 'en',
        backend: {
            /* translation file path */
            loadPath: './locales/i18n/{{ns}}/{{lng}}.json'
        },
        fallbackLng: 'en',
        /* can have multiple namespace, in case you want to divide a huge translation into smaller pieces and load them on demand */
        ns: ['translations'],
        defaultNS: 'translations',
        interpolation: {
            escapeValue: false,
            formatSeparator: ','
        }
    })

i18n.loadLanguages("de")

module.exports =i18n