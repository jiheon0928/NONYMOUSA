import React, { JSX } from "react";

type ColorInputsProps = {
  colors: string[];
  onColorChange: (i: number, v: string) => void;
  onAddColor: () => void;
  onRemoveColor: (i: number) => void;
};

const ColorInputs = ({
  colors,
  onColorChange,
  onAddColor,
  onRemoveColor,
}: ColorInputsProps): JSX.Element => (
  <div>
    {colors.map((v, i) => (
      <div key={`color-${i}`} className="flex items-center mb-2">
        <input
          type="text"
          value={v}
          onChange={(e) => onColorChange(i, e.target.value)}
          placeholder="#ffffff"
          className="w-full border border-gray-300 rounded px-3 py-2"
          required
        />
        {i !== 0 && (
          <button
            type="button"
            onClick={() => onRemoveColor(i)}
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

export default ColorInputs;
