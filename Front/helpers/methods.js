export const validateEmail = (input) => {
  const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return reg.test(String(input).toLowerCase());
}

export const validateNumbers = (input, num) => {
  const reg = /^ ?\d+$/;
  return input == "" || (reg.test(input) && input.length <= num)
}

export const validateLetters = (input) => {
  const reg = /^[a-zA-Z\s]*$/;
  return input == "" || reg.test(input)
}



