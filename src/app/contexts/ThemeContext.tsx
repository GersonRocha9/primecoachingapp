import AsyncStorage from '@react-native-async-storage/async-storage'
import { createContext, useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { useColorScheme } from 'react-native'

type ThemeMode = 'light' | 'dark' | 'system'

interface IThemeContextData {
  mode: ThemeMode
  isDark: boolean
  setThemeMode: (mode: ThemeMode) => void
}

export const ThemeContext = createContext<IThemeContextData>({} as IThemeContextData)

const THEME_STORAGE_KEY = '@primecoaching:theme'

export function ThemeProvider({ children }: { children: ReactNode }) {
  const systemColorScheme = useColorScheme()
  const [mode, setMode] = useState<ThemeMode>('system')

  useEffect(() => {
    loadThemePreference()
  }, [])

  async function loadThemePreference() {
    try {
      const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY)
      if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark' || savedTheme === 'system')) {
        setMode(savedTheme)
      }
    } catch (error) {
      console.error('Error loading theme preference:', error)
    }
  }

  const setThemeMode = useCallback(async (newMode: ThemeMode) => {
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, newMode)
      setMode(newMode)
    } catch (error) {
      console.error('Error saving theme preference:', error)
    }
  }, [])

  const isDark = useMemo(() => {
    if (mode === 'system') {
      return systemColorScheme === 'dark'
    }
    return mode === 'dark'
  }, [mode, systemColorScheme])

  const contextValue = useMemo(() => ({
    mode,
    isDark,
    setThemeMode,
  }), [mode, isDark, setThemeMode])

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  )
}

