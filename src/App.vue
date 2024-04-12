<template>
  <nav>
    <router-link to="/" class="home links">Home</router-link>
    <router-link to="#" class="links">Archive</router-link>
    <router-link to="/about" class="links">About</router-link>
  </nav>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  max-width: 70%;
  margin: auto;
}

nav{
  margin-top: 8%;
  text-align: center;

}

.links{
  padding: 0.5% 1%;
  margin: 2px 5px;
  text-decoration: none;
  border-radius: 5px;
  color: #2c3e50;
  font-weight: bold;
}

.links:hover{
  color: blue;
}

</style>
