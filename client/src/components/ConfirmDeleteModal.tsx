import type { FC } from "react";

interface IConfirmDeleteModal {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  driverName?: string;
}

export const ConfirmDeleteModal: FC<IConfirmDeleteModal> = ({
  isOpen,
  onClose,
  onConfirm,
  driverName,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-sm shadow-xl">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Confirm Deletion
        </h2>
        <p className="mb-6 text-gray-600">
          Are you sure you want to delete{" "}
          <span className="font-medium">{driverName}</span>? This action cannot
          be undone.
        </p>
        <div className="flex justify-end space-x-3">
          <button className="btn shadow-none" type="button" onClick={onClose}>
            Cancel
          </button>
          <button
            className="btn btn-error shadow-none text-base-100"
            type="button"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
