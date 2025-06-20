export const emailRules = {
  format: /^[^@]+@[^@]+\.[^@]+$/,
  noWhitespace: /^\S*\S$/,
  hasAt: /@/,
  hasDomain: /@.+\./,
};

export const passwordRules = {
  minLength: /^.{8,}$/,
  upperCase: /[A-Z]/,
  lowerCase: /[a-z]/,
  digit: /\d/,
  specialChar: /[!@#$%^&*]/,
  noWhitespace: /^\S*\S$/,
};

export const nameRules = {
  onlyLetters: /^[A-Za-z]+$/,
};

export const addressRules = {
  zip5: /^\d{5}$/,
  zip9: /^\d{5}-\d{4}$/,

  street: /^(?=.*[A-Za-z])[A-Za-z0-9]+(?: [A-Za-z0-9]+)*$/,
  city: /^(?=.*[A-Za-z])[A-Za-z]+(?: [A-Za-z]+)*$/,
};
