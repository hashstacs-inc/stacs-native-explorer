<template>
  <div class="txIdDetail-page" v-loading="loading">
    <!-- BasicInfo -->
    <article class="Basic-Information">
      <el-card class="bi-box">
        <section class="tableList">
          <div v-for="item in BasicInfoLabel" :key="item.prop" class="bi-information">
            <span class="table-label">{{item.label}}</span>
            <a
              class="on-click"
              v-if="item.isTo&&BasicInfo[item.prop]"
              @click="toDetail(item.target,BasicInfo[item.prop])"
            >{{BasicInfo[item.prop]}}</a>
            <div v-else-if="item.prop === 'actionDatas'" class="action-data">
              <div v-for="(val, key) in inputData" :key="key" class="action-box">
                <ul class="action-box-ul-outside">
                  <li v-for="(v, k) in val" :key="k" :class="k==='sourCode' ? 'sourCodeLi':''">
                    <span>{{k}}:</span>
                    <span v-if="k==='sourCode'">
                      <ul class="action-box-ul-inside">
                        <li
                          v-for="(sourCodeV,sourCodeK) in v"
                          :key="sourCodeK"
                          v-show="sourCodeV!==''"
                        >
                          <span>{{sourCodeK+1}}</span>
                          <span>{{sourCodeV}}</span>
                        </li>
                      </ul>
                    </span>
                    <!-- <span v-else-if="k==='args'">
                      <ul class="action-box-ul-inside">
                        <li
                          v-for="(sourCodeV,sourCodeK) in v"
                          :key="sourCodeK"
                        >
                          <span>{{sourCodeK+1}}</span>
                          <span>{{sourCodeV}}</span>
                        </li>
                      </ul>
                    </span> -->
                    <span v-else>
                      <span v-if="v">{{v}}</span>
                      <span v-else>- -</span>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <span
              v-else-if="item.isTo&&!BasicInfo[item.prop] || !BasicInfo[item.prop] || BasicInfo[item.prop]===null"
              style="font-weight: 500"
            >- -</span>
            <span v-else style="font-weight: 500">{{BasicInfo[item.prop]}}</span>
          </div>
        </section>
      </el-card>
    </article>
  </div>
</template>
<script>
import { queryTxDetails } from "@/api";
import { dateUTCFilter } from "@/utils";
import { transferThousands } from "@/utils/signUtils";

export default {
  data() {
    return {
      showTooltip: true,
      loading: false,
      BasicInfoLabel: [
        { label: `${this.$t("tx.baseInfo.txID")}`, prop: "txId" },
        { label: `${this.$t("tx.baseInfo.bdName")}`, prop: "bdName" },
        { label: `${this.$t("tx.baseInfo.bdType")}`, prop: "bdType" },
        { label: `${this.$t("tx.baseInfo.functionName")}`, prop: "policyId" },
        {
          label: `${this.$t("tx.baseInfo.operationAddress")}`,
          prop: "submitter",
          isTo: true,
          target: "addressDetail"
        },
        {
          label: `${this.$t("tx.baseInfo.feeMaxAmount")}`,
          prop: "maxAllowFee"
        },
        {
          label: `${this.$t("tx.baseInfo.transactionFee")}`,
          prop: "feeAmount"
        },
        {
          label: `${this.$t("tx.baseInfo.block")}`,
          prop: "blockHeight",
          isTo: true,
          target: "blockDetail"
        },
        { label: `${this.$t("tx.baseInfo.timeStamp")}`, prop: "blockTime" },
        { label: `${this.$t("tx.baseInfo.status")}`, prop: "executeResult" },
        { label: `${this.$t("tx.baseInfo.inputData")}`, prop: "actionDatas" }
      ],
      BasicInfo: {},
      inputData: []
    };
  },
  computed: {
    txId() {
      return this.$route.query.id;
    }
  },
  methods: {
    renderTable() {
      [].forEach.call(document.querySelectorAll(".tableList >div"), function(
        div,
        index
      ) {
        if (index % 2 !== 0) div.style.background = "#f6f8fa";
      });
    },
    getList() {
      this.loading = true;
      queryTxDetails({
        txId: this.txId
      })
        .then(res => {
          if (!res.data.successful) {
            this.$router.push({
              path: "/invalidSearch",
              query: { info: this.$route.query.id }
            });
          } else {
            this.BasicInfo = res.data.data;
            if (this.BasicInfo.maxAllowFee && this.BasicInfo.feeCurrency) {
              this.BasicInfo.maxAllowFee =
                transferThousands(res.data.data.maxAllowFee) +
                " " +
                res.data.data.feeCurrency;
            }

            if (this.BasicInfo.feeAmount && this.BasicInfo.feeCurrency) {
              this.BasicInfo.feeAmount =
                transferThousands(res.data.data.feeAmount) +
                " " +
                res.data.data.feeCurrency;
            }

            this.BasicInfo.blockTime = dateUTCFilter(res.data.data.blockTime);
            if (res.data.data.executeResult === "1") {
              this.BasicInfo.executeResult = `${this.$t("common.success")}`;
            } else {
              this.BasicInfo.executeResult = `${this.$t("common.failed")}`;
            }
            this.inputData = JSON.parse(res.data.data.actionDatas);
            this.inputData.forEach(el => {
              delete el.abi;
              delete el.code;
              el.sourCode = el.sourCode.split("\n");
            });
          }
          this.loading = false;
        })
        .catch(error => {
          this.loading = false;
        });
    },
    // 去token/block/address等详情页
    toDetail(target, prop) {
      if (target === "blockDetail") {
        this.$router.push({
          path: target,
          query: {
            height: prop
          }
        });
      } else if (target === "addressDetail") {
        this.$router.push({
          path: target,
          query: {
            address: prop
          }
        });
      }
    }
  },
  mounted() {
    this.getList();
  },
  updated() {
    this.renderTable();
  }
};
</script>
<style lang="scss" scoped>
.txIdDetail-page {
  color: #444444;
  font-family: HelveticaNeue;
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

.Basic-Information,
.Token-Information {
  margin-bottom: 60px;
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
  line-height: 60px;
  display: flex;
  align-items: center;
  .action-data {
    height: 450px;
    overflow: auto;
    width: 74%;
    display: inline-block;
    .action-box {
      border-bottom: 2px dashed #1e3a71;
      &:nth-last-child(1) {
        border-bottom: 0px;
      }
      .action-box-ul-outside {
        width: 100%;
        padding: 0;
        > li {
          list-style: none;
          display: flex;
          padding-bottom: 15px;
          > span:nth-child(2) {
            width: 100%;
            vertical-align: top;
            word-wrap: break-word;
            word-break: break-all;
            padding-right: 20px;
            // white-space:nowrap;
          }
          > span:nth-child(1) {
            width: 20%;
            text-align: left;
          }
          .action-box-ul-inside {
            padding-left: 0;
            li {
              padding-bottom: 5px;
              list-style: none;
              span:nth-child(2) {
                vertical-align: top;
                word-wrap: break-word;
                word-break: break-all;
                padding: 0 10px;
              }
              span:nth-child(1) {
                text-align: left;
              }
            }
          }
        }
        .sourCodeLi {
          display: block;
        }
      }
    }
  }
}
.autoTable {
  -webkit-box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>


