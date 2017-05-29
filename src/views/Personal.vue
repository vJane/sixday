<template>
  <div>
    <HeaderBar2 class="header"/>
    <div class="container">
      <div class="avatar-wrapper">
       <input type="file" class="input-upload" id="upload" @change=fileChange /> 
          <label for="upload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon">上传头像</i>
          </label>
        <div class="login" v-if=!uid>
          <span @click="loginBox = true, registerBox = false">登录</span>
          <span @click="registerBox = true, loginBox = false">注册</span>
        </div>
        <div class="login" v-else>
          <div class="font-20">{{msg.nickname}}</div>
        </div>
      </div>
      <Register v-if=registerBox />
      <Login v-if=loginBox />
      <div v-if=uid>
        <el-collapse v-model="activeNames" @change="handleChange" class="fold">
          <el-collapse-item title="基本信息" name="1">
            <p class="infos">
              <span>姓名:</span>{{msg.nickname}}
            </p>
            <p class="infos">
              <span>性别:</span>{{msg.gender}}
            </p>
            <p class="infos">
              <span>电话:</span>{{msg.telephone}}
            </p>
            <p class="infos">
              <span>出生日期:</span>{{msg.birth | birth }}
            </p>
          </el-collapse-item>
          <el-collapse-item title="兴趣爱好" name="2">
            <p class="infos">
              <span v-for="i in msg.interest">{{i}}</span>
            </p>
          </el-collapse-item>
          <el-collapse-item title="个人说明" name="3">
            <p class="infos">
              {{msg.description}}
            </p>
          </el-collapse-item>
          <el-collapse-item title="设置" name="4">
            <p class="infos">
              <div class="button" @click="modify=true">修改个人资料</div>
            </p>
            <UserModify v-if=modify :userInfo="msg" />
            <p>
              <div class="button" @click=logout()>登出</div>
            </p>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
    <TabBar class="footer" indexColor=3 />
  </div>
</template>
<script>
  import HeaderBar2 from '@/components/HeaderBar2';
  import TabBar from '@/components/TabBar';
  import Register from '@/components/Register';
  import Login from '@/components/Login';
  import UserModify from '@/components/UserModify';
  import { mapGetters } from 'vuex';
  export default {
    name: 'index',
    filters: {
      "birth": function(value) {
        if (value !== null) {
          let date = new Date(value);
          let year = date.getFullYear();
          let month = date.getMonth() + 1;
          let day = date.getDate();
          let returnValue = year + "年" + month + "月" + day + "日";
          return returnValue;
        }
      }
    },
    components: {
      HeaderBar2,
      TabBar,
      Register,
      Login,
      UserModify,
    },
    data() {
      return {
        imageUrl: '',
        activeNames: [],
        loginBox: false,
        registerBox: false,
        uid: '',
        msg: {},
        modify: false,
      };
    },
    methods: {
      handleAvatarSuccess(res, file) {
        const imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      logout() {
        if (confirm("确认登出吗？")) {
          localStorage.removeItem('uid');
          this.$store.commit('user', '');
          this.uid = '';
          this.imageUrl = '';
        }
      },
      fileChange: function(e) {
        if (this.uid) {
          const fileName = e.target.files[0].name;
          this.func.ajaxPost(this.api.copyFile, {fileName: fileName}, res => {
            if (res.data.code === 200) {
              let image = res.data.msg;
              this.imageUrl = image;
                this.func.ajaxPost(this.api.uploadAvatar, {'imageUrl': this.imageUrl, 'uid': this.uid}, res => {
                    if (res.data.code === 200) {
                      alert(res.data.msg);
                    }
                });
            } else {
              alert(res.data.msg)
            }
          });
        } else {
          alert('请先登录！');
        }  
      },
      getUploadToken() {
        this.func.ajaxPost(this.api.getUploadToken, {}, res => {
            if (res.data.code === 200) {
              alert(res.data.msg)
              let uploader = Qiniu.uploader({
                  runtimes: 'html5,flash,html4',     
                  browse_button: 'pickfiles',       
                  uptoken : res.data.msg, 
                  get_new_uptoken: false,            
                  domain: 'sixday',   
                  container: 'uploadButton',            
                  max_file_size: '100mb',            
                  flash_swf_url: 'path/of/plupload/Moxie.swf',  
                  max_retries: 3,                    
                  dragdrop: false,                     
                  drop_element: 'container',          
                  chunk_size: '4mb',                 
                  auto_start: true,                  
                  init: {
                      'FilesAdded': function(up, files) {
                          plupload.each(files, function(file) {
                          });
                      },
                      'BeforeUpload': function(up, file) {
                      },
                      'UploadProgress': function(up, file) {
                      },
                      'FileUploaded': function(up, file, info) {
                      },
                      'Error': function(up, err, errTip) {
                      },
                  }
              });
            }
        });
      }
    },
    created() {
      const uid = localStorage.getItem('uid');
      if (uid) {
        this.func.ajaxPost(this.api.userInfo, {'uid': uid}, res => {
            if (res.data.code === 200) {
              this.msg = res.data.msg;
              this.uid = this.msg.id;
              this.imageUrl = this.msg.portrait;
            }
        });
      }
    }
  };
</script>

<style scoped>
  .header {
    width: 100%;
    position: fixed;
    left: 0;
    top: 0;
  }
  .footer {
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 2;
  }
  .container {
    text-align: left;
  }
  .avatar-wrapper {
    width: 100%;
    text-align: center;
    background: url(/static/perbg1.jpeg) no-repeat right bottom;
    background-size: 100%;
    padding-top: 20px;
  }
  .avatar-uploader-icon {
    font-size: 14px;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
    border: 1px solid #fff;
    border-radius: 50%;
    background: #fff;
  }
  .login {
    padding: 10px 0;
    display: flex;
    justify-content: center;
  }
  .login span {
    background: #fff;
    margin: 0;
    display: block;
    padding: 5px 20px;
  }
  .login span:hover {
    background: #3fc4e4;
    color: #fff;
  }
  .avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
  .fold {
    margin-bottom: 100px;
  }
  .el-collapse .el-collapse-item .el-collapse-item__header {
    font-size: 16px;
  }
  .infos{
    padding-left: 20px;
    font-size: 14px;
    margin: 5px 0;
  }
  .infos span {
    display: inline-block;
    min-width: 70px;
  }
  .button {
    text-decoration: none;
    color: #000;
    background: #f5f5f5;
    padding: 10px 20px;
    display: block;
    text-align: center;
  }
  .font-20 {
    font-size: 20px;
  }
  .input-upload {
    width: 10px;
    height: 10px;
    background:transparent;
    position: absolute;
    left: 42%;
    top: 100px;
    color: #f8f8f8;
    text-align: center;
  }
</style>