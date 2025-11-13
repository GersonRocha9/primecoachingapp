import { Controller, useFormContext } from 'react-hook-form'
import Animated, { FadeInDown } from 'react-native-reanimated'

import { useTheme } from '@app/contexts/useTheme'
import Feather from '@expo/vector-icons/Feather'
import { AppText } from '@ui/components/AppText'
import { Button } from '@ui/components/Button'
import { GenderSelector } from '@ui/components/GenderSelector'
import { getTheme } from '@ui/styles/theme'
import { useOnboarding } from '../context/useOnboarding'
import type { OnboardingSchema } from '../schema'
import { styles } from '../styles'

export function GenderStep() {
  const { control, watch } = useFormContext<OnboardingSchema>()
  const { nextStep, previousStep, currentStepConfig, isFirstStep } = useOnboarding()
  const { isDark } = useTheme()
  const theme = getTheme(isDark)
  const selectedGender = watch('gender')

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
          >
            Voltar
          </Button>
        )}
        <Button
          rightIcon={<Feather name="arrow-right" color={isDark ? theme.colors.gray[900] : theme.colors.white} size={24} />}
          onPress={nextStep}
          disabled={!selectedGender}
          textColor={isDark ? theme.colors.gray[900] : theme.colors.white}
        >
          Avançar
        </Button>
      </Animated.View>
    </>
  )
}
