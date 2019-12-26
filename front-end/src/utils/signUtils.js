/**
 * Scientific counting characters are converted to numeric characters
 * @param {String} num_str 
 * @param {String} digits 
 */

export function convertNum(num_str, digits){
  if (num_str.indexOf('e') === -1) {
    if (num_str.indexOf('.') !== -1) {
      if (digits) {
        return parseFloat(num_str).toFixed(digits);
      } else {
        return parseFloat(num_str);
      }
    } else {
      let intPartFormat = num_str.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
      return intPartFormat;
    }
  }
  var resValue = '',
  power = '',
  result = null,
  dotIndex = 0,
  resArr = [],
  sym = '';
  var numStr = num_str.toString();
  if(numStr[0] == '-'){
    numStr = numStr.substr(1);
    sym = '-';
  }
  if ((numStr.indexOf('E') != -1) ||(numStr.indexOf('e') != -1)){
    var regExp = new RegExp( '^(((\\d+.?\\d+)|(\\d+))[Ee]{1}((-(\\d+))|(\\d+)))$','ig' ); 
    result = regExp.exec(numStr);
    if (result != null){
      resValue = result[2];
      power = result[5];
      result = null;
    }
    if (!resValue && !power){ return false}
    if (resValue.indexOf('.') !== -1) {
      dotIndex = resValue.indexOf('.');
    } else {
      dotIndex = 1;
    }
    resValue = resValue.replace('.','');
    resArr = resValue.split('');
    if (Number(power) >= 0){
      var subres = resValue.substr(dotIndex);
      power = Number(power);
      for(var i = 0; i < power - subres.length; i++) {
        resArr.push('0');
      }
      if(power - subres.length < 0){
        resArr.splice(dotIndex+power, 0, '.');
      }
    } else {
      power = power.replace('-','');
      power = Number(power);
    for(var i = 0; i <= power - dotIndex; i++) {
      resArr.unshift('0');
    }
    var n = power-dotIndex >= 0 ? 1 : - (power - dotIndex);
      resArr.splice(n, 0, '.');
    }
  }
  resValue = resArr.join('');

  return sym + resValue;
}

/**
 *  Determine if it is a positive integer or decimal
 *  @param num
 */
export const isNumber = (num) => {
  return /^\d+([.]{1}\d+){0,1}$/.test(num);
}

/**
 * @param {*} num 
 */
export const transferThousands = (num) => {
  if (!isNumber(num)) return '';
  return `${num}`.replace(/0*(\d+)/,"$1").replace(/^\d+/g, (m) => m.replace(/(?=(?!^)(\d{3})+$)/g, ','))
}

/**
 * @param {*} num 
 */
export const isEightDecimal = (num) => {
  if (isNaN(num)) num = '';

  const numStr = `${num}`;
  const index = numStr.indexOf('.');
  if (index > -1) {
    return numStr.slice(index + 1, numStr.length).length <= 8;
  }
  return true;
}
/**
 * @param {*} num 
 */
export const isCutEight = (num) => {
  if (!isEightDecimal(num)) {
    const numStr = `${num}`;
    const index = numStr.indexOf('.');
    return numStr.slice(0, index) + '.' + numStr.slice(index + 1, index + 1 + 8);
  }
  return num;
}

/**
 * @param {*} num 
 */
export const isEmptyComma = (num) => {
  return `${num}`.replace(/\,/g, '');
}