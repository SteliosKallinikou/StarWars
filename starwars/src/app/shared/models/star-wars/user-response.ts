import {PlanetResult, ShipResult, UsersResult} from './users-result';
import {CharacterProperties, PlanetProperties, ShipProperties} from './properties';

export interface UserResponse {
  message: string;
  results: UsersResult[];
}

export interface User_PlanetResponse{
  message: string;
  results: PlanetResult[]
}

export interface User_ShipResponse{
  message: string;
  results: ShipResult[];
}

export interface CharacterResponse {
  message: string;
  result: UserProperties;
}

export interface PlanetResponse{
  message: string;
  result: PlanetDetails;
}

export interface ShipResponse{
  message:string;
  result: ShipDetails;
}


export interface UserProperties {
  properties: CharacterProperties

}

export interface  PlanetDetails{
properties: PlanetProperties
}

export interface ShipDetails{
  properties: ShipProperties
}

