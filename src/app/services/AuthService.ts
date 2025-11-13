import type { Gender } from '@app/types/Gender'
import mockData from '@data/mock.json'
import AsyncStorage from '@react-native-async-storage/async-storage'

export class AuthService {
  private static delay(ms: number = 800) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  private static generateToken(userId: string): string {
    return `mock_token_${userId}_${Date.now()}`
  }

  static async signIn(
    payload: AuthService.SignInPayload,
  ): Promise<AuthService.SignInResponse> {
    await this.delay()

    const user = mockData.users.find(
      u => u.email === payload.email && u.password === payload.password,
    )

    if (!user) {
      throw new Error('Invalid email or password')
    }

    await AsyncStorage.setItem('currentUserId', user.id)
    await AsyncStorage.setItem('currentUser', JSON.stringify(user))

    if (user.profileCompleted && user.onboardingData) {
      await AsyncStorage.setItem('onboarding_complete', 'true')
    } else {
      await AsyncStorage.removeItem('onboarding_complete')
    }

    return {
      accessToken: this.generateToken(user.id),
      refreshToken: this.generateToken(user.id),
    }
  }

  static async signUp(
    payload: AuthService.SignUpPayload,
  ): Promise<AuthService.SignUpResponse> {
    await this.delay()

    const existingUser = mockData.users.find(
      u => u.email === payload.account.email,
    )

    if (existingUser) {
      throw new Error('Email already registered')
    }

    const newUser = {
      id: `user_${Date.now()}`,
      name: payload.profile.name,
      email: payload.account.email,
      password: payload.account.password,
      role: 'student',
      profileCompleted: true,
      onboardingData: {
        gender: payload.profile.gender,
        birthDate: payload.profile.birthDate,
        height: payload.profile.height.toString(),
        weight: payload.profile.weight.toString(),
      },
    }

    const users = await this.getStoredUsers()
    users.push(newUser)
    await AsyncStorage.setItem('registeredUsers', JSON.stringify(users))

    await AsyncStorage.setItem('currentUserId', newUser.id)
    await AsyncStorage.setItem('currentUser', JSON.stringify(newUser))
    await AsyncStorage.setItem('onboarding_complete', 'true')

    return {
      accessToken: this.generateToken(newUser.id),
      refreshToken: this.generateToken(newUser.id),
    }
  }

  private static async getStoredUsers() {
    try {
      const storedUsers = await AsyncStorage.getItem('registeredUsers')
      if (storedUsers) {
        return JSON.parse(storedUsers)
      }
    } catch (error) {
      console.error('Error loading stored users:', error)
    }
    return [...mockData.users]
  }
}

export namespace AuthService {
  export type SignInPayload = {
    email: string
    password: string
  }

  export type SignInResponse = {
    accessToken: string
    refreshToken: string
  }

  export type SignUpPayload = {
    account: {
      email: string
      password: string
    }
    profile: {
      name: string
      birthDate: string
      gender: Gender
      height: number
      weight: number
    }
  }

  export type SignUpResponse = {
    accessToken: string
    refreshToken: string
  }
}
