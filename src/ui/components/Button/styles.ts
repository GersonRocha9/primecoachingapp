import { StyleSheet } from 'react-native'

import { getTheme, lightTheme } from '@ui/styles/theme'
import { createVariants, type VariantProps } from '@ui/styles/utils/createVariants'

export const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 8,
    flex: 1,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export const getButtonStyles = (isDark: boolean) => {
  const theme = getTheme(isDark)
  
  return createVariants({
    base: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    variants: {
      variant: {
        primary: {
          backgroundColor: theme.colors.primary[600],
          color: theme.colors.white,
          borderWidth: 1,
          borderColor: theme.colors.primary[600],
          borderRadius: 8,
          fontSize: theme.fontSize.base,
        },
        secondary: {
          backgroundColor: isDark ? theme.colors.gray[100] : theme.colors.primary[50],
          color: theme.colors.primary[700],
          borderWidth: 1,
          borderColor: isDark ? theme.colors.gray[200] : theme.colors.primary[200],
          borderRadius: 8,
          fontSize: theme.fontSize.base,
        },
        ghost: {
          backgroundColor: 'transparent',
          fontSize: theme.fontSize.base,
        },
      },
      size: {
        default: {
          paddingHorizontal: 24,
          paddingVertical: 16,
          minHeight: 52,
        },
        icon: {
          width: 48,
          height: 48,
        },
      },
      disabled: {
        true: {
          opacity: 0.5,
        },
        false: {
          opacity: 1,
        },
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
      disabled: 'false',
    },
  })
}

export type ButtonVariants = VariantProps<ReturnType<typeof getButtonStyles>>
