<script>
import axios from 'axios'

export default {
  name: 'LoginView',
  data() {
    return {
      email: '',
      password: '',
      user: null
    }
  },
  methods: {
    async login() {
      this.user = await axios.post('http://localhost:3000/accounts/session', {
        email: this.email,
        password: this.password
      })
      console.log(user)
    }
  }
}
</script>
<template lang="pug">
p(v-if="user") You are logged in as {{ user?.data?.name}}
h2 Login
form(@submit.prevent="login")
  div
    label(for="email") Email
    input#email(v-model="email" type="text")
  div
    label(for="password") Password
    input#password(v-model="password" type="password")
  div
    button(type="submit") Login
</template>

<style>
nav {
  display: contents;
}
</style>
