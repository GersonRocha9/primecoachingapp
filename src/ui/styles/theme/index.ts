const colors = {
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
  xs: 12,
  sm: 14,
  base: 16,
  lg: 20,
  xl: 24,
  '2xl': 28,
  '3xl': 32,
} as const

export const theme = {
  colors,
  fontFamily,
  fontSize,
} as const
