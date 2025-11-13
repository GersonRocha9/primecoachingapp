import { theme } from '@ui/styles/theme'
import { createVariants } from '@ui/styles/utils/createVariants'

export const inputStyles = createVariants({
  base: {
    backgroundColor: theme.colors.gray[50],
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 12,
    borderColor: theme.colors.gray[200],
    height: 44,
    paddingHorizontal: 16,
    color: theme.colors.gray[900],
    fontSize: 16,
    fontFamily: theme.fontFamily.sans.regular,
  },
  variants: {
    status: {
      default: {
        borderColor: theme.colors.gray[300],
        backgroundColor: theme.colors.white,
      },
      focus: {
        borderColor: theme.colors.primary[600],
        backgroundColor: theme.colors.white,
      },
      error: {
        borderColor: theme.colors.red[500],
        backgroundColor: theme.colors.white,
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
