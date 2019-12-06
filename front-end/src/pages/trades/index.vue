<template>
  <div class="trades-page">
    <article class="trades-search">
      <el-form :inline="true">
        <el-form-item>
          <el-input placeholder="Please enter Transaction ID" v-model="tasQueryData.txId">
            <span slot="prefix" class="el-input__icon el-icon-search" :size="24"></span>
          </el-input>
        </el-form-item>
        <el-form-item>
          <mu-button style="width: 128px;height: 60px;background-color: #183a78;color: white"
                     @click="queryTxsByPage('search')">Search
          </mu-button>
        </el-form-item>
      </el-form>
    </article>
    <article class="trades-formation">
      <el-card>
        <el-table :data="tableData" stripe style="width: 100%" :header-cell-style="{background:'#fbfbfb'}">
          <el-table-column :prop="item.prop" :label="item.label" :width="item.width" v-for='item in tasTableDesc'
                           :key="item.prop" show-overflow-tooltip>
            <template slot-scope="scope">
              <template v-if="item.prop === 'executeResult' && (scope.row.status === '0')">
                <span>{{scope.row[item.prop]}}</span>
                <el-button type="text" @click="showDialog(scope.row['errorMessage'],item.label)">
                  <img src="../../assets/img/view.png" style="margin-right: 5px">View
                </el-button>
              </template>
              <template v-else>
                <el-button type="text" v-if="item.template" @click="showDialog(scope.row[item.prop],item.label)">
                  <img src="../../assets/img/view.png" style="margin-right: 5px">View
                </el-button>
                <a type="text" v-else-if="item.isA">{{scope.row[item.prop]}}</a>
                <span v-else>{{scope.row[item.prop]}}</span>
              </template>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <el-pagination background layout="prev, next" @current-change="handleCurrentChange"
                     style="margin: 60px 0 60px 0;display: flex;justify-content: flex-end">
      </el-pagination>
    </article>
    <el-dialog
      :visible.sync="dialogVisible"
      width="40%">
      <span><pre>{{codeMessage}}</pre></span>
      <div slot="title" class="dialog-title">
        <span style="font-weight: 600;font-size: 18px;color: #1E3B72;">{{dialogTitle}}</span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {queryTxsByPage} from '@/api'
import { dateUTCFilter } from '../../utils'

export default {
  computed: {
    ...mapGetters([
      'tasQueryData',
      'tasTableDesc',
      'transactionStatus'
    ])
  },
  data () {
    return {
      dialogTitle: '',
      dialogVisible: false,
      tableData: [],
      codeMessage: '',
    }
  },
  methods: {
    handleCurrentChange (val) {
      this.tasQueryData.pageNo = val
      this.queryTxsByPage()
    },
    showDialog (code, label) {
      this.dialogTitle = label + ' list'
      label !== 'Action' ? this.dialogTitle = label : this.dialogTitle = label + ' list'
      this.dialogVisible = true
      this.codeMessage = code
    },
    queryTxsByPage (type) {
      queryTxsByPage(this.tasQueryData).then(res => {
        if (type === 'search' && !res.data.data) {
          this.$router.push('invalidSearch')
        } else {
          this.tableData = res.data.data
          let item
          for (item of this.tableData) {
            item.blockTime = dateUTCFilter(item.blockTime);
            item.status = item.executeResult; // 当前状态值
            item.executeResult = this.transactionStatus[item.executeResult]
          }
        }
      })
    }
  },
  mounted () {
    this.tasQueryData.blockHeight = this.$route.query.height
    this.tasQueryData.pageNo = 1
    this.queryTxsByPage()
  },
  beforeDestroy () {
    this.tasQueryData.pageNo = 1
    this.tasQueryData.txId = ''
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
