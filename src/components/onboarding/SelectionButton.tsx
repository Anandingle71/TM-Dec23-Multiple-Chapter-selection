import React from 'react';

interface SelectionButtonProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

export function SelectionButton({ label, selected, onClick }: SelectionButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center justify-center px-4 py-2 border rounded-md ${
        selected
          ? 'border-indigo-600 bg-indigo-50 text-indigo-600'
          : 'border-gray-300 hover:border-indigo-400'
      }`}
    >
      {label}
    </button>
  );
}