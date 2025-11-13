import { TextInput, StyleSheet, View } from 'react-native'
import { theme } from '@ui/styles/theme'
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
  return (
    <View style={styles.container}>
      {label && (
        <AppText size="sm" color={theme.colors.gray[600]} style={styles.label}>
          {label}
        </AppText>
      )}
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.gray[400]}
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
    borderColor: theme.colors.gray[300],
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 16,
    fontSize: 16,
    fontFamily: theme.fontFamily.sans.regular,
    color: theme.colors.gray[900],
    backgroundColor: theme.colors.white,
    textAlign: 'center',
  },
})