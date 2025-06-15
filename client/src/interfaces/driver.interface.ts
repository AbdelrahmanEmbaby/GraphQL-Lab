import type { ICar } from "./car.interface";
export interface IDriver {
  _id: string;
  name: string;
  age: number;
  cars: ICar[];
}

export interface CreateDriverInput {
  name: string;
  age: number;
  cars: string[];
}

export interface UpdateDriverInput {
  name: string;
  age: number;
  cars: string[];
}
