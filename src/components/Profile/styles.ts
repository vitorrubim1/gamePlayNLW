import { StyleSheet } from 'react-native';

import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },

  user: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  greeting: {
    fontFamily: theme.fonts.text500,
    color: theme.colors.heading,
    fontSize: 24,
    marginRight: 6
  },

  username: {
    fontFamily: theme.fonts.title700,
    color: theme.colors.heading,
    fontSize: 24,
  },

  message: {
    fontFamily: theme.fonts.text400,
    color: theme.colors.highlight,
  },
});