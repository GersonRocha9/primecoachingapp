import { ScrollView, View } from 'react-native'

import { AppText } from '@ui/components/AppText'
import { BackgroundHeader } from '@ui/components/BackgroundHeader'
import { Button } from '@ui/components/Button'
import { ArrowRightIcon, UserIcon } from '@ui/icons'
import { theme } from '@ui/styles/theme'
import { SafeAreaView } from 'react-native-safe-area-context'
import { styles } from './styles'

export function Login() {
  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      <ScrollView>
        <BackgroundHeader icon={<UserIcon />} />

        <View style={styles.content}>
          <View style={styles.textContainer}>
            <AppText color={theme.colors.gray[900]} size='2xl' weight='medium'>
              Acesse o app
            </AppText>
          </View>

          <View style={styles.buttonContainer}>
            <Button
              rightIcon={<ArrowRightIcon />}
            >
              Entrar
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

