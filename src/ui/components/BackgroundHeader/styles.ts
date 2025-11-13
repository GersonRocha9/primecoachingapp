import { theme } from '@ui/styles/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  copyrightContainer: {
    position: 'absolute',
    right: 32,
  },
  arrowContainer: {
    position: 'absolute',
    bottom: -16,
    left: 32,
    backgroundColor: theme.colors.primary[50],
    padding: 16,
    borderRadius: 999,
  },
})

