export interface ICar {
  _id: string;
  name: string;
  model: string;
}

export interface CreateCarInput {
  name: string;
  model: string;
  driverId?: string | null;
}

export interface UpdateCarInput {
  name?: string;
  model?: string;
  driverId?: string | null;
}
