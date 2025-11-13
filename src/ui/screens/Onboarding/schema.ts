import { Gender } from '@app/types/Gender'
import z from 'zod'

export const onboardingSchema = z.object({
  gender: z.enum(Gender),
  birthDate: z.date(),
  height: z.string().min(1, 'Informe a sua altura'),
  weight: z.string().min(1, 'Informe o seu peso'),
})

export type OnboardingSchema = z.infer<typeof onboardingSchema>
