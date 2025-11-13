import React from 'react'
import { ActivityIndicator, Platform, Pressable, View } from 'react-native'

import { theme } from '@ui/styles/theme'
import { AppText } from '../AppText'
import { buttonStyles, ButtonVariants, styles } from './styles'

interface IButtonProps extends React.ComponentProps<typeof Pressable>,
  Omit<ButtonVariants, 'disabled'> {
  isLoading?: boolean
  textColor?: string
  textSize?: 'sm' | 'base' | 'lg'
  leftIcon?: React.ReactElement
  rightIcon?: React.ReactElement
  iconGap?: number
}

export function Button({
  children,
  variant,
  size,
  disabled: disabledProp,
  style,
  isLoading,
  textColor,
  textSize = 'lg',
  leftIcon,
  rightIcon,
  iconGap = 8,
  ...props
}: IButtonProps) {
  const disabled = disabledProp || isLoading

  const textColorStyle = textColor ? { color: textColor } : {}

  const clonedLeftIcon = leftIcon && textColor
    ? React.cloneElement(leftIcon, { color: textColor } as any)
    : leftIcon

  const clonedRightIcon = rightIcon && textColor
    ? React.cloneElement(rightIcon, { color: textColor } as any)
    : rightIcon

  const childEl = (
    typeof children === 'string'
      ? <AppText weight="medium" size={textSize} style={textColorStyle}>{children}</AppText>
      : typeof children === 'function'
        ? null
        : children
  )

  const contentWithIcons = (
    <View style={[styles.contentContainer, { gap: iconGap }]}>
      {clonedLeftIcon}
      {childEl}
      {isLoading ? (
        <ActivityIndicator size="small" color={textColor || theme.colors.gray[700]} />
      ) : (
        clonedRightIcon
      )}
    </View>
  )

  return (
    <View style={styles.wrapper}>
      <Pressable
        android_ripple={{ color: 'rgba(0, 0, 0, 0.1)' }}
        style={({ pressed }) => [
          buttonStyles({ variant, size, disabled: disabled ? 'true' : 'false' }),
          pressed && Platform.OS === 'ios' && { opacity: 0.7 },
          typeof style === 'function' ? style({ pressed }) : style,
        ]}
        disabled={disabled}
        {...props}
      >
        {contentWithIcons}
      </Pressable>
    </View>
  )
}
