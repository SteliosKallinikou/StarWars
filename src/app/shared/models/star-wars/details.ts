interface BaseItemResponse<T> {
  message: string;
  result: T;
}

export interface CharacterDetailsResponse extends BaseItemResponse<CharacterDetails> {}
export interface PlanetDetailsResponse extends BaseItemResponse<PlanetDetails> {}
export interface ShipDetailsResponse extends BaseItemResponse<ShipDetails> {}

interface BaseDetailsItem<T> {
  description: string;
  properties: T;
  uid: string;
  __v: number;
  _id: string;
}

export interface CharacterDetails extends BaseDetailsItem<CharacterProperties> {}
export interface CharacterProperties {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  created: string;
  edited: string;
  homeworld: string;
  url: string;
}

export interface PlanetDetails extends BaseDetailsItem<PlanetProperties> {}
export interface PlanetProperties {
  name: string;
  climate: string;
  diameter: string;
  gravity: string;
  created: string;
  edited: string;
  terrain: string;
  orbital_period: string;
  rotation_period: string;
  surface_water: string;
  population: string;
  url: string;
}

export interface ShipDetails extends BaseDetailsItem<ShipProperties> {}
export interface ShipProperties {
  name: string;
  model: string;
  starship_class: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  crew: string;
  passengers: string;
  max_atmosphering_speed: string;
  hyperdrive_rating: string;
  MGLT: string;
  cargo_capacity: string;
  consumables: string;
  pilots: string[];
  created: string;
  edited: string;
  url: string;
}
