import { FormProvider, useForm } from 'react-hook-form'
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, TouchableWithoutFeedback, View } from 'react-native'
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated'
import { SafeAreaView } from 'react-native-safe-area-context'

import { useTheme } from '@app/contexts/useTheme'
import { zodResolver } from '@hookform/resolvers/zod'
import { BackgroundHeader } from '@ui/components/BackgroundHeader'
import { getTheme } from '@ui/styles/theme'
import { OnboardingProvider } from './context/OnboardingProvider'
import { useOnboarding } from './context/useOnboarding'
import { onboardingSchema, type OnboardingSchema } from './schema'
import { BirthDateStep } from './steps/BirthDateStep'
import { GenderStep } from './steps/GenderStep'
import { HeightStep } from './steps/HeightStep'
import { StartStep } from './steps/StartStep'
import { WeightStep } from './steps/WeightStep'
import { styles } from './styles'

function OnboardingContent() {
  const { currentStepIndex, currentStepConfig } = useOnboarding()
  const { isDark } = useTheme()
  const theme = getTheme(isDark)

  const renderStep = () => {
    switch (currentStepIndex) {
      case 0:
        return <StartStep key="start" />
      case 1:
        return <GenderStep key="gender" />
      case 2:
        return <BirthDateStep key="birthdate" />
      case 3:
        return <HeightStep key="height" />
      case 4:
        return <WeightStep key="weight" />
      default:
        return <StartStep key="start" />
    }
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={['bottom', 'left', 'right']}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{ flex: 1 }}>
              <BackgroundHeader icon={currentStepConfig.icon} />

              <View style={styles.content}>
                <Animated.View
                  key={currentStepIndex}
                  entering={FadeInRight.duration(400)}
                  exiting={FadeOutLeft.duration(400)}
                >
                  {renderStep()}
                </Animated.View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

function OnboardingWrapper() {
  const { isDark } = useTheme()
  const theme = getTheme(isDark)

  const form = useForm<OnboardingSchema>({
    resolver: zodResolver(onboardingSchema as any),
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
        <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
          <OnboardingContent />
        </View>
      </OnboardingProvider>
    </FormProvider>
  )
}

export function Onboarding() {
  return <OnboardingWrapper />
}
