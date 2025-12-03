import axios from "axios";
//import CadastroModel from "../model/CadastroModel";

export default class CadastroViewModel {
  constructor() {
    this.email = "";
    this.senha = "";
    this.role = "USER";
    this.nomeCompleto = "";
    this.dataNascimento = "";
    this.endereco = "";
    this.selectedCity = "";
    this.selectedState = "";
    this.telefone = "";
    this.confirmation = "";
    this.states = [];
    this.cities = [];
    this.fotoPerfil = null;
  }

  validate() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      alert("Email inválido");
      return false;
    }

    if (this.senha.length < 8) {
      alert("Senha deve ter pelo menos 8 caracteres.");
      return false;
    }

    if (this.senha !== this.confirmation) {
      alert("As senhas não correspondem.");
      return false;
    }

    return true;
  }

  async fetchStates() {
    try {
      const response = await axios.get(
        "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
      );
      this.states = response.data;
    } catch (error) {
      console.error("Erro ao buscar estados:", error);
    }
  }

  async fetchCities() {
    try {
      if (this.selectedState) {
        const response = await axios.get(
          `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${this.selectedState}/municipios`
        );
        this.cities = response.data;
      }
    } catch (error) {
      console.error("Erro ao buscar cidades:", error);
    }
  }

  handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
      this.fotoPerfil = file;
    } else {
      this.fotoPerfil = null;
    }
  }

  async submitForm() {
    if (!this.validate()) {
      throw new Error("Validação falhou");
    }

    try {
      const formData = new FormData();

      formData.append("email", this.email);
      formData.append("senha", this.senha);
      formData.append("role", "USER");
      formData.append("nomeCompleto", this.nomeCompleto);
      formData.append("dataNascimento", this.dataNascimento);
      formData.append("endereco", this.endereco);
      formData.append("cidade", this.selectedCity);
      formData.append("uf", this.selectedState);
      formData.append("telefone", this.telefone);
      if (this.fotoPerfil) {
        formData.append("fotoPerfil", this.fotoPerfil);
      }

      const response = await axios.post(
        "http://localhost:8080/auth/register",
        formData
      );

      return response.data;
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
      alert("Ocorreu um erro ao cadastrar o usuário.");
      throw error;
    }
  }
}
