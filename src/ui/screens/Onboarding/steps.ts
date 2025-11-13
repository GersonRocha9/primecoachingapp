import type { OnboardingStackParamList } from './OnboardingStack.tsx'

export const orderedSteps: (keyof OnboardingStackParamList)[] = [
  'Start',
  'Gender',
  'BirthDate',
  'Height',
  'Weight',
]

export const TOTAL_STEPS = orderedSteps.length
