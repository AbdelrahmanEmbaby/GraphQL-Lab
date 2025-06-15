import type { FC } from "react";
import type { IDriver } from "../interfaces/driver.interface";

interface IDriverCard {
  driver: IDriver;
  handleClick: (driver: IDriver) => void;
  handleDelete: (driver: IDriver) => void;
}

export const DriverCard: FC<IDriverCard> = ({
  driver,
  handleClick,
  handleDelete,
}) => {
  return (
    <div
      key={driver._id}
      className="p-6 bg-white rounded-2xl shadow transition hover:shadow-lg"
    >
      <div className="flex flex-col items-start justify-between mb-4">
        <h2 className="text-xl font-semibold">{driver.name}</h2>
        <div className="w-full flex items-center justify-between">
          <span className="w-fit text-nowrap px-3 py-1 text-xs font-medium text-blue-800 bg-blue-100 rounded-full">
            Age: {driver.age}
          </span>
          <div className="space-x-2">
            <button
              type="button"
              className="btn btn-sm shadow-none"
              onClick={() => handleClick(driver)}
            >
              Edit
            </button>
            <button
              type="button"
              className="btn btn-error btn-sm text-base-100 shadow-none"
              onClick={() => handleDelete(driver)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      <h3 className="mt-2 mb-3 text-sm font-medium text-gray-700 uppercase tracking-wide">
        Assigned Cars
      </h3>

      {driver.cars.length > 0 ? (
        <ul className="space-y-3">
          {driver.cars.map((car) => (
            <li
              key={car._id}
              className="p-4 border border-gray-200 rounded-lg bg-gray-50"
            >
              <p className="font-medium">
                Car ID: <span className="font-normal">{car._id}</span>
              </p>
              <p className="font-medium">
                Name: <span className="font-normal">{car.name}</span>
              </p>
              <p className="font-medium">
                Model: <span className="font-normal">{car.model}</span>
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="italic text-gray-500">No cars assigned to this driver</p>
      )}
    </div>
  );
};
