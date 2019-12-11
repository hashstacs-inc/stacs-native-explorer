## 接口规范

### 路由

**baseURL：**`/explorer`

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

查询修改为 get

### 交易列表查询

`GET`: `/tx/list`

**请求参数**

| 名称        | 类型     | 长度 | 是否必填 | 描述                                                   |
| ----------- | -------- | ---- | -------- | ------------------------------------------------------ |
| blockHeight | `long`   |      | N        | 区块高度                                               |
| sender      | `string` | 32   | N        | 发送交易的节点名称(非地址)                             |
| pageNum     | `int`    |      | Y        | 页码                                                   |
| pageSize    | `int`    |      | Y        | 分页条数                                               |
| order       | `string` |      | N        | 1. `desc`：倒序 <br />2. `asc`：顺序<br />默认：`desc` |
| submitter   | `string` | 40   | N        | 交易提交者地址                                         |

**响应结果:** ` Page<TransactionVO>`

### 交易详情查询

`GET`:`/tx/detail`

| 名称 | 类型     | 长度 | 是否必填 | 描述    |
| ---- | -------- | ---- | -------- | ------- |
| txId | `string` | 64   | Y        | 交易 id |

**响应结果:** ` TransactionVO`

### 区块详情查询

`GET`:`/block/detail`

| 名称   | 类型   | 长度 | 是否必填 | 描述     |
| ------ | ------ | ---- | -------- | -------- |
| height | `long` |      | Y        | 区块高度 |

**响应结果:** ` BlockVO`

### 区块列表查询

`GET`: `/block/list`

**请求参数**

| 名称      | 类型     | 长度 | 是否必填 | 描述     |
| --------- | -------- | ---- | -------- | -------- |
| height    | `long`   |      | N        | 区块高度 |
| blockHash | `string` | 64   | N        | 区块 Has |
| pageNum   | `int`    |      | Y        |          |
| pageSize  | `int`    |      | Y        |          |

**响应结果**：`Page<BlockVO>`

### 合约列表列表

> 查询币种列表时：byType="assets"

| 名称   | 类型     | 长度 | 是否必填 | 描述                                    |
| ------ | -------- | ---- | -------- | --------------------------------------- |
| bdType | `string` | 32   | N        | bdType（过滤 system）：contract、assets |

**响应结果：**`List<ContractVO>`

### 余额查询

| 名称     | 类型     | 长度 | 是否必填 | 描述                       |
| -------- | -------- | ---- | -------- | -------------------------- |
| contract | `string` | 64   | Y        | 合约地址                   |
| identity | `string` | 40   | Y        | 用户地址（对应 submitter） |

**响应类型：**`string`

## 返回参数类型

### TransactionVO

| 名称              | 类型       | 描述                                  | 列表查询是否提供 |
| ----------------- | ---------- | ------------------------------------- | ---------------- |
| txId              | `string`   | 交易 Id                               |      TX ID    Y        |
| bizModel          | `object`   |                                       |                |
| policyId          | `string`   |                                       |         Function Name  Y        |
| version           | `string`   | 交易版本号                            |               |
| blockHeight       | `long`     | 交易所在区块高度                      |        Y          |
| sender            | `string`   | 交易发送的节点名称                    |                 |
| actionDatas       | `string`   | 交易包含的 action list                |        Y         |
| executeResult     | `string`   | 交易执行结果，`0`：fail，`1`：success |       Status  Y           |
| errorCode         | `string`   | 错误代码                              | Y |
| errorMessage      | `string`   | 错误信息                              |        失败错误信息          |
| txType            | `string`   | 交易类型                              |          Y        |
| contractState     | `object`   | 合约状态                              |               |
| bdCode            | `string`   |                                       |                  |
| submitter         | `string`   | 交易发起者                            |  Operation Address  Y       |
| submitterSign     | `string`   | 交易发起者的签名值                    |                  |
| lockTime          | `dataTime` |                                       |                  |
| sendTime          | `dataTime` | 交易创建时间                          |                  |
| singDatas         | `string`   | 签名信息                              |                  |
| policyVersion     | `int`      |                                       |                  |
| dealCount         | `int`      |                                       |                  |
| maxAllowFee       | `string`   | 最大允许手续费                        |           Y       |
| feeAmount         | `string`   | 实际手续费                            |       Transaction Fee   Y       |
| feePaymentAddress | `string`   | 手续费转入地址                        |                  |
| feeCurrency       | `string`   | 手续费货币                            |      币种    Y       |
| receiptData       | `string`   |                                       |                  |
| blockTime | `long` | 区块生成时间 | Y |
| bdName | `string` | | Y |
| bdType | `string` | | Y |

### BlockVO

| 名称              | 类型         | 描述                    | 列表查询是否提供 |
| ----------------- | ------------ | ----------------------- | ---------------- |
| height            | `long`       | 区块高度                |         Y         |
| blockHash         | `string`     |                         |          Y        |
| previousHash      | `string`     | 上一个区块 hash         |            Y      |
| txNum             | `int`        | 交易数量                |        Txns Y      |
| totalBlockSize    | `bigDecimal` | 区块总大小，单位 ：`kb` |           Y       |
| totalTxNum        | `long`       | 累积交易数量            |           Y       |
| blockTime         | `data`       | 区块生成时间            |        Y          |
| version           | `string`     | 版本号                  |         Y         |
| txRootHash        | `string`     |                         |                  |
| accountRootHash   | `string`     |                         |                  |
| contractRootHash  | `string`     |                         |                  |
| policyRootHash    | `string`     |                         |                  |
| rsRootHash        | `string`     |                         |                  |
| txReceiptRootHash | `string`     |                         |                  |
| caRootHash        | `string`     |                         |                  |
| stateRootHash     | `string`     |                         |                  |
| maxHeight | `long` | 链上块当前最大高度 |  |

### ContractVO

| 名称          | 类型     | 描述              | 列表查询是否提供 |
| ------------- | -------- | ----------------- | ---------------- |
| address       | `string` | 合约地址          | Y                |
| name          | `string` | 合约名称          | Y                |
| symbol        | `string` | 合约代码          | Y                |
| extension     | `string` | 扩展字段          | N                |
| bdCode        | `string` |                   | Y                |
| bdCodeVersion | `string` |                   | Y                |
| status        | `string` |                   | Y                |
| blockHeight   | `long`   |                   | N                |
| txId          | `string` | 合约创建的交易 Id | N                |
| actionIndex   | `int`    |                   | N                |
| language      | `string` | 合约语言          | N                |
| version       | `string` | 合约版本          | Y                |
| code          | `string` | 合约源码          | N                |
| createTime    | `long`   | 创建时间          | Y                |

1. submitter 地址查询、合约方法调用（余额查询(balanceOf)）
2. 交易详情 & 列表
3. 块高度：块详情（最大块高度）、块的交易列表
4. bdName（不做） 条件查询
5. 合约列表