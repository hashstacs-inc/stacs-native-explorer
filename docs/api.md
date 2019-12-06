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

### 交易列表查询

`POST`: `/explorer/queryTxListByPage`

**请求参数**

| 名称        | 类型     | 长度 | 是否必填 | 描述                                                   |
| ----------- | -------- | ---- | -------- | ------------------------------------------------------ |
| blockHeight | `long`   |      | N        | 区块高度                                               |
| txId        | `string` | 64   | N        | 交易 id                                                |
| sender      | `string` | 32   | N        | 发送交易的节点名称(非地址)                             |
| pageNum     | `int`    |      | Y        | 页码                                                   |
| pageSize    | `int`    |      | Y        | 分页条数                                               |
| order       | `string` |      | N        | 1. `desc`：倒序 <br />2. `asc`：顺序<br />默认：`desc` |

// todo 增加 subbmiter 条件查询

**响应结果:** ` Page<CoreTransactionVO>`

### 区块列表查询

`POST`: `/explorer/queryBlockListByPage`

**请求参数**

| 名称      | 类型     | 长度 | 是否必填 | 描述     |
| --------- | -------- | ---- | -------- | -------- |
| height    | `long`   |      | N        | 区块高度 |
| blockHash | `string` | 64   | N        | 区块 Has |
| pageNum   | `int`    |      | Y        |          |
| pageSize  | `int`    |      | Y        |          |

**响应结果**：`Page<BlockVO>`

## 返回参数类型

### TransactionVO

| 名称              | 类型       | 描述                                  | 列表查询是否提供 |
| ----------------- | ---------- | ------------------------------------- | ---------------- |
| txId              | `string`   | 交易 Id                               |                  |
| bizModel          | `object`   |                                       |                  |
| policyId          | `string`   |                                       |                  |
| version           | `string`   | 交易版本号                            |                  |
| blockHeight       | `long`     | 交易所在区块高度                      |                  |
| sender            | `string`   | 交易发送的节点名称                    |                  |
| actionDatas       | `string`   | 交易包含的 action list                |                  |
| executeResult     | `string`   | 交易执行结果，`0`：fail，`1`：success |                  |
| errorCode         | `string`   | 错误代码                              |                  |
| errorMessage      | `string`   | 错误信息                              |                  |
| txType            | `string`   | 交易类型                              |                  |
| contractState     | `object`   | 合约状态                              |                  |
| bdCode            | `string`   |                                       |                  |
| submitter         | `string`   | 交易发起者                            |                  |
| submitterSign     | `string`   | 交易发起者的签名值                    |                  |
| lockTime          | `dataTime` |                                       |                  |
| sendTime          | `dataTime` | 交易创建时间                          |                  |
| singDatas         | `string`   | 签名信息                              |                  |
| policyVersion     | `int`      |                                       |                  |
| dealCount         | `int`      |                                       |                  |
| maxAllowFee       | `string`   | 最大允许手续费                        |                  |
| feeAmount         | `string`   | 实际手续费                            |                  |
| feePaymentAddress | `string`   | 手续费转入地址                        |                  |
| feeCurrency       | `string`   | 手续费货币                            |                  |
| receiptData       | `string`   |                                       |                  |

### BlockVO

| 名称              | 类型         | 描述                    | 列表查询是否提供 |
| ----------------- | ------------ | ----------------------- | ---------------- |
| height            | `long`       | 区块高度                |                  |
| blockHash         | `string`     |                         |                  |
| previousHash      | `string`     | 上一个区块 hash         |                  |
| txNum             | `int`        | 交易数量                |                  |
| totalBlockSize    | `bigDecimal` | 区块总大小，单位 ：`kb` |                  |
| totalTxNum        | `long`       | 累积交易数量            |                  |
| blockTime         | `data`       | 区块生成时间            |                  |
| version           | `string`     | 版本号                  |                  |
| txRootHash        | `string`     |                         |                  |
| accountRootHash   | `string`     |                         |                  |
| contractRootHash  | `string`     |                         |                  |
| policyRootHash    | `string`     |                         |                  |
| rsRootHash        | `string`     |                         |                  |
| txReceiptRootHash | `string`     |                         |                  |
| caRootHash        | `string`     |                         |                  |
| stateRootHash     | `string`     |                         |                  |
| createTime        | `dataTime`   | 区块创建时间            |                  |



1.首页的搜索框接口
2.首页的Block Information接口
3.address的Transactions
4.block的Transactions
5.txid的信息