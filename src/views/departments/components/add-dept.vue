<template>
    <el-dialog :visible="showDialog" title="新增部门" :before-close="handleClose">
        <el-form :model="formData" :rules="rule" label-width="120px">
            <el-form-item label="部门名称" prop="name">
                <el-input v-model="formData.name" style="width:80%" placeholder="1-50个字符" ></el-input>
            </el-form-item>
            <el-form-item label="部门编码" prop="code">
                <el-input v-model="formData.code" style="width:80%" placeholder="1-50个字符"></el-input>
            </el-form-item>
            <el-form-item label="部门负责人" prop="manager">
                <el-select v-model="formData.manager" style="width:80%" placeholder="请选择" @focus="getEmployeeSimple"></el-select>  
            </el-form-item>
            <el-form-item label="部门介绍" prop="introduce">
                <el-input v-model="formData.introduce" style="width:80%" placeholder="1-300个字符" type="textarea" :rows="3"></el-input>
            </el-form-item>
        </el-form>
        <el-row slot="footer" type="flex" justify="center">
        <!-- 列被分为24 -->
            <el-col :span="6">
                <el-button type="primary" size="small">确定</el-button>
                <el-button size="small">取消</el-button>
            </el-col>
        </el-row>
    </el-dialog>
</template>

<script>
import { getDepartments } from '@/api/departments'
import {getEmployeeSimple} from '@/api/employees'
export default {
    data() {
        const checkNameRepeat=async (rule,value,callback)=>{
            console.log(this.treeNode.id)
            const {depts} = await getDepartments()
            const isRepeat = depts.filter(item=>item.pid ===this.treeNode.id).some(item=>item.name ===value)
            isRepeat?callback(new Error(`该部门已经存在${value}部门了`)):console.log('你好')
        };
        const checkCodeRepeat = async(rule,value,callback)=>{
            const {depts} = await getDepartments()
            const isRepeat = depts.some(item=>item.code===value&&value)
            isRepeat?callback(new Error(`该部门编码${value}已经存在`)):callback()
        }
        return {
            people:[],
            formData:{
                name:'',
                code:'',
                manager:'',
                introduce:''
            },
            rule:{
                name:[
                    {required:true,message:'部门名称不能为空',trigger:'blur'},
                    {min:1,max:50,message:'部门名称要求1-50个字符',trigger:'blur'},
                    {validator:checkNameRepeat,trigger:'blur'}
                ],
                code:[
                    {required:true,message:'部门编码不能为空',trigger:'blur'},
                    {min:1,max:50,message:'部门编码要求1-50个字符',trigger:'blur'},
                    {validator:checkCodeRepeat,trigger:'blur'}
                ],
                manager:[
                    {required:true,message:'部门负责人不能为空',trigger:'blur'},
                ],
                introduce:[
                    {required:true,message:'部门介绍不能为空',trigger:'blur'},
                    {min:1,max:300,message:'部门介绍要求1-300个字符',trigger:'blur'}
                ]
            }
        }
    },
    props:{
        showDialog:{
            type:Boolean,
            default:false
        },
        treeNode:{
            type:Object,
            default:null  
        }
    },
    methods: {
        handleClose(done) {
        this.$confirm('确认关闭？')
          .then(() => {
            this.$emit('closedept')
          })
          .catch(() => {});
      },
      async getEmployeeSimple(){
          this.people = await getEmployeeSimple()
      }
    },
}
</script>

<style>

</style>