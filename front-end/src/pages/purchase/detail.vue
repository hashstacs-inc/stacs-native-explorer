<template>
  <div class="issDetail-page">
    <article class="Basic-Information">
      <el-card class="bi-box">
        <header class="bi-title">
          Basic Information
        </header>
        <hr>
        <section class="tableList">
          <div v-for="item in BasicFormationLabel" :key="item.prop" class="bi-information">
            <span class="table-label">{{item.label}}</span><a class="table-desc" v-if="item.isTo" @click="toDetail(item.target,BasicData[item.prop], BasicData.amount)">{{BasicData[item.prop]}}</a>
            <span v-else style="font-weight: 500">{{BasicData[item.prop]}}</span>
            <template v-if="item.prop === 'status' && BasicData['status'] === 'FAILED'">
              <el-button type="text" @click="showResultMsg(BasicData['resultMsg'])" class="error-area">
                <img src="../../assets/img/view.png" style="margin-right: 5px">View
              </el-button>
            </template>
          </div>
        </section>
      </el-card>
    </article>
    <article class="Basic-Information" id="securityInfo">
      <el-card class="bi-box">
        <header class="bi-title">
          Security Information
        </header>
        <hr>
        <section class="tableList">
          <div v-for="item in securityFormationLabel" :key="item.prop" class="bi-information">
            <span class="table-label">{{item.label}}</span>
            <a class="table-desc" v-if="item.isTo" @click="toStoWeb">{{securityData[item.prop]}}</a>
            <span v-else  style="width: 897px;word-wrap:break-word">{{securityData[item.prop]}}</span>
          </div>
        </section>
      </el-card>
    </article>
    <div style="width: 100%;display: flex;justify-content: center">
      <mu-button class="primary-button" style='background-color:#183A78;color: white' @click="$router.go(-1)">Return
      </mu-button>
    </div>
  </div>
</template>

<script>
  import {querySubscribeByTxId} from "@/api"
  import {dateUTCFilter} from "@/utils"
  import { getLinkConfig } from '../../api/link'


  export default {
    computed: {
      txId() {
        return this.$route.query.id
      }
    },
    data() {
      return {
        getData: {},
        BasicFormationLabel: [
          {label: 'TX ID', prop: 'txId'},
          {label: 'Address', prop: 'address', isTo: true, target:'addressDetail'},
          {label: 'Status', prop: 'status'},
          {label: 'Transaction Type', prop: 'tokenType'},
          {label: 'Transaction Fees', prop: 'fees'},
          {label: 'Transaction Amount', prop: 'amount'},
          {label: 'Block', prop: 'blockHeight', isTo: true ,target:'blockDetail'},
          {label: 'Transaction Time +UTC', prop: 'createTime'}
        ],
        securityFormationLabel: [
          {label: 'Issuer', prop: 'issuer'},
          {label: 'Issuance Institution', prop: 'agency'},
          {label: 'Type', prop: 'type'},
          {label: 'Token Ticker', prop: 'currency', isTo: true},
          {label: 'Issuance Amount', prop: 'amount'},
          {label: 'Unit Price', prop: 'price',},
          {label: 'Purchase Start Date +UTC', prop: 'exchangeStartDate'},
          {label: 'Purchase End Date +UTC', prop: 'exchangeEndDate'},
          {label: 'Credentials Information', prop: 'bizModel'}
        ],
        BasicData: {},
        securityData: {},
        stoUrl: ''
      }
    },
    methods: {
      toDetail(target, data,amount) {
        this.$router.push({name:target,query:{address:data,amount:amount,type:'SUBSCRIBE',height:data,tokenIssue:'Purchase'}})
      },
      renderTable() {
        [].forEach.call(document.querySelectorAll(".tableList div"), function (div, index) {
          if (index % 2 !== 0) div.style.background = '#F6F6F6'
        });
      },
      getList() {
        querySubscribeByTxId({
          txId:this.txId
        }).then(res => {
          this.BasicData = res.data.data
          this.BasicData['tokenType'] = this.$route.query.tokenIssue
          this.BasicData['fees'] = this.BasicData.payment + this.BasicData.currencySymbol
          this.BasicData.createTime = dateUTCFilter(this.BasicData.createTime)
          this.securityData = this.BasicData.tokenInfoVO
        })
      },
      toStoWeb () {
        window.open(this.stoUrl + "/securityDetails?code=" + this.securityData.currency, '_blank');
      },
      // 页面滚动到 Security Information 的位置
      scrollTokenInfo () {
        if (this.$route.query.anchor === 'securityInfo') {
          document.querySelector('#securityInfo').scrollIntoView(true)
        }
      },
      // 展示错误信息
      showResultMsg (msg) {
        this.$msgbox({
          title: 'Error Information',
          message: msg,
          showCancelButton: false,
          showConfirmButton: false
        })
      }
    },
    mounted() {
      this.getData['type'] = this.$route.query.type
      this.renderTable()
      this.getList()
      getLinkConfig().then(res => {
        this.stoUrl = res.data.Marketplace
      })
      this.scrollTokenInfo()
    }
  }
</script>

<style lang="scss">
  .issDetail-page {
    color: #444444;
    font-family: HelveticaNeue;
  }

  .table-label {
    font-weight: 600;
    font-size: 14px;
    padding-left: 80px;
    width: 307px;
  }

  .bi-box {
    font-size: 14px;
    width: 100%;
  }

  .Basic-Information {
    margin-bottom: 60px;
  }

  .bi-title {
    font-weight: 600;
    font-size: 22px;
    color: #1E3B72;
    display: flex;
    align-items: center;
    height: 66px;
    padding-left: 80px;
  }

  .bi-information {
    min-height: 60px;
    display: flex;
    align-items: center;
  }
</style>
