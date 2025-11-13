import { theme } from '@ui/styles/theme'
import Svg, { Path } from 'react-native-svg'

interface IArrowRightProps {
  size?: number
  color?: string
}

export function ArrowRightIcon({
  size = 32,
  color = theme.colors.primary[600],
}: IArrowRightProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <Path
        d="M4 12H20M20 12L14 6M20 12L14 18"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
