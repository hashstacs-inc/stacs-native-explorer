import request from '@/server'

// Query transaction list
export function queryTxListByPage(data) {
  return request({
    url: '/native-explorer/tx/list',
    method: 'get',
    params:data
  })
}
// Enquiry for transaction details
export function queryTxDetails(data) {
  return request({
    url: '/native-explorer/tx/detail',
    method: 'get',
    params:data
  })
}

// Block list query
export function queryBlockListByPage(data) {
  return request({
    url: '/native-explorer/block/list',
    method: 'get',
    params: data
  })
}

// Block details enquiry
export function queryBlockDetails(data) {
  return request({
    url: '/native-explorer/block/detail',
    method: 'get',
    params: data
  })
}

// Contract list
export function queryContractList(data) {
  return request({
    url: '/native-explorer/contract/list',
    method: 'get',
    params: data
  })
}

// balance enquiry
export function queryBanalce(data){
  return request({
    url: '/native-explorer/identity/balance',
    method: 'get',
    params: data
  })
}