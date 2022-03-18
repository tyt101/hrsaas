<template>
  <el-dialog :visible="showRoleDialog" title="分配角色" @close="btnCancel">
    <el-checkbox-group v-model="roleIds">
      //
      <el-checkbox v-for="v in checkList" :key="v.id" :label="v.id">
        {{ v.name }}
      </el-checkbox>
    </el-checkbox-group>
    <el-row slot="footer" type="flex" justify="center">
      <el-col :span="5">
        <el-button @click="btnCancel">取消</el-button>
        <el-button type="primary" @click="btnOk">确定</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { getRoleList } from '@/api/setting'
import { getUserDetailById } from '@/api/user'
import { assignRoles } from '@/api/employees'
export default {
    props: {
        showRoleDialog: {
            type: Boolean,
            default: false
        },
        userId: {
            type: String,
            default: null
        }
    },
    data() {
        return {
            checkList: [],
            roleIds: []
        }
    },
    created() {
      this.getRoleList()
    },
    methods: {
      async getRoleList() {
        const { rows } = await getRoleList({ page: 1, pagesize: 5 })
        this.checkList = rows
      },
      async getUserDetailById(id) {
        const { roleIds } = await getUserDetailById(id)
        this.roleIds = roleIds
      },
      async btnOk() {
        await assignRoles({ id: this.userId, roleIds: this.roleIds })
        this.$emit('update:showRoleDialog', false)
      },
      btnCancel() {
        this.roleIds = []
        this.$emit('update:showRoleDialog', false)
      }
    }
}
</script>

<style>

</style>