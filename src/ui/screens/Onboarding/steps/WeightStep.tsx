import { useEffect, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { View } from 'react-native'
import Animated, { FadeInDown } from 'react-native-reanimated'

import { useTheme } from '@app/contexts/useTheme'
import { AuthTokensManager } from '@app/lib/AuthTokensManager'
import Feather from '@expo/vector-icons/Feather'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AppText } from '@ui/components/AppText'
import { Button } from '@ui/components/Button'
import { NumericInput } from '@ui/components/NumericInput'
import { getTheme } from '@ui/styles/theme'
import { useOnboarding } from '../context/useOnboarding'
import type { OnboardingSchema } from '../schema'
import { styles } from '../styles'

export function WeightStep() {
  const { control, watch, handleSubmit } = useFormContext<OnboardingSchema>()
  const { nextStep, previousStep, currentStepConfig, isFirstStep, isLastStep } = useOnboarding()
  const { isDark } = useTheme()
  const theme = getTheme(isDark)

  const weight = watch('weight')
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (weight && weight !== '') {
      const weightNum = parseFloat(weight)

      if (isNaN(weightNum)) {
        setErrorMessage('Por favor, insira apenas números')
      } else if (weightNum < 20) {
        setErrorMessage('O peso deve ser maior que 20kg')
      } else if (weightNum > 300) {
        setErrorMessage('O peso deve ser menor que 300kg')
      } else {
        setErrorMessage('')
      }
    } else {
      setErrorMessage('')
    }
  }, [weight])

  const isWeightValid = () => {
    if (!weight || weight === '') {
      return false
    }

    const weightNum = parseFloat(weight)
    return !isNaN(weightNum) && weightNum >= 20 && weightNum <= 300
  }

  const onSubmit = async (data: OnboardingSchema) => {
    if (isWeightValid()) {
      setIsLoading(true)

      try {
        let userData = null
        try {
          const currentUserStr = await AsyncStorage.getItem('currentUser')
          if (currentUserStr) {
            userData = JSON.parse(currentUserStr)
          }
        } catch {
        }

        if (!userData) {
          try {
            const loggedInUserStr = await AsyncStorage.getItem('loggedInUser')
            if (loggedInUserStr) {
              userData = JSON.parse(loggedInUserStr)
            }
          } catch {
          }
        }

        if (!userData) {
          userData = {
            id: Date.now().toString(),
            name: 'Usuário',
            email: 'user@example.com',
          }
        }

        const updatedUserData = {
          ...userData,
          onboardingData: {
            gender: data.gender,
            birthDate: data.birthDate?.toISOString(),
            height: data.height,
            weight: data.weight,
          },
          profileCompleted: true,
          completedAt: new Date().toISOString(),
        }

        await new Promise(resolve => setTimeout(resolve, 2000))

        await AsyncStorage.setItem('currentUser', JSON.stringify(updatedUserData))
        await AsyncStorage.setItem('currentUserId', updatedUserData.id)
        await AsyncStorage.setItem('onboarding_complete', 'true')

        const mockTokens = {
          accessToken: 'mock_access_token_' + Date.now(),
          refreshToken: 'mock_refresh_token_' + Date.now(),
        }

        await AuthTokensManager.save(mockTokens)

        nextStep()

      } catch {
        setErrorMessage('Erro ao salvar dados. Tente novamente.')
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <>
      <Animated.View
        style={styles.header}
        entering={FadeInDown.delay(200).duration(600).damping(15)}
      >
        <AppText color={theme.colors.text} size='2xl' weight='medium'>
          {currentStepConfig.title}
        </AppText>
        {currentStepConfig.subtitle && (
          <AppText color={theme.colors.textSecondary} size='sm'>
            {currentStepConfig.subtitle}
          </AppText>
        )}
      </Animated.View>

      <Animated.View
        style={styles.formContainer}
        entering={FadeInDown.delay(300).duration(600).damping(15)}
      >
        <AppText color={theme.colors.textSecondary} size='base' style={{ marginBottom: 8 }}>
          Digite seu peso em KG
        </AppText>

        <Controller
          control={control}
          name="weight"
          render={({ field: { onChange, value } }) => (
            <NumericInput
              placeholder="Ex.: 78kg"
              value={value}
              onChangeText={(text) => {
                const numericText = text.replace(/[^0-9.]/g, '')
                const parts = numericText.split('.')
                if (parts.length > 2) {
                  return
                }
                if (parts.length === 2 && parts[1].length > 1) {
                  onChange(parts[0] + '.' + parts[1].substring(0, 1))
                } else {
                  onChange(numericText)
                }
              }}
              maxLength={5}
              keyboardType="decimal-pad"
            />
          )}
        />

        {errorMessage && (
          <View style={weightStyles.errorContainer}>
            <AppText size="sm" color={theme.colors.red[500]}>
              {errorMessage}
            </AppText>
          </View>
        )}
      </Animated.View>

      <Animated.View
        style={styles.buttonContainer}
        entering={FadeInDown.delay(400).duration(600).damping(15)}
      >
        {!isFirstStep && (
          <Button
            variant="ghost"
            onPress={previousStep}
            textColor={theme.colors.textSecondary}
            disabled={isLoading}
          >
            Voltar
          </Button>
        )}
        <Button
          rightIcon={!isLoading && isLastStep ? <Feather name="check" color={isDark ? theme.colors.gray[900] : theme.colors.white} size={24} /> : !isLoading ? <Feather name="arrow-right" color={isDark ? theme.colors.gray[900] : theme.colors.white} size={24} /> : undefined}
          onPress={handleSubmit(onSubmit)}
          disabled={!isWeightValid() || isLoading}
          textColor={isLoading ? theme.colors.textSecondary : (isDark ? theme.colors.gray[900] : theme.colors.white)}
          isLoading={isLoading}
          variant={isLoading ? 'secondary' : 'primary'}
          style={isLoading ? { borderColor: theme.colors.border, borderWidth: 1 } : undefined}
        >
          {isLoading ? 'Finalizando' : isLastStep ? 'Finalizar' : 'Avançar'}
        </Button>
      </Animated.View>
    </>
  )
}

const weightStyles = {
  instruction: {
    marginBottom: 16,
  },
  errorContainer: {
    marginTop: 8,
    alignItems: 'center' as const,
  },
}

