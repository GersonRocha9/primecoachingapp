import { CalendarCheckIcon, GenderIcon, RulerIcon, ScalesIcon, UserCheckIcon } from '@ui/icons'
import { ReactNode } from 'react'

export interface IStepConfig {
  icon: ReactNode
  title: string
  subtitle?: string
}

export const stepsConfig: Record<string, IStepConfig> = {
  Start: {
    icon: <UserCheckIcon />,
    title: 'Muito bom te ver por aqui',
    subtitle: 'Precisamos te conhecer melhor, então faremos algumas perguntas. Vai durar menos de 1 minuto. Vamos lá?',
  },
  Gender: {
    icon: <GenderIcon />,
    title: 'Qual seu sexo biológico?',
  },
  BirthDate: {
    icon: <CalendarCheckIcon />,
    title: 'Qual sua data de nascimento?',
  },
  Height: {
    icon: <RulerIcon />,
    title: 'Qual a sua altura?',
  },
  Weight: {
    icon: <ScalesIcon />,
    title: 'Quanto está pesando?',
  },
}
