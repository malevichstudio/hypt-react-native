import * as yup from 'yup';

import * as MESSAGES from './messages';

const PHONE_MIN = 8;
const PHONE_MAX = 20;

export const PHONE_VALIDATION = yup
  .string()
  // .matches(REGEX.PHONE_REGEX, MESSAGES.PHONE_MESSAGE)
  .min(PHONE_MIN, MESSAGES.PHONE_SHORT_MESSAGE(PHONE_MIN))
  .max(PHONE_MAX, MESSAGES.PHONE_LONG_MESSAGE(PHONE_MAX))
  .required(MESSAGES.REQUIRE_MESSAGE);
