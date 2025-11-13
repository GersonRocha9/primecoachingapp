import { ScrollView } from 'react-native'

import { AppText } from '@ui/components/AppText'
import { theme } from '@ui/styles/theme'
import { SafeAreaView } from 'react-native-safe-area-context'
import { styles } from '../styles'

export function WeightStep() {
  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      <ScrollView>
        <AppText color={theme.colors.gray[900]} size='2xl' weight='medium'>
          Weight Step
        </AppText>
      </ScrollView>
    </SafeAreaView>
  )
}

