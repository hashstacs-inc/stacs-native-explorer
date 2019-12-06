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
            <span class="table-label">{{item.label}}</span><span class="table-desc">{{BasicData[item.prop]}}</span>
          </div>
        </section>
      </el-card>
    </article>
    <article class="Basic-Information">
      <el-card class="bi-box">
        <header class="bi-title">
          Transction List
        </header>
        <hr>
        <section class="tableList">
          <div v-for="(item,index) in transactionList" :key="item.prop" class="bi-information">
            <span class="table-label">TX ID{{index+1}}</span><a class="table-desc" @click="toTrades(item.txId)">{{item.txId}}</a>
          </div>
        </section>
      </el-card>
      <el-pagination background layout="prev, next" @current-change="handleCurrentChange"
                     style="margin: 60px 0 60px 0;display: flex;justify-content: flex-end">
      </el-pagination>
    </article>
    <div style="width: 100%;display: flex;justify-content: center">
      <mu-button class="primary-button" style='background-color:#183A78;color: white' @click="$router.go(-1)">Return
      </mu-button>
    </div>
  </div>
</template>

<script>
  import {queryAddressByPage} from '@/api'

  export default {
    data() {
      return {
        BasicFormationLabel: [
          {label: 'Address', prop: 'address'},
          {label: 'Transaction Amount', prop: 'amount'},
          {label: 'Transaction Type', prop: 'tokenIssue'},
        ],
        transactionList: [],
        BasicData: {
          type: '',
          address: '',
          amount: '',
        },
        queryData: {
          pageNo:1,
          pageSize:10,
          type: '',
          address: ''
        }
      }
    },
    methods: {
      toTrades(id) {
        this.$store.commit("setQueryData",{
          id,
          height: ''
        })
        this.$router.push('trades')
      },
      handleCurrentChange(val) {
        this.queryData.pageNo = val
        this.getList()
      },
      renderTable() {
        [].forEach.call(document.querySelectorAll(".tableList div"), function (div, index) {
          if (index % 2 !== 0) div.style.background = '#F6F6F6'
        });
      },
      getList() {
        queryAddressByPage(this.queryData).then(res => {
          this.transactionList = res.data.data
        })
      }
    },
    mounted() {
      this.BasicData = {
        tokenIssue: this.$route.query.tokenIssue,
        address: this.$route.query.address,
        amount: this.$route.query.amount,
      }
      this.queryData.type = this.$route.query.type
      this.queryData.address = this.$route.query.address
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
