import Mock from 'mockjs'
import dashboard from "./dashboard"; //首页


// 首页交易详情
Mock.mock(RegExp('/explorer/queryTxListByPage'), "post", function (options) {
  let body = JSON.parse(options.body);
  console.log(body)
  return dashboard.txList
});

export default Mock;
