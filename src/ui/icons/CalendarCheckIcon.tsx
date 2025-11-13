import { theme } from '@ui/styles/theme'
import Svg, { Path } from 'react-native-svg'

interface ICalendarCheckIconProps {
  size?: number
  color?: string
}

export function CalendarCheckIcon({
  size = 24,
  color = theme.colors.primary[600],
}: ICalendarCheckIconProps) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
    >
      <Path
        d="M24.5 11.667h-21m21 2.916v-4.316c0-1.96 0-2.94-.381-3.69a3.5 3.5 0 00-1.53-1.529c-.749-.381-1.729-.381-3.689-.381H9.1c-1.96 0-2.94 0-3.689.381a3.5 3.5 0 00-1.53 1.53C3.5 7.326 3.5 8.306 3.5 10.267v9.8c0 1.96 0 2.94.381 3.689a3.5 3.5 0 001.53 1.53c.749.38 1.729.38 3.689.38H14m4.667-23.333V7M9.333 2.333V7m7.584 15.167L19.25 24.5l5.25-5.25"
        stroke={color}
        strokeWidth={2.33333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

