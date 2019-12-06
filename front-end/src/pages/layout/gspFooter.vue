<template>
  <div class="footer-wrap">
    <div class="footer-page">
      <div class="item">
        <section style="margin-top: -25px;">
          <div class="footerImg">
            <img src="../../assets/img/footerLogo.png" style="width: 100%;" />
          </div>
          <div>
            <p>Copyright @ STO.com 2018</p>
            <p>All Rights Reserved 855.733.3310</p>
            <div>
              <toggleLanguage></toggleLanguage>
            </div>
          </div>
          <div style="height: 30px;"></div>
        </section>
      </div>
      <div class="item">
        <section style="margin-top: -40px;">
          <!-- <p>
            <a
              href="/static/Juno Terms & Conditions.pdf"
              target="_blank"
              style="color:#fff!important;"
            >Terms and Conditions</a>
          </p>
          <p class="footer_item">
            <a
              href="/static/GSX_Group_Cookies_Policy.pdf"
              target="_blank"
              style="color:#fff!important;"
            >Cookie Policy</a>
          </p>
          <p>
            <a
              href="/static/GSX Group Website Privacy Notice.pdf"
              target="_blank"
              style="color:#fff!important;"
            >Privacy Policy</a>
          </p> -->
         <div class="title">Terms</div>
          <p>Anti-Money Laundering</p>
          <p>Privacy Policy</p>
          <p>Cookies Policy</p>
          <p>Service Policy</p>
          <div class="titleBottom">Risk Management</div>
        </section>
      </div>
      <div class="item">
        <section style="margin-top: -85px;">
          <div class="title">Customer Support</div>
          <p>sto_service@sto.com</p>
          <p>400-400-1234</p>
          <div class="titleBottom">UTC:9:00-18:00</div>
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
    .item {
      section {
        // opacity: 0.8;
        font-family: HelveticaNeue;
        font-size: 12px;
        color: #ffffff;
        line-height: 28px;
        .footerImg{
          width: 180px;
        }
      }
      height: 100%;
      display: flex;
      align-items: center;
      .title {
        opacity: 0.8;
        font-family: HelveticaNeue;
        font-size: 12px;
        color: #ffffff;
        line-height: 40px;
        margin-top: 10px;
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
