// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";

// Importar seus componentes dinamicamente
const LoginPage = () => import("../features/login/view/HomePage.vue");
const CadastroPage = () => import("../features/cadastro/view/CadastroPage.vue");
const HomePage = () => import("../features/busca/view/InicialTela.vue");
const ProfilePage = () => import("../features/perfil/view/ProfilePage.vue");
const CadastroServicoTela = () =>
  import("../features/cadastroServico/view/CadastroServicoTela.vue");
const ServicoDetalheTela = () =>
  import("../features/servico/view/ServicoDetalheTela.vue");
const AvaliacoesTela = () =>
  import("../features/listaAvaliacoes/view/AvaliacoesTela.vue");
const AvaliarServicoTela = () =>
  import("../features/avaliarServico/view/AvaliarServicoTela.vue");

// Obter a URL base a partir da variável de ambiente
const baseUrl = process.env.VUE_APP_BASE_URL || "/";

const router = createRouter({
  history: createWebHistory(baseUrl),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage,
    },
    {
      path: "/login",
      name: "login",
      component: LoginPage,
    },
    {
      path: "/sign_up",
      name: "sign_up",
      component: CadastroPage,
    },
    {
      path: "/profile",
      name: "profile",
      component: ProfilePage,
      meta: { requiresAuth: true },
    },
    {
      path: "/servico/cadastrar",
      name: "cadastroServico",
      component: CadastroServicoTela,
      meta: { requiresAuth: true },
    },
    {
      path: "/servico/:id",
      name: "servicoDetalhe",
      component: ServicoDetalheTela,
      props: true,
    },
    {
      path: "/servico/:id/avaliacoes",
      name: "avaliacoesServico",
      component: AvaliacoesTela,
      props: true,
    },
    {
      path: "/servico/:id/avaliar",
      name: "avaliarServico",
      component: AvaliarServicoTela,
      props: true,
      meta: { requiresAuth: true },
    },
  ],
});
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const token = localStorage.getItem("jwt_token");

    if (token) {
      next();
    } else {
      next("/login");
    }
  } else {
    next();
  }
});
export default router;
