import { RootStackNavigationProps } from '@app/navigation/RootStack'
import { AccountsService } from '@app/services/AccountService'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import { useCallback, useState } from 'react'
import { useFormContext } from 'react-hook-form'

import { OnboardingContext } from '.'
import { onboardingNavigation } from '../OnboardingStack'
import type { OnboardingSchema } from '../schema'
import { orderedSteps } from '../steps'

export function OnboardingProvider({ children }: { children: React.ReactNode }) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const navigation = useNavigation<RootStackNavigationProps>()
  const { getValues } = useFormContext<OnboardingSchema>()

  const completeOnboarding = useCallback(async () => {
    try {
      // Get form data
      const formData = getValues()

      // Save onboarding data to user profile
      await AccountsService.updateProfile({
        gender: formData.gender,
        birthDate: formData.birthDate,
        height: formData.height,
        weight: formData.weight,
      })

      // Mark onboarding as complete
      await AsyncStorage.setItem('onboarding_complete', 'true')

      // Navigate to App stack
      navigation.reset({
        index: 0,
        routes: [{ name: 'App' }],
      })
    } catch (error) {
      console.error('Failed to complete onboarding:', error)
    }
  }, [navigation, getValues])

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
        nextStep,
        previousStep,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  )
}
