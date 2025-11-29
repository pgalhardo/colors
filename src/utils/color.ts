import { HUE_TONES } from './hct'

import type { HSL, RGB } from '@/types/color'
import type { Color } from '@/types/palette'

export function isValidColor(potentialColor: string): boolean {
  return /^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/.test(potentialColor)
}

/**
 * Parses a color from a hex string.
 * @param potentialColor A hex string representing the color, e.g., "#aabbcc".
 * @returns A `RGB` object representing the parsed color.
 */
export function parseColor(potentialColor: string): RGB {
  if (!isValidColor(potentialColor)) {
    throw new Error('Invalid color format')
  }

  let color = potentialColor

  // Support short format (e.g., #abc)
  if (color.length === 4) {
    color =
      '#' + color[1] + color[1] + color[2] + color[2] + color[3] + color[3]
  }

  const r = parseInt(color.slice(1, 3), 16)
  const g = parseInt(color.slice(3, 5), 16)
  const b = parseInt(color.slice(5, 7), 16)

  return { r, g, b }
}

/**
 * Lightens a color by a specified amount.
 * @param rgb The color to lighten.
 * @param amount The amount to lighten the color by, in the range [0, 100].
 * @returns The lightened color.
 */
export function lighten(rgb: RGB, amount: number): RGB {
  // Check if the amount is within the required range
  if (amount < 0 || amount > 100) {
    throw new Error('Amount must be in the range [0, 100]')
  } else if (amount === 0) {
    return rgb
  }

  const hsl = rgbToHsl(rgb)
  const factor = amount / 100
  hsl.l = hsl.l + factor * (100 - hsl.l)
  return hslToRgb(hsl)
}

/**
 * Darkens a color by a specified amount.
 * @param rgb The color to darken.
 * @param amount The amount to darken the color by, in the range [0, 100].
 * @returns The darkened color.
 */
export function darken(rgb: RGB, amount: number): RGB {
  // Check if the amount is within the required range
  if (amount < 0 || amount > 100) {
    throw new Error('Amount must be in the range [0, 100]')
  } else if (amount === 0) {
    return rgb
  }

  const hsl = rgbToHsl(rgb)
  const factor = amount / 100
  hsl.l = hsl.l - factor * hsl.l
  return hslToRgb(hsl)
}

/**
 * Converts a `Color` object to a hex string.
 * @param rgb The color to convert.
 * @returns A hex string representing the color.
 */
export function colorToHex(rgb: RGB): string {
  const r = rgb.r.toString(16).padStart(2, '0')
  const g = rgb.g.toString(16).padStart(2, '0')
  const b = rgb.b.toString(16).padStart(2, '0')

  return `#${r}${g}${b}`
}

/**
 * Converts a color from RGB to HSL space.
 * @param color The color to convert.
 * @returns An object representing the color in HSL space.
 */
function rgbToHsl(rgb: RGB): HSL {
  const r = rgb.r / 255
  const g = rgb.g / 255
  const b = rgb.b / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0,
    s
  const l = (max + min) / 2

  if (max === min) {
    h = s = 0 // achromatic
  } else {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }

    h /= 6
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  }
}

/**
 * Converts a color from HSL to RGB space.
 * @param h The hue component of the color, in the range [0, 1].
 * @param s The saturation component of the color, in the range [0, 1].
 * @param l The lightness component of the color, in the range [0, 1].
 * @returns A `RGB` object representing the color in RGB space.
 */
function hslToRgb(hsl: HSL): RGB {
  const h = hsl.h / 360
  const s = hsl.s / 100
  const l = hsl.l / 100

  let r, g, b

  if (s === 0) {
    r = g = b = l // achromatic
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q

    r = hueToRgb(p, q, h + 1 / 3)
    g = hueToRgb(p, q, h)
    b = hueToRgb(p, q, h - 1 / 3)
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  }
}

/**
 * Helper function to convert a hue value to a corresponding RGB value.
 * @param p The first RGB component.
 * @param q The second RGB component.
 * @param t The hue value.
 * @returns The corresponding RGB value.
 */
function hueToRgb(p: number, q: number, t: number): number {
  if (t < 0) t += 1
  if (t > 1) t -= 1
  if (t < 1 / 6) return p + (q - p) * 6 * t
  if (t < 1 / 2) return q
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
  return p
}

//const STANDARD_SHADES = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]

export function findClosestStandardShade(target: number): number {
  // Initialize variables to keep track of the closest number and its difference from the target
  let closest: number = HUE_TONES[0]
  let minDiff: number = Math.abs(HUE_TONES[0] - target)

  // Loop through the array to find the closest number
  for (let i = 1; i < HUE_TONES.length; i++) {
    const diff: number = Math.abs(HUE_TONES[i] - target)
    if (diff < minDiff) {
      closest = HUE_TONES[i]
      minDiff = diff
    }
  }

  return closest
}

export function generateRange(potentialColor: string) {
  const rgb: RGB = parseColor(potentialColor)
  const hsl = rgbToHsl(rgb)

  const closestStandardShade = findClosestStandardShade(1000 - hsl.l * 10)

  const shades: Color[] = []

  for (const shade of HUE_TONES) {
    if (shade === closestStandardShade)
      shades.push({
        weight: shade,
        value: potentialColor,
        on: getContrastingColor(hsl.l)
      })
    else {
      const luminance = (1000 - shade) / 10
      shades.push({
        weight: shade,
        value: colorToHex(hslToRgb({ h: hsl.h, s: hsl.s, l: luminance })),
        on: getContrastingColor(luminance)
      })
    }
  }

  return shades
}

export function getContrastingColor(luminance: number) {
  // Threshold value to determine whether to use white or black text
  const threshold = 50
  return luminance > threshold ? '#000' : '#fff'
}

export function getComplementaryColor(color: string): Color {
  const rgb: RGB = parseColor(color)

  // Calculate the complementary color by subtracting each component from 255
  rgb.r = 255 - rgb.r
  rgb.g = 255 - rgb.g
  rgb.b = 255 - rgb.b

  const hsl = rgbToHsl(rgb)

  // Convert the r, g, b values back to a hex string and return it
  return {
    value: colorToHex(rgb),
    on: getContrastingColor(hsl.l)
  }
}
