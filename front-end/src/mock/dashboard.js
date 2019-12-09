const txList = {
  "respCode": "000000",
  "msg": "success",
  "success": true,
  "data":
    [{
      "actionDatas": [
        {
          "args":[
            "67213e8d397755e5ecb2dfd71daab0ad639fc116",
            1000000000
          ],
          "currency":"Canary99",
          "from":"4888db5233813f18437cee95a2cc67d43a5bf06b",
          "index":0,
          "methodSignature":"(bool) transfer(address,uint)",
          "signature":"307440bf13f8b38486334e42f5d901314078f24fe4ebd482da331b96c5e68be8060d76c44355b768920cafa1860a1a9abf67233397a9587d92eda33efcaa47e701",
          "to":"e77634e8a46ab116da3dcb3c07078b51cbcd2e56",
          "type":"CONTRACT_INVOKED",
          "value":null,
          "version":"1.0.0"
        }
      ],
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
  "respCode": "000000",
  "msg": "success",
  "success": true,
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

const blockListDetails = {
  "respCode": "000000",
  "msg": "success",
  "success": true,
  "data":{
    "blockHash":"288f7900bf525bd14021bc89b18d6a9b9c44b3ed3fce88b17b5dbbf4f5846a34",
    "blockHeight":2904,
    "blockTime":1575631429519,
    "maxHeight":2904,
    "pageList":[
      {
        "policyId": "ywz",
        "feeAmount":"1000.12345678",
        "bizType":"Transfer",
        "blockHeight":2904,
        "blockTime":1575631429519,
        "createTime":1575631436000,
        "bdName":"Canary99",
        "bdType":"DD",
        "failedDetail":null,
        "submitter":"4888db5233813f18437cee95a2cc67d43a5bf06b",
        "id":1285,
        "interestCurrency":null,
        "executeResult":"SUCCESS",
        "toAddress":"67213e8d397755e5ecb2dfd71daab0ad639fc116",
        "txId":"2b91a6a4bac5234c6d1ea1764c76d2c2d957b371b7c8e03730e7adb8be7973ab"
      }
    ],
    "pageNo":1,
    "pageSize":20,
    "parentHash":"1709cc5ebb3d70c17b6d70bf775b9ed6c1972101ff22e231c6a838f836249117",
    "total":1000,
    "totalTransactions":1
  }
}

const addressList = {"data":{"balance":"10,000,000,000","currency":"CKT1003","pageList":[{"amount":"100","bizType":"Disposed","blockHeight":2079,"blockTime":1574408070871,"createTime":1574408071000,"currency":"CKT1003","failedDetail":null,"fromAddress":"67213e8d397755e5ecb2dfd71daab0ad639fc116","id":971,"interestCurrency":"CKT1003","status":"Failed","toAddress":"4888db5233813f18437cee95a2cc67d43a5bf06b","txId":"9e3ba4a78617b87b0c80b7ab9a3bfa31d5e746c43467bb18ca2b7654ff65f36f"},{"amount":"100","bizType":"Transfer","blockHeight":2074,"blockTime":1574408022371,"createTime":1574408022000,"currency":"CKT1003","failedDetail":null,"fromAddress":"4888db5233813f18437cee95a2cc67d43a5bf06b","id":968,"interestCurrency":null,"status":"SUCCESS","toAddress":"67213e8d397755e5ecb2dfd71daab0ad639fc116","txId":"884f5dad552842976b3384fe387fa95757d029e212b0d4e3fbbb05453372129c"}],"pageNo":1,"pageSize":20,"tokens":[{"amount":1000.0000000000,"currency":"UBUB03","currencyName":"UBUB03"},{"amount":980.0000000000,"currency":"WINB","currencyName":"WINB"},{"amount":49988.0000000000,"currency":"USTT 101","currencyName":"USTT 101"},{"amount":1000000000.0000000000,"currency":"TUT101","currencyName":"TUT101"},{"amount":2000.0000000000,"currency":"UBIN03","currencyName":"UBIN03"},{"amount":98073.0000000000,"currency":"USDT","currencyName":"USDT"},{"amount":4800.0000000000,"currency":"UBUB10","currencyName":"UBUB10"},{"amount":10000000000.0000000000,"currency":"CKT1001","currencyName":"CKT1001"},{"amount":2000.0000000000,"currency":"DEB100","currencyName":"DEB100"},{"amount":5000.0000000000,"currency":"CB2512","currencyName":"CB2512"},{"amount":100000.0000000000,"currency":"TTTTT101","currencyName":"TTTTT101"},{"amount":2000.0000000000,"currency":"UBIN101","currencyName":"UBIN101"},{"amount":999979.0000000000,"currency":"Basel99","currencyName":"Basel99"},{"amount":99037.0000000000,"currency":"UB2020","currencyName":"UB2020"},{"amount":9000.0000000000,"currency":"SUTB102","currencyName":"SUTB102"},{"amount":5000.0000000000,"currency":"SUTB101","currencyName":"SUTB101"},{"amount":9999999900.0000000000,"currency":"CKT1002","currencyName":"CKT1002"},{"amount":50000.0000000000,"currency":"SUB101","currencyName":"SUB101"},{"amount":49950.0000000000,"currency":"USSB122","currencyName":"USSB122"},{"amount":960.0000000000,"currency":"UB21Y","currencyName":"UB21Y"},{"amount":2000.0000000000,"currency":"UDSA1011","currencyName":"UDSA1011"},{"amount":259.0000000000,"currency":"JBBOND1023","currencyName":"JBBOND1023"},{"amount":999324.0000000000,"currency":"ROX5Y","currencyName":"ROX5Y"},{"amount":10000.0000000000,"currency":"BD300","currencyName":"BD300"},{"amount":1000.0000000000,"currency":"CRB22","currencyName":"CRB22"},{"amount":1000000.0000000000,"currency":"CSEA5Y","currencyName":"CSEA5Y"},{"amount":1000.0000000000,"currency":"UBUB01","currencyName":"UBUB01"},{"amount":995.0000000000,"currency":"SFFD25","currencyName":"SFFD25"},{"amount":2870.0000000000,"currency":"ubinscc","currencyName":"ubinscc"},{"amount":49987.0000000000,"currency":"CGB101","currencyName":"CGB101"},{"amount":999989.0000000000,"currency":"Chelsea99","currencyName":"Chelsea99"},{"amount":999990.0000000000,"currency":"Canary99","currencyName":"Canary99"},{"amount":49992.0000000000,"currency":"DB111","currencyName":"DB111"},{"amount":989.0000000000,"currency":"ABB001","currencyName":"ABB001"},{"amount":5000.0000000000,"currency":"AAB101","currencyName":"AAB101"},{"amount":50000.0000000000,"currency":"SFB 101","currencyName":"SFB 101"},{"amount":2000.0000000000,"currency":"UBIN110","currencyName":"UBIN110"},{"amount":2992.0000000000,"currency":"UBIN105","currencyName":"UBIN105"},{"amount":2469.0000000000,"currency":"Ubin22","currencyName":"Ubin22"},{"amount":398.0000000000,"currency":"UBIN102","currencyName":"UBIN102"},{"amount":1998600.0000000000,"currency":"CAL12Y","currencyName":"CAL12Y"},{"amount":10000000000.0000000000,"currency":"CKT1003","currencyName":"CKT1003"},{"amount":950.0000000000,"currency":"SFFLB","currencyName":"SFFLB"},{"amount":998997.0000000000,"currency":"REDP5Y","currencyName":"REDP5Y"},{"amount":1000000.0000000000,"currency":"APEX51","currencyName":"APEX51"},{"amount":999985.0000000000,"currency":"Lon99","currencyName":"Lon99"},{"amount":2000.0000000000,"currency":"STC","currencyName":"STC"},{"amount":999990.0000000000,"currency":"AstanaFC","currencyName":"AstanaFC"},{"amount":9900.0000000000,"currency":"CRB23","currencyName":"CRB23"},{"amount":50000.0000000000,"currency":"HB101","currencyName":"HB101"},{"amount":999963.0000000000,"currency":"MANU5Y","currencyName":"MANU5Y"},{"amount":1990.0000000000,"currency":"UBIN111","currencyName":"UBIN111"},{"amount":1000.0000000000,"currency":"LARS22","currencyName":"LARS22"},{"amount":999249.0000000000,"currency":"ROSE5Y","currencyName":"ROSE5Y"},{"amount":2998.0000000000,"currency":"LAL100","currencyName":"LAL100"},{"amount":500.0000000000,"currency":"SFFTH","currencyName":"SFFTH"},{"amount":1713.0000000000,"currency":"UBIN02","currencyName":"UBIN02"},{"amount":29295.0000000000,"currency":"BSSI200","currencyName":"BSSI200"},{"amount":999973.0000000000,"currency":"ZurichFC99","currencyName":"ZurichFC99"},{"amount":999988.0000000000,"currency":"Arse99","currencyName":"Arse99"},{"amount":999960.0000000000,"currency":"Chic99","currencyName":"Chic99"},{"amount":9790.0000000000,"currency":"SFFSB22","currencyName":"SFFSB22"},{"amount":999987.0000000000,"currency":"CASHEW","currencyName":"CASHEW"},{"amount":999990.0000000000,"currency":"FUEL5Y","currencyName":"FUEL5Y"},{"amount":2000.0000000000,"currency":"UBIN222","currencyName":"UBIN222"},{"amount":2000.0000000000,"currency":"UBDD123","currencyName":"UBDD123"},{"amount":4967.0000000000,"currency":"SUT101","currencyName":"SUT101"},{"amount":96.0000000000,"currency":"jtt1203","currencyName":"jtt1203"},{"amount":999994.0000000000,"currency":"EVIAN5Y","currencyName":"EVIAN5Y"},{"amount":1000.0000000000,"currency":"LAKSA2022","currencyName":"LAKSA2022"},{"amount":999990.0000000000,"currency":"HKFC99","currencyName":"HKFC99"},{"amount":2000.0000000000,"currency":"UBIN05","currencyName":"UBIN05"},{"amount":1962.0000000000,"currency":"CHICKRICE01","currencyName":"CHICKRICE01"},{"amount":1980.0000000000,"currency":"UBINS100","currencyName":"UBINS100"},{"amount":999987.0000000000,"currency":"PSG99","currencyName":"PSG99"},{"amount":50000.0000000000,"currency":"SFB101","currencyName":"SFB101"},{"amount":1985.0000000000,"currency":"TT102","currencyName":"TT102"},{"amount":1880.0000000000,"currency":"UDSB123","currencyName":"UDSB123"},{"amount":1658.0000000000,"currency":"UBIN01","currencyName":"UBIN01"},{"amount":50000.0000000000,"currency":"USB103","currencyName":"USB103"},{"amount":9900.0000000000,"currency":"BDX","currencyName":"BDX"},{"amount":999943.0000000000,"currency":"SFFChic","currencyName":"SFFChic"},{"amount":5000.0000000000,"currency":"UBUB11","currencyName":"UBUB11"},{"amount":4741.0000000000,"currency":"CHICKRICE02","currencyName":"CHICKRICE02"},{"amount":1801.0000000000,"currency":"UBIN04","currencyName":"UBIN04"},{"amount":9999455.0000000000,"currency":"CRAB5Y","currencyName":"CRAB5Y"},{"amount":2000.0000000000,"currency":"UDSS101","currencyName":"UDSS101"},{"amount":1000000.0000000000,"currency":"APEX100","currencyName":"APEX100"},{"amount":998700.0000000000,"currency":"APPLE5Y","currencyName":"APPLE5Y"},{"amount":1000.0000000000,"currency":"UBUB02","currencyName":"UBUB02"}],"total":2},"msg":"success","respCode":"000000","success":true}

const txListDetail = {
  "respCode": "000000",
  "msg": "success",
  "success": true,
  "data":{
    "txId":"2b91a6a4bac5234c6d1ea1764c76d2c2d957b371b7c8e03730e7adb8be7973ab",
    "bdName": "System BD",
    "bdType": "System",
    "policyId": "System BD",
    "submitter": "1709cc5ebb3d70c17b6d70bf775b9ed6c1972101ff22e231c6a838f836249117",
    "maxAllowFee": "System BD",
    "feeAmount": "System BD",
    "blockHeight": 2904,
    "blockTime": 1575631429519,
    "executeResult": "SUCCESS",
    "actionDatas": [{"args":["67213e8d397755e5ecb2dfd71daab0ad639fc116",1000000000],"currency":"Cornwall99","from":"4888db5233813f18437cee95a2cc67d43a5bf06b","index":0,"methodSignature":"(bool) transfer(address,uint)","signature":"495272f08fdd961a2e325f53dd2225b63c9b26ec2c7a138fde986ad6349eb0455023699a96b78221edeb0f96b45e03af5929a4494ced95e8dcf874b5d3e77fc401","to":"18dac265f8325af5af09de9041fb5a29ef1782c3","type":"CONTRACT_INVOKED","value":null,"version":"1.0.0"}]
  }
}

export default {
  txList,
  blockList,
  blockListDetails,
  addressList,
  txListDetail
};
  