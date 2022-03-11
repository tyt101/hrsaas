<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="tree-card">
        <treetool :tree-node="company" :isRoot="true"  @addDepts="addDepts"/>
        <el-tree :data="departs">
          <treetool slot-scope="{ data }" :tree-node="data"  @addDepts="addDepts" @deldepts="getDepartments" />
        </el-tree>
      </el-card>
      <add-dept :show-dialog="showDialog" @closedept="closedept"></add-dept>
    </div>
  </div>
</template>

<script>
import treetool from './components/tree-tool.vue'
import {getDepartments} from '@/api/departments'
import {tranListToTreeData} from '@/utils'
import AddDept from './components/add-dept'
export default {
  data() {
    return {
      company: {},
      departs: [],
      showDialog:false,
      node : null
    }
  },
  components:{
    treetool,AddDept

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
    },
    addDepts(node){
    this.showDialog=true
    this.node=node
    },
    closedept(){
      this.showDialog=false
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
