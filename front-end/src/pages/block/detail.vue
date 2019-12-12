<template>
  <div class="issDetail-page" v-loading="loading">
    <article class="block-header Basic-Information">
      <el-card class="bi-box">
        <section class="tableList">
          <div
            v-for="(item, key) in BasicFormationLabel"
            :key="item.prop"
            class="bi-information"
            :style="key % 2 ? 'background-color: #F6F8FA;' : ''"
          >
            <span class="table-label">{{item.label}}</span>
            <span
              v-if="item.prop === 'previousHash'"
              class="table-desc"
              @click="prevHeight"
            >{{BasicFormationData[item.prop]}}</span>
            <span
              v-else-if="item.prop === 'blockTime'"
            >{{formatDate(BasicFormationData[item.prop])}}</span>
            <span
              v-else-if="item.prop === 'totalTransactions'"
            >{{BasicFormationData[item.prop] ? BasicFormationData[item.prop] : 0}}</span>
            <div v-else-if="item.prop === 'height'" class="block-height">
              <el-tooltip
                class="item"
                effect="dark"
                content="View previous block"
                placement="top-end"
              >
                <div
                  class="span"
                  @click="prevHeight"
                  :class="{'max-height': BasicFormationData.height <= 1}"
                >
                  <i class="el-icon-arrow-left"></i>
                </div>
              </el-tooltip>
              <div class="con">{{BasicFormationData[item.prop]}}</div>
              <el-tooltip
                class="item"
                effect="dark"
                content="View next block"
                placement="top-start"
              >
                <div
                  class="span"
                  @click="nextHeight"
                  :class="{'max-height': BasicFormationData.height >= maxHeight}"
                >
                  <i class="el-icon-arrow-right"></i>
                </div>
              </el-tooltip>
            </div>
            <span v-else>{{BasicFormationData[item.prop]}}</span>
          </div>
        </section>
      </el-card>
    </article>
    <article class="Basic-Information">
      <el-card class="bi-box">
        <section class="table-body">
          <el-tabs v-model="tabsActiveName" @tab-click="changeTabs" v-loading="tableLoading">
            <!-- Transactions -->
            <el-tab-pane label="Transactions" name="Transactions">
              <div class="table-top">{{$t('block.transactions.totalTxns')}} {{txNum}}</div>
              <el-table :data="transactionsDate" stripe style="width: 100%">
                <template v-for="item in transactionsFrom">
                  <!-- 状态 -->
                  <el-table-column
                    :prop="item.prop"
                    :label="item.label"
                    v-if="item.prop === 'executeResult'"
                    :key="item.prop"
                  >
                    <template slot-scope="scope">
                      <span>{{scope.row.executeResult}}</span>
                      <!-- 失败显示 -->
                      <span
                        v-if="scope.row.executeResult === `${$t('common.failed')}`"
                        class="FailedStyle"
                        @click="ShowErrorInfo(scope.row.errorMessage)"
                      >
                        <img src="@/assets/img/view.png" style="margin: 0 5px;" />
                        {{$t('block.common.view')}}
                      </span>
                    </template>
                  </el-table-column>
                  <!-- txid -->
                  <el-table-column
                    :prop="item.prop"
                    :label="item.label"
                    v-else-if="item.prop === 'txId'"
                    :show-overflow-tooltip="item.showTooltip"
                    :key="item.prop"
                  >
                    <template slot-scope="scope">
                      <span
                        class="line-span-no"
                        @click="goTxIdDetails(scope.row[item.prop])"
                      >{{scope.row[item.prop]}}</span>
                    </template>
                  </el-table-column>
                  <!-- address -->
                  <el-table-column
                    :prop="item.prop"
                    :label="item.label"
                    v-else-if="item.prop === 'submitter'"
                    :show-overflow-tooltip="item.showTooltip"
                    :key="item.prop"
                  >
                    <template slot-scope="scope">
                      <span
                        v-if="scope.row[item.prop]"
                        class="line-span-no"
                        @click="goAddressDetails(scope.row[item.prop])"
                      >{{scope.row[item.prop]}}</span>
                      <span v-else>--</span>
                    </template>
                  </el-table-column>
                  <!-- feeAmount feeCurrency -->
                  <el-table-column
                    :prop="item.prop"
                    :label="item.label"
                    v-else-if="item.prop === 'feeAmount'"
                    :show-overflow-tooltip="item.showTooltip"
                    :key="item.prop"
                  >
                    <template slot-scope="scope">
                      <span v-if="scope.row[item.prop]">{{scope.row[item.prop]}}</span>
                      <span v-else>--</span>
                    </template>
                  </el-table-column>
                  <el-table-column :prop="item.prop" :label="item.label" v-else :key="item.prop">
                    <template slot-scope="scope">
                      <span v-if="scope.row[item.prop]">{{scope.row[item.prop]}}</span>
                      <span v-else>--</span>
                    </template>
                  </el-table-column>
                </template>
              </el-table>
            </el-tab-pane>
          </el-tabs>
        </section>
      </el-card>
      <!-- 分页 -->
      <pagination
        :currentPage="queryTxList.pageNum"
        :totalStrip="pageTotal"
        @nextPage="nextPage"
        @prevPage="prevPage"
        @lastPage="lastPage"
        @firstPage="firstPage"
        @changePage="changePage"
      />
    </article>
    <el-dialog
      :title="$t('common.errorInfo')"
      :visible.sync="errorMessagedialogVisible"
      width="30%"
    >
      <span>{{errorMessage}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="errorMessagedialogVisible = false"
        >{{$t('common.yesConfirm')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { queryBlockDetails, queryTxListByPage } from "@/api";
import { dateUTCFilter } from "@/utils";
import { transferThousands } from "@/utils/signUtils";
import pagination from "@/components/pagination.vue";

export default {
  data() {
    return {
      queryBlockData: {
        height: ""
      },
      queryTxList: {
        pageNum: 1,
        pageSize: 20,
        blockHeight: ""
      },
      BasicFormationLabel: [
        { label: `${this.$t("block.baseInfo.block")}`, prop: "height" },
        { label: `${this.$t("block.baseInfo.hash")}`, prop: "blockHash" },
        {
          label: `${this.$t("block.baseInfo.parentHash")}`,
          prop: "previousHash"
        },
        { label: `${this.$t("block.baseInfo.blockTime")}`, prop: "blockTime" }
      ],
      loading: false,
      tableLoading: false,
      maxHeight: 0,
      pageTotal: 0,
      txNum: 0,
      errorMessage: "",
      errorMessagedialogVisible: false,
      tabsActiveName: `${this.$t("block.transactions.tabsName")}`,
      BasicFormationData: {},
      transactionsFrom: [
        {
          label: `${this.$t("block.transactions.txid")}`, // 交易Id
          prop: "txId",
          showTooltip: true
        },
        {
          label: `${this.$t("block.transactions.operationAddress")}`, // submitter 交易发起者
          prop: "submitter",
          showTooltip: true
        },
        {
          label: `${this.$t("block.transactions.bdName")}`, // bd名称
          prop: "bdName"
        },
        {
          label: `${this.$t("block.transactions.bdType")}`, // bd类型
          prop: "bdType"
        },
        {
          label: `${this.$t("block.transactions.functionName")}`, // 功能名称
          prop: "policyId"
        },
        {
          label: `${this.$t("block.transactions.transactionFee")}`, // 实际手续费
          prop: "feeAmount",
          showTooltip: true
        },
        {
          label: `${this.$t("block.transactions.status")}`, // 交易状态
          prop: "executeResult"
        }
      ],
      transactionsDate: []
    };
  },
  computed: {
    blockHeight() {
      return this.$route.query.height;
    }
  },
  components: {
    pagination
  },
  inject: ["reload"],
  methods: {
    // 下一页
    nextPage() {
      this.queryData.pageNum++;
      let tab = {
        label: this.tabsActiveName
      };
      this.changeTabs(tab);
    },
    // 上一页
    prevPage() {
      this.queryData.pageNum--;
      let tab = {
        label: this.tabsActiveName
      };
      this.changeTabs(tab);
    },
    // 最后一页
    lastPage(page) {
      this.queryData.pageNum = page;
      let tab = {
        label: this.tabsActiveName
      };
      this.changeTabs(tab);
    },
    // 第一页
    firstPage() {
      this.queryData.pageNum = 1;
      let tab = {
        label: this.tabsActiveName
      };
      this.changeTabs(tab);
    },
    // 上一个高度
    prevHeight() {
      if (this.BasicFormationData.height <= 1) {
        return;
      }
      let tab = {
        label: this.tabsActiveName
      };
      this.BasicFormationData.height--;
      let href = window.location.href.split("?");
      if (href[1].indexOf("height") !== -1) {
        history.pushState(
          "",
          "",
          href[0] + "?" + "height=" + this.BasicFormationData.height
        );
      }
      this.changeTabs(tab, this.BasicFormationData.height);
    },
    // 下一个高度
    nextHeight() {
      if (this.BasicFormationData.height >= this.maxHeight) {
        return;
      }
      let tab = {
        label: this.tabsActiveName
      };
      this.BasicFormationData.height++;
      let href = window.location.href.split("?");
      if (href[1].indexOf("height") !== -1) {
        history.pushState(
          "",
          "",
          href[0] + "?" + "height=" + this.BasicFormationData.height
        );
      }
      this.changeTabs(tab, this.BasicFormationData.height);
    },
    // 改变页数
    changePage(page) {
      this.queryData.pageNum = page;
      let tab = {
        label: this.tabsActiveName
      };
      this.changeTabs(tab);
    },
    // 获取block详情数据
    async getBlockData(block) {
      this.loading = true;
      this.queryBlockData.height = block;
      let item = await queryBlockDetails(this.queryBlockData);
      if (!item.data.successful) {
        this.$router.push({
          path: "/invalidSearch",
          query: { info: this.$route.query.height }
        });
      } else {
        this.BasicFormationData = JSON.parse(JSON.stringify(item.data.data));
        console.log(this.BasicFormationData);
        this.maxHeight = item.data.data.maxHeight;
        this.loading = false;
      }
    },
    // 获取block下的交易列表
    async getBlockTxList(block) {
      this.tableLoading = true;
      this.queryTxList.blockHeight = block;
      let item = await queryTxListByPage(this.queryTxList);
      if (!item.data.successful) {
        this.$router.push({
          path: "/invalidSearch",
          query: { info: this.$route.query.height }
        });
      } else {
        this.transactionsDate = JSON.parse(JSON.stringify(item.data.data.list));
        this.transactionsDate.forEach(el => {
          if (el.feeAmount) {
            el.feeAmount = transferThousands(el.feeAmount) + el.feeCurrency;
          }
          if (el.executeResult === "1") {
            el.executeResult = `${this.$t("common.success")}`;
          } else {
            el.executeResult = `${this.$t("common.failed")}`;
          }
        });
        this.pageTotal = item.data.data.total;
        this.txNum = transferThousands(this.pageTotal);
        this.tableLoading = false;
      }
    },
    // 点击地址
    goAddressDetails(address) {
      this.$router.push({
        path: "/addressDetail",
        name: "addressDetail",
        query: {
          address
        }
      });
    },
    // 格式化时间
    formatDate(time) {
      return dateUTCFilter(Number(time));
    },
    // 点击TXid
    goTxIdDetails(txid) {
      this.$router.push({
        path: "/txidDetails",
        query: {
          id: txid
        }
      });
    },
    changeTabs(tab, block) {
      if (typeof block === "string" || typeof block === "number") {
        if (tab.label === "Transactions") {
          this.getBlockTxList(block);
        }
      } else {
        if (tab.label === "Transactions") {
          this.getBlockTxList(this.BasicFormationData.blockHeight);
        }
      }
    },
    ShowErrorInfo(errorMessage) {
      this.errorMessage = errorMessage;
      this.errorMessagedialogVisible = true;
    }
  },
  created() {
    this.getBlockData(this.blockHeight);
    this.getBlockTxList(this.blockHeight);
  }
};
</script>

<style lang="scss">
.issDetail-page {
  color: #444444;
  font-family: HelveticaNeue;
  .block-height {
    border: 1px solid #e9e9e9;
    text-align: center;
    line-height: 36px;
    .span {
      width: 36px;
      height: 36px;
      cursor: pointer;
      float: left;
      i {
        color: #0e265b;
      }
    }
    .max-height {
      cursor: no-drop;
      background-color: rgb(246, 246, 246);
      i {
        color: #ccc;
      }
    }
    .con {
      float: left;
      width: 52px;
      height: 36px;
      border-right: 1px solid #e9e9e9;
      border-left: 1px solid #e9e9e9;
    }
  }
  .table-body {
    .el-tabs__item {
      padding: 20px 40px !important;
      height: auto;
      font-size: 18px;
      color: #444444;
      font-weight: 600;
    }
    .el-tabs__header {
      margin: 0;
    }
    .el-tabs__active-bar {
      background-color: #0e265b;
      height: 3px;
    }
    .table-top {
      width: 100%;
      height: 40px;
      background-color: #f7faff;
      box-sizing: border-box;
      padding: 0 40px;
      line-height: 40px;
      color: #0e265b;
    }
    .line-span {
      display: inline-block;
      max-width: 140px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .line-span-no {
      display: inline-block;
      max-width: 140px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      padding-top: 7px;
    }
  }
  .table-label {
    font-weight: 600;
    font-size: 14px;
    padding-left: 40px;
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
  .Basic-Information::after {
    content: "";
    display: block;
    clear: both;
    height: 0;
  }

  .bi-title {
    font-weight: 600;
    font-size: 22px;
    color: #1e3b72;
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
}
</style>
