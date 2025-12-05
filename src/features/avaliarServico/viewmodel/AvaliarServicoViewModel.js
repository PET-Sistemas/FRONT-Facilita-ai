import AvaliarServicoModel from "../model/AvaliarServicoModel";

export default {
  data() {
    return {
      servico: null,
      rating: 0,
      hoverRating: 0,
      avaliacaoDesc: "",
      isSubmitting: false,
      errorMessage: "",
      successMessage: "",
      isLoading: true,
    };
  },
  methods: {
    setRating(star) {
      this.rating = star;
    },
    resetHoverRating() {
      this.hoverRating = 0;
    },
    async submitEvaluation() {
      if (this.rating === 0) {
        this.errorMessage =
          "Por favor, selecione uma avaliação de 1 a 5 estrelas.";
        return;
      }

      this.isSubmitting = true;
      this.errorMessage = "";
      this.successMessage = "";

      try {
        const servicoId = this.$route.params.id;

        const evaluationData = {
          dataPrestacao: new Date().toISOString().split("T")[0], // Formato YYYY-MM-DD
          avaliacao: this.rating,
          avaliacaodesc: this.avaliacaoDesc,
          servicoId: parseInt(servicoId),
        };
        await AvaliarServicoModel.enviarAvaliacao(evaluationData);
        this.successMessage = "Avaliação enviada com sucesso!";
        setTimeout(
          () =>
            this.$router.push({
              name: "servicoDetalhe",
              params: { id: servicoId },
            }),
          2000
        );
      } catch (error) {
        this.errorMessage = "Falha ao enviar avaliação. Tente novamente.";
        console.error(error);
      } finally {
        this.isSubmitting = false;
      }
    },
    async loadInitialData() {
      this.isLoading = true;
      try {
        const serviceId = this.$route.params.id;
        this.servico = await AvaliarServicoModel.fetchServiceDetails(serviceId);
      } catch (err) {
        this.errorMessage = "Não foi possível carregar os detalhes do serviço.";
        console.error(err);
      } finally {
        this.isLoading = false;
      }
    },
  },
  created() {
    this.loadInitialData();
  },
};
