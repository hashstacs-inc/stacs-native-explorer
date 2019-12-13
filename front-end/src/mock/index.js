import Mock from 'mockjs'
import dashboard from "./dashboard"; //首页

Mock.mock(RegExp('/native-explorer/tx/list'), "get", function (options) {
    return dashboard.txList
});

Mock.mock(RegExp('/native-explorer/tx/detail'), "get", function (options) {
    return dashboard.txDetails
});

Mock.mock(RegExp('/native-explorer/block/list'), "get", function (options) {
    return dashboard.blockList
});

Mock.mock(RegExp('/native-explorer/block/detail'), "get", function (options) {
  return dashboard.blockListDetails
});

Mock.mock(RegExp('/native-explorer/contract/list'), "get", function (options) {
  return dashboard.contractList
});

Mock.mock(RegExp('/native-explorer/identity/balance'), "get", function (options) {
  return dashboard.balance
});



export default Mock;
