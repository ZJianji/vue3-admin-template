<!--
 * new page
 * @author: ZJianJi
 * @since: 2024-09-10
 * index.vue
 -->
<template>
  <div class="login fcc">
    <div class="content">
      <div class="title">{{ title }}</div>
      <div class="center fwrap">
        <img class="banner" :src="banner" alt="">
        <div class="form-box">
          <div class="menu fwrap">
            <div :class="['f1 menu-item', { 'menu-item-on': menuIndex === index }]" v-for="(item, index) in menuList"
              :key="index" @click="switchMenu(index)">{{ item.label }}</div>
          </div>
          <el-form class="login-form" label-position="left" ref="loginForm" :model="formData" :rules="formRules">
            <el-form-item prop="username">
              <el-input v-model="formData.username" :placeholder="formRules.username[0].message" />
            </el-form-item>
            <el-form-item prop="password">
              <el-input show-password v-model="formData.password" :placeholder="formRules.password[0].message"
                @keyup.enter.native="onLogin(false)" />
            </el-form-item>
            <el-form-item>
              <el-button :loading="loading" type="primary" @click="onLogin(false)" style="width: 100%">登录</el-button>
            </el-form-item>
            <div class="tips fvertical" v-for="(item, index) in tipList" :key="index">
              <!-- <el-button size="mini" type="success" v-copy="item">点击复制</el-button> -->
              <div class="tips_text f1">账号：{{ item }} 密码 : 随便填</div>
              <el-button size="small" type="success" @click="setLoginInfo(item)">一键登录</el-button>
            </div>
          </el-form>
        </div>
      </div>
      <div class="bottom-text">请使用Google Chrome、Microsoft Edge、360浏览器、IE11及以上版本等浏览器</div>
    </div>
    <SlideVerify v-show="isSlideVerify" @getMsessage="getMsessage" />
  </div>
</template>
    
<script setup>
import SlideVerify from './components/SlideVerify.vue'
import banner from '@assets/login/banner.jpg'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/user'

const { setToken } = useUserStore()

const title = '登录';
const loading = ref(false)
const menuIndex = ref(0)
const isSlideVerify = ref(false)
const menuList = [
  { value: 0, label: '登陆平台' },
  { value: 1, label: '注册账号' },
]

const tipList = ['admin', 'editor']

const formData = ref({
  username: '',
  password: '',
})

const formRules = {
  username: [
    { required: true, trigger: 'blur', message: '请输入账号' },
  ],
  password: [
    { required: true, trigger: 'blur', message: '请输入密码' }
  ],
}

function switchMenu(index) {
  menuIndex.value = index;
}

const loginForm = ref(null)

const router = useRouter()
function onLogin(adopt) {
  const elementForm = loginForm.value;
  const start = async () => {
    loading.value = true;
    // const res = await login(formData.value);
    isSlideVerify.value = true
    loading.value = false;


  };
  if (adopt) {
    return start();
  }
  elementForm.validate((valid) => {
    if (valid) {
      start();
    }
  });
}


/**
 * 一键登录
 * @param {string} account 账号
 */
function setLoginInfo(account) {
  formData.value.username = account;
  formData.value.password = Math.random().toString(36).substr(2);
  onLogin(true);
}


/* 滑块验证 */
function getMsessage(message) {
  if (message.value) {
    setToken('USER_TOKEN')
    ElMessage.success('登录成功!')
    router.push('/')
  }
}

</script>
    
<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background-color: #1890FF;

  .content {
    width: 100%;
    max-width: 1200px;

    .menu {
      width: 100%;
      margin-bottom: 30px;

      .menu-item {
        text-align: center;
        line-height: 1;
        font-size: 24px;
        font-weight: 400;
        color: #999;
        cursor: pointer;
      }

      .menu-item-on {
        color: #333;
      }
    }

    .title {
      font-size: 22px;
      color: #fff;
      font-weight: 400;
      margin-bottom: 16px;
    }

    .center {
      margin-bottom: 40px;

      .banner {
        width: 780px;
        height: 400px;
      }

      .form-box {
        width: 420px;
        background-color: #fff;
        padding: 70px 65px 0 65px;
      }
    }

    .bottom-text {
      width: 100%;
      max-width: 500px;
      font-size: 14px;
      color: #fff;
      font-weight: 400;
      line-height: 22px;
      margin: 0 auto;
      text-align: center;
    }
  }

  .tips {
    font-size: 14px;
    color: #555;
    margin-bottom: 8px;

    .tips_text {
      margin: 0 16px;
    }
  }
}

@media screen and (max-width: 1200px) {
  .login {
    .content {
      max-width: auto;

      .title {
        text-align: center;
      }

      .center {
        .banner {
          display: none;
        }

        .form-box {
          width: 100%;
          max-width: 520px;
          margin: 0 auto;
          padding-bottom: 30px;
        }
      }
    }
  }
}
</style>