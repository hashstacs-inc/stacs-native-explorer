<template>
  <div class="trades-page">
    <article class="trades-search">
      <el-form :inline="true">
        <el-form-item label="TX ID">
          <el-input placeholder="Please enter Transaction ID" v-model="queryData.txId"></el-input>
        </el-form-item>
        <el-form-item label="Address">
          <el-input placeholder="Please enter Address" v-model="queryData.address"></el-input>
        </el-form-item>
        <el-form-item>
          <mu-button style="width: 128px;height: 60px;background-color: #183a78;color: white" @click="getList">Search</mu-button>
        </el-form-item>
      </el-form>
    </article>
    <article class="trades-formation">
      <el-card>
        <el-table :data="tableData" stripe style="width: 100%" :header-cell-style="{background:'#fbfbfb'}">

          <el-table-column :prop="item.prop" :label="item.label" :width="item.width" v-for='item in tableDesc'
                           :key="item.prop" show-overflow-tooltip>
            <template slot-scope="scope">
              <a type="text" v-if="item.target" icon="el-icon-view" @click="toDetail(scope.row,item.target,scope.row[item.prop])">{{scope.row[item.prop]}}</a>
              <a type="text" v-else-if="item.prop === 'bizAddress'" icon="el-icon-view" @click="toDetail(scope.row,item.target,scope.row[item.prop])">{{scope.row[item.prop]}}</a>
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
  import {queryBizModelsByPage} from "@/api"
  import { dateUTCFilter } from '../../utils/index'

  export default {
    data() {
      return {
        queryData: {
          pageNo: 1,
          pageSize: 10,
          txId: '',
          address: ''
        },
        tableDesc: [
          {label: 'TX ID', prop: 'txId', width: 227 ,target: 'credentialsDetail'},
          {label: 'Time Stamp +UTC', prop: 'createTime', width: '200'},
          //target: 'credentialsDetail'  
          {label: 'Address', prop: "bizAddress", width: '' ,target: 'addressDetail'},
          {label: 'Block', prop: 'blockHeight', width: '', target: 'blockDetail'},
          {label: 'Transaction Status', prop: 'status', width: 166},
        ],
        tableData: []
      }
    },
    methods: {
      getList() {
        queryBizModelsByPage(this.queryData).then(res => {
          this.tableData = res.data.data
          let item
          for (item of this.tableData) {
            item.createTime = dateUTCFilter(item.createTime)
            item['bizAddress'] = JSON.parse(item.bizModel)['address']
          }
        })
      },
      handleCurrentChange(val) {
        this.queryData.pageNo = val
        this.getList()
      },
      toDetail(row, target, prop) {
        if (target === 'addressDetail') {
          console.log(row)
          this.$router.push({
            path: '/' + target,
            query: { address: row.bizAddress }
          });
        }
        // this.$router.push({
        //   path: '/' + target,
        //   query: {id: row.txId, amount: row.amount, type: 'BIZ_MODEL', address: prop,tokenIssue: 'Credentials',height:row.blockHeight}
        // })
      }
    },
    mounted() {
      this.getList()
    }
  }
</script>
<style lang="scss">
  .trades-page {
    .el-form-item__label {
      line-height: 60px;
      text-align: right;
      margin-right: 15px;
    }
    input {
      height: 60px;
      width: 400px;
    }
    .trades-search {
      height: 60px;
      display: flex;
      justify-content: center;
    }
  }
  /*.trades-search {*/
    /*.el-input {*/
      /*width: 200px;*/
    /*}*/
  /*}*/
</style>
