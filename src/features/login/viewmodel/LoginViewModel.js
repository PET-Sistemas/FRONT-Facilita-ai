/* eslint-disable */
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const API_URL = "http://localhost:8080"; // Substitua pelo URL do seu back-end

const login = async (email, senha) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      senha,
    });
    return response.data.token;
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    throw error;
  }
};

export default function useLoginViewModel() {
  const email = ref("");
  const password = ref("");
  const errorMessage = ref("");
  const router = useRouter();
  const isShaking = ref(false);

  const handleLogin = async () => {
    errorMessage.value = "";

    try {
      const token = await login(email.value, password.value);
      localStorage.setItem("jwt_token", token);
      router.push("/");
    } catch (error) {
      errorMessage.value = "Email ou senha incorretos. Tente novamente.";
      console.error("Falha no login:", error);
      isShaking.value = true;
      setTimeout(() => {
        isShaking.value = false;
      }, 300);
    }
  };

  return {
    email,
    password,
    errorMessage,
    isShaking,
    handleLogin,
  };
}
