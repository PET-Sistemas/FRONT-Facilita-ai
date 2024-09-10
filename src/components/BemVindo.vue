<template>
    <div class="background-default">
      <div class="blue-side">
        <div class="logo" >
        <img src="./icons/logo.png" alt="Logo">
        </div>
        <div class="welcome-text">
          Olá.<br />
          Bem-Vindo de Volta! <br />
        </div>
      </div>
    </div>
  </template>

  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  .background-default {
    width: 100%;
    height: 100vh;
    display: flex;
      background-color: transparent;
  }
  
  .blue-side {
    width: 55vw;
    height: 100vh;
    background: linear-gradient(
    to left bottom,
    #024A59 0%,
    #024A59 0%,
    #024A59 0%,
    #024A59 0%,
    #024A59 0%,
    #024A59 35%,
    #024A59 49%,
    #024A59 54%,
    #067057 86%,
    #068852 100%,
    #348a09 100%,
    #9e940c 100%,
    #F2E206 100%
  ) ;
  }
  
  .welcome-text {
    margin-top: 25rem;
    margin-left: 1.125em;
    font-family: 'Junge', sans-serif;
    font-size: 3.5em;
    line-height: 1em;
    background: #FFFF;
    background-clip: text;
    color: transparent;
  }
  
  .logo img {
  width: 100px; /* Defina o tamanho da imagem */
  height: auto;
  margin-left: 2rem; /* Mantém a proporção da imagem */
  margin-top: 2rem;
  margin-bottom: 20px; /* Adiciona espaço abaixo da imagem */
}
  /* tablets grandes e pcs  */
  
  
  /* tablets */

  </style>