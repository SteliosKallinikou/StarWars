// TODO formatting and spacing should be added to make the code more readable

import { PlanetResult, ShipResult, UsersResult } from './users-result';
import { CharacterProperties, PlanetProperties, ShipProperties } from './properties';

export interface UserResponse {
  message: string;
  results: UsersResult[];
  next: string;
  total_pages: number;
  total_records: number;
}
//TODO should be PascalCase
export interface User_PlanetResponse {
  message: string;
  results: PlanetResult[];
  next: string;
  total_pages: number;
  total_records: number;
}

//TODO should be PascalCase
export interface User_ShipResponse {
  message: string;
  results: ShipResult[];
  next: string;
  total_pages: string;
}

export interface CharacterResponse {
  message: string;
  result: UserProperties;
}

export interface PlanetResponse {
  message: string;
  result: PlanetDetails;
}

export interface ShipResponse {
  message: string;
  result: ShipDetails;
}

export interface UserProperties {
  properties: CharacterProperties;
}

export interface PlanetDetails {
  properties: PlanetProperties;
}

export interface ShipDetails {
  properties: ShipProperties;
}
