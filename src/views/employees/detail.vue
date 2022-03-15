<template>
  <div class="dashboard-container">
    <div class="dashboard-text">
      <el-card>
        <el-tabs>
          <el-tab-pane label="登录账户设置">
            <el-form ref="userInfo" :rules="rules" :model="userInfo" label-width="120px" style="margin-left: 120px; margin-top:30px">
              <el-form-item label="姓名" prop="username">
                <el-input v-model="userInfo.username" style="width:300px" />
              </el-form-item>
              <el-form-item label="密码" prop="passwordd">
                <el-input v-model="userInfo.passwordd" style="width:300px" type="password" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="saveUserDetailById">确认更新</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="个人详情">
            <user-info />
          </el-tab-pane>
          <el-tab-pane label="岗位信息">
            <!-- <job-info /> -->
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getUserDetailById } from '@/api/user'
import { saveUserDetailById } from '@/api/employees'
import UserInfo from './components/user-info.vue'
// import JobInfo from './components/job-info.vue'
export default {
  name: 'Detail',
  components: { UserInfo },
  data() {
    return {
      userId: this.$route.params.id,
      userInfo: {
        username: '',
        passwordd: ''
      },
      rules: {
        username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
        passwordd: [{ required: true, message: '密码不能为空', trigger: 'blur' }, {
          min: 6, max: 9, message: '密码长度6-9位', trigger: 'blur'
        }]
      }
    }
  },
  computed: {
    ...mapGetters(['name'])
  },

  created() {
    this.getUserDetailById()
  },
  methods: {
    async getUserDetailById() {
      this.userInfo = await getUserDetailById(this.userId)
      console.log(this.userInfo)
    },
     saveUserDetailById() {
      this.$refs.userInfo.validate().then(async() => {
        this.userInfo.password = this.userInfo.passwordd
        await saveUserDetailById(this.userInfo)
        this.$message.success('保存成功')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
