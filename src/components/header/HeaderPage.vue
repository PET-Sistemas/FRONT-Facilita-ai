<template>
  <header>
    <router-link to="/">
      <img src="@/assets/logo.png" alt="Logo Facilita aí" id="logo" />
    </router-link>
    <div class="main-content" v-if="isHomePage">
      <div class="search-input">
        <div class="search-container">
          <input
            type="text"
            id="search"
            placeholder="Descreva o que precisa..."
            v-model="searchTerm"
            @input="onSearchInput"
          />
          <img src="@/assets/lupa.png" alt="Search Icon" class="search-icon" />
        </div>
      </div>
    </div>
    <div class="header-right">
      <div v-if="isLoggedIn" class="user-menu-container">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="40"
          height="40"
          fill="#ffffff"
        >
          <path
            d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.33-8 4v2h16v-2c0-2.67-5.33-4-8-4z"
          />
        </svg>
        <div class="dropdown-menu">
          <ul>
            <li @click="goToProfile">Perfil</li>
            <li @click="logout">Logout</li>
          </ul>
        </div>
      </div>
      <button v-else @click="goToLogin" class="login-btn">Fazer Login</button>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      searchTerm: "",
      isLoggedIn: false,
    };
  },
  computed: {
    isHomePage() {
      return this.$route.path === "/";
    },
  },
  mounted() {
    this.checkLoginStatus();
  },
  watch: {
    $route() {
      this.checkLoginStatus();
    },
  },
  methods: {
    checkLoginStatus() {
      const token = localStorage.getItem("jwt_token");
      this.isLoggedIn = !!token;
    },
    onSearchInput() {
      this.$emit("search", this.searchTerm);
    },
    logout() {
      localStorage.removeItem("jwt_token");
      window.dispatchEvent(new Event("storage-update"));
      this.isLoggedIn = false;
      this.$router.push("/");
    },
    goToProfile() {
      this.$router.push("/profile");
    },
    goToLogin() {
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
header {
  position: relative;
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  height: 7rem;
  width: 100%;
  background: linear-gradient(
    to left,
    #024a59 0%,
    #024a59 35%,
    #067057 100%,
    #068852 100%
  );
}

.main-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.search-container {
  position: relative;
  display: flex;
  align-items: center;
}

#search {
  padding-right: 40px;
}

.search-icon {
  position: absolute;
  padding-top: 25px;
  right: 10px;
  width: 20px;
  height: 20px;
}

.search-input {
  margin-bottom: 20px;
}

.header-right {
  position: relative;
  display: flex;
  align-items: center;
}

#logo {
  margin-left: 3rem;
  width: 100px;
  height: auto;
}

svg {
  cursor: pointer;
  margin-right: 5rem;
}

#search {
  margin-top: 1.8rem;
  display: flex;
  padding: 12px;
  border-radius: 5px;
  border: none;
  font-size: 1rem;
  width: 50rem;
}

.dropdown-menu {
  display: none;
  position: absolute;
  top: 40px;
  right: 55px;
  z-index: 1000;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.dropdown-menu ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.dropdown-menu li {
  padding: 10px 20px;
  cursor: pointer;
}

.dropdown-menu li:hover {
  background-color: #f0f0f0;
}

.login-btn {
  background-color: #f26530;
  border: none;
  color: #ffffff;
  padding: 0.6em 1.2em;
  font-size: 1em;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-right: 4rem;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.login-btn:hover {
  background-color: #e65500;
}

.profile-icon {
  cursor: pointer;
}

.user-menu {
  position: relative;
}

.user-menu-container {
  display: flex;
  align-items: center;
  position: relative;
}

.user-menu-container:hover .dropdown-menu {
  display: block;
}
</style>
