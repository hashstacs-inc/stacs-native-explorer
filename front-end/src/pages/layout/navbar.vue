<template>
  <div class="menu">
    <div class="flex-center">
      <div style="width: 200px" class="navbar-left">
        <img src="../../assets/img/navLogo.png" style="width: 100%;" />
      </div>
      <div class="navbar-right">
        <el-menu
          style="height:80px"
          :default-active="activeIndex"
          mode="horizontal"
          @select="handleSelect"
          background-color="#1e3a71"
          active-text-color="white"
          text-color="#e4e7ed"
        >
          <el-menu-item
            :index="item.index"
            v-for="item in menuDesc"
            :key="item.index"
          >{{item.label}}</el-menu-item>
        </el-menu>
      </div>
      <div class="searchBar">
        <el-input
          placeholder="Search by Address/Token/TX ID/Block"
          v-model.trim="searchContent"
          class="input-with-select"
          @keyup.enter.native="search()"
          @input="searchBtnAct"
        >
          <el-button
            slot="append"
            :class="searchStatus ? 'searchIconActive':'searchIconDefalt'"
            @click.enter="search()"
          ></el-button>
        </el-input>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "navbar",
  data() {
    return {
      menuDesc: [
        { index: "/", label: "Home" }
        // { index: "trades", label: "Trades" },
        // { index: "contract", label: "Contract" },
        // { index: "issuance", label: "Issuance" },
        // { index: "purchase", label: "Purchase" },
        // { index: "transfer", label: "Transfer" },
        // { index: "credentials", label: "Credentials" }
      ],
      searchContent: "",
      searchStatus: false
    };
  },
  inject: ["reload"],
  methods: {
    handleSelect(key, keyPath) {
      this.$router.push(key);
    },
    search() {
      let address = /^[0-9a-f]{40}$/;
      let txId = /^[0-9a-f]{64}$/;
      let blockHeight = /^[0-9]\d*$/;
      let token = /^[\s\S]{1,24}$/;
      if (this.searchContent) {
        if (address.test(this.searchContent)) {
          this.$router.push({
            path: "/addressDetail",
            query: { address: this.searchContent }
          });
          this.reload();
        } else if (txId.test(this.searchContent)) {
          this.$router.push({
            path: "/txidDetails",
            query: { id: this.searchContent }
          });
          this.reload();
        } else if (blockHeight.test(this.searchContent)) {
          this.$router.push({
            path: "/blockDetail",
            query: { height: this.searchContent }
          });
          this.reload();
        } else if (token.test(this.searchContent)) {
          this.$router.push({
            path: "/tokenDetail",
            query: { token: this.searchContent }
          });
          this.reload();
        }
      }
    },
    searchBtnAct() {
      if (this.searchContent) {
        this.searchStatus = true;
      } else {
        this.searchStatus = false;
      }
    }
  },
  computed: {
    activeIndex: function() {
      return this.$route.name;
    }
  },
  mounted() {}
};
</script>

<style>
.menu {
  /*height: 60px;*/
  background-color: #1e3a71;
  width: 100%;
  justify-content: center;
}

.flex-center {
  height: 80px;
  display: flex;
  /*justify-content: flex-end;;*/
  margin: auto;
  width: 1200px;
}

.navbar-right {
  background-color: #1e3a71;
  width: 100%;
  display: flex;
  justify-content: flex-start;
}
.navbar-right ul {
  margin-left: 10%;
}

.navbar-left {
  display: flex;
  align-items: center;
}
.el-menu--horizontal > .el-menu-item {
  height: 80px;
  padding-top: 10px;
}
.searchBar {
  display: flex;
  align-items: center;
}
.searchBar .el-input__inner {
  width: 483px;
  height: 48px;
}
.searchBar .el-input-group__append {
  background: #fff;
}
.searchBar .searchIconDefalt {
  padding: 20px;
  background: url("../../assets/icon/search_defalt.png") no-repeat center;
  background-size: 22px 22px;
}
.searchBar .searchIconActive {
  padding: 20px;
  background: url("../../assets/icon/search_icon.png") no-repeat center;
  background-size: 22px 22px;
}
</style>
