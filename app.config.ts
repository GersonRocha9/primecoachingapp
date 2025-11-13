import { ConfigContext, ExpoConfig } from 'expo/config'

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  'name': 'Prime App',
  'slug': 'primecoachingapp',
  'version': '1.0.0',
  'orientation': 'portrait',
  'icon': './assets/icon.png',
  'userInterfaceStyle': 'automatic',
  'newArchEnabled': true,
  'splash': {
    'image': './assets/splash-icon.png',
    'resizeMode': 'contain',
    'backgroundColor': '#449AFF',
  },
  'ios': {
    'supportsTablet': true,
  },
  'android': {
    'adaptiveIcon': {
      'foregroundImage': './assets/adaptive-icon.png',
      'backgroundColor': '#449AFF',
    },
    'softwareKeyboardLayoutMode': 'pan',
    'edgeToEdgeEnabled': true,
    'predictiveBackGestureEnabled': false,
  },
  'web': {
    'favicon': './assets/favicon.png',
  },
})
