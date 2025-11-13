import { theme } from '@ui/styles/theme'
import Svg, { Circle, Path } from 'react-native-svg'

interface IGenderIconProps {
  size?: number
  color?: string
}

export function GenderIcon({
  size = 24,
  color = theme.colors.primary[600],
}: IGenderIconProps) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 33 31"
      fill="none"
    >
      <Path
        d="M23.248 21.531v7.57m-3.28-3.576h6.48M6.905 6.962L2.262 2.319m0 0l4.512-.126m-4.512.126l-.069 4.455"
        stroke={color}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle
        cx={23.1761}
        cy={12.9362}
        r={7.79422}
        stroke={color}
        strokeWidth={2.5}
      />
      <Circle
        cx={13.2742}
        cy={13.2742}
        r={7.79422}
        stroke={color}
        strokeWidth={2.5}
      />
    </Svg>
  )
}

