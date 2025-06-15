import { useEffect, useState } from "react";
import type { FC } from "react";
import type { ICar } from "../interfaces/car.interface";
import type { IDriver } from "../interfaces/driver.interface";
import { getUnassignedCars } from "../apis/car.api";
import { createDriver, updateDriver } from "../apis/driver.api";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  driver?: IDriver;
  onSuccess: () => void;
}

export const AddEditDriverModal: FC<Props> = ({
  isOpen,
  onClose,
  driver,
  onSuccess,
}) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState(30);
  const [cars, setCars] = useState<ICar[]>([]);
  const [selectedCarIds, setSelectedCarIds] = useState<string[]>([]);
  const [selectedCarToAdd, setSelectedCarToAdd] = useState<string>("");

  useEffect(() => {
    if (isOpen) {
      setName(driver?.name || "");
      setAge(driver?.age || 18);
      setSelectedCarIds(driver?.cars.map((c) => c._id) || []);

      getUnassignedCars().then((unassignedCars) => {
        const driverCars = driver?.cars || [];

        const combinedCars = [
          ...driverCars,
          ...unassignedCars.filter(
            (uc) => !driverCars.some((dc) => dc._id === uc._id)
          ),
        ];

        setCars(combinedCars);
      });
    }
  }, [isOpen, driver]);

  const handleAddCar = () => {
    if (selectedCarToAdd && !selectedCarIds.includes(selectedCarToAdd)) {
      setSelectedCarIds([...selectedCarIds, selectedCarToAdd]);
      setSelectedCarToAdd("");
    }
  };

  const handleRemoveCar = (carId: string) => {
    setSelectedCarIds(selectedCarIds.filter((id) => id !== carId));
  };

  const handleSubmit = async () => {
    if (driver) {
      await updateDriver(driver._id, {
        name,
        age,
        cars: selectedCarIds,
      });
    } else {
      await createDriver({
        name,
        age,
        cars: selectedCarIds,
      });
    }
    onSuccess();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white p-8 rounded-xl w-full max-w-lg space-y-6">
        <h2 className="text-2xl font-bold">
          {driver ? "Edit Driver" : "Add Driver"}
        </h2>

        <input
          type="text"
          placeholder="Driver Name"
          className="input w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Age"
          className="input w-full"
          value={age}
          onChange={(e) => setAge(parseInt(e.target.value) || 0)}
        />

        <div>
          <label className="font-medium mb-2 block">Assign Cars</label>
          <div className="flex space-x-2 mb-4">
            <select
              className="select flex-1"
              value={selectedCarToAdd}
              onChange={(e) => setSelectedCarToAdd(e.target.value)}
            >
              <option value="">Select a car</option>
              {cars
                .filter((car) => !selectedCarIds.includes(car._id))
                .map((car) => (
                  <option key={car._id} value={car._id}>
                    {car.name} - {car.model}
                  </option>
                ))}
            </select>
            <button
              className="btn btn-accent shadow-none text-white"
              onClick={handleAddCar}
              disabled={!selectedCarToAdd}
            >
              Add Car
            </button>
          </div>

          <div className="space-y-2">
            {selectedCarIds.map((carId) => {
              const car = cars.find((c) => c._id === carId);
              if (!car) return null;
              return (
                <div
                  key={carId}
                  className="flex items-center justify-between p-2 bg-gray-100 rounded"
                >
                  <span>
                    {car.name} - {car.model}
                  </span>
                  <button
                    className="btn btn-sm btn-error text-base-100 shadow-none"
                    onClick={() => handleRemoveCar(carId)}
                  >
                    Remove
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <button className="btn btn-outline shadow-none" onClick={onClose}>
            Cancel
          </button>
          <button
            className="btn btn-primary shadow-none"
            onClick={handleSubmit}
          >
            {driver ? "Save" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
};
