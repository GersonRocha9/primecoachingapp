import { ScrollView, View } from 'react-native'
import Animated, { FadeInDown } from 'react-native-reanimated'

import type { AuthStackNavigationProps } from '@app/navigation/AuthStack'
import { useTheme } from '@app/contexts/useTheme'
import { useNavigation } from '@react-navigation/native'
import { AppText } from '@ui/components/AppText'
import { BackgroundHeader } from '@ui/components/BackgroundHeader'
import { Button } from '@ui/components/Button'
import { UserIcon } from '@ui/icons'
import { getTheme } from '@ui/styles/theme'
import { SafeAreaView } from 'react-native-safe-area-context'
import { styles } from './styles'

export function Greetings() {
  const navigation = useNavigation<AuthStackNavigationProps>()
  const { isDark } = useTheme()
  const theme = getTheme(isDark)

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={['bottom', 'left', 'right']}>
      <ScrollView>
        <BackgroundHeader icon={<UserIcon />} animated />

        <View style={styles.content}>
          <Animated.View 
            style={styles.textContainer}
            entering={FadeInDown.delay(400).duration(600).springify()}
          >
            <AppText color={theme.colors.text} size='2xl' weight='medium'>
              Seja{'\n'}bem-vindo!
            </AppText>

            <AppText color={theme.colors.textSecondary}>
              Para prosseguir, selecione o seu tipo {'\n'}de acesso
            </AppText>
          </Animated.View>

          <Animated.View 
            style={styles.buttonContainer}
            entering={FadeInDown.delay(600).duration(600).springify()}
          >
            <Button
              variant='secondary'
              textColor={theme.colors.primary[600]}
              onPress={() => navigation.navigate('Login')}
            >
              Sou profissional
            </Button>
            <Button
              variant='secondary'
              textColor={theme.colors.primary[600]}
              onPress={() => navigation.navigate('Login')}
            >
              Sou aluno
            </Button>
          </Animated.View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

