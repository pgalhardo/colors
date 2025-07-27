<template>
  <v-container fluid>
    <v-row no-gutters>
      <v-col md="4" sm="2" cols="12" />
      <v-col md="4" sm="8" cols="12">
        <v-text-field
          ref="input"
          v-model="primaryColor"
          rounded
          class="main-input"
          variant="solo"
          theme="dark"
          :label="t('colorInput.label')"
          placeholder="#018BD2"
          validate-on="submit"
          :rules="[rules.required, rules.valid]"
          @keydown.enter="generate"
        >
          <template #append-inner>
            <v-btn
              variant="outlined"
              density="comfortable"
              icon="mdi-arrow-left-bottom"
              @click="generate"
            />
          </template>
        </v-text-field>
      </v-col>
      <v-col md="4" sm="2" cols="12" />
    </v-row>
    <div class="suggestions">
      <v-row justify="center" dense>
        <v-col
          v-for="suggestion in suggestions"
          :key="suggestion.value"
          cols="auto"
        >
          <v-chip
            :color="suggestion.value"
            size="small"
            append-icon="mdi-arrow-top-right"
            @click="() => generatePalette(suggestion.value)"
          >
            {{ suggestion.name }}
          </v-chip>
        </v-col>
      </v-row>
    </div>
    <v-theme
      v-if="palettes.length && highlight"
      :palettes="palettes"
      :highlight="highlight"
    />
  </v-container>
</template>

<script setup lang="ts">
// Components
import VTheme from '@/components/VTheme.vue'
import { useI18n } from 'vue-i18n'

// Types
import type { Color } from '@/types/palette'

// Utils
import { isValidColor } from '@/utils'
import {
  getComplementaryColor,
  themeFromSourceColor,
  tonesOfPalette,
} from '@/utils/hct'
import { computed, ref, useTemplateRef } from 'vue'

// i18n
const { t } = useI18n()

const suggestions = computed(() => [
  { name: t('theme.royalVelvet'), value: '#6750A4' },
  { name: t('theme.azureCascade'), value: '#018BD2' },
  { name: t('theme.mochaMist'), value: '#A98F76' },
  { name: t('theme.sereneOlive'), value: '#889D62' },
  { name: t('theme.coralBlush'), value: '#DC9E82' },
])

const primaryColor = ref<string>('')

type Palette = {
  name: string
  tones: Color[]
}

const palettes = ref<Palette[]>([])
const highlight = ref<Color | undefined>(undefined)

// Template refs
const inputRef = useTemplateRef('input')

async function generate() {
  const isValid = await inputRef.value?.validate()

  if (isValid) {
    generatePalette(primaryColor.value)
    primaryColor.value = ''
  }
}

function generatePalette(primaryColor: string) {
  // Clear palettes
  palettes.value.length = 0

  const theme = themeFromSourceColor(primaryColor)

  let palette: keyof typeof theme.palettes
  for (palette in theme.palettes) {
    const tones = tonesOfPalette(theme.palettes[palette])

    palettes.value.push({
      name: palette,
      tones: tones,
    })
  }

  highlight.value = getComplementaryColor(theme.palettes.primary)
}

// Form validation rules
const rules = {
  required: (value: string) => !!value || t('validation.required'),
  valid: (value: string) =>
    !!isValidColor(value) || t('validation.invalidColor'),
}
</script>
