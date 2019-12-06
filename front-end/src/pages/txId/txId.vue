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
    <!-- tokenInfo -->
    <article class="Token-Information">
      <el-card class="bi-box">
        <section class="tableList">
          <div v-for="item in TokenInfoLabel" :key="item.prop" class="bi-information">
            <span class="table-label">{{item.label}}</span>
            <!-- <span
              v-if="(item.label==='Price'||item.label==='Purchase Start Date +UTC'||item.label==='Purchase End Date +UTC')&&!TokenInfo[item.prop]"
              style="width: 897px;word-wrap:break-word"
            ></span>-->
            <span
              style="width: 897px;overflow-wrap:break-word;padding: 20px 20px 20px 0px;"
            >{{TokenInfo[item.prop]}}</span>
          </div>
        </section>
      </el-card>
    </article>
    <!-- tradeInfo -->
    <el-table :data="tableDetailsList" stripe class="autoTable">
      <template v-for="item in tableConfig">
        <!-- val === "Issuance" || val === "Increments" -->
        <el-table-column
          :prop="item.prop"
          :label="item.label"
          :show-overflow-tooltip="showTooltip"
          :key="item.index"
          :align="item.align"
          v-if="item.prop === 'item'"
        >
          <template slot-scope="scope">
            <span>{{scope.row.item}}</span>
          </template>
        </el-table-column>
        <el-table-column
          :prop="item.prop"
          :label="item.label"
          :show-overflow-tooltip="showTooltip"
          :key="item.index"
          :align="item.align"
          v-if="item.prop === 'operationAddress'"
        >
          <template slot-scope="scope">
            <span>{{scope.row.operationAddress}}</span>
          </template>
        </el-table-column>
        <el-table-column
          :prop="item.prop"
          :label="item.label"
          :show-overflow-tooltip="showTooltip"
          :key="item.index"
          :align="item.align"
          v-if="item.prop === 'tokenAddress'"
        >
          <template slot-scope="scope">
            <a
              class="on-click"
              @click.prevent="toDetail(item.target,scope.row.tokenAddress)"
            >{{scope.row.tokenAddress}}</a>
          </template>
        </el-table-column>

        <!-- val === "Transfer" || val === "Rates" || val === "Disposed" -->
        <el-table-column
          :prop="item.prop"
          :label="item.label"
          :show-overflow-tooltip="showTooltip"
          :key="item.index"
          :align="item.align"
          v-if="item.prop === 'from' && BasicInfo.type!='Matured'"
        >
          <template slot-scope="scope">
            <a
              class="on-click"
              @click.prevent="toDetail(item.target,scope.row.from)"
            >{{scope.row.from}}</a>
          </template>
        </el-table-column>
        <el-table-column
          :prop="item.prop"
          :label="item.label"
          :show-overflow-tooltip="showTooltip"
          :key="item.index"
          :align="item.align"
          v-if="item.prop === 'to' && BasicInfo.type!='Matured'"
        >
          <template slot-scope="scope">
            <a class="on-click" @click.prevent="toDetail(item.target,scope.row.to)">{{scope.row.to}}</a>
          </template>
        </el-table-column>

        <el-table-column
          :prop="item.prop"
          :label="item.label"
          :show-overflow-tooltip="showTooltip"
          :key="item.index"
          :align="item.align"
          v-if="item.prop === 'from' && BasicInfo.type==='Matured'"
        >
          <template slot-scope="scope">{{scope.row.from}}</template>
        </el-table-column>

        <el-table-column
          :prop="item.prop"
          :label="item.label"
          :show-overflow-tooltip="showTooltip"
          :key="item.index"
          :align="item.align"
          v-if="item.prop === 'to' && BasicInfo.type==='Matured'"
        >
          <template slot-scope="scope">{{scope.row.to}}</template>
        </el-table-column>

        <el-table-column
          :prop="item.prop"
          :label="item.label"
          :show-overflow-tooltip="showTooltip"
          :key="item.index"
          :align="item.align"
          v-if="item.prop === 'amount'"
        >
          <template slot-scope="scope">
            <span>{{scope.row.amount}}</span>
          </template>
        </el-table-column>

        <el-table-column
          :prop="item.prop"
          :label="item.label"
          :show-overflow-tooltip="showTooltip"
          :key="item.index"
          :align="item.align"
          v-if="(item.prop === 'currency' && BasicInfo.type==='Disposed') || (item.prop === 'currency' && BasicInfo.type==='Subscription')"
        >
          <template slot-scope="scope">
            <a
              class="on-click"
              v-if="BasicInfo.type==='Subscription'"
              @click.prevent="toDetail(item.target,scope.row.currency)"
            >{{scope.row.currency}}</a>
            <span v-else>{{scope.row.currency}}</span>
          </template>
        </el-table-column>

        <!-- val === "Credentials" -->
        <el-table-column
          :prop="item.prop"
          :label="item.label"
          :show-overflow-tooltip="showTooltip"
          :key="item.index"
          :align="item.align"
          v-if="item.prop === 'requestor'"
        >
          <template slot-scope="scope">
            <span>{{scope.row.requestor}}</span>
            <!-- <a
              class="on-click"
              @click.prevent="toDetail(item.target,scope.row.requestor)"
            >{{scope.row.requestor}}</a>-->
          </template>
        </el-table-column>
        <el-table-column
          :prop="item.prop"
          :label="item.label"
          :show-overflow-tooltip="showTooltip"
          :key="item.index"
          :align="item.align"
          v-if="item.prop === 'address'"
        >
          <template slot-scope="scope">
            <a
              class="on-click"
              @click.prevent="toDetail(item.target,scope.row.address)"
            >{{scope.row.address}}</a>
          </template>
        </el-table-column>
        <!-- val === "Matured" -->
        <el-table-column
          :prop="item.prop"
          :label="item.label"
          :show-overflow-tooltip="showTooltip"
          :key="item.index"
          :align="item.align"
          v-if="item.prop === 'contractAddress'"
        >
          <template slot-scope="scope">
            <span>{{scope.row.contractAddress}}</span>
          </template>
        </el-table-column>
        <el-table-column
          :prop="item.prop"
          :label="item.label"
          :show-overflow-tooltip="showTooltip"
          :key="item.index"
          :align="item.align"
          v-if="item.prop === 'status'"
        >
          <template slot-scope="scope">
            <span>{{scope.row.status}}</span>
            <!-- 失败显示 -->
            <span
              v-if="scope.row.status === 'Failed'"
              class="FailedStyle"
              @click="ShowErrorInfo(BasicInfo.txId)"
            >
              <img src="@/assets/img/view.png" style="margin: 0 5px;" />View
            </span>
          </template>
        </el-table-column>
      </template>
    </el-table>
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
      BasicInfoLabel: [],
      TokenInfoLabel: [],
      tableConfig: [],
      tableDetailsList: [],
      BasicInfo: {},
      TokenInfo: {}
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
          console.log(res.data.success);
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
    determineType(val) {
      console.log(val);
      // 基础信息label配置
      let arrBasicInfoLabel = [
        { label: "TX ID", prop: "txId" },
        {
          label: "Token",
          prop: "currency",
          isTo: true,
          target: "tokenDetail"
        },
        { label: "Time Stamp +UTC", prop: "blockTime" },
        {
          label: "Block",
          prop: "blockHeight",
          isTo: true,
          target: "blockDetail"
        },
        { label: "Type", prop: "type" }
      ];
      // 基础信息类型为Rates
      let arrBasicInfoRates = [
        { label: "TX ID", prop: "txId" },
        {
          label: "Token",
          prop: "currency",
          isTo: true,
          target: "tokenDetail"
        },
        { label: "Time Stamp +UTC", prop: "blockTime" },
        {
          label: "Block",
          prop: "blockHeight",
          isTo: true,
          target: "blockDetail"
        },
        { label: "Type", prop: "type" },
        { label: "Assert", prop: "assert", isTo: true, target: "tokenDetail" }
      ];
      // token信息label配置
      let arrTokenInfoLabel = [
        { label: "Issuer", prop: "issuer" },
        { label: "Approval Authority", prop: "agency" },
        { label: "Token Type", prop: "type" },
        { label: "Amount", prop: "amount" },
        { label: "Price", prop: "price" },
        { label: "Purchase Start Date +UTC", prop: "exchangeStartDate" },
        { label: "Purchase End Date +UTC", prop: "exchangeEndDate" },
        { label: "Credentials Information", prop: "bizModel" }
      ];
      // token信息（type为Credentials）label配置
      let arrTokenInfoLabelAnother = [
        { label: "User's nationality", prop: "countries" },
        { label: "Country of Residence", prop: "residence" },
        { label: "KYC Institution", prop: "kyc_source_name" },
        { label: "Type of Investor", prop: "invest_type" }
      ];
      // val === "Transfer" || val === "Rates" || val === "Disposed" 表格头配置
      let configTranAndRa = [
        {
          label: "Item",
          prop: "item"
          // align: "center"
        },
        {
          label: "Token",
          prop: "currency",
          // align: "center"
          target: "tokenDetail"
        },
        {
          label: "From",
          prop: "from",
          // align: "center",
          target: "addressDetail"
        },
        {
          label: "To",
          prop: "to",
          // align: "center",
          target: "addressDetail"
        },
        {
          label: "Amount",
          prop: "amount"
          // align: "center"
        },
        {
          label: "Status",
          prop: "status"
          // align: "center"
        }
      ];
      // val === "Issuance" || val === "Increments"  表格头配置
      let configIssAndIn = [
        {
          label: "Item",
          prop: "item"
          // align: "center"
        },
        {
          label: "Operation Address",
          prop: "operationAddress",
          // align: "center",
          target: "addressDetail"
        },
        {
          label: "Owner Address",
          prop: "tokenAddress",
          // align: "center",
          target: "addressDetail"
        },
        {
          label: "Amount",
          prop: "amount"
          // align: "center"
        },
        {
          label: "Status",
          prop: "status"
          // align: "center"
        }
      ];

      // val === "Credentials"  表格头配置
      let configCre = [
        {
          label: "Item",
          prop: "item"
          // align: "center"
        },
        {
          label: "Transaction Requestor",
          prop: "requestor",
          // align: "center",
          target: "addressDetail"
        },
        {
          label: "Address",
          prop: "address",
          // align: "center",
          target: "addressDetail"
        },
        {
          label: "Status",
          prop: "status"
          // align: "center"
        }
      ];

      // val === "Matured"  表格头配置
      let configMatured = [
        {
          label: "Item",
          prop: "item"
          // align: "center"
        },
        {
          label: "Operation address",
          prop: "from",
          // align: "center",
          target: "addressDetail"
        },
        {
          label: "Contract Address",
          prop: "to"
          // align: "center"
        },
        {
          label: "Status",
          prop: "status"
          // align: "center"
        }
      ];
      //BasicInfoLabel和TokenInfoLabel判断
      if (val === "Rates") {
        this.BasicInfoLabel = arrBasicInfoRates;
      } else {
        this.BasicInfoLabel = arrBasicInfoLabel;
      }
      if (val !== "Credentials") {
        this.TokenInfoLabel = arrTokenInfoLabel;
      } else {
        this.TokenInfoLabel = arrTokenInfoLabelAnother;
      }

      //tableConfig判断
      if (
        val === "Transfer" ||
        val === "Rates" ||
        val === "Disposed" ||
        val === "Subscription"
      ) {
        this.tableConfig = configTranAndRa;
      } else if (val === "Issuance" || val === "Increments") {
        this.tableConfig = configIssAndIn;
      } else if (val === "Credentials") {
        this.tableConfig = configCre;
      } else if (val === "Matured") {
        this.tableConfig = configMatured;
      }
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


