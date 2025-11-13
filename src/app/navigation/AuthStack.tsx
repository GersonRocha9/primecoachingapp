import { RouteProp } from '@react-navigation/native'
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack'

import { Greetings } from '@ui/screens/Greetings'
import { Login } from '@ui/screens/Login'

type AuthStackParamList = {
  Greetings: undefined
  Login: undefined
}

export type AuthStackNavigationProps = NativeStackNavigationProp<AuthStackParamList>

export type AuthStackScreenProps<
  TRouteName extends keyof AuthStackParamList,
> = NativeStackScreenProps<AuthStackParamList, TRouteName>

export type AuthStackRouteProps<
  TRouteName extends keyof AuthStackParamList,
> = RouteProp<AuthStackParamList, TRouteName>

const Stack = createNativeStackNavigator<AuthStackParamList>()

export function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, fullScreenGestureEnabled: true }}
    >
      <Stack.Screen
        name="Greetings"
        component={Greetings}
      />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  )
}
