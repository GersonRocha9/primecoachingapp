import { ImageBackground, ScrollView, View } from 'react-native'

import {
  SpaceGrotesk_400Regular,
  SpaceGrotesk_500Medium,
  SpaceGrotesk_600SemiBold,
  SpaceGrotesk_700Bold,
  useFonts,
} from '@expo-google-fonts/space-grotesk'
import { AppText } from '@ui/components/AppText'
import { Button } from '@ui/components/Button'
import { Logo } from '@ui/components/Logo'
import { theme } from '@ui/styles/theme'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import backgroundImage from '../../../assets/background.png'
import { styles } from './styles'

export function Greetings() {
  const { top } = useSafeAreaInsets()
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
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      <ScrollView>

        <ImageBackground
          source={backgroundImage}
          style={styles.logoContainer}
          resizeMode="cover"
        >
          <Logo width={135} height={135} />

          <View style={[styles.copyrightContainer, { top: top + 16 }]}>
            <AppText color={theme.colors.white} size='xxs'>
              Copyright © PRIME 2024 {'\n'}Todos os direitos reservados V1.01
            </AppText>
          </View>
        </ImageBackground>

        <View style={styles.content}>
          <View style={styles.textContainer}>
            <AppText color={theme.colors.gray[900]} size='3xl' weight='medium'>
              Seja{'\n'}bem-vindo!
            </AppText>

            <AppText color={theme.colors.gray[900]}>
              Para prosseguir, selecione o seu tipo {'\n'}de acesso
            </AppText>
          </View>

          <View style={styles.buttonContainer}>
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
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

