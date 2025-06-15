import { BACKEND_URL } from "../config/constants.config";
import type {
  ICar,
  CreateCarInput,
  UpdateCarInput,
} from "../interfaces/car.interface";

// Get all cars
export async function getAllCars(): Promise<ICar[]> {
  const response = await fetch(BACKEND_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
        query {
          cars {
            _id
            name
            model
            driverId
          }
        }
      `,
    }),
  });

  const { data } = await response.json();
  return data.cars;
}

// Get unassigned cars
export async function getUnassignedCars(): Promise<ICar[]> {
  const response = await fetch(BACKEND_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
        query {
          cars(hasDriver: false) {
            _id
            name
            model
            driverId
          }
        }
      `,
    }),
  });

  const { data } = await response.json();
  return data.cars;
}

// Get car by id
export async function getCarById(id: string): Promise<ICar | null> {
  const response = await fetch(BACKEND_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
        query {
          car(id: "${id}") {
            _id
            name
            model
            driverId
          }
        }
      `,
    }),
  });

  const { data } = await response.json();
  return data.car;
}

// Create car
export async function createCar(input: CreateCarInput): Promise<ICar> {
  const response = await fetch(BACKEND_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
        mutation CreateCar($data: CreateCarDto!) {
          createCar(data: $data) {
            _id
            name
            model
          }
        }
      `,
      variables: {
        data: input,
      },
    }),
  });

  const { data, errors } = await response.json();

  if (errors) {
    console.error(errors);
    throw new Error(errors[0].message);
  }

  return data.createCar;
}


// Update car
export async function updateCar(
  id: string,
  input: UpdateCarInput
): Promise<ICar | null> {
  const response = await fetch(BACKEND_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
        query {
          updateCar(id: "${id}", data: {
            name: "${input.name}",
            model: "${input.model}",
            driverId: ${input.driverId ? `"${input.driverId}"` : null}
          }) {
            _id
            name
            model
            driverId
          }
        }
      `,
    }),
  });

  const { data } = await response.json();
  return data.updateCar;
}

// Delete car
export async function deleteCar(id: string): Promise<ICar | null> {
  const response = await fetch(BACKEND_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
        query {
          deleteCar(id: "${id}") {
            _id
            name
            model
            driverId
          }
        }
      `,
    }),
  });

  const { data } = await response.json();
  return data.deleteCar;
}

// assign cars

export async function assignCarsToDriver(
  driverId: string,
  carIds: string[]
): Promise<void> {
  await Promise.all(carIds.map((carId) => updateCar(carId, { driverId })));
}
