import Mock from 'mockjs'
import dashboard from "./dashboard"; //首页

Mock.mock(RegExp('/explorer/queryTxListByPage'), "get", function (options) {
  console.log(options)
  if(options.url.indexOf('txId')!==-1){
    return dashboard.txDetails
  }

  if(options.url.indexOf('blockHeight')===-1){
    return dashboard.txList
  } else if(options.url.indexOf('subbmiter')!==-1){
    return dashboard.txListAn
  } else {
    return dashboard.txListAn
  }
});

Mock.mock(RegExp('/explorer/queryBlockListByPage'), "get", function (options) {
  if(options.url.indexOf('pageNum=1&pageSize=15')!==-1){
    return dashboard.blockList
  } else {
    return dashboard.blockListDetails
  }
});

Mock.mock(RegExp('/explorer/queryContract'), "get", function (options) {
  console.log(options)
  return dashboard.contractList
});


export default Mock;
