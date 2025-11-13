import { ImageBackground, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { AppText } from '@ui/components/AppText'
import { Logo } from '@ui/components/Logo'
import { theme } from '@ui/styles/theme'
import { version } from '../../../../package.json'
import backgroundImage from '../../../assets/background.png'
import { styles } from './styles'

interface IBackgroundHeaderProps {
  showLogo?: boolean
  icon?: React.ReactElement
  logoSize?: number
  showCopyright?: boolean
  minHeight?: number
}

export function BackgroundHeader({
  showLogo = true,
  icon,
  logoSize = 135,
  showCopyright = true,
  minHeight = 410,
}: IBackgroundHeaderProps) {
  const { top } = useSafeAreaInsets()
  const actualYear = new Date().getFullYear()

  return (
    <ImageBackground
      source={backgroundImage}
      style={[styles.container, { minHeight }]}
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
    </ImageBackground>
  )
}

