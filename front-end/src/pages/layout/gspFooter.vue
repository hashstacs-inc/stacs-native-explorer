<template>
  <div class="footer-wrap">
    <div class="footer-page">
      <div class="item">
        <section>
          <div class="footerImg">
            <img src="../../assets/img/footerLogo.png" style="width: 100%;" />
          </div>
          <div>
            <p>{{$t('footer.left[0]')}}</p>
            <p>{{$t('footer.left[1]')}}</p>
            <div>
              <toggleLanguage></toggleLanguage>
            </div>
          </div>
        </section>
      </div>
      <div class="item">
        <section>
         <div class="title">{{$t('footer.center[0]')}}</div>
          <p>{{$t('footer.center[1]')}}</p>
          <p>{{$t('footer.center[2]')}}</p>
          <!-- <div class="titleBottom">Risk Management</div> -->
        </section>
      </div>
      <div class="item">
        <section>
          <div class="title">{{$t('footer.right[0]')}}</div>
          <p>{{$t('footer.right[1]')}}</p>
          <p>{{$t('footer.right[2]')}}</p>
          <p>{{$t('footer.right[3]')}}</p>
          <p>{{$t('footer.right[4]')}}</p>
          <p>{{$t('footer.right[5]')}}</p>
        </section>
      </div>
    </div>
    <vueToTop :bottom="300" :type="10" :color="`#1e3a71`" :right="60" :size="40"></vueToTop>
  </div>
</template>

<script>
import toggleLanguage from "@/components/toggleLanguage.vue";
export default {
  name: "gspFooter",
  components: {
    toggleLanguage
  },
  data() {
    return {
      urlPrefix: ""
    };
  },
  mounted() {
    this.urlPrefix = process.env.URL_CHANGE;
  }
};
</script>

<style lang="scss">
.footer-wrap {
  background: url("../../assets/img/footer.png");
  min-width: 1200px;
  .footer-page {
    width: 1200px;
    margin: auto;
    height: 260px;
    display: flex;
    justify-content: space-between;
    color: white;
    // align-items: center;
    .item {
      margin-top: 45px;
      section {
        font-family: HelveticaNeue;
        font-size: 12px;
        color: #ffffff;
        line-height: 28px;
        .footerImg{
          width: 180px;
        }
      }
      // height: 100%;
      .title {
        opacity: 0.8;
        font-family: HelveticaNeue;
        font-size: 12px;
        color: #ffffff;
        line-height: 40px;
      }
      .titleBottom {
        opacity: 0.8;
        font-family: HelveticaNeue;
        font-size: 12px;
        color: #ffffff;
        line-height: 24px;
      }
      p {
        opacity: 0.8;
        font-family: HelveticaNeue;
        font-size: 12px;
        color: #ffffff;
        line-height: 24px;
        margin: 0px;
        a {
          color: #fff;
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }
}
</style>
