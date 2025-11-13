import { Controller, useFormContext } from 'react-hook-form'
import { View } from 'react-native'

import Feather from '@expo/vector-icons/Feather'
import { AppText } from '@ui/components/AppText'
import { Button } from '@ui/components/Button'
import { GenderSelector } from '@ui/components/GenderSelector'
import { theme } from '@ui/styles/theme'
import { OnboardingLayout } from '../OnboardingLayout'
import { useOnboarding } from '../context/useOnboarding'
import type { OnboardingSchema } from '../schema'
import { styles } from '../styles'

export function GenderStep() {
  const { control, watch } = useFormContext<OnboardingSchema>()
  const { nextStep, previousStep, currentStepConfig, isFirstStep } = useOnboarding()
  const selectedGender = watch('gender')

  return (
    <OnboardingLayout icon={currentStepConfig.icon}>
      <View style={styles.header}>
        <AppText color={theme.colors.gray[900]} size='2xl' weight='medium'>
          {currentStepConfig.title}
        </AppText>
        {currentStepConfig.subtitle && (
          <AppText color={theme.colors.gray[600]} size='sm'>
            {currentStepConfig.subtitle}
          </AppText>
        )}
      </View>

      <View style={styles.formContainer}>
        <Controller
          control={control}
          name="gender"
          render={({ field: { onChange, value } }) => (
            <GenderSelector
              value={value}
              onChange={onChange}
            />
          )}
        />
      </View>

      <View style={styles.buttonContainer}>
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
          disabled={!selectedGender}
          textColor={theme.colors.white}
        >
          Avançar
        </Button>
      </View>
    </OnboardingLayout>
  )
}