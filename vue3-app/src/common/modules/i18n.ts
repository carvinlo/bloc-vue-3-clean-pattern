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

const setValueByPath = (obj: any, path: string, value: any) => {
  const language = path.split('/').pop()?.split('.').shift() as string;
  obj[language] = deepmerge(obj[language], value)
}

const final = {}
// eslint-disable-next-line no-restricted-syntax
for (const path in modules) setValueByPath(final, path, modules[path].default)

export const messages = final

export const install: UserModule = ({ app }) => {
  const i18n = createI18n({
    legacy: false,
    locale: 'en',
    messages,
  })

  app.use(i18n)
}
