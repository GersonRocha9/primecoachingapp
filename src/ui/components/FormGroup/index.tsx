import { cloneElement } from 'react'
import { StyleProp, View, ViewStyle } from 'react-native'

import { useTheme } from '@app/contexts/useTheme'
import { getTheme } from '@ui/styles/theme'

import { AppText } from '../AppText'
import { styles } from './styles'

interface IFormGroupProps {
  label: string
  children: React.ReactElement<{ error?: boolean }>
  error?: string
  style?: StyleProp<ViewStyle>
}

export function FormGroup({ label, children, error, style }: IFormGroupProps) {
  const { isDark } = useTheme()
  const theme = getTheme(isDark)
  
  return (
    <View style={[styles.container, style]}>
      <AppText weight="medium" color={theme.colors.text} size='sm'>{label}</AppText>
      {cloneElement(children, { error: !!error })}
      {error && (
        <AppText size="sm" color={theme.colors.red[500]}>{error}</AppText>
      )}
    </View>
  )
}
