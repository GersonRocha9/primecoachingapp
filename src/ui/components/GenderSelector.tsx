import { Pressable, StyleSheet, View } from 'react-native'

import { Gender } from '@app/types/Gender'
import { theme } from '@ui/styles/theme'
import { AppText } from './AppText'

interface IGenderSelectorProps {
  value?: Gender | null
  onChange: (gender: Gender) => void
}

export function GenderSelector({ value, onChange }: IGenderSelectorProps) {
  return (
    <View style={styles.container}>
      <Pressable
        style={[
          styles.option,
          value === Gender.FEMALE && styles.optionSelected,
        ]}
        onPress={() => onChange(Gender.FEMALE)}
      >
        <AppText
          weight="medium"
          color={value === Gender.FEMALE ? theme.colors.white : theme.colors.gray[700]}
        >
          Feminino
        </AppText>
      </Pressable>

      <Pressable
        style={[
          styles.option,
          value === Gender.MALE && styles.optionSelected,
        ]}
        onPress={() => onChange(Gender.MALE)}
      >
        <AppText
          weight="medium"
          color={value === Gender.MALE ? theme.colors.white : theme.colors.gray[700]}
        >
          Masculino
        </AppText>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 16,
  },
  option: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.gray[300],
    backgroundColor: theme.colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionSelected: {
    backgroundColor: theme.colors.primary[600],
    borderColor: theme.colors.primary[600],
  },
})
