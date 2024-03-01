<script setup>


import { useMsalStore } from '@/stores/msal';
import {  useRouter } from 'vue-router'
const router = useRouter()
const msal = useMsalStore()
const login = async () => {
  try {
    await msal.login()
    console.log("logged in")
    router.push('/')
  } catch (e) {
    console.log(e)
  }
  
}
</script>
<template>
  <main class="flex justify-content-center align-items-center h-screen w-screen p-0"
    style="background: linear-gradient(75deg, var(--primary-color), var(--highlight-text-color))">
    <Button class="login-button" @click="login">Login</Button>
    
  </main>
</template>

<style scoped>


.bg-img {
  background: linear-gradient(75deg, palette-color(primary, 600), palette-color(secondary, 800))
}
</style>
