import { colors } from '../foundations/colors.theme';

export const Input = {
  baseStyle: {
    height: '46px',
    px: '30px',
    backgroundColor: '#373A43',
    borderColor: '#373A43',
    placeholderTextColor: 'gray.200',
    color: 'white',
    width: '100%',
    fontFamily: 'medium',
    _focus: {
      style: {
        borderColor: colors.primary[400],
      },
    },
  },
  defaultProps: {
    variant: 'rounded',
  },
};
