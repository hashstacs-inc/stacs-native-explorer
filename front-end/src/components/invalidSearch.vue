<template>
  <div class="invalid-page">
    <el-card>
      <div class="invalid-title">
        <div class="oops">Oops!</div>
        <div class="desc">Sorry! The search string you entered is invalid!</div>
      </div>
      <div class="invalid-main">
        <div class="desc">Search String:{{info}}</div>
        <div class="back-button">
          <mu-button
            class="primary-button backhome"
            @click="goBack"
          >Back Home</mu-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["tasQueryData"]),
    info() {
      return this.$route.query.info;
    }
  },
  methods: {
    goBack() {
      // this.$router.go(-1)
      this.$router.push({
        path: "/"
      });
    }
  }
};
</script>


<style lang="scss">
.invalid-page {
  width: 1130px;
  .invalid-title {
    // display: flex;
    // justify-content: center;
    // align-items: center;
    background: url("../assets/img/invalidSearch.png");
    height: 180px;
    .oops {
      padding-top: 31px;
      font-family: BodoniSvtyTwoITCTT-Bold;
      text-align: center;
      font-size: 62px;
      color: #ffffff;
    }
    .desc {
      font-family: HelveticaNeue;
      font-size: 20px;
      padding-top: 15px;
      color: #ffffff;
      text-align: center;
      line-height: 26px;
    }
  }
  .invalid-main {
    margin-top: 53px;
    text-align: center;
    span {
      font-family: HelveticaNeue-Medium;
      font-size: 14px;
      color: #727172;
      line-height: 26px;
      font-weight: 600;
    }
    .string-box {
      font-family: HelveticaNeue;
      font-size: 14px;
      color: #727172;
      line-height: 26px;
      background: #f6f6f6;
      justify-content: center;
      margin-top: 11px;
      width: 600px;
      height: 61px;
      display: flex;
      align-items: center;
    }
    .back-button {
      margin: 120px 0 60px 0;
    }
  }
}
</style>
