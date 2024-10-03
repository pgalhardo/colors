<template>
  <div class="tonal-palette">
    <v-color v-for="tone in props.tones" :key="tone.weight" v-bind="tone" />
  </div>
</template>

<script setup lang="ts">
// Components
import VColor from './VColor.vue'

// Types
import type { Color } from '@/types/palette'

const props = defineProps<{
  /**
   * An array of color tones, each containing color properties and weight.
   */
  tones: Color[]
}>()
</script>
