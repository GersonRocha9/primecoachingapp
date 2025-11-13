import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'

import {
  SpaceGrotesk_400Regular,
  SpaceGrotesk_500Medium,
  SpaceGrotesk_600SemiBold,
  SpaceGrotesk_700Bold,
  useFonts,
} from '@expo-google-fonts/space-grotesk'
import { theme } from './ui/styles/theme'

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
    <View style={styles.container}>
      <Text style={{ fontFamily: theme.fontFamily.sans.regular }}>Prime Coaching App</Text>
      <Text style={{ fontFamily: theme.fontFamily.sans.medium }}>Prime Coaching App</Text>
      <Text style={{ fontFamily: theme.fontFamily.sans.semiBold }}>Prime Coaching App</Text>
      <Text style={{ fontFamily: theme.fontFamily.sans.bold }}>Prime Coaching App</Text>
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
