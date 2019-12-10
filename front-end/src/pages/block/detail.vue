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
              v-if="item.prop === 'parentHash'"
              class="table-desc"
              @click="prevHeight"
            >{{BasicFormationData[item.prop]}}</span>
            <span
              v-else-if="item.prop === 'blockTime'"
            >{{formatDate(BasicFormationData[item.prop])}}</span>
            <span
              v-else-if="item.prop === 'totalTransactions'"
            >{{BasicFormationData[item.prop] ? BasicFormationData[item.prop] : 0}}</span>
            <div v-else-if="item.prop === 'blockHeight'" class="block-height">
              <el-tooltip
                class="item"
                effect="dark"
                content="View previous block"
                placement="top-end"
              >
                <div
                  class="span"
                  @click="prevHeight"
                  :class="{'max-height': BasicFormationData.blockHeight <= 1}"
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
                  :class="{'max-height': BasicFormationData.blockHeight >= maxHeight}"
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
          <el-tabs v-model="tabsActiveName" @tab-click="changeTabs">
            <!-- Transactions -->
            <el-tab-pane label="Transactions" name="Transactions">
              <div class="table-top">{{$t('block.transactions.totalTxns')}} {{pageTotal}}</div>
              <el-table :data="transactionsDate" stripe style="width: 100%">
                <template v-for="item in transactionsFrom">
                  <!-- 状态 -->
                  <el-table-column
                    :prop="item.prop"
                    :label="item.label"
                    v-if="item.prop === 'status'"
                    :show-overflow-tooltip="item.showTooltip"
                    :key="item.prop"
                  >
                    <template slot-scope="scope">
                      <span>{{scope.row.status}}</span>
                      <!-- 失败显示 -->
                      <span
                        v-if="scope.row.status === 'Failed'"
                        class="FailedStyle"
                        @click="ShowErrorInfo(scope.row.txId)"
                      >
                        <img src="@/assets/img/view.png" style="margin: 0 5px;" />{{$t('block.common.view')}}
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
                        class="line-span-no"
                        @click="goAddressDetails(scope.row[item.prop])"
                      >{{scope.row[item.prop]}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    :prop="item.prop"
                    :label="item.label"
                    v-else
                    :show-overflow-tooltip="item.showTooltip"
                    :key="item.prop"
                  ></el-table-column>
                </template>
              </el-table>
            </el-tab-pane>
          </el-tabs>
        </section>
      </el-card>
      <!-- 分页 -->
      <pagination
        :currentPage="queryData.pageNo"
        :totalStrip="pageTotal"
        @nextPage="nextPage"
        @prevPage="prevPage"
        @lastPage="lastPage"
        @firstPage="firstPage"
        @changePage="changePage"
      />
    </article>
  </div>
</template>

<script>
import {queryBlockListByPage } from "@/api";
import { dateUTCFilter } from "@/utils";
import { convertNum, transferThousands } from "@/utils/signUtils";
import pagination from "@/components/pagination.vue";

export default {
  data() {
    return {
      queryData: {
        pageNo: 1,
        pageSize: 20,
        blockHeight: ""
      },
      BasicFormationLabel: [
        { label: `${this.$t("block.baseInfo.block")}`, prop: "blockHeight" },
        { label: `${this.$t("block.baseInfo.hash")}`, prop: "blockHash" },
        { label: `${this.$t("block.baseInfo.parentHash")}`, prop: "parentHash" },
        { label: `${this.$t("block.baseInfo.blockTime")}`, prop: "blockTime" }
      ],
      loading: false,
      maxHeight: 0,
      pageTotal: 0,
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
          prop: "bdName",
          showTooltip: true
        },
        {
          label: `${this.$t("block.transactions.bdType")}`, // bd类型
          prop: "bdType",
          showTooltip: true
        },
        {
          label: `${this.$t("block.transactions.functionName")}`, // 功能名称
          prop: "policyId",
          showTooltip: true
        },
        {
          label: `${this.$t("block.transactions.transactionFee")}`, // 实际手续费
          prop: "feeAmount",
          showTooltip: true
        },
        {
          label: `${this.$t("block.transactions.status")}`, // 交易状态
          prop: "executeResult",
          showTooltip: true
        }
      ],
      transactionsDate: [],
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
    returnConvertNum(num) {
      return convertNum(num);
    },
    // 下一页
    nextPage() {
      this.queryData.pageNo++;
      let tab = {
        label: this.tabsActiveName
      };
      this.changeTabs(tab);
    },
    // 上一页
    prevPage() {
      this.queryData.pageNo--;
      let tab = {
        label: this.tabsActiveName
      };
      this.changeTabs(tab);
    },
    // 最后一页
    lastPage(page) {
      this.queryData.pageNo = page;
      let tab = {
        label: this.tabsActiveName
      };
      this.changeTabs(tab);
    },
    // 第一页
    firstPage() {
      this.queryData.pageNo = 1;
      let tab = {
        label: this.tabsActiveName
      };
      this.changeTabs(tab);
    },
    // 上一个高度
    prevHeight() {
      if (this.BasicFormationData.blockHeight <= 1) {
        return;
      }
      let tab = {
        label: this.tabsActiveName
      };
      this.BasicFormationData.blockHeight--;
      let href = window.location.href.split("?");
      if (href[1].indexOf("height") !== -1) {
        history.pushState(
          "",
          "",
          href[0] + "?" + "height=" + this.BasicFormationData.blockHeight
        );
      }
      this.changeTabs(tab, this.BasicFormationData.blockHeight);
    },
    // 下一个高度
    nextHeight() {
      if (this.BasicFormationData.blockHeight >= this.maxHeight) {
        return;
      }
      let tab = {
        label: this.tabsActiveName
      };
      this.BasicFormationData.blockHeight++;
      let href = window.location.href.split("?");
      if (href[1].indexOf("height") !== -1) {
        history.pushState(
          "",
          "",
          href[0] + "?" + "height=" + this.BasicFormationData.blockHeight
        );
      }
      this.changeTabs(tab, this.BasicFormationData.blockHeight);
    },
    // 改变页数
    changePage(page) {
      this.queryData.pageNo = page;
      let tab = {
        label: this.tabsActiveName
      };
      this.changeTabs(tab);
    },
    // 获取Transactions数据
    async getBlockTransactions(block) {
      this.loading = true;
      this.queryData.blockHeight = block;
      let item = await queryBlockListByPage(this.queryData);
      if (!item.data.success) {
        this.$router.push({
          path: "/invalidSearch",
          query: { info: this.$route.query.height }
        });
      } else {
        this.BasicFormationData = JSON.parse(JSON.stringify(item.data.data));
        this.transactionsDate = JSON.parse(
          JSON.stringify(item.data.data.pageList)
        );
        if (this.transactionsDate) {
          this.transactionsDate.forEach(el => {
            el.executeResult =
              el.executeResult.charAt(0).toUpperCase() +
              el.executeResult.slice(1).toLowerCase();
            el.feeAmount =  transferThousands(el.feeAmount);
          });
        }
        this.pageTotal = transferThousands(item.data.data.total);
        this.maxHeight = item.data.data.maxHeight;
        this.loading = false;
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
    changeTabs(tab, block) {
      if (typeof block === "string" || typeof block === "number") {
        if (tab.label === "Transactions") {
          this.getBlockTransactions(block);
        }
      } else {
        if (tab.label === "Transactions") {
          this.getBlockTransactions(this.BasicFormationData.blockHeight);
        } 
      }
    }
  },
  created() {
    this.getBlockTransactions(this.blockHeight);
  }
};
</script>

<style lang="scss">
.issDetail-page {
  color: #444444;
  font-family: HelveticaNeue;
  * {
    padding: 0;
    margin: 0;
  }
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
        color: #0E265B;
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
