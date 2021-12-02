import * as yup from 'yup';

import * as MESSAGES from '../messages';

export const subscribeSchema = yup.object().shape({
  email: yup
    .string()
    .email(MESSAGES.EMAIL_MESSAGE)
    .required(MESSAGES.REQUIRE_MESSAGE),
});
