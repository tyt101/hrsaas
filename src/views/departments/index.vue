<template>
  <div v-loading="loading" class="dashboard-container">
    <div class="app-container">
      <el-card class="tree-card">
        <treetool :tree-node="company" :is-root="true" @addDepts="addDepts" />
        <el-tree :data="departs" default-expand-all>
          <treetool slot-scope="{ data }" :tree-node="data" @editDepts="editDepts" @addDepts="addDepts" @deldepts="getDepartments" />
        </el-tree>
      </el-card>
      <add-dept ref="addDept" :show-dialog.sync="showDialog" :tree-node="node" @closedept="closedept" @addDepts="getDepartments" />
    </div>
  </div>
</template>

<script>
import treetool from './components/tree-tool.vue'
import { getDepartments } from '@/api/departments'
import { tranListToTreeData } from '@/utils'
import AddDept from './components/add-dept'
export default {
  components: {
    treetool, AddDept

  },
  data() {
    return {
      loading: false,
      company: {},
      departs: [],
      showDialog: false,
      node: null
    }
  },
  created() {
    this.getDepartments()
  },
  methods: {
    async getDepartments() {
      this.loading = true
      const result = await getDepartments()
      this.departs = tranListToTreeData(result.depts, '')
      this.company = { name: result.companyName, manager: '负责人', id: '' }
      this.loading = false
    },
    addDepts(node) {
      this.showDialog = true
      this.node = node
    },
    closedept() {
      this.showDialog = false
    },
    editDepts(node) {
      this.node = node
      console.log('edit改变了')
      this.$refs.addDept.getDepartDetail(node.id)
      this.showDialog = true
    }
  }

}
</script>

<style scoped>
.tree-card{
  padding: 30px 140px;
  font-size:14px;
}
</style>
