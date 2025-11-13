import { useState, type ReactNode } from 'react'
import { NativeSyntheticEvent, Pressable, TextInput, TextInputFocusEventData, TextInputProps, View } from 'react-native'

import { useTheme } from '@app/contexts/useTheme'
import { getTheme } from '@ui/styles/theme'
import { getInputStyles, styles } from './styles'

type BaseTextInputProps = Omit<React.ComponentProps<typeof TextInput>, 'readOnly'>

export interface IInputProps extends BaseTextInputProps {
  error?: boolean
  disabled?: boolean
  InputComponent?: React.ComponentType<TextInputProps>
  ref?: React.Ref<TextInput>
  formatter?: (value: string) => string
  rightIcon?: ReactNode
  onRightIconPress?: () => void
}

export function Input({
  style,
  onFocus,
  onBlur,
  error,
  disabled,
  InputComponent = TextInput,
  onChangeText,
  formatter,
  rightIcon,
  onRightIconPress,
  ...props
}: IInputProps) {
  const [isFocused, setIsFocused] = useState(false)
  const { isDark } = useTheme()
  const theme = getTheme(isDark)
  const inputStyles = getInputStyles(isDark)

  function handleFocus(event: NativeSyntheticEvent<TextInputFocusEventData>) {
    setIsFocused(true)
    onFocus?.(event)
  }

  function handleBlur(event: NativeSyntheticEvent<TextInputFocusEventData>) {
    setIsFocused(false)
    onBlur?.(event)
  }

  function handleChangeText(value: string) {
    const formattedValue = formatter?.(value) ?? value

    onChangeText?.(formattedValue)
  }

  if (rightIcon) {
    return (
      <View
        style={[
          inputStyles({
            status: error ? 'error' : (isFocused ? 'focus' : 'default'),
            disabled: disabled ? 'true' : 'false',
          }),
          styles.inputContainer,
        ]}
      >
        <InputComponent
          style={[styles.inputWithIcon, { color: theme.colors.text }, style]}
          placeholderTextColor={theme.colors.textSecondary}
          onFocus={handleFocus as any}
          onBlur={handleBlur as any}
          readOnly={disabled}
          onChangeText={handleChangeText}
          {...props}
        />
        <Pressable onPress={onRightIconPress} style={styles.iconContainer}>
          {rightIcon}
        </Pressable>
      </View>
    )
  }

  return (
    <InputComponent
      style={[
        inputStyles({
          status: error ? 'error' : (isFocused ? 'focus' : 'default'),
          disabled: disabled ? 'true' : 'false',
        }),
        style,
      ]}
      placeholderTextColor={theme.colors.textSecondary}
      onFocus={handleFocus as any}
      onBlur={handleBlur as any}
      readOnly={disabled}
      onChangeText={handleChangeText}
      {...props}
    />
  )
}
