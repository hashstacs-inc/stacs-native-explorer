<template>
  <span class="toggleLanguage" :class="language">
    <el-select
      v-model="language"
      popper-class="toggleLanguage-drop"
      @change="toggleLanguage(language)"
    >
      <el-option label="简体中文" class="zh-CN" value="zh-CN"></el-option>
      <el-option label="English" class="en-GB" value="en-GB"></el-option>
    </el-select>
  </span>
</template>

<script>
import { mapGetters } from "vuex"; //获取getter
export default {
  name: "toggleLanguage",
  watch: {
    lang(newVal, oldVal) {
      console.log(newVal, oldVal);
      this.language = this.lang;
    }
  },
  inject: ["reload"],
  data() {
    return {
      language: ""
    };
  },
  computed: {
    ...mapGetters(["lang"])
  },
  methods: {
    toggleLanguage(lang) {
      this.$store
        .dispatch("setLocalLang", lang)
        .then(response => {
          this.$i18n.locale = lang;
          this.reload();
        })
        .catch(error => {});
    }
  },
  mounted() {
    this.language = this.lang;
  }
};
</script>

<style lang="scss">
.toggleLanguage {
  .el-input {
    input {
      background: none;
      border: none;
      border-radius: 0;
      color: white;
      width: 80px;
      padding: 0;
    }
    // .el-input__suffix {
    //   display: none;
    // }
  }
  .el-select .el-input .el-select__caret {
    color: #fff !important;
  }
  // &.zh-CN {
  //   input {
  //     background: url("../assets/system/zh-CN.png") no-repeat left !important;
  //     background-size: 30px 20px;
  //   }
  // }
  // &.en-GB {
  //   input {
  //     background: url("../assets/system/en-GB.png") no-repeat left !important;
  //   }
  // }
}
</style>
