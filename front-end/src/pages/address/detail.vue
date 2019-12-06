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
                :key="item.currency"
                :label="item.label"
                :value="item.currency"
              ></el-option>
            </el-select>
            <span v-else-if="item.prop === 'Address'">{{addressId}}</span>
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
          <el-tabs v-model="tabsActiveName" @tab-click="changeTabs">
            <!-- Transactions -->
            <el-tab-pane label="Transactions" name="Transactions">
              <div class="table-top">A total of {{pageTotal}} records found</div>
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
                    v-else-if="item.prop === 'status'"
                    :show-overflow-tooltip="item.showTooltip"
                    :key="item.prop"
                    :width="item.width"
                  >
                    <template slot-scope="scope">
                      <span>{{scope.row.status}}</span>
                      <!-- 失败显示 -->
                      <span
                        v-if="scope.row.status === 'Failed'"
                        class="FailedStyle"
                        @click="ShowErrorInfo(scope.row.txId)"
                      >
                        <img src="@/assets/img/view.png" style="margin: 0 5px;" />View
                      </span>
                    </template>
                  </el-table-column>
                  <!-- From 和 To-->
                  <el-table-column
                    :prop="item.prop"
                    :label="item.label"
                    v-else-if="item.prop === 'fromAddress' || item.prop === 'toAddress'"
                    :show-overflow-tooltip="item.showTooltip"
                    :key="item.prop"
                    :width="item.width"
                  >
                    <template slot-scope="scope">
                      <span
                        class="line-span-no"
                        v-if="scope.row[item.prop] !== addressId"
                        @click="goAddressDetails(scope.row[item.prop], scope.row.currency)"
                      >{{scope.row[item.prop]}}</span>
                      <span class="line-span" v-else>{{scope.row[item.prop]}}</span>
                    </template>
                  </el-table-column>
                  <!-- block -->
                  <el-table-column
                    :prop="item.prop"
                    :label="item.label"
                    v-else-if="item.prop === 'blockHeight'"
                    :show-overflow-tooltip="item.showTooltip"
                    :key="item.prop"
                  >
                    <template slot-scope="scope">
                      <span
                        class="line-span-no"
                        @click="goBlockDetails(scope.row[item.prop])"
                      >{{scope.row[item.prop]}}</span>
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
                  <!-- amount -->
                  <el-table-column
                    :prop="item.prop"
                    :label="item.label"
                    v-else-if="item.prop === 'amount'"
                    :show-overflow-tooltip="item.showTooltip"
                    :key="item.prop"
                  >
                    <template slot-scope="scope">
                      <span>{{scope.row[item.prop]}}</span>
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
            <!-- Issuance -->
            <el-tab-pane label="Issuance" name="Issuance">
              <el-table :data="issuanceDate" stripe style="width: 100%">
                <template v-for="item in issuanceFrom">
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
                    v-else-if="item.prop === 'status'"
                    :show-overflow-tooltip="item.showTooltip"
                    :key="item.prop"
                    :width="item.width"
                  >
                    <template slot-scope="scope">
                      <span>{{scope.row.status}}</span>
                      <!-- 失败显示 -->
                      <span
                        v-if="scope.row.status === 'Failed'"
                        class="FailedStyle"
                        @click="ShowErrorInfo(scope.row.txId)"
                      >
                        <img src="@/assets/img/view.png" style="margin: 0 5px;" />View
                      </span>
                    </template>
                  </el-table-column>
                  <!-- block -->
                  <el-table-column
                    :prop="item.prop"
                    :label="item.label"
                    v-else-if="item.prop === 'blockHeight'"
                    :show-overflow-tooltip="item.showTooltip"
                    :key="item.prop"
                    :width="item.width"
                  >
                    <template slot-scope="scope">
                      <span
                        class="line-span-no"
                        @click="goBlockDetails(scope.row[item.prop])"
                      >{{scope.row[item.prop]}}</span>
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
                  <!-- amount -->
                  <el-table-column
                    :prop="item.prop"
                    :label="item.label"
                    v-else-if="item.prop === 'amount'"
                    :show-overflow-tooltip="item.showTooltip"
                    :key="item.prop"
                    :width="item.width"
                  >
                    <template slot-scope="scope">
                      <span>{{scope.row[item.prop]}}</span>
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
            <!-- Credentials -->
            <el-tab-pane label="Credentials" name="Credentials">
              <section v-if="credentialsBase.length>0">
                <article class="Basic-Information" v-for="(v, k) in credentialsBase" :key="k">
                  <el-card class="bi-box">
                    <header class="bi-title">Basic Information</header>
                    <hr />
                    <section class="base-box">
                      <div
                        class="bi-information"
                        v-for="(val, key) in baseFormationLabel"
                        :key="key"
                      >
                        <span class="table-label">{{val.label}}</span>
                        <span
                          class="table-desc"
                          v-if="val.prop === 'blockHeight'"
                          @click="goBlockDetails(v[val.prop])"
                        >{{v[val.prop]}}</span>
                        <span
                          class="table-desc"
                          v-else-if="val.prop === 'txId'"
                          @click="goTxIdDetails(v[val.prop])"
                        >{{v[val.prop]}}</span>
                        <!-- <span
                        class="table-desc"
                        v-else-if="val.prop === 'address'"
                        @click="goAddressDetails(v[val.prop], tokenValue)"
                        >{{v[val.prop]}}</span>-->
                        <span v-else-if="val.prop === 'createTime'">{{formatDate(v[val.prop])}}</span>
                        <span style="font-weight: 500" v-else>{{v[val.prop]}}</span>
                        <template>
                          <el-button
                            type="text"
                            class="error-area"
                            v-if="val.label === 'Status' && v[val.prop] === 'Failed'"
                            @click="ShowErrorInfo(scope.row.txId)"
                          >
                            <img src="../../assets/img/view.png" style="margin-right: 5px" />View
                          </el-button>
                        </template>
                      </div>
                    </section>
                  </el-card>
                </article>
                <el-card class="bi-box" style="margin-top:20px;">
                  <header class="bi-title">Credentials Information</header>
                  <hr />
                  <section class="base-box">
                    <div
                      class="bi-information"
                      v-for="(val, key) in credentialsFormationLabel"
                      :key="key"
                    >
                      <span class="table-label">{{val.label}}</span>
                      <span style="font-weight: 500">{{credentialsData[val.prop]}}</span>
                      <template>
                        <el-button
                          type="text"
                          class="error-area"
                          v-if="val.label === 'Status' && v[val.prop] === 'Failed'"
                          @click="ShowErrorInfo(scope.row.txId)"
                        >
                          <img src="../../assets/img/view.png" style="margin-right: 5px" />View
                        </el-button>
                      </template>
                    </div>
                  </section>
                </el-card>
              </section>
              <section v-else class="el-table__empty-block"><span class="el-table__empty-text">No Data</span></section>
            </el-tab-pane>
          </el-tabs>
        </section>
      </el-card>
      <!-- 分页 -->
      <pagination
        :currentPage="repData.pageNo"
        :totalStrip="pageTotal"
        @nextPage="nextPage"
        @prevPage="prevPage"
        @lastPage="lastPage"
        @firstPage="firstPage"
        @changePage="changePage"
        v-if="tabsActiveName !== 'Credentials'"
      />
    </article>
    <!-- <div style="width: 100%;display: flex;justify-content: center">
      <mu-button class="primary-button" style='background-color:#183A78;color: white' @click="$router.go(-1)">Return
      </mu-button>
    </div>-->
  </div>
