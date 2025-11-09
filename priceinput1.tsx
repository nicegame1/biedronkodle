import PriceInput from "../PriceInput";

export default function PriceInputExample() {
  return (
    <PriceInput
      onGuess={(price) => console.log("Guessed price:", price)}
      disabled={false}
    />
  );
}
