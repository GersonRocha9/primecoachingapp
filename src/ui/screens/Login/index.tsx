import { useEffect, useState } from 'react'
import { Alert, Pressable, ScrollView, View } from 'react-native'
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

import { useAuth } from '@app/contexts/useAuth'
import { useTheme } from '@app/contexts/useTheme'
import { Feather } from '@expo/vector-icons'
import { AppText } from '@ui/components/AppText'
import { BackgroundHeader } from '@ui/components/BackgroundHeader'
import { Button } from '@ui/components/Button'
import { FormGroup } from '@ui/components/FormGroup'
import { Input } from '@ui/components/Input'
import { UserIcon } from '@ui/icons'
import { getTheme } from '@ui/styles/theme'
import { SafeAreaView } from 'react-native-safe-area-context'
import { styles } from './styles'

export function Login() {
  const { signIn } = useAuth()
  const { isDark } = useTheme()
  const theme = getTheme(isDark)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const translateY = useSharedValue(-500)
  const opacity = useSharedValue(0)

  useEffect(() => {
    translateY.value = withTiming(0, {
      duration: 700,
      easing: Easing.out(Easing.cubic),
    })
    opacity.value = withTiming(1, { duration: 700 })
  }, [])

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }))

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos')
      return
    }

    try {
      setIsLoading(true)
      await signIn({ email, password })
    } catch {
      Alert.alert('Erro', 'Falha ao fazer login. Verifique suas credenciais.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleForgotPassword = () => {
    Alert.alert('Esqueci minha senha', 'Funcionalidade em desenvolvimento')
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={['bottom', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <BackgroundHeader icon={<UserIcon />} />

        <Animated.View
          style={[styles.content, animatedStyle]}
        >
          <View style={styles.textContainer}>
            <AppText color={theme.colors.text} size='2xl' weight='medium'>
              Acesse o app
            </AppText>
          </View>

          <View style={styles.formContainer}>
            <FormGroup label="Email">
              <Input
                placeholder="seu@email.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </FormGroup>

            <FormGroup label="Senha">
              <Input
                placeholder="••••••••"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                rightIcon={
                  <Feather
                    name={showPassword ? 'eye-off' : 'eye'}
                    size={20}
                    color={theme.colors.textSecondary}
                  />
                }
                onRightIconPress={togglePasswordVisibility}
              />
            </FormGroup>

          </View>

          <Pressable onPress={handleForgotPassword} style={styles.forgotPasswordContainer}>
            <AppText color={theme.colors.primary[600]} size='sm' weight='medium'>
              Esqueci minha senha
            </AppText>
          </Pressable>

          <View style={styles.buttonContainer}>
            <Button
              rightIcon={<Feather name="arrow-right" color={isDark ? theme.colors.gray[900] : theme.colors.white} size={24} />}
              onPress={handleLogin}
              disabled={isLoading}
              isLoading={isLoading}
              textColor={isDark ? theme.colors.gray[900] : theme.colors.white}
            >
              Entrar
            </Button>
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  )
}

