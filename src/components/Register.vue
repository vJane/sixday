<template>
  <div class="container">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="ruleForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password"></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-radio-group v-model="ruleForm.gender">
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="生日" required>
        <el-col :span="11">
          <el-form-item prop="birth">
            <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.birth" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="兴趣标签" prop="interest">
        <el-checkbox-group v-model="ruleForm.interest">
          <el-checkbox label="读书" name="interest"></el-checkbox>
          <el-checkbox label="摄影" name="interest"></el-checkbox>
          <el-checkbox label="旅行" name="interest"></el-checkbox>
          <el-checkbox label="美食" name="interest"></el-checkbox>
          <el-checkbox label="化妆" name="interest"></el-checkbox>
          <el-checkbox label="宠物" name="interest"></el-checkbox>
          <el-checkbox label="粉丝" name="interest"></el-checkbox>
          <el-checkbox label="电影" name="interest"></el-checkbox>
          <el-checkbox label="唱歌" name="interest"></el-checkbox>
          <el-checkbox label="跳舞" name="interest"></el-checkbox>
          <el-checkbox label="手游" name="interest"></el-checkbox>
          <el-checkbox label="网游" name="interest"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="个人说明" prop="desc">
        <el-input type="textarea" v-model="ruleForm.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">创建账号</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        ruleForm: {
          name: '',
          birth: '',
          interest: [],
          gender: '',
          desc: '',
          phone: '',
          password: '',
        },
        rules: {
          phone: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
            { min: 11, max: 11, message: '手机填写不正确', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
            { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
          ],
          birth: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          interest: [
            { type: 'array', required: true, message: '请至少选择一个兴趣标签', trigger: 'change' }
          ],
          gender: [
            { required: true, message: '请选择性别', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写个人说明', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.func.ajaxPost(this.api.register, this.ruleForm, res => {
              if (res.data.code === 200) {
                localStorage.setItem('uid' , res.data.msg);
                this.$store.commit('user', res.data.msg);
                location.reload('/Personal');
              } else {
                alert(res.data.msg);
              } 
            })
          } else {
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
<style scoped>
  .container {
    width: 100%;
    padding: 20px;
    padding-left: 0;
    padding-bottom: 100px;
  }
  .el-checkbox:nth-of-type(4n+1) {
    margin-left: 0;
  }
</style>