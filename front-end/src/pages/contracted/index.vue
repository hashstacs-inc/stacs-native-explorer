<template>
  <div class="trades-page">
    <article class="trades-search">
      <el-form :inline="true">
        <el-form-item>
          <el-input placeholder="Please enter Transaction ID" v-model="conQueryData.txId"></el-input>
        </el-form-item>
        <el-form-item>
          <mu-button style="width: 128px;height: 60px;background-color: #183a78;color: white" @click="search">Search</mu-button>
        </el-form-item>
      </el-form>
    </article>
    <article class="trades-formation">
      <el-card>
        <el-table :data="tableData" stripe style="width: 100%" :header-cell-style="{background:'#fbfbfb'}">
          <el-table-column :prop="item.prop" :label="item.label" :width="item.width" v-for='item in tableDesc'
                           :key="item.prop" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button type="text" v-if="item.isA" @click="showDialog(scope.row[item.prop])"><img
                src="../../assets/img/view.png" style="margin-right: 5px">View
              </el-button>
              <span v-else>{{scope.row[item.prop]}}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <el-pagination background layout="prev, next"  @current-change="handleCurrentChange"
                     style="margin: 60px 0 60px 0;display: flex;justify-content: flex-end">
      </el-pagination>
    </article>
    <el-dialog
      :visible.sync="dialogVisible"
      width="40%">
      <span><pre>{{codeMessage}}</pre></span>
      <div slot="title" class="dialog-title">
        <span style="font-weight: 600;font-size: 18px;color: #1E3B72;">Contract Code</span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {queryContractCodeByPage} from '@/api'
  import { dateUTCFilter } from '../../utils/index'

  export default {
    computed: {
      ...mapGetters([
        'transactionStatus'
      ])
    },
    data() {
      return {
        codeMessage: '',
        dialogVisible: false,
        conQueryData: {
          pageNo: 1,
          pageSize: 10,
          height: '',
          txId: '',
        },
        tableDesc: [
          {label: 'TX ID', prop: 'txId', width: 227},
          {label: 'Time Stamp +UTC', prop: 'createTime', width: ''},
          {label: 'Contract Address', prop: 'address', width: ''},
          {label: 'Contract Language', prop: 'language', width: ''},
          {label: 'Contract Code', prop: 'code', width: '', isA: true},
          {label: 'Block', prop: 'blockHeight', width: 166},
        ],
        tableData: []
      }
    },
    methods: {
      search() {
        this.conQueryData.pageNo = 1
        this.queryContractCodeByPage('search')
      },
      handleCurrentChange(val) {
        this.conQueryData.pageNo = val
        this.queryContractCodeByPage()
      },
      showDialog(code) {
        this.dialogVisible = true
        this.codeMessage = code
      },
      queryContractCodeByPage(type) {
        queryContractCodeByPage(this.conQueryData).then(res => {
          if (type === 'search' && !res.data.data) {
            this.$router.push('invalidSearch')
          } else {
            this.tableData = res.data.data
            let item
            for (item of this.tableData) {
              item.createTime = dateUTCFilter(item.createTime)
              item.executeResult = this.transactionStatus[item.executeResult]
            }
          }
        })
      },
      toDetail(row,target,prop) {
        this.$router.push({path:'/'+ target,query: { id:row.txId, amount:row.amount, type:'SUBSCRIBE', address:prop }})
      }
    },
    mounted() {
      this.queryContractCodeByPage()
    }
  }
</script>


<style lang="scss">
  .trades-page {
    input {
      height: 60px;
      width: 950px;
    }
    .trades-search {
      input {
        border-color: white;
      }
      input:focus {
        border-color: black;
      }
      input:hover {
        border-color: black;
      }
      height: 60px;
      display: flex;
      justify-content: center;
    }
    .trades-formation {
      margin-top: 60px;
    }
  }
</style>
