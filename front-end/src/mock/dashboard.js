const txList = {
    "code": "000000",
    "msg": "操作成功",
    "data":
      [{
        "txId": "02819edcd552bd00f64ee313176bd9f141568e583105505c8dc9d94f62a31bd8", // 交易 Id
        "bizModel": {
          "name": "ywz",
          "age": "23",
        },
        "policyId": "123456789",
        "version": "1.0.0", // 交易版本号
        "blockHeight": "1", // 交易所在区块高度
        "sender": "节点名称", // 交易发送的节点名称
        "actionDatas": "交易包含的 action list", // 交易包含的 action list 
        "executeResult": "交易执行结果", // 交易执行结果，`0`：fail，`1`：success
        "errorCode": "错误代码", // 错误代码
        "errorMessage": "错误信息", // 错误信息
        "txType": "交易类型", // 交易类型
        "contractState": "合约状态", // 合约状态
        "bdCode": "bdCode",
        "submitter": "交易发起者", // 交易发起者
        "submitterSign": "交易发起者的签名值", // 交易发起者的签名值
      }]
  }
  
  
  export default {
    txList
  };
  