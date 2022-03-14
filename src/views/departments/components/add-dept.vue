<template>
  <el-dialog :visible="showDialog" :title="showTitle" @close="btnClose">
    <el-form ref="deptForm" :model="formData" :rules="rule" label-width="120px">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="formData.name" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="formData.code" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select v-model="formData.manager" style="width:80%" placeholder="请选择" @focus="getEmployeeSimple">
          <el-option v-for="p in people" :key="p.id" :label="p.username" :value="p.username" />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input v-model="formData.introduce" style="width:80%" placeholder="1-300个字符" type="textarea" :rows="3" />
      </el-form-item>
    </el-form>
    <el-row slot="footer" type="flex" justify="center">
      <!-- 列被分为24 -->
      <el-col :span="6">
        <el-button type="primary" size="small" @click="btnOK">确定</el-button>
        <el-button size="small" @click="btnClose">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { addDepartments, getDepartments, getDepartDetail, updateDepartments } from '@/api/departments'
import { getEmployeeSimple } from '@/api/employees'
export default {
    props: {
        showDialog: {
            type: Boolean,
            default: false
        },
        treeNode: {
            type: Object,
            default: null
        }
    },
    data() {
        const checkNameRepeat = async(rule, value, callback) => {
            console.log(this.treeNode.id)
            const { depts } = await getDepartments()
            let isRepeat = false
            if (this.formData.id) {
                isRepeat = depts.filter(item => item.pid === this.treeNode.pid && item.id !== this.treeNode.id).some(item => item.name === value)
            } else {
                isRepeat = depts.filter(item => item.pid === this.treeNode.id).some(item => item.name === value)
            }
            isRepeat ? callback(new Error(`该部门已经存在${value}部门了`)) : console.log('你好')
        }
        const checkCodeRepeat = async(rule, value, callback) => {
            const { depts } = await getDepartments()
            let isRepeat = false
            if (this.formData.id) {
                isRepeat = depts.filter(item => item.id !== this.treeNode.id).some(item => item.code === value && value)
            } else {
                isRepeat = depts.some(item => item.code === value && value)
            }
            isRepeat ? callback(new Error(`该部门编码${value}已经存在`)) : callback()
        }
        return {
            people: [],
            formData: {
                name: '',
                code: '',
                manager: '',
                introduce: ''
            },
            rule: {
                name: [
                    { required: true, message: '部门名称不能为空', trigger: 'blur' },
                    { min: 1, max: 50, message: '部门名称要求1-50个字符', trigger: 'blur' },
                    { validator: checkNameRepeat, trigger: 'blur' }
                ],
                code: [
                    { required: true, message: '部门编码不能为空', trigger: 'blur' },
                    { min: 1, max: 50, message: '部门编码要求1-50个字符', trigger: 'blur' },
                    { validator: checkCodeRepeat, trigger: 'blur' }
                ],
                manager: [
                    { required: true, message: '部门负责人不能为空', trigger: 'blur' }
                ],
                introduce: [
                    { required: true, message: '部门介绍不能为空', trigger: 'blur' },
                    { min: 1, max: 300, message: '部门介绍要求1-300个字符', trigger: 'blur' }
                ]
            }
        }
    },
    computed: {
        showTitle() {
            return this.formData.id ? '编辑部门' : '新增子部门'
        }
    },
    methods: {
      async getEmployeeSimple() {
          this.people = await getEmployeeSimple()
      },
      async getDepartDetail(id) {
          this.formData = await getDepartDetail(id)
      },
      btnOK() {
          this.$refs.deptForm.validate(async isOK => {
              if (isOK) {
                  if (this.formData.id) {
                      await updateDepartments(this.formData)
                  } else {
                      await addDepartments({ ...this.formData, pid: this.treeNode.id })
                  }
                  this.$emit('addDepts')
                  this.$emit('update:showDialog', false)
              }
          })
      },
      btnClose() {
          this.formData = {
            name: '',
            code: '',
            manager: '',
            introduce: ''
          }
          this.$emit('update:showDialog', false)
          this.$refs.deptForm.resetFields()
      }
    }
}
</script>

<style>

</style>