export default {
  data() {
    return {
      address: 'Endereço Atual',
      newAddress: '',
      isEditing: false,
      price: 2000, // Valor inicial do filtro de preço
      priceOrder: 'desc' // 'desc' para Maior para Menor, 'asc' para Menor para Maior
    };
  },
  watch: {
    price() {
      this.filterResults();
    }
  },
  methods: {
    getSliderBackground(value, max) {
      const percentage = (value / max) * 100;
      return {
        '--value': percentage + '%',
      };
    },
    updateSlider(event, type) {
      // Lógica simplificada para cuidar apenas do preço
      if (type === 'price') {
        this.price = parseInt(event.target.value);
      }
    },
    filterResults() {
      console.log('Filtrando por preço máximo:', this.price);
    },
    formatPrice(price) {
      return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    },
    toggleEdit() {
      this.isEditing = !this.isEditing;
      if (this.isEditing) {
        this.$nextTick(() => {
          this.$refs.addressInput.focus();
        });
      }
    },
    saveAddress() {
      if (this.newAddress.trim()) {
        this.address = this.newAddress;
        this.newAddress = '';
        this.isEditing = false;
      }
    }
  }
};
