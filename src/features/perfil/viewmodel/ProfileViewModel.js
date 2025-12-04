import ProfileModel from "../model/ProfileModel";

export default class ProfileViewModel {
  apiClient;
  isEditing = false;
  profileModel = null;
  images = [
    "https://via.placeholder.com/800x400",
    "https://via.placeholder.com/800x400",
    "https://via.placeholder.com/800x400",
  ];
  currentIndex = 0;

  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  async fetchUserData() {
    try {
      const response = await this.apiClient.get("/usuario/me");
      this.profileModel = new ProfileModel(response.data);
      return this.profileModel.user;
    } catch (error) {
      console.error("Erro ao buscar dados do usuário:", error);
      return null;
    }
  }

  async fetchFoto() {
    try {
      const response = await this.apiClient.get("/files/view/profile", {
        responseType: "blob", // <--- ESSENCIAL
      });

      const url = URL.createObjectURL(response.data);
      return url;
    } catch (error) {
      console.warn("Usuário sem foto de perfil ou erro ao buscar.");
      return null;
    }
  }

  async fetchStates() {
    try {
      const response = await this.apiClient.get(
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
        const response = await this.apiClient.get(
          `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${this.selectedState}/municipios`
        );
        this.cities = response.data;
      }
    } catch (error) {
      console.error("Erro ao buscar cidades:", error);
    }
  }

  getUser() {
    return this.profileModel ? this.profileModel.user : null;
  }

  getImages() {
    return this.images;
  }

  getCurrentIndex() {
    return this.currentIndex;
  }

  async toggleEdit() {
    if (this.isEditing) {
      await this.saveData();
    } else {
      this.isEditing = true;
    }
  }

  cancelEdit() {
    if (this.profileModel) {
      this.profileModel.revertChanges();
    }
    this.isEditing = false;
  }

  async saveData(dadosAtualizados = null) {
    try {
      if (dadosAtualizados) {
        this.updateUserData(dadosAtualizados);
      }

      const payload = { ...this.profileModel.user };

      delete payload.profilePicture;

      const response = await this.apiClient.put("/usuario", payload);

      if (response.data) {
        this.profileModel.user = response.data;
      }
      this.profileModel.user = response.data;
      this.profileModel.saveChanges();

      this.isEditing = false;
      alert("Dados salvos com sucesso!");
      return true;
    } catch (error) {
      console.error("Erro ao salvar os dados:", error);
      alert("Erro ao salvar os dados.");
      return false;
    }
  }

  updateUserData(newData) {
    if (this.profileModel) {
      this.profileModel.updateUserData(newData);
    }
  }

  nextSlide() {
    if (this.currentIndex < this.images.length - 1) {
      this.currentIndex++;
    }
  }

  prevSlide() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  async uploadProfilePicture(file) {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      if (this.profileModel && this.profileModel.user) {
        this.profileModel.user.profilePicture = e.target.result;
      }
    };
    reader.readAsDataURL(file);

    const fd = new FormData();
    fd.append("file", file);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      await this.apiClient.post("files/upload/profile", fd, config);
      alert("Foto de perfil atualizada com sucesso!");
    } catch (error) {
      console.error("Erro no upload da imagem:", error);
      alert("Falha ao enviar imagem. Tente novamente.");

      // Opcional: Recarregar a foto antiga do servidor se der erro
      const fotoAntiga = await this.fetchFoto();
      if (this.profileModel && this.profileModel.user) {
        this.profileModel.user.profilePicture = fotoAntiga;
      }
    }
  }
}
