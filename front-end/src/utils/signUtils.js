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
        
        // console.log(1,num_str)
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
  console.log(resValue)



  return sym + resValue;
}
