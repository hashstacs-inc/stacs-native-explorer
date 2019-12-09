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
            <div v-else-if="item.prop === 'actionDatas'" class="contract-code">
              <ul>
                <li v-for="(val, key) in item.actionDatas" :key="key">
                  <span>{{key + 1}}</span>
                  <span>{{val}}</span>
                </li>
              </ul>
            </div>
            <span v-else-if="item.isTo&&!BasicInfo[item.prop]" style="font-weight: 500">- -</span>
            <span v-else style="font-weight: 500">{{BasicInfo[item.prop]}}</span>
          </div>
        </section>
      </el-card>
    </article>
  </div>
</template>
<script>
import { queryTxDetailById, queryTxDetailByIdNew } from "@/api";
import { dateUTCFilter } from "@/utils";

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
          isTo: true
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
          isTo: true
        },
        { label: `${this.$t("tx.baseInfo.timeStamp")}`, prop: "blockTime" },
        { label: `${this.$t("tx.baseInfo.status")}`, prop: "executeResult" },
        { label: `${this.$t("tx.baseInfo.inputData")}`, prop: "actionDatas" }
      ],
      BasicInfo: {}
    };
  },
  computed: {
    txId() {
      return this.$route.query.id;
    }
  },
  methods: {
    renderTable() {
      [].forEach.call(document.querySelectorAll(".tableList div"), function(
        div,
        index
      ) {
        if (index % 2 !== 0) div.style.background = "#F6F6F6";
      });
    },
    getList() {
      this.loading = true;
      queryTxDetailByIdNew({
        txId: this.txId
      })
        .then(res => {
          console.log(res);
          if (!res.data.success) {
            this.$router.push({
              path: "/invalidSearch",
              query: { info: this.$route.query.id }
            });
          } else {
            this.BasicInfo = res.data.data;
          }
          this.loading = false;
        })
        .catch(error => {
          this.loading = false;
        });
    },
    // 去token/block/address等详情页
    toDetail(target, prop) {
      console.log(target, prop);
      if (target === "tokenDetail") {
        this.$router.push({
          path: target,
          query: {
            token: prop
          }
        });
      } else if (target === "blockDetail") {
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
  display: flex;
  align-items: center;
}
.autoTable {
  -webkit-box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>


