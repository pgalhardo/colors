<script setup lang="ts">
// Components
import VTonalPalette from '@/components/VTonalPalette.vue'

// Types
import type { Color } from '@/types/palette'

type Props = {
  /**
   * An array of color palettes, each containing a name and an array of tones.
   * Each palette represents a specific set of colors for UI design or theming.
   */
  palettes: Array<{
    name: string
    tones: Color[]
  }>

  /**
   * A single color used to highlight important elements or features within the UI.
   * This color is typically more vibrant or prominent compared to the tones in the palettes.
   */
  highlight: Color
}

const props = defineProps<Props>()
</script>

<template>
  <v-row
    justify="center"
    class="ma-0 mt-8"
  >
    <v-col
      v-for="palette in props.palettes"
      :key="palette.name"
      cols="auto"
    >
      <h3 class="mb-2">{{ $t(`colors.${palette.name}`) }}</h3>
      <v-tonal-palette :tones="palette.tones" />
    </v-col>
  </v-row>
  <v-row justify="center">
    <v-col cols="auto">
      <h3 class="mb-2">{{ $t('highlight') }}</h3>
      <v-tonal-palette :tones="[props.highlight]" />
    </v-col>
  </v-row>
</template>
