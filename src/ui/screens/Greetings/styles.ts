import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  logoContainer: {
    width: '100%',
    minHeight: 410,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 32,
    marginTop: 42,
  },
  textContainer: {
    width: '100%',
    gap: 24,
    marginBottom: 24,
  },
  buttonContainer: {
    gap: 12,
    width: '100%',
    flexDirection: 'column',
  },
  formGroupContainer: {
    paddingHorizontal: 32,
    gap: 12,
    width: '100%',
    marginTop: 24,
    flexDirection: 'column',
  },
  copyrightContainer: {
    position: 'absolute',
    right: 32,
  },
})
