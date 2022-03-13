<template>
  <div class="dashboard-container">
    <div class="app-container">
      <pagetool :showbefore="true">
        <template slot="before">
          共100条记录
        </template>
        <template slot="after">
          <el-button size="small" type="succuss">导入</el-button>
          <el-button size="small" type="danger">导出</el-button>
          <el-button size="small" type="primary">新增员工</el-button>
        </template>
      </pagetool>  
      <el-card>
        <el-table>
          <el-table-column label="序号" sortable="" />
          <el-table-column label="姓名" sortable="" />
          <el-table-column label="工号" sortable="" />
          <el-table-column label="聘用形式" sortable="" />
          <el-table-column label="部门" sortable="" />
          <el-table-column label="入职时间" sortable="" />
          <el-table-column label="账户状态" sortable="" />
          <el-table-column label="操作" sortable="" fixed="right" width="280">
            <template>
              <el-button size="small">查看</el-button>
              <el-button size="small">转正</el-button>
              <el-button size="small">调岗</el-button>
              <el-button size="small">离职</el-button>
              <el-button size="small">角色</el-button>
              <el-button size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-row type="flex" justify="center" align="center" style="height:60px">
          <el-pagination layout="prev,pager,next" />
        </el-row>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
