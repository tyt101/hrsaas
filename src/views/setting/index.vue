<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <el-tab-pane label="角色管理">
            <el-row style="height:60px">
              <el-button type="primary" size="small" @click="showDialog = true">
                新增角色
              </el-button>
            </el-row>
            <el-table border="" :data="list">
              <el-table-column type="index" label="序列" width="120px" />
              <el-table-column prop="name" label="角色名称" width="240px" />
              <el-table-column prop="description" label="描述" />
              <el-table-column label="操作">
                <template slot-scope="{ row }">
                  <el-button size="small" type="succuss" @click="assignPerm(row.id)">分配权限</el-button>
                  <el-button size="small" type="primary" @click="editRole(row.id)">编辑</el-button>
                  <el-button size="small" type="danger" @click="delRole(row.id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-row type="flex" justify="center" style="height:60px" align="middle">
              <el-pagination
                layout="prev,pager,next"
                :current-page="page.page"
                :page-size="page.pagesize"
                :total="page.total"
                @current-change="changePage"
              />
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="公司信息">
            <el-alert
              title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
              type="info"
              show-icon
              :closable="false"
            />
            <el-form label-width="120px" style="margin-top:50px">
              <el-form-item label="企业名称">
                <el-input v-model="formData.name" type="text" style="width:400px" disabled />
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input v-model="formData.companyAddress" style="width:400px" disabled />
              </el-form-item>
              <el-form-item label="公司电话">
                <el-input v-model="formData.companyPhone" style="width:400px" disabled />
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input v-model="formData.mailbox" style="width:400px" disabled />
              </el-form-item>
              <el-form-item label="备注">
                <el-input v-model="formData.remarks" type="textarea" :rows="3" style="width:400px" disabled />
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-card>
      <el-dialog :visible="showDialog" title="新增" @close="btnCancel">
        <el-form ref="roleForm" label-width="120px" :model="roleForm" :rules="rules">
          <el-form-item label="角色名称" prop="name">
            <el-input v-model="roleForm.name" />
          </el-form-item>
          <el-form-item label="角色描述">
            <el-input v-model="roleForm.description" />
          </el-form-item>
        </el-form>
        <el-row slot="footer" type="flex" justify="center">
          <el-col :span="5">
            <el-button @click="btnCancel">取消</el-button>
            <el-button type="primary" @click="btnOk">确认</el-button>
          </el-col>
        </el-row>
      </el-dialog>
    </div>
    <el-dialog title="分配权限" :visible.sync="showPermDialog">
      <el-tree
        ref="permTree"
        node-key="id"
        :show-checkbox="true"
        :data="permData"
        :props="defaultperm"
        :default-expand-all="true"
        :default-checked-keys="selectCheck"
        :check-strictly="true"
      />
      <el-row slot="footer" type="flex" justify="center">
        <el-col :span="5">
          <el-button size="small" @click="btnCancel1">取消</el-button>
          <el-button size="small" type="primary" @click="btnOk1">确定</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>

import { getRoleList, getCompanyInfo, delRole, getRoleDetail, updateRole, addRole, assignPerm } from '@/api/setting'
import { mapGetters } from 'vuex'
import { getPermissionList } from '@/api/permission'
import { tranListToTreeData } from '@/utils'
export default {
  data() {
    return {
      roleId: null,
      selectCheck: [],
      permData: [],
      defaultperm: {
        label: 'name'
      },
      showPermDialog: false,
      showDialog: false,
      list: [],
      page: {
        page: 1,
        pagesize: 10,
        total: 0
      },
      formData: {
        name: '',
        companyAddress: '',
        companyPhone: '',
        mailbox: '',
        remarks: ''
      },
      roleForm: {

      },
      rules: {
         name: [{ required: true, message: '角色名称不能为空', trigger: 'blur' }]
      }
    }
  },
  computed: {
    ...mapGetters(['companyId'])
  },
  created() {
    this.getRoleList()
    this.getCompanyInfo()
  },
  methods: {
    async getRoleList() {
      const { total, rows } = await getRoleList(this.page)
      this.page.total = total
      this.list = rows
    },
    async getCompanyInfo() {
      this.formData = await getCompanyInfo(this.companyId)
    },
    changePage(rows) {
      this.page.page = rows
      this.getRoleList()
    },
    async delRole(id) {
      try {
        await this.$confirm('确认删除员工吗?')
        await delRole(id)
        this.$message.success('删除成功')
        this.getRoleList()
      } catch (error) {
        console.log(error)
      }
    },
    async editRole(id) {
      this.roleForm = await getRoleDetail(id)
      this.showDialog = true
    },
    async btnOk() {
      try {
        await this.$refs.roleForm.validate()
      if (this.roleForm.id) {
        await updateRole(this.roleForm)
      } else {
        await addRole(this.roleForm)
      }
      this.getRoleList()
      this.$message.success('操作成功')
      this.showDialog = false
      } catch (error) {
        console.log(error)
      }
    },
    btnCancel() {
      console.log('触发了关闭事件')
      this.roleForm = {
        name: '',
        description: ''
      }
      this.$refs.roleForm.resetFields()
      this.showDialog = false
    },
    async assignPerm(id) {
      this.roleId = id
      const { permIds } = await getRoleDetail(id)
      this.selectCheck = permIds
      this.permData = tranListToTreeData(await getPermissionList(), '0')
      this.showPermDialog = true
    },
    async btnOk1() {
      await assignPerm({ permIds: this.$refs.permTree.getCheckedKeys(), id: this.roleId })
      this.$message.success('更新成功')
      this.showPermDialog = false
    },
    btnCancel1() {
      this.selectCheck = []
      this.showPermDialog = false
    }
  }
}
</script>

<style>

</style>
