<template>
  <div class="pagination">
    <div class="pagination-first" @click="firstPage" :class="{'isPageNut': currentPage <= 1}">First</div>
    <div class="pagination-prev" @click="prevPage" :class="{'isPageNut': currentPage <= 1}">
      <i class="el-icon-arrow-left"></i>
    </div>
    <div class="pagination-next" @click="nextPage" :class="{'isPageNut': currentPage >= totalPage || currentPage == totalPage}">
      <i class="el-icon-arrow-right"></i>
    </div>
    <div class="pagination-pages">
      <span style="float: left;">Jump</span>
      <input type="text" class="current" v-model="inputPage" @blur="isEdit = false;jumpPage('blur')" v-show="isEdit" ref="editPage" @keyup.enter="jumpPage" v-enterNumber>
      <span v-show="!isEdit" @click="changEdit" style="float: left;margin-left: 15px;cursor:text;">
        <span class="pagination-currPage">{{currentPage}}</span>/{{totalPage}}
      </span>
      <el-dropdown @command="jumpPage">
        <span class="el-dropdown-link">
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown" placement="bottom-start" class="pagination-down">
          <el-dropdown-item :command="v" v-for="v in totalPage" :key="v">{{v}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="pagination-last" @click="lastPage" :class="{'isPageNut': currentPage >= totalPage}">Last</div>
  </div>
</template>
<script>
export default {
  name: 'Pagination',
  data() {
    return {
      inputPage: '',
      isEdit: false
    }
  },
  computed: {
    totalPage() {
      if (this.totalStrip <= 20) {
        return 1;
      } else {
        return Math.ceil(this.totalStrip / 20); // Divide the pages by 20 items per page
      }
    }
  },
  directives: {
    enterNumber:{
      inserted:function (el){
        el.addEventListener("keypress",function(e){
          e = e || window.event;
          let charcode = typeof e.charCode == 'number' ? e.charCode : e.keyCode;
          let re = /\d/;
          if(charcode == 46){
            if(el.value.includes('.')){
              e.preventDefault();
            }else { 
              e.preventDefault();
            }
            return;
          }else if(!re.test(String.fromCharCode(charcode)) && charcode > 9 && !e.ctrlKey){
            if(e.preventDefault){
              e.preventDefault();
            }else{
              e.returnValue = false;
            }
          }
        });
      }
    }
  },
  props: ['currentPage', 'totalStrip'],
  watch: {
    currentPage(n) {
      this.inputPage = this.currentPage;
    }
  },
  methods: {
    jumpPage(page) {
      if (typeof page === 'string' || typeof page === 'number') {
        if (page === 'blur') {
          if (this.inputPage >= this.totalPage) {
            this.inputPage = this.totalPage;
            this.$emit('changePage', this.inputPage);
          } else if (!this.inputPage) {
            this.$emit('changePage', 1);
          } else {
            this.$emit('changePage', this.inputPage);
          }
        } else {
          this.$emit('changePage', page);
        }
      } else {
        this.isEdit = false;
      }
    },
    // page down
    nextPage() {
      if (this.currentPage >= this.totalPage) {
        return;
      } else {
        this.$emit('nextPage');
      }
    },
    // page up
    prevPage() {
      if (this.currentPage <= 1) {
        return;
      } else {
        this.$emit('prevPage');
      }
    },
    // Pagination jumps to the last page
    lastPage() {
      if (this.currentPage == this.totalPage) {
        return;
      } else {
        this.$emit('lastPage', this.totalPage);
      }
    },
    // Page breaks to the first page
    firstPage() {
      if (this.currentPage == 1) {
        return;
      } else {
        this.$emit('firstPage');
      }
    },
    // Change the page-turning edit state
    changEdit() {
      this.isEdit = true;
      this.$nextTick(() => {
        this.$refs.editPage.focus();
      });
    }
  }
}
</script>
<style>
.pagination-down {
  overflow: auto;
  max-height: 200px;
}
</style>
<style lang="scss" scoped>
.pagination {
  height: 36px;
  float: right;
  margin-top: 16px;
  & > div {
    margin-right: 10px;
    height: 36px;
    float: left;
    text-align: center;
    line-height: 36px;
    font-size: 14px;
    cursor: pointer;
    border: 1px solid #E9E9E9;
    background-color: #fff;
  }
  .pagination-last {
    margin-right: 0px;
  }
  .pagination-pages {
    width: 155px;
    box-sizing: border-box;
    padding-left: 10px;
    .icon {
      display: inline-block;
      width: 36px;
      height: 100%;
      border-left: 1px solid #E9E9E9;
    }
    .current {
      border: 0;
      width: 55px;
      height: 100%;
      float: left;
      box-sizing: border-box;
      padding: 5px;
      outline: none;
      font-size: 14px;
      font-weight: normal;
      color: #444;
      vertical-align: top;
    }
    .el-input__inner {
      width: 50px;
      padding: 0 5px;
      border: 0;
      vertical-align: top;
      font-size: 14px;
      color: #444;
    }
  }
  .isPageNut {
    cursor: no-drop;
    color: #ccc;
    i {
      color: #ccc;
    }
  }
}
.pagination:after {
  content: '';
  height: 0;
  display: block;
  clear: both;
}
</style>
