import { StyleSheet } from 'react-native'
import { getTheme, lightTheme } from '@ui/styles/theme'
import { createVariants } from '@ui/styles/utils/createVariants'

export const getInputStyles = (isDark: boolean) => {
  const theme = getTheme(isDark)
  
  return createVariants({
    base: {
      backgroundColor: isDark ? theme.colors.gray[100] : theme.colors.gray[50],
      borderStyle: 'solid',
      borderWidth: 1,
      borderRadius: 12,
      borderColor: theme.colors.border,
      height: 44,
      paddingHorizontal: 16,
      color: theme.colors.text,
      fontSize: 16,
      fontFamily: theme.fontFamily.sans.regular,
    },
    variants: {
      status: {
        default: {
          borderColor: theme.colors.border,
          backgroundColor: isDark ? theme.colors.gray[100] : theme.colors.surface,
        },
        focus: {
          borderColor: theme.colors.primary[600],
          backgroundColor: isDark ? theme.colors.gray[100] : theme.colors.surface,
        },
        error: {
          borderColor: theme.colors.red[500],
          backgroundColor: isDark ? theme.colors.gray[100] : theme.colors.surface,
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
      status: 'default',
      disabled: 'false',
    },
  })
}

export const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  inputWithIcon: {
    flex: 1,
    flexShrink: 1,
    backgroundColor: 'transparent',
    borderWidth: 0,
    height: 44,
    paddingHorizontal: 0,
    fontSize: 16,
    fontFamily: lightTheme.fontFamily.sans.regular,
  },
  iconContainer: {
    padding: 4,
    marginLeft: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
