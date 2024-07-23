export function getTranslationFromMany(data, variable, initialValue = '') {
  let res = '';
  if (data !== null && data !== undefined) {
    for (let i = 0; i < data.length; i++) {
      if (data[i].variable == variable) {
        res = data[i].value;
        break;
      }
    }
  }
  return res !== '' ? res : initialValue;
}
