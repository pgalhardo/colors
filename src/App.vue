<template>
  <v-app>
    <v-app-bar flat color="background" elevate-on-scroll>
      <template #prepend>
        <v-icon>mdi-palette</v-icon>
      </template>

      <v-app-bar-title>pgalhardo/colors</v-app-bar-title>
      <template #append>
        <v-btn
          icon="mdi-github"
          href="https://github.com/pgalhardo/colors"
          target="_blank"
          rel="noopener noreferrer"
          class="mx-2"
        />

        <v-divider vertical inset class="mx-2 my-auto" />

        <v-btn :icon="themeIcon" @click="toggleTheme" class="mx-2" />

        <v-divider vertical inset class="mx-2 my-auto" />

        <v-menu offset-y>
          <template #activator="{ props }">
            <v-btn icon v-bind="props" class="mx-2 my-auto">
              <v-icon>mdi-translate</v-icon>
            </v-btn>
          </template>
          <v-list
            :items="languages"
            item-value="code"
            item-title="name"
            :selected="[appStore.locale]"
            @click:select="onLocaleSelect"
          >
          </v-list>
        </v-menu>
      </template>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
// Composables
import { useTheme } from 'vuetify'
import { useI18n } from 'vue-i18n'

// Stores
import { useAppStore } from './store/app'

// Language Metadata
import { languages } from './locales/languages'

// Utilities
import { computed, watch } from 'vue'

const appStore = useAppStore()
const theme = useTheme()
const { locale } = useI18n()

// Computed property for theme icon based on the current theme
const themeIcon = computed(() => {
  return appStore.theme === 'light'
    ? 'mdi-white-balance-sunny'
    : 'mdi-weather-night'
})

/**
 * Toggles the application theme between light and dark.
 */
function toggleTheme(): void {
  appStore.toggleTheme()
}

/**
 * Handles the selection of a locale from a dropdown.
 *
 * This function is called when a user selects a language option.
 * It changes the current locale of the application to the selected locale.
 *
 * @param item - An object representing the selected locale.
 */
function onLocaleSelect(item: {
  id: unknown
  value: boolean
  path: unknown[]
}): void {
  changeLocale(item.id as string)
}

/**
 * Changes the current application locale.
 * @param newLocale - The new locale to set (e.g., 'en' or 'pt').
 */
function changeLocale(newLocale: string): void {
  appStore.setLocale(newLocale)
}

// Watch for theme changes and update Vuetify theme
watch(
  () => appStore.theme,
  (newTheme) => (theme.global.name.value = newTheme),
  { immediate: true }
)

// Watch for locale changes and update i18n locale
watch(
  () => appStore.locale,
  (newLocale) => (locale.value = newLocale),
  { immediate: true }
)
</script>
