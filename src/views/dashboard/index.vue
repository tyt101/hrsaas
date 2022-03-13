<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <pagetool :showbefore="true">
      <template v-slot:before>
        <span >你好</span>
      </template>
      <el-button slot="after" type="primary">点击</el-button>
    </pagetool>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
