import { useEffect, useState } from 'react'
import { Alert, ScrollView, StyleSheet, View } from 'react-native'

import { Gender } from '@app/types/Gender'

import { useAuth } from '@app/contexts/useAuth'
import Feather from '@expo/vector-icons/Feather'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AppText } from '@ui/components/AppText'
import { Button } from '@ui/components/Button'
import { theme } from '@ui/styles/theme'
import { SafeAreaView } from 'react-native-safe-area-context'
import { styles } from './styles'

interface IUserData {
  id: string
  name: string
  email: string
  onboardingData: {
    gender: Gender
    birthDate: string
    height: string
    weight: string
  }
  completedAt: string
}

export function Home() {
  const [userData, setUserData] = useState<IUserData | null>(null)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const { signOut } = useAuth()

  useEffect(() => {
    async function loadUserData() {
      try {
        const data = await AsyncStorage.getItem('currentUser')
        if (data) {
          setUserData(JSON.parse(data))
        }
      } catch (error) {
        console.error('Error loading user data:', error)
      }
    }

    loadUserData()
  }, [])

  const handleLogout = () => {
    Alert.alert(
      'Sair do app',
      'Tem certeza que deseja sair?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Sair',
          style: 'destructive',
          onPress: async () => {
            setIsLoggingOut(true)
            try {
              // Small delay for better UX
              await new Promise(resolve => setTimeout(resolve, 500))
              await signOut()
            } catch {
              Alert.alert('Erro', 'Não foi possível fazer logout. Tente novamente.')
              setIsLoggingOut(false)
            }
          },
        },
      ],
    )
  }

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) { return 'N/A' }
    // Parse the ISO string and adjust for timezone to avoid date shift
    const date = new Date(dateString)
    // Add timezone offset to get the correct local date
    const localDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000)
    return localDate.toLocaleDateString('pt-BR')
  }

  const formatGender = (gender: Gender | undefined) => {
    if (!gender) { return 'N/A' }
    return gender === Gender.MALE ? 'Masculino' : 'Feminino'
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={homeStyles.content}>
        <View style={homeStyles.header}>
          <AppText color={theme.colors.gray[900]} size='2xl' weight='bold'>
            Bem-vindo! 👋
          </AppText>
          {userData && (
            <AppText color={theme.colors.primary[600]} size='xl' weight='medium'>
              {userData.name}
            </AppText>
          )}
        </View>

        {userData && (
          <View style={homeStyles.infoContainer}>
            <View style={homeStyles.section}>
              <AppText color={theme.colors.gray[900]} size='lg' weight='semiBold' style={homeStyles.sectionTitle}>
                Informações Pessoais
              </AppText>

              <View style={homeStyles.infoRow}>
                <AppText color={theme.colors.gray[600]} size='base'>
                  Email:
                </AppText>
                <AppText color={theme.colors.gray[900]} size='base' weight='medium'>
                  {userData.email}
                </AppText>
              </View>

              <View style={homeStyles.infoRow}>
                <AppText color={theme.colors.gray[600]} size='base'>
                  ID do Usuário:
                </AppText>
                <AppText color={theme.colors.gray[900]} size='base' weight='medium'>
                  {userData.id}
                </AppText>
              </View>
            </View>

            <View style={homeStyles.section}>
              <AppText color={theme.colors.gray[900]} size='lg' weight='semiBold' style={homeStyles.sectionTitle}>
                Dados do Onboarding
              </AppText>

              <View style={homeStyles.infoRow}>
                <AppText color={theme.colors.gray[600]} size='base'>
                  Sexo:
                </AppText>
                <AppText color={theme.colors.gray[900]} size='base' weight='medium'>
                  {formatGender(userData.onboardingData?.gender)}
                </AppText>
              </View>

              <View style={homeStyles.infoRow}>
                <AppText color={theme.colors.gray[600]} size='base'>
                  Data de Nascimento:
                </AppText>
                <AppText color={theme.colors.gray[900]} size='base' weight='medium'>
                  {formatDate(userData.onboardingData?.birthDate)}
                </AppText>
              </View>

              <View style={homeStyles.infoRow}>
                <AppText color={theme.colors.gray[600]} size='base'>
                  Altura:
                </AppText>
                <AppText color={theme.colors.gray[900]} size='base' weight='medium'>
                  {userData.onboardingData?.height || 'N/A'} cm
                </AppText>
              </View>

              <View style={homeStyles.infoRow}>
                <AppText color={theme.colors.gray[600]} size='base'>
                  Peso:
                </AppText>
                <AppText color={theme.colors.gray[900]} size='base' weight='medium'>
                  {userData.onboardingData?.weight || 'N/A'} kg
                </AppText>
              </View>
            </View>

            <View style={homeStyles.logoutSection}>
              <Button
                variant="secondary"
                onPress={handleLogout}
                disabled={isLoggingOut}
                isLoading={isLoggingOut}
                leftIcon={<Feather name="log-out" size={20} color={theme.colors.red[500]} />}
                textColor={theme.colors.red[500]}
                style={{ flex: 1 }}
              >
                Sair da conta
              </Button>
            </View>
          </View>
        )}

        {!userData && (
          <View style={homeStyles.loadingContainer}>
            <AppText color={theme.colors.gray[500]} size='base'>
              Carregando dados do usuário...
            </AppText>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

const homeStyles = StyleSheet.create({
  content: {
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  header: {
    marginBottom: 32,
  },
  infoContainer: {
    gap: 24,
  },
  section: {
    backgroundColor: theme.colors.white,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.colors.gray[200],
    gap: 12,
  },
  sectionTitle: {
    marginBottom: 8,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[200],
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  logoutSection: {
    marginTop: 8,
  },
})
