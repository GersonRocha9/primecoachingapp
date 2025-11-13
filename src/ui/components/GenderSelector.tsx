import { Pressable, StyleSheet, View } from 'react-native'

import { Gender } from '@app/types/Gender'
import { useTheme } from '@app/contexts/useTheme'
import { getTheme } from '@ui/styles/theme'
import { AppText } from './AppText'

interface IGenderSelectorProps {
  value?: Gender | null
  onChange: (gender: Gender) => void
}

export function GenderSelector({ value, onChange }: IGenderSelectorProps) {
  const { isDark } = useTheme()
  const theme = getTheme(isDark)
  
  const getOptionStyle = (isSelected: boolean) => [
    styles.option,
    { 
      backgroundColor: isSelected ? theme.colors.primary[600] : (isDark ? theme.colors.gray[100] : theme.colors.surface),
      borderColor: isSelected ? theme.colors.primary[600] : theme.colors.border,
    },
  ]
  
  return (
    <View style={styles.container}>
      <Pressable
        style={getOptionStyle(value === Gender.FEMALE)}
        onPress={() => onChange(Gender.FEMALE)}
      >
        <AppText
          weight="medium"
          color={value === Gender.FEMALE ? theme.colors.white : theme.colors.text}
        >
          Feminino
        </AppText>
      </Pressable>

      <Pressable
        style={getOptionStyle(value === Gender.MALE)}
        onPress={() => onChange(Gender.MALE)}
      >
        <AppText
          weight="medium"
          color={value === Gender.MALE ? theme.colors.white : theme.colors.text}
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
    alignItems: 'center',
    justifyContent: 'center',
  },
})
