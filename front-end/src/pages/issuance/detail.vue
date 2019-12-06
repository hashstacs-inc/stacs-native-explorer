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
    <article class="Basic-Information" id="issuanceTokenInfo">
      <el-card class="bi-box">
        <header class="bi-title">
          Token Information
        </header>
        <hr>
        <section class="tableList">
          <div v-for="item in TokenFormationLabel" :key="item.prop" class="bi-information">
            <span class="table-label">{{item.label}}</span>
            <a class="table-desc" v-if="item.prop==='currency'&& isIfStable===false" @click="toStoWeb">{{toKenData[item.prop]}}</a>
            <span v-else style="width: 897px;word-wrap:break-word">{{toKenData[item.prop]}}</span>
          </div>
        </section>
      </el-card>
    </article>
    <div style="width: 100%;display: flex;justify-content: center">
      <mu-button class="primary-button" style='background-color:#183A78;color: white' @click="goBack">Return
      </mu-button>
    </div>
  </div>
</template>

<script>
  import { queryCurrencyIssueByTxId } from "@/api"
  import {dateUTCFilter} from '@/utils'
  import { getLinkConfig } from '../../api/link'
  export default {
    data() {
      return {
        BasicFormationLabel: [
          {label: 'TX ID', prop: 'txId'},
          {label: 'TokenAddress', prop: 'ownerAddress', isTo: true, target: 'addressDetail'},
          {label: 'Status', prop: 'status'},
          {label: 'Operation Address', prop: 'issueAddress'},
          {label: 'Transaction Type', prop: 'tokenType'},
          {label: 'Block', prop: 'blockHeight', isTo: true ,target: 'blockDetail'},
          {label: 'Transaction Time +UTC', prop: 'createTime'}
        ],
        TokenFormationLabel: [
          {label: 'Issuer', prop: 'issuer'},
          {label: 'Issuance Institution', prop: 'agency'},
          {label: 'Token Type', prop: 'type'},
          {label: 'Token Ticker', prop: 'currency'},
          {label: 'Issue Amount', prop: 'amount'},
          {label: 'Price', prop: 'price',},
          {label: 'Purchase Start Date +UTC', prop: 'exchangeStartDate'},
          {label: 'Purchase End Date +UTC', prop: 'exchangeEndDate'},
          {label: 'Credentials Information', prop: 'bizModel'}
        ],
        BasicData: {},
        toKenData: {},
        isIfStable: false,
        stoUrl: ''
      }
    },
    computed: {
      txId() {
        return this.$route.query.id
      }
    },
    methods: {
      toDetail(target, data,amount) {
        this.$router.push({name:target,query:{address:data,amount:amount,type:'ISSUE',height:data,tokenIssue: 'Issuance'}})
      },
      goBack () {
        this.$router.push({name: 'issuance'})
      },
      renderTable() {
        [].forEach.call(document.querySelectorAll(".tableList div"), function (div, index) {
          if (index % 2 !== 0) div.style.background = '#F6F6F6'
        });
      },
      getList() {
        queryCurrencyIssueByTxId({
          txId:this.txId
        }).then( res => {
          this.BasicData = res.data.data
          this.BasicData['tokenType'] = this.$route.query.tokenIssue
          this.BasicData.createTime = dateUTCFilter(this.BasicData.createTime)
          this.isIfStable = this.BasicData.isStable
          this.toKenData = res.data.data.tokenInfoVO
        })
      },
      toStoWeb () {
        window.open(this.stoUrl + "/securityDetails?code=" + this.toKenData.currency, '_blank');
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
      this.renderTable()
      this.getList()
      window.location.href = window.location.href + '#'+this.$route.query.anchor
      getLinkConfig().then(res => {
        this.stoUrl = res.data.Marketplace
      })
    }
  }
</script>

<style lang="scss" scoped>
  .issDetail-page {
    color: #444444;
    font-family: HelveticaNeue;
  }

  .table-label {
    font-weight: 600;
    font-size: 14px;
    padding-left: 80px;
    width: 307px;
    padding-right: 20px;
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
    min-height: 66px;
    padding-left: 80px;
  }

  .bi-information {
    min-height: 60px;
    display: flex;
    align-items: center;
  }
</style>
