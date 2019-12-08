import request from '@/server'

//查询address的Transactions页
export function queryTransactionsDetails(data) {
  return request({
    url: '/explorer/v2/queryAddressTransactions',
    method: 'post',
    data
  })
}

//查询address的issue页
export function queryIssuesDetails(data) {
  return request({
    url: '/explorer/v2/queryAddressIssues',
    method: 'post',
    data
  })
}

//查询存证信息
export function queryBizModelsByPage(data) {
  return request({
    url: '/explorer/v2/queryBizModelsByPage',
    method: 'post',
    data
  })
}

//查询token的交易
export function queryTokenTransactions(data) {
  return request({
    url: '/explorer/v2/queryTokenTransactions',
    method: 'post',
    data
  })
}

//查询token的issue
export function queryTokenIseuance(data) {
  return request({
    url: '/explorer/v2/queryTokenIssuance',
    method: 'post',
    data
  })
}

//查询token的holders
export function queryTokenHolders(data) {
  return request({
    url: '/explorer/v2/queryTokenHolders',
    method: 'post',
    data
  })
}

//查询token的info
export function queryCurrencyIssue(data) {
  return request({
    url: '/explorer/v2/queryTokenInfo',
    method: 'post',
    data
  })
}

//查询token的exchange
export function queryTokenExchange(data) {
  return request({
    url: '/explorer/v2/queryTokenExchange',
    method: 'post',
    data
  })
}

//查询token的contract
export function queryTokenContract(data) {
  return request({
    url: '/explorer/v2/queryTokenContract',
    method: 'post',
    data
  })
}

//查询token的Freeze
export function queryTokenFreeze(data) {
  return request({
    url: '/explorer/v2/queryTokenMatured',
    method: 'post',
    data
  })
}

//查询block的交易
export function queryBlockTransactions(data) {
  return request({
    url: '/explorer/v2/queryBlockTransactions',
    method: 'post',
    data
  })
}

//查询block的issuance
export function queryBlockIssueance(data) {
  return request({
    url: '/explorer/v2/queryBlockIssuance',
    method: 'post',
    data
  })
}

//查询block的Credentials
export function queryBlockCredentials(data) {
  return request({
    url: '/explorer/v2/queryBlockCredentials',
    method: 'post',
    data
  })
}

//查询block的Freeze
export function queryBlockFreeze(data) {
  return request({
    url: '/explorer/v2/queryBlockMatured',
    method: 'post',
    data
  })
}


//查询错误信息
export function queryTx(data) {
  return request({
    url: '/explorer/v2/queryTx',
    method: 'post',
    data
  })
}

//查询智能合约 API
export function queryContractCodeByPage(data) {
  return request({
    url: '/explorer/v2/queryContractCodeByPage',
    method: 'post',
    data
  })
}

//查询发币交易列表 API
export function queryCurrencyIssuesByPage(data) {
  return request({
    url: '/explorer/v2/queryCurrencyIssuesByPage',
    method: 'post',
    data
  })
}

//查询认购交易列表 API
export function querySubscribesByPage(data) {
  return request({
    url: '/explorer/v2/querySubscribesByPage',
    method: 'post',
    data
  })
}

//查询转账交易列表 API
export function queryTransfersByPage(data) {
  return request({
    url: '/explorer/queryTransfersByPage',
    method: 'post',
    data
  })
}

//查询发币交易详情 API
export function queryCurrencyIssueByTxId(data) {
  return request({
    url: '/explorer/v2/queryCurrencyIssueByTxId',
    method: 'post',
    data
  })
}

//定制红色主题-查询发币交易详情 API
export function queryTxDetailById(data) {
  return request({
    url: '/explorer/v2/queryTxDetailById',
    method: 'post',
    data
  });
}


//查询交易地址列表 API
export function queryAddressByPage(data) {
  return request({
    url: '/explorer/v2/queryAddressByPage',
    method: 'post',
    data
  })
}

//查询认购交易详情API
export function querySubscribeByTxId(data) {
  return request({
    url: '/explorer/v2/querySubscribeByTxId',
    method: 'post',
    data
  })
}

//查询转账交易详情 API
export function queryTransferByTxId(data) {
  return request({
    url: '/explorer/v2/queryTransferByTxId',
    method: 'post',
    data
  })
}

//查询存证交易详情 API
export function queryBizModelByTxId(data) {
  return request({
    url: '/explorer/v2/queryBizModelByTxId',
    method: 'post',
    data
  })
}


// 新接口
// 查询交易列表
export function queryTxListByPage(data) {
  return request({
    url: '/explorer/queryTxListByPage',
    method: 'post',
    data
  })
}

// 区块列表查询
export function queryBlockListByPage(data) {
  return request({
    url: '/explorer/queryBlockListByPage',
    method: 'post',
    data
  })
}