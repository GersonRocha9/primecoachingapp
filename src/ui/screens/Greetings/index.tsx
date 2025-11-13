import { ScrollView, View } from 'react-native'

import { AppText } from '@ui/components/AppText'
import { BackgroundHeader } from '@ui/components/BackgroundHeader'
import { Button } from '@ui/components/Button'
import { theme } from '@ui/styles/theme'
import { SafeAreaView } from 'react-native-safe-area-context'
import { styles } from './styles'

export function Greetings() {
  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      <ScrollView>
        <BackgroundHeader />

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

