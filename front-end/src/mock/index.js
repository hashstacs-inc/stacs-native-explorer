import Mock from 'mockjs'
import dashboard from "./dashboard"; //首页


// 首页交易详情
Mock.mock(RegExp('/explorer/queryTxListByPage'), "post", function (options) {
  // let body = JSON.parse(options.body);
  return dashboard.txList
});

Mock.mock(RegExp('/explorer/queryBlockListByPage'), "post", function (options) {
  // let body = JSON.parse(options.body);
  return dashboard.blockList
});

export default Mock;
