const txList = {
  "code": "000000",
  "msg": "操作成功",
  "data":
    [{
      "actionDatas": [{"args":["67213e8d397755e5ecb2dfd71daab0ad639fc116",1000000000],"currency":"Canary99","from":"4888db5233813f18437cee95a2cc67d43a5bf06b","index":0,"methodSignature":"(bool) transfer(address,uint)","signature":"307440bf13f8b38486334e42f5d901314078f24fe4ebd482da331b96c5e68be8060d76c44355b768920cafa1860a1a9abf67233397a9587d92eda33efcaa47e701","to":"e77634e8a46ab116da3dcb3c07078b51cbcd2e56","type":"CONTRACT_INVOKED","value":null,"version":"1.0.0"}],
      "bizModel": {"amount":10.0000000000,"currency":"Canary99","data":"{\"ubinEscrowId\":null}","fee":0E-10,"fromAddr":"4888db5233813f18437cee95a2cc67d43a5bf06b","originalTxId":"Canary994888db5233813f18437cee95a2cc67d43a5bf06b67213e8d397755e5ecb2dfd71daab0ad639fc11610.0000000.006525910427002470401575631429135","policyId":null,"randomNum":652591042700247040,"signature":"307440bf13f8b38486334e42f5d901314078f24fe4ebd482da331b96c5e68be8060d76c44355b768920cafa1860a1a9abf67233397a9587d92eda33efcaa47e701","superPermission":false,"toAddr":"67213e8d397755e5ecb2dfd71daab0ad639fc116","txCreatedTime":1575631429135,"txId":"2b91a6a4bac5234c6d1ea1764c76d2c2d957b371b7c8e03730e7adb8be7973ab","type":"BONDS","version":"1.0.0"},
      "blockHeight": "2904",
      "blockTime": 1575631429519,
      "contractState": null,
      "errorCode": null,
      "errorMessage": null,
      "executeResult": "1",
      "policyId": "TRANSFER",
      "sender": "GSX-GROUP-RS-A",
      "txId": "2b91a6a4bac5234c6d1ea1764c76d2c2d957b371b7c8e03730e7adb8be7973ab",
      "txType": "DEFAULT",
      "version": "2.0.0"
    }]
}

const blockList = {
  "code": "000000",
  "msg": "操作成功",
  "data":
    [{
      "blockHash": "288f7900bf525bd14021bc89b18d6a9b9c44b3ed3fce88b17b5dbbf4f5846a34", 
      "blockTime": 1575631429519,
      "height": "2904",
      "previousHash": "1709cc5ebb3d70c17b6d70bf775b9ed6c1972101ff22e231c6a838f836249117",
      "totalBlockSize": "1.55",
      "totalTxNum": "4472",
      "txNum": "1",
      "version": "v1.0",
    }]
}

export default {
  txList,
  blockList
};
  