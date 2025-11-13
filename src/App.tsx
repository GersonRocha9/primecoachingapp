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
import { Button } from '@ui/components/Button'
import { ArrowRightIcon } from '@ui/icons/ArrowRight'

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
      <AppText weight='regular'>Prime Coaching App</AppText>
      <AppText weight='medium'>Prime Coaching App</AppText>
      <AppText weight='semiBold'>Prime Coaching App</AppText>
      <AppText weight='bold'>Prime Coaching App</AppText>

      <View style={styles.buttonContainer}>
        <Button textColor='#fff' rightIcon={<ArrowRightIcon />}>Entrar</Button>
        <Button variant='ghost' textColor='#000'>Voltar</Button>
        <Button
          variant='secondary'
          textColor='#3D96FF'
        >
          Sou profissional
        </Button>
        <Button
          variant='secondary'
          textColor='#3D96FF'
        >
          Sou aluno
        </Button>
      </View>
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
  buttonContainer: {
    paddingHorizontal: 32,
    gap: 12,
    width: '100%',
    marginTop: 24,
    flexDirection: 'column',
  },
})
