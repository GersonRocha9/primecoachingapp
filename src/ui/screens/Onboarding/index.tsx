import { FormProvider, useForm } from 'react-hook-form'
import { KeyboardAvoidingView, Platform } from 'react-native'

import { Gender } from '@app/types/Gender'
import { zodResolver } from '@hookform/resolvers/zod'
import { theme } from '@ui/styles/theme'
import { OnboardingStack } from './OnboardingStack'
import { OnboardingProvider } from './context/OnboardingProvider'
import { onboardingSchema } from './schema'

export function Onboarding() {
  const form = useForm({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      gender: Gender.MALE,
      birthDate: new Date(),
      height: '0',
      weight: '0',
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
