<template>
  <div class="dashboard-container">
    <div class="app-container">
      <pagetool :showbefore="true">
        <template slot="before">
          共{{page.total}}条记录
        </template>
        <template slot="after">
          <el-button size="small" type="succuss">导入</el-button>
          <el-button size="small" type="danger">导出</el-button>
          <el-button size="small" type="primary">新增员工</el-button>
        </template>
      </pagetool>  
      <el-card v-loading="loading">
        <el-table :data="list" border="" >
          <el-table-column type="index" label="序号" sortable="" />
          <el-table-column prop="username" label="姓名" sortable="" />
          <el-table-column prop="workNumber" label="工号" sortable="" />
          <el-table-column prop="formOfEmployment" label="聘用形式" :formatter="formatEmployment" sortable="" />
          <el-table-column prop="departmentName" label="部门" sortable="" />
          <el-table-column prop="timeOfEntry" label="入职时间" sortable="">
          <template slot-scope="{row}">
            {{row.timeOfEntry|formatDate}}
          </template>
          </el-table-column>
          <el-table-column prop="enableState" label="账户状态" sortable="">
          <template slot-scope="{row}">
            <el-switch :value="row.enableState === 1"></el-switch>
          </template>
          </el-table-column>
          <el-table-column label="操作" sortable="" fixed="right" width="280">
            <template>
              <el-button size="small" type="text">查看</el-button>
              <el-button size="small" type="text">转正</el-button>
              <el-button size="small" type="text">调岗</el-button>
              <el-button size="small" type="text">离职</el-button>
              <el-button size="small" type="text">角色</el-button>
              <el-button size="small" type="text">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-row type="flex" justify="center" align="center" style="height:60px">
          <el-pagination layout="prev,pager,next" 
          :page-size="page.size"
          :current-page="page.page"
          :total="page.total"
           @current-change="changePage"
          />
        </el-row>
      </el-card>
    </div>
  </div>
</template>

<script>
import EmployeeEnum from '@/api/constant/employees'
import {getEmployeeList} from '@/api/employees'
export default {
  data() {
    return {
      loading:false,
      list:[],
      page:{
        page:1,
        size:10,
        total:0
      }
    }
  },
  created() {
    this.getEmployeeList()
  },
  methods: {
    async getEmployeeList() {
      this.loading = true
      const { total, rows } = await getEmployeeList(this.page)
      this.page.total = total
      this.list = rows
      this.loading = false
    },
    changePage(newpage){
      this.page.page = newpage
      this.getEmployeeList()
    },
    formatEmployment(row, column, cellValue, index){
      const obj = EmployeeEnum.hireType.find(item=>item.id===cellValue)
      return obj?obj.value:'未知'
    }
  },
}
</script>

<style>

</style>
