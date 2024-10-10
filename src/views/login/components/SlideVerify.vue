<template>
  <div class="slide-verify-container">
    <div class="slide-verify-box">
      <slide-verify ref="block" :slider-text="text" :accuracy="accuracy" :imgs="imgs" @again="onAgain"
        @success="onSuccess" @fail="onFail" @refresh="onRefresh"></slide-verify>
      <!-- <button class="btn" @click="handleClick">在父组件可以点我刷新哦</button> -->
      <div class="msg" :class="{ 'msg-success': flag }">{{ msg }}</div>
    </div>
  </div>
</template>

<script setup>
import SlideVerify from 'vue3-slide-verify'



import 'vue3-slide-verify/dist/style.css'
import img1 from '@assets/login/slideVerify-1.jpg'
import img2 from '@assets/login/slideVerify-2.jpg'
import img3 from '@assets/login/slideVerify-3.jpg'
import img4 from '@assets/login/slideVerify-4.jpg'
import img5 from '@assets/login/slideVerify-5.jpg'
import img6 from '@assets/login/slideVerify-6.jpg'
import img7 from '@assets/login/slideVerify-7.jpg'
import img9 from '@assets/login/slideVerify-9.jpg'
import img10 from '@assets/login/slideVerify-10.jpg'
import img11 from '@assets/login/slideVerify-11.jpg'
import img12 from '@assets/login/slideVerify-12.jpg'

const imgs = [img1, img2, img3, img4, img5, img6, img7, img9, img10, img11, img12]

const emit = defineEmits(['getMsessage'])
const msg = ref('')
const text = '向右滑动->'
const accuracy = 1
//验证标识
// const instance = getCurrentInstance();
const block = ref()
const flag = ref(false)
const onAgain = () => {
  msg.value = '检测到非人为操作的哦！ try again'
  // 刷新
  block.value?.refresh()
}

const onSuccess = (times) => {
  msg.value = `验证成功, 耗时${(times / 1000).toFixed(1)}s`
  flag.value = true
  setTimeout(() => {
    emit('getMsessage', flag)
  }, 1500)
}

const onFail = () => {
  msg.value = '验证不通过'
  flag.value = false
  emit('getMsessage', flag)
}

const onRefresh = () => {
  msg.value = '点击了刷新小图标'
}

// const handleClick = () => {
//   // 刷新
//   block.value?.refresh()
//   msg.value = ''
// }
</script>
<style scoped lang="scss">
.slide-verify-container {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: hidden;
  z-index: 999999;
  background: rgba(0, 0, 0, 0.5);

  .slide-verify-box {
    // width: 300px;
    // height: 300px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: transparent;
  }

  .msg {
    color: #F56C6C;
    margin-top: 10px;
  }

  .msg-success {
    color: #fff;
  }
}
</style>
