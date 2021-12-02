import { extendTheme, v3CompatibleTheme } from 'native-base';

import { Button } from './components/button.theme';
import { FormControlLabel } from './components/form-control-label.theme';
import { Input } from './components/input.theme';
import { Text } from './components/text.theme';
import { colors } from './foundations/colors.theme';
import { fontSizes } from './foundations/font-sizes.theme';
import { fonts } from './foundations/fonts.theme';
import { radii } from './foundations/radius.theme';

export const theme = extendTheme(v3CompatibleTheme, {
  colors,
  fonts,
  fontSizes,
  radii,
  components: {
    Text,
    Button,
    Input,
    FormControlLabel,
  },
});