</template>

<script>
import {
  queryTransactionsDetails,
  queryIssuesDetails,
  queryBizModelsByPage
} from "@/api";
import { dateUTCFilter } from "@/utils";
import { convertNum } from "@/utils/signUtils";
import pagination from "@/components/pagination.vue";

export default {
  data() {
    return {
      BasicFormationLabel: [
        { label: "Address", prop: "Address" },
        { label: "Token", prop: "Token" },
        { label: "Balance", prop: "Balance" }
      ],
      tokenValue: "",
      tabsActiveName: "Transactions",
      tokenList: [],
      noTokenList: "",
      loading: false,
      repData: {
        address: "",
        // currency: '',
        pageNo: 1,
        pageSize: 20
      },
      pageTotal: 0,
      transactionsDate: [],
      transactionsFrom: [
        {
          label: "TX ID", // 交易Id
          prop: "txId",
          showTooltip: true
        },
        {
          label: "Time Stamp+UTC", // 时间
          prop: "blockTime",
          showTooltip: true,
          width:170
        },
        {
          label: "From", // 交易转出地址
          prop: "fromAddress",
          showTooltip: true
        },
        {
          label: "To", // 交易接收地址
          prop: "toAddress",
          showTooltip: true
        },
        {
          label: "Amount", // 交易数量
          prop: "amount",
          showTooltip: true
        },
        {
          label: "Type", // 交易token类型
          prop: "bizType",
          showTooltip: true
        },
        {
          label: "Block", // 区块高度
          prop: "blockHeight",
          showTooltip: true
        },
        {
          label: "Status", // 交易状态
          prop: "status",
          showTooltip: true,
          width: 180
        }
      ],
      issuanceFrom: [
        {
          label: "TX ID", // 交易Id
          prop: "txId",
          showTooltip: true
        },
        {
          label: "Time Stamp+UTC", // 时间
          prop: "blockTime",
          showTooltip: true,
          width:170
        },
        {
          label: "Operation Address", // 操作人地址
          prop: "issueAddr",
          showTooltip: true,
           width:170
        },
        {
          label: "Owner Address", // Token地址
          prop: "ownerAddr",
          showTooltip: true,
           width:150
        },
        {
          label: "Amount", // 金额
          prop: "amount",
          showTooltip: true
        },
        {
          label: "Type", // 类型
          prop: "type",
          showTooltip: true
        },
        {
          label: "Issuer", // Issuer
          prop: "issuer",
          showTooltip: true
        },
        {
          label: "Approval Authority", // 发行机构
          prop: "agency",
          showTooltip: true,
          width:170
        },
        {
          label: "Block", // 区块高度
          prop: "blockHeight",
          showTooltip: true
        },
        {
          label: "Status", // 状态
          prop: "status",
          showTooltip: true
        }
      ],
      issuanceDate: [],
      credentialsBase: [],
      baseFormationLabel: [
        { label: "TX ID", prop: "txId" },
        { label: "Transaction Requestor", prop: "address" },
        { label: "Status", prop: "status" },
        { label: "Type", prop: "type" },
        { label: "Blcok", prop: "blockHeight" },
        { label: "Time Stamp +UTC", prop: "createTime" }
      ],
      credentialsFormationLabel: [
        { label: "User's Nationality", prop: "countries" },
        { label: "Country of Residence", prop: "residence" },
        { label: "KYC Institution", prop: "kyc_source_name" },
        { label: "Type of lnvestor", prop: "invest_type" },
        { label: "Address", prop: "address" }
      ],
      credentialsData: {}
    };
  },
  components: {
    pagination
  },
  computed: {
    // 地址ID
    addressId() {
      return this.$route.query.address;
    },
    // TokenId
    currencyToken() {
      return this.$route.query.token;
    }
  },
  methods: {
    returnConvertNum(num) {
      return convertNum(num);
    },
    // 改变页数
    changePage(page) {
      this.repData.pageNo = page;
      let tab = {
        label: this.tabsActiveName
      };
      this.changeTabs(tab);
    },
    // 第一页
    firstPage() {
      this.repData.pageNo = 1;
      let tab = {
        label: this.tabsActiveName
      };
      this.changeTabs(tab);
    },
    // 最后一页
    lastPage(page) {
      this.repData.pageNo = page;
      let tab = {
        label: this.tabsActiveName
      };
      this.changeTabs(tab);
    },
    // 上一页
    prevPage() {
      this.repData.pageNo--;
      let tab = {
        label: this.tabsActiveName
      };
      this.changeTabs(tab);
    },
    // 下一页
    nextPage() {
      this.repData.pageNo++;
      let tab = {
        label: this.tabsActiveName
      };
      this.changeTabs(tab);
    },
    // 改变token
    changeToken(token) {
      this.repData.pageNo = 1;
      this.goAddressDetails(this.addressId, token);
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
    // 点击block
    goBlockDetails(block) {
      this.$router.push({
        path: "/blockDetail",
        query: {
          height: block
        }
      });
    },
    // 切换tabs页
    changeTabs(tab) {
      if (tab.label === "Transactions") {
        this.getTransactions();
      } else if (tab.label === "Issuance") {
        this.getIssues();
      } else {
        this.getBizModels();
      }
    },
    // 点击地址
    goAddressDetails(address, token) {
      this.$router.push({
        path: "/addressDetail",
        name: "addressDetail",
        query: {
          address,
          token
        }
      });
      this.tabsActiveName = "Transactions";
      let tab = {
        label: this.tabsActiveName
      };
      this.changeTabs(tab);
    },
    // 获取Transactions信息
    async getTransactions() {
      this.loading = true;
      this.repData.address = this.addressId;
      if (this.tokenValue) {
        this.repData.currency = this.tokenValue;
      }
      let item = await queryTransactionsDetails(this.repData);
      if (!item.data.success) {
        this.$router.push({
          path: "/invalidSearch",
          query: { info: this.$route.query.address }
        });
      } else {
        if (item.data.data) {
          this.transactionsDate = JSON.parse(
            JSON.stringify(item.data.data.pageList)
          );
          if (this.transactionsDate) {
            this.transactionsDate.forEach(el => {
              el.status =
                el.status.charAt(0).toUpperCase() +
                el.status.slice(1).toLowerCase();
            });
          }
          this.tokenList = JSON.parse(JSON.stringify(item.data.data.tokens));
          if (!this.tokenList) {
            this.tokenList = [];
          }
          this.tokenList.forEach(el => {
            el.label = el.currencyName + "(" + el.currency + ")";
          });
          if (item.data.data.currency) {
            this.tokenValue = item.data.data.currency;
          } else {
            this.tokenValue = "--";
          }
          this.pageTotal = item.data.data.total;
          this.BasicFormationLabel.filter(v => v.label === "Balance")[0].prop =
            item.data.data.balance;
          this.loading = false;
        } else {
          this.BasicFormationLabel.filter(
            v => v.label === "Balance"
          )[0].prop = null;
          this.noTokenList = "- -";
          this.loading = false;
        }
      }
    },
    // 获取issues信息
    async getIssues() {
      this.loading = true;
      this.repData.address = this.addressId;
      if (this.tokenValue) {
        this.repData.currency = this.tokenValue;
      }
      let item = await queryIssuesDetails(this.repData);
      if (!item.data.success) {
        this.$router.push({
          path: "/invalidSearch",
          query: { info: this.$route.query.address }
        });
      } else {
        if (item.data.data) {
          this.issuanceDate = JSON.parse(
            JSON.stringify(item.data.data.pageList)
          );
          if (this.issuanceDate) {
            this.issuanceDate.forEach(el => {
              el.status =
                el.status.charAt(0).toUpperCase() +
                el.status.slice(1).toLowerCase();
            });
          }
          this.tokenList = JSON.parse(JSON.stringify(item.data.data.tokens));
          if (!this.tokenList) {
            this.tokenList = [];
          }
          this.tokenList.forEach(el => {
            el.label = el.currencyName + "(" + el.currency + ")";
          });
          if (item.data.data.currency) {
            this.tokenValue = item.data.data.currency;
          } else {
            this.tokenValue = "--";
          }
          this.pageTotal = item.data.data.total;
          this.BasicFormationLabel.filter(v => v.label === "Balance")[0].prop =
            item.data.data.balance;
          this.loading = false;
        } else {
          this.BasicFormationLabel.filter(
            v => v.label === "Balance"
          )[0].prop = null;
          this.noTokenList = "- -";
          this.loading = false;
        }
      }
    },
    // 获取存证信息
    async getBizModels() {
      this.loading = true;
      this.repData.address = this.addressId;
      if (this.tokenValue) {
        this.repData.currency = this.tokenValue;
      }
      let item = await queryBizModelsByPage(this.repData);
      if (!item.data.success) {
        this.$router.push({
          path: "/invalidSearch",
          query: { info: this.$route.query.address }
        });
      } else {
        this.credentialsBase = JSON.parse(JSON.stringify(item.data.data));
        if (this.credentialsBase&&this.credentialsBase.length>0) {
          this.credentialsData = JSON.parse(this.credentialsBase[0].bizModel);
          this.loading = false;
          this.credentialsBase[0].status =
            this.credentialsBase[0].status.charAt(0).toUpperCase() +
            this.credentialsBase[0].status.slice(1).toLowerCase();
        } else {
          this.credentialsBase = [];
          this.credentialsData = {};
          this.loading = false;
        }
      }
    }
  },
  created() {
    this.tokenValue = this.currencyToken;
    this.getTransactions();
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
    color: #0E265B;
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
        background-color: #0E265B;
        height: 3px;
      }
      .table-top {
        width: 100%;
        height: 40px;
        background-color: #f7faff;
        box-sizing: border-box;
        padding-left: 40px;
        line-height: 40px;
        color: #0E265B;
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
