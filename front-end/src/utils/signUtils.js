/**
 * 科学计数法字符 转换 为数字字符
 * @param {String} num_str 
 * @param {String} digits 
 */

export function convertNum(num_str, digits){ //参数必须为 字符串
  //科学计数法字符 转换 为数字字符， 突破正数21位和负数7位的Number自动转换
  // 兼容 小数点左边有多位数的情况，即 a×10^b（aEb），a非标准范围（1≤|a|<10）下的情况。如 3453.54E-6 or 3453.54E6
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
  if(numStr[0] == '-'){ // 如果为负数，转成正数处理，先去掉‘-’号，并保存‘-’.
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
      //幂数大于小数点后面的数字位数时，后面加0
      for(var i = 0; i < power - subres.length; i++) {
        resArr.push('0');
      }
      if(power - subres.length < 0){
        resArr.splice(dotIndex+power, 0, '.');
      }
    } else {
      power = power.replace('-','');
      power = Number(power);
    //幂数大于等于 小数点的index位置, 前面加0
    for(var i = 0; i <= power - dotIndex; i++) {
      resArr.unshift('0');
    }
    var n = power-dotIndex >= 0 ? 1 : - (power - dotIndex);
      resArr.splice(n, 0, '.');
    }
  }
  resValue = resArr.join('');
  //此处是千分位处理

  return sym + resValue;
}

/**
 *  判断是否是正整数或小数
 *  @param num 传入的值
 */
export const isNumber = (num) => {
  return /^\d+([.]{1}\d+){0,1}$/.test(num);
}

/**
 * 将数字转换为千分位（包括整数、小数），只处理整数部分，小数部分不动
 * @param {*} num 
 */
export const transferThousands = (num) => {
  if (!isNumber(num)) return '';
  return `${num}`.replace(/0*(\d+)/,"$1").replace(/^\d+/g, (m) => m.replace(/(?=(?!^)(\d{3})+$)/g, ','))
}

/**
 *  判断小数点后是否不超过8位，超过返回false，未超过返回true
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
 *  判断小数点后是否不超过8位，如果超过8位直接截取前8位
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
 *  将千分位数字里的所有逗号去掉
 * @param {*} num 
 */
export const isEmptyComma = (num) => {
  return `${num}`.replace(/\,/g, '');
}