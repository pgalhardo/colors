// store/index.ts

// Utilities
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

/**
 * Creates a Pinia store instance with persisted state support.
 * This instance can be used in the Vue application.
 */
const pinia = createPinia()

// Use the persisted state plugin to enable state persistence across sessions
pinia.use(piniaPluginPersistedstate)

export default pinia
