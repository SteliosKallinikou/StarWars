import { CharacterDetailsResponse, PlanetDetailsResponse, ShipDetailsResponse } from './star-wars/details';
import { CharactersResponse, PlanetsResponse, ShipsResponse } from './star-wars/response';

export interface AppStore {
  characters: CharactersResponse;
  charactersDetails: CharacterDetailsResponse;
  planetsDetails: PlanetDetailsResponse;
  planets: PlanetsResponse;
  ships: ShipsResponse;
  shipsDetails: ShipDetailsResponse;
}
