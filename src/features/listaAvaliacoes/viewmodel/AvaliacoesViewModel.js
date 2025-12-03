import AvaliacoesModel from '../model/AvaliacoesModel';

export default {
    mixins: [AvaliacoesModel],
    data() {
        return {
            avaliacoes: [],
            isLoading: false,
            error: null,
            sortOrder: 'desc', // 'desc' para maior pra menor, 'asc' para menor pra maior
        };
    },
    computed: {
        sortedAvaliacoes() {
            const sorted = [...this.avaliacoes];
            if (this.sortOrder === 'desc') {
                sorted.sort((a, b) => b.numeroEstrelas - a.numeroEstrelas);
            } else {
                sorted.sort((a, b) => a.numeroEstrelas - b.numeroEstrelas);
            }
            return sorted;
        },
    },
    methods: {
        async loadAvaliacoes() {
            this.isLoading = true;
            this.error = null;
            try {
                const servicoId = this.$route.params.id;
                this.avaliacoes = await this.fetchAvaliacoes(servicoId);
            } catch (err) {
                this.error = 'Não foi possível carregar as avaliações.';
                console.error(err);
            } finally {
                this.isLoading = false;
            }
        },
        formatDate(dateString) {
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            return new Date(dateString).toLocaleDateString('pt-BR', options);
        },
        getStarRating(rating) {
            const totalStars = 5;
            const fullStars = Math.floor(rating);
            const emptyStars = totalStars - fullStars;
            return '★'.repeat(fullStars) + '☆'.repeat(emptyStars);
        }
    },
    created() {
        this.loadAvaliacoes();
    },
};
