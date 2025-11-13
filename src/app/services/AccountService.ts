import type { Gender } from '@app/types/Gender'
import AsyncStorage from '@react-native-async-storage/async-storage'

export class AccountsService {
  private static delay(ms: number = 500) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  static async getMe(): Promise<AccountsService.GetMeResponse | null> {
    await this.delay()

    try {
      const currentUserStr = await AsyncStorage.getItem('currentUser')

      if (!currentUserStr) {
        return null
      }

      const currentUser = JSON.parse(currentUserStr)

      if (!currentUser.profileCompleted || !currentUser.onboardingData) {
        return null
      }

      return {
        profile: {
          name: currentUser.name,
          birthDate: new Date(currentUser.onboardingData.birthDate),
          gender: currentUser.onboardingData.gender as Gender,
          height: parseFloat(currentUser.onboardingData.height),
          weight: parseFloat(currentUser.onboardingData.weight),
        },
      }
    } catch (error) {
      console.error('Error loading user data:', error)
      return null
    }
  }

  static async updateProfile(profileData: {
    gender: Gender
    birthDate: Date
    height: string
    weight: string
  }): Promise<void> {
    await this.delay()

    try {
      const currentUserStr = await AsyncStorage.getItem('currentUser')

      if (!currentUserStr) {
        throw new Error('No user logged in')
      }

      const currentUser = JSON.parse(currentUserStr)

      currentUser.profileCompleted = true
      currentUser.onboardingData = {
        gender: profileData.gender,
        birthDate: profileData.birthDate.toISOString().split('T')[0],
        height: profileData.height,
        weight: profileData.weight,
      }

      await AsyncStorage.setItem('currentUser', JSON.stringify(currentUser))

      const registeredUsersStr = await AsyncStorage.getItem('registeredUsers')
      if (registeredUsersStr) {
        const users = JSON.parse(registeredUsersStr)
        const userIndex = users.findIndex((u: any) => u.id === currentUser.id)
        if (userIndex !== -1) {
          users[userIndex] = currentUser
          await AsyncStorage.setItem('registeredUsers', JSON.stringify(users))
        }
      }
    } catch (error) {
      console.error('Error updating profile:', error)
      throw error
    }
  }
}

export namespace AccountsService {
  export type GetMeResponse = {
    profile: {
      name: string
      birthDate: Date
      gender: Gender
      height: number
      weight: number
    }
  }
}
