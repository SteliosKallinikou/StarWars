import {Properties} from './properties';

export interface UsersResult {
  uid: string;
  description: string;
  name: string;
  url: string;
  properties: Properties
}
