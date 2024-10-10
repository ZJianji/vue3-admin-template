<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
</template>

<style lang="scss">
::-webkit-scrollbar {
  width: 5px;
  height: 5px;
  background-color: #f9f9f9;
}

::-webkit-scrollbar-thumb {
  background-color: #b6b6b6;
  border-radius: 10px;
  transition: background-color 0.2s ease;
  cursor: pointer;
}
</style>
