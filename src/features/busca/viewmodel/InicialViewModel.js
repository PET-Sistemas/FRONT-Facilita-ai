export default {
  data() {
    return {
      address: 'Endereço Atual', 
      newAddress: '', 
      isEditing: false,
      serviceType: '',
      distance: 25,
      price: 500
    };
  },
  watch: {
    serviceType() {
      this.filterResults();
    },
    distance() {
      this.filterResults();
    },
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
      if (type === 'distance') {
        this.distance = parseInt(event.target.value);
      } else {
        this.price = parseInt(event.target.value);
      }
    },
    filterResults() {
      console.log('Filtrando por:', this.serviceType, this.distance, this.price);
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
