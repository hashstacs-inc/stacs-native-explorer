/**
 * Created by yyh on 19/1/14.
 */

/**
 * @param time
 * @param fmt
 * @returns {string}
 */
export function dateUTCFilter(time, fmt = 'yyyy-MM-dd hh:mm:ss') {
  if (!time) {
    return ''
  }
  let date = new Date(time);

  var o = {
    "M+": date.getUTCMonth() + 1,
    "d+": date.getUTCDate(),
    "h+": date.getUTCHours(),
    "m+": date.getUTCMinutes(),
    "s+": date.getUTCSeconds(),
    "q+": Math.floor((date.getMonth() + 3) / 3),
    "S": date.getUTCMilliseconds()
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (date.getUTCFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
  }
  return fmt;
}