<template>
  <div id="app">
    <header>
      <nav>
        <!-- Links de navegação -->
        <router-link to="/">Home</router-link>
        <router-link to="/about">About</router-link>
        <router-link to="/contact">Contact</router-link>
      </nav>
    </header>
    <main>
      <!-- Onde o conteúdo das rotas será exibido -->
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
/* Estilos globais para o seu aplicativo */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

header {
  background-color: #42b983;
  padding: 10px;
  color: white;
}

nav {
  display: flex;
  justify-content: center;
}

nav a {
  margin: 0 15px;
  text-decoration: none;
  color: white;
}

nav a.router-link-active {
  font-weight: bold;
  text-decoration: underline;
}

main {
  padding: 20px;
}
</style>
