import { FormProvider, useForm } from 'react-hook-form'
import { KeyboardAvoidingView, Platform } from 'react-native'

import { zodResolver } from '@hookform/resolvers/zod'
import { theme } from '@ui/styles/theme'
import { OnboardingStack } from './OnboardingStack'
import { OnboardingProvider } from './context/OnboardingProvider'
import { onboardingSchema } from './schema'

export function Onboarding() {
  const form = useForm({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      gender: undefined,
      birthDate: undefined,
      height: '',
      weight: '',
    },
  })

  return (
    <FormProvider {...form}>
      <OnboardingProvider>
        <KeyboardAvoidingView
          style={{ flex: 1, backgroundColor: theme.colors.white }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <OnboardingStack />
        </KeyboardAvoidingView>
      </OnboardingProvider>
    </FormProvider>
  )
}
