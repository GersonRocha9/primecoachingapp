import type { Gender } from '@app/types/Gender'
import { Service } from './Service'

export class AuthService extends Service {
  static async signIn(
    payload: AuthService.SignInPayload,
  ): Promise<AuthService.SignInResponse> {
    const { data } = await this.client.post<AuthService.SignInResponse>(
      '/auth/sign-in',
      payload,
    )

    return data
  }

  static async signUp(
    payload: AuthService.SignUpPayload,
  ): Promise<AuthService.SignUpResponse> {
    const { data } = await this.client.post<AuthService.SignUpResponse>(
      '/auth/sign-up',
      payload,
    )

    return data
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
