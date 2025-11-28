export default {
  data() {
    return {
      address: 'Endereço Atual',
      newAddress: '',
      isEditing: false,
      price: 2000,
      priceOrder: 'desc',
      categories: [],
      selectedCategory: '',
      searchTerm: ''
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
      if (type === 'price') {
        this.price = parseInt(event.target.value);
      }
    },
    filterResults() { },
    formatPrice(value) {
      if (typeof value !== 'number') {
        value = Number(value);
      }
      return value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
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
