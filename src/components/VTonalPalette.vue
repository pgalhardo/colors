<script setup lang="ts">
// Components
import VColor from './VColor.vue'

// Types
import type { Color } from '@/types/palette'

type Props = {
  /**
   * An array of color tones, each containing color properties and weight.
   */
  tones: Color[]
}

const props = defineProps<Props>()
</script>

<template>
  <div class="tonal-palette">
    <v-color
      v-for="tone in props.tones"
      :key="tone.weight"
      v-bind="tone"
    />
  </div>
</template>

<style lang="scss" scoped>
@use '@/styles/settings';

.tonal-palette {
  display: flex;
  flex-direction: column;
  transition: box-shadow 0.3s ease-in-out;
  border-radius: settings.$border-radius;
  overflow: hidden;

  &:hover {
    box-shadow:
      0 12px 18px rgba(var(--v-theme-on-background), 0.1),
      0 3px 9px rgba(var(--v-theme-on-background), 0.08);
  }

  & :first-child {
    border-top-left-radius: settings.$border-radius;
    border-top-right-radius: settings.$border-radius;
  }

  & :last-child {
    border-bottom-left-radius: settings.$border-radius;
    border-bottom-right-radius: settings.$border-radius;
  }
}

.shade-weight {
  padding-top: 0.25rem;
  font-weight: 500;
}
</style>
