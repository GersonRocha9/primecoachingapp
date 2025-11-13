import Svg, { Path } from 'react-native-svg'

interface IArrowRightProps {
  width?: number
  height?: number
  color?: string
}

export function ArrowRightIcon({
  width = 24,
  height = 24,
  color = 'black',
}: IArrowRightProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
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
