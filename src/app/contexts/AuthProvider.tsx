import AsyncStorage from '@react-native-async-storage/async-storage'
import * as SplashScreen from 'expo-splash-screen'
import { useCallback, useLayoutEffect, useState } from 'react'

import { useAccount } from '@app/hooks/useAccount'
import { useForceRender } from '@app/hooks/useForceRender'
import { AuthTokensManager } from '@app/lib/AuthTokensManager'
import { AuthService } from '@app/services/AuthService'
import { useQueryClient } from '@tanstack/react-query'
import { AuthContext } from '.'

SplashScreen.preventAutoHideAsync()

interface ISetupAuthParams {
  accessToken: string
  refreshToken: string
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const { account, loadAccount } = useAccount({ enabled: false })
  const queryClient = useQueryClient()
  const forceRender = useForceRender()

  const setupAuth = useCallback(async (tokens: ISetupAuthParams) => {
    await AuthTokensManager.save(tokens)

    await loadAccount()

    setIsAuthenticated(true)
    SplashScreen.hideAsync()
    setIsReady(true)
  }, [loadAccount])

  useLayoutEffect(() => {
    async function load() {
      try {
        const tokens = await AuthTokensManager.load()

        const currentUser = await AsyncStorage.getItem('currentUser')

        if (tokens && currentUser) {
          await setupAuth(tokens)
        } else {
          setIsReady(true)
          SplashScreen.hideAsync()
        }
      } catch (error) {
        console.error('Error loading auth state:', error)
        setIsReady(true)
        SplashScreen.hideAsync()
      }
    }

    load()
  }, [setupAuth])

  const signIn = useCallback(async (payload: AuthService.SignInPayload) => {
    const tokens = await AuthService.signIn(payload)
    await AuthTokensManager.save(tokens)
    await setupAuth(tokens)
    forceRender()
  }, [setupAuth, forceRender])

  const signUp = useCallback(async (payload: AuthService.SignUpPayload) => {
    const tokens = await AuthService.signUp(payload)
    await AuthTokensManager.save(tokens)
    await setupAuth(tokens)
    forceRender()
  }, [setupAuth, forceRender])

  const signOut = useCallback(async () => {
    queryClient.clear()

    await AsyncStorage.multiRemove([
      'auth_tokens',
      'currentUser',
      'currentUserId',
      'onboarding_complete',
    ])

    setIsAuthenticated(false)
    forceRender()
  }, [queryClient, forceRender])

  if (!isReady) {
    return null
  }

  return (
    <AuthContext.Provider value={{
      signedIn: isAuthenticated || !!account,
      signIn,
      signUp,
      signOut,
    }}>
      {children}
    </AuthContext.Provider>
  )
}
