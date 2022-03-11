<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="tree-card">
        <treetool :tree-node="company" :isRoot="true"/>
        <el-tree :data="departs">
          <treetool slot-scope="{ data }" :tree-node="data" @deldepts="getDepartments" />
        </el-tree>
      </el-card>
    </div>
  </div>
</template>

<script>
import treetool from './components/tree-tool.vue'
import {getDepartments} from '@/api/departments'
import {tranListToTreeData} from '@/utils'
export default {
  data() {
    return {
      company: {},
      departs: []
    }
  },
  components:{
    treetool
  },
  created(){
    this.getDepartments()
  },
  methods: {
    async getDepartments(){
      const result = await getDepartments()
      this.company = {name:result.companyName,manager:'负责人'}
      console.log(result)
      this.departs=tranListToTreeData(result.depts,'')
      console.log(this.departs)
    }
  },
}
</script>

<style scoped>
.tree-card{
  padding: 30px 140px;
  font-size:14px;
}
</style>
