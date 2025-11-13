import { useTheme } from '@app/contexts/useTheme'
import Feather from '@expo/vector-icons/Feather'
import { Pressable, StyleSheet, View } from 'react-native'
import { getTheme } from '@ui/styles/theme'
import { AppText } from '../AppText'

export function ThemeSelector() {
  const { mode, setThemeMode, isDark } = useTheme()
  const theme = getTheme(isDark)

  const options = [
    { value: 'light' as const, label: 'Claro', icon: 'sun' as const },
    { value: 'dark' as const, label: 'Escuro', icon: 'moon' as const },
    { value: 'system' as const, label: 'Sistema', icon: 'smartphone' as const },
  ]

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
      <View style={styles.header}>
        <Feather name="monitor" size={20} color={theme.colors.text} />
        <AppText color={theme.colors.text} size="base" weight="semiBold">
          Tema do Aplicativo
        </AppText>
      </View>

      <View style={styles.optionsContainer}>
        {options.map((option) => {
          const isSelected = mode === option.value

          return (
            <Pressable
              key={option.value}
              style={[
                styles.option,
                {
                  backgroundColor: isSelected ? theme.colors.primary[600] : 'transparent',
                  borderColor: isSelected ? theme.colors.primary[600] : theme.colors.border,
                },
              ]}
              onPress={() => setThemeMode(option.value)}
            >
              <Feather
                name={option.icon}
                size={20}
                color={isSelected ? theme.colors.white : theme.colors.textSecondary}
              />
              <AppText
                color={isSelected ? theme.colors.white : theme.colors.text}
                size="sm"
                weight={isSelected ? 'medium' : 'regular'}
              >
                {option.label}
              </AppText>
            </Pressable>
          )
        })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    gap: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  optionsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  option: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
})

