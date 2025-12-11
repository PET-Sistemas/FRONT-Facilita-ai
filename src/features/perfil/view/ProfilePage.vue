<template>
  <HeaderPage />

  <main class="profile-container">
    <div>
      <div v-if="loading" class="profile-card-loading">
        <p>Carregando perfil...</p>
      </div>

      <div v-else class="profile-card">
        <div class="picture-container">
          <img
            :src="user.profilePicture"
            alt="Foto do Usuário"
            class="profile-picture"
          />
          <div v-if="isEditing">
            <label for="fotoPerfilUpload" class="button">
              <img src="@/assets/lapis.png" />
            </label>
            <input
              id="fotoPerfilUpload"
              type="file"
              accept="image/*"
              @change="uploadProfilePicture"
              style="display: none"
            />
          </div>
        </div>

        <div class="profile-header">
          <div class="title">{{ user.nomeCompleto }}</div>
          <div
            class="stars"
            :title="'Nota Geral: ' + (user.mediaAvaliacoes || 0).toFixed(1)"
          >
            {{ getStarRating(user.mediaAvaliacoes) }}
          </div>
          <div class="profile-info">
            <h3>Dados</h3>
            <div v-if="!isEditing">
              <p><strong>E-mail:</strong> {{ user.email }}</p>
              <p><strong>Senha:</strong></p>
              <p>
                <strong>Data de nascimento:</strong>
                {{ formatarData(user.dataNascimento) }}
              </p>

              <p><strong>Telefone:</strong> {{ user.telefone }}</p>
              <p><strong>Endereço:</strong> {{ user.endereco }}</p>
              <p>
                <strong>Cidade/Estado:</strong> {{ user.cidade }}-{{ user.uf }}
              </p>

              <button @click="toggleEdit">Editar Dados</button>
            </div>

            <div v-else>
              <label for="email">E-mail:</label>
              <input type="email" id="email" v-model="user.email" />

              <label for="senha">Senha:</label>
              <input type="password" id="senha" v-model="novaSenha" />

              <label for="location">Endereço:</label>
              <input type="text" id="endereco" v-model="user.endereco" />

              <label for="dataNascimento">Data de nascimento</label>
              <input
                type="date"
                id="dataNascimento"
                v-model="user.dataNascimento"
              />

              <label for="uf">Estado:</label>
              <select
                id="state"
                class="state"
                v-model="viewModel.selectedState"
                @change="viewModel.fetchCities"
              >
                <option value="">UF</option>
                <option
                  v-for="state in viewModel.states"
                  :key="state.sigla"
                  :value="state.sigla"
                >
                  {{ state.nome }}
                </option>
              </select>

              <label for="cidade">Cidade:</label
              ><select id="city" class="city" v-model="viewModel.selectedCity">
                <option value="">Cidade</option>
                <option
                  v-for="city in viewModel.cities"
                  :key="city.nome"
                  :value="city.nome"
                >
                  {{ city.nome }}
                </option>
              </select>
              <br />
              <button @click="saveData">Salvar Dados</button>
              <button @click="cancelEdit">Cancelar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <center>
      <div class="service-card">
        <div class="services">
          <h3>Serviços</h3>
          <div class="carousel">
            <div class="carousel-track-container">
              <button class="carousel-button prev" @click="prevSlide">
                &lt;
              </button>
              <div
                class="carousel-track"
                :style="{ transform: trackTransform }"
              >
                <img
                  v-for="(image, index) in images"
                  :key="index"
                  :src="image"
                  alt="Serviço"
                  class="carousel-image"
                />
              </div>
              <button class="carousel-button next" @click="nextSlide">
                &gt;
              </button>
            </div>
          </div>
        </div>
      </div>
    </center>
  </main>
</template>

<script>
import { reactive, ref, onMounted, computed } from "vue";
import userData from "@/plugins/axios.js";
import ProfileViewModel from "../viewmodel/ProfileViewModel";
import HeaderPage from "@/components/header/HeaderPage.vue";

