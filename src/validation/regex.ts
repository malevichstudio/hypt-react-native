/* eslint-disable no-useless-escape */

export const USERNAME_REGEX =
  /^[a-zA-Z]{3,20}(|_[a-zA-Z]{1,10}| [a-zA-Z]{1,10})(|_[a-zA-Z]{1,10}| [a-zA-Z]{1,10})$/im;
export const PHONE_REGEX = /^[0-9]{6,12}$/im;
export const PASSWORD_REGEX =
  /[0-9a-zA-Z\- !"#$%&'()*+,./:;<=>?@\]\[\\^_`{|}~]/;
