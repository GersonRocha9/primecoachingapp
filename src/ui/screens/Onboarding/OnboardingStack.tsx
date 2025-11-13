import { createNavigationContainerRef, NavigationContainer, NavigationIndependentTree, RouteProp } from '@react-navigation/native'
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack'
import { BirthDateStep } from './steps/BirthDateStep'
import { GenderStep } from './steps/GenderStep'
import { HeightStep } from './steps/HeightStep'
import { StartStep } from './steps/StartStep'
import { WeightStep } from './steps/WeightStep'

export type OnboardingStackParamList = {
  Start: undefined
  Gender: undefined
  BirthDate: undefined
  Height: undefined
  Weight: undefined
}

export type OnboardingStackNavigationProps = NativeStackNavigationProp<OnboardingStackParamList>

export type OnboardingStackScreenProps<
  TRouteName extends keyof OnboardingStackParamList,
> = NativeStackScreenProps<OnboardingStackParamList, TRouteName>

export type OnboardingStackRouteProps<
  TRouteName extends keyof OnboardingStackParamList,
> = RouteProp<OnboardingStackParamList, TRouteName>

const Stack = createNativeStackNavigator<OnboardingStackParamList>()

export const onboardingNavigation = createNavigationContainerRef<OnboardingStackParamList>()

export function OnboardingStack() {
  return (
    <NavigationIndependentTree>
      <NavigationContainer ref={onboardingNavigation}>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName="Start"
        >
          <Stack.Screen name="Start" component={StartStep} />
          <Stack.Screen name="Gender" component={GenderStep} />
          <Stack.Screen name="BirthDate" component={BirthDateStep} />
          <Stack.Screen name="Height" component={HeightStep} />
          <Stack.Screen name="Weight" component={WeightStep} />
        </Stack.Navigator>
      </NavigationContainer>
    </NavigationIndependentTree>
  )
}
