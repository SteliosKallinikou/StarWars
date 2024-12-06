import {UsersResult} from './users-result';
import {Properties} from './properties';

export interface UserResponse {
  message: string;
  results: UsersResult[];
}

export interface CharacterResponse {
  message: string;
  result: UserProperties;
}

export interface UserProperties {
  properties: Properties
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender:string;
  created: string;
  edited: string;
  name: string;
  homeworld:string;
  url: string;
}

