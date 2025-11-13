import { theme } from '@ui/styles/theme'
import Svg, { Path } from 'react-native-svg'

interface IRulerIconProps {
  size?: number
  color?: string
}

export function RulerIcon({
  size = 24,
  color = theme.colors.primary[600],
}: IRulerIconProps) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
    >
      <Path
        d="M16.917 6.417l1.75 1.75m-5.25 1.75l1.75 1.75m-5.25 1.75l1.75 1.75m-5.25 1.75l1.75 1.75m-5.174 1.826l4.514 4.514c.23.23.346.346.48.39a.583.583 0 00.36 0c.133-.044.249-.16.48-.39l16.18-16.18c.23-.231.346-.347.39-.48a.583.583 0 000-.36c-.044-.134-.16-.25-.39-.48l-4.514-4.514c-.23-.23-.346-.346-.48-.39a.583.583 0 00-.36 0c-.133.044-.249.16-.48.39l-16.18 16.18c-.23.231-.346.347-.39.48a.583.583 0 000 .36c.044.134.16.25.39.48z"
        stroke={color}
        strokeWidth={2.15104}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

