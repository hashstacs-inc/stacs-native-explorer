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
            <span v-else-if="item.isTo&&!BasicInfo[item.prop]" style="font-weight: 500">- -</span>
            <span v-else style="font-weight: 500">{{BasicInfo[item.prop]}}</span>
          </div>
        </section>
      </el-card>
    </article>
  </div>
</template>
<script>
import { queryTxDetailById } from "@/api";
import { dateUTCFilter } from "@/utils";

export default {
  data() {
    return {
      showTooltip: true,
      loading: false,
      BasicInfoLabel: [
        { label: "TX ID", prop: "txId" },
        { label: "BD Name", prop: "txId" },
        { label: "BD Type", prop: "txId" },
        { label: "Function Name", prop: "txId" },
        { label: "Operation Address", prop: "txId" },
        { label: "Fee Max Amount", prop: "txId" },
        { label: "Transaction Fee", prop: "txId" },
        { label: "Block", prop: "txId" },
        { label: "Time Stamp +UTC", prop: "txId" },
        { label: "Status", prop: "txId" },
        { label: "Input Data", prop: "txId" },
      ],
      BasicInfo: {},
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
      queryTxDetailById({
        txId: this.txId
      })
        .then(res => {
          if (!res.data.success) {
            this.$router.push({
              path: "/invalidSearch",
              query: { info: this.$route.query.id }
            });
          } else {
            this.determineType(res.data.data.baseInfo.type);
            this.BasicInfo = res.data.data.baseInfo;
            this.BasicInfo.blockTime = dateUTCFilter(
              Number(this.BasicInfo.blockTime)
            );
            if (this.BasicInfo.type === "Credentials") {
              this.BasicInfo.currency = "";
              this.TokenInfo = JSON.parse(this.BasicInfo.bizModel);
            } else {
              this.TokenInfo = res.data.data.tokenInfo;
              if (!this.TokenInfo.price) {
                this.TokenInfo.price = "- -";
              }
              if (!this.TokenInfo.exchangeStartDate) {
                this.TokenInfo.exchangeStartDate = "- -";
              }
              if (!this.TokenInfo.exchangeEndDate) {
                this.TokenInfo.exchangeEndDate = "- -";
              }
              if (!this.TokenInfo.issuer) {
                this.TokenInfo.issuer = "- -";
              }
              if (!this.TokenInfo.type) {
                this.TokenInfo.type = "- -";
              }
            }

            this.tableDetailsList = res.data.data.tradeDetails;
            if (this.tableDetailsList) {
              this.tableDetailsList.forEach(el => {
                el.status =
                  el.status.charAt(0).toUpperCase() +
                  el.status.slice(1).toLowerCase();
              });
            }
          }
          this.loading = false;
        })
        .catch(error => {
          this.loading = false;
        });
    },
    // determineType(val) {
    //   console.log(val);
    //   // 基础信息label配置
    //   let arrBasicInfoLabel = [
    //     { label: "TX ID", prop: "txId" }
    //   ];
      
    //   //BasicInfoLabel和TokenInfoLabel判断
    //   if (val === "Rates") {
    //     this.BasicInfoLabel = arrBasicInfoRates;
    //   } else {
    //     this.BasicInfoLabel = arrBasicInfoLabel;
    //   }
    //   if (val !== "Credentials") {
    //     this.TokenInfoLabel = arrTokenInfoLabel;
    //   } else {
    //     this.TokenInfoLabel = arrTokenInfoLabelAnother;
    //   }

    //   //tableConfig判断
    //   if (
    //     val === "Transfer" ||
    //     val === "Rates" ||
    //     val === "Disposed" ||
    //     val === "Subscription"
    //   ) {
    //     this.tableConfig = configTranAndRa;
    //   } else if (val === "Issuance" || val === "Increments") {
    //     this.tableConfig = configIssAndIn;
    //   } else if (val === "Credentials") {
    //     this.tableConfig = configCre;
    //   } else if (val === "Matured") {
    //     this.tableConfig = configMatured;
    //   }
    // },

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


