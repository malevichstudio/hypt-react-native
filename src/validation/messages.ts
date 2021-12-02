const invalidMessage = (value: string) => `Invalid ${value} format`;

export const EMAIL_MESSAGE = invalidMessage('email');
export const USERNAME_MESSAGE = invalidMessage('username');
export const PHONE_MESSAGE = invalidMessage('phone');

export const REQUIRE_MESSAGE = 'This field is required';

export const INCORRECT_SYMBOL_MESSAGE = 'Invalid characters used';
export const PRIVACY_POLICY =
  'In order to use our services, you must agree to the Terms & Conditions.';

export const PHONE_SHORT_MESSAGE = (long: number) =>
  `Phone number must be at least ${long} characters`;
export const PHONE_LONG_MESSAGE = (long: number) =>
  `Phone number must not exceed ${long} characters`;
export const PASSWORD_SHORT_MESSAGE = (long: number) =>
  `Password must be at least ${long} characters`;
export const PASSWORD_LONG_MESSAGE = (long: number) =>
  `Password must not exceed ${long} characters`;
