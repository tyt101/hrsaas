<template>
    <el-dialog :visible="showDialog" title="新增员工" @close="btnCancel">
        <el-form ref="formData" label-width="120px" :model="formData" :rules="rules">
            <el-form-item label="姓名" prop="username">
                <el-input v-model="formData.username" style="width:50%" placeholder="请输入姓名" />
            </el-form-item>
            <el-form-item label="手机" prop="mobile">
                <el-input v-model="formData.mobile"  style="width:50%" placeholder="请输入手机号" />
            </el-form-item>
            <el-form-item label="入职时间" prop="timeOfEntry">
                <el-date-picker v-model="formData.timeOfEntry" style="width:50%" placeholder="请选择" />
            </el-form-item>
            <el-form-item label="聘用形式" prop="formOfEmployment">
                <el-select v-model="formData.formOfEmployment" style="width:50%" placeholder="请选择" >
                    <el-option v-for="e in EmployeeEnum.hireType" :key="e.id" :value="e.id" :label="e.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="工号" prop="workNumber">
                <el-input v-model="formData.workNumber" style="width:50%" placeholder="请输入工号" />
            </el-form-item>
            <el-form-item label="部门" prop="departmentName">
                <el-input v-model="formData.departmentName" style="width:50%" placeholder="请输入部门" @focus="getDepartments" />
                <el-tree v-loading="loading" v-if="showtree" :data="treeData" :props="{label:'name'}" @node-click="selectnode"/>
            </el-form-item>
            <el-form-item label="转正时间" prop="correctionTime">
                <el-date-picker v-model="formData.correctionTime" style="width:50%" placeholder="请选择" />
            </el-form-item>
        </el-form>
        <el-row slot="footer" type="flex" justify="center" align="center">
            <el-col :span="5">
                <el-button size="small" @click="btnCancel">取消</el-button>
                <el-button size="small" type="primary" @click="btnOk">确认</el-button>
            </el-col>
        </el-row>
    </el-dialog>
</template>

<script>
import {getDepartments} from '@/api/departments'
import {tranListToTreeData} from '@/utils'
import EmployeeEnum from '@/api/constant/employees'
import { addEmployee } from '@/api/employees'
export default {
    props:{
        showDialog:{
            type:Boolean,
            default:false
        }
    },
    data() {
        return {
            EmployeeEnum,
            loading:false,
            showtree:false,
            treeData:[],
            formData:{
                username: '',
                mobile: '',
                formOfEmployment: '',
                workNumber: '',
                departmentName: '',
                timeOfEntry: '',
                correctionTime: ''
            },
            rules:{
                username: [
                    {required:true,message:'用户名不能为空',trigger:'blur'},
                    {min:1,max:4,message:'用户名1~4位',trigger:'blur'}
                ],
                mobile: [
                    {required:true,message:'手机号不能为空',trigger:'blur'},
                    {patter:/1[3-9]\d{9}$/,message:'手机号格式不正确',trigger:'blur'}
                ],
                formOfEmployment: [{ required: true, message: '聘用形式不能为空', trigger: 'blur' }],
                workNumber: [{ required: true, message: '工号不能为空', trigger: 'blur' }],
                departmentName: [{ required: true, message: '部门不能为空', trigger: 'change' }],
                timeOfEntry: [{ required: true, message: '入职时间不能为空', trigger: 'blur' }],
                correctionTime: [{ required: true, message: '转正时间不能为空', trigger: 'blur' }]
            }
        }
    },
    methods: {
        async getDepartments(){
            this.loading = true
            this.showtree = true
            const {depts} = await getDepartments()
            this.treeData = tranListToTreeData(depts,'')
            this.loading = false
        },
        selectnode(node){
            this.formData.departmentName = node.name
            this.showtree = false
        },
        async btnOk(){
            try {
                await this.$refs.formData.validate()
                await addEmployee(this.formData)
                this.$parent.getEmployeeList()
                this.$parent.showDialog = false
                this.$message.success('新增成功')
            } catch (error) {
                console.log(error)
            }
        },
        async btnCancel(){
            this.formData={
                username: '',
                mobile: '',
                formOfEmployment: '',
                workNumber: '',
                departmentName: '',
                timeOfEntry: '',
                correctionTime: ''
            },
            console.log('close')
            this.$refs.formData.resetFields()
            this.$parent.showDialog=false
            // this.$emit('update:showDialog',false)
        }
    },
}
</script>

<style>

</style>