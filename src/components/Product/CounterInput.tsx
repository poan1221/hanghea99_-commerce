import { useState } from "react";

interface CounterInputProps {
  value: number;
  onChange: (value: number) => void;
}

export const CounterInput = ({ value, onChange }: CounterInputProps) => {
  const [quantity, setQuantity] = useState(value);

  const decrement = () => {
    console.log("decrement");
    setQuantity((prevQuantity) => (prevQuantity === 1 ? 1 : prevQuantity - 1));
  };

  const increment = () => {
    console.log("increment");
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleChange = (e) => {
    console.log("ffff");
    const newQuantity = parseInt(e.target.value);
    if (!isNaN(newQuantity) && newQuantity > 0) {
      setQuantity(newQuantity);
      onChange(newQuantity); // 값 변경 시 부모 컴포넌트로 업데이트 전달
    }
  };

  return (
    <div className="flex items-center">
      <button
        className="w-8 h-8 border border-gray-300 rounded-md"
        onClick={decrement}
      >
        -
      </button>
      <input
        type="text"
        className="w-8 h-8 text-center"
        value={quantity}
        // onChange={handleChange}
      />
      <button
        className="w-8 h-8 border border-gray-300 rounded-md"
        onClick={increment}
      >
        +
      </button>
    </div>
  );
};
