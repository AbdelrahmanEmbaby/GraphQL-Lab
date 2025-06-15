import { useEffect, useState } from "react";
import type { FC } from "react";
import type { IDriver } from "../interfaces/driver.interface";
import { getAllDrivers, deleteDriver } from "../apis/driver.api";
import { DriverCard } from "../components/DriverCard.component";
import { AddEditDriverModal } from "../components/AddEditDriverModal";
import { AddCarModal } from "../components/AddCarModal";
import { ConfirmDeleteModal } from "../components/ConfirmDeleteModal";

export const Home: FC = () => {
  const [drivers, setDrivers] = useState<IDriver[]>([]);
  const [isDriverModalOpen, setIsDriverModalOpen] = useState(false);
  const [isCarModalOpen, setIsCarModalOpen] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState<IDriver | undefined>();
  const [driverToDelete, setDriverToDelete] = useState<IDriver | undefined>();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const fetchDrivers = async () => {
    const drivers = await getAllDrivers();
    setDrivers(drivers);
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  const handleDeleteDriver = async () => {
    if (driverToDelete) {
      await deleteDriver(driverToDelete._id);
      setIsDeleteModalOpen(false);
      setDriverToDelete(undefined);
      fetchDrivers();
    }
  };

  return (
    <div className="mx-auto px-20 py-8">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold mb-8">Drivers List</h1>
        <div className="space-x-4">
          <button
            type="button"
            className="btn shadow-none"
            onClick={() => setIsDriverModalOpen(true)}
          >
            Add driver
          </button>
          <button
            type="button"
            className="btn shadow-none"
            onClick={() => setIsCarModalOpen(true)}
          >
            Add car
          </button>
        </div>
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {drivers.map((driver) => (
          <DriverCard
            key={driver._id}
            driver={driver}
            handleClick={(d) => {
              setSelectedDriver(d);
              setIsDriverModalOpen(true);
            }}
            handleDelete={(d) => {
              setDriverToDelete(d);
              setIsDeleteModalOpen(true);
            }}
          />
        ))}
      </div>

      <AddEditDriverModal
        isOpen={isDriverModalOpen}
        onClose={() => {
          setIsDriverModalOpen(false);
          setSelectedDriver(undefined);
        }}
        driver={selectedDriver}
        onSuccess={fetchDrivers}
      />

      <AddCarModal
        isOpen={isCarModalOpen}
        onClose={() => setIsCarModalOpen(false)}
        onSuccess={fetchDrivers}
      />

      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setDriverToDelete(undefined);
        }}
        onConfirm={handleDeleteDriver}
        driverName={driverToDelete?.name}
      />
    </div>
  );
};
