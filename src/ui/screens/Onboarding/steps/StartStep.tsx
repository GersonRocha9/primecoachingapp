import { useEffect, useState } from 'react'
import Animated, { FadeInDown } from 'react-native-reanimated'

import Feather from '@expo/vector-icons/Feather'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AppText } from '@ui/components/AppText'
import { Button } from '@ui/components/Button'
import { theme } from '@ui/styles/theme'
import { useOnboarding } from '../context/useOnboarding'
import { styles } from '../styles'

export function StartStep() {
  const { nextStep, currentStepConfig } = useOnboarding()
  const [userName, setUserName] = useState<string>('visitante')

  useEffect(() => {
    async function loadUserName() {
      try {
        const currentUserData = await AsyncStorage.getItem('currentUser')
        if (currentUserData) {
          const userData = JSON.parse(currentUserData)
          if (userData.name) {
            const firstName = userData.name.split(' ')[0]
            setUserName(firstName)
            return
          }
        }

        const loggedInUser = await AsyncStorage.getItem('loggedInUser')
        if (loggedInUser) {
          const userData = JSON.parse(loggedInUser)
          if (userData.name) {
            const firstName = userData.name.split(' ')[0]
            setUserName(firstName)
          }
        }
      } catch (error) {
        console.error('Error loading user name:', error)
      }
    }

    loadUserName()
  }, [])

  return (
    <>
      <Animated.View
        style={styles.header}
        entering={FadeInDown.delay(200).duration(600).damping(15)}
      >
        <AppText color={theme.colors.gray[900]} size='2xl' weight='medium'>
          Olá 👋 {'\n'}
          {currentStepConfig.title}, <AppText color={theme.colors.primary[600]} size='2xl' weight='medium'>{userName}!</AppText>
        </AppText>
        {currentStepConfig.subtitle && (
          <AppText color={theme.colors.gray[900]} style={{ lineHeight: 28 }}>
            {currentStepConfig.subtitle}
          </AppText>
        )}
      </Animated.View>

      <Animated.View
        style={styles.buttonContainer}
        entering={FadeInDown.delay(400).duration(600).damping(15)}
      >
        <Button
          rightIcon={<Feather name="arrow-right" color={theme.colors.white} size={24} />}
          onPress={nextStep}
          textColor={theme.colors.white}
        >
          Começar
        </Button>
      </Animated.View>
    </>
  )
}

