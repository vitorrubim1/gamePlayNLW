import { StyleSheet } from 'react-native';

import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
  container: {
    height: 1,
    width: '75%',

    alignSelf: 'flex-end',

    marginVertical: 31,
    marginTop: 2,

    backgroundColor: theme.colors.secondary40,    
  }
});