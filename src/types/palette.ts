/**
 * types.ts
 *
 * Type definitions for color and palette structures.
 */

/**
 * Represents a color with its value, contrasting color, and optional weight.
 */
export type Color = {
  /** The hex or rgba value of the color. */
  value: string

  /** The contrasting color, usually used for text or elements on top of this color. */
  on: string

  /** Optional numeric weight for the color, indicating its intensity or shade. */
  weight?: number

  /** Additional properties can be added here for extensibility, e.g., name, type, etc. */
  [key: string]: unknown // Allows for additional properties
}

/**
 * Represents a color palette consisting of shades and a highlight color.
 */
export type Palette = {
  /** An array of color shades in the palette. */
  shades: Color[]

  /** The highlight color in the palette, often used for buttons or emphasis. */
  highlight: Color
}
