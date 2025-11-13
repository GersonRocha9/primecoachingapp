import { createContext } from 'react'
import type { IStepConfig } from '../stepsConfig'

interface IOnboardingContextValue {
  currentStepIndex: number
  currentStepName: string
  currentStepConfig: IStepConfig
  totalSteps: number
  nextStep: () => void
  previousStep: () => void
  isFirstStep: boolean
  isLastStep: boolean
}

export const OnboardingContext = createContext({} as IOnboardingContextValue)
