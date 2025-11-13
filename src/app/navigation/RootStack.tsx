import { RouteProp } from '@react-navigation/native'
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack'

import { useAuth } from '@app/contexts/useAuth'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Onboarding } from '@ui/screens/Onboarding'
import { useEffect, useState } from 'react'
import { AppStack } from './AppStack'
import { AuthStack } from './AuthStack'

type RootStackParamList = {
  Auth: undefined
  Onboarding: undefined
  App: undefined
}

export type RootStackNavigationProps = NativeStackNavigationProp<RootStackParamList>

export type RootStackScreenProps<
  TRouteName extends keyof RootStackParamList,
> = NativeStackScreenProps<RootStackParamList, TRouteName>

export type RootStackRouteProps<
  TRouteName extends keyof RootStackParamList,
> = RouteProp<RootStackParamList, TRouteName>

const Stack = createNativeStackNavigator<RootStackParamList>()

export function RootStack() {
  const { signedIn } = useAuth()
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState<boolean | null>(null)

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      try {
        const onboardingComplete = await AsyncStorage.getItem('onboarding_complete')
        setHasCompletedOnboarding(onboardingComplete === 'true')
      } catch {
        setHasCompletedOnboarding(false)
      }
    }

    if (signedIn) {
      checkOnboardingStatus()
    }
  }, [signedIn])

  // Poll for onboarding completion when user is on onboarding screen
  useEffect(() => {
    if (signedIn && hasCompletedOnboarding === false) {
      const interval = setInterval(async () => {
        try {
          const onboardingComplete = await AsyncStorage.getItem('onboarding_complete')
          if (onboardingComplete === 'true') {
            setHasCompletedOnboarding(true)
          }
        } catch {
          // Ignore errors during polling
        }
      }, 1000) // Check every second

      return () => clearInterval(interval)
    }
  }, [signedIn, hasCompletedOnboarding])

  if (signedIn && hasCompletedOnboarding === null) {
    return null
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!signedIn ? (
        <Stack.Screen
          name="Auth"
          component={AuthStack}
          options={{
            animationTypeForReplace: 'pop',
          }}
        />
      ) : !hasCompletedOnboarding ? (
        <Stack.Screen
          name="Onboarding"
          component={Onboarding}
          options={{
            animationTypeForReplace: 'push',
            gestureEnabled: false,
          }}
        />
      ) : (
        <Stack.Screen
          name="App"
          component={AppStack}
          options={{
            animationTypeForReplace: 'push',
          }}
        />
      )}
    </Stack.Navigator>
  )
}
