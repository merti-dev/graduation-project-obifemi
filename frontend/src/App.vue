<script>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import Counter from './components/Counter.vue'
import axios from 'axios'
export default {
  name: 'App',
  components: {
    HelloWorld,
    RouterLink,
    RouterView
  },
  data() {
    return
    user: null
  },
  mounted() {
    this.fetchUser()
  },
  methods: {
    async fetchUser() {
      this.user = (
        await axios.get('http://127.0.0.1:3000/accounts/session', { withCredentials: true })
      ).data
    }
  }
}
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/login">Log In</RouterLink>
        <RouterLink to="/signup">Sign Up</RouterLink>
      </nav>
    </div>
  </header>
  <Suspense>
    <RouterView />
  </Suspense>
</template>

<style scoped>
header {
  display: block;
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: block;
    line-height: 1.5;
    max-height: 100vh;
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: block;
    /* place-items: flex-start;
    flex-wrap: wrap; */
    width: 100%;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
