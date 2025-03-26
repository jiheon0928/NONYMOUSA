import React, { JSX } from "react";

type ColorInputsProps = {
  colors: string[];
  onColorChange: (index: number, value: string) => void;
  onAddColor: () => void;
  onRemoveColor: (index: number) => void;
};

export default function ColorInputs({
  colors,
  onColorChange,
  onAddColor,
  onRemoveColor,
}: ColorInputsProps): JSX.Element {
  return (
    <div>
      {colors.map((color, index) => (
        <div key={`color-${index}`} className="flex items-center mb-2">
          <input
            type="text"
            value={color}
            onChange={(e) => onColorChange(index, e.target.value)}
            placeholder="#ffffff"
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
          {index !== 0 && (
            <button
              type="button"
              onClick={() => onRemoveColor(index)}
              className="ml-2 text-red-500 hover:underline"
            >
              취소
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={onAddColor}
        className="text-sm text-blue-500 hover:underline"
      >
        색상 추가
      </button>
    </div>
  );
}
