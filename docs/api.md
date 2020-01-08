## The interface specification

### routing

**baseURL：**`/explorer`

### Request header specification

*   `GET`：**No additional parameters**
*   `POST`:`Content-Type: application/json`Return value specification

### In response to the specification

| Name     | Type     | Description                                     |
| -------- | -------- | ---------------------------------------- |
| respCode | `string` | Response code, '000000' means success |
| msg      | `string` | The message returned by the operation execution                      |
| data     |          | Specific reference interface list          |

#### Paging specification：Page<?>

| Name     | Type      | Description                 |
| -------- | --------- | -------------------- |
| pageNum  | `int`     |                      |
| pageSize | `int`     |                      |
| total    | `int`     |                      |
| list     | `list<?>` | Refer to specific parameters to return Type |

## The interface list

### Transaction list query

`GET`: `/tx/list`

**Request parameters**

| Name        | Type     | Max Length | Required | Description                                                   |
| ----------- | -------- | ---- | -------- | ------------------------------------------------------ |
| blockHeight | `long`   |      | N        | Block height                                            |
| sender      | `string` | 32   | N        | Node Name(not address) for sending transactions                        |
| pageNum     | `int`    |      | Y        | PageNo                                                   |
| pageSize    | `int`    |      | Y        | PageSize                                               |
| order       | `string` |      | N        | 1. `desc`：Desc <br />2. `asc`：Asc<br />Default：`desc` |
| submitter   | `string` | 40   | N        | submitter address                                         |

**Response:** ` Page<TransactionVO>`

### Enquiry for transaction details

`GET`:`/tx/detail`

| Name | Type     | Max Length | Required | Description    |
| ---- | -------- | ---- | -------- | ------- |
| txId | `string` | 64   | Y        | Transaction id |

**Response:** ` TransactionVO`

### Block details enquiry

`GET`:`/block/detail`

| Name   | Type   | Max Length | Required | Description     |
| ------ | ------ | ---- | -------- | -------- |
| height | `long` |      | Y        | Block height|

**Response:** ` BlockVO`

### Block list query

`GET`: `/block/list`

**Request parameters**

| Name      | Type     | Max Length | Required | Description     |
| --------- | -------- | ---- | -------- | -------- |
| height    | `long`   |      | N        | Block height |
| blockHash | `string` | 64   | N        | Block  Has |
| pageNum   | `int`    |      | Y        |          |
| pageSize  | `int`    |      | Y        |          |

**Response**：`Page<BlockVO>`

### Contract list

`GET`:`/contract/list`

> Query the currency list：byType="assets"

| Name   | Type     | Max Length | Required | Description                                    |
| ------ | -------- | ---- | -------- | --------------------------------------- |
| bdType | `string` | 32   | N        | bdType（filter system）：contract、assets |

**Response：**`List<ContractVO>`

### The balance of the query

`GET`:`/identity/balance`

| Name        | Type     | Max Length | Required | Description                       |
| ----------- | -------- | ---- | -------- | -------------------------- |
| contract    | `string` | 64   | Y        | Contract address           |
| identity    | `string` | 40   | Y        | user address               |
| blockHeight | `long`   |      | N        | block height               |

**Response Type：**`string`

Response：`"9600"`

## Return parameter Type

### TransactionVO

| Name              | Type       | Description                                  |  |
| ----------------- | ---------- | ------------------------------------- | ---------------- |
| txId              | `string`   | Transaction Id                               |      TX ID    Y        |
| bizModel          | `object`   |                                       |                |
| policyId          | `string`   |                                       |         Function Name  Y        |
| version           | `string`   | version                            |               |
| blockHeight       | `long`     | block height                      |        Y          |
| sender            | `string`   | name of sender                    |                 |
| actionDatas       | `string`   | action list                |        Y         |
| executeResult     | `string`   | `0`：fail，`1`：success |       Status  Y           |
| errorCode         | `string`   | error code                              | Y |
| errorMessage      | `string`   | error message                              |        失败错误信息          |
| contractState     | `object`   | status of contract                              |               |
| bdCode            | `string`   |                                       |                  |
| submitter         | `string`   | user address                            |  Operation Address  Y       |
| submitterSign     | `string`   | signature                    |                  |
| lockTime          | `dataTime` |                                       |                  |
| sendTime          | `dataTime` | create time                          |                  |
| singDatas         | `string`   | signature of domain                              |                  |
| policyVersion     | `int`      |                                       |                  |
| dealCount         | `int`      |                                       |                  |
| maxAllowFee       | `string`   | fee max allow                        |           Y       |
| feeAmount         | `string`   | fee amount                            |       Transaction Fee   Y       |
| feeCurrency       | `string`   | fee name                            |          Y       |
| receiptData       | `string`   |                                       |                  |
| blockTime | `long` | time of block of created | Y |
| bdName | `string` | | Y |
| bdType | `string` | | Y |

### BlockVO

| Name              | Type         | Description                    |  |
| ----------------- | ------------ | ----------------------- | ---------------- |
| height            | `long`       | block height               |         Y         |
| blockHash         | `string`     |                         |          Y        |
| previousHash      | `string`     | last hash         |            Y      |
| txNum             | `int`        | transaction number                |        Txns Y      |
| totalBlockSize    | `bigDecimal` | size ：`kb` |           Y       |
| totalTxNum        | `long`       | total number            |           Y       |
| blockTime         | `data`       | time of block created            |        Y          |
| version           | `string`     | version                  |         Y         |
| txRootHash        | `string`     |                         |                  |
| accountRootHash   | `string`     |                         |                  |
| contractRootHash  | `string`     |                         |                  |
| policyRootHash    | `string`     |                         |                  |
| rsRootHash        | `string`     |                         |                  |
| txReceiptRootHash | `string`     |                         |                  |
| caRootHash        | `string`     |                         |                  |
| stateRootHash     | `string`     |                         |                  |
| maxHeight | `long` | max height |  |

### ContractVO

| Name          | Type     | Description              |  |
| ------------- | -------- | ----------------- | ---------------- |
| address       | `string` | address          | Y                |
| name          | `string` | name of contract          | Y                |
| symbol        | `string` | symbol          | Y                |
| extension     | `string` | extension          | N                |
| bdCode        | `string` |                   | Y                |
| bdCodeVersion | `string` |                   | Y                |
| status        | `string` |                   | Y                |
| blockHeight   | `long`   |                   | N                |
| txId          | `string` | transaction Id | N                |
| actionIndex   | `int`    |                   | N                |
| language      | `string` | language          | N                |
| version       | `string` | version          | Y                |
| code          | `string` | source code          | N                |
| createTime    | `long`   | create time          | Y                |

 