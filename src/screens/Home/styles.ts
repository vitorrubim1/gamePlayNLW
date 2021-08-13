import { StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    width: '100%',

    flexDirection: 'row',
    justifyContent: 'center',

    paddingHorizontal: 24,
    marginTop: getStatusBarHeight() + 26, // status bar only ios
    marginBottom: 42,
  },
})