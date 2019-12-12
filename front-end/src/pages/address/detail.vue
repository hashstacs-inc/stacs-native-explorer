<template>
  <div class="issDetail-page" v-loading="loading">
    <article class="Basic-Information">
      <el-card class="bi-box">
        <section class="tableList">
          <div
            v-for="(item, key) in BasicFormationLabel"
            :key="item.prop"
            class="bi-information"
            :style="key % 2 ? 'background-color: #F6F8FA;' : ''"
          >
            <span class="table-label">{{item.label}}</span>
            <el-select
              v-model="tokenValue"
              v-if="item.prop === 'Token'"
              @change="changeToken"
              :disabled="tokenList.length <= 1"
              :placeholder="noTokenList"
            >
              <el-option
                v-for="item in tokenList"
                :key="item.symbol"
                :label="item.label"
                :value="item.symbol"
              ></el-option>
            </el-select>
            <span v-else-if="item.prop === 'Address'">{{submitterAddress}}</span>
            <span
              v-else-if="(item.label === 'Balance' && item.prop == 0)||(item.label === 'Balance' && !item.prop)"
            >- -</span>
            <span v-else>{{item.prop}}</span>
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
              <div class="table-top">{{$t('address.transactions.totalTxns')}} {{txNum}}</div>
              <el-table :data="transactionsDate" stripe style="width: 100%">
                <template v-for="item in transactionsFrom">
                  <!-- 时间 -->
                  <el-table-column
                    :prop="item.prop"
                    :label="item.label"
                    v-if="item.prop === 'blockTime'"
                    :show-overflow-tooltip="item.showTooltip"
                    :key="item.prop"
                    :width="item.width"
                  >
                    <template slot-scope="scope">
                      <span>{{formatDate(scope.row[item.prop])}}</span>
                    </template>
                  </el-table-column>
                  <!-- 状态 -->
                  <el-table-column
                    :prop="item.prop"
                    :label="item.label"
                    v-else-if="item.prop === 'executeResult'"
                    :show-overflow-tooltip="item.showTooltip"
                    :key="item.prop"
                    :width="item.width"
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
                        {{$t('address.common.view')}}
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
                    :width="item.width"
                  >
                    <template slot-scope="scope">
                      <span
                        class="line-span-no"
                        @click="goTxIdDetails(scope.row[item.prop])"
                      >{{scope.row[item.prop]}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    :prop="item.prop"
                    :label="item.label"
                    v-else
                    :show-overflow-tooltip="item.showTooltip"
                    :key="item.prop"
                    :width="item.width"
                  ></el-table-column>
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
      <!-- v-if="tabsActiveName !== 'Credentials'" -->
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
import { queryContractList, queryTxListByPage } from "@/api";
import { dateUTCFilter } from "@/utils";
import { transferThousands } from "@/utils/signUtils";
import pagination from "@/components/pagination.vue";

export default {
  data() {
    return {
      BasicFormationLabel: [
        { label: `${this.$t("address.baseInfo.address")}`, prop: "Address" },
        { label: `${this.$t("address.baseInfo.token")}`, prop: "Token" },
        { label: `${this.$t("address.baseInfo.balance")}`, prop: "Balance" }
      ],
      tokenValue: "",
      tabsActiveName: `${this.$t("address.transactions.tabsName")}`,
      errorMessage:"",
      tokenList: [],
      noTokenList: "",
      loading: false,
      tableLoading: false,
      errorMessagedialogVisible:false,
      queryContract: {
        bdType: "assets"
      },
      queryBalance: {
        contract: "", //合约地址
        identity: "" //用户地址（对应 submitter）
      },
      queryTxList: {
        subbmiter: "",
        pageNum: 1,
        pageSize: 20
      },
      pageTotal: 0,
      txNum:0,
      transactionsDate: [],
      transactionsFrom: [
        {
          label: `${this.$t("address.transactions.txid")}`, // 交易Id
          prop: "txId",
          showTooltip: true
        },
        {
          label: `${this.$t("address.transactions.timeStamp")}`, // 时间
          prop: "blockTime",
          showTooltip: true,
          width: 170
        },
        {
          label: `${this.$t("address.transactions.bdName")}`, // BD名称
          prop: "bdName",
          showTooltip: true
        },
        {
          label: `${this.$t("address.transactions.bdType")}`, // BD类型
          prop: "bdType",
          showTooltip: true
        },
        {
          label: `${this.$t("address.transactions.functionName")}`, // 方法名称
          prop: "policyId",
          showTooltip: true
        },
        {
          label: `${this.$t("address.transactions.transactionFee")}`, // 此次BD执行交易收取的手续费金额及币种
          prop: "feeAmount",
          showTooltip: true
        },
        {
          label: `${this.$t("address.transactions.status")}`, // 交易状态
          prop: "executeResult",
          showTooltip: true,
          width: 180
        }
      ]
    };
  },
  components: {
    pagination
  },
  computed: {
    // 用户地址（对应 submitter）
    submitterAddress() {
      return this.$route.query.address;
    }
  },
  methods: {
    // 改变页数
    changePage(page) {
      this.queryTxList.pageNum = page;
      let tab = {
        label: this.tabsActiveName
      };
      this.changeTabs(tab);
    },
    // 第一页
    firstPage() {
      this.queryTxList.pageNum = 1;
      let tab = {
        label: this.tabsActiveName
      };
      this.changeTabs(tab);
    },
    // 最后一页
    lastPage(page) {
      this.queryTxList.pageNum = page;
      let tab = {
        label: this.tabsActiveName
      };
      this.changeTabs(tab);
    },
    // 上一页
    prevPage() {
      this.queryTxList.pageNum--;
      let tab = {
        label: this.tabsActiveName
      };
      this.changeTabs(tab);
    },
    // 下一页
    nextPage() {
      this.queryTxList.pageNum++;
      let tab = {
        label: this.tabsActiveName
      };
      this.changeTabs(tab);
    },
    // 改变token
    changeToken(token) {
      this.tokenList.forEach(el => {
        if (el.symbol === token) {
          this.queryBalance.contract = el.address;
        }
      });
      this.getBalance();
    },
    // 格式化时间
    formatDate(time) {
      return dateUTCFilter(time);
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
    // 切换tabs页
    changeTabs(tab) {
      if (tab.label === "Transactions") {
        this.getTransactions();
      }
    },
    // 获取合约列表列表
    async getContractList() {
      this.loading = true;
      this.queryBalance.identity = this.submitterAddress;
      let item = await queryContractList(this.queryContract);
      if (!item.data.successful) {
        this.$router.push({
          path: "/invalidSearch",
          query: { info: this.$route.query.address }
        });
      } else {
        if (item.data.data) {
          this.tokenList = JSON.parse(JSON.stringify(item.data.data.list));
          if (!this.tokenList) {
            this.tokenValue = "--";
          } else {
            this.tokenList.forEach(el => {
              el.label = el.name + "(" + el.symbol + ")";
            });
            this.tokenValue = this.tokenList[0].symbol;
            this.queryBalance.contract = this.tokenList[0].address;
            this.getBalance();
          }
          this.loading = false;
        } else {
          this.noTokenList = "- -";
          this.loading = false;
        }
      }
    },
    // 余额查询
    getBalance() {
      console.log(this.queryBalance);
    },
    // 根据address查询交易列表
    async getAddressTxList(address) {
      this.tableLoading = true;
      this.queryTxList.subbmiter = address;
      let item = await queryTxListByPage(this.queryTxList);
      if (!item.data.success) {
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
     ShowErrorInfo(errorMessage) {
      this.errorMessage = errorMessage;
      this.errorMessagedialogVisible = true;
    }
  },
  created() {
    this.getContractList();
    this.getAddressTxList(this.submitterAddress);
  }
};
</script>

<style lang="scss">
.issDetail-page {
  color: #444444;
  font-family: HelveticaNeue;
  .table-label {
    font-weight: 600;
    font-size: 14px;
    padding-left: 40px;
    width: 307px;
    padding-right: 20px;
  }
  .table-desc {
    color: #0e265b;
    cursor: pointer;
  }

  .bi-box {
    font-size: 14px;
    width: 100%;
  }
  .Basic-Information::after {
    content: "";
    clear: both;
    height: 0;
    display: block;
  }
  .Basic-Information {
    margin-bottom: 60px;
    .table-body {
      .el-tabs__item {
        padding: 20px 40px !important;
        height: auto;
        font-size: 18px;
        color: #444444;
        font-weight: 600;
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
        padding-left: 40px;
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
  }

  .bi-title {
    font-weight: 600;
    font-size: 22px;
    color: #1e3b72;
    display: flex;
    align-items: center;
    height: 66px;
    padding-left: 40px;
  }

  .bi-information {
    min-height: 60px;
    display: flex;
    align-items: center;
    .el-input__inner {
      width: 387px;
      padding-left: 12px;
    }
  }
}
</style>
