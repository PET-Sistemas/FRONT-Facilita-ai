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

  /**
   * Busca os dados do usuário e retorna o modelo reativo.
   * @returns {Promise<object|null>} user
   */
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

  async saveData() {
    try {
      const response = await this.apiClient.put(
        "/usuario/me",
        this.profileModel.user
      );
      this.profileModel.user = response.data;
      this.profileModel.saveChanges();

      this.isEditing = false;
      alert("Dados salvos com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar os dados:", error);
      alert("Erro ao salvar os dados.");
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

  uploadProfilePicture(file) {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.updateUserData({ profilePicture: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  }
}
