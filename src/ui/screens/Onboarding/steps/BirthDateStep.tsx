import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { View } from 'react-native'
import Animated, { FadeInDown } from 'react-native-reanimated'

import Feather from '@expo/vector-icons/Feather'
import { AppText } from '@ui/components/AppText'
import { Button } from '@ui/components/Button'
import { DateInput } from '@ui/components/DateInput'
import { theme } from '@ui/styles/theme'
import { useOnboarding } from '../context/useOnboarding'
import type { OnboardingSchema } from '../schema'
import { styles } from '../styles'

export function BirthDateStep() {
  const { setValue, watch } = useFormContext<OnboardingSchema>()
  const { nextStep, previousStep, currentStepConfig, isFirstStep } = useOnboarding()

  const birthDate = watch('birthDate')

  const [day, setDay] = useState('')
  const [month, setMonth] = useState('')
  const [year, setYear] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (birthDate && birthDate instanceof Date && !isNaN(birthDate.getTime())) {
      setDay(birthDate.getDate().toString())
      setMonth((birthDate.getMonth() + 1).toString())
      setYear(birthDate.getFullYear().toString())
    }
  }, [birthDate])

  useEffect(() => {
    setErrorMessage('')

    if (day && month && year) {
      const dayNum = parseInt(day, 10)
      const monthNum = parseInt(month, 10)
      const yearNum = parseInt(year, 10)

      // Check if values are valid numbers
      if (isNaN(dayNum) || isNaN(monthNum) || isNaN(yearNum)) {
        setErrorMessage('Por favor, insira apenas números')
        return
      }

      // Check year range
      if (yearNum < 1900 || yearNum > new Date().getFullYear()) {
        setErrorMessage(`O ano deve estar entre 1900 e ${new Date().getFullYear()}`)
        return
      }

      // Check month range
      if (monthNum < 1 || monthNum > 12) {
        setErrorMessage('O mês deve estar entre 1 e 12')
        return
      }

      // Check day range
      if (dayNum < 1 || dayNum > 31) {
        setErrorMessage('O dia deve estar entre 1 e 31')
        return
      }

      // Create date and validate it's a real date
      const newDate = new Date(yearNum, monthNum - 1, dayNum)

      if (newDate.getDate() === dayNum &&
        newDate.getMonth() === monthNum - 1 &&
        newDate.getFullYear() === yearNum) {
        setValue('birthDate', newDate)
        setErrorMessage('')
      } else {
        setErrorMessage('Data inválida')
      }
    }
  }, [day, month, year, setValue])

  const handleDayChange = (text: string) => {
    const numericText = text.replace(/[^0-9]/g, '')
    if (numericText.length <= 2) {
      setDay(numericText)
    }
  }

  const handleMonthChange = (text: string) => {
    const numericText = text.replace(/[^0-9]/g, '')
    if (numericText.length <= 2) {
      setMonth(numericText)
    }
  }

  const handleYearChange = (text: string) => {
    const numericText = text.replace(/[^0-9]/g, '')
    if (numericText.length <= 4) {
      setYear(numericText)
    }
  }

  const isDateValid = () => {
    if (!day || !month || !year) {
      return false
    }

    const dayNum = parseInt(day, 10)
    const monthNum = parseInt(month, 10)
    const yearNum = parseInt(year, 10)

    if (dayNum < 1 || dayNum > 31) {
      return false
    }
    if (monthNum < 1 || monthNum > 12) {
      return false
    }
    if (yearNum < 1900 || yearNum > new Date().getFullYear()) {
      return false
    }

    const testDate = new Date(yearNum, monthNum - 1, dayNum)
    return testDate.getDate() === dayNum &&
      testDate.getMonth() === monthNum - 1 &&
      testDate.getFullYear() === yearNum
  }

  return (
    <>
      <Animated.View
        style={styles.header}
        entering={FadeInDown.delay(200).duration(600).damping(15)}
      >
        <AppText color={theme.colors.gray[900]} size='2xl' weight='medium'>
          {currentStepConfig.title}
        </AppText>
        {currentStepConfig.subtitle && (
          <AppText color={theme.colors.gray[600]} size='sm'>
            {currentStepConfig.subtitle}
          </AppText>
        )}
      </Animated.View>

      <Animated.View
        style={styles.formContainer}
        entering={FadeInDown.delay(300).duration(600).damping(15)}
      >
        <View style={dateStyles.inputContainer}>
          <DateInput
            label="Dia"
            placeholder="Digite..."
            value={day}
            onChangeText={handleDayChange}
            maxLength={2}
          />
          <DateInput
            label="Mês"
            placeholder="Digite..."
            value={month}
            onChangeText={handleMonthChange}
            maxLength={2}
          />
          <DateInput
            label="Ano"
            placeholder="Digite..."
            value={year}
            onChangeText={handleYearChange}
            maxLength={4}
          />
        </View>
        {errorMessage && (
          <View style={dateStyles.errorContainer}>
            <AppText size="sm" color={theme.colors.red[500]}>
              {errorMessage}
            </AppText>
          </View>
        )}
      </Animated.View>

      <Animated.View
        style={styles.buttonContainer}
        entering={FadeInDown.delay(400).duration(600).damping(15)}
      >
        {!isFirstStep && (
          <Button
            variant="ghost"
            onPress={previousStep}
            textColor={theme.colors.gray[600]}
          >
            Voltar
          </Button>
        )}
        <Button
          rightIcon={<Feather name="arrow-right" color={theme.colors.white} size={24} />}
          onPress={nextStep}
          disabled={!isDateValid()}
          textColor={theme.colors.white}
        >
          Avançar
        </Button>
      </Animated.View>
    </>
  )
}

const dateStyles = {
  inputContainer: {
    flexDirection: 'row' as const,
    gap: 12,
  },
  errorContainer: {
    marginTop: 8,
    alignItems: 'center' as const,
  },
}
