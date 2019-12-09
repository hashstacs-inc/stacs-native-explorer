import Mock from 'mockjs'
import dashboard from "./dashboard"; //首页


// 首页交易详情
Mock.mock(RegExp('/explorer/queryTxListByPage'), "post", function (options) {
  let body = JSON.parse(options.body);
  if(body.pageSize === 15){
    return dashboard.txList
  }
});

Mock.mock(RegExp('/explorer/queryBlockListByPage'), "post", function (options) {
  let body = JSON.parse(options.body);
  if(body.pageSize === 15){
    return dashboard.blockList
  } else {
    return dashboard.blockListDetails
  }
});

Mock.mock(RegExp('/explorer/v2/queryAddressTransactions'), "post", function (options) {
  return dashboard.addressList
});

Mock.mock(RegExp('/explorer/v2/queryTxDetailById'), "post", function (options) {
  return dashboard.txListDetail
});


export default Mock;
