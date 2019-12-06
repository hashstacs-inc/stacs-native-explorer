<template>
  <div class="issuance-page">
    <article>
      <el-card class="search-box">
        <div class="search-content">
          <el-form :inline="true">
            <div class="form-item">
              <el-form-item label="Address">
                <el-input placeholder="Please enter the Transaction Address" v-model="issuanceQueryData.ownerAddress"></el-input>
              </el-form-item>
              <el-form-item label="Token Name">
                <el-input placeholder="Please enter the token ticker" style="margin-left: 20px" v-model="issuanceQueryData.currency"></el-input>
              </el-form-item>
            </div>
            <div style="margin-top: 20px">
              <el-form-item label="Token Type">
                <el-select placeholder="Select All" v-model="type">
                  <el-option label="Select All" value=""></el-option>
                  <el-option label="Stable" value="STABLE"></el-option>
                  <el-option label="Bond" value="BONDS"></el-option>
                  <el-option label="Stock" value="STOCKS"></el-option>
                  <el-option label="Open-end fund" value="OPEN_ENDED_FUND"></el-option>
                  <el-option label="Close-end fund" value="CLOSED_ENDED_FUND"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <mu-button class="primary-button" style="margin-left: 285px;background-color: #183A78;color: white" @click="search">Search</mu-button>
              </el-form-item>
            </div>
          </el-form>
        </div>
      </el-card>
    </article>
    <article>
      <el-card class="table-box">
        <el-table :data="tableData" stripe style="width: 100%" :header-cell-style="{background:'#fbfbfb'}">
          <el-table-column :prop="item.prop" :label="item.label" :width="item.width" v-for='item in tableDesc'
                           :key="item.prop" show-overflow-tooltip>
            <template slot-scope="scope">
              <a type="text" v-if="item.isA" icon="el-icon-view" @click="toDetail(scope.row,item.target,item.anchor)">{{scope.row[item.prop]}}</a>
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
  import { mapGetters} from 'vuex'
  import { queryCurrencyIssuesByPage} from '@/api'
  import { dateUTCFilter } from '../../utils/index'


  export default {
    computed: {
      ...mapGetters([
        'transactionStatus',
      ])
    },
    data() {
      return {
        issuanceQueryData: {
          isStable: false,
          pageNo: 1,
          pageSize: 10,
          ownerAddress: '',
          currency: '',
          type: '',
        },
        type: '',
        value: '',
        tableDesc: [
          {label: 'TX ID', prop: 'txId', width: '190',isA:true,target: 'issuanceDetail'},
          {label: 'Time Stamp +UTC', prop: 'createTime', width: '160'},
          {label: 'Operation Address', prop: 'issueAddress', width: '170'},
          {label: 'Token Address', prop: 'ownerAddress', width: '150',isA:true, target: 'addressDetail'},
          {label: 'Amount', prop: 'amount', width: '100'},
          {label: 'Token Name', prop: 'currency', width: '80',isA:true, target: 'tokenDetail'},
          {label: 'Issuer', prop: 'issuer', width: ''},
          {label: 'Issuance ' + 'Institution', prop: 'agency', width: 166},
          {label: 'Block', prop: 'blockHeight', width: '',isA:true,target: 'blockDetail'}
        ],
        tableData: []
      }
    },
    methods: {
      handleCurrentChange(val) {
        this.issuanceQueryData.pageNo = val
        this.queryCurrencyIssuesByPage()
      },
      search() {
        this.issuanceQueryData.pageNo = 1
        this.queryCurrencyIssuesByPage()
      },
      queryCurrencyIssuesByPage() {
        if (this.type === 'STABLE') {
          this.issuanceQueryData.type = ''
          this.issuanceQueryData.isStable = true
        }else {
          this.issuanceQueryData.type = this.type
          this.issuanceQueryData.isStable = null
        }
        queryCurrencyIssuesByPage(this.issuanceQueryData).then(res=> {
          this.tableData = res.data.data
          let item
          for (item of this.tableData) {
            item.createTime = dateUTCFilter(item.createTime)
          }
        })
      },
      toDetail(row,target,anchor) {
        if (target === 'addressDetail') {
          this.$router.push({
            path: '/' + target,
            query: { address: row.ownerAddress, token: row.currency }
          });
        } else if (target === 'issuanceDetail') {
          this.$router.push({path:'/'+ target,query: { id:row.txId, amount:row.amount, type:'ISSUE', address:row.ownerAddress,height:row.blockHeight,tokenIssue: 'Issuance'}})
        } else if (target === 'tokenDetail') {
          this.$router.push({
            path: '/' + target,
            query: { token: row.currency }
          });
        } else if (target === 'blockDetail') {
          this.$router.push({
            path: '/' + target,
            query: { height: row.blockHeight }
          });
        }
        
      }
    },
    mounted() {
      this.queryCurrencyIssuesByPage()
    }
  }
</script>

<style>
  .search-box {
    width: 100%;
    height: 258px;
  }

  .table-box {
    margin-top: 60px;
    width: 100%;
    height: 726px;
  }

  .search-content {
    padding: 63px 150px 70px 150px;
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
