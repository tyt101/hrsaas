<template>
  <div class="dashboard-container">
    <div class="app-container">
      <pagetool>
        <el-button slot="after" type="primary" size="small" @click="addPermission(1,'0')">添加权限</el-button>
      </pagetool>
      <el-table :data="list" border="" row-key="id">
        <el-table-column prop="name" align="center" label="名称" />
        <el-table-column prop="code" align="center" label="标识" />
        <el-table-column prop="description" align="center" label="描述" />
        <el-table-column align="center" label="操作">
          <template v-slot="{row}">
            <el-button v-if="row.type===1" size="small" type="text" @click="addPermission(2,row.id)">添加</el-button>
            <el-button size="small" type="text" @click="updatePermission(row.id)">编辑</el-button>
            <el-button size="small" type="text" @click="delPermission(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog :visible="showDialog" :title="showName" @close="btnCancel">
        <el-form ref="perData" :rules="rules" label-width="80px" :model="formData">
          <el-form-item label="权限名称" prop="name">
            <el-input v-model="formData.name" />
          </el-form-item>
          <el-form-item label="权限标识" prop="code">
            <el-input v-model="formData.code" />
          </el-form-item>
          <el-form-item label="权限描述" prop="description">
            <el-input v-model="formData.description" />
          </el-form-item>
          <el-form-item label="开启" prop="enVisible">
            <el-switch v-model="formData.enVisible" active-value="1" inactive-value="0" />
          </el-form-item>
        </el-form>
        <el-row type="flex" justify="center">
          <el-col :span="5">
            <el-button @click="btnCancel">取消</el-button>
            <el-button type="primary" @click="btnOk">确认</el-button>
          </el-col>
        </el-row>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getPermissionList, addPermission, updatePermission, delPermission, getPermissionDetail } from '@/api/permission'
import { tranListToTreeData } from '@/utils'
export default {
  data() {
    return {
      showDialog: false,
      list: [],
      formData: {
        name: '',
        code: '',
        description: '',
        type: '',
        pid: '',
        enVisible: '0'
      },
      rules: {
        name: [{ required: true, trigger: 'blur', message: '权限名称不能未空' }],
        code: [{ required: true, trigger: 'blur', message: '权限标识不能为空' }]
      }
    }
  },
  created() {
    this.getPermissionList()
  },
  methods: {
    async  getPermissionList() {
      this.list = tranListToTreeData(await getPermissionList(), '0')
    },
    async delPermission(id) {
      await delPermission(id)
      this.$message.success('删除成功')
      this.getPermissionList()
    },
    addPermission(type, pid) {
      this.showName = '新增权限'
      this.formData.type = type
      this.formData.pid = pid
      this.showDialog = true
    },
    btnOk() {
      this.$refs.perData.validate().then(() => {
        if (this.formData.id) {
          return updatePermission(this.formData)
        } else {
          return addPermission(this.formData)
        }
      }).then(() => {
        this.getPermissionList()
        this.$message.success('操作成功')
        this.showDialog = false
      })
    },
    btnCancel() {
      this.formData = {
        name: '',
        code: '',
        description: '',
        type: '',
        pid: '',
        enVisible: '0'
      }
      this.$refs.perData.resetFields()
      this.showDialog = false
    },
    async updatePermission(id) {
      this.showName = '编辑权限'
      this.formData = await getPermissionDetail(id)
      this.showDialog = true
    }
  }
}
</script>

<style>

</style>
