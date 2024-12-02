import {PlanetResult, UsersResult} from './users-result';
import {CharacterProperties, PlanetProperties} from './properties';

export interface UserResponse {
  message: string;
  results: UsersResult[];
}

export interface User_PlanetResponse{
  message: string;
  results: PlanetResult[]
}

export interface CharacterResponse {
  message: string;
  result: UserProperties;
}

export interface PlanetResponse{
  message: string;
  result: PlanetDetails;
}


export interface UserProperties {
  properties: CharacterProperties

}

export interface  PlanetDetails{
properties: PlanetProperties
}

