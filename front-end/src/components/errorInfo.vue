<template>
  <el-dialog
    title="Error Info"
    :visible.sync="dialogVisible"
    width="30%">
    <span>{{errorData.errorMessage}}</span>
    <span slot="footer" class="dialog-footer">
      <!-- <el-button @click="dialogVisible = false">cancel</el-button> -->
      <el-button type="primary" @click="dialogVisible = false">confirm</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { queryTx } from '@/api'

export default {
  name: 'Error',
  data(){
    return {
      dialogVisible: true,
      errorData: {}
    }
  },
  props: ['txid'],
  methods: {

  },
  async created() {
    let item = await queryTx({txid: this.txid});
    this.errorData = item.data.data;
  }
}
</script>
<style>

</style>
