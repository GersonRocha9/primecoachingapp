import { TextInput, StyleSheet, View } from 'react-native'
import { theme } from '@ui/styles/theme'
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
  return (
    <View style={styles.container}>
      {label && (
        <AppText size="sm" color={theme.colors.gray[600]} style={styles.label}>
          {label}
        </AppText>
      )}
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.gray[400]}
          value={value}
          onChangeText={onChangeText}
          maxLength={maxLength}
          keyboardType={keyboardType}
        />
        {suffix && (
          <AppText size="base" color={theme.colors.gray[500]} style={styles.suffix}>
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
    borderColor: theme.colors.gray[300],
    borderRadius: 8,
    backgroundColor: theme.colors.white,
    paddingHorizontal: 16,
  },
  input: {
    flex: 1,
    paddingVertical: 16,
    fontSize: 16,
    fontFamily: theme.fontFamily.sans.regular,
    color: theme.colors.gray[900],
  },
  suffix: {
    marginLeft: 8,
  },
})