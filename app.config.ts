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
    'bundleIdentifier': 'com.gersonrocha9.primecoachingapp',
  },
  'android': {
    'adaptiveIcon': {
      'foregroundImage': './assets/adaptive-icon.png',
      'backgroundColor': '#449AFF',
    },
    'softwareKeyboardLayoutMode': 'pan',
    'edgeToEdgeEnabled': true,
    'predictiveBackGestureEnabled': false,
    'package': 'com.gersonrocha9.primecoachingapp',
  },
  'web': {
    'favicon': './assets/favicon.png',
  },
  'owner': 'gersonrocha9',
  'extra': {
    'eas': {
      'projectId': 'a8f0e4db-fdbb-4469-8007-86dc152ee9cf',
    },
  },
})
