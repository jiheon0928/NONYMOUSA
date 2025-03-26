// components/SizeInputs.tsx
import React from "react";

type Size = {
  key: string;
  value: string;
};

type SizeInputsProps = {
  sizes: Size[];
  onSizeChange: (index: number, field: "key" | "value", value: string) => void;
  onAddSize: () => void;
  onRemoveSize: (index: number) => void;
};

const SizeInputs: React.FC<SizeInputsProps> = ({
  sizes,
  onSizeChange,
  onAddSize,
  onRemoveSize,
}) => {
  return (
    <div>
      <label className="block font-semibold mb-1">상품 사이즈</label>
      {sizes.map((size, index) => (
        <div key={`size-${index}`} className="flex items-center gap-2 mb-2">
          <input
            type="text"
            value={size.key}
            onChange={(e) => onSizeChange(index, "key", e.target.value)}
            placeholder="키"
            className="w-1/3 border border-gray-300 rounded px-3 py-2"
            required
          />
          <input
            type="text"
            value={size.value}
            onChange={(e) => onSizeChange(index, "value", e.target.value)}
            placeholder="값"
            className="w-1/3 border border-gray-300 rounded px-3 py-2"
            required
          />
          {index != 0 && (
            <button
              type="button"
              onClick={() => onRemoveSize(index)}
              className="ml-2 text-red-500 hover:underline"
            >
              취소
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={onAddSize}
        className="text-sm text-blue-500 hover:underline"
      >
        사이즈 추가
      </button>
    </div>
  );
};

export default SizeInputs;
