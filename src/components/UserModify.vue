<template>
  <div class="container">
    <el-form ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="手机号">
        <el-input v-model="ruleForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="ruleForm.password"></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="ruleForm.gender">
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="生日">
        <el-col :span="11">
          <el-form-item>
            <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.birth" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="兴趣标签">
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
      <el-form-item label="个人说明">
        <el-input type="textarea" v-model="ruleForm.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">修改</el-button>
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
          uid: '',
          name: '',
          birth: '',
          interest: [],
          gender: '',
          desc: '',
          phone: '',
          password: '',
        },
      };
    },
    props: [
      'userInfo'
    ],
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.func.ajaxPost(this.api.userModify, this.ruleForm, res => {
              if (res.data.code === 200) {
                alert('修改个人资料成功！');
                location.reload('/Personal');
              } else {
                alert(res.data.msg);
              } 
              this.$router.push('/Personal');
            });
          } else {
            alert('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    created() {
      this.ruleForm.uid = localStorage.getItem('uid');
      this.ruleForm.name = this.userInfo.nickname;
      this.ruleForm.phone = this.userInfo.telephone;
      this.ruleForm.password = this.userInfo.password;
      this.ruleForm.birth = this.userInfo.birth;
      this.ruleForm.desc = this.userInfo.description;
      this.ruleForm.gender = this.userInfo.gender;
      this.ruleForm.interest = this.userInfo.interest;
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
  .el-checkbox-group{
    z-index: 0;
  }
  .el-checkbox__inner {
    z-index: 0 !important;
  }
</style>