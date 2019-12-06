<template>
  <div class="issuance-page">
    <article>
      <el-card class="p-search-box">
        <div class="p-search-content">
          <label>TX ID</label>
          <div class="p-search-input">
            <el-input placeholder="Please enter Transaction ID" v-model="queryData.txId"></el-input>
          </div>
          <label>Type</label>
          <div class="p-search-input">
            <el-select v-model="queryData.type" placeholder="Select All">
              <el-option label="Select All" value=""></el-option>
              <el-option label="Bond" value="BONDS"></el-option>
              <el-option label="Stock" value="STOCKS"></el-option>
              <el-option label="Opend-end fund" value="OPEN_ENDED_FUND"></el-option>
              <el-option label="Closed-end fund" value="CLOSED_ENDED_FUND"></el-option>
            </el-select>
          </div>
          <label>Time (+UTC)</label>
          <div class="p-search-input">
            <el-date-picker type="daterange" range-separator="to" v-model="queryData['date']" value-format="yyyy-MM-dd">
            </el-date-picker>
          </div>
          <span>Address</span>
          <div class="p-search-input1">
            <el-input placeholder="Please enter the Transaction Address"  v-model="queryData.address"></el-input>
          </div>
          <span>Name</span>
          <div class="p-search-input1">
            <el-input placeholder="Please enter the token ticker"  v-model="queryData.currency"></el-input>
          </div>
          <span></span>
          <div class="p-search-input1">
            <mu-button class="primary-button" style="background-color: #183A78;color: white" @click="search">Search</mu-button>
          </div>
        </div>
      </el-card>
    </article>
    <article>
      <el-card class="p-table-box">
        <el-table :data="tableData" stripe style="width: 100%" :header-cell-style="{background:'#fbfbfb'}">
          <el-table-column :prop="item.prop" :label="item.label" :width="item.width" v-for='item in tableDesc'
                           :key="item.prop" show-overflow-tooltip>
            <template slot-scope="scope">
              <a type="text" v-if="item.target" icon="el-icon-view" @click="toDetail(scope.row,item.target,scope.row[item.prop],item.anchor)">{{scope.row[item.prop]}}</a>
              <span v-else>{{scope.row[item.prop]}}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <el-pagination background layout="prev, next" @current-change="handleCurrentChange"
                     style="margin: 60px 0 60px 0;display: flex;justify-content: flex-end">
      </el-pagination>
    </article>
  </div>
</template>

<script>
  import { queryTransfersByPage } from "@/api"
  import { dateUTCFilter } from '@/utils'

  export default {
    data() {
      return {
        queryData: {
          pageNo: 1,
          pageSize: 10,
          txId: '',
          type: '',
          currency: '',
          startDate: '',
          endDate: '',
        },
        value: '',
        tableDesc: [
          {label: 'TX ID', prop: 'txId', width: 227 , target:'transferDetail'},
          {label: 'Time Stamp +UTC', prop: 'txCreatedTime', width: ''},
          {label: 'From', prop: 'fromAddr', width: '' , target:'addressDetail'},
          {label: 'To', prop: 'toAddr', width: '' , target:'addressDetail'},
          {label: 'Amount', prop: 'amount', width: ''},
          {label: 'Token Name', prop: 'currency', width: '', target:'transferDetail',anchor: 'tokenInfo'},
          {label: 'Block', prop: 'blockHeight', width: '110', target:'blockDetail'},
          {label: 'Transaction Status', prop: 'status', width: '110'}
        ],
        tableData: []
      }
    },
    methods: {
      handleCurrentChange(val) {
        this.queryData.pageNo = val
        this.getList()
      },
      search() {
        this.queryData.pageNo = 1
        this.getList()
      },
      getList() {
        if(this.queryData.date) {
          this.queryData.startDate = this.queryData.date[0]
          this.queryData.endDate = this.queryData.date[1]
        }
        queryTransfersByPage(this.queryData).then(res=> {
          this.tableData = res.data.data
          let item
          for (item of this.tableData) {
            item.txCreatedTime = dateUTCFilter(item.txCreatedTime)
          }
        })
      },
      toDetail(row,target,prop,anchor) {
        if (anchor === undefined || anchor === null || anchor === '') {
          this.$router.push({path:'/'+ target,query: { id:row.txId, amount:row.amount, type:'TRANSFER', address:prop,height:row.blockHeight,tokenIssue: 'Transfer' }})
        } else {
          this.$router.push({path:'/'+ target,query: { id:row.txId, amount:row.amount, type:'TRANSFER', address:prop,height:row.blockHeight,tokenIssue: 'Transfer',anchor: anchor }})
        }

      }
    },
    mounted() {
      this.getList()
    }
  }
</script>

<style lang="scss">
  .p-search-box {
    width: 100%;
    height: 258px;
  }

  .p-table-box {
    margin-top: 60px;
    width: 100%;
    height: 726px;
  }

  .p-search-content {
    display: grid;
    grid-template-columns: 73px 300px 73px 300px 90px 300px;
    grid-template-rows: 50px 120px;
    padding: 50px 30px 70px 30px;
    label {
      display: flex;
      align-items: center;
    }
    span {
      display: flex;
      align-items: center;
    }
    .p-search-input {
      display: flex;
      align-items: center;
    }
    .p-search-input1 {
      display: flex;
      align-items: center;
    }
  }

  .form-item {
    display: flex;
    justify-content: space-between;
  }

  tr {
    font-family: HelveticaNeue-Medium;
    font-size: 13px;
  }
</style>