export default {
  name: "ProfilePage",
  components: {
    HeaderPage,
  },
  methods: {
    getStarRating(media) {
      if (!media) return "☆☆☆☆☆";

      const totalStars = 5;
      const fullStars = Math.floor(media);
      const decimal = media % 1;
      const halfStar = decimal >= 0.25 && decimal < 0.75 ? 1 : 0;
      const emptyStars = Math.max(0, totalStars - fullStars - halfStar);

      return (
        "★".repeat(fullStars) + (halfStar ? "½" : "") + "☆".repeat(emptyStars)
      );
    },
  },
  mounted() {
    this.viewModel.fetchStates();
  },
  setup() {
    const viewModel = reactive(new ProfileViewModel(userData));
    const loading = ref(true);
    const novaSenha = ref("");
    const user = ref({
      id: null,
      nomeCompleto: "",
      email: "",
      telefone: "",
      endereco: "",
      profilePicture: "",
      stars: 0,
    });

    onMounted(async () => {
      const loadedUser = await viewModel.fetchUserData();
      if (loadedUser) user.value = loadedUser;

      const fotoUrl = await viewModel.fetchFoto();
      if (fotoUrl) {
        user.value.profilePicture = fotoUrl;
      }
      loading.value = false;
    });

    const formatarData = (dataString) => {
      if (!dataString) return "";
      const data = new Date(dataString);
      return data.toLocaleDateString("pt-BR");
    };

    const saveData = async () => {
      const dadosParaEnviar = { ...user.value };
      if (novaSenha.value) {
        dadosParaEnviar.senha = novaSenha.value;
      } else {
        delete dadosParaEnviar.senha;
      }
      delete dadosParaEnviar.profilePicture;

      const fotoAtualValida = user.value.profilePicture;

      const sucesso = await viewModel.saveData(dadosParaEnviar);
      if (sucesso && viewModel.profileModel) {
        user.value = { ...viewModel.profileModel.user };
        user.value.profilePicture = fotoAtualValida;
        novaSenha.value = "";
      }
    };

    const cancelEdit = () => {
      const fotoAtualValida = user.value.profilePicture;

      viewModel.cancelEdit();
      if (viewModel.profileModel) {
        user.value = { ...viewModel.profileModel.user };

        user.value.profilePicture = fotoAtualValida;
      }

      novaSenha.value = "";
    };

    const isEditing = computed(() => viewModel.isEditing);

    const uploadProfilePicture = async (event) => {
      const file = event.target.files[0];

      if (!file) return;
      if (!file.type.startsWith("image/")) {
        alert("Por favor, selecione um arquivo de imagem.");
        return;
      }

      await viewModel.uploadProfilePicture(file);

      if (viewModel.profileModel) {
        user.value.profilePicture = viewModel.profileModel.user.profilePicture;
      }
    };
    return {
      viewModel,
      loading,
      user,
      novaSenha,
      isEditing,
      images: viewModel.getImages(),
      currentIndex: viewModel.getCurrentIndex(),
      trackTransform: computed(
        () => `translateX(-${viewModel.getCurrentIndex() * 100}%)`
      ),
      saveData,
      formatarData,
      cancelEdit,
      toggleEdit: async () => {
        await viewModel.toggleEdit();
      },
      nextSlide: () => viewModel.nextSlide(),
      prevSlide: () => viewModel.prevSlide(),
      uploadProfilePicture,
    };
  },
};
</script>
<style>
main {
  min-height: 100vh;
  margin: 0;
  background: linear-gradient(
    1.87deg,
    rgba(2, 74, 89, 0.3) 0%,
    rgba(0, 0, 0, 0) 100%
  );
}
main {
  overflow-y: scroll; /* Força a barra de rolagem vertical */
}
::-webkit-scrollbar {
  width: 0px; /* Para barra de rolagem vertical */
  height: 0px; /* Para barra de rolagem horizontal */
}
.profile-container {
  height: 100%;
  width: 100%;
}
.profile-card {
  min-height: 40vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
}
.picture-container {
  height: auto;
  width: 20%;
  justify-content: center;
  align-items: center;
}
.profile-header {
  margin: 5%;
}
.title {
  font-size: 2.1em;
  font-weight: bold;
  font-family: "crete round", serif;
}
.type {
  font-family: "crete round", serif;
  font-size: 1.3em;
}
h3 {
  font-family: "crete round", serif;
}
.profile-picture {
  width: 300px; /* Largura fixa */
  height: 300px; /* Altura fixa */
  border-radius: 50%; /* Para um formato circular */
  object-fit: cover; /* Ajusta a imagem para preencher o espaço sem distorção */
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2); /* Opcional: sombra */
}
.profile-info {
  padding: 25px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2); /* Sombra */
  width: 500px;
  height: auto;
}
.services {
  padding: 25px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2); /* Sombra */
  width: 900px;
  height: auto;
  min-height: 20vh;
  margin: 0;
}
.service-card {
  justify-content: center;
  align-items: center;
}
.carousel {
  position: relative;
  width: 80%;
  max-width: 800px;
  overflow: visible; /* Permite que os botões fiquem fora do contêiner */
  margin: 0 auto; /* Centraliza o carrossel */
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
.carousel-track-container {
  overflow: hidden;
  width: 100%;
}
.carousel-track {
  display: flex;
  transition: transform 0.5s ease-in-out;
}
.carousel-image {
  width: 100%;
  flex: 0 0 100%;
}
.carousel-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: white;
  color: #f26530;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  z-index: 10;
  border-radius: 50%;
} /* Ajustando os botões para fora da imagem */
.carousel-button.prev {
  left: -50px; /* Move o botão para fora à esquerda */
}
.carousel-button.next {
  right: -50px; /* Move o botão para fora à direita */
}
.carousel-button:focus {
  outline: none;
}
.stars {
  color: #f26530;
  font-size: 2rem;
  margin: 10px 0;
  letter-spacing: 3px;
}
.star {
  font-size: 2rem;
  color: #ccc; /* Cor padrão */
}
.star.filled {
  color: #f26530; /* Cor das estrelas preenchidas */
}
input {
  width: 100%;
  padding: 10px;
  margin: 5px 0;
  border-radius: 5px;
  border: 1px solid #ccc;
}
button {
  margin: 5px;
  background-color: #f26530;
  padding: 5px;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
