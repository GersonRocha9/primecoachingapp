import { FormProvider, useForm } from 'react-hook-form'
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated'

import { zodResolver } from '@hookform/resolvers/zod'
import { BackgroundHeader } from '@ui/components/BackgroundHeader'
import { theme } from '@ui/styles/theme'
import { OnboardingProvider } from './context/OnboardingProvider'
import { useOnboarding } from './context/useOnboarding'
import { onboardingSchema } from './schema'
import { BirthDateStep } from './steps/BirthDateStep'
import { GenderStep } from './steps/GenderStep'
import { HeightStep } from './steps/HeightStep'
import { StartStep } from './steps/StartStep'
import { WeightStep } from './steps/WeightStep'
import { styles } from './styles'

function OnboardingContent() {
  const { currentStepIndex, currentStepConfig } = useOnboarding()

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
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
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
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

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
        <View style={{ flex: 1, backgroundColor: theme.colors.white }}>
          <OnboardingContent />
        </View>
      </OnboardingProvider>
    </FormProvider>
  )
}
