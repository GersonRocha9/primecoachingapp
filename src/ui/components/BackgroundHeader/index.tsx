import { ImageBackground, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'
import { useEffect } from 'react'

import { AppText } from '@ui/components/AppText'
import { Logo } from '@ui/components/Logo'
import { theme } from '@ui/styles/theme'
import type { ReactNode } from 'react'
import { version } from '../../../../package.json'
import backgroundImage from '../../../assets/background.png'
import { styles } from './styles'

interface IBackgroundHeaderProps {
  showLogo?: boolean
  icon?: ReactNode
  logoSize?: number
  showCopyright?: boolean
  minHeight?: number
  animated?: boolean
}

const AnimatedImageBackground = Animated.createAnimatedComponent(ImageBackground)

export function BackgroundHeader({
  showLogo = true,
  icon,
  logoSize = 135,
  showCopyright = true,
  minHeight = 410,
  animated = false,
}: IBackgroundHeaderProps) {
  const { top } = useSafeAreaInsets()
  const actualYear = new Date().getFullYear()
  
  const translateY = useSharedValue(animated ? 600 : 0)

  useEffect(() => {
    if (animated) {
      translateY.value = withSpring(0, {
        damping: 20,
        stiffness: 90,
      })
    }
  }, [animated])

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }))

  const ImageComponent = animated ? AnimatedImageBackground : ImageBackground

  return (
    <ImageComponent
      source={backgroundImage}
      style={[styles.container, { minHeight }, animated && animatedStyle]}
      resizeMode="cover"
    >
      {showLogo && <Logo width={logoSize} height={logoSize} />}

      {showCopyright && (
        <View style={[styles.copyrightContainer, { top: top + 16 }]}>
          <AppText color={theme.colors.white} size='xxs'>
            Copyright © PRIME {actualYear} {'\n'}Todos os direitos reservados V{version}
          </AppText>
        </View>
      )}

      {icon && (
        <View style={styles.iconContainer}>
          {icon}
        </View>
      )}
    </ImageComponent>
  )
}

