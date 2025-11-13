import { theme } from '@ui/styles/theme'
import { createVariants } from '@ui/styles/utils/createVariants'

export const inputStyles = createVariants({
  base: {
    backgroundColor: theme.colors.white,
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: theme.colors.gray[300],
    height: 52,
    paddingHorizontal: 14,
    color: theme.colors.black[700],
    fontSize: 16,
    fontFamily: theme.fontFamily.sans.regular,
  },
  variants: {
    status: {
      default: {
        borderColor: theme.colors.gray[400],
      },
      focus: {
        borderColor: theme.colors.primary[600],
      },
      error: {
        borderColor: theme.colors.red[500],
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
