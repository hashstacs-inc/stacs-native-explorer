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
            <span v-else style="font-weight: 500;width: 897px;word-wrap:break-word">{{BasicData[item.prop]}}</span>
          </div>
        </section>
      </el-card>
    </article>
    <article class="Basic-Information">
      <el-card class="bi-box">
        <header class="bi-title">
          Credentials  Information
        </header>
        <hr>
        <section class="tableList">
          <div v-for="item in CredentialsFormationLabel" :key="item.prop" class="bi-information">
            <span class="table-label">{{item.label}}</span><a class="table-desc" v-if="item.isTo">{{credentialsData[item.prop]}}</a>
            <span v-else style="font-weight: 500">{{credentialsData[item.prop]}}</span>
          </div>
        </section>
      </el-card>
    </article>
    <!--<article class="Basic-Information">-->
      <!--<el-card class="bi-box">-->
        <!--<header class="bi-title">-->
          <!--Token Information-->
        <!--</header>-->
        <!--<hr>-->
        <!--<section class="tableList">-->
          <!--<div v-for="item in TokenFormationLabel" :key="item.prop" class="bi-information">-->
            <!--<span class="table-label">{{item.label}}</span><a class="table-desc" v-if="item.isTo">{{toKenData[item.prop]}}</a>-->
            <!--<span v-else>{{toKenData[item.prop]}}</span>-->
          <!--</div>-->
        <!--</section>-->
      <!--</el-card>-->
    <!--</article>-->
    <div style="width: 100%;display: flex;justify-content: center">
      <mu-button class="primary-button" style='background-color:#183A78;color: white' @click="$router.go(-1)">Return
      </mu-button>
    </div>
  </div>
</template>

<script>
  import {dateUTCFilter} from "@/utils"
  import {queryBizModelByTxId} from "@/api"

  export default {
    data() {
      return {
        BasicFormationLabel: [
          {label: 'Transaction ID', prop: 'txId'},
          {label: 'Transaction Requestor', prop: 'address', isTo: true, target: 'addressDetail'},
          {label: 'Transaction Status', prop: 'status'},
          {label: 'Transaction Type', prop: 'tokenType'},
          {label: 'Block Height', prop: 'blockHeight', isTo: true ,target: 'blockDetail'},
          {label: 'Transaction Time +UTC', prop: 'createTime'}
        ],
        CredentialsFormationLabel: [
          {label: 'User\'s nationality', prop: 'countries'},
          {label: 'Country of Residence', prop: 'residence'},
          {label: 'KYC Institution', prop: 'kyc_source_name'},
          {label: 'Type of investor', prop: 'invest_type'},
          {label: 'Address', prop: 'address'},
        ],
        BasicData: {},
        credentialsData: {}
      }
    },
    methods: {
      toDetail(target, data,amount) {
        this.$router.push({name:target,query:{address:data,amount:amount,type:'ISSUE',height:data}})
      },
      renderTable() {
        [].forEach.call(document.querySelectorAll(".tableList div"), function (div, index) {
          if (index % 2 !== 0) div.style.background = '#F6F6F6'
        });
      },
      getList() {
        queryBizModelByTxId({
          txId: this.$route.query.id
        }).then(res=> {
          this.BasicData = res.data.data
          this.BasicData['tokenType'] = this.$route.query.tokenIssue
          this.BasicData.type = this.$route.query.type
          this.BasicData.createTime = dateUTCFilter(this.BasicData.createTime)
          this.credentialsData = JSON.parse(this.BasicData.bizModel)
        })
      }
    },
    mounted() {
      this.getList()
      this.renderTable()
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
