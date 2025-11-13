
import { AuthProvider } from '@app/contexts/AuthProvider'
import { queryClient } from '@app/lib/queryClient'
import { Navigation } from '@app/navigation'
import {
  SpaceGrotesk_400Regular,
  SpaceGrotesk_500Medium,
  SpaceGrotesk_600SemiBold,
  SpaceGrotesk_700Bold,
  useFonts,
} from '@expo-google-fonts/space-grotesk'
import { QueryClientProvider } from '@tanstack/react-query'
import { StatusBar } from 'expo-status-bar'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
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
    <GestureHandlerRootView>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <Navigation />
          </AuthProvider>
        </QueryClientProvider>
        <StatusBar style='light' />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}

