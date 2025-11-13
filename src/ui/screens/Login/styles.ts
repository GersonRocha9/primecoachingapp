import { theme } from '@ui/styles/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    marginTop: 32,
  },
  textContainer: {
    width: '100%',
    marginBottom: 32,
  },
  formContainer: {
    gap: 20,
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    paddingVertical: 4,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 24,
  },
})
