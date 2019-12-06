6区块链浏览器-API

## 接口规范

### 请求头规范

*   `GET`：**无额外参数**
*   `POST`:`Content-Type: application/json`返回值规范

### 响应规范

| 名称     | 类型     | 描述                                     |
| -------- | -------- | ---------------------------------------- |
| respCode | `string` | 响应码，`000000`表示成功，其余均表示异常 |
| msg      | `string` | 操作执行返回的消息                       |
| data     |          | 具体参考接口列表 & 返回参数类型          |

#### 分页规范：Page<?>

>   `?`对应 list 中的类型

| 名称     | 类型      | 描述                 |
| -------- | --------- | -------------------- |
| pageNum  | `int`     |                      |
| pageSize | `int`     |                      |
| total    | `int`     |                      |
| list     | `list<?>` | 参考具体参数返回类型 |

## 接口列表

### 查询交易列表

`POST`: `/explorer/queryTxListByPage`

**请求参数**

| 名称        | 类型     | 长度 | 是否必填 | 描述                       |
| ----------- | -------- | ---- | -------- | -------------------------- |
| blockHeight | `long`   |      | N        | 区块高度                   |
| txId        | `string` | 64   | N        | 交易 id                    |
| sender      | `string` | 32   | N        | 发送交易的节点名称(非地址) |
| pageNum     | `int`    |      | Y        | 页码                       |
| pageSize    | `int`    |      | Y        | 分页条数                   |

// todo 增加 subbmiter 条件查询

**响应结果:** ` Page<CoreTransactionVO>`

## 返回参数类型

### CoreTransactionVO

| 名称          | 类型     | 描述                                  |
| ------------- | -------- | ------------------------------------- |
| txId          | `string` | 交易 Id                               |
| bizModel      | `object` |                                       |
| policyId      | `string` |                                       |
| version       | `string` | 交易版本号                            |
| blockHeight   | `long`   | 交易所在区块高度                      |
| sender        | `string` | 交易发送的节点名称                    |
| actionDatas   | `string` | 交易包含的 action list                |
| executeResult | `string` | 交易执行结果，`0`：fail，`1`：success |
| errorCode     | `string` | 错误代码                              |
| errorMessage  | `string` | 错误信息                              |
| txType        | `string` | 交易类型                              |
| contractState | `object` | 合约状态                              |
| bdCode        | `string` |                                       |
| submitter     | `string` | 交易发起者                            |
| submitterSign | `string` | 交易发起者的签名值                    |

