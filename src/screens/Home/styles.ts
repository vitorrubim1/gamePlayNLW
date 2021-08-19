import { StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    width: '100%',

    flexDirection: 'row',
    justifyContent: 'center',

    paddingHorizontal: '12%',
    marginTop: getStatusBarHeight() + 26, // status bar only ios
    marginBottom: 42,
  },
})