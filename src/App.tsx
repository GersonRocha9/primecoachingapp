
import {
  SpaceGrotesk_400Regular,
  SpaceGrotesk_500Medium,
  SpaceGrotesk_600SemiBold,
  SpaceGrotesk_700Bold,
  useFonts,
} from '@expo-google-fonts/space-grotesk'
import { Greetings } from '@ui/screens/Greetings'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'

export function App() {
  const [isFontsLoaded] = useFonts({
    SpaceGrotesk_400Regular,
    SpaceGrotesk_500Medium,
    SpaceGrotesk_600SemiBold,
    SpaceGrotesk_700Bold,
  })

  if (!isFontsLoaded) {
    return null
  }

  return (
    <SafeAreaProvider>
      <Greetings />
      <StatusBar style="light" backgroundColor="#449AFF" />
    </SafeAreaProvider>
  )
}

