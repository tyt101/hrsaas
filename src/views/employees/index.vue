<template>
  <div class="dashboard-container">
    <div class="app-container">
      <pagetool :showbefore="true">
        <template slot="before">
          共{{ page.total }}条记录
        </template>
        <template slot="after">
          <el-button size="small" type="succuss" @click="$router.push('/import')">导入</el-button>
          <el-button size="small" type="danger" @click="exportData">导出</el-button>
          <el-button size="small" type="primary" @click="showDialog=true">新增员工</el-button>
        </template>
      </pagetool>
      <el-card v-loading="loading">
        <el-table :data="list" border="">
          <el-table-column type="index" label="序号" sortable="" />
          <el-table-column prop="username" label="姓名" sortable="" />
          <el-table-column prop="staffPhoto" label="头像" sortable="">
            <template slot-scope="{row}">
              <img v-imagerror="require('@/assets/common/bigUserHeader.png')" :src="row.staffPhoto" alt="" style="width:100px;height:100px" @click="getQrCode(row.staffPhoto)">
            </template>
          </el-table-column>
          <el-table-column prop="mobile" label="手机号" sortable="" />
          <el-table-column prop="workNumber" label="工号" sortable="" />
          <el-table-column prop="formOfEmployment" label="聘用形式" :formatter="formatEmployment" sortable="" />
          <el-table-column prop="departmentName" label="部门" sortable="" />
          <el-table-column prop="timeOfEntry" label="入职时间" sortable="">
            <template slot-scope="{row}">
              {{ row.timeOfEntry|formatDate }}
            </template>
          </el-table-column>
          <el-table-column prop="enableState" label="账户状态" sortable="">
            <template slot-scope="{row}">
              <el-switch :value="row.enableState === 1" />
            </template>
          </el-table-column>
          <el-table-column label="操作" sortable="" fixed="right" width="280">
            <template slot-scope="{row}">
              <el-button size="small" type="text" @click="$router.push(`/employees/detail/${row.id}`)">查看</el-button>
              <el-button size="small" type="text">转正</el-button>
              <el-button size="small" type="text">调岗</el-button>
              <el-button size="small" type="text">离职</el-button>
              <el-button size="small" type="text" @click="editRow(row.id)">角色</el-button>
              <el-button size="small" type="text" @click="delEmployee(row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-row type="flex" justify="center" align="center" style="height:60px">
          <el-pagination
            layout="prev,pager,next"
            :page-size="page.size"
            :current-page="page.page"
            :total="page.total"
            @current-change="changePage"
          />
        </el-row>
      </el-card>
    </div>
    <add-employee :show-dialog.sync="showDialog" />
    <el-Dialog :visible.sync="showCodeDialog" title="二维码">
      <el-row type="flex" justify="center" align="center">
        <canvas ref="myCanvas" />
      </el-row>
    </el-Dialog>
    <assign-row ref="assignRole" :show-role-dialog.sync="showRoleDialog" :user-id="userId" />
  </div>
</template>

<script>
import EmployeeEnum from '@/api/constant/employees'
import { getEmployeeList, delEmployee } from '@/api/employees'
import addEmployee from './components/add-employee.vue'
import assignRow from './components/assign-row.vue'
import { formatDate } from '@/filters'
import QrCode from 'qrcode'
export default {
  components: { addEmployee, assignRow },
  data() {
    return {
      userId: null,
      showRoleDialog: false,
      showCodeDialog: false,
      showDialog: false,
      loading: false,
      list: [],
      page: {
        page: 1,
        size: 10,
        total: 0
      }
    }
  },
  created() {
    this.getEmployeeList()
  },
  methods: {
    getQrCode(src) {
      if (src) {
        this.showCodeDialog = true
        this.$nextTick(() => {
          QrCode.toCanvas(this.$refs.myCanvas, src)
        })
      } else {
        this.$message.warning('该用户还未上传头像')
      }
    },
    async getEmployeeList() {
      this.loading = true
      const { total, rows } = await getEmployeeList(this.page)
      this.page.total = total
      this.list = rows
      this.loading = false
    },
    changePage(newpage) {
      this.page.page = newpage
      this.getEmployeeList()
    },
    formatEmployment(row, column, cellValue, index) {
      const obj = EmployeeEnum.hireType.find(item => item.id === cellValue)
      return obj ? obj.value : '未知'
    },
    async delEmployee(id) {
      try {
        await this.$confirm('确认删除吗')
        console.log('删除')
        await delEmployee(id)
        this.$message.success('删除成功')
        this.getEmployeeList()
      } catch (error) {
        console.log(error)
      }
    },
    exportData() {
      const headers = {
        '姓名': 'username',
        '手机号': 'mobile',
        '入职日期': 'timeOfEntry',
        '聘用形式': 'formOfEmployment',
        '转正日期': 'correctionTime',
        '工号': 'workNumber',
        '部门': 'departmentName'
      }
      import('@/vendor/Export2Excel').then(async excel => {
        const { rows } = await getEmployeeList({ page: 1, size: this.page.total })
        const data = this.formatJson1(headers, rows)
        excel.export_json_to_excel({
          multiHeader: [['姓名', '主要信息', '', '', '', '', '部门']],
          merges: ['A1:A2', 'B1:F1', 'G1:G2'],
          header: Object.keys(headers),
          data: data,
          filename: '怪异文件',
          bookType: 'xlsx'
        })
      })
    },
    formatJson(headers, rows) {
      return rows.map(item => {
        return Object.keys(headers).map(key => {
          return item[headers[key]]
        })
      })
    },
    formatJson1(headers, rows) {
      const b = []
      rows.map(item => {
        const a = []
        Object.keys(headers).map(key => {
          if (headers[key] === 'timeOfEntry' || headers[key] === 'correctionTime') {
            a.push(formatDate(item[headers[key]]))
          } else if (headers[key] === 'formOfEmployment') {
            const obj = EmployeeEnum.hireType.find(obj => obj.id === item[headers[key]])
            a.push(obj ? obj.value : '未知')
          } else { a.push(item[headers[key]]) }
        })
        b.push(a)
      })
      return b
    },
    async editRow(id) {
      this.userId = id
      await this.$refs.assignRole.getUserDetailById(id)
      this.showRoleDialog = true
    }
  }
}
</script>

<style>

</style>
