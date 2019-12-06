<template>
  <div class="token-detail" v-loading="loading">
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
            <span v-if="item.label === 'Token'">{{item.currencyName}}({{item.prop}})</span>
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
                      <span v-else>{{scope.row[item.prop]}}</span>
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
                  <!-- owner address -->
                  <el-table-column
                    :prop="item.prop"
                    :label="item.label"
                    v-else-if="item.prop === 'ownerAddr'"
                    :show-overflow-tooltip="item.showTooltip"
                    :key="item.prop"
                    :width="item.width"
                  >
                    <template slot-scope="scope">
                      <span
                        class="line-span-no"
                        @click="goAddressDetails(scope.row[item.prop])"
                      >{{scope.row[item.prop]}}</span>
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
            <!-- Holders -->
            <el-tab-pane label="Holders" name="Holders">
              <el-table :data="holdersDate" stripe style="width: 100%">
                <template v-for="item in holdersFrom">
                  <!-- 地址 -->
                  <el-table-column
                    :prop="item.prop"
                    :label="item.label"
                    v-if="item.prop === 'address'"
                    :show-overflow-tooltip="item.showTooltip"
                    :key="item.prop"
                    :width="item.width"
                  >
                    <template slot-scope="scope">
                      <span
                        class="line-span-no"
                        @click="goAddressDetails(scope.row.address, BasicFormationLabel[0].prop)"
                      >{{scope.row.address}}</span>
                    </template>
                  </el-table-column>
                  <!-- 百分比 -->
                  <el-table-column
                    :prop="item.prop"
                    :label="item.label"
                    v-else-if="item.prop === 'percentage'"
                    :show-overflowoverflow-tooltip="item.showTooltip"
                    :key="item.prop"
                    :width="item.width"
                  >
                    <template slot-scope="scope">
                      <span>{{scope.row.percentage}}%</span>
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
            <!-- Contract -->
            <el-tab-pane label="Contract" name="Contract">
              <section class="tableList">
                <div
                  class="bi-information"
                  v-for="(v, k) in contractFrom"
                  :key="k"
                  :style="k % 2 ? 'background-color: #F6F8FA;' : ''"
                >
                  <span class="table-label">{{v.label}}</span>
                  <!--class="table-desc"    @click="goTxIdDetails(contractDate[v.prop])" -->
                  <span v-if="v.prop === 'txId'">{{contractDate[v.prop]}}</span>
                  <span
                    class="table-desc"
                    v-else-if="v.prop === 'blockHeight'"
                    @click="goBlockDetails(contractDate[v.prop])"
                  >{{contractDate[v.prop]}}</span>
                  <span v-else-if="v.prop === 'blockTime'">{{formatDate(contractDate[v.prop])}}</span>
                  <div v-else-if="v.prop === 'contractCode'" class="contract-code">
                    <ul>
                      <li v-for="(val, key) in codeList" :key="key">
                        <span>{{key + 1}}</span>
                        <span>{{val}}</span>
                      </li>
                    </ul>
                  </div>
                  <span v-else>{{contractDate[v.prop]}}</span>
                </div>
              </section>
            </el-tab-pane>
            <!-- Freeze -->
            <el-tab-pane label="Freeze" name="Freeze">
              <el-table :data="freezeDate" stripe style="width: 100%">
                <template v-for="item in freezeFrom">
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
                  <!-- 地址 -->
                  <el-table-column
                    :prop="item.prop"
                    :label="item.label"
                    v-else-if="item.prop === 'address'"
                    :show-overflow-tooltip="item.showTooltip"
                    :key="item.prop"
                    :width="item.width"
                  >
                    <template slot-scope="scope">
                      <span
                        class="line-span-no"
                        @click="goAddressDetails(scope.row.address, BasicFormationLabel[0].prop)"
                      >{{scope.row.address}}</span>
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

            <!-- InFo -->
            <el-tab-pane label="Info" name="InFo">
              <section class="tableList">
                <div
                  class="bi-information"
                  v-for="(v, k) in InFoFormLabel"
                  :key="k"
                  :style="k % 2 ? 'background-color: #F6F8FA;' : ''"
                >
                  <span class="table-label">{{v.label}}</span>
                  <span
                    class="table-desc"
                    v-if="v.prop === 'txId'"
                    @click="goTxIdDetails(InFoDate[v.prop])"
                  >{{InFoDate[v.prop]}}</span>
                  <span
                    class="table-desc"
                    v-else-if="v.prop === 'blockHeight'"
                    @click="goBlockDetails(InFoDate[v.prop])"
                  >{{InFoDate[v.prop]}}</span>
                  <span v-else-if="v.prop === 'blockTime'">{{formatDate(InFoDate[v.prop])}}</span>
                  <div
                    v-else-if="v.prop === 'bizModel'&&tabsActiveName==='Contract'"
                    class="contract-code"
                  >
                    <ul>
                      <li v-for="(val, key) in infoCodeList" :key="key">
                        <span>{{key + 1}}</span>
                        <span>{{val}}</span>
                      </li>
                    </ul>
                  </div>
                  <span
                    style="width: 897px;overflow-wrap:break-word;padding: 20px 20px 20px 0px;"
                    v-else-if="v.prop === 'bizModel'"
                  >{{InFoDate[v.prop]}}</span>
                  <span v-else-if="!InFoDate[v.prop]">- -</span>
                  <span v-else>{{InFoDate[v.prop]}}</span>
                </div>
              </section>
            </el-tab-pane>
            <!-- Exchange -->
            <el-tab-pane label="Exchange" name="Exchange">
              <el-table :data="exchangeDate" stripe style="width: 100%">
                <template v-for="(item, key) in exchangFrom">
                  <!-- 地址 -->
                  <el-table-column
                    :prop="item.prop"
                    :label="item.label"
                    v-if="item.prop === 'website'"
                    :show-overflow-tooltip="item.showTooltip"
                    :key="item.prop"
                    :width="item.width"
                  >
                    <template slot-scope="scope">
                      <span
                        class="line-span-no"
                        @click="goWebsite(scope.row.website)"
                      >{{scope.row.website}}</span>
                    </template>
                  </el-table-column>
                  <!-- 排序 -->
                  <el-table-column
                    :prop="item.prop"
                    :label="item.label"
                    v-else-if="item.prop === 'index'"
                    :show-overflow-tooltip="item.showTooltip"
                    :key="item.prop"
                    :width="item.width"
                  >
                    <template slot-scope="scope">
                      <span>{{key + 1}}</span>
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
        :currentPage="repData.pageNo"
        :totalStrip="pageTotal"
        @nextPage="nextPage"
        @prevPage="prevPage"
        @lastPage="lastPage"
        @firstPage="firstPage"
        @changePage="changePage"
        v-if="isShowPage"
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
  queryTokenTransactions,
  queryTokenIseuance,
  queryTokenHolders,
  queryCurrencyIssue,
  queryTokenExchange,
  queryTokenContract,
  queryTokenFreeze
} from "@/api";
import { dateUTCFilter } from "@/utils";
import { convertNum } from "@/utils/signUtils";
import pagination from "@/components/pagination.vue";
import { getLinkConfig } from "../../api/link";

