<template>
  <section>
    <Nav/>
    <div class="main--container">
      <div class="login--container">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <h1>登陆</h1>
          </div>
          <div class="item">
            <el-form :model="form" status-icon :rules="rules" ref="form" label-width="80px">
              <el-form-item label="ID" prop="id">
                <el-input type="text" v-model="form.id" placeholder="请输入手机号、邮箱、用户名"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="pass">
                <el-input type="password" v-model="form.pass" auto-complete="off" placeholder="请输入密码"></el-input>
              </el-form-item>
              <el-form-item label="验证码" prop="vcode">
                <el-row>
                  <el-col :span="12"><el-input v-model="form.vcode" placeholder="请输入验证码"></el-input></el-col>
                  <el-col :span="12">
                    <a href="javascript:;" @click="refreshCode">
                      <img alt="验证码" :src="vcode.url">
                      看不清？换一张
                    </a>
                    </el-col>
                </el-row>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('form')">登陆</el-button>
                <el-button @click="resetForm('form')">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
      </div>

    </div>
  </section>
</template>

<script>
import Nav from '~/components/Nav.vue'
import md5 from '~/assets/js/lib/md5'

export default {
  components: {
    Nav
  },
  data() {
    return {
      form: {
        id: '',
        pass: '',
        vcode: ''
      },
      rules: {
        id: [
          { required: true, message: '请输入帐户' },
          { min: 3, max: 20, message: '请输入 3 至 20 位帐户信息' }
        ],
        pass: [
          { required: true, message: '请输入密码' },
          { min: 6, max: 16, message: '请输入 6 至 16 位密码' }
        ],
        vcode: [
          { required: true, message: '请输入验证码' },
          { len: 4, message: '请输入 4 位验证码' }
        ]
      },
      vcode: {
        url: ''
      }
    };
  },
  mounted() {
    this.refreshCode()
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data = {
            id: this.form.id,
            pass: md5(this.form.pass),
            vcode: this.form.vcode
          }

          this.$alert(JSON.stringify(data), '提交数据')

          this.$axios({
            method: 'POST',
            url: 'login',
            data: JSON.stringify(data)
          }).then(res => {

          })

        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 验证码
    refreshCode() {
      console.log('sfsdf')
      let url = 'https://cas.baidu.com/?action=image&key='
      this.vcode.url = url + Date.now()
    }
  }
}
</script>

<style>

</style>
