import CadastroservicoModel from '../model/CadastroservicoModel';
import axios from 'axios';

export default class CadastroservicoViewModel {
  constructor() {
    this.address = '';
    this.phone = '';
    this.email = '';
    this.name = '';
    this.newPicture = [];
  }

  uploadPicture(file) {
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
    }
  }

  async submitForm() {
      try {
          const serviceData = new CadastroservicoModel(
            this.address,
            this.phone,
            this.email,
            this.name,
            this.newPicture,
          );

          console.log('dados:', serviceData);

          // Substitua a URL abaixo pela URL do backend
          const response = await axios.post('https://api.seusite.com/cadastrar', serviceData);

          if (response.status === 200) {
              alert('Cadastro de serviço realizado com sucesso!');
          }
      } catch (error) {
          console.error('Erro ao cadastrar serviço:', error);
          alert('Ocorreu um erro ao cadastrar o serviço.');
      }
  }
}