import { BACKEND_URL } from "../config/constants.config";
import type {
  IDriver,
  CreateDriverInput,
  UpdateDriverInput,
} from "../interfaces/driver.interface";

// Get all drivers
export async function getAllDrivers(): Promise<IDriver[]> {
  const response = await fetch(BACKEND_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
        query {
          drivers {
            _id
            name
            age
            cars {
              _id
              name
              model
              driverId
            }
          }
        }
      `,
    }),
  });

  const { data } = await response.json();
  return data.drivers;
}

// Get driver by id
export async function getDriverById(id: string): Promise<IDriver | null> {
  const response = await fetch(BACKEND_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
        query {
          driver(id: "${id}") {
            _id
            name
            age
            cars {
              _id
              name
              model
              driverId
            }
          }
        }
      `,
    }),
  });

  const { data } = await response.json();
  return data.driver;
}

// Create driver
export async function createDriver(input: CreateDriverInput): Promise<IDriver> {
  const response = await fetch(BACKEND_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
        mutation CreateDriver($data: CreateDriverDto!) {
          createDriver(data: $data) {
            _id
            name
            age
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
    throw new Error("Failed to create driver");
  }
  return data.createDriver;
}

// Update driver
export async function updateDriver(
  id: string,
  input: UpdateDriverInput
): Promise<IDriver | null> {
  const response = await fetch(BACKEND_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
        mutation {
          updateDriver(id: "${id}", data: {
            name: "${input.name}",
            age: ${input.age},
            cars: [${input.cars.map((carId) => `"${carId}"`).join(", ")}]
          }) {
            _id
            name
            age
          }
        }
      `,
    }),
  });

  const { data } = await response.json();
  return data.updateDriver;
}

// Delete driver
export async function deleteDriver(id: string): Promise<IDriver | null> {
  const response = await fetch(BACKEND_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
        mutation {
          deleteDriver(id: "${id}") {
            _id
            name
            age
          }
        }
      `,
    }),
  });

  const { data, errors } = await response.json();
  if (errors) {
    console.error(errors);
    throw new Error(errors[0].message);
  }

  return data.deleteDriver;
}
