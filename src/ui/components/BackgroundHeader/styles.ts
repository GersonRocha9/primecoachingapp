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
  iconContainer: {
    position: 'absolute',
    bottom: -32,
    left: 32,
    backgroundColor: theme.colors.primary[50],
    padding: 24,
    borderRadius: 999,
  },
})

