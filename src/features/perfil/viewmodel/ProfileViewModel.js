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
      const perfil = await this.apiClient.get("/files/view/profile", {
        responseType: "blob", // <--- ESSENCIAL
      });

      const url = URL.createObjectURL(perfil.data);
      console.log(url);
      return url;
    } catch (error) {
      console.error("Erro ao buscar foto do usuário:", error);
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

  /**
   * Faz preview local da imagem E efetua upload para o backend.
   * @param {File} file
   * @param {Object} options opcional: { useAuthUser: boolean, userId: number }
   *
   * useAuthUser=true => POST /files/upload/profile (recomendado)
   * useAuthUser=false => POST /files/upload?userId=xxx
   */
  async uploadProfilePicture(
    file,
    options = { useAuthUser: true, userId: null }
  ) {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      this.updateUserData({ profilePicture: e.target.result });
    };
    reader.readAsDataURL(file);

    const fd = new FormData();
    fd.append("file", file);

    let url;
    let config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      if (options.useAuthUser) {
        url = "/files/upload/profile";
        const resp = await this.apiClient.post(url, fd, config);
        if (resp && resp.data && resp.data.url) {
          this.updateUserData({ profilePicture: resp.data.url });
          // atualiza também o objeto persistido no ProfileModel
          if (this.profileModel) {
            this.profileModel.user.profilePicture = resp.data.url;
            this.profileModel.saveChanges();
          }
        }
      } else {
        if (
          !options.userId &&
          this.profileModel &&
          this.profileModel.user &&
          this.profileModel.user.id
        ) {
          options.userId = this.profileModel.user.id;
        }
        if (!options.userId)
          throw new Error("userId necessário quando useAuthUser=false");

        url = `/files/upload?userId=${options.userId}`;
        const resp = await this.apiClient.post(url, fd, config);
        if (resp && resp.data && resp.data.url) {
          this.updateUserData({ profilePicture: resp.data.url });
          if (this.profileModel) {
            this.profileModel.user.profilePicture = resp.data.url;
            this.profileModel.saveChanges();
          }
        }
      }
    } catch (err) {
      console.error("Erro no upload da imagem:", err);
      alert("Falha ao enviar imagem. Tente novamente.");
      // opcional: reverter preview para imagem antiga
      if (this.profileModel) {
        this.profileModel.revertChanges();
      }
    }
  }
}