export default {
  name: "TokenDetail",
  data() {
    return {
      BasicFormationLabel: [
        { label: "Token", prop: "currency" },
        { label: "Contract Address", prop: "contractAddress" },
        { label: "Total Supply", prop: "totalSupply" },
        { label: "Holders", prop: "holders" },
        { label: "Total Transactions", prop: "totalTransactions" }
      ],
      tabsActiveName: "Transactions", // 当前tabs
      loading: false, // 加载loading
      repData: {
        // 请求参数
        currency: "",
        pageNo: 1,
        pageSize: 20
      },
      pageTotal: 0, // 总条数
      isShowPage: true,
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
          width: 170
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
          showTooltip: true
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
          width: 160,
          showTooltip: true
        },
        {
          label: "Operation Address", // 操作人地址
          prop: "issueAddr",
          showTooltip: true,
          width: 165
        },
        {
          label: "Owner Address", // Token地址
          prop: "ownerAddr",
          showTooltip: true,
          width: 165
        },
        {
          label: "Amount", // 金额
          prop: "amount",
          showTooltip: true,
          width: 100
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
          width: 170
        },
        {
          label: "Block", // 区块高度
          prop: "blockHeight",
          showTooltip: true
        },
        {
          label: "Status", // 状态
          prop: "status",
          showTooltip: true,
          width: 160
        }
      ],
      issuanceDate: [],
      holdersFrom: [
        {
          label: "Rank", // 持有人排名
          prop: "rank",
          width: "100",
          showTooltip: true
        },
        {
          label: "Address", // 持有人地址
          prop: "address",
          showTooltip: true
        },
        {
          label: "Amount", // 持有数量
          prop: "amount",
          showTooltip: true
        },
        {
          label: "Percentage", // 持有百分比
          prop: "percentage",
          showTooltip: true
        }
      ],
      holdersDate: [],
      freezeFrom: [
        {
          label: "TX ID", // 交易Id
          prop: "txId",
          showTooltip: true
        },
        {
          label: "Time Stamp+UTC", // 时间
          prop: "blockTime",
          width: 170,
          showTooltip: true
        },
        {
          label: "Operation Address", // 操作人地址
          prop: "fromAddress",
          showTooltip: true
        },
        {
          label: "Contract Address", // Token地址
          prop: "toAddress",
          showTooltip: true
        },
        {
          label: "Type", // 类型
          prop: "bizType",
          showTooltip: true
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
      freezeDate: [],
      InFoFormLabel: [
        {
          label: "Issuer", // 发行人
          prop: "issuer"
        },
        {
          label: "Approval Authority", // 代理发行机构
          prop: "agency"
        },
        {
          label: "Token Type", // 证券类型
          prop: "type"
        },
        {
          label: "Amount", // 金额
          prop: "amount"
        },
        {
          label: "Price", // 单价
          prop: "price"
        },
        {
          label: "Purchase Start Date +UTC", // 认购开始期
          prop: "exchangeStartDate"
        },
        {
          label: "Purchase End Date +UTC", // 认购结束期
          prop: "exchangeEndDate"
        },
        {
          label: "Credentials Information", // 存证信息
          prop: "bizModel"
        }
      ],
      InFoDate: {},
      exchangFrom: [
        {
          label: "Item", // 排序
          prop: "index"
        },
        {
          label: "Exchange Name", // 交易所名称
          prop: "exchageName",
          showTooltip: true
        },
        {
          label: "Website", // 网址
          prop: "website",
          showTooltip: true
        }
      ],
      exchangeDate: [],
      contractFrom: [
        {
          label: "TX ID", // 交易id
          prop: "txId"
        },
        {
          label: "Block", // 区块高度
          prop: "blockHeight"
        },
        {
          label: "Time Stamp+UTC", // 区块时间
          prop: "blockTime",
          width: 170
        },
        {
          label: "Contract Code(Silidity)", // 合约代码
          prop: "contractCode"
        }
      ],
      contractDate: {},
      codeList: [],
      infoCodeList: [],
      stoUrl: ""
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
    // 跳转web
    goWebsite(web) {
      window.open(web, "_blank");
    },
    // 下一页
    nextPage() {
      this.repData.pageNo++;
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
    // 分页跳转到最后一页
    lastPage(page) {
      this.repData.pageNo = page;
      let tab = {
        label: this.tabsActiveName
      };
      this.changeTabs(tab);
    },
    // 分页跳转到第一页
    firstPage() {
      this.repData.pageNo = 1;
      let tab = {
        label: this.tabsActiveName
      };
      this.changeTabs(tab);
    },
    // 改变翻页编辑状态
    changePage(page) {
      this.repData.pageNo = page;
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
        this.isShowPage = true;
      } else if (tab.label === "Issuance") {
        this.getIssues();
        this.isShowPage = true;
      } else if (tab.label === "Holders") {
        this.getTokenHolders();
        this.isShowPage = true;
      } else if (tab.label === "Info") {
        this.getTokenInFo();
        this.isShowPage = false;
      } else if (tab.label === "Exchange") {
        this.getTokenExchange();
        this.isShowPage = true;
      } else if (tab.label === "Contract") {
        this.getTokenContract();
        this.isShowPage = false;
      } else {
        this.getTokenFreeze();
        this.isShowPage = false;
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
    },
    // 获取Transactions信息
    async getTransactions() {
      this.loading = true;
      this.repData.currency = this.currencyToken;

      let item = await queryTokenTransactions(this.repData);
      if (!item.data.success) {
        this.$router.push({
          path: "/invalidSearch",
          query: { info: this.currencyToken }
        });
      } else {
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
        this.pageTotal = item.data.data.total;
        this.BasicFormationLabel.forEach(v => {
          Object.keys(item.data.data).forEach(val => {
            if (v.prop === val) {
              v.prop = item.data.data[val];
            }
          });
          v["currencyName"] = item.data.data["currencyName"];
        });
        this.loading = false;
      }
    },
    // 获取issues信息
    async getIssues() {
      this.loading = true;
      this.repData.currency = this.currencyToken;
      let item = await queryTokenIseuance(this.repData);
      if (!item.data.success) {
        this.$router.push({
          path: "/invalidSearch",
          query: { info: this.$route.query.address }
        });
      } else {
        this.issuanceDate = JSON.parse(JSON.stringify(item.data.data.pageList));
        if (this.issuanceDate) {
          this.issuanceDate.forEach(el => {
            el.status =
              el.status.charAt(0).toUpperCase() +
              el.status.slice(1).toLowerCase();
          });
        }
        this.pageTotal = item.data.data.total;
        this.BasicFormationLabel.forEach(v => {
          Object.keys(item.data.data).forEach(val => {
            if (v.prop === val) {
              v.prop = item.data.data[val];
            }
          });
          v["currencyName"] = item.data.data["currencyName"];
        });
        this.loading = false;
      }
    },
    // 查询holders信息
    async getTokenHolders() {
      this.loading = true;
      this.repData.currency = this.currencyToken;
      let totalSupplyClear;
      let item = await queryTokenHolders(this.repData);
      if (!item.data.success) {
        this.$router.push({
          path: "/invalidSearch",
          query: { info: this.$route.query.address }
        });
      } else {
        this.holdersDate = JSON.parse(JSON.stringify(item.data.data.pageList));
        this.pageTotal = item.data.data.total;
        this.BasicFormationLabel.forEach(v => {
          Object.keys(item.data.data).forEach(val => {
            if (v.prop === val) {
              v.prop = item.data.data[val];
            }
          });
          v["currencyName"] = item.data.data["currencyName"];
        });
        // 处理百分比截取四位小数
        totalSupplyClear = this.BasicFormationLabel[2].prop.replace(/,/g, "");
        this.holdersDate.forEach(val => {
          val.percentage = val.amount.replace(/,/g, "") / totalSupplyClear;

          if (val.percentage < 0.000001) {
            val.percentage = "<0.0001";
          } else {
            val.percentage = val.percentage * 100 + "";
            val.percentage = val.percentage.substr(
              0,
              val.percentage.indexOf(".") + 5
            );
            // 小数不足4位,用0补足 eg:0.4 ==> 0.4000
            if (val.percentage.indexOf(".") === -1) {
              //100%特殊情况
              val.percentage = Number(val.percentage).toFixed(4);
            } else {
              if (val.percentage.split(".")[1].length !== 4) {
                if (val.percentage.split(".")[1].length === 1) {
                  val.percentage = val.percentage + "000";
                } else if (val.percentage.split(".")[1].length === 2) {
                  val.percentage = val.percentage + "00";
                } else if (val.percentage.split(".")[1].length === 3) {
                  val.percentage = val.percentage + "0";
                }
              }
            }
          }
        });
        this.loading = false;
      }
    },
    // 查询info信息
    async getTokenInFo() {
      this.loading = true;
      this.repData.currency = this.currencyToken;
      let item = await queryCurrencyIssue(this.repData);
      if (!item.data.success) {
        this.$router.push({
          path: "/invalidSearch",
          query: { info: this.$route.query.address }
        });
      } else {
        this.InFoDate = JSON.parse(JSON.stringify(item.data.data.tokenInfo));
        this.BasicFormationLabel.forEach(v => {
          Object.keys(item.data.data).forEach(val => {
            if (v.prop === val) {
              v.prop = item.data.data[val];
            }
          });
          v["currencyName"] = item.data.data["currencyName"];
        });
        this.infoCodeList = item.data.data.tokenInfo.bizModel.split("\n");
        this.loading = false;
      }
    },
    // 查询exchange信息
    async getTokenExchange() {
      getLinkConfig().then(res => {
        this.stoUrl = res.data.Marketplace;
      });
      this.loading = true;
      this.repData.currency = this.currencyToken;
      let item = await queryTokenExchange(this.repData);
      if (!item.data.success) {
        this.$router.push({
          path: "/invalidSearch",
          query: { info: this.$route.query.address }
        });
      } else {
        this.exchangeDate = JSON.parse(JSON.stringify(item.data.data.pageList));
        this.exchangeDate[0].website = this.stoUrl;
        this.BasicFormationLabel.forEach(v => {
          Object.keys(item.data.data).forEach(val => {
            if (v.prop === val) {
              v.prop = item.data.data[val];
            }
          });
          v["currencyName"] = item.data.data["currencyName"];
        });
        this.loading = false;
      }
    },
    // 查询contract信息
    async getTokenContract() {
      this.loading = true;
      this.repData.currency = this.currencyToken;
      let item = await queryTokenContract(this.repData);
      if (!item.data.success) {
        this.$router.push({
          path: "/invalidSearch",
          query: { info: this.$route.query.address }
        });
      } else {
        this.contractDate = JSON.parse(JSON.stringify(item.data.data));
        this.BasicFormationLabel.forEach(v => {
          Object.keys(item.data.data).forEach(val => {
            if (v.prop === val) {
              v.prop = item.data.data[val];
            }
          });
          v["currencyName"] = item.data.data["currencyName"];
        });
        this.codeList = item.data.data.contractCode.split("\n");
        this.loading = false;
      }
    },
    // 查询freeze信息
    async getTokenFreeze() {
      this.loading = true;
      this.repData.currency = this.currencyToken;
      let item = await queryTokenFreeze(this.repData);
      if (!item.data.success) {
        this.$router.push({
          path: "/invalidSearch",
          query: { info: this.$route.query.address }
        });
      } else {
        this.freezeDate = JSON.parse(JSON.stringify(item.data.data.pageList));
        if (this.freezeDate) {
          this.freezeDate.forEach(el => {
            el.status =
              el.status.charAt(0).toUpperCase() +
              el.status.slice(1).toLowerCase();
          });
        }
        this.pageTotal = item.data.data.total;
        this.BasicFormationLabel.forEach(v => {
          Object.keys(item.data.data).forEach(val => {
            if (v.prop === val) {
              v.prop = item.data.data[val];
            }
          });
          v["currencyName"] = item.data.data["currencyName"];
        });
        this.loading = false;
      }
    }
  },
  mounted() {},
  created() {
    this.getTransactions();
  }
};
</script>
<style lang="scss">
.token-detail {
  color: #444444;
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
    }
  }

  .Basic-Information::after {
    content: "";
    height: 0;
    display: block;
    clear: both;
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
    .contract-code {
      height: 300px;
      overflow: auto;
      width: 80%;
      display: inline-block;
      ul {
        width: 100%;
        padding: 0;
      }
      li {
        list-style: none;
        span:nth-child(2) {
          display: inline-block;
          vertical-align: top;
        }
        span:nth-child(1) {
          margin-right: 10px;
        }
      }
    }
  }
}
.token-detail::after {
  content: "";
  height: 0;
  display: block;
  clear: both;
}
</style>

