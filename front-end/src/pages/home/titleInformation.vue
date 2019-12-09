<template>
  <div class="information-box">
    <article class="information-cantainer">
      <section>
        <span
          style="font-family: DINAlternate-Bold;font-size: 40px;letter-spacing:2px"
          :id="isName"
        >0</span>
        <div style="opacity: 0.3;">{{desc}}</div>
      </section>
      <section>
        <img :src="imgSrc" />
      </section>
    </article>
  </div>
</template>

<script>
import CountUp from "countup";
import { isEmptyComma } from "@/utils/signUtils";

export default {
  props: ["number", "desc", "isName", "img"],
  data() {
    return {
      demo: {},
      imgSrc: ""
    };
  },
  mounted() {
    this.imgSrc = require("../../assets/img/" + this.img + ".png");
  },
  watch: {
    number(newVal, oldVal) {
      var options = {
        useEasing: true,
        useGrouping: true,
        separator: ",",
        decimal: "."
      };
      setTimeout(() => {
        let anima = new CountUp(this.isName, oldVal, newVal, 0, 2, options);
        anima.start();
      }, 200);
    }
  }
};
</script>
<style>
.information-box {
  align-items: center;
  height: 170px;
  width: 590px;
  background: linear-gradient(to left, #20478a, #1b2d59);
  box-shadow: #cfd6e2 10px 10px 30px 5px;
  color: white;
}

.information-cantainer {
  align-items: center;
  padding: 50px 50px 40px 40px;
  justify-content: space-between;
  display: flex;
  height: 157px;
}
</style>
