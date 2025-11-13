import { AccountsService } from '@app/services/AccountService'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useCallback, useState } from 'react'
import { useFormContext } from 'react-hook-form'

import { OnboardingContext } from '.'
import { onboardingNavigation } from '../OnboardingStack'
import type { OnboardingSchema } from '../schema'
import { orderedSteps, TOTAL_STEPS } from '../steps'
import { stepsConfig } from '../stepsConfig'

export function OnboardingProvider({ children }: { children: React.ReactNode }) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const { getValues } = useFormContext<OnboardingSchema>()

  const currentStepName = orderedSteps[currentStepIndex]
  const currentStepConfig = stepsConfig[currentStepName]
  const isFirstStep = currentStepIndex === 0
  const isLastStep = currentStepIndex === TOTAL_STEPS - 1

  const completeOnboarding = useCallback(async () => {
    try {
      const formData = getValues()

      await AccountsService.updateProfile({
        gender: formData.gender,
        birthDate: formData.birthDate,
        height: formData.height,
        weight: formData.weight,
      })

      await AsyncStorage.setItem('onboarding_complete', 'true')

      // The RootStack will automatically detect the change and navigate to App
      // No need to manually reset navigation
    } catch (error) {
      console.error('Failed to complete onboarding:', error)
    }
  }, [getValues])

  const nextStep = useCallback(() => {
    const nextStepIndex = currentStepIndex + 1
    const nextStep = orderedSteps[nextStepIndex]

    if (!nextStep) {
      completeOnboarding()
      return
    }

    onboardingNavigation.navigate(nextStep)
    setCurrentStepIndex(nextStepIndex)
  }, [currentStepIndex, completeOnboarding])

  const previousStep = useCallback(() => {
    const previousStepIndex = currentStepIndex - 1

    if (!onboardingNavigation.canGoBack()) {
      return
    }

    onboardingNavigation.goBack()
    setCurrentStepIndex(previousStepIndex)
  }, [currentStepIndex])

  return (
    <OnboardingContext.Provider
      value={{
        currentStepIndex,
        currentStepName,
        currentStepConfig,
        totalSteps: TOTAL_STEPS,
        nextStep,
        previousStep,
        isFirstStep,
        isLastStep,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  )
}
