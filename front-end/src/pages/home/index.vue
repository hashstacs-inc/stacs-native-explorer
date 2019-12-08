<template>
  <div class="home-page">
    <article class="home-title">
      <el-row :gutter="20" style="display:flex;margin-top: 30px;">
        <el-col :span="12">
          <titile-infomation
            :number="blockInformation.length ==0 ?0 :blockInformation[0].totalTxNum"
            :desc="$t('left.totalTxns')"
            isName="id2"
            img="total_trade"
          />
        </el-col>
        <el-col :span="12">
          <titile-infomation
            :number="blockInformation.length ==0 ?0 :blockInformation[0].height"
            :desc="$t('right.currentBlock')"
            isName="id1"
            img="block_height"
          />
        </el-col>
      </el-row>
    </article>
    <article class="home-title">
      <el-row style="height: 769px;width: 1200px">
        <el-col :span="12" style="height: 100%;padding-right: 10px">
          <el-card style="height: 100%;">
            <div class="table-title">
              <div style="display: flex;align-items: center">
                <img src="../../assets/icon/trade_icon.png" style="margin-right: 10px" />
                {{$t('left.recentTxns')}}
              </div>
            </div>
            <hr style="border: 1px solid #B0C2E2;" />
            <div class="table-content">
              <div class="table-container" v-for="(item, key) in txsInformation" :key="key">
                <div class="table-item">
                  <div style="width: 70%" class="txIdBox">
                    {{$t('left.tx')}}
                    <el-tooltip :content="item.txId" placement="top">
                      <a
                        @click="toDetail(0,item.txId)"
                        class="txid on-click"
                        :show-overflow-tooltip="true"
                      >{{item.txId}}</a>
                    </el-tooltip>
                  </div>
                  <div style="width: 20%; margin-left: 10%;">
                    <span>{{item.blockTime}} +UTC</span>
                  </div>
                </div>
                <hr />
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="12" style="height: 100%;padding-left: 10px">
          <el-card style="height: 100%">
            <div class="table-title">
              <div style="display: flex;align-items: center">
                <img src="../../assets/icon/trade_icon.png" style="margin-right: 10px" />
                {{$t('right.blockInformation')}}
              </div>
            </div>
            <hr style="border: 1px solid #B0C2E2;" />
            <div class="table-content">
              <div class="table-container" v-for="(item, key) in blockInformation" :key="key">
                <div class="table-item">
                  <div style="width: 33%">
                    <div class="block-box">{{$t('right.blockSize')}} {{item.totalBlockSize}}</div>
                  </div>
                  <div style="width: 67%">
                    <div style="margin-bottom: 20px">
                      <span>{{$t('right.block')}}</span>
                      <a
                        style="margin-left: 20px;"
                        class="on-click"
                        @click="toDetail(item.height)"
                      >{{item.height}}</a>
                      <span style="margin-left: 40px">{{$t('right.txns')}}</span>
                      <span style="margin-left: 20px">{{item.txNum}}</span>
                    </div>
                    <div>{{item.blockTime}} +UTC</div>
                  </div>
                </div>
                <hr />
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </article>
  </div>
</template>

<script>
import titileInfomation from "./titleInformation";
import { queryTxListByPage, queryBlockListByPage } from "@/api";
import { dateUTCFilter } from "../../utils";
import { mapGetters } from "vuex";
import { transferThousands, isEmptyComma } from "@/utils/signUtils";

export default {
  computed: {
    ...mapGetters(["tasQueryData"])
  },
  data() {
    return {
      txsTimer: null,
      blockTimer: null,
      blockInformation: [],
      txsInformation: [],
      blockQueryData: {
        pageNum: 1,
        pageSize: 15
      },
      txsQueryData: {
        pageNum: 1,
        pageSize: 15
      }
    };
  },
  components: {
    titileInfomation
  },
  methods: {
    toDetail(height, id) {
      if (height) {
        height = isEmptyComma(height);
        this.$router.push({ name: "blockDetail", query: { height } });
      }
      if (id) {
        this.$router.push({
          path: "/txidDetails",
          query: {
            id: id
          }
        });
      }
    },
    queryBlockListByPage() {
      queryBlockListByPage(this.blockQueryData).then(res => {
        this.blockInformation = res.data.data;
        let item;
        for (item of this.blockInformation) {
          item.blockTime = dateUTCFilter(item.blockTime);
          item.height = transferThousands(item.height);
          item.txNum = transferThousands(item.txNum);
        }
      });
    },
    queryTxListByPage() {
      queryTxListByPage(this.txsQueryData).then(res => {
        this.txsInformation = res.data.data;
        let item;
        for (item of this.txsInformation) {
          item.blockTime = dateUTCFilter(item.blockTime);
        }
      });
    }
  },
  mounted() {
    this.queryBlockListByPage();
    this.blockTimer = setInterval(() => {
      this.queryBlockListByPage();
    }, 5000);
    this.queryTxListByPage();
    this.txsTimer = setInterval(() => {
      this.queryTxListByPage();
    }, 5000);
  },
  beforeDestroy() {
    clearInterval(this.blockTimer);
    clearInterval(this.txsTimer);
    this.blockTimer = null;
    this.txsTimer = null;
  }
};
</script>

<style>
.home-page {
  font-family: HelveticaNeue-Medium;
}

.block-box {
  height: 66px;
  width: 150px;
  background-color: #aaa9aa;
  color: white;
  font-size: 13px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.table-title {
  font-weight: 600;
  align-items: center;
  height: 55px;
  color: #18519c;
  font-size: 16px;
  font-family: Recent Transactions;
  justify-content: space-between;
  display: flex;
  padding: 0px 20px 0px 20px;
  background-color: #f5f7f9;
}

.table-content {
  height: 719px;
  overflow-y: auto;
}

.table-item {
  padding: 20px;
  align-items: center;
  height: 100px;
  display: flex;
  /*justify-content: space-between;*/
}

.view-all {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
  border: 1px solid #063c8c;
  width: 72px;
  height: 28px;
  color: #063c8c;
}

.view-all:hover {
  background-color: white;
}

/* .table-container {
  padding: 20px;
} */

.home-title {
  justify-content: center;
  display: flex;
  margin-top: 60px;
  font-size: 14px;
}
.txIdBox {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
/* .txid {
  display: inline-block;
} */
.on-click {
  color: #18519c;
}
.on-click:hover {
  color: #3675df;
  text-decoration: underline;
}
</style>
