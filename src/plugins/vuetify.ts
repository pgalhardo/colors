/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
const vuetify = createVuetify({
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        dark: false,
        colors: {
          primary: '#424242', // Dark grey
          secondary: '#616161', // Slightly darker grey
          accent: '#757575', // Even darker grey
          background: '#FAFAFA', // Light grey background
          surface: '#FFFFFF', // White surface for cards
          error: '#FF5252', // Red for error messages
          info: '#2196F3', // Blue for info messages
          success: '#4CAF50', // Green for success messages
          warning: '#FFC107', // Amber for warning messages
          onPrimary: '#FFFFFF', // White text on primary color
          onSecondary: '#000000', // Black text on secondary color
          onBackground: '#000000', // Black text on light background
          onSurface: '#000000', // Black text on surface
          onError: '#FFFFFF', // White text on error messages
        },
      },
      dark: {
        dark: true,
        colors: {
          primary: '#BDBDBD', // Light grey
          secondary: '#E0E0E0', // Slightly lighter grey
          accent: '#F5F5F5', // Even lighter grey
          background: '#000000', // Black background
          surface: '#424242', // Dark grey surface for cards
          error: '#FF5252', // Same red for error messages
          info: '#2196F3', // Same blue for info messages
          success: '#4CAF50', // Same green for success messages
          warning: '#FFC107', // Same amber for warning messages
          onPrimary: '#000000', // Black text on light primary
          onSecondary: '#FFFFFF', // White text on light secondary
          onBackground: '#FFFFFF', // White text on black background
          onSurface: '#FFFFFF', // White text on dark surface
          onError: '#000000', // Black text on error messages
        },
      },
    },
  },
})

export default vuetify
