<template>
  <header>
    <HeaderPage />
  </header>
    
  <body>
    <div class="data-container">
      <div class="form-container">
        <h2>Dados</h2>
        <hr>

        <div class="profile">
          <img class="profile-picture" src="https://via.placeholder.com/800x400"/>
          <div class="profile-info">
            <strong>Nome do Serviço</strong>
            <p>Prestador de Serviço</p>
          </div>
        </div>

        <form class="cadastroservico">
          <div class="address-field">
            <label for="address">Endereço</label>
            <input type="text" id="address" placeholder="" v-model="viewModel.address" />
          </div>
        </form>

        <div class="double-field">
          <div class="phone-field">
            <label for="phone">Telefone</label>
            <input type="tel" id="phone" class="phone-input" placeholder="(XX) XXXXX-XXXX" v-model="viewModel.phone" />
          </div>
          
          <div class="email-field">
              <label for="email">E-mail</label>
              <input type="email" id="email" placeholder="" v-model="viewModel.email" />
          </div>
        </div>

        <div class="name-field">
          <label for="name">Nome</label>
          <input type="text" id="name" placeholder="" v-model="viewModel.name" />
        </div>

        <div class="pictureUpload-field">
          <label for="pictureUpload">Foto de Perfil</label>
          <div class="Add"></div>
          <input type="file" id="file" accept="image/*" @change="uploadPicture">
          <label for="file" id="fileLabel"><span>+</span></label>
        </div>

        <div class="button-sign">
            <router-link to="/">
              <button id="button-sign2" @click="viewModel.submitForm">Enviar Edição</button>
            </router-link>
        </div>

      </div>
    </div>
  </body>
</template>
    
<script>
  import DadosViewModel from '../viewmodel/DadosViewModel';
  import HeaderPage from '@/components/header/HeaderPage.vue'; //
  import userData from '@/test/teste.json';
  
  export default {
    name: 'ServicePage',
    components: {
      HeaderPage // Register HeaderPage
    },
    data() {
      return {
        viewModel: new DadosViewModel(userData),
      };
    },

     methods: {
        uploadPicture(event) {
          const file = event.target.files[0];
          this.viewModel.uploadPicture(file);
        }
     }
  };
</script>
    
<style>
  html, body {
    height: 100%;
    margin: 0;
  }
  
  body {
    overflow-y: scroll; 
  }
  
  ::-webkit-scrollbar {
    width: 0px; 
    height: 0px;
  }

  .data-container {
    background: linear-gradient(1.87deg, rgba(2, 74, 89, 0.3) 0%, rgba(0, 0, 0, 0) 100%);
    height: 100%;
    width: 100%;
    padding: 0%;
  }

  .form-container {
    overflow-y: scroll;
    margin: 2rem auto;
    margin-bottom: 2rem;
    width: 60%;
    height: auto;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 10px 10px 25px rgba(0, 0, 0, 0.5);
    font-family: 'Crete Round';
    background-color: white;
  }

  h2 {
    margin-top: 1rem;
    margin-left: 3.5rem;
    margin-right: 5.5rem;
    margin-bottom: 1rem;
    font-size: 2.3em;
    font-family: 'crete round', serif;
  }

  .profile {
    display: table;
  }

  .profile-picture {
    width: 70px;
    height: 70px;
    border-radius: 15%;
    margin-left: 3.5rem;
    display: table-cell;
    float: left;
  }

  .profile-info {
    margin-top: 10px;
    margin-left: 10px;
    margin-right: 5.5rem;
    color: #777;
    display: table-cell;
    float: left;
    font-family: 'crete round', serif;
  }

  .profile-info p{
    margin-top: 5px;
  }

  .address-field{
    margin-top: 3.3rem;
    margin-left: 3.5rem;
    margin-right: 5.5rem;
    color: #3E3E3E;
    font-size: 1.3em;   
  }

  #address{
    display: block;
    margin-top: 0.5rem;
    padding: 0.25rem;
    height: 3.5rem;
    width: 100%;
    border-radius: 10px;
    border: 0.1rem solid #C0C0C0;
    box-sizing: border-box;
    background-color: #FFF ;
    font-size: 0.9em;
  }

  .double-field{
    width: 100% !important;
    display: flex !important;
  }

  .phone-field{
    display: flex !important;
    flex-direction: column !important;
    margin-top: 1.3rem !important; 
    margin-left: 3.5rem !important;
    color: #3E3E3E !important;
    font-size: 1.3em !important;   
  }

  .email-field{
    margin-top: 1.3rem !important; 
    margin-left: 2.5rem !important;
    margin-right: 5.5rem !important;
    color: #3E3E3E !important;
    font-size: 1.3em !important;   
  }

  #email{
    display: block;
    margin-top: 0.5rem;
    padding: 0.25rem;
    height: 3.5rem;
    width: auto;
    border-radius: 10px;
    border: 0.1rem solid #C0C0C0;
    box-sizing: border-box;
    background-color: #FFF ;
    font-size: 0.9em;
  }

  .phone{
    display: block !important;
    margin-top: 0.5rem !important;
    padding: 0.25rem !important;
    height: 3.5rem !important;
    width: 12.5rem !important;
    border-radius: 10px !important;
    border: 0.1rem solid #C0C0C0 !important;
    box-sizing: border-box !important;
    background-color: #FFF !important;
    font-size: 0.9em !important;
  }

  .phone-input {
  width: 80%;
  padding: 0.25rem !important;
  height: 3.5rem !important;
  border-radius: 10px !important;
  border: 0.1rem solid #C0C0C0 !important;
  box-sizing: border-box !important;
  background-color: #FFF !important;
  font-size: 0.9em !important;
  }

  .phone-input::placeholder {
    color: #888;
  }

  .name-field{
    margin-top: 1.3rem !important;
    margin-left: 3.5rem !important;
    margin-right: 5.5rem !important;
    color: #3E3E3E;
    font-size: 1.3em;   
  }

  #name{
    display: block;
    margin-top: 0.5rem;
    padding: 0.25rem;
    height: 3.5rem;
    width: 100%;
    border-radius: 10px;
    border: 0.1rem solid #C0C0C0;
    box-sizing: border-box;
    background-color: #FFF ;
    font-size: 0.9em;
  }

  .pictureUpload-field {
    margin-top: 1.3rem !important;
    margin-left: 3.5rem !important;
    margin-right: 5.5rem !important;
    color: #3E3E3E;
    font-size: 1.3em;   
  }

  .fileUpload {
    display: inline-block;
    margin-top: 1.3rem !important;
    width: 60px;
    height: 60px;
    border: 2px dashed  #3E3E3E;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    color:  #3E3E3E;
    font-size: 24px;
    cursor: pointer;
  }

  #file{
    display: none;
  }

  #fileLabel {
    display: inline-block;
    margin-top: 1.3rem !important;
    width: 60px;
    height: 60px;
    border: 2px dashed #C0C0C0;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #C0C0C0;
    font-size: 24px;
    cursor: pointer;
  }

  .button-sign2{
    align-items: center;
}

#button-sign2{
    width: 50%;
    margin-top: 2.5em;
    margin-left:25%;
    padding: 0.25rem;
    background-color: #F26530;
    height: 3.2rem;
    border-radius: 7px;
    color: #FFF;
    font-weight: bold;
    font-size: 1.5em;
    cursor: pointer;
    border: none;
}

</style>
  