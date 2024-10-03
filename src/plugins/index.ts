/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import vuetify from './vuetify'
import pinia from '../store'
import router from '../router'
import i18n from '@/i18n' // Importing the i18n instance

// Types
import type { App } from 'vue'

export function registerPlugins(app: App) {
  app
    .use(vuetify) // Register Vuetify
    .use(router) // Register Vue Router
    .use(pinia) // Register Pinia store
    .use(i18n) // Register Vue I18n
}
