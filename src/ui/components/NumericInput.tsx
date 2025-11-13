import { useTheme } from '@app/contexts/useTheme'
import { getTheme } from '@ui/styles/theme'
import { StyleSheet, TextInput, View } from 'react-native'
import { AppText } from './AppText'

interface INumericInputProps {
  placeholder: string
  value: string
  onChangeText: (text: string) => void
  maxLength?: number
  label?: string
  keyboardType?: 'numeric' | 'decimal-pad' | 'default'
  suffix?: string
}

export function NumericInput({
  placeholder,
  value,
  onChangeText,
  maxLength,
  label,
  keyboardType = 'numeric',
  suffix,
}: INumericInputProps) {
  const { isDark } = useTheme()
  const theme = getTheme(isDark)

  return (
    <View style={styles.container}>
      {label && (
        <AppText size="sm" color={theme.colors.textSecondary} style={styles.label}>
          {label}
        </AppText>
      )}
      <View
        style={[
          styles.inputWrapper,
          {
            borderColor: theme.colors.border,
            backgroundColor: isDark ? theme.colors.gray[100] : theme.colors.surface,
          },
        ]}
      >
        <TextInput
          style={[styles.input, { color: theme.colors.text }]}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.textSecondary}
          value={value}
          onChangeText={onChangeText}
          maxLength={maxLength}
          keyboardType={keyboardType}
        />
        {suffix && (
          <AppText size="base" color={theme.colors.textSecondary} style={styles.suffix}>
            {suffix}
          </AppText>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
  },
  input: {
    flex: 1,
    paddingVertical: 16,
    fontSize: 16,
  },
  suffix: {
    marginLeft: 8,
  },
})
