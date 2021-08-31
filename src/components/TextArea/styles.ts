import { StyleSheet } from 'react-native';

import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 95,

    backgroundColor: theme.colors.secondary40,
    color: theme.colors.heading,
    fontFamily: theme.fonts.text400,
    fontSize: 13,

    borderWidth: 1,
    borderColor: theme.colors.secondary50,
    borderRadius: 8,

    marginRight: 4,

    //force text in top with padding
    paddingHorizontal: 16,
    paddingTop: 16,
    textAlignVertical: 'top'
  },
})