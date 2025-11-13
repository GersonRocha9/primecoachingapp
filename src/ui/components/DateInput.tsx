import { useTheme } from '@app/contexts/useTheme'
import { getTheme } from '@ui/styles/theme'
import { StyleSheet, TextInput, View } from 'react-native'
import { AppText } from './AppText'

interface IDateInputProps {
  placeholder: string
  value: string
  onChangeText: (text: string) => void
  maxLength: number
  label?: string
  keyboardType?: 'numeric' | 'default'
}

export function DateInput({
  placeholder,
  value,
  onChangeText,
  maxLength,
  label,
  keyboardType = 'numeric',
}: IDateInputProps) {
  const { isDark } = useTheme()
  const theme = getTheme(isDark)

  return (
    <View style={styles.container}>
      {label && (
        <AppText size="sm" color={theme.colors.textSecondary} style={styles.label}>
          {label}
        </AppText>
      )}
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: isDark ? theme.colors.gray[100] : theme.colors.surface,
            borderColor: theme.colors.border,
            color: theme.colors.text,
          },
        ]}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.textSecondary}
        value={value}
        onChangeText={onChangeText}
        maxLength={maxLength}
        keyboardType={keyboardType}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  label: {
    marginBottom: 8,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 16,
    fontSize: 16,
    textAlign: 'center',
  },
})
