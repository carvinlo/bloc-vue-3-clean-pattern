/* eslint-disable import/order */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable semi */
import { createI18n } from 'vue-i18n'
import { UserModule } from '~/types'
import deepmerge from 'deepmerge';

// Import i18n resources
// https://vitejs.dev/guide/features.html#glob-import
//
// Don't need this? Try vitesse-lite: https://github.com/antfu/vitesse-lite
// note: now import is not dynamic, so all language files are loaded at once
const modules = import.meta.globEager('../../../**/locales/*.y(a)?ml', { assert: { type: 'yaml' } })

const setValueByPath = (obj: any, scope: string, language: string, value: any) => {
  if (!(language in obj)) obj[language] = {};

  if (!scope.includes('.')) {
    if (!(scope in obj[language])) obj[language][scope] = {};
    obj[language][scope] = deepmerge(obj[language][scope], value)
    return;
  }
  obj[language] = deepmerge(obj[language], value)
}

const cleanupKey = (key: string): Array<string> => {
  // ../../../src/products/locales/en.yml -> en.yml
  const keys = key.split('/locales/')
  if (keys.length !== 2) return ['', ''];
  return [keys[0].split('/').pop() as string, keys[1].substring(0, keys[1].indexOf('.'))];
}

const final = {}
// eslint-disable-next-line no-restricted-syntax
for (const key in modules) {
  const [scope, language] = cleanupKey(key)
  setValueByPath(final, scope, language, modules[key].default)
}

export const messages = final

export const install: UserModule = ({ app }) => {
  const i18n = createI18n({
    legacy: false,
    locale: 'en',
    messages,
  })

  app.use(i18n)
}
