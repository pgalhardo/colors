<template>
  <div
    class="color"
    :style="{ 'background-color': props.value }"
    role="button"
    tabindex="0"
    :aria-label="copyButtonAriaLabel"
    @mouseenter="showHex"
    @mouseleave="hideHex"
    @keypress.enter="copyValue"
    @keypress.space="copyValue"
  >
    <span class="color-hex" :style="{ color: props.on }">
      {{ displayValue }}
    </span>
    <v-btn
      variant="plain"
      :color="props.on"
      :size="16"
      icon="mdi-content-copy"
      class="ml-auto mr-1"
      :aria-label="copyButtonAriaLabel"
      @click="copyValue"
    >
      <v-icon
        :size="12"
        :icon="state.copied ? 'mdi-check' : 'mdi-content-copy'"
        :color="props.on"
      />
    </v-btn>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue'
import { Color } from '@/types/palette'
import { useI18n } from 'vue-i18n'

const props = defineProps<Color>()

const { t } = useI18n()

const state = reactive({ copied: false, hex: false })

let resetTimeoutId: number | null = null

/**
 * Computes the display value based on whether the hex code or weight is shown.
 * @returns {string} The hex code or weight to be displayed.
 */
const displayValue = computed(() =>
  state.hex ? props.value.toUpperCase() : props.weight?.toString()
)

/**
 * Computes the aria-label for the copy button to indicate copy status.
 * @returns {string} The aria-label text for the copy button.
 */
const copyButtonAriaLabel = computed(() =>
  state.copied ? t('copied') : t('copy')
)

/**
 * Copies the color value to the clipboard and gives feedback.
 */
async function copyValue(): Promise<void> {
  await copyToClipboard(props.value)
  resetCopyState()
}

/**
 * Copies the provided text to the clipboard using the Clipboard API or a hidden textarea.
 * @param {string} textToCopy - The text to copy to the clipboard.
 */
async function copyToClipboard(textToCopy: string): Promise<void> {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(textToCopy)
  } else {
    const textArea = document.createElement('textarea')
    textArea.value = textToCopy
    textArea.style.position = 'absolute'
    textArea.style.left = '-999999px'

    document.body.prepend(textArea)
    textArea.select()

    try {
      document.execCommand('copy')
    } catch (error) {
      console.error(error)
    } finally {
      textArea.remove()
    }
  }
}

/**
 * Resets the copied state to true and sets it back to false after 2 seconds.
 */
function resetCopyState(): void {
  if (resetTimeoutId) window.clearTimeout(resetTimeoutId)
  state.copied = true
  resetTimeoutId = window.setTimeout(() => (state.copied = false), 2000)
}

/**
 * Shows the hex code when the mouse enters the color div.
 */
function showHex(): void {
  state.hex = true
}

/**
 * Hides the hex code when the mouse leaves the color div.
 */
function hideHex(): void {
  state.hex = false
}
</script>
