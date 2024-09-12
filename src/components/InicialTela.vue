<template>
    <header>
      <img src="./icons/logo.png" alt="Logo Facilita aí" id="logo">
      <div class="header-right">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" fill="#ffffff">
         <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.33-8 4v2h16v-2c0-2.67-5.33-4-8-4z"/>
        </svg>
      </div>
    </header>
  </template>
  
  <script>

  </script>
  
  <style scoped>
  header {
    display: flex;
    justify-content: space-between;
    padding: 10px 20px;
    background: linear-gradient(
            to left,
            #024A59 0%,
            #024A59 0%,
            #024A59 0%,
            #024A59 0%,
            #024A59 0%,
            #024A59 35%,
            #024A59 49%,
            #024A59 42%,
            #067057 100%,
            #068852 100%
    );
}
.header-right{
    display: flex;
    align-items: center;
}

  #logo {
    margin-left: 3rem;
    width: 100px;
    height: auto;
    
  }
  
  #button-login {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
  }
  
  #button-login:hover {
    background-color: #0056b3;
  }
  
  svg {
    cursor: pointer;
    margin-right: 2rem;

  }
  </style>
  