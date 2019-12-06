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
  import { queryBlockByHeight,queryTxsByPage } from "@/api"
  import {dateUTCFilter} from "@/utils"

  export default {
    data() {
      return {
        queryData: {
          pageNo:1,
          pageSize:10,
          type: '',
          height: '',
          address: ''
        },
        BasicFormationLabel: [
          {label: 'Block', prop: 'height'},
          {label: 'Block Hash', prop: 'blockHash'},
          {label: 'Time Stamp +UTC', prop: 'blockTime'},
          {label: 'Transaction Amount', prop: 'txNum'},
        ],
        BasicData: {},
        transactionList: {}
      }
    },
    computed: {
      blockHeight() {
        return this.$route.query.height
      }
    },
    methods: {
      renderTable() {
        [].forEach.call(document.querySelectorAll(".tableList div"), function (div, index) {
          if (index % 2 !== 0) div.style.background = '#F6F6F6'
        });
      },
      getList() {
        queryBlockByHeight({
          height:this.blockHeight
        }).then( res => {
          this.BasicData = res.data.data
          this.BasicData.blockTime = dateUTCFilter(this.BasicData.blockTime)
        })
      },
      handleCurrentChange(val) {
        this.queryData.pageNo = val
        this.getTrades()
      },
      getTrades() {
        this.queryData['blockHeight'] = this.blockHeight
        queryTxsByPage(this.queryData).then(res => {
          this.transactionList = res.data.data
        })
      },
      toTrades(id) {
        this.$store.commit("setQueryData",{
          id,
          height: ''
        })
        this.$router.push('trades')
      }
    },
    mounted() {
      this.renderTable()
      this.getList()
      this.getTrades()
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
    min-height: 66px;
    padding-left: 80px;
  }

  .bi-information {
    min-height: 60px;
    display: flex;
    align-items: center;
  }
  .table-desc{
    &.primary{
      color: #0E265B;
      cursor: pointer;
      // font-weight: bolder;
    }
  }
</style>
