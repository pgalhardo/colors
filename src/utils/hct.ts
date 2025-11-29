import {
  argbFromHex,
  hexFromArgb,
  themeFromSourceColor as _themeFromSourceColor
} from '@material/material-color-utilities'

import {
  getContrastingColor,
  getComplementaryColor as _getComplementaryColor
} from './color'

import type {
  TonalPalette,
  Theme,
  Hct
} from '@material/material-color-utilities'

import type { Color } from '@/types/palette'

export const HUE_TONES = [
  0, 10, 20, 25, 30, 35, 40, 50, 60, 70, 80, 90, 95, 98, 99, 100
]

/**
 * Generates a theme from a source color in hexadecimal format.
 *
 * @param sourceColor - The source color in hex format (e.g., "#FF5733").
 * @returns The generated tonal palette based on the source color.
 */
export function themeFromSourceColor(sourceColor: string): Theme {
  return _themeFromSourceColor(argbFromHex(sourceColor))
}

/**
 * Generates an array of tones from a given tonal palette.
 *
 * @param tonalPalette - The tonal palette from which to extract tones.
 * @returns An array of tone objects,
 * each containing a weight, hex value, and contrasting color for accessibility.
 */
export function tonesOfPalette(tonalPalette: TonalPalette): Color[] {
  const tones: Color[] = []

  for (const tone of HUE_TONES) {
    const hct: Hct = tonalPalette.getHct(tone)

    tones.push({
      weight: tone,
      value: hexFromArgb(hct.toInt()),
      on: getContrastingColor(hct.internalTone)
    })
  }

  return tones
}

/**
 * Retrieves the complementary color from a given tonal palette.
 *
 * @param tonalPalette - The tonal palette to get the complementary color from.
 * @returns The complementary color in hex format.
 */
export function getComplementaryColor(tonalPalette: TonalPalette): Color {
  const keyColor: string = hexFromArgb(tonalPalette.keyColor.toInt())
  return _getComplementaryColor(keyColor)
}
