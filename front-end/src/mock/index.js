import Mock from 'mockjs'
import dashboard from "./dashboard"; //首页

Mock.mock(RegExp('/explorer/tx/list'), "get", function (options) {
  console.log(options)
    return dashboard.txList
});

Mock.mock(RegExp('/explorer/tx/detail'), "get", function (options) {
    return dashboard.txDetails
});

Mock.mock(RegExp('/explorer/block/list'), "get", function (options) {
  if(options.url.indexOf('pageNum=1&pageSize=15')!==-1){
    return dashboard.blockList
  } else {
    return dashboard.blockListDetails
  }
});

Mock.mock(RegExp('/explorer/block/detail'), "get", function (options) {
  return dashboard.blockListDetails
});

Mock.mock(RegExp('/explorer/queryContract'), "get", function (options) {
  console.log(options)
  return dashboard.contractList
});


export default Mock;
