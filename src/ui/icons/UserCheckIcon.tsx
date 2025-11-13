import { theme } from '@ui/styles/theme'
import Svg, { Path } from 'react-native-svg'

interface IUserCheckIconProps {
  size?: number
  color?: string
}

export function UserCheckIcon({
  size = 24,
  color = theme.colors.primary[600],
}: IUserCheckIconProps) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
    >
      <Path
        d="M14 18.083H8.75c-1.628 0-2.442 0-3.105.201a4.667 4.667 0 00-3.11 3.111c-.202.663-.202 1.477-.202 3.105M18.667 21L21 23.333l4.667-4.666m-8.75-9.917a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z"
        stroke={color}
        strokeWidth={2.33333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

