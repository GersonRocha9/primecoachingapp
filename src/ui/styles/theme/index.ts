const lightColors = {
  white: '#fff',
  'white/40': 'rgba(255, 255, 255, .4)',
  black: '#000',
  'black/40': 'rgba(0, 0, 0, .4)',
  primary: {
    25: '#FBFDFF',
    50: '#F5FAFF',
    100: '#EFF6FF',
    200: '#B7D8FF',
    300: '#81CFFF',
    400: '#77B6FF',
    500: '#63ABFF',
    600: '#449AFF',
    700: '#3D96FF',
    800: '#2265B5',
    900: '#12427C',
    950: '#081D36',
  },
  gray: {
    25: '#FCFCFD',
    50: '#F9FAFB',
    100: '#F2F4F7',
    200: '#EAECF0',
    300: '#D0D5DD',
    400: '#98A2B3',
    500: '#667085',
    600: '#475467',
    700: '#344054',
    800: '#1D2939',
    900: '#101828',
    950: '#0C111D',
  },
  red: {
    500: '#F04438',
  },
  background: '#fff',
  surface: '#fff',
  text: '#101828',
  textSecondary: '#667085',
  border: '#EAECF0',
} as const

const darkColors = {
  white: '#000',
  'white/40': 'rgba(0, 0, 0, .4)',
  black: '#fff',
  'black/40': 'rgba(255, 255, 255, .4)',
  primary: {
    25: '#081D36',
    50: '#12427C',
    100: '#2265B5',
    200: '#3D96FF',
    300: '#449AFF',
    400: '#63ABFF',
    500: '#77B6FF',
    600: '#81CFFF',
    700: '#B7D8FF',
    800: '#EFF6FF',
    900: '#F5FAFF',
    950: '#FBFDFF',
  },
  gray: {
    25: '#0C111D',
    50: '#101828',
    100: '#1D2939',
    200: '#344054',
    300: '#475467',
    400: '#667085',
    500: '#98A2B3',
    600: '#D0D5DD',
    700: '#EAECF0',
    800: '#F2F4F7',
    900: '#F9FAFB',
    950: '#FCFCFD',
  },
  red: {
    500: '#F87171',
  },
  background: '#0C111D',
  surface: '#1D2939',
  text: '#F9FAFB',
  textSecondary: '#98A2B3',
  border: '#344054',
} as const

const fontFamily = {
  sans: {
    regular: 'SpaceGrotesk_400Regular',
    medium: 'SpaceGrotesk_500Medium',
    semiBold: 'SpaceGrotesk_600SemiBold',
    bold: 'SpaceGrotesk_700Bold',
  },
} as const

const fontSize = {
  xxs: 6,
  xs: 12,
  sm: 14,
  base: 16,
  lg: 20,
  xl: 24,
  '2xl': 28,
} as const

export const lightTheme = {
  colors: lightColors,
  fontFamily,
  fontSize,
} as const

export const darkTheme = {
  colors: darkColors,
  fontFamily,
  fontSize,
} as const

// Legacy export for backward compatibility
export const theme = lightTheme

export function getTheme(isDark: boolean) {
  return isDark ? darkTheme : lightTheme
}
