interface BaseResponse<T> {
  message: string;
  next: string;
  results: T[];
  previous: string;
  total_pages: number;
  total_records: number;
}

export interface CharactersResponse extends BaseResponse<CharacterResult> {}
export interface PlanetsResponse extends BaseResponse<PlanetResult> {}
export interface ShipsResponse extends BaseResponse<ShipResult> {}

interface BaseResult {
  uid: string;
  name: string;
  url: string;
}
export interface CharacterResult extends BaseResult {}
export interface PlanetResult extends BaseResult {}
export interface ShipResult extends BaseResult {}
