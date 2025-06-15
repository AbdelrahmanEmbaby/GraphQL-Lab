import { useState } from "react";
import type { FC } from "react";
import { createCar } from "../apis/car.api";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AddCarModal: FC<Props> = ({ isOpen, onClose, onSuccess }) => {
  const [name, setName] = useState("");
  const [model, setModel] = useState("");

  const handleSubmit = async () => {
    await createCar({ name, model });
    onSuccess();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white p-8 rounded-xl w-full max-w-lg space-y-6">
        <h2 className="text-2xl font-bold">Add New Car</h2>

        <input
          type="text"
          placeholder="Car Name"
          className="input w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Car Model"
          className="input w-full"
          value={model}
          onChange={(e) => setModel(e.target.value)}
        />

        <div className="flex justify-end space-x-3">
          <button className="btn btn-outline shadow-none" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-primary shadow-none" onClick={handleSubmit}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
};
