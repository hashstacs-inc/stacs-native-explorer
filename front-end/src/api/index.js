import request from '@/server'

// 查询交易列表
export function queryTxListByPage(data) {
  return request({
    url: '/explorer/tx/list',
    method: 'get',
    params:data
  })
}
// 查询交易详情
export function queryTxDetails(data) {
  return request({
    url: '/explorer/tx/detail',
    method: 'get',
    params:data
  })
}

// 区块列表查询
export function queryBlockListByPage(data) {
  return request({
    url: '/explorer/block/list',
    method: 'get',
    params: data
  })
}

// 区块详情查询
export function queryBlockDetails(data) {
  return request({
    url: '/explorer/block/detail',
    method: 'get',
    params: data
  })
}

// 合约列表列表
export function queryContractList(data) {
  return request({
    url: '/explorer/queryContract',
    method: 'get',
    params: data
  })
}