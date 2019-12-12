import Mock from 'mockjs'
import dashboard from "./dashboard"; //首页

Mock.mock(RegExp('/tx/list'), "get", function (options) {
    return dashboard.txList
});

Mock.mock(RegExp('/tx/detail'), "get", function (options) {
    return dashboard.txDetails
});

Mock.mock(RegExp('/block/list'), "get", function (options) {
  if(options.url.indexOf('pageNum=1&pageSize=15')!==-1){
    return dashboard.blockList
  } else {
    return dashboard.blockListDetails
  }
});

Mock.mock(RegExp('/block/detail'), "get", function (options) {
  return dashboard.blockListDetails
});

Mock.mock(RegExp('/queryContract'), "get", function (options) {
  return dashboard.contractList
});


export default Mock;
