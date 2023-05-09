<script>
import { useUserStore } from '../stores/user'
import { mapActions } from 'pinia'

export default {
  name: 'SignUpView',
  data() {
    return {
      name: '',
      level: '',
      email: '',
      password: ''
      // passwordConfirmation: ''
    }
  },
  methods: {
    ...mapActions(useUserStore, ['signup']),
    async onSubmit() {
      await this.signup(
        this.name,
        this.level,
        this.email,
        this.password
        //  this.passwordConfirmation
      )
      this.$router.push('/login')
    }
  }
}
</script>
<template lang="pug">
h1 SignUp
form(@submit.prevent="onSubmit")
  div
    label(for="name") Name
    input#email(type="text" v-model="name")
  div
    label(for="level") Level
    input#email(type="text" v-model="level")
  div
    label(for="email") Email
    input#email(type="email" v-model="email")
  div
    label(for="password") Password
    input#password(type="password" v-model="password")
  //- div
  //-   label(for="passwordConfirmation") Password Confirmation
  //-   input#passwordConfirmation(type="password" v-model="passwordConfirmation")
  div
    button(type="submit") Submit

</template>
