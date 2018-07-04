<template>
  <section>
    <Nav/>
    <div class="main--container">
      <div class="login--container">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <h1>注册</h1>
          </div>
          <div class="item">
            <el-form :model="form" status-icon :rules="rules" ref="form" label-width="100px">
              <el-form-item label="手机号" prop="id">
                <el-input type="text" v-model="form.id" placeholder="请输入手机号"></el-input>
              </el-form-item>
              <el-form-item label="手机验证码" prop="pvcode">
                <el-row :gutter="20">
                  <el-col :span="14">
                    <el-input type="text" v-model="form.pvcode" placeholder="请输入手机验证码"></el-input>
                  </el-col>
                  <el-col :span="6">
                    <el-button v-show="pvcode.show" :loading="pvcode.loading" @click="getPhoneCode('form')">获取验证码</el-button>
                    <el-button v-show="!pvcode.show" disabled>{{pvcode.count}} s</el-button>
                  </el-col>
                </el-row>
              </el-form-item>

              <el-form-item label="密码" prop="pass">
                <el-input type="password" v-model="form.pass" auto-complete="off" placeholder="请输入密码"></el-input>
              </el-form-item>

              <el-form-item label="确认密码" prop="rePass">
                <el-input type="password" v-model="form.rePass" auto-complete="off" placeholder="请输入确认密码"></el-input>
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
                <el-button type="primary" @click="submitForm('form')">注册</el-button>
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
import { validateMobilePhone } from '~/assets/js/lib/validate'

export default {
  components: {
    Nav
  },
  data() {
    const validateCompare = (rule, value, callback) => {
      if (value !== this.form.pass) {
        callback(Error('两次输入密码不一致'))
      } else {
        callback()
      }
    }

    return {
      form: {
        id: '',
        pvcode: '',
        pass: '',
        rePass: '',
        vcode: ''
      },
      rules: {
        id: [
          { required: true, validator: validateMobilePhone, trigger: 'blur' }        ],
        pvcode: [
          { required: true, message: '请输入手机验证码' },
          { len: 6, message: '请输入 6 位手机验证码' }
        ],
        pass: [
          { required: true, message: '请输入密码' },
          { min: 6, max: 16, message: '请输入 6 至 16 位密码' }
        ],
        rePass: [
          { required: true, message: '请输入确认密码' },
          { validator: validateCompare }
        ],
        vcode: [
          { required: true, message: '请输入验证码' },
          { len: 4, message: '请输入 4 位验证码' }
        ]
      },
      vcode: {
        url: ''
      },
      pvcode: {
        timer: null,
        count: '0',
        show: true,
        loading: false
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
            pvcode: this.form.pvcode,
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
    // 图片验证码
    refreshCode() {
      let url = 'https://cas.baidu.com/?action=image&key='
      this.vcode.url = url + Date.now()
    },
    // 手机验证码
    getPhoneCode(name) {
      this.$refs[name].validateField('id', valid => {
        console.log(valid)
        if (!valid) {
          this.pvcode.loading = true

          // Ajax 获取成功
          setTimeout(() => {
            this.countDown()
            this.pvcode.loading = false
          }, 1000)

        }
      })
    },
    // 倒计时
    countDown() {
      const TimeCount = 60

      if (!this.pvcode.timer) {
        this.pvcode.count = TimeCount
        this.pvcode.show = false

        this.pvcode.timer = setInterval(() => {
          if (this.pvcode.count <= 0) {
            this.pvcode.show = true
            clearInterval(this.pvcode.timer)
            this.pvcode.timer = null
          } else {
            this.pvcode.count--
          }
        }, 1000)
      }
    }
  }
}
</script>

<style>

</style>
