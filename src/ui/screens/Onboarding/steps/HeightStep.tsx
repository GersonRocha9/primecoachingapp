import { useEffect, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { View } from 'react-native'
import Animated, { FadeInDown } from 'react-native-reanimated'

import Feather from '@expo/vector-icons/Feather'
import { AppText } from '@ui/components/AppText'
import { Button } from '@ui/components/Button'
import { NumericInput } from '@ui/components/NumericInput'
import { theme } from '@ui/styles/theme'
import { useOnboarding } from '../context/useOnboarding'
import type { OnboardingSchema } from '../schema'
import { styles } from '../styles'

export function HeightStep() {
  const { control, watch } = useFormContext<OnboardingSchema>()
  const { nextStep, previousStep, currentStepConfig, isFirstStep } = useOnboarding()

  const height = watch('height')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (height && height !== '') {
      const heightNum = parseInt(height, 10)

      if (isNaN(heightNum)) {
        setErrorMessage('Por favor, insira apenas números')
      } else if (heightNum < 50) {
        setErrorMessage('A altura deve ser maior que 50cm')
      } else if (heightNum > 250) {
        setErrorMessage('A altura deve ser menor que 250cm')
      } else {
        setErrorMessage('')
      }
    } else {
      setErrorMessage('')
    }
  }, [height])

  const isHeightValid = () => {
    if (!height || height === '') { return false }

    const heightNum = parseInt(height, 10)
    return !isNaN(heightNum) && heightNum >= 50 && heightNum <= 250
  }

  return (
    <>
      <Animated.View
        style={styles.header}
        entering={FadeInDown.delay(200).duration(600).damping(15)}
      >
        <AppText color={theme.colors.gray[900]} size='2xl' weight='medium'>
          {currentStepConfig.title}
        </AppText>
        {currentStepConfig.subtitle && (
          <AppText color={theme.colors.gray[600]} size='sm'>
            {currentStepConfig.subtitle}
          </AppText>
        )}
      </Animated.View>

      <Animated.View
        style={styles.formContainer}
        entering={FadeInDown.delay(300).duration(600).damping(15)}
      >
        <AppText color={theme.colors.gray[700]} size='base' style={{ marginBottom: 8 }}>
          Digite sua altura em centímetros
        </AppText>

        <Controller
          control={control}
          name="height"
          render={({ field: { onChange, value } }) => (
            <NumericInput
              placeholder="Ex.: 178cm"
              value={value}
              onChangeText={(text) => {
                const numericText = text.replace(/[^0-9]/g, '')
                onChange(numericText)
              }}
              maxLength={3}
              keyboardType="numeric"
            />
          )}
        />

        {errorMessage && (
          <View style={heightStyles.errorContainer}>
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
            textColor={theme.colors.gray[600]}
          >
            Voltar
          </Button>
        )}
        <Button
          rightIcon={<Feather name="arrow-right" color={theme.colors.white} size={24} />}
          onPress={nextStep}
          disabled={!isHeightValid()}
          textColor={theme.colors.white}
        >
          Avançar
        </Button>
      </Animated.View>
    </>
  )
}

const heightStyles = {
  errorContainer: {
    marginTop: 8,
    alignItems: 'center' as const,
  },
}
