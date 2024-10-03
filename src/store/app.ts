// store/app.ts

// Utilities
import { defineStore } from 'pinia'

/**
 * Interface representing the state of the application.
 */
interface State {
  /** The current theme of the application, either 'light' or 'dark'. */
  theme: 'light' | 'dark'

  /** The current locale of the application. */
  locale: string // e.g., 'en', 'pt', etc.
}

/**
 * Pinia store for managing application state.
 */
export const useAppStore = defineStore('app', {
  state: (): State => ({
    theme: 'light', // Default theme
    locale: 'en', // Default locale
  }),

  // Enable persistence for the store state
  persist: true,

  actions: {
    /**
     * Toggles the application theme between light and dark.
     */
    toggleTheme() {
      this.theme = this.theme === 'light' ? 'dark' : 'light'
    },

    /**
     * Sets the current locale of the application.
     * @param newLocale - The new locale to set.
     */
    setLocale(newLocale: string) {
      this.locale = newLocale
    },
  },
})
