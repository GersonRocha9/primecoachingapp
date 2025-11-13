import { StyleSheet } from 'react-native'

import { theme } from '@ui/styles/theme'
import { createVariants, type VariantProps } from '@ui/styles/utils/createVariants'

export const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 8,
    // overflow: 'hidden',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export const buttonStyles = createVariants({
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
      },
      secondary: {
        backgroundColor: theme.colors.primary[50],
        color: theme.colors.primary[700],
        borderWidth: 1,
        borderColor: theme.colors.primary[200],
        borderRadius: 8,
      },
      ghost: {
        backgroundColor: 'transparent',
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

export type ButtonVariants = VariantProps<typeof buttonStyles>
