import servicesData from '@/test/lista.json';

export default {
  data() {
    return {
      services: servicesData.map(service => ({ ...service, solicitado: false })),
    };
  },
  methods: {
    toggleSolicitado(service) {
      service.solicitado = !service.solicitado;
    },
    filterServices(selectedServices, distance, price) {
      return this.services.filter(service => {
        const matchesServiceType = selectedServices.length === 0 || selectedServices.includes(service["Nome do Serviço"].toLowerCase());
        const matchesDistance = service["Distância em KM"] <= distance;
        const matchesPrice = service.Preço <= price;
        return matchesServiceType && matchesDistance && matchesPrice;
      });
    }
  }
};
