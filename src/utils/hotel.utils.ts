export const amenityLabels: Record<string, string> = {
  wifi: "Wi-Fi",
  pool: "Piscina",
  spa: "Spa",
  restaurant: "Restaurante",
  gym: "Academia",
  parking: "Estacionamento",
  bar: "Bar",
  room_service: "Serviço de quarto",
  breakfast: "Café da manhã",
  business_center: "Business center",
  beach_access: "Acesso à praia",
  kids_club: "Espaço kids",
  valet: "Manobrista",
  concierge: "Concierge",

  ocean_view: "Vista para o mar",
  city_view: "Vista da cidade",
  garden_view: "Vista para o jardim",
  balcony: "Varanda",
  bathtub: "Banheira",
  minibar: "Frigobar",
  safe: "Cofre",
  aircon: "Ar-condicionado",
  terrace: "Terraço",
  desk: "Mesa de trabalho",
  lounge_access: "Acesso ao lounge",
  living_room: "Sala de estar",
  garden: "Jardim",
  pool_access: "Acesso à piscina",
  kitchen: "Cozinha",
  sound_system: "Sistema de som",
  butler: "Mordomo",
};

export function getAmenityLabel(amenity: string) {
  return amenityLabels[amenity] ?? amenity;
}

export function hasBeach(destination: string) {
  const beachCities = [
    "Rio de Janeiro",
    "Florianópolis",
    "Porto de Galinhas",
    "Fernando de Noronha",
    "Jericoacoara",
    "Salvador",
  ];

  return beachCities.some((city) => destination.includes(city));
}

export function getHotelDistances(destination: string) {
  const cityHasBeach = hasBeach(destination);

  return {
    centerDistance: "2,3 km do centro",
    beachDistance: cityHasBeach ? "450 m da praia" : null,
  };
}