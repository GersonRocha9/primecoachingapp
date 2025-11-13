import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View } from 'react-native'

import {
  SpaceGrotesk_400Regular,
  SpaceGrotesk_500Medium,
  SpaceGrotesk_600SemiBold,
  SpaceGrotesk_700Bold,
  useFonts,
} from '@expo-google-fonts/space-grotesk'
import { AppText } from '@ui/components/AppText'

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
      <AppText family='sans' weight='regular'>Prime Coaching App</AppText>
      <AppText family='sans' weight='medium'>Prime Coaching App</AppText>
      <AppText family='sans' weight='semiBold'>Prime Coaching App</AppText>
      <AppText family='sans' weight='bold'>Prime Coaching App</AppText>
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
